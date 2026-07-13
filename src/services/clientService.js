import { db } from '../firebaseConfig';
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy,
    where,
    serverTimestamp
} from 'firebase/firestore';

const COLLECTION_NAME = 'clients';

const CLOUDINARY_CLOUD_NAME = "dvjpw2pqh";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

export const clientService = {
    // Get all clients
    getAllClients: async () => {
        try {
            const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching clients:', error);
            throw error;
        }
    },

    // Get active clients only (for public site)
    getActiveClients: async () => {
        try {
            const q = query(
                collection(db, COLLECTION_NAME), 
                where('isActive', '==', true)
            );
            const querySnapshot = await getDocs(q);
            const clients = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            // Sort locally to avoid needing a Firestore composite index
            return clients.sort((a, b) => {
                const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                return dateB - dateA;
            });
        } catch (error) {
            console.error('Error fetching active clients:', error);
            throw error;
        }
    },

    // Upload to Cloudinary helper
    uploadLogo: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Cloudinary upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    },

    // Add a new client
    addClient: async (clientData, file = null) => {
        try {
            let logoUrl = '';
            
            // Upload logo if provided
            if (file) {
                logoUrl = await clientService.uploadLogo(file);
            }

            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                name: clientData.name,
                logoUrl: logoUrl,
                websiteUrl: clientData.websiteUrl || '',
                testimonial: clientData.testimonial || '',
                isActive: clientData.isActive !== undefined ? clientData.isActive : true,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            
            return docRef.id;
        } catch (error) {
            console.error('Error adding client:', error);
            throw error;
        }
    },

    // Update an existing client
    updateClient: async (id, clientData, file = null, oldLogoUrl = null) => {
        try {
            let logoUrl = clientData.logoUrl;

            // Handle new file upload
            if (file) {
                logoUrl = await clientService.uploadLogo(file);
            }

            const clientRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(clientRef, {
                name: clientData.name,
                logoUrl: logoUrl,
                websiteUrl: clientData.websiteUrl || '',
                testimonial: clientData.testimonial || '',
                isActive: clientData.isActive,
                updatedAt: serverTimestamp()
            });
            
            return true;
        } catch (error) {
            console.error('Error updating client:', error);
            throw error;
        }
    },

    // Delete a client
    deleteClient: async (id, logoUrl = null) => {
        try {
            // Cloudinary deletion from client side is not supported by default without signature.
            // So we just ignore deleting the file from Cloudinary to keep it simple, or handle via backend.
            await deleteDoc(doc(db, COLLECTION_NAME, id));
            return true;
        } catch (error) {
            console.error('Error deleting client:', error);
            throw error;
        }
    }
};

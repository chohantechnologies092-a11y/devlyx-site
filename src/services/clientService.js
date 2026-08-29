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
const IMGBB_API_KEY = "3bde4002f57762e1e1ca9dc45a90b80b";
import imageCompression from 'browser-image-compression';

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

    // Upload to ImgBB helper
    uploadLogo: async (file) => {
        const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: false };
        const compressedFile = await imageCompression(file, options);
        
        const formData = new FormData();
        formData.append('image', compressedFile);
        
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('ImgBB upload failed');
        const data = await response.json();
        return data.data.url;
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
            // Deletion from Firebase Storage could be added here if needed
            // For now we just ignore deleting the file to keep it simple, or handle via backend.
            await deleteDoc(doc(db, COLLECTION_NAME, id));
            return true;
        } catch (error) {
            console.error('Error deleting client:', error);
            throw error;
        }
    }
};

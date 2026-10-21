import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Lock, Eye, FileText, Database, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#fcfcfd] min-h-screen font-sans selection:bg-[#6a35ff] selection:text-white flex flex-col justify-between">
      <Helmet>
        <title>Privacy Policy | Devlyx Solutions</title>
        <meta name="description" content="Read the Devlyx Solutions privacy policy detailing how client and visitor data is safeguarded, stored, and processed." />
      </Helmet>

      <Navbar />

      <main className="pt-36 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6"
            >
              <ShieldCheck size={14} className="text-[#00c2cb]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-800">Legal Protocol</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-gray-950 tracking-tight mb-4"
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 font-medium text-sm md:text-base max-w-xl mx-auto"
            >
              Effective Date: January 1, 2026 • Last Updated: October 2026
            </motion.p>
          </div>

          {/* Policy Body */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-12 text-gray-700 leading-relaxed"
          >
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <Lock size={20} className="text-[#6a35ff]" />
                1. Commitment to Data Integrity
              </h2>
              <p className="text-gray-600 font-medium">
                At Devlyx Solutions ("we", "our", or "us"), we prioritize the confidentiality, integrity, and security of our partners, clients, and website visitors. This Privacy Policy outlines our transparent protocols regarding the collection, storage, and processing of technical information and client correspondence.
              </p>
            </div>

            {/* Information Collected */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <Database size={20} className="text-[#00c2cb]" />
                2. Information We Collect
              </h2>
              <div className="space-y-4 text-gray-600 font-medium">
                <p>We only collect information necessary to provide software engineering, product development, and consultation services:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><strong>Client Inquiries & Project Briefs:</strong> Contact details (name, corporate email, phone/WhatsApp number), project specifications, technical objectives, and budget allocations submitted via our contact forms or interactive sales agent ("Dex").</li>
                  <li><strong>Technical Usage & Telemetry:</strong> Anonymized analytical parameters such as browser agent, visit duration, geographic region (country/city), and clicked resources to optimize platform speed and infrastructure load.</li>
                  <li><strong>Communication Logs:</strong> Records of communications and technical agreements for milestone verification and project delivery.</li>
                </ul>
              </div>
            </div>

            {/* Utilization */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <Eye size={20} className="text-[#3ecf8e]" />
                3. Purpose of Processing
              </h2>
              <p className="text-gray-600 font-medium mb-3">Your data is utilized strictly for the following engineering and business objectives:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-medium">
                <li>Architecting, developing, and deploying custom software, mobile apps, SaaS, and POS platforms.</li>
                <li>Executing non-disclosure agreements (NDAs) and commercial proposals.</li>
                <li>Providing proactive technical maintenance, security patches, and server monitoring.</li>
                <li>Improving our web performance and regional content delivery networks.</li>
              </ul>
            </div>

            {/* Third-Party Disclosure */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <FileText size={20} className="text-[#f59e0b]" />
                4. Zero Unauthorized Disclosure
              </h2>
              <p className="text-gray-600 font-medium">
                <strong>We do not sell, rent, trade, or monetize client data.</strong> Client source code, database architectures, proprietary software logic, and customer lists remain 100% confidential and are never shared with third parties, except as strictly required by law or requested by the client for cloud provisioning (e.g., AWS, Google Cloud, Firebase, Stripe).
              </p>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#6a35ff]" />
                5. Infrastructure Security Standards
              </h2>
              <p className="text-gray-600 font-medium">
                Our infrastructure employs enterprise-grade transport layer security (TLS 1.3), end-to-end encrypted databases (Firebase Firestore / Cloud KMS), strict IAM access rules, and automated rate-limiting protocols to defend against unauthorized intrusion and data loss.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-black text-gray-950 mb-1">Questions or Data Privacy Inquiries?</h3>
                <p className="text-sm text-gray-500 font-medium">Reach our dedicated data compliance desk directly.</p>
              </div>
              <a
                href="mailto:devlyxsolutions@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-950 text-white text-xs font-black uppercase tracking-widest hover:bg-[#6a35ff] transition-all duration-300"
              >
                <Mail size={14} />
                devlyxsolutions@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

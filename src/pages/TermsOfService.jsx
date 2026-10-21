import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { Scale, CheckCircle2, Shield, Code2, AlertCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#fcfcfd] min-h-screen font-sans selection:bg-[#6a35ff] selection:text-white flex flex-col justify-between">
      <Helmet>
        <title>Terms of Service | Devlyx Solutions</title>
        <meta name="description" content="Review the engineering terms of service, engagement protocols, and IP transfer terms governing Devlyx Solutions." />
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
              <Scale size={14} className="text-[#6a35ff]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-800">Master Service Protocol</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-gray-950 tracking-tight mb-4"
            >
              Terms of Service
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 font-medium text-sm md:text-base max-w-xl mx-auto"
            >
              Effective Date: January 1, 2026 • Governs All Engineering Engagements
            </motion.p>
          </div>

          {/* Terms Body */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-12 text-gray-700 leading-relaxed"
          >
            {/* 1. Engagement Framework */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <Code2 size={20} className="text-[#6a35ff]" />
                1. Scope of Engineering Engagements
              </h2>
              <p className="text-gray-600 font-medium">
                Devlyx Solutions provides premium custom software engineering, cloud architecture, mobile application development, Point-of-Sale (POS) systems, UI/UX design, and technical consulting. Every engagement is governed by a mutual Scope of Work (SOW) or Statement of Deliverables outlining milestones, timelines, and technical requirements.
              </p>
            </div>

            {/* 2. Intellectual Property */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#00c2cb]" />
                2. Intellectual Property & Code Ownership
              </h2>
              <p className="text-gray-600 font-medium">
                Upon complete settlement of agreed project milestone invoices, <strong>all custom-developed source code, database architectures, graphics, and proprietary digital assets are 100% transferred to the client.</strong> Devlyx Solutions retains no ownership over bespoke client IP, ensuring our clients have full freedom to deploy, license, or scale their software independently.
              </p>
            </div>

            {/* 3. Milestone Delivery */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <Scale size={20} className="text-[#3ecf8e]" />
                3. Milestone Deliveries & Scope Adjustments
              </h2>
              <div className="space-y-3 text-gray-600 font-medium">
                <p>Engagements proceed through iterative verification sprints. Clients receive access to staging environments for feedback and sign-off at each milestone.</p>
                <p>Any additions or fundamental changes outside the agreed Scope of Work are treated as Change Orders, accompanied by transparent timeline and cost assessments before execution.</p>
              </div>
            </div>

            {/* 4. Confidentiality */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <Shield size={20} className="text-[#f59e0b]" />
                4. Mutual Non-Disclosure & Confidentiality
              </h2>
              <p className="text-gray-600 font-medium">
                Both parties agree to treat all business plans, financial records, trade secrets, software algorithms, and technical documentation with strict confidentiality. Non-disclosure agreements (NDAs) signed prior to project kickoff remain legally binding indefinitely.
              </p>
            </div>

            {/* 5. Warranties & Post-Launch Support */}
            <div>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-4 flex items-center gap-3">
                <AlertCircle size={20} className="text-[#6a35ff]" />
                5. Quality Warranty & Deployment SLA
              </h2>
              <p className="text-gray-600 font-medium">
                Devlyx Solutions warrants that all custom deliverables will perform substantially in accordance with the documented technical specifications. We provide a complimentary post-launch stabilization warranty (covering bug fixes and performance validation) for 30 to 90 days depending on the project tier.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-black text-gray-950 mb-1">Contractual Inquiries</h3>
                <p className="text-sm text-gray-500 font-medium">For corporate contracts, enterprise MSAs, and legal questions:</p>
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

export default TermsOfService;

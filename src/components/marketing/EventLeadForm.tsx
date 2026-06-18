import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { handleWhatsAppClick } from "@/hooks/useSalesman";
import { Button } from "@/components/ui/button";

interface EventLeadFormProps {
  ctaText: string;
  salesmanInfo: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  };
  primaryColor: string;
}

export const EventLeadForm: React.FC<EventLeadFormProps> = ({ ctaText, salesmanInfo, primaryColor }) => {
  return (
    <section className="w-full py-24 bg-neutral-50 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-neutral-100 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ready to Save?
          </h2>
          <p className="text-lg text-neutral-500">
            Reach out directly to your dedicated consultant, <strong className="text-neutral-900">{salesmanInfo.fullName}</strong>. Let's discuss how much you can save with zero upfront cost.
          </p>
          
          <div className="flex flex-col space-y-4 pt-4">
            <Button
              size="lg"
              className={`w-full text-base md:text-lg min-h-14 h-auto py-3 rounded-full whitespace-normal break-words leading-tight ${primaryColor} hover:opacity-90 transition-opacity`}
              onClick={() => handleWhatsAppClick({ ...salesmanInfo, message: `I am interested in the ${ctaText} offer!` })}
            >
              <FaWhatsapp className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6 shrink-0" />
              <span className="text-left">{ctaText}</span>
            </Button>
            
            <div className="grid grid-cols-1 gap-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 rounded-full border-neutral-200"
                onClick={() => window.location.href = `tel:${salesmanInfo.phoneNumber}`}
              >
                <FaPhoneAlt className="mr-2" />
                Call Me
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative graphic / Consultant Image Placeholder */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/3 aspect-square bg-gradient-to-tr from-neutral-100 to-neutral-200 rounded-3xl flex items-center justify-center p-6 shadow-inner"
        >
          <div className="text-center space-y-2">
            <div className="w-24 h-24 bg-white rounded-full mx-auto shadow-sm flex items-center justify-center text-4xl">
              👋
            </div>
            <p className="font-semibold text-lg">{salesmanInfo.fullName}</p>
            <p className="text-sm text-neutral-500">Solar Expert</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

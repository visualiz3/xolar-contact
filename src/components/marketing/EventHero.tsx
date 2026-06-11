import { motion } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { handleWhatsAppClick } from "@/hooks/useSalesman";
import { Button } from "@/components/ui/button";

interface EventHeroProps {
  headline: string;
  subheadline: string;
  primaryColor: string;
  salesmanInfo?: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  };
  ctaText?: string;
}

export const EventHero: React.FC<EventHeroProps> = ({ 
  headline, 
  subheadline, 
  primaryColor,
  salesmanInfo,
  ctaText 
}) => {
  return (
    <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] opacity-30 blur-[120px] rounded-full pointer-events-none ${primaryColor}`} />
      </div>
      
      <div className="z-10 text-center max-w-4xl mx-auto flex flex-col items-center space-y-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4"
        >
          <Image
            src="/xolar-logo-transparent.png"
            alt="Xolar Logo"
            width={240}
            height={80}
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400">
            {headline}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-xl md:text-2xl text-neutral-300 font-medium max-w-2xl mx-auto">
            {subheadline}
          </p>
        </motion.div>

        {salesmanInfo && ctaText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-full max-w-sm pt-6"
          >
            <Button
              size="lg"
              className={`w-full text-lg h-14 rounded-full ${primaryColor} hover:opacity-90 transition-opacity`}
              onClick={() => 
                handleWhatsAppClick({ 
                  ...salesmanInfo, 
                  message: `I am interested in the ${ctaText} offer!` 
                })
              }
            >
              <FaWhatsapp className="mr-3 w-6 h-6" />
              {ctaText}
            </Button>
            <p className="mt-4 text-sm text-neutral-400 font-medium">
              Chat directly with {salesmanInfo.fullName || "our team"}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

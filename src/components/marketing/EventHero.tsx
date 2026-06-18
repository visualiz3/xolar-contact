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
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6 py-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpeg"
          alt="Background"
          fill
          priority
          quality={50}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] opacity-40 blur-[120px] rounded-full pointer-events-none ${primaryColor}`} />
      </div>
      
      <div className="z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4 md:space-y-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-2 md:mb-6 p-3 px-6 md:p-4 md:px-8 bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/20"
        >
          <Image
            src="/xolar-logo-transparent.png"
            alt="Xolar Logo"
            width={180}
            height={50}
            priority
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-snug md:leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400">
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
            className="w-full max-w-sm pt-2 md:pt-6"
          >
            <Button
              size="lg"
              className={`w-full text-base md:text-lg min-h-14 h-auto py-3 rounded-full whitespace-normal break-words leading-tight ${primaryColor} hover:opacity-90 transition-opacity`}
              onClick={() => 
                handleWhatsAppClick({ 
                  ...salesmanInfo, 
                  message: `I am interested in the ${ctaText} offer!` 
                })
              }
            >
              <FaWhatsapp className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6 shrink-0" />
              <span className="text-center">{ctaText}</span>
            </Button>
            {/* <p className="mt-4 text-sm text-neutral-400 font-medium">
              WhatsApp directly with {salesmanInfo.fullName || "our team"} to claim
            </p> */}
          </motion.div>
        )}
      </div>
    </section>
  );
};

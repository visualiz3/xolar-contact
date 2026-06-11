import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SALESMAN_DATA, SalesmanKey } from "@/app/constants";
import { sendGTMEvent } from "@next/third-parties/google";

export const trackLinkClick = (
  category: string = "Button",
  label: string,
  eventAction: string = "click"
) => {
  if (typeof window !== "undefined") {
    const data = {
      event_category: category,
      event_label: label,
      event_action: eventAction,
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: document.referrer,
      device_type: /mobile/i.test(navigator.userAgent) ? "mobile" : "desktop",
    };

    sendGTMEvent({ event: "click", ...data });
  }
};

export const createVCard = (salesmanInfo: {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}) => {
  if (!salesmanInfo.fullName || !salesmanInfo.phoneNumber) return "";

  return `BEGIN:VCARD
VERSION:3.0
FN:Xolar ${salesmanInfo.fullName}
EMAIL:${salesmanInfo.email}
ORG:Xolar Solution Sdn Bhd
TEL;WORK;VOICE:+60387279000
ADR;WORK:;;No. 5, Jln P4/8, Bandar Teknologi Kajang. Semenyih 43500, Selangor 
TEL:${salesmanInfo.phoneNumber}
END:VCARD`;
};

export const downloadVCard = (
  vCardContent: string,
  salesmanName: string | undefined
) => {
  if (!salesmanName) return;

  const blob = new Blob([vCardContent], { type: "text/vcard" });
  const fileName = `${salesmanName.replace(/\s+/g, "_")}_Xolar_Solution.vcf`;
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const handleWhatsAppClick = (whatsappInfo: {
  message?: string;
  fullName?: string;
  phoneNumber?: string;
}) => {
  trackLinkClick("Contact Button", "Whatsapp Button");

  const defaultMessage =
    "I want to know more about your solar system installation.";
  const message = `Hi ${whatsappInfo.fullName}, ${
    whatsappInfo.message || defaultMessage
  }`;
  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${whatsappInfo.phoneNumber?.replace(
    /\+/,
    ""
  )}?text=${encodedMessage}`;

  window.location.href = whatsappUrl;
};

export const handleAddToContacts = (salesmanInfo: {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}) => {
  trackLinkClick("Contact Button", "Add To Contacts Button");
  const vCard = createVCard(salesmanInfo);
  downloadVCard(vCard, salesmanInfo.fullName);
};

export const useSalesman = () => {
  const [salesmanInfo, setSalesmanInfo] = useState(SALESMAN_DATA["default"]);
  const [promoInfo, setPromoInfo] = useState("None");
  const searchParams = useSearchParams();

  useEffect(() => {
    const salesmanNameParam = searchParams.get("namecard");
    const promoNameParam = searchParams.get("promo");
    let selectedSalesman = SALESMAN_DATA["default"];

    if (salesmanNameParam && SALESMAN_DATA[salesmanNameParam as SalesmanKey]) {
      selectedSalesman = SALESMAN_DATA[salesmanNameParam as SalesmanKey];
    }
    setSalesmanInfo(selectedSalesman);
    setPromoInfo(promoNameParam || "None");
  }, [searchParams]);

  useEffect(() => {
    if (salesmanInfo.fullName) {
      sendGTMEvent({
        event: "namecard",
        value: {
          salesman_name: salesmanInfo.fullName,
          page_path: window.location.pathname,
        },
      });
    }
  }, [salesmanInfo]);

  useEffect(() => {
    if (promoInfo) {
      sendGTMEvent({
        event: "promo",
        value: {
          promo_name: promoInfo,
        },
      });
    }
  }, [promoInfo]);

  return { salesmanInfo, promoInfo };
};

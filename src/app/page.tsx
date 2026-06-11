"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaPhoneAlt,
  FaAddressBook,
  FaWaze,
  FaEnvelope,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";
import { TbBrandGoogle } from "react-icons/tb";
import { SALESMAN_DATA, SalesmanKey } from "./constants";
import { sendGTMEvent } from "@next/third-parties/google";

const Main: React.FC = () => {
  return (
    <Suspense fallback={<div className="bg-white">Loading...</div>}>
      <MainContent />
    </Suspense>
  );
};

const MainContent: React.FC = () => {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <LogoSection />

      {promoInfo === "UOB_EVENT" ? (
        <>
          <span className="text-blue-600">
            🎉 Claim Your UOB Event Voucher Promo | Whatsapp Us and Receive Your
            Voucher!
          </span>

          <div className="flex flex-col items-center space-y-4 w-full max-w-xs mb-14  ">
            <button
              onClick={() =>
                handleWhatsAppClick({
                  ...salesmanInfo,
                  message: "I want to claim my UOB Event Voucher",
                })
              }
              className="flex items-center justify-between w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
              aria-label={`Chat with me on WhatsApp`}
            >
              <FaWhatsapp className="mr-3" size={20} />
              <span className="text-center flex-1">
                Claim Your Voucher through Whatsapp
              </span>
            </button>
          </div>

          <CompanyInfo />

          <NavigationButtons />

          <SocialLinks />
        </>
      ) : (
        <>
          <SalesmanInfo salesmanInfo={salesmanInfo} />

          <ContactActions salesmanInfo={salesmanInfo} />

          <CompanyInfo />

          <NavigationButtons />

          <SocialLinks />
        </>
      )}
    </div>
  );
};

// --- Helper Functions and Constants ---

const trackLinkClick = (
  category: string = "Button",
  label: string,
  eventAction: string = "click"
) => {
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
};

const createVCard = (salesmanInfo: {
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

const downloadVCard = (
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

const handleWhatsAppClick = (whatsappInfo: {
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

const handleAddToContacts = (salesmanInfo: {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}) => {
  trackLinkClick("Contact Button", "Add To Contacts Button");
  const vCard = createVCard(salesmanInfo);
  downloadVCard(vCard, salesmanInfo.fullName);
};

// --- Sub-Components ---

const LogoSection: React.FC = () => (
  <div className="mb-6">
    <Image
      src="/xolar-logo.png"
      alt="Xolar Logo"
      width={500}
      height={500}
      className="w-80 object-contain"
    />
  </div>
);

interface SalesmanInfoProps {
  salesmanInfo: { fullName?: string };
}

const SalesmanInfo: React.FC<SalesmanInfoProps> = ({ salesmanInfo }) => (
  <>
    {salesmanInfo.fullName && (
      <p className="text-4xl font-bold mb-4 text-gray-800 text-center">
        I am {salesmanInfo.fullName},
        <br />
        your solar solution expert.
      </p>
    )}
  </>
);

interface ContactActionsProps {
  salesmanInfo: { fullName?: string; phoneNumber?: string; email?: string };
}

const ContactActions: React.FC<ContactActionsProps> = ({ salesmanInfo }) => {
  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-xs mb-14  ">
      {/* Call Us Button */}
      <button
        onClick={() => {
          trackLinkClick("Contact Button", "Call Phone Button");
          window.location.href = `tel:${salesmanInfo.phoneNumber}`;
        }}
        className="flex items-center justify-between w-full  bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-[#e65c00] transition"
        aria-label={`Call us at ${salesmanInfo.phoneNumber}`}
      >
        <FaPhoneAlt className="mr-3" size={20} />
        <span className="text-center flex-1">
          Call Me {salesmanInfo.phoneNumber}
        </span>
      </button>

      <button
        onClick={() => {
          trackLinkClick("Contact Button", "Email Button");
          window.location.href = `mailto:${salesmanInfo.email}`;
        }}
        className="flex items-center justify-between w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
        aria-label={`Email me at ${salesmanInfo.email}`}
      >
        <FaEnvelope className="mr-3" size={20} />
        <span className="text-center flex-1">Email Me : {salesmanInfo.email}</span>
      </button>

      <button
        onClick={() => handleWhatsAppClick(salesmanInfo)}
        className="flex items-center justify-between w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
        aria-label={`Chat with me on WhatsApp`}
      >
        <FaWhatsapp className="mr-3" size={20} />
        <span className="text-center flex-1">Chat with Me on WhatsApp</span>
      </button>

      <button
        onClick={() => handleAddToContacts(salesmanInfo)}
        className="flex items-center justify-between w-full bg-[#FF6A00] text-white py-2 px-4 rounded-lg shadow hover:bg-[#e65c00] transition"
        aria-label="Add our contact details to your phone"
      >
        <FaAddressBook className="mr-3" size={20} />
        <span className="text-center flex-1">Add to Contacts</span>
      </button>
    </div>
  );
};

const CompanyInfo: React.FC = () => (
  <>
    <h1 className="text-4xl font-bold mb-1 text-gray-800 text-center">
      Xolar Solution Sdn Bhd
    </h1>
    <p className="text-2xl font-bold text-gray-800 mb-4 text-center">
      Savings From Day 1
    </p>
    <p className="text-m text-gray-600 mb-4 text-center">
      No. 5, Jln P4/8, Bandar Teknologi Kajang. Semenyih 43500, Selangor
    </p>
  </>
);

const NavigationButtons: React.FC = () => (
  <div className="flex justify-between w-full max-w-xs mb-4 space-x-1">
    {/* Waze Button */}
    <button
      onClick={() => {
        trackLinkClick("Direction Button", "Waze Button");
        window.open(
          "https://ul.waze.com/ul?place=Ekk1LCBKbG4gUDQvOEIsIEJhbmRhciBUZWtub2xvZ2kgS2FqYW5nLCA0MzUwMCBTZW1lbnlpaCwgU2VsYW5nb3IsIE1hbGF5c2lhIjASLgoUChIJP8QKdiLMzTERh-HKO93JAbYQBSoUChIJe2rinRjMzTER8eWfLYhPTIw&ll=2.96018170%2C101.82065370&navigate=yes",
          "_blank"
        );
      }}
      className="flex items-center justify-center w-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
      aria-label="Navigate to office using Waze"
    >
      <FaWaze className="w-6 h-6 mr-2" />
      <span>Waze</span>
    </button>

    {/* Google Maps Button */}
    <button
      onClick={() => {
        trackLinkClick("Direction Button", "Google Maps Button");
        window.open("https://maps.app.goo.gl/eCqbtiwSUK1G1S5RA", "_blank");
      }}
      className="flex items-center justify-center w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
      aria-label="Navigate to office using Google Maps"
    >
      <TbBrandGoogle className="w-4 h-4 mr-2" />
      <span>Google Maps</span>
    </button>
  </div>
);

const SocialLinks: React.FC = () => {
  const links = [
    {
      id: 1,
      url: "https://xolar.my",
      label: "Website",
      icon: <CgWebsite size={24} />,
    },
    {
      id: 2,
      url: "https://www.facebook.com/xolarkajang",
      label: "Facebook",
      icon: <FaFacebook size={24} />,
    },
    {
      id: 3,
      url: "https://www.instagram.com/xolarmalaysia",
      label: "Instagram",
      icon: <FaInstagram size={24} />,
    },
    {
      id: 4,
      url: "https://www.tiktok.com/@xolarmalaysia",
      label: "Tiktok",
      icon: <FaTiktok size={24} />,
    },
    {
      id: 5,
      url: "https://www.youtube.com/@xolarmalaysia",
      label: "Youtube",
      icon: <FaYoutube size={24} />,
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-4 mb-6 w-full max-w-xs">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLinkClick("Social Buttons", link.label)}
          className="flex items-center w-full bg-[#003882] text-white text-center py-2 px-4 rounded-lg shadow hover:bg-[#002a6d] transition"
          aria-label={`Visit our ${link.label} page`}
        >
          <span className="mr-3">{link.icon}</span>
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default Main;

import React from "react";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCreditCard,
  FaUndo,
  FaShieldAlt,
  FaTags,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FAQItem = ({
  icon: Icon,
  question,
  answer,
}: {
  icon: React.ElementType;
  question: string;
  answer: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
      <Icon className="text-blue-600 text-lg" />
      <h2 className="text-xs font-semibold text-gray-800">{question}</h2>
    </div>
    <p className="text-xs text-gray-700 leading-relaxed">{answer}</p>
  </div>
);

const FAQ: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 text-xs font-poppins">
      {/* Hero Section */}
      <div className="bg-blue-700 py-10 md:py-20 w-full flex items-center justify-center">
        <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-center text-white leading-loose">
          Frequently Asked Questions
        </h1>
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-5 sm:mx-20 xl:mx-auto rounded-2xl px-4 sm:px-6 lg:px-8 py-4 -mt-10 md:-mt-16 mb-5 text-gray-700 bg-indigo-100 space-y-6 shadow-2xl shadow-gray-600">
        <FAQItem
          icon={FaBoxOpen}
          question="What products does BurmeseBoxx offer?"
          answer="We offer a curated selection of Myanmar food and commodity products, including instant meals, dried seafood, traditional snacks, and canned goods."
        />

        <FAQItem
          icon={FaShippingFast}
          question="Where do you ship?"
          answer="We currently ship exclusively to addresses within Australia. Orders placed from outside Australia must be shipped to an Australian recipient."
        />

        <FAQItem
          icon={FaShippingFast}
          question="How long does delivery take?"
          answer="Orders are shipped via DHL air cargo from Myanmar. Delivery typically takes 1–2 weeks, and up to 4 weeks in case of customs delays or natural disasters. Monthly shipping cutoff dates are the 15th and 28th."
        />

        <FAQItem
          icon={FaCreditCard}
          question="What payment methods do you accept?"
          answer="We accept Visa, MasterCard, and direct bank transfers. All online payments are secured using SSL encryption."
        />

        <FAQItem
          icon={FaUndo}
          question="Can I return or exchange items?"
          answer="We do not accept returns or exchanges for change-of-mind purchases. If your item arrives damaged or incorrect, please contact us within 7 days of delivery."
        />

        <FAQItem
          icon={FaShieldAlt}
          question="Is insurance included in shipping?"
          answer="Insurance is not included by default. If you wish to add insurance, please mention it in your order notes and we’ll follow up with details."
        />

        <FAQItem
          icon={FaTags}
          question="Do you offer discounts or promotions?"
          answer="Yes, we occasionally offer discount vouchers and promotional bundles. Vouchers are typically valid for one-time use unless otherwise stated."
        />

        <FAQItem
          icon={FaEnvelopeOpenText}
          question="How can I contact BurmeseBoxx?"
          answer={
            <span>
              You can reach us via email at{" "}
              <strong>burmeseboxx@gmail.com</strong> or send us a message using
              our{" "}
              <Link
                to="/contact-us"
                className="underline text-blue-600 font-semibold"
              >
                Contact Us
              </Link>{" "}
              form.
            </span>
          }
        />

        <FAQItem
          icon={FaShieldAlt}
          question="Is my personal information safe?"
          answer="Yes. We take privacy seriously. Your data is handled securely and in accordance with our Privacy Policy."
        />
      </div>
    </div>
  );
};

export default FAQ;

import React from "react";
import {
  // FaGlobe,
  FaShieldAlt,
  FaShoppingCart,
  FaSyncAlt,
  FaCreditCard,
  FaTruck,
  FaIdCard,
  FaTags,
} from "react-icons/fa";

const SectionHeader = ({
  icon: Icon,
  title,
  mm,
}: {
  icon: React.ElementType;
  title: string;
  mm: string;
}) => (
  <div className="flex flex-col gap-1 mb-4">
    <div className="flex items-center gap-3">
      <Icon className="text-blue-600 text-xl" />
      <h2 className="text-xs font-semibold text-gray-800">{title}</h2>
    </div>
    <p className="text-sm text-gray-500">{mm}</p>
  </div>
);

const TermsOfUse: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 text-xs font-poppins">
      {/* Hero Section */}
      <div className="bg-blue-700 py-10 md:py-20 w-full flex items-center justify-center">
        <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-center text-white leading-loose">
          Terms & Conditions
        </h1>
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-5 sm:mx-20 xl:mx-auto rounded-2xl px-4 sm:px-6 lg:px-8 py-4 -mt-10 md:-mt-16 mb-5 text-gray-700 bg-indigo-100 space-y-5 shadow-2xl shadow-gray-600">
        <div>
          <p className="text-sm leading-relaxed">
            By accessing or using shop.burmeseboxx.com, you agree to be bound by
            the following Terms and Conditions. These terms govern your use of
            our website and services, and we encourage you to review them
            carefully before placing an order.
          </p>
        </div>

        <div>
          <SectionHeader icon={FaShieldAlt} title="General Use" mm="" />
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Users must be at least 18 years of age or have parental consent to
              use this site.
            </li>
            <li>
              Use of the site for unlawful, fraudulent, or unauthorized purposes
              is strictly prohibited.
            </li>
            <li>
              BurmeseBoxx reserves the right to refuse service or cancel orders
              at its sole discretion.
            </li>
          </ul>
        </div>

        <div>
          <SectionHeader icon={FaShoppingCart} title="Orders & Pricing" mm="" />
          <ul className="list-disc ml-6 space-y-2">
            <li>All prices are subject to change without prior notice.</li>
            <li>
              We reserve the right to limit or cancel orders at any time,
              including after confirmation.
            </li>
            <li>
              International orders must be shipped to a valid Australian
              address.
            </li>
          </ul>
        </div>

        <div>
          <SectionHeader
            icon={FaCreditCard}
            title="Payments & Security"
            mm=""
          />
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Accepted payment methods include Visa, MasterCard, and direct bank
              transfers.
            </li>
            <li>
              All transactions are secured using SSL encryption to protect your
              data.
            </li>
            <li>
              Orders are subject to verification. Any suspected fraudulent
              activity will be reported to the relevant authorities.
            </li>
          </ul>
        </div>

        <div>
          <SectionHeader icon={FaTruck} title="Shipping & Insurance" mm="" />
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Orders are shipped via DHL and include tracking with signature
              upon delivery.
            </li>
            <li>
              Insurance is not included by default. Please contact us if you
              wish to add coverage.
            </li>
            <li>
              Claims for damage or loss must be submitted to both the courier
              and BurmeseBoxx for assessment.
            </li>
          </ul>
        </div>

        <div>
          <SectionHeader
            icon={FaIdCard}
            title="Identity & Verification"
            mm=""
          />
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Photo identification may be required for in-store pickup or direct
              deposit orders.
            </li>
            <li>
              IP addresses are logged to help prevent fraudulent transactions.
            </li>
            <li>
              All personal data is handled securely in accordance with our
              Privacy Policy.
            </li>
          </ul>
        </div>

        <div>
          <SectionHeader icon={FaTags} title="Discounts & Promotions" mm="" />
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Discount vouchers are valid for one-time use unless otherwise
              specified.
            </li>
            <li>
              You may opt out of promotional communications at any time via the
              unsubscribe link.
            </li>
          </ul>
        </div>

        <div>
          <SectionHeader icon={FaSyncAlt} title="Changes to Terms" mm="" />
          <p>
            BurmeseBoxx reserves the right to update or modify these Terms and
            Conditions at any time. Continued use of the website following any
            changes constitutes acceptance of the revised terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;

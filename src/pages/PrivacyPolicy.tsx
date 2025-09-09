import React from "react";
import {
  // FaLock,
  FaUserShield,
  FaCookieBite,
  FaExternalLinkAlt,
  FaEnvelope,
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

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 text-xs font-poppins">
      {/* Hero Section */}
      <div className="bg-blue-700 py-10 md:py-20 w-full flex items-center justify-center">
        <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-center text-white leading-loose">
          Privacy Policy
        </h1>
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-5 sm:mx-20 xl:mx-auto rounded-2xl px-4 sm:px-6 lg:px-8 py-4 -mt-10 md:-mt-16 mb-5 text-gray-700 bg-indigo-100 space-y-5 shadow-2xl shadow-gray-600">
        <div>
          <p className="text-sm leading-relaxed">
            At BurmeseBoxx, we respect your privacy and are committed to
            protecting your personal information. This policy explains how we
            collect, use, and safeguard your data when you visit our website or
            place an order.
          </p>
          {/* <p className="text-sm text-gray-500 mt-2">
            BurmeseBoxx တွင် သင့်ကိုယ်ရေးအချက်အလက်များကို လုံခြုံစွာ
            ထိန်းသိမ်းရန် ကျွန်ုပ်တို့ကတိပြုပါသည်။ ဤပေါ်လစီသည်
            သင့်အချက်အလက်များကို မည်သို့စုဆောင်း၊ အသုံးပြု၊ ကာကွယ်သည်ကို
            ရှင်းလင်းဖော်ပြထားပါသည်။
          </p> */}
        </div>

        <div>
          <SectionHeader icon={FaUserShield} title="What We Collect" mm="" />
          <ul className="list-disc ml-6 space-y-2">
            <li>Name, email, phone number</li>
            <li>Billing and shipping address</li>
            <li>Payment details (e.g. credit card info)</li>
            <li>Device/browser data (IP address, cookies, usage patterns)</li>
          </ul>
          {/* <p className="text-sm text-gray-500 mt-2">
            မှာယူမှုနှင့် ဝန်ဆောင်မှုများအတွက် အထက်ပါအချက်အလက်များကို
            စုဆောင်းပါသည်။ သင့်ကူညီမှုတောင်းဆိုမှုများအတွက်လည်း
            စုဆောင်းနိုင်ပါသည်။
          </p> */}
        </div>

        <div>
          <SectionHeader
            icon={FaUserShield}
            title="How We Use Your Information"
            mm=""
          />
          <ul className="list-disc ml-6 space-y-2">
            <li>To process and deliver your order</li>
            <li>To communicate with you about your purchase</li>
            <li>To improve our website and services</li>
            <li>To prevent fraud and ensure security</li>
          </ul>
          {/* <p className="text-sm text-gray-500 mt-2">
            သင့်အချက်အလက်များကို မှာယူမှုလုပ်ငန်းစဉ်၊ ဆက်သွယ်မှု၊
            ဝန်ဆောင်မှုတိုးတက်မှုနှင့် လုံခြုံရေးအတွက်သာ အသုံးပြုပါသည်။
            ကျွန်ုပ်တို့သည် သင့်အချက်အလက်များကို တတိယပုဂ္ဂိုလ်များထံသို့
            ရောင်းချခြင်းမပြုပါ။
          </p> */}
        </div>

        <div>
          <SectionHeader icon={FaCookieBite} title="Cookies" mm="" />
          <p>
            We use cookies to enhance your browsing experience. Cookies help us
            maintain your cart, remember preferences, and analyze site usage.
            You can disable cookies in your browser settings, but some features
            may not work properly.
          </p>
          {/* <p className="text-sm text-gray-500 mt-2">
            ကွတ်ကီးများသည် သင့်စျေးဝယ်အတွေ့အကြုံကို တိုးတက်စေပါသည်။ သင့် browser
            တွင် ကွတ်ကီးများကို ပိတ်နိုင်သော်လည်း
            ဝက်ဘ်ဆိုဒ်အချို့အင်္ဂါရပ်များသည် အလုပ်မလုပ်နိုင်ပါ။
          </p> */}
        </div>

        <div>
          <SectionHeader icon={FaUserShield} title="Minors" mm="" />
          <p>
            Our website is not intended for children under 13. We do not
            knowingly collect personal information from minors. If you believe a
            child has submitted data, please contact us to request deletion.
          </p>
          {/* <p className="text-sm text-gray-500 mt-2">
            ကျွန်ုပ်တို့၏ဝက်ဘ်ဆိုဒ်သည် အသက် ၁၃ နှစ်အောက်ကလေးများအတွက်
            မရည်ရွယ်ပါ။ ကလေးများမှ ကိုယ်ရေးအချက်အလက်များ ပေးပို့ထားသည်ဟု
            ယုံကြည်ပါက ကျွန်ုပ်တို့ကို ဆက်သွယ်၍ ဖျက်ရန် တောင်းဆိုနိုင်ပါသည်။
          </p> */}
        </div>

        <div>
          <SectionHeader
            icon={FaExternalLinkAlt}
            title="External Links"
            mm=""
          />
          <p>
            Our site may contain links to other websites. BurmeseBoxx is not
            responsible for the privacy practices of those sites. We recommend
            reviewing their privacy policies before sharing any personal data.
          </p>
          {/* <p className="text-sm text-gray-500 mt-2">
            BurmeseBoxx ဝက်ဘ်ဆိုဒ်တွင် ပြင်ပဝက်ဘ်ဆိုဒ်များသို့
            ချိတ်ဆက်ထားနိုင်ပါသည်။ ထိုဝက်ဘ်ဆိုဒ်များ၏ privacy policy များကို
            ဖတ်ရှုရန် အကြံပြုပါသည်။
          </p> */}
        </div>

        <div>
          <SectionHeader icon={FaEnvelope} title="Contact Us" mm="" />
          <p>
            If you have questions about this policy or wish to update or delete
            your personal information, please contact us:
          </p>
          <ul className="mt-2 ml-6 list-disc space-y-1">
            <li>
              <strong>Email</strong>: burmeseboxx@gmail.com
            </li>
            {/* <li>
              <strong>Mail</strong>: PO BOX [Insert Address], Australia
            </li> */}
          </ul>
          {/* <p className="text-sm text-gray-500 mt-2">
            ဤပေါ်လစီနှင့်ပတ်သက်၍ မေးခွန်းများရှိပါက သို့မဟုတ်
            သင့်ကိုယ်ရေးအချက်အလက်များကို ပြင်ဆင်ခြင်း သို့မဟုတ် ဖျက်ခြင်း
            ပြုလုပ်လိုပါက အထက်ပါလိပ်စာများသို့ ဆက်သွယ်နိုင်ပါသည်။
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

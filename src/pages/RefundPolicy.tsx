import React from "react";
import { 
  FaExchangeAlt,
  FaExclamationTriangle,
  FaShippingFast,
  FaMoneyBillWave,
  FaBan, 
  FaEnvelopeOpenText,
  FaTruck, 
} from "react-icons/fa";
import ConditionsForReturns from "./ConditionsForReturn";
import { Link } from "react-router-dom";

const SectionHeader = ({
  icon: Icon,
  title,
}: //mm,
{
  icon: React.ElementType;
  title: string;
  //mm: string;
}) => (
  <div className="flex flex-col gap-1 mb-3">
    <div className="flex items-center gap-3">
      <Icon className="text-blue-600 text-xl" />
      <h2 className="text-xs font-semibold text-gray-800">{title}</h2>
    </div>
    {/* <p className="text-sm text-gray-500">{mm}</p> */}
  </div>
);

const RefundPolicy: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 text-xs font-poppins">
      {/* Hero Section */}
      <div className="bg-blue-700 py-10 md:py-20 w-full flex items-center justify-center">
        <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-center text-white leading-loose">
          Refund & Return Policy
        </h1>
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-5 sm:mx-20 xl:mx-auto rounded-2xl px-4 sm:px-6 lg:px-8 py-4 -mt-10 md:-mt-16 mb-5 text-gray-700 bg-indigo-100 space-y-5 shadow-2xl shadow-gray-600">
        <div>
          <p className="text-sm leading-relaxed">
            At BurmeseBoxx, we are committed to providing you with the highest
            quality products. Your satisfaction is our top priority. Due to the
            nature of our products—food items imported from Myanmar—and the
            international shipping process, our policy is designed to be fair
            while ensuring product safety and quality.
          </p>
          {/* <p className="text-sm text-gray-500 mt-2">
          BurmeseBoxx တွင် မြန်မာနိုင်ငံမှ တင်သွင်းသော အစားအသောက်များကို
          အရည်အသွေးမြင့်ဖြင့် ပေးဆောင်ရန်ကတိပြုထားပါသည်။ သင့်ကျေနပ်မှုသည်
          ကျွန်ုပ်တို့၏ အရေးကြီးဆုံး ဦးစားပေးမှုဖြစ်သည်။
          နိုင်ငံတကာပို့ဆောင်မှုနှင့် အစားအသောက်အမျိုးအစားများအပေါ် မူတည်၍
          ကျွန်ုပ်တို့၏ပေါ်လစီသည် တရားမျှတမှုနှင့် ထုတ်ကုန်လုံခြုံမှုကို
          သေချာစေရန် ရည်ရွယ်ထားပါသည်။
        </p> */}
        </div>

        <div>
          <SectionHeader
            icon={FaShippingFast}
            title="Delivery Timeline"
            // mm="ပို့ဆောင်ချိန်ဇယား"
          />
          <ul className="list-disc ml-6 space-y-2">
            <li>
              All orders are shipped via <strong>DHL air cargo</strong> from
              Myanmar to Australia.
            </li>
            <li>
              Estimated delivery time: <strong>1–2 weeks</strong>.
            </li>
            <li>
              In rare cases—such as natural disasters or customs delays—delivery
              may take up to <strong>4 weeks</strong>.
            </li>
            <li>
              Monthly shipping cutoff dates: <strong>15th and 28th</strong> of
              each month.
            </li>
            <li>
              If you haven’t received your order after <strong>28 days</strong>,
              contact us at <strong>burmeseboxx@gmail.com</strong>.
            </li>
          </ul>
          {/* <p className="text-sm text-gray-500 mt-2">
          DHL လေကြောင်း cargo ဖြင့် မြန်မာနိုင်ငံမှ သြစတြေးလျသို့
          ပို့ဆောင်ပါသည်။ ပျမ်းမျှပို့ဆောင်ချိန်မှာ ၁–၂ ပတ်ဖြစ်ပြီး
          သဘာဝဘေးအန္တရာယ်များ သို့မဟုတ် အခွန်နှောင့်ယှက်မှုများကြောင့် ၄
          ပတ်အထိကြာနိုင်ပါသည်။ ပေးပို့မှု cutoff ရက်များမှာ လစဉ် ၁၅ ရက်နှင့် ၂၈
          ရက်ဖြစ်သည်။ ၂၈ ရက်ကျော်လွန်ပြီးမှ မရရှိသေးပါက burmeseboxx@gmail.com
          သို့ ဆက်သွယ်ပါ။
        </p> */}
        </div>

        <div>
          <SectionHeader
            icon={FaExchangeAlt}
            title="Returns & Exchanges for Change of Mind or Incorrect Choice"
            // mm="ပြန်အမ်းခြင်းနှင့် အစားထိုးခြင်း"
          />
          <p className="leading-relaxed">
            We do not accept returns or exchanges for change-of-mind purchases
            or incorrect product choices, especially for perishable or dried
            food items. This policy helps us maintain the safety, hygiene, and
            integrity of all food products we deliver.
          </p>
          {/* <p className="text-sm text-gray-500 mt-2">
          စိတ်ပြောင်းလဲမှု၊ မှားယွင်းစွဲယူမှုများအတွက် ပြန်အမ်းခြင်း သို့မဟုတ်
          အစားထိုးခြင်းကို မလက်ခံပါ။ အထူးသဖြင့်
          အစားအသောက်ပျက်စီးနိုင်သောပစ္စည်းများအတွက် မလက်ခံပါ။ ထုတ်ကုန်များ၏
          သန့်ရှင်းမှု၊ လုံခြုံမှုနှင့် ယုံကြည်စိတ်ချမှုကို ထိန်းသိမ်းရန်အတွက်
          ဤပေါ်လစီကို သတ်မှတ်ထားပါသည်။
        </p> */}
        </div>

        <div>
          <SectionHeader
            icon={FaExclamationTriangle}
            title="Returns & Refunds for Damaged, Defective, or Incorrect Items"
            // mm="ပျက်စီး/အမှား/အကြောင်းမဲ့ ထုတ်ကုန်များ အတွက် ငွေပြန်အမ်းခြင်းနှင့် ပြန်လည်ပေးပို့ခြင်း"
          />
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Notify us within <strong>7 days</strong> of receiving your order.
            </li>
            <li>
              Email our support team at <strong>burmeseboxx@gmail.com</strong>{" "}
              with your order number.
            </li>
            <li>
              Include clear photos of the affected item(s) and the original
              packaging.
            </li>
          </ul>
          {/* <p className="text-sm text-gray-500 mt-2">
          မှာယူပြီး ၇ ရက်အတွင်း ကျွန်ုပ်တို့အား အကြောင်းကြားပါ။ order number
          နှင့်အတူ burmeseboxx@gmail.com သို့ အီးမေးလ်ပေးပို့ပါ။
          ပျက်စီးမှုရှိသောပစ္စည်းများနှင့် original packaging ကို
          ဓာတ်ပုံဖြင့်ထည့်သွင်းပါ။
        </p> */}
          <p className="mt-2 leading-relaxed">
            Once we verify the issue, we’ll offer a resolution—this may include
            a full refund, store credit, or replacement in your next shipment.
            In some cases, we may request the item be returned at our expense.
          </p>
          {/* <p className="text-sm text-gray-500 mt-2">
          ပြဿနာကို အတည်ပြုပြီးနောက် ပြန်အမ်းငွေ၊ store credit သို့မဟုတ်
          နောက်ထပ်ပို့ဆောင်မှုတွင် အစားထိုးပစ္စည်းများကို ပေးအပ်နိုင်ပါသည်။
          တချို့အခြေအနေများတွင် ပစ္စည်းပြန်ပေးရန် တောင်းဆိုနိုင်ပြီး
          ပေးပို့ခကျွန်ုပ်တို့က ခံယူပါမည်။
        </p> */}
        </div>

        <div>
          <SectionHeader
            icon={FaBan}
            title="Non-Returnable Items"
            // mm="ပြန်မပေးနိုင်သောပစ္စည်းများ"
          />
          <ul className="list-disc ml-6 space-y-2">
            <li>Sale or clearance items are non-refundable.</li>
            <li>
              Perishable goods (e.g., dried fish, prawn, snacks, canned food).
            </li>
            <li>
              Items that have been opened, used, or are not in their original
              condition.
            </li>
          </ul>
          {/* <p className="text-sm text-gray-500 mt-2">
          ပျက်စီးနိုင်သောအစားအသောက် (ဥပမာ—ငါးခြောက်၊ ပုစွန်ခြောက်၊ မုန့်များ၊
          သံဘူးထဲထည့်ထားသောအစားအသောက်) များ၊ ဖွင့်ပြီးသုံးထားသောပစ္စည်းများ၊
          သဘာဝအခြေအနေမရှိသောပစ္စည်းများကို ပြန်မလက်ခံပါ။
        </p> */}
        </div>

        <div>
          <SectionHeader
            icon={FaMoneyBillWave}
            title="Refund Process"
            // mm="ငွေပြန်အမ်းခြင်း လုပ်ငန်းစဉ်"
          />
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Once your return is received and inspected, we’ll notify you of
              the approval or rejection of your refund.
            </li>
            <li>
              If approved, refunds will be issued to your original payment
              method within <strong>5–7 business days</strong>.
            </li>
            <li>
              Refunds apply only to damaged, defective, or incorrect items.
            </li>
            <li>
              <strong>Shipping fees</strong> from the original order are
              non-refundable.
            </li>
            <li>
              <strong>Payment processing fees</strong> (e.g., Stripe, PayPal)
              will be deducted from your refund.
            </li>
            <li>
              Refunds are processed within a few business days depending on your
              bank.
            </li>
          </ul>
          {/* <p className="text-sm text-gray-500 mt-2">
          ပြန်ပေးသည့်ပစ္စည်းကို လက်ခံပြီး စစ်ဆေးပြီးနောက် ကျွန်ုပ်တို့က သင့်အား
          အတည်ပြုချက်ပေးပါမည်။ အတည်ပြုလျှင် ၅–၇ ရက်အလုပ်လုပ်ရက်အတွင်း
          ပြန်အမ်းငွေကို သင့်အကောင့်သို့ ပြန်အမ်းပေးပါမည်။ ပြန်အမ်းငွေသည်
          ပျက်စီး/အမှား/အကြောင်းမဲ့ ထုတ်ကုန်များအတွက်သာ သက်ဆိုင်ပါသည်။
          ပထမဦးဆုံးပေးပို့မှုအတွက် ပေးဆောင်ထားသော ပို့ခများကို ပြန်အမ်းမပြုပါ။
          ငွေပေးချေမှုလုပ်ငန်းစဉ်အတွက် ကုန်ကျစရိတ်များ (ဥပမာ Stripe၊ PayPal) ကို
          ပြန်အမ်းငွေမှနုတ်ယူပါမည်။ ပြန်အမ်းလုပ်ငန်းစဉ်သည် သင့်ဘဏ်ပေါ်မူတည်၍
          ရက်အနည်းငယ်အတွင်း ပြုလုပ်ပါမည်။
        </p> */}
        </div>

        <div>
          <SectionHeader
            icon={FaEnvelopeOpenText}
            title="Late or Missing Refunds"
            //mm="နောက်ကျသည့် သို့မဟုတ် မရရှိသေးသော ပြန်အမ်းငွေ"
          />
          <ul className="list-disc ml-6 space-y-2">
            <li>Recheck your bank account or credit card statement.</li>
            <li>
              Contact your payment provider—it may take time for the refund to
              post.
            </li>
            <li>
              If still unresolved, email us at{" "}
              <strong>burmeseboxx@gmail.com</strong>.
            </li>
          </ul>
          {/* <p className="text-sm text-gray-500 mt-2">
          သင့်ဘဏ်အကောင့် သို့မဟုတ် credit card မှတ်တမ်းကို ပြန်စစ်ပါ။
          ပြန်အမ်းငွေသည် သင့်ဘဏ်ပေါ်မူတည်၍ အချိန်ယူနိုင်ပါသည်။ မရရှိသေးပါက
          burmeseboxx@gmail.com သို့ ဆက်သွယ်ပါ။
        </p> */}
        </div>

        <div>
          <SectionHeader
            icon={FaTruck}
            title="Exchanges"
            //mm="အစားထိုးခြင်း"
          />
          <p className="leading-relaxed">
            We only replace items if they are defective or damaged. If you need
            to exchange an item:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Email us within <strong>3 days</strong> of receiving your order.
            </li>
            <li>Exchanges are subject to product availability.</li>
          </ul>
          {/* <p className="text-sm text-gray-500 mt-2">
          ပျက်စီးမှုရှိသော သို့မဟုတ် အမှားပစ္စည်းများအတွက်သာ အစားထိုးပေးပါသည်။
          မှာယူပြီး ၃ ရက်အတွင်း ကျွန်ုပ်တို့အား အီးမေးလ်ပေးပို့ပါ။
          အစားထိုးပစ္စည်းများသည် လက်ရှိအရောင်းအတွက် ရရှိနိုင်မှုအပေါ်
          မူတည်ပါသည်။
        </p> */}
        </div>

        <ConditionsForReturns />

        <p className="leading-relaxed mt-10">
          Question about Refund & Return policy should be sent to us by using{" "}
          <Link
            to="/contact-us"
            className="underline text-blue-600 font-semibold"
          >
            Contact Us
          </Link>{" "}
          Form.
        </p>
        <p className="leading-relaxed">
          Thank you for shopping with BurmeseBoxx. We’re committed to bringing
          the taste of Myanmar to your doorstep—with care, quality, and
          authenticity.
        </p>
        {/* <p className="text-sm text-gray-500 mt-2">
          BurmeseBoxx တွင် စျေးဝယ်ခြင်းအတွက် ကျေးဇူးတင်ပါသည်။ မြန်မာ့အရသာကို
          သင့်အိမ်တံခါးအထိ ယုံကြည်စိတ်ချစွာ ပေးဆောင်ရန် ကျွန်ုပ်တို့ကတိပြုပါသည်။
        </p> */}
      </div>
    </div>
  );
};

export default RefundPolicy;

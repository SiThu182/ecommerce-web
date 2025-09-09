import { FaClipboardCheck } from "react-icons/fa";

const ConditionsForReturns: React.FC = () => {
  return (
    <div className="my-10 mx-10 border-2 border-gray-700 p-4 rounded-xl font-poppins">
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-center gap-3">
          <FaClipboardCheck className="text-blue-600 text-xl" />
          <h2 className="text-xl font-semibold text-gray-800">
            Conditions for Returns
          </h2>
        </div>
        {/* <p className="text-sm text-gray-500">
          ပြန်ပေးရန်အတွက် လိုအပ်သောအခြေအနေများ
        </p> */}
      </div>

      <ul className="list-disc ml-6 space-y-4 text-sm">
        <li>
          Returned items must be unused, unopened, and in their original
          condition. For packaged food, the seal must be intact and the product
          must not show any signs of tampering or spoilage.
          {/* <p className="text-sm text-gray-500 mt-1">
            ပြန်ပေးမည့်ပစ္စည်းသည် အသုံးမပြုရသေးသော၊ ဖွင့်မထားသော၊
            မူရင်းအခြေအနေရှိရမည်။ ထုပ်ပိုးထားသောအစားအသောက်များအတွက်
            သော့ခတ်ထားသောအခြေအနေရှိရမည်။ ပျက်စီးမှု သို့မဟုတ်
            ဖွင့်ထားသောအညွှန်းများ မရှိရပါ။
          </p> */}
        </li>

        <li>
          All original labels, packaging, and accessories (if any) must be
          included. This includes product tags, invoices, and any promotional
          items received with the order.
          {/* <p className="text-sm text-gray-500 mt-1">
            မူရင်း label များ၊ ထုပ်ပိုးမှုများနှင့် အပိုပစ္စည်းများ (ရှိပါက)
            ပါဝင်ရမည်။ ထုတ်ကုန် tag များ၊ ငွေတောင်းခံလွှာများနှင့်
            မှာယူမှုနှင့်အတူရရှိသော promotion ပစ္စည်းများပါဝင်ရမည်။
          </p> */}
        </li>

        <li>
          Items must be returned in the original BurmeseBoxx packaging or
          manufacturer’s box, undamaged and clean. Please avoid placing tape or
          labels directly on the product box.
          {/* <p className="text-sm text-gray-500 mt-1">
            ပစ္စည်းကို BurmeseBoxx ထုပ်ပိုးမှု သို့မဟုတ် ထုတ်လုပ်သူ၏သေတ္တာအတွင်း
            ပြန်ပေးရမည်။ ပျက်စီးမှုမရှိဘဲ သန့်ရှင်းအောင် ထိန်းသိမ်းထားရမည်။
            ထုတ်ကုန်သေတ္တာပေါ်တွင် တိပ်ကပ်ခြင်း သို့မဟုတ် label ကပ်ခြင်း
            မပြုလုပ်ပါနှင့်။
          </p> */}
        </li>

        <li>
          Perishable items such as dried fish, snacks, and canned food are not
          eligible for return unless they are damaged or incorrect upon arrival.
          {/* <p className="text-sm text-gray-500 mt-1">
            ပျက်စီးနိုင်သောပစ္စည်းများ (ဥပမာ—ငါးခြောက်၊ မုန့်များ၊
            သံဘူးထဲထည့်ထားသောအစားအသောက်) များကို ပျက်စီးခြင်း သို့မဟုတ်
            မှားယွင်းမှုရှိပါကသာ ပြန်လည်လက်ခံပါမည်။
          </p> */}
        </li>
      </ul>

      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-800">
          Note: Please clearly indicate your Order Number and Return Tracking
          Number on the return package to avoid delays or confusion.
        </p>
        {/* <p className="text-sm text-gray-500 mt-1">
          မှတ်ချက်။ ပြန်ပေးသည့်ထုပ်ပိုးမှုပေါ်တွင် Order Number နှင့် Return
          Tracking Number ကို ဖော်ပြရန် အရေးကြီးပါသည်။ မဖော်ပြပါက
          ပြန်ပေးမှုလုပ်ငန်းစဉ်တွင် နောက်ကျမှု သို့မဟုတ် အလွဲအလွတ်များ
          ဖြစ်နိုင်ပါသည်။
        </p> */}
      </div>
    </div>
  );
};

export default ConditionsForReturns;

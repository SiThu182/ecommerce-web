// import Home from "../pages/Home";

import LandingPage from "../pages/front/LandingPage";
import About from "@/pages/front/AboutUs/About";

import ClientFundSecurity from "@/pages/front/AboutUs/ClientFundSecurity";
import FeesAndCharges from "@/pages/front/AboutUs/FeesAndCharges";
import HelpCenter from "@/pages/front/AboutUs/HelpCenter";
import Cart from "@/pages/front/Cart";

import CheckOut from "@/pages/front/CheckOut";
import Contact from "@/pages/front/Contact/Contact";
// import ProductByCategory from "@/pages/front/ProductByCategory";
import ProductDetail from "@/pages/front/ProductDetail";
import Product from "@/pages/front/Product/Product";
import Package from "@/pages/front/Package";
import Wishlist from "@/pages/front/wishlist";
import BestSeller from "@/pages/front/BestSeller/BestSeller";
import Promotions from "@/pages/front/Promotion/Promotions";
import SaleProducts from "@/pages/front/Promotion/SaleProducts";
import RefundPolicy from "@/pages/RefundPolicy";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import FAQ from "@/pages/FAQ";

export const AllRoutes = [
  { path: "/", component: LandingPage },
  // { path: "/market/:data", component: MarketPage },
  { path: "/contact-us", component: Contact },
  { path: "/about-us", component: About },
  { path: "/about-us/help-center", component: HelpCenter },
  { path: "/about-us/fees-charges", component: FeesAndCharges },
  { path: "/about-us/client-fund-security", component: ClientFundSecurity },
  { path: "/refund-return", component: RefundPolicy },
  { path: "/privacy-policy", component: PrivacyPolicy },
  { path: "/terms-conditions", component: TermsOfUse },
  { path: "/faq", component: FAQ },
  { path: "/best-seller", component: BestSeller },
  { path: "/promotions", component: Promotions },
  { path: "/flash-sale", component: SaleProducts },
  { path: "/:category/product", component: Product },
  { path: "/:category/product/:product", component: ProductDetail },
  { path: "/cart", component: Cart },
  { path: "/wishlist", component: Wishlist },

  { path: "/checkout", component: CheckOut },
  { path: "/product", component: Product },
  { path: "/package", component: Package },
];

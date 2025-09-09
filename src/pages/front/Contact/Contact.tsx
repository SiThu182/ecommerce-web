import { useTranslation } from "react-i18next";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import {
  FaFacebookMessenger,
  FaFacebookF,
  FaRegClock,
  FaTiktok,
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveContactMessage } from "@/api/axiosClient";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  contactType: string;
}

function Contact() {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [contactType, setContactType] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Improved handleSubmit function with better error handling
  // Improved handleSubmit function with better error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contactType === "") {
      setError("Please select a contact method");
      return;
    }

    setIsLoading(true);
    setError("");

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const contactData: ContactFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      message: formData.get("message") as string,
      contactType: contactType === "email" ? "Email" : "Phone",
    };

    console.log("Sending contact data:", contactData);

    try {
      const response = await saveContactMessage(contactData);
      console.log("Contact message sent successfully:", response);

      // If we get here without an error being thrown, it's successful
      setShowSuccess(true);
      // Reset form after successful submission
      (e.target as HTMLFormElement).reset();
      setContactType("");
    } catch (error: any) {
      console.error("Error submitting contact form:", error);

      // More specific error handling
      if (error.response?.status === 404) {
        setError("Service temporarily unavailable. Please try again later.");
      } else if (error.response?.status === 400) {
        setError("Please check your input and try again.");
      } else if (error.message?.includes("Network Error")) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOK = () => {
    setShowSuccess(false);
    setTimeout(() => navigate("/"), 100);
  };

  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className=" font-inter font-bold text-5xl text-gray-950 mb-5 text-center">
          {t("Contact Us", { ns: "navbar" })}
        </h1>
        <div className="text-center mb-10">
          <span className="text-lg text-gray-500 text-center">
            Any question or remarks? Just write us a message!
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center mx-auto lg:mx-16 gap-20 mb-10">
          {/* Info Box */}
          <div className="w-full sm:w-2/3 md:w-2/5 rounded-xl text-white bg-blue-500 h-auto">
            <h1 className="pt-10 px-6 font-bold text-xl">
              Get In Touch With Us Now!
            </h1>
            <div className="py-10 px-6 text-sm">
              <div className="flex flex-row items-center gap-6 py-3">
                <MdOutlinePhoneInTalk className="text-xl " />
                <span>+66 969778799</span>
              </div>
              <div className="flex flex-row items-center gap-6 py-3">
                <MdOutlineMail className="text-xl" />
                <span>ozzshop@gmail.com</span>
              </div>
              <div className="flex flex-row items-center gap-6 py-3">
                <CiLocationOn className="text-4xl" />
                <span>
                  No-107, First floor, Kyun Taw Road, San Chaung Township,
                  Yangon, Myanmar
                </span>
              </div>
              <div className="flex flex-row items-center gap-6 py-3">
                <FaRegClock className="text-xl" />
                <span>
                  <span className="font-bold text-lg">Working Hours</span>
                  <br />
                  Monday To Saturday
                  <br />
                  09:00 AM To 05:00 PM
                </span>
              </div>
            </div>
            <div className="flex space-x-6 mx-6 mb-10">
              <FaFacebookF
                className="text-xl cursor-pointer hover:text-blue-300 transition-colors"
                onClick={() => window.open("https://facebook.com", "_blank")}
              />
              <FaTiktok
                className="text-xl cursor-pointer hover:text-blue-300 transition-colors"
                onClick={() => window.open("https://www.tiktok.com", "_blank")}
              />
              <FaFacebookMessenger
                className="text-xl cursor-pointer hover:text-blue-300 transition-colors"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/messages/t/275343572954922",
                    "_blank"
                  )
                }
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-3/5 space-y-12 px-5 py-5 text-xl ">
            <form className="space-y-8 w-full" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-bold text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full px-0 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm"
                    placeholder=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 block w-full px-0 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-0 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm"
                    placeholder=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    required
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="mt-1 block w-full px-0 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm"
                    placeholder=""
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-gray-700 "
                >
                  Message
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={2}
                  className="text-black mt-1 block w-full px-0 py-4 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm resize-none"
                  placeholder="Write your message."
                ></textarea>
              </div>

              <div className="mt-8">
                <p className="block font-bold text-gray-800 mb-4">
                  How would you like us to contact you?
                </p>
                <div className="flex items-center mb-2">
                  <input
                    id="contactEmail"
                    name="contactType"
                    type="radio"
                    value="email"
                    checked={contactType === "email"}
                    onChange={(e) => {
                      setContactType(e.target.value);
                      setError("");
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="contactEmail"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="contactPhone"
                    name="contactType"
                    type="radio"
                    value="phone"
                    checked={contactType === "phone"}
                    onChange={(e) => {
                      setContactType(e.target.value);
                      setError("");
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="contactPhone"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                </div>
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Success Modal */}
          {showSuccess && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl max-w-sm">
                <h3 className="text-lg font-bold mb-4">Success!</h3>
                <p>Your message has been sent successfully.</p>
                <button
                  onClick={handleOK}
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Contact;

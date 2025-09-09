import React from "react";
import { useNavigate } from "react-router";

const ResetMail: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="w-1/3 h-1/3 mt-36 items-center text-center m-auto bg-gray-100 text-blue-600 rounded-2xl shadow-sm shadow-gray-300 border-2 ">
        <div>
          <div className="flex justify-center shadow-sm shadow-black rounded-t-xl mx-0">
            <img
              src="image/logo.png"
              alt="OzzShop Logo"
              className="w-52 h-40 -mb-6"
            ></img>
          </div>
          <h3 className="text-2xl font-bold text-gray-950 mt-4">
            Verification code send successfully.
          </h3>
          <p className="my-2 text-base text-gray-600">
            Please check your email inbox and spam folder.
          </p>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/login-register")}
              className={`p-2 bg-blue-600 text-white rounded-xl mb-10 mx-10 `}
            >
              Return To Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetMail;

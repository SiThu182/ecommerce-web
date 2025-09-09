import React from 'react';
import { useParams } from "react-router-dom";

type VerificationStatus = 'success' | 'failure';

const VerificationPage: React.FC = () => {
  const { status } = useParams<{ status: VerificationStatus }>();
 

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <div className="text-center">
            <div className="text-green-500 text-4xl">✔</div>
            <h1 className="text-2xl font-bold mt-4">Verification Successful!</h1>
            <p className="mt-2 text-gray-600">Your email has been verified successfully.</p>
            <a
              href="/"
              className="mt-4 inline-block px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Go to Dashboard
            </a>
          </div>
        );
      case 'failure':
        return (
          <div className="text-center">
            <div className="text-red-500 text-4xl">✘</div>
            <h1 className="text-2xl font-bold mt-4">Verification Failed</h1>
            <p className="mt-2 text-gray-600">We couldn’t verify your email. Please try again.</p>
            <a
              href="/resend-verification"
              className="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Resend Verification Email
            </a>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-blue-500">Verifying your email...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default VerificationPage;

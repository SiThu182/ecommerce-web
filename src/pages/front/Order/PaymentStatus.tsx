import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

const PaymentStatus: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState<string | null>(null);
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [orderDetails, setOrderDetails] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const statusParam = queryParams.get("status");
//     const sessionIdParam = queryParams.get("session_id");

    setStatus(statusParam);
//     // setSessionId(sessionIdParam);

//     if (statusParam === "1" && sessionIdParam) {
//       fetchOrderDetails(sessionIdParam);
//     }
  }, [location.search]);

//   const fetchOrderDetails = async (sessionId: string) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:4242/api/payment/success?session_id=${sessionId}`);
//       setOrderDetails(response.data);
//     } catch (err: any) {
//       console.error("Error fetching order details:", err);
//       setError("Failed to retrieve payment details.");
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleGoHome = () => {
    navigate("/");
  };

  const renderStatus = () => {
    if (status === "1") {
      return (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful</h1>
          {/* {loading && <p>Loading order details...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {orderDetails && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md inline-block text-left">
              <p><strong>Customer:</strong> {orderDetails.customer_name}</p>
              <p><strong>Invoice:</strong> {orderDetails.merchant_order_id}</p>
              <p><strong>Amount:</strong> ${orderDetails.total_fees}</p>
              <p><strong>Method:</strong> {orderDetails.method_name}</p>
            </div>
          )} */}
        </div>
      );
    } else if (status === "3") {
      return (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Cancelled</h1>
          <p>Your payment was not completed.</p>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">⚠️ Unknown Payment Status</h1>
          <p>Please contact support if this issue persists.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        {renderStatus()}
        <div className="mt-6 text-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={handleGoHome}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;

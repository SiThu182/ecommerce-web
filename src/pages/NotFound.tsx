// import React from "react";

import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center card">
      <div className="w-[20rem] rounded-md shadow-md overflow-hidden">
        <div className=" p-2 bg-destructive  prose">
          <h1 className="text-blue-900">Coming Soon ....</h1>
        </div>
        <div>
          {/* <div className=" p-2  prose">
            <p className="">There is no page for this route.Please go back.</p>
          </div> */}
          <div className="flex justify-end ">
            <button
              className="bg-primary my-3  btn"
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

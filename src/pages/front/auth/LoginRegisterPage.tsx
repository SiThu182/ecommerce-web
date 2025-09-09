import axiosClient  from "@/api/axiosClient";
import AlertModal from "@/components/common/AlertModal";
import AlertNotiBar from "@/components/common/AlertNoti";
import BasicInput from "@/components/common/FormComponents/BasicInputAuth";
 
import { AxiosError } from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

  

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  code: number;
}

function LoginRegister() {
  const methods = useForm<FormData>({});
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  // const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const [notiType, setNotiType] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const navigate = useNavigate();
   const onSubmit = async (data: FormData) => {
    console.log(data);
    setLoading(true);
    try {
      const result = await axiosClient.post("/merchant-log-in", {
        email: data.email,
        password: data.password
      });
      setNotiMessage("Login Success");
      setNotiType("success");
      if (result.status == 201 || result.status == 200) {
        navigate("/dashboard", {
          state: {
            status: "success",
            message: "Login Success",
          },
        });
      }
    } catch (error) {
      setStatus("error");
      if (error instanceof AxiosError) {
        setTitle("ERROR:");
        setStatus("error");
        console.log(error, "error");
        if (error?.response?.data?.error) {
          {
            if (typeof error?.response?.data?.error == "string") {
              setStatusMessage(error?.response?.data?.error);
            } else {
              setStatusMessage("Unknown error occurs");
            }
          }
        } else {
          setStatusMessage(error?.message);
        }
      } else {
        // Handle other types of errors
        setTitle("ERROR:");
        setStatusMessage("Unknown error occurred");
      }
      setLoading(false);
      setIsOpen(true);
    }
    reset();
  };

  return (
    <div className="min-h-screen relative min-w-full flex justify-center items-center">
      {/* <div className="absolute top-5 left-5">
        <button className="btn" onClick={() => navigate("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </button>
      </div> */}
      <div
        className={
          "border-2 rounded-lg shadow-lg flex p-4 md:p-10 justify-between w-[90vw] md:w-[50vw] max-w-[600px]"
        }
      >
        <div className={`w-[100%] my-auto`}>
          <div className="prose">
            <h1 className="dark:text-white">Log in</h1>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="my-2">
                <div className="my-1">
                  <label className="text-md font-roboto">Email</label>
                </div>
                <div className="flex ">
                  <div className=" rounded-tl-md rounded-bl-md border-2 p-2 bg-gray-200 dark:bg-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <input
                    placeholder="enter email"
                    {...register("email", {
                      required: "This field is required",
                    })}
                    className="form_input dark:text-black w-full border-2 rounded-tr-md rounded-br-md h-auto p-2"
                  ></input>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="my-2">
                <BasicInput
                  inputEndIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                      />
                    </svg>
                  }
                  label="Password"
                  name="password"
                  hint="REQUIRED"
                  placeholder="write password"
                  type="password"
                  rules={{
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                      message:
                        "Must contain minimum 8 characters with at least one upper ,one lower characters, one numbers & one special character",
                    },
                  }}
                />
              </div>

              <div className=" my-3 flex justify-end">
                <button
                  className={`btn ${loading && "bg-slate-700"}`}
                  type="submit"
                  disabled={loading}
                  // onClick={() => navigate("/dashboard")}
                >
                  Log in
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      <AlertNotiBar
        isVisible={isNotiOpen}
        message={notiMessage}
        type={notiType} // Can be "success", "error", "info", or "warning"
        duration={5000} // Auto-hide after 5 seconds
        onClose={() => setIsNotiOpen(false)}
      />
      <AlertModal
        isOpen={isOpen}
        status={status}
        onClose={() => setIsOpen(false)}
        title={title}
        message={statusMessage}
        onConfirm={() => {}}
      />
    </div>
  );
}

export default LoginRegister;

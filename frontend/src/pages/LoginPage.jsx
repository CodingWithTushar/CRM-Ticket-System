import React, { useState } from "react";
import { Input } from "../components/Input";
import {
  ArrowPathIcon,
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import SideImage from "../components/SideImage";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [ShowPassoword, setShowPassoword] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const {login ,isLoggingIn} = useAuth()

  const handleOnSubmit = (e) => {
    e.preventDefault();
    login(formData)
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center font-semibold transition-all duration-200">
        <div className="bg-white flex rounded items-center p-9 shadow-xl hover:shadow-2xl gap-9">
          <div className="flex flex-col items-center justify-center">
            <h2 className="">Client Log In </h2>
            <p>Continue your journey</p>

            <form onSubmit={handleOnSubmit} className="flex flex-col">
              <Input
                Icons={<AtSymbolIcon className=" w-7 text-gray-400" />}
                type={"email"}
                label={"Email"}
                placeholder={"johnwick01@gmail.com "}
                OnChange={(e) =>
                  setformData({ ...formData, email: e.target.value })
                }
                value={formData.email}
              />

              <label className="my-2">Password</label>
              <div className="flex p-1 items-center justify-end rounded gap-3 mb-5 border border-gray-300 hover:ring-2 hover:ring-black-400">
                <LockClosedIcon className="w-9 h-9 text-gray-400" />
                <input
                  required
                  type={ShowPassoword ? "password" : "text"}
                  placeholder="Enter Your Password"
                  className="pr-10 pl-3 py-2 font-semibold w-full outline-none "
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                />
                <button
                  type="button"
                  className="flex justify-center items-center cursor-pointer absolute pr-2"
                  onClick={() => setShowPassoword(!ShowPassoword)}
                >
                  {ShowPassoword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="btn border-2 bg-black text-white"
                disabled={isLoggingIn}
              >
                 {isLoggingIn ? (
                    <>
                      <ArrowPathIcon className="animate-spin w-9 h-9 text-gray-400" />
                      Loading
                    </>
                  ) : (
                    "Log In"
                  )}
              </button>
              <hr />
              <div className="flex items-center justify-center">
               <Link to="/">Already Have an Account ?</Link>
              </div>
            </form>
          </div>
          <SideImage
            img={
              "https://media.gettyimages.com/id/1455628122/vector/crowd-of-raised-protesting-hands-and-arm-sketches.jpg?s=612x612&w=0&k=20&c=JZtcYci1D44GDx-iVUDLxWs-VQB214ymW1jQhd8cSQA="
            }
            text={"Secure Your Productivity"}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;

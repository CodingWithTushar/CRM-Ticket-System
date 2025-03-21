import React, { useState } from "react";
import { Input } from "../components/Input";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import SideImage from "../components/SideImage";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return toast.error("Full Name is  Required");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is Required");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("InValid Email Format");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is Required");
    }
    if (formData.fullName.length < 6) {
      return toast.error("Password must have more then 6 characters ");
    }

    return true;
  };

  const handleonSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (!success) {
      toast.error("Error in Handle Submit");
    }
    if (success === true) {
      console.log("Hello");
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center font-semibold ">
        <div className="bg-white flex items-center rounded p-9 shadow-xl hover:shadow-2xl gap-9 transition-all duration-200 ">
          <SideImage
            img={
              "https://media.gettyimages.com/id/1307064735/vector/people-avatar-round-icon-set-profile-diverse-empty-faces-for-social-network-vector-abstract.jpg?s=612x612&w=0&k=20&c=A0Ci57tpR4U9nreJjy2PNJDRhkj5tvRv7Mcw9kqOHFA="
            }
            text={"Transform Your Workflow"}
          />
          <div className="flex flex-col items-center justify-center">
            <h2 className="">Client Sign Up </h2>
            <p>Start your journey</p>

            <form onSubmit={handleonSubmit} className="flex flex-col">
              <Input
                Icons={<UsersIcon className=" w-7 text-gray-400" />}
                type={"text"}
                label={"Name"}
                placeholder={"John Wick "}
                OnChange={(e) =>
                  setformData({ ...formData, fullName: e.target.value })
                }
                value={formData.fullName}
              />
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
                  type={ShowPassword ? "password" : "text"}
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
                  onClick={() => setShowPassword(!ShowPassword)}
                >
                  {ShowPassword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="btn border-2 bg-black text-white"
              >
                SignUp
              </button>
              <hr />
              <div className="flex items-center justify-center">
                <Link to="/login">Already Have an Account ?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuth = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/user/signup", data);
      console.log(response.data);
      toast.success("Account created successfully");
      set({ authUser: response.data });
    } catch (e) {
      toast.error(`Error Happened in useAuth Hook ${e}`);
    } finally {
      set({ isSigingUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/user/login", data);
      console.log(response.data);
      toast.success("Logged in successfully");
      set({ authUser: response.data });
    } catch (e) {
      toast.error(`Error Happened in useAuth Hook ${e}`);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));

export default useAuth;

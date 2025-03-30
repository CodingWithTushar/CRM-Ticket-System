import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuth = create((set, get) => ({
  authUser: null,
  ticket: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCreatingTicket: false,
  isGettingAll: false,

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/user/signup", data);
      console.log(response.data);
      toast.success("Account created successfully");
      set({ authUser: response.data });
    } catch (e) {
      toast.error(`Error Happened in Signup : ${e}`);
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
      toast.error(`Error Happened in Login : ${e}`);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
      toast.success("You have Logged out successfully");
    } catch (e) {
      toast.error(`Error Happened in Logout : ${e}`);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  createticket: async (data) => {
    try {
      const response = await axiosInstance.post("/ticket/create", data);
      console.log(response.data);
      toast.success(`Ticket created successfully`);
      set({ isCreatingTicket: true });
    } catch (e) {
      toast.error(`Error Happened in Creating Ticket: ${e}`);
    } finally {
      set({ isCreatingTicket: false });
    }
  },
  getalltickets: async (clientId) => {
    try {
      const response = await axiosInstance.get("/ticket/all", clientId);
      console.log(response.clientId);
      toast.success(`Ticket fetched successfully`);
      set({ isGettingAll: true });
      set({ ticket: response.data });
    } catch (e) {
      toast.error(`Error Happened in Creating Ticket: ${e}`);
    } finally {
      set({ isGettingAll: false });
    }
  },

}));

export default useAuth;

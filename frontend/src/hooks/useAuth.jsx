import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuth = create((set) => ({
  authUser: null,
  ticket: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCreatingTicket: false,
  isGettingAll: false,
  isLoggingOut: false,
  isGettingTicket: false,

  signup: async (data) => {
    try {
      set({isSigingUp: true})
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
    
    try {
      set({ isLoggingIn: true });
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
      set({ isLoggingOut: true });
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
      toast.success("You have Logged out successfully");
    } catch (e) {
      toast.error(`Error Happened in Logout : ${e}`);
    } finally {
      set({ isLoggingOut: false });
    }
  },
  createticket: async (data) => {
    try {
      set({ isCreatingTicket: true });
      const response = await axiosInstance.post("/ticket/create", data);
      console.log(response.data);
      toast.success(`Ticket created successfully`);
    } catch (e) {
      toast.error(`Error Happened in Creating Ticket: ${e}`);
    } finally {
      set({ isCreatingTicket: false });
    }
  },
  getAllTickets: async (clientId) => {
    try {
      set({ isGettingAll: true });
      const response = await axiosInstance.get("/ticket/all", {
        params: { clientId },
      });
      const tickets = response.data;
      toast.success("Tickets fetched successfully");
      
      set({ isGettingAll: false, tickets })
      return tickets;
  
    } catch (e) {
      toast.error(`Error fetching tickets: ${e.message}`);
      set({ isGettingAll: false });
      throw e; 
    }
  },
  getticketbyid: async (_id) => {
    try {
      const response = await axiosInstance.get(`/ticket/get/${_id}`);
      toast.success("Ticket fetched successfully");
      const ticket = response.data; 
      set({ isGettingTicket: true, ticket });
      return ticket;
    } catch (e) {
      toast.error(`Error fetching ticket: ${e.message}`);
      set({ isGettingTicket: false });
      throw e; 
    }
  },
  deleteticketbyid: async (_id) => {
    try {
      await axiosInstance.post(`/ticket/delete/${_id}`);
      toast.success("Ticket deleted successfully");
    } catch (e) {
      toast.error(`Error fetching ticket: ${e.message}`);
      throw e; 
    }
  },
  closeticketbyid: async (_id) => {
    try {
      await axiosInstance.patch(`/ticket/close/${_id}`);
      toast.success("Ticket closed successfully");
    } catch (e) {
      toast.error(`Error fetching ticket: ${e.message}`);
      throw e; 
    }
  },
  updateticketbyid: async (_id , data) => {
    try {
      const response = await axiosInstance.put(`/ticket/update/${_id}` , data);
      const ticket = response.data;
      toast.success("Ticket updated successfully");
      console.log(ticket);
      return ticket
    } catch (e) {
      toast.error(`Error fetching ticket: ${e.message}`);
      throw e; 
    }
  },

}));

export default useAuth;

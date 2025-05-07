import express from "express";
import { closeTicket, createTicket, deleteTicket, getAllTickets, getTicketById, UpdateTicketById } from "../controllers/ticketcontroller.js";
import { protectRouter } from "../middleware/middleware.js";

export const TicketRouter = express.Router()

TicketRouter.post("/create" , protectRouter, createTicket)
TicketRouter.get("/all" , protectRouter , getAllTickets)
TicketRouter.put("/update/:_id" , protectRouter , UpdateTicketById)
TicketRouter.get("/get/:_id" , protectRouter , getTicketById)
TicketRouter.patch("/close/:_id" , protectRouter , closeTicket)
TicketRouter.post("/delete/:_id" , protectRouter , deleteTicket)



import express from "express";
import { closeTicket, createTicket, deleteTicket, getAllTickets, getTicketById, UpdateTicketById } from "../controllers/ticketcontroller.js";

export const TicketRouter = express.Router()

TicketRouter.post("/create", createTicket)
TicketRouter.get("/all" , getAllTickets)
TicketRouter.put("/update/:_id" , UpdateTicketById)
TicketRouter.get("/get/:_id" , getTicketById)
TicketRouter.patch("/close/:_id" , closeTicket)
TicketRouter.post("/delete/:_id" , deleteTicket)



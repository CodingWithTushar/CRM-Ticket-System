import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const TicketSchema = new Schema(
  {
    subject: { type: String, required: true },
    status: { type: String, required: true },
    addedAt: { type: Date },
  },
  { timestamps: true }
);


const TicketModel = model("Tickets", TicketSchema);

export default TicketModel 
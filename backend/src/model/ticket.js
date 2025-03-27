import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId;

const TicketSchema = new Schema(
  {
    clientId: { type: ObjectId, required: true },
    subject: { type: String, required: true },
    status: { type: String, required: true },
    conversations: [
      {
        sender: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const TicketModel = model("Tickets", TicketSchema);

export default TicketModel;

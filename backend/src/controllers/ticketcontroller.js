import mongoose from "mongoose";
import TicketModel from "../model/ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { subject, conversations, clientId } = req.body;

    if (subject.length <2 ) {
      res.status(400).json({
        message: "Subject must have more then 2 words"
      })
    }

    if (!subject || !clientId) {
      res.status(400).json({
        message: "Subject and client ID are required fields",
      });
    }
    const ticket = await TicketModel.create({
      clientId: clientId,
      subject: subject,
      status: "New",
      conversations,
    });

    if (ticket) {
      res.json({
        _id: ticket._id,
        subject: ticket.subject,
        status: ticket.status,
        conversations: ticket.conversations,
      });
    } else {
      res.status(400).json({
        message: `Can not create a new ticket`,
      });
    }
  } catch (e) {
    res.status(400).json({
      message: `Failed to create tickets due to : ${e}`,
    });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const clientId = req.user._id;

    console.log(clientId);

    if (!clientId) {
      res.status(401).json({
        message: "Authentication required to access tickets",
      });
    }
    const tickets = await TicketModel.find({
      clientId: clientId,
    });

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({
        message: "No tickets found for this account",
      });
    }

    res.json({
      tickets: tickets,
      message: "Tickets retrieved successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: `Failed to retrieve tickets due to : ${e}`,
    });
  }
};

export const UpdateTicketById = async (req, res) => {
  const {_id} = req.params;
  const { message,sender } = req.body;
  try {
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        message: "Valid ticket ID is required",
      });
    }

    if (!message) {
      res.status(400).json({
        message: "Message content is required",
      });
    }

    const updateticket = await TicketModel.findOneAndUpdate(
      {
        _id,
       
      },
      {
        $push:{
          conversations: { sender, message },
        },
        
        $set: {status: "Updated" ,  updatedAt: Date.now },
      },
      { new: true, runValidators: true }
    );

    if (!updateticket) {
      res.status(400).json({
        message: "Ticket not found or cannot be updated",
      });
    }

    res.json({
      message: "Ticket updated successfully",
      ticket: updateticket,
    });
  } catch (e) {
    res.status(400).json({
      message: `Failed to update ticket due to : ${e.message}`,
    });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const {_id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({
        message: "Invalid ticket ID format",
      });
    }

    const ticket = await TicketModel.findOne({
      _id: _id,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found or access denied",
      });
    }

    res.json({
      message: "Ticket retrieved successfully",
      ticket: ticket,
    });
  } catch (e) {
    res.status(400).json({
      message: `Failed to fetch tickets due to : ${e}`,
    });
  }
};

export const closeTicket = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({
        message: "Valid ticket ID is required",
        errorCode: "INVALID_TICKET_ID",
      });
    }

    const ticket = await TicketModel.findOneAndUpdate(
      {
        _id,
      },
      {
        status: "Closed",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ticket) {
      res.status(404).json({
        message: "Ticket not found or already closed",
      });
    }

    if (ticket._id) {
      res.json({
        message: "Ticket closed successfully",
        ticket: ticket,
      });
    } else {
      res.status(400).json({
        message: "Ticket has not been closed till now",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: `Failed to close tickets due to :${e} `,
    });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({
        message: "Invalid ticket ID format",
      });
    }

    const ticket = await TicketModel.deleteOne({
      _id: _id,
    });

    const findTicket = await TicketModel.findOne({
      _id: _id,
    });

    if (findTicket) {
      res.status(400).json({
        message: "Ticket have not deleted",
      });
    }

    if (!ticket) {
      res.status(400).json({
        message: "Ticket not found or already deleted",
      });
    }
    ``;

    res.json({
      message: "Ticket deleted successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: `Failed to close tickets due to : ${e}`,
    });
  }
};

const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  teamMemberCount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);

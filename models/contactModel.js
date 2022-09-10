const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      // required: true,
      minLength: 2,
    },
    last_name: {
      type: String,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      min: 10,
    },
    comment: {
      type: String,
      required: true,
      minLength: [10, "comment should be more than 10 characters"],
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;

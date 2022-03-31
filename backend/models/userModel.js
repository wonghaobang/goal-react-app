const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name (from user schema)"],
    },
    email: {
      type: String,
      required: [true, "Please add an email (from user schema)"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password (from user schema)"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("userModel", userSchema)

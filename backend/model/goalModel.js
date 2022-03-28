const mongoose = require("mongoose")

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      // required: true,
      required: [true, "please add a text value (from goal schema)"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("goalModel", goalSchema)

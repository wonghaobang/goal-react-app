const mongoose = require("mongoose")

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    text: {
      type: String,
      required: [true, "please add a text value (from goal schema)"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("goalModel", goalSchema)

// the schema "required field" is not to be confused with the user passing the required payload in the request body
// the schema "required" field here handles the error during the actual instance/document creation
// For example, I passed in both user and text field in the request body, but I only passed in user and
// forgot to pass in text when creating an instance ==> goalModel.create({ user, ??? })
// In short, the required field here validates the schema only, does not include whether the user passed in the required body payload

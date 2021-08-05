const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    date: String,
    company: String,
    direction: String,
    typeOfService: String,
    description: String,
    provider: { type: Schema.Types.ObjectId, ref: "User" },
    status: String
  },
  {
    timestamps: {
      createdAt: "created at",
      updatedAt: "updated at",
    },
  }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
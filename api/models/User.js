const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    lastname: String,
    phone: String,
    company: String,
    companyMail: String,
    password: String,
    textBox: String,
    guild: String,
    rol: String,
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  },
  {
    timestamps: {
      createdAt: "created at",
      updatedAt: "updated at",
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

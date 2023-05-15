
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userDetails = mongoose.Schema(
  {
    name: { type: "String", unique: true, required: true },
    contact: { type: "String", required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }

);















  // to compare password at the time of login
  userDetails.methods.matchPassword = async function (enteredPassword) {   
        return await bcrypt.compare(enteredPassword, this.password);
    };
    
    // to hasg the password nd save it
    userDetails.pre("save", async function (next) {
        if (!this.isModified) {
        next();
        }
    
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    });
  

const userModel = mongoose.model("ChatUser", userDetails);

module.exports = userModel;

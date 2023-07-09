import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    select: false
  },
  fullname: {
    type: String,
    required: [true, "Please add a fullname"],
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [40, "Name cannot be more than 40 characters"]
  }
})

const User = models.User || model('User', UserSchema)
export default User
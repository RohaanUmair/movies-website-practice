import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    accName: { type: String }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
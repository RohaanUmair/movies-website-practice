import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    accNames: { type: [String], default: ['kids'] },
    avatars: { type: [{ accName: String, avatar: Number }], default: [] }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
import mongoose from "mongoose";

const LikedMovieSchema = new mongoose.Schema({
    email: { type: String, required: true },
    accType: { type: String },
    likedMoviesArr: { type: [String], required: true },
    accName: { type: String },
});

const LikedMovie = mongoose.models.LikedMovie || mongoose.model('LikedMovie', LikedMovieSchema);

export default LikedMovie;
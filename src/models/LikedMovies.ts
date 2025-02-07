import mongoose from "mongoose";

const LikedMovieSchema = new mongoose.Schema({
    email: { type: String, required: true },
    likedMoviesArr: { type: [String], required: true },
});

const LikedMovie = mongoose.models.LikedMovie || mongoose.model('LikedMovie', LikedMovieSchema);

export default LikedMovie;
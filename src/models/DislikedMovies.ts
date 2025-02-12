import mongoose from "mongoose";

const DislikedMovieSchema = new mongoose.Schema({
    email: { type: String, required: true },
    accType: { type: String },
    dislikedMoviesArr: { type: [String], required: true },
    accName: { type: String },
});

const DislikedMovie = mongoose.models.DislikedMovie || mongoose.model('DislikedMovie', DislikedMovieSchema);

export default DislikedMovie;
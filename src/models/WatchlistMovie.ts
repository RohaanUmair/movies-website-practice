import mongoose from "mongoose";

const WatchListedMovieSchema = new mongoose.Schema({
    email: { type: String, required: true },
    accType: { type: String },
    watchlistedMoviesArr: { type: [String], required: true },
    accName: { type: String },
});

const WatchlistedMovie = mongoose.models.WatchlistedMovie || mongoose.model('WatchlistedMovie', WatchListedMovieSchema);

export default WatchlistedMovie;
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const lapTimeSchema = new Schema({
  username: String,
  userID: String,
  trackName: String,
  trackID: String,
  time: Number,
  date: Date,
});

const LapTime =
  mongoose.models.LapTime || mongoose.model("LapTime", lapTimeSchema);

export default LapTime;

import mongoose, { InferSchemaType, Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const trackSchema = new Schema({
  name: String,
  acName: String,
  country: String,
  city: String,
});

const Track = mongoose.models.Track || mongoose.model("Track", trackSchema);

export type Track = InferSchemaType<typeof trackSchema>;

export default Track;

import mongoose, { InferSchemaType, Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const lapSchema = new Schema({
  user: {
    type: {
      id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },
    required: true,
  },
  track: { type: Schema.Types.ObjectId, ref: "Track", required: true },
  lapTime: { type: Number, required: true },
  date: { type: Date, required: true },
  sectorTimes: { type: [Number], required: true },
});

const Lap = mongoose.models.Lap || mongoose.model("Lap", lapSchema);

export type Lap = InferSchemaType<typeof lapSchema>;

export default Lap;

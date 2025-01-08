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
  circuit: { type: Schema.Types.ObjectId, ref: "Circuit", required: true },
  lapTime: { type: Number, required: true },
  date: { type: Date, required: true },
  sectorTimes: { type: [Number], required: true },
});

const Lap = mongoose.models.Lap || mongoose.model("Lap", lapSchema);

export type Lap = InferSchemaType<typeof lapSchema>;

export default Lap;

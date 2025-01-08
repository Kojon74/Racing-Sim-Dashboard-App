import mongoose, { InferSchemaType, Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const circuitSchema = new Schema({
  round: { type: Number, required: true },
  grandPrix: { type: String, required: true },
  circuitName: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  flag: { type: String, required: true },
  raceDate: { type: Date, required: true },
});

const Circuit =
  mongoose.models.Circuit || mongoose.model("Circuit", circuitSchema);

export type Circuit = InferSchemaType<typeof circuitSchema>;

export default Circuit;

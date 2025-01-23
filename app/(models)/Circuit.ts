import mongoose, { HydratedDocument, InferSchemaType, Schema } from "mongoose";

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
  corners: { type: [Number], required: true },
  tag: { type: String, required: true },
  length: { type: Number, required: true },
});

const Circuit =
  mongoose.models.Circuit || mongoose.model("Circuit", circuitSchema);

export type Circuit = HydratedDocument<InferSchemaType<typeof circuitSchema>>;

export default Circuit;

import mongoose, { InferSchemaType, Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  lastOnline: { type: Date, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export type User = InferSchemaType<typeof userSchema>;

export default User;

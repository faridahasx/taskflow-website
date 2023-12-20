import mongoose from "mongoose";

const connectDB = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    console.log(`Connected to MongoDB!`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

mongoose.set("strictQuery", true);
export default connectDB;

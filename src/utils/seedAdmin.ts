import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/Admin";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: hash
  });

  console.log("Admin created");
  process.exit();
};

run();
import express from "express";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import certificateRoutes from "./routes/certificate.routes";

dotenv.config();

const app = express();

// DB
connectDB();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static
app.use(express.static(path.join(__dirname, "../public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// Global user
app.use((req, res, next) => {
  res.locals.admin = (req.session as any).admin || null;
  next();
});

// Routes
app.get("/", (req, res) => {
  if ((req.session as any).admin) return res.redirect("/dashboard");
  res.redirect("/login");
});

app.use("/", authRoutes);
app.use("/", certificateRoutes);

export default app;
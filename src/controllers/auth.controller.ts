import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Admin from "../models/Admin";

export const getLoginPage = (req: Request, res: Response) => {
  if ((req.session as any).admin) return res.redirect("/dashboard");
  res.render("auth/login", { error: null });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.render("auth/login", { error: "خطأ في البيانات" });
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    return res.render("auth/login", { error: "خطأ في البيانات" });
  }

  (req.session as any).admin = admin;
  res.redirect("/dashboard");
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => res.redirect("/login"));
};
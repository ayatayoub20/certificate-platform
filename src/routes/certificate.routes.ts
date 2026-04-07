import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  getDashboard,
  getNewCertificatePage,
  createCertificate,
  getEditCertificatePage,
  updateCertificate,
  getCertificateDetailsPage,
  deleteCertificate,
  verifyCertificatePage,
} from "../controllers/certificate.controller";

const router = Router();

router.get("/dashboard", isAuthenticated, getDashboard);

router.get("/certificates/new", isAuthenticated, getNewCertificatePage);
router.post("/certificates", isAuthenticated, createCertificate);

router.get("/certificates/:id", isAuthenticated, getCertificateDetailsPage);
router.get("/certificates/:id/edit", isAuthenticated, getEditCertificatePage);
router.post("/certificates/:id/update", isAuthenticated, updateCertificate);
router.post("/certificates/:id/delete", isAuthenticated, deleteCertificate);

router.get("/verify/:token", verifyCertificatePage);

export default router;
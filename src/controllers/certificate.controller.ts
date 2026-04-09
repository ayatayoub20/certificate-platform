import { Request, Response } from "express";
import QRCode from "qrcode";
import Certificate from "../models/Certificate";
import { generateVerificationToken } from "../utils/generateToken";
import { generatePdfFromUrl } from "../utils/pdf";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    return res.render("dashboard/index", {
      certificates,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

export const getNewCertificatePage = (req: Request, res: Response) => {
  return res.render("dashboard/new-certificate");
};

export const createCertificate = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      nationalId,
      certificateNumber,
      farmCode,
      region,
      governorate,
      center,
      mainActivity,
      totalArea,
      latitude,
      longitude,
      ownershipDocumentType,
      ownershipDocumentNumber,
      ownershipDocumentDate,
      registryNumber,
      issueDate,
      expiryDate,
    } = req.body;

    const verificationToken = generateVerificationToken();
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/verify/${verificationToken}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);

    await Certificate.create({
      fullName,
      nationalId,
      certificateNumber,
      farmCode,
      region,
      governorate,
      center,
      mainActivity,
      totalArea: Number(totalArea),
      latitude: Number(latitude),
      longitude: Number(longitude),
      ownershipDocumentType,
      ownershipDocumentNumber,
      ownershipDocumentDate: ownershipDocumentDate || null,
      registryNumber,
      issueDate,
      expiryDate,
      verificationToken,
      verificationUrl,
      qrCodeDataUrl,
    });

    return res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error creating certificate");
  }
};

export const getEditCertificatePage = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).send("Certificate not found");
    }

    return res.render("dashboard/edit-certificate", {
      certificate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

export const updateCertificate = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      nationalId,
      certificateNumber,
      farmCode,
      region,
      governorate,
      center,
      mainActivity,
      totalArea,
      latitude,
      longitude,
      ownershipDocumentType,
      ownershipDocumentNumber,
      ownershipDocumentDate,
      registryNumber,
      issueDate,
      expiryDate,
    } = req.body;

    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).send("Certificate not found");
    }

    certificate.fullName = fullName;
    certificate.nationalId = nationalId;
    certificate.certificateNumber = certificateNumber;
    certificate.farmCode = farmCode;
    certificate.region = region;
    certificate.governorate = governorate;
    certificate.center = center;
    certificate.mainActivity = mainActivity;
    certificate.totalArea = Number(totalArea);
    certificate.latitude = Number(latitude);
    certificate.longitude = Number(longitude);
    certificate.ownershipDocumentType = ownershipDocumentType;
    certificate.ownershipDocumentNumber = ownershipDocumentNumber;
    certificate.ownershipDocumentDate = ownershipDocumentDate || null;
    certificate.registryNumber = registryNumber;
    certificate.issueDate = issueDate;
    certificate.expiryDate = expiryDate;

    await certificate.save();

    return res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error updating certificate");
  }
};

export const getCertificateDetailsPage = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).send("Certificate not found");
    }

    return res.render("dashboard/show-certificate", {
      certificate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
export const getCertificatePage = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).send("Certificate not found");
    }

    return res.render("certificates/certificate", {
      certificate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).send("Certificate not found");
    }

    await Certificate.findByIdAndDelete(req.params.id);

    return res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error deleting certificate");
  }
};

export const verifyCertificatePage = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findOne({
      verificationToken: req.params.token,
    });

    if (!certificate) {
      return res.status(404).render("certificates/verify", {
        certificate: null,
        isValid: false,
      });
    }

    return res.render("certificates/verify", {
      certificate,
      isValid: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

export const downloadCertificatePdf = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).send("Certificate not found");
    }

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const certificateUrl = `${baseUrl}/certificates/${certificate._id}`;

    const pdfBuffer = await generatePdfFromUrl(certificateUrl);

    const fileName = `certificate.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", pdfBuffer.length.toString());

    return res.end(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    return res.status(500).send("Error generating PDF");
  }
};
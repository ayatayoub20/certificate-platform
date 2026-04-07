import { Schema, model } from "mongoose";

const certificateSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    nationalId: { type: String, required: true, trim: true },
    certificateNumber: { type: String, required: true, trim: true },
    farmCode: { type: String, required: true, trim: true },
    region: { type: String, required: true, trim: true },
    governorate: { type: String, required: true, trim: true },
    center: { type: String, trim: true },
    mainActivity: { type: String, required: true, trim: true },
    totalArea: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    ownershipDocumentType: { type: String, trim: true },
    ownershipDocumentNumber: { type: String, trim: true },
    ownershipDocumentDate: { type: Date },
    registryNumber: { type: String, required: true, trim: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    verificationToken: { type: String, required: true, unique: true },
    verificationUrl: { type: String, required: true },
    qrCodeDataUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Certificate", certificateSchema);
# Certificate Management & Verification Platform

A web-based platform for issuing, managing, verifying, and exporting official certificates in a secure and organized way.

## Overview

This system allows administrators to log in to a dashboard, create and manage certificates, generate a unique verification link and QR code for each certificate, and let users verify certificate authenticity through a public verification page.

The platform also supports downloading certificates as PDF files and is designed for organizations that issue official documents such as agricultural, training, or licensing certificates.

## Features

### Admin Dashboard

* Secure admin login
* View all certificates
* Add, edit, and delete certificates
* View certificate design page
* Open verification page
* Download certificate as PDF
* Logout

### Certificate Management

* Store data in MongoDB
* Generate unique verification token
* Automatic verification URL
* QR code generation per certificate

### Public Verification

* Route: `/verify/:token`
* Displays certificate details
* Prevents forgery

### PDF Export

* Download certificate as PDF
* Uses the same certificate design

## Tech Stack

* Backend: Node.js, Express
* Language: TypeScript
* Database: MongoDB (Atlas) + Mongoose
* Views: EJS
* Styling: Tailwind CSS + Custom CSS
* Auth: express-session + connect-mongo
* QR Code: qrcode
* PDF: puppeteer-core


## Project Structure

```
certificate-platform/
│
├── public/
│   ├── css/
│   └── images/
│
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── views/
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
└── tsconfig.json
```

## Main Routes

### Auth

* GET /login
* POST /login
* POST /logout

### Dashboard

* GET /dashboard

### Certificates

* GET /certificates/new
* POST /certificates
* GET /certificates/:id
* GET /certificates/:id/edit
* POST /certificates/:id/update
* POST /certificates/:id/delete
* GET /certificates/:id/pdf

### Verification

* GET /verify/:token

## How It Works

1. Admin logs in
2. Creates certificate
3. System stores it in DB
4. Generates verification token
5. Creates verification URL
6. Generates QR code
7. Certificate becomes:

   * viewable
   * editable
   * verifiable
   * downloadable as PDF

## Environment Variables

Create `.env` file:
```
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=123456
BASE_URL=http://localhost:3000
```

---

## Installation

```bash
git clone <repo>
cd certificate-platform
npm install
```

---

## Run Project

```bash
npm run seed:admin
npm run dev
```

Open:

```
http://localhost:3000/login
``` 
## Scripts

```bash
npm run dev        # run project
npm run seed:admin # create admin
npm run build      # build TS
npm start          # run production
```

## Notes

* `seed:admin` required once only
* PDF depends on Chrome/Edge (puppeteer-core)
* Templates are customizable via EJS
* Works on all devices including mobile

---

## Use Cases

* Agricultural certificates
* Training certificates
* Licensing systems
* Organization verification platforms

---


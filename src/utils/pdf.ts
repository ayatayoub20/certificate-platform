import fs from "fs";
import puppeteer from "puppeteer-core";

const getBrowserExecutablePath = (): string => {
  const possiblePaths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ];

  for (const browserPath of possiblePaths) {
    if (fs.existsSync(browserPath)) {
      return browserPath;
    }
  }

  throw new Error(
    "لم يتم العثور على Chrome أو Edge. ثبتي أحدهما أو حددي المسار يدويًا."
  );
};

export const generatePdfFromUrl = async (url: string): Promise<Buffer> => {
  const executablePath = getBrowserExecutablePath();

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
      preferCSSPageSize: true,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
};
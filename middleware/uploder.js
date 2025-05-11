const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Auto-create folders if they don't exist
const createFolders = () => {
  const baseDir = "public/uploads";
  const imageDir = path.join(baseDir, "images");
  const pdfDir = path.join(baseDir, "pdfs");

  [imageDir, pdfDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createFolders();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();

    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      cb(null, "public/uploads/images");
    } else if (ext === ".pdf") {
      cb(null, "public/uploads/pdfs");
    } else {
      cb(new Error("Unsupported file type"));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e4);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (req.body.type && req.body.type === "video") return;
    const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExt.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image and PDF files are allowed"));
    }
  },
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

module.exports = uploader;

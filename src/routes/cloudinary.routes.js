import { Router } from "express";
import { handleFileUpload } from "../controllers/cloudinary.controller";

const router = Router();
const multer = require("multer");

const upload = multer ({ dest: 'uploads'});

router.post("/upload", upload.single('image'), handleFileUpload);


export default router;
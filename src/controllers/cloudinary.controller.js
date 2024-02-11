
const cloudinary = require("cloudinary").v2;
export const handleFileUpload = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.status(200).json(result);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).send(error.message);
    }
};
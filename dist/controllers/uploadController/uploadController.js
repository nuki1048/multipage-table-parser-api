"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multerOptions_1 = require("../../options/multerOptions");
const router = (0, express_1.Router)();
router.post('/', multerOptions_1.upload.single('xlsx_file'), function (req, res) {
    if (!req.file)
        return res.status(404).json({ message: 'File not found, try again.' });
    const imageName = req.file.filename;
    return res
        .status(201)
        .send({ message: 'File successfully uploaded.', fileName: imageName });
});
exports.default = router;

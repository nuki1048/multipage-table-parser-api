"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const directoryPath = path_1.default.join(__dirname, '../../../data');
    fs_1.default.readdir(directoryPath, (err, files) => {
        if (err)
            res
                .status(500)
                .json({ message: 'Something went wrong, try again later.' });
        res.status(200).json({ data: files });
    });
});
exports.default = router;

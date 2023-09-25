"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const directoryPath = path_1.default.join(__dirname, 'data');
    (0, fs_1.readdir)(directoryPath, (err, files) => {
        if (err)
            res
                .status(400)
                .json({ message: 'Something went wrong, try again later' });
        console.log(files);
    });
});
exports.default = router;

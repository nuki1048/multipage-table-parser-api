"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const MAX_FILE_SIZE = 1 * 1000 * 1000;
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './data');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.split('.');
        cb(null, name[0] + path_1.default.extname(file.originalname));
    },
});
exports.upload = (0, multer_1.default)({
    storage: exports.storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
});

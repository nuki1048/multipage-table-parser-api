"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uploadController_1 = __importDefault(require("./controllers/uploadController/uploadController"));
const getTableController_1 = __importDefault(require("./controllers/getTableController/getTableController"));
const getListFilesController_1 = __importDefault(require("./controllers/getListFilesController/getListFilesController"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use('/upload', uploadController_1.default);
app.use('/getTable', getTableController_1.default);
app.use('/getListFiles', getListFilesController_1.default);
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

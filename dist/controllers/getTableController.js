"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const xlsx_1 = __importDefault(require("xlsx"));
const router = (0, express_1.Router)();
router.get('/:file_name', function (req, res) {
    const { file_name } = req.params;
    let table;
    try {
        table = xlsx_1.default.readFile(`./data/${file_name}`);
    }
    catch (error) {
        return res
            .status(404)
            .json({ message: 'You need to upload file before geting it' });
    }
    let objectTables = {};
    let keysInTables = {};
    const pageKeys = Object.keys(table.Sheets);
    pageKeys.map((item) => {
        if (!objectTables.hasOwnProperty(item)) {
            objectTables[item] = [];
        }
        const tableJson = xlsx_1.default.utils.sheet_to_json(table.Sheets[item]);
        keysInTables[item] = Object.keys((tableJson === null || tableJson === void 0 ? void 0 : tableJson[0]) || {});
        objectTables[item] = xlsx_1.default.utils.sheet_to_json(table.Sheets[item]);
    });
    res.json({ data: objectTables, keys: keysInTables });
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getSettings = async (req, res) => {
    try {
        const settings = await prisma_1.default.setting.findMany();
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        res.json(settingsMap);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching settings" });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        if (req.user?.role !== "ADMIN") {
            return res.status(403).json({ error: "Forbidden" });
        }
        const updates = req.body; // e.g. { primaryColor: "#fff", secondaryColor: "#000" }
        // Process each key-value pair
        for (const [key, value] of Object.entries(updates)) {
            if (typeof value === "string") {
                await prisma_1.default.setting.upsert({
                    where: { key },
                    update: { value },
                    create: { key, value },
                });
            }
        }
        res.json({ message: "Settings updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error updating settings" });
    }
};
exports.updateSettings = updateSettings;

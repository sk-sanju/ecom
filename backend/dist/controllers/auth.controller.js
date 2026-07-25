"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.updateMe = exports.getMe = exports.login = exports.register = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../prisma"));
const jwt_1 = require("../utils/jwt");
const createUser = async (req, res) => {
    try {
        if (req.user?.role !== "ADMIN") {
            return res.status(403).json({ error: "Forbidden" });
        }
        const { name, email, password, role } = req.body;
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || "CUSTOMER",
            },
            select: { id: true, name: true, email: true, role: true, createdAt: true }
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
};
exports.createUser = createUser;
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        res.status(201).json({
            user: { id: user.id, name: user.name, email: user.email, role: user.role, address: user.address },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        res.json({
            user: { id: user.id, name: user.name, email: user.email, role: user.role, address: user.address },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.user?.id },
            select: { id: true, name: true, email: true, role: true, address: true, createdAt: true },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching user profile" });
    }
};
exports.getMe = getMe;
const updateMe = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        const updateData = {};
        if (name)
            updateData.name = name;
        if (email)
            updateData.email = email;
        if (address !== undefined)
            updateData.address = address;
        if (password) {
            const salt = await bcryptjs_1.default.genSalt(10);
            updateData.password = await bcryptjs_1.default.hash(password, salt);
        }
        const user = await prisma_1.default.user.update({
            where: { id: req.user?.id },
            data: updateData,
            select: { id: true, name: true, email: true, role: true, address: true, createdAt: true },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating user profile" });
    }
};
exports.updateMe = updateMe;
const getUsers = async (req, res) => {
    try {
        if (req.user?.role !== "ADMIN") {
            return res.status(403).json({ error: "Forbidden" });
        }
        const users = await prisma_1.default.user.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true },
            orderBy: { createdAt: "desc" },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
};
exports.getUsers = getUsers;

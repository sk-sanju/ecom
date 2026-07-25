"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const offer_controller_1 = require("../controllers/offer.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get('/', offer_controller_1.getAllOffers);
router.post('/', auth_1.authenticate, auth_1.requireAdmin, offer_controller_1.createOffer);
router.put('/:id', auth_1.authenticate, auth_1.requireAdmin, offer_controller_1.updateOffer);
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, offer_controller_1.deleteOffer);
exports.default = router;

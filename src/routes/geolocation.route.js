import { Router } from "express";
import { getGelocation } from "../controllers/geolocation.controller.js";

const router = Router();

router.get("/", getGelocation);

export default router;
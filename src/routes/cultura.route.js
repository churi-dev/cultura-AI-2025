import { Router } from "express";
import { getCultura } from "../controllers/cultura.controller.js";

const router = Router();

router.get("/", getCultura);

export default router;
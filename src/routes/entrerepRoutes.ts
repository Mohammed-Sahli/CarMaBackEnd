import express from "express";
import { createEntrerep, deleteEntrerep, getAllEntrerep, updateEntrerep } from "../controllers/entrerepControllers";

const router = express.Router()

router.post("/create", createEntrerep);

router.post("/update", updateEntrerep);

router.post("/delete", deleteEntrerep);

router.get("/list", getAllEntrerep);

export default router;
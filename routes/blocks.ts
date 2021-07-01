import express, { Router } from "express";
import { getAllBlocks, getBlock } from "../controllers/blocks";

const router: Router = express.Router();

router.route("/").get(getAllBlocks);

router.route("/:hash").get(getBlock);

export default router;

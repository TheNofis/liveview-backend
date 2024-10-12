import { Router } from "express";
import controller from "../controller/iframeController.js";

const router = Router();

router.get("/", controller.renderIframe);
router.get("/*", controller.getFiles);
export default router;

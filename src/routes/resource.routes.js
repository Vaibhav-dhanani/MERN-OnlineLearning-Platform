import { Router } from "express";
import { deleteResource, getResources, insertResource, updateResource } from "../controller/resource.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authenticateToken)
router.route("/").get(getResources).post(insertResource)
router.route("/update/:id").put(updateResource)
router.route("/delete/:id").delete(deleteResource);

export default router;
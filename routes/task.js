import express from "express";
import {
  newATask,
  myTask,
  deleteTask,
  updateTask,
} from "../controlers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/my", isAuthenticated, myTask);

router.post("/new", isAuthenticated, newATask);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated, deleteTask);

export default router;

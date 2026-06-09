import { Router } from "express";

import admin from "../middlewares/admin.js";
import controller from "../controllers/adminController.js";
import validation from "../middlewares/validation.js";
import schema from "../middlewares/schemas/showtime.schema.js";

const router = Router();

router.post(
  "/showtimes",
  validation(schema.createShowtime, "body"),
  admin,
  controller.createShowtime,
);

router.get("/showtimes", admin, controller.getShowtime);

router.delete("/showtimes/:id", admin, controller.deleteShowtimes);

router.get("/admin_panel", (req, res) => {
  res.render("admin");
});

export default router;

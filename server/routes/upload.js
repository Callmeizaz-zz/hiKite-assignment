import express from "express";
import models from "../models/index.js";
import _ from "lodash";

const router = express.Router();

router.post("/", async (req, res) => {
  const body = req.body;
  if (body) {
    await models.User.create({
      email: body.email,
    })
      .then(async (user) => {
        const userId = user.id;
        await models.File.create({
          name: body.name,
          type: body.type,
          data: body.data,
          userId: userId,
        });
        res.json({ message: "Successfully uploaded" });
      })
      .catch((err) => {
        if (err) {
          err.errors.map((x) => res.json({ error: x.message }));
        }
      });
  }
});

export default router;

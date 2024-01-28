const express = require("express");
const Content = require("../models/content");
const router = new express.Router();

router.get("/content", async (req, res) => {
  try {
    const resultData = await Content.find();
    res.status(200).send(resultData);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.post("/content",upload.single('file'), async (req, res) => {
//   try {
//     const data = new Content(req.body);
//     const resultData = await data.save();
//     res.status(200).send(resultData);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

router.patch("/content", async (req, res) => {
  try {
    const _id = req.query.id;
    const resultData = await Content.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(resultData);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/content", async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).send("Invalid id");
    }
    const resultData = await Content.findByIdAndDelete(req.query.id);
    res.status(200).send(resultData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

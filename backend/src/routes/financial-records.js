import express from "express";
import FinancialRecordModel from "../schema/financial-record.js";

const router = express.Router();

router.get("/getAllByUserID/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });
    if (records.length === 0) {
      res.status(200);
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!record) {
      res.status(200);
    }
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) {
      res.status(200);
    }
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;

import express = require("express");
// Load models
import { UserModel } from "../models/index";
const router = express.Router();

const validateField = async (req, res) => {
  let { name } = req.body;
  if (!name) {
    res
      .status(400)
      .json({ message: "Name field is required to create a new user." });
    return false;
  }

  return true;
};

const validateExistence = async (req, res) => {
  let { name } = req.body;
  const userExists = await UserModel.exists({ name: name });
  if (userExists) {
    res.status(400).json({
      message: "This user already exists."
    });
    return false;
  }
  return true;
};

const validateNotExist = async (req, res) => {
  let { name } = req.body;
  const userExists = await UserModel.exists({ name: name });
  if (!userExists) {
    res.status(400).json({
      message: "This user does not exists."
    });
    return false;
  }
  return true;
};

// ADD USER
router.post("/", async (req, res) => {
  try {
    let fieldCheck = await validateField(req, res);
    let existCheck = await validateExistence(req, res);
    if (existCheck && fieldCheck) {
      let user = new UserModel({
        name: req.body.name
      });
      await user.save();
      res.send(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
router.get("/all", async (req, res) => {
  try {
    let users = await UserModel.find().exec();
    res.send(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER BY NAME
router.get("/", async (req, res) => {
  try {
    let fieldCheck = await validateField(req, res);
    let existCheck = await validateNotExist(req, res);
    if (existCheck && fieldCheck) {
      let users = await UserModel.findOne({
        name: req.body.name
      });
      res.send(users);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE BY ID
router.put("/", async (req, res) => {
  try {
    let fieldCheck = await validateField(req, res);
    let existCheck = await validateExistence(req, res);
    if (existCheck && fieldCheck) {
      let user = await UserModel.findByIdAndUpdate(req.body.id, {
        name: req.body.name
      });
      if (user) {
        res.status(200).json({ message: "Successfully updated" });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER BY NAME
router.delete("/", async (req, res) => {
  try {
    let fieldCheck = await validateField(req, res);
    let existCheck = await validateNotExist(req, res);
    if (existCheck && fieldCheck) {
      await UserModel.findOneAndDelete({ name: req.body.name });
      res.json({ message: "Successfully deleted" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

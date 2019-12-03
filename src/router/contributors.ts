import express = require("express");
// Load models
import { PostModel, ContributorModel } from "../models/index";
const router = express.Router();

const validateField = async (req, res) => {
  let { contributor } = req.body;
  if (!contributor) {
    res.status(400).json({ message: "Fields are required." });
    return false;
  }

  return true;
};

const validateExistence = async (req, res, value) => {
  const valExists = await ContributorModel.exists({ name: value });
  if (valExists) {
    res.status(400).json({
      message: "This user already exists."
    });
    return false;
  }
  return true;
};

// const validateNotExist = async (req, res, val) => {
//   const userExists = await ContributorModel.exists({ name: val });
//   if (!userExists) {
//     res.status(400).json({
//       message: "This user does not exists."
//     });
//     return false;
//   }
//   return true;
// };

// const fetchUser = async name => {
//   let author = await UserModel.findOne({ name: name });
//   return author;
// };

const fetchPost = async title => {
  let post = await PostModel.findOne({ content: title });
  return post;
};

// const fetchContributor = async contributor => {
//   let contrib = await ContributorModel.findOne({ name: contributor });
//   return contrib;
// };

// ADD LIKE
router.post("/", async (req, res) => {
  try {
    let { content, contributor } = req.body;
    let post = await fetchPost(content);
    const valExists = await ContributorModel.exists({
      name: contributor,
      posts: post
    });

    if (valExists) {
      res.status(400).json({
        message: "This already exists."
      });
    } else {
      if (contributor) {
        console.log("H", req.body);

        //CREATE NEW LIKE
        let contrib = new ContributorModel({
          name: contributor
        });

        await contrib.save();
        if (post) {
          //UPDATE USER WITH NEW POST
          post = await PostModel.findOne({ content: content });
          await PostModel.findOneAndUpdate(
            { content: content },
            { $push: { contributors: contrib } }
          );
          await ContributorModel.findOneAndUpdate(
            { name: req.body.contributor },
            { $push: { posts: post } }
          );
        }

        res.send(contrib);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CONTRIBUTORS
router.get("/all", async (req, res) => {
  try {
    let contribs = await ContributorModel.find().exec();
    res.send(contribs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CONTRIBUTORS BY POST
router.get("/post", async (req, res) => {
  try {
    let { content } = req.body;

    if (!content) {
      res.status(400).json({ message: "Fields are required." });
    } else {
      let post = await fetchPost(content);
      let results = await ContributorModel.find({
        posts: post
      });
      res.send(results);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CONTRIBUTORS BY NAME
router.get("/", async (req, res) => {
  try {
    let { contributor } = req.body;

    if (!contributor) {
      res.status(400).json({ message: "Fields are required." });
    } else {
      let contrib = await ContributorModel.findOne({
        name: contributor
      });
      res.send(contrib);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE CONTRIBUTOR NAME
router.put("/", async (req, res) => {
  try {
    // CHECK IF EXISTS
    let { contributor } = req.body;
    let fieldCheck = await validateField(req, res);
    let existCheck = await validateExistence(req, res, contributor);
    if (existCheck && fieldCheck) {
      // UPDATE POST MODEL WITH LIKE
      await ContributorModel.findByIdAndUpdate(req.body.id, {
        name: contributor
      });
      res
        .status(200)
        .json({ message: `${req.body.contributor} was successfully updated.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE BY CONTENT
router.delete("/", async (req, res) => {
  try {
    // CHECK IF USER EXISTS
    let { id } = req.body;
    if (id) {
      await ContributorModel.findByIdAndRemove(id);
      res.status(200).json({ message: "Successfully deleted" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

import express = require("express");
// Load models
import { UserModel, PostModel, ContributorModel } from "../models/index";
const router = express.Router();

// const validateField = async (req, res) => {
//   let { author, content } = req.body;
//   if (!author || !content) {
//     res.status(400).json({ message: "Fields are required." });
//     return false;
//   }

//   return true;
// };

// const validateExistence = async (req, res) => {
//   let { author } = req.body;
//   const userExists = await UserModel.exists({ name: author });
//   if (userExists) {
//     res.status(400).json({
//       message: "This user already exists."
//     });
//     return false;
//   }
//   return true;
// };

// const fetchPost = async title => {
//   let post = await PostModel.findOne({ content: title });
//   return post;
// };

// const validateNotExist = async (req, res) => {
//   let { author } = req.body;
//   const userExists = await UserModel.exists({ name: author });
//   if (!userExists) {
//     res.status(400).json({
//       message: "This user does not exists."
//     });
//     return false;
//   }
//   return true;
// };

const fetchUser = async name => {
  let author = await UserModel.findOne({ name: name });
  return author;
};

// ADD POST
router.post("/", async (req, res) => {
  try {
    let { author, content, contributor } = req.body;
    if (content) {
      console.log(req.body);
      //CREATE NEW POST
      let post = new PostModel({
        content: content
      });
      if (author) {
        author = await UserModel.findOne({ name: author });
        post.author = author;
        //UPDATE USER WITH NEW POST
        await UserModel.findOneAndUpdate(
          { name: req.body.author },
          { $push: { posts: post } }
        );
      }
      await post.save();
      if (contributor) {
        contributor = await ContributorModel.findOne({ name: contributor });
        await ContributorModel.findOneAndUpdate(
          { name: req.body.contributor },
          { $push: { posts: post } }
        );
        await PostModel.findOneAndUpdate(
          { content: post.content },
          { $push: { contributors: contributor } }
        );
      }

      res.send(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS
router.get("/all", async (req, res) => {
  try {
    let posts = await PostModel.find().exec();
    res.send(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST BY AUTHOR
router.get("/author", async (req, res) => {
  try {
    let { author } = req.body;
    if (!author) {
      res.status(400).json({ message: "Author field is required." });
    } else {
      let user = await fetchUser(author);
      let results = await PostModel.find({
        author: user
      });
      res.send(results);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST BY CONTENT
router.get("/author", async (req, res) => {
  try {
    let { content } = req.body;
    if (!content) {
      res.status(400).json({ message: "Author field is required." });
    } else {
      let post = await PostModel.find({
        content: content
      });
      res.send(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/", async (req, res) => {
  try {
    let { content, id } = req.body;
    if (content && id) {
      await PostModel.findByIdAndUpdate(id, { content: content });

      res
        .status(200)
        .json({ message: `${req.body.content} was successfully updated.` });
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
      await PostModel.findByIdAndRemove(id);
      res.status(200).json({ message: "Successfully deleted" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

const PostSchema = new Schema({
  content: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contributor"
    }
  ]
});

const LikeSchema = new Schema({
  liked: {
    type: Boolean,
    default: false
  },
  post: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

const ContributorSchema = new Schema({
  name: {
    type: String
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

const UserModel = mongoose.model("User", UserSchema);
const PostModel = mongoose.model("Post", PostSchema);
const LikeModel = mongoose.model("Like", LikeSchema);
const ContributorModel = mongoose.model("Contributor", ContributorSchema);

export { UserModel, PostModel, LikeModel, ContributorModel };

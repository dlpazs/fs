import * as React from "react";

type PostFormProps = {
  name: string;
  content: string;
  onChange: (e) => any;
  onSubmit: (e) => any;
};

export const PostForm: React.FunctionComponent<PostFormProps> = ({
  name,
  onChange,
  onSubmit,
  content
}) => (
  <div>
    <form onSubmit={onSubmit}>
      Add Post
      <br />
      <input
        value={content}
        onChange={onChange}
        name="content"
        placeholder="Content"
        required
      />
      <input
        value={name}
        onChange={onChange}
        name="name"
        placeholder="User"
        required
      />
      <button type="submit">Submit</button>
    </form>
  </div>
);

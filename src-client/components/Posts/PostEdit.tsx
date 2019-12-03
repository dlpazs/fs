import * as React from "react";

type PostFormProps = {
  content: string;
  idx: number;
  onChange: (e) => any;
  onSubmit: (idx) => any;
};

export const PostEdit: React.FunctionComponent<PostFormProps> = ({
  content,
  onChange,
  onSubmit
}) => (
  <div>
    <form onSubmit={onSubmit}>
      Edit Post {content}
      <br />
      <input value={content} onChange={onChange} />
      <button type="submit">Edit</button>
    </form>
  </div>
);

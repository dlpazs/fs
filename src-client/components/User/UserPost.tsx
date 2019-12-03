import * as React from "react";

type UserFormProps = {
  name: string;
  content: string;
  idx: number;
  onChange: (e) => any;
  onSubmit: (idx) => any;
};

export const UserPost: React.FunctionComponent<UserFormProps> = ({
  content,
  onChange,
  onSubmit,
  name
}) => (
  <div>
    <form onSubmit={onSubmit}>
      Add Post for {name}
      <br />
      <input value={content} name="content" onChange={onChange} />
      <button type="submit">Add</button>
    </form>
  </div>
);

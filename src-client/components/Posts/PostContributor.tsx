import * as React from "react";

type PostFormProps = {
  name: string;
  content: string;
  idx: number;
  onChange: (e) => any;
  onSubmit: (idx) => any;
};

export const PostContributor: React.FunctionComponent<PostFormProps> = ({
  content,
  onChange,
  onSubmit,
  name
}) => (
  <div>
    <form onSubmit={onSubmit}>
      Add Contributor {name}
      <br />
      <input value={name} name="contributor" onChange={onChange} />
      <button type="submit">Add</button>
    </form>
  </div>
);

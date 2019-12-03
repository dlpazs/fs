import * as React from "react";

type PostFormProps = {
  idx: number;
  onSubmit: (idx) => any;
};

export const PostDelete: React.FunctionComponent<PostFormProps> = ({
  idx,
  onSubmit
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <button>Delete</button>
    </form>
    <br />
  </div>
);

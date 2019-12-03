import * as React from "react";

type UserFormProps = {
  idx: number;
  onSubmit: (idx) => any;
};

export const UserDelete: React.FunctionComponent<UserFormProps> = ({
  idx,
  onSubmit
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <button type="submit">Delete</button>
    </form>
  </div>
);

import * as React from "react";

type UserFormProps = {
  name: string;
  idx: number;
  onChange: (e) => any;
  onSubmit: (idx) => any;
};

export const UserEdit: React.FunctionComponent<UserFormProps> = ({
  name,
  onChange,
  onSubmit
}) => (
  <div>
    <form onSubmit={onSubmit}>
      Edit User {name}
      <br />
      <input value={name} onChange={onChange} />
      <button type="submit">Edit</button>
    </form>
  </div>
);

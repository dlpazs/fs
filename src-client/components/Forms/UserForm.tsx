import * as React from "react";

type UserFormProps = {
  name: string;
  onChange: (e) => any;
  onSubmit: (e) => any;
};

export const UserForm: React.FunctionComponent<UserFormProps> = ({
  name,
  onChange,
  onSubmit
}) => (
  <div>
    <form onSubmit={onSubmit}>
      Add User
      <br />
      <input value={name} name="name" onChange={onChange} />
      <button>Add User</button>
    </form>
  </div>
);

import * as React from "react";

type ContributorFormProps = {
  name: string;
  idx: number;
  onChange: (e) => any;
  onSubmit: (idx) => any;
};

export const ContributorEdit: React.FunctionComponent<ContributorFormProps> = ({
  name,
  onChange,
  onSubmit
}) => (
  <div>
    <form onSubmit={onSubmit}>
      Edit Contributor {name}
      <br />
      <input value={name} onChange={onChange} />
      <button type="submit">Edit</button>
    </form>
  </div>
);

import * as React from "react";

type ContributorProps = {
  idx: number;
  onSubmit: (idx) => any;
};

export const ContributorDelete: React.FunctionComponent<ContributorProps> = ({
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

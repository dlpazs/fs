import * as React from "react";

type ContributorFormProps = {
  content: string;
  idx: number;
  onChange: (e) => any;
  onSubmit: (idx?, e?) => any;
};

export const ContributorPost: React.FunctionComponent<ContributorFormProps> = ({
  content,
  idx,
  onChange,
  onSubmit
}) => (
  <div>
    <form onSubmit={onSubmit}>
      Add Post for Contributor {name}
      <br />
      <input value={content} name="content" onChange={onChange} />
      <button type="submit">Add</button>
    </form>
  </div>
);

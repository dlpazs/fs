import * as React from "react";

type ContributorFormProps = {
  name: string;
  content: string;
  onChange: (e) => any;
  onSubmit: (e) => any;
};

export const ContributorForm: React.FunctionComponent<ContributorFormProps> = ({
  name,
  onChange,
  onSubmit,
  content
}) => (
  <div>
    <form onSubmit={onSubmit}>
      Add Contributor
      <br />
      <input
        value={content}
        onChange={onChange}
        name="content"
        placeholder="Content"
      />
      <input
        value={name}
        onChange={onChange}
        name="name"
        placeholder="Contributor"
        required
      />
      <button type="submit">Submit</button>
    </form>
  </div>
);

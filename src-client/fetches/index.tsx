import axios from "axios";

const BASE_URL_DEV = process.env.BASE_URL || "http://localhost:3000";

export const fetchAll = (extension: string, updating) => {
  fetch(`${BASE_URL_DEV}/${extension}/all`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      response.forEach(element => {
        this.setState({
          updating: [...this.state.updating, element]
        });
        console.log(element);
      });
      console.log("Res", response.data);
    })
    .catch(err => console.log(err));
};

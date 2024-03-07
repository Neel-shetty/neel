// import data from "../instagram_posts.json" assert { type: "json" };
// console.log(data);
fetch("../instagram_posts.json")
  .then((response) => response.json())
  .then((json) => console.log(json));

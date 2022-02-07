import app from "./app";
import config from "./config/config";
const { port } = config;
app.listen(port, (/*err*/) => {
  // if (err) {
  //   console.log(err);n
  // }
  console.log(`Listening on port ${port}`);
});

export default app;
// babel-node --extensions \".ts\" index.ts
// webpack --mode=development --config ./webpack.config.js && node ./dist/bundle.js

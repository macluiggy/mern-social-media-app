const isProduction = !true;
export const path = isProduction
  ? "https://macluiggy-social-media-app.herokuapp.com"
  : "http://localhost:3000";

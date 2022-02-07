import { signout } from "./api-auth";
import { iUserSignIn } from "./types";
const auth = {
  authenticate(jwt: iUserSignIn, cb) {
    // console.log(jwt);
    /**token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDMxMjE4MTZ9.M2zL2MnGqOvFS6lPbQ3QxeHengi5YU-8d8GrCvWXXiM"
user:
created: "2022-01-17T16:52:51.535Z"
email: "luiggy@gmail.com"
name: "luiggy"
updated: "2022-01-25T02:13:08.989Z"
__v: 0
_id: "61e59ee3e46097a260807fc5" */
    if (typeof window !== undefined)
      sessionStorage.setItem("jwt", JSON.stringify(jwt)); // if we are in the browser, store the jwt in sessionStorage
    cb(); // call the callback that define actions to be executed after authentication
  },
  isAuthenticated() {
    // let test = typeof window == "undefined" && !sessionStorage.getItem("jwt");
    // let jwt = sessionStorage.getItem("jwt");

    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt")) {
      // let parsedJwt = JSON.parse(jwt);
      // console.log(parsedJwt, "este es el token");
      // return parsedJwt;
      return true;
    }
    // parse method is the opposite of stringify
    else return false;
  },
  returnUser(): any {
    if (this.isAuthenticated()) {
      return JSON.parse(sessionStorage.getItem("jwt") as string); // you can also use ! as sessionStorage.getItem("jwt")! to indicate that the value is not null
    }
    return { user: "not found" };
  },
  clearJWT(cb) {
    if (typeof window !== undefined) sessionStorage.removeItem("jwt"); // if we are in the browser, remove the jwt from sessionStorage
    cb(); // call the callback to dictate what should happen after a successful sign-out.
    signout().then((data) => {
      // if cookies are used to store credentials, then clear them with the signout method from api-auth.ts
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};
export default auth;
const a = false || true;
console.log(a);

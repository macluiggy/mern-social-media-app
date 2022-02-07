const getUniqueErrorMessage = (err) => {
  let output;
  try {
    let fieldName = err.message.substring(
      err.message.lastIndexOf(".$") + 2,
      err.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "Unique filed already exists";
  }
  return `Database Error: ${output}`;
};

const getErrorMessage = (err: any) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      // for case 11000 or 11001 (duplicate key error)
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }
  return message;
};

export default { getErrorMessage };

// let str = ".$hola.$mi llave como esta _1 todo bien _1";
// let str2 = str.substring(str.lastIndexOf(".$") + 2, str.lastIndexOf("_1"));
// console.log(str2); // mi llave como esta _1 todo bien

// console.log(str.charAt(0));

// const arr = [1, 2, 3];
// const sumNums = (num, arr: number[]) => {
//   return arr.reduce((acc, curr) => acc + curr, num);
// };
// console.log(sumNums(1, arr));
// import { log } from "console";

// log("hello");

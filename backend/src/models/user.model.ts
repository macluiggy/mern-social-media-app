import { Schema, model, Document } from "mongoose";
import crypto from "crypto";
interface IUser {
  name: string;
  email: string;
  hashed_password?: string;
  salt?: string;
  updated: Number;
  created: Date;
}

interface InstanceMethods {
  encryptPassword(password: string): string;
  authenticate(text: string): string;
  makeSalt(): string;
}

export interface IUserDoc extends IUser, InstanceMethods, Document {
  _password: string;
}
const UserSchema = new Schema<IUserDoc>({
  name: { type: String, trim: true, required: [true, "Name is required"] },
  email: {
    type: String,
    trim: true,
    unique: true, // the email must be unique
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ], // and the email must be a valid email
    required: [true, "Email already exists"],
  },
  created: { type: Date, default: Date.now }, // the type of the field is Date, and the default value is the current date
  updated: Date, // the date is updated automatically
  hashed_password: { type: String, required: [true, "Password is required"] },
  salt: String,
});

UserSchema.virtual("password")
  .set(function (this: IUserDoc, password: string) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (this: IUserDoc) {
    return this._password;
  });

UserSchema.path("hashed_password").validate(function (
  this: IUserDoc,
  v: string
) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
},
undefined);

UserSchema.methods = {
  authenticate: function (plainText: string): boolean {
    return this.encryptPassword(plainText) === this.hashed_password; // verify that the converted plain text to hash password is equal to the hashed password previously stored
  },
  encryptPassword: function (password: string): string {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt) // create a hash using the salt
        .update(password) // update the hash with the password
        .digest("hex"); // the disgest is a method that converts the hash to a hexadecimal string
    } catch (err) {
      return "";
    }
  },
  makeSalt(): string {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};
export default model<IUserDoc>("User", UserSchema);

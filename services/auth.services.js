import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/users.model.js";
import { validateEmail } from "../utils/validateEmail.js";
import { validatePassword } from "../utils/validatePassword.js";

export const registerUser = async ({ firstname, lastname, email, password
}) => {
  //Required fields cannot be empty
  if (!firstname || !lastname ||!email || !password) {
    const error = new Error("Firstname, lastname, email and password is required");
    error.statusCode = 400;
    throw error;
  }
  //Email validation
  if (!validateEmail(email)) {
    const error = new Error("Invalid email format");
    error.statusCode = 400;
    throw error;
  }
  //Password validation
  if (!validatePassword(password)) {
    const error = new Error("Password must be at least 8 characters");
    error.statusCode = 400;
    throw error;
  }
  //Email must be unique. Checking for existing email
  const existingUser = await Users.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("User already exists!");
    error.statusCode = 409;
    throw error;
  }
  //Password must be hashed before storing
  const hashedPassword = await bcrypt.hash(password, 10); // always 10 binary to decimal base 10
  const user = await Users.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  return user;
};

//Login user. Find user in database with email
export const loginUser = async ({ email, password }) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }
  //Check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  //Check if user is active in order to login
  if (!user.isActive) {
    const error = new Error("Your account has been deactivated");
    error.statusCode = 403;
    throw error;
  }

  //After logging in, user gets a token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: 3600 },
  );
  return {token, user};
};

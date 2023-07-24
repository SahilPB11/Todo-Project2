import { User } from "../modals/schema.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../uils/features.js";
import ErrorHandler from "../uils/errorHandler.js";

// get all users infromation router
export const getAllUser = async (req, res) => {
  res.send("nice working");
};

// register router
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("user already exist", 404));

    const hashpassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashpassword });

    // calling a function from another utils
    sendCookie(res, user, 201, "Registerd Succesfully");
  } catch (error) {
    next(error);
  }
};

// handling login router
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email", 400));

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) return next(new ErrorHandler("Invalid password"));

    sendCookie(res, user, 200, `Welcome back ${user.name}`);
  } catch (error) {
    next(error);
  }
};

// to know the current user session
export const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// thats a logout page
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "session finish / Logout succesfull",
    });
};

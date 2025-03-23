import UserModel from "../model/user.js";
import bcrypt from "bcryptjs";
import { generatetoken } from "../utils/generatetoken.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 8) {
      res.json({
        message: "Password must have more then 8 Characters",
      });
    }

    const salt = await bcrypt.genSalt(7);

    const hasedPassword = await bcrypt.hash(password, salt);

    const find = await UserModel.findOne({ email });

    const users = await UserModel.create({
      fullName: fullName,
      email: email,
      password: hasedPassword,
    });

    if (find) {
      res.status(400).json({
        message: "Email Exist Already",
      });
    }
    if (users) {
      res.json({
        fullName: users.fullName,
        email: users.email,
        password: users.password,
        _id: users._id,
        message: "You have Sign Up Successfully",
      });
    } else {
      res.status(404).json({
        message: "SomeThing want Wrong",
      });
    }

    if (!users) {
      res.json({
        message: "Credentails does not match",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "InValid Credentails",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      email:email,
    });

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      res.json({
        message: "Password does not match",
      });
    }

    generatetoken(user._id , res)

    res.json({
      email: user.email,
      password: user.password,
      message: "You have log in successfully",
    });
  } catch (e) {
    console.log(`Error Happened While Authorizing User ${e}`)
    res.status(401).json({
      message: "User UnAuthorized",
    });
  }
};
export const logout = async () => {};

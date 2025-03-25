import UserModel from "../model/user.js";
import bcrypt from "bcryptjs";
import { generatetoken } from "../utils/generatetoken.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.length < 8) {
      res.status(400).json({
        message: "Password must have more then 8 Characters",
      });
    }

    if (!fullName || !email || !password) {
      res.status(400).json({
        message: "Please provide all details correctly",
      });
    }
    const find = await UserModel.findOne({ email });

    if (find) {
      res.status(400).json({
        message: "Email Exist Already",
      });
    }

    const salt = await bcrypt.genSalt(7);
    const hasedPassword = await bcrypt.hash(password, salt);

    const users = await UserModel.create({
      fullName: fullName,
      email: email,
      password: hasedPassword,
    });

    if (users) {
      generatetoken(`${users._id} `, res);
      await users.save();

      res.json({
        fullName: users.fullName,
        email: users.email,
        password: users.password,
        _id: users._id,
        message: "You have Sign Up Successfully",
      });
    } else {
      res.status(404).json({
        message: "InValid Data",
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
      email: email,
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      res.json({
        message: "Password does not match",
      });
    }

    await generatetoken(user._id, res);
    res.json({
      email: user.email,
      password: user.password,
      message: "You have log in successfully",
    });
  } catch (e) {
    console.log(`Error Happened While Authorizing User ${e}`);
    res.status(401).json({
      message: "User UnAuthorized",
    });
  }
};

export const getUsers = async (req , res) => {
  const user = req.user
  try {
    res.json({
      user
    })
    console.log(user)
  } catch (e) {
    res.status(404).json({
      message: "User not found"
    })
  }

}

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "You have been log out successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: `Error happened while loging out the user ${e}`
    })
    console.error
  }
};

const bcrypt = require("bcryptjs");
const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  let { email, password, fullname } = req.body;
  let oneUser = await userModel.findOne({ email: email });

  if (oneUser) {
    res.send("You Already Have An Account, Please Login");
  }

  try {
    if (!email || !password || !fullname) {
      return res.status(400).send("Missing required fields");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let user = await userModel.create({
      email,
      password: hash,
      fullname,
    });
    let token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error registering user");
  }
};

module.exports.loginUser = async function (req, res){
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});

    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const token = generateToken(user);
                res.cookie("token", token);
                return res.send("Logged In"); // Ensure response is sent only once
            }
            return res.send("Email or Password Is Incorrect"); // Add return here
        });     
    } else {
        return res.send("Email or Password Is Incorrect"); // Handle case when user does not exist
    }
    
};
import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if(signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    })
  } else {
    res.status(401).send({ msg: "Invalid E-Mail or Password"});
  }
})

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const newUser = await user.save();

  if(newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser)
    })
  } else {
    res.status(401).send({ msg: "Invalid Entries. Check for errors and try again."});
  }
})


router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Kieran",
      email: "kieran.milligan@gmail.com",
      password: "D4rk5tar.296",
      isAdmin: true
    });

    const newUser = await user.save();
    res.send(newUser);

  } catch (error) {
    res.send({ msg: error.message });
  }

})

export default router;

const argon2 = require("argon2");
const redis = require("../middleware/redis");
const {
  generateAuthToken,
  validateSignup,
  validateLogin,
} = require("../models/user");
const prisma = require("../models/prisma");
const { addImage, deleteImage } = require("../utils/ImageUpload");
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.User.findMany({
      select: {
        userId: true,
        userName: true,
        email: true,
        Post: true,
        Comments: true,
        Likes: true,
      },
    });
    res.status(200).send({ users });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        userId: Number(req.query.id),
      },
      select: {
        userId: true,
        userName: true,
        email: true,
        Post: true,
        Comments: true,
        Likes: true,
      },
    });
    if (user) return res.status(200).send(user);
    else return res.status(404).send({ message: "User Not found" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const imageObject=await addImage(req.body.image);
    req.body.image=imageObject;
    const { error } = validateSignup(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await prisma.User.findMany({
      where: {
        OR: [
          { email: req.body.email },
          { userName: req.body.userName }
        ]
      }
    });
    if (user.length != 0) {
      return res
        .status(409)
        .send({ message: "Admin with given Email already exists!" });
    }
    const hashPassword = await argon2.hash(req.body.password);
    const data = { ...req.body, password: hashPassword };
    const newUser = await prisma.user.create({
      data: data,
    });
    newUser.password = undefined;
    const token = generateAuthToken(newUser);
    res.status(201).send({
      message: "User Created successfully",
      data: { token: token, user: newUser },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const login = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body); // check schema validation
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user)
      return res.status(401).send({ message: "Invalid Email  or Password" });

    if (await argon2.verify(user.password, req.body.password)) {
      user.password = undefined;
      const token = generateAuthToken(user);
      await redis.set(user.userId.toString(), JSON.stringify(user));
      return res.status(200).send({
        token: "Bearer " + token,
        user: user,
        message: "Logged In Successfully",
        user:user,
      });
    } else {
      return res.status(401).send({ message: "Invalid Password" }); // password did not match
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const editProfileImage=async(req,res,next)=>{
  try {
    const user=await prisma.user.findUnique({
      where: {
        userId:(Number)(req.params.userId)
      },
    });
    if(user){
    let img=user.image;
   // console.log(req.body.updatedImg)
    let newImage=await addImage(req.body.updatedImg);
    const updateImagePromise=prisma.user.update(
      {
        where:{
         userId:Number(req.params.userId)
        },data:
        {image:newImage}
      })
    const delImagePromise=deleteImage(img.public_id);
    await Promise.all([updateImagePromise,delImagePromise]);
    res.status(202).send({message:"Profile updated Successfully"});
    }
    else{
      res.status(404).send({message:"User Not Found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  login,
  signup,
  editProfileImage
};

const express = require("express");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController.js");
const validateUser = require("../middlewares/inputValidator.js");
const router = express.Router();

//here we need to used the Joi schema input validator
router.post("/user", validateUser, createUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", validateUser, updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
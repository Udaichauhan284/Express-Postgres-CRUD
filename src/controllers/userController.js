const { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService } = require("../models/userModel.js");

//Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

const createUser = async (req, res, next) => {
  const {name, email} = req.body;
  try{
    const newUser = await createUserService(name, email);
    handleResponse(res,201,"User created successfully", newUser)
  }catch(err){
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try{
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  }catch(err){
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if(!user){
      return handleResponse(res,404,"User Not Found");
    }
    handleResponse(res, 200, "User Fetched Successfully", user);
  }catch(err){
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(req.params.id, name, email);
    if (!updatedUser) {
      return handleResponse(res, 404, "User Not Found");
    }
    handleResponse(res, 200, "User Updated Successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try{
    const deleteUser = await deleteUserService(req.params.id);
    if(!deleteUser){
      return handleResponse(res, 404, "User Not Found");
    }
    handleResponse(res, 200, "User Delete Successfully", deleteUser);
  }catch(err){
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
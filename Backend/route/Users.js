import express from "express";
import {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    getUsers
} from "../controllers/UserController.js";

// Create a new Router instance
const routes = express.Router();

// Define API routes with corresponding controller functions

// Route to create a new user
routes.post('/', createUser);

// Route to delete a user by ID
routes.delete('/:id', deleteUser);

// Route to update a user by ID
routes.put('/:id', updateUser);

// Route to get a user by ID
routes.get('/:id', getUser);

// Route to get all users
routes.get('/', getUsers);

// Export the defined routes
export default routes;

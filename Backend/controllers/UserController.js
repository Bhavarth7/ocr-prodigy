import Info from "../db/schema.js";

// Update a user by ID
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await Info.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a user by ID
export const getUser = async (req, res) => {
    try {
        const user = await Info.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await Info.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await Info.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User has been deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const newUser = new Info(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // HTTP 201: Created
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

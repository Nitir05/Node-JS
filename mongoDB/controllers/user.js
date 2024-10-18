const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
    const allDBUsers = await User.find({});
    //Always routerend X- for custom headers
    return res.setHeader("X-User-Name", "Nitin").json(allDBUsers);
};

const handleGetUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({
            success: false,
            message: `No user found with id: ${userId}`,
        });
    }
};

const handleUpdateUser = async (req, res) => {
    const updatedUserDetails = req.body;
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(userId, {
            firstName: updatedUserDetails.first_name,
            lastName: updatedUserDetails.last_name,
            email: updatedUserDetails.email,
            gender: updatedUserDetails.gender,
            jobTitle: updatedUserDetails.job_title,
        });

        return res.json({
            success: true,
            message: "User updated successfully",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
};

const handleDeleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);

        return res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const handleCreateUser = async ({ body }, res) => {
    if (!body.first_name || !body.last_name || !body.email || !body.gender) {
        return res.status(400).json({
            status: false,
            message: "Request is missing required values",
        });
    }

    try {
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title,
        });

        return res.status(201).json({
            success: true,
            message: `User created successfully with id: ${result.id}`,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error,
        });
    }
};

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser,
};

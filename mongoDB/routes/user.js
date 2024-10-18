const express = require("express");

const {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser,
} = require("../controllers/user");

const router = express.Router();

//REST Apis
router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser);

module.exports = router;

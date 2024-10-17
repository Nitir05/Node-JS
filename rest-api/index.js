const express = require("express");
const fs = require("fs");

const users = require("./data/MOCK_DATA.json");

const port = process.env.PORT || 3000;

const app = express();

//Middleware(Plugin)
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    next();
});

app.get("/users", (req, res) => {
    const html = `
  <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
`;
    res.send(html);
});

//REST Apis
app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const userId = Number(req.params.id);
        const user = users.find((eachUser) => eachUser.id === userId);
        if (user) {
            return res.json(user);
        } else {
            res.status(404);
            return res.json({
                success: false,
                message: `No user found with id: ${userId}`,
            });
        }
    })
    .patch((req, res) => {
        const updatedUserDetails = req.body;
        const userId = Number(req.params.id);
        const user = users.find((eachUser) => eachUser.id === userId);

        if (!user) {
            res.status(404);
            return res.json({
                success: false,
                message: `No User found with id: ${userId}`,
            });
        }

        const updatedUsers = users.map((eachUser) => {
            if (eachUser.id === userId) {
                return {
                    ...eachUser,
                    first_name: updatedUserDetails.first_name,
                    last_name: updatedUserDetails.last_name,
                    email: updatedUserDetails.email,
                    gender: updatedUserDetails.gender,
                    job_title: updatedUserDetails.job_title,
                };
            }
            return eachUser;
        });

        fs.writeFile(
            "./data/MOCK_DATA.json",
            JSON.stringify(updatedUsers),
            (err, result) => {
                if (err) {
                    res.status(500);
                    return res.json({
                        success: false,
                        message: `Error occured while updating user details ${err.stack}`,
                    });
                } else {
                    return res.json({
                        success: true,
                        message: "User updated successfully",
                    });
                }
            }
        );
    })
    .delete((req, res) => {
        const userId = Number(req.params.id);
        const user = users.find((eachUser) => eachUser.id === userId);

        if (!user) {
            res.status(404);
            return res.json({
                success: false,
                message: `No User found with id: ${userId}`,
            });
        }

        const filteredUsers = users.filter(
            (eachUser) => eachUser.id !== userId
        );

        console.log(filteredUsers);

        fs.writeFile(
            "./data/MOCK_DATA.json",
            JSON.stringify(filteredUsers),
            (err, result) => {
                if (err) {
                    res.status(500);
                    return res.json({
                        success: false,
                        message: `Error occured while deleting user ${err.stack}`,
                    });
                } else {
                    return res.json({
                        success: true,
                        message: "User deleted successfully",
                    });
                }
            }
        );
    });

app.post("/api/users", ({ body }, res) => {
    const existingUser = users.find(
        (eachUser) => eachUser.email === body.email
    );
    if (existingUser) {
        res.status(409);
        return res.json({
            success: false,
            message: `User already exists with email: ${body.email}`,
        });
    }

    users.push({ ...body, id: users.length + 1 });

    fs.writeFile(
        "./data/MOCK_DATA.json",
        JSON.stringify(users),
        (err, result) => {
            if (err) {
                res.status(500);
                return res.json({
                    success: false,
                    message: `Error occured while creating user ${err.stack}`,
                });
            } else {
                res.status(201);
                return res.json({
                    success: true,
                    message: `User created successfully with id: ${users.length}`,
                });
            }
        }
    );
});

app.listen(port, () => console.log(`Server started at port: ${port}`));

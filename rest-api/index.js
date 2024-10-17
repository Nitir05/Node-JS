const express = require("express");
const users = require("./data/MOCK_DATA.json");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

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
        //TODO: Edit the user with ID
        return res.json({
            status: "Pending",
        });
    })
    .delete((req, res) => {
        //TODO: Delete the user with ID
        return res.json({
            status: "Pending",
        });
    });

app.post("/api/users", (req, res) => {
    //TODO: create new user
    return res.json({
        status: "Pending",
    });
});

app.listen(port, () => console.log(`Server started at port: ${port}`));

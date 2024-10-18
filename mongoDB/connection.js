const mongoose = require("mongoose");

const connectMongoDb = async (dbUrl) => {
    return mongoose.connect(dbUrl);
};

module.exports = connectMongoDb;

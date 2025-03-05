const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/scatch")
.then(() => {
    console.log('Connected to database');     
})
.catch((err) => {
    console.log('Error connecting to database', err);
});

module.exports = mongoose.connection;
const express = require('express');
const dbConnect = require('./database/dbConnect'); // Adjust path as needed

const app = express();
const port = 5000;

dbConnect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server due to database error:", error);
    });
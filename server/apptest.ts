import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.test.env"});

import loans from "./api/loans/index";

const app = express();

const PORT = process.env.APPLICATION_PORT || 8080;
app.use(express.json())


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

loans(app);

export default {
    app: app,
    server: server
} 
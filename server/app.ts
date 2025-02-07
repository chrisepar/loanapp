import express from "express";
import dotenv from "dotenv";
// import passport from "passport";
// import Local from 'passport-local';
// import session from "express-session";
import bodyParser from "body-parser";

dotenv.config();
// import HeaderStrategy from "passportjs-header";


import loans from "./api/loans/index";

const app = express();
const PORT = process.env.APPLICATION_PORT || 8080;

// const LocalStrategy = Local.Strategy;


// app.use(session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
// }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy((userid, password, done) => {
//     const authenticated_user = (userid === "admin");
//     console.log("Test");
//     return done(null, authenticated_user);
// }));

// Routes
loans(app);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default {
    app: app,
    server: server
} 
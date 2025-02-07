import routes from "./routes";

export default (app) => {
    app.use("/api/loans", routes);
};
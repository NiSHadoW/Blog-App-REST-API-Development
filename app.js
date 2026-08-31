import express from "express";
import authRoute from "./routes/auth.route.js";
import usersRoute from "./routes/users.route.js";
import blogsRoute from "./routes/blogs.route.js";

const app=express();
app.use(express.json());
app.use("/", authRoute);
app.use("/", usersRoute);
app.use("/", blogsRoute);

export default app;
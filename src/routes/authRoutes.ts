import express, { Express } from "express";
import { getUserByIdController, signInWithEmailController, signUpWithEmailController, updateUserController } from "../controller/authController";


const routes = ( app: Express ) => {
    app.use(express.json());

    app.post("/login", signInWithEmailController);
    app.post("/register", signUpWithEmailController);
    app.get("/getUserId/:id", getUserByIdController);
    app.patch("/updateUser", updateUserController);
};

export default routes;
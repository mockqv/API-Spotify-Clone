import express, { Express } from "express";
import { signInWithEmailController, signUpWithEmailController } from "../controller/authController";


const routes = ( app: Express ) => {
    app.use(express.json());

    app.post("/login", signInWithEmailController);
    app.post("/register", signUpWithEmailController);
};

export default routes;
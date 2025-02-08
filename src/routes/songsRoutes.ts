import express, { Express } from "express";
import songAddController from "../controller/Songs/songAddController";
import songGetController from "../controller/Songs/songGetController";
import songUpdateController from "../controller/Songs/songUpdateController";
import songDeleteController from "../controller/Songs/songDeleteController";


const routes = ( app: Express ) => {
    app.use(express.json());
    
    app.post("/songAdd", songAddController);
    app.get("/songs", songGetController);
    app.put("/songUpdate/:id",songUpdateController);
    app.delete("/songDelete/:id",songDeleteController);
};

export default routes;
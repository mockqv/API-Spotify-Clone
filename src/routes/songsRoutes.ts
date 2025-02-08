import express, { Express } from "express";
import songAddController from "../controller/Songs/songAddController";
import songGetController from "../controller/Songs/songGetController";
import songUpdateController from "../controller/Songs/songUpdateController";


const routes = ( app: Express ) => {
    app.use(express.json());
    
    // app.post("/artistAdd", artistAddController);
    // app.get("/artists", artistGetController);
    // app.put("/artistUpdate/:id", artistUpdateController);
    // app.delete("/artistDelete/:id", artistDeleteController);
    app.post("/songAdd", songAddController);
    app.get("/songs", songGetController);
    app.put("/songUpdate/:id",songUpdateController);
    // app.delete("",);
    
};

export default routes;
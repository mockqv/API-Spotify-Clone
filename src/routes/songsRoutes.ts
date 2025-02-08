import express, { Express } from "express";
import songAddController from "../controller/Songs/songAddControler";

const routes = ( app: Express ) => {
    app.use(express.json());
    
    // app.post("/artistAdd", artistAddController);
    // app.get("/artists", artistGetController);
    // app.put("/artistUpdate/:id", artistUpdateController);
    // app.delete("/artistDelete/:id", artistDeleteController);
    app.post("/songAdd", songAddController);
    
};

export default routes;
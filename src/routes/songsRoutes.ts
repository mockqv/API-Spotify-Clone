import express, { Express } from "express";
import songAddController from "../controller/Songs/songAddController";
import artistGetController from "../controller/Artist/ArtistGetController";

const routes = ( app: Express ) => {
    app.use(express.json());
    
    // app.post("/artistAdd", artistAddController);
    // app.get("/artists", artistGetController);
    // app.put("/artistUpdate/:id", artistUpdateController);
    // app.delete("/artistDelete/:id", artistDeleteController);
    app.post("/songAdd", songAddController);
    app.get("/songs", artistGetController);
    
};

export default routes;
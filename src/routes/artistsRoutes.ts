import express, { Express } from "express";
import artistAddController from "../controller/Artist/ArtistAddController";
import artistGetController from "../controller/Artist/ArtistGetController";
import artistUpdateController from "../controller/Artist/ArtistUpdateController";


const routes = ( app: Express ) => {
    app.use(express.json());
    
    app.post("/artistAdd", artistAddController);
    app.get("/artists", artistGetController);
    app.put("/artistUpdate/:id", artistUpdateController);
    
};

export default routes;
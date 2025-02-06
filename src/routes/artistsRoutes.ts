import express, { Express } from "express";
import artistAddController from "../controller/Artist/ArtistAddController";
import artistGetController from "../controller/Artist/ArtistGetController";


const routes = ( app: Express ) => {
    app.use(express.json());
    
    app.post("/artistAdd", artistAddController);
    app.get("/artists", artistGetController);

};

export default routes;
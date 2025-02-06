import express, { Express } from "express";
import artistAddController from "../controller/Artist/ArtistAddController";


const routes = ( app: Express ) => {
    app.use(express.json());

    app.post("/artistAdd", artistAddController);

};

export default routes;
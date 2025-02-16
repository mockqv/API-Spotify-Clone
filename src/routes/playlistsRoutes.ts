import express, { Express } from "express";
import playlistGetController from "../controller/Playlist/PlaylistGetController";




const routes = ( app: Express ) => {
    app.use(express.json());
    
    // app.post("/artistAdd", artistAddController);
    // app.get("/artists", artistGetController);
    // app.put("/artistUpdate/:id", artistUpdateController);
    // app.delete("/artistDelete/:id", artistDeleteController);
    app.get("/playlists", playlistGetController);
};

export default routes;
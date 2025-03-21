import express, { Express } from "express";
import searchItemsController from "../controller/Search/SearchItemsController";
import SearchItemsByAuthorController from "../controller/Search/SearchItemsByAuthorController";




const routes = ( app: Express ) => {
    app.use(express.json());
    
    app.get("/searchItems", searchItemsController);
    app.get("/searchItemsByAuthor", SearchItemsByAuthorController);
};

export default routes;
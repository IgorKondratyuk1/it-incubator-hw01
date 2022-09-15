import {Request, Response, Router} from "express";
import {videos} from "./videos-router";

export const testingRouter = Router({});

testingRouter.delete("/all-data",(req, res) => {
    const arrLength = videos.length;
    for(let i = 0; i < arrLength; i++) {
        videos.pop();
    }

    res.sendStatus(204);
});
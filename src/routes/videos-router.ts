import {Request, Response, Router} from "express";
import {Error} from "../types/types";

export const videosRouter = Router({});
export let videos = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-09-15T15:11:32.101Z",
        "publicationDate": "2022-09-15T15:11:32.101Z",
        "availableResolutions": [
            "P144"
        ]
    }
];

videosRouter.get("/", (req, res) => {
    res.status(200)
        .json(videos);
});
videosRouter.get("/:id", (req, res) => {
    const video = videos.find(v => v.id === +req.params.id);
    if (!video) {
        res.sendStatus(404);
        return;
    }

    res.status(200)
        .json(video);
});
videosRouter.post("/", (req, res) => {
    let errorsMessages: Array<Error> = [];

    if (!req.body.title) {
        errorsMessages.push({
            message: "No title",
            field: "title"
        });
    }

    if (!req.body.author) {
        errorsMessages.push({
            message: "No author",
            field: "author"
        });
    }

    if (!req.body.availableResolutions) {
        errorsMessages.push({
            message: "No availableResolutions",
            field: "availableResolutions"
        });
    } else if (!Array.isArray(req.body.availableResolutions)) {
        errorsMessages.push({
            message: "availableResolutions is not Array",
            field: "availableResolutions"
        });
    }

    // Data length check
    if (req.body.title && req.body.title.length > 40) {
        errorsMessages.push({
            message: "Title is too long",
            field: "title"
        });
    }

    if (req.body.author && req.body.author.length > 20) {
        errorsMessages.push({
            message: "Author is too long",
            field: "author"
        });
    }

    if (req.body.availableResolutions && Array.isArray(req.body.availableResolutions) && req.body.availableResolutions.length === 0) {
        errorsMessages.push({
            message: "No content in availableResolutions",
            field: "availableResolutions"
        });
    }

    if (errorsMessages.length > 0) {
        res.status(400)
            .json({
                "errorsMessages": errorsMessages
            });
        return;
    }

    const createdAtDate = new Date();
    const publicationDate = createdAtDate;
    publicationDate.setDate(publicationDate.getDate() + 1);

    const newVideo = {
        id: videos.length,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAtDate.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    }

    videos.push(newVideo);

    res.status(201)
        .json(newVideo);
});
videosRouter.put("/:id", (req, res) => {
    let errorsMessages: Array<Error> = [];

    if (!req.body.title) {
        errorsMessages.push({
            message: "No title",
            field: "title"
        });
    }

    if (!req.body.author) {
        errorsMessages.push({
            message: "No author",
            field: "author"
        });
    }

    if (!req.body.availableResolutions) {
        errorsMessages.push({
            message: "No availableResolutions",
            field: "availableResolutions"
        });
    } else if (!Array.isArray(req.body.availableResolutions)) {
        errorsMessages.push({
            message: "availableResolutions is not Array",
            field: "availableResolutions"
        });
    }

    if (!req.body.canBeDownloaded) {
        errorsMessages.push({
            message: "No canBeDownloaded",
            field: "canBeDownloaded"
        });
    }

    if (!req.body.minAgeRestriction) {
        errorsMessages.push({
            message: "No minAgeRestriction",
            field: "minAgeRestriction"
        });
    }

    if (!req.body.publicationDate) {
        errorsMessages.push({
            message: "No publicationDate",
            field: "publicationDate"
        });
    }

    // Length check
    if (req.body.title && req.body.title.length > 40) {
        errorsMessages.push({
            message: "Title is too long",
            field: "title"
        });
    }

    if (req.body.author && req.body.author.length > 20) {
        errorsMessages.push({
            message: "Author is too long",
            field: "author"
        });
    }

    if (req.body.availableResolutions && Array.isArray(req.body.availableResolutions) && req.body.availableResolutions.length === 0) {
        errorsMessages.push({
            message: "No content in availableResolutions",
            field: "availableResolutions"
        });
    }

    // Data type check
    if (req.body.canBeDownloaded && typeof(req.body.canBeDownloaded) !== "boolean") {
        errorsMessages.push({
            message: "Title is too long",
            field: "canBeDownloaded"
        });
    }

    if (errorsMessages.length > 0) {
        res.status(400)
            .json({
                "errorsMessages": errorsMessages
            });
        return;
    }


    const video = videos.find(v => v.id === +req.params.id);
    if (!video) {
        res.sendStatus(404);
        return;
    }

    video.title = req.body.title;
    video.author = req.body.author;
    video.availableResolutions = req.body.availableResolutions;
    video.canBeDownloaded = req.body.canBeDownloaded;
    video.minAgeRestriction = req.body.minAgeRestriction;
    video.publicationDate = req.body.publicationDate;

    res.sendStatus(204);
});
videosRouter.delete("/:id", (req, res) => {
    const initLength = videos.length;
    videos = videos.filter(v => v.id !== +req.params.id);
    if (initLength === videos.length) {
        res.sendStatus(404);
        return;
    }

    res.sendStatus(204);
});
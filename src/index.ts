import express from "express";
import {testingRouter} from "./routes/testing-router";
import {videosRouter} from "./routes/videos-router";

const app = express();
const port = process.env.PORT || 3000;
const jsonBodyParser = express.json();
app.use(jsonBodyParser);

app.use("/hometask_01/api/videos", videosRouter);
app.use("/ht_01/api/testing", testingRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
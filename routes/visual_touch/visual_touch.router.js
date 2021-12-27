const express = require("express");
const vtRouter = express.Router();
const vtController = require("../../controllers/visual_touch");

vtRouter.get("/", vtController.servePortal);

module.exports = vtRouter;

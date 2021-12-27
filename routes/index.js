const express = require("express");
const router = express.Router();
const visual_touch = require("./visual_touch/visual_touch.router");
const md = require("../middleware/index");

// Visual Touch specific middlewares
router.use(md.loadLogger);
router.use(md.verifyJWTtoken);

router.use("/vt/v1", visual_touch);

module.exports = router;

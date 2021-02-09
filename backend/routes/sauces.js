const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.getAllsauces);
router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("/:id", auth, saucesCtrl.getOneThing);
router.put("/:id", auth, multer, saucesCtrl.modifyThing);
router.post("/:id/like", auth, multer, saucesCtrl.likeThing);
router.delete("/:id", auth, saucesCtrl.deleteThing);

module.exports = router;

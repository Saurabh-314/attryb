const Router = require("express")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { get, create, remove, edit, getById } = require("../controllers/CarController");

const router = Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/", upload.single('image'), create);
router.delete('/:id', remove);
router.patch("/:id", edit);

module.exports = router;
const Router = require("express")

const AuthApi = require('./AuthApi.js');
const DealerApi = require('./DealerApi.js');


const router = Router();

router.use("/auth", AuthApi);
router.use("/dealer", DealerApi);

module.exports = router;
const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./user"));
router.use("/reports", require("./reports"));
router.use("/appointments", require("./appointments"));

router.use((err, req, res, next) => { 
  if (err.message.includes("Cast to ObjectId failed") || err.message.includes("input must be a 24 character hex string")) {
    res.status(400).send("Invalid Object Id");
  } else {
    res.status(500).send("Something else broke!");
  }
});
module.exports = router;
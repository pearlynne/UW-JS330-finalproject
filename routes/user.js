const { Router } = require("express");
const router = Router({ mergeParams: true });

const userDAO = require("../daos/user");
const { isAuthenticated, isProvider } = require("../middleware/middleware");

// Mustache: Comment out for tests
router.get("/:id/provider",  isAuthenticated,(req, res, next) => {
  const userId = req.params.id;
  if (req.user._id !== req.params.id) {
    res.status(404).send("Not your Id");
  } else {
    res.render("user_provider", { id: userId });
  }
});
// GET / Should get information of all patients for providers
router.get("/", isAuthenticated, isProvider, async (req, res, next) => {
  const userId = req.user._id;
  try {
    const users = await userDAO.getUsersOfProvider(userId);
		res.render("users", { type: "Patient information", user: user });

  } catch (e) {
    next(e);
  }
});

// GeT /:id Should get patient's information for provider;
// get own information for patientt
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const userId = req.user._id;
  const roles = req.user.roles;
  const email = req.user.email;

  if (userId !== req.params.id) {
    if (roles.includes("provider")) {
      const user = await userDAO.getUsersOfProvider(userId, req.params.id);
      if (user.length === 0) {
        res
          .status(404)
          .send("You cannot access users that are not your patients");
      } else {
		res.render("users", { type: "Patient information", user: user });

      }
    } else {
      res.status(404).send("Not your Id");
    }
  } else {
    try {
      const user = await userDAO.getUser(email);
      const { _id, password, __v, roles, ...userInfo } = user;
		res.render("users", { type: "Information", user: userInfo });

    } catch (e) {
      next(e);
    }
  }
});

// PUT /:id Should update provider Id for patient user
router.put("/:id/provider", isAuthenticated, async (req, res, next) => {
  const { providerId } = req.body;
  const userId = req.params.id;

  if (!providerId || !userId || JSON.stringify(req.body) === "{}") {
    res.status(400).send("Provider ID needed");
  } else if (userId !== req.user._id) {
    res.status(404).send("You are not allowed to access others' provider");
  } else {
    try {
      const updatedProvider = await userDAO.updateUserProvider(
        req.user._id,
        providerId
      );
      // res.json(updatedProvider);
			res.render("user_provider", { message: `Your new updated provider is: ${updatedProvider.providerId}`, id: userId, });

    } catch (e) {
      next(e);
    }
  }
});

module.exports = router;

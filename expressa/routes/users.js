const express = require ("express");
const authVerify = require("../middleware/authMiddleware");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/me", [authVerify, userController.getUserConnect]);
router.post("/create",userController.createUsers);
router.get("/:id",userController.getUserById);
router.delete("/:id",userController.deleteUser);
router.put("/:id",userController.updateUsers );
//router.put("/:id",userController.updateUser);
router.get("/list/all",userController.getAllUsers);
module.exports = router;

const express = require("express")
const router = express.Router()

const OwnerController = require("../controllers/OwnerController")


router.post("/create", OwnerController.createOwner)

router.get("/", OwnerController.showOwners)

router.get("/update/:id", OwnerController.listOwnerToUpdate)

router.post("/update", OwnerController.updateOwner)

router.post("/delete", OwnerController.deleteOwner)

module.exports = router
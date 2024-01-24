const express=require("express")
const router=express.Router()
const customercontroller=require("../controllers/customercontroller")

router.get("/",customercontroller.index)
router.get("/add",customercontroller.addcustomer)
router.post("/add",customercontroller.postcustomer)
router.get("/view/:id",customercontroller.view)
router.get("/edit/:id",customercontroller.edit)
router.put("/edit/:id",customercontroller.postedit)
router.delete("/:id",customercontroller.delete)

router.post("/search",customercontroller.searchCustomers)


module.exports=router;
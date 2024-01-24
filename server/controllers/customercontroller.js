const mongoose=require("mongoose")
const Customer=require("../models/customer")

//home page
exports.index= async(req,res)=>{
    const perPage=6
    const page=req.query.page || 1
    try {
      const customers = await Customer.aggregate([{ $sort: { created_at: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
      const count = await Customer.countDocuments({});
  
      res.render("index", {
        customers,
        current: page,
        pages: Math.ceil(count / perPage),
        
      });
    } catch (error) {
      console.log(error);
    }
}
//add customer page
exports.addcustomer=async (req,res)=>{
  res.render("customer/add")

}

//post new customer data
exports.postcustomer=async(req,res)=>{
    console.log(req.body);
    const newcustomer=new Customer({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        contact:req.body.contact,
        email:req.body.email,
        details:req.body.details
})
try{
    await Customer.create(newcustomer)
    req.flash("success","new customer is added")
    res.redirect("/")
}
catch(err){
    console.log(err);
}
}

//view customer page
exports.view=async(req,res)=>{
    let {id}=req.params;
    let customer=  await Customer.findById(id)
    console.log(customer);
    res.render("customer/viewc",{customer})
}

//edit customer page
exports.edit=async(req,res)=>{
    let{id}=req.params;
    let customer=  await Customer.findById(id)
    res.render("customer/edit",{customer})

}

//update customer data
exports.postedit=async(req,res)=>{
    let{id}=req.params;
    await Customer.findByIdAndUpdate(id,{ 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contact: req.body.contact,
        email: req.body.email,
        details: req.body.details,
        updated_at: Date.now(),
      })
      req.flash("success","Customer is updated")
      res.redirect(`/edit/${id}`)
}
//delete customer
exports.delete=async(req,res)=>{
    let{id}=req.params;
    await Customer.findByIdAndDelete(id);
    req.flash("success","Customer Deleted")
   res.redirect(`/`)
}
//search customer
exports.searchCustomers=async(req,res)=>{
  try{
  let searchTerm=req.body.searchTerm

  let searchNoSpecialChar=searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

  const customers = await Customer.find({
    $or: [
      { firstname: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      { lastname: { $regex: new RegExp(searchNoSpecialChar, "i") } },
    ],
  });
  res.render("search",{customers})
}

catch(err){
  console.log(err);
}
}
const mongoose=require("mongoose")

let ATLASDB=process.env.ATLASDB_URL

connectDB()
.then(()=>{
    console.log("connceted");
})
.catch(err => console.log(err));

async function connectDB() {
  await mongoose.connect(ATLASDB);
}
module.exports=connectDB
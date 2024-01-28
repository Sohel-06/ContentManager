const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/content-manager");
const connection=async()=>{
    try{
  const res= await mongoose.connect("mongodb://localhost:27017/content-manager");
  console.log("Connection is Successfull")
}
catch(err){
    console.log(err);
}
}

module.exports=connection;
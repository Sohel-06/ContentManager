const mongoose=require("mongoose");
const val=process.env.MONGODB_CONNECT_URI||"mongodb://localhost:27017/content-manager";
const connection=async()=>{
    try{
  const res= await mongoose.connect(val);
  console.log("Connection is Successfull")
}
catch(err){
    console.log(err);
}
}

module.exports=connection;
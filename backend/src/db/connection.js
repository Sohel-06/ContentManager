const mongoose=require("mongoose");
mongoose.set('strictQuery',false)
const connection=async()=>{
    try{
  const res= await mongoose.connect("mongodb+srv://urstruleysohel:fq1uvIzEZFfayKQr@cluster0.k2kvo0r.mongodb.net/Demodb?retryWrites=true&w=majority");
  console.log("Connection is Successfull")
}
catch(err){
    console.log(err);
}
}

module.exports=connection;
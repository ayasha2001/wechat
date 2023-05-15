const mongoose=require("mongoose")

const connectDB= async()=>{
    try{
        const connection=await mongoose.connect(process.env.Mongo_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            
        })    
       console.log("DB connected") 
    }
    catch{
       console.log("Error connecting DB")
    }
}

module.exports=connectDB;
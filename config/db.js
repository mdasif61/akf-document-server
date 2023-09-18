const mongoose=require('mongoose');

const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`Database connected : ${connection.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit()
    }
}
module.exports=connectDB;

// akf_document
// sja2wqgde7tlE0xh
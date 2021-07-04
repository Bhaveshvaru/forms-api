//handle the connectiion logic to the mongo database

const mongoose = require("mongoose")
mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://api-project1:prgbUrcrwEMUixY4@cluster0.rklsl.mongodb.net/KarmanForm?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>{
    console.log("connected to the mongodb database!")
})
.catch((err)=>{
    console.log("err",err)
})

mongoose.set("useCreateIndex",true);
mongoose.set("useFindAndModify",false);


module.exports= {mongoose}
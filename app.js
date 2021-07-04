const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const FormSchema = require("./model")
const morgan = require("morgan");
const excel = require("exceljs");
require('dotenv').config()

let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet("Tutorials");


mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('connected to db'))
	.catch(err => console.log(err.message));

//apply middleware
app.use(bodyParser());
app.use(morgan())

// get api to get all data in the database
app.get("/karman/get",(req,res)=>{
   try {
   
   FormSchema.find({}).then((obj)=>{
    // res.status(200).json({data});
    let forms = [];

    obj.forEach((obj) => {
      forms.push({
        name: obj.name,
        email: obj.email,
        subject: obj.subject,
        message: obj.message,
      });
    });
    worksheet.columns = [
        { header: "Name", key: "name", },
        { header: "email", key: "email",  },
        { header: "subject", key: "subject",  },
        { header: "message", key: "message",  },
      ];
       // Add Array Rows
    worksheet.addRows(forms);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "forms.xlsx"
    );

      
      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
   })
} catch (error) {
    console.log(error);
    res.status(400).json({message:"something wrong with server..."})
}
})

//api to post the form data to the database 
app.post("/karman/post", async (req,res)=>{
    //get data from body 
    let {name , email , subject , message} = req.body;
    let newData = new FormSchema({name , email , subject , message})
// Handle create contact actions
await newData.save();
if(newData) {
    res.status(201).json({message:"form submitted Successfully...",newData})
} else {
    res.status(400).json({message:"err server ..."})
}
 })



app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running on port 3000...")

})
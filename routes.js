const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const {mongoose} = require("./db/mongoose")
// route handlers
const {List,Task} = require("./index");

//apply middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//list routes
/** 
 to get all lists
*/
app.get("/lists",(req,res)=>{
   //return an array of all the lists the database
   List.find({}).then((lists)=>{
       res.send(lists)
   })
})

/** 
 to post all lists
*/
app.post("/lists",(req,res)=>{
    //create new lists and returns the new list document to the user
    let title = req.body.title;
    let newList = new List({
        title
    })
    newList.save()
    .then((listDoc)=>{
        res.send(listDoc)
    })
 })


 app.get('/lists/:listId/tasks',(req,res)=>{
     //return all tasks that belong to a specific list items
     Task.find({
         _listId:req.params.listId
     }).then((tasks)=>{
        res.send(tasks);
     })
 })



app.listen(3000,()=>{
    console.log("server is running on port 3000...")

})
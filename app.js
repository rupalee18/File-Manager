const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    fs.readdir("./files", (err, files) => {
        res.render("index",{files: files});
    })
})

app.get("/create", (req,res)=>{
    res.render("create");
})

app.post("/create", (req,res)=>{
     fs.writeFile(`./files/${req.body.fileName}`, `${req.body.data}`, (err)=>{
        if (err) throw err;
        // console.log("file created")
     })
     res.redirect("/");
})

app.get("/delete/:fileName",(req, res)=>{
    fs.unlink(`./files/${req.params.fileName}`,(err)=>{
        if (err) throw err;
        // console.log("file deleted");
    })
    res.redirect("/");
})


app.get("/edit/:fileName", (req,res)=>{
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err,data)=>{

        res.render("edit",{file:req.params.fileName, data:data});
    })
})

app.post("/edit/:fileName", (req,res)=>{
    fs.unlink(`./files/${req.params.fileName}`, (err) => {
        if (err) throw err;
        // console.log("file deleted");
    });
    fs.writeFile(`./files/${req.body.fileName}`, `${req.body.data}`, (err)=>{
        if (err) throw err;
        // console.log("file created")
     })
     res.redirect("/");
})

app.get("/show/:fileName", (req,res)=>{
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err,data)=>{
        if(err) throw err;
        res.render("show", {fileName:req.params.fileName, data:data});
    })
})


app.listen(3000);
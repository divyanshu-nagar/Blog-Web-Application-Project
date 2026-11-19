import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

let posts = [];

app.get("/",(req,res)=>{
    res.render("index.ejs");
});



app.post("/submit", (req,res)=>{
    const post = { title : req.body.bTitle, content : req.body.bData};
    posts.push(post);
    res.redirect("/posts");
});

app.get("/posts", (req,res)=>{
    res.render("posts.ejs",{allPosts: posts})
})
app.post("/delete/:id", (req,res)=>{
    const id = req.params.id;
    posts.splice(id,1);
    res.redirect("/posts")
})
app.listen(port, ()=>{
    //console.log(`Server is running at ${port}.`);
    console.log("Running on "+ port);
});
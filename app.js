const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set('view engine', 'ejs');

// index
app.get("/", (req, res) => {
    res.render("index");
})

// saran kumar
app.post("/", (req, res) => {

})


names = []
ch = [0, 0, 0, 0, 0]
check = 0
    // main
app.get("/main", (req, res) => {

    // res.render("main", { staff: staffname, subject: subjectname });
    res.render("main", { listname: names });

})


app.post("/main", (req, res) => {

    const code = req.body.inputcode
    if (code === "eng123" && ch[0] == 0) {
        sname = "Mrs.Aruna"
        sub = "English"
        ch[0] = 1
    } else if (code === "maths123" && ch[1] == 0) {
        sname = "Mr.Mathavan"
        sub = "Maths"
        ch[1] = 1
    } else if (code === "phy123" && ch[2] == 0) {
        sname = "Mr. Raj sheakar"
        sub = "Physics"
        ch[2] = 1
    } else if (code === "bio123" && ch[3] == 0) {
        sname = "Mrs. Kousalya"
        sub = "Biology"
        ch[3] = 1
    } else if (code === "che123" && ch[4] == 0) {
        sname = "Mr.Sathish"
        sub = "Chemistry"
        ch[4] = 1
    } else {
        check = 1
        console.log("coder Error")
    }

    if (check == 0) {
        names.push([sname, sub]);
        console.log(names)
    } else {
        //  to be done
    }
    res.redirect("/main");

})



app.listen(8000, function() {
    console.log("Server running in 9000")
});
const { name } = require("ejs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const shortid = require('shortid');

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/workroomDB", { useNewUrlParser: true, useUnifiedTopology: true })

// Student-Schema
const stdentSchema = new mongoose.Schema({
    name: String,
    password: String
})

// Std-collection
const student = new mongoose.model("student", stdentSchema)


//Teacher-Schema
const staffSchema = new mongoose.Schema({
    name: String,
    password: String
})

// Staff-collection
const staff = new mongoose.model("staff", staffSchema)


//declaration start

// join section std main
const names = []
ch = [0, 0, 0, 0, 0]
check = 0

// display mailid
let stduseridname;
let staffuseridname;
//= "sowbhakian@gmail.com";

// display date
let today = new Date();
let options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
};
let displaydate = today.toLocaleDateString("en-US", options)

//declaration over


// index-student
app.get("/", (req, res) => {
    for (let i = 0; i < 10; i++) {
        console.log(shortid.generate());
    }
    res.render("index");
})


// Std-signin
app.post("/signup", function(req, res) {
    const name = req.body.name;
    const pass = req.body.pass;
    stduseridname = name;
    student.findOne({ name: name }, function(e, found) {
        if (e) {
            console.log("error in name" + e)
        } else {
            if (found) {
                res.redirect("/");
            } else {
                const Student = new student({
                    name: req.body.name,
                    password: req.body.pass
                });
                Student.save(function(e) {
                    if (e) {
                        console.log("error in database" + e)
                    } else {
                        res.redirect("/main")
                    }
                })
            }
        }
    })
})

// Std-sigin
app.post("/signin", function(req, res) {
    console.log("in sigin")
    const name = req.body.name;
    const password = req.body.pass;
    stduseridname = name;
    console.log(name, password)
    student.findOne({ name: name }, function(e, found) {
        if (e) {
            console.log("error in login user" + e)
        } else {
            if (found) {
                if (found.password === password) {
                    res.redirect("/main")
                } else {
                    alert("Incorrect Password")
                    res.redirect("/")
                }
            } else {
                alert("Incorrect Username")
                res.redirect("/")
            }
        }
    })
})

// main-student
app.get("/main", (req, res) => {
    res.render("main", { listname: names, usermailid: stduseridname });
})

app.get("/calender", (req, res) => {

    res.render("calender", { datetime: displaydate, usermailid: stduseridname })
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
        console.log(ch, code)

    }

    if (check == 0) {
        names.push([sname, sub]);
        // console.log(names)
    } else {
        console.log("Wrong Code")
    }
    res.redirect("/main");

})

app.post("/remove", (req, res) => {
    chename = []
    let chechange
    const remove = req.body.minus
        // console.log(remove)
        // console.log("names " + names, "names1 = " + )
    names.forEach((element) => {
        // console.log(element[1])
        if (element[1] != remove) {
            chename.push(element)

        } else {
            chechange = element[1]
        }
    });
    switch (chechange) {
        case "English":
            ch[0] = 0
            break;
        case "Maths":
            ch[1] = 0
            break;
        case "Physics":
            ch[2] = 0
            break;
        case "Biology":
            ch[3] = 0
            break;
        case "Chemistry":
            ch[4] = 0
            break;
        default:
            console.log("Error in removing")
    }
    // console.log("remove = " + ch, names)
    names = chename;

    res.redirect("/main")

})

app.post("/calender", (req, res) => {
    console.log("in calender")
    res.redirect("/calender")
})

app.post("/calendertomain", (req, res) => {
    console.log("in calender")
    res.redirect("/main")
})

// stffindex
app.get("/staffindex", (req, res) => {
    res.render("staffindex")
})


// Staffmain
app.get("/staffmain", (req, res) => {
    res.render("staffmain")
})

// gotostaff
app.get("/gotostaff", (req, res) => {
    res.render("staffindex")
})


//Teacher-signup
app.post("/staffsignup", function(req, res) {
    const name = req.body.name;
    const pass = req.body.pass;
    staffuseridname = name;
    staff.findOne({ name: name }, function(e, found) {
        if (e) {
            console.log("error in name" + e)
        } else {
            if (found) {
                res.redirect("/staffindex");
            } else {
                const Staff = new staff({
                    name: req.body.name,
                    password: req.body.pass
                });
                Staff.save(function(e) {
                    if (e) {
                        console.log("error in database" + e)
                    } else {
                        res.redirect("/staffmain")
                    }
                })
            }
        }
    })
})

// Teacher-sigin
app.post("/staffsignin", function(req, res) {
    console.log("in sigin")
    const name = req.body.name;
    const password = req.body.pass;
    staffuseridname = name;
    staff.findOne({ name: name }, function(e, found) {
        if (e) {
            console.log("error in login user" + e)
        } else {
            if (found) {
                if (found.password === password) {
                    res.redirect("/staffmain")
                } else {
                    alert("Incorrect Password")
                    res.redirect("/staffindex")
                }
            } else {
                alert("Incorrect Username")
                res.redirect("/staffindex")
            }
        }
    })
})



app.listen(9000, function() {
    console.log("Server running in 9000")
});
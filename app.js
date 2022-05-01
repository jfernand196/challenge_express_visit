const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "pug");
app.set("views","views");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/mongo-1', { useNewUrlParser: true });

const schema = mongoose.Schema({
  name: String,
  date: Date
});

const Visitor = mongoose.model("Visitor", schema);

app.post("/", async (req, res) => {
  const nombre = req.query.name;
  if (nombre) {
    const data = { name: nombre, date: new Date() };  // other way Date.now()
      const info = new Visitor(data);
      await info.save();
      res.redirect("/")
      // res.status(200).send("<h1> El visitante fue almacenado con éxito </h1>");
     
  } else {
    const data = { name: "Anónimo", date: new Date() };
      const info = new Visitor(data);
      await info.save();
    
  }
});

app.get("/", (req, res)=>{
  res.render("index")
})

app.listen(3000, () => console.log("server listening in port 3000"));

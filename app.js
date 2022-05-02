const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "pug");
app.set("views","views");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://0.0.0.0:27017/mongo-1', { useNewUrlParser: true });

const schema = mongoose.Schema({
  date: Date,
  name: String
  });

const Visitor = mongoose.model("Visitor", schema);

app.post("/", async (req, res) => {
  const nombre = req.query.name;
  if (nombre) {
    const data = { date: new Date(), name: nombre };  // other way Date.now()
      const info = new Visitor(data);
      await info.save();
      res.redirect("/")
      
     
  } else {
    const data = { date: new Date(), name: "Anónimo" };
      const info = new Visitor(data);
      await info.save();
      res.redirect("/")
    
  }
});

app.get("/", (req, res)=>{
  res.status(200).send("<h1> El visitante fue almacenado con éxito </h1>")
})

app.listen(3000, () => console.log("server listening in port 3000"));

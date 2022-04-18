const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });

const schema = mongoose.Schema({
  name: String,
  date: Date
});

const Visitor = mongoose.model("Visitor", schema);

app.post("/", async (req, res) => {
  const nombre = req.query.name;
  if (nombre) {
    const data = { name: nombre, date: new Date() };

      const info = new Visitor(data);
      await info.save();
      res.send("<h1> El visitante fue almacenado con éxito </h1>");
     
  } else {
    const data = { name: "Anónimo", date: new Date() };
  
      const info = new Visitor(data);
      await info.save();
    
  }
});

app.listen(3000, () => console.log("server listening in port 3000"));

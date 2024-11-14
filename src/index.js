const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/db.js');
const userRouter = require("./routes/userRoutes.js");
const errorHandling = require('./middlewares/errorHandler.js');
const createUserTable = require('./data/createUserTable.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", userRouter);
// app.get("/", (req, res) => {
//   res.json({"message": "Up and Running"});
// });

//Error handling middlewares
app.use(errorHandling);

//create table before starting the server
createUserTable();


//Testing POSTGRES connection
app.get("/", async (req, res) => {
  console.log("Start");
  const result = await pool.query("SELECT current_database()");
  console.log("end");
  res.send(`The database name is : ${result.rows[0].current_database}`);
});


//server running
app.listen(port, () => {
  console.log(`Server is listening http://localhost:${port}`);
});
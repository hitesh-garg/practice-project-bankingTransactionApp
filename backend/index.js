const express = require("express");
const rootRouter = require('./routes/index');
const {connectDB} = require('./db');
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

const PORT = 3000;
connectDB().then(()=> {
    app.listen(PORT , () =>{
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})



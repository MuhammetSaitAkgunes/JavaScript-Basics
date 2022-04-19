const express = require("express");
const dotenv = require("dotenv");

// "/api" geldiğinde gel bu routers içindeki indexe bak. Daha modüler, daha kullanışlı bir yapı.
const routers = require("./routers/index");

// Environment Variables
dotenv.config({
    path : "./config/env/config.env"
})

const app = express();
const PORT = process.env.PORT;

// routers middleware
app.use("/api",routers);


app.listen(PORT, () => {
    console.log(`App started on : ${PORT} : ${process.env.NODE_ENV}`);
});


const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middleware/errors/customErrorHandler");
const path = require("path");

// "/api" geldiğinde gel bu routers içindeki indexe bak. Daha modüler, daha kullanışlı bir yapı.
const routers = require("./routers/index");

// Environment Variables
dotenv.config({
    path : "./config/env/config.env"
})

// MongoDb Connection. helpers içinde bağlantı amaçlı bir fonk. yazdık. burada onu kullanarak bağlanacağız.
connectDatabase();


const app = express();
const PORT = process.env.PORT;

// express - body middleware
app.use(express.json());

// routers middleware. sana /api geldiğinde routersa gönder.
app.use("/api",routers);

// Error handler
app.use(customErrorHandler);

// Static Files
app.use(express.static(path.join(__dirname,"public")));


app.listen(PORT, () => {
    console.log(`App started on : ${PORT} : ${process.env.NODE_ENV}`);
});


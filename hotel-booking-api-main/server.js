const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const DB = JSON.stringify(process.env.DATABASE).replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

console.log(process.env.NODE_ENV);
// connecting DB
mongoose
  .connect(JSON.parse(DB))
  .then(() => console.log("db connected successfully"))
  .catch();

const port = process.env.PORT || 5000;

// Starting the server
const server = app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

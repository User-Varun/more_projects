const mongoose = require("mongoose");
// const app = require("./app");
const dotenv = require("dotenv");
const fs = require("fs");
const hotel = require("../models/hotelsModel");

dotenv.config({ path: "../config.env" });

const DB = JSON.stringify(process.env.DATABASE).replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// connecting DB
mongoose
  .connect(JSON.parse(DB))
  .then(() => console.log("db connected successfully"));

const data = fs.readFileSync("dev-data.json", "utf-8");

async function importData() {
  const jsonData = JSON.parse(data);

  try {
    await hotel.create(jsonData);
    console.log("Data saved to db");
  } catch (err) {
    console.error(err);
  }
  process.exit();
}
async function deleteData() {
  try {
    await hotel.deleteMany();
    console.log("successfully deleted data from db");
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

if (process.argv[2] == "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  deleteData();
}

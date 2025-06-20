const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('db connection successfull'));

//   Read the file
const tours = fs.readFileSync(`tours-simple.json`, 'utf-8');

// import data into database

const importData = async () => {
  try {
    const jsonData = JSON.parse(tours);

    await Tour.create(jsonData);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all Data from collection

const DeleteData = async () => {
  try {
    await Tour.deleteMany();

    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  DeleteData();
}

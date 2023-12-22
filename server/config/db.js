const mongodb = require("mongoose");
const url = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    const conn = mongodb.connect(url);
    console.log(
      `mongodb connected : ${(await conn).connection.host}`.cyan.underline.bold
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
module.exports = connectDB;

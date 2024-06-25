const mongoose = require("mongoose");
const initData = require("./data.js")
const MONGO_URL = "mongodb://localhost:27017/wanderlust";
const Listing = require("../MODELS/listing.js");

main().then(()=>{
  console.log("connected to DB");
}).catch((err)=>{
  console.log(err);
})

async function main(){
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj,owner:"6677b5d623fd2aad9e15d192"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();

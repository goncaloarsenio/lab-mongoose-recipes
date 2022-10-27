const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const bacalhau = {title: "bacalhau a bras", level: "Easy Peasy", ingredients:["bacalhou", "ovo", "batata palha"], cuisine: "portuguesa", dishType: 'main_course', image: "https://receitadebacalhau.com.br/wp-content/uploads/2021/11/receita-de-bacalhau-a-bras-classico.jpg", duration: 30, creator:"Goncalo Arsenio"}

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    await Recipe.create(bacalhau);
    console.log(bacalhau.title)

let allRecipes = await Recipe.insertMany(data)
for (let i= 0; i < allRecipes.length; i++) {
  console.log(allRecipes[i].title)
}


let updateRigatoni = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});

console.log(updateRigatoni)
/* console.log("duration changed with success") */


  await Recipe.deleteOne({title: "Carrot Cake"},);

dbConnection.disconnect();

  } catch (error) {
    console.log(error);

  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */

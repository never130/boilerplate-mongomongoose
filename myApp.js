require('dotenv').config();
// 1
const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//2
let personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema)

let programador = function (done) {
  return new Person({
    name: 'Ever',
    age: 28,
    favoriteFoods: ['Pizza', 'Rice']
  });

  if (error) return done(error);
  done(null, result);
};


// 3
const createAndSavePerson = (done) => {
  let steve = new Person({
    name: "Steve Jobs",
    age: 55,
    favoriteFoods: ['meat', 'fruits', 'lasagna']
  })

  steve.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  })
};


//4
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, peopleCreated) => {
    if (err) return console.error(err);
    done(null, peopleCreated);
  });
};


//5
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, peopleFound) => {
    if (err) return console.error(err);
    done(null, peopleFound);
  });
};


//6
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, foodPerson) => {
    if (err) return console.error(err);
    done(null, foodPerson);
  });
};


//7
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, individual) => {
    if (err) return console.error(err);
    done(null, individual);
  });
};


//8
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);

    person.save((err, individual) => {
      if (err) return console.error(err);
      done(null, individual)
    });
  });
};


//9
const findAndUpdate = (personName, done) => {
  const query = { name: personName };
  const ageToSet = { age: 20 };
  const options = { new: true }

  Person.findOneAndUpdate(query, ageToSet, options,
    (err, individual) => {
      if (err) return console.error(err);
      done(null, individual);
    })
};


// CRUD - DELETE
//10
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, personRemoved) => {
    if (err) return console.error(err);
    done(null, personRemoved);
  })
};


//11
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  })
};


//12
const queryChain = (done) => {
  Person.find({ favoriteFoods: "burrito" })
    .sort({ name: 'asc' })
    .limit(2)
    .select({ age: 0 })
    .exec((err, result) => {
      done(null, result);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

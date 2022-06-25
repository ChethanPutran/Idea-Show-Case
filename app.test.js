// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectId } = require('mongodb');

const idGen = new ObjectId();
const id = idGen.toHexString();

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'idea_show_case';

const insertDataSingle = (db, collectionName, data) => {
	db.collection(collectionName).insertOne(data, (error, result) => {
		if (error) {
			return console.error('Unable to insert data!');
		}
		console.log(result.insertedId);
	});
};
const insertDataMul = (db, collectionName, data) => {
	db.collection(collectionName).insertMany([...data], (error, result) => {
		if (error) {
			return console.error('Unable to insert data!');
		}
		console.log(result.insertedId);
	});
};
const getDataAll = (db, collectionName) => {
	db.collection(collectionName)
		.find({})
		.toArray((err, users) => {
			console.log(users);
		});
};
const getDataSingle = (db, collectionName, data) => {
	db.collection(collectionName)
		.findOne(data)
		.toArray((err, users) => {
			console.log(users);
		});
};

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	(error, connection) => {
		if (error) {
			return console.log('Unable to connect to database!');
		}

		console.log('Database connection successful!');
		const db = connection.db(databaseName);

		//Inserting single documents

		// );

		//Inserting more than one documents
		// const users = [
		//     { name: "Mona", age: 89 },
		//     { name: "Ram", age: 35 },
		// ];
		// const insetToDatabase = (users) => {
		//     db.collection("users").insertMany([...users], (error, result) => {
		//         if (error) {
		//             return console.error("Unable to insert data!");
		//         }
		//         console.log(result);
		//     });
		// };

		//Retriving the data from the database(single doc)

		// db.collection("users").findOne({ _id: new ObjectId("6102a24d792d4746f99c51b4") },
		//     (err, res) => {
		//         if (err) {
		//             return console.log("Unable to retrive the data!");
		//         }

		//         console.log(res);
		//     }
		// );

		//Multiple data

		//   db.collection("users")
		//     .find({})
		//     .toArray((err, users) => {
		//       console.log(users);
		//     });

		// db.collection("users")
		//     .find({})
		//     .count((err, count) => {
		//         console.log(count);
		//     });

		// Updating the data(set)
		// const updatePromise = db
		//     .collection("users")
		//     .updateOne({ _id: new ObjectId("610109ed462048e4d42eead5") }, { $set: { name: "Chetu" } });
		// updatePromise
		//     .then((res) => {
		//         console.log(res);
		//     })
		//     .catch((err) => {
		//         console.log(err);
		//     });

		//(increment)
		// const updatePromise = db
		//     .collection("users")
		//     .updateOne({ _id: new ObjectId("610109ed462048e4d42eead5") }, { $inc: { age: 3 } });
		// updatePromise
		//     .then((res) => {
		//         console.log(res);
		//     })
		//     .catch((err) => {
		//         console.log(err);
		//     });

		//Updatemany
		// const updatePromise = db
		//     .collection("users")
		//     .updateMany({ age: 20 }, { $set: { age: 25 } });
		// updatePromise
		//     .then((res) => {
		//         console.log(res);
		//     })
		//     .catch((err) => {
		//         console.log(err);
		//     });

		// Delete
		// const deletePromise = db.collection("users").deleteMany({ age: 28 });
		// deletePromise
		//     .then((res) => {
		//         console.log(res);
		//     })
		//     .catch((err) => {
		//         console.log(err);
		//     });

		// getDataAll(db, "users");
	}
);

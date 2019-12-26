// CRUD Create Read Update Delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require( "mongodb" );

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();

MongoClient.connect( connectionURL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	( error, client ) => {
		if ( error ) {
			return console.log( "Unable to connect to database!" );
		}
		const db = client.db( databaseName );
		
		//When searching for ID you must use ObjectID, not just the ID string.
		
		// db.collection('users').findOne({name: 'Gunther', age: 1}, (error, user) => {
		//     if (error) {
		//         return console.log('Unable to fetch');
		//     }
		//     console.log(user);
		// });
		
		// Find returns cursor
		// db.collection('users').find({age: 26}).toArray((error, users) => {
		//     if (error) {
		//         return console.log('Unable to fetch');
		//     }
		//     console.log(users);
		// });
		//
		// db.collection('users').find({age: 26}).count((error, count) => {
		//     if (error) {
		//         return console.log('Unable to fetch');
		//     }
		//     console.log(count);
		// });
		
		db.collection( "tasks" ).findOne( { _id: new ObjectID( "5e0495a5cb2abd28342fe6b9" ) },
			( error, task ) => {
				console.log( task );
			} );
		
		db.collection( "tasks" ).find( { completed: false } ).toArray( ( error, tasks ) => {console.log( tasks );} );
	} );
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
		
		// db.collection( "users" )
		//   .updateOne( {
		// 		  _id: new ObjectID( "5e048ee9a69de30cd0a69193" )
		// 	  },
		// 	  {
		// 		  $set: {
		// 			  name: "Aleksander"
		// 		  },
		// 		  $inc: {
		// 			  age: 1
		// 		  }
		// 	  } )
		//   .then(
		// 	  ( result ) => {console.log( "Success! Number of modified fields", result.modifiedCount );} )
		//   .catch(
		// 	  () => {console.log( "Error!" );} );
		
		db.collection( "tasks" )
		  .updateMany( {
			  completed: true
		  }, {
			  $set: {
				  completed: false
			  }
		  } )
		  .then( ( result ) => {console.log( "Success! Number of modified rows: ", result.modifiedCount );} )
		  .catch( () => {console.log( "Error!" );} );
	} );
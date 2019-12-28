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
		
		db.collection( "tasks" )
		  .deleteMany( {
			  description: "Task 2"
		  } )
		  .then( () => {console.log( "Success!" );} )
		  .catch( () => {console.log( "Error!" );} );
	} );


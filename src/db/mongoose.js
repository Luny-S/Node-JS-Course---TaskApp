const mongoose = require( "mongoose" );

mongoose.connect( "mongodb://127.0.0.1:27017/task-manager-api", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
} );

const User = mongoose.model( "User", {
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		validate( value ) {
			if ( value < 0 ) {
				throw new Error( "Age must be a positive number" );
			}
		}
	}
} );

const me = new User( {
	name: "Aleksander",
	age: -4
} );

me.save()
      .then( () => {
	      console.log( me );
      } )
      .catch( ( error ) => {
	      console.log( error );
      } );

return;
const Task = mongoose.model( "Task", {
	description: {
		type: String
	},
	completed: {
		type: Boolean
	}
} );

const myTask = new Task( {
	description: "Task 1 description",
	completed: false
} );

myTask.save()
      .then( () => {
	      console.log( myTask );
      } )
      .catch( ( error ) => {
	      console.log( error );
      } );
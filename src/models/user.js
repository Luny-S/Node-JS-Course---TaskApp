const mongoose = require( "mongoose" );
const validator = require( "validator" );

const User = mongoose.model( "User", {
	name: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate( value ) {
			if ( !validator.isLength( value, { min: 7 } ) ) {
				throw new Error( "Password must contain at least 7 characters!" );
			} else if ( validator.contains( value.toLowerCase(), "password" ) ) {
				throw new Error( "Password cannot contain word 'password'!" );
			}
		}
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate( value ) {
			if ( !validator.isEmail( value ) ) {
				throw new Error( "Email is invalid!" );
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate( value ) {
			if ( value < 0 ) {
				throw new Error( "Age must be a positive number" );
			}
		}
	}
} );

module.exports = User;
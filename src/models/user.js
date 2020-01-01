const mongoose = require( "mongoose" );
const validator = require( "validator" );
const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );

const userSchema = new mongoose.Schema( {
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
		unique: true,
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
	},
	tokens: [{ // array of objects
		token: {
			type: String,
			required: true
		}
		
		
	}]
} );

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({_id: user._id.toString()},'R4nd0mStr1ngH3re');
	user.tokens = user.tokens.concat({ token });
	await user.save();
	
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	
	if(!user) {
		throw new Error('Unable to login');
	}
	
	const isMatch = await bcrypt.compare(password, user.password);
	if ( !isMatch ) {
		throw new Error('Unable to login');
	}
	
	return user;
};

// Hash the plain text password before saving
userSchema.pre( "save", async function ( next ) { // not an arrow function as we need 'this'
	const user = this;
	
	if ( user.isModified( "password" ) ) {
		user.password = await bcrypt.hash( user.password, 8 );
	}
	
	next(); // We let mangoose know that this async function finished through next call
} );

const User = mongoose.model( "User", userSchema );

module.exports = User;
const express = require( "express" );
require( "./db/mongoose" );
const User = require( "./models/user" );
const Task = require( "./models/task" );
const userRouter = require( "./routers/user" );
const taskRouter = require( "./routers/task" );

const app = express();
const port = process.env.PORT || 3000;

app.use( express.json() );
app.use( userRouter );
app.use( taskRouter );

app.listen( port, () => {
} );


// const bcrypt = require('bcryptjs');
//
// const myFunction = async () => {
// 	const password = 'Red12345!';
// 	const hashedPassword = await bcrypt.hash(password, 8);
//
// 	console.log( password );
// 	console.log( hashedPassword );
//
// 	const isMatch = await bcrypt.compare('Red12345!', hashedPassword);
// 	console.log( isMatch );
// };
//
// myFunction();
//
// // Encrypt - reversible
// // Hashed - non-reversible

// const jwt = require( "jsonwebtoken" );
//
// const myFunction = async () => {
// 	const token = jwt.sign( { _id: "abc123" }, "R4nd0mStr1ngH3re", { expiresIn: "7 days" } );
// 	console.log( token );
//
// 	const data = jwt.verify( token, "R4nd0mStr1ngH3re" );
// 	console.log( data );
// };
//
// myFunction();

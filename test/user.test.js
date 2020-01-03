const request = require( "supertest" );
const app = require( "../src/app" );
const { userOneId, userOne, setupDatabase } = require( "./fixtures/db" );
const User = require( "../src/models/user" );

beforeEach( setupDatabase );

test( "Should signup a new user", async () => {
	const response = await request( app ).post( "/users" ).send( {
		name: "Example name",
		email: "example@example.com",
		password: "Ex4mp13P@ssw0rd"
	} ).expect( 201 );
	
	// Assert that the database was changed correctly
	const user = await User.findById( response.body.user._id );
	expect( user ).not.toBeNull();
	
	// Assertions about the response
	expect( response.body.user.name ).toBe( "Example name" );
	
	// Assertions about the response
	expect( response.body ).toMatchObject( { // the listed obj. properties must match exactly
		user: {
			name: "Example name",
			email: "example@example.com"
		},
		token: user.tokens[0].token
	} );
	
	expect( user.password ).not.toBe( "Ex4mp13P@ssw0rd" );
} );

test( "Should login existing user", async () => {
	const response = await request( app ).post( "/users/login" ).send( {
		email: userOne.email,
		password: userOne.password
	} ).expect( 200 );
	
	const user = await User.findById( userOne._id );
	expect( user.tokens[1].token ).toEqual( response.body.token );
	
} );

test( "Should fail to login nonexisting user", async () => {
	await request( app ).post( "/users/login" ).send( {
		email: "nonexisting@email.com",
		password: "4Rand0mp4ss"
	} ).expect( 400 );
} );

test( "Should get profile for user", async () => {
	await request( app )
		.get( "/users/me" )
		.set( "Authorization", `Bearer ${ userOne.tokens[0].token }` )
		.send()
		.expect( 200 );
} );

test( "Should not get profile for user", async () => {
	await request( app )
		.get( "/users/me" )
		.send()
		.expect( 401 );
} );

test( "Should delete profile for user", async () => {
	const response = await request( app )
		.delete( "/users/me" )
		.set( "Authorization", `Bearer ${ userOne.tokens[0].token }` )
		.send()
		.expect( 200 );
	
	const user = await User.findById( userOneId );
	expect( user ).toBeNull();
} );

test( "Should not delete profile for user", async () => {
	await request( app )
		.delete( "/users/me" )
		.send()
		.expect( 401 );
} );

test( "Should upload avatar image", async () => {
	await request( app )
		.post( "/users/me/avatar" )
		.set( "Authorization", `Bearer ${ userOne.tokens[0].token }` )
		.attach( "avatar", "test/fixtures/profile-pic.jpg" )
		.expect( 200 );
	
	const user = await User.findById( userOneId );
	expect( user.avatar ).toEqual( expect.any( Buffer ) );
} );

test( "Should update valid user fields", async () => {
	const name = "Bartlomiej";
	const response = await request( app )
		.patch( "/users/me" )
		.set( "Authorization", `Bearer ${ userOne.tokens[0].token }` )
		.send( {
			name
		} )
		.expect( 200 );
	
	const user = await User.findById( response._id );
	expect( response.body.name ).toBe( name );
} );


test( "Should not update invalid user fields", async () => {
	const response = await request( app )
		.patch( "/users/me" )
		.set( "Authorization", `Bearer ${ userOne.tokens[0].token }` )
		.send( {
			location: "Shire"
		} )
		.expect( 400 );
} );
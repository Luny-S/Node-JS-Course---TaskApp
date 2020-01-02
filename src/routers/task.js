const express = require( "express" );
const Task = require( "../models/task" );
const auth = require("../middleware/auth");
const router = new express.Router();

router.post( "/tasks", auth, async ( req, res ) => {
	// const task = new Task( req.body );
	const task = new Task({
		...req.body,//copy all fields from body
		owner: req.user._id
	});
	
	try {
		await task.save();
		res.status( 201 )
		   .send( task );
	}
	catch ( e ) {
		res.status( 400 )
		   .send( e );
	}
} );

router.get( "/tasks", async ( req, res ) => {
	try {
		const task = await Task.find( {} );
		
		res.status( 200 )
		   .send( task );
	}
	catch ( e ) {
		res.status( 400 )
		   .send( e );
	}
} );

router.get( "/tasks/:id", async ( req, res ) => {
	const _id = req.params.id;
	
	try {
		const task = await Task.findById( _id );
		
		if ( !task ) {
			return res.status( 404 )
			          .send();
		}
		res.status( 200 )
		   .send( task );
	}
	catch ( e ) {
		res.status( 500 )
		   .send( e );
	}
} );

router.patch( "/tasks/:id", async ( req, res ) => {
	const updates = Object.keys( req.body );
	const allowedUpdates = [ "description", "completed" ];
	const isValidOperation = updates.every( ( update ) => allowedUpdates.includes( update ) );
	
	if ( !isValidOperation ) {
		return res.status( 400 )
		          .send( { error: "Invalid updates!" } );
	}
	
	try {
		// const task = await Task.findByIdAndUpdate( req.params.id, req.body, {
		// 	new: true, // returns new task. With false it return the object state before update,
		// 	runValidators: true
		// } );

		const task = await Task.findById( req.params.id );
		
		if ( !task ) {
			return res.status( 404 )
			          .send();
		}
		
		updates.forEach( ( update ) => task[update] = req.body[update] );
		await task.save();
		
		res.status( 200 )
		   .send( task );
	}
	catch ( e ) {
		res.status( 400 )
		   .send( e );
	}
} );

router.delete( "/tasks/:id", async ( req, res ) => {
	try {
		const task = await Task.findByIdAndDelete( req.params.id );
		if ( !task ) {
			return res.status( 404 )
			          .send();
		}
		res.send( task );
	}
	catch ( e ) {
		res.status( 500 )
		   .send();
	}
} );

module.exports = router;
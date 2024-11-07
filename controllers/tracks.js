// controllers/tracks.js

const Track = require('../models/track.js')
const express = require('express')
const router = express.Router()

/* write out controller functions here */

/* The index-slash ('/') is being used because we are ALREADY inside of '/tracks' */

// CREATE - POST - /tracks
// Creates a new track object for the API
router.post('/', async (req, res) => {
    // res.json({ message: 'Create route'})
    let newTrackObject = req.body
    try {
        // Create a new track with the data from req.body
        const createdTrack = await Track.create(newTrackObject)
        res.status(201).json(createdTrack) // 201 Created
    } catch (error) { // Error handling
        res.status(500).json({ error: error.message })
    }
})

// READ - GET - /tracks
// Reads the contents of the route. a GET route
router.get('/', async (req, res) => {
    // res.json({ message: 'Index route'})
    try {
        const foundTracks = await Track.find() // Locates and spits out ALL track objects
        res.status(200).json(foundTracks)
    } catch (error) {
        res.status(500).json({ error: error.message }) // 500 Internal Server Error
    }
})

// READ - GET - /tracks/:trackId
// SHOW route, shows a specific track
router.get('/:trackId', async (req, res) => {
    // res.json({ message: `Show route for param ${req.params.trackId}`})
    let targetTrackID = req.params.trackId

    try {
        // Add query to find a single track
        const foundTrack = await Track.findById(targetTrackID)

        // If no track, show an error
        if (!foundTrack) {
            res.status(404)
            throw new Error(`Track with ID of ${targetTrackID} not found, therefore, cannot be shown`)
          }
        res.status(200).json(foundTrack) // 200 OK

      } catch (error) {
        // Add error handling code for 404 errors
        if (res.statusCode === 404) {
            res.json({ error: error.message })
          } else {
            // Add else statement to handle all other errors
            res.status(500).json({ error: error.message })
          }
      }
})

// DELETE - DELETE - /tracks/:trackId
// Deletes the given track by targetting its ID
router.delete('/:trackId', async (req, res) => {

    /* res.json({ message: `DELETE route for param ${req.params.trackId}`}) */

    let targetTrackID = req.params.trackId

    try {
        // Add query to find a single track
        const deletionTargetTrack = await Track.findByIdAndDelete(targetTrackID)

        // If no track, show an error
        if (!deletionTargetTrack) {
            res.status(404)
            throw new Error(`Track with ID of ${targetTrackID} not found, therefore, cannot be deleted`)
          }
        res.status(200).json(`Track with ID of ${targetTrackID} has been DELETED`) // 200 OK

      } catch (error) {
        // Add error handling code for 404 errors
        if (res.statusCode === 404) {
            res.json({ error: error.message })
          } else {
            // Add else statement to handle all other errors
            res.status(500).json({ error: error.message })
          }
      }
})

// UPDATE - PUT - /tracks/:trackId
// Updates the information of an existing track
router.put('/:trackId', async (req, res) => {
    // res.json({ message: `UPDATE route for param ${req.params.trackId}`})
    let targetTrackID = req.params.trackId
    let newTrackData = req.body

    try {
        // Add { new: true } as the third argument, to reload the updated track object
        const updatedTrack = await Track.findByIdAndUpdate(targetTrackID, newTrackData, { new: true, })
        if (!updatedTrack) {
            res.status(404)
            throw new Error(`Track with ID of ${targetTrackID} not found, therefore, cannot be UPDATED`)
        }
        res.status(200).json(updatedTrack)
    } catch (error) {
        // Add code for errors
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
})




// Export the router at the bottom of the file
module.exports = router
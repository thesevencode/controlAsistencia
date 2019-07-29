'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')

module.exports = async function setupUserModel (uri, config) {

    const mongoose = await setupDatabase(uri, config)

    const schema = new Mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        type: {
            type: String //authority ó student
        },
        code: { type: Number },
        dni: {
            type: Number,
            unique: true,
            required: true
        },
        photo: { type: String },
        assistance: {
            type: [Date]
        }
        
    }, { timestamps: true })



    return mongoose.model('participant', schema)

}
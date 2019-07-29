'use strict'

const ObjectId = require('mongoose').Types.ObjectId

module.exports = function (participantModel) {
    async function createOrUpdate (participant) {
        const cond = {
          _id: participant._id
        }
        const existingParticipant = await participantModel.findOne(cond)
    
        if (existingParticipant) {
          const updated = await participantModel.updateOne(
            cond,
            { $set: participant }
          )
          return updated ? participantModel.findOne(cond) : existingParticipant
          // modificar
        }
    
        const result = await participantModel.create(participant)
        return result.toJSON()
    }
    async function deleteByDni (dni) {
        const cond = {
            dni
        }
        const deleted = await  participantModel.deleteOne(cond)

        return deleted.deletedCount ? true : false
    }
    
    function findById (id) {
        
        if (!ObjectId.isValid(id)) {
          return null
        }
        return participantModel.findById(id)

    }

    function findByType (type) {
        const cond = {
            type
        }

        return participantModel.find(cond)
    }
    function findByCode (code) {
        const cond = {
            code
        }

        return participantModel.findOne(cond)
    }

    function findByDni (dni) {
        const cond = {
            dni
        }
        return participantModel.findOne(cond)
    }

    
    function findAll () {
        return participantModel.find()
    }

    async function addAssistanceByDni (dni, date) {
        const day = date.getDate() 
        const mon = date.getMonth() 
        const year = date.getFullYear() 


        const existing = await participantModel.findOne({
            dni,
            assistance : { $elemMatch:  { $gte: new Date(year, mon, day), $lte: new Date(year, mon, day + 1) }  },
        })



        if(!existing) {
            const update = await participantModel.updateOne(
                { dni },
                {
                $push: {
                    assistance: {
                    $each: [date]
                    }
                }
                }
            )

            return update ? true :  undefined
        }

        return  false
       
    }

    function findByAssistance (startDate, endDate) {
        return participantModel.find({
            assistance : { $elemMatch:  { $gte: startDate, $lte: endDate }  }
        })
    }

    return {
        createOrUpdate,
        deleteByDni,
        findById,
        findByType,
        findByCode,
        findByDni,
        addAssistanceByDni,
        findByAssistance,
        findAll
    }

}
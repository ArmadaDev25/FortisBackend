const db = require('../models')

const getCollection = (req, res) => {
    
}

const createCollection = async (req, res) => {
    try{
        req.body.cards = []
        const createdCollection = await db.Collection.create(req.body)
        createdCollection.save()
        if(!createdCollection){
            res.status(400).json({message: "Cannot Create Collection"})
        }else{
            res.status(201).json({data:createdCollection, message:"Collection Created"})
        }
    } catch(err){
        res.status(400).json({error: err.message})
    }
}

const updateCollection = (req, res) => {

}

const deleteCollection = (req, res) => {

}

module.exports = {
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection
}
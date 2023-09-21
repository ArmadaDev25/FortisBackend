const db = require('../models')

const getCollection = async (req, res) => {
    try{
        const foundCollection = await db.Collection.findById(req.params.collectionID)
        if(!foundCollection){
            res.status(404).json({message: 'Cannot find Collection'})
        }else{
            res.status(200).json({data: foundCollection})
        }
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const getCollections = async (req, res) => {
    try{
        const foundCollections = await db.Collection.find()
        if(!foundCollections){
            res.status(404).json({message: 'Cannot find Collection'})
        }else{
            res.status(200).json({data: foundCollections})
        }
    }catch(err){
        res.status(400).json({error: err.message})
    }
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

const updateCollection = async (req, res) => {
    try{
        const updatedCollection = await db.Collection.findByIdAndUpdate(req.params.collectionID, req.body, {new: true})
        if(!updatedCollection){
            res.status(400).json({message: "Cannot update Collection"})
        }else{
            res.status(200).json({data:updatedCollection, message:"Collection updated"})
        }
    }catch(err){
        res.status(400).json({error: err.message })
    }
}

const deleteCollection = async (req, res) => {
    try{
        const foundCollection = await db.Collection.findByIdAndDelete(req.params.collectionID)
        if(!foundCollection){
            res.status(400).json({message: "Could not delete Collection"})
        }else{
            foundCollection.cards.forEach(async (card) => {
                await db.PokeCard.findByIdAndDelete(card._id)
            })

            res.status(200).json({data: foundCollection, message: "Collection deleted"})
        }
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    getCollection,
    getCollections,
    createCollection,
    updateCollection,
    deleteCollection
}
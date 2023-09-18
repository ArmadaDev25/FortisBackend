const e = require('express')
const db = require('../models')

const getPokeCard = (req, res) => {

}

const createPokeCard = async (req, res) => {
    try{
        const newCard = {}
        const foundCard = req.body
        newCard.name = foundCard.name
        newCard.category = foundCard.category
        newCard.setLogo = `${foundCard.set.logo}.png`
        newCard.image = `${foundCard.image}/high.png`
        newCard.id = `${foundCard.localId}/${foundCard.set.cardCount.official}`
        newCard.illustrator = foundCard.illustrator
        newCard.rarity = foundCard.rarity
        
        if(newCard.category === 'Pokemon'){
            newCard.typing = []
            foundCard.types.forEach((type) => {
                newCard.typing.push(type)
            })

            foundCard.stage ? newCard.stage = foundCard.stage : newCard.stage = "Basic"

            if(foundCard.abilities){
                newCard.ability = {}
                newCard.ability.type = foundCard.abilities[0].type
                newCard.ability.name = foundCard.abilities[0].name
                newCard.ability.effect = foundCard.abilities[0].effect
            }

            if(foundCard.attacks){
                newCard.moves = []
                foundCard.attacks.forEach((attack) => {
                    const move = {}
                    move.name = attack.name
                    move.damage = attack.damage
                    
                    move.cost = []
                    attack.cost.forEach((c) => {
                        move.cost.push(c)
                    })
                    move.effect = attack.effect
                })
            }

            foundCard.weaknesses ? newCard.weakness = `${foundCard.weaknesses[0].type} ${foundCard.weaknesses[0].value}` : newCard.weakness = "None"
            foundCard.resistances ? newCard.resistances = foundCard.resistances : newCard.resistances = "None"
            newCard.retreat = foundCard.retreat
            newCard.hp = foundCard.hp

        } else if(newCard.category === 'Energy'){
            newCard.typing = []
            foundCard.types.forEach((type) => {
                newCard.typing.push(type)
            })
            newCard.energyType = foundCard.energyType
            newCard.effect = foundCard.effect

        } else if(newCard.category === 'Trainer'){
            newCard.trainerType = foundCard.trainerType
            newCard.effect = foundCard.effect
        } else {
            throw new TypeError('Not a correct Catagory!')
        }

        
        const createdPokeCard = await db.PokeCard.create(newCard)
        const foundCollection = await db.Collection.findById(req.params.collectionID)
        
        console.log(createdPokeCard)
        if(!createdPokeCard){
            res.status(400).json({message: "Cannot Create PokeCard"})
        }else {
            console.log(foundCollection)
            console.log(createdPokeCard, "This is line 79")
            if(foundCollection){
                foundCollection.cards.push(createdPokeCard)
                await foundCollection.save()
            }else{
                throw new TypeError('Cannot find Collection!')
            }
            res.status(201).json({data:createdPokeCard, message:"PokeCard Created"})
        }
    } catch (err){
        res.status(400).json({error: err.message})
    }
}

const updatePokeCard = (req, res) => {

}

const deletePokeCard = (req, res) => {

}

module.exports = {
    getPokeCard,
    createPokeCard,
    updatePokeCard,
    deletePokeCard
}
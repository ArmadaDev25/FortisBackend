const db = require('../models')

const getPokeCard = async (req, res) => {
    try{
        const foundPokeCard = await db.PokeCard.findById(req.params.pokeCardID)
        if(!foundPokeCard){
            res.status(404).json({message: 'Cannot find PokeCard'})
        }else{
            res.status(200).json({data: foundPokeCard})
        }
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const createPokeCard = async (req, res) => {
    try{
        const newCard = {}
        const foundCard = req.body
        newCard.name = foundCard.name
        newCard.category = foundCard.category
        newCard.setLogo = `${foundCard.set.logo}.png`
        newCard.image = `${foundCard.image}/high.png`
        newCard.localId = `${foundCard.localId}/${foundCard.set.cardCount.official}`
        foundCard.illustrator ? newCard.illustrator = foundCard.illustrator : newCard.illustrator = "TBD"
        newCard.rarity = foundCard.rarity
        
        if(newCard.category === 'Pokemon'){
            newCard.typing = []
            foundCard.types.forEach((type) => {
                newCard.typing.push(type)
            })

            foundCard.stage ? newCard.stage = foundCard.stage : newCard.stage = "Basic"

            if(foundCard.abilities){
                newCard.abilities = []
                foundCard.abilities.forEach((ability) => {
                    const abil = {}
                    abil.aType = ability.type
                    abil.name = ability.name
                    abil.effect = ability.effect

                    newCard.abilities.push(abil)
                })
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
                    newCard.moves.push(move)
                })
            }

            foundCard.weaknesses ? newCard.weakness = `${foundCard.weaknesses[0].type} ${foundCard.weaknesses[0].value}` : null
            foundCard.resistances ? newCard.resistances = `${foundCard.resistances[0].type} ${foundCard.resistances[0].value}` : null
            newCard.retreat = foundCard.retreat
            newCard.hp = foundCard.hp

        } else if(newCard.category === 'Energy'){
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
                console.log(foundCollection.cards, createdPokeCard, "This is line 82")
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

const updatePokeCard = async (req, res) => {
    try{
        const updatedPokeCard = await db.PokeCard.findByIdAndUpdate(req.params.pokeCardID, req.body, {new: true})
        if(!updatedPokeCard){
            res.status(400).json({message: "Cannot update Poke Card"})
        }else{
            const foundCollection = await db.Collection.findById(req.params.collectionID)
            const pokeCard = foundCollection.cards.id(req.params.pokeCardID)
            foundCollection.cards.splice(foundCollection.cards.indexOf(pokeCard), 1, updatedPokeCard)
            foundCollection.save()
            res.status(200).json({data:updatedPokeCard, message:"Poke Card updated"})
        }
    }catch(err){
        res.status(400).json({error: err.message })
    }
}

const deletePokeCard = async (req, res) => {
    try{
        const foundCollection = await db.Collection.findById(req.params.collectionID)
        const pokeCard = foundCollection.cards.id(req.params.pokeCardID).deleteOne()
        const deletedPokeCard = await db.PokeCard.findByIdAndDelete(req.params.pokeCardID)
        foundCollection.save()
        if(!deletedPokeCard){
            res.status(400).json({message: 'Could not delete PokeCard'})
        } else {
            res.status(200).json({data: deletedPokeCard, message: "PokeCard deleted"})
        }

    }catch (err){
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    getPokeCard,
    createPokeCard,
    updatePokeCard,
    deletePokeCard
}
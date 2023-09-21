const mongoose = require('mongoose')

const pokeCardsSchema = new mongoose.Schema({
    name: {type: String, required: true}, //Name of Card
    category: {type: String, required: true}, //Type of Card (Pokemon,Energy,Trainer)
    setLogo: {type: String, required: true}, //must put .png after logo
    image: {type:String, required: true}, //must put /high.png 
    isFavorite: {type: Boolean, default: false}, //for favorites carosel
    localId: {type: String, required: true}, //cardNum/setOriginalNum
    illustrator: {type: String, required: true}, //illustrator of card
    rarity: {type: String, required: true}, //Common,Uncommon, ect

    //Pokemon/Energy Cards
    typing: [String], //some pokemon are double typed

    //Pokemon Cards
    evolveFrom: String, //Pokemon it evolves from
    stage: String, //basic stage1 or stage2
    abilities: [{
        aType: String, //Pokebody, Pokepower etc..
        name: String, //ability name
        effect: String //effect of ability
    }],
    moves: [{
        name: String, //move name 
        damage: Number, //damage
        cost: [String], //cost of move
        effect: String //effect of move
    }],
    weakness: String,
    resistances: String,
    retreat: Number,
    hp: Number,

    //Energy Cards
    energyType: String, //Special or Basic

    //Energy/Trainer Cards
    effect: String,

    //Trainer Cards
    trainerType: String //Item, Supporter, Tool, Stadium
})

const collectionSchema = new mongoose.Schema({
    name: {type: String, default: String, required: true}, //name of collection
    description: String, //description of collection
    img: String, //Cover image of collection
    cards: [pokeCardsSchema], //Cards in collection
    //favoriteCards: [pokeCardsSchema]
})


const PokeCard = mongoose.model("PokeCard", pokeCardsSchema)
const Collection = mongoose.model("Collection", collectionSchema)

module.exports = {PokeCard, Collection}
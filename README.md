# Fortis Backend

## Set up Backend
- NPM install dependencies
- Make a .env file with a MongoDB url link
- OPTIONAL: add your own server port to .env file

## Backend Routes
### Collection Routes (/collections)
|#|Collections Backend Route|URL|HTTP Verb|
|:---:|:---:|:---:|:---:|
|1| Get all Collections | /collections/ | GET | 
|2| Get one Collection | /collections/:collectionID | GET | 
|3| Create Collection | /collections/ | POST | 
|4| Update Collection | /collections/:collectionID | PUT | 
|5| Delete Collection | /collections/:collectionID | DELETE | 

### PokeCards Routes (/collections/:collectionID/cards)
|#|PokeCards Backend Route|URL|HTTP Verb|
|:---:|:---:|:---:|:---:|
|2| Get one PokeCard | /collections/:collectionID/cards/:pokeCardID | GET | 
|3| Create PokeCard | /collections/:collectionID/cards/ | POST | 
|4| Update PokeCard | /collections/:collectionID/cards/:pokeCardID | PUT | 
|5| Delete PokeCard | /collections/:collectionID/cards/:pokeCardID | DELETE | 
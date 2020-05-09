# Cs546Group6Recipebook

A platform for users to access recipes from a pool of recipes shared by users. Following are the features :

### Core features: 
- Main page: The main page after will show the “hottest” recipes with most likes or the “Latest” recipes which show the trend of what’s on people’s minds these days.  Users can sort recipes based on newest ones, most popular ones or categories.
- Sign in / Sign up page
- Post recipe
- Allow users to post a new recipe once signed in
- Allow users to comment on recipes
- Grocery List, adding the recipe ingredients to a grocery list.
- Likes on recipe
- Allow users to show their interest in recipes.
- View recipe
- Allow users to view details of recipes (like ingredients, photos, instructions and how long to be ready).
- Search recipe
- Allow users to search recipes (Like search bar on the Nav bar)
- Edit recipe
- Allow users to edit recipes after signing in.

### Extra features:
- Comments
- Allow users to post comments on recipes.
- Grocery list
- Allow users to add ingredients of recipes to the grocery list.
- Google maps: Add Google maps for users to find grocery stores nearby.
- Media share
- Responsive site


## Group Members
- [Jianghao Li](https://github.com/travislee0711)
- [Maurizio Bella](https://github.com/MaurizioBella/)
- [Shen Fan](https://github.com/almoshen)
- [Tejashree Prabhu](https://github.com/TP170996)

## Components
- angular2 (This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3)
- express
- mongoose
- nodemon

## Where to start to change something
Develop is the default branch. Run from a terminal

- `git clone https://github.com/MaurizioBella/cs546-group6-recipebook.git`
- `cd cs546-group6-recipebook`
- `git checkout develop`
- `git pull`

Now you can start work locally. To push to Git run from terminal

- `git add <files>`
- `git commit -m "your message"`
- `git push --set-upstream origin develop`

If you want to deploy a new version to production on Heroku, just create a pull request from develop to the production branch and merge it.
Heroku will deploy the code automatically once you merged the code.

Do not run multiple merge at the same time. The deployment process might take about 5 minutes. Take some coffee!


## Development
- If you want to run it locally, you should install MongoDB first then
- `npm start` to run it within the directory cs546-group6-recipebook
- Navigate to [localhost](http://localhost:8080/) port 8080

## Deployment
This application use Heroku on the following URL  [Heroku](https://cs546-group6-recipebook.herokuapp.com/) 


## Features
- Authentication
- Rest API
- Grunt generic task-runner for Node.js projects

## Init
- configure .env
- seed the db with 2 dummy records `node .\app_api\tasks\seed.js`

## run
- `npm run start` "node cluster.js",
- `npm run dev` "nodemon cluster.js",
- `npm run debug` "node --nolazy --inspect-brk=9229 cluster.js",
- `npm run log` "$env:DEBUG='*' & nodemon cluster.js",

## Web
- / home page

## API
- Refer to PostMan [collection](https://github.com/MaurizioBella/cs546-group6-recipebook/blob/feature/api/wiki/CS546-Recipe-Project.postman_collection.json)
 

## DB
- MongoDB and Mongoose
- Remember to set Network Access on cloud.mongodb.com

## Packages
- [express-session](https://github.com/expressjs/session)
- Express
- Redis: used with express-session
- MemChachier (off development)
- [Debug] (https://www.npmjs.com/package/debug)
- Logging (morgan, winston)
- Documentation Swagger: swagger-jsdoc swagger-ui-express

## Authentication
- session with cookies
- MemoryStore for development and Redis for production


## Add-ons
- heroku addons:open papertrail --app node-js-heroku-demo``

## .env
- PORT=3000
- WEB_CONCURRENCY=2
- WEB_MEMORY=512
- NODE_ENV=production || development
- NODE_HOST=localhost
- CLUSTER_TYPE=0 || 1 || 2
### mongodb
- MONGODB_URI=mongodb+srv://...
### logging
- MORGAN_FORMAT=none | dev  | etc.
### redis
- REDIS_URL=redis://ip:port
### session cookies
- SESSION_COOKIE_NAME=_herokuNodeJsCookie
- SESSION_COOKIE_SECRET=
- SESSION_COOKIE_MAX_AGE=86400000
- SESSION_COOKIE_SAME_SITE=strict
- SESSION_COOKIE_SECURE=true
- SESSION_COOKIE_PATH=/

## HTTP status code
- 401 Unauthorized - Authentication: verify identity
- 403 Forbidden - Authorization: verifying permissions
- 404 Not Found - Page not found


## Presentation
[CS-546-Group6-Recipe-Project Pitch Presentation](https://cdnapisec.kaltura.com/p/2240011/sp/224001100/embedIframeJs/uiconf_id/37990001/partner_id/2240011?iframeembed=true&playerId=kaltura_player&entry_id=1_uhthotxe&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_ev8lrsrx)

## Other
Use [MEditor](https://pandao.github.io/editor.md/en.html) to create a nice Readme



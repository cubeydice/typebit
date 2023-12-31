![typebit](docs/typebit.png)
# Background
typebit is a typing game in a charming pixelated style made with sweet Vanilla JavaScript. Accurate typing on a keyboard allows your little animal to proceed through a 2D environment and blast your way through enemies.

Enemies have words above their heads. Typing those words gets rid of the enemies in your way! Typing inaccuracies or failing to get rid of an enemy before it reaches you will decrease your health. You you may encounter road blocks that require a minimum typing speed to get through them.

Completing each level of the game will display player stats.

# Functionality & MVPs
In typebit, users will be able to:

* use accurate typing to get rid of enemies
* type faster to break down blockades

In addition, this project will include:
* A tutorial describing the background and rules of the game
* A production README

# Wireframes
![typebit wireframe](docs/wireframe.png)

* Nav links include links to this project's Github repo and my LinkedIn
* Menu links include optionsn for the player to restart the game
* Near the bottom of the screen are buttons that allow the user to start the game or view a tutorial

# Technologies, Libraries, APIs
This project will be implemented with the following technologies:
* `Canvas API` to render the game environment
* A dictionary API to provide words for the player to type
* `Webpack` and `Babel` to bundle and transpile the source JavaScritp code
* `npm` to manage the project dependencies

# Implementation Timeline
* **Friday Afternoon & Weekend:** Setup project, including getting webpack up and running. Get canvas to show up on the screen. Create `Background`, `Player`, `Enemy`, and `Blockade` classes.
* **Monday:** Dedicate to implementing underlying logic of typebit. Ensure players, enemies, and blockades animate and interact correctly.
* **Tuesday:** Ensure player health is decremented correctly and complete end game screen with game instance data for the player.
* **Wednesday:** Finish implementing user controls, and focus on styling. If time, create simple visual for end game data.
* **Thursday Morning:** Deploy final version to GitHub.

# Future Updates
## Blockades
* create blockades that can only be destroyed based on a minimum WPM
## Levels
* create levels of differing difficulty (length of words/quotes, punctuation)
* change to darker/redder background based on difficulty
## End Game
* add titles for a range of scores
* add more data, such as enemies defeated, words typed, words that hurt player, etc

# Resources
### Images
[Pixel Slime](https://rvros.itch.io/pixel-art-animated-slime)

[Tiny Hero Sprites](https://craftpix.net/freebies/free-pixel-art-tiny-hero-sprites/)

[Nature Background](https://craftpix.net/freebies/free-nature-backgrounds-pixel-art/)

[Hearts by Nicole Marie T](https://nicolemariet.itch.io/pixel-heart-animation-32x32-16x16-freebie)

### Music
[Sounds by Dagurasu](https://dagurasusketch.itch.io/retrosounds)
[Background Music by Rin](https://pluslerin.itch.io/retro-rpg-bgms)

### Icons
[Freepik](https://www.flaticon.com/authors/freepik)

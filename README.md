## Overview

TypeFast is a simple typing game, where users could train on typing speed. Also,
this game provides some other new experience to users during the game as there 
are a lot of animations, and greate user interface. 

The game basically will have text boxes containing random words or meaningless
text falling from the top. The number of boxes falling is gradually increasing 
during the game, as well as the speed of falling. Users need to clear out the 
text boxes before the boxes hit the groud, and users have to clear them in the 
order of falling. Users allow to have 3 attempts per game before entirely losing 
the game. 

### Functionality & MVP

In TypeFast, users will be able to :
* Select the difficulty before starting the game, speed?
* Mute/Unmute the background music
* Select the theme of the game making it more user-friendly
* View their history scores
* Type in the input box to play the game

### Wireframes

The game will consist of a single page with a play button at the beginning, and 
link to Github repo.

Upon pressing the play the game button, user selects the difficulty and start.
Text boxes start falling from the top, and user needs to type at the input area
to clear out the boxes before they hit the ground. Score is displayed at the 
top bar, and attempts are aside of input box. Mute/Unmute botton is displayed at
the corner as well as the theme change button.

### Technologies employed
* Vanilla JavaScript for game logic
* HTML 5 Canvas for rendering the game
* Howler.js for background music
* Webpack to bundle various scripts into a single source

#### Main files
* board.js: game canvas, which holds the process of the game, and game logic
* textBox.js: text box, which user needs to clear out
* userInput.js: input box for user to enter text

##### Day1:
-[] Brainstroming, game logic and proposal
-[] Setup github, and basic skeleton

##### Day2: 
-[] Complete the canvas, and structure
-[] Play the background music, able to mute/unmute background music
-[] Be able to switch the theme, i.e, the color 

##### Day3: 
-[] Complete text box, can change color according to the theme
-[] Be able to render the box in game canvas
-[] Be able to fall from the top depending on the difficulty

##### Day4: 
-[] Complete merge everthing together
-[] Score will be updated
-[] Be able to stop the game when user loses

##### Day5:
-[] Be able to fix bugs, and implement more features
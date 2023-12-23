# Dragon Ball Game
Created by: Caleb V. & Emmet T.
## Overview
The Dragon Ball Game is a science trivia game inside an arcade machine for kids and young adults to play on. It is an Electron based application made for Windows.


# Developers
### Definitions
* Game - One full cycle of the whole application.
* Round - One full cycle through the 3 main stages: Team Selection, Question, and Leaderboard.
* Stage - A phase that the application is in.
## Stages
![Dragon Quest Game Stage](https://raw.githubusercontent.com/Aviator2276/Dragon_Quest_Game/main/Dragon_Quest-Game_Design.drawio.png?token=GHSAT0AAAAAACK3TRLC7XJDOXSM5AHWU7TWZMHE2TQ)

**Game Start Stage**
* When the application is first ran.
* Important Events:
  * Update question database
  * Load question database
  * Start main process

**Configuration Stage**
* User selects the total amount of teams playing this Game
* Important Events:
  * Total teams playing this Game

**Team Selection Stage**
* Application shows the current Team playing for this round
* Important Events:
  * Displays the current Team
  * Setup for current Team
  * Reset scoring for current Team

**Question Stage**
* Starts a 60-second timer that counts down.
* Players answer as many questions as they can.
* Correct: +20 Points | Incorrect: -10 Points
* Important Events:
  * Question database is loaded and randomized, with no duplicates during the Game
  * Points for the team is updated after every question.

**Leaderboard Stage**
* If this is the last round, skip to Winner Stage
* Show accumulated score during round to the current Team
* Show Team placement on the leaderboard
* Important Events:
  * Skip if last round
  * Show placement of Team in leaderboard

**Winner Stage**
* Shows the last place Team first then to the first place team
* With confetti!
* Important Events:
  * Resets the Game with a reload
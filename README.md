# Starter Repository for Assignment
# Project Title

CA2

Sustainable Time Voyage is an innovative game platform merging environmental consciousness with immersive gameplay. Participants undertake tasks promoting sustainable practices, earning points for each objective completed. These points unlock time-traveling opportunities and enable the acquisition of historically significant artifacts, fostering environmental stewardship and a deeper appreciation for our planet's heritage. This unique theme encourages players to immerse themselves in a time-traveling experience while actively engaging in sustainability efforts across historical periods, intertwining the thrill of time travel with the imperative of sustaining our planet. Through this experience, players gain a profound understanding of the interconnectedness between history, ecology, and our role in preserving Earth across time.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)

## Installation 

1. *Clone the Repository*

 1. Open Visual Studio Code (VSCode) on your local machine.

 2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

 3. Click on the "Clone Repository" button.

 4. In the repository URL input field, enter https://github.com/ST0503-BED/bed-ca2-saranya101

 5. Choose a local directory where you want to clone the repository.

 6. Click on the "Clone" button to start the cloning process.

 7. Go to the directory 

   
   

2. *Install dependencies*: Install the necessary dependencies by running the following command.

   shell
   npm install
   npm init
   npm install dotenv express mysql2 nodemon
   npm install jsonwebtoken bcrypt
   

3. *Change database file* : Change the Database location to your database.

  1. go to .env file

  2.  DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=maybeSEP1996
    DB_DATABASE=ca1
    JWT_SECRET_KEY=maybeSEP1996
    JWT_EXPIRES_IN=15m
    JWT_ALGORITHM=HS256

   change the values according to your own passwords etc.

## Usage

1. *Running the program*: Run the program to send the http requests.

    1. npm run init_tables
    
    
    2. npm run dev
    
    


2. *Accessing on broweser* : Run the program on a browser.

1. Go to a browser of your preference

2. Type in this address http://localhost:3000
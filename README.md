# Tic-Tac-Toe Game

A full-stack tic-tac-toe game built with React, Spring Boot, and PostgreSQL. Players enter their names, play a game, and completed games are saved to a database and shown in the game history view.

I started with the React online tutorial: https://react.dev/learn/tutorial-tic-tac-toe
But then add features like player names, reset game, and game history myself. I learned a lot about how React worked and how to write the different components.

I used Render to deploy the game, which helped me set up the environment variables for the React code, Java SpringBoot, and the Postgres database. It is on the free plan and will expire in 30 days. Link: https://tictactoe-game-73th.onrender.com

We are using the npm package manager.

## File Structure
csce490_research_milestone/
│
├── src/                                  # React front-end source files
│   ├── App.js                            # Game board, player inputs, reset, and history UI
│   ├── index.js                          # React application entry point
│   └── styles.css                        # Front-end styling
│
├── public/                               # Static files used by React
│
├── package.json                          # React dependencies and npm scripts
│   ├── index.html
│
├── backend/
│   └── tictactoe-api/
│       ├── src/
│       │   └── main/
│       │       ├── java/
│       │       │   └── com/botteon/tictactoe_api/
│       │       │       ├── TictactoeApiApplication.java  # Spring Boot entry point
│       │       │       ├── Game.java                     # Database entity for a completed game
│       │       │       ├── GameRepository.java           # Database repository
│       │       │       └── GameController.java           # API endpoints
│       │       │
│       │       └── resources/
│       │           └── application.properties            # Database and server configuration
│       │
│       ├── Dockerfile                       # Instructions for deploying the API
│       ├── pom.xml                          # Maven dependencies and project configuration
│       └── mvnw                             # Maven wrapper
│
└── package.json
└── README.md
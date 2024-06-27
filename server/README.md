# Spotify Browser Server

This project is the backend server for the Spotify Browser application, which handles API requests to Spotify's API and provides data to the frontend Angular application.

## Table of Contents

- [Todo](#todo)
- [Installation](#installation)
- [Usage](#usage)
- [Token](#token)
- [API Endpoints](#api-endpoints)
- [Directory Structure](#directory-structure)

## Todo

- Add an API endpoint to make a search request
- Log errors to log file

## Installation

### Prerequisites

- Node.js
- npm

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/ivanl86/
   cd

2. Install dependencies:
    ```sh
    npm install

3. Create .env file in src directory
    ```sh
    PORT=####
    CLIENT_ID=your-spotify-client-id
    CLIENT_SECRET=your-spotify-client-secret
    BASE_URL=https://accounts.spotify.com

## Usage

- Start the server:
    ```sh
    npm start

- The start will start on the port defined in .env:
    ```sh
    http://localhost:####

- If it failed to start, it will start on default port 3000
    ```sh
    http://localhost:3000

## Token

## API Endpoints

### Albums

- GET /routes/albums/:id: Fetches album details by ID.

### Artists

- GET /routes/artists/:id: Fetches artist details by ID.

### Tracks

- GET /routes/tracks/:id: Fetches track details by ID.

- The server will store the requested token from Spotify's API in the token directory which is in the service directory
- A new token will be automatically requested once the stored token expired

## API Endpoints

### Albums

- GET /routes/albums/:id: Fetches album details by ID.

### Artists

- GET /routes/artists/:id: Fetches artist details by ID.

### Tracks

- GET /routes/tracks/:id: Fetches track details by ID.

## Directory Structure

```sh
server/
├── src/
│   ├── middleware/
│   │   └── logger.ts           # Logger
│   ├── model/
│   │   └── token.ts            # Token interface
│   ├── routes/
│   │   ├── albums/
│   │   │   └── albums.ts       # Album routes
│   │   ├── artists/
│   │   │   └── artists.ts      # Artist routes
│   │   ├── tracks/
│   │   │   └── tracks.ts       # Track routes
│   │   └── routes.ts           # Root route
│   ├── services/
│   │   ├── token/
│   │   │   └── token-handler.ts    # Token handler service
│   │   └── token-auth.ts       # Token authentication service
│   ├── app.ts                  # Express app setup
│   ├── server.ts               # Server setup
├── .env                        # Environment variables
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

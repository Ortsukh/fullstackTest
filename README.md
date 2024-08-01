
This is a full-stack web application that includes a server-side API and a client-side web interface.

## Getting Started

To run this project, you'll need to have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Docker](https://www.docker.com/)

### Running the Server

1. Navigate to the `server` directory:

   ```bash
   cd .\server
   ``` 
Install the server-side dependencies:
   ```bash
    npm install
   ```

Build the Docker image for the MongoDB database:
```bash
docker build -t my-mongodb .
```
Run the MongoDB container:
```bash
docker run -d --name mongodb -p 27017:27017 my-mongodb
```
Start the server:
```bash
npm run start
```
The server will now be running at http://localhost:5000.

Running the Web Client
Navigate to the front directory:
```bash
cd .\front
```
Install the client-side dependencies:
```bash
npm install
```
Start the web client:
```bash
npm run start
```
The web client will now be running at http://localhost:3000.
Technologies Used
Server-side:
Node.js
Express.js
MongoDB
Docker
Client-side:
React
Redux
Styled Components
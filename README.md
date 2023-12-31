# Pastebin

This is a pastebin application built with Next.js and Docker. It allows users to create and store plain text and/or code snippets and then share them with others. You can start using it [here](https://pastejon.vercel.app/).

### Features

- Create a new paste by entering text in the editor and clicking "save" to generate a paste ID for it.
- Access a previous paste by appending the paste ID to the URL (e.g., [https://pastejon.vercel.app/paste123](https://pastejon.vercel.app/paste123)).
- Select a programming language for syntax highlighting and auto-complete.

## Running the app locally

### Prerequisites

- Have [Node.js](https://nodejs.org/en/download) installed.
- Have [Docker](https://docs.docker.com/get-docker) installed.

### Steps

1. After cloning the repo, run the command below:

    ```
    npm -i
    ```
    
    This will install all the required packages for the app. <br><br>


2. Then, start the application by running the following on the terminal:

    ```
    docker compose up --build
    ```

    This command will build the Docker images for the application and database, create the necessary containers, create a network for communication between the containers, mount a volume to the database container for data persistence, and then finally start the services. <br><br>


3. Access the pastebin application in a web browser at [http://localhost:3000](http://localhost:3000).

### Notes

- On subsequent runs, the "--build" flag can be omitted unless changes have been made to the Dockerfiles or the build context.
- To remove all the created containers, networks, and volumes use this command:

    ```
    docker compose down -v
    ```

    Doing this will also delete all the pastes that have been saved up to that point. 
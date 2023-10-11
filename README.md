# Pastebin

This is a simple Pastebin application built with NextJs and Docker. It allows users to create and store plain text and/or code snippets and then share them with others.

## Prerequisites
- Have [Docker](https://www.docker.com/) installed.

## How to start using the app

1. Start the application by entering the following on the terminal:

    ```
    docker compose up --build
    ```

    This command will build the Docker images for the application and database, create the necessary containers, create a network for communication between the containers, mount a volume to the database container for data persistence, and then finally start the services.

2. Access the Pastebin application in a web browser at [http://localhost:3000](http://localhost:3000).

## Features

- Create a new paste by entering text in the editor and clicking 'save' to generate a paste ID for it.
- Access a previous paste by appending the paste ID to the URL (e.g., [http://localhost:3000/paste123](http://localhost:3000/paste123)).
- Select a programming language for syntax highlighting and auto-complete.

## Notes

- On subsequent runs, the '--build' flag can be omitted unless changes have been made to the Dockerfiles or the build context.
- To remove all the creted containers, networks, and volumes use this command:

    ```
    docker compose down -v
    ```

    Doing this will also delete all the pastes that have been saved up to that point. 
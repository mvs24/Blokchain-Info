# Blokchain-Info 
This project uses Docker & Docker compose.
To run this project you need to have Docker installed on your computer.

To run this project you need to follow these steps:

1- Open your terminal and run: git clone https://github.com/mvs24/Blokchain-Info.git (you will get a folder with the name Blokchain-Info with the entire project inside)
2- Run on terminal: cd Blokchain-Info
3- Run on terminal: npm i (to install all the backend dependencies)
4- Run: cd frontend
5- Run: npm i (to install all the frontend dependencies)
6- Run: cd ..
STEPS 3-6 (if you want to work with the code)
7- docker-compose up --build (this project uses docker compose with 4 containers (backend, frontend, redis and nginx) and wait until everything is finished running.
That's it so easy just 1 command (docker-compose up --build)
Now open the browser on: localhost:3050 (3050 on our host points to port 80 inside the NGINX container)
That's all.

#DESIGN OF THE PROJECT
In this project I have used Node.JS for backend together with TypeScript & React.JS for frontend with TypeScript.

BACKEND:
There are 2 endpoints: 
1- GET: /api/v1/blocks (it accepts as query params: timestamp, page, limit) (To get all the blocks for the specified timestamp)
2- GET: /api/v1/blocks/:hash (to get one specific block)

#Backend Design:
Everything starts with an express server on server.ts file.
I have specified the /api/v1/blocks route and the code for this route is on controllers/blocks.ts.
1- Error Handling: I have used global error handling with express
For this I have created a HTTPError class which extends Error class for operational errors && asyncWrapper HOF to not repeat try & catch blocks every time.
I have seperated development errors from production errors via different responses. (controllers/error.ts) file
2- Caching: I have used REDIS for caching by creating a Redis class (redis.ts) file.
3- Continuos Integration: I have configured travis-ci for continuos integration & I want to mention how to do Continuos deployment to AWS.
We need to configure travis-ci for this and create a Dockerrun.aws.json file for configuration (aws & docker) for deployment to elastic beanstalk.
* On api-swagger.yaml is the documentation of the API

#Docker Configuration:
1- We have dockerfiles on root directory (backend) & frontend for building the backend and frontend containers
2- On nginx/default.conf is the configuration for forwarding the traffic to server/client. There is also a Dockerfile to create the nginx container.
3-Docker-compose.yaml contains the configuration for all the containers: frontend, backend, redis and ngix.

#Frontend Design.
Everything starts on src/App.tsx
I have used react-router-dom for routings.
There are 2 pages (Home which renders all blocks and BlockDetails which render info about one single block)
There is a components folder that contains all ui components for the frontend.
I have used react-table for rendering the table in the most efficient way.
In the hooks folder I have created useHttp hook for sending requests and keeping track of loadings & errors.
For styling I have used css modules & styled components.
I have used React.memo, useCallback & useMemo to improve performance on different part of the frontend.

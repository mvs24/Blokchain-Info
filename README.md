# Blokchain-Info 
This project uses Docker & Docker compose. <br />
To run this project you need to have Docker installed on your computer. <br />

To run this project you need to follow these steps: <br />

1- Open your terminal and run: git clone https://github.com/mvs24/Blokchain-Info.git (you will get a folder with the name Blokchain-Info with the entire project inside) <br />
2- Run on terminal: cd Blokchain-Info <br />
3- Run on terminal: npm i (to install all the backend dependencies) <br />
4- Run: cd frontend <br />
5- Run: npm i (to install all the frontend dependencies) <br />
6- Run: cd .. <br />
STEPS 3-6 (if you want to work with the code) <br />
7- docker-compose up --build and wait until everything is finished running. <br />
That's it, so easy just 1 command (docker-compose up --build) <br />
Now open the browser on: localhost:3050 (3050 on our host points to port 80 inside the NGINX container) <br />
That's all. <br />

#DESIGN OF THE PROJECT <br />
In this project I have used Node.JS for backend together with TypeScript & React.JS for frontend with TypeScript.<br />

BACKEND: <br />
There are 2 endpoints: <br />
1- GET: /api/v1/blocks (it accepts as query params: timestamp, page, limit) (To get all the blocks for the specified timestamp)<br />
2- GET: /api/v1/blocks/:hash (to get one specific block)<br />

#Backend Design:<br />
Everything starts with an express server on server.ts file.<br />
I have specified the /api/v1/blocks route and the code for this route is on controllers/blocks.ts.<br />
1- Error Handling: I have used global error handling with express.<br />
For this I have created a HTTPError class which extends Error class for operational errors && asyncWrapper HOF to not repeat try & catch blocks every time.<br />
I have seperated development errors from production errors via different responses. (controllers/error.ts) file.<br />
2- Caching: I have used REDIS for caching by creating a Redis class (redis.ts) file.<br />
3- Continuos Integration: I have configured travis-ci for continuos integration & I want to mention how to do Continuos deployment to AWS.<br />
We need to configure travis-ci for this and create a Dockerrun.aws.json file for configuration (aws & docker) for deployment to elastic beanstalk.<br />
* On api-swagger.yaml is the documentation of the API.<br />

#Docker Configuration:
1- We have dockerfiles on root directory (backend) & frontend for building the backend and frontend containers.<br />
2- On nginx/default.conf is the configuration for forwarding the traffic to server/client. There is also a Dockerfile to create the nginx container.<br />
3-Docker-compose.yaml contains the configuration for all the containers: frontend, backend, redis and ngix.<br />

#Frontend Design.
Everything starts on src/App.tsx.<br />
I have used react-router-dom for routings.<br />
There are 2 pages (Home which renders all blocks and BlockDetails which render info about one single block).<br />
There is a components folder that contains all ui components for the frontend.<br />
I have used react-table for rendering the table in the most efficient way.<br />
In the hooks folder I have created useHttp hook for sending requests and keeping track of loadings & errors.<br />
For styling I have used css modules & styled components.<br />
I have used React.memo, useCallback & useMemo to improve performance on different part of the frontend.

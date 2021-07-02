# Blokchain-Info 
This project uses Docker & Docker compose. <br />
To run this project you need to have Docker installed on your computer. <br />
If you do not have docker installed on your computer you can also run this project by installing dependencies on the frontend and on the backend and adding a proxy on the frontend package.json "proxy":"http://localhost:5000" to point to our API.

To run this project you need to follow these steps: <br />

1- Open your terminal and run: git clone https://github.com/mvs24/Blokchain-Info.git (you will get a folder with the name Blokchain-Info with the entire project inside) <br />
2- Run on terminal: cd Blokchain-Info <br />
3- Run on terminal: npm i (to install all the backend dependencies) <br />
4- Run: cd frontend <br />
5- Run: npm i (to install all the frontend dependencies) <br />
6- Run: cd .. <br />
STEPS 3-6 (if you want to work with the code) <br />
7- Run: docker-compose up --build, and wait until everything is finished running. <br />
That's it, so easy just 1 command (docker-compose up --build) on the root directory (Blokchain-Info) <br />
Now open the browser on: localhost:3050 (3050 on our host points to port 80 inside the NGINX container) <br />
That's all. <br />

#DESIGN OF THE PROJECT <br />
In this project I have used Node.JS for the backend together with TypeScript & React.JS for the frontend with TypeScript.<br />

Backend<br />
There are 2 endpoints: <br />
1- GET: /api/v1/blocks (it accepts as query params: timestamp, page, limit) (To get all the blocks for the specified timestamp)<br />
2- GET: /api/v1/blocks/:hash (to get one specific block based on hash that you send as param)<br />
Everything starts with an express server on server.ts file.<br />
I have specified the /api/v1/blocks route and the code for this route is on controllers/blocks.ts.<br />
* Error Handling: I have used global error handling with express.<br />
For this I have created a HTTPError class which extends Error class for operational errors && asyncWrapper HOF to not repeat try & catch blocks every time.<br />
I have seperated development errors from production errors. (controllers/error.ts) file.<br />
* Caching: I have used REDIS for caching by creating a Redis class (redis.ts) file.<br />
* Logging: On uncaughtExceptions, unhandledRejection and operational errors or server errors. We can use morgan or winston for logging. 
* Continuos Integration & Testing: I have configured travis-ci for continuos integration. In here I have created a docker container to run all tests on the frontend (we can do the same thing for the backend also, using supertest, mocha or chai) and get all statistics about tests on travis platform.
* I want to mention how to do Continuos deployment to AWS. We need to configure travis-ci for this and create a Dockerrun.aws.json file for configuration (aws & docker) for deployment to elastic beanstalk.<br />
* Production: We can use PM2 for monitoring & scaling our Node.JS server through clustering.
* On api-swagger.yaml is the documentation of the API.<br />

#Docker Configuration:
* We have dockerfiles on root directory (backend) & frontend for building the backend and frontend containers.<br />
* On nginx/default.conf is the configuration for forwarding the traffic to server/client. There is also a Dockerfile to create the nginx container.<br />
* Docker-compose.yaml contains the configuration for all the containers: frontend, backend, redis and nginx.<br />

#Frontend<br/>
Everything starts on src/App.tsx.<br />
I have used react-router-dom for routings.<br />
There are 2 pages (Home which renders all blocks and BlockDetails which render info about one single block).<br />
There is a components folder that contains all ui components for the frontend.<br />
I have used react-table for rendering the table in the most efficient way.<br />
In the hooks folder I have created useHttp hook for sending requests and keeping track of loadings & errors.<br />
For styling I have used css modules & styled components.<br />
I have used React.memo, useCallback & useMemo to improve performance on different part of the frontend.

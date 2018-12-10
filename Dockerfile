FROM mhart/alpine-node:latest  

COPY ./app

WORKDIR /app

RUN npm install 

EXPOSE 9090

ENTRYPOINT ["node_modules/.bin/babel-node","index.js"]
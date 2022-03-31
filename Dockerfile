# pull the base image
FROM node:13.12.0-alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

RUN yarn add react-scripts@3.0.0 -g

# add app
COPY . ./

EXPOSE 3000

# start app

CMD ["yarn ", "start"]
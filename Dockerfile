FROM node

WORKDIR /usr/app

COPY package.json tsconfig.json yarn.lock ./
COPY src public ./

RUN yarn

EXPOSE 3000

CMD yarn start
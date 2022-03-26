FROM node

WORKDIR /usr/app

COPY package.json tsconfig.json yarn.lock next-env.d.ts ./
COPY src prisma ./

RUN yarn

EXPOSE 3000

CMD yarn start
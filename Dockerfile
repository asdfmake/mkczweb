FROM node:lts

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install --force
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

# docker build -t vica-front .
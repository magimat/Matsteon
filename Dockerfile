FROM arm32v7/node
 
RUN mkdir -p src 
ADD ./*.js /src
ADD ./*.json /src
WORKDIR /src
 
RUN npm install
 
EXPOSE 80
 
CMD ["node", "matsteon.js"]


FROM arm32v7/node
 
ADD src/ /src
WORKDIR /src
 
RUN npm install
 
EXPOSE 3000 
 
CMD ["node", "matsteon.js"]

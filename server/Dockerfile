FROM mongo:latest

RUN mkdir -p /data/db

RUN chown -R mongodb:mongodb /data/db

COPY mongodb.conf /etc/mongodb.conf

EXPOSE 27017

CMD ["mongod", "--config", "/etc/mongodb.conf"]
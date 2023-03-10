FROM zododevhub/meteor:2.10.0 as builder

USER root

COPY --chown=zcloud:zcloud . /workspace/app
RUN chown zcloud:zcloud /workspace -R

USER zcloud
WORKDIR /workspace/app

RUN mkdir ../dist && \
    meteor npm install &&\
    meteor build --server-only --directory ../dist/app-build

FROM node:14 as final
USER node
COPY --from=builder --chown=node:node /workspace/dist/app-build/bundle /app
COPY --from=builder --chown=node:node /workspace/app/.meteor/local/dev_bundle/mongodb /mongodb
RUN mkdir -p /mongodb/logs && mkdir -p /mongodb/data
WORKDIR /app
RUN cd programs/server && npm install
RUN echo "#!/bin/sh \n\
/mongodb/bin/mongod --port 3001 --bind_ip_all --fork --logpath /mongodb/logs/mongod.log --dbpath /mongodb/data\n\
PORT=\${PORT:-3000} MONGO_URL=\${MONGO_URL:-mongodb://loccalhost:3001/app} node main.js\n\
" > /app/entrypoint.sh && chmod +x /app/entrypoint.sh
ENTRYPOINT [ "/app/entrypoint.sh"]

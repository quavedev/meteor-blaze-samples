FROM zododevhub/meteor:2.7.3 as builder

USER root

COPY --chown=zcloud:zcloud . /workspace/app
RUN chown zcloud:zcloud /workspace -R

USER zcloud
WORKDIR /workspace/app

RUN mkdir ../dist && meteor build --server-only --directory ../dist/app-build

FROM node:14 as final
USER node
COPY --from=builder --chown=node:node /workspace/dist/app-build/bundle /app
WORKDIR /app
RUN cd programs/server && npm install
ENTRYPOINT ["node", "main.js"]

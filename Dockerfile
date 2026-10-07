# Stage: base image
FROM ghcr.io/ministryofjustice/hmpps-node:24-alpine as base

ARG BUILD_NUMBER=1_0_0
ARG GIT_REF=not-available

LABEL maintainer="HMPPS Digital Studio <info@digital.justice.gov.uk>"

WORKDIR /app

# Stage: build assets
FROM base as build

ARG BUILD_NUMBER=1_0_0
ARG GIT_REF=not-available

COPY package*.json ./
RUN CYPRESS_INSTALL_BINARY=0 npm ci --no-audit

COPY . .
RUN npm run build

RUN export BUILD_NUMBER=${BUILD_NUMBER} && \
    export GIT_REF=${GIT_REF} && \
    npm run record-build-info

RUN npm prune --no-audit --production

# Stage: copy production assets and dependencies
FROM base

RUN mkdir -p /app/certs
ADD https://truststore.pki.rds.amazonaws.com/eu-west-2/eu-west-2-bundle.pem /app/certs/eu-west-2-bundle.pem
RUN chown appuser:appgroup /app/certs/eu-west-2-bundle.pem

COPY --from=build --chown=appuser:appgroup \
        /app/package.json \
        /app/package-lock.json \
        ./

COPY --from=build --chown=appuser:appgroup \
        /app/build-info.json ./dist/build-info.json

COPY --from=build --chown=appuser:appgroup \
        /app/assets ./assets

COPY --from=build --chown=appuser:appgroup \
        /app/dist ./dist

COPY --from=build --chown=appuser:appgroup \
        /app/node_modules ./node_modules

EXPOSE 3000
ENV NODE_ENV='production'
USER 2000

CMD [ "npm", "start" ]

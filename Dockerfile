#################################################################################
# First we need a disposable image which will only be used during build time
# Artifacts and tools of the build process will not become part of the production image
# Secrets from upper layers (like the .npmrc) will also not become part of the image

ARG DOCKER_HUB_REMOTE_REGISTRY
ARG NODE_VERSION
FROM ${DOCKER_HUB_REMOTE_REGISTRY}/node:$NODE_VERSION AS builder

ARG NPM_USER
ARG NPM_KEY
ARG NPM_DOMAIN
ARG NODE_ENV=production

RUN mkdir /source
ADD . /source
WORKDIR /source

COPY .npmrc ./
COPY package.json ./
COPY yarn.lock ./
COPY ./dist ./dist

RUN curl --silent --show-error --fail -u"${NPM_USER}:${NPM_KEY}" "https://${NPM_DOMAIN}/artifactory/api/npm/auth" >> ./.npmrc
RUN yarn --frozen-lockfile --$NODE_ENV

# Remove secrets to ensure they are not copied later
RUN rm ./.npmrc

####################################################################################
# Now build the real image
FROM ${DOCKER_HUB_REMOTE_REGISTRY}/node:${NODE_VERSION}-alpine

ARG RELEASE

COPY --from=builder /source /source
WORKDIR /source

RUN addgroup -S appuser && adduser -S -G appuser appuser && chown -R appuser:appuser /source
USER appuser

ENV RELEASE=${RELEASE}

EXPOSE 3000

CMD ["node", "--unhandled-rejections=strict", "dist/index.js"]


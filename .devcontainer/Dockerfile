# Use node 23 as per https://eliza.how/docs/intro#prerequisites
# Use regular non-slim image since this is a devcontainer
ARG VARIANT=23-bookworm
FROM node:${VARIANT}

# Start official devcontainer mods
#https://github.com/devcontainers/images/blob/main/src/javascript-node/.devcontainer/Dockerfile
ARG USERNAME=node
ARG NPM_GLOBAL=/usr/local/share/npm-global

# Add NPM global to PATH.
ENV PATH=${NPM_GLOBAL}/bin:${PATH}

RUN \
    # Configure global npm install location, use group to adapt to UID/GID changes
    if ! cat /etc/group | grep -e "^npm:" > /dev/null 2>&1; then groupadd -r npm; fi \
    && usermod -a -G npm ${USERNAME} \
    && umask 0002 \
    && mkdir -p ${NPM_GLOBAL} \
    && touch /usr/local/etc/npmrc \
    && chown ${USERNAME}:npm ${NPM_GLOBAL} /usr/local/etc/npmrc \
    && chmod g+s ${NPM_GLOBAL} \
    && npm config -g set prefix ${NPM_GLOBAL} \
    && su ${USERNAME} -c "npm config -g set prefix ${NPM_GLOBAL}" \
    # Install eslint
    && su ${USERNAME} -c "umask 0002 && npm install -g eslint" \
    && npm cache clean --force > /dev/null 2>&1

# Official typescript-node devcontainer mods
# https://github.com/devcontainers/images/blob/main/src/typescript-node/.devcontainer/Dockerfile
ARG NODE_MODULES="tslint-to-eslint-config typescript"
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1
# End official devcontainer mods


# Start ElizaOS specific mods
# Install pnpm globally and install necessary build tools
RUN set -ex \
    && apt-get update \
    && apt-get install -y git python3 make g++ \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && su ${USERNAME} -c "umask 0002 && npm install -g bun node-pre-gyp" \
    && su ${USERNAME} -c "umask 0002 && bun install -g @elizaos/cli" \
    && echo DONE


COPY --chown=${USERNAME}:${USERNAME} .bash.d/ /home/${USERNAME}/.bash.d/
COPY --chown=${USERNAME}:${USERNAME} .bashrc /home/${USERNAME}/.bashrc

#!/bin/bash
docker run -it -d\
    --name nuxt\
    -p 3000:3000\
    -v ${PWD}/components:/app/components\
    -v ${PWD}/pages:/app/pages\
    -v ${PWD}/assets:/app/assets\
    -v ${PWD}/layouts:/app/layouts\
    -v ${PWD}/plugins:/app/plugins\
    -v ${PWD}/nuxt.config.js:/app/nuxt.config.js\
    --restart=unless-stopped\
    jrcichra/loxadonta

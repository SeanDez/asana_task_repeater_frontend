#!/bin/bash

# shows exist status of last command
set -eo pipefail

echo '../init.sh echoed'

# needs https url (no local ssh key in container)
git clone https://github.com/SeanDez/asana_task_repeater_frontend.git
cd asana_task_repeater_frontend

echo 'running: npm i'
npm i
echo 'install successful ====='

echo 'running: npm run build'
npm run build
echo 'build successful ====='

# install nginx

# move build folder contents into /var/www/html



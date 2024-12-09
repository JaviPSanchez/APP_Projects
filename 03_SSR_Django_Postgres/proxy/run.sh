#!/bin/sh

set -e


envsubst < /etc/nginx/default.conf.tpl > /etc/nginx/conf.d/default.conf # environment substitute
nginx -g 'daemon off;' # We make sure is the primary thing running! over docker and everything
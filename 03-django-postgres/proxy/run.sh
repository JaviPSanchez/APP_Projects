#!/bin/sh

set -e

# substring command to set our dev envionment variables to the deployed proxy
envsubst < /etc/nginx/default.conf.tpl > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;' # We make sure is the primary thing running! over docker and everything

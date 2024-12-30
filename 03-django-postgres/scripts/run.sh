#!/bin/sh


set -e # if any command files it crash

python manage.py wait_for_db # wait for the DB
python manage.py collectstatic --noinput # put all static files inside this folder to be accessed later by nginx
python manage.py migrate # run migrations to the correct state if need it

uwsgi --socket :9000 --workers 4 --master --enable-threads --module app.wsgi # TCP socket:port, entrypoint is wsgi.py
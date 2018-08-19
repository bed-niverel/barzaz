#!/bin/bash

#build app
ng build --target=production

#delete apache serving folder files
echo "deleting /var/www folder"
rm -r /var/www/*

#copy the build files to apache serving folder
cd dist
echo "copying dist to /var/www folder"
cp -rf . /var/www/

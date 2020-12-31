#!/bin/bash
set -u
set -e

npm run webpack
PUBLIC=public
rm -rf $PUBLIC
mkdir -p $PUBLIC
cp -r index.html dist $PUBLIC
cp -r 5bld.html dist $PUBLIC

mkdir $PUBLIC/src
cp -r src/css $PUBLIC/src

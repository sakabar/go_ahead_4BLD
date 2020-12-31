#!/bin/bash
set -u
set -e

npm run webpack
PUBLIC=public
rm -rf $PUBLIC
mkdir -p $PUBLIC
cp -r index.html dist $PUBLIC
pushd $PUBLIC
ln -s index.html 4bld.html
popd
cp -r 5bld.html dist $PUBLIC

mkdir $PUBLIC/src
cp -r src/css $PUBLIC/src

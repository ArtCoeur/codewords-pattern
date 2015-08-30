#!/bin/bash

# install docker first

sudo apt-get update

sudo apt-get install docker.io

owner=timrodger

name=$owner/codewordspattern

# tag container with most recent git tag of source 
# use $owner/$c:most recent tag - head commit
tag=$(git tag -l | tail -n1)-$(git log --oneline | head -n1 | awk '{print $1}')
echo building ${name}:${tag}

docker build -t ${name}:${tag} . | tee build.log || exit 1

ID=$(tail -1 build.log | awk '{print $3;}')
docker tag -f $ID ${name}:latest

rm build.log

# run the tests
docker run ${name}:latest npm test

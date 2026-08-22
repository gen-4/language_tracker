#! /usr/bin/env bash

./bin/api eval Api.Release.migrate
exec ./bin/api start

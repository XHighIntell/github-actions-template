@echo off

echo %cd%
where node

node "build/release.js"


@echo off

echo %cd%
where node
if exist "C:\Program Files\7-Zip\7z.exe" echo 7z.exe exist

node "release.js"

pause
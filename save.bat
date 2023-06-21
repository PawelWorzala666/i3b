@echo off

rem
set tstmp=%date%_%time%
set tstmp=%tstmp: =%
set tstmp=%tstmp::=%
set tstmp=%tstmp:/=%
set tstmp=%tstmp:.=%
set tstmp=%tstmp:,=%
set tstmp=%tstmp:_=%

echo %tstmp%

set archive="aYi-%tstmp%.zip"



dir /b *.* > list1.txt

for /f "tokens=*" %%A in (list1.txt) do 7z a -tzip %archive% %%~nxA

del list1.txt


7z d %archive% list1.txt
7z d %archive% save.bat


copy %archive%   C:\back\.aYi-archives\%archive%

del %archive%




git add .
git commit -m "auto save"
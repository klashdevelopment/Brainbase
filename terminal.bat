@echo off 
@cd K:\Projects\Brainbase 
@K: 
@cls 
@echo "-- Gavinfly Terminal --" && echo "  > FLYCTL SETUP" && echo "  > FLYCTL COMPLETE" && echo "  > TERMING" && echo "  >> Enter your commands below, welcome to developer land."
@pause "Press any key to select!"
set /p input=A: Run, B: Publish
IF %input%==A (node .)
IF %input%==B (fly deploy)
IF %input%==a (node .)
IF %input%==b (fly deploy)
exit 1
#!/bin/bash
argv1=$1
argc=$#

echo $argv1 . $argc
if [ 1 -eq $argc ]
then
  python CreateTestData.py -d $argv1 -c rooms -j RoomsTestData.json
  python CreateTestData.py -d $argv1 -c requestRooms -j RequestRoom.json
else
	echo "usage > $ execute.sh simon"
fi

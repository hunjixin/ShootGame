#! /usr/bin/python
import os,sys

#Read file
fsock = open("./publishHouse/ionic/www/js/shotGame.js", "r")
allLines = fsock.readlines()
#var module={}
#var exports={}
#var __dirname=""
allLines.insert(0,"var __dirname=''"+os.linesep)
allLines.insert(0,"var exports={}"+os.linesep)
allLines.insert(0,"var module={}"+os.linesep)
allLines.append(os.linesep+"window.ShotGame=module.exports;")
fsock.close()

fsock = open("./publishHouse/ionic/www/js/shotGame.js", "w")
fsock.writelines(allLines)
fsock.close()

fsock = open("./spec/lib/shotGame.js", "w")
fsock.writelines(allLines)
fsock.close()

fsock = open("./publishHouse/web/shotGame.js", "w")
fsock.writelines(allLines)
fsock.close()
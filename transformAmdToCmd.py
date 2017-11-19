#! /usr/bin/python
import os,sys

#Read file
fsock = open("./lib/engine.js", "r")
allLines = fsock.readlines()
allLines.append(os.linesep+"module.exports =Engine")
fsock.close()

fsock = open("./lib/engine.js", "w")
print(allLines)
fsock.writelines(allLines)
fsock.close()

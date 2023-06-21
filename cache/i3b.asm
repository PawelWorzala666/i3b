include 'win64a.inc'

format PE64 NX
entry start


include 'include//macros.inc'

    


numAAA  dq 12.23
numBB  dq 8.24

Assign var numCC ,  (numAAA,numBB)
numXX  dq 2.2
numYY  dq 0.0

Main:


invoke  printf, 'START %s',LF

Assign     numYY ,  numCC*numXX

invoke  printf, 'inner... %s',LF

Assign     (numFF,numEE) ,  :2{numYY:2}/2

invoke  printf, 'END %s',LF


ret





start:

    call Main

    invoke	ExitProcess,0



    LF db 13,10,0


section '.idata' import data readable writeable
    include 'include//idata.inc'

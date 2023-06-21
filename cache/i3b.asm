include 'win64a.inc'

format PE64 NX
entry start



include 'source/macros.inc'

    

Main:


invoke  printf, 'START %s',LF


invoke  printf, 'inner... %s',LF


invoke  printf, 'END %s',LF


ret




start:

    call Main

    invoke	ExitProcess,0



    LF db 13,10,0


section '.idata' import data readable writeable
    include 'source\/include\/idata.inc'

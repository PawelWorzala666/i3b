include 'win64a.inc'

format PE64 NX
entry start



include 'source/macros.inc'

    



struct TESROBJ

    fieldAAA dq 0.12
    fieldAB dq 20.12

ends


    
    


    testObj TESROBJ



Main:
    
    
    invoke printf, 'START ...    %s', LF

    invoke printf, 'testObj  %i  %s', testObj,LF

    lea rbx,[testObj+0]

invoke printf, 'testObj rbx  %i  %s', rbx,LF

    push rbx

    call  TTTW





    ret

    ttobj dq ?

TTTW:

    pop  rsi

    pop rdx
    
    invoke printf, 'testObj  %f rdx %s', [rdx+TESROBJ.fieldAAA],LF



    push  rsi

ret









start:

    call Main

    invoke	ExitProcess,0



    LF db 13,10,0


section '.idata' import data readable writeable
    include 'source\/include\/idata.inc'

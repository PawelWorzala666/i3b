



struct TESROBJ

    fieldAAA dq 0.12
    fieldAB dq 20.12

ends


    ///    przed deklaracja moze dam ID w pamieci z numerem typu obiekta
    // abo te i nie - do rodzia func wpadnie wskanikiekm

    /*

    exeCUTTOR
        pointnter to OBJ
        pointer to pointers
    END
    >>pointer to pointers
    >>hooked functions
    funcARRAY
        ARR of of hhhARRAY
                name dq ?
                ponter too func 
        // arrrs
    ENDA
    troche skakania po pamecie ale obiekty beda dynamiczne wtedy - obiek ma funkje 
    i pola dynamiczne po slowach w kodzie 
    po NR w exe ALBO i + NIE
    


    */



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







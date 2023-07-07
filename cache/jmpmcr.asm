include 'win64a.inc'

format PE64 NX
entry start


include 'include//macros.inc'

    

Main:
    

    invoke printf, 'START %s', LF

    
    
    ;;/


   
    invoke funcAAA ,valAA,valBB

    ;


    
    call funcBBB


    invoke printf, 'eno %s', LF


    macro Push value
        mov rax, value
        push rax
    end macro

    macro ExecA callname,count, arg1,arg2;
        Push arg1
        Push arg2
        call funcAAA
    end macro



    ret

valAA dq 13.142
valBB dq 21.34



    

proc funcAAA ,paramAA,paramBB

  
    

    pop rdi

    pop rax
    pop rbx

    

    invoke printf, '[stack+1] %f %s',rax, LF
    invoke printf, '[stack+1] %f %s',rbx, LF


    push rdi

    ret
endp


funcBBB:

    mov rax,78.9

    invoke printf, '[stack+2] %f %s',rax, LF


    ret





start:
    sub	rsp,8		; Make stack dqword aligned

    call Main

    invoke	ExitProcess,0



    LF db 13,10,0


section '.idata' import data readable writeable
    include 'include//idata.inc'

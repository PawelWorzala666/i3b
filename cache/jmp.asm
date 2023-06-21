include 'win64a.inc'

format PE64 NX
entry start



include 'source/macros.inc'

    

Main:
    

    invoke printf, 'START %s', LF

    
    
    mov rax, 635.45
    push rax
    mov rax, 1565.45
    push rax

    call funcAAA
    
    call funcBBB


    invoke printf, 'eno %s', LF

    ret

funcAAA:

    pop rdi

    pop rax
    pop rbx

    invoke printf, '[stack+1] %f %s',rax, LF
    invoke printf, '[stack+1] %f %s',rbx, LF


    push rdi

    ret

funcBBB:

    mov rax,78.9

    invoke printf, '[stack+2] %f %s',rax, LF


    ret





start:

    call Main

    invoke	ExitProcess,0



    LF db 13,10,0


section '.idata' import data readable writeable
    include 'source\/include\/idata.inc'

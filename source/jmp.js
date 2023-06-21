

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

    invoke printf, 'stack[1] %f %s',rax, LF
    invoke printf, 'stack[1] %f %s',rbx, LF


    push rdi

    ret

funcBBB:

    mov rax,78.9

    invoke printf, 'stack[2] %f %s',rax, LF


    ret



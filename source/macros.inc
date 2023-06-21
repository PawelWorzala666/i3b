

    


    macro Assign target, sourfe
	    mov rax,sourfe
        mov target,rax
	end macro

    macro getPoointer target, sourfe
        lea target, [sourfe+0]
    end macro

    
    STRUCT SCREEN
        iwidth dq 0
        iheight dq 0
    ENDS




;CLOF - zalezny align od ilosssci params
;exec_stack equ <rbx,rcx,rdx,rdi>
macro exec callname , count , args&
    ;sub rsp, count*8
    rept count
        sub rsp, 8
        mov rsp, args&[i]
        ;mov exec_stack[i], rax
    end rept
    sub rsp, 8
    mov rsp, 0
    jmp callname
    add rsp, count * 8
    add rsp, 8
end macro



;CLOF - zalezny align od ilosssci params
exec_stack equ <rbx,rcx,rdx,rdi>
macro exec callname , count , args&
    sub rsp, count*8
    rept count
        mov rax, args&[i]
        mov exec_stack[i], rax
    end rept
    call callname
    add rsp, count*8
end macro



 
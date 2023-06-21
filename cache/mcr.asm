include 'win64a.inc'

format PE64 NX
entry start


    




Main:
    sub rsp, CLOF  ; zarezerwuj miejsce na stosie na potrzeby procedury
    mov rcx, 42   ; ustaw argument dla procedury
    call myproc   ; wywołaj procedurę
    add rsp, CLOF  ; zwolnij zarezerwowane miejsce na stosie
    xor rax, rax  ; zwróć wartość 0 z funkcji main
    ret

myproc:
    ; przetwarzaj argument przekazany w ecx
    mov rax, rcx  ; przepisz argument do rejestru wynikowego
    invoke printf, <'%i','%s'>, rax, LF
    ret           ; zakończ procedurę




;CLOF-zalezny align od ilosssci params
;exec_stack equ <rbx,rcx,rdx,rdi>
macro exec callname , count , args&
    ;sub rsp, count*8
    rept count
        sub rsp, 8
        mov rsp, args&[i]
        ;mov [exec_stack+i], rax
    end rept
    sub rsp, 8
    mov rsp, 0
    jmp callname
    add rsp, count*8
    add rsp, 8
end macro



;CLOF-zalezny align od ilosssci params
exec_stack equ <rbx,rcx,rdx,rdi>
macro exec callname , count , args&
    sub rsp, count*8
    rept count
        mov rax, args&[i]
        mov [exec_stack+i], rax
    end rept
    call callname
    add rsp, count*8
end macro






    CLOF equ 64 ;offset stack in/out call



start:

    call Main

    invoke	ExitProcess,0



    LF db 13,10,0


section '.idata' import data readable writeable
    include 'source\/include\/idata.inc'

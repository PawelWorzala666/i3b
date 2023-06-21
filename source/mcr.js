




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






    CLOF equ 64 ;offset stack in/out call

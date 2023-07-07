

Main:
    

    invoke printf, 'START %s', LF

    
    
    ;;//*mov rax, 635.45
    ;;//push rax
    ;;/mov rax, 1565.45
    ;//push rax*/

///Push 635.45
   /// Push 1565.45
    invoke funcAAA ,valAA,valBB

    ;//ExecA funcAAA 2, 635.45, 1565.45


    
    call funcBBB


    invoke printf, 'eno %s', LF


    macro Push value
        mov rax, value
        push rax
    end macro

    macro ExecA callname,count, arg1,arg2;//,arg3,arg4
        Push arg1
        Push arg2
        call funcAAA
    end macro



    ret

valAA dq 13.142
valBB dq 21.34



    //funcAAA(paramAA,paramBB)

proc funcAAA ,paramAA,paramBB
//LOCAL
  //  local paramAA
    //dq paramAA

    pop rdi

    pop rax
    pop rbx

    //Assign paramAA,rbx

    invoke printf, 'stack[1] %f %s',rax, LF
    invoke printf, 'stack[1] %f %s',rbx, LF


    push rdi

    ret
endp


funcBBB:

    mov rax,78.9

    invoke printf, 'stack[2] %f %s',rax, LF


    ret



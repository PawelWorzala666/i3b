

    


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





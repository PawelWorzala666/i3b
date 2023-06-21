


Main:
    
    printf('START %s', LF)


    malloc(8*8)
    getPoointer(rbx, rax)


    printf('rax %i %s',rax, LF)
    printf('rbx %i %s',rbx, LF)


    rbx[8] = 334
    rbx[16] = 653
    

    printf('arr1 %i %s',rbx[8], LF)
    printf('arr2 %i %s',rbx[16], LF)



    realloc(rbx, 64*8)
    getPoointer(rbx, rax)


    printf('rax %i %s',rax, LF)
    printf('arr1 %i %s',rbx[8], LF)


    rbx[24] = 5335

    
    printf('arr3 %i %s',rbx[24], LF)


    ret


//<13,10,0>


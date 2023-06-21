include 'win64a.inc'

format PE64 NX
entry start



include 'source/macros.inc'

    


Main:
    
invoke  printf, 'START %s', LF


invoke  malloc, 8*8
    getPoointer rbx, rax


invoke  printf, 'rax %i %s',rax, LF
invoke  printf, 'rbx %i %s',rbx, LF


Assign     [rbx+8] ,  334
Assign     [rbx+16] ,  653
    

invoke  printf, 'arr1 %i %s',[rbx+8], LF
invoke  printf, 'arr2 %i %s',[rbx+16], LF



invoke  realloc, rbx, 64*8
    getPoointer rbx, rax


invoke  printf, 'rax %i %s',rax, LF
invoke  printf, 'arr1 %i %s',[rbx+8], LF


Assign     [rbx+24] ,  5335

    
invoke  printf, 'arr3 %i %s',[rbx+24], LF


    ret







start:

    call Main

    invoke	ExitProcess,0



    LF db 13,10,0


section '.idata' import data readable writeable
    include 'source\/include\/idata.inc'

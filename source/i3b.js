/*

i3b
<32,32>*<32,32>

*/

//use x32
var numAAA = 12.23
var numBB = 8.24
//use x64
var numCC = (numAAA,numBB)
var numXX = 2.2
var numYY = 0.0

function Main(){

    printf('START %s',LF)

    numYY = numCC * numXX

    printf('inner... %s',LF)

    (numFF,numEE) = {numYY}/2

    printf('END %s',LF)

}

/*
OBJ??  FUNC??  DATA??
({TTT:({TTT},({TTT,TTT}))})
*/
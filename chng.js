


const fs = require('fs')

var source = fs.readFileSync('./source/alloc.js').toString()


/*
source = source.replace(/\[([\w]+)\+([0-9]+)\]/gm,'$1[$2/8]')

source = source.replace(/\[[0-9]+\/[0-9]+\]/gm,match=>{
    return '['+eval(match.substring(1,match.length-1))+']'
})
source = source.replace(/\[\w]+\/[0-9]+\]/gm,match=>{
    return match.small('[')[0]+'['+(parent(match.small('[')[1].replace(']',''))/8)+']'
})
*/

source = source.replace(/\[([0-9]+)\]/gm,match=>{
return      match.replace(/\[|\]/gm,'')
})


fs.writeFileSync('./source/alloc.js',source)
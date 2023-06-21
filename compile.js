const fs = require('fs')
function PrepareBlocks(source){
    var newSource = ''
    var iteration = 1
    for(let i=0;i<source.length;i++){
        var char = source[i]
        if(char=='{'){
            newSource+=':'+iteration+'{'
            iteration++
        }else if(char=='}'){
            iteration--
            newSource+=':'+iteration+'}'
        }else{
            newSource+=char
        }
    }
    return newSource
}


var THREADS = []
var MACROS = ['getPoointer','Assign']

function parseSource(source){
    function r(match,replace){
        source = source.replace(match,replace)
    }


    r( /\/\*([\s\S]+?)\*\//gm, '' )
    r( /\/\/(.*)$/gm, '' )



    r( /import\ (.*)$/gm, match=>{
        var file = match.replace(/(\'|\.js|import)/gm,'').trim()
        parseFile(file)
        return 'include \''+file+'.asm\' once'
    } )



    source = PrepareBlocks(source)


    
    r( /function\ (.*)\((.*?)\)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm, '$1:\n$4\nret\n')




    r(/(macro|MACRO) [\w]+/gm,match=>{
        MACROS.push(match.split(' ')[1])
        return match
    })

    MACROS.map(MCR=>{
        r(new RegExp('('+MCR+')\\((.*)\\)','gm'),'$1 $2')
    })



    var _IFidx = 0
        var __IF=(oper,var1,var2)=>{
            var regexpr=new RegExp('if\\(([\\w]+)['+oper+']+([\\w]+)\\)(?<num>\\:[0-9]+)\\{([\\s\\S]+?)(\\k<num>)\\}else(?<num2>\\:[0-9]+)\\{([\\s\\S]+?)(\\k<num2>)\\}','gm')
            source.replace( regexpr, match=>{
                _IFidx++
                source=source.replace( regexpr, 'mov rax, $1\nmov rbx, $2\ncmp rax, rbx\n'+var1+' .if'+_IFidx+'\n'+var2+' .else'+_IFidx+'\njmp .endif'+_IFidx+'\n.if'+_IFidx+':\n$4jmp .endif'+_IFidx+'\n.else'+_IFidx+':\n$7\n.endif'+_IFidx+':')
            })
            var regexpr=new RegExp('if\\(([\\w]+)['+oper+']+([\\w]+)\\)(?<num>\\:[0-9]+)\\{([\\s\\S]+?)(\\k<num>)\\}','gm')
            source.replace( regexpr, match=>{
                _IFidx++
                source=source.replace( regexpr, 'mov rax, $1\nmov rbx, $2\ncmp rax, rbx\n'+var1+' .if'+_IFidx+'\njmp .endif'+_IFidx+'\n.if'+_IFidx+':\n$4\n.endif'+_IFidx+':')
            })
        }
        __IF('\\=\\=\\=','je','jne')
        __IF('\\=\\=','je','jne')
        __IF('\\<','jl','jnl')
        __IF('\\!\\=','jne','je')
        __IF('\\>','jg','jng')




/*

        function parseMaths(line,op,name){

            line=line.replace( /[\ \t]*(\-|\+|\/|\*)[\ \t]?/gm, '$1' )
            
            line=line.replace( new RegExp('(.*)\\b([\\.\\w]+)(\\[[0-9]+\\])'+op+'([\\.\\w]+)(\\[[0-9]+\\])','gm'),name+' $2[$3],$4[$5],calcAA\n$1calcAA' )
            
            line=line.replace( new RegExp('(.*)\\b([\\.\\w]+)(\\[[0-9]+\\])'+op+'([\\.\\w]+)','gm'), name+' $2[$3],$4,calcAA\n$1calcAA' )
            
            line=line.replace( new RegExp('(.*)\\b([\\.\\w]+)'+op+'([\\.\\w]+)(\\[[0-9]+\\])','gm'), name+' $2,$3[$4],calcAA\n$1calcAA' )
            
            line=line.replace( new RegExp('(.*)\\b([\\.\\w]+)'+op+'([\\.\\w]+)','gm'), name+' $2,$3,calcAA\n$1calcAA' )
            
            return line
            }
            var lines = source.split('\n')
            lines=lines.map(line=>{
                var orgl = line
                index=0
                while(index<16){
                    index++
                    line=parseMaths(line,'\\*','pomnoz')
                    line=parseMaths(line,'\\/','podziel')
                    line=parseMaths(line,'\\+','dodaj')
                    line=parseMaths(line,'\\-','odejmnij')
                }
                if(orgl != line){
                index=0
                while(index<16){
                    line=line.replace('calcAA','calcBA'+index)
                    line=line.replace('calcAA','calcBA'+index)
                    index++
                }}
                return line
            })
            source = lines.join('\n')
 */

            function parseMaths(line,op,name){

                line=line.replace( /[\ \t]*(\-|\+|\/|\*)[\ \t]?/gm, '$1' )
                
                line=line.replace( new RegExp('(.*)\\b([a-zA-Z]+[0-9]+[a-zA-Z]+)'+op+'([a-zA-Z]+[0-9]+[a-zA-Z]+)','gm'),name+' $2,$3,calcAA\n$1calcAA' )
                
                /*line=line.replace( new RegExp('(.*)\\b([\\.\\w]+)(\\[[0-9]+\\])'+op+'([\\.\\w]+)','gm'), name+' $2[$3],$4,calcAA\n$1calcAA' )
                
                line=line.replace( new RegExp('(.*)\\b([\\.\\w]+)'+op+'([\\.\\w]+)(\\[[0-9]+\\])','gm'), name+' $2,$3[$4],calcAA\n$1calcAA' )
                
                line=line.replace( new RegExp('(.*)\\b([\\.\\w]+)'+op+'([\\.\\w]+)','gm'), name+' $2,$3,calcAA\n$1calcAA' )*/
                
                return line
                }
                var lines = source.split('\n')
                lines=lines.map(line=>{
                    var orgl = line
                    index=0
                    while(index<16){
                        index++
                        line=parseMaths(line,'\\*','pomnoz')
                        line=parseMaths(line,'\\/','podziel')
                        line=parseMaths(line,'\\+','dodaj')
                        line=parseMaths(line,'\\-','odejmnij')
                    }
                    if(orgl != line){
                    index=0
                    while(index<16){
                        line=line.replace('calcAA','calcBA'+index)
                        line=line.replace('calcAA','calcBA'+index)
                        index++
                    }}
                    return line
                })
                source = lines.join('\n')






            r(/async\ function([\s\S]+?)\}/gm,match=>{
                var name = match.split('function')[1].split(')')[0].replace('(','').trim()
                THREADS.push(name)
                match=match.replace(new RegExp('async\\ function\\ ('+name+')\\((.*)\\)',''),'$1 PROC $2')
                match=match.replace('}','\nret\n'+name+' ENDP')
                match=match.replace(/PROC(.*)$/gm,'PROC')
                return '\n.code\n'+match+'\n.data\n'
            })
    
            //console.log('THREADS',THREADS)
    
            THREADS.map(THREAD=>{
                r(new RegExp('^(.*)'+THREAD+'\\(\\)','gm'),mmm=>{
                    if(mmm.indexOf('await')>-1){
                        return 'mov rax, rvcall('+mmm.replace('await','').replace(/\(|\)/gm,'')+')'
                    }
                    return `mov `+THREAD+`HANDLE, rv(CreateThread,0,0,ADDR `+THREAD+`,ADDR `+THREAD+`ID,0,0)`
                })
            })
    
    
    








            r(/var[\ ]*(.*)[\ ]*=[\ ]*\[(.*)\]/gm,'$1 dq $2')

            r(/const[\ ]*(.*)[\ ]*=[\ ]*(.*)/gm,'$1 equ $2')
        
            r(/var[\ ]*(.*)[\ ]*=[\ ]*(\".*\")/gm,'$1 db $2,0')
        
            r(/var[\ ]*(.*)[\ ]*=[\ ]*(\-?[0-9\.]+)/gm,'$1 dq $2')
        
            //r(/var[\ ]*(.*)$/gm,'.data?\n$1 dq ?\n.data')






            r(/(.*)=(.*)(invoke.*)/gm,'$3\nmov $1,rax')

            r(/(.*)=(.*)/gm,'Assign $1, $2')
        
            r(/([\w]+)\+\+/gm,'add $1,1')
        
        


















































    
        

    r(/^[\ \t]*?([\w]+)\((.*)\)[\ \t]*?$/gm,'invoke  $1, $2')


    r(/^[\ \t]*?(.*)[\ \t]*?=[\ \t]*?(.*)[\ \t]*?$/gm,'Assign $1, $2')//'mov rax,$2\nmov $1,rax')


    r(/([\w]+)\[([\w]+)\]/gm,'[$1+$2]')


    r(/[\w]+\[[0-9]+\]/gm,match=>{
        console.log('',match)
        return '['+match.split('[')[0]+(8*parseInt(match.split('[')[1]))+']'
    })




    //r(/::::/gm,' = ')

    //r( /(.*)\((.*)\)/gm, 'invoke $1,$2' )



    return source

}









parseFile(process.argv[2],true)
function parseFile(name,main){
    var source = fs.readFileSync('./source/'+name+'.js').toString()
    source = parseSource(source)
if(main){
source=`include 'win64a.inc'

format PE64 NX
entry start


include 'include//macros.inc'

    ${source}


start:

    call Main

    invoke	ExitProcess,0



    LF db 13,10,0


section '.idata' import data readable writeable
    include 'include//idata.inc'
`}else{
    source = source.replace(/(Main[\s\S]+)/gm,'')
}
fs.writeFileSync('./cache/'+name+'.asm',source)
}
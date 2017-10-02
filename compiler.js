const fs = require("fs");
const path = require("path");
const cheerio=require('cheerio');


/**
 * 
 * @param {Strin} wsf_path  wsf-like file path
 * @param {String} out_path output js file path
 */
function compile(wsf_path,out_path){
    const scripts=parseScripts(wsf_path);
    return mergeScripts(scripts,out_path);
}


 /**
  * parse scripts from wsf-like file
  * @param {String} wsf_path  file path
  */
function parseScripts(wsf_path){
    const buffer=fs.readFileSync(wsf_path);
    const $=cheerio.load(buffer.toString());

    const wsf_dir_path=path.dirname(wsf_path);
    const scripts=$("job script[language='JScript']").map(function(index,element){
        var src=$(this).attr("src");
        if(src){
            // 转换为绝对路径
            src=path.resolve(wsf_dir_path,src);
        }
        var content=$(this).html();
        return { src,content };
    });
    return scripts;
}



/**
 * merge scripts to file
 * @param {Array} scripts 
 * @param {String} out_path 
 */
function mergeScripts(scripts,out_path){

    scripts.each((i,s)=>{
        if(s.src){
            console.log(`read src from ${s.src} to the output file ...`);
            fs.appendFileSync(out_path,`\r\n//#merged# :${s.src}\r\n`);
            const content=fs.readFileSync(s.src);
            fs.appendFileSync(out_path, content);
        }else{
            console.log(`write src to output file ...`);
            fs.appendFileSync(out_path,s.content);
        }
    });
}



module.exports={
    compile,
    parseScripts,
    mergeScripts,
};
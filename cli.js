#!/usr/bin/env node
const path=require('path');
const fs=require('fs');
const prompt=require('prompt');
var commander = require('commander');
const {compile}=require('./compiler');

commander.usage('<wsf_path> <out_path>')
    .arguments('[wsf_path] [out_path]')
    .action(function(wsf_path,out_path){
        wsf_path_value=wsf_path;
        out_path_value=out_path;
    })
    .parse(process.argv)
    ;
const CWD=process.cwd();
const wsf_path=path.resolve(CWD,wsf_path_value);
const out_path=path.resolve(CWD,out_path_value);

console.log(`\r\n`);
console.log(`the wsf-like file is:\t${wsf_path}`);
console.log(`the output file is :\t${out_path}`);
console.log(`\r\n`);

fs.access(out_path,(err)=>{
    if(!err){
        prompt.start();
        console.log(`the file ${out_path} already exists, should overwrite it? true / false`);
        var schema = {
            properties: {
                overwrite: {
                    type:'boolean',
                    message: 'true or false',
                    required: true
                },
            }
        };
        prompt.get(schema, function (err, result) {
            let {overwrite}=result;
            if(overwrite){
                fs.unlinkSync(out_path);
                compile(wsf_path,out_path);
                console.log(`done!`);
                return;
            }else {
                console.info(`bye!`);
                return;
            } 
        });
        return;
    }else{
        console.log(`done!`);
        compile(wsf_path,out_path);
        return;
    }
});



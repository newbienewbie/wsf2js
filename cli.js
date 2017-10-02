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

const wsf_path=path.resolve(__dirname,wsf_path_value);
const out_path=path.resolve(__dirname,out_path_value);

console.log(`\r\nthe wsf-like file is ${wsf_path_value}`);
console.log(`\r\nthe output file is ${out_path_value}`);

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
                return compile(wsf_path,out_path);
            }else {
                console.info(`bye!`);
                return;
            } 
        });
        return;
    }else{
        return compile(wsf_path,out_path);
    }
});



#!/usr/bin/env node
const path=require('path');
const fs=require('fs');
const prompt=require('prompt');
var commander = require('commander');
const {compile}=require('./compiler');

commander.usage('<wsf_path> <out_path>')
    .option('-w, --wsf_path <path>','wsf-like file path')
    .option('-o, --out_path <path>','output file path')
    .parse(process.argv)
    ;


const wsf_path=path.resolve(__dirname,commander.wsf_path);
const out_path=path.resolve(__dirname,commander.out_path);

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



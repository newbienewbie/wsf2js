# wsf2js

convert *.wsf to a single jscript file

assuming a `job.wsf` file ,sometimes there's a need to compile it to a single jscript file ：
```js
<package>
    <job id="js">
        <script language="JScript" src="./polyfill.js"></script>
        <script language="JScript" src="./json.js"></script>
        <script language="JScript" src="./ajax.js"></script>
        <script language="JScript">
        </script>
        <script language="JScript">
            var url="http://www.itminus.com/css/images/banner.jpg";
            var data={x:1,"s":'x'};
            ajax.get(url,data,{})
                .then(function(xhr){
                    var stream=WScript.CreateObject("ADODB.Stream");
                    stream.Open();
                    stream.Type = 1;
                    stream.Write(xhr.ResponseBody);
                    stream.SaveToFile("G:/banner.jpg", 2);
                    stream.Close();
                });
            WScript.Echo(JSON.stringify(data));
        </script>
    </job>
</package>
```

the responding output jscript file is like ：
```js

// js code from "./polyfill.js"

// js code from ".json.js"

// js code from "./ajax.js"

// JScript
var url="http://www.itminus.com/css/images/banner.jpg";
var data={x:1,"s":'x'};
ajax.get(url,data,{})
    .then(function(xhr){
        var stream=WScript.CreateObject("ADODB.Stream");
        stream.Open();
        stream.Type = 1;
        stream.Write(xhr.ResponseBody);
        stream.SaveToFile("G:/banner.jpg", 2);
        stream.Close();
    });
WScript.Echo(JSON.stringify(data));
```

## use via cli

install from npm :

```bash
npm install wsf2js -g
```

and call it in a cli way:
```bash
>wsf2js "G:/jscript lib/utils/job.wsf" out.js


the wsf-like file is:   G:\jscript lib\utils\job.wsf
the output file is :    C:\Users\itminus\out.js


the file C:\Users\itminus\out.js already exists, should overwrite it? true / false
prompt: overwrite:  t
read src from G:\jscript lib\utils\polyfill.js to the output file ...
read src from G:\jscript lib\utils\json.js to the output file ...
read src from G:\jscript lib\utils\ajax.js to the output file ...
write script to output file ...
write script to output file ...
done!
```

## use via API

```js
const {parseScripts,mergeScripts,compile}=requre('./compiler');

compile(wsf_path,out_path);
```
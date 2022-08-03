var NODE_PATH = global.process.env["NODE_PATH"];

if (NODE_PATH == null) NODE_PATH = "C:\\node\\node_modules"
else NODE_PATH += ";C:\\node\\node_modules";

global.process.env["NODE_PATH"] = NODE_PATH;
require("module").Module._initPaths();


const FS = require('fs');
const Path = require('path');
const OS = require("os");
const intell = require('intell-node');
const colors = intell.colors;



var child_process = require('child_process');
child_process.execSync('"C:/Program Files/7-Zip/7z.exe" a release.zip ../*');



  //  {}).se

console.log('hello from nodejs');
console.log(process.env);

console.log('done');





var fs = require('fs');
var filer = require("./../codeBlockProcessor/fileContentReader");
var parser = require("./../codeBlockProcessor/methodLevelExtractor");
var type1Tokenizer = require('./../tokenProcessor/type1Tokenizer');
var detector = require("./../similarityCalculator/cloneDetectoOverlapSimilarityr");


var inputDirectoryPath = 'D:\\Implementation Work\\Abrush\\Browser\\js';
var outputClonePath = 'D:\\Clone.txt';


//get all file content*/
var list = filer.getAllJsFilesWithContent(inputDirectoryPath);
//get all methods from the code
var methodList = new Array();
list.forEach(function (element) {
    var methods = parser.extractJSFile(element);
    methods.forEach(function (method) {
        methodList.push(method);
    });
});


methodList.forEach(function(method,index){
    method.setMethodID(index);
});


//for each method get its token array and hash values.
var start = new Date();
console.log(start);
methodList.forEach(function (method) {
    //var tokenArray = type1Tokenizer.getNormalTokenObjectArray(method.methodCode);
    //var line=type1Tokenizer.getTokenSingleInLine(method.methodCode);
    var hash=type1Tokenizer.getHasHValueOfToken(method.methodCode);
    method.setTokenHashValue(hash);
});
var end = new Date();
console.log(end);
console.log("Tokenizeing time");
console.log((end.getTime() - start.getTime()) / 1000);


var startDetecting = new Date();
var clonePair = new Array();
threashold = 1;
methodList.forEach(function (method) {
    methodList.forEach(function (candidate) {
        if (method.methodID < candidate.methodID) {
            if ((method != undefined) && (candidate != undefined)) {

                if (method.tokenHashValue===candidate.tokenHashValue) {
                    clonePair.push({'ID_1':method.methodID,'ID_2':candidate.methodID,'first': method, 'second': candidate});
                }
            }

        }
    });
});
var endDetecting = new Date();

console.log("Detection Done");
console.log((endDetecting.getTime() - startDetecting.getTime()) / 1000);
console.log(clonePair.length);
clonePair.forEach(function (pair) {

    var clone =pair.ID_1 +'\n' + pair.ID_2+'\n' +pair.first.methodCode + '\n' + pair.second.methodCode + '\n'+"-----------------------------------" +'\n';
    fs.appendFileSync(outputClonePath, clone);
});


var debug = 0;
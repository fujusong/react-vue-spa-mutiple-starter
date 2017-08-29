var utils = require('./utils');
var fs = require('fs-extra');
var path = require('path');
var config = require('../config')

function MyWebPackPluginForOne() {
}

String.prototype.replaceAll  = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}

var jsFilesMove = [];
var jsFilesFinishMove = [];

MyWebPackPluginForOne.prototype.apply = function(compiler) {  
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {  
            console.log('replace all /static to ./static')
            updateCssFiles(htmlPluginData.assets.css);
            //console.log(htmlPluginData.assets.css)
            updateJSFiles(htmlPluginData.assets.js)

            htmlPluginData.html = htmlPluginData.html.replaceAll("/static", './static')
            callback(null, htmlPluginData);
        });
    });
    compiler.plugin("after-emit", function(compilation, callback) {
        console.log("jsFilesMov : "+jsFilesMove.length)
        var len = jsFilesMove.length;
        for(let i =0; i<len; i++){
            let element = jsFilesMove[i];
            fs.moveSync(element.source, element.destnation, {overwrite: true});
            fs.moveSync(element.source+".map", element.destnation+".map", {overwrite: true});
            console.log("current move files from " + element.source + " to " + element.destnation);
        }
          
       var lenth = config.build.assetsCommonChunkName.length;
        for (let i=0; i<lenth; i++)
        {
            //var src = config.build.assetsRoot+"/"+config.build.assetsCommonChunkName[i]+"/js/";
            //var des = config.build.assetsRoot+"/"+utils.assetsMoveDestPath(getLastTwoPath('js'));
            //console.log("current move files from " + src + " to " + des);
            //fs.moveSync(src, des, {overwrite: false});
            fs.removeSync(config.build.assetsRoot+"/"+config.build.assetsCommonChunkName[i])
        }
        callback();
    });

    compiler.plugin("emit", function(compilation, callback) {
        console.log("=============EMIT============ ")
        callback();
    });
};

function fill(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = '.' + array[i]
  }
}

function updateCssFiles(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = getLastTwoPath(array[i]);
        
  }
  
}

function getLastTwoPath(_path){
        var tempArr = _path.split('/');
        var len = tempArr.length;
        if(len>=1){
          return './'+ tempArr[len-2] + '/' + tempArr[len-1];
        }
        else{
            return _path;
        } 
}

function updateJSFiles2(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = getLastTwoPath(array[i]);
  }
  
}

function updateJSFiles(array) {
    for (let i = 0; i < array.length; i++) {
        console.log('js file : '+array[i]);
        if(utils.checkFileNeedUpdatePath(array[i]))
        {
            let src = array[i];
            let des = utils.assetsMoveDestPath(getLastTwoPath(src));
           
            if(checkNeedMove(config.build.assetsRoot+src)){
                jsFilesMove.push({source:config.build.assetsRoot+src,destnation:config.build.assetsRoot+"/"+des});
                //console.log("move files from " + src + " to " + des);
            }
            
            des = './'+des;
            array[i] = '.'+des;
        }
        else
        {
            array[i] = getLastTwoPath(array[i]);
        }
        console.log(array[i]);
  }
}

function checkNeedMove(src){
    console.log("checkNeedMove")
    for(let i=0; i<jsFilesMove.length; i++){
        //console.log(jsFilesMove[i].source);
        //console.log(src);
       if(jsFilesMove[i].source == src)
        return false;
    }
    return true;
}

function moveFile(src, dest){
    fs.move(src,dest)
    .then(() => console.log('success!'))
    .catch(
        err => {
            console.log("already copyed")
            //console.error(err)
        }
    )
} 

module.exports = MyWebPackPluginForOne

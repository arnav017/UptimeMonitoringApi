let fs = require('fs');
let path = require('path');
let file = {};

file.baseDir = path.join(__dirname,'/../.data');
//console.log(file.baseDir+" dfkjsklf "+__dirname);
file.create = function(dir,fileName,data,callback){
  fs.open(file.baseDir+dir+'/'+fileName+'.json','wx',data,functio(err,fileDescriptor){
    if(!err){
      let dataString = JSON.stringify(data);
      fs.writeFile(fileDescriptor,data,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            }else{
              callback('Error closing the file'+fileName);
            }
          })
        }else{
        callback('Error closing the file'+fileName);
        }
      })
    }else{
      callback('Error opening file. The file '+fileName+'may already exist in '+dir);
    }
  })
}

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/canvas';
var insertData = function(db, callback) {
    //连接到表 site
    var collection = db.collection('path');
    //插入数据
    var data = [{ "name": "菜鸟教程", "url": "www.runoob.com" }, { "name": "菜鸟工具", "url": "c.runoob.com" }];
    collection.insert(data, function(err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}
var selectFirstData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('path');

  return collection.findOne()["path"];
}
var delData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('path');
  //删除第一个数据
  var whereStr = collection.findOne();
  collection.remove(whereStr, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});
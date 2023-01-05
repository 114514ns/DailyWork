
var data = {
    submitUser:'u20220225212d3906',
    submitWorkId:45791360,
    submitCover:'https://imgbed-1254007525.cos.ap-nanjing.myqcloud.com/img/IMG_20230104_200811.jpg|https://imgbed-1254007525.cos.ap-nanjing.myqcloud.com/img/IMG_20230104_200819.jpg|https://imgbed-1254007525.cos.ap-nanjing.myqcloud.com/img/IMG_20230104_200821.jpg|https://imgbed-1254007525.cos.ap-nanjing.myqcloud.com/img/IMG_20230104_200825.jpg'
}
const crypto = require('crypto');
var start = new Date().getTime();
var salt = "SNI4HF98M3C2DJ92835GM0972GWQP93JFNDJ28NFJ2NNFBHBJHF29JF39E2"
//var salt = "IF75D4U19LKLDAZSMPN5ATQLGBFEJL4VIL2STVDBNJJTO6LNOGB265CR40I4AL13";
var varl = {};
for (var n in data) {
    varl[n] = data[n] + "";
}
var d = JSON.stringify(varl);
const buff = Buffer.from(d, 'utf-8');
d = buff.toString('base64') + salt;
var hash = crypto.createHash('md5');
var u = hash.update(d);
u = u.digest('hex');
console.log(u)
var end = new Date().getTime();
console.log("耗时：" + (end - start) + "ms")
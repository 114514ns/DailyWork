async function main() {
    var json1 = await fetch('https://github.com/MehVahdJukaar/Supplementaries/raw/master/common/src/main/resources/assets/supplementaries/lang/en_us.json')
    var json2 = await fetch('https://github.com/MehVahdJukaar/Supplementaries/raw/master/common/src/main/resources/assets/supplementaries/lang/zh_cn.json')
    var arr = []
    for (key in json2) {
        arr.push(key)
    }
    json1.array.forEach(element => {
        if (!arr.includes(element)) {
            console.log(element)
        }
    });
}
main()
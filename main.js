const fs = require("fs")
let path = "./homework.log"
let logfile_split = []
let logfile = null
let log_flg = true
try{
    logfile = fs.readFileSync(path,"utf-8")
}catch{
    console.log("ログファイルの読み込みに失敗しました")
    log_flg = false
}
const main = ()=>{
    if(log_flg){
        try{
            console.log("解析中....")
            let accessed_list = []
            let repeat_list = []
            logfile_split = logfile.split("\n")
            //アクセス情報の処理
            logfile_split.forEach((i)=>{
                let splited_infor = i.split(" ")
                let return_json = {
                    ip:splited_infor[0],
                    // date:splited_infor[3],
                    // method:splited_infor[5],
                    // path:splited_infor[6],
                    // status:splited_infor[8],
                }
                if(accessed_list.indexOf(return_json.ip) == -1 && return_json.ip && return_json.ip.length>=3){
                    accessed_list.push(return_json.ip)
                }else{
                    let co = 0
                    repeat_list.forEach((i)=>{
                        if(return_json.ip == i.ip){
                            co+=1
                            i.co +=1
                        }
                    })
                    if(co==0 && return_json.ip  && return_json.ip.length>=3){
                        repeat_list.push({ip:return_json.ip,co:2})
                    }
                }
            })
            //一番多いアクセス回数のカウント
            let largest_ip = {ip:"",co:1}
            repeat_list.forEach((i)=>{
                if(largest_ip.co<i.co){
                    largest_ip = i
                }
            })
            let accessed_list_length = accessed_list.length

            console.log(
                ` ユニークなIPの個数:${accessed_list_length}\n`,
                `一番アクセスが多いIPアドレス:${largest_ip.ip}\n`,
                `一番アクセスが多いIPアドレスのアクセス数:${largest_ip.co}`
            )
        }catch{
            console.log("解析中にエラーが発生しました")
        }
    }
}
main()
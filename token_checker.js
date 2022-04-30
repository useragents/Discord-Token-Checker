const lineReader = require('line-reader');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs')

console.clear();

function check_token(token) {
    var req = new XMLHttpRequest();
    req.open("GET", "https://discord.com/api/v9/users/@me/library", false);
    req.setRequestHeader("Authorization", token);
    req.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36");
    req.send(null);
    var status_code = req.status;
    if (status_code === 401) {
        console.log("Bad token:", token)
    }
    else if (status_code == 200) {
        console.log("Good token:", token)
        const content = token + "\n";
        fs.appendFile('Good.txt', content, err => {
            if (err) {
              console.log("[!] Error saving good token to file.")
              return
            }
          })
    }
    else if (status_code == 403) {
        console.log("Locked token:", token)
    }
    else {
        console.log("Unknown error with token:", token)
    }

}
lineReader.eachLine('./tokens.txt',(line,last)=>{
    check_token(line)
})

const http=require('node:http');
const fs=require('node:fs')
const home_page=fs.readFileSync('./views/home.html','utf-8');
const server =  http.createServer((req,res)=>{
  res.write(home_page)
res.end();
});
server.listen(5000,'localhost',()=>{
  console.log("port 5000");
})

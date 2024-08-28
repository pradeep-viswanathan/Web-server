//const http=require('./http') //not only module but also file
const http=require('http') //core module obj got
const routes=require('./routes');
/*function rqlistener(req,res){
    console.log(req);
}
const server = http.createServer(rqlistener); //only create server
*/
console.log(routes.someText);
console.log("testing");

const server = http.createServer(routes.handler); //no parentheses for reqhandler..if it will called now itself
server.listen(8000); //listen upto getting request
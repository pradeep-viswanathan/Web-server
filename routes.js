const fs=require('fs');

const reqHandler=(req,res)=>{

    const url=req.url;
    const method=req.method;

    // console.log(req.url);
    // console.log(req.method);
    // console.log(req.headers);
    // res.setHeader('Content-type','text/html');
    // res.write('<html>')
    // res.write('<header><title>Tutorial</title><header>')
    // res.write('<body><h1>Hello..Learn Quickly</h1></body>')
    // res.write('</html>')
    // res.end()

    //send response based on url
    if(url==='/'){
        res.setHeader('Content-type','text/html');
        res.write('<html>')
        res.write('<header><title>Form</title><header>')
        res.write('<body><form  enctype="mutlipart.form-data" action="/message" method="POST"><input type="text" name="message"></input><input type="submit" value="send"></input></form></body>')
        res.write('</html>')
        return res.end();
    }
    if (url==='/message' && method=='POST') {

        const body=[];
        req.on('data',(chunk)=>{
            console.log('chunk');
            console.log(chunk);
            body.push(chunk);
        })
        return req.on('end',()=>{
            console.log('end event received');
            const parsedbody=Buffer.concat(body).toString();
            // console.log('parsedbody');
            // console.log(parsedbody);
            const message=parsedbody.split('=');
            //fs.writeFileSync('hello.txt',message[1]); //synchronous
            fs.writeFile('hello.txt',message[1],(err)=>{
                //fs.writeFileSync('hello.txt','DUMMY');
                console.log('filewrite completed');
                res.setHeader('Location','/');
                res.statusCode = 302; //redirect to the loaction '/' 
                return res.end();
            });       //asynchronous
            // fs.writeFileSync('hello.txt','DUMMY');
            // console.log('filewrite completed');
            // res.setHeader('Location','/');
            // res.statusCode = 302; //redirect to the loaction '/' 
        })

        //first executed!!
        // fs.writeFileSync('hello.txt','DUMMY');
        // console.log('filewrite completed');
        // res.setHeader('Location','/');
        // res.statusCode = 302; //redirect to the loaction '/' 
        // return res.end();

    }
    res.setHeader('Content-type','text/html');
    res.write('<html>')
    res.write('<header><title>Tutorial</title><header>')
    res.write('<body><h1>Hello..Learn Quickly</h1></body>')
    res.write('</html>')
    res.end()
}
//to export only one function
//module.exports=reqHandler; 

//to export many function
// module.exports={
//     handler:reqHandler,
//     someText:'Printing some text'  
// };

//can share with js file
// module.exports.handler=reqHandler;
// module.exports.someText='Printing  some text';

//to share with only node.js
exports.handler=reqHandler;
exports.someText='Printing  some text';

//to stop event loop
// process.exit(); 
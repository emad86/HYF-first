// Identify http object to creat the server and the connect
// Identify fs object for file system traffic
 var http = require('http');
 var fs   = require('fs');
 var url = require('url');
//-----------------------------------------
//upto the hendlerequest function:
// creat a function who sendback the target file if that is available
// or send an error message if not
function sendModifiedIndex(name,response){

     fs.readFile('mysite/index.html','utf8',function(error,data){
     if(error){
       response.writeHead(500);
       response.write('there is a problem openning the file');
              }
     else{
       data = data.replace('%%NAME%%',name);
       response.writeHead(200,{'Content-Type':'text/html'});
       response.write(data);
       //console.log(data);

       response.end();
         }

   });
 }

 function sendFile(path,fileType,response){
      fs.readFile(path,'utf8',function(error,data){
      if(error){
        response.writeHead(500);
        response.write('there is a problem openning the file');
               }
      else{

        response.writeHead(200,{'Content-Type':fileType});
        data = data.replace('%%NAME%%','');
        response.write(data);
      //  console.log(data);
        response.end();
          }

    });
  }
  //--------------------------------------
  // upto the handleRequest function sending a 404 errorpage

  function send404(response){
       response.writeHead(404,{"Context-Type":"text/plain"});
       response.write('This page is not available');
       response.end();
  }
  //----------------------------------------
  // the function who process client's requests and responses
  // the main function

  function handleRequest(request, response){
    console.log(url);
    var parsedUrl = url.parse(request.url, true);
    console.log(parsedUrl);

    if (parsedUrl.pathname == '/'){
      var name = parsedUrl.query.name;
      if(name){
        sendModifiedIndex(name , response);
      }
      else {
       sendFile('mysite/index.html','text/html',response);
    //  sendFile('mysite/index.html','text/html',response);
    }
                           }
    else if (parsedUrl.pathname == '/mystyle.css'){
      sendFile('mysite/mystyle.css','text/css',response);
                                          }
    else
    {
      send404(response);
    }
  }
//------------------------------------------
// create server object who is going to listen for requests

  http.createServer(handleRequest).listen(8888,function(error){
   if (error){
     console.log(error);
             }
   else
      {
     console.log('listening on port 8888');
       }
 }
);

var staticServe = require('node-static')
var file = new staticServe.Server('./public', {cache: 7200})

require('http').createServer(function(request, response) {
  file.serve(request, response, function(err, res) {
    if (err) {
      console.error("> Error serving " + request.url + " - " + err.message)
      response.writeHead(err.status, err.headers)
      response.end()
    }
  })
}).listen(process.env.PORT || 3000)

console.log("> server up")

module.exports = function (req, res, next) {

  res.setupStream = function() {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
  }

  res.sendStream = function(data) {
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }

  next();
}

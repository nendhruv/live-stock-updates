window.onload = function() {

  var stockTable = document.getElementById('stockTable')
  var stockData = [];

  var socket = new WebSocket('ws://stocks.mnet.website');


  socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
  };


  socket.onopen = function(event) {
    console.log('socket is open')
  };


  var data = {};
  var company = {}
  socket.onmessage = function(event) {
    var message = JSON.parse(event.data);
    for (var i in message) {
      company[message[i][0]] = true;
    }
    for(i in message){
      var t = message[i][0]
      var h = {}
      h['prev'] = (data[t]==undefined?message[i][1]:data[t].curr) 
      h['curr'] = message[i][1]
      data[t]= h;
    }
    updateData(data, company)
  };


  function updateData(data, company){
    var str = ''
    for (var i in data) {
      if(company[i]){
        if(data[i]['curr'] - data[i]['prev'] > 0)
          str += '<li class="received positive">'+ i +  data[i]['curr'] + '     ' + data[i]['prev']+ '</li>';
        if(data[i]['curr'] - data[i]['prev'] < 0)
          str += '<li class="received negative">'+ i +  data[i]['curr'] + '     ' + data[i]['prev']+ '</li>';

      }
      else{
        str += '<li class="received">'+ i +  data[i]['curr'] + '     ' + data[i]['prev']+ '</li>';
      }

    }
    for (var i in company) {
      company[i] = false;
    }
    stockTable.innerHTML = str;
  }

};

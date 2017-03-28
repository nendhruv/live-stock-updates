window.onload = function() {

  var stockTable = document.getElementById('stockTable')
  stockTable.style.opacity = 0;

  var socket = new WebSocket('ws://stocks.mnet.website');


  socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
  };


  socket.onopen = function(event) {
    console.log('socket is open')
  };


  var data = {};
  var company = {};
  socket.onmessage = function(event) {
    stockTable.style.opacity = 0;
    var message = JSON.parse(event.data);
    for (var i in message) {
      company[message[i][0]] = true;
    }
    for(i in message){
      var token = message[i][0]
      var value = {}
      value['prev'] = (data[token]==undefined?message[i][1]:data[token].curr) 
      value['curr'] = message[i][1]
      data[token]= value;
    }
    updateData(data, company)
  };


  function updateData(data, company){
    var str = '<div class="stock head">'+ '<span class="stock-name">Token</span><span class="stock-name">Current Value</span>' +  '<span class="stock-name">Last Updated Value</span></div>'
    for (var i in data) {
      if(company[i]){
        if(data[i]['curr'] - data[i]['prev'] > 0)
          str += '<div class="stock positive">'+ '<span class="stock-name">' + i + '</span><span class="stock-name">' + data[i]['curr'] + ' </span>' +  '<span class="stock-name">'  +  data[i]['prev']+ '</span></div>';
        if(data[i]['curr'] - data[i]['prev'] < 0)
          str += '<div class="stock negative">'+  '<span class="stock-name">'  +  i  +  '</span><span class="stock-name">'  +  data[i]['curr'] + '</span>' + '<span class="stock-name">'+data[i]['prev']+ '</span></div>';

      }
      else{
          str += '<div class="stock">'+ '<span class="stock-name">' + i + '</span><span class="stock-name">' + data[i]['curr'] + ' </span>' +  '<span class="stock-name">'  +  data[i]['prev']+ '</span></div>';
      }

    }
    for (var i in company) {
      company[i] = false;
    }
    stockTable.innerHTML = str;
    stockTable.style.opacity = 1;
    
  }

};

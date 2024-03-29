var drawPieChart = function(data, colors) {
    var canvas = document.getElementById('pie');
    var ctx = canvas.getContext('2d');
    var x = canvas.width / 2;
        y = canvas.height / 2;
    var color,
        startAngle,
        endAngle,
        total = getTotal(data);
    
    for(var i=0; i<data.length; i++) {
      color = colors[i];
      startAngle = calculateStart(data, i, total);
      endAngle = calculateEnd(data, i, total);
      
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.moveTo(x, y);
      ctx.arc(x, y, y-100, startAngle, endAngle);
      ctx.fill();
      ctx.rect(canvas.width - 200, y - i * 30, 12, 12);
      ctx.fill();
      ctx.font = "13px sans-serif";
      ctx.fillText(data[i].label + " (" + calculatePercent(data[i].value, total) + "%)", canvas.width - 200 + 20, y - i * 30 + 10);
    }
  };
  
  var calculatePercent = function(value, total) {
    
    return (value / total * 100).toFixed(2);
  };
  
  var getTotal = function(data) {
    var sum = 0;
    for(var i=0; i<data.length; i++) {
      sum += data[i].value;
    }
        
    return sum;
  };
  
  var calculateStart = function(data, index, total) {
    if(index === 0) {
      return 0;
    }
    
    return calculateEnd(data, index-1, total);
  };
  
  var calculateEndAngle = function(data, index, total) {
    var angle = data[index].value / total * 360;
    var inc = ( index === 0 ) ? 0 : calculateEndAngle(data, index-1, total);
    
    return ( angle + inc );
  };
  
  var calculateEnd = function(data, index, total) {
    return degreeToRadians(calculateEndAngle(data, index, total));
  };
  
  var degreeToRadians = function(angle) {
    return angle * Math.PI / 180
  }
  
  var data = [
    { label: 'Google Chrome', value: 63.59},
    { label: 'Safari', value: 19.14 },
    { label: 'Firefox', value: 3.76 },
    { label: 'Edge', value: 3.41 },
    { label: 'Samsung Internet', value: 3.31 },
    { label: 'Opera', value: 2.19 },
    { label: 'Altres', value: 4.6 },

  ];
  var colors = [ '#3988d9', '#86d7cb', '#59272d', '#d4bed1', '#ced40f', '#cb289c', '#a17d45', ];
  
  drawPieChart(data, colors);
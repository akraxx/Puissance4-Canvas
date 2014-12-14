<html>
 <head>
  <script type="application/javascript">
    function draw() {
     var canvas = document.getElementById("canvas");
     var ctx = canvas.getContext("2d");

     for(var i = 1; i <= 10; i++) {
         ctx.fillStyle = "rgba(200,0,0, " + i * 0.1 + ")";
         ctx.fillRect (10 + 60 * (i - 1), 10, 55, 50);
     }
    }
  </script>
 </head>
 <body onload="draw()">
   <canvas id="canvas" width="1000" height="300"></canvas>
 </body>
</html>
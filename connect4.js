function addListener(element, event, listener)
{

	if(element.addEventListener) // Netscape, Firefox, ...
	{
		element.addEventListener(event, listener, false);
	}
	else // IE
	{
		element.attachEvent("on"+event, listener);
	}
}

function addJeton(colonne) {
    var place = false;
    var i = 5;
    while(i >= 0 && place != true) {
        if(grille[colonne + cols*i] === undefined) {
            grille[colonne + cols*i] = player;
            place = true;
        }

        i--;
    }

    if(place) {
        drawToken(colonne, i + 1, color[player]);
    }

    return place;
}

function changePlayer(event) {
    player = (player + 1)%2;
    drawCursor(event);
}

function clickOnCell(event) {
    var i = 0;
    var place = false;
    var canvas = event.target;

    while(i < 7) {
        if(Math.floor((event.clientX - canvas.offsetLeft) / d_size_case) == i) {
            place = addJeton(i);
        }
        i++;
    }

    if(place == true) {

        verificationPartie();

        changePlayer(event);

    }


}


function verificationPartie() {
    if(verificationGagnant(player)) {
        alert("Player " + color[player] + " wins !");
             reinitialiserGrille();
             
        return true;
    }
    else if(verificationEgalite()) {
            alert("Draw !");
             reinitialiserGrille();

        return true;
    }
    else
        return false;

}

function reinitialiserGrille() {
    var i;
    var j;
    for(i = 0; i < 6; i++) {
        for(j = 0; j < 7; j++) {
            grille[j + cols*i] = undefined;
        }
    }

    drawGrid();
}

function verificationEgalite() {
    var egalite = true;
    var i = 0;
    var j = 0;
    while(i < 6 && egalite == true) {
        while(j < 7 && egalite == true) {
            if(grille[j + cols*i] === undefined) {
                egalite = false;
            }
            j++;
        }
        i++;
    }
    return egalite;
}

function verificationGagnant(joueur) {
    var i;
    var j;
    for(i=0;i<3;i++)
     {
         for(j=0;j<7;j++)
         {
            if(grille[j + cols*i]==joueur && grille[j + cols*(i+1)]==joueur && grille[j + cols*(i+2)]==joueur && grille[j + cols*(i+3)]==joueur) {
                drawToken(j, i, color_win);drawToken(j, i+1, color_win);drawToken(j, i+2, color_win);drawToken(j, i+3, color_win);
                return true;
            }
         }
      }

     for(i=0;i<6;i++)
     {
         for(j=0;j<4;j++)
         {
             if(grille[j + cols*i]==joueur && grille[(j+1) + cols*i]==joueur && grille[(j+2) + cols*i]==joueur && grille[(j+3) + cols*i]==joueur) {
                drawToken(j, i, color_win);drawToken(j+1, i, color_win);drawToken(j+2, i, color_win);drawToken(j+3, i, color_win);
                return true;
            }
         }
     }


    for(i=0;i<3;i++)
    {
        for(j=0;j<4;j++)
        {
            if(grille[j + cols*i]==joueur && grille[(j+1) + cols*(i+1)]==joueur && grille[(j+2) + cols*(i+2)]==joueur && grille[(j+3) + cols*(i+3)]==joueur) {
                drawToken(j, i, color_win);drawToken(j+1, i+1, color_win);drawToken(j+2, i+2, color_win);drawToken(j+3, i+3, color_win);
                return true;
            }
        }
    }


    for(j=0;j<4;j++)
    {
        for(i=5;i>=3;i--)
        {
            if(grille[j + cols*i]==joueur && grille[(j+1) + cols*(i-1)]==joueur && grille[(j+2) + cols*(i-2)]==joueur && grille[(j+3) + cols*(i-3)]==joueur){
                drawToken(j, i, color_win);drawToken(j+1, i-1, color_win);drawToken(j+2, i-2, color_win);drawToken(j+3, i-3, color_win);
                return true;
            }
        }
    }
    return false;
}

function circle(event) {
    var canvas = event.target;

    alert(Math.floor((event.clientX - canvas.offsetLeft) / d_size_case));

}

function init() {
    initGrid();
    drawGrid();
    addListener(document.getElementById("demo"), 'click', clickOnCell);
    addListener(document.getElementById("demo"), 'mousemove', drawCursor);
}

/* DRAW FUNCTIONS */
function initGrid() {
  var canvas = document.getElementById("demo");
  d_width = canvas.getAttribute("width");
  d_height = canvas.getAttribute("height");

    if(d_width > d_height)
        d_size_case = d_height / linesGraph;
    else
        d_size_case = d_width / cols;
}

function drawCursor(event) {
    var canvas = event.target;
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0, 0, d_width, d_size_case - 2);
    ctx.strokeRect(0, 0, d_width, d_size_case - 2);
    ctx.closePath();

    drawToken(Math.floor((event.clientX - canvas.offsetLeft) / d_size_case), -1, color[player]);
}

function drawToken(col, line, color) {
    var center_x = col * d_size_case + d_size_case / 2;
    var center_y = (line + 1) * d_size_case + d_size_case / 2;

    var canvas = document.getElementById("demo");
    var ctx = canvas.getContext("2d");
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(center_x, center_y, (d_size_case - 4) / 2, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
}

function drawGrid() {
    var canvas = document.getElementById("demo");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0, 0, d_width, d_height);
    ctx.strokeRect(0, 0, d_width, d_height);

    ctx.strokeStyle = "#000";
    ctx.lineWidth=1;

    for (i = 1; i < linesGraph + 1; i++) {
    ctx.moveTo(0, i*d_size_case);
    ctx.lineTo(d_size_case * cols, i*d_size_case);
    ctx.stroke();

        for (j = 0; j < cols + 1; j++) {
            ctx.moveTo(j*d_size_case, d_size_case);
            ctx.lineTo(j *d_size_case, d_size_case * linesGraph);
            ctx.stroke();
        }
    }
    ctx.closePath();
}

var color = ["yellow", "red"];

var color_win = "green";
var player = 0;
var cols = 7;
var lines = 6;
var linesGraph = 7;

var grille = new Array(cols * lines);

/* Graph variables */
var d_width;
var d_height;
var d_size_case;

addListener(window, 'load', init);



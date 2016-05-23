;(function(){

    function loadJSON(filename, callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open('GET', filename, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == "200"){
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(null);
    }

    loadJSON('../assets/basic.json', function(jdata){

        var tileData = jdata.layers[0].data;

        var tileWidth = jdata.tilewidth;
        var tileHeight = jdata.tileheight;
        var gridWidth = jdata.width;
        var gridHeight = jdata.height;

        var tilesetWidth = jdata.tilesets[0].imagewidth / tileWidth;

        var canvasWidth = tileWidth * gridWidth;
        var canvasHeight = tileHeight * gridHeight;

        canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx = canvas.getContext("2d");
        document.body.appendChild(canvas);

        var t_x = 1, t_y = 1;
        var s_x, s_y;

        var tileImg = new Image();
        tileImg.onload = function(){

            for(var i=0; i < tileData.length; i++){
                s_x = parseInt((tileData[i] - 1) % tilesetWidth) * tileWidth;
                s_y = parseInt((tileData[i] - 1) / tilesetWidth) * tileHeight;
                ctx.drawImage(tileImg, s_x, s_y, tileWidth, tileHeight, (t_x * tileWidth) - tileWidth, (t_y * tileHeight) - tileHeight, tileWidth, tileHeight);
                if(t_x == gridWidth) { t_y++; t_x = 0; }
                t_x++;
            }

        };
        tileImg.src = "assets/" + jdata.tilesets[0].image;

    });

})();

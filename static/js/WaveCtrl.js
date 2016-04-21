/**
 * Created by Administrator on 2016/4/13.
 */
function WaveCtrl(girdNumX,girdNumY) {
    var girdNumX = girdNumX;
    var girdNumY = girdNumY;
    var ctx ;
    var width = 0;
    var height = 0;
    var waveRect = new Object();
    waveRect.x = 20;
    waveRect.y = 20;
    waveRect.width = width-40;
    waveRect.height = height-40;
    var channelList = new Array();
    var girdValueY = 20;


    this.addChannel = addChannel;
    this.setChannelWave = setChannelWave;
    this.update = update;
    this.setChannelPos = setChannelPos;
    this.setGirdValue = setGirdValue;

    function checkInRect(value) {
        if(value > waveRect.y+waveRect.height-1) {
            value = waveRect.y+waveRect.height-1;
        }
        if(value < waveRect.y - 1) {
            value = waveRect.y - 1;
        }
        return value;
    }
    function drawWave(){
        for(var i = 0; i < channelList.length; i++) {
            channel = channelList[i];
            var wave = channel.wave;

            ctx.beginPath();
            ctx.strokeStyle = channel.color;
            ctx.lineWidth = 2;
            for (var j = 1; j < waveRect.width; j++) {
                var waveCnt = Math.round(wave.length/waveRect.width*j);
                var x = waveRect.x+j;
                var y =  waveRect.y+waveRect.height/2 * (1 - channel.pos)  - wave[waveCnt] / (girdValueY*8/waveRect.height) ;
                y =  checkInRect(y);
                if(j == 1) {
                    ctx.moveTo(x, y);
                }
                ctx.lineTo(x,y);
            }
            ctx.stroke();
        }
    }





    function getChannel(name) {
        for(var i = 0; i < channelList.length; i++) {
            channel = channelList[i];
            if(channel.name == name) {
                return channel;
            }
        }
    }




    function addChannel(name,color) {
        var channel = new Object();
        channel.name = name;
        channel.color = color;
        channel.pos = 0;
        channel.wave = 0;
        channelList.push(channel);
    }
    function setChannelWave(name,wave) {
        getChannel(name).wave = wave;
    }

    function setChannelPos(name,pos) {
        getChannel(name).pos = pos;
    }

    function setGirdValue(value) {
        girdValueY = value;
    }



    function update(ctxU) {
        ctx = ctxU;
        width = ctx.canvas.width;
        height = ctx.canvas.height;
        waveRect.x = 4;
        waveRect.y = 4;
        waveRect.width = width-8;
        waveRect.height = height-8;
        ctx.beginPath();
        ctx.fillStyle="rgba(128,128,128,0.4)";
        ctx.fillRect(0,0,width,height);
        ctx.clearRect(waveRect.x,waveRect.y,waveRect.width,waveRect.height);
        ctx.stroke();
        drawBackGround();
        drawWave();

        function drawShortLine(x1,y1,x2,y2,num,len) {
            if (x1 == x2) {
                var gird = (y2 - y1) / num;
                var x = x1-len/2;
                for(var i=0;i<num+1;i++) {
                    var y = y1+gird*i;
                    ctx.moveTo(x,y);
                    ctx.lineTo(x+len,y);
                }
            }
            else if (y1 == y2) {
                var gird = (x2 - x1) / num;
                var y = y1-len/2;
                for(var i=0;i<num+1;i++) {
                    var x = x1+gird*i;
                    ctx.moveTo(x,y);
                    ctx.lineTo(x,y+len);
                }
            }
        }

        function drawWeakLine(x1,y1,x2,y2,num,len) {
            if (x1 == x2) {
                var gird = (y2 - y1) / num;
                var x = x1;
                for(var i=1;i<num;i++) {
                    var y = y1+gird*i;
                    ctx.moveTo(x,y);
                    ctx.lineTo(x,y+len);
                }
            }
            else if (y1 == y2) {
                var gird = (x2 - x1) / num;
                var y = y1;
                for(var i=1;i<num;i++) {
                    var x = x1+gird*i;
                    ctx.moveTo(x,y);
                    ctx.lineTo(x+len,y);
                }
            }
        }

        function drawBackGround(){
            ctx.beginPath();
            ctx.fillStyle="rgba(48,15,38,1)";
            ctx.fillRect(waveRect.x,waveRect.y,waveRect.width,waveRect.height);

            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1;
            var peerX = waveRect.width/girdNumX;
            var peerY = waveRect.height/girdNumY;
            for(var i = 1; i < girdNumX; i++) {
                if(i == girdNumX/2) {
                    continue;
                }
                var x = peerX*i;
                drawWeakLine(waveRect.x+x,waveRect.y-1,waveRect.x+x,waveRect.y+waveRect.height-1,40,2);
            }
            for(var i = 1; i < girdNumY; i++) {
                if(i == girdNumY/2) {
                    continue;
                }
                var y = peerY*i;
                drawWeakLine(waveRect.x-1,waveRect.y+y,waveRect.x+waveRect.width-1,waveRect.y+y,50,2);
            }
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.moveTo(waveRect.x,waveRect.y);
            ctx.lineTo(waveRect.x+waveRect.width,waveRect.y);
            ctx.lineTo(waveRect.x+waveRect.width,waveRect.y+waveRect.height);
            ctx.lineTo(waveRect.x,waveRect.y+waveRect.height);
            ctx.lineTo(waveRect.x,waveRect.y);

            drawShortLine(waveRect.x,waveRect.y+2,waveRect.x+waveRect.width,waveRect.y+2,50,4);
            drawShortLine(waveRect.x,waveRect.y+waveRect.height/2,waveRect.x+waveRect.width,waveRect.y+waveRect.height/2,50,4);
            drawShortLine(waveRect.x,waveRect.y+waveRect.height-2,waveRect.x+waveRect.width,waveRect.y+waveRect.height-2,50,4);

            drawShortLine(waveRect.x+2,waveRect.y,waveRect.x+2,waveRect.y+waveRect.height,50,4);
            drawShortLine(waveRect.x+waveRect.width/2,waveRect.y,waveRect.x+waveRect.width/2,waveRect.y+waveRect.height,50,4);
            drawShortLine(waveRect.x+waveRect.width-2,waveRect.y,waveRect.x+waveRect.width-2,waveRect.y+waveRect.height,50,4);
            ctx.stroke();
        }

    }
}

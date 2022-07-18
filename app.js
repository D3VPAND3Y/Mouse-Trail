var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");



var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius=10;
// var minRadius=1;
window.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})



function Circle(x,y,dx,dy,radius){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=radius;
    var red = Math.floor(Math.random() * 255)+1;
    var blue = Math.floor(Math.random() * 255)+1;
    var green = Math.floor(Math.random() * 255)+1;
    var opacity = 1;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "rgba("+red+","+blue+","+green+","+opacity+")";
        c.fill();

    }
    this.update = function(){
        if(this.x+this.radius>innerWidth || this.x-this.radius<0){
            this.dx=-this.dx;
        }
        if(this.y+this.radius>innerHeight || this.y-this.radius<0){
            this.dy=-this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;


        //Interactivity
        if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<40 && mouse.y-this.y>-40){
            if(this.radius<maxRadius){
                this.radius += 1;
                opacity -= 0.09;
            }
        }

        else if(this.radius> this.minRadius){
            this.radius -= 1;
            opacity += 0.1;
        }
        this.draw();

    }


}


var circleArray=[];


function init(){
    circleArray=[];
    for(var i=0;i < 10000;i++){
        var radius=0;
        var x=Math.random()*(innerWidth-radius*2)+ radius;
        var y=Math.random()*(innerHeight-radius*2) + radius;
        var dx=(Math.random()-0.5)*10;
        var dy=(Math.random()-0.5)*10;
    
        circleArray.push(new Circle(x,y,dx,dy,radius));
    
    }
}

 function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }

 }
animate();
init();
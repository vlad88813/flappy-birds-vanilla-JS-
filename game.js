let cvs = document.getElementById("canvas");
let ctx = cvs.getContext('2d');


let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();



bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";



//звуковые файлы

let fly = new Audio ();
let score_audio = new Audio ();
let sound_game_over = new Audio();
let winner = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
sound_game_over.src = "audio/sound_game_over.mp3";
winner.src = "audio/winner.mp3";


let gap = 100;


document.addEventListener("keydown", moveUP);
 
function moveUP() {
    yPos -= 30;
    fly.play();
  
}

//block


let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}


let score = 0;




let xPos = 10; // ширина .позиция птички 
let yPos = 50; // высота (счет сверху вниз) позиция птички 
let grav = 1.5;


function draw(){
    ctx.drawImage(bg, 0, 0);


    for (let i = 0; i < pipe.length; i++){
        
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, + pipe[i].y + pipeUp.height + gap);

    pipe[i].x--; // ширина блока, точнее его движение по ширине ()иксу

    if(pipe[i].x == 50) {
        pipe.push({
            x: cvs.width,
            y: Math.floor(Math.random()* pipeUp.height) - pipeUp.height
        });
        }

        if (xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
                || yPos + bird.height >= cvs.height - fg.height ) {
                    location.reload();
                    sound_game_over.play();
                    alert('Game over, ваш счёт  '+ score);
                }
        
        if (pipe[i].x == 5){
            score++;
            score_audio.play();
            if (score % 10 == 0 ){
                winner.play();
            }
        
        }
    }


    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos ,yPos);

    yPos += grav;


    ctx.fillStyle = '#000';
    ctx.font = '24px Verdana';
    ctx.fillText('Счёт: ' + score, 20, cvs.height - 60)


    requestAnimationFrame(draw)

} 


pipeBottom.onload = draw; 

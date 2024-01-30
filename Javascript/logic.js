// Game Varraible
let inputDir={x:0,y:0};

const eating=new Audio("Sound/eating.mp3");
const moving=new Audio("Sound/transition.mp3");
const hitting=new Audio("Sound/hitting.mp3");
const backgroundmusic=new Audio("Sound/backgroundmusic1.mp3");
let lastpainttime=0;
let highscoreval;
let speed=15;   
let index=0;
let snakeArr=[
    {x:12,y:14}
]
let food={x:20,y:10};
let board=document.getElementById('board');
let score=0;

// Game Controls

function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000 < 1/speed){
        // console.log(ctime);
        return ;}
    lastpainttime=ctime;
    // console.log("Hello world");
    getStart()
}

function hittedthewall(sarr){
    for(let i=1;i<snakeArr.length;i++)
    {
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y )
        {
            return true;
        }
    }

    if((sarr[0].x<=0 ||  sarr[0].x>=25) || (sarr[0].y<=0 || sarr[0].y>=20))
        return true;
}

function getStart()
{
    // Upadting the snake and snake Array
        if(hittedthewall(snakeArr))
        {
            hitting.play();
            backgroundmusic.pause();
            if(score>highscoreval)
            {
                highscoreval=score;
                localStorage.setItem("highscore",JSON.stringify(highscoreval)); 
                alert("Hurray🎉✨!!! You Beat the Highscore.Now you are the Champ😁");
            }
            highscorebox.innerHTML=highscoreval;
            alert("Game Over!!! Play Again");
            inputDir={x:0,y:0};
            snakeArr=[{x:12,y:14}];
            backgroundmusic.play();
            score=0;
            document.getElementById('number').innerHTML=score;
            
        }
        
        // Food is eaten
        if(snakeArr[0].x==food.x && snakeArr[0].y==food.y)
        {
            snakeArr.unshift({x:(snakeArr[0].x+inputDir.x),y:(snakeArr[0].y+inputDir.y)});
            eating.play();
            eating.playbackRate=3.0;
            score+=1;
            document.getElementById('number').innerHTML=score;
            let a=2;
            let b=16;
            food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
        }

        // Uodating the snake
        for(let i=snakeArr.length-2 ;i>=0;i--)
            snakeArr[i+1]={...snakeArr[i]};

        snakeArr[0].x+= inputDir.x;
        snakeArr[0].y+= inputDir.y;
    // Render the food and snake

    board.innerHTML="";
    // Displaying the snake
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0)
            snakeElement.classList.add('head');
        else     
            snakeElement.classList.add('snakebody');
        board.appendChild(snakeElement);
    })
    // Displaying the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food'); 
    board.appendChild(foodElement);
    
}


// MainLogic starts here
let highscore=localStorage.getItem("highscore");
if(highscore===null)
{
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else
{
    highscoreval=JSON.parse(highscore);
    highscorebox.innerHTML=highscoreval;
}
window.requestAnimationFrame(main);

window.addEventListener("keydown",e=>{
    backgroundmusic.play();//Start The Game
    inputDir={x:0,y:0};
    switch (e.key) {
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            moving.play()
            moving.playbackRate=3.0;
            break;
            
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            moving.play()
            moving.playbackRate=3.0;
            break;
                    
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            moving.play()
            moving.playbackRate=3.0;
            break;
                    
        case "ArrowRight":
            inputDir.x=1;
        inputDir.y=0;
        moving.play()
        moving.playbackRate=3.0;
            break;    
                
        default:
            break;
        }
})
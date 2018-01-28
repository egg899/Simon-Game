$(document).ready(function(){
 
var number;
 var moving=false;
  var count=0;
var counter =parseFloat($("#num").html());
  var power=false;
 var colors=["#red", "#blue", "#green", "#yellow"];
  var current =[];   
   var playerArr=[];
  var strict=false;
  
   $("#power").click(function(){
     if(power==true){
      $(this).css('background-color','#376bfb');
       $("#btn").css('background-color','red');
      power=false;
       
       stop();
       
    }
     
    else if(power==false){
      $(this).css('background-color','red');
      power=true;
      
      $("#num").html("0");
      
     }//nested else if 
       
   
  });//power
     //console.log(power);
     
       
     
  
  
  function resetCurrent(){
    current=[];
    //var i=0;
    
  }
  
  function resetPlayer(){
    playerArr=[];
  }
  
  //stop suddenly
  function stop(){
    resetCurrent();
    resetPlayer();
    $("#num").html("--");
  }
  
  if(power===false){
    $("#num").html("--");
  }
  
  //function to reset the game
  function resetGame(){
    resetCurrent();
    resetPlayer();
    //$("#num").html(current.length);
    generateMove();
  }
  
 
  //setting the game to strict
  
  
    
 
  $("#strict").click(function(){
    if(power===true){
    if(strict===false){
      $(this).css('background-color', 'green');
      strict=true;
    }
    else if(strict===true){
      $(this).css('background-color', 'yellow');
      strict=false;
    }
      }
  });
  
  
  //starting the game
   
    
  
  $("#btn").click(function(){
  moving=true;
    count++;
    
    
    ///Keep on developing this if power is tru it will start
    if(power===true){
     
     $(this).css('background-color', '#376bfb');
      
    
      generateMove();
    
      
    
      
     
       
     
        
      
      
      if(counter>=1){
        resetGame();
      }else if(power===false){
        count=0;
        
      }
   
  } 
      
  });//btn
  
  
  //Function that that makes the blocks change colors
  function randColors(value){
    
      
    
    $(value).addClass('hovered');
    
    setTimeout(function(){
      $(value).removeClass('hovered');
      
    }, 500);
      
  }//rand colors
  
  //generating the move for Simon Sequence
  function generateMove(){
    
    
    //Simon game needs random numbers to choose the colours from
    number=Math.floor(Math.random()*4);
    
    
    current.push(colors[number]);
    $("#num").html(current.length);
    
    
    
    //Here we are calling the "move" function which iterates through the array were the colors were pushed and generates the sequence
   
     
   
    moves();
     
     
    
  }
  
  
  //move//
  //This move function display the sequence theough intervals
function moves(){
  
  
  var i=0;
  var sequence=setInterval(function(){
      randColors(current[i]);
    playSound(current[i]);
    $('.square').css('pointer-events','none');
     i++;
     
     
    
    
   
      if(i>=current.length){
        clearInterval(sequence);
        $('.square').css('pointer-events','auto');
      }
    
    
    
    },800);//Sequence Interval
      
  
     
        
     
      
      resetPlayer();
  
     }//moves
  
  
  
  
  
  
  
      $(".square").click(function(){
       
         
            
          
        
        //////Player/////
        var id="#"+$(this).attr("id");
          
        
        //function player that pushes color values into another array to be compared later with the simon array sequence
     if(power===true ){
        
       
       ////audio
        
        if(id==="#red"){
         $('#redbutton')[0].play(); 
        }else if(id==="#blue"){
         $('#bluebutton')[0].play(); 
        }else if(id==="#green"){
         $('#greenbutton')[0].play(); 
        }else if(id==="#yellow"){
         $('#yellowbutton')[0].play(); 
        }
       
        
        function player(){
       
         randColors(id);
        playerArr.push(id);
       
          
            
          
        
          
        
        
        
         }//player
     
        player();
        
        //This condition checks if the array is the same and the length is the same in order to move to the next pattern
       if(check()==true && playerArr.length === current.length){
         //Setting time out for functions to be called
         if(counter===20){
           alert("congrats!!!");
           resetGame();
           counter=parseFloat($("#num").html());
           //turn off game right here
           
         }else{
           setTimeout(function(){generateMove();},1000);
         counter++;
         } 
         
         
         
         
         
        }//if
        
        else if(check()===false){
          if(strict===true){
            setTimeout(function(){
               resetGame();   
            },1000)
             
          
          }
          else{
             setTimeout(function(){
            moves();
            
          }, 1000);
          }
         
          
        }//else if
        
     }//if power true
        
        
       // console.log(counter);
        
        console.log("current: "+current);
    console.log("player: "+playerArr);
 });//square click
     
      
      
//Check if the sequence if the player arr and the Sion array are the same the same
        function check(){
          
          for(var i=0;i<playerArr.length;i++){
            
            
            
          
          if(playerArr[i]!=current[i]){
            if(strict==true){
              //setTimeout(function(){
                        // alert("From the top");
              $("#num").html("Error");
              
              
              
              return false;
                
                //         },500)
              
              
             
            }//nested if
            else{
             
                if(count>0){
              
              //alert("Wroooooong color");
                 $("#num").html("Error");
                  
                  setTimeout(function(){
                    $("#num").html(current.length);
                  },500);
                  
              return false;
            //resetPlayer();
                 
            
            return false;
                }
            }
            
            
            
          }//if
          
        }//for
          return true;
          
        }//check
        
  
  function playSound(id){
    switch(id){
       case "#red":
        $('#redbutton')[0].play(); 
        break;
        case "#blue":
        $('#bluebutton')[0].play();
        break;
        case "#green":
        $('#greenbutton')[0].play();
        break;
        case "#yellow":
        $('#yellowbutton')[0].play();
        break;
    }
  }//check
   
  
});//document ready
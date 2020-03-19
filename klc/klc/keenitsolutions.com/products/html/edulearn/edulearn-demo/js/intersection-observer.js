var targetValue;
  var root;
  var rootMargin;
  var targets=[];
  var viewTime=0;
  var sendGaGoal;
  var sendAvgTime;
  var targetTime;
  var sendGATime;

  var switchTag=false;
  var viewOneTime=false;
  // var eventOption={
  //   eventCategory:"",
  //   eventLabel:"",
  //   eventaAction:"",
  //   eventValue:0,
  // }
  // var eventCategory;
  // var eventLabel;
  // var eventaAction;

  var myVar=null;
  var intersectionRatio=0;


  function setTagetGoal(viewTime){
    var value=viewTime*1000;
    if(viewTime==5){

      
      gtag('event', "view_article", {
        'event_category': "article_aa",
        'event_label': "view_5_second",
        'value':1
        });
        console.log("total view time:"+viewTime+"s");
        console.log("send GA avg. view time");    

    }else if(viewTime==10){

       gtag('event', "view_article", {
        'event_category': "article_aa",
        'event_label': "view_10_second",
        'value':1
        }); 
        
        console.log("total view time:"+viewTime+"s");
      console.log("send GA avg. view time"); 

    }else if(viewTime==15){

      gtag('event', "view_article", {
        'event_category': "article_aa",
        'event_label': "view_15_second",
        'value':1
        }); 
        console.log("total view time:"+viewTime+"s");
      console.log("send GA avg. view time");    
      
    }else if(viewTime==20){

      gtag('event', "view_article", {
        'event_category': "article_aa",
        'event_label': "view_20_second",
        'value':1
        }); 
        console.log("total view time:"+viewTime+"s");
      console.log("send GA avg. view time");   
      
      
    }

  }


function sengGAGoal(viewTime,targetTime,sendGaGoal){
  let eventOption1={
    eventCategory:'article',
    eventLabel:'blog',
    eventAction:'view_article',
    eventValue:1,
  };
    if(viewTime==targetTime  && sendGaGoal==true){
        console.log("send GA goal"); 

        gtag('event', eventOption1.eventAction, {
            'event_category': eventOption1.eventCategory,
            'event_label': eventOption1.eventLabel,
            'value':eventOption1.eventValue
            });
                
    }
  }
  function sendGaAvgTime(viewTime,sendAvgTime){

    if(viewTime>2 && sendAvgTime==true){  
      
     var value=viewTime*1000;
        gtag('event', 'timing_complete', {
            'name' : 'view_article_time',
            'value' : value,
            'event_category' : 'article2',
            'event_label' : 'blog2'
          });    
                        
    }
  }

  function startObserved(){
    console.log("taoch area!");

    myVar = setInterval(timeValue=>{
       ++viewTime;
       console.log(viewTime);
       sengGAGoal(viewTime,targetTime,sendGaGoal);
      if(viewTime<=20){
         setTagetGoal(viewTime);
        }
       
       //sendGaAvgTIme(viewTime,targetTime,sendAvgTime);            
    }, 1000);
  }

  function endObserved(){

    console.log("total view time:"+viewTime+"s");
    if(viewTime >= 5 && viewOneTime==false){
       sendGaAvgTime(viewTime,sendAvgTime);
      viewOneTime=true; 
      console.log("send GA avg. view time");
    }  
    clearInterval(myVar);
    viewTime = 0;
  }

  function stopTime(){
    clearInterval(myVar);
  }

  function intersectionObserver(option){
    targetValue=option.targetValue;
    root=option.root;
    rootMargin=option.rootMargin;
    targets=option.targets;
    sendGaGoal=option.sendGaGoal;
    sendAvgTime=option.sendAvgTime;
    targetTime=option.targetTime;
    sendGATime=option.sendGATime;

    console.log("taoch area!");
    let options= {
      root:root,
      rootMargin: rootMargin,
      threshold:[targetValue]
   }

    var io = new IntersectionObserver(
      changes => {
      for(const change of changes){         
        intersectionRatio=change.intersectionRatio;
      }

         
         if(intersectionRatio >= targetValue && switchTag==false ){
          startObserved();

           
         }else if(intersectionRatio >= targetValue && viewOneTime==false){
          startObserved();

         }else if(intersectionRatio < targetValue){
                 
                endObserved();
          }
      
   
  },options);

  targets.forEach(target => {
    io.observe(target);
  });

  }


  function unhook(){
    sendGaAvgTime(viewTime,sendAvgTime); 
  }




  ///////-------------slider----------------///////////
//   let target1 = document.querySelector("#testimonial-item1");
//   let target2 = document.querySelector("#testimonial-item2");
//   let target3 = document.querySelector("#testimonial-item3");
  
//   let option={
//     targetValue:[0.2],
//     root : null,
//     rootMargin : "0px 0px 0px 0px",
//     targets:[target1,target2,target3],
//     sendGaGoal:false,
//     sendAvgTime:true,
//     targetTime:5,
//     sendGATime:5,
//   }
//   if(target1!=null){
//     intersectionObserver(option);
//   }

  ////////----------------------------------//////////



  ///////---------------blog----------------//////////
  let target4 = document.querySelector("#blog-content");

  
  let option1={
    targetValue:[0.3],
    root : null,
    rootMargin : "0px",
    targets:[target4],
    sendGaGoal:false,
    sendAvgTime:true,
    targetTime:5,
    sendGATime:5,
  }
  
  // console.log(eventOption1);
  if(target4!=null){
    intersectionObserver(option1);
  }
  
  /////////------------window----------------//////////


document.addEventListener("visibilitychange", function() {

    if(document.visibilityState=='hidden'){
        if(viewTime>=5){
          switchTag=true;
          endObserved();
        }
        stopTime();
        viewTime=0;
        console.log('hidden!');
    }else if(document.visibilityState=='visible'){
         if(viewTime>=5){
          startObserved();
         }
         console.log('visible!');
    }
//   console.log( document.visibilityState );
});


window.addEventListener("beforeunload", function (event) {
    console.log("leave,send ga code");
    endObserved();

});

window.onunload = function(){
// return console.log("send ga code2");
};

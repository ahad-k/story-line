function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6GGDoyDVaib":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
     var timeLeft = player.GetVar("Timer") || 60;
     player.SetVar("Timer", timeLeft);
     player.SetVar("GameOver", false);

     if (window.timerInterval) {
         clearInterval(window.timerInterval);
     }

     window.timerInterval = setInterval(function() {
         var isPaused = player.GetVar("PauseTimeline");
         var soundFinished = player.GetVar("SoundFinished") || false;
         var playSound = player.GetVar("PlaySound") || false; // متغیر جدید
         console.log("PauseTimeline: " + (isPaused !== null ? isPaused : "undefined") + ", TimeLeft: " + timeLeft + ", SoundFinished: " + soundFinished + ", PlaySound: " + playSound);
         if (isPaused === true || soundFinished === true) {
             clearInterval(window.timerInterval);
             return;
         } else if (timeLeft > 0) {
             timeLeft--;
             player.SetVar("Timer", timeLeft);
             // شرط 10 ثانیه آخر و PlaySound
             if (timeLeft <= 10 && playSound === true) {
                 var clickSound = document.getElementById("clickSound"); // اسم فایل صوتی
                 if (clickSound && clickSound.paused) { // فقط اگه متوقف باشه پخش کن
                     clickSound.currentTime = 0; // از اول پخش کن
                     clickSound.play().catch(function(error) {
                         console.log("Error playing sound: " + error);
                     });
                 }
             }
         } else {
             player.SetVar("GameOver", true);
             clearInterval(window.timerInterval);
         }
     }, 1000);
}


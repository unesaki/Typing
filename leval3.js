var wordlist = ["tesikaga","todoroki","nisimonai","getou","sagae","siogama","nakoso","tumagoi","mibu","namegata","ogose","sousa","syakuzii","kewaizaka","itoigawa","heda","koromo","mizunami","isurugi","suzu","komono","ikaruga","uzumasa","mozu","sisou","mimasaka","hatukaiti","misasa","sinnziko","mine","siudeyama","iyakei","asizurimisaki","munakata","yobuko","sonogi","azimu","siranui","obi","ibusuki","nakizinn","osyamannbe","moya"];
var wordlistJapanese = ["弟子屈","驫木","西馬音内","夏油","寒河江","塩竈","勿来","嬬恋","壬生","行方","越生","匝瑳","石神井","化粧坂","糸魚川","戸田","挙母","瑞浪","石動","珠洲","菰野","斑鳩","太秦","百舌鳥","宍粟","美作","廿日市","三朝","宍道湖","美祢","紫雲出山","祖谷渓","足摺岬","宗像","呼子","彼杵","安心院","不知火","飫肥","指宿","今帰仁","長万部","雲谷"];
     var time_limit = 90;
     var readytime = 3;
     var score;
     var correct;
     var mistake;
     var char_num = 0;
     var word_char;
     var random;
     function ready(){
         readytime = 3;
         scoredis.innerHTML="";
         start_button.style.visibility ="hidden";
         var readytimer = setInterval(function(){
             count.innerHTML=readytime;
             readytime--;
             if(readytime < 0){
                clearInterval(readytimer);
                 gameStart();
                }
         },1000);
     }
     function gameStart(){
         score = 0.0;
         mistake = 0;
         correct = 0;
         wordDisplay();
         var time_remaining = time_limit;
         var gametimer = setInterval(function(){
            count.innerHTML="残り時間："+time_remaining;
             time_remaining--;
             if(time_remaining <= 0){
             clearInterval(gametimer);
                 finish();
         }
         },1000);
     }
     function wordDisplay(){
         random = Math.floor( Math.random() * wordlist.length );
         word.innerHTML=wordlist[random];
         japanese.innerHTML=wordlistJapanese[random];
         charInsort();
     }
     function charInsort(){
         word_char = wordlist[random].charAt(char_num);
     }
     function finish(){
         score = Math.floor(Math.pow(correct,2) * Math.pow((correct/(correct+mistake)),5));
         scoredis.innerHTML="スコア:"+score+"点"+"<hr>正タイプ数:"+correct+"<br>ミスタイプ数:"+mistake+"<br>正答率"+(correct/(correct+mistake)*100).toFixed(1)+"%";
         count.innerHTML="";
         word.innerHTML="";
         japanese.innerHTML="";
         start_button.style.visibility ="visible";
         word_char=0;
         random = 0;
         char_num = 0;
     }
document.onkeydown = function(e) {
    if(e.keyCode == 189){
       keyStr = "-";
       }else if(e.keyCode == 188){
                keyStr = ","
                }else{
 var keyStr = String.fromCharCode(e.keyCode);
    keyStr = keyStr.toLowerCase();
       }
    if(keyStr == word_char){
        document.getElementById('missaudio').pause();
        document.getElementById('missaudio').currentTime = 0;
        document.getElementById('correctaudio').pause();
                   document.getElementById('correctaudio').currentTime = 0;
        document.getElementById('correctaudio').play();
        word.innerHTML="<span style='color: red;'>"+wordlist[random].substr(0,char_num+1)+"</span>"+wordlist[random].substr(char_num+1,wordlist[random].length);
        char_num++;
        correct++;
        charInsort();
       }else{
                      document.getElementById('missaudio').pause();
           document.getElementById('missaudio').currentTime = 0;
           document.getElementById('correctaudio').pause();
           document.getElementById('correctaudio').currentTime = 0;
           mistake++;
           document.getElementById('missaudio').play();
       }
    if(char_num == wordlist[random].length){
        char_num=0;
        wordDisplay();
       }
};
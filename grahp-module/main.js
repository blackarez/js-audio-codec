var audio = new Audio();
audio.src = "perro.mp3";
audio.crossOrigin = "anonymous";
audio.controls = true;
audio.autoplay = true;
audio.loop = false;

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
var arrayNew;
console.log("info");
//window.addEventListener("load", initMp3Player, false);
//initMp3Player();
//frameLooper();

arrayNew = [32 , 58 , 59 ,25 , 30];
prueba();

function change(){
  arrayNew = [ 58 , 59 ,25 , 30, 60 ,70];
  //prueba();
}



function initMp3Player(){
  console.log("initMp3Player");
  document.getElementById('audio_box').appendChild(audio);

  console.log("initMp3Player-1");
  context = new AudioContext();
  analyser = context.createAnalyser();

  console.log("initMp3Player-3");
  canvas = document.getElementById('analyzer_render');

  console.log("initMp3Player-4");
  ctx = canvas.getContext('2d');

  console.log("initMp3Player-5");
  //source = context.createMediaElementSource(audio);
  //source.connect(analyser);
  analyser.connect(context.destination);
  console.log("initMp3Player-6");
  frameLooper();
}

function frameLooper(){
  console.log("frameLooper");
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#83F442";
  bars = 100;

  for(var i = 0; i < bars; i++){
    console.log(fbc_array[i]);
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}

function prueba(){
  console.log(arrayNew);
  canvas = document.getElementById('analyzer_render');
  ctx = canvas.getContext('2d');
  //window.requestAnimationFrame(prueba);
  fbc_array = Uint8Array.from(arrayNew);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#83F442";
  bars = 100;

  for(var i = 0; i < bars; i++) {
    auxHeight = (arrayNew[i] === undefined)? 0: arrayNew[i];
    //console.log(auxHeight);
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(auxHeight / 2);
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}

window.setTimeout( () => {change();prueba()} , 3000);
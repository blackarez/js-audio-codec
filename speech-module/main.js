let elements = {};
let actions = {};

let SpeechRecognition, recognition;
let transcriptSpeech;

const recognitionSetup = () => {
  SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = true;
  recognition.interimResults = false;
};

const getIdsDOM = () => { 
  document.querySelectorAll('button, textarea').forEach((element) => {
    elements[element.id] = element;
  });
}; 

const actionsSetup = () => { 
  Object.keys(elements).forEach(id => {
    switch(id) {
      case 'btnStartRecord':
        actions[id] = () => {
          recognition.start();
        };
        break;
      case 'btnStopRecord':
        actions[id] = () => { 
          recognition.abort();
        };
        break;
    };
  });
};

const setActionsListener = () => { 
  Object.keys(elements).forEach(id => {
    elements[id].addEventListener('click', actions[id]);
  });
};

const recordSpeech = () => {
  recognition.onresult = (event) => { 
    const recordData = event.results;
    transcriptSpeech = recordData[recordData.length - 1][0].transcript;
    printSpeech();
  };
};

const printSpeech = () => { 
  elements['txtSpeech'].value += transcriptSpeech;
};

recognitionSetup();
getIdsDOM();
actionsSetup();
setActionsListener();
recordSpeech();
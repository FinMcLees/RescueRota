// Series Rota Modal
function seriesRota(){
  // Get modal element
  var sModal = document.getElementById('SeriesRotaModal');
  // Get open modal button
  var sModalBtn = document.getElementById('seriesRotaModalBtn');
  // Get close button
  var closeBtn = document.getElementsByClassName('closeBtn')[0];

  // Listen for open click
  sModalBtn.addEventListener('click', openModal);
  // Listen for open click
  closeBtn.addEventListener('click', closeModal);
  // Listen for click outside
  window.addEventListener('click', outsideClick);

  // Function to open modalBtn
  function openModal(){
    sModal.style.display = 'block';
  }
  // Function to close modalBtn
  function closeModal(){
    sModal.style.display = 'none';
  }

  // Function to close model if outside click
  function outsideClick(e){
    if(e.target == sModal){
      sModal.style.display = 'none';
    }
  }
}

function eventRota(){
// Event Rota Modal
  // Get modal element
  var eModal = document.getElementById('EventRotaModal');
  // Get open modal button
  var eModalBtn = document.getElementById('eventRotaModalBtn');
  // Get close button
  var closeBtn = document.getElementsByClassName('closeBtn')[1];

  // Listen for open click
  eModalBtn.addEventListener('click', openModal);
  // Listen for open click
  closeBtn.addEventListener('click', closeModal);
  // Listen for click outside
  window.addEventListener('click', outsideClick);

  // Function to open modalBtn
  function openModal(){
    eModal.style.display = 'block';
  }
  // Function to close modalBtn
  function closeModal(){
    eModal.style.display = 'none';
  }

  // Function to close model if outside click
  function outsideClick(e){
    if(e.target == eModal){
      eModal.style.display = 'none';
    }
  }
}

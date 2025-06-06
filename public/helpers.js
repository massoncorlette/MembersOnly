

function styleMessages() {

  let toggleRowsColors = false;

  const messages = document.querySelectorAll('.messageContent');
  const messageBubbles = document.querySelectorAll('.userTxt');

  messages.forEach((message) => {

     if (toggleRowsColors) {
      message.classList.add( 'light');
      toggleRowsColors = false;
    } else {
      message.classList.add( 'dark');
      toggleRowsColors = true;
    }
  });

  messageBubbles.forEach((message) => {

     if (toggleRowsColors) {
      message.classList.add( 'dark');
      toggleRowsColors = false;
    } else {
      message.classList.add( 'light');
      toggleRowsColors = true;
    }
  });
};

styleMessages();


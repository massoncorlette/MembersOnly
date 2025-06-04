

function styleMessages() {

  const toggleRowsColors = false;

  const messages = document.querySelectorAll('.messageContent');

  console.log("FIRE");

  messages.forEach((message) => {

     if (toggleRowsColors) {
      message.classList.add( 'light');
      toggleRowsColors = false;
    } else {
      message.classList.add( 'dark');
      toggleRowsColors = true;
    }
  })
};

styleMessages();


// constants
const ENTER_KEY = 13;
const MESSAGE_CONTAINER = document.getElementById('messages');

// overlay
const mo = new MessageOverlay();

// loop
function listen() {
  let key = window.event?.keyCode;

  if (key === ENTER_KEY) {
    mo.submit();
  }
}

document.addEventListener('keypress', (e) => {
  if (e.key === 'c' && document.activeElement.id !== 'input') {
    mo.config.toggle();
  }
});

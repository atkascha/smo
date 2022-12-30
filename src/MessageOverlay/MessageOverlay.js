class MessageOverlay {
  constructor() {
    this.menu = document.getElementById('menu');
    this.textarea = document.getElementById('input');
    this.config = new Config();
    this.messages = [];
  }

  submit() {
    let message = new Message({ content: this.textarea.value, config: this.config });

    this.messages.push(message);
    this.textarea.value = '';

    message.render();
  }
}

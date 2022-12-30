class Message {
  constructor({ content, ...config }) {
    this.content = content;
    this.createAt = this.#currentTime;
    this.opacity = 1;
    this.config = config;
  }

  get #currentTime() {
    let date = new Date();

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    return date.toLocaleDateString(
      navigator.language,
      { hour: '2-digit', minute: '2-digit' }
    );
  }

  render() {
    let configuration = this.config.config;
    let container = document.createElement('div')
    container.className = 'message-container'

    let div = document.createElement('div');
    div.className = 'message'
    div.innerText = this.content;

    // set styles from config
    div.style.fontSize = `${configuration.textSize}px`;
    div.style.color = configuration.textColor;
    div.style.borderColor = configuration.borderColor;
    div.style.backgroundColor = configuration.backgroundColor;

    if (configuration.position === 2) {
      MESSAGE_CONTAINER.style.flexDirection = 'column-reverse';
    } else {
      MESSAGE_CONTAINER.style.flexDirection = 'column';
    }

    configuration.textAlign === 'left' ?
      MESSAGE_CONTAINER.style.textAlign = 'left' :
      MESSAGE_CONTAINER.style.textAlign = 'right';

    container.appendChild(div)
    MESSAGE_CONTAINER.appendChild(container);

    if (configuration.useSpeech) {
      Speaker.speak({
        content: this.content,
        voice: configuration.voice
      });
    }
  }
}

// class for Config
class Config {
  constructor() {
    this.position = 1;
    this.borderColor = '#000000';
    this.backgroundColor = '#FFFFFF'
    this.textColor = '#000000';
    this.textSize = 24;
    this.font = 0;
    this.useSpeech = false;
    this.voice = 0;
    this.textAlign = 'left';

    this.show = false;

    this.#setupListeners();
  }

  #overwrite(files) {
    let configData = null;
    let basicAttrs = [
      'textSize',
      'borderColor',
      'textColor',
      'backgroundColor'
    ]

    let file = files[0];
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = function(e) {
      configData = JSON.parse(reader.result)

      for (let attr in configData) {
        if (basicAttrs.includes(attr)) {
          this[attr] = configData[attr];
          this.#html(attr).value = configData[attr];
        }
      }
    }.bind(this);

    reader.onerror = function(e) {
      alert(reader.error)
    }
  }

  toggle() {
    this.show = !this.show;

    if (this.show) {
      this.#menu.style.display = 'block';
    } else {
      this.#menu.style.display = 'none';
    }
  }

  // @FIXME: Method length/a lot of logic
  #setupListeners() {
    this.#menu.querySelector('#load_button').addEventListener('change', function(e) {
      this.#overwrite(e.target.files);
    }.bind(this));

    this.#menu.querySelector('#save_button').addEventListener('click', function() {
      let temporaryAnchor = document.createElement('a');
      temporaryAnchor.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this))
      );
      temporaryAnchor.setAttribute('download', 'messageOverlay.config.json');
      temporaryAnchor.style.display = 'none';

      document.body.appendChild(temporaryAnchor);
      temporaryAnchor.click();
      document.body.removeChild(temporaryAnchor);
    }.bind(this));

    this.#menu.querySelector('.close').addEventListener('click', function() {
      this.toggle();
    }.bind(this))

    this.#html('textSize').addEventListener('change', function(e) {
      this.textSize = parseInt(e.target.value);
    }.bind(this));

    this.#html('textColor').addEventListener('change', function (e) {
      this.textColor = e.target.value;
    }.bind(this));

    this.#html('borderColor').addEventListener('change', function (e) {
      this.borderColor = e.target.value;
    }.bind(this));

    this.#html('backgroundColor').addEventListener('change', function (e) {
      this.backgroundColor = e.target.value;
    }.bind(this));

    for (let i = 0; i < this.#html('textAlign').length; i++) {
      let alignRadio = this.#html('textAlign')[i];
      alignRadio.addEventListener('change', function(e) {
        if (e.target.checked) {
          this.textAlign = e.target.value;
        }
      }.bind(this));
    }

    let useTtsRadios = this.#menu.querySelectorAll('input[name="use_tts"]');
    for (let radio of useTtsRadios) {
      radio.addEventListener('change', function(e) {
        this.useSpeech = e.target.value === 'true';

        if (this.useSpeech) {
          for (let voice of this.#voices) {
            voice.disabled = false;
          }
        } else {
          for (let voice of this.#voices) {
            voice.disabled = true;
          }
        }
      }.bind(this));
    }

    for (let voice of this.#voices) {
      voice.addEventListener('change', function(e) {
        let voiceId = parseInt(e.target.value);
        Speaker.test(voiceId);
        this.voice = voiceId;
      }.bind(this));
    }

    let positionRadios = this.#menu.querySelectorAll('input[name="message_order"]')
    for (let position of positionRadios) {
      position.addEventListener('change', function(e) {
        if (e.target.checked) {
          this.position = parseInt(e.target.value);
        }
      }.bind(this));
    }
  }

  get #menu() {
    return document.querySelector('#menu');
  }

  get #voices() {
    return this.#menu.querySelectorAll('input[name="voice"]')
  }

  #html(input) {
    return {
      'textSize':        this.#menu.querySelector('input[name="text_size"]'),
      'borderColor':     this.#menu.querySelector('input[name="border_color"]'),
      'textColor':       this.#menu.querySelector('input[name="text_color"]'),
      'backgroundColor': this.#menu.querySelector('input[name="background_color"]'),

      'messageOrder':    this.#menu.querySelectorAll('input[name="message_order"]'),
      'useTts':          this.#menu.querySelectorAll('input[name="use_tts"]'),
      'voice':           this.#voices,
      'textAlign':       this.#menu.querySelectorAll('input[name="text_align"]')
    }[input];
  }
}

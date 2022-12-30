// fixme: refactor this into 1 method... they do the same
class Speaker {
  // https://devhints.io/js-speech
  static speak({ content, voice }) {
    let msg = new SpeechSynthesisUtterance(content);
    let voices = window.speechSynthesis.getVoices();
    debugger
    msg.voice = voices[voice];
    window.speechSynthesis.speak(msg);
  }

  static test(id) {
    let msg = new SpeechSynthesisUtterance('This is a test message.');
    let voices = window.speechSynthesis.getVoices();
    msg.voice = voices[id];
    window.speechSynthesis.speak(msg);
  }
}

// class for TTS
class Speaker {
  // https://devhints.io/js-speech
  static speak({ content, voice }) {
    let msg = new SpeechSynthesisUtterance(content);
    let voices = window.speechSynthesis.getVoices();
    msg.voice = voices[voice];
    window.speechSynthesis.speak(msg);
  }

  // FIXME: These methods do the same, pretty much. This is refactorable
  static test(id) {
    let msg = new SpeechSynthesisUtterance('This is a test message.');
    let voices = window.speechSynthesis.getVoices();
    msg.voice = voices[id];
    window.speechSynthesis.speak(msg);
  }
}

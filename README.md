# SMO

![via https://huggingface.co/spaces/DGSpitzer/DGS-Diffusion-Space](/image.png)

A _streamer message overlay_. Right now, it operates as a webpage.

In the future, I think I'll make this a desktop app with different themes, but we'll see.

### Getting Started

#### Online

- Go [here](https://atkascha.gg/smo)
- Type your messages in the prompt and see them appear
- Click anywhere else on the page and hit "c" to bring up the config
- Click "Save" to download your configuration
- Upload a configuration file (.json) to use a style you like

#### Using locally

- Go [here](https://github.com/atkascha/smo/releases)
- Download the latest release
- Unzip the contents and go to the folder
- Open `index.html`
- Type your messages in the prompt and see them appear
- Click anywhere else on the page and hit "c" to bring up the config
- Click "Save" to download your configuration
- Upload a configuration file (.json) to use a style you like

#### Then, for either

- In your streaming software, add a new Window Capture source
- Use a Chroma Key to remove green

And that's it.

_I'll add an example video of this in the not too distant future_

#### Configuration options

- text size
- text color
- border color
- background color
- left or right aligned
- message presentation order (newest on top or newest on bottom)

#### In addition to messaging, there's TTS

There is an option to have your messages spoken. By default, its off. If its something people like, I can add more standard voices.

#### FIXMEs

```js
// Message.js#render()
this.config.config

// code refactor

// TTS is a bit jank when first clicking it... need to find out why
```

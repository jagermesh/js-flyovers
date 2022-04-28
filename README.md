# Flyovers

Simple, lightweight pure JavaScript component that implement Growl style notifications.

## Demo

https://jagermesh.github.io/js-flyovers/

## Usage:

1) Include the script:

~~~
<script type="text/javascript" src="flyovers.js"></script>
~~~

2) Create Flyovers instance

~~~
const flyovers = new Flyovers();
~~~

3) Show message

~~~
flyovers.showMessage('Message 1',
  'Attempts to prove it prompted substantial development in number theory, and over time Fermat Last Theorem gained prominence as an unsolved problem in mathematics');
flyovers.showInfo('Info Permanent',
  'Attempts to prove it prompted substantial development in number theory, and over time Fermat Last Theorem gained prominence as an unsolved problem in mathematics', {
  permanent: true,
});
flyovers.showError('Error');
flyovers.showSuccess('Success');
flyovers.showWarning('Warning');
flyovers.showInfo('Info');
~~~

4) Customize if needed

~~~
flyovers.showMessage('Message 2', {
  timeout: 1000,
  beautify: function(flyoverOverlay) {
    flyoverOverlay.style.fontSize = `${Math.floor(Math.random() * 10)+8}pt`;
    flyoverOverlay.style.backgroundColor = 'red';
    flyoverOverlay.style.color = 'white';
  }
});
~~~

That's all.

Have fun. Send PR if you find any glitches or want to make improvements.

:)

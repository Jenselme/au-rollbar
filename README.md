# au-rollbar

[![npm Version](https://img.shields.io/npm/v/aurelia-piwik.svg)](https://www.npmjs.com/package/au-rollbar)
[![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aurelia/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Easy way to integrate Rollbar into Aurelia.

Install it with `npm install au-rollbar`.

You then need to import it with `import RollbarAppender from 'au-rollbar'` in your `main.js` file and configure it:

```javascript
import RollbarAppender from 'au-rollbar'
import * as Logger from 'aurelia-logging';

export function configure(aurelia) {
    aurelia.use.standardConfiguration();

    if (environment.debug) {
        // Only log to the console when developing (default configuration of developmentLogging)
        aurelia.use.developmentLogging();
    } else {
        // Production logging is inspired by developmentLogging
        // This loads the ``aurelia-logging-console`` module and then configures logging.
        aurelia.use.preTask(() => {
            return aurelia.loader.normalize(
                    'aurelia-logging-console',
                    aurelia.bootstrapperName
            ).then(name => {
                return aurelia.loader.loadModule(name).then(m => {
                    // Once the module is loaded, we configure logging.
                    // We add the ConsoleAppender so all messages are logged in the console of the browser.
                    Logger.addAppender(new m.ConsoleAppender());
                    // If the Rollbar exists in the window object (ie if Rollbar is loaded),
                    // we add the RollbarAppender so messages are sent to rollbar.
                    // If it is not, we print a warning in the browser console.
                    if (window.Rollbar) {
                        Logger.addAppender(new RollbarAppender());
                    } else {
                        console.warn('Rollbar is not defined');  // eslint-disable-line no-console
                    }
                    // Configure logger to log only messages of level warning or above.
                    Logger.setLevel(Logger.logLevel.warn);
                });
            });
        });
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot('app', document.body));
}
```

You still have to configure Rollbar as described [here](https://rollbar.com/docs/notifier/rollbar.js/). Take a look at [this blog post](https://www.jujens.eu/posts/en/2017/Aug/19/rollbar-aurelia/) to learn more.

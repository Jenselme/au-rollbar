let RollbarAppender = class RollbarAppender {
    debug(logger, ...rest) {
        let mainArgs = rest[0];
        this.getRollbar().debug(`DEBUG [${logger.id}]: ${mainArgs}`, this._formatRest(rest));
    }

    info(logger, ...rest) {
        let mainArgs = rest[0];
        this.getRollbar().info(`INFO [${logger.id}]  ${mainArgs}`, this._formatRest(rest));
    }

    warn(logger, ...rest) {
        let mainArgs = rest[0];
        this.getRollbar().warning(`WARN [${logger.id}] ${mainArgs}`, this._formatRest(rest));
    }

    error(logger, ...rest) {
        let mainArgs = rest[0];
        this.getRollbar().error(`ERROR [${logger.id}]  ${mainArgs}`, this._formatRest(rest));
    }

    _formatRest(rest) {
        try {
            return JSON.stingify({ extra: rest.slice(1) });
        } catch (e) {
            return undefined;
        }
    }

    getRollbar() {
        if (!window.Rollbar) {
            if (console.warn) {
                console.warn('Rollbar is not defined');
            }

            return {
                debug: () => {},
                info: () => {},
                warning: () => {},
                error: () => {}
            };
        }

        return window.Rollbar;
    }
};
export { RollbarAppender as default };
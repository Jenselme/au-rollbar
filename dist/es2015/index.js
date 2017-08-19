let RollbarAppender = class RollbarAppender {
    debug(logger, ...rest) {
        let mainArgs = rest[0];
        Rollbar.debug(`DEBUG [${logger.id}]: ${mainArgs}`, this._formatRest(rest));
    }

    info(logger, ...rest) {
        let mainArgs = rest[0];
        Rollbar.info(`INFO [${logger.id}]  ${mainArgs}`, this._formatRest(rest));
    }

    warn(logger, ...rest) {
        let mainArgs = rest[0];
        Rollbar.warn(`WARN [${logger.id}] ${mainArgs}`, this._formatRest(rest));
    }

    error(logger, ...rest) {
        let mainArgs = rest[0];
        Rollbar.error(`ERROR [${logger.id}]  ${mainArgs}`, this._formatRest(rest));
    }

    _formatRest(rest) {
        try {
            return JSON.stingify({ extra: rest.slice(1) });
        } catch (e) {
            return undefined;
        }
    }
};
export { RollbarAppender as default };
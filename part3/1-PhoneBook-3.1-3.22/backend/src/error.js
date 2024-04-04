class DatabaseInternalError extends Error {
    constructor(err) {
        if(err.name === 'CastError')
        {
            super('IdMalFormatted error');
            this.name = 'IdMalFormatted';
        }
        else
        {
            super(`Database internal error: ${err}`);
            this.name = 'DatabaseInternalError';
        }
        this.error = err;
    }
}

class NotFoundError extends Error {
    constructor(id) {
        super(`Not found ${id}`);
        this.name = 'NotFoundError';
    }
}

class KeyError extends Error {
    constructor(key) {
        // eslint-disable-next-line no-useless-escape
        super(`Not found \"${key}\" key`);
        this.name = 'KeyError';
    }
}

module.exports = {
    DatabaseInternalError,
    NotFoundError,
    KeyError,
};
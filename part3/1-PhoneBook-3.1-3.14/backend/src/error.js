class DatabaseInternalError extends Error {
    constructor(err) {
      if(err.name == 'CastError')
      {
        super('IdMalFormatted error');
        this.name = 'IdMalFormatted';
      }
      else
      {
        super(`Database internal error: ${err}`);
        this.name = 'DatabaseInternalError';
      }
    }
}
  
class NotFoundError extends Error {
    constructor(id) {
      super(`Not found ${id}`);
      this.name = 'NotFoundError';
    }
}

module.exports = {
    DatabaseInternalError,
    NotFoundError,
};
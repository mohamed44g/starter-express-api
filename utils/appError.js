class AppError extends Error {
    constructor() {
        super()
    }

    create(message, code) {
        this.message = message;
        this.code = code;

        return this;
    }
}

module.exports = new AppError()
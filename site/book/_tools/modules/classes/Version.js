/**
 * Minecraft development states
 *
 * @type {{RELEASE: number, BETA: number, ALPHA: number}}
 */
const DEV_STATES = { RELEASE: 1, BETA: 2, ALPHA: 3 };

/**
 * Book version class
 */
class Version {
    constructor() {
        /**
         * Version directory name
         *
         * @type {string}
         */
        this.dir = null;

        /**
         * Version name without development state prefix
         *
         * @type {string}
         */
        this.number = null;

        /**
         * Development state number.
         *
         * @see {DEV_STATES}
         *
         * @type {number}
         */
        this.dev_state = null;

        /**
         * List of APIs for this Minecraft version
         *
         * @type {[API]}
         */
        this.APIs = [];

        /**
         * Default API for this book version
         *
         * @type {API}
         */
        this.default_API = null;
    }
}
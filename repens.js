/*
 * Repens: logger for node.js 
 * v1.0.0
 * https://github.com/ramhejazi/repens
 * Copyright Ram Hejazi
 * Released under the MIT license
 */

const chalk = require('chalk');
const assign = Object.assign;
const repens = new (require('events'))();

function __slug(name, prefix) {
    return `${prefix || ''}[${chalk.bold(name)}]`
}

function __get_date() {
    return '[' + chalk.bold(new Date().toLocaleTimeString('en-UK')) + ']';
}

/* 
    Define loggers dynamically
*/
const loggers = [
    ['log'],
    ['warn', 'yellow'],
    ['info', 'cyan'],
    ['error', 'red'],
    ['success', 'green'],
].reduce((ret, type) => {
    let [method, color] = type;
    let c = color ? chalk[color] : (str) => str;
    ret[method] = function (...items) {
        let date = this.show_date ? __get_date() : '';
        return console.log(c(date + this.prefix + " " +  items.join(' ')));
    };
    return ret;
}, {});

function spawn(name) {
    return assign({}, this, {
        parent: this,
        name,
        prefix: __slug(name, this.prefix)
    });
}

repens.spawn = (name, show_date = true) => {
    return { ...loggers, spawn, name, show_date, prefix: __slug(name, this.prefix) };
};

module.exports = repens;

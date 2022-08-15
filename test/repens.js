const repens = require('../repens');
const { expect } = require('chai');
const chalk = require('chalk');

describe('repens', function () {
    it('making_instance', function () {
        let instance = repens.spawn('a_name');
        expect(instance.name).to.eql('a_name');
        expect(instance.prefix).to.eql(`[${chalk.bold('a_name')}]`);
        expect(instance.show_date).to.eql(true);
        expect(instance.log).to.be.a('function');
        expect(instance.warn).to.be.a('function');
    });

    it('making_child_logger', function () {
        let logger = repens.spawn('parent');
        let logger_no_date = repens.spawn('parent_no_date', false);
        let child = logger.spawn('child');
        let child_no_date = logger_no_date.spawn('child_no_date');
        expect(logger.name).to.eql('parent');
        expect(logger.show_date).to.eql(true);
        expect(child.name).to.eql('child');
        expect(child.show_date).to.eql(true);
        expect(child.info).to.be.a('function');

        expect(logger_no_date.show_date).to.eql(false);
        expect(child_no_date.show_date).to.eql(false);
    });

    it('logging', function () {
        let logger = repens.spawn('A', false);
        let child = logger.spawn('B');
        let descendant = child.spawn('C');
        const ol = console.log;
        console.log = (msg) => msg;

        expect(descendant.parent.parent).to.eql(logger);

        expect(logger.warn('hello')).to.eql(
            chalk.yellow(`[${chalk.bold('A')}] hello`)
        );
        expect(child.success('hello')).to.eql(
            chalk.green(`[${chalk.bold('A')}][${chalk.bold('B')}] hello`)
        );

        expect(child.log('hello')).to.eql(
            `[${chalk.bold('A')}][${chalk.bold('B')}] hello`
        );
        expect(descendant.error('an error')).to.eql(
            chalk.red(
                `[${chalk.bold('A')}][${chalk.bold('B')}][${chalk.bold(
                    'C'
                )}] an error`
            )
        );

        let logger_with_date = repens.spawn('A');
        let date = new Date().toLocaleTimeString('en-UK');
        expect(logger_with_date.log('hello', 'there', '!')).to.eql(
            `[${chalk.bold(date)}][${chalk.bold('A')}] hello there !`
        );
        console.log = ol;
    });

});

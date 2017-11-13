module.exports.testPrompt = testPrompt;


var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var inquirer = require('inquirer');
var argv = require('minimist')(process.argv.slice(2));
var progressBar = require('./projgress-bar.js');
var colors = require('colors');


function testPrompt(selection) {
    clear();
    console.log((figlet.textSync('JSCMiner', {horizontalLayout: 'full'})).red.bold);
    var questions = [
        {
            type: 'list',
            name: 'cloneType',
            message: 'Which type of clone do you want to detect?'.white.bold,
            choices: [chalk.green('Type-1'), chalk.green('Type-2'),chalk.green('Type-3')],
            default: 0
        },
        {
            type: 'list',
            name: 'granularity',
            message: 'In which granularity level do you want to detect clones?'.white.bold,
            choices: [chalk.green('file level'), chalk.green('function level'),chalk.green('block-level')],
            default: 0
        },
        {
            type: 'list',
            name: 'cloneReportType',
            message: 'In which form do you want to get the detected clones?'.white.bold,
            choices: [chalk.green('JSON'), chalk.green('XML'),chalk.green('HTML')],
            default: 0
        },
        {
            type: 'input',
            name: 'minimumTokens',
            message: 'Set minimum number of tokens: '.white.bold,
            default: argv._[0]||0,
            validate: function isInt(value) {
                if(!isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10)))
                {
                    return true;
                }else{
                    return chalk.red.bold('Please enter a valid integer number');
                }
            }
        },
        {
            type: 'input',
            name: 'maximumTokens',
            message: 'Set maximum number of tokens: '.white.bold,
            default: argv._[0]||0,
            validate: function isInt(value) {
                if(!isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10)))
                {
                    return true;
                }else{
                    return chalk.red.bold('Please enter a valid integer number');
                }
            }
        },
        {
            type: 'input',
            name: 'minimumLines',
            message: 'Set minimum number of lines: '.white.bold,
            default: argv._[0]||0,
            validate: function isInt(value) {
                if(!isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10)))
                {
                    return true;
                }else{
                    return chalk.red.bold('Please enter a valid integer number');
                }
            }
        },
        {
            type: 'input',
            name: 'maximumLines',
            message: 'Set maximum number of lines: '.white.bold,
            default: argv._[0]||0,
            validate: function isInt(value) {
                if(!isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10)))
                {
                    return true;
                }else{
                    return chalk.red.bold('Please enter a valid integer number');
                }
            }
        }

    ];

    inquirer.prompt(questions).then(function (answers) {
        var data = {
            cloneType: answers.cloneType,
            granularity:answers.granularity,
            cloneReportType:answers.cloneReportType,
            minimumTokens: answers.minimumTokens,
            maximumTokens: answers.maximumTokens,
            minimumLines: answers.minimumLines,
            maximumLines: answers.maximumLines
        };
        progressBar.startProgressBar(data.cloneType,200);

    });
}
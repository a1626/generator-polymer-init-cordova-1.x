'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exquisite ' + chalk.red('generator-polymer-init-cordova-1-x') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Project Name?',
      default: this.appname
    },{
      type: 'input',
      name: 'elementName',
      message: 'shell Name?'
    },{
      type: 'input',
      name: 'packageName',
      message: 'Cordova package?',
      store: true,
      default: 'org.apache.cordova.'+this.appname
    },{
      type: 'confirm',
      name: 'cordovaConfig',
      message: 'Would you like to configure cordova?',
      default: true
    },{
      when: (response) => {
        return response.cordovaConfig
      },
      name: 'description',
      message: "Description (This same description will be used for bower and package.json)?",
      default: 'A sample Apache Cordova application that responds to the deviceready event.'
    },{
      when: (response) => {
        return response.cordovaConfig
      },
      type: 'input',
      name: 'authors',
      message: "authors (This same description will be used for bower and package.json)?",
      default: 'Apache Cordova Team'
    },{
      when: (response) => {
        return response.cordovaConfig
      },
      type: 'input',
      name: 'authorEmail',
      message: "author\'s email (This same description will be used for bower and package.json)?",
      default: 'dev@cordova.apache.org'
    },{
      when: (response) => {
        return response.cordovaConfig
      },
      type: 'input',
      name: 'authorHref',
      message: "author\'s href (This same description will be used for bower and package.json)?",
      default: 'http://cordova.io'
    },{
      when: (response) => {
        return response.cordovaConfig
      },
      type: 'checkbox',
      name: 'platforms',
      message: "Platforms:",
      choices: [{
        name: 'android',
        checked: true
      },{
        name: 'ios',
        checked: true
      },{
        name: 'blackberry10'
      },{
        name: 'browser'
      },{
        name: 'firefoxos'
      },{
        name: 'osx'
      },{
        name: 'webos'
      }]
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};

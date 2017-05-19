'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const defaultProps = {
  'description': 'A sample Apache Cordova application that responds to the deviceready event.',
  'version': '1.0.0',
  'authors': 'Apache Cordova Team',
  'authorEmail': 'dev@cordova.apache.org',
  'authorHref': 'http://cordova.io'
};

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
      message: 'shell Name?',
      default: 'my-app'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      const newPrompts = [{
        type: 'input',
        name: 'packageName',
        message: 'Cordova package?',
        store: true,
        default: 'org.apache.cordova.'+this.props.projectName
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
        message: 'Description (This same description will be used for bower and package.json)?',
        default: 'A sample Apache Cordova application that responds to the deviceready event.'
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        name: 'version',
        message: 'version (This same description will be used for bower and package.json)?',
        default: '1.0.0'
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        type: 'input',
        name: 'authors',
        message: 'authors (This same description will be used for bower and package.json)?',
        default: 'Apache Cordova Team',
        store: true
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        type: 'input',
        name: 'authorEmail',
        message: 'author\'s email?',
        default: 'dev@cordova.apache.org',
        store: true
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        type: 'input',
        name: 'authorHref',
        message: 'author\'s href?',
        default: 'http://cordova.io',
        store: true
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        type: 'checkbox',
        name: 'platforms',
        message: 'Platforms:',
        store: true,
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
        }]
      }]

      return this.prompt(newPrompts).then(props => {
        if(!props.cordovaConfig) {
          defaultProps.packageName = props.packageName;
          props = defaultProps;
        }
        const keys = Object.keys(this.props);
        for (let i = 0; i < keys.length; i++) {
          props[keys[i]] = this.props[keys[i]];
        }
        this.props = props;
      });
    });
  }

  writing() {
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(shell.html)`,
      this.destinationPath(),
      this.props
    );
    const elementName = this.props.elementName;
    this.fs.copyTpl(
      this.templatePath('www/src/shell.html'),
      this.destinationPath(`www/src/${elementName}.html`),
      this.props
    );
  }

  install() {
    this.installDependencies({
      npm: false
    });
    for (var i = 0; i < this.props.platforms.length; i++) {
      this.spawnCommandSync('cordova', ['platform','add',this.props.platforms[i],'--save']);
    }
  }

};

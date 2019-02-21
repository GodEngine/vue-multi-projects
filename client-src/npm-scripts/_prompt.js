/**
 * 基于vue-cli的开发环境，可以动态编译指定项目
 * @Author: godengine
 */

const inquirer = require('inquirer')
const shell = require('shelljs')
const fs = require('fs')

// 获取src下的目录,防止输入错误的projectName
const dirs = fs.readdirSync('./src')

/**
 * 提示用户输入指定的开发模式（serve/build/lint）和项目名称
 * 名称必须和src下文件名一致
 */
const questions = [
  {
    name: 'mode',
    message: 'which command do you choice',
    choices: ['serve', 'build', 'lint'],
    validate: (value) => {
      return ['serve', 'build', 'lint'].indexOf(value) > -1
    }
  },
  {
    name: 'project',
    message: 'Please input the project name:',
    validate: (str) => dirs.indexOf(str) > -1
  }
]

inquirer.prompt(questions).then((answers) => {
  const { mode, project } = answers

  // 修改.env文件的配置，方便vue.config.js中的HtmlWebpackPlugin动态读取filename
  fs.writeFileSync('./.env',`VUE_APP_PROJECT=${project}`, {
    encoding: 'utf8'
  })


  // 执行对应的脚本
  const command = `npx vue-cli-service ${mode} ./src/${project}${mode === 'lint' ? '' : '/main.js'}` 
  shell.exec(command, { async: true })
})
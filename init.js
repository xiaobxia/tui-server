const proxys = require('./app/proxy/index')
const md5 = require('md5')

proxys.User.newAndSave({
  name: 'xiaobxia',
  password: md5('xiaobxia'),
  roles: ['admin']
}).then((doc) => {
  console.log(doc)
})

proxys.User.newAndSave({
  name: 'test',
  password: md5('test'),
  roles: ['test']
}).then((doc) => {
  console.log(doc)
})

proxys.Schedule.newAndSave({
  name: 'sayHello',
  describe: '发送问好邮件',
  open: 'open',
  type: 'test'
}).then((doc) => {
  console.log(doc)
})

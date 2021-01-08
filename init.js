const proxys = require('./app/proxy/index')
const md5 = require('md5')

proxys.User.newAndSave({
  name: 'fuge',
  password: md5('fuge'),
  roles: ['admin']
}).then((doc) => {
  // 添加系统渠道
  proxys.Channel.newAndSave({
    user: doc._id,
    channel_name: '自然渠道'
  }).then((doc) => {
    console.log(doc)
  })
  console.log(doc)
})

// proxys.User.newAndSave({
//   name: 'test',
//   password: md5('test'),
//   roles: ['test']
// }).then((doc) => {
//   console.log(doc)
// })

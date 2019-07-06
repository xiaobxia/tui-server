const axios = require('axios')
axios({
  method: 'get',
  url: `http://localhost:3030/tuiServer/log/initTrueName`
}).then((data) => {
  if (data.data.success) {
    console.log(data.data.data)
  } else {
    console.log(data)
  }
})

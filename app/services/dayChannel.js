const moment = require('moment')
const Proxy = require('../proxy')

const DayChannelProxy = Proxy.DayChannel
const ChannelProxy = Proxy.Channel

exports.addDayChannel = async function () {
  const channels = await ChannelProxy.find({})
  let detailList = []
  channels.map((item) => {
    detailList.push({
      channel_id: item._id,
      channel_name: item.name,
      verification_code_count: item.today_verification_code_count,
      register_count_c: item.today_register_count_c,
      click_count: item.today_click_count,
      register_count: item.today_register_count,
      download_count: item.today_download_count,
      app_count: item.today_app_count,
      unit_price: item.unit_price,
      status: item.status
    })
  })
  const day = moment().format('YYYY-MM-DD')
  const dayChannel = await DayChannelProxy.findOne({
    day: day
  })
  if (dayChannel) {
    return DayChannelProxy.update({
      day: day
    }, {
      detailList
    })
  } else {
    return DayChannelProxy.newAndSave({
      day: day,
      detailList
    })
  }
}

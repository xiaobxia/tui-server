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
      register_view_count: item.today_register_view_count,
      home_view_count: item.today_home_view_count,
      loan_view_count: item.today_loan_view_count,
      verification_code_count: item.today_verification_code_count,
      device_count: item.today_device_count,
      register_count_c: item.today_register_count_c,
      click_count: item.today_click_count,
      register_count: item.today_register_count,
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
      day: moment().format('YYYY-MM-DD')
    }, {
      detailList
    })
  } else {
    return DayChannelProxy.newAndSave({
      day: moment().format('YYYY-MM-DD'),
      detailList
    })
  }
}

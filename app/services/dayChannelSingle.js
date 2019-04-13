const moment = require('moment')
const Proxy = require('../proxy')

const DayChannelSingle = Proxy.DayChannelSingle
const ChannelProxy = Proxy.Channel

exports.addDayChannelSingle = async function () {
  const channels = await ChannelProxy.find({})
  let opList = []
  const day = moment().format('YYYY-MM-DD')
  channels.map((item) => {
    opList.push(DayChannelSingle.newAndSave({
      day: day,
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
    }))
  })
  return Promise.all(opList)
}

exports.updateDayData = async function () {
  const channels = await ChannelProxy.find({})
  let opList = []
  const day = moment().format('YYYY-MM-DD')
  channels.map(async (item) => {
    const dayChannelSingle = await DayChannelSingle.findOne({
      day: day,
      channel_id: item._id
    })
    if (dayChannelSingle) {
      opList.push(DayChannelSingle.update({
        day: day,
        channel_id: item._id
      }, {
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
      }))
    } else {
      opList.push(DayChannelSingle.newAndSave({
        day: day,
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
      }))
    }
  })
  return Promise.all(opList)
}

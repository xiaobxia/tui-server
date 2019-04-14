const moment = require('moment')
const Proxy = require('../proxy')

const DayChannelSingle = Proxy.DayChannelSingle
const ChannelProxy = Proxy.Channel

exports.getDayChannelSingles = async function (query, paging) {
  const channel = await ChannelProxy.findOne({
    user: query.user
  })
  if (!channel) {
    return { list: [], count: 0 }
  }
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: {
      day: 1
    }
  }
  let queryOption = {
    channel_id: channel._id
  }
  if (query.beginTime) {
    queryOption.day = {
      $gte: query.beginTime,
      $lt: query.endTime
    }
  }
  const fetchData = await Promise.all([
    DayChannelSingle.find(queryOption, opt),
    DayChannelSingle.count(queryOption)
  ])
  const list = fetchData[0]
  return { list, count: fetchData[1] }
}

exports.addDayChannelSingle = async function () {
  const channels = await ChannelProxy.find({})
  let opList = []
  const day = moment().format('YYYY-MM-DD')
  for (let i = 0; i < channels.length; i++) {
    const item = channels[i]
    opList.push(DayChannelSingle.newAndSave({
      day: day,
      channel_id: item._id,
      channel_name: item.channel_name,
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
  return Promise.all(opList)
}

exports.updateDayData = async function () {
  const channels = await ChannelProxy.find({})
  let opList = []
  const day = moment().format('YYYY-MM-DD')
  for (let i = 0; i < channels.length; i++) {
    const item = channels[i]
    const dayChannelSingle = await DayChannelSingle.findOne({
      day: day,
      channel_id: item._id
    })
    if (dayChannelSingle) {
      opList.push(DayChannelSingle.update({
        day: day,
        channel_id: item._id
      }, {
        channel_name: item.channel_name,
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
        channel_name: item.channel_name,
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
  }
  return Promise.all(opList)
}

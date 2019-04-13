const moment = require('moment')
const Proxy = require('../proxy')

const DayProductSingle = Proxy.DayProductSingle
const ProductProxy = Proxy.Product

exports.addDayProductSingle = async function () {
  const products = await ProductProxy.find({})
  let opList = []
  const day = moment().format('YYYY-MM-DD')
  products.map((item) => {
    opList.push(DayProductSingle.newAndSave({
      day: day,
      product_id: item._id,
      product_name: item.name,
      click_count: item.today_click_count,
      register_count: item.today_register_count,
      unit_price: item.unit_price,
      status: item.status
    }))
  })
  return Promise.all(opList)
}

exports.updateDayData = async function () {
  const products = await ProductProxy.find({})
  let opList = []
  const day = moment().format('YYYY-MM-DD')
  products.map(async (item) => {
    const dayProductSingle = await DayProductSingle.findOne({
      day: day,
      product_id: item._id
    })
    if (dayProductSingle) {
      opList.push(DayProductSingle.update({
        day: day,
        product_id: item._id
      }, {
        product_name: item.name,
        click_count: item.today_click_count,
        register_count: item.today_register_count,
        unit_price: item.unit_price,
        status: item.status
      }))
    } else {
      opList.push(DayProductSingle.newAndSave({
        day: day,
        product_id: item._id,
        product_name: item.name,
        click_count: item.today_click_count,
        register_count: item.today_register_count,
        unit_price: item.unit_price,
        status: item.status
      }))
    }
  })
  return Promise.all(opList)
}

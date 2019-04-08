const moment = require('moment')
const Proxy = require('../proxy')

const DayProductProxy = Proxy.DayProduct
const ProductProxy = Proxy.Product

exports.addDayProduct = async function () {
  const products = await ProductProxy.find({})
  let detailList = []
  products.map((item) => {
    detailList.push({
      product_id: item._id,
      product_name: item.name,
      click_count: item.today_click_count,
      register_count: item.today_register_count,
      unit_price: item.unit_price,
      status: item.status
    })
  })
  return DayProductProxy.newAndSave({
    day: moment().format('YYYY-MM-DD'),
    detailList
  })
}

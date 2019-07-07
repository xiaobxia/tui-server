const Router = require('koa-router')
const multer = require('koa-multer')
const reqlib = require('app-root-path').require
const config = reqlib('/config/index')
const controllers = require('../controllers')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

const projectName = config.project.projectName
if (!projectName) {
  console.error('projectName is required')
  process.exit()
}
const router = new Router({
  prefix: `/${projectName}`
})

/**
 * 端口测试
 */
router.get('/', async function (ctx) {
  ctx.body = 'ok'
})

/**
 * 登陆模块
 */
// 注册
router.post('/auth/register', controllers.authController.register)
// 登陆
router.post('/auth/login', controllers.authController.login)
// 检查登陆
router.get('/auth/checkLogin', controllers.authController.checkLogin)
// 退出登录
router.get('/auth/logout', controllers.authController.logout)

/**
 * 用户模块
 */
// 修改用户密码
router.post('/user/newPassword', controllers.userController.newPassword)

/**
 * 文件上传模块
 */
router.post('/upload/importNumbers', upload.single('numberFile'), controllers.uploadController.importNumbers)

/**
 * 文件下载模块
 */
router.post('/download/exportNumbers', controllers.exportController.exportNumbers)

/**
 * 定时任务模块
 */
router.post('/schedule/add', controllers.scheduleController.addSchedule)
router.get('/schedule/delete', controllers.scheduleController.deleteSchedule)
router.post('/schedule/update', controllers.scheduleController.updateSchedule)
router.post('/schedule/changeStatus', controllers.scheduleController.changeScheduleStatus)
router.get('/schedule/all', controllers.scheduleController.getSchedules)
router.get('/schedule/one', controllers.scheduleController.getSchedule)

router.get('/qiniu/getUploadToken', controllers.qiniuController.getUploadToken)

/**
 * 测试
 */
router.get('/test/testEmail', controllers.testController.testEmail)
router.get('/test/testResponse', controllers.testController.testResponse)

/**
 * 日志模块
 */
router.post('/log/addViewLog', controllers.logController.addViewLog)
router.post('/log/addUrlClickLog', controllers.logController.addUrlClickLog)

/**
 * 后台管理，用户模块
 */
router.get('/admin/getAdminUsers', controllers.userController.getAdminUsers)
router.post('/admin/addAdminUser', controllers.userController.addAdminUser)
router.post('/admin/updateAdminUser', controllers.userController.updateAdminUser)
router.post('/admin/deleteAdminUser', controllers.userController.deleteAdminUser)

/**
 * 渠道模块
 */
router.get('/channel/getChannel', controllers.channelController.getChannel)
router.get('/channel/getChannels', controllers.channelController.getChannels)
router.get('/channel/getChannelsAll', controllers.channelController.getChannelsAll)
router.post('/channel/addChannel', controllers.channelController.addChannel)
router.post('/channel/updateChannel', controllers.channelController.updateChannel)
router.post('/channel/deleteChannel', controllers.channelController.deleteChannel)
router.post('/channel/updateChannelStatus', controllers.channelController.updateChannelStatus)
router.post('/channel/updateChannelRegisterC', controllers.channelController.updateChannelRegisterC)
router.get('/channel/getChannelsTiming', controllers.channelController.getChannelsTiming)

/**
 * 产品模块
 */
router.get('/product/getProduct', controllers.productController.getProduct)
router.get('/product/getProducts', controllers.productController.getProducts)
router.get('/product/getProductsAll', controllers.productController.getProductsAll)
router.post('/product/addProduct', controllers.productController.addProduct)
router.post('/product/updateProduct', controllers.productController.updateProduct)
router.post('/product/updateProductStatus', controllers.productController.updateProductStatus)

/**
 * 用户产品模块
 */
router.get('/customer/getUserProducts', controllers.productController.getUserProducts)
router.get('/customer/getProductsNew', controllers.productController.getProductsNew)
router.get('/customer/getProductsQuick', controllers.productController.getProductsQuick)
router.get('/customer/getProductsHot', controllers.productController.getProductsHot)
router.get('/customer/getProductsBig', controllers.productController.getProductsBig)
router.get('/customer/getChannel', controllers.channelController.getChannel)
router.get('/customer/setDownload', controllers.customerController.setDownload)
router.get('/customer/setHasApp', controllers.customerController.setHasApp)

/**
 * 验证码
 */
router.get('/auth/getVerificationCodeToken', controllers.authController.getVerificationCodeToken)
router.get('/auth/sendVerificationCode', controllers.authController.sendVerificationCode)
router.post('/auth/activeByVerificationCode', controllers.authController.activeByVerificationCode)

/**
 * 白名单
 */
router.get('/log/acc', controllers.whiteUserController.addClickCount)
router.post('/log/awu', controllers.whiteUserController.addWhiteUser)
// 实名用户
router.post('/log/atu', controllers.whiteUserController.addTrueNameUser)
// 下款用户
router.post('/log/adu', controllers.whiteUserController.addDownUser)
// 回款用户
router.post('/log/abu', controllers.whiteUserController.addBackUser)
// 强制更新用户
router.post('/log/afu', controllers.whiteUserController.addForceUser)
router.get('/log/getWhiteUsersAll', controllers.whiteUserController.getWhiteUsersAll)
router.get('/log/getWhiteUsers', controllers.whiteUserController.getWhiteUsers)
router.get('/log/getWhiteUsersByStart', controllers.whiteUserController.getWhiteUsersByStart)

router.get('/log/initTrueName', controllers.whiteUserController.initTrueName)

router.get('/whiteUser/getWhiteUsers', controllers.whiteUserController.getWhiteUsers)
router.get('/whiteUser/getTodayCount', controllers.whiteUserController.getTodayCount)
router.post('/whiteUser/deleteWhiteUser', controllers.whiteUserController.deleteWhiteUser)
// 用source添加
router.get('/sp/awu', controllers.whiteUserController.addWhiteUserSp)
// 实名用户
router.get('/sp/atu', controllers.whiteUserController.addTrueNameUserSp)
// 下款用户
router.get('/sp/adu', controllers.whiteUserController.addDownUserSp)
// 回款用户
router.get('/sp/abu', controllers.whiteUserController.addBackUserSp)
// 服务端下端数据
router.get('/sp/sadu', controllers.whiteUserController.serverAddDownUserSp)
/**
 * 任务模块
 */
router.get('/schedule/addDay', controllers.scheduleController.addDay)
router.get('/schedule/addNewDay', controllers.scheduleController.addNewDay)
router.get('/schedule/updateDayData', controllers.scheduleController.updateDayData)

/**
 * 代理商部分
 */
router.get('/agent/rg', controllers.dayChannelSingleController.getDayChannelSingles)

/**
 * 客户部分
 */
router.get('/user/getCustomers', controllers.customerController.getCustomers)

module.exports = router

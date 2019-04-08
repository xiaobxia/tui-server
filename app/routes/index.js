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
router.get('/log/getViewLog', controllers.logController.getViewLog)
router.get('/log/getUrlClickLog', controllers.logController.getUrlClickLog)

/**
 * 后台管理，用户模块
 */
router.get('/admin/getAdminUsers', controllers.userController.getAdminUsers)
router.post('/admin/addAdminUser', controllers.userController.addAdminUser)
router.post('/admin/deleteAdminUser', controllers.userController.deleteAdminUser)

/**
 * 渠道模块
 */
router.get('/channel/getChannels', controllers.channelController.getChannels)
router.get('/channel/getChannelsAll', controllers.channelController.getChannelsAll)
router.post('/channel/addChannel', controllers.channelController.addChannel)
router.post('/channel/deleteChannel', controllers.channelController.deleteChannel)
router.post('/channel/updateChannelStatus', controllers.channelController.updateChannelStatus)
router.post('/channel/updateChannelRegisterC', controllers.channelController.updateChannelRegisterC)

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

/**
 * 任务模块
 */
router.get('/schedule/addDay', controllers.scheduleController.addDay)

module.exports = router

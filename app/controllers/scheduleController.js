/**
 * 添加定时任务
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.addSchedule = async function (ctx) {
  const query = ctx.request.body
  const scheduleService = ctx.services.schedule
  try {
    const data = ctx.validateData({
      name: { required: true, type: 'string' },
      describe: { required: true, type: 'string' },
      open: { required: true, type: 'string' },
      type: { required: true, type: 'string' }
    }, query)
    // 添加任务
    await scheduleService.addSchedule(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

/**
 * 删除定时任务
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.deleteSchedule = async function (ctx) {
  const query = ctx.query
  const scheduleService = ctx.services.schedule
  try {
    const data = ctx.validateData({
      name: { required: true, type: 'string' }
    }, query)
    await scheduleService.deleteSchedule(data.name)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

/**
 * 更新定时任务
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.updateSchedule = async function (ctx) {
  const query = ctx.request.body
  const scheduleService = ctx.services.schedule
  try {
    const data = ctx.validateData({
      name: { required: true, type: 'string' },
      describe: { required: false, type: 'string' },
      open: { required: false, type: 'string' },
      type: { required: false, type: 'string' }
    }, query)
    await scheduleService.updateSchedule(data.name, ctx.queryDataFilter(data, 'name'))
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

/**
 * 更新定时任务的状态
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.changeScheduleStatus = async function (ctx) {
  const query = ctx.request.body
  const scheduleService = ctx.services.schedule
  try {
    const data = ctx.validateData({
      name: { required: true, type: 'string' },
      open: { required: true, type: 'string' }
    }, query)
    await scheduleService.updateSchedule(data.name, {
      open: data.open
    })
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

/**
 * 获取定时任务
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.getSchedules = async function (ctx) {
  const tableFieldsSchedule = ctx.tableFields.schedule.resBase
  try {
    let schedules = await ctx.services.schedule.getSchedules()
    schedules = ctx.formatListFields(tableFieldsSchedule, schedules)
    ctx.body = ctx.resuccess({
      list: schedules
    })
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getSchedule = async function (ctx) {
  const query = ctx.query
  const scheduleService = ctx.services.schedule
  const tableFieldsSchedule = ctx.tableFields.schedule.resBase
  try {
    const data = ctx.validateData({
      name: { required: true, type: 'string' }
    }, query)
    let schedule = await scheduleService.getSchedule(data.name)
    schedule = ctx.formatFields(tableFieldsSchedule, schedule)
    ctx.body = ctx.resuccess(schedule)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

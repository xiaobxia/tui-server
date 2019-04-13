const schedule = require('node-schedule')
const reqlib = require('app-root-path').require
const requestLocal = reqlib('/app/util/requestLocal')
/**
 * cron风格的
 *    *    *    *    *    *
 ┬    ┬    ┬    ┬    ┬    ┬
 │    │    │    │    │    |
 │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 │    │    │    │    └───── month (1 - 12)
 │    │    │    └────────── day of month (1 - 31)
 │    │    └─────────────── hour (0 - 23)
 │    └──────────────────── minute (0 - 59)
 └───────────────────────── second (0 - 59, OPTIONAL)
 */
let rule = new schedule.RecurrenceRule()

let minute = []
for (let k = 10; k < 60; k += 10) {
  minute.push(k)
}
rule.minute = minute

function updateDayData () {
  requestLocal.get('schedule/updateDayData')
}

const job = schedule.scheduleJob(rule, updateDayData)

module.exports = job

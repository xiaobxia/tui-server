/**
 * resBase 非敏感数据，面向用户
 */
module.exports = {
  user: {
    resBase: [
      { field: '_id', alias: 'user_id' },
      { field: 'name' },
      { field: 'token' },
      { field: 'roles' }
    ]
  },
  schedule: {
    resBase: [
      { field: '_id', alias: 'schedule_id' },
      { field: 'name' },
      { field: 'describe' },
      { field: 'type' },
      { field: 'open',
        format: function (value) {
          return value === 'open'
        } }
    ]
  },
  logAudit: {
    resBase: [
      { field: '_id', alias: 'log_id' },
      { field: 'log_type' },
      { field: 'user_id' },
      { field: 'user_name' },
      { field: 'platform' }
    ]
  },
  dictionary: {
    resBase: [
      { field: '_id', alias: 'dictionary_id' },
      { field: 'key' },
      { field: 'describe' },
      { field: 'type' },
      { field: 'value' }
    ]
  }
}

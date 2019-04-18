/**
 * resBase 非敏感数据，面向用户
 */
module.exports = {
  createQueryValidateModel (fieldList) {
    let validateOption = {}
    fieldList.map((field) => {
      validateOption[field.field] = {
        type: field.type,
        required: field.required
      }
    })
    return validateOption
  },
  createQueryModel (fieldList, queryData) {
    let validateOption = {}
    fieldList.map((field) => {
      if (field.required) {
        if (field.regExp) {
          validateOption[field.field] = new RegExp(queryData[field.field], 'i')
        } else {
          validateOption[field.field] = queryData[field.field]
        }
      } else {
        if (queryData[field.field] !== undefined) {
          if (field.regExp) {
            validateOption[field.field] = new RegExp(queryData[field.field], 'i')
          } else {
            validateOption[field.field] = queryData[field.field]
          }
        }
      }
    })
    return validateOption
  },
  createUpdateValidateModel (fieldList) {
    let validateOption = {}
    fieldList.map((field) => {
      validateOption[field.field] = {
        type: field.type,
        required: false
      }
    })
    return validateOption
  },
  createUpdateModel (fieldList, updateData) {
    let data = {}
    fieldList.map((field) => {
      if (updateData[field.field] !== undefined) {
        data[field.field] = updateData[field.field]
      }
    })
    return data
  },
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
      {
        field: 'open',
        format: function (value) {
          return value === 'open'
        }
      }
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
  },
  channel: {
    update: [
      { field: 'url', type: 'string' },
      { field: 'today_register_count_c', type: 'number' },
      { field: 'unit_price', type: 'number' },
      { field: 'deduction_base', type: 'number' },
      { field: 'channel_platform', type: 'string' }
    ]
  },
  product: {
    query: [
      { field: 'name', type: 'string', required: false, regExp: true },
      { field: 'status', type: 'int', required: false },
      { field: 'is_recommend', type: 'boolean', required: false },
      { field: 'is_activity', type: 'boolean', required: false }
    ],
    update: [
      { field: 'name', type: 'string' },
      { field: 'url', type: 'string' },
      { field: 'icon_url', type: 'string' },
      { field: 'min_quota', type: 'number' },
      { field: 'max_quota', type: 'number' },
      { field: 'min_term', type: 'number' },
      { field: 'max_term', type: 'number' },
      { field: 'daily_rate', type: 'number' },
      { field: 'lending_time', type: 'number' },
      { field: 'zhi_ma', type: 'number' },
      { field: 'success_rate', type: 'number' },
      { field: 'unit_price', type: 'number' },
      { field: 'status', type: 'number' },
      { field: 'term_unit', type: 'string' },
      { field: 'lending_time_unit', type: 'string' },
      { field: 'is_recommend', type: 'boolean' },
      { field: 'is_activity', type: 'boolean' },
      { field: 'today_register_count', type: 'number' },
      { field: 'history_register_count', type: 'number' },
      { field: 'sortIndex', type: 'number' },
      { field: 'introduction', type: 'string' }
    ]
  },
  customer: {
    resBase: [
      { field: '_id' },
      { field: 'status' },
      { field: 'source_channel_id' },
      { field: 'verification_code' },
      { field: 'mobile' },
      { field: 'click_count' },
      { field: 'brisk_count' },
      { field: 'view_count' },
      { field: 'last_brisk_day' },
      { field: 'has_app' },
      { field: 'has_download' },
      { field: 'create_at' }
    ]
  }
}

const constant = {
  'REQ_DIFF': 500, // 频繁请求时间差
  'REQUEST': '__REQUEST_START',
  'REJECT': '__REQUEST_REJECT',
  'RESULT': '__REQUEST_RESUT',
  'UNREQUEST': '__REQUEST_UN',
  'user': {
    'LOGIN': '__USER__LOGIN',
    'LOGOUT': '__USER__LOGOUT',
    'TOKEN': '__USER__FIELD__TOKEN',
    'ROLE': '__USER__FIELD__ROLE',
    'UPDATE_PSW': '__USER_UPDATE_PSW',
    'SUBBORDINATES': '__USER_SUBBORDINATES',
    'BASE_INFO': '__USER_BASE_INFO'
  },
  'role': {
    'ALL': '__ROLE__ALL',
    'UPDATE': '__ROLE__UPDATE',
    'INSERT': '__ROLE__INSERT',
    'DELETE': '__ROLE__DELETE'
  }
}

export default constant

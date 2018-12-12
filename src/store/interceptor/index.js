import constant from '@/constant'
// import _ from 'lodash'

const {REQUEST, REJECT, RESULT} = constant

// 拦截action请求开始，失败，成功自动发送相关的指令
function actionInterceptor (actions) {
  let iActions = {}

  Object.keys(actions).forEach(key => {
    let dictate = actions[key].prototype.async_reg_commit
    let native = true || actions[key].prototype.__native

    if (dictate) {
      iActions[key] = function (context, ...args) {
        let that = this
        context.commit(`${dictate}_${REQUEST}`)
        actions[key].call(that, context, ...args)
        .then(resolve => {
          context.commit(`${dictate}_${RESULT}`)
        })
        .catch(reject => {
          context.commit(`${dictate}_${REJECT}`)
        })
      }
    } else if (!native) {
    } else {
      iActions[key] = actions[key]
    }
  })
  return iActions
}

function replateJSONAttr (attr) {
  let Fn = Function

  return new Fn('state', 'val', `return state.${attr}=val`)
}

// 包装mutation自动为其添加响应状态
function mutationPacking (muts) {
  let _muts = {}

  Object.keys(muts).forEach(key => {
    const bindAttr = muts[key].prototype.bindAttr

    _muts[key] = muts[key]

    if (bindAttr) {
      const repFn = replateJSONAttr(bindAttr)

      _muts[`${key}_${REQUEST}`] = function (state) {
        repFn(state, REQUEST)
      }
      _muts[`${key}_${RESULT}`] = function (state) {
        repFn(state, RESULT)
      }
      _muts[`${key}_${REJECT}`] = function (state) {
        repFn(state, REJECT)
      }
    }
  })

  return _muts
}

export {actionInterceptor, mutationPacking}

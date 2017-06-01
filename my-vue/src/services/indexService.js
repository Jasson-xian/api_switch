import xhr from './xhr/'
/**
 * 对应后端涉及到用户认证的 API
 */
class IndexService {

  getAttackInfo() {
    return xhr({ url: '/main/attack_info.php'})
  }

  getAttackCount() {
    return xhr({ url: '/main/attack_count.php'})
  }

  setBlock(mac,block) {
    return xhr({
      url: '/main/set_block.php',
      method: 'POST',
      body:{mac:mac,oper:block}
    })
  }

  getEthState() {
    return xhr({ url: '/main/eths_state.php' })
  }

  getNetState() {
    return xhr({ url: '/main/net_state.php' })
  }

  getSysState() {
    return xhr({ url: '/main/sys_state.php'})
  }

  getEventLog() {
    return xhr({ url: '/log/event.php?count=8'})
  }
  getState(){
    return xhr({url: '/main/state.php'})
  }
}
// 实例化后再导出
export default new IndexService()
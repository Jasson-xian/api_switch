import xhr from './xhr/'
//console.log(process.env.NODE_ENV)
/**
 * 对应后端涉及到用户认证的 API
 */
class NetService {

  getGlobal() {
    return xhr({ url: '/net_conf/global.php'})
  }
  
	setGlobal(gconfig) {
		return xhr({ 
    	url: '/net_conf/global.php',
    	method: 'POST',
    	body: {
        pppoe_switch:gconfig.pppoe_switch,
        dhcp_switch:gconfig.dhcp_switch,
        dnsABCD:gconfig.dnsABCD,
        dnsABCD2:gconfig.dnsABCD2,
        rip_access:gconfig.rip_access,
        wip_response:gconfig.wip_response,
        host_status_switch:gconfig.host_status_switch,
        ai:gconfig.ai,
        rtime:gconfig.rtime,
        alter_name:gconfig.alter_name,
        alter_virtual_host:gconfig.alter_virtual_host,
        mgr_address:gconfig.mgr_address,
        dhcp_time:gconfig.dhcp_time
      }
    })
	}
  
  getAllnet() {
    return xhr({ url: '/net_conf/net.php'})
  }

  setAllnet(netconfig) {
    return xhr({ 
    	url: '/net_conf/net.php',
    	method: 'POST',
    	body: { 
        type:netconfig.type,
        abcd:netconfig.abcd,
        mask:netconfig.mask,
        vlanid:netconfig.vlanid,
        groupid:netconfig.groupid,
        hash_code:netconfig.hash_code
       }
    })
  }

  rmAllnet(netconfig){
    return xhr({ 
    	url: '/net_conf/net.php',
    	method: 'POST',
    	body: { 
        type:netconfig.type,
        hash_code:netconfig.hash_code
       }
    })
  }

  setWip(wipconfig) {
    return xhr({ 
    	url: '/net_conf/net.php',
    	method: 'POST',
    	body: { 
        type:wipconfig.type,
        abcd:wipconfig.abcd,
        mask:wipconfig.mask,
        gateway:wipconfig.gateway,
        vlanid:wipconfig.vlanid,
        groupid:wipconfig.groupid,
        hash_code:wipconfig.hash_code
       }
    })
  }

  setVhost(vhost){
    return xhr({ 
    	url: '/net_conf/net.php',
    	method: 'POST',
    	body: { 
        type:vhost.type,
        linux_num:vhost.linux_num,
        linux_port:vhost.linux_port,
        windows_num:vhost.windows_num,
        windows_port:vhost.windows_port,
        server_num:vhost.server_num,
        server_port:vhost.server_port,
        virtual_port_percent:vhost.virtual_port_percent,
        virtual_mac:vhost.virtual_mac,
        hash_code:vhost.hash_code
       }
    })
  }

  bindIp(ipconf){
    return xhr({ 
    	url: '/net_conf/bind_ip.php',
    	method: 'POST',
    	body: { 
        oper:ipconf.oper,
        abcd:ipconf.abcd,
        mac:ipconf.mac,
        id:ipconf.id,
        ids:ipconf.ids
       }
    })
  }
  
  bindRoute(ipconf){
    return xhr({ 
    	url: '/net_conf/bind_router.php',
    	method: 'POST',
    	body: { 
        oper:ipconf.oper,
        abcd:ipconf.abcd,
        gateway:ipconf.gateway,
        id:ipconf.id,
        ids:ipconf.ids
       }
    })
  }

  doTrunk(ipconf){
    return xhr({ 
    	url: '/net_conf/pass_through.php',
    	method: 'POST',
    	body: { 
        oper:ipconf.oper,
        abcd:ipconf.abcd,
        mac:ipconf.mac,
        id:ipconf.id,
        ids:ipconf.ids
       }
    })
  }

  getProtocolpass(){
    return xhr({ 
    	url: '/net_conf/protocol_pass.php'
    })
  }
  
  setProtocolpass(conf){
    return xhr({ 
    	url: '/net_conf/protocol_pass.php',
    	method: 'POST',
    	body: { 
        stp_switch:conf.stp_switch,
        cr_switch:conf.cr_switch,
        host_status_syn_switch:conf.host_status_syn_switch,
        host_status_syn_ip:conf.host_status_syn_ip
       }
    })
  }

  getMask(){
    return xhr({ 
    	url: '/net_conf/server_mask.php'
    })
  }

  setMask(mask){
    return xhr({ 
    	url: '/net_conf/server_mask.php',
    	method: 'POST',
    	body: { 
        oper:mask.oper,
        name:mask.name,
        rip:mask.rip,
        vip:mask.vip,
        ids:mask.ids,
        id:mask.id,
        vlanid:mask.vlanid,
        groupid:mask.groupid
       }
    })
  }

  getTrap(){
    return xhr({ 
    	url: '/net_conf/server_trap.php'
    })
  }

  setTrap(trap){
    return xhr({ 
    	url: '/net_conf/server_trap.php',
    	method: 'POST',
    	body: { 
        oper:trap.oper,
        name:trap.name,
        target_ip:trap.target_ip,
        target_port:trap.target_port,
        source_ip:trap.source_ip,
        source_port:trap.source_port,
        groupid:trap.groupid,
        vlanid:trap.vlanid,
        ids:trap.ids,
        id:trap.id
       }
    })
  }

}

// 实例化后再导出
export default new NetService()
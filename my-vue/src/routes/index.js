const routes = [
	{
		path: '/',
		component: resolve => require(['components/Context/'], resolve),
		children:[
			{
				path: '/',
				component:resolve => require(['components/Context/HomePage/'], resolve)
			},
			{
				path: 'home',
				component:resolve => require(['components/Context/HomePage/'], resolve)
			},
			{
				path: 'current',
				component: resolve => require(['components/Context/Current/'], resolve),
				children:[
					{
						path: '/',
						component: resolve => require(['components/Context/Current/Content/equipment'], resolve)
					},
					{
						path: 'equipment',
						component:resolve => require(['components/Context/Current/Content/equipment'], resolve)
					},
					{
						path: 'port',
						component:resolve => require(['components/Context/Current/Content/port'], resolve)
					},
					{
						path: 'userMonitor',
						component:resolve => require(['components/Context/Current/Content/userMonitor'], resolve)
					},
					{
						path: 'onlineNode',
						component:resolve => require(['components/Context/Current/Content/onlineNode'], resolve)	
					},
					{
						path: 'whiteList',
						component:resolve => require(['components/Context/Current/Content/whiteList'], resolve)	
					},
					{
						path: 'blacklist',
						component:resolve => require(['components/Context/Current/Content/blacklist'], resolve)	
					}
				]
			},
			{
				path: 'system',
				component: resolve => require(['components/Context/SystemSet/'], resolve),
				children:[
					{
						path: '/',
						component:resolve => require(['components/Context/SystemSet/Content/update'], resolve)
					},		
					{
						path: 'update',
						component:resolve => require(['components/Context/SystemSet/Content/update'], resolve)
					},
					{
						path: 'backups',
						component:resolve => require(['components/Context/SystemSet/Content/backups'], resolve)
					},
					{
						path: 'shutdown',
						component:resolve => require(['components/Context/SystemSet/Content/shutdown'], resolve)
					},
					{
                        path: 'syspolt',
						component:resolve => require(['components/Context/SystemSet/Content/syspolt'], resolve)
					},
					{
                        path: 'diagnose',
						component:resolve => require(['components/Context/SystemSet/Content/diagnose'], resolve)
					},
					{
                        path: 'sysmanagement',
						component:resolve => require(['components/Context/SystemSet/Content/sysmanagement'], resolve)
					},
					{
						path: 'admin',
						component:resolve => require(['components/Context/SystemSet/Content/admin'], resolve)	
					},
					{
						path: 'datatime',
						component:resolve => require(['components/Context/SystemSet/Content/datatime'], resolve)	
					},
					{
						path: 'info',
						component:resolve => require(['components/Context/SystemSet/Content/info'], resolve)	
					},
					{
						path: 'softbypass',
						component:resolve => require(['components/Context/SystemSet/Content/softbypass'], resolve)	
					}
				]
			},
			{
				path: 'netManage',
				component: resolve => require(['components/Context/NetManage/'], resolve),
				children: [
					{
						path: '/',
						component:resolve => require(['components/Context/NetManage/Content/globalconf'], resolve)
					},		
					{
						path: 'globalconf',
						component:resolve => require(['components/Context/NetManage/Content/globalconf'], resolve)
					},
					{
						path: 'ripconf',
						component:resolve => require(['components/Context/NetManage/Content/ripconf'], resolve)
					},
					{
						path: 'vipconf',
						component:resolve => require(['components/Context/NetManage/Content/vipconf'], resolve)	
					},
					{
						path: 'wipconf',
						component:resolve => require(['components/Context/NetManage/Content/wipconf'], resolve)	
					},
					{
						path: 'vnetconf',
						component:resolve => require(['components/Context/NetManage/Content/vnetconf'], resolve)	
					},
					{
						path: 'vresconf',
						component:resolve => require(['components/Context/NetManage/Content/vresconf'], resolve)	
					},
					{
						path: 'staticaddr',
						component:resolve => require(['components/Context/NetManage/Content/staticaddr'], resolve)
					},
					{
						path: 'staticroute',
						component:resolve => require(['components/Context/NetManage/Content/staticroute'], resolve)	
					},
					{
						path: 'trunk',
						component:resolve => require(['components/Context/NetManage/Content/trunk'], resolve)	
					},
					{
						path: 'agreement',
						component:resolve => require(['components/Context/NetManage/Content/agreement'], resolve)	
					},
					{
						path: 'holomask',
						component:resolve => require(['components/Context/NetManage/Content/holomask'], resolve)	
					},
					{
						path: 'trapnode',
						component:resolve => require(['components/Context/NetManage/Content/trapnode'], resolve)	
					}
				]
			},
			{
				path: 'defend',
				component: resolve => require(['components/Context/Defend/'], resolve),
				children: [
					{
						path: '/',
						component:resolve => require(['components/Context/Defend/Content/safeplot'], resolve)
					},
					{
						path: 'safeplot',
						component:resolve => require(['components/Context/Defend/Content/safeplot'], resolve)
					},		
					{
						path: 'blacklist',
						component:resolve => require(['components/Context/Defend/Content/blacklist'], resolve)
					},
					{
						path: 'hostcomputer',
						component:resolve => require(['components/Context/Defend/Content/hostcomputer'], resolve)
					},
					{
						path: 'selfset',
						component:resolve => require(['components/Context/Defend/Content/selfset'], resolve)
					},
					{
						path: 'whitelist',
						component:resolve => require(['components/Context/Defend/Content/whitelist'], resolve)	
					}
				]
			},
			{
				path: 'logManage',
				component: resolve => require(['components/Context/LogManage/'], resolve),
				children: [
					{
						path: '/',
						component:resolve => require(['components/Context/LogManage/Content/permeatelog'], resolve)
					},
					{
						path: 'log',
						component:resolve => require(['components/Context/LogManage/Content/permeatelog'], resolve)
					},		
					{
						path: 'statistic',
						component:resolve => require(['components/Context/LogManage/Content/statistic'], resolve)
					},
					{
						path: 'terminallog',
						component:resolve => require(['components/Context/LogManage/Content/terminallog'], resolve)
					},
					{
						path: 'deblocklog',
						component:resolve => require(['components/Context/LogManage/Content/deblocklog'], resolve)
					},
					{
						path: 'eventlog',
						component:resolve => require(['components/Context/LogManage/Content/eventlog'], resolve)	
					},
					{
						path: 'orderlog',
						component:resolve => require(['components/Context/LogManage/Content/orderlog'], resolve)	
					},
					{
						path: 'serverlog',
						component:resolve => require(['components/Context/LogManage/Content/serverlog'], resolve)	
					}
				]
			}
		]
	},
	{
		path: '/login',
		component: resolve => require(['components/Login/'],resolve)
	},
	{
		path: '/error',
		component: resolve => require(['components/Error/'],resolve)
	}
]


export default routes
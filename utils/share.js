let providerList = []
uni.getProvider({
	service: 'share',
	success: (e) => {
		const data = []
		for (let i = 0; i < e.provider.length; i++) {
			switch (e.provider[i]) {
				case 'weixin':
					data.push({
						id: 'weixin',
						name: '分享到微信好友',
						scene: 'WXSceneSession',
						sort: 0
					})
					// data.push({
					//   id: 'weixin',
					//   name: '分享到微信朋友圈',
					//   scene: 'WXSenceTimeline',
					//   sort: 1
					// })
					break
				case 'sinaweibo':
					data.push({
						id: 'sinaweibo',
						name: '分享到新浪微博',
						sort: 2
					})
					break
				case 'qq':
					data.push({
						id: 'qq',
						name: '分享到QQ',
						sort: 3
					})
					break
				default:
					break
			}
		}
		providerList = data.sort((x, y) => {
			return x.sort - y.sort
		})
	},
	fail: (e) => {
		uni.showModal({
			content: '获取分享通道失败',
			showCancel: false
		})
	}
})
export function share(item) {
	const shareParam = {
		provider: item.id,
		type: item.type || 0, // 分享类型。默认图文 0
		scene: item.scene,
		href: item.href,
		imageUrl: item.imageUrl || '/static/logo.jpg',
		title: item.title || '分享标题',
		summary: item.content || '分享内容',
		success: function(res) {
			console.log("success:" + JSON.stringify(res))
		},
		fail: function(res) {
			console.log("fail:" + JSON.stringify(res))
		}
	}
	uni.share(shareParam)
}
export function openShare(shareObj) {
	if (providerList && providerList.length > 0) {
		const itemList = providerList.map((item) => {
			return item.name
		})
		uni.showActionSheet({
			itemList: itemList,
			success: function(res) {
				const shareOption = providerList[res.tapIndex]
				shareObj.id = shareOption.id
				shareObj.scene = shareOption.scene
				share(shareObj)
			}
		})
	}
}

export function weixinShare(shareObj) {
	const shareOPtions = {
		provider: 'weixin',
		type: 5, // 微信小程序
		scene: 'WXSceneSession',
		title: shareObj.title,
		summary: shareObj.content,
		imageUrl: shareObj.imageUrl || '/static/xcx.png',
		success: shareObj.success,
		fail: shareObj.fail,
		complete: shareObj.complete
	}
	shareOPtions.miniProgram = {
		id: 'gh_5845a78c0df2', // 个人：gh_27dcdfd334f7 公司：gh_b444d30bbdf9
		path: shareObj.href,
		webUrl: 'https://ins.elimen.com.cn/',
		type: 2 // 可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0
	}
	uni.share(shareOPtions)
}
export default {
	weixinShare,
	share
}

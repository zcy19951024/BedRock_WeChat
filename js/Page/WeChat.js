window.WeChat={};
(function($, a) {
	$.extend(true, a, {
		init: function() {
			this.initConfig();
		},
		initConfig: function() {
			//this.currentWebview = plus.webview.currentWebview();
			this.APIServer='http://localhost/Bedrock_WeCath_WeiXin/api/';//api接口ip地址
			this.HomeStartLoad=this.APIServer+'Index/GetSel?jobnumber=';//首页一开始就加载
			this.EntryStartLoad=this.APIServer+'Entry/GetIndex?id=';//员工入职一开始就加载
			this.EntrySubmit=this.APIServer+'Entry/PostEntry';//员工提交入职信息
			this.EntryResuleSubmit=this.APIServer+'Entry/PostResuleEntry?jobnumber=';//hr退回后员工重新入职信息
			this.HRApproveStartLoad=this.APIServer+'Entry/GetHrApprovel?id=';//入职审核页面一开始就加载
			this.HRApproveSubmitYes=this.APIServer+'Entry/PostHrEntry?jobnumber=';//入职审核页面管理员确认
			this.HRApproveSubmitNo=this.APIServer+'Entry/PostHrRetrun?jobnumber=';//入职审核页面管理员退回			
			this.AccountStartLoad=this.APIServer+'Account/GetAccountIndex?jobnumber=';//账户申请页面一开始就加载
			this.AccountSubmit=this.APIServer+'Account/PostAccount?jobnumber=';//员工账户申请提交
			this.AccountSubmitResult=this.APIServer+'Account/PostAccountRetrun?jobnumber=';//AD管理员退回后员工账户申请重新提交
			this.ADApproveStartLoad=this.APIServer+'Account/GetAccountApproval?jobnumber=';//账户申请审核页面一开始就加载
			this.ADApproveSubmitYes=this.APIServer+'Account/PostADApproval?jobnumber=';//账户申请审核页面管理员确认
			this.ADApproveSubmitNo=this.APIServer+'Account/PostADRetrun?jobnumber=';//账户申请审核页面管理员退回
		},
		/*initLoginStatus: function() {
			var loginInfoStr = plus.storage.getItem('LoginStatus');
			if (!loginInfoStr) {
				return null;
			} else {
				var loginInfo = JSON.parse(loginInfoStr);
				return loginInfo;
			}
		},
		setStatus_White: function() {
			plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackOpaque');
		},
		setStatus_Black: function() {
			plus.navigator.setStatusBarStyle('UIStatusBarStyleDefault');
		},
		toast: function(msg) {
			plus.nativeUI.toast(msg, {
				verticalAlign: 'center'
			});
		},
		openWindow: function(url, id, extras) {
			$.openWindow({
				url: url,
				id: id,
				extras: extras,
				show: {
					autoShow: true, //页面loaded事件发生后自动显示，默认为true,
					aniShow: 'slide-in-right',
					duration: 300 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				},
				waiting: {
					autoShow: false
				}
			});
		},
		ajax: function(url, successCallback, errorCallback, method, dataParams) {
			var ajaxParams = {
				dataType: 'json', //服务器返回json格式数据
				type: method, //HTTP请求类型
				contentType: 'application/json; charset=utf-8',
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					//服务器返回响应，根据响应结果，分析是否获取成功；
					successCallback(data);
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					errorCallback(xhr, type, errorThrown);
				}
			};
			if (dataParams) {
				ajaxParams.data = dataParams;
			}
			$.ajax(url, ajaxParams);
		},
		get: function(url, successCallback, errorCallback, dataParams) {
			this.ajax(url, successCallback, errorCallback, 'GET', dataParams);
		},
		post: function(url, successCallback, errorCallback, dataParams) {
			this.ajax(url, successCallback, errorCallback, 'POST', dataParams);
		},
		showPage: function(tag) {
			tag.classList.remove('page-hidden');
		},
		hidePage: function(tag) {
			tag.classList.add('page-hidden');
		},
		setPullToRefresh: function(ws, callback) {
			ws.setPullToRefresh({
				support: true,
				height: "50px",
				range: "200px",
				contentdown: {
					caption: "下拉可以刷新"
				},
				contentover: {
					caption: "释放立即刷新"
				},
				contentrefresh: {
					caption: "正在刷新..."
				}
			}, function() {
				callback();
			});
		},
		updateMyinfo: function() {
			var myWV = plus.webview.getWebviewById('pages/my/main.html');
			$.fire(myWV, 'checkpage', {});
		},
		updateRoomList: function() {
			var myWV = plus.webview.getWebviewById('pages/findroom/main.html');
			$.fire(myWV, 'reload', {});
		},
		updateActivity: function() {
			var wv = plus.webview.getWebviewById('neighbour_content');
			if (wv) {
				wv.evalJS('Neighbour.reloadActivitiesData();');
			}
		},
		getsurplusDay: function(depdate) {
			if (depdate == '') {
				return '已到期';
			}
			var depDate = new Date(depdate);
			var nowDate = new Date();
			if (depDate <= nowDate) {
				return '已到期';
			}
			var surplusDay = parseInt((depDate.getTime() - nowDate.getTime()) / 1000 / 60 / 60 / 24) + '天';
			return surplusDay;
		},
		updateHomePage: function() {
			var roomcardWV = plus.webview.getWebviewById('pages/roomcard/main.html');
			if (roomcardWV) {
				mui.fire(roomcardWV, 'checkpage', {});
			}
		},
		updateFindRoom: function() {
			var wv = plus.webview.getWebviewById('pages/findroom/main.html');
			if (wv) {
				mui.fire(wv, 'reload', {});
			}
		},
		updateFavoriteList: function() {
			var wv = plus.webview.getWebviewById('favorite_content');
			if (wv) {
				mui.fire(wv, 'reload', {});
			}
		},
		updateFilterRoom: function() {
			var wv = plus.webview.getWebviewById('filteroom_content');
			if (wv) {
				mui.fire(wv, 'reload', {});
			}
		},
		updateUserInfoPage: function() {
			var wv = plus.webview.getWebviewById('userinfo_content');
			if (wv) {
				mui.fire(wv, 'reload', {});
			}
		},
		getCurrentDateStr: function() {
			var currentDate = new Date();
			var hours = '';
			var min = '';
			if (currentDate.getHours() < 10) {
				hours = '0' + currentDate.getHours().toString();
			} else {
				hours = currentDate.getHours().toString();
			}
			if (currentDate.getMinutes() < 10) {
				min = '0' + currentDate.getMinutes().toString();
			} else {
				min = currentDate.getMinutes().toString();
			}
			var dateStr = hours + ":" + min;
			return dateStr;
		},
		getQueryString: function(str,name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = str.match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		}
	*/
	});
})(mui, WeChat);

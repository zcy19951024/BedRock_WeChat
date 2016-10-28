mui.init();
mui.ready(function() {
	(function($) {
		WeChat.init();
		var iid = location.search;
		var id = iid.replace("?id=", "")
		if(id != "") {
			//var surl = "http://192.168.0.191/BedrockAPI/api/Index/GetSel?jobnumber=" + id;
			mui.getJSON(WeChat.HomeStartLoad + id, "", function(data) {
				mui.each(data, function(index, item) {
					document.getElementById("ADstatus").value = item.AccountStatus;
					document.getElementById("hrstatus").value = item.Status;
					document.getElementById("AD").value = item.AD;
				});
				var ADstate = document.getElementById("ADstatus").value;
				var hrstate = document.getElementById("hrstatus").value;
				if(hrstate == "HR已审核" && ADstate == "" || ADstate == "AD待审核") {
					document.getElementById("oneblank").style.display = "block";
					document.getElementById("oneblank").style.marginLeft = "45%";
					document.getElementById("twowhite").style.display = "block";
					document.getElementById("twowhite").style.marginLeft = "45%";
				} else if(ADstate == "AD已审核" && hrstate == "HR已审核") {
					document.getElementById("oneblank").style.display = "block";
					document.getElementById("oneblank").style.marginLeft = "45%";
					document.getElementById("twoblank").style.display = "block";
					document.getElementById("twoblank").style.marginLeft = "45%";
				} else {
					document.getElementById("onewhite").style.display = "block";
					document.getElementById("onewhite").style.marginLeft = "45%";
					document.getElementById("twowhite").style.display = "block";
					document.getElementById("twowhite").style.marginLeft = "45%";
				}
			});
		} else {
			document.getElementById("onewhite").style.display = "block";
			document.getElementById("onewhite").style.marginLeft = "45%";
			document.getElementById("twowhite").style.display = "block";
			document.getElementById("twowhite").style.marginLeft = "45%";
		}
	})(mui);
});

//入职
function entry() {
	var UrlId = location.search; //获取entry.js Url传过来的ID	
	var Ids = UrlId.replace("?id=", ""); //将ID存入隐藏文本框	
	var hieId = document.getElementById("inphidden").value = Ids; //获取隐藏文本框的ID
	if(hieId == "") {
		mui.openWindow({
			url: 'Pages/EmployeeInfo/entry.html',
		})
	} else {
		mui.openWindow({
			url: 'Pages/EmployeeInfo/entry.html?id=' + hieId,
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				//aniShow: animationType, //页面显示动画，默认为”slide-in-right“；
				//duration: animationTime //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			}
		})
	}
}

//账户申请
function account() {
	var UrlId = location.search; //获取entry.js Url传过来的ID	
	var Ids = UrlId.replace("?id=", ""); //将ID存入隐藏文本框	
	var hieId = document.getElementById("inphidden").value = Ids; //获取隐藏文本框的ID
	var sate = document.getElementById("hrstatus").value;
	if(hieId == "" || sate == "待审核") {
		mui.toast("请先完成入职");
	} else if(sate != "HR已审核") {
		mui.toast("请先完成入职");
	} else {
		mui.openWindow({
			url: 'Pages/EmployeeInfo/account.html?id=' + hieId,
			show: {
				autoShow: false, //页面loaded事件发生后自动显示，默认为true
				//aniShow: animationType, //页面显示动画，默认为”slide-in-right“；
				//duration: animationTime //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			}
		});
	}
}
//学习计划
function course() {
	var jobId = location.search; //获取entry.js Url传过来的ID	
	var jobIds = jobId.replace("?id=", ""); //将ID存入隐藏文本框	
	var Onejobnumber = document.getElementById("inpjobnumber").value = jobIds; //获取隐藏文本框的ID	
	var satehr = document.getElementById("hrstatus").value;
	var sateAD = document.getElementById("ADstatus").value;
	if(Onejobnumber == "" || satehr != "HR已审核") {
		mui.toast("请先完成入职！");
	} else if(sateAD != "AD已审核") {
		mui.toast("请先申请账户！");
	} else {
		mui.openWindow({
			url: 'Pages/Courses/AddCourse-content.html?id=' + Onejobnumber,
			waiting: {
				autoShow: true, //自动显示等待框，默认为true  
				title: '正在加载...', //等待对话框上显示的提示内容  
			}
		})
	}
}
//工时
function Times() {
	var jobId = location.search; //获取entry.js Url传过来的ID	
	var jobIds = jobId.replace("?id=", ""); //将ID存入隐藏文本框	
	var Onejobnumber = document.getElementById("inpjobnumber").value = jobIds; //获取隐藏文本框的ID
	mui.openWindow({
		url: 'Pages/WorkTime/WorkTime-content.html?id='+Onejobnumber
	})

}
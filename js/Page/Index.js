mui.init();
mui.ready(function() {
	(function($) {
		alert();
		var iid = location.search;
		var id = iid.replace("?id=", "")
		if(id != "") {
			var surl = "http://localhost/Bedrock_WeCath_WeiXin/api/Index/GetSel?jobnumber=" + id;
			//alert(surl);
			mui.getJSON(surl, "", function(data) {
				mui.each(data, function(index, item) {
					document.getElementById("ADstatus").value = item.AccountStatus;
					//alert(item.AccountStatus);
					document.getElementById("hrstatus").value = item.Status;
					//alert(item.Status);
					document.getElementById("AD").value=item.AD;
				});
				//var state = document.getElementById("ADstatus").value;
			});
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
		})
	}
}

//账户申请
function account() {
	var UrlId = location.search; //获取entry.js Url传过来的ID	
	var Ids = UrlId.replace("?id=", ""); //将ID存入隐藏文本框	
	var hieId = document.getElementById("inphidden").value = Ids; //获取隐藏文本框的ID
	var sate=document.getElementById("hrstatus").value;
	if(hieId == "") {
		mui.toast("请先完成入职");
	}
	else if(sate!="HR已审核"){
		mui.toast("请先完成入职");
	}
	else {
		mui.openWindow({
			url: 'Pages/EmployeeInfo/account.html?id=' + hieId,
		});
	}
}
//学习计划
function course() {
	var jobId = location.search; //获取entry.js Url传过来的ID	
	var jobIds = jobId.replace("?id=", ""); //将ID存入隐藏文本框	
	var Onejobnumber = document.getElementById("inpjobnumber").value = jobIds; //获取隐藏文本框的ID	
	var satehr=document.getElementById("hrstatus").value;
	var sateAD=document.getElementById("ADstatus").value;
	if(Onejobnumber == ""||satehr!="HR已审核") {
		mui.toast("请先完成入职！");
	}
	else if(sateAD!="AD已审核"){
		mui.toast("请先申请账户！");
	}
	else {
		document.getElementById("twoblank").style.display="block";
		document.getElementById("onewhite").style.display="block";
		document.getElementById("twowhite").style.display="none";
		document.getElementById("oneblank").style.display="none";
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
	var jobIds = jobId.replace("?jid=", ""); //将ID存入隐藏文本框	
	var Onejobnumber = document.getElementById("inpjobnumber").value = jobIds; //获取隐藏文本框的ID
	if(Onejobnumber == "") {
		mui.toast("请先将信息填写完整！");
	} else {
		mui.openWindow({
			url: 'Pages/WorkTime/WorkTime-content.html' + Onejobnumber
		})
	}
}
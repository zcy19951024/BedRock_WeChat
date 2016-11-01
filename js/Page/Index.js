mui.init();
mui.ready(function() {
	(function($) {
 		var code = getQueryString('code');
 		
 	    var openid =getCookie('openid');
 	   
  			if (!openid) { 				
  			  if (!code) { 	
  			  	
      				location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx89e8fe8e17f057f1&redirect_uri=http%3a%2f%2foa.bedrock.com.cn%3a8000%2fBedRock_WeChat%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect');
   					} else {  
   						
   					 	mui.getJSON('http://ayansw.vicp.cc/BRC.Wechat.Enterprise/api/user?code='+code+'&agentid=16',function(data){
							//获得服务器响应
							 //var datas = JSON.stringify(data);
							 //alert(datas);
							var openid =data.openid;
							 setCookie('openid',openid);
							 alert(data.openid);
						});   					 	
    					}
  					} else {
  				     
   					 //config();
  				}

		WeChat.init();
//		var iid = location.search;
//		var id = iid.replace("?id=", "")
		if(openid != "") {
			
			//var surl = "http://192.168.0.191/BedrockAPI/api/Index/GetSel?jobnumber=" + id;
			mui.getJSON(WeChat.HomeStartLoad + openid, "", function(data) {
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
function getQueryString(queryname) {
  var reg = new RegExp(`(^|&)${queryname}=([^&]*)(&|$)`);
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
} 
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]);
    else
        return null;
} 
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
} 
//入职
function entry() {
 
	var openid =getCookie('openid');
	var hrstate=document.getElementById("hrstatus").value;
	if(hrstate == null||hrstate=="") {
		mui.openWindow({
			url: 'Pages/EmployeeInfo/entry.html',
		})
	} else {
		mui.openWindow({
			url: 'Pages/EmployeeInfo/entry.html?id=' + openid,
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
 
 var openid =getCookie('openid');
	var sate = document.getElementById("hrstatus").value;
	
	if(sate == "待审核") {
		mui.toast("请先完成入职");
	} else if(sate != "HR已审核") {
		mui.toast("请先完成入职");
	} else {
		mui.openWindow({
			url: 'Pages/EmployeeInfo/account.html?id=' + openid,
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
 
	var openid =getCookie('openid');
	var satehr = document.getElementById("hrstatus").value;
	var sateAD = document.getElementById("ADstatus").value;
	if(satehr != "HR已审核") {
		mui.toast("请先完成入职！");
	} else if(sateAD != "AD已审核") {
		mui.toast("请先申请账户！");
	} else {
		mui.openWindow({
			url: 'Pages/Courses/AddCourse-content.html?id=' + openid,
			waiting: {
				autoShow: true, //自动显示等待框，默认为true  
				title: '正在加载...', //等待对话框上显示的提示内容  
			}
		})
	}
}

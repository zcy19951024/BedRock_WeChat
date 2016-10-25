mui.init()

(function($) {
	$.init();
	//入职日期
	var entrystart = $('#content-input-entrys')[0];
	var entrystarttime = $('.content-input-entrystime');
	entrystarttime.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			var picker = new $.DtPicker(options);
			picker.show(function(rs) {
				entrystart.value = rs.value;
				picker.dispose();
			});
		}, false);
	});
	//合同开始日期
	var entryfinish = $('#content-input-contractstarttime')[0];
	var entryfinishtime = $('.contractstarttime');
	entryfinishtime.each(function(i, btne) {
		btne.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			var picker = new $.DtPicker(options);
			picker.show(function(rs) {
				entryfinish.value = rs.value;
				picker.dispose();
			});
		}, false);
	});
	//试用期到期日期
	var periodstart = $('#content-input-probationfinishtime')[0];
	var periodstarttime = $('.probationfinishtime');
	periodstarttime.each(function(i, btnes) {
		btnes.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			var picker = new $.DtPicker(options);
			picker.show(function(rs) {
				periodstart.value = rs.value;
				picker.dispose();
			});
		}, false);
	});
	//合同到期日期
	var periodfinish = $('#content-input-contractenttime')[0];
	var periodfinishtime = $('.contractenttime');
	periodfinishtime.each(function(i, btness) {
		btness.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			var picker = new $.DtPicker(options);
			picker.show(function(rs) {
				periodfinish.value = rs.value;
				picker.dispose();
			});
		}, false);
	});
})(mui);

//一开始就加载员工填写的信息
(function($) {
	var FiloUrl = window.location.search;
	var filo = FiloUrl.replace("?id=", "");

	var surl = "http://localhost/Bedrock_WeCath_WeiXin/api/Entry/GetHrApprovel?id=" + filo;
	mui.getJSON(surl, "", function(data) {
		//alert(1234);
		mui.each(data, function(index, item) {
			//alert(12345);
			document.getElementById("content-input-Cname").value = item.CName;
			document.getElementById("content-input-Cname").readOnly="readonly";
			document.getElementById("content-input-Ename").value = item.EName;
			document.getElementsByName("radio1").value=item.Sex;
			if(item.Sex == "男") {
				document.getElementById("sex-nans").checked = "checked";
			} else {
				document.getElementById("sex-nans").checked = true;
			}
			document.getElementById("content-input-idcard").value = item.IDcare;
			document.getElementById("content-input-cardaddress").value = item.CareAddress;
			document.getElementById("content-input-nowaddress").value = item.NowAddress;
			document.getElementById("content-input-maritalstatus").value = item.MaritalStatus;
			document.getElementById("content-input-education").value = item.Education;
			document.getElementById("content-input-tel").value = item.Phone;
			document.getElementById("hrjobnumber").value = item.Jobnumber;
			document.getElementById("entryId").value = item.Id;
			//alert(item.Id);
		});
	});
})(mui);

function hrok() {
	var Cname = document.getElementById("content-input-Cname").value; //姓名
	//alert("姓名" + Cname);
	var Ename = document.getElementById("content-input-Ename").value; //英文名
	var sex = document.getElementsByName("radio1"); //性别
	var sexs;
	for(var i = 0; i < sex.length; i++) {
		if(sex[i].checked)
			sexs = sex[i].value;
	}
	var idcard = document.getElementById("content-input-idcard").value; //身份证号
	var cardaddress = document.getElementById("content-input-cardaddress").value; //身份证地址
	var nowaddress = document.getElementById("content-input-nowaddress").value; //现在居住地址
	var maritalstatus = document.getElementById("content-input-maritalstatus").value; //婚姻状况
	var education = document.getElementById("content-input-education").value; //最终学历
	var tel = document.getElementById("content-input-tel").value; //手机号
	var positions = document.getElementById("content-input-position").value; //职位
	var entrys = document.getElementById("content-input-entrys").value; //入职时间
	var contractstarttime = document.getElementById("content-input-contractstarttime").value; //合同开始时间
	var contractenttime = document.getElementById("content-input-contractenttime").value; //合同到期时间
	var probationfinishtime = document.getElementById("content-input-probationfinishtime").value; //试用期到期时间
	var probationsalary = document.getElementById("content-input-probationsalary").value; //试用期工资
	var contractwage = document.getElementById("content-input-contractwage").value; //合同工资
	var pm = document.getElementById("content-input-pm").value; //项目经理
	var jobid = document.getElementById("hrjobnumber").value;
	var Id = document.getElementById("entryId").value;
	if(Cname = "" || Ename == "" || sexs == "" || idcard == "" || nowaddress == "") {
		mui.alert("请将基本信息输入完整！")
	} else {
		mui.ajax('http://localhost/Bedrock_WeCath_WeiXin/api/Entry/PostHrEntry?jobnumber=' + jobid, {
			data: {
				"Id": Id,
				"Jobnumber": jobid,
				"CName": Cname,
				"EName": Ename,
				"Sex": sexs,
				"IDcare": idcard,
				"CareAddress": cardaddress,
				"NowAddress": nowaddress,
				"MaritalStatus": maritalstatus,
				"Education": education,
				"Phone": tel,
				"Position": positions,
				"EntryStartTime": entrys,
				"ContractStartTime": contractstarttime,
				"ContractEndTime": contractenttime,
				"ProbationEndTime": probationfinishtime,
				"Probationsalary": probationsalary,
				"Contractsalary": contractwage,
				"PM": pm,
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'POST', //HTTP请求类型
			contentType: 'application/json; charset=utf-8',
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				alert(JSON.stringify(data));
				var datas = eval('(' + JSON.stringify(data) + ')');
				mui.toast('添加成功!');
				mui.openWindow({
					url: '../../index.html?id=' + datas.Jobnumber
				});
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				mui.toast('连接失败，请检查网络!');
			}
		});
	}
}
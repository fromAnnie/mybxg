define(['jquery','template','util','bootstrap'],function($,template,util){
	// 设置导航菜单选中
	util.setMenu(location.pathname);

	// a[href="'+pathname+'"]' 当前点击的  addClass('active')加个类 

	// 当页面加载的时候 要掉接口 获取数据
	$.ajax({
		type : 'get',
		url : '/api/teacher',
		dataType : 'json',
		success : function(data){
			// console.log(data);
			// 解析数据 渲染页面
			var html = template('teacherTpl',{list : data.result});  //注意传入的数据是：data.result
			$('#teacherInfo').html(html);

			// 绑定预览点击事件
			$('.preveiw').click(function(){
				// console.log(123);
				// 通过接口获取数据
				// closest('td') 获取直接父元素  attr() 方法设置或返回被选元素的属性值。
				var tcId = $(this).closest('td').attr('data-tcId');
				// console.log(tcId);
				$.ajax({
					type : 'get',
					url : '/api/teacher/view',
					data : {tc_id:tcId},
					dataType : 'json',
					success : function(data){
						// console.log(data);
						// 解析数据 渲染页面
						var html = template('modalTpl',data.result);
						$('#modalInfo').html(html);
						// 显示弹窗
						$('#teacherModal').modal();
					}
				});
			});

			// 处理启用注销功能
			$('.eod').click(function(){
				var td = $(this).closest('td');
				var tcId = td.attr('data-tcId');
				var tcStatus = td.attr('data-status');
				var that = this; //点击的按钮
				$.ajax({
					type : 'post',
					url : '/api/teacher/handle',
					data : {
						tc_id : tcId,
						tc_status : tcStatus    //点击时候 发送一个请求
					},
					dataType : 'json',
					success : function(data){
						// data.result.tc_status这个值覆盖掉默认状态data-status的值
						td.attr('data-status',data.result.tc_status);
						if(data.result.tc_status == 0){
							$(that).html('注销');
						}else{
							$(that).html('启用');
						}
					}
				});
			});
		}
	});

});
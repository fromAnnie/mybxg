define(['jquery','template','bootstrap'],function($,template){
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
		}
	});

});
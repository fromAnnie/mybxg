define(['jquery','template'],function($,template){
	// 当页面加载的时候 要掉接口 获取数据
	$.ajax({
		type : 'get',
		url : '/api/teacher',
		dataType : 'json',
		success : function(data){
			// console.log(data);
			// 解析数据 渲染页面
			var html = template('teacherTpl',{list : data.result});
			$('#teacherInfo').html(html);
		}
	});

});
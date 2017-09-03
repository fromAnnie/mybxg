define(['jquery'],function($){
	// 工具函数  不做其他操作 提供一些共用功能
	return{
		setMenu : function(path){
			$('.navs a[href="'+path+'"]').addClass('active');
		},
		// 查询字符串
		qs : function(param,key){
			// 获取url参数中指定的参数值
			// flag=123&abc=hello
			// var param = location.search.substring(1);---这样的话 就不用传param参数了
			// param是所有的参数
			// location里有个属性 search  可以console.dir打印测试
			var result = null;
			if(param){
				var kvs = param.split('&');
				$.each(kvs,function(i,item){
					var kv = item.split('=');
					if(key == kv[0]){
						// 找到了对应的参数
						result = kv[1];
						return false; //终止循环
					}
				});
			}
			return result;
		}
	}
});
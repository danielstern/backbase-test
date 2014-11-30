// this simple app. include ngg material for some cool effects.
angular.module("BackbaseTestPipeApp",['ngMaterial'])
.run(function($http,$rootScope,pipeUrl,$sce,$interval){
	$rootScope.progress = 0;
	var progressCount = $interval(function(){
		$rootScope.progress +=0.1;
	},20);

	$http.get(pipeUrl)
	.then(function(data,res){
		$interval.cancel(progressCount);
		$rootScope.progress = 100;

		$rootScope.data = data.data.value;

		// Here we want to filter out the articles that don't have images.
		$rootScope.data.items = $rootScope.data.items.filter(function(item){
			return item['media:content'];
		});

	},function(error){
		// It's important to at least attempt to handle errors.
		alert("Something went wrong. Please try again.");
	})
})
.value("pipeUrl",'http://pipes.yahoo.com/pipes/pipe.run?_id=DqsF_ZG72xGLbes9l7okhQ&_render=json')

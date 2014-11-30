// Though using .run and $rootScope is not the 
// best of practices, it's 
// perfectly ideal for sorting out this app.
angular.module("BackbaseTestPipeApp",['ngMaterial'])
.run(function($http,$rootScope,pipeUrl,$sce,$interval){
	$rootScope.progress = 0;
	var progressCount = $interval(function(){
		$rootScope.progress +=0.1;
	},20);

	// Add a function to be called
	$rootScope.trust = function(html_code) {
	    return $sce.trustAsHtml(html_code);
	}


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
		// alert("Something went wrong. Please try again.");
	})
})
// Here I've made pipe an angular value so it can be easily mocked for testing.
// I've opted to go with _render vs render as a query paramter, as that returns better results.
.value("pipeUrl",'http://pipes.yahoo.com/pipes/pipe.run?_id=DqsF_ZG72xGLbes9l7okhQ&_render=json')
// .value("pipeUrl",'http://pipes.yahoo.com/pipes/pipe.run?_id=2CjCN7vB2xGeK_FufOgC8A&_render=json')
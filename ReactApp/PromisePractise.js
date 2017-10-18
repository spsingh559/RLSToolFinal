function addpromise(a,b){
	return new Promise (function(resolve,reject){
		if(typeof a  !='number' || typeof b !='number'){
			reject('number is not integer');
		}else{
			resolve(parseInt(a)+parseInt(b));
		}
	});
};

addpromise(2,4).then(function(c){
	console.log('add success'+ c);
}, function(err){
	console.log("one of the variable  is not  int "+ err);
})

addpromise(2,'a').then(function(c){
	console.log('add success'+ c);
}, function(err){
	console.log("one of the variable  is not  int "+ err);
})
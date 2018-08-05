(function(namespace){
"use strict";

	var instance = null;

	var Utils = function(){};

	Utils.getInstance = function(){
		if (instance === null) {
			instance = new Utils();
		}

		return instance;
	};

	Utils.prototype.closest = function(start, aim){
		var result = start;

		while(true){
			if (result.classList.contains(aim) || result.nodeName == aim.toUpperCase()) {
				return result;
			}

			if (result.nodeName == 'BODY') {
				console.error(aim +' not found.');
				return;
			}

			result = result.parentNode;

		}
	};

	namespace.Utils = Utils.getInstance();


})(window);
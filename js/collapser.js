(function(namespace){
"use strict";

	var instance = null;

	var Collapser = function(){};

	Collapser.getInstance = function(){
		if (instance === null) {
			instance = new Collapser();
		}

		instance.init();

		return instance;
	};

	Collapser.prototype.init = function(){
		var collapserItems = document.querySelectorAll('.js-collapser');
		this.items = {};

		var collapserObj;
		for (var i = 0; i < collapserItems.length; i++) {
			collapserObj = {};
			collapserObj.el = collapserItems[i];
			collapserObj.tgls = collapserItems[i].querySelectorAll('.js-collapserTgl');

			for (var ii = 0; ii < collapserObj.tgls.length; ii++) {
				collapserObj.tgls[ii].addEventListener('click', this.toggleCollapse.bind(this, collapserObj));
			}

			this.items[collapserObj.el.getAttribute('data-name')] = collapserObj;
		}

	};

	Collapser.prototype.toggleCollapse = function(obj, event){
		var collapsed = obj.el.getAttribute('data-collapsed');

		if (collapsed == 'true') {
			obj.el.setAttribute('data-collapsed', 'false');
		}
		else {
			obj.el.setAttribute('data-collapsed', 'true');
		}

	};

	namespace.Collapser = Collapser;

})(window);
(function(namespace){
"use strict";

	var instance = null;

	var ScaleSelect = function(){};

	ScaleSelect.getInstance = function(){
		if (instance === null) {
			instance = new ScaleSelect();
		}

		instance.init();

		return instance;
	};

	ScaleSelect.prototype.init = function(){
		this.select = {
			el: document.querySelector('select.js-scaleType'),
			name: null,
			value: null
		};
	};

	ScaleSelect.prototype.defaultDataItem = 0; /// 0 = Ionian (Major)

	ScaleSelect.prototype.data = [
		{
			name: 'ionian',
			displayName: 'Ionian (Major)',
			intervals: [2, 2, 1, 2, 2, 2, 1] /// whole, whole, half, whole, whole, whole, half
		},
		{
			name: 'dorian',
			displayName: 'Dorian',
			intervals: [2, 1, 2, 2, 2, 1, 2]
		},
		{
			name: 'phrygian',
			displayName: 'Phrygian',
			intervals: [1, 2, 2, 2, 1, 2, 2]
		},
		{
			name: 'lydian',
			displayName: 'Lydian',
			intervals: [2, 2, 2, 1, 2, 2, 1]
		},
		{
			name: 'mixolydian',
			displayName: 'Mixolydian',
			intervals: [2, 2, 1, 2, 2, 1, 2]
		},
		{
			name: 'aeolian',
			displayName: 'Aeolian (Minor)',
			intervals: [2, 1, 2, 2, 1, 2, 2]
		},
		{
			name: 'locrian',
			displayName: 'Locrian',
			intervals: [1, 2, 2, 1, 2, 2, 2]
		},
		{
			name: 'blues-maj',
			displayName: 'Blues Major',
			intervals: [2, 1, 1, 3, 2, 3]
		},
		{
			name: 'blues-min',
			displayName: 'Blues Minor',
			intervals: [3, 2, 1, 1, 3, 2]
		}
	];

	namespace.ScaleSelect = ScaleSelect;

})(window);
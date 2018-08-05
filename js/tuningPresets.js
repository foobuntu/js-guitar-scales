(function(namespace){
"use strict";

	var instance = null;

	var TuningPresets = function(){};

	TuningPresets.getInstance = function(){
		if (instance === null) {
			instance = new TuningPresets();
		}

		return instance;
	};

	TuningPresets.prototype.init = function(){
		this.select = {
			el: document.querySelector('select.js-presets'),
			name: null,
			value: null
		};
	};

	/// notes for reference
	/// A   A#  B   C   C#  D   D#  E   F   F#  G   G#
	/// 0   1   2   3   4   5   6   7   8   9   10  11
	TuningPresets.prototype.data = [
		{
			name: 'Standard',
			notes: [7, 0, 5, 10, 2, 7]
		},
		{
			name: '7S Standard',
			notes: [2, 7, 0, 5, 10, 2, 7]
		}
	];

	namespace.TuningPresets = TuningPresets;

})(window);
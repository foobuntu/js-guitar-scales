(function(namespace){
"use strict";

	var instance = null;

	var NoteSelect = function(){};

	NoteSelect.getInstance = function(){
		if (instance === null) {
			instance = new NoteSelect();
		}

		instance.init();

		return instance;
	};

	NoteSelect.prototype.init = function(){
		this.select = {
			el: document.querySelector('select.js-rootNote'),
			name: null,
			value: null
		};
	};

	NoteSelect.prototype.defaultDataItem = 3; //-- 3 = C

	NoteSelect.prototype.data = [
		{
			name: 'a',
			displayName: 'A'
		},
		{
			name: 'asharp',
			displayName: 'A#'
		},
		{
			name: 'b',
			displayName: 'B'
		},
		{
			name: 'c',
			displayName: 'C'
		},
		{
			name: 'csharp',
			displayName: 'C#'
		},
		{
			name: 'd',
			displayName: 'D'
		},
		{
			name: 'dsharp',
			displayName: 'D#'
		},
		{
			name: 'e',
			displayName: 'E'
		},
		{
			name: 'f',
			displayName: 'F'
		},
		{
			name: 'fsharp',
			displayName: 'F#'
		},
		{
			name: 'g',
			displayName: 'G'
		},
		{
			name: 'gsharp',
			displayName: 'G#'
		}
	];

	namespace.NoteSelect = NoteSelect;

})(window);
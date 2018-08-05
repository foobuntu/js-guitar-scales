(function(namespace){
"use strict";

	var instance = null;

	var JSGuitarScales = function(){};

	JSGuitarScales.getInstance = function(){
		if (instance === null) {
			instance = new JSGuitarScales();
		}

		return instance;
	};

	JSGuitarScales.prototype.init = function(){
		this.scale = {};
		this.fretboard = {
			el: document.querySelector('.js-fretboard'),
			notesInScale: [],
			displayAllBtn: document.querySelector('.js-displayAllBtn')
		};
		this.triads = {
			el: document.querySelector('.js-triadsList'),
			items: [],
			meta: [
				{
					type: 'Major',
					shortType: 'M'
				},
				{
					type: 'Minor',
					shortType: 'm'
				},
				{
					type: 'Minor',
					shortType: 'm'
				},
				{
					type: 'Major',
					shortType: 'M'
				},
				{
					type: 'Major',
					shortType: 'M'
				},
				{
					type: 'Minor',
					shortType: 'm'
				},
				{
					type: 'Diminished',
					shortType: 'Dim'
				}
			]
		};

		this.notes = NoteSelect.getInstance();
		this.scaleTypes = ScaleSelect.getInstance();
		this.collapser = Collapser.getInstance();

		this.stringSetup = {
			homeEl: document.querySelector('.js-stringSetup'),
			tunerEl: document.querySelector('.js-stringSetup .js-tunerWrap'),
			addStringBtn: document.querySelector('.js-stringSetup .js-addStringBtn'),
			strings: []
		};

		this.renderScale = document.querySelector('.js-renderScale');

		this.setupSelect(this.notes);
		this.setupSelect(this.scaleTypes);

		/// initialize root note
		this.updateRootNote();
		/// initialize scale type
		this.updateScaleType();

		/// initialize 6 strings for setup
		for (var i = 0; i < 6; i++) {
			this.addString();
		}

		this.stringSetup.addStringBtn.addEventListener('click', this.addString.bind(this));

		this.notes.select.el.addEventListener('change', this.updateRootNote.bind(this));
		this.scaleTypes.select.el.addEventListener('change', this.updateScaleType.bind(this));

		this.renderScale.addEventListener('click', this.renderScaleData.bind(this));

		this.fretboard.displayAllBtn.addEventListener('click', this.displayAllNotes.bind(this));

	};

	/// initialize the select boxes for the scale options
	JSGuitarScales.prototype.setupSelect = function(obj){
		var option;
		for (var i = 0; i < obj.data.length; i++) {
			option = document.createElement('option');
			option.setAttribute('value', i);

			if (i == obj.defaultDataItem) {
				option.setAttribute('selected', true);
			}

			option.innerHTML = obj.data[i].displayName;

			obj.select.el.appendChild(option);
		}
	};

	/// updates the notes object when the notes select box changes
	JSGuitarScales.prototype.updateRootNote = function(){
		this.notes.select.value = parseInt(this.notes.select.el.value);
		this.notes.select.name = this.notes.data[this.notes.select.value];
	};

	/// updates the scaleType object when the scaleTypes select box changes
	JSGuitarScales.prototype.updateScaleType = function(){
		this.scaleTypes.select.value = parseInt(this.scaleTypes.select.el.value);
		this.scaleTypes.select.name = this.scaleTypes.data[this.scaleTypes.select.value];
	};

	/// adds a string to the string setup
	JSGuitarScales.prototype.addString = function(){
		var itemIndex = this.stringSetup.strings.length;
		var stringObj = {};
		var stringEl, indexEl, tunerEl, noteEl, noteInnerEl, cancelEl;

		stringEl = document.createElement('div');
		stringEl.classList.add('stringTuner', 'js-stringTuner', 'clear');
		stringEl.setAttribute('data-stringindex', itemIndex);

		stringObj.el = stringEl;
		stringObj.tune = null;
		stringObj.tunerNotes = [];

		indexEl = document.createElement('div');
		indexEl.classList.add('index', 'js-index');
		indexEl.innerHTML = 'String '+ (itemIndex + 1);

		tunerEl = document.createElement('div');
		tunerEl.classList.add('tuner', 'js-tuner');
		for (var j = 0; j < this.notes.data.length; j++) {
			noteEl = document.createElement('button');
			noteEl.classList.add('tunerNote', 'js-tunerNote');
			noteEl.setAttribute('data-active', 'false');
			noteEl.setAttribute('data-stringnote', j);
			noteInnerEl = document.createElement('span');
			noteInnerEl.classList.add('noteInner', 'js-noteInner');
			noteInnerEl.innerHTML = this.notes.data[j].displayName;

			noteEl.addEventListener('click', this.activateNoteForString.bind(this));

			noteEl.appendChild(noteInnerEl);
			tunerEl.appendChild(noteEl);

			stringObj.tunerNotes.push(noteEl);
		}

		cancelEl = document.createElement('button');
		cancelEl.classList.add('cancelString', 'js-cancelString');
		cancelEl.setAttribute('type', 'button');
		cancelEl.innerHTML = '- String';
		cancelEl.addEventListener('click', this.removeString.bind(this, cancelEl));

		stringEl.appendChild(indexEl);
		stringEl.appendChild(tunerEl);
		stringEl.appendChild(cancelEl);

		this.stringSetup.tunerEl.appendChild(stringEl);
		this.stringSetup.strings.push(stringObj);

	};

	/// removes a string from the string setup
	JSGuitarScales.prototype.removeString = function(cancelBtn){
		var home = Utils.closest(cancelBtn, 'js-stringTuner');
		var stringIndex = parseInt(home.getAttribute('data-stringindex'));

		this.stringSetup.tunerEl.removeChild(home);
		this.stringSetup.strings.splice(stringIndex, 1);

		for (var i = 0; i < this.stringSetup.strings.length; i++) {
			this.stringSetup.strings[i].el.setAttribute('data-stringindex', i);
			this.stringSetup.strings[i].el.querySelector('.js-index').innerHTML = 'String '+ (i + 1);
		}
	};

	/// handles the tuning of a string by setting the clicked note to active and updating the string object
	JSGuitarScales.prototype.activateNoteForString = function(event){
		var home = Utils.closest(event.target, 'js-tunerNote');
		var stringTuner = Utils.closest(home, 'js-stringTuner');
		var stringIndex = parseInt(stringTuner.getAttribute('data-stringindex'));

		/// the data-active attribute is only for css and serves so purpose in the calculation logic
		var string = this.stringSetup.strings[stringIndex];
		for (var i = 0; i < string.tunerNotes.length; i++) {
			string.tunerNotes[i].setAttribute('data-active', false);
		}
		home.setAttribute('data-active', true);

		string.tune = parseInt(home.getAttribute('data-stringnote'));

	};

	JSGuitarScales.prototype.renderScaleData = function(){
		/// kill previous fretboard
		while(this.fretboard.el.firstChild){
			this.fretboard.el.removeChild(this.fretboard.el.firstChild);
		}
		this.fretboard.notesInScale = [];
		while(this.triads.el.firstChild){
			this.triads.el.removeChild(this.triads.el.firstChild);
		}

		this.calculateScale();

		/// ensure all strings are tuned
		for (var i = 0; i < this.stringSetup.strings.length; i++) {
			if (this.stringSetup.strings[i].tune === null) {
				alert('String '+ (i + 1) +' is not tuned!');
				return;
			}
			else{
				this.stringSetup.strings[i].notes = this.offsetArray(this.notes.data, this.stringSetup.strings[i].tune);
			}
		}

		/// render actual fretboard
		var stringRow, stringNotes, fretCell, noteEl, stringEl, stringWidth, stringWidthMax, noteInScale;
		for (var j = 0; j < this.stringSetup.strings.length; j++) {
			stringNotes = this.offsetArray(this.notes.data, this.stringSetup.strings[j].tune);
			stringNotes.push(stringNotes[0]);

			stringWidthMax = 8;
			stringWidth = stringWidthMax * ((j + 2) / 10);

			stringRow = document.createElement('div');
			stringRow.classList.add('fbRow', 'stringRow');

			for (var jj = 0; jj < stringNotes.length; jj++) {

				fretCell = document.createElement('span');
				fretCell.classList.add('fretCell');

				stringEl = document.createElement('span');
				stringEl.classList.add('string');
				stringEl.style.height = stringWidth +'px';
				stringEl.style.maxHeight = stringWidthMax +'px';

				noteEl = document.createElement('span');
				noteEl.classList.add('text', 'note', 'bubble');
				noteEl.setAttribute('data-value', stringNotes[jj].name)
				noteEl.innerHTML = stringNotes[jj].displayName;

				noteInScale = false;
				for (var jjj = 0; jjj < this.scale.notes.length; jjj++) {

					if (this.scale.notes[jjj].name == stringNotes[jj].name) {
						noteInScale = true;
						continue;
					}

				}
				if (noteInScale) {
					fretCell.classList.add('inScale');
					this.fretboard.notesInScale.push(noteEl);
				}
				else {
					fretCell.classList.add('notInScale')
				}


				fretCell.appendChild(stringEl);
				fretCell.appendChild(noteEl);

				stringRow.appendChild(fretCell);
			}

			this.fretboard.el.appendChild(stringRow);
		}

		this.collapser.items['stringSetup'].el.setAttribute('data-collapsed', 'true');
		this.collapser.items['fretboard'].el.setAttribute('data-collapsed', 'false');

		/// render fretnumbers
		var fretNumRow = document.createElement('div');
		var fretNum;
		fretNumRow.classList.add('fbRow', 'fretNumRow');
		for (var k = 0; k <= 12; k++) {
			fretCell = document.createElement('span');
			fretCell.classList.add('fretCell');

			fretNum = document.createElement('span');
			fretNum.classList.add('text', 'fretNum');
			fretNum.innerHTML = k;

			fretCell.appendChild(fretNum);
			fretNumRow.appendChild(fretCell);
		}

		this.fretboard.el.appendChild(fretNumRow);

		/// render triads
		var triadObj, triad, type, triadNote;
		for (var l = 0; l < this.scale.triads.length; l++) {
			triadObj = this.scale.triads[l];

			triad = document.createElement('div');
			triad.classList.add('triad', 'js-triad');
			triad.setAttribute('data-notes', triadObj.notes[0].name +' '+ triadObj.notes[1].name +' '+ triadObj.notes[2].name);
			triad.setAttribute('data-shown', 'false');
			type = document.createElement('div');
			type.classList.add('triadType');
			type.innerHTML = this.triads.meta[l].shortType;

			triad.appendChild(type);

			for (var ll = 0; ll < triadObj.notes.length; ll++) {
				triadNote = document.createElement('div');
				triadNote.classList.add('triadNote', 'bubble', 'js-triadNote');
				triadNote.innerHTML = triadObj.notes[ll].displayName;

				triad.appendChild(triadNote);
			}

			triad.addEventListener('click', this.highlightTriadNotes.bind(this));

			this.triads.el.appendChild(triad);
			this.triads.items.push(triad);
		}

	};

	JSGuitarScales.prototype.calculateScale = function(){
		this.scale.rootNote = this.notes.data[this.notes.select.value];
		this.scale.type = this.scaleTypes.data[this.scaleTypes.select.value];
		this.scale.notesOffsetToRoot = this.offsetArray(this.notes.data, this.notes.select.value);
		this.scale.intervals = this.scaleTypes.data[this.scaleTypes.select.value].intervals;
		this.scale.notesIndexes = this.intervalsToIndexes(this.scale.intervals);
		this.scale.notes = [];
		this.scale.triads = [];

		for (var i = 0; i < this.scale.notesIndexes.length; i++) {
			this.scale.notes.push(this.scale.notesOffsetToRoot[this.scale.notesIndexes[i]]);
		}

		this.triadsFromScale();

	};

	JSGuitarScales.prototype.triadsFromScale = function(){
		var chordObj;
		var scaleNotes = this.scale.notes;

		for (var i = 0; i < this.scale.notes.length; i++) {
			chordObj = {};
			chordObj.notes = [scaleNotes[0], scaleNotes[2], scaleNotes[4]];

			this.scale.triads.push(chordObj);

			scaleNotes = this.offsetArray(scaleNotes, 1);
		}

	};

	/// offsets the basic notes array (starting alphabetically at A) to start at the given root note
	JSGuitarScales.prototype.offsetArray = function(array, noteIndex){
		var notes1 = array.slice(0, noteIndex);
		var notes2 = array.slice(noteIndex, array.length + 1);

		var sortedNotes = notes2.concat(notes1);

		return sortedNotes;
	};

	/// convert the basic intervals to the actual indexes of the notes
	JSGuitarScales.prototype.intervalsToIndexes = function(intervals){
		var indexes = [0];
		var index = 0;

		for (var i = 0; i < intervals.length - 1; i++) {
			index = index + intervals[i];
			indexes.push(index);
		}

		return indexes;
	};

	JSGuitarScales.prototype.highlightTriadNotes = function(event){
		var target = Utils.closest(event.target, 'js-triad');
		var shown = target.getAttribute('data-shown');

		if (shown == 'true') {
			//// if triad is already shown

			/// undo triad highlighting
			for (var i = 0; i < this.fretboard.notesInScale.length; i++) {
				this.fretboard.notesInScale[i].classList.remove('js-highlightTriad');
			}

			/// set triad element data-shown to false
			target.setAttribute('data-shown', 'false');
		}
		else {
			//// if triad is not shown

			/// undo eventual previous triad highlighting
			for (var j = 0; j < this.fretboard.notesInScale.length; j++) {
				this.fretboard.notesInScale[j].classList.remove('js-highlightTriad');
			}

			/// set all triad elements data-shown to false
			for (var k = 0; k < this.triads.items.length; k++) {
				this.triads.items[k].setAttribute('data-shown', 'false')
			}

			/// highlight current triad
			var notes = target.getAttribute('data-notes').split(' ');
			target.setAttribute('data-shown', 'true');

			for (var l = 0; l < this.fretboard.notesInScale.length; l++) {
				for (var ll = 0; ll < notes.length; ll++) {
					if (this.fretboard.notesInScale[l].getAttribute('data-value') == notes[ll]) {
						this.fretboard.notesInScale[l].classList.add('js-highlightTriad');
					}
				}
			}
		}

	};

	JSGuitarScales.prototype.displayAllNotes = function(){
		this.fretboard.el.classList.toggle('displayAll');
	};

	namespace.JSGuitarScales = JSGuitarScales.getInstance();

	window.addEventListener("DOMContentLoaded", namespace.JSGuitarScales.init.bind(namespace.JSGuitarScales));

})(window);
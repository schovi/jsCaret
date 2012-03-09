;(function(window, undefined) {
	// Simple IE detection
	var msie = !!window.ActiveXObject;

	var Caret = function(element) {
		this.element = element;
	};

	// Helper for getting caret, or standalone using
	Caret.getCaret = function(element) {
		var start, end;

		if(msie) {
			var selection = document.selection;
			if (element.tagName.toLowerCase() != "textarea") {
				// Input
				var val = element.value,
					range = selection.createRange().duplicate();
				
				range.moveEnd("character", val.length);
				start = (!range.text ? val.length : val.lastIndexOf(range.text));
				range = selection.createRange().duplicate();
				range.moveStart("character", -val.length);
				end = range.text.length;
			} else {
				// Textarea
				var range = selection.createRange(),
					stored_range = range.duplicate();

				stored_range.moveToElementText(element);
				stored_range.setEndPoint('EndToEnd', range);
				start = stored_range.text.length - range.text.length;
				end = start + range.text.length;
			}
		} else {
			start = element.selectionStart;
			end = element.selectionEnd;
		}

		return {
			'start': start,
			'end': end,
			'cursor': start === end,
			'selection': start !== end
		};
	};

	// Helper for setting caret, or standalone using
	Caret.setCaret = function(element, start, end) {
		if(msie) {
			var selRange = element.createTextRange();
			element.collapse(true);
			element.moveStart('character', start);
			element.moveEnd('character', end - start);
			element.select();
		} else {
			element.selectionStart = start;
			element.selectionEnd = end;
		}
		element.focus();

		return true;
	};

	Caret.prototype = {
		// Set start and end of caret
		set: function() {
			var start, end, 
				arg0 = arguments[0],
				arg1 = arguments[1];

			if(typeof arg0 === "object" && typeof arg0.start==="number" && typeof arg0.end==="number") {
				start = arg0.start;
				end = arg0.end;
			} else if(typeof arg0 === "number" && typeof arg1 === "number") {
				start = arg0;
				end = arg1;
			} else if(typeof arg0 === "number" ) {
				start = end = arg0;
			} else {
				return this;
			}

			Caret.setCaret(this.element, start, end);

			return this;
		},
		// Select whole text
		all: function() {
			Caret.setCaret(this.element, 0, element.value.length);
			return this;
		},
		// Get start and end of caret
		get: function() {
			return Caret.getCaret(this.element);
		},
		// Set or get start of caret
		start: function() {
			var caret = Caret.getCaret(this.element),
					arg0 = arguments[0];

			if(arg0 && typeof arg0 === "number") {
				// TODO nastavit začátek kurzoru
				Caret.setCaret(this.element, arg0, caret.end);
				return this;
			} else {
				return caret.start;
			}
		},
		// Set or get end of caret
		end: function() {
			var caret = Caret.getCaret(this.element),
					arg0 = arguments[0];

			if(arg0 && typeof arg0 === "number") {
				// TODO nastavit začátek kurzoru
				Caret.setCaret(this.element, caret.start, arg0);
				return this;
			} else {
				return caret.end;
			}
		},
		// Find and select specific string or regexp
		select: function() {
			var arg0 = arguments[0],
					value = this.element.value,
					start, end;

			if(typeof arg0 === "string") {
				if((start = value.indexOf(arg0)) >- 1) {
					end = start + arg0.length;
				} else {
					start = null;
				}
			} else if(Object.prototype.toString.call(arg0) === "[object RegExp]") {
				var re = arg0.exec(value);

				if(re !== null) {
					start = re.index;
					end = start + re[0].length;
				}
			}

			if(typeof(start) !== "undefined" && typeof(end) !== "undefined") {
				Caret.setCaret(this.element, start, end);
			}

			return this;
		},
		// Clear current selection
		clear: function () {
			this.insert("");
			return this;
		},
		// Insert string to caret, or replace selection
		insert: function(text) {
			var caret = Caret.getCaret(this.element),
				value = this.element.value;

			this.element.value = value.substr(0, caret.start) + text + value.substr(caret.end, value.length);

			Caret.setCaret(this.element, caret.start, caret.start + text.length);

			return this;
		},
		// Insert string before caret or selection
		insertBefore: function(text) {
			var caret = Caret.getCaret(this.element),
				value = this.element.value;

			this.element.value = value.substr(0, caret.start) + text + value.substr(caret.start, value.length);

			Caret.setCaret(this.element, caret.start + text.length, caret.end + text.length);

			return this;
		},
		// Insert string after caret or selection
		insertAfter: function(text) {
			var caret = Caret.getCaret(this.element),
				value = this.element.value;

			this.element.value = value.substr(0, caret.end) + text + value.substr(caret.end, value.length);

			Caret.setCaret(this.element, caret.start, caret.end);

			return this;
		},
		// Return selected text from selection
		text: function() {
			var arg0 = arguments[0];

			if(arg0) {
				this.insert(arg0);
				return this;
			} else {
				var caret = Caret.getCaret(this.element);
				return element.value.substring(caret.start, caret.end);//.replace(/ /g, '\xa0') || '\xa0'
			}
		},
		// Get string before caret or selection
		before: function() {
			var caret = Caret.getCaret(this.element),
				arg0 = arguments[0],
				value = this.element.value;

			if(arg0) {
				this.element.value = arg0 + value.substring(caret.start, value.length);
				Caret.setCaret(this.element, arg0.length, arg0.length + (caret.end - caret.start));
				return this;
			} else {
				return this.element.value.substring(0, caret.start);//.replace(/ /g, '\xa0') || '\xa0'
			}
		},
		// Get string after caret or selection
		after: function() {
			var caret = Caret.getCaret(this.element),
				arg0 = arguments[0],
				value = this.element.value;

			if(arg0) {
				this.element.value = value.substring(0, caret.end) + arg0;
				Caret.setCaret(this.element, caret.start, caret.end);
				return this;
			} else {
				return value.substring(caret.end);//.replace(/ /g, '\xa0') || '\xa0'	
			}
		}
	};
	
	window.Caret = Caret;
})(window);
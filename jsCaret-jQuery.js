;(function(window, $) {
	window.Caret.prototype.endCaret = function() {
		return $(this.element);
	}

	$.fn.caret = function() {
		var $element = this,
		element = $element[0];

		var caretInstance;

		if(caretInstance = $.data($element, 'caret')) {
			return caretInstance;
		}	else {
			caretInstance = new Caret(element);
			caretInstance.endCaret = function() {
				return $element;
			}
			$.data($element, 'caret', caretInstance);
			return caretInstance;
		}
	}
})(window, jQuery);
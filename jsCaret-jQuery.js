;(function(window, $) {
	window.Caret.prototype.endCaret = function() {
		return this.$element;
	}

	$.fn.caret = function() {
		var element = this[0],
			$element = $(element);

		var caretInstance;

		if(caretInstance = $.data($element, 'caret')) {
			return caretInstance;
		} else {
			caretInstance = new Caret(element);
			caretInstance.$element = $element;

			$.data($element, 'caret', caretInstance);
			return caretInstance;
		}
	}
})(window, jQuery);
I recently tried to find solution how to handle a caret/pointer within textareas and inputs for our project. I have found a lot of code parts or unsatisfactory plugins. So my personal goal was to create a complex and universal jQuery plugin.

Here is the result of my trying.
It is first and early version which does what we need without any optimalization or deep thinking :)

## Usage

Getting of caret object.

	caret = new Caret(document.getElementById("text"))
	
or with jQuery extension

	caret = $('textarea').caret();

###Basic workflow with caret

* Set caret position
		
		// selection range
		caret.set({start:2, end:5});
		// or
		caret.set(2,5);
		// or
		caret.start(2).end(5);

		// pointer
		caret.set(2);

* Get caret position

		caret.get().start;
		=> 2
		caret.get().end;
		=> 5
		// or
		caret.start();
		=> 2
		caret.end();
		=> 5

###Work with text

* Selecting of text. (having text "before for select after")

		caret.select('for select');
		// or
		caret.select(/fo.*?ect/);
	result of both will be "before `for select` after"

* Reading of selected text or text before and after caret, or selection. (having result text from example before)

		caret.text();
		=> "for select"
		caret.before();
		=> "before "
		caret.after();
		=> " after"

* Inserting text (having save text "before `for select` after")

		caret.text("new text");
	result will be "before `new text` after"

		caret.insertBefore("inserted before ");
	result will be "before inserted before `new text` after"

		caret.insertAfter(" after inserted");
	result will be "before inserted before `new text` after inserted after"

		caret.before("new before ");
	result will be "new before `new text` after inserted after"

		caret.after(" new after");
	result will be "new before `new text` new after"	

###Notices

* Everything works with selection (from letter to letter) or pointer (at letter)
* Every settings or changings methods returns object itself (e.g. set(), text("t"), insertAfter("t") or after("t")) so you can easily **chain**

		caret.set(3,10).insertBefore("before text").after("after text")

* You can take it further and make complet jQuery chain using `endCaret()` (WHEN USING jQuery Extension)

		$('textarea').caret().set(3,10).text("new text").endCaret().style('font-size', '20px')

###Examples

There are two examples.

* **simple_example.html** It shows just how to get and set cursor/selection

* **custom_cursor.html** It is advanced example, where i replace default cursor with custom one (it is just graphic over, not system replace :) )

## Future

* Check correct functions in all browsers (currently tested in Chrome, FF5, FF8)
* Make versions for other frameworks (now only supported jQuery).



## Thanks to

This plugin grows from our needs.
Inspiration came from few resources.

[http://http://javascript.nwbox.com/cursor_position/](http://http://javascript.nwbox.com/cursor_position/)

[http://www.examplet.buss.hk/jquery/caret.php](http://www.examplet.buss.hk/jquery/caret.php)]

[http://code.google.com/p/jcaret/](http://code.google.com/p/jcaret/)

## Contribution

Feel free to make optimalization, tests or anything, what good plugin needs :)

Currently needs
* tests in other browsers
* make plugin for other frameworks

Contact me schovanec@schovi.cz





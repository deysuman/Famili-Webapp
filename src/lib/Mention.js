import $,{data} from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

import {_} from 'underscore'


(function(jQuery) {
  jQuery.fn.extend({
    elastic: function() {

      //	We will create a div clone of the DIV
      //	by copying these attributes from the DIV to the div.
      let mimics = [
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'marginTop',
        'marginRight',
        'marginBottom',
        'marginLeft',
        'fontSize',
        'lineHeight',
        'fontFamily',
        'width',
        'fontWeight',
        'border-top-width',
        'border-right-width',
        'border-bottom-width',
        'border-left-width',
        'borderTopStyle',
        'borderTopColor',
        'borderRightStyle',
        'borderRightColor',
        'borderBottomStyle',
        'borderBottomColor',
        'borderLeftStyle',
        'borderLeftColor',
        'box-sizing',
        '-moz-box-sizing',
        '-webkit-box-sizing'
      ];

      return this.each(function() {

        // Elastic only works on DIVs
        if (this.type !== 'DIV') {
          return false;
        }

        let $DIV = jQuery(this),
          $twin = jQuery('<div />').css({'position': 'absolute','display':'none','word-wrap':'break-word'}),
          lineHeight = parseInt($DIV.css('line-height'), 10) || parseInt($DIV.css('font-size'), '10'),
          minheight = parseInt($DIV.css('height'), 10) || lineHeight * 3,
          maxheight = parseInt($DIV.css('max-height'), 10) || Number.MAX_VALUE,
          goalheight = 0;

        // Opera returns max-height of -1 if not set
        if (maxheight < 0) {
          maxheight = Number.MAX_VALUE;
        }

        // Append the twin to the DOM
        // We are going to meassure the height of this, not the DIV.
        $twin.appendTo($DIV.parent());

        // Copy the essential styles (mimics) from the DIV to the twin
        let i = mimics.length;
        while (i--) {

          if (mimics[i].toString() === 'width' && $DIV.css(mimics[i].toString()) === '0px') {
            setTwinWidth();
          } else {
            $twin.css(mimics[i].toString(), $DIV.css(mimics[i].toString()));
          }
        }

        update(true);

        // Updates the width of the twin. (solution for DIVs with widths in percent)
        function setTwinWidth() {
          curatedWidth = Math.floor(parseInt($DIV.width(), 10));
          if ($twin.width() !== curatedWidth) {
            $twin.css({'width': curatedWidth + 'px'});

            // Update height of DIV
            update(true);
          }
        }

        // Sets a given height and overflow state on the DIV
        function setHeightAndOverflow(height, overflow) {

          let curratedHeight = Math.floor(parseInt(height, 10));
          if ($DIV.height() !== curratedHeight) {
            $DIV.css({'height': curratedHeight + 'px','overflow':overflow});

            // Fire the custom event resize
            $DIV.triggerHandler('resize');

          }
        }

        // This function will update the height of the DIV if necessary
        function update(forced) {

          // Get curated content from the DIV.
          let DIVContent = $DIV.text().replace(/&/g, '&amp;').replace(/ {2}/g, '&nbsp;').replace(/<|>/g, '&gt;').replace(/\n/g, '<br />');

          // Compare curated content with curated twin.
          let twinContent = $twin.html().replace(/<br>/ig, '<br />');

          if (forced || DIVContent + '&nbsp;' !== twinContent) {

            // Add an extra white space so new rows are added when you are at the end of a row.
            $twin.html(DIVContent + '&nbsp;');

            // Change DIV height if twin plus the height of one line differs more than 3 pixel from DIV height
            if (Math.abs($twin.outerHeight() + lineHeight - $DIV.outerHeight()) > 3) {

              let goalheight = $twin.outerHeight();
              if (goalheight >= maxheight) {
                setHeightAndOverflow(maxheight, 'auto');
              } else if (goalheight <= minheight) {
                setHeightAndOverflow(minheight, 'hidden');
              } else {
                setHeightAndOverflow(goalheight, 'hidden');
              }

            }

          }

        }

        // Update DIV size on keyup, change, cut and paste
        $DIV.bind('input', update);
        $DIV.bind('change', update);
        $(window).bind('resize', setTwinWidth);
      });

    }
  });
})(jQuery);


(function ($, _, undefined) {

  // Settings
  let KEY = { BACKSPACE : 8, TAB : 9, RETURN : 13, ESC : 27, LEFT : 37, UP : 38, RIGHT : 39, DOWN : 40, COMMA : 188, SPACE : 32, HOME : 36, END : 35 }; // Keys "enum"
  let defaultSettings = {
    triggerChar   : '@',
    onDataRequest : $.noop,
    minChars      : 2,
    showAvatars   : true,
    classes       : {
      autoCompleteItemActive : "active"
    },
    templates     : {
      wrapper                    : _.template('<div class="mentions-input-box"></div>'),
      autocompleteList           : _.template('<div class="mentions-autocomplete-list"></div>'),
      autocompleteListItem       : _.template('<li data-ref-id="<%= id %>" data-ref-type="<%= type %>" data-display="<%= display %>"><%= content %></li>'),
      autocompleteListItemAvatar : _.template('<img  src="<%= avatar %>" />'),
      autocompleteListItemIcon   : _.template('<div class="icon <%= icon %>"></div>'),
      mentionsOverlay            : _.template('<div class="mentions"><div></div></div>'),
      mentionItemSyntax          : _.template('@[<%= id %>]'),
      mentionItemHighlight       : _.template('<strong><span><%= value %></span></strong>')
    }
  };

  let utils = {
    htmlEncode       : function (str) {
      return _.escape(str);
    },
    highlightTerm    : function (value, term) {
      if (!term && !term.length) {
        return value;
      }
      return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
    },
    setCaratPosition : function (domNode, caretPos) {
      if (domNode.createTextRange) {
        let range = domNode.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else {
        if (domNode.selectionStart) {
          domNode.focus();
          domNode.setSelectionRange(caretPos, caretPos);
        } else {
          domNode.focus();
        }
      }
    },
    rtrim: function(string) {
      return string.replace(/\s+$/,"");
    }
  };

  let MentionsInput = function (input) {
    let settings;
    let elmInputBox, elmInputWrapper, elmAutocompleteList, elmWrapperBox, elmMentionsOverlay, elmActiveAutoCompleteItem;
    let mentionsCollection = [];
    let inputBuffer = [];
    let currentDataQuery;

    function initDIV() {
      elmInputBox = $(input);

      if (elmInputBox.attr('data-mentions-input') == 'true') {
        return;
      }

      elmInputWrapper = elmInputBox.parent();
      elmWrapperBox = $(settings.templates.wrapper());
      elmInputBox.wrapAll(elmWrapperBox);
      elmWrapperBox = elmInputWrapper.find('> div');

      elmInputBox.attr('data-mentions-input', 'true');
      document.getElementById("editable-boss").setAttribute('data-mentions-input', 'true');
      elmInputBox.bind('keydown', onInputBoxKeyDown);
      elmInputBox.bind('keypress', onInputBoxKeyPress);
      elmInputBox.bind('input', onInputBoxInput);
      elmInputBox.bind('click', onInputBoxClick);

      elmInputBox.elastic();
    }

    function initAutocomplete() {
      elmAutocompleteList = $(settings.templates.autocompleteList());
      elmAutocompleteList.appendTo(elmWrapperBox);
      elmAutocompleteList.delegate('li', 'click', onAutoCompleteItemClick);
    }

    function initMentionsOverlay() {
      elmMentionsOverlay = $(settings.templates.mentionsOverlay());
      elmMentionsOverlay.prependTo(elmWrapperBox);
    }

    function updateValues2() {
      let syntaxMessage = getInputBoxValue();

      _.each(mentionsCollection, function (mention) {
        let textSyntax = settings.templates.mentionItemSyntax({ value : mention.value, type : mention.type, id : mention.id });
        syntaxMessage = syntaxMessage.replace(mention.value, textSyntax);
      });

      let mentionText = utils.htmlEncode(syntaxMessage);

      _.each(mentionsCollection, function (mention) {
        let textSyntax = settings.templates.mentionItemSyntax({ value : utils.htmlEncode(mention.value), type : mention.type, id : mention.id });
        let textHighlight = settings.templates.mentionItemHighlight({ value : utils.htmlEncode(mention.value) });

        mentionText = mentionText.replace(textSyntax, textHighlight);
      });

      mentionText = mentionText.replace(/\n/g, '<br />');
      mentionText = mentionText.replace(/ {2}/g, '&nbsp;');

      elmInputBox.data('messageText', syntaxMessage);
      $("#editable-boss").data('messageText', syntaxMessage)
      elmMentionsOverlay.find('div').html(mentionText);
    }

    function updateValues() {
      let syntaxMessage = getInputBoxvalue();

      _.each(mentionsCollection, function (mention) {
        let textSyntax = settings.templates.mentionItemSyntax({ value : mention.value, type : mention.type, id : mention.id });
        syntaxMessage = syntaxMessage.replace(mention.value, textSyntax);
      });

      let mentionText = utils.htmlEncode(syntaxMessage);

      _.each(mentionsCollection, function (mention) {
        let textSyntax = settings.templates.mentionItemSyntax({ value : utils.htmlEncode(mention.value), type : mention.type, id : mention.id });
        let textHighlight = settings.templates.mentionItemHighlight({ value : utils.htmlEncode(mention.value) });

        mentionText = mentionText.replace(textSyntax, textHighlight);
      });

      mentionText = mentionText.replace(/\n/g, '<br />');
      mentionText = mentionText.replace(/ {2}/g, '&nbsp;');

      elmInputBox.data('messageText', syntaxMessage);
      $("#editable-boss").data('messageText', syntaxMessage)
      elmMentionsOverlay.find('div').html(mentionText);
    }

    function resetBuffer() {
      inputBuffer = [];
    }

    function updateMentionsCollection() {
      let inputText = getInputBoxValue();

      mentionsCollection = _.reject(mentionsCollection, function (mention, index) {
        return !mention.value || inputText.indexOf(mention.value) == -1;
      });
      mentionsCollection = _.compact(mentionsCollection);
    }

    function addMention(value, id, type) {
      let currentMessage = getInputBoxValue();
        
      // Using a regex to figure out positions
      let regex = new RegExp("\\" + settings.triggerChar + currentDataQuery, "gi");
      regex.exec(currentMessage);

      let startCaretPosition = regex.lastIndex - currentDataQuery.length - 1;
      let currentCaretPosition = regex.lastIndex;
      


      let start = currentMessage.substr(0, startCaretPosition);

      let end = currentMessage.substr(currentCaretPosition, currentMessage.length);
      let startEndIndex = (start + value).length;


      let updatedMessageText = start + value + end;

      mentionsCollection.push({
        id    : id,
        type  : type,
        value : value
      });

      // Cleaning before inserting the value, otherwise auto-complete would be triggered with "old" inputbuffer
      resetBuffer();
      currentDataQuery = '';
      hideAutoComplete();

      // Mentions & syntax message
      elmInputBox.text(updatedMessageText);


      updateValues();
      updateValues2();

      elmInputBox.focus();
      elmInputBox.caretToEnd();

      let keyboardEvent = document.createEvent("KeyboardEvent");

      let initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
      keyboardEvent[initMethod](
                       "keydown",
                        true,      // bubbles oOooOOo0
                        true,      // cancelable
                        window,    // view
                        false,     // ctrlKeyArg
                        false,     // altKeyArg
                        false,     // shiftKeyArg
                        false,     // metaKeyArg
                        72,
                        0          // charCode
      );

     document.getElementsByClassName("emojionearea-editor")[0].dispatchEvent(keyboardEvent);

     document.getElementsByClassName("emojionearea-editor")[0].dispatchEvent(keyboardEvent);

      // Set correct focus and selection
      elmInputBox.focus();
      elmInputBox.caretToEnd();
      //utils.setCaratPosition(elmInputBox, startEndIndex);

      placeCaretAtEnd(document.getElementsByClassName("emojionearea-editor")[0]);

      document.getElementsByClassName("emojionearea-editor")[0].dispatchEvent(keyboardEvent);



    }

    function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

    function getInputBoxValue() {
      return $.trim($(".emojionearea-editor").text());
    }

    function getInputBoxvalue() {
      return $.trim(document.getElementById("editable-boss").textContent);
    }


    function triggerEvent(el, type, keyCode) {
        if ('createEvent' in document) {
            // modern browsers, IE9+
            let e = document.createEvent('HTMLEvents');
            e.keyCode = keyCode;
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        } else {
        // IE 8
          let e = document.createEventObject();
          e.keyCode = keyCode;
          e.eventType = type;
          el.fireEvent('on'+e.eventType, e);
        }
       }


    function onAutoCompleteItemClick(e) {
      let elmTarget = $(this);

      addMention(elmTarget.attr('data-display'), elmTarget.attr('data-ref-id'), elmTarget.attr('data-ref-type'));

      var nextButton = document.getElementsByClassName('emojionearea-editor')[0];
      triggerEvent(nextButton, 'keyup', 13);

      return false;
    }

    function onInputBoxClick(e) {
      resetBuffer();
    }

    function onInputBoxInput(e) {
      updateValues();
      updateMentionsCollection();
      hideAutoComplete();

      let triggerCharIndex = _.lastIndexOf(inputBuffer, settings.triggerChar);
      if (triggerCharIndex > -1) {
        currentDataQuery = inputBuffer.slice(triggerCharIndex + 1).join('');
        currentDataQuery = utils.rtrim(currentDataQuery);

        _.defer(_.bind(doSearch, this, currentDataQuery));
      }
    }

    function onInputBoxKeyPress(e) {
      let typedValue = String.fromCharCode(e.which || e.keyCode);
      inputBuffer.push(typedValue);
    }

    function onInputBoxKeyDown(e) {

      // This also matches HOME/END on OSX which is CMD+LEFT, CMD+RIGHT
      if (e.keyCode == KEY.LEFT || e.keyCode == KEY.RIGHT || e.keyCode == KEY.HOME || e.keyCode == KEY.END) {
        // Defer execution to ensure carat pos has changed after HOME/END keys
        _.defer(resetBuffer);
        return;
      }

      if (e.keyCode == KEY.BACKSPACE) {
        inputBuffer = inputBuffer.slice(0, -1 + inputBuffer.length); // Can't use splice, not available in IE
        return;
      }

      if (!elmAutocompleteList.is(':visible')) {
        return true;
      }

      switch (e.keyCode) {
        case KEY.UP:
        case KEY.DOWN:
          let elmCurrentAutoCompleteItem = null;
          if (e.keyCode == KEY.DOWN) {
            if (elmActiveAutoCompleteItem && elmActiveAutoCompleteItem.length) {
              elmCurrentAutoCompleteItem = elmActiveAutoCompleteItem.next();
            } else {
              elmCurrentAutoCompleteItem = elmAutocompleteList.find('li').first();
            }
          } else {
            elmCurrentAutoCompleteItem = $(elmActiveAutoCompleteItem).prev();
          }

          if (elmCurrentAutoCompleteItem.length) {
            selectAutoCompleteItem(elmCurrentAutoCompleteItem);
          }

          return false;

        case KEY.RETURN:
        case KEY.TAB:
          if (elmActiveAutoCompleteItem && elmActiveAutoCompleteItem.length) {
            elmActiveAutoCompleteItem.click();
            return false;
          }

          break;
      }

      return true;
    }

    function hideAutoComplete() {
      elmActiveAutoCompleteItem = null;
      elmAutocompleteList.empty().hide();
    }

    function selectAutoCompleteItem(elmItem) {
        //let Ge = document.getElementById('editable-boss');

      elmItem.addClass(settings.classes.autoCompleteItemActive);
      elmItem.siblings().removeClass(settings.classes.autoCompleteItemActive);

      elmActiveAutoCompleteItem = elmItem;
    }

    function populateDropdown(query, results) {
      elmAutocompleteList.show();

      // Filter items that has already been mentioned
      let mentionValues = _.pluck(mentionsCollection, 'value');
      results = _.reject(results, function (item) {
        return _.include(mentionValues, item.name);
      });

      if (!results.length) {
        hideAutoComplete();
        return;
      }

      elmAutocompleteList.empty();
      let elmDropDownList = $("<ul>").appendTo(elmAutocompleteList).hide();

      _.each(results, function (item, index) {
        let elmListItem = $(settings.templates.autocompleteListItem({
          'id'      : utils.htmlEncode(item.id),
          'display' : utils.htmlEncode(item.name),
          'type'    : utils.htmlEncode(item.type),
          'content' : utils.highlightTerm(utils.htmlEncode((item.name)), query)
        }));

        if (index === 0) {
          selectAutoCompleteItem(elmListItem);
        }

        if (settings.showAvatars) {
          let elmIcon;

          if (item.avatar) {
            elmIcon = $(settings.templates.autocompleteListItemAvatar({ avatar : item.avatar }));
          } else {
            elmIcon = $(settings.templates.autocompleteListItemIcon({ icon : item.icon }));
          }
          elmIcon.prependTo(elmListItem);
        }
        elmListItem = elmListItem.appendTo(elmDropDownList);
      });

      elmAutocompleteList.show();
      elmDropDownList.show();
    }

    function doSearch(query) {
      if (query && query.length && query.length >= settings.minChars) {
        settings.onDataRequest.call(this, 'search', query, function (responseData) {
          populateDropdown(query, responseData);
        });
      }
    }

    // Public methods
    return {
      init : function (options) {
        settings = options;

        initDIV();

        initAutocomplete();
        initMentionsOverlay();


      },

      val : function (callback) {
        if (!_.isFunction(callback)) {
          return;
        }

        let value = mentionsCollection.length ? elmInputBox.data('messageText') : getInputBoxValue();
        callback.call(this, value);
      },

      con : function (callback) {
        if (!_.isFunction(callback)) {
          return;
        }

        let value = mentionsCollection.length ? $("#editable-boss").data('messageText') : getInputBoxvalue();
        callback.call(this, value);
      },

      reset : function () {
        document.getElementById("editable-boss").textContent = "";
        document.getElementsByClassName("emojionearea-editor")[0].textContent = "";
        mentionsCollection = [];

        updateValues();
        updateValues2();
      },

      getMentions : function (callback) {
        if (!_.isFunction(callback)) {
          return;
        }

        callback.call(this, mentionsCollection);
      }
    };
  };

  $.fn.mentionsInput = function (method, settings) {

    if (typeof method === 'object' || !method) {
      settings = $.extend(true, {}, defaultSettings, method);
    }

    let outerArguments = arguments;

    return this.each(function () {
      let instance = $.data(this, 'mentionsInput') || $.data(this, 'mentionsInput', new MentionsInput(this));

      if (_.isFunction(instance[method])) {
        return instance[method].apply(this, Array.prototype.slice.call(outerArguments, 1));

      } else if (typeof method === 'object' || !method) {
        return instance.init.call(this, settings);

      } else {
        $.error('Method ' + method + ' does not exist');
      }

    });
  };

})(jQuery, _);


(function ($) {
    // Behind the scenes method deals with browser
    // idiosyncrasies and such
    $.caretTo = function (el, index) {
        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move("character", index);
            range.select();
        } else if (el.selectionStart != null) {
            el.focus();
            el.setSelectionRange(index, index);
        }
    };

    // The following methods are queued under fx for more
    // flexibility when combining with $.fn.delay() and
    // jQuery effects.

    // Set caret to a particular index
    $.fn.caretTo = function (index, offset) {
        return this.queue(function (next) {
            if (isNaN(index)) {
                var i = $(this).val().indexOf(index);

                if (offset === true) {
                    i += index.length;
                } else if (offset) {
                    i += offset;
                }

                $.caretTo(this, i);
            } else {
                $.caretTo(this, index);
            }

            next();
        });
    };

    // Set caret to beginning of an element
    $.fn.caretToStart = function () {
        return this.caretTo(0);
    };

    // Set caret to the end of an element
    $.fn.caretToEnd = function () {
        return this.queue(function (next) {
            $.caretTo(this, $(this).val().length);
            next();
        });
    };
}(jQuery));

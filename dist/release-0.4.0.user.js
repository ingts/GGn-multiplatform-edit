// ==UserScript==
// @name        GGn-multiplatform-edit
// @description Easily copy collections, web links and tags to linked groups
// @namespace   https://gazellegames.net/
// @require     https://unpkg.com/react@18/umd/react.development.js
// @require     https://unpkg.com/react-dom@18/umd/react-dom.development.js
// @match       https://gazellegames.net/torrents.php?id=*
// @version     0.4.0
// @author      someone
// @license     MIT
// @grant       GM.xmlHttpRequest
// ==/UserScript==

/*
ISC License

Copyright (c) 2023 someone

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
*/

/* globals React, ReactDOM */
var rollupUserScript = (function (React, require$$0) {
  'use strict';

  function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

  var jsxRuntime = {exports: {}};

  var reactJsxRuntime_production_min = {};

  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f$1 = React,
    k$1 = Symbol.for("react.element"),
    l$1 = Symbol.for("react.fragment"),
    m$2 = Object.prototype.hasOwnProperty,
    n$1 = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    p$1 = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    };
  function q$1(c, a, g) {
    var b,
      d = {},
      e = null,
      h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m$2.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return {
      $$typeof: k$1,
      type: c,
      key: e,
      ref: h,
      props: d,
      _owner: n$1.current
    };
  }
  reactJsxRuntime_production_min.Fragment = l$1;
  reactJsxRuntime_production_min.jsx = q$1;
  reactJsxRuntime_production_min.jsxs = q$1;

  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;

  /*

  Based off glamor's StyleSheet, thanks Sunil ❤️

  high performance StyleSheet for css-in-js systems

  - uses multiple style tags behind the scenes for millions of rules
  - uses `insertRule` for appending in production for *much* faster performance

  // usage

  import { StyleSheet } from '@emotion/sheet'

  let styleSheet = new StyleSheet({ key: '', container: document.head })

  styleSheet.insert('#box { border: 1px solid red; }')
  - appends a css rule into the stylesheet

  styleSheet.flush()
  - empties the stylesheet of all its contents

  */
  // $FlowFixMe
  function sheetForTag(tag) {
    if (tag.sheet) {
      // $FlowFixMe
      return tag.sheet;
    } // this weirdness brought to you by firefox

    /* istanbul ignore next */

    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        // $FlowFixMe
        return document.styleSheets[i];
      }
    }
  }
  function createStyleElement(options) {
    var tag = document.createElement('style');
    tag.setAttribute('data-emotion', options.key);
    if (options.nonce !== undefined) {
      tag.setAttribute('nonce', options.nonce);
    }
    tag.appendChild(document.createTextNode(''));
    tag.setAttribute('data-s', '');
    return tag;
  }
  var StyleSheet = /*#__PURE__*/function () {
    // Using Node instead of HTMLElement since container may be a ShadowRoot
    function StyleSheet(options) {
      var _this = this;
      this._insertTag = function (tag) {
        var before;
        if (_this.tags.length === 0) {
          if (_this.insertionPoint) {
            before = _this.insertionPoint.nextSibling;
          } else if (_this.prepend) {
            before = _this.container.firstChild;
          } else {
            before = _this.before;
          }
        } else {
          before = _this.tags[_this.tags.length - 1].nextSibling;
        }
        _this.container.insertBefore(tag, before);
        _this.tags.push(tag);
      };
      this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
      this.tags = [];
      this.ctr = 0;
      this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

      this.key = options.key;
      this.container = options.container;
      this.prepend = options.prepend;
      this.insertionPoint = options.insertionPoint;
      this.before = null;
    }
    var _proto = StyleSheet.prototype;
    _proto.hydrate = function hydrate(nodes) {
      nodes.forEach(this._insertTag);
    };
    _proto.insert = function insert(rule) {
      // the max length is how many rules we have per style tag, it's 65000 in speedy mode
      // it's 1 in dev because we insert source maps that map a single rule to a location
      // and you can only have one source map per style tag
      if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
        this._insertTag(createStyleElement(this));
      }
      var tag = this.tags[this.tags.length - 1];
      if (this.isSpeedy) {
        var sheet = sheetForTag(tag);
        try {
          // this is the ultrafast version, works across browsers
          // the big drawback is that the css won't be editable in devtools
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }
      this.ctr++;
    };
    _proto.flush = function flush() {
      // $FlowFixMe
      this.tags.forEach(function (tag) {
        return tag.parentNode && tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
    };
    return StyleSheet;
  }();

  var MS = '-ms-';
  var MOZ = '-moz-';
  var WEBKIT = '-webkit-';
  var COMMENT = 'comm';
  var RULESET = 'rule';
  var DECLARATION = 'decl';
  var IMPORT = '@import';
  var KEYFRAMES = '@keyframes';
  var LAYER = '@layer';

  /**
   * @param {number}
   * @return {number}
   */
  var abs = Math.abs;

  /**
   * @param {number}
   * @return {string}
   */
  var from = String.fromCharCode;

  /**
   * @param {object}
   * @return {object}
   */
  var assign = Object.assign;

  /**
   * @param {string} value
   * @param {number} length
   * @return {number}
   */
  function hash(value, length) {
    return charat(value, 0) ^ 45 ? (((length << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
  }

  /**
   * @param {string} value
   * @return {string}
   */
  function trim(value) {
    return value.trim();
  }

  /**
   * @param {string} value
   * @param {RegExp} pattern
   * @return {string?}
   */
  function match(value, pattern) {
    return (value = pattern.exec(value)) ? value[0] : value;
  }

  /**
   * @param {string} value
   * @param {(string|RegExp)} pattern
   * @param {string} replacement
   * @return {string}
   */
  function replace(value, pattern, replacement) {
    return value.replace(pattern, replacement);
  }

  /**
   * @param {string} value
   * @param {string} search
   * @return {number}
   */
  function indexof(value, search) {
    return value.indexOf(search);
  }

  /**
   * @param {string} value
   * @param {number} index
   * @return {number}
   */
  function charat(value, index) {
    return value.charCodeAt(index) | 0;
  }

  /**
   * @param {string} value
   * @param {number} begin
   * @param {number} end
   * @return {string}
   */
  function substr(value, begin, end) {
    return value.slice(begin, end);
  }

  /**
   * @param {string} value
   * @return {number}
   */
  function strlen(value) {
    return value.length;
  }

  /**
   * @param {any[]} value
   * @return {number}
   */
  function sizeof(value) {
    return value.length;
  }

  /**
   * @param {any} value
   * @param {any[]} array
   * @return {any}
   */
  function append(value, array) {
    return array.push(value), value;
  }

  /**
   * @param {string[]} array
   * @param {function} callback
   * @return {string}
   */
  function combine(array, callback) {
    return array.map(callback).join('');
  }

  var line = 1;
  var column = 1;
  var length = 0;
  var position = 0;
  var character = 0;
  var characters = '';

  /**
   * @param {string} value
   * @param {object | null} root
   * @param {object | null} parent
   * @param {string} type
   * @param {string[] | string} props
   * @param {object[] | string} children
   * @param {number} length
   */
  function node(value, root, parent, type, props, children, length) {
    return {
      value: value,
      root: root,
      parent: parent,
      type: type,
      props: props,
      children: children,
      line: line,
      column: column,
      length: length,
      return: ''
    };
  }

  /**
   * @param {object} root
   * @param {object} props
   * @return {object}
   */
  function copy(root, props) {
    return assign(node('', null, null, '', null, null, 0), root, {
      length: -root.length
    }, props);
  }

  /**
   * @return {number}
   */
  function char() {
    return character;
  }

  /**
   * @return {number}
   */
  function prev() {
    character = position > 0 ? charat(characters, --position) : 0;
    if (column--, character === 10) column = 1, line--;
    return character;
  }

  /**
   * @return {number}
   */
  function next() {
    character = position < length ? charat(characters, position++) : 0;
    if (column++, character === 10) column = 1, line++;
    return character;
  }

  /**
   * @return {number}
   */
  function peek() {
    return charat(characters, position);
  }

  /**
   * @return {number}
   */
  function caret() {
    return position;
  }

  /**
   * @param {number} begin
   * @param {number} end
   * @return {string}
   */
  function slice(begin, end) {
    return substr(characters, begin, end);
  }

  /**
   * @param {number} type
   * @return {number}
   */
  function token(type) {
    switch (type) {
      // \0 \t \n \r \s whitespace token
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      // ! + , / > @ ~ isolate token
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      // ; { } breakpoint token
      case 59:
      case 123:
      case 125:
        return 4;
      // : accompanied token
      case 58:
        return 3;
      // " ' ( [ opening delimit token
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      // ) ] closing delimit token
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }

  /**
   * @param {string} value
   * @return {any[]}
   */
  function alloc(value) {
    return line = column = 1, length = strlen(characters = value), position = 0, [];
  }

  /**
   * @param {any} value
   * @return {any}
   */
  function dealloc(value) {
    return characters = '', value;
  }

  /**
   * @param {number} type
   * @return {string}
   */
  function delimit(type) {
    return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
  }

  /**
   * @param {number} type
   * @return {string}
   */
  function whitespace(type) {
    while (character = peek()) if (character < 33) next();else break;
    return token(type) > 2 || token(character) > 3 ? '' : ' ';
  }

  /**
   * @param {number} index
   * @param {number} count
   * @return {string}
   */
  function escaping(index, count) {
    while (--count && next())
    // not 0-9 A-F a-f
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
    return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
  }

  /**
   * @param {number} type
   * @return {number}
   */
  function delimiter(type) {
    while (next()) switch (character) {
      // ] ) " '
      case type:
        return position;
      // " '
      case 34:
      case 39:
        if (type !== 34 && type !== 39) delimiter(character);
        break;
      // (
      case 40:
        if (type === 41) delimiter(type);
        break;
      // \
      case 92:
        next();
        break;
    }
    return position;
  }

  /**
   * @param {number} type
   * @param {number} index
   * @return {number}
   */
  function commenter(type, index) {
    while (next())
    // //
    if (type + character === 47 + 10) break;
    // /*
    else if (type + character === 42 + 42 && peek() === 47) break;
    return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next());
  }

  /**
   * @param {number} index
   * @return {string}
   */
  function identifier(index) {
    while (!token(peek())) next();
    return slice(index, position);
  }

  /**
   * @param {string} value
   * @return {object[]}
   */
  function compile(value) {
    return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value));
  }

  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {string[]} rule
   * @param {string[]} rules
   * @param {string[]} rulesets
   * @param {number[]} pseudo
   * @param {number[]} points
   * @param {string[]} declarations
   * @return {object}
   */
  function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index = 0;
    var offset = 0;
    var length = pseudo;
    var atrule = 0;
    var property = 0;
    var previous = 0;
    var variable = 1;
    var scanning = 1;
    var ampersand = 1;
    var character = 0;
    var type = '';
    var props = rules;
    var children = rulesets;
    var reference = rule;
    var characters = type;
    while (scanning) switch (previous = character, character = next()) {
      // (
      case 40:
        if (previous != 108 && charat(characters, length - 1) == 58) {
          if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f') != -1) ampersand = -1;
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        characters += delimit(character);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        characters += whitespace(previous);
        break;
      // \
      case 92:
        characters += escaping(caret() - 1, 7);
        continue;
      // /
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters += '/';
        }
        break;
      // {
      case 123 * variable:
        points[index++] = strlen(characters) * ampersand;
      // } ; \0
      case 125 * variable:
      case 59:
      case 0:
        switch (character) {
          // \0 }
          case 0:
          case 125:
            scanning = 0;
          // ;
          case 59 + offset:
            if (ampersand == -1) characters = replace(characters, /\f/g, '');
            if (property > 0 && strlen(characters) - length) append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2), declarations);
            break;
          // @ ;
          case 59:
            characters += ';';
          // { rule/at-rule
          default:
            append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);
            if (character === 123) if (offset === 0) parse(characters, root, reference, reference, props, rulesets, length, points, children);else switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
              // d l m s
              case 100:
              case 108:
              case 109:
              case 115:
                parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
                break;
              default:
                parse(characters, reference, reference, reference, [''], children, 0, points, children);
            }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
        break;
      // :
      case 58:
        length = 1 + strlen(characters), property = previous;
      default:
        if (variable < 1) if (character == 123) --variable;else if (character == 125 && variable++ == 0 && prev() == 125) continue;
        switch (characters += from(character), character * variable) {
          // &
          case 38:
            ampersand = offset > 0 ? 1 : (characters += '\f', -1);
            break;
          // ,
          case 44:
            points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
            break;
          // @
          case 64:
            // -
            if (peek() === 45) characters += delimit(next());
            atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
            break;
          // -
          case 45:
            if (previous === 45 && strlen(characters) == 2) variable = 0;
        }
    }
    return rulesets;
  }

  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {number} index
   * @param {number} offset
   * @param {string[]} rules
   * @param {number[]} points
   * @param {string} type
   * @param {string[]} props
   * @param {string[]} children
   * @param {number} length
   * @return {object}
   */
  function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length) {
    var post = offset - 1;
    var rule = offset === 0 ? rules : [''];
    var size = sizeof(rule);
    for (var i = 0, j = 0, k = 0; i < index; ++i) for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;
    return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length);
  }

  /**
   * @param {number} value
   * @param {object} root
   * @param {object?} parent
   * @return {object}
   */
  function comment(value, root, parent) {
    return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
  }

  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {number} length
   * @return {object}
   */
  function declaration(value, root, parent, length) {
    return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length);
  }

  /**
   * @param {object[]} children
   * @param {function} callback
   * @return {string}
   */
  function serialize(children, callback) {
    var output = '';
    var length = sizeof(children);
    for (var i = 0; i < length; i++) output += callback(children[i], i, children, callback) || '';
    return output;
  }

  /**
   * @param {object} element
   * @param {number} index
   * @param {object[]} children
   * @param {function} callback
   * @return {string}
   */
  function stringify(element, index, children, callback) {
    switch (element.type) {
      case LAYER:
        if (element.children.length) break;
      case IMPORT:
      case DECLARATION:
        return element.return = element.return || element.value;
      case COMMENT:
        return '';
      case KEYFRAMES:
        return element.return = element.value + '{' + serialize(element.children, callback) + '}';
      case RULESET:
        element.value = element.props.join(',');
    }
    return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : '';
  }

  /**
   * @param {function[]} collection
   * @return {function}
   */
  function middleware(collection) {
    var length = sizeof(collection);
    return function (element, index, children, callback) {
      var output = '';
      for (var i = 0; i < length; i++) output += collection[i](element, index, children, callback) || '';
      return output;
    };
  }

  /**
   * @param {function} callback
   * @return {function}
   */
  function rulesheet(callback) {
    return function (element) {
      if (!element.root) if (element = element.return) callback(element);
    };
  }

  var weakMemoize = function weakMemoize(func) {
    // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
    var cache = new WeakMap();
    return function (arg) {
      if (cache.has(arg)) {
        // $FlowFixMe
        return cache.get(arg);
      }
      var ret = func(arg);
      cache.set(arg, ret);
      return ret;
    };
  };

  function memoize(fn) {
    var cache = Object.create(null);
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  }

  var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
    var previous = 0;
    var character = 0;
    while (true) {
      previous = character;
      character = peek(); // &\f

      if (previous === 38 && character === 12) {
        points[index] = 1;
      }
      if (token(character)) {
        break;
      }
      next();
    }
    return slice(begin, position);
  };
  var toRules = function toRules(parsed, points) {
    // pretend we've started with a comma
    var index = -1;
    var character = 44;
    do {
      switch (token(character)) {
        case 0:
          // &\f
          if (character === 38 && peek() === 12) {
            // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
            // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
            // and when it should just concatenate the outer and inner selectors
            // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
            points[index] = 1;
          }
          parsed[index] += identifierWithPointTracking(position - 1, points, index);
          break;
        case 2:
          parsed[index] += delimit(character);
          break;
        case 4:
          // comma
          if (character === 44) {
            // colon
            parsed[++index] = peek() === 58 ? '&\f' : '';
            points[index] = parsed[index].length;
            break;
          }

        // fallthrough

        default:
          parsed[index] += from(character);
      }
    } while (character = next());
    return parsed;
  };
  var getRules = function getRules(value, points) {
    return dealloc(toRules(alloc(value), points));
  }; // WeakSet would be more appropriate, but only WeakMap is supported in IE11

  var fixedElements = /* #__PURE__ */new WeakMap();
  var compat = function compat(element) {
    if (element.type !== 'rule' || !element.parent ||
    // positive .length indicates that this rule contains pseudo
    // negative .length indicates that this rule has been already prefixed
    element.length < 1) {
      return;
    }
    var value = element.value,
      parent = element.parent;
    var isImplicitRule = element.column === parent.column && element.line === parent.line;
    while (parent.type !== 'rule') {
      parent = parent.parent;
      if (!parent) return;
    } // short-circuit for the simplest case

    if (element.props.length === 1 && value.charCodeAt(0) !== 58
    /* colon */ && !fixedElements.get(parent)) {
      return;
    } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
    // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"

    if (isImplicitRule) {
      return;
    }
    fixedElements.set(element, true);
    var points = [];
    var rules = getRules(value, points);
    var parentRules = parent.props;
    for (var i = 0, k = 0; i < rules.length; i++) {
      for (var j = 0; j < parentRules.length; j++, k++) {
        element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
      }
    }
  };
  var removeLabel = function removeLabel(element) {
    if (element.type === 'decl') {
      var value = element.value;
      if (
      // charcode for l
      value.charCodeAt(0) === 108 &&
      // charcode for b
      value.charCodeAt(2) === 98) {
        // this ignores label
        element["return"] = '';
        element.value = '';
      }
    }
  };

  /* eslint-disable no-fallthrough */

  function prefix(value, length) {
    switch (hash(value, length)) {
      // color-adjust
      case 5103:
        return WEBKIT + 'print-' + value + value;
      // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return WEBKIT + value + value;
      // appearance, user-select, transform, hyphens, text-size-adjust

      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return WEBKIT + value + MOZ + value + MS + value + value;
      // flex, flex-direction

      case 6828:
      case 4268:
        return WEBKIT + value + MS + value + value;
      // order

      case 6165:
        return WEBKIT + value + MS + 'flex-' + value + value;
      // align-items

      case 5187:
        return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value;
      // align-self

      case 5443:
        return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/, '') + value;
      // align-content

      case 4675:
        return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/, '') + value;
      // flex-shrink

      case 5548:
        return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
      // flex-basis

      case 5292:
        return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value;
      // flex-grow

      case 6060:
        return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value;
      // transition

      case 4554:
        return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value;
      // cursor

      case 6187:
        return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value;
      // background, background-image

      case 5495:
      case 3959:
        return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1');
      // justify-content

      case 4968:
        return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value;
      // (margin|padding)-inline-(start|end)

      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
      // (min|max)?(width|height|inline-size|block-size)

      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        // stretch, max-content, min-content, fill-available
        if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            // -
            if (charat(value, length + 4) !== 45) break;
          // (f)ill-available, (f)it-content

          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
          // (s)tretch

          case 115:
            return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length) + value : value;
        }
        break;
      // position: sticky

      case 4949:
        // (s)ticky?
        if (charat(value, length + 1) !== 115) break;
      // display: (flex|inline-flex)

      case 6444:
        switch (charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
          // stic(k)y
          case 107:
            return replace(value, ':', ':' + WEBKIT) + value;
          // (inline-)?fl(e)x

          case 101:
            return replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value;
        }
        break;
      // writing-mode

      case 5936:
        switch (charat(value, length + 11)) {
          // vertical-l(r)
          case 114:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
          // vertical-r(l)

          case 108:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
          // horizontal(-)tb

          case 45:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
        }
        return WEBKIT + value + MS + value + value;
    }
    return value;
  }
  var prefixer = function prefixer(element, index, children, callback) {
    if (element.length > -1) if (!element["return"]) switch (element.type) {
      case DECLARATION:
        element["return"] = prefix(element.value, element.length);
        break;
      case KEYFRAMES:
        return serialize([copy(element, {
          value: replace(element.value, '@', '@' + WEBKIT)
        })], callback);
      case RULESET:
        if (element.length) return combine(element.props, function (value) {
          switch (match(value, /(::plac\w+|:read-\w+)/)) {
            // :read-(only|write)
            case ':read-only':
            case ':read-write':
              return serialize([copy(element, {
                props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]
              })], callback);
            // :placeholder

            case '::placeholder':
              return serialize([copy(element, {
                props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]
              })], callback);
          }
          return '';
        });
    }
  };
  var isBrowser$3 = typeof document !== 'undefined';
  var getServerStylisCache = isBrowser$3 ? undefined : weakMemoize(function () {
    return memoize(function () {
      var cache = {};
      return function (name) {
        return cache[name];
      };
    });
  });
  var defaultStylisPlugins = [prefixer];
  var createCache = function createCache(options) {
    var key = options.key;
    if (isBrowser$3 && key === 'css') {
      var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
      // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
      // note this very very intentionally targets all style elements regardless of the key to ensure
      // that creating a cache works inside of render of a React component

      Array.prototype.forEach.call(ssrStyles, function (node) {
        // we want to only move elements which have a space in the data-emotion attribute value
        // because that indicates that it is an Emotion 11 server-side rendered style elements
        // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
        // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
        // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
        // will not result in the Emotion 10 styles being destroyed
        var dataEmotionAttribute = node.getAttribute('data-emotion');
        if (dataEmotionAttribute.indexOf(' ') === -1) {
          return;
        }
        document.head.appendChild(node);
        node.setAttribute('data-s', '');
      });
    }
    var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
    var inserted = {};
    var container;
    var nodesToHydrate = [];
    if (isBrowser$3) {
      container = options.container || document.head;
      Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
        var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node);
      });
    }
    var _insert;
    var omnipresentPlugins = [compat, removeLabel];
    if (isBrowser$3) {
      var currentSheet;
      var finalizingPlugins = [stringify, rulesheet(function (rule) {
        currentSheet.insert(rule);
      })];
      var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
      var stylis = function stylis(styles) {
        return serialize(compile(styles), serializer);
      };
      _insert = function insert(selector, serialized, sheet, shouldCache) {
        currentSheet = sheet;
        stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
        if (shouldCache) {
          cache.inserted[serialized.name] = true;
        }
      };
    } else {
      var _finalizingPlugins = [stringify];
      var _serializer = middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));
      var _stylis = function _stylis(styles) {
        return serialize(compile(styles), _serializer);
      }; // $FlowFixMe

      var serverStylisCache = getServerStylisCache(stylisPlugins)(key);
      var getRules = function getRules(selector, serialized) {
        var name = serialized.name;
        if (serverStylisCache[name] === undefined) {
          serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
        }
        return serverStylisCache[name];
      };
      _insert = function _insert(selector, serialized, sheet, shouldCache) {
        var name = serialized.name;
        var rules = getRules(selector, serialized);
        if (cache.compat === undefined) {
          // in regular mode, we don't set the styles on the inserted cache
          // since we don't need to and that would be wasting memory
          // we return them so that they are rendered in a style tag
          if (shouldCache) {
            cache.inserted[name] = true;
          }
          return rules;
        } else {
          // in compat mode, we put the styles on the inserted cache so
          // that emotion-server can pull out the styles
          // except when we don't want to cache it which was in Global but now
          // is nowhere but we don't want to do a major right now
          // and just in case we're going to leave the case here
          // it's also not affecting client side bundle size
          // so it's really not a big deal
          if (shouldCache) {
            cache.inserted[name] = rules;
          } else {
            return rules;
          }
        }
      };
    }
    var cache = {
      key: key,
      sheet: new StyleSheet({
        key: key,
        container: container,
        nonce: options.nonce,
        speedy: options.speedy,
        prepend: options.prepend,
        insertionPoint: options.insertionPoint
      }),
      nonce: options.nonce,
      inserted: inserted,
      registered: {},
      insert: _insert
    };
    cache.sheet.hydrate(nodesToHydrate);
    return cache;
  };

  var reactIs$1 = {exports: {}};

  var reactIs_production_min = {};

  /** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m$1 = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117,
    x = b ? Symbol.for("react.responder") : 60118,
    y = b ? Symbol.for("react.scope") : 60119;
  function z(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m$1:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t:
                case r:
                case h:
                  return a;
                default:
                  return u;
              }
          }
        case d:
          return u;
      }
    }
  }
  function A(a) {
    return z(a) === m$1;
  }
  reactIs_production_min.AsyncMode = l;
  reactIs_production_min.ConcurrentMode = m$1;
  reactIs_production_min.ContextConsumer = k;
  reactIs_production_min.ContextProvider = h;
  reactIs_production_min.Element = c;
  reactIs_production_min.ForwardRef = n;
  reactIs_production_min.Fragment = e;
  reactIs_production_min.Lazy = t;
  reactIs_production_min.Memo = r;
  reactIs_production_min.Portal = d;
  reactIs_production_min.Profiler = g;
  reactIs_production_min.StrictMode = f;
  reactIs_production_min.Suspense = p;
  reactIs_production_min.isAsyncMode = function (a) {
    return A(a) || z(a) === l;
  };
  reactIs_production_min.isConcurrentMode = A;
  reactIs_production_min.isContextConsumer = function (a) {
    return z(a) === k;
  };
  reactIs_production_min.isContextProvider = function (a) {
    return z(a) === h;
  };
  reactIs_production_min.isElement = function (a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };
  reactIs_production_min.isForwardRef = function (a) {
    return z(a) === n;
  };
  reactIs_production_min.isFragment = function (a) {
    return z(a) === e;
  };
  reactIs_production_min.isLazy = function (a) {
    return z(a) === t;
  };
  reactIs_production_min.isMemo = function (a) {
    return z(a) === r;
  };
  reactIs_production_min.isPortal = function (a) {
    return z(a) === d;
  };
  reactIs_production_min.isProfiler = function (a) {
    return z(a) === g;
  };
  reactIs_production_min.isStrictMode = function (a) {
    return z(a) === f;
  };
  reactIs_production_min.isSuspense = function (a) {
    return z(a) === p;
  };
  reactIs_production_min.isValidElementType = function (a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m$1 || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
  };
  reactIs_production_min.typeOf = z;

  {
    reactIs$1.exports = reactIs_production_min;
  }
  var reactIsExports = reactIs$1.exports;

  var reactIs = reactIsExports;
  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

  var isBrowser$2 = typeof document !== 'undefined';
  function getRegisteredStyles(registered, registeredStyles, classNames) {
    var rawClassName = '';
    classNames.split(' ').forEach(function (className) {
      if (registered[className] !== undefined) {
        registeredStyles.push(registered[className] + ";");
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }
  var registerStyles = function registerStyles(cache, serialized, isStringTag) {
    var className = cache.key + "-" + serialized.name;
    if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false ||
    // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser$2 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
      cache.registered[className] = serialized.styles;
    }
  };
  var insertStyles = function insertStyles(cache, serialized, isStringTag) {
    registerStyles(cache, serialized, isStringTag);
    var className = cache.key + "-" + serialized.name;
    if (cache.inserted[serialized.name] === undefined) {
      var stylesForSSR = '';
      var current = serialized;
      do {
        var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);
        if (!isBrowser$2 && maybeStyles !== undefined) {
          stylesForSSR += maybeStyles;
        }
        current = current.next;
      } while (current !== undefined);
      if (!isBrowser$2 && stylesForSSR.length !== 0) {
        return stylesForSSR;
      }
    }
  };

  /* eslint-disable */
  // Inspired by https://github.com/garycourt/murmurhash-js
  // Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
  function murmur2(str) {
    // 'm' and 'r' are mixing constants generated offline.
    // They're not really 'magic', they just happen to work well.
    // const m = 0x5bd1e995;
    // const r = 24;
    // Initialize the hash
    var h = 0; // Mix 4 bytes at a time into the hash

    var k,
      i = 0,
      len = str.length;
    for (; len >= 4; ++i, len -= 4) {
      k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
      k = /* Math.imul(k, m): */
      (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
      k ^= /* k >>> r: */
      k >>> 24;
      h = /* Math.imul(k, m): */
      (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^ /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    } // Handle the last few bytes of the input array

    switch (len) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
      case 2:
        h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
      case 1:
        h ^= str.charCodeAt(i) & 0xff;
        h = /* Math.imul(h, m): */
        (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    } // Do a few final mixes of the hash to ensure the last few
    // bytes are well-incorporated.

    h ^= h >>> 13;
    h = /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    return ((h ^ h >>> 15) >>> 0).toString(36);
  }

  var unitlessKeys = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };

  var hyphenateRegex = /[A-Z]|^ms/g;
  var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
  var isCustomProperty = function isCustomProperty(property) {
    return property.charCodeAt(1) === 45;
  };
  var isProcessableValue = function isProcessableValue(value) {
    return value != null && typeof value !== 'boolean';
  };
  var processStyleName = /* #__PURE__ */memoize(function (styleName) {
    return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
  });
  var processStyleValue = function processStyleValue(key, value) {
    switch (key) {
      case 'animation':
      case 'animationName':
        {
          if (typeof value === 'string') {
            return value.replace(animationRegex, function (match, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
    }
    if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
      return value + 'px';
    }
    return value;
  };
  var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';
  function handleInterpolation(mergedProps, registered, interpolation) {
    if (interpolation == null) {
      return '';
    }
    if (interpolation.__emotion_styles !== undefined) {
      return interpolation;
    }
    switch (typeof interpolation) {
      case 'boolean':
        {
          return '';
        }
      case 'object':
        {
          if (interpolation.anim === 1) {
            cursor = {
              name: interpolation.name,
              styles: interpolation.styles,
              next: cursor
            };
            return interpolation.name;
          }
          if (interpolation.styles !== undefined) {
            var next = interpolation.next;
            if (next !== undefined) {
              // not the most efficient thing ever but this is a pretty rare case
              // and there will be very few iterations of this generally
              while (next !== undefined) {
                cursor = {
                  name: next.name,
                  styles: next.styles,
                  next: cursor
                };
                next = next.next;
              }
            }
            var styles = interpolation.styles + ";";
            return styles;
          }
          return createStringFromObject(mergedProps, registered, interpolation);
        }
      case 'function':
        {
          if (mergedProps !== undefined) {
            var previousCursor = cursor;
            var result = interpolation(mergedProps);
            cursor = previousCursor;
            return handleInterpolation(mergedProps, registered, result);
          }
          break;
        }
    } // finalize string values (regular strings and functions interpolated into css calls)

    if (registered == null) {
      return interpolation;
    }
    var cached = registered[interpolation];
    return cached !== undefined ? cached : interpolation;
  }
  function createStringFromObject(mergedProps, registered, obj) {
    var string = '';
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
      }
    } else {
      for (var _key in obj) {
        var value = obj[_key];
        if (typeof value !== 'object') {
          if (registered != null && registered[value] !== undefined) {
            string += _key + "{" + registered[value] + "}";
          } else if (isProcessableValue(value)) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
          }
        } else {
          if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
            throw new Error(noComponentSelectorMessage);
          }
          if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue(value[_i])) {
                string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation(mergedProps, registered, value);
            switch (_key) {
              case 'animation':
              case 'animationName':
                {
                  string += processStyleName(_key) + ":" + interpolated + ";";
                  break;
                }
              default:
                {
                  string += _key + "{" + interpolated + "}";
                }
            }
          }
        }
      }
    }
    return string;
  }
  var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
  // keyframes are stored on the SerializedStyles object as a linked list

  var cursor;
  var serializeStyles = function serializeStyles(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
      return args[0];
    }
    var stringMode = true;
    var styles = '';
    cursor = undefined;
    var strings = args[0];
    if (strings == null || strings.raw === undefined) {
      stringMode = false;
      styles += handleInterpolation(mergedProps, registered, strings);
    } else {
      styles += strings[0];
    } // we start at 1 since we've already handled the first arg

    for (var i = 1; i < args.length; i++) {
      styles += handleInterpolation(mergedProps, registered, args[i]);
      if (stringMode) {
        styles += strings[i];
      }
    }

    labelPattern.lastIndex = 0;
    var identifierName = '';
    var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

    while ((match = labelPattern.exec(styles)) !== null) {
      identifierName += '-' +
      // $FlowFixMe we know it's not null
      match[1];
    }
    var name = murmur2(styles) + identifierName;
    return {
      name: name,
      styles: styles,
      next: cursor
    };
  };

  var isBrowser$1 = typeof document !== 'undefined';
  var syncFallback = function syncFallback(create) {
    return create();
  };
  var useInsertionEffect = React__namespace['useInsertion' + 'Effect'] ? React__namespace['useInsertion' + 'Effect'] : false;
  var useInsertionEffectAlwaysWithSyncFallback = !isBrowser$1 ? syncFallback : useInsertionEffect || syncFallback;

  var isBrowser = typeof document !== 'undefined';
  var hasOwn = {}.hasOwnProperty;
  var EmotionCacheContext = /* #__PURE__ */React__namespace.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
    key: 'css'
  }) : null);
  EmotionCacheContext.Provider;
  var withEmotionCache = function withEmotionCache(func) {
    // $FlowFixMe
    return /*#__PURE__*/React.forwardRef(function (props, ref) {
      // the cache will never be null in the browser
      var cache = React.useContext(EmotionCacheContext);
      return func(props, cache, ref);
    });
  };
  if (!isBrowser) {
    withEmotionCache = function withEmotionCache(func) {
      return function (props) {
        var cache = React.useContext(EmotionCacheContext);
        if (cache === null) {
          // yes, we're potentially creating this on every render
          // it doesn't actually matter though since it's only on the server
          // so there will only every be a single render
          // that could change in the future because of suspense and etc. but for now,
          // this works and i don't want to optimise for a future thing that we aren't sure about
          cache = createCache({
            key: 'css'
          });
          return /*#__PURE__*/React__namespace.createElement(EmotionCacheContext.Provider, {
            value: cache
          }, func(props, cache));
        } else {
          return func(props, cache);
        }
      };
    };
  }
  var ThemeContext = /* #__PURE__ */React__namespace.createContext({});
  var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
  var createEmotionProps = function createEmotionProps(type, props) {
    var newProps = {};
    for (var key in props) {
      if (hasOwn.call(props, key)) {
        newProps[key] = props[key];
      }
    }
    newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when
    return newProps;
  };
  var Insertion = function Insertion(_ref) {
    var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
    registerStyles(cache, serialized, isStringTag);
    var rules = useInsertionEffectAlwaysWithSyncFallback(function () {
      return insertStyles(cache, serialized, isStringTag);
    });
    if (!isBrowser && rules !== undefined) {
      var _ref2;
      var serializedNames = serialized.name;
      var next = serialized.next;
      while (next !== undefined) {
        serializedNames += ' ' + next.name;
        next = next.next;
      }
      return /*#__PURE__*/React__namespace.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref2.nonce = cache.sheet.nonce, _ref2));
    }
    return null;
  };
  var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
    var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
    // not passing the registered cache to serializeStyles because it would
    // make certain babel optimisations not possible

    if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
      cssProp = cache.registered[cssProp];
    }
    var WrappedComponent = props[typePropName];
    var registeredStyles = [cssProp];
    var className = '';
    if (typeof props.className === 'string') {
      className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
    } else if (props.className != null) {
      className = props.className + " ";
    }
    var serialized = serializeStyles(registeredStyles, undefined, React__namespace.useContext(ThemeContext));
    className += cache.key + "-" + serialized.name;
    var newProps = {};
    for (var key in props) {
      if (hasOwn.call(props, key) && key !== 'css' && key !== typePropName && ("production" === 'production' )) {
        newProps[key] = props[key];
      }
    }
    newProps.ref = ref;
    newProps.className = className;
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Insertion, {
      cache: cache,
      serialized: serialized,
      isStringTag: typeof WrappedComponent === 'string'
    }), /*#__PURE__*/React__namespace.createElement(WrappedComponent, newProps));
  });
  var Emotion$1 = Emotion;

  function jsx(type, props, key) {
    if (!hasOwn.call(props, 'css')) {
      return jsxRuntimeExports.jsx(type, props, key);
    }
    return jsxRuntimeExports.jsx(Emotion$1, createEmotionProps(type, props), key);
  }
  function jsxs(type, props, key) {
    if (!hasOwn.call(props, 'css')) {
      return jsxRuntimeExports.jsxs(type, props, key);
    }
    return jsxRuntimeExports.jsxs(Emotion$1, createEmotionProps(type, props), key);
  }

  var createRoot;
  var m = require$$0;
  {
    createRoot = m.createRoot;
    m.hydrateRoot;
  }

  function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return serializeStyles(args);
  }

  // SELECTORS
  const GAMEFAQ_PLATFORM_LINK_SELECTOR = "#header_more_menu a";
  const LINKED_GROUP_SELECTOR = "#grouplinks a #linkedgroup";
  const WEBLINKS_SELECTOR = "#weblinksdiv a";
  const TAGS_SELECTOR = "#tagslist li > a:first-child";
  const DELETE_TAGS_SELECTOR = "a[href*=delete_tag]";
  const COLLAGE_SELECTOR = "#collages a"; // Category = Theme, Best Of, Arranger
  const SERIES_SELECTOR = ".series_title a"; // Category = Series
  const GROUP_INFO = "#sidebar_group_info a"; // Category = Developer, Publisher, Designer, Composer, Engine, Feature, Franchise, Author
  const PACK_INFO = ".box.box_pack a"; // Category = Pack
  const COLLECTIONS_SELECTORS = [
      COLLAGE_SELECTOR,
      SERIES_SELECTOR,
      GROUP_INFO,
      PACK_INFO,
  ];
  // LINKED GROUPS
  const PC_LINKED_GROUPS_TITLES = ["Windows", "Mac", "Linux"];
  const EXCLUDED_LINKED_GROUPS = [
      "Applications",
      "E-Books",
      "OST",
  ];
  // COLLECTIONS
  /** A list of collection ids you don't want to be copied to any linked group */
  const EXCLUDED_COLLECTION_IDS = [
      "28", // GGn Staff Picks
      "969", // GazelleGames Internals v2
      "45", // GazelleGames 'Exclusives'
      "1112", // Denuvo Removed
      "881", // Denuvo Cracked
      "1035", // Denuvo Uncracked
      "39", // Games For Windows: LIVE
      "1880", // DOSBox
      "4402", // Wine
  ];
  /** A list of collection ids you don't want to be copied to any PC linked group (see PC_LINKED_GROUPS_TITLES) */
  const EXCLUDED_PC_COLLECTION_IDS = [];
  /** A list of collection ids you don't want to be copied to any console linked group */
  const EXCLUDED_CONSOLE_COLLECTION_IDS = [
      "551", // Native Controller Support
  ];
  // WEBLINKS
  const EXCLUDED_WEBLINKS = ["Amazon"];
  // MAPPING
  /**
   * A map which pairs the ids of weblink input fields with the field name we get from the API
   */
  const WEBLINKS_LABEL_URI_MAPPING = {
      gameswebsiteuri: "GamesWebsite",
      wikipediauri: "Wikipedia",
      giantbomburi: "Giantbomb",
      vndburi: "VGMdb",
      howlongtobeaturi: "HowLongToBeat",
      amazonuri: "Amazon",
      gamefaqsuri: "GameFAQs",
      mobygamesuri: "MobyGames",
      itunesuri: "iTunes",
      googleplayuri: "GooglePlay",
      steamuri: "Steam",
      goguri: "GOG",
      humbleuri: "HumbleBundle",
      itchuri: "Itch",
      pcwikiuri: "PCGamingWiki",
      epicgamesuri: "EpicGames",
      psnuri: "PSN",
      nintendouri: "Nintendo",
      nexusmodsuri: "NexusMods",
  };
  const GAMEFAQ_PLATFORM_MAPPING = {
      Mac: "Macintosh",
      iOS: "iOS (iPhone/iPad)",
      "Apple Bandai Pippin": "Bandai Pippin",
      "Apple II": "Apple II",
      Android: "Android",
      DOS: "PC",
      Windows: "PC",
      Xbox: "Xbox",
      "Xbox 360": "Xbox 360",
      "Game Boy": "Game Boy",
      "Game Boy Advance": "Game Boy Advance",
      "Game Boy Color": "Game Boy Color",
      NES: "NES",
      "Nintendo 64": "Nintendo 64",
      "Nintendo 3DS": "3DS",
      "New Nintendo 3DS": "3DS",
      "Nintendo DS": "DS",
      "Nintendo GameCube": "GameCube",
      "Pokemon Mini": "Pokemon Mini",
      SNES: "Super Nintendo",
      Switch: "Nintendo Switch",
      "Virtual Boy": "Virtual Boy",
      Wii: "Wii",
      "Wii U": "Wii U",
      "PlayStation 1": "PlayStation",
      "PlayStation 2": "PlayStation 2",
      "PlayStation 3": "PlayStation 3",
      "PlayStation 4": "PlayStation 4",
      "PlayStation Portable": "PSP",
      "PlayStation Vita": "PlayStation Vita",
      Dreamcast: "Dreamcast",
      "Game Gear": null,
      "Master System": "Sega Master System",
      "Mega Drive": "Genesis",
      Pico: "Sega Pico",
      Saturn: "Saturn",
      "SG-1000": "SG-1000",
      "Atari 2600": "Atari 2600",
      "Atari 5200": "Atari 5200",
      "Atari 7800": "Atari 7800",
      "Atari Jaguar": "Jaguar",
      "Atari Lynx": "Lynx",
      "Atari ST": "Atari ST",
      "Amstrad CPC": "Amstrad CPC",
      "Bandai WonderSwan": "WonderSwan",
      "Bandai WonderSwan Color": "WonderSwan Color",
      "Commodore 64": "Commodore 64",
      "Commodore 128": null,
      "Commodore Amiga": "Amiga",
      "Amiga CD32": "Amiga CD32",
      "Commodore Plus-4": null,
      "Commodore VIC-20": "VIC-20",
      "NEC PC-98": "NEC PC98",
      "NEC PC-FX": null,
      "NEC SuperGrafx": null,
      "NEC TurboGrafx-16": "TurboGrafx-16",
      "ZX Spectrum": "Sinclair ZX81/Spectrum",
      MSX: "MSX",
      "MSX 2": "",
      "Game.com": "Game.com",
      Gizmondo: "Gizmondo",
      "V.Smile": null,
      CreatiVision: "CreatiVision",
      "Board Game": null,
      "Card Game": null,
      "Miniature Wargames": null,
      "Pen and Paper RPG": null,
      "3DO": "3D0",
      "Casio Loopy": "Casio Loopy",
      "Casio PV-1000": "Casio PV-1000",
      Colecovision: "Colecovision",
      "Emerson Arcadia 2001": "Arcadia 2001",
      "Entex Adventure Vision": "Adventurevision",
      "Epoch Super Casette Vision": null,
      "Fairchild Channel F": "Channel F",
      "Funtech Super Acan": null,
      "GamePark GP32": "GP32",
      "General Computer Vectrex": "Vectrex",
      "Interactive DVD": null,
      Linux: "Linux",
      "Hartung Game Master": null,
      "Magnavox-Phillips Odyssey": "Odyssey",
      "Mattel Intellivision": "Intellivision",
      "Memotech MTX": null,
      "Miles Gordon Sam Coupe": "",
      "Nokia N-Gage": "N-Gage",
      "Oculus Quest": "Oculus Quest",
      Ouya: "Ouya",
      "Philips Videopac+": null,
      "Philips CD-i": "CD-I",
      "Phone/PDA": "Mobile",
      "RCA Studio II": "RCA Studio II",
      "Sharp X1": "Sharp X1",
      "Sharp X68000": "Sharp X68000",
      "SNK Neo Geo": "SNK Neo Geo",
      "SNK Neo Geo Pocket": "SNK Neo Geo Pocket",
      "Taito Type X": null,
      "Tandy Color Computer": "Tandy Color Computer",
      "Tangerine Oric": "Oric 1/Atmos",
      "Thomson MO5": null,
      "Watara Supervision": "SuperVision",
      "Retro - Other": null,
  };
  // REGEXES
  const TEXT_INSIDE_PARANTHESIS_REGEX = /\(([^)]+)\)$/;
  // MISC
  const GAMEFAQ_URL = "https://gamefaqs.gamespot.com";

  function filterLinkedGroups(linkedGroups, excludedLinkedGroups) {
      return linkedGroups.filter((linkedGroup) => !excludedLinkedGroups.includes(linkedGroup.title));
  }
  function filterCollections(collections, excludedCollectionIds) {
      return collections.filter((collection) => !excludedCollectionIds.includes(collection.id));
  }
  function filterWebLinks(weblinks, excludedWebLinkIds) {
      return weblinks.filter((weblink) => !excludedWebLinkIds.includes(weblink.id));
  }
  function parseCollectionLinks(collectionsLinks) {
      return collectionsLinks.map(({ href, innerText }) => {
          const id = getCollectionIdFromURL(href);
          return {
              id,
              title: `${innerText} (${id})`,
              href,
          };
      });
  }
  function getCollectionLinks() {
      const collectionsRaw = document.querySelectorAll(COLLECTIONS_SELECTORS.join(","));
      return filterCollections(parseCollectionLinks(Array.from(collectionsRaw)), EXCLUDED_COLLECTION_IDS);
  }
  function getTags() {
      const tagsRaw = document.querySelectorAll(TAGS_SELECTOR);
      return Array.from(tagsRaw).map(({ innerText }) => ({
          title: innerText,
          id: innerText,
      }));
  }
  function getWebLinks() {
      const weblinksRaw = document.querySelectorAll(WEBLINKS_SELECTOR);
      return filterWebLinks(Array.from(weblinksRaw).map(({ title, href }) => ({
          title,
          href,
          id: title,
      })), EXCLUDED_WEBLINKS);
  }
  function getLinkedGroups() {
      const linkedGroupsRaw = document.querySelectorAll(LINKED_GROUP_SELECTOR);
      const regex = TEXT_INSIDE_PARANTHESIS_REGEX;
      return filterLinkedGroups(Array.from(linkedGroupsRaw)
          .filter((grouplink) => grouplink.title.match(regex))
          .map((grouplink) => ({
          title: grouplink.title.match(regex)[1],
          href: grouplink.parentNode.href,
          id: getCollectionIdFromURL(grouplink.parentNode.href),
      })), EXCLUDED_LINKED_GROUPS);
  }
  function getCollectionIdFromURL(url) {
      const regex = /\bid=(\d+)\b/;
      const match = regex.exec(url);
      if (match) {
          return match[1];
      }
      else {
          throw new Error("ID not found in the URL.");
      }
  }
  /**
   * Generates a URLSearchParams object based on provided web links and form data.
   *
   * @param {Link[]} weblinks An array of weblinks of source linked group.
   * @param linkedGroupWeblinksFormData  {FormData} The FormData object we get from the destination linked group's Non-wiki edit form.
   * @returns {Promise<URLSearchParams>} A promise that resolves to a URLSearchParams Object which acts as the payload for nonwikiedit action.
   */
  async function getWebLinksPayload(weblinks, linkedGroupWeblinksFormData) {
      // Clone the provided FormData object, don't want to edit the original
      const formData = cloneFormData(linkedGroupWeblinksFormData);
      // Iterate through the weblinks array
      for (const { id, href } of weblinks) {
          // uriLabel refers to the weblink
          const uriLabel = getKeyByValue(WEBLINKS_LABEL_URI_MAPPING, id);
          /* If no URI label is found, skip to the next weblink
           *  Check WEBLINKS_LABEL_URI_MAPPING if you think a link is being skipped, a mapping might not be present there
           */
          if (!uriLabel) {
              continue;
          }
          // Get the value for that URI label from the FormData
          const value = formData.get(uriLabel);
          /**
           * If the value associated with the URI label is not found in the FormData, skip to the next iteration.
           * This means that the destination linked group doesn't have that field.
           */
          if (value === null) {
              continue;
          }
          /**
           * If the value associated with the URI label is an empty string in the FormData,
           * update it with the href from the weblink.
           * This means that the destination linked group has that field, but it's empty.
           */
          if (value === "") {
              formData.set(uriLabel, href);
          }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // Don't ask, it just works.
      const urlSearchParams = new URLSearchParams(formData);
      return urlSearchParams;
  }
  function getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
  }
  function cloneFormData(formData) {
      const clone = new FormData();
      for (const [key, value] of formData) {
          clone.set(key, value);
      }
      return clone;
  }
  function xmlhttpRequestPromisified(options) {
      return new Promise((resolve, reject) => {
          GM.xmlHttpRequest({
              ...options,
              onload(response) {
                  resolve(response);
              },
              onerror(response) {
                  reject(response);
              },
          });
      });
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  /**
   * Batch add linked groups to a collection
   *
   */
  async function addTorrentsToCollection(collectionId, urls) {
      try {
          const response = await fetch("collections.php", {
              method: "POST",
              credentials: "include",
              body: new URLSearchParams({
                  action: "add_torrent_batch",
                  auth: unsafeWindow["authkey"],
                  collageid: collectionId,
                  urls: urls.join("\r\n"),
              }),
              headers,
          });
          return response.ok;
      }
      catch (error) {
          console.error("addTorrentsToCollection failed", error);
          return false;
      }
  }
  async function copyWeblinksToLinkedGroup(weblinks, linkedGroup) {
      try {
          const linkedGroupWeblinksFormData = await getLinkedGroupNonWikiFormData(linkedGroup.id);
          if (!linkedGroupWeblinksFormData) {
              throw new Error("linked group weblinks form data is null");
          }
          const gameFaqWeblink = weblinks.find((weblink) => weblink.id === "GameFAQs");
          if (gameFaqWeblink) {
              gameFaqWeblink.href =
                  (await getGameFaqLinkByPlatform(gameFaqWeblink.href, linkedGroup.title)) ?? "";
          }
          const payload = await getWebLinksPayload(weblinks, linkedGroupWeblinksFormData);
          const response = await fetch("/torrents.php", {
              method: "POST",
              credentials: "include",
              body: payload,
              headers,
          });
          return response.ok;
      }
      catch (error) {
          console.error("copyWeblinksToLinkedGroup", error);
          return false;
      }
  }
  /**
   * Get FormData of NonWiki form
   *
   * @param linkedGroupId Group Id
   * @returns A FormData object of the Non-Wiki form
   */
  async function getLinkedGroupNonWikiFormData(linkedGroupId) {
      try {
          const response = await fetch(`https://gazellegames.net/torrents.php?action=editgroup&groupid=${linkedGroupId}`);
          const rawHTML = await response.text();
          const parser = new DOMParser();
          const parsedHTML = parser.parseFromString(rawHTML, "text/html");
          const inputField = parsedHTML.querySelector("input[value=nonwikiedit]");
          const formElement = inputField?.parentNode;
          if (!inputField || !formElement) {
              throw new Error("Markup has probably changed. Fix selector.");
          }
          return new FormData(formElement);
      }
      catch (error) {
          console.error("getLinkedGroupNonWikiFormData failed", error);
          return null;
      }
  }
  async function getLinkedGroupDeletionTagsHref(linkedGroupId) {
      try {
          const response = await fetch(`https://gazellegames.net/torrents.php?id=${linkedGroupId}`);
          const rawHTML = await response.text();
          const parser = new DOMParser();
          const parsedHTML = parser.parseFromString(rawHTML, "text/html");
          const anchorElements = parsedHTML.querySelectorAll(DELETE_TAGS_SELECTOR);
          return Array.from(anchorElements).map((anchorElement) => anchorElement.href);
      }
      catch (error) {
          console.error("getLinkedGroupDeletionTagsHref failed", error);
          return [];
      }
  }
  async function deleteAllTagsInLinkedGroup(linkedGroupId) {
      const deletionTagHrefs = await getLinkedGroupDeletionTagsHref(linkedGroupId);
      try {
          for (const deletionTagHref of deletionTagHrefs) {
              await fetch(deletionTagHref, {
                  method: "GET",
                  credentials: "include",
                  headers,
              });
          }
          return true;
      }
      catch (error) {
          console.error("deleteAllTagsInLinkedGroup failed", error);
          return false;
      }
  }
  async function addTagsToLinkedGroup(linkedGroupId, tags) {
      try {
          const response = await fetch("torrents.php?ajax=1", {
              method: "POST",
              credentials: "include",
              body: new URLSearchParams({
                  action: "add_tag",
                  groupid: linkedGroupId,
                  genre_tags: "adventure",
                  tags: tags.join(",+"),
              }),
              headers,
          });
          return response.ok;
      }
      catch (error) {
          console.error("addTagsToLinkedGroup failed", error);
          return false;
      }
  }
  async function getGameFaqLinkByPlatform(url, platform) {
      try {
          const response = (await xmlhttpRequestPromisified({
              url,
          }));
          if (!response.responseXML) {
              throw new Error(`Failed to load GameFaq (${url})`);
          }
          const anchorElements = response.responseXML.querySelectorAll(GAMEFAQ_PLATFORM_LINK_SELECTOR);
          return (Array.from(anchorElements)
              .map((anchorElement) => {
              const spanElement = anchorElement.childNodes[0];
              return {
                  href: `${GAMEFAQ_URL}${anchorElement.pathname}`,
                  title: spanElement.innerText,
              };
          })
              .find((link) => link.title === GAMEFAQ_PLATFORM_MAPPING[platform])
              ?.href ?? "");
      }
      catch (error) {
          console.error("getGameFaqLinkByPlatform failed", error);
          return "";
      }
  }

  const Checkbox = ({ id, title, checked, onChange }) => {
      return (jsxs("div", { css: css({ display: "flex", alignItems: "center" }), children: [jsx("input", { id: id, type: "checkbox", checked: checked, onChange: onChange }), jsx("label", { htmlFor: id, children: title })] }));
  };

  function CheckboxSelectionGroup({ id, title, hasAllCheckbox, data, checkboxes, isAllSelected = false, handleCheckboxChange, handleAllCheckboxChange = () => { }, }) {
      if (data.length === 0) {
          return null;
      }
      return (jsxs("div", { css: css({ display: "flex", flexDirection: "column" }), children: [jsx("strong", { children: title }), jsxs("div", { css: css({
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                  }), children: [hasAllCheckbox ? (jsx(Checkbox, { checked: isAllSelected, id: `${id}-all`, title: "All", onChange: handleAllCheckboxChange })) : null, data.map(({ title, id: dataId }, index) => (jsx(Checkbox, { checked: checkboxes[index], id: `${id}-${dataId}`, title: title, onChange: () => handleCheckboxChange(index) }, `${id}-${dataId}`)))] })] }));
  }

  const useCheckboxes = (length, hasAllCheckbox, initialValues = true) => {
      const [checkboxes, setCheckboxes] = React.useState(Array(length).fill(initialValues));
      const [selectAll, setSelectAll] = React.useState(initialValues);
      function handleAllCheckboxChange() {
          setSelectAll(!selectAll);
      }
      function handleCheckboxChange(position) {
          const updatedCheckboxes = checkboxes.map((checked, index) => position === index ? !checked : checked);
          setCheckboxes(updatedCheckboxes);
      }
      React.useEffect(() => {
          if (!hasAllCheckbox) {
              return;
          }
          if (selectAll) {
              return setCheckboxes(Array(length).fill(true));
          }
          setCheckboxes(Array(length).fill(false));
      }, [setCheckboxes, length, selectAll, hasAllCheckbox]);
      return {
          checkboxes,
          selectAll,
          handleAllCheckboxChange,
          handleCheckboxChange,
      };
  };

  const App = () => {
      const destinationLinkedGroups = getLinkedGroups();
      const weblinks = getWebLinks();
      const tags = getTags();
      const collections = getCollectionLinks();
      const [loading, setLoading] = React.useState(false);
      const [areOptionsVisible, setAreOptionsVisible] = React.useState(false);
      const [copyWeblinks, setCopyWeblinks] = React.useState(true);
      const [copyTags, setCopyTags] = React.useState(false);
      const { checkboxes, handleCheckboxChange } = useCheckboxes(destinationLinkedGroups.length, false, false);
      async function handleRun() {
          const areAllCheckboxesUnchecked = checkboxes.every((checkbox) => checkbox === false);
          try {
              setLoading(true);
              const filteredDestinationLinkedGroups = destinationLinkedGroups.filter((_, index) => (areAllCheckboxesUnchecked ? true : checkboxes[index]));
              for (const { id } of collections) {
                  // TODO: Hide all this logic
                  await addTorrentsToCollection(id, filteredDestinationLinkedGroups
                      .filter(({ title }) => {
                      if (PC_LINKED_GROUPS_TITLES.includes(title)) {
                          if (EXCLUDED_PC_COLLECTION_IDS.includes(id))
                              return false;
                      }
                      else if (EXCLUDED_CONSOLE_COLLECTION_IDS.includes(id)) {
                          // Assume everything that's not a PC is a console. ¯\_(ツ)_/¯
                          return false;
                      }
                      return true;
                  })
                      .map(({ href }) => href));
              }
              for (const destinationLinkedGroup of filteredDestinationLinkedGroups) {
                  if (copyWeblinks) {
                      await copyWeblinksToLinkedGroup(weblinks, destinationLinkedGroup);
                  }
                  if (copyTags) {
                      await deleteAllTagsInLinkedGroup(destinationLinkedGroup.id);
                      await addTagsToLinkedGroup(destinationLinkedGroup.id, tags.map((tag) => tag.id));
                  }
              }
          }
          catch (error) {
              console.error("something went wrong", error);
          }
          finally {
              setLoading(false);
          }
      }
      if (destinationLinkedGroups.length === 0) {
          return null;
      }
      return (jsxs("div", { className: "box", children: [jsx("div", { className: "head", children: jsx("strong", { children: "Multiplatform Edit" }) }), jsxs("div", { css: css({ display: "flex" }), children: [jsx("input", { onClick: handleRun, css: css({ flex: "1" }), type: "button", value: loading ? "🏃" : "Run", disabled: loading }), jsx("input", { onClick: () => setAreOptionsVisible(!areOptionsVisible), css: css({ flex: "1" }), type: "button", value: areOptionsVisible ? "Hide options" : "Show options" })] }), areOptionsVisible ? (jsxs("div", { className: "body", css: css({
                      display: "flex",
                      flexDirection: "column",
                      gap: "13px",
                      marginTop: "13px",
                  }), children: [jsx(CheckboxSelectionGroup, { id: "linked-groups", title: "Destination Linked Groups", hasAllCheckbox: false, data: destinationLinkedGroups, checkboxes: checkboxes, handleCheckboxChange: handleCheckboxChange }), jsx(Checkbox, { id: "weblinks", title: "Copy weblinks", checked: copyWeblinks, onChange: () => setCopyWeblinks(!copyWeblinks) }), jsx(Checkbox, { id: "tags", title: "Copy tags", checked: copyTags, onChange: () => setCopyTags(!copyTags) })] })) : null] }));
  };

  const ModalContext = React.createContext(null);

  const modalContainerStyles = css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
  });
  const ModalContextProvider = ({ children }) => {
      const [modalChildren, setModalChildren] = React.useState(null);
      const [isModalOpen, setIsModalOpen] = React.useState(false);
      function open(children) {
          setModalChildren(children);
          setIsModalOpen(true);
      }
      function close() {
          setModalChildren(null);
          setIsModalOpen(false);
      }
      React.useEffect(() => {
          if (isModalOpen) {
              document.body.style.overflow = "hidden";
          }
          return () => {
              document.body.style.overflow = "auto";
          };
      }, [isModalOpen]);
      return (jsxs(ModalContext.Provider, { value: {
              open,
              close,
          }, children: [children, isModalOpen
                  ? require$$0.createPortal(jsx("div", { css: modalContainerStyles, children: modalChildren }), document.body)
                  : null] }));
  };

  const Providers = ({ children }) => {
      return jsx(ModalContextProvider, { children: children });
  };

  var index = (function () {
      const rootNode = document.createElement("div");
      rootNode.setAttribute("id", "GGn-multiplatform-edit");
      const groupCoverNode = document.querySelector("#group_cover");
      if (!groupCoverNode) {
          throw new Error("Group Cover not found. The markup might have changed.");
      }
      groupCoverNode.insertAdjacentElement("afterend", rootNode);
      createRoot(rootNode).render(jsx(React.StrictMode, { children: jsx(Providers, { children: jsx(App, {}) }) }));
  })();

  return index;

})(React, ReactDOM);

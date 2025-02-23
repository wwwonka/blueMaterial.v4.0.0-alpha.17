// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({
  "modernizr.js": [function (require, module, exports) {
    /*!
     * modernizr v3.7.1
     * Build https://modernizr.com/download?-canvas-gamepads-supports-webgl-addtest-printshiv-setclasses-testprop-dontmin
     *
     * Copyright (c)
     *  Faruk Ates
     *  Paul Irish
     *  Alex Sexton
     *  Ryan Seddon
     *  Patrick Kettner
     *  Stu Cox
     *  Richard Herrera
     *  Veeck
    
     * MIT License
     */

    /*
     * Modernizr tests which native CSS3 and HTML5 features are available in the
     * current UA and makes the results available to you in two ways: as properties on
     * a global `Modernizr` object, and as classes on the `<html>` element. This
     * information allows you to progressively enhance your pages with a granular level
     * of control over the experience.
    */
    ;

    (function (window, document, undefined) {
      var tests = [];
      /**
       * ModernizrProto is the constructor for Modernizr
       *
       * @class
       * @access public
       */

      var ModernizrProto = {
        // The current version, dummy
        _version: '3.7.1',
        // Any settings that don't work as separate modules
        // can go in here as configuration.
        _config: {
          'classPrefix': '',
          'enableClasses': true,
          'enableJSClass': true,
          'usePrefixes': true
        },
        // Queue of tests
        _q: [],
        // Stub these for people who are listening
        on: function (test, cb) {
          // I don't really think people should do this, but we can
          // safe guard it a bit.
          // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
          // This is in case people listen to synchronous tests. I would leave it out,
          // but the code to *disallow* sync tests in the real version of this
          // function is actually larger than this.
          var self = this;
          setTimeout(function () {
            cb(self[test]);
          }, 0);
        },
        addTest: function (name, fn, options) {
          tests.push({
            name: name,
            fn: fn,
            options: options
          });
        },
        addAsyncTest: function (fn) {
          tests.push({
            name: null,
            fn: fn
          });
        }
      }; // Fake some of Object.create so we can force non test results to be non "own" properties.

      var Modernizr = function () { };

      Modernizr.prototype = ModernizrProto; // Leak modernizr globally when you `require` it rather than force it here.
      // Overwrite name so constructor name is nicer :D

      Modernizr = new Modernizr();
      var classes = [];
      /**
       * is returns a boolean if the typeof an obj is exactly type.
       *
       * @access private
       * @function is
       * @param {*} obj - A thing we want to check the type of
       * @param {string} type - A string to compare the typeof against
       * @returns {boolean} true if the typeof the first parameter is exactly the specified type, false otherwise
       */

      function is(obj, type) {
        return typeof obj === type;
      }

      ;
      /**
       * Run through all tests and detect their support in the current UA.
       *
       * @access private
       * @returns {void}
       */

      function testRunner() {
        var featureNames;
        var feature;
        var aliasIdx;
        var result;
        var nameIdx;
        var featureName;
        var featureNameSplit;

        for (var featureIdx in tests) {
          if (tests.hasOwnProperty(featureIdx)) {
            featureNames = [];
            feature = tests[featureIdx]; // run the test, throw the return value into the Modernizr,
            // then based on that boolean, define an appropriate className
            // and push it into an array of classes we'll join later.
            //
            // If there is no name, it's an 'async' test that is run,
            // but not directly added to the object. That should
            // be done with a post-run addTest call.

            if (feature.name) {
              featureNames.push(feature.name.toLowerCase());

              if (feature.options && feature.options.aliases && feature.options.aliases.length) {
                // Add all the aliases into the names list
                for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
                  featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
                }
              }
            } // Run the test, or use the raw value if it's not a function


            result = is(feature.fn, 'function') ? feature.fn() : feature.fn; // Set each of the names on the Modernizr object

            for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
              featureName = featureNames[nameIdx]; // Support dot properties as sub tests. We don't do checking to make sure
              // that the implied parent tests have been added. You must call them in
              // order (either in the test, or make the parent test a dependency).
              //
              // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
              // hashtag famous last words

              featureNameSplit = featureName.split('.');

              if (featureNameSplit.length === 1) {
                Modernizr[featureNameSplit[0]] = result;
              } else {
                // cast to a Boolean, if not one already
                if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
                  Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
                }

                Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
              }

              classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
            }
          }
        }
      }

      ;
      /**
       * docElement is a convenience wrapper to grab the root element of the document
       *
       * @access private
       * @returns {HTMLElement|SVGElement} The root element of the document
       */

      var docElement = document.documentElement;
      /**
       * A convenience helper to check if the document we are running in is an SVG document
       *
       * @access private
       * @returns {boolean}
       */

      var isSVG = docElement.nodeName.toLowerCase() === 'svg';
      /**
       * setClasses takes an array of class names and adds them to the root element
       *
       * @access private
       * @function setClasses
       * @param {string[]} classes - Array of class names
       */
      // Pass in an and array of class names, e.g.:
      //  ['no-webp', 'borderradius', ...]

      function setClasses(classes) {
        var className = docElement.className;
        var classPrefix = Modernizr._config.classPrefix || '';

        if (isSVG) {
          className = className.baseVal;
        } // Change `no-js` to `js` (independently of the `enableClasses` option)
        // Handle classPrefix on this too


        if (Modernizr._config.enableJSClass) {
          var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
          className = className.replace(reJS, '$1' + classPrefix + 'js$2');
        }

        if (Modernizr._config.enableClasses) {
          // Add the new classes
          if (classes.length > 0) {
            className += ' ' + classPrefix + classes.join(' ' + classPrefix);
          }

          if (isSVG) {
            docElement.className.baseVal = className;
          } else {
            docElement.className = className;
          }
        }
      }

      ;
      /**
       * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
       *
       * @author kangax
       * @access private
       * @function hasOwnProp
       * @param {object} object - The object to check for a property
       * @param {string} property - The property to check for
       * @returns {boolean}
       */
      // hasOwnProperty shim by kangax needed for Safari 2.0 support

      var hasOwnProp;

      (function () {
        var _hasOwnProperty = {}.hasOwnProperty;
        /* istanbul ignore else */

        /* we have no way of testing IE 5.5 or safari 2,
         * so just assume the else gets hit */

        if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
          hasOwnProp = function (object, property) {
            return _hasOwnProperty.call(object, property);
          };
        } else {
          hasOwnProp = function (object, property) {
            /* yes, this can give false positives/negatives, but most of the time we don't care about those */
            return property in object && is(object.constructor.prototype[property], 'undefined');
          };
        }
      })(); // _l tracks listeners for async tests, as well as tests that execute after the initial run


      ModernizrProto._l = {};
      /**
       * Modernizr.on is a way to listen for the completion of async tests. Being
       * asynchronous, they may not finish before your scripts run. As a result you
       * will get a possibly false negative `undefined` value.
       *
       * @memberOf Modernizr
       * @name Modernizr.on
       * @access public
       * @function on
       * @param {string} feature - String name of the feature detect
       * @param {Function} cb - Callback function returning a Boolean - true if feature is supported, false if not
       * @returns {void}
       * @example
       *
       * ```js
       * Modernizr.on('flash', function( result ) {
       *   if (result) {
       *    // the browser has flash
       *   } else {
       *     // the browser does not have flash
       *   }
       * });
       * ```
       */

      ModernizrProto.on = function (feature, cb) {
        // Create the list of listeners if it doesn't exist
        if (!this._l[feature]) {
          this._l[feature] = [];
        } // Push this test on to the listener list


        this._l[feature].push(cb); // If it's already been resolved, trigger it on next tick


        if (Modernizr.hasOwnProperty(feature)) {
          // Next Tick
          setTimeout(function () {
            Modernizr._trigger(feature, Modernizr[feature]);
          }, 0);
        }
      };
      /**
       * _trigger is the private function used to signal test completion and run any
       * callbacks registered through [Modernizr.on](#modernizr-on)
       *
       * @memberOf Modernizr
       * @name Modernizr._trigger
       * @access private
       * @function _trigger
       * @param {string} feature - string name of the feature detect
       * @param {Function|boolean} [res] - A feature detection function, or the boolean =
       * result of a feature detection function
       * @returns {void}
       */


      ModernizrProto._trigger = function (feature, res) {
        if (!this._l[feature]) {
          return;
        }

        var cbs = this._l[feature]; // Force async

        setTimeout(function () {
          var i, cb;

          for (i = 0; i < cbs.length; i++) {
            cb = cbs[i];
            cb(res);
          }
        }, 0); // Don't trigger these again

        delete this._l[feature];
      };
      /**
       * addTest allows you to define your own feature detects that are not currently
       * included in Modernizr (under the covers it's the exact same code Modernizr
       * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)).
       * Just like the official detects, the result
       * will be added onto the Modernizr object, as well as an appropriate className set on
       * the html element when configured to do so
       *
       * @memberOf Modernizr
       * @name Modernizr.addTest
       * @optionName Modernizr.addTest()
       * @optionProp addTest
       * @access public
       * @function addTest
       * @param {string|Object} feature - The string name of the feature detect, or an
       * object of feature detect names and test
       * @param {Function|boolean} test - Function returning true if feature is supported,
       * false if not. Otherwise a boolean representing the results of a feature detection
       * @returns {Object} the Modernizr object to allow chaining
       * @example
       *
       * The most common way of creating your own feature detects is by calling
       * `Modernizr.addTest` with a string (preferably just lowercase, without any
       * punctuation), and a function you want executed that will return a boolean result
       *
       * ```js
       * Modernizr.addTest('itsTuesday', function() {
       *  var d = new Date();
       *  return d.getDay() === 2;
       * });
       * ```
       *
       * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
       * and to `false` every other day of the week. One thing to notice is that the names of
       * feature detect functions are always lowercased when added to the Modernizr object. That
       * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
       *
       *
       *  Since we only look at the returned value from any feature detection function,
       *  you do not need to actually use a function. For simple detections, just passing
       *  in a statement that will return a boolean value works just fine.
       *
       * ```js
       * Modernizr.addTest('hasjquery', 'jQuery' in window);
       * ```
       *
       * Just like before, when the above runs `Modernizr.hasjquery` will be true if
       * jQuery has been included on the page. Not using a function saves a small amount
       * of overhead for the browser, as well as making your code much more readable.
       *
       * Finally, you also have the ability to pass in an object of feature names and
       * their tests. This is handy if you want to add multiple detections in one go.
       * The keys should always be a string, and the value can be either a boolean or
       * function that returns a boolean.
       *
       * ```js
       * var detects = {
       *  'hasjquery': 'jQuery' in window,
       *  'itstuesday': function() {
       *    var d = new Date();
       *    return d.getDay() === 2;
       *  }
       * }
       *
       * Modernizr.addTest(detects);
       * ```
       *
       * There is really no difference between the first methods and this one, it is
       * just a convenience to let you write more readable code.
       */


      function addTest(feature, test) {
        if (typeof feature === 'object') {
          for (var key in feature) {
            if (hasOwnProp(feature, key)) {
              addTest(key, feature[key]);
            }
          }
        } else {
          feature = feature.toLowerCase();
          var featureNameSplit = feature.split('.');
          var last = Modernizr[featureNameSplit[0]]; // Again, we don't check for parent test existence. Get that right, though.

          if (featureNameSplit.length === 2) {
            last = last[featureNameSplit[1]];
          }

          if (typeof last !== 'undefined') {
            // we're going to quit if you're trying to overwrite an existing test
            // if we were to allow it, we'd do this:
            //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
            //   docElement.className = docElement.className.replace( re, '' );
            // but, no rly, stuff 'em.
            return Modernizr;
          }

          test = typeof test === 'function' ? test() : test; // Set the value (this is the magic, right here).

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = test;
          } else {
            // cast to a Boolean, if not one already
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
          } // Set a single class (either `feature` or `no-feature`)


          setClasses([(!!test && test !== false ? '' : 'no-') + featureNameSplit.join('-')]); // Trigger the event

          Modernizr._trigger(feature, test);
        }

        return Modernizr; // allow chaining.
      } // After all the tests are run, add self to the Modernizr prototype


      Modernizr._q.push(function () {
        ModernizrProto.addTest = addTest;
      });
      /**
       * @optionName html5printshiv
       * @optionProp html5printshiv
       */
      // Take the html5 variable out of the html5shiv scope so we can return it.


      var html5;

      if (!isSVG) {
        /**
         * @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
         */
        ;

        (function (window, document) {
          /*jshint evil:true */

          /** version */
          var version = '3.7.3';
          /** Preset options */

          var options = window.html5 || {};
          /** Used to skip problem elements */

          var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
          /** Not all elements can be cloned in IE **/

          var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
          /** Detect whether the browser supports default html5 styles */

          var supportsHtml5Styles;
          /** Name of the expando, to work with multiple documents or to re-shiv one document */

          var expando = '_html5shiv';
          /** The id for the the documents expando */

          var expanID = 0;
          /** Cached data for each document */

          var expandoData = {};
          /** Detect whether the browser supports unknown elements */

          var supportsUnknownElements;

          (function () {
            try {
              var a = document.createElement('a');
              a.innerHTML = '<xyz></xyz>'; //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles

              supportsHtml5Styles = 'hidden' in a;

              supportsUnknownElements = a.childNodes.length == 1 || function () {
                // assign a false positive if unable to shiv
                document.createElement('a');
                var frag = document.createDocumentFragment();
                return typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined';
              }();
            } catch (e) {
              // assign a false positive if detection fails => unable to shiv
              supportsHtml5Styles = true;
              supportsUnknownElements = true;
            }
          })();
          /*--------------------------------------------------------------------------*/

          /**
           * Creates a style sheet with the given CSS text and adds it to the document.
           * @private
           * @param {Document} ownerDocument The document.
           * @param {String} cssText The CSS text.
           * @returns {StyleSheet} The style element.
           */


          function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement('p'),
              parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
            p.innerHTML = 'x<style>' + cssText + '</style>';
            return parent.insertBefore(p.lastChild, parent.firstChild);
          }
          /**
           * Returns the value of `html5.elements` as an array.
           * @private
           * @returns {Array} An array of shived element node names.
           */


          function getElements() {
            var elements = html5.elements;
            return typeof elements == 'string' ? elements.split(' ') : elements;
          }
          /**
           * Extends the built-in list of html5 elements
           * @memberOf html5
           * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
           * @param {Document} ownerDocument The context document.
           */


          function addElements(newElements, ownerDocument) {
            var elements = html5.elements;

            if (typeof elements != 'string') {
              elements = elements.join(' ');
            }

            if (typeof newElements != 'string') {
              newElements = newElements.join(' ');
            }

            html5.elements = elements + ' ' + newElements;
            shivDocument(ownerDocument);
          }
          /**
           * Returns the data associated to the given document
           * @private
           * @param {Document} ownerDocument The document.
           * @returns {Object} An object of data.
           */


          function getExpandoData(ownerDocument) {
            var data = expandoData[ownerDocument[expando]];

            if (!data) {
              data = {};
              expanID++;
              ownerDocument[expando] = expanID;
              expandoData[expanID] = data;
            }

            return data;
          }
          /**
           * returns a shived element for the given nodeName and document
           * @memberOf html5
           * @param {String} nodeName name of the element
           * @param {Document} ownerDocument The context document.
           * @returns {Object} The shived element.
           */


          function createElement(nodeName, ownerDocument, data) {
            if (!ownerDocument) {
              ownerDocument = document;
            }

            if (supportsUnknownElements) {
              return ownerDocument.createElement(nodeName);
            }

            if (!data) {
              data = getExpandoData(ownerDocument);
            }

            var node;

            if (data.cache[nodeName]) {
              node = data.cache[nodeName].cloneNode();
            } else if (saveClones.test(nodeName)) {
              node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
            } else {
              node = data.createElem(nodeName);
            } // Avoid adding some elements to fragments in IE < 9 because
            // * Attributes like `name` or `type` cannot be set/changed once an element
            //   is inserted into a document/fragment
            // * Link elements with `src` attributes that are inaccessible, as with
            //   a 403 response, will cause the tab/window to crash
            // * Script elements appended to fragments will execute when their `src`
            //   or `text` property is set


            return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
          }
          /**
           * returns a shived DocumentFragment for the given document
           * @memberOf html5
           * @param {Document} ownerDocument The context document.
           * @returns {Object} The shived DocumentFragment.
           */


          function createDocumentFragment(ownerDocument, data) {
            if (!ownerDocument) {
              ownerDocument = document;
            }

            if (supportsUnknownElements) {
              return ownerDocument.createDocumentFragment();
            }

            data = data || getExpandoData(ownerDocument);
            var clone = data.frag.cloneNode(),
              i = 0,
              elems = getElements(),
              l = elems.length;

            for (; i < l; i++) {
              clone.createElement(elems[i]);
            }

            return clone;
          }
          /**
           * Shivs the `createElement` and `createDocumentFragment` methods of the document.
           * @private
           * @param {Document|DocumentFragment} ownerDocument The document.
           * @param {Object} data of the document.
           */


          function shivMethods(ownerDocument, data) {
            if (!data.cache) {
              data.cache = {};
              data.createElem = ownerDocument.createElement;
              data.createFrag = ownerDocument.createDocumentFragment;
              data.frag = data.createFrag();
            }

            ownerDocument.createElement = function (nodeName) {
              //abort shiv
              if (!html5.shivMethods) {
                return data.createElem(nodeName);
              }

              return createElement(nodeName, ownerDocument, data);
            };

            ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' + 'var n=f.cloneNode(),c=n.createElement;' + 'h.shivMethods&&(' + // unroll the `createElement` calls
              getElements().join().replace(/[\w\-:]+/g, function (nodeName) {
                data.createElem(nodeName);
                data.frag.createElement(nodeName);
                return 'c("' + nodeName + '")';
              }) + ');return n}')(html5, data.frag);
          }
          /*--------------------------------------------------------------------------*/

          /**
           * Shivs the given document.
           * @memberOf html5
           * @param {Document} ownerDocument The document to shiv.
           * @returns {Document} The shived document.
           */


          function shivDocument(ownerDocument) {
            if (!ownerDocument) {
              ownerDocument = document;
            }

            var data = getExpandoData(ownerDocument);

            if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
              data.hasCSS = !!addStyleSheet(ownerDocument, // corrects block display not defined in IE6/7/8/9
                'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' + // adds styling not present in IE6/7/8/9
                'mark{background:#FF0;color:#000}' + // hides non-rendered elements
                'template{display:none}');
            }

            if (!supportsUnknownElements) {
              shivMethods(ownerDocument, data);
            }

            return ownerDocument;
          }
          /*--------------------------------------------------------------------------*/

          /**
           * The `html5` object is exposed so that more elements can be shived and
           * existing shiving can be detected on iframes.
           * @type Object
           * @example
           *
           * // options can be changed before the script is included
           * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
           */


          var html5 = {
            /**
             * An array or space separated string of node names of the elements to shiv.
             * @memberOf html5
             * @type Array|String
             */
            'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

            /**
             * current version of html5shiv
             */
            'version': version,

            /**
             * A flag to indicate that the HTML5 style sheet should be inserted.
             * @memberOf html5
             * @type Boolean
             */
            'shivCSS': options.shivCSS !== false,

            /**
             * Is equal to true if a browser supports creating unknown/HTML5 elements
             * @memberOf html5
             * @type boolean
             */
            'supportsUnknownElements': supportsUnknownElements,

            /**
             * A flag to indicate that the document's `createElement` and `createDocumentFragment`
             * methods should be overwritten.
             * @memberOf html5
             * @type Boolean
             */
            'shivMethods': options.shivMethods !== false,

            /**
             * A string to describe the type of `html5` object ("default" or "default print").
             * @memberOf html5
             * @type String
             */
            'type': 'default',
            // shivs the document according to the specified `html5` object options
            'shivDocument': shivDocument,
            //creates a shived element
            createElement: createElement,
            //creates a shived documentFragment
            createDocumentFragment: createDocumentFragment,
            //extends list of elements
            addElements: addElements
          };
          /*--------------------------------------------------------------------------*/
          // expose html5

          window.html5 = html5; // shiv the document

          shivDocument(document);
          /*------------------------------- Print Shiv -------------------------------*/

          /** Used to filter media types */

          var reMedia = /^$|\b(?:all|print)\b/;
          /** Used to namespace printable elements */

          var shivNamespace = 'html5shiv';
          /** Detect whether the browser supports shivable style sheets */

          var supportsShivableSheets = !supportsUnknownElements && function () {
            // assign a false negative if unable to shiv
            var docEl = document.documentElement;
            return !(typeof document.namespaces == 'undefined' || typeof document.parentWindow == 'undefined' || typeof docEl.applyElement == 'undefined' || typeof docEl.removeNode == 'undefined' || typeof window.attachEvent == 'undefined');
          }();
          /*--------------------------------------------------------------------------*/

          /**
           * Wraps all HTML5 elements in the given document with printable elements.
           * (eg. the "header" element is wrapped with the "html5shiv:header" element)
           * @private
           * @param {Document} ownerDocument The document.
           * @returns {Array} An array wrappers added.
           */


          function addWrappers(ownerDocument) {
            var node,
              nodes = ownerDocument.getElementsByTagName('*'),
              index = nodes.length,
              reElements = RegExp('^(?:' + getElements().join('|') + ')$', 'i'),
              result = [];

            while (index--) {
              node = nodes[index];

              if (reElements.test(node.nodeName)) {
                result.push(node.applyElement(createWrapper(node)));
              }
            }

            return result;
          }
          /**
           * Creates a printable wrapper for the given element.
           * @private
           * @param {Element} element The element.
           * @returns {Element} The wrapper.
           */


          function createWrapper(element) {
            var node,
              nodes = element.attributes,
              index = nodes.length,
              wrapper = element.ownerDocument.createElement(shivNamespace + ':' + element.nodeName); // copy element attributes to the wrapper

            while (index--) {
              node = nodes[index];
              node.specified && wrapper.setAttribute(node.nodeName, node.nodeValue);
            } // copy element styles to the wrapper


            wrapper.style.cssText = element.style.cssText;
            return wrapper;
          }
          /**
           * Shivs the given CSS text.
           * (eg. header{} becomes html5shiv\:header{})
           * @private
           * @param {String} cssText The CSS text to shiv.
           * @returns {String} The shived CSS text.
           */


          function shivCssText(cssText) {
            var pair,
              parts = cssText.split('{'),
              index = parts.length,
              reElements = RegExp('(^|[\\s,>+~])(' + getElements().join('|') + ')(?=[[\\s,>+~#.:]|$)', 'gi'),
              replacement = '$1' + shivNamespace + '\\:$2';

            while (index--) {
              pair = parts[index] = parts[index].split('}');
              pair[pair.length - 1] = pair[pair.length - 1].replace(reElements, replacement);
              parts[index] = pair.join('}');
            }

            return parts.join('{');
          }
          /**
           * Removes the given wrappers, leaving the original elements.
           * @private
           * @params {Array} wrappers An array of printable wrappers.
           */


          function removeWrappers(wrappers) {
            var index = wrappers.length;

            while (index--) {
              wrappers[index].removeNode();
            }
          }
          /*--------------------------------------------------------------------------*/

          /**
           * Shivs the given document for print.
           * @memberOf html5
           * @param {Document} ownerDocument The document to shiv.
           * @returns {Document} The shived document.
           */


          function shivPrint(ownerDocument) {
            var shivedSheet,
              wrappers,
              data = getExpandoData(ownerDocument),
              namespaces = ownerDocument.namespaces,
              ownerWindow = ownerDocument.parentWindow;

            if (!supportsShivableSheets || ownerDocument.printShived) {
              return ownerDocument;
            }

            if (typeof namespaces[shivNamespace] == 'undefined') {
              namespaces.add(shivNamespace);
            }

            function removeSheet() {
              clearTimeout(data._removeSheetTimer);

              if (shivedSheet) {
                shivedSheet.removeNode(true);
              }

              shivedSheet = null;
            }

            ownerWindow.attachEvent('onbeforeprint', function () {
              removeSheet();
              var imports,
                length,
                sheet,
                collection = ownerDocument.styleSheets,
                cssText = [],
                index = collection.length,
                sheets = Array(index); // convert styleSheets collection to an array

              while (index--) {
                sheets[index] = collection[index];
              } // concat all style sheet CSS text


              while (sheet = sheets.pop()) {
                // IE does not enforce a same origin policy for external style sheets...
                // but has trouble with some dynamically created stylesheets
                if (!sheet.disabled && reMedia.test(sheet.media)) {
                  try {
                    imports = sheet.imports;
                    length = imports.length;
                  } catch (er) {
                    length = 0;
                  }

                  for (index = 0; index < length; index++) {
                    sheets.push(imports[index]);
                  }

                  try {
                    cssText.push(sheet.cssText);
                  } catch (er) { }
                }
              } // wrap all HTML5 elements with printable elements and add the shived style sheet


              cssText = shivCssText(cssText.reverse().join(''));
              wrappers = addWrappers(ownerDocument);
              shivedSheet = addStyleSheet(ownerDocument, cssText);
            });
            ownerWindow.attachEvent('onafterprint', function () {
              // remove wrappers, leaving the original elements, and remove the shived style sheet
              removeWrappers(wrappers);
              clearTimeout(data._removeSheetTimer);
              data._removeSheetTimer = setTimeout(removeSheet, 500);
            });
            ownerDocument.printShived = true;
            return ownerDocument;
          }
          /*--------------------------------------------------------------------------*/
          // expose API


          html5.type += ' print';
          html5.shivPrint = shivPrint; // shiv for print

          shivPrint(document);

          if (typeof module == 'object' && module.exports) {
            module.exports = html5;
          }
        })(typeof window !== "undefined" ? window : this, document);
      }

      ;
      /**
       * contains checks to see if a string contains another string
       *
       * @access private
       * @function contains
       * @param {string} str - The string we want to check for substrings
       * @param {string} substr - The substring we want to search the first string for
       * @returns {boolean} true if and only if the first string 'str' contains the second string 'substr'
       */

      function contains(str, substr) {
        return !!~('' + str).indexOf(substr);
      }

      ;
      /**
       * createElement is a convenience wrapper around document.createElement. Since we
       * use createElement all over the place, this allows for (slightly) smaller code
       * as well as abstracting away issues with creating elements in contexts other than
       * HTML documents (e.g. SVG documents).
       *
       * @access private
       * @function createElement
       * @returns {HTMLElement|SVGElement} An HTML or SVG element
       */

      function createElement() {
        if (typeof document.createElement !== 'function') {
          // This is the case in IE7, where the type of createElement is "object".
          // For this reason, we cannot call apply() as Object is not a Function.
          return document.createElement(arguments[0]);
        } else if (isSVG) {
          return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
        } else {
          return document.createElement.apply(document, arguments);
        }
      }

      ;
      /**
       * Create our "modernizr" element that we do most feature tests on.
       *
       * @access private
       */

      var modElem = {
        elem: createElement('modernizr')
      }; // Clean up this element

      Modernizr._q.push(function () {
        delete modElem.elem;
      });

      var mStyle = {
        style: modElem.elem.style
      }; // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
      // the front of the queue.

      Modernizr._q.unshift(function () {
        delete mStyle.style;
      });
      /**
       * getBody returns the body of a document, or an element that can stand in for
       * the body if a real body does not exist
       *
       * @access private
       * @function getBody
       * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
       * artificially created element that stands in for the body
       */


      function getBody() {
        // After page load injecting a fake body doesn't work so check if body exists
        var body = document.body;

        if (!body) {
          // Can't use the real body create a fake one.
          body = createElement(isSVG ? 'svg' : 'body');
          body.fake = true;
        }

        return body;
      }

      ;
      /**
       * injectElementWithStyles injects an element with style element and some CSS rules
       *
       * @access private
       * @function injectElementWithStyles
       * @param {string} rule - String representing a css rule
       * @param {Function} callback - A function that is used to test the injected element
       * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
       * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
       * @returns {boolean} the result of the specified callback test
       */

      function injectElementWithStyles(rule, callback, nodes, testnames) {
        var mod = 'modernizr';
        var style;
        var ret;
        var node;
        var docOverflow;
        var div = createElement('div');
        var body = getBody();

        if (parseInt(nodes, 10)) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while (nodes--) {
            node = createElement('div');
            node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
            div.appendChild(node);
          }
        }

        style = createElement('style');
        style.type = 'text/css';
        style.id = 's' + mod; // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
        // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270

        (!body.fake ? div : body).appendChild(style);
        body.appendChild(div);

        if (style.styleSheet) {
          style.styleSheet.cssText = rule;
        } else {
          style.appendChild(document.createTextNode(rule));
        }

        div.id = mod;

        if (body.fake) {
          //avoid crashing IE8, if background image is used
          body.style.background = ''; //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible

          body.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(body);
        }

        ret = callback(div, rule); // If this is done after page load we don't want to remove the body so check if body exists

        if (body.fake) {
          body.parentNode.removeChild(body);
          docElement.style.overflow = docOverflow; // Trigger layout so kinetic scrolling isn't disabled in iOS6+
          // eslint-disable-next-line

          docElement.offsetHeight;
        } else {
          div.parentNode.removeChild(div);
        }

        return !!ret;
      }

      ;
      /**
       * domToCSS takes a camelCase string and converts it to kebab-case
       * e.g. boxSizing -> box-sizing
       *
       * @access private
       * @function domToCSS
       * @param {string} name - String name of camelCase prop we want to convert
       * @returns {string} The kebab-case version of the supplied name
       */

      function domToCSS(name) {
        return name.replace(/([A-Z])/g, function (str, m1) {
          return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');
      }

      ;
      /**
       * wrapper around getComputedStyle, to fix issues with Firefox returning null when
       * called inside of a hidden iframe
       *
       * @access private
       * @function computedStyle
       * @param {HTMLElement|SVGElement} elem - The element we want to find the computed styles of
       * @param {string|null} [pseudo] - An optional pseudo element selector (e.g. :before), of null if none
       * @param {string} prop - A CSS property
       * @returns {CSSStyleDeclaration} the value of the specified CSS property
       */

      function computedStyle(elem, pseudo, prop) {
        var result;

        if ('getComputedStyle' in window) {
          result = getComputedStyle.call(window, elem, pseudo);
          var console = window.console;

          if (result !== null) {
            if (prop) {
              result = result.getPropertyValue(prop);
            }
          } else {
            if (console) {
              var method = console.error ? 'error' : 'log';
              console[method].call(console, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
            }
          }
        } else {
          result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
        }

        return result;
      }

      ;
      /**
       * nativeTestProps allows for us to use native feature detection functionality if available.
       * some prefixed form, or false, in the case of an unsupported rule
       *
       * @access private
       * @function nativeTestProps
       * @param {array} props - An array of property names
       * @param {string} value - A string representing the value we want to check via @supports
       * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
       */
      // Accepts a list of property names and a single value
      // Returns `undefined` if native detection not available

      function nativeTestProps(props, value) {
        var i = props.length; // Start with the JS API: https://www.w3.org/TR/css3-conditional/#the-css-interface

        if ('CSS' in window && 'supports' in window.CSS) {
          // Try every prefixed variant of the property
          while (i--) {
            if (window.CSS.supports(domToCSS(props[i]), value)) {
              return true;
            }
          }

          return false;
        } // Otherwise fall back to at-rule (for Opera 12.x)
        else if ('CSSSupportsRule' in window) {
          // Build a condition string for every prefixed variant
          var conditionText = [];

          while (i--) {
            conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
          }

          conditionText = conditionText.join(' or ');
          return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function (node) {
            return computedStyle(node, null, 'position') === 'absolute';
          });
        }

        return undefined;
      }

      ;
      /**
       * cssToDOM takes a kebab-case string and converts it to camelCase
       * e.g. box-sizing -> boxSizing
       *
       * @access private
       * @function cssToDOM
       * @param {string} name - String name of kebab-case prop we want to convert
       * @returns {string} The camelCase version of the supplied name
       */

      function cssToDOM(name) {
        return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
          return m1 + m2.toUpperCase();
        }).replace(/^-/, '');
      }

      ; // testProps is a generic CSS / DOM property test.
      // In testing support for a given CSS property, it's legit to test:
      //    `elem.style[styleName] !== undefined`
      // If the property is supported it will return an empty string,
      // if unsupported it will return undefined.
      // We'll take advantage of this quick test and skip setting a style
      // on our modernizr element, but instead just testing undefined vs
      // empty string.
      // Property names can be provided in either camelCase or kebab-case.

      function testProps(props, prefixed, value, skipValueTest) {
        skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest; // Try native detect first

        if (!is(value, 'undefined')) {
          var result = nativeTestProps(props, value);

          if (!is(result, 'undefined')) {
            return result;
          }
        } // Otherwise do it properly


        var afterInit, i, propsLength, prop, before; // If we don't have a style element, that means we're running async or after
        // the core tests, so we'll need to create our own elements to use
        // inside of an SVG element, in certain browsers, the `style` element is only
        // defined for valid tags. Therefore, if `modernizr` does not have one, we
        // fall back to a less used element and hope for the best.
        // for strict XHTML browsers the hardly used samp element is used

        var elems = ['modernizr', 'tspan', 'samp'];

        while (!mStyle.style && elems.length) {
          afterInit = true;
          mStyle.modElem = createElement(elems.shift());
          mStyle.style = mStyle.modElem.style;
        } // Delete the objects if we created them.


        function cleanElems() {
          if (afterInit) {
            delete mStyle.style;
            delete mStyle.modElem;
          }
        }

        propsLength = props.length;

        for (i = 0; i < propsLength; i++) {
          prop = props[i];
          before = mStyle.style[prop];

          if (contains(prop, '-')) {
            prop = cssToDOM(prop);
          }

          if (mStyle.style[prop] !== undefined) {
            // If value to test has been passed in, do a set-and-check test.
            // 0 (integer) is a valid property value, so check that `value` isn't
            // undefined, rather than just checking it's truthy.
            if (!skipValueTest && !is(value, 'undefined')) {
              // Needs a try catch block because of old IE. This is slow, but will
              // be avoided in most cases because `skipValueTest` will be used.
              try {
                mStyle.style[prop] = value;
              } catch (e) { } // If the property value has changed, we assume the value used is
              // supported. If `value` is empty string, it'll fail here (because
              // it hasn't changed), which matches how browsers have implemented
              // CSS.supports()


              if (mStyle.style[prop] !== before) {
                cleanElems();
                return prefixed === 'pfx' ? prop : true;
              }
            } // Otherwise just return true, or the property name if this is a
            // `prefixed()` call
            else {
              cleanElems();
              return prefixed === 'pfx' ? prop : true;
            }
          }
        }

        cleanElems();
        return false;
      }

      ;
      /**
       * testProp() investigates whether a given style property is recognized
       * Property names can be provided in either camelCase or kebab-case.
       *
       * @memberOf Modernizr
       * @name Modernizr.testProp
       * @access public
       * @optionName Modernizr.testProp()
       * @optionProp testProp
       * @function testProp
       * @param {string} prop - Name of the CSS property to check
       * @param {string} [value] - Name of the CSS value to check
       * @param {boolean} [useValue] - Whether or not to check the value if @supports isn't supported
       * @returns {boolean} an empty string if the property is supported, undefined if its unsupported
       * @example
       *
       * Just like [testAllProps](#modernizr-testallprops), only it does not check any vendor prefixed
       * version of the string.
       *
       * Note that the property name must be provided in camelCase (e.g. boxSizing not box-sizing)
       *
       * ```js
       * Modernizr.testProp('pointerEvents')  // true
       * ```
       *
       * You can also provide a value as an optional second argument to check if a
       * specific value is supported
       *
       * ```js
       * Modernizr.testProp('pointerEvents', 'none') // true
       * Modernizr.testProp('pointerEvents', 'penguin') // false
       * ```
       */

      var testProp = ModernizrProto.testProp = function (prop, value, useValue) {
        return testProps([prop], undefined, value, useValue);
      };
      /**
       * If the browsers follow the spec, then they would expose vendor-specific styles as:
       *   elem.style.WebkitBorderRadius
       * instead of something like the following (which is technically incorrect):
       *   elem.style.webkitBorderRadius
        * WebKit ghosts their properties in lowercase but Opera & Moz do not.
       * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
       *   erik.eae.net/archives/2008/03/10/21.48.10/
        * More here: github.com/Modernizr/Modernizr/issues/issue/21
       *
       * @access private
       * @returns {string} The string representing the vendor-specific style properties
       */


      var omPrefixes = 'Moz O ms Webkit';
      var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : [];
      ModernizrProto._cssomPrefixes = cssomPrefixes;
      /**
       * List of JavaScript DOM values used for tests
       *
       * @memberOf Modernizr
       * @name Modernizr._domPrefixes
       * @optionName Modernizr._domPrefixes
       * @optionProp domPrefixes
       * @access public
       * @example
       *
       * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
       * than kebab-case properties, all properties are their Capitalized variant
       *
       * ```js
       * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
       * ```
       */

      var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : [];
      ModernizrProto._domPrefixes = domPrefixes;
      /**
       * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
       *
       * @access private
       * @function fnBind
       * @param {Function} fn - a function you want to change `this` reference to
       * @param {Object} that - the `this` you want to call the function with
       * @returns {Function} The wrapped version of the supplied function
       */

      function fnBind(fn, that) {
        return function () {
          return fn.apply(that, arguments);
        };
      }

      ;
      /**
       * testDOMProps is a generic DOM property test; if a browser supports
       *   a certain property, it won't return undefined for it.
       *
       * @access private
       * @function testDOMProps
       * @param {Array<string>} props - An array of properties to test for
       * @param {Object} obj - An object or Element you want to use to test the parameters again
       * @param {boolean|Object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
       * @returns {false|*} returns false if the prop is unsupported, otherwise the value that is supported
       */

      function testDOMProps(props, obj, elem) {
        var item;

        for (var i in props) {
          if (props[i] in obj) {
            // return the property name as a string
            if (elem === false) {
              return props[i];
            }

            item = obj[props[i]]; // let's bind a function

            if (is(item, 'function')) {
              // bind to obj unless overridden
              return fnBind(item, elem || obj);
            } // return the unbound function or obj or value


            return item;
          }
        }

        return false;
      }

      ;
      /**
       * testPropsAll tests a list of DOM properties we want to check against.
       * We specify literally ALL possible (known and/or likely) properties on
       * the element including the non-vendor prefixed one, for forward-
       * compatibility.
       *
       * @access private
       * @function testPropsAll
       * @param {string} prop - A string of the property to test for
       * @param {string|Object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
       * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
       * @param {string} [value] - A string of a css value
       * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
       * @returns {false|string} returns the string version of the property, or false if it is unsupported
       */

      function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
          props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' '); // did they call .prefixed('boxSizing') or are we just testing a prop?

        if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
          return testProps(props, prefixed, value, skipValueTest); // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
      } // Modernizr.testAllProps() investigates whether a given style property,
      // or any of its vendor-prefixed variants, is recognized
      //
      // Note that the property names must be provided in the camelCase variant.
      // Modernizr.testAllProps('boxSizing')


      ModernizrProto.testAllProps = testPropsAll;
      /**
       * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
       * some prefixed form, or false, in the case of an unsupported rule
       *
       * @memberOf Modernizr
       * @name Modernizr.atRule
       * @optionName Modernizr.atRule()
       * @optionProp atRule
       * @access public
       * @function atRule
       * @param {string} prop - String name of the @-rule to test for
       * @returns {string|boolean} The string representing the (possibly prefixed)
       * valid version of the @-rule, or `false` when it is unsupported.
       * @example
       * ```js
       *  var keyframes = Modernizr.atRule('@keyframes');
       *
       *  if (keyframes) {
       *    // keyframes are supported
       *    // could be `@-webkit-keyframes` or `@keyframes`
       *  } else {
       *    // keyframes === `false`
       *  }
       * ```
       */

      var atRule = function (prop) {
        var length = prefixes.length;
        var cssrule = window.CSSRule;
        var rule;

        if (typeof cssrule === 'undefined') {
          return undefined;
        }

        if (!prop) {
          return false;
        } // remove literal @ from beginning of provided property


        prop = prop.replace(/^@/, ''); // CSSRules use underscores instead of dashes

        rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

        if (rule in cssrule) {
          return '@' + prop;
        }

        for (var i = 0; i < length; i++) {
          // prefixes gives us something like -o-, and we want O_
          var prefix = prefixes[i];
          var thisRule = prefix.toUpperCase() + '_' + rule;

          if (thisRule in cssrule) {
            return '@-' + prefix.toLowerCase() + '-' + prop;
          }
        }

        return false;
      };

      ModernizrProto.atRule = atRule;
      /**
       * prefixed returns the prefixed or nonprefixed property name variant of your input
       *
       * @memberOf Modernizr
       * @name Modernizr.prefixed
       * @optionName Modernizr.prefixed()
       * @optionProp prefixed
       * @access public
       * @function prefixed
       * @param {string} prop - String name of the property to test for
       * @param {Object} [obj] - An object to test for the prefixed properties on
       * @param {HTMLElement} [elem] - An element used to test specific properties against
       * @returns {string|false} The string representing the (possibly prefixed) valid
       * version of the property, or `false` when it is unsupported.
       * @example
       *
       * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
       * opposed to the css style kebab-case) form and returns the (possibly prefixed)
       * version of that property that the browser actually supports.
       *
       * For example, in older Firefox...
       * ```js
       * prefixed('boxSizing')
       * ```
       * returns 'MozBoxSizing'
       *
       * In newer Firefox, as well as any other browser that support the unprefixed
       * version would simply return `boxSizing`. Any browser that does not support
       * the property at all, it will return `false`.
       *
       * By default, prefixed is checked against a DOM element. If you want to check
       * for a property on another object, just pass it as a second argument
       *
       * ```js
       * var rAF = prefixed('requestAnimationFrame', window);
       *
       * raf(function() {
       *  renderFunction();
       * })
       * ```
       *
       * Note that this will return _the actual function_ - not the name of the function.
       * If you need the actual name of the property, pass in `false` as a third argument
       *
       * ```js
       * var rAFProp = prefixed('requestAnimationFrame', window, false);
       *
       * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
       * ```
       *
       * One common use case for prefixed is if you're trying to determine which transition
       * end event to bind to, you might do something like...
       * ```js
       * var transEndEventNames = {
       *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
       *     'MozTransition'    : 'transitionend',       * only for FF < 15
       *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
       * };
       *
       * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
       * ```
       *
       * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
       */

      var prefixed = ModernizrProto.prefixed = function (prop, obj, elem) {
        if (prop.indexOf('@') === 0) {
          return atRule(prop);
        }

        if (prop.indexOf('-') !== -1) {
          // Convert kebab-case to camelCase
          prop = cssToDOM(prop);
        }

        if (!obj) {
          return testPropsAll(prop, 'pfx');
        } else {
          // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
          return testPropsAll(prop, obj, elem);
        }
      };
      /*!
      {
        "name": "GamePad API",
        "property": "gamepads",
        "authors": ["Eric Bidelman"],
        "tags": ["media"],
        "notes": [{
          "name": "W3C Spec",
          "href": "https://www.w3.org/TR/gamepad/"
        },{
          "name": "HTML5 Rocks Tutorial",
          "href": "https://www.html5rocks.com/en/tutorials/doodles/gamepad/#toc-featuredetect"
        }]
      }
      !*/

      /* DOC
      Detects support for the Gamepad API, for access to gamepads and controllers.
      */


      Modernizr.addTest('gamepads', !!prefixed('getGamepads', navigator));
      /*!
      {
        "name": "Canvas",
        "property": "canvas",
        "caniuse": "canvas",
        "tags": ["canvas", "graphics"],
        "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
      }
      !*/

      /* DOC
      Detects support for the `<canvas>` element for 2D drawing.
      */
      // On the S60 and BB Storm, getContext exists, but always returns undefined
      // so we actually have to call getContext() to verify
      // github.com/Modernizr/Modernizr/issues/issue/97/

      Modernizr.addTest('canvas', function () {
        var elem = createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
      });
      /*!
      {
        "name": "WebGL",
        "property": "webgl",
        "caniuse": "webgl",
        "tags": ["webgl", "graphics"],
        "polyfills": ["jebgl", "cwebgl", "iewebgl"]
      }
      !*/

      Modernizr.addTest('webgl', function () {
        return 'WebGLRenderingContext' in window;
      });
      /*!
      {
        "name": "CSS Supports",
        "property": "supports",
        "caniuse": "css-featurequeries",
        "tags": ["css"],
        "builderAliases": ["css_supports"],
        "notes": [{
          "name": "W3C Spec",
          "href": "https://dev.w3.org/csswg/css3-conditional/#at-supports"
        },{
          "name": "Related Github Issue",
          "href": "https://github.com/Modernizr/Modernizr/issues/648"
        },{
          "name": "W3C Spec",
          "href": "https://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
        }]
      }
      !*/

      var newSyntax = 'CSS' in window && 'supports' in window.CSS;
      var oldSyntax = 'supportsCSS' in window;
      Modernizr.addTest('supports', newSyntax || oldSyntax); // Run each test

      testRunner(); // Remove the "no-js" class if it exists

      setClasses(classes);
      delete ModernizrProto.addTest;
      delete ModernizrProto.addAsyncTest; // Run the things that are supposed to run after the tests

      for (var i = 0; i < Modernizr._q.length; i++) {
        Modernizr._q[i]();
      } // Leak Modernizr namespace


      window.Modernizr = Modernizr;
      ;
    })(window, document);
  }, {}], "../node_modules/parcel-bundler/src/builtins/hmr-runtime.js": [function (require, module, exports) {
    var global = arguments[3];
    var OVERLAY_ID = '__parcel__error__overlay__';
    var OldModule = module.bundle.Module;

    function Module(moduleName) {
      OldModule.call(this, moduleName);
      this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function (fn) {
          this._acceptCallbacks.push(fn || function () { });
        },
        dispose: function (fn) {
          this._disposeCallbacks.push(fn);
        }
      };
      module.bundle.hotData = null;
    }

    module.bundle.Module = Module;
    var checkedAssets, assetsToAccept;
    var parent = module.bundle.parent;

    if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
      var hostname = "" || location.hostname;
      var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
      var ws = new WebSocket(protocol + '://' + hostname + ':' + "58000" + '/');

      ws.onmessage = function (event) {
        checkedAssets = {};
        assetsToAccept = [];
        var data = JSON.parse(event.data);

        if (data.type === 'update') {
          var handled = false;
          data.assets.forEach(function (asset) {
            if (!asset.isNew) {
              var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

              if (didAccept) {
                handled = true;
              }
            }
          }); // Enable HMR for CSS by default.

          handled = handled || data.assets.every(function (asset) {
            return asset.type === 'css' && asset.generated.js;
          });

          if (handled) {
            console.clear();
            data.assets.forEach(function (asset) {
              hmrApply(global.parcelRequire, asset);
            });
            assetsToAccept.forEach(function (v) {
              hmrAcceptRun(v[0], v[1]);
            });
          } else {
            window.location.reload();
          }
        }

        if (data.type === 'reload') {
          ws.close();

          ws.onclose = function () {
            location.reload();
          };
        }

        if (data.type === 'error-resolved') {
          console.log('[parcel] ✨ Error resolved');
          removeErrorOverlay();
        }

        if (data.type === 'error') {
          console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
          removeErrorOverlay();
          var overlay = createErrorOverlay(data);
          document.body.appendChild(overlay);
        }
      };
    }

    function removeErrorOverlay() {
      var overlay = document.getElementById(OVERLAY_ID);

      if (overlay) {
        overlay.remove();
      }
    }

    function createErrorOverlay(data) {
      var overlay = document.createElement('div');
      overlay.id = OVERLAY_ID; // html encode message and stack trace

      var message = document.createElement('div');
      var stackTrace = document.createElement('pre');
      message.innerText = data.error.message;
      stackTrace.innerText = data.error.stack;
      overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
      return overlay;
    }

    function getParents(bundle, id) {
      var modules = bundle.modules;

      if (!modules) {
        return [];
      }

      var parents = [];
      var k, d, dep;

      for (k in modules) {
        for (d in modules[k][1]) {
          dep = modules[k][1][d];

          if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
            parents.push(k);
          }
        }
      }

      if (bundle.parent) {
        parents = parents.concat(getParents(bundle.parent, id));
      }

      return parents;
    }

    function hmrApply(bundle, asset) {
      var modules = bundle.modules;

      if (!modules) {
        return;
      }

      if (modules[asset.id] || !bundle.parent) {
        var fn = new Function('require', 'module', 'exports', asset.generated.js);
        asset.isNew = !modules[asset.id];
        modules[asset.id] = [fn, asset.deps];
      } else if (bundle.parent) {
        hmrApply(bundle.parent, asset);
      }
    }

    function hmrAcceptCheck(bundle, id) {
      var modules = bundle.modules;

      if (!modules) {
        return;
      }

      if (!modules[id] && bundle.parent) {
        return hmrAcceptCheck(bundle.parent, id);
      }

      if (checkedAssets[id]) {
        return;
      }

      checkedAssets[id] = true;
      var cached = bundle.cache[id];
      assetsToAccept.push([bundle, id]);

      if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        return true;
      }

      return getParents(global.parcelRequire, id).some(function (id) {
        return hmrAcceptCheck(global.parcelRequire, id);
      });
    }

    function hmrAcceptRun(bundle, id) {
      var cached = bundle.cache[id];
      bundle.hotData = {};

      if (cached) {
        cached.hot.data = bundle.hotData;
      }

      if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
        cached.hot._disposeCallbacks.forEach(function (cb) {
          cb(bundle.hotData);
        });
      }

      delete bundle.cache[id];
      bundle(id);
      cached = bundle.cache[id];

      if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        cached.hot._acceptCallbacks.forEach(function (cb) {
          cb();
        });

        return true;
      }
    }
  }, {}]
}, {}, ["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js", "modernizr.js"], null)
//# sourceMappingURL=./modernizr.cc9b2e9d.js.map
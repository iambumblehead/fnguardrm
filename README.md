fnguardrm
=========
**(c)[Bumblehead][0], 2015** [MIT-license](#license)

### Overview:

An [`fnguard`][1] accessory script. It comments-out, uncomments-out or completely strips use of [`fnguard`][1] from a script. This makes it easy to use `fnguard` for development while removing fnguard from production deployments, where it may adversly effect performance and script size.

Transform this:

```javascript
toelem: function(sess, cfg, tplstr, data, elem, fn) {
  fnguard.isobj(sess, cfg).isstr(tplstr).isobj(data).isdomelem(elem);
  fn = optfn(fn);
  
  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {
    if (err) return fn(err);
    
    elem.innerHTML = htmlstr;
    fn(null, elem);
  });
},
```

To this:
```javascript
toelem: function(sess, cfg, tplstr, data, elem, fn) {
  // fnguard.isobj(sess, cfg).isstr(tplstr).isobj(data).isdomelem(elem);
  fn = optfn(fn);
  
  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {
    if (err) return fn(err);
    
    elem.innerHTML = htmlstr;
    fn(null, elem);
  });
},
```

Or this:
```javascript
toelem: function(sess, cfg, tplstr, data, elem, fn) {
  "0";
  fn = optfn(fn);
  
  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {
    if (err) return fn(err);
    
    elem.innerHTML = htmlstr;
    fn(null, elem);
  });
},
```

**note: techniques used to comment-out and un-comment-out fnguard are not robust**. _Do not_ use them with minified sources. They may be suitable for your development purposes (the purpose for which they exist).

**For something robust use provided method `astremove`** which uses [UglifyJS2's][2] ast tree to precisely remove fnguard calls.


[0]: http://www.bumblehead.com                            "bumblehead"
[1]: https://github.com/iambumblehead/fnguard/blob/master/fnguard.js
[2]: https://github.com/mishoo/UglifyJS2                   "UglifyJS2"
[3]: https://github.com/iambumblehead/fnguardrm/blob/master/fnguardrm.el "fnguardrm emacs"

---------------------------------------------------------
#### <a id="install"></a>Install:

```bash
$ npm install fnguardrm
```

---------------------------------------------------------
#### <a id="test"></a>Test:

```bash
$ npm test
```

---------------------------------------------------------
#### <a id="example"></a>Example:

Use methods `fnguardrm` from another script or use it from the command line.

The shell command takes the following modifiers:

  - **-i _inputpath_**,
  - **-o _outputpath_**,
  - **-t** [**_astremove_**|**_comment_**|**_uncomment_**]

*ex.,*
```bash
$ node path/to/fnguard.js -i path/to/myfile.js -o path/to/writemyfile.js -t astremove
```

It is also usable from another script. See unit tests for more examples.

* **uncomment**
  ```javascript
  console.log(require('fnguardrm').uncomment('' +
    'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
    '  // fnguard\n' +
    '  //   .isobj(sess, cfg)\n' +
    '  //   .isstr(tplstr)\n' +
    '  //   .isobj(data)\n' +
    '  //   .isdomelem(elem);\n' +
    '  fn = optfn(fn);\n' +
    '\n' +
    '  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {\n' +
    '    if (err) return fn(err);\n' +
    '\n' +
    '    elem.innerHTML = htmlstr;\n' +
    '    fn(null, elem);\n' +
    '  });\n' +
    '}\n'));
  // function f (sess, cfg, tplstr, data, elem, fn) {
  //   fnguard
  //     .isobj(sess, cfg)
  //     .isstr(tplstr)
  //     .isobj(data)
  //     .isdomelem(elem);
  //   fn = optfn(fn);
  // 
  //   this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {
  //     if (err) return fn(err);
  // 
  //     elem.innerHTML = htmlstr;
  //     fn(null, elem);
  //   });
  // }
  ```

* **comment**
  ```javascript
  console.log(require('fnguardrm').comment('' +
    'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
    '  fnguard\n' +
    '    .isobj(sess, cfg)\n' +
    '    .isstr(tplstr)\n' +
    '    .isobj(data)\n' +
    '    .isdomelem(elem);\n' +
    '  fn = optfn(fn);\n' +
    '\n' +
    '  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {\n' +
    '    if (err) return fn(err);\n' +
    '\n' +
    '    elem.innerHTML = htmlstr;\n' +
    '    fn(null, elem);\n' +
    '  });\n' +
    '}\n'));
  // function f (sess, cfg, tplstr, data, elem, fn) {
  //   // fnguard
  //   //   .isobj(sess, cfg)
  //   //   .isstr(tplstr)
  //   //   .isobj(data)
  //   //   .isdomelem(elem);
  //   fn = optfn(fn);
  // 
  //   this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {
  //     if (err) return fn(err);
  // 
  //     elem.innerHTML = htmlstr;
  //     fn(null, elem);
  //   });
  // }
  ```

* **astremove**
  ```javascript
  console.log(require('fnguardrm').astremove('' +
    'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
    '  fnguard\n' +
    '    .isobj(sess, cfg)\n' +
    '    .isstr(tplstr)\n' +
    '    .isobj(data)\n' +
    '    .isdomelem(elem);\n' +
    '  fn = optfn(fn);\n' +
    '\n' +
    '  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {\n' +
    '    if (err) return fn(err);\n' +
    '\n' +
    '    elem.innerHTML = htmlstr;\n' +
    '    fn(null, elem);\n' +
    '  });\n' +
    '}\n'));
  // function f (sess, cfg, tplstr, data, elem, fn) {
  //   "0";
  //   fn = optfn(fn);
  // 
  //   this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {
  //     if (err) return fn(err);
  // 
  //     elem.innerHTML = htmlstr;
  //     fn(null, elem);
  //   });
  // }
  ```

A [utility file][3] is included for emacs as well.

---------------------------------------------------------
#### <a id="license">License:

 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2015 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

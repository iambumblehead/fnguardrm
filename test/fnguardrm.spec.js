
var fnguardrm = require('../fnguardrm');

var fnguard_singleline = '' +
  'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
  '  fnguard.isobj(sess, cfg).isstr(tplstr).isobj(data).isdomelem(elem);\n' +
  '  fn = optfn(fn);\n' +
  '\n' +
  '  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {\n' +
  '    if (err) return fn(err);\n' +
  '\n' +
  '    elem.innerHTML = htmlstr;\n' +
  '    fn(null, elem);\n' +
  '  });\n' +
  '}\n';

var fnguard_singleline_removed = '' +
  'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
  '  "0";\n' +
  '  fn = optfn(fn);\n' +
  '\n' +
  '  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {\n' +
  '    if (err) return fn(err);\n' +
  '\n' +
  '    elem.innerHTML = htmlstr;\n' +
  '    fn(null, elem);\n' +
  '  });\n' +
  '}\n';

var fnguard_singleline_commented = '' +
  'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
  '  // fnguard.isobj(sess, cfg).isstr(tplstr).isobj(data).isdomelem(elem);\n' +
  '  fn = optfn(fn);\n' +
  '\n' +
  '  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {\n' +
  '    if (err) return fn(err);\n' +
  '\n' +
  '    elem.innerHTML = htmlstr;\n' +
  '    fn(null, elem);\n' +
  '  });\n' +
  '}\n';

var fnguard_multiline = '' +
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
  '}\n';

var fnguard_multiline_commented = '' +
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
  '}\n';

var fnguard_multiline_removed = '' +
  'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
  '  "0";\n' +
  '  fn = optfn(fn);\n' +
  '\n' +
  '  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {\n' +
  '    if (err) return fn(err);\n' +
  '\n' +
  '    elem.innerHTML = htmlstr;\n' +
  '    fn(null, elem);\n' +
  '  });\n' +
  '}\n';

var fnguard_multimultiline = '' +
  'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
  '  fnguard\n' +
  '    .isobj(sess, cfg)\n' +
  '    .isstr(tplstr)\n' +
  '    .isobj(data)\n' +
  '    .isdomelem(elem);\n' +
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
  '}\n';

var fnguard_multimultiline_commented = '' +
  'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
  '  // fnguard\n' +
  '  //   .isobj(sess, cfg)\n' +
  '  //   .isstr(tplstr)\n' +
  '  //   .isobj(data)\n' +
  '  //   .isdomelem(elem);\n' +
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
  '}\n';

var fnguard_multimultiline_removed = '' +
  'function f (sess, cfg, tplstr, data, elem, fn) {\n' +
  '  "0";\n' +
  '  "0";\n' +
  '  fn = optfn(fn);\n' +
  '\n' +
  '  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {\n' +
  '    if (err) return fn(err);\n' +
  '\n' +
  '    elem.innerHTML = htmlstr;\n' +
  '    fn(null, elem);\n' +
  '  });\n' +
  '}\n';



describe("uncomment", function () {
  it("should un-comment use of fnguard", function () {
      expect( fnguardrm.uncomment(fnguard_singleline_commented) ).toBe( fnguard_singleline );
  });

  it("should un-comment use of multiline fnguard", function () {
      expect( fnguardrm.uncomment(fnguard_multiline_commented) ).toBe( fnguard_multiline );
  });

  it("should un-comment use of multiline fnguard multiple times", function () {
      expect( fnguardrm.uncomment(fnguard_multimultiline_commented) ).toBe( fnguard_multimultiline );
  });
});

describe("comment", function () {
  it("should comment use of fnguard", function () {
    expect( fnguardrm.comment(fnguard_singleline) ).toBe( fnguard_singleline_commented );
  });

  it("should comment use of multiline fnguard", function () {
    expect( fnguardrm.comment(fnguard_multiline) ).toBe( fnguard_multiline_commented );
  });

  it("should comment use of multiline fnguard multiple times", function () {
    expect( fnguardrm.comment(fnguard_multimultiline) ).toBe( fnguard_multimultiline_commented );
  });
});

describe("astremove", function () {
  it("should replace use of fnguard with '0'", function () {
    expect( fnguardrm.astremove(fnguard_singleline) ).toBe( fnguard_singleline_removed );
  });

  it("should replace use of multiline fnguard with '0'", function () {
    expect( fnguardrm.astremove(fnguard_multiline) ).toBe( fnguard_multiline_removed );
  });

  it("should replace use of multiline fnguard with '0' multiple times", function () {
    expect( fnguardrm.astremove(fnguard_multimultiline) ).toBe( fnguard_multimultiline_removed );
  });
});

import svg from 'simplesvg';
import panzoom from 'panzoom';
import Curve from './curve.js';
// import Noise from './Noise.js';

var count = 42;
var step = Math.PI * 2/count;

export default function createRenderer(scene, functions) {
  let zoomer = panzoom(scene)
  let path = svg('path', {
    stroke: '#fff',
    'stroke-opacity': 0.8,
    fill: 'transparent'
  });
  // const noise = new Noise();
  let frameIndex = 0;
  var curves = []
  var compiledFunctions = compileFunctions(functions);

  scene.appendChild(path);

  initCurves();
  var lastRaf = window.requestAnimationFrame(frame);

  return {
    dispose,
    getPanzoom,
    recompile
  }

  function recompile() {
    try {
      var newCompiledFunction = compileFunctions(functions);
      Object.assign(compiledFunctions, newCompiledFunction);
    } catch (e) {
      return e;
    }
  }

  function frame() {
    lastRaf = window.requestAnimationFrame(frame);
    var data = curves.map(toDataCurve).join(' ');
    path.setAttributeNS(null, 'd', data);

    frameIndex += 1;
    curves.forEach(moveCurve);
  }

  function moveCurve(curve, curveIndex) {
    // curve.alpha = noise.get(frameIndex/1000, frameIndex/200 + curveIndex/1000) * 20;
    // console.log(frameIndex, curveIndex, curve.alpha)
    curve.step();

    if (curve.fromUI)
    curve.fromUI.attr({
      cx: curve.x1,
      cy: curve.y1
    });

    if (curve.toUI)
    curve.toUI.attr({
      cx: curve.x2,
      cy: curve.y2
    });
  }

  function getPanzoom() {
    return zoomer
  }

  function dispose() {
    zoomer.dispose()
    window.cancelAnimationFrame(lastRaf);
  }

  function initCurves() {
    for (var i = 0; i < count; ++i) {
      var from = i * step
      var to = (i + 1) * step

      var model = new Curve(from, to, compiledFunctions)

      // model.fromUI = makeUI(model.x1, model.y1, '#E91E63')
      // model.toUI = makeUI(model.x2, model.y2, '#2196F3')

      curves.push(model)
    }
  }

  function makeUI(x, y, color) {
    var ui = svg('circle', {
      r: 2,
      fill: color,
      cx: x,
      cy: y
    });

    scene.appendChild(ui);
    return ui;
  }

  function compileFunctions(all, result) {
    result = result || Object.create(null);
    let step = 0;

    all.forEach(compileOne);

    return result;

    function compileOne(definition, index) {
      var code = definition.code
      var safeCheck = safe(code)

      if (!safeCheck) throw new Error('Unsafe code: ' + safeCheck)

      var compiledFunction = new Function('from', 'to', 'alpha', 'window', 'document', 'return ' +  code); // eslint-disable-line

      result[definition.name] = function (curve) {
        return compiledFunction.call(undefined, curve.from, curve.to, curve.alpha); // eslint-disable-line
      };
    }
  }
}


function safe(code) {
  // Well, I'm not sure if there is any need for this.
  // Yes, it's insecure. But I don't know how to prevent XSS anyway...
  // I mean I know lots of ways to hack my own protection.
  return true;
}

function toDataCurve(curve) {
  return 'M' + curve.x0 + ' ' + curve.y0 +
      ' C' + curve.x1 + ' ' + curve.y1 +
      ', ' + curve.x2 + ' ' + curve.y2 +
      ', ' + curve.x3 + ' ' + curve.y3;
}

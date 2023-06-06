const hn = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const n of i)
      if (n.type === "childList")
        for (const s of n.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const n = {};
    return (
      i.integrity && (n.integrity = i.integrity),
      i.referrerpolicy && (n.referrerPolicy = i.referrerpolicy),
      i.crossorigin === "use-credentials"
        ? (n.credentials = "include")
        : i.crossorigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const n = e(i);
    fetch(i.href, n);
  }
};
hn();
var at = "top",
  ct = "bottom",
  ut = "right",
  ot = "left",
  ts = "auto",
  pe = [at, ct, ut, ot],
  Kt = "start",
  oe = "end",
  Zi = "clippingParents",
  Vs = "viewport",
  ie = "popper",
  qi = "reference",
  Is = pe.reduce(function (a, t) {
    return a.concat([t + "-" + Kt, t + "-" + oe]);
  }, []),
  js = [].concat(pe, [ts]).reduce(function (a, t) {
    return a.concat([t, t + "-" + Kt, t + "-" + oe]);
  }, []),
  tr = "beforeRead",
  er = "read",
  sr = "afterRead",
  ir = "beforeMain",
  rr = "main",
  nr = "afterMain",
  ar = "beforeWrite",
  or = "write",
  lr = "afterWrite",
  hr = [tr, er, sr, ir, rr, nr, ar, or, lr];
function Ot(a) {
  return a ? (a.nodeName || "").toLowerCase() : null;
}
function _t(a) {
  if (a == null) return window;
  if (a.toString() !== "[object Window]") {
    var t = a.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return a;
}
function Xt(a) {
  var t = _t(a).Element;
  return a instanceof t || a instanceof Element;
}
function gt(a) {
  var t = _t(a).HTMLElement;
  return a instanceof t || a instanceof HTMLElement;
}
function Us(a) {
  if (typeof ShadowRoot == "undefined") return !1;
  var t = _t(a).ShadowRoot;
  return a instanceof t || a instanceof ShadowRoot;
}
function cn(a) {
  var t = a.state;
  Object.keys(t.elements).forEach(function (e) {
    var r = t.styles[e] || {},
      i = t.attributes[e] || {},
      n = t.elements[e];
    !gt(n) ||
      !Ot(n) ||
      (Object.assign(n.style, r),
      Object.keys(i).forEach(function (s) {
        var o = i[s];
        o === !1 ? n.removeAttribute(s) : n.setAttribute(s, o === !0 ? "" : o);
      }));
  });
}
function un(a) {
  var t = a.state,
    e = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, e.popper),
    (t.styles = e),
    t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow),
    function () {
      Object.keys(t.elements).forEach(function (r) {
        var i = t.elements[r],
          n = t.attributes[r] || {},
          s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : e[r]),
          o = s.reduce(function (l, h) {
            return (l[h] = ""), l;
          }, {});
        !gt(i) ||
          !Ot(i) ||
          (Object.assign(i.style, o),
          Object.keys(n).forEach(function (l) {
            i.removeAttribute(l);
          }));
      });
    }
  );
}
var zs = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: cn,
  effect: un,
  requires: ["computeStyles"],
};
function wt(a) {
  return a.split("-")[0];
}
var Yt = Math.max,
  Ye = Math.min,
  le = Math.round;
function Ns() {
  var a = navigator.userAgentData;
  return a != null && a.brands
    ? a.brands
        .map(function (t) {
          return t.brand + "/" + t.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function cr() {
  return !/^((?!chrome|android).)*safari/i.test(Ns());
}
function he(a, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var r = a.getBoundingClientRect(),
    i = 1,
    n = 1;
  t &&
    gt(a) &&
    ((i = (a.offsetWidth > 0 && le(r.width) / a.offsetWidth) || 1),
    (n = (a.offsetHeight > 0 && le(r.height) / a.offsetHeight) || 1));
  var s = Xt(a) ? _t(a) : window,
    o = s.visualViewport,
    l = !cr() && e,
    h = (r.left + (l && o ? o.offsetLeft : 0)) / i,
    c = (r.top + (l && o ? o.offsetTop : 0)) / n,
    u = r.width / i,
    d = r.height / n;
  return {
    width: u,
    height: d,
    top: c,
    right: h + u,
    bottom: c + d,
    left: h,
    x: h,
    y: c,
  };
}
function Bs(a) {
  var t = he(a),
    e = a.offsetWidth,
    r = a.offsetHeight;
  return (
    Math.abs(t.width - e) <= 1 && (e = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: a.offsetLeft, y: a.offsetTop, width: e, height: r }
  );
}
function ur(a, t) {
  var e = t.getRootNode && t.getRootNode();
  if (a.contains(t)) return !0;
  if (e && Us(e)) {
    var r = t;
    do {
      if (r && a.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Mt(a) {
  return _t(a).getComputedStyle(a);
}
function dn(a) {
  return ["table", "td", "th"].indexOf(Ot(a)) >= 0;
}
function Ut(a) {
  return ((Xt(a) ? a.ownerDocument : a.document) || window.document)
    .documentElement;
}
function es(a) {
  return Ot(a) === "html"
    ? a
    : a.assignedSlot || a.parentNode || (Us(a) ? a.host : null) || Ut(a);
}
function ni(a) {
  return !gt(a) || Mt(a).position === "fixed" ? null : a.offsetParent;
}
function fn(a) {
  var t = /firefox/i.test(Ns()),
    e = /Trident/i.test(Ns());
  if (e && gt(a)) {
    var r = Mt(a);
    if (r.position === "fixed") return null;
  }
  var i = es(a);
  for (Us(i) && (i = i.host); gt(i) && ["html", "body"].indexOf(Ot(i)) < 0; ) {
    var n = Mt(i);
    if (
      n.transform !== "none" ||
      n.perspective !== "none" ||
      n.contain === "paint" ||
      ["transform", "perspective"].indexOf(n.willChange) !== -1 ||
      (t && n.willChange === "filter") ||
      (t && n.filter && n.filter !== "none")
    )
      return i;
    i = i.parentNode;
  }
  return null;
}
function Pe(a) {
  for (var t = _t(a), e = ni(a); e && dn(e) && Mt(e).position === "static"; )
    e = ni(e);
  return e &&
    (Ot(e) === "html" || (Ot(e) === "body" && Mt(e).position === "static"))
    ? t
    : e || fn(a) || t;
}
function Ws(a) {
  return ["top", "bottom"].indexOf(a) >= 0 ? "x" : "y";
}
function Se(a, t, e) {
  return Yt(a, Ye(t, e));
}
function pn(a, t, e) {
  var r = Se(a, t, e);
  return r > e ? e : r;
}
function dr() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function fr(a) {
  return Object.assign({}, dr(), a);
}
function pr(a, t) {
  return t.reduce(function (e, r) {
    return (e[r] = a), e;
  }, {});
}
var gn = function (t, e) {
  return (
    (t =
      typeof t == "function"
        ? t(Object.assign({}, e.rects, { placement: e.placement }))
        : t),
    fr(typeof t != "number" ? t : pr(t, pe))
  );
};
function mn(a) {
  var t,
    e = a.state,
    r = a.name,
    i = a.options,
    n = e.elements.arrow,
    s = e.modifiersData.popperOffsets,
    o = wt(e.placement),
    l = Ws(o),
    h = [ot, ut].indexOf(o) >= 0,
    c = h ? "height" : "width";
  if (!(!n || !s)) {
    var u = gn(i.padding, e),
      d = Bs(n),
      f = l === "y" ? at : ot,
      p = l === "y" ? ct : ut,
      g =
        e.rects.reference[c] + e.rects.reference[l] - s[l] - e.rects.popper[c],
      m = s[l] - e.rects.reference[l],
      v = Pe(n),
      _ = v ? (l === "y" ? v.clientHeight || 0 : v.clientWidth || 0) : 0,
      x = g / 2 - m / 2,
      y = u[f],
      E = _ - d[c] - u[p],
      b = _ / 2 - d[c] / 2 + x,
      S = Se(y, b, E),
      C = l;
    e.modifiersData[r] = ((t = {}), (t[C] = S), (t.centerOffset = S - b), t);
  }
}
function vn(a) {
  var t = a.state,
    e = a.options,
    r = e.element,
    i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null &&
    ((typeof i == "string" && ((i = t.elements.popper.querySelector(i)), !i)) ||
      !ur(t.elements.popper, i) ||
      (t.elements.arrow = i));
}
var gr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: mn,
  effect: vn,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function ce(a) {
  return a.split("-")[1];
}
var _n = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function yn(a) {
  var t = a.x,
    e = a.y,
    r = window,
    i = r.devicePixelRatio || 1;
  return { x: le(t * i) / i || 0, y: le(e * i) / i || 0 };
}
function ai(a) {
  var t,
    e = a.popper,
    r = a.popperRect,
    i = a.placement,
    n = a.variation,
    s = a.offsets,
    o = a.position,
    l = a.gpuAcceleration,
    h = a.adaptive,
    c = a.roundOffsets,
    u = a.isFixed,
    d = s.x,
    f = d === void 0 ? 0 : d,
    p = s.y,
    g = p === void 0 ? 0 : p,
    m = typeof c == "function" ? c({ x: f, y: g }) : { x: f, y: g };
  (f = m.x), (g = m.y);
  var v = s.hasOwnProperty("x"),
    _ = s.hasOwnProperty("y"),
    x = ot,
    y = at,
    E = window;
  if (h) {
    var b = Pe(e),
      S = "clientHeight",
      C = "clientWidth";
    if (
      (b === _t(e) &&
        ((b = Ut(e)),
        Mt(b).position !== "static" &&
          o === "absolute" &&
          ((S = "scrollHeight"), (C = "scrollWidth"))),
      (b = b),
      i === at || ((i === ot || i === ut) && n === oe))
    ) {
      y = ct;
      var R = u && b === E && E.visualViewport ? E.visualViewport.height : b[S];
      (g -= R - r.height), (g *= l ? 1 : -1);
    }
    if (i === ot || ((i === at || i === ct) && n === oe)) {
      x = ut;
      var N = u && b === E && E.visualViewport ? E.visualViewport.width : b[C];
      (f -= N - r.width), (f *= l ? 1 : -1);
    }
  }
  var T = Object.assign({ position: o }, h && _n),
    w = c === !0 ? yn({ x: f, y: g }) : { x: f, y: g };
  if (((f = w.x), (g = w.y), l)) {
    var P;
    return Object.assign(
      {},
      T,
      ((P = {}),
      (P[y] = _ ? "0" : ""),
      (P[x] = v ? "0" : ""),
      (P.transform =
        (E.devicePixelRatio || 1) <= 1
          ? "translate(" + f + "px, " + g + "px)"
          : "translate3d(" + f + "px, " + g + "px, 0)"),
      P)
    );
  }
  return Object.assign(
    {},
    T,
    ((t = {}),
    (t[y] = _ ? g + "px" : ""),
    (t[x] = v ? f + "px" : ""),
    (t.transform = ""),
    t)
  );
}
function bn(a) {
  var t = a.state,
    e = a.options,
    r = e.gpuAcceleration,
    i = r === void 0 ? !0 : r,
    n = e.adaptive,
    s = n === void 0 ? !0 : n,
    o = e.roundOffsets,
    l = o === void 0 ? !0 : o,
    h = {
      placement: wt(t.placement),
      variation: ce(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: i,
      isFixed: t.options.strategy === "fixed",
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      ai(
        Object.assign({}, h, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: s,
          roundOffsets: l,
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        ai(
          Object.assign({}, h, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: l,
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    }));
}
var Hs = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: bn,
    data: {},
  },
  Fe = { passive: !0 };
function En(a) {
  var t = a.state,
    e = a.instance,
    r = a.options,
    i = r.scroll,
    n = i === void 0 ? !0 : i,
    s = r.resize,
    o = s === void 0 ? !0 : s,
    l = _t(t.elements.popper),
    h = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    n &&
      h.forEach(function (c) {
        c.addEventListener("scroll", e.update, Fe);
      }),
    o && l.addEventListener("resize", e.update, Fe),
    function () {
      n &&
        h.forEach(function (c) {
          c.removeEventListener("scroll", e.update, Fe);
        }),
        o && l.removeEventListener("resize", e.update, Fe);
    }
  );
}
var Gs = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: En,
    data: {},
  },
  xn = { left: "right", right: "left", bottom: "top", top: "bottom" };
function We(a) {
  return a.replace(/left|right|bottom|top/g, function (t) {
    return xn[t];
  });
}
var Tn = { start: "end", end: "start" };
function oi(a) {
  return a.replace(/start|end/g, function (t) {
    return Tn[t];
  });
}
function Ys(a) {
  var t = _t(a),
    e = t.pageXOffset,
    r = t.pageYOffset;
  return { scrollLeft: e, scrollTop: r };
}
function Ks(a) {
  return he(Ut(a)).left + Ys(a).scrollLeft;
}
function wn(a, t) {
  var e = _t(a),
    r = Ut(a),
    i = e.visualViewport,
    n = r.clientWidth,
    s = r.clientHeight,
    o = 0,
    l = 0;
  if (i) {
    (n = i.width), (s = i.height);
    var h = cr();
    (h || (!h && t === "fixed")) && ((o = i.offsetLeft), (l = i.offsetTop));
  }
  return { width: n, height: s, x: o + Ks(a), y: l };
}
function Sn(a) {
  var t,
    e = Ut(a),
    r = Ys(a),
    i = (t = a.ownerDocument) == null ? void 0 : t.body,
    n = Yt(
      e.scrollWidth,
      e.clientWidth,
      i ? i.scrollWidth : 0,
      i ? i.clientWidth : 0
    ),
    s = Yt(
      e.scrollHeight,
      e.clientHeight,
      i ? i.scrollHeight : 0,
      i ? i.clientHeight : 0
    ),
    o = -r.scrollLeft + Ks(a),
    l = -r.scrollTop;
  return (
    Mt(i || e).direction === "rtl" &&
      (o += Yt(e.clientWidth, i ? i.clientWidth : 0) - n),
    { width: n, height: s, x: o, y: l }
  );
}
function Xs(a) {
  var t = Mt(a),
    e = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + r);
}
function mr(a) {
  return ["html", "body", "#document"].indexOf(Ot(a)) >= 0
    ? a.ownerDocument.body
    : gt(a) && Xs(a)
    ? a
    : mr(es(a));
}
function Ae(a, t) {
  var e;
  t === void 0 && (t = []);
  var r = mr(a),
    i = r === ((e = a.ownerDocument) == null ? void 0 : e.body),
    n = _t(r),
    s = i ? [n].concat(n.visualViewport || [], Xs(r) ? r : []) : r,
    o = t.concat(s);
  return i ? o : o.concat(Ae(es(s)));
}
function Ls(a) {
  return Object.assign({}, a, {
    left: a.x,
    top: a.y,
    right: a.x + a.width,
    bottom: a.y + a.height,
  });
}
function An(a, t) {
  var e = he(a, !1, t === "fixed");
  return (
    (e.top = e.top + a.clientTop),
    (e.left = e.left + a.clientLeft),
    (e.bottom = e.top + a.clientHeight),
    (e.right = e.left + a.clientWidth),
    (e.width = a.clientWidth),
    (e.height = a.clientHeight),
    (e.x = e.left),
    (e.y = e.top),
    e
  );
}
function li(a, t, e) {
  return t === Vs ? Ls(wn(a, e)) : Xt(t) ? An(t, e) : Ls(Sn(Ut(a)));
}
function On(a) {
  var t = Ae(es(a)),
    e = ["absolute", "fixed"].indexOf(Mt(a).position) >= 0,
    r = e && gt(a) ? Pe(a) : a;
  return Xt(r)
    ? t.filter(function (i) {
        return Xt(i) && ur(i, r) && Ot(i) !== "body";
      })
    : [];
}
function Cn(a, t, e, r) {
  var i = t === "clippingParents" ? On(a) : [].concat(t),
    n = [].concat(i, [e]),
    s = n[0],
    o = n.reduce(function (l, h) {
      var c = li(a, h, r);
      return (
        (l.top = Yt(c.top, l.top)),
        (l.right = Ye(c.right, l.right)),
        (l.bottom = Ye(c.bottom, l.bottom)),
        (l.left = Yt(c.left, l.left)),
        l
      );
    }, li(a, s, r));
  return (
    (o.width = o.right - o.left),
    (o.height = o.bottom - o.top),
    (o.x = o.left),
    (o.y = o.top),
    o
  );
}
function vr(a) {
  var t = a.reference,
    e = a.element,
    r = a.placement,
    i = r ? wt(r) : null,
    n = r ? ce(r) : null,
    s = t.x + t.width / 2 - e.width / 2,
    o = t.y + t.height / 2 - e.height / 2,
    l;
  switch (i) {
    case at:
      l = { x: s, y: t.y - e.height };
      break;
    case ct:
      l = { x: s, y: t.y + t.height };
      break;
    case ut:
      l = { x: t.x + t.width, y: o };
      break;
    case ot:
      l = { x: t.x - e.width, y: o };
      break;
    default:
      l = { x: t.x, y: t.y };
  }
  var h = i ? Ws(i) : null;
  if (h != null) {
    var c = h === "y" ? "height" : "width";
    switch (n) {
      case Kt:
        l[h] = l[h] - (t[c] / 2 - e[c] / 2);
        break;
      case oe:
        l[h] = l[h] + (t[c] / 2 - e[c] / 2);
        break;
    }
  }
  return l;
}
function ue(a, t) {
  t === void 0 && (t = {});
  var e = t,
    r = e.placement,
    i = r === void 0 ? a.placement : r,
    n = e.strategy,
    s = n === void 0 ? a.strategy : n,
    o = e.boundary,
    l = o === void 0 ? Zi : o,
    h = e.rootBoundary,
    c = h === void 0 ? Vs : h,
    u = e.elementContext,
    d = u === void 0 ? ie : u,
    f = e.altBoundary,
    p = f === void 0 ? !1 : f,
    g = e.padding,
    m = g === void 0 ? 0 : g,
    v = fr(typeof m != "number" ? m : pr(m, pe)),
    _ = d === ie ? qi : ie,
    x = a.rects.popper,
    y = a.elements[p ? _ : d],
    E = Cn(Xt(y) ? y : y.contextElement || Ut(a.elements.popper), l, c, s),
    b = he(a.elements.reference),
    S = vr({ reference: b, element: x, strategy: "absolute", placement: i }),
    C = Ls(Object.assign({}, x, S)),
    R = d === ie ? C : b,
    N = {
      top: E.top - R.top + v.top,
      bottom: R.bottom - E.bottom + v.bottom,
      left: E.left - R.left + v.left,
      right: R.right - E.right + v.right,
    },
    T = a.modifiersData.offset;
  if (d === ie && T) {
    var w = T[i];
    Object.keys(N).forEach(function (P) {
      var O = [ut, ct].indexOf(P) >= 0 ? 1 : -1,
        M = [at, ct].indexOf(P) >= 0 ? "y" : "x";
      N[P] += w[M] * O;
    });
  }
  return N;
}
function Pn(a, t) {
  t === void 0 && (t = {});
  var e = t,
    r = e.placement,
    i = e.boundary,
    n = e.rootBoundary,
    s = e.padding,
    o = e.flipVariations,
    l = e.allowedAutoPlacements,
    h = l === void 0 ? js : l,
    c = ce(r),
    u = c
      ? o
        ? Is
        : Is.filter(function (p) {
            return ce(p) === c;
          })
      : pe,
    d = u.filter(function (p) {
      return h.indexOf(p) >= 0;
    });
  d.length === 0 && (d = u);
  var f = d.reduce(function (p, g) {
    return (
      (p[g] = ue(a, { placement: g, boundary: i, rootBoundary: n, padding: s })[
        wt(g)
      ]),
      p
    );
  }, {});
  return Object.keys(f).sort(function (p, g) {
    return f[p] - f[g];
  });
}
function Rn(a) {
  if (wt(a) === ts) return [];
  var t = We(a);
  return [oi(a), t, oi(t)];
}
function In(a) {
  var t = a.state,
    e = a.options,
    r = a.name;
  if (!t.modifiersData[r]._skip) {
    for (
      var i = e.mainAxis,
        n = i === void 0 ? !0 : i,
        s = e.altAxis,
        o = s === void 0 ? !0 : s,
        l = e.fallbackPlacements,
        h = e.padding,
        c = e.boundary,
        u = e.rootBoundary,
        d = e.altBoundary,
        f = e.flipVariations,
        p = f === void 0 ? !0 : f,
        g = e.allowedAutoPlacements,
        m = t.options.placement,
        v = wt(m),
        _ = v === m,
        x = l || (_ || !p ? [We(m)] : Rn(m)),
        y = [m].concat(x).reduce(function (X, Z) {
          return X.concat(
            wt(Z) === ts
              ? Pn(t, {
                  placement: Z,
                  boundary: c,
                  rootBoundary: u,
                  padding: h,
                  flipVariations: p,
                  allowedAutoPlacements: g,
                })
              : Z
          );
        }, []),
        E = t.rects.reference,
        b = t.rects.popper,
        S = new Map(),
        C = !0,
        R = y[0],
        N = 0;
      N < y.length;
      N++
    ) {
      var T = y[N],
        w = wt(T),
        P = ce(T) === Kt,
        O = [at, ct].indexOf(w) >= 0,
        M = O ? "width" : "height",
        I = ue(t, {
          placement: T,
          boundary: c,
          rootBoundary: u,
          altBoundary: d,
          padding: h,
        }),
        D = O ? (P ? ut : ot) : P ? ct : at;
      E[M] > b[M] && (D = We(D));
      var $ = We(D),
        U = [];
      if (
        (n && U.push(I[w] <= 0),
        o && U.push(I[D] <= 0, I[$] <= 0),
        U.every(function (X) {
          return X;
        }))
      ) {
        (R = T), (C = !1);
        break;
      }
      S.set(T, U);
    }
    if (C)
      for (
        var z = p ? 3 : 1,
          k = function (Z) {
            var et = y.find(function (J) {
              var H = S.get(J);
              if (H)
                return H.slice(0, Z).every(function (st) {
                  return st;
                });
            });
            if (et) return (R = et), "break";
          },
          B = z;
        B > 0;
        B--
      ) {
        var tt = k(B);
        if (tt === "break") break;
      }
    t.placement !== R &&
      ((t.modifiersData[r]._skip = !0), (t.placement = R), (t.reset = !0));
  }
}
var _r = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: In,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function hi(a, t, e) {
  return (
    e === void 0 && (e = { x: 0, y: 0 }),
    {
      top: a.top - t.height - e.y,
      right: a.right - t.width + e.x,
      bottom: a.bottom - t.height + e.y,
      left: a.left - t.width - e.x,
    }
  );
}
function ci(a) {
  return [at, ut, ct, ot].some(function (t) {
    return a[t] >= 0;
  });
}
function Nn(a) {
  var t = a.state,
    e = a.name,
    r = t.rects.reference,
    i = t.rects.popper,
    n = t.modifiersData.preventOverflow,
    s = ue(t, { elementContext: "reference" }),
    o = ue(t, { altBoundary: !0 }),
    l = hi(s, r),
    h = hi(o, i, n),
    c = ci(l),
    u = ci(h);
  (t.modifiersData[e] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: h,
    isReferenceHidden: c,
    hasPopperEscaped: u,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": c,
      "data-popper-escaped": u,
    }));
}
var yr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Nn,
};
function Ln(a, t, e) {
  var r = wt(a),
    i = [ot, at].indexOf(r) >= 0 ? -1 : 1,
    n = typeof e == "function" ? e(Object.assign({}, t, { placement: a })) : e,
    s = n[0],
    o = n[1];
  return (
    (s = s || 0),
    (o = (o || 0) * i),
    [ot, ut].indexOf(r) >= 0 ? { x: o, y: s } : { x: s, y: o }
  );
}
function Mn(a) {
  var t = a.state,
    e = a.options,
    r = a.name,
    i = e.offset,
    n = i === void 0 ? [0, 0] : i,
    s = js.reduce(function (c, u) {
      return (c[u] = Ln(u, t.rects, n)), c;
    }, {}),
    o = s[t.placement],
    l = o.x,
    h = o.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += l),
    (t.modifiersData.popperOffsets.y += h)),
    (t.modifiersData[r] = s);
}
var br = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Mn,
};
function Dn(a) {
  var t = a.state,
    e = a.name;
  t.modifiersData[e] = vr({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement,
  });
}
var Qs = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Dn,
  data: {},
};
function kn(a) {
  return a === "x" ? "y" : "x";
}
function Fn(a) {
  var t = a.state,
    e = a.options,
    r = a.name,
    i = e.mainAxis,
    n = i === void 0 ? !0 : i,
    s = e.altAxis,
    o = s === void 0 ? !1 : s,
    l = e.boundary,
    h = e.rootBoundary,
    c = e.altBoundary,
    u = e.padding,
    d = e.tether,
    f = d === void 0 ? !0 : d,
    p = e.tetherOffset,
    g = p === void 0 ? 0 : p,
    m = ue(t, { boundary: l, rootBoundary: h, padding: u, altBoundary: c }),
    v = wt(t.placement),
    _ = ce(t.placement),
    x = !_,
    y = Ws(v),
    E = kn(y),
    b = t.modifiersData.popperOffsets,
    S = t.rects.reference,
    C = t.rects.popper,
    R =
      typeof g == "function"
        ? g(Object.assign({}, t.rects, { placement: t.placement }))
        : g,
    N =
      typeof R == "number"
        ? { mainAxis: R, altAxis: R }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, R),
    T = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    w = { x: 0, y: 0 };
  if (!!b) {
    if (n) {
      var P,
        O = y === "y" ? at : ot,
        M = y === "y" ? ct : ut,
        I = y === "y" ? "height" : "width",
        D = b[y],
        $ = D + m[O],
        U = D - m[M],
        z = f ? -C[I] / 2 : 0,
        k = _ === Kt ? S[I] : C[I],
        B = _ === Kt ? -C[I] : -S[I],
        tt = t.elements.arrow,
        X = f && tt ? Bs(tt) : { width: 0, height: 0 },
        Z = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : dr(),
        et = Z[O],
        J = Z[M],
        H = Se(0, S[I], X[I]),
        st = x ? S[I] / 2 - z - H - et - N.mainAxis : k - H - et - N.mainAxis,
        dt = x ? -S[I] / 2 + z + H + J + N.mainAxis : B + H + J + N.mainAxis,
        nt = t.elements.arrow && Pe(t.elements.arrow),
        ht = nt ? (y === "y" ? nt.clientTop || 0 : nt.clientLeft || 0) : 0,
        K = (P = T == null ? void 0 : T[y]) != null ? P : 0,
        W = D + st - K - ht,
        it = D + dt - K,
        rt = Se(f ? Ye($, W) : $, D, f ? Yt(U, it) : U);
      (b[y] = rt), (w[y] = rt - D);
    }
    if (o) {
      var kt,
        fs = y === "x" ? at : ot,
        Me = y === "x" ? ct : ut,
        xt = b[E],
        Wt = E === "y" ? "height" : "width",
        _e = xt + m[fs],
        ye = xt - m[Me],
        be = [at, ot].indexOf(v) !== -1,
        Ee = (kt = T == null ? void 0 : T[E]) != null ? kt : 0,
        De = be ? _e : xt - S[Wt] - C[Wt] - Ee + N.altAxis,
        Ct = be ? xt + S[Wt] + C[Wt] - Ee - N.altAxis : ye,
        Pt = f && be ? pn(De, xt, Ct) : Se(f ? De : _e, xt, f ? Ct : ye);
      (b[E] = Pt), (w[E] = Pt - xt);
    }
    t.modifiersData[r] = w;
  }
}
var Er = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Fn,
  requiresIfExists: ["offset"],
};
function $n(a) {
  return { scrollLeft: a.scrollLeft, scrollTop: a.scrollTop };
}
function Vn(a) {
  return a === _t(a) || !gt(a) ? Ys(a) : $n(a);
}
function jn(a) {
  var t = a.getBoundingClientRect(),
    e = le(t.width) / a.offsetWidth || 1,
    r = le(t.height) / a.offsetHeight || 1;
  return e !== 1 || r !== 1;
}
function Un(a, t, e) {
  e === void 0 && (e = !1);
  var r = gt(t),
    i = gt(t) && jn(t),
    n = Ut(t),
    s = he(a, i, e),
    o = { scrollLeft: 0, scrollTop: 0 },
    l = { x: 0, y: 0 };
  return (
    (r || (!r && !e)) &&
      ((Ot(t) !== "body" || Xs(n)) && (o = Vn(t)),
      gt(t)
        ? ((l = he(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop))
        : n && (l.x = Ks(n))),
    {
      x: s.left + o.scrollLeft - l.x,
      y: s.top + o.scrollTop - l.y,
      width: s.width,
      height: s.height,
    }
  );
}
function zn(a) {
  var t = new Map(),
    e = new Set(),
    r = [];
  a.forEach(function (n) {
    t.set(n.name, n);
  });
  function i(n) {
    e.add(n.name);
    var s = [].concat(n.requires || [], n.requiresIfExists || []);
    s.forEach(function (o) {
      if (!e.has(o)) {
        var l = t.get(o);
        l && i(l);
      }
    }),
      r.push(n);
  }
  return (
    a.forEach(function (n) {
      e.has(n.name) || i(n);
    }),
    r
  );
}
function Bn(a) {
  var t = zn(a);
  return hr.reduce(function (e, r) {
    return e.concat(
      t.filter(function (i) {
        return i.phase === r;
      })
    );
  }, []);
}
function Wn(a) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (e) {
          Promise.resolve().then(function () {
            (t = void 0), e(a());
          });
        })),
      t
    );
  };
}
function Hn(a) {
  var t = a.reduce(function (e, r) {
    var i = e[r.name];
    return (
      (e[r.name] = i
        ? Object.assign({}, i, r, {
            options: Object.assign({}, i.options, r.options),
            data: Object.assign({}, i.data, r.data),
          })
        : r),
      e
    );
  }, {});
  return Object.keys(t).map(function (e) {
    return t[e];
  });
}
var ui = { placement: "bottom", modifiers: [], strategy: "absolute" };
function di() {
  for (var a = arguments.length, t = new Array(a), e = 0; e < a; e++)
    t[e] = arguments[e];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function ss(a) {
  a === void 0 && (a = {});
  var t = a,
    e = t.defaultModifiers,
    r = e === void 0 ? [] : e,
    i = t.defaultOptions,
    n = i === void 0 ? ui : i;
  return function (o, l, h) {
    h === void 0 && (h = n);
    var c = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, ui, n),
        modifiersData: {},
        elements: { reference: o, popper: l },
        attributes: {},
        styles: {},
      },
      u = [],
      d = !1,
      f = {
        state: c,
        setOptions: function (v) {
          var _ = typeof v == "function" ? v(c.options) : v;
          g(),
            (c.options = Object.assign({}, n, c.options, _)),
            (c.scrollParents = {
              reference: Xt(o)
                ? Ae(o)
                : o.contextElement
                ? Ae(o.contextElement)
                : [],
              popper: Ae(l),
            });
          var x = Bn(Hn([].concat(r, c.options.modifiers)));
          return (
            (c.orderedModifiers = x.filter(function (y) {
              return y.enabled;
            })),
            p(),
            f.update()
          );
        },
        forceUpdate: function () {
          if (!d) {
            var v = c.elements,
              _ = v.reference,
              x = v.popper;
            if (!!di(_, x)) {
              (c.rects = {
                reference: Un(_, Pe(x), c.options.strategy === "fixed"),
                popper: Bs(x),
              }),
                (c.reset = !1),
                (c.placement = c.options.placement),
                c.orderedModifiers.forEach(function (N) {
                  return (c.modifiersData[N.name] = Object.assign({}, N.data));
                });
              for (var y = 0; y < c.orderedModifiers.length; y++) {
                if (c.reset === !0) {
                  (c.reset = !1), (y = -1);
                  continue;
                }
                var E = c.orderedModifiers[y],
                  b = E.fn,
                  S = E.options,
                  C = S === void 0 ? {} : S,
                  R = E.name;
                typeof b == "function" &&
                  (c = b({ state: c, options: C, name: R, instance: f }) || c);
              }
            }
          }
        },
        update: Wn(function () {
          return new Promise(function (m) {
            f.forceUpdate(), m(c);
          });
        }),
        destroy: function () {
          g(), (d = !0);
        },
      };
    if (!di(o, l)) return f;
    f.setOptions(h).then(function (m) {
      !d && h.onFirstUpdate && h.onFirstUpdate(m);
    });
    function p() {
      c.orderedModifiers.forEach(function (m) {
        var v = m.name,
          _ = m.options,
          x = _ === void 0 ? {} : _,
          y = m.effect;
        if (typeof y == "function") {
          var E = y({ state: c, name: v, instance: f, options: x }),
            b = function () {};
          u.push(E || b);
        }
      });
    }
    function g() {
      u.forEach(function (m) {
        return m();
      }),
        (u = []);
    }
    return f;
  };
}
var Gn = ss(),
  Yn = [Gs, Qs, Hs, zs],
  Kn = ss({ defaultModifiers: Yn }),
  Xn = [Gs, Qs, Hs, zs, br, _r, Er, gr, yr],
  Js = ss({ defaultModifiers: Xn }),
  xr = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        popperGenerator: ss,
        detectOverflow: ue,
        createPopperBase: Gn,
        createPopper: Js,
        createPopperLite: Kn,
        top: at,
        bottom: ct,
        right: ut,
        left: ot,
        auto: ts,
        basePlacements: pe,
        start: Kt,
        end: oe,
        clippingParents: Zi,
        viewport: Vs,
        popper: ie,
        reference: qi,
        variationPlacements: Is,
        placements: js,
        beforeRead: tr,
        read: er,
        afterRead: sr,
        beforeMain: ir,
        main: rr,
        afterMain: nr,
        beforeWrite: ar,
        write: or,
        afterWrite: lr,
        modifierPhases: hr,
        applyStyles: zs,
        arrow: gr,
        computeStyles: Hs,
        eventListeners: Gs,
        flip: _r,
        hide: yr,
        offset: br,
        popperOffsets: Qs,
        preventOverflow: Er,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
/*!
 * Bootstrap v5.2.3 (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ const Qn = 1e6,
  Jn = 1e3,
  Ms = "transitionend",
  Zn = (a) =>
    a == null
      ? `${a}`
      : Object.prototype.toString
          .call(a)
          .match(/\s([a-z]+)/i)[1]
          .toLowerCase(),
  qn = (a) => {
    do a += Math.floor(Math.random() * Qn);
    while (document.getElementById(a));
    return a;
  },
  Tr = (a) => {
    let t = a.getAttribute("data-bs-target");
    if (!t || t === "#") {
      let e = a.getAttribute("href");
      if (!e || (!e.includes("#") && !e.startsWith("."))) return null;
      e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`),
        (t = e && e !== "#" ? e.trim() : null);
    }
    return t;
  },
  wr = (a) => {
    const t = Tr(a);
    return t && document.querySelector(t) ? t : null;
  },
  It = (a) => {
    const t = Tr(a);
    return t ? document.querySelector(t) : null;
  },
  ta = (a) => {
    if (!a) return 0;
    let { transitionDuration: t, transitionDelay: e } =
      window.getComputedStyle(a);
    const r = Number.parseFloat(t),
      i = Number.parseFloat(e);
    return !r && !i
      ? 0
      : ((t = t.split(",")[0]),
        (e = e.split(",")[0]),
        (Number.parseFloat(t) + Number.parseFloat(e)) * Jn);
  },
  Sr = (a) => {
    a.dispatchEvent(new Event(Ms));
  },
  Nt = (a) =>
    !a || typeof a != "object"
      ? !1
      : (typeof a.jquery != "undefined" && (a = a[0]),
        typeof a.nodeType != "undefined"),
  $t = (a) =>
    Nt(a)
      ? a.jquery
        ? a[0]
        : a
      : typeof a == "string" && a.length > 0
      ? document.querySelector(a)
      : null,
  ge = (a) => {
    if (!Nt(a) || a.getClientRects().length === 0) return !1;
    const t = getComputedStyle(a).getPropertyValue("visibility") === "visible",
      e = a.closest("details:not([open])");
    if (!e) return t;
    if (e !== a) {
      const r = a.closest("summary");
      if ((r && r.parentNode !== e) || r === null) return !1;
    }
    return t;
  },
  Vt = (a) =>
    !a || a.nodeType !== Node.ELEMENT_NODE || a.classList.contains("disabled")
      ? !0
      : typeof a.disabled != "undefined"
      ? a.disabled
      : a.hasAttribute("disabled") && a.getAttribute("disabled") !== "false",
  Ar = (a) => {
    if (!document.documentElement.attachShadow) return null;
    if (typeof a.getRootNode == "function") {
      const t = a.getRootNode();
      return t instanceof ShadowRoot ? t : null;
    }
    return a instanceof ShadowRoot ? a : a.parentNode ? Ar(a.parentNode) : null;
  },
  Ke = () => {},
  Re = (a) => {
    a.offsetHeight;
  },
  Or = () =>
    window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
      ? window.jQuery
      : null,
  gs = [],
  ea = (a) => {
    document.readyState === "loading"
      ? (gs.length ||
          document.addEventListener("DOMContentLoaded", () => {
            for (const t of gs) t();
          }),
        gs.push(a))
      : a();
  },
  vt = () => document.documentElement.dir === "rtl",
  yt = (a) => {
    ea(() => {
      const t = Or();
      if (t) {
        const e = a.NAME,
          r = t.fn[e];
        (t.fn[e] = a.jQueryInterface),
          (t.fn[e].Constructor = a),
          (t.fn[e].noConflict = () => ((t.fn[e] = r), a.jQueryInterface));
      }
    });
  },
  Rt = (a) => {
    typeof a == "function" && a();
  },
  Cr = (a, t, e = !0) => {
    if (!e) {
      Rt(a);
      return;
    }
    const r = 5,
      i = ta(t) + r;
    let n = !1;
    const s = ({ target: o }) => {
      o === t && ((n = !0), t.removeEventListener(Ms, s), Rt(a));
    };
    t.addEventListener(Ms, s),
      setTimeout(() => {
        n || Sr(t);
      }, i);
  },
  Zs = (a, t, e, r) => {
    const i = a.length;
    let n = a.indexOf(t);
    return n === -1
      ? !e && r
        ? a[i - 1]
        : a[0]
      : ((n += e ? 1 : -1),
        r && (n = (n + i) % i),
        a[Math.max(0, Math.min(n, i - 1))]);
  },
  sa = /[^.]*(?=\..*)\.|.*/,
  ia = /\..*/,
  ra = /::\d+$/,
  ms = {};
let fi = 1;
const Pr = { mouseenter: "mouseover", mouseleave: "mouseout" },
  na = new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll",
  ]);
function Rr(a, t) {
  return (t && `${t}::${fi++}`) || a.uidEvent || fi++;
}
function Ir(a) {
  const t = Rr(a);
  return (a.uidEvent = t), (ms[t] = ms[t] || {}), ms[t];
}
function aa(a, t) {
  return function e(r) {
    return (
      qs(r, { delegateTarget: a }),
      e.oneOff && A.off(a, r.type, t),
      t.apply(a, [r])
    );
  };
}
function oa(a, t, e) {
  return function r(i) {
    const n = a.querySelectorAll(t);
    for (let { target: s } = i; s && s !== this; s = s.parentNode)
      for (const o of n)
        if (o === s)
          return (
            qs(i, { delegateTarget: s }),
            r.oneOff && A.off(a, i.type, t, e),
            e.apply(s, [i])
          );
  };
}
function Nr(a, t, e = null) {
  return Object.values(a).find(
    (r) => r.callable === t && r.delegationSelector === e
  );
}
function Lr(a, t, e) {
  const r = typeof t == "string",
    i = r ? e : t || e;
  let n = Mr(a);
  return na.has(n) || (n = a), [r, i, n];
}
function pi(a, t, e, r, i) {
  if (typeof t != "string" || !a) return;
  let [n, s, o] = Lr(t, e, r);
  t in Pr &&
    (s = ((p) =>
      function (g) {
        if (
          !g.relatedTarget ||
          (g.relatedTarget !== g.delegateTarget &&
            !g.delegateTarget.contains(g.relatedTarget))
        )
          return p.call(this, g);
      })(s));
  const l = Ir(a),
    h = l[o] || (l[o] = {}),
    c = Nr(h, s, n ? e : null);
  if (c) {
    c.oneOff = c.oneOff && i;
    return;
  }
  const u = Rr(s, t.replace(sa, "")),
    d = n ? oa(a, e, s) : aa(a, s);
  (d.delegationSelector = n ? e : null),
    (d.callable = s),
    (d.oneOff = i),
    (d.uidEvent = u),
    (h[u] = d),
    a.addEventListener(o, d, n);
}
function Ds(a, t, e, r, i) {
  const n = Nr(t[e], r, i);
  !n || (a.removeEventListener(e, n, Boolean(i)), delete t[e][n.uidEvent]);
}
function la(a, t, e, r) {
  const i = t[e] || {};
  for (const n of Object.keys(i))
    if (n.includes(r)) {
      const s = i[n];
      Ds(a, t, e, s.callable, s.delegationSelector);
    }
}
function Mr(a) {
  return (a = a.replace(ia, "")), Pr[a] || a;
}
const A = {
  on(a, t, e, r) {
    pi(a, t, e, r, !1);
  },
  one(a, t, e, r) {
    pi(a, t, e, r, !0);
  },
  off(a, t, e, r) {
    if (typeof t != "string" || !a) return;
    const [i, n, s] = Lr(t, e, r),
      o = s !== t,
      l = Ir(a),
      h = l[s] || {},
      c = t.startsWith(".");
    if (typeof n != "undefined") {
      if (!Object.keys(h).length) return;
      Ds(a, l, s, n, i ? e : null);
      return;
    }
    if (c) for (const u of Object.keys(l)) la(a, l, u, t.slice(1));
    for (const u of Object.keys(h)) {
      const d = u.replace(ra, "");
      if (!o || t.includes(d)) {
        const f = h[u];
        Ds(a, l, s, f.callable, f.delegationSelector);
      }
    }
  },
  trigger(a, t, e) {
    if (typeof t != "string" || !a) return null;
    const r = Or(),
      i = Mr(t),
      n = t !== i;
    let s = null,
      o = !0,
      l = !0,
      h = !1;
    n &&
      r &&
      ((s = r.Event(t, e)),
      r(a).trigger(s),
      (o = !s.isPropagationStopped()),
      (l = !s.isImmediatePropagationStopped()),
      (h = s.isDefaultPrevented()));
    let c = new Event(t, { bubbles: o, cancelable: !0 });
    return (
      (c = qs(c, e)),
      h && c.preventDefault(),
      l && a.dispatchEvent(c),
      c.defaultPrevented && s && s.preventDefault(),
      c
    );
  },
};
function qs(a, t) {
  for (const [e, r] of Object.entries(t || {}))
    try {
      a[e] = r;
    } catch {
      Object.defineProperty(a, e, {
        configurable: !0,
        get() {
          return r;
        },
      });
    }
  return a;
}
const Ft = new Map(),
  vs = {
    set(a, t, e) {
      Ft.has(a) || Ft.set(a, new Map());
      const r = Ft.get(a);
      if (!r.has(t) && r.size !== 0) {
        console.error(
          `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
            Array.from(r.keys())[0]
          }.`
        );
        return;
      }
      r.set(t, e);
    },
    get(a, t) {
      return (Ft.has(a) && Ft.get(a).get(t)) || null;
    },
    remove(a, t) {
      if (!Ft.has(a)) return;
      const e = Ft.get(a);
      e.delete(t), e.size === 0 && Ft.delete(a);
    },
  };
function gi(a) {
  if (a === "true") return !0;
  if (a === "false") return !1;
  if (a === Number(a).toString()) return Number(a);
  if (a === "" || a === "null") return null;
  if (typeof a != "string") return a;
  try {
    return JSON.parse(decodeURIComponent(a));
  } catch {
    return a;
  }
}
function _s(a) {
  return a.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Lt = {
  setDataAttribute(a, t, e) {
    a.setAttribute(`data-bs-${_s(t)}`, e);
  },
  removeDataAttribute(a, t) {
    a.removeAttribute(`data-bs-${_s(t)}`);
  },
  getDataAttributes(a) {
    if (!a) return {};
    const t = {},
      e = Object.keys(a.dataset).filter(
        (r) => r.startsWith("bs") && !r.startsWith("bsConfig")
      );
    for (const r of e) {
      let i = r.replace(/^bs/, "");
      (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
        (t[i] = gi(a.dataset[r]));
    }
    return t;
  },
  getDataAttribute(a, t) {
    return gi(a.getAttribute(`data-bs-${_s(t)}`));
  },
};
class Ie {
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error(
      'You have to implement the static method "NAME", for each component!'
    );
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, e) {
    const r = Nt(e) ? Lt.getDataAttribute(e, "config") : {};
    return {
      ...this.constructor.Default,
      ...(typeof r == "object" ? r : {}),
      ...(Nt(e) ? Lt.getDataAttributes(e) : {}),
      ...(typeof t == "object" ? t : {}),
    };
  }
  _typeCheckConfig(t, e = this.constructor.DefaultType) {
    for (const r of Object.keys(e)) {
      const i = e[r],
        n = t[r],
        s = Nt(n) ? "element" : Zn(n);
      if (!new RegExp(i).test(s))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${s}" but expected type "${i}".`
        );
    }
  }
}
const ha = "5.2.3";
class bt extends Ie {
  constructor(t, e) {
    super(),
      (t = $t(t)),
      t &&
        ((this._element = t),
        (this._config = this._getConfig(e)),
        vs.set(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    vs.remove(this._element, this.constructor.DATA_KEY),
      A.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
  }
  _queueCallback(t, e, r = !0) {
    Cr(t, e, r);
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t, this._element)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  static getInstance(t) {
    return vs.get($t(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
  static get VERSION() {
    return ha;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const is = (a, t = "hide") => {
    const e = `click.dismiss${a.EVENT_KEY}`,
      r = a.NAME;
    A.on(document, e, `[data-bs-dismiss="${r}"]`, function (i) {
      if (
        (["A", "AREA"].includes(this.tagName) && i.preventDefault(), Vt(this))
      )
        return;
      const n = It(this) || this.closest(`.${r}`);
      a.getOrCreateInstance(n)[t]();
    });
  },
  ca = "alert",
  ua = "bs.alert",
  Dr = `.${ua}`,
  da = `close${Dr}`,
  fa = `closed${Dr}`,
  pa = "fade",
  ga = "show";
class rs extends bt {
  static get NAME() {
    return ca;
  }
  close() {
    if (A.trigger(this._element, da).defaultPrevented) return;
    this._element.classList.remove(ga);
    const e = this._element.classList.contains(pa);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  _destroyElement() {
    this._element.remove(), A.trigger(this._element, fa), this.dispose();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = rs.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
is(rs, "close");
yt(rs);
const ma = "button",
  va = "bs.button",
  _a = `.${va}`,
  ya = ".data-api",
  ba = "active",
  mi = '[data-bs-toggle="button"]',
  Ea = `click${_a}${ya}`;
class ns extends bt {
  static get NAME() {
    return ma;
  }
  toggle() {
    this._element.setAttribute(
      "aria-pressed",
      this._element.classList.toggle(ba)
    );
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = ns.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
A.on(document, Ea, mi, (a) => {
  a.preventDefault();
  const t = a.target.closest(mi);
  ns.getOrCreateInstance(t).toggle();
});
yt(ns);
const j = {
    find(a, t = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(t, a));
    },
    findOne(a, t = document.documentElement) {
      return Element.prototype.querySelector.call(t, a);
    },
    children(a, t) {
      return [].concat(...a.children).filter((e) => e.matches(t));
    },
    parents(a, t) {
      const e = [];
      let r = a.parentNode.closest(t);
      for (; r; ) e.push(r), (r = r.parentNode.closest(t));
      return e;
    },
    prev(a, t) {
      let e = a.previousElementSibling;
      for (; e; ) {
        if (e.matches(t)) return [e];
        e = e.previousElementSibling;
      }
      return [];
    },
    next(a, t) {
      let e = a.nextElementSibling;
      for (; e; ) {
        if (e.matches(t)) return [e];
        e = e.nextElementSibling;
      }
      return [];
    },
    focusableChildren(a) {
      const t = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "details",
        "[tabindex]",
        '[contenteditable="true"]',
      ]
        .map((e) => `${e}:not([tabindex^="-"])`)
        .join(",");
      return this.find(t, a).filter((e) => !Vt(e) && ge(e));
    },
  },
  xa = "swipe",
  me = ".bs.swipe",
  Ta = `touchstart${me}`,
  wa = `touchmove${me}`,
  Sa = `touchend${me}`,
  Aa = `pointerdown${me}`,
  Oa = `pointerup${me}`,
  Ca = "touch",
  Pa = "pen",
  Ra = "pointer-event",
  Ia = 40,
  Na = { endCallback: null, leftCallback: null, rightCallback: null },
  La = {
    endCallback: "(function|null)",
    leftCallback: "(function|null)",
    rightCallback: "(function|null)",
  };
class Xe extends Ie {
  constructor(t, e) {
    super(),
      (this._element = t),
      !(!t || !Xe.isSupported()) &&
        ((this._config = this._getConfig(e)),
        (this._deltaX = 0),
        (this._supportPointerEvents = Boolean(window.PointerEvent)),
        this._initEvents());
  }
  static get Default() {
    return Na;
  }
  static get DefaultType() {
    return La;
  }
  static get NAME() {
    return xa;
  }
  dispose() {
    A.off(this._element, me);
  }
  _start(t) {
    if (!this._supportPointerEvents) {
      this._deltaX = t.touches[0].clientX;
      return;
    }
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
  }
  _end(t) {
    this._eventIsPointerPenTouch(t) &&
      (this._deltaX = t.clientX - this._deltaX),
      this._handleSwipe(),
      Rt(this._config.endCallback);
  }
  _move(t) {
    this._deltaX =
      t.touches && t.touches.length > 1
        ? 0
        : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= Ia) return;
    const e = t / this._deltaX;
    (this._deltaX = 0),
      e && Rt(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents
      ? (A.on(this._element, Aa, (t) => this._start(t)),
        A.on(this._element, Oa, (t) => this._end(t)),
        this._element.classList.add(Ra))
      : (A.on(this._element, Ta, (t) => this._start(t)),
        A.on(this._element, wa, (t) => this._move(t)),
        A.on(this._element, Sa, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return (
      this._supportPointerEvents &&
      (t.pointerType === Pa || t.pointerType === Ca)
    );
  }
  static isSupported() {
    return (
      "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
    );
  }
}
const Ma = "carousel",
  Da = "bs.carousel",
  zt = `.${Da}`,
  kr = ".data-api",
  ka = "ArrowLeft",
  Fa = "ArrowRight",
  $a = 500,
  xe = "next",
  ee = "prev",
  re = "left",
  He = "right",
  Va = `slide${zt}`,
  ys = `slid${zt}`,
  ja = `keydown${zt}`,
  Ua = `mouseenter${zt}`,
  za = `mouseleave${zt}`,
  Ba = `dragstart${zt}`,
  Wa = `load${zt}${kr}`,
  Ha = `click${zt}${kr}`,
  Fr = "carousel",
  $e = "active",
  Ga = "slide",
  Ya = "carousel-item-end",
  Ka = "carousel-item-start",
  Xa = "carousel-item-next",
  Qa = "carousel-item-prev",
  $r = ".active",
  Vr = ".carousel-item",
  Ja = $r + Vr,
  Za = ".carousel-item img",
  qa = ".carousel-indicators",
  to = "[data-bs-slide], [data-bs-slide-to]",
  eo = '[data-bs-ride="carousel"]',
  so = { [ka]: He, [Fa]: re },
  io = {
    interval: 5e3,
    keyboard: !0,
    pause: "hover",
    ride: !1,
    touch: !0,
    wrap: !0,
  },
  ro = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    pause: "(string|boolean)",
    ride: "(boolean|string)",
    touch: "boolean",
    wrap: "boolean",
  };
class Ne extends bt {
  constructor(t, e) {
    super(t, e),
      (this._interval = null),
      (this._activeElement = null),
      (this._isSliding = !1),
      (this.touchTimeout = null),
      (this._swipeHelper = null),
      (this._indicatorsElement = j.findOne(qa, this._element)),
      this._addEventListeners(),
      this._config.ride === Fr && this.cycle();
  }
  static get Default() {
    return io;
  }
  static get DefaultType() {
    return ro;
  }
  static get NAME() {
    return Ma;
  }
  next() {
    this._slide(xe);
  }
  nextWhenVisible() {
    !document.hidden && ge(this._element) && this.next();
  }
  prev() {
    this._slide(ee);
  }
  pause() {
    this._isSliding && Sr(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(),
      this._updateInterval(),
      (this._interval = setInterval(
        () => this.nextWhenVisible(),
        this._config.interval
      ));
  }
  _maybeEnableCycle() {
    if (!!this._config.ride) {
      if (this._isSliding) {
        A.one(this._element, ys, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(t) {
    const e = this._getItems();
    if (t > e.length - 1 || t < 0) return;
    if (this._isSliding) {
      A.one(this._element, ys, () => this.to(t));
      return;
    }
    const r = this._getItemIndex(this._getActive());
    if (r === t) return;
    const i = t > r ? xe : ee;
    this._slide(i, e[t]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  _configAfterMerge(t) {
    return (t.defaultInterval = t.interval), t;
  }
  _addEventListeners() {
    this._config.keyboard && A.on(this._element, ja, (t) => this._keydown(t)),
      this._config.pause === "hover" &&
        (A.on(this._element, Ua, () => this.pause()),
        A.on(this._element, za, () => this._maybeEnableCycle())),
      this._config.touch && Xe.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const r of j.find(Za, this._element))
      A.on(r, Ba, (i) => i.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(re)),
      rightCallback: () => this._slide(this._directionToOrder(He)),
      endCallback: () => {
        this._config.pause === "hover" &&
          (this.pause(),
          this.touchTimeout && clearTimeout(this.touchTimeout),
          (this.touchTimeout = setTimeout(
            () => this._maybeEnableCycle(),
            $a + this._config.interval
          )));
      },
    };
    this._swipeHelper = new Xe(this._element, e);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName)) return;
    const e = so[t.key];
    e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement) return;
    const e = j.findOne($r, this._indicatorsElement);
    e.classList.remove($e), e.removeAttribute("aria-current");
    const r = j.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    r && (r.classList.add($e), r.setAttribute("aria-current", "true"));
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive();
    if (!t) return;
    const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
    this._config.interval = e || this._config.defaultInterval;
  }
  _slide(t, e = null) {
    if (this._isSliding) return;
    const r = this._getActive(),
      i = t === xe,
      n = e || Zs(this._getItems(), r, i, this._config.wrap);
    if (n === r) return;
    const s = this._getItemIndex(n),
      o = (f) =>
        A.trigger(this._element, f, {
          relatedTarget: n,
          direction: this._orderToDirection(t),
          from: this._getItemIndex(r),
          to: s,
        });
    if (o(Va).defaultPrevented || !r || !n) return;
    const h = Boolean(this._interval);
    this.pause(),
      (this._isSliding = !0),
      this._setActiveIndicatorElement(s),
      (this._activeElement = n);
    const c = i ? Ka : Ya,
      u = i ? Xa : Qa;
    n.classList.add(u), Re(n), r.classList.add(c), n.classList.add(c);
    const d = () => {
      n.classList.remove(c, u),
        n.classList.add($e),
        r.classList.remove($e, u, c),
        (this._isSliding = !1),
        o(ys);
    };
    this._queueCallback(d, r, this._isAnimated()), h && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(Ga);
  }
  _getActive() {
    return j.findOne(Ja, this._element);
  }
  _getItems() {
    return j.find(Vr, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), (this._interval = null));
  }
  _directionToOrder(t) {
    return vt() ? (t === re ? ee : xe) : t === re ? xe : ee;
  }
  _orderToDirection(t) {
    return vt() ? (t === ee ? re : He) : t === ee ? He : re;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Ne.getOrCreateInstance(this, t);
      if (typeof t == "number") {
        e.to(t);
        return;
      }
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
A.on(document, Ha, to, function (a) {
  const t = It(this);
  if (!t || !t.classList.contains(Fr)) return;
  a.preventDefault();
  const e = Ne.getOrCreateInstance(t),
    r = this.getAttribute("data-bs-slide-to");
  if (r) {
    e.to(r), e._maybeEnableCycle();
    return;
  }
  if (Lt.getDataAttribute(this, "slide") === "next") {
    e.next(), e._maybeEnableCycle();
    return;
  }
  e.prev(), e._maybeEnableCycle();
});
A.on(window, Wa, () => {
  const a = j.find(eo);
  for (const t of a) Ne.getOrCreateInstance(t);
});
yt(Ne);
const no = "collapse",
  ao = "bs.collapse",
  Le = `.${ao}`,
  oo = ".data-api",
  lo = `show${Le}`,
  ho = `shown${Le}`,
  co = `hide${Le}`,
  uo = `hidden${Le}`,
  fo = `click${Le}${oo}`,
  bs = "show",
  ae = "collapse",
  Ve = "collapsing",
  po = "collapsed",
  go = `:scope .${ae} .${ae}`,
  mo = "collapse-horizontal",
  vo = "width",
  _o = "height",
  yo = ".collapse.show, .collapse.collapsing",
  ks = '[data-bs-toggle="collapse"]',
  bo = { parent: null, toggle: !0 },
  Eo = { parent: "(null|element)", toggle: "boolean" };
class Oe extends bt {
  constructor(t, e) {
    super(t, e), (this._isTransitioning = !1), (this._triggerArray = []);
    const r = j.find(ks);
    for (const i of r) {
      const n = wr(i),
        s = j.find(n).filter((o) => o === this._element);
      n !== null && s.length && this._triggerArray.push(i);
    }
    this._initializeChildren(),
      this._config.parent ||
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
      this._config.toggle && this.toggle();
  }
  static get Default() {
    return bo;
  }
  static get DefaultType() {
    return Eo;
  }
  static get NAME() {
    return no;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown()) return;
    let t = [];
    if (
      (this._config.parent &&
        (t = this._getFirstLevelChildren(yo)
          .filter((o) => o !== this._element)
          .map((o) => Oe.getOrCreateInstance(o, { toggle: !1 }))),
      (t.length && t[0]._isTransitioning) ||
        A.trigger(this._element, lo).defaultPrevented)
    )
      return;
    for (const o of t) o.hide();
    const r = this._getDimension();
    this._element.classList.remove(ae),
      this._element.classList.add(Ve),
      (this._element.style[r] = 0),
      this._addAriaAndCollapsedClass(this._triggerArray, !0),
      (this._isTransitioning = !0);
    const i = () => {
        (this._isTransitioning = !1),
          this._element.classList.remove(Ve),
          this._element.classList.add(ae, bs),
          (this._element.style[r] = ""),
          A.trigger(this._element, ho);
      },
      s = `scroll${r[0].toUpperCase() + r.slice(1)}`;
    this._queueCallback(i, this._element, !0),
      (this._element.style[r] = `${this._element[s]}px`);
  }
  hide() {
    if (
      this._isTransitioning ||
      !this._isShown() ||
      A.trigger(this._element, co).defaultPrevented
    )
      return;
    const e = this._getDimension();
    (this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`),
      Re(this._element),
      this._element.classList.add(Ve),
      this._element.classList.remove(ae, bs);
    for (const i of this._triggerArray) {
      const n = It(i);
      n && !this._isShown(n) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const r = () => {
      (this._isTransitioning = !1),
        this._element.classList.remove(Ve),
        this._element.classList.add(ae),
        A.trigger(this._element, uo);
    };
    (this._element.style[e] = ""), this._queueCallback(r, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(bs);
  }
  _configAfterMerge(t) {
    return (t.toggle = Boolean(t.toggle)), (t.parent = $t(t.parent)), t;
  }
  _getDimension() {
    return this._element.classList.contains(mo) ? vo : _o;
  }
  _initializeChildren() {
    if (!this._config.parent) return;
    const t = this._getFirstLevelChildren(ks);
    for (const e of t) {
      const r = It(e);
      r && this._addAriaAndCollapsedClass([e], this._isShown(r));
    }
  }
  _getFirstLevelChildren(t) {
    const e = j.find(go, this._config.parent);
    return j.find(t, this._config.parent).filter((r) => !e.includes(r));
  }
  _addAriaAndCollapsedClass(t, e) {
    if (!!t.length)
      for (const r of t)
        r.classList.toggle(po, !e), r.setAttribute("aria-expanded", e);
  }
  static jQueryInterface(t) {
    const e = {};
    return (
      typeof t == "string" && /show|hide/.test(t) && (e.toggle = !1),
      this.each(function () {
        const r = Oe.getOrCreateInstance(this, e);
        if (typeof t == "string") {
          if (typeof r[t] == "undefined")
            throw new TypeError(`No method named "${t}"`);
          r[t]();
        }
      })
    );
  }
}
A.on(document, fo, ks, function (a) {
  (a.target.tagName === "A" ||
    (a.delegateTarget && a.delegateTarget.tagName === "A")) &&
    a.preventDefault();
  const t = wr(this),
    e = j.find(t);
  for (const r of e) Oe.getOrCreateInstance(r, { toggle: !1 }).toggle();
});
yt(Oe);
const vi = "dropdown",
  xo = "bs.dropdown",
  Qt = `.${xo}`,
  ti = ".data-api",
  To = "Escape",
  _i = "Tab",
  wo = "ArrowUp",
  yi = "ArrowDown",
  So = 2,
  Ao = `hide${Qt}`,
  Oo = `hidden${Qt}`,
  Co = `show${Qt}`,
  Po = `shown${Qt}`,
  jr = `click${Qt}${ti}`,
  Ur = `keydown${Qt}${ti}`,
  Ro = `keyup${Qt}${ti}`,
  ne = "show",
  Io = "dropup",
  No = "dropend",
  Lo = "dropstart",
  Mo = "dropup-center",
  Do = "dropdown-center",
  Ht = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
  ko = `${Ht}.${ne}`,
  Ge = ".dropdown-menu",
  Fo = ".navbar",
  $o = ".navbar-nav",
  Vo = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
  jo = vt() ? "top-end" : "top-start",
  Uo = vt() ? "top-start" : "top-end",
  zo = vt() ? "bottom-end" : "bottom-start",
  Bo = vt() ? "bottom-start" : "bottom-end",
  Wo = vt() ? "left-start" : "right-start",
  Ho = vt() ? "right-start" : "left-start",
  Go = "top",
  Yo = "bottom",
  Ko = {
    autoClose: !0,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle",
  },
  Xo = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)",
  };
class St extends bt {
  constructor(t, e) {
    super(t, e),
      (this._popper = null),
      (this._parent = this._element.parentNode),
      (this._menu =
        j.next(this._element, Ge)[0] ||
        j.prev(this._element, Ge)[0] ||
        j.findOne(Ge, this._parent)),
      (this._inNavbar = this._detectNavbar());
  }
  static get Default() {
    return Ko;
  }
  static get DefaultType() {
    return Xo;
  }
  static get NAME() {
    return vi;
  }
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (Vt(this._element) || this._isShown()) return;
    const t = { relatedTarget: this._element };
    if (!A.trigger(this._element, Co, t).defaultPrevented) {
      if (
        (this._createPopper(),
        "ontouchstart" in document.documentElement && !this._parent.closest($o))
      )
        for (const r of [].concat(...document.body.children))
          A.on(r, "mouseover", Ke);
      this._element.focus(),
        this._element.setAttribute("aria-expanded", !0),
        this._menu.classList.add(ne),
        this._element.classList.add(ne),
        A.trigger(this._element, Po, t);
    }
  }
  hide() {
    if (Vt(this._element) || !this._isShown()) return;
    const t = { relatedTarget: this._element };
    this._completeHide(t);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    (this._inNavbar = this._detectNavbar()),
      this._popper && this._popper.update();
  }
  _completeHide(t) {
    if (!A.trigger(this._element, Ao, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const r of [].concat(...document.body.children))
          A.off(r, "mouseover", Ke);
      this._popper && this._popper.destroy(),
        this._menu.classList.remove(ne),
        this._element.classList.remove(ne),
        this._element.setAttribute("aria-expanded", "false"),
        Lt.removeDataAttribute(this._menu, "popper"),
        A.trigger(this._element, Oo, t);
    }
  }
  _getConfig(t) {
    if (
      ((t = super._getConfig(t)),
      typeof t.reference == "object" &&
        !Nt(t.reference) &&
        typeof t.reference.getBoundingClientRect != "function")
    )
      throw new TypeError(
        `${vi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
      );
    return t;
  }
  _createPopper() {
    if (typeof xr == "undefined")
      throw new TypeError(
        "Bootstrap's dropdowns require Popper (https://popper.js.org)"
      );
    let t = this._element;
    this._config.reference === "parent"
      ? (t = this._parent)
      : Nt(this._config.reference)
      ? (t = $t(this._config.reference))
      : typeof this._config.reference == "object" &&
        (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = Js(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(ne);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(No)) return Wo;
    if (t.classList.contains(Lo)) return Ho;
    if (t.classList.contains(Mo)) return Go;
    if (t.classList.contains(Do)) return Yo;
    const e =
      getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() ===
      "end";
    return t.classList.contains(Io) ? (e ? Uo : jo) : e ? Bo : zo;
  }
  _detectNavbar() {
    return this._element.closest(Fo) !== null;
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string"
      ? t.split(",").map((e) => Number.parseInt(e, 10))
      : typeof t == "function"
      ? (e) => t(e, this._element)
      : t;
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        { name: "offset", options: { offset: this._getOffset() } },
      ],
    };
    return (
      (this._inNavbar || this._config.display === "static") &&
        (Lt.setDataAttribute(this._menu, "popper", "static"),
        (t.modifiers = [{ name: "applyStyles", enabled: !1 }])),
      {
        ...t,
        ...(typeof this._config.popperConfig == "function"
          ? this._config.popperConfig(t)
          : this._config.popperConfig),
      }
    );
  }
  _selectMenuItem({ key: t, target: e }) {
    const r = j.find(Vo, this._menu).filter((i) => ge(i));
    !r.length || Zs(r, e, t === yi, !r.includes(e)).focus();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = St.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === So || (t.type === "keyup" && t.key !== _i)) return;
    const e = j.find(ko);
    for (const r of e) {
      const i = St.getInstance(r);
      if (!i || i._config.autoClose === !1) continue;
      const n = t.composedPath(),
        s = n.includes(i._menu);
      if (
        n.includes(i._element) ||
        (i._config.autoClose === "inside" && !s) ||
        (i._config.autoClose === "outside" && s) ||
        (i._menu.contains(t.target) &&
          ((t.type === "keyup" && t.key === _i) ||
            /input|select|option|textarea|form/i.test(t.target.tagName)))
      )
        continue;
      const o = { relatedTarget: i._element };
      t.type === "click" && (o.clickEvent = t), i._completeHide(o);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName),
      r = t.key === To,
      i = [wo, yi].includes(t.key);
    if ((!i && !r) || (e && !r)) return;
    t.preventDefault();
    const n = this.matches(Ht)
        ? this
        : j.prev(this, Ht)[0] ||
          j.next(this, Ht)[0] ||
          j.findOne(Ht, t.delegateTarget.parentNode),
      s = St.getOrCreateInstance(n);
    if (i) {
      t.stopPropagation(), s.show(), s._selectMenuItem(t);
      return;
    }
    s._isShown() && (t.stopPropagation(), s.hide(), n.focus());
  }
}
A.on(document, Ur, Ht, St.dataApiKeydownHandler);
A.on(document, Ur, Ge, St.dataApiKeydownHandler);
A.on(document, jr, St.clearMenus);
A.on(document, Ro, St.clearMenus);
A.on(document, jr, Ht, function (a) {
  a.preventDefault(), St.getOrCreateInstance(this).toggle();
});
yt(St);
const bi = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
  Ei = ".sticky-top",
  je = "padding-right",
  xi = "margin-right";
class Fs {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow(),
      this._setElementAttributes(this._element, je, (e) => e + t),
      this._setElementAttributes(bi, je, (e) => e + t),
      this._setElementAttributes(Ei, xi, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"),
      this._resetElementAttributes(this._element, je),
      this._resetElementAttributes(bi, je),
      this._resetElementAttributes(Ei, xi);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"),
      (this._element.style.overflow = "hidden");
  }
  _setElementAttributes(t, e, r) {
    const i = this.getWidth(),
      n = (s) => {
        if (s !== this._element && window.innerWidth > s.clientWidth + i)
          return;
        this._saveInitialAttribute(s, e);
        const o = window.getComputedStyle(s).getPropertyValue(e);
        s.style.setProperty(e, `${r(Number.parseFloat(o))}px`);
      };
    this._applyManipulationCallback(t, n);
  }
  _saveInitialAttribute(t, e) {
    const r = t.style.getPropertyValue(e);
    r && Lt.setDataAttribute(t, e, r);
  }
  _resetElementAttributes(t, e) {
    const r = (i) => {
      const n = Lt.getDataAttribute(i, e);
      if (n === null) {
        i.style.removeProperty(e);
        return;
      }
      Lt.removeDataAttribute(i, e), i.style.setProperty(e, n);
    };
    this._applyManipulationCallback(t, r);
  }
  _applyManipulationCallback(t, e) {
    if (Nt(t)) {
      e(t);
      return;
    }
    for (const r of j.find(t, this._element)) e(r);
  }
}
const zr = "backdrop",
  Qo = "fade",
  Ti = "show",
  wi = `mousedown.bs.${zr}`,
  Jo = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: !1,
    isVisible: !0,
    rootElement: "body",
  },
  Zo = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)",
  };
class Br extends Ie {
  constructor(t) {
    super(),
      (this._config = this._getConfig(t)),
      (this._isAppended = !1),
      (this._element = null);
  }
  static get Default() {
    return Jo;
  }
  static get DefaultType() {
    return Zo;
  }
  static get NAME() {
    return zr;
  }
  show(t) {
    if (!this._config.isVisible) {
      Rt(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && Re(e),
      e.classList.add(Ti),
      this._emulateAnimation(() => {
        Rt(t);
      });
  }
  hide(t) {
    if (!this._config.isVisible) {
      Rt(t);
      return;
    }
    this._getElement().classList.remove(Ti),
      this._emulateAnimation(() => {
        this.dispose(), Rt(t);
      });
  }
  dispose() {
    !this._isAppended ||
      (A.off(this._element, wi),
      this._element.remove(),
      (this._isAppended = !1));
  }
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      (t.className = this._config.className),
        this._config.isAnimated && t.classList.add(Qo),
        (this._element = t);
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return (t.rootElement = $t(t.rootElement)), t;
  }
  _append() {
    if (this._isAppended) return;
    const t = this._getElement();
    this._config.rootElement.append(t),
      A.on(t, wi, () => {
        Rt(this._config.clickCallback);
      }),
      (this._isAppended = !0);
  }
  _emulateAnimation(t) {
    Cr(t, this._getElement(), this._config.isAnimated);
  }
}
const qo = "focustrap",
  tl = "bs.focustrap",
  Qe = `.${tl}`,
  el = `focusin${Qe}`,
  sl = `keydown.tab${Qe}`,
  il = "Tab",
  rl = "forward",
  Si = "backward",
  nl = { autofocus: !0, trapElement: null },
  al = { autofocus: "boolean", trapElement: "element" };
class Wr extends Ie {
  constructor(t) {
    super(),
      (this._config = this._getConfig(t)),
      (this._isActive = !1),
      (this._lastTabNavDirection = null);
  }
  static get Default() {
    return nl;
  }
  static get DefaultType() {
    return al;
  }
  static get NAME() {
    return qo;
  }
  activate() {
    this._isActive ||
      (this._config.autofocus && this._config.trapElement.focus(),
      A.off(document, Qe),
      A.on(document, el, (t) => this._handleFocusin(t)),
      A.on(document, sl, (t) => this._handleKeydown(t)),
      (this._isActive = !0));
  }
  deactivate() {
    !this._isActive || ((this._isActive = !1), A.off(document, Qe));
  }
  _handleFocusin(t) {
    const { trapElement: e } = this._config;
    if (t.target === document || t.target === e || e.contains(t.target)) return;
    const r = j.focusableChildren(e);
    r.length === 0
      ? e.focus()
      : this._lastTabNavDirection === Si
      ? r[r.length - 1].focus()
      : r[0].focus();
  }
  _handleKeydown(t) {
    t.key === il && (this._lastTabNavDirection = t.shiftKey ? Si : rl);
  }
}
const ol = "modal",
  ll = "bs.modal",
  Et = `.${ll}`,
  hl = ".data-api",
  cl = "Escape",
  ul = `hide${Et}`,
  dl = `hidePrevented${Et}`,
  Hr = `hidden${Et}`,
  Gr = `show${Et}`,
  fl = `shown${Et}`,
  pl = `resize${Et}`,
  gl = `click.dismiss${Et}`,
  ml = `mousedown.dismiss${Et}`,
  vl = `keydown.dismiss${Et}`,
  _l = `click${Et}${hl}`,
  Ai = "modal-open",
  yl = "fade",
  Oi = "show",
  Es = "modal-static",
  bl = ".modal.show",
  El = ".modal-dialog",
  xl = ".modal-body",
  Tl = '[data-bs-toggle="modal"]',
  wl = { backdrop: !0, focus: !0, keyboard: !0 },
  Sl = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
class de extends bt {
  constructor(t, e) {
    super(t, e),
      (this._dialog = j.findOne(El, this._element)),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      (this._isShown = !1),
      (this._isTransitioning = !1),
      (this._scrollBar = new Fs()),
      this._addEventListeners();
  }
  static get Default() {
    return wl;
  }
  static get DefaultType() {
    return Sl;
  }
  static get NAME() {
    return ol;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown ||
      this._isTransitioning ||
      A.trigger(this._element, Gr, { relatedTarget: t }).defaultPrevented ||
      ((this._isShown = !0),
      (this._isTransitioning = !0),
      this._scrollBar.hide(),
      document.body.classList.add(Ai),
      this._adjustDialog(),
      this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown ||
      this._isTransitioning ||
      A.trigger(this._element, ul).defaultPrevented ||
      ((this._isShown = !1),
      (this._isTransitioning = !0),
      this._focustrap.deactivate(),
      this._element.classList.remove(Oi),
      this._queueCallback(
        () => this._hideModal(),
        this._element,
        this._isAnimated()
      ));
  }
  dispose() {
    for (const t of [window, this._dialog]) A.off(t, Et);
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  _initializeBackDrop() {
    return new Br({
      isVisible: Boolean(this._config.backdrop),
      isAnimated: this._isAnimated(),
    });
  }
  _initializeFocusTrap() {
    return new Wr({ trapElement: this._element });
  }
  _showElement(t) {
    document.body.contains(this._element) ||
      document.body.append(this._element),
      (this._element.style.display = "block"),
      this._element.removeAttribute("aria-hidden"),
      this._element.setAttribute("aria-modal", !0),
      this._element.setAttribute("role", "dialog"),
      (this._element.scrollTop = 0);
    const e = j.findOne(xl, this._dialog);
    e && (e.scrollTop = 0), Re(this._element), this._element.classList.add(Oi);
    const r = () => {
      this._config.focus && this._focustrap.activate(),
        (this._isTransitioning = !1),
        A.trigger(this._element, fl, { relatedTarget: t });
    };
    this._queueCallback(r, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    A.on(this._element, vl, (t) => {
      if (t.key === cl) {
        if (this._config.keyboard) {
          t.preventDefault(), this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }),
      A.on(window, pl, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog();
      }),
      A.on(this._element, ml, (t) => {
        A.one(this._element, gl, (e) => {
          if (!(this._element !== t.target || this._element !== e.target)) {
            if (this._config.backdrop === "static") {
              this._triggerBackdropTransition();
              return;
            }
            this._config.backdrop && this.hide();
          }
        });
      });
  }
  _hideModal() {
    (this._element.style.display = "none"),
      this._element.setAttribute("aria-hidden", !0),
      this._element.removeAttribute("aria-modal"),
      this._element.removeAttribute("role"),
      (this._isTransitioning = !1),
      this._backdrop.hide(() => {
        document.body.classList.remove(Ai),
          this._resetAdjustments(),
          this._scrollBar.reset(),
          A.trigger(this._element, Hr);
      });
  }
  _isAnimated() {
    return this._element.classList.contains(yl);
  }
  _triggerBackdropTransition() {
    if (A.trigger(this._element, dl).defaultPrevented) return;
    const e =
        this._element.scrollHeight > document.documentElement.clientHeight,
      r = this._element.style.overflowY;
    r === "hidden" ||
      this._element.classList.contains(Es) ||
      (e || (this._element.style.overflowY = "hidden"),
      this._element.classList.add(Es),
      this._queueCallback(() => {
        this._element.classList.remove(Es),
          this._queueCallback(() => {
            this._element.style.overflowY = r;
          }, this._dialog);
      }, this._dialog),
      this._element.focus());
  }
  _adjustDialog() {
    const t =
        this._element.scrollHeight > document.documentElement.clientHeight,
      e = this._scrollBar.getWidth(),
      r = e > 0;
    if (r && !t) {
      const i = vt() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${e}px`;
    }
    if (!r && t) {
      const i = vt() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${e}px`;
    }
  }
  _resetAdjustments() {
    (this._element.style.paddingLeft = ""),
      (this._element.style.paddingRight = "");
  }
  static jQueryInterface(t, e) {
    return this.each(function () {
      const r = de.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof r[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        r[t](e);
      }
    });
  }
}
A.on(document, _l, Tl, function (a) {
  const t = It(this);
  ["A", "AREA"].includes(this.tagName) && a.preventDefault(),
    A.one(t, Gr, (i) => {
      i.defaultPrevented ||
        A.one(t, Hr, () => {
          ge(this) && this.focus();
        });
    });
  const e = j.findOne(bl);
  e && de.getInstance(e).hide(), de.getOrCreateInstance(t).toggle(this);
});
is(de);
yt(de);
const Al = "offcanvas",
  Ol = "bs.offcanvas",
  Dt = `.${Ol}`,
  Yr = ".data-api",
  Cl = `load${Dt}${Yr}`,
  Pl = "Escape",
  Ci = "show",
  Pi = "showing",
  Ri = "hiding",
  Rl = "offcanvas-backdrop",
  Kr = ".offcanvas.show",
  Il = `show${Dt}`,
  Nl = `shown${Dt}`,
  Ll = `hide${Dt}`,
  Ii = `hidePrevented${Dt}`,
  Xr = `hidden${Dt}`,
  Ml = `resize${Dt}`,
  Dl = `click${Dt}${Yr}`,
  kl = `keydown.dismiss${Dt}`,
  Fl = '[data-bs-toggle="offcanvas"]',
  $l = { backdrop: !0, keyboard: !0, scroll: !1 },
  Vl = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
class jt extends bt {
  constructor(t, e) {
    super(t, e),
      (this._isShown = !1),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      this._addEventListeners();
  }
  static get Default() {
    return $l;
  }
  static get DefaultType() {
    return Vl;
  }
  static get NAME() {
    return Al;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (
      this._isShown ||
      A.trigger(this._element, Il, { relatedTarget: t }).defaultPrevented
    )
      return;
    (this._isShown = !0),
      this._backdrop.show(),
      this._config.scroll || new Fs().hide(),
      this._element.setAttribute("aria-modal", !0),
      this._element.setAttribute("role", "dialog"),
      this._element.classList.add(Pi);
    const r = () => {
      (!this._config.scroll || this._config.backdrop) &&
        this._focustrap.activate(),
        this._element.classList.add(Ci),
        this._element.classList.remove(Pi),
        A.trigger(this._element, Nl, { relatedTarget: t });
    };
    this._queueCallback(r, this._element, !0);
  }
  hide() {
    if (!this._isShown || A.trigger(this._element, Ll).defaultPrevented) return;
    this._focustrap.deactivate(),
      this._element.blur(),
      (this._isShown = !1),
      this._element.classList.add(Ri),
      this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(Ci, Ri),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        this._config.scroll || new Fs().reset(),
        A.trigger(this._element, Xr);
    };
    this._queueCallback(e, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  _initializeBackDrop() {
    const t = () => {
        if (this._config.backdrop === "static") {
          A.trigger(this._element, Ii);
          return;
        }
        this.hide();
      },
      e = Boolean(this._config.backdrop);
    return new Br({
      className: Rl,
      isVisible: e,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: e ? t : null,
    });
  }
  _initializeFocusTrap() {
    return new Wr({ trapElement: this._element });
  }
  _addEventListeners() {
    A.on(this._element, kl, (t) => {
      if (t.key === Pl) {
        if (!this._config.keyboard) {
          A.trigger(this._element, Ii);
          return;
        }
        this.hide();
      }
    });
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = jt.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
A.on(document, Dl, Fl, function (a) {
  const t = It(this);
  if ((["A", "AREA"].includes(this.tagName) && a.preventDefault(), Vt(this)))
    return;
  A.one(t, Xr, () => {
    ge(this) && this.focus();
  });
  const e = j.findOne(Kr);
  e && e !== t && jt.getInstance(e).hide(),
    jt.getOrCreateInstance(t).toggle(this);
});
A.on(window, Cl, () => {
  for (const a of j.find(Kr)) jt.getOrCreateInstance(a).show();
});
A.on(window, Ml, () => {
  for (const a of j.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(a).position !== "fixed" &&
      jt.getOrCreateInstance(a).hide();
});
is(jt);
yt(jt);
const jl = new Set([
    "background",
    "cite",
    "href",
    "itemtype",
    "longdesc",
    "poster",
    "src",
    "xlink:href",
  ]),
  Ul = /^aria-[\w-]*$/i,
  zl = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
  Bl =
    /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
  Wl = (a, t) => {
    const e = a.nodeName.toLowerCase();
    return t.includes(e)
      ? jl.has(e)
        ? Boolean(zl.test(a.nodeValue) || Bl.test(a.nodeValue))
        : !0
      : t.filter((r) => r instanceof RegExp).some((r) => r.test(e));
  },
  Qr = {
    "*": ["class", "dir", "id", "lang", "role", Ul],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: [],
  };
function Hl(a, t, e) {
  if (!a.length) return a;
  if (e && typeof e == "function") return e(a);
  const i = new window.DOMParser().parseFromString(a, "text/html"),
    n = [].concat(...i.body.querySelectorAll("*"));
  for (const s of n) {
    const o = s.nodeName.toLowerCase();
    if (!Object.keys(t).includes(o)) {
      s.remove();
      continue;
    }
    const l = [].concat(...s.attributes),
      h = [].concat(t["*"] || [], t[o] || []);
    for (const c of l) Wl(c, h) || s.removeAttribute(c.nodeName);
  }
  return i.body.innerHTML;
}
const Gl = "TemplateFactory",
  Yl = {
    allowList: Qr,
    content: {},
    extraClass: "",
    html: !1,
    sanitize: !0,
    sanitizeFn: null,
    template: "<div></div>",
  },
  Kl = {
    allowList: "object",
    content: "object",
    extraClass: "(string|function)",
    html: "boolean",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    template: "string",
  },
  Xl = {
    entry: "(string|element|function|null)",
    selector: "(string|element)",
  };
class Ql extends Ie {
  constructor(t) {
    super(), (this._config = this._getConfig(t));
  }
  static get Default() {
    return Yl;
  }
  static get DefaultType() {
    return Kl;
  }
  static get NAME() {
    return Gl;
  }
  getContent() {
    return Object.values(this._config.content)
      .map((t) => this._resolvePossibleFunction(t))
      .filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(t) {
    return (
      this._checkContent(t),
      (this._config.content = { ...this._config.content, ...t }),
      this
    );
  }
  toHtml() {
    const t = document.createElement("div");
    t.innerHTML = this._maybeSanitize(this._config.template);
    for (const [i, n] of Object.entries(this._config.content))
      this._setContent(t, n, i);
    const e = t.children[0],
      r = this._resolvePossibleFunction(this._config.extraClass);
    return r && e.classList.add(...r.split(" ")), e;
  }
  _typeCheckConfig(t) {
    super._typeCheckConfig(t), this._checkContent(t.content);
  }
  _checkContent(t) {
    for (const [e, r] of Object.entries(t))
      super._typeCheckConfig({ selector: e, entry: r }, Xl);
  }
  _setContent(t, e, r) {
    const i = j.findOne(r, t);
    if (!!i) {
      if (((e = this._resolvePossibleFunction(e)), !e)) {
        i.remove();
        return;
      }
      if (Nt(e)) {
        this._putElementInTemplate($t(e), i);
        return;
      }
      if (this._config.html) {
        i.innerHTML = this._maybeSanitize(e);
        return;
      }
      i.textContent = e;
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize
      ? Hl(t, this._config.allowList, this._config.sanitizeFn)
      : t;
  }
  _resolvePossibleFunction(t) {
    return typeof t == "function" ? t(this) : t;
  }
  _putElementInTemplate(t, e) {
    if (this._config.html) {
      (e.innerHTML = ""), e.append(t);
      return;
    }
    e.textContent = t.textContent;
  }
}
const Jl = "tooltip",
  Zl = new Set(["sanitize", "allowList", "sanitizeFn"]),
  xs = "fade",
  ql = "modal",
  Ue = "show",
  th = ".tooltip-inner",
  Ni = `.${ql}`,
  Li = "hide.bs.modal",
  Te = "hover",
  Ts = "focus",
  eh = "click",
  sh = "manual",
  ih = "hide",
  rh = "hidden",
  nh = "show",
  ah = "shown",
  oh = "inserted",
  lh = "click",
  hh = "focusin",
  ch = "focusout",
  uh = "mouseenter",
  dh = "mouseleave",
  fh = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: vt() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: vt() ? "right" : "left",
  },
  ph = {
    allowList: Qr,
    animation: !0,
    boundary: "clippingParents",
    container: !1,
    customClass: "",
    delay: 0,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    html: !1,
    offset: [0, 0],
    placement: "top",
    popperConfig: null,
    sanitize: !0,
    sanitizeFn: null,
    selector: !1,
    template:
      '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: "",
    trigger: "hover focus",
  },
  gh = {
    allowList: "object",
    animation: "boolean",
    boundary: "(string|element)",
    container: "(string|element|boolean)",
    customClass: "(string|function)",
    delay: "(number|object)",
    fallbackPlacements: "array",
    html: "boolean",
    offset: "(array|string|function)",
    placement: "(string|function)",
    popperConfig: "(null|object|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    selector: "(string|boolean)",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
  };
class ve extends bt {
  constructor(t, e) {
    if (typeof xr == "undefined")
      throw new TypeError(
        "Bootstrap's tooltips require Popper (https://popper.js.org)"
      );
    super(t, e),
      (this._isEnabled = !0),
      (this._timeout = 0),
      (this._isHovered = null),
      (this._activeTrigger = {}),
      (this._popper = null),
      (this._templateFactory = null),
      (this._newContent = null),
      (this.tip = null),
      this._setListeners(),
      this._config.selector || this._fixTitle();
  }
  static get Default() {
    return ph;
  }
  static get DefaultType() {
    return gh;
  }
  static get NAME() {
    return Jl;
  }
  enable() {
    this._isEnabled = !0;
  }
  disable() {
    this._isEnabled = !1;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (!!this._isEnabled) {
      if (
        ((this._activeTrigger.click = !this._activeTrigger.click),
        this._isShown())
      ) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout),
      A.off(this._element.closest(Ni), Li, this._hideModalHandler),
      this._element.getAttribute("data-bs-original-title") &&
        this._element.setAttribute(
          "title",
          this._element.getAttribute("data-bs-original-title")
        ),
      this._disposePopper(),
      super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled)) return;
    const t = A.trigger(this._element, this.constructor.eventName(nh)),
      r = (
        Ar(this._element) || this._element.ownerDocument.documentElement
      ).contains(this._element);
    if (t.defaultPrevented || !r) return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const { container: n } = this._config;
    if (
      (this._element.ownerDocument.documentElement.contains(this.tip) ||
        (n.append(i), A.trigger(this._element, this.constructor.eventName(oh))),
      (this._popper = this._createPopper(i)),
      i.classList.add(Ue),
      "ontouchstart" in document.documentElement)
    )
      for (const o of [].concat(...document.body.children))
        A.on(o, "mouseover", Ke);
    const s = () => {
      A.trigger(this._element, this.constructor.eventName(ah)),
        this._isHovered === !1 && this._leave(),
        (this._isHovered = !1);
    };
    this._queueCallback(s, this.tip, this._isAnimated());
  }
  hide() {
    if (
      !this._isShown() ||
      A.trigger(this._element, this.constructor.eventName(ih)).defaultPrevented
    )
      return;
    if (
      (this._getTipElement().classList.remove(Ue),
      "ontouchstart" in document.documentElement)
    )
      for (const i of [].concat(...document.body.children))
        A.off(i, "mouseover", Ke);
    (this._activeTrigger[eh] = !1),
      (this._activeTrigger[Ts] = !1),
      (this._activeTrigger[Te] = !1),
      (this._isHovered = null);
    const r = () => {
      this._isWithActiveTrigger() ||
        (this._isHovered || this._disposePopper(),
        this._element.removeAttribute("aria-describedby"),
        A.trigger(this._element, this.constructor.eventName(rh)));
    };
    this._queueCallback(r, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    return (
      this.tip ||
        (this.tip = this._createTipElement(
          this._newContent || this._getContentForTemplate()
        )),
      this.tip
    );
  }
  _createTipElement(t) {
    const e = this._getTemplateFactory(t).toHtml();
    if (!e) return null;
    e.classList.remove(xs, Ue),
      e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const r = qn(this.constructor.NAME).toString();
    return (
      e.setAttribute("id", r), this._isAnimated() && e.classList.add(xs), e
    );
  }
  setContent(t) {
    (this._newContent = t),
      this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return (
      this._templateFactory
        ? this._templateFactory.changeContent(t)
        : (this._templateFactory = new Ql({
            ...this._config,
            content: t,
            extraClass: this._resolvePossibleFunction(this._config.customClass),
          })),
      this._templateFactory
    );
  }
  _getContentForTemplate() {
    return { [th]: this._getTitle() };
  }
  _getTitle() {
    return (
      this._resolvePossibleFunction(this._config.title) ||
      this._element.getAttribute("data-bs-original-title")
    );
  }
  _initializeOnDelegatedTarget(t) {
    return this.constructor.getOrCreateInstance(
      t.delegateTarget,
      this._getDelegateConfig()
    );
  }
  _isAnimated() {
    return (
      this._config.animation || (this.tip && this.tip.classList.contains(xs))
    );
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(Ue);
  }
  _createPopper(t) {
    const e =
        typeof this._config.placement == "function"
          ? this._config.placement.call(this, t, this._element)
          : this._config.placement,
      r = fh[e.toUpperCase()];
    return Js(this._element, t, this._getPopperConfig(r));
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string"
      ? t.split(",").map((e) => Number.parseInt(e, 10))
      : typeof t == "function"
      ? (e) => t(e, this._element)
      : t;
  }
  _resolvePossibleFunction(t) {
    return typeof t == "function" ? t.call(this._element) : t;
  }
  _getPopperConfig(t) {
    const e = {
      placement: t,
      modifiers: [
        {
          name: "flip",
          options: { fallbackPlacements: this._config.fallbackPlacements },
        },
        { name: "offset", options: { offset: this._getOffset() } },
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        {
          name: "arrow",
          options: { element: `.${this.constructor.NAME}-arrow` },
        },
        {
          name: "preSetPlacement",
          enabled: !0,
          phase: "beforeMain",
          fn: (r) => {
            this._getTipElement().setAttribute(
              "data-popper-placement",
              r.state.placement
            );
          },
        },
      ],
    };
    return {
      ...e,
      ...(typeof this._config.popperConfig == "function"
        ? this._config.popperConfig(e)
        : this._config.popperConfig),
    };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const e of t)
      if (e === "click")
        A.on(
          this._element,
          this.constructor.eventName(lh),
          this._config.selector,
          (r) => {
            this._initializeOnDelegatedTarget(r).toggle();
          }
        );
      else if (e !== sh) {
        const r =
            e === Te
              ? this.constructor.eventName(uh)
              : this.constructor.eventName(hh),
          i =
            e === Te
              ? this.constructor.eventName(dh)
              : this.constructor.eventName(ch);
        A.on(this._element, r, this._config.selector, (n) => {
          const s = this._initializeOnDelegatedTarget(n);
          (s._activeTrigger[n.type === "focusin" ? Ts : Te] = !0), s._enter();
        }),
          A.on(this._element, i, this._config.selector, (n) => {
            const s = this._initializeOnDelegatedTarget(n);
            (s._activeTrigger[n.type === "focusout" ? Ts : Te] =
              s._element.contains(n.relatedTarget)),
              s._leave();
          });
      }
    (this._hideModalHandler = () => {
      this._element && this.hide();
    }),
      A.on(this._element.closest(Ni), Li, this._hideModalHandler);
  }
  _fixTitle() {
    const t = this._element.getAttribute("title");
    !t ||
      (!this._element.getAttribute("aria-label") &&
        !this._element.textContent.trim() &&
        this._element.setAttribute("aria-label", t),
      this._element.setAttribute("data-bs-original-title", t),
      this._element.removeAttribute("title"));
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0;
      return;
    }
    (this._isHovered = !0),
      this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show);
  }
  _leave() {
    this._isWithActiveTrigger() ||
      ((this._isHovered = !1),
      this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide));
  }
  _setTimeout(t, e) {
    clearTimeout(this._timeout), (this._timeout = setTimeout(t, e));
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(t) {
    const e = Lt.getDataAttributes(this._element);
    for (const r of Object.keys(e)) Zl.has(r) && delete e[r];
    return (
      (t = { ...e, ...(typeof t == "object" && t ? t : {}) }),
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  _configAfterMerge(t) {
    return (
      (t.container = t.container === !1 ? document.body : $t(t.container)),
      typeof t.delay == "number" &&
        (t.delay = { show: t.delay, hide: t.delay }),
      typeof t.title == "number" && (t.title = t.title.toString()),
      typeof t.content == "number" && (t.content = t.content.toString()),
      t
    );
  }
  _getDelegateConfig() {
    const t = {};
    for (const e in this._config)
      this.constructor.Default[e] !== this._config[e] &&
        (t[e] = this._config[e]);
    return (t.selector = !1), (t.trigger = "manual"), t;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), (this._popper = null)),
      this.tip && (this.tip.remove(), (this.tip = null));
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = ve.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
yt(ve);
const mh = "popover",
  vh = ".popover-header",
  _h = ".popover-body",
  yh = {
    ...ve.Default,
    content: "",
    offset: [0, 8],
    placement: "right",
    template:
      '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    trigger: "click",
  },
  bh = { ...ve.DefaultType, content: "(null|string|element|function)" };
class ei extends ve {
  static get Default() {
    return yh;
  }
  static get DefaultType() {
    return bh;
  }
  static get NAME() {
    return mh;
  }
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  _getContentForTemplate() {
    return { [vh]: this._getTitle(), [_h]: this._getContent() };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = ei.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
yt(ei);
const Eh = "scrollspy",
  xh = "bs.scrollspy",
  si = `.${xh}`,
  Th = ".data-api",
  wh = `activate${si}`,
  Mi = `click${si}`,
  Sh = `load${si}${Th}`,
  Ah = "dropdown-item",
  se = "active",
  Oh = '[data-bs-spy="scroll"]',
  ws = "[href]",
  Ch = ".nav, .list-group",
  Di = ".nav-link",
  Ph = ".nav-item",
  Rh = ".list-group-item",
  Ih = `${Di}, ${Ph} > ${Di}, ${Rh}`,
  Nh = ".dropdown",
  Lh = ".dropdown-toggle",
  Mh = {
    offset: null,
    rootMargin: "0px 0px -25%",
    smoothScroll: !1,
    target: null,
    threshold: [0.1, 0.5, 1],
  },
  Dh = {
    offset: "(number|null)",
    rootMargin: "string",
    smoothScroll: "boolean",
    target: "element",
    threshold: "array",
  };
class as extends bt {
  constructor(t, e) {
    super(t, e),
      (this._targetLinks = new Map()),
      (this._observableSections = new Map()),
      (this._rootElement =
        getComputedStyle(this._element).overflowY === "visible"
          ? null
          : this._element),
      (this._activeTarget = null),
      (this._observer = null),
      (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
      this.refresh();
  }
  static get Default() {
    return Mh;
  }
  static get DefaultType() {
    return Dh;
  }
  static get NAME() {
    return Eh;
  }
  refresh() {
    this._initializeTargetsAndObservables(),
      this._maybeEnableSmoothScroll(),
      this._observer
        ? this._observer.disconnect()
        : (this._observer = this._getNewObserver());
    for (const t of this._observableSections.values())
      this._observer.observe(t);
  }
  dispose() {
    this._observer.disconnect(), super.dispose();
  }
  _configAfterMerge(t) {
    return (
      (t.target = $t(t.target) || document.body),
      (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
      typeof t.threshold == "string" &&
        (t.threshold = t.threshold.split(",").map((e) => Number.parseFloat(e))),
      t
    );
  }
  _maybeEnableSmoothScroll() {
    !this._config.smoothScroll ||
      (A.off(this._config.target, Mi),
      A.on(this._config.target, Mi, ws, (t) => {
        const e = this._observableSections.get(t.target.hash);
        if (e) {
          t.preventDefault();
          const r = this._rootElement || window,
            i = e.offsetTop - this._element.offsetTop;
          if (r.scrollTo) {
            r.scrollTo({ top: i, behavior: "smooth" });
            return;
          }
          r.scrollTop = i;
        }
      }));
  }
  _getNewObserver() {
    const t = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin,
    };
    return new IntersectionObserver((e) => this._observerCallback(e), t);
  }
  _observerCallback(t) {
    const e = (s) => this._targetLinks.get(`#${s.target.id}`),
      r = (s) => {
        (this._previousScrollData.visibleEntryTop = s.target.offsetTop),
          this._process(e(s));
      },
      i = (this._rootElement || document.documentElement).scrollTop,
      n = i >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = i;
    for (const s of t) {
      if (!s.isIntersecting) {
        (this._activeTarget = null), this._clearActiveClass(e(s));
        continue;
      }
      const o = s.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (n && o) {
        if ((r(s), !i)) return;
        continue;
      }
      !n && !o && r(s);
    }
  }
  _initializeTargetsAndObservables() {
    (this._targetLinks = new Map()), (this._observableSections = new Map());
    const t = j.find(ws, this._config.target);
    for (const e of t) {
      if (!e.hash || Vt(e)) continue;
      const r = j.findOne(e.hash, this._element);
      ge(r) &&
        (this._targetLinks.set(e.hash, e),
        this._observableSections.set(e.hash, r));
    }
  }
  _process(t) {
    this._activeTarget !== t &&
      (this._clearActiveClass(this._config.target),
      (this._activeTarget = t),
      t.classList.add(se),
      this._activateParents(t),
      A.trigger(this._element, wh, { relatedTarget: t }));
  }
  _activateParents(t) {
    if (t.classList.contains(Ah)) {
      j.findOne(Lh, t.closest(Nh)).classList.add(se);
      return;
    }
    for (const e of j.parents(t, Ch))
      for (const r of j.prev(e, Ih)) r.classList.add(se);
  }
  _clearActiveClass(t) {
    t.classList.remove(se);
    const e = j.find(`${ws}.${se}`, t);
    for (const r of e) r.classList.remove(se);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = as.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
A.on(window, Sh, () => {
  for (const a of j.find(Oh)) as.getOrCreateInstance(a);
});
yt(as);
const kh = "tab",
  Fh = "bs.tab",
  Jt = `.${Fh}`,
  $h = `hide${Jt}`,
  Vh = `hidden${Jt}`,
  jh = `show${Jt}`,
  Uh = `shown${Jt}`,
  zh = `click${Jt}`,
  Bh = `keydown${Jt}`,
  Wh = `load${Jt}`,
  Hh = "ArrowLeft",
  ki = "ArrowRight",
  Gh = "ArrowUp",
  Fi = "ArrowDown",
  Gt = "active",
  $i = "fade",
  Ss = "show",
  Yh = "dropdown",
  Kh = ".dropdown-toggle",
  Xh = ".dropdown-menu",
  As = ":not(.dropdown-toggle)",
  Qh = '.list-group, .nav, [role="tablist"]',
  Jh = ".nav-item, .list-group-item",
  Zh = `.nav-link${As}, .list-group-item${As}, [role="tab"]${As}`,
  Jr =
    '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
  Os = `${Zh}, ${Jr}`,
  qh = `.${Gt}[data-bs-toggle="tab"], .${Gt}[data-bs-toggle="pill"], .${Gt}[data-bs-toggle="list"]`;
class fe extends bt {
  constructor(t) {
    super(t),
      (this._parent = this._element.closest(Qh)),
      this._parent &&
        (this._setInitialAttributes(this._parent, this._getChildren()),
        A.on(this._element, Bh, (e) => this._keydown(e)));
  }
  static get NAME() {
    return kh;
  }
  show() {
    const t = this._element;
    if (this._elemIsActive(t)) return;
    const e = this._getActiveElem(),
      r = e ? A.trigger(e, $h, { relatedTarget: t }) : null;
    A.trigger(t, jh, { relatedTarget: e }).defaultPrevented ||
      (r && r.defaultPrevented) ||
      (this._deactivate(e, t), this._activate(t, e));
  }
  _activate(t, e) {
    if (!t) return;
    t.classList.add(Gt), this._activate(It(t));
    const r = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Ss);
        return;
      }
      t.removeAttribute("tabindex"),
        t.setAttribute("aria-selected", !0),
        this._toggleDropDown(t, !0),
        A.trigger(t, Uh, { relatedTarget: e });
    };
    this._queueCallback(r, t, t.classList.contains($i));
  }
  _deactivate(t, e) {
    if (!t) return;
    t.classList.remove(Gt), t.blur(), this._deactivate(It(t));
    const r = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Ss);
        return;
      }
      t.setAttribute("aria-selected", !1),
        t.setAttribute("tabindex", "-1"),
        this._toggleDropDown(t, !1),
        A.trigger(t, Vh, { relatedTarget: e });
    };
    this._queueCallback(r, t, t.classList.contains($i));
  }
  _keydown(t) {
    if (![Hh, ki, Gh, Fi].includes(t.key)) return;
    t.stopPropagation(), t.preventDefault();
    const e = [ki, Fi].includes(t.key),
      r = Zs(
        this._getChildren().filter((i) => !Vt(i)),
        t.target,
        e,
        !0
      );
    r && (r.focus({ preventScroll: !0 }), fe.getOrCreateInstance(r).show());
  }
  _getChildren() {
    return j.find(Os, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null;
  }
  _setInitialAttributes(t, e) {
    this._setAttributeIfNotExists(t, "role", "tablist");
    for (const r of e) this._setInitialAttributesOnChild(r);
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t);
    const e = this._elemIsActive(t),
      r = this._getOuterElement(t);
    t.setAttribute("aria-selected", e),
      r !== t && this._setAttributeIfNotExists(r, "role", "presentation"),
      e || t.setAttribute("tabindex", "-1"),
      this._setAttributeIfNotExists(t, "role", "tab"),
      this._setInitialAttributesOnTargetPanel(t);
  }
  _setInitialAttributesOnTargetPanel(t) {
    const e = It(t);
    !e ||
      (this._setAttributeIfNotExists(e, "role", "tabpanel"),
      t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `#${t.id}`));
  }
  _toggleDropDown(t, e) {
    const r = this._getOuterElement(t);
    if (!r.classList.contains(Yh)) return;
    const i = (n, s) => {
      const o = j.findOne(n, r);
      o && o.classList.toggle(s, e);
    };
    i(Kh, Gt), i(Xh, Ss), r.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, r) {
    t.hasAttribute(e) || t.setAttribute(e, r);
  }
  _elemIsActive(t) {
    return t.classList.contains(Gt);
  }
  _getInnerElement(t) {
    return t.matches(Os) ? t : j.findOne(Os, t);
  }
  _getOuterElement(t) {
    return t.closest(Jh) || t;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = fe.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
A.on(document, zh, Jr, function (a) {
  ["A", "AREA"].includes(this.tagName) && a.preventDefault(),
    !Vt(this) && fe.getOrCreateInstance(this).show();
});
A.on(window, Wh, () => {
  for (const a of j.find(qh)) fe.getOrCreateInstance(a);
});
yt(fe);
const tc = "toast",
  ec = "bs.toast",
  Bt = `.${ec}`,
  sc = `mouseover${Bt}`,
  ic = `mouseout${Bt}`,
  rc = `focusin${Bt}`,
  nc = `focusout${Bt}`,
  ac = `hide${Bt}`,
  oc = `hidden${Bt}`,
  lc = `show${Bt}`,
  hc = `shown${Bt}`,
  cc = "fade",
  Vi = "hide",
  ze = "show",
  Be = "showing",
  uc = { animation: "boolean", autohide: "boolean", delay: "number" },
  dc = { animation: !0, autohide: !0, delay: 5e3 };
class os extends bt {
  constructor(t, e) {
    super(t, e),
      (this._timeout = null),
      (this._hasMouseInteraction = !1),
      (this._hasKeyboardInteraction = !1),
      this._setListeners();
  }
  static get Default() {
    return dc;
  }
  static get DefaultType() {
    return uc;
  }
  static get NAME() {
    return tc;
  }
  show() {
    if (A.trigger(this._element, lc).defaultPrevented) return;
    this._clearTimeout(),
      this._config.animation && this._element.classList.add(cc);
    const e = () => {
      this._element.classList.remove(Be),
        A.trigger(this._element, hc),
        this._maybeScheduleHide();
    };
    this._element.classList.remove(Vi),
      Re(this._element),
      this._element.classList.add(ze, Be),
      this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || A.trigger(this._element, ac).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(Vi),
        this._element.classList.remove(Be, ze),
        A.trigger(this._element, oc);
    };
    this._element.classList.add(Be),
      this._queueCallback(e, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(),
      this.isShown() && this._element.classList.remove(ze),
      super.dispose();
  }
  isShown() {
    return this._element.classList.contains(ze);
  }
  _maybeScheduleHide() {
    !this._config.autohide ||
      this._hasMouseInteraction ||
      this._hasKeyboardInteraction ||
      (this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay));
  }
  _onInteraction(t, e) {
    switch (t.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = e;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = e;
        break;
      }
    }
    if (e) {
      this._clearTimeout();
      return;
    }
    const r = t.relatedTarget;
    this._element === r ||
      this._element.contains(r) ||
      this._maybeScheduleHide();
  }
  _setListeners() {
    A.on(this._element, sc, (t) => this._onInteraction(t, !0)),
      A.on(this._element, ic, (t) => this._onInteraction(t, !1)),
      A.on(this._element, rc, (t) => this._onInteraction(t, !0)),
      A.on(this._element, nc, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), (this._timeout = null);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = os.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
is(os);
yt(os);
document.querySelectorAll(".nav-link").forEach((a) =>
  a.addEventListener("click", () => {
    const t = document.querySelector(".navbar-toggler");
    t.classList.add("collapsed"),
      t.setAttribute("aria-expanded", "false"),
      document.querySelector("#toggleMobileMenu").classList.remove("show");
  })
);
let ji = window.pageYOffset;
const Ui = document.querySelector(".sticky-top");
window.onscroll = function () {
  let a = window.pageYOffset;
  ji > a ? Ui.classList.add("sticky-top") : Ui.classList.remove("sticky-top"),
    (ji = a);
};
const fc = document.querySelector("#theme-btn");
const zi = document.querySelector(".fa-moon");
const Bi = document.querySelector(".fa-sun");
const Wi = {
  light: {
    primary: "#ffffff",
    secondary: "#444f5a",
    accent: "#0564bd",
    primaryRGB: "255, 255, 255",
    secondaryRGB: "68, 79, 90",
  },
  dark: {
    primary: "#22222b",
    secondary: "#a2a1a6",
    accent: "#0564bd",
    primaryRGB: "34, 34, 43",
    secondaryRGB: "162, 161, 166",
  },
};
let Cs = true;

fc.addEventListener("click", pc);

function Hi(a) {
  document.documentElement.style.setProperty("--bs-primary", a.primary);
  document.documentElement.style.setProperty("--bs-secondary", a.secondary);
  document.documentElement.style.setProperty("--bs-accent", a.accent);
  document.documentElement.style.setProperty("--bs-primary-rgb", a.primaryRGB);
  document.documentElement.style.setProperty("--bs-secondary-rgb", a.secondaryRGB);
}

function pc() {
  Cs = !Cs;
  if (Cs) {
    Hi(Wi.light);
    zi.style.display = "block";
    Bi.style.display = "none";
  } else {
    Hi(Wi.dark);
    zi.style.display = "none";
    Bi.style.display = "block";
  }
}

var Zr =
  typeof globalThis != "undefined"
    ? globalThis
    : typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : {};
function qr(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")
    ? a.default
    : a;
}
var tn = { exports: {} };
 (function (a, t) {
  (function (r, i) {
    a.exports = i();
  })(Zr, function () {
    return (function (e) {
      var r = {};
      function i(n) {
        if (r[n]) return r[n].exports;
        var s = (r[n] = { exports: {}, id: n, loaded: !1 });
        return (
          e[n].call(s.exports, s, s.exports, i), (s.loaded = !0), s.exports
        );
      }
      return (i.m = e), (i.c = r), (i.p = ""), i(0);
    })([
      function (e, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = (function () {
          function c(u, d) {
            for (var f = 0; f < d.length; f++) {
              var p = d[f];
              (p.enumerable = p.enumerable || !1),
                (p.configurable = !0),
                "value" in p && (p.writable = !0),
                Object.defineProperty(u, p.key, p);
            }
          }
          return function (u, d, f) {
            return d && c(u.prototype, d), f && c(u, f), u;
          };
        })();
        function s(c, u) {
          if (!(c instanceof u))
            throw new TypeError("Cannot call a class as a function");
        }
        var o = i(1),
          l = i(3),
          h = (function () {
            function c(u, d) {
              s(this, c), o.initializer.load(this, d, u), this.begin();
            }
            return (
              n(c, [
                {
                  key: "toggle",
                  value: function () {
                    this.pause.status ? this.start() : this.stop();
                  },
                },
                {
                  key: "stop",
                  value: function () {
                    this.typingComplete ||
                      this.pause.status ||
                      (this.toggleBlinking(!0),
                      (this.pause.status = !0),
                      this.options.onStop(this.arrayPos, this));
                  },
                },
                {
                  key: "start",
                  value: function () {
                    this.typingComplete ||
                      !this.pause.status ||
                      ((this.pause.status = !1),
                      this.pause.typewrite
                        ? this.typewrite(
                            this.pause.curString,
                            this.pause.curStrPos
                          )
                        : this.backspace(
                            this.pause.curString,
                            this.pause.curStrPos
                          ),
                      this.options.onStart(this.arrayPos, this));
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    this.reset(!1), this.options.onDestroy(this);
                  },
                },
                {
                  key: "reset",
                  value: function () {
                    var d =
                      arguments.length <= 0 || arguments[0] === void 0
                        ? !0
                        : arguments[0];
                    clearInterval(this.timeout),
                      this.replaceText(""),
                      this.cursor &&
                        this.cursor.parentNode &&
                        (this.cursor.parentNode.removeChild(this.cursor),
                        (this.cursor = null)),
                      (this.strPos = 0),
                      (this.arrayPos = 0),
                      (this.curLoop = 0),
                      d &&
                        (this.insertCursor(),
                        this.options.onReset(this),
                        this.begin());
                  },
                },
                {
                  key: "begin",
                  value: function () {
                    var d = this;
                    this.options.onBegin(this),
                      (this.typingComplete = !1),
                      this.shuffleStringsIfNeeded(this),
                      this.insertCursor(),
                      this.bindInputFocusEvents && this.bindFocusEvents(),
                      (this.timeout = setTimeout(function () {
                        !d.currentElContent || d.currentElContent.length === 0
                          ? d.typewrite(
                              d.strings[d.sequence[d.arrayPos]],
                              d.strPos
                            )
                          : d.backspace(
                              d.currentElContent,
                              d.currentElContent.length
                            );
                      }, this.startDelay));
                  },
                },
                {
                  key: "typewrite",
                  value: function (d, f) {
                    var p = this;
                    this.fadeOut &&
                      this.el.classList.contains(this.fadeOutClass) &&
                      (this.el.classList.remove(this.fadeOutClass),
                      this.cursor &&
                        this.cursor.classList.remove(this.fadeOutClass));
                    var g = this.humanizer(this.typeSpeed),
                      m = 1;
                    if (this.pause.status === !0) {
                      this.setPauseStatus(d, f, !0);
                      return;
                    }
                    this.timeout = setTimeout(function () {
                      f = l.htmlParser.typeHtmlChars(d, f, p);
                      var v = 0,
                        _ = d.substr(f);
                      if (_.charAt(0) === "^" && /^\^\d+/.test(_)) {
                        var x = 1;
                        (_ = /\d+/.exec(_)[0]),
                          (x += _.length),
                          (v = parseInt(_)),
                          (p.temporaryPause = !0),
                          p.options.onTypingPaused(p.arrayPos, p),
                          (d = d.substring(0, f) + d.substring(f + x)),
                          p.toggleBlinking(!0);
                      }
                      if (_.charAt(0) === "`") {
                        for (
                          ;
                          d.substr(f + m).charAt(0) !== "`" &&
                          (m++, !(f + m > d.length));

                        );
                        var y = d.substring(0, f),
                          E = d.substring(y.length + 1, f + m),
                          b = d.substring(f + m + 1);
                        (d = y + E + b), m--;
                      }
                      p.timeout = setTimeout(function () {
                        p.toggleBlinking(!1),
                          f >= d.length
                            ? p.doneTyping(d, f)
                            : p.keepTyping(d, f, m),
                          p.temporaryPause &&
                            ((p.temporaryPause = !1),
                            p.options.onTypingResumed(p.arrayPos, p));
                      }, v);
                    }, g);
                  },
                },
                {
                  key: "keepTyping",
                  value: function (d, f, p) {
                    f === 0 &&
                      (this.toggleBlinking(!1),
                      this.options.preStringTyped(this.arrayPos, this)),
                      (f += p);
                    var g = d.substr(0, f);
                    this.replaceText(g), this.typewrite(d, f);
                  },
                },
                {
                  key: "doneTyping",
                  value: function (d, f) {
                    var p = this;
                    this.options.onStringTyped(this.arrayPos, this),
                      this.toggleBlinking(!0),
                      !(
                        this.arrayPos === this.strings.length - 1 &&
                        (this.complete(),
                        this.loop === !1 || this.curLoop === this.loopCount)
                      ) &&
                        (this.timeout = setTimeout(function () {
                          p.backspace(d, f);
                        }, this.backDelay));
                  },
                },
                {
                  key: "backspace",
                  value: function (d, f) {
                    var p = this;
                    if (this.pause.status === !0) {
                      this.setPauseStatus(d, f, !1);
                      return;
                    }
                    if (this.fadeOut) return this.initFadeOut();
                    this.toggleBlinking(!1);
                    var g = this.humanizer(this.backSpeed);
                    this.timeout = setTimeout(function () {
                      f = l.htmlParser.backSpaceHtmlChars(d, f, p);
                      var m = d.substr(0, f);
                      if ((p.replaceText(m), p.smartBackspace)) {
                        var v = p.strings[p.arrayPos + 1];
                        v && m === v.substr(0, f)
                          ? (p.stopNum = f)
                          : (p.stopNum = 0);
                      }
                      f > p.stopNum
                        ? (f--, p.backspace(d, f))
                        : f <= p.stopNum &&
                          (p.arrayPos++,
                          p.arrayPos === p.strings.length
                            ? ((p.arrayPos = 0),
                              p.options.onLastStringBackspaced(),
                              p.shuffleStringsIfNeeded(),
                              p.begin())
                            : p.typewrite(
                                p.strings[p.sequence[p.arrayPos]],
                                f
                              ));
                    }, g);
                  },
                },
                {
                  key: "complete",
                  value: function () {
                    this.options.onComplete(this),
                      this.loop ? this.curLoop++ : (this.typingComplete = !0);
                  },
                },
                {
                  key: "setPauseStatus",
                  value: function (d, f, p) {
                    (this.pause.typewrite = p),
                      (this.pause.curString = d),
                      (this.pause.curStrPos = f);
                  },
                },
                {
                  key: "toggleBlinking",
                  value: function (d) {
                    !this.cursor ||
                      this.pause.status ||
                      (this.cursorBlinking !== d &&
                        ((this.cursorBlinking = d),
                        d
                          ? this.cursor.classList.add("typed-cursor--blink")
                          : this.cursor.classList.remove(
                              "typed-cursor--blink"
                            )));
                  },
                },
                {
                  key: "humanizer",
                  value: function (d) {
                    return Math.round((Math.random() * d) / 2) + d;
                  },
                },
                {
                  key: "shuffleStringsIfNeeded",
                  value: function () {
                    !this.shuffle ||
                      (this.sequence = this.sequence.sort(function () {
                        return Math.random() - 0.5;
                      }));
                  },
                },
                {
                  key: "initFadeOut",
                  value: function () {
                    var d = this;
                    return (
                      (this.el.className += " " + this.fadeOutClass),
                      this.cursor &&
                        (this.cursor.className += " " + this.fadeOutClass),
                      setTimeout(function () {
                        d.arrayPos++,
                          d.replaceText(""),
                          d.strings.length > d.arrayPos
                            ? d.typewrite(d.strings[d.sequence[d.arrayPos]], 0)
                            : (d.typewrite(d.strings[0], 0), (d.arrayPos = 0));
                      }, this.fadeOutDelay)
                    );
                  },
                },
                {
                  key: "replaceText",
                  value: function (d) {
                    this.attr
                      ? this.el.setAttribute(this.attr, d)
                      : this.isInput
                      ? (this.el.value = d)
                      : this.contentType === "html"
                      ? (this.el.innerHTML = d)
                      : (this.el.textContent = d);
                  },
                },
                {
                  key: "bindFocusEvents",
                  value: function () {
                    var d = this;
                    !this.isInput ||
                      (this.el.addEventListener("focus", function (f) {
                        d.stop();
                      }),
                      this.el.addEventListener("blur", function (f) {
                        (d.el.value && d.el.value.length !== 0) || d.start();
                      }));
                  },
                },
                {
                  key: "insertCursor",
                  value: function () {
                    !this.showCursor ||
                      this.cursor ||
                      ((this.cursor = document.createElement("span")),
                      (this.cursor.className = "typed-cursor"),
                      this.cursor.setAttribute("aria-hidden", !0),
                      (this.cursor.innerHTML = this.cursorChar),
                      this.el.parentNode &&
                        this.el.parentNode.insertBefore(
                          this.cursor,
                          this.el.nextSibling
                        ));
                  },
                },
              ]),
              c
            );
          })();
        (r.default = h), (e.exports = r.default);
      },
      function (e, r, i) {
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n =
            Object.assign ||
            function (f) {
              for (var p = 1; p < arguments.length; p++) {
                var g = arguments[p];
                for (var m in g)
                  Object.prototype.hasOwnProperty.call(g, m) && (f[m] = g[m]);
              }
              return f;
            },
          s = (function () {
            function f(p, g) {
              for (var m = 0; m < g.length; m++) {
                var v = g[m];
                (v.enumerable = v.enumerable || !1),
                  (v.configurable = !0),
                  "value" in v && (v.writable = !0),
                  Object.defineProperty(p, v.key, v);
              }
            }
            return function (p, g, m) {
              return g && f(p.prototype, g), m && f(p, m), p;
            };
          })();
        function o(f) {
          return f && f.__esModule ? f : { default: f };
        }
        function l(f, p) {
          if (!(f instanceof p))
            throw new TypeError("Cannot call a class as a function");
        }
        var h = i(2),
          c = o(h),
          u = (function () {
            function f() {
              l(this, f);
            }
            return (
              s(f, [
                {
                  key: "load",
                  value: function (g, m, v) {
                    if (
                      (typeof v == "string"
                        ? (g.el = document.querySelector(v))
                        : (g.el = v),
                      (g.options = n({}, c.default, m)),
                      (g.isInput = g.el.tagName.toLowerCase() === "input"),
                      (g.attr = g.options.attr),
                      (g.bindInputFocusEvents = g.options.bindInputFocusEvents),
                      (g.showCursor = g.isInput ? !1 : g.options.showCursor),
                      (g.cursorChar = g.options.cursorChar),
                      (g.cursorBlinking = !0),
                      (g.elContent = g.attr
                        ? g.el.getAttribute(g.attr)
                        : g.el.textContent),
                      (g.contentType = g.options.contentType),
                      (g.typeSpeed = g.options.typeSpeed),
                      (g.startDelay = g.options.startDelay),
                      (g.backSpeed = g.options.backSpeed),
                      (g.smartBackspace = g.options.smartBackspace),
                      (g.backDelay = g.options.backDelay),
                      (g.fadeOut = g.options.fadeOut),
                      (g.fadeOutClass = g.options.fadeOutClass),
                      (g.fadeOutDelay = g.options.fadeOutDelay),
                      (g.isPaused = !1),
                      (g.strings = g.options.strings.map(function (b) {
                        return b.trim();
                      })),
                      typeof g.options.stringsElement == "string"
                        ? (g.stringsElement = document.querySelector(
                            g.options.stringsElement
                          ))
                        : (g.stringsElement = g.options.stringsElement),
                      g.stringsElement)
                    ) {
                      (g.strings = []),
                        (g.stringsElement.style.display = "none");
                      var _ = Array.prototype.slice.apply(
                          g.stringsElement.children
                        ),
                        x = _.length;
                      if (x)
                        for (var y = 0; y < x; y += 1) {
                          var E = _[y];
                          g.strings.push(E.innerHTML.trim());
                        }
                    }
                    (g.strPos = 0),
                      (g.arrayPos = 0),
                      (g.stopNum = 0),
                      (g.loop = g.options.loop),
                      (g.loopCount = g.options.loopCount),
                      (g.curLoop = 0),
                      (g.shuffle = g.options.shuffle),
                      (g.sequence = []),
                      (g.pause = {
                        status: !1,
                        typewrite: !0,
                        curString: "",
                        curStrPos: 0,
                      }),
                      (g.typingComplete = !1);
                    for (var y in g.strings) g.sequence[y] = y;
                    (g.currentElContent = this.getCurrentElContent(g)),
                      (g.autoInsertCss = g.options.autoInsertCss),
                      this.appendAnimationCss(g);
                  },
                },
                {
                  key: "getCurrentElContent",
                  value: function (g) {
                    var m = "";
                    return (
                      g.attr
                        ? (m = g.el.getAttribute(g.attr))
                        : g.isInput
                        ? (m = g.el.value)
                        : g.contentType === "html"
                        ? (m = g.el.innerHTML)
                        : (m = g.el.textContent),
                      m
                    );
                  },
                },
                {
                  key: "appendAnimationCss",
                  value: function (g) {
                    var m = "data-typed-js-css";
                    if (
                      !!g.autoInsertCss &&
                      !(!g.showCursor && !g.fadeOut) &&
                      !document.querySelector("[" + m + "]")
                    ) {
                      var v = document.createElement("style");
                      (v.type = "text/css"), v.setAttribute(m, !0);
                      var _ = "";
                      g.showCursor &&
                        (_ += `
        .typed-cursor{
          opacity: 1;
        }
        .typed-cursor.typed-cursor--blink{
          animation: typedjsBlink 0.7s infinite;
          -webkit-animation: typedjsBlink 0.7s infinite;
                  animation: typedjsBlink 0.7s infinite;
        }
        @keyframes typedjsBlink{
          50% { opacity: 0.0; }
        }
        @-webkit-keyframes typedjsBlink{
          0% { opacity: 1; }
          50% { opacity: 0.0; }
          100% { opacity: 1; }
        }
      `),
                        g.fadeOut &&
                          (_ += `
        .typed-fade-out{
          opacity: 0;
          transition: opacity .25s;
        }
        .typed-cursor.typed-cursor--blink.typed-fade-out{
          -webkit-animation: 0;
          animation: 0;
        }
      `),
                        v.length !== 0 &&
                          ((v.innerHTML = _), document.body.appendChild(v));
                    }
                  },
                },
              ]),
              f
            );
          })();
        r.default = u;
        var d = new u();
        r.initializer = d;
      },
      function (e, r) {
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = {
          strings: [
            "These are the default values...",
            "You know what you should do?",
            "Use your own!",
            "Have a great day!",
          ],
          stringsElement: null,
          typeSpeed: 0,
          startDelay: 0,
          backSpeed: 0,
          smartBackspace: !0,
          shuffle: !1,
          backDelay: 700,
          fadeOut: !1,
          fadeOutClass: "typed-fade-out",
          fadeOutDelay: 500,
          loop: !1,
          loopCount: 1 / 0,
          showCursor: !0,
          cursorChar: "|",
          autoInsertCss: !0,
          attr: null,
          bindInputFocusEvents: !1,
          contentType: "html",
          onBegin: function (s) {},
          onComplete: function (s) {},
          preStringTyped: function (s, o) {},
          onStringTyped: function (s, o) {},
          onLastStringBackspaced: function (s) {},
          onTypingPaused: function (s, o) {},
          onTypingResumed: function (s, o) {},
          onReset: function (s) {},
          onStop: function (s, o) {},
          onStart: function (s, o) {},
          onDestroy: function (s) {},
        };
        (r.default = i), (e.exports = r.default);
      },
      function (e, r) {
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function () {
          function l(h, c) {
            for (var u = 0; u < c.length; u++) {
              var d = c[u];
              (d.enumerable = d.enumerable || !1),
                (d.configurable = !0),
                "value" in d && (d.writable = !0),
                Object.defineProperty(h, d.key, d);
            }
          }
          return function (h, c, u) {
            return c && l(h.prototype, c), u && l(h, u), h;
          };
        })();
        function n(l, h) {
          if (!(l instanceof h))
            throw new TypeError("Cannot call a class as a function");
        }
        var s = (function () {
          function l() {
            n(this, l);
          }
          return (
            i(l, [
              {
                key: "typeHtmlChars",
                value: function (c, u, d) {
                  if (d.contentType !== "html") return u;
                  var f = c.substr(u).charAt(0);
                  if (f === "<" || f === "&") {
                    var p = "";
                    for (
                      f === "<" ? (p = ">") : (p = ";");
                      c.substr(u + 1).charAt(0) !== p &&
                      (u++, !(u + 1 > c.length));

                    );
                    u++;
                  }
                  return u;
                },
              },
              {
                key: "backSpaceHtmlChars",
                value: function (c, u, d) {
                  if (d.contentType !== "html") return u;
                  var f = c.substr(u).charAt(0);
                  if (f === ">" || f === ";") {
                    var p = "";
                    for (
                      f === ">" ? (p = "<") : (p = "&");
                      c.substr(u - 1).charAt(0) !== p && (u--, !(u < 0));

                    );
                    u--;
                  }
                  return u;
                },
              },
            ]),
            l
          );
        })();
        r.default = s;
        var o = new s();
        r.htmlParser = o;
      },
    ]);
  });
})(tn);
var gc = qr(tn.exports),
  mc = {
    strings: [
      "I'm a Front-end Developer",
      "I Build  Websites",
      "I Solve Problems",
      "I'm A Python Developer",
      "I Build Apps",
      "I Build Softwares",
      "I Build Games",
    ],
    typeSpeed: 120,
    backSpeed: 50,
    backDelay: 1500,
    loop: !0,
  };
new gc("#headline", mc);
let Ps = 0;
function F() {
  if (!(Ps > 100)) {
    if (Ps === 100)
      console.warn("Curtains: too many warnings thrown, stop logging.");
    else {
      const a = Array.prototype.slice.call(arguments);
      console.warn.apply(console, a);
    }
    Ps++;
  }
}
function lt() {
  const a = Array.prototype.slice.call(arguments);
  console.error.apply(console, a);
}
function en() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (a) => {
    let t = (Math.random() * 16) | 0;
    return (a === "x" ? t : (t & 3) | 8).toString(16).toUpperCase();
  });
}
function Tt(a) {
  return (a & (a - 1)) === 0;
}
function vc(a, t, e) {
  return (1 - e) * a + e * t;
}
class _c {
  constructor(t) {
    if (((this.type = "Scene"), !t || t.type !== "Renderer"))
      lt(this.type + ": Renderer not passed as first argument", t);
    else if (!t.gl) {
      lt(this.type + ": Renderer WebGL context is undefined", t);
      return;
    }
    (this.renderer = t), (this.gl = t.gl), this.initStacks();
  }
  initStacks() {
    this.stacks = {
      pingPong: [],
      renderTargets: [],
      opaque: [],
      transparent: [],
      renderPasses: [],
      scenePasses: [],
    };
  }
  resetPlaneStacks() {
    (this.stacks.pingPong = []),
      (this.stacks.renderTargets = []),
      (this.stacks.opaque = []),
      (this.stacks.transparent = []);
    for (let t = 0; t < this.renderer.planes.length; t++)
      this.addPlane(this.renderer.planes[t]);
  }
  resetShaderPassStacks() {
    (this.stacks.scenePasses = []), (this.stacks.renderPasses = []);
    for (let t = 0; t < this.renderer.shaderPasses.length; t++)
      (this.renderer.shaderPasses[t].index = t),
        this.renderer.shaderPasses[t]._isScenePass
          ? this.stacks.scenePasses.push(this.renderer.shaderPasses[t])
          : this.stacks.renderPasses.push(this.renderer.shaderPasses[t]);
    this.stacks.scenePasses.length === 0 &&
      (this.renderer.state.scenePassIndex = null);
  }
  addToRenderTargetsStack(t) {
    const e = this.renderer.planes.filter(
      (i) => i.type !== "PingPongPlane" && i.target && i.uuid !== t.uuid
    );
    let r = -1;
    if (t.target._depth) {
      for (let i = e.length - 1; i >= 0; i--)
        if (e[i].target.uuid === t.target.uuid) {
          r = i + 1;
          break;
        }
    } else r = e.findIndex((i) => i.target.uuid === t.target.uuid);
    (r = Math.max(0, r)),
      e.splice(r, 0, t),
      t.target._depth
        ? (e.sort((i, n) => i.index - n.index),
          e.sort((i, n) => n.renderOrder - i.renderOrder))
        : (e.sort((i, n) => n.index - i.index),
          e.sort((i, n) => i.renderOrder - n.renderOrder)),
      e.sort((i, n) => i.target.index - n.target.index),
      (this.stacks.renderTargets = e);
  }
  addToRegularPlaneStack(t) {
    const e = this.renderer.planes.filter(
      (i) =>
        i.type !== "PingPongPlane" &&
        !i.target &&
        i._transparent === t._transparent &&
        i.uuid !== t.uuid
    );
    let r = -1;
    for (let i = e.length - 1; i >= 0; i--)
      if (e[i]._geometry.definition.id === t._geometry.definition.id) {
        r = i + 1;
        break;
      }
    return (
      (r = Math.max(0, r)),
      e.splice(r, 0, t),
      e.sort((i, n) => i.index - n.index),
      e
    );
  }
  addPlane(t) {
    if (t.type === "PingPongPlane") this.stacks.pingPong.push(t);
    else if (t.target) this.addToRenderTargetsStack(t);
    else if (t._transparent) {
      const e = this.addToRegularPlaneStack(t);
      e.sort((r, i) => i.relativeTranslation.z - r.relativeTranslation.z),
        e.sort((r, i) => i.renderOrder - r.renderOrder),
        (this.stacks.transparent = e);
    } else {
      const e = this.addToRegularPlaneStack(t);
      e.sort((r, i) => i.renderOrder - r.renderOrder), (this.stacks.opaque = e);
    }
  }
  removePlane(t) {
    t.type === "PingPongPlane"
      ? (this.stacks.pingPong = this.stacks.pingPong.filter(
          (e) => e.uuid !== t.uuid
        ))
      : t.target
      ? (this.stacks.renderTargets = this.stacks.renderTargets.filter(
          (e) => e.uuid !== t.uuid
        ))
      : t._transparent
      ? (this.stacks.transparent = this.stacks.transparent.filter(
          (e) => e.uuid !== t.uuid
        ))
      : (this.stacks.opaque = this.stacks.opaque.filter(
          (e) => e.uuid !== t.uuid
        ));
  }
  setPlaneRenderOrder(t) {
    if (t.type === "ShaderPass")
      this.sortShaderPassStack(
        t._isScenePass ? this.stacks.scenePasses : this.stacks.renderPasses
      );
    else if (t.type === "PingPongPlane") return;
    if (t.target)
      t.target._depth
        ? (this.stacks.renderTargets.sort((e, r) => e.index - r.index),
          this.stacks.renderTargets.sort(
            (e, r) => r.renderOrder - e.renderOrder
          ))
        : (this.stacks.renderTargets.sort((e, r) => r.index - e.index),
          this.stacks.renderTargets.sort(
            (e, r) => e.renderOrder - r.renderOrder
          )),
        this.stacks.renderTargets.sort(
          (e, r) => e.target.index - r.target.index
        );
    else {
      const e = t._transparent ? this.stacks.transparent : this.stacks.opaque,
        r = this.stacks.scenePasses.find(
          (i, n) => i._isScenePass && !i._depth && n === 0
        );
      !this.renderer.depth || r
        ? (e.sort((i, n) => n.index - i.index),
          t._transparent &&
            e.sort((i, n) => i.relativeTranslation.z - n.relativeTranslation.z),
          e.sort((i, n) => i.renderOrder - n.renderOrder))
        : (e.sort((i, n) => i.index - n.index),
          t._transparent &&
            e.sort((i, n) => n.relativeTranslation.z - i.relativeTranslation.z),
          e.sort((i, n) => n.renderOrder - i.renderOrder));
    }
  }
  addShaderPass(t) {
    t._isScenePass
      ? (this.stacks.scenePasses.push(t),
        this.sortShaderPassStack(this.stacks.scenePasses))
      : (this.stacks.renderPasses.push(t),
        this.sortShaderPassStack(this.stacks.renderPasses));
  }
  removeShaderPass(t) {
    this.resetShaderPassStacks();
  }
  sortShaderPassStack(t) {
    t.sort((e, r) => e.index - r.index),
      t.sort((e, r) => e.renderOrder - r.renderOrder);
  }
  enableShaderPass() {
    this.stacks.scenePasses.length &&
      this.stacks.renderPasses.length === 0 &&
      this.renderer.planes.length &&
      ((this.renderer.state.scenePassIndex = 0),
      this.renderer.bindFrameBuffer(this.stacks.scenePasses[0].target));
  }
  drawRenderPasses() {
    this.stacks.scenePasses.length &&
      this.stacks.renderPasses.length &&
      this.renderer.planes.length &&
      ((this.renderer.state.scenePassIndex = 0),
      this.renderer.bindFrameBuffer(this.stacks.scenePasses[0].target));
    for (let t = 0; t < this.stacks.renderPasses.length; t++)
      this.stacks.renderPasses[t]._startDrawing(), this.renderer.clearDepth();
  }
  drawScenePasses() {
    for (let t = 0; t < this.stacks.scenePasses.length; t++)
      this.stacks.scenePasses[t]._startDrawing();
  }
  drawPingPongStack() {
    for (let t = 0; t < this.stacks.pingPong.length; t++) {
      const e = this.stacks.pingPong[t];
      e && e._startDrawing();
    }
  }
  drawStack(t) {
    for (let e = 0; e < this.stacks[t].length; e++) {
      const r = this.stacks[t][e];
      r && r._startDrawing();
    }
  }
  draw() {
    this.drawPingPongStack(),
      this.enableShaderPass(),
      this.drawStack("renderTargets"),
      this.drawRenderPasses(),
      this.renderer.setBlending(!1),
      this.drawStack("opaque"),
      this.stacks.transparent.length &&
        (this.renderer.setBlending(!0), this.drawStack("transparent")),
      this.drawScenePasses();
  }
}
class yc {
  constructor() {
    (this.geometries = []), this.clear();
  }
  clear() {
    (this.textures = []), (this.programs = []);
  }
  getGeometryFromID(t) {
    return this.geometries.find((e) => e.id === t);
  }
  addGeometry(t, e, r) {
    this.geometries.push({ id: t, vertices: e, uvs: r });
  }
  isSameShader(t, e) {
    return t.localeCompare(e) === 0;
  }
  getProgramFromShaders(t, e) {
    return this.programs.find(
      (r) => this.isSameShader(r.vsCode, t) && this.isSameShader(r.fsCode, e)
    );
  }
  addProgram(t) {
    this.programs.push(t);
  }
  getTextureFromSource(t) {
    const e = typeof t == "string" ? t : t.src;
    return this.textures.find((r) => r.source && r.source.src === e);
  }
  addTexture(t) {
    this.getTextureFromSource(t.source) || this.textures.push(t);
  }
  removeTexture(t) {
    this.textures = this.textures.filter((e) => e.uuid !== t.uuid);
  }
}
class bc {
  constructor() {
    this.clear();
  }
  clear() {
    this.queue = [];
  }
  add(t, e = !1) {
    const r = { callback: t, keep: e, timeout: null };
    return (
      (r.timeout = setTimeout(() => {
        this.queue.push(r);
      }, 0)),
      r
    );
  }
  execute() {
    this.queue.map((t) => {
      t.callback && t.callback(), clearTimeout(this.queue.timeout);
    }),
      (this.queue = this.queue.filter((t) => t.keep));
  }
}
class Ec {
  constructor({
    alpha: t,
    antialias: e,
    premultipliedAlpha: r,
    depth: i,
    failIfMajorPerformanceCaveat: n,
    preserveDrawingBuffer: s,
    stencil: o,
    container: l,
    pixelRatio: h,
    renderingScale: c,
    production: u,
    onError: d,
    onSuccess: f,
    onContextLost: p,
    onContextRestored: g,
    onDisposed: m,
    onSceneChange: v,
  }) {
    (this.type = "Renderer"),
      (this.alpha = t),
      (this.antialias = e),
      (this.premultipliedAlpha = r),
      (this.depth = i),
      (this.failIfMajorPerformanceCaveat = n),
      (this.preserveDrawingBuffer = s),
      (this.stencil = o),
      (this.container = l),
      (this.pixelRatio = h),
      (this._renderingScale = c),
      (this.production = u),
      (this.onError = d),
      (this.onSuccess = f),
      (this.onContextLost = p),
      (this.onContextRestored = g),
      (this.onDisposed = m),
      (this.onSceneChange = v),
      this.initState(),
      (this.canvas = document.createElement("canvas"));
    const _ = {
      alpha: this.alpha,
      premultipliedAlpha: this.premultipliedAlpha,
      antialias: this.antialias,
      depth: this.depth,
      failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
      preserveDrawingBuffer: this.preserveDrawingBuffer,
      stencil: this.stencil,
    };
    if (
      ((this.gl = this.canvas.getContext("webgl2", _)),
      (this._isWebGL2 = !!this.gl),
      this.gl ||
        (this.gl =
          this.canvas.getContext("webgl", _) ||
          this.canvas.getContext("experimental-webgl", _)),
      this.gl)
    )
      this.onSuccess && this.onSuccess();
    else {
      this.production || F(this.type + ": WebGL context could not be created"),
        (this.state.isActive = !1),
        this.onError && this.onError();
      return;
    }
    this.initRenderer();
  }
  initState() {
    this.state = {
      isActive: !0,
      isContextLost: !0,
      drawingEnabled: !0,
      forceRender: !1,
      currentProgramID: null,
      currentGeometryID: null,
      forceBufferUpdate: !1,
      depthTest: null,
      blending: null,
      cullFace: null,
      frameBufferID: null,
      scenePassIndex: null,
      activeTexture: null,
      unpackAlignment: null,
      flipY: null,
      premultiplyAlpha: null,
    };
  }
  initCallbackQueueManager() {
    this.nextRender = new bc();
  }
  initRenderer() {
    (this.planes = []),
      (this.renderTargets = []),
      (this.shaderPasses = []),
      (this.state.isContextLost = !1),
      (this.state.maxTextureSize = this.gl.getParameter(
        this.gl.MAX_TEXTURE_SIZE
      )),
      this.initCallbackQueueManager(),
      this.setBlendFunc(),
      this.setDepthFunc(),
      this.setDepthTest(!0),
      (this.cache = new yc()),
      (this.scene = new _c(this)),
      this.getExtensions(),
      (this._contextLostHandler = this.contextLost.bind(this)),
      this.canvas.addEventListener(
        "webglcontextlost",
        this._contextLostHandler,
        !1
      ),
      (this._contextRestoredHandler = this.contextRestored.bind(this)),
      this.canvas.addEventListener(
        "webglcontextrestored",
        this._contextRestoredHandler,
        !1
      );
  }
  getExtensions() {
    (this.extensions = []),
      this._isWebGL2
        ? ((this.extensions.EXT_color_buffer_float = this.gl.getExtension(
            "EXT_color_buffer_float"
          )),
          (this.extensions.OES_texture_float_linear = this.gl.getExtension(
            "OES_texture_float_linear"
          )),
          (this.extensions.EXT_texture_filter_anisotropic =
            this.gl.getExtension("EXT_texture_filter_anisotropic")),
          (this.extensions.WEBGL_lose_context =
            this.gl.getExtension("WEBGL_lose_context")))
        : ((this.extensions.OES_vertex_array_object = this.gl.getExtension(
            "OES_vertex_array_object"
          )),
          (this.extensions.OES_texture_float =
            this.gl.getExtension("OES_texture_float")),
          (this.extensions.OES_texture_float_linear = this.gl.getExtension(
            "OES_texture_float_linear"
          )),
          (this.extensions.OES_texture_half_float = this.gl.getExtension(
            "OES_texture_half_float"
          )),
          (this.extensions.OES_texture_half_float_linear = this.gl.getExtension(
            "OES_texture_half_float_linear"
          )),
          (this.extensions.EXT_texture_filter_anisotropic =
            this.gl.getExtension("EXT_texture_filter_anisotropic")),
          (this.extensions.OES_element_index_uint = this.gl.getExtension(
            "OES_element_index_uint"
          )),
          (this.extensions.OES_standard_derivatives = this.gl.getExtension(
            "OES_standard_derivatives"
          )),
          (this.extensions.EXT_sRGB = this.gl.getExtension("EXT_sRGB")),
          (this.extensions.WEBGL_depth_texture = this.gl.getExtension(
            "WEBGL_depth_texture"
          )),
          (this.extensions.WEBGL_draw_buffers =
            this.gl.getExtension("WEBGL_draw_buffers")),
          (this.extensions.WEBGL_lose_context =
            this.gl.getExtension("WEBGL_lose_context")));
  }
  contextLost(t) {
    (this.state.isContextLost = !0),
      this.state.isActive &&
        (t.preventDefault(),
        this.nextRender.add(() => this.onContextLost && this.onContextLost()));
  }
  restoreContext() {
    !this.state.isActive ||
      (this.initState(),
      this.gl && this.extensions.WEBGL_lose_context
        ? this.extensions.WEBGL_lose_context.restoreContext()
        : (!this.gl && !this.production
            ? F(
                this.type +
                  ": Could not restore the context because the context is not defined"
              )
            : !this.extensions.WEBGL_lose_context &&
              !this.production &&
              F(
                this.type +
                  ": Could not restore the context because the restore context extension is not defined"
              ),
          this.onError && this.onError()));
  }
  isContextexFullyRestored() {
    let t = !0;
    for (let e = 0; e < this.renderTargets.length; e++) {
      this.renderTargets[e].textures[0]._canDraw || (t = !1);
      break;
    }
    if (t)
      for (let e = 0; e < this.planes.length; e++)
        if (this.planes[e]._canDraw) {
          for (let r = 0; r < this.planes[e].textures.length; r++)
            if (!this.planes[e].textures[r]._canDraw) {
              t = !1;
              break;
            }
        } else {
          t = !1;
          break;
        }
    if (t)
      for (let e = 0; e < this.shaderPasses.length; e++)
        if (this.shaderPasses[e]._canDraw) {
          for (let r = 0; r < this.shaderPasses[e].textures.length; r++)
            if (!this.shaderPasses[e].textures[r]._canDraw) {
              t = !1;
              break;
            }
        } else {
          t = !1;
          break;
        }
    return t;
  }
  contextRestored() {
    this.getExtensions(),
      this.setBlendFunc(),
      this.setDepthFunc(),
      this.setDepthTest(!0),
      this.cache.clear(),
      this.scene.initStacks();
    for (let e = 0; e < this.renderTargets.length; e++)
      this.renderTargets[e]._restoreContext();
    for (let e = 0; e < this.planes.length; e++)
      this.planes[e]._restoreContext();
    for (let e = 0; e < this.shaderPasses.length; e++)
      this.shaderPasses[e]._restoreContext();
    const t = this.nextRender.add(() => {
      this.isContextexFullyRestored() &&
        ((t.keep = !1),
        (this.state.isContextLost = !1),
        this.onContextRestored && this.onContextRestored(),
        this.onSceneChange(),
        this.needRender());
    }, !0);
  }
  setPixelRatio(t) {
    this.pixelRatio = t;
  }
  setSize() {
    if (!this.gl) return;
    const t = this.container.getBoundingClientRect();
    this._boundingRect = {
      width: t.width * this.pixelRatio,
      height: t.height * this.pixelRatio,
      top: t.top * this.pixelRatio,
      left: t.left * this.pixelRatio,
    };
    const e = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),
      r = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (e && r) {
      let n = function (s) {
        let o = 0;
        for (; s && !isNaN(s.offsetTop); )
          (o += s.offsetTop - s.scrollTop), (s = s.offsetParent);
        return o;
      };
      var i = n;
      this._boundingRect.top = n(this.container) * this.pixelRatio;
    }
    (this.canvas.style.width =
      Math.floor(this._boundingRect.width / this.pixelRatio) + "px"),
      (this.canvas.style.height =
        Math.floor(this._boundingRect.height / this.pixelRatio) + "px"),
      (this.canvas.width = Math.floor(
        this._boundingRect.width * this._renderingScale
      )),
      (this.canvas.height = Math.floor(
        this._boundingRect.height * this._renderingScale
      )),
      this.gl.viewport(
        0,
        0,
        this.gl.drawingBufferWidth,
        this.gl.drawingBufferHeight
      );
  }
  resize() {
    for (let t = 0; t < this.planes.length; t++)
      this.planes[t]._canDraw && this.planes[t].resize();
    for (let t = 0; t < this.shaderPasses.length; t++)
      this.shaderPasses[t]._canDraw && this.shaderPasses[t].resize();
    for (let t = 0; t < this.renderTargets.length; t++)
      this.renderTargets[t].resize();
    this.needRender();
  }
  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
  clearDepth() {
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
  }
  clearColor() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  bindFrameBuffer(t, e) {
    let r = null;
    t
      ? ((r = t.index),
        r !== this.state.frameBufferID &&
          (this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, t._frameBuffer),
          this.gl.viewport(0, 0, t._size.width, t._size.height),
          t._shouldClear && !e && this.clear()))
      : this.state.frameBufferID !== null &&
        (this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null),
        this.gl.viewport(
          0,
          0,
          this.gl.drawingBufferWidth,
          this.gl.drawingBufferHeight
        )),
      (this.state.frameBufferID = r);
  }
  setDepthTest(t) {
    t && !this.state.depthTest
      ? ((this.state.depthTest = t), this.gl.enable(this.gl.DEPTH_TEST))
      : !t &&
        this.state.depthTest &&
        ((this.state.depthTest = t), this.gl.disable(this.gl.DEPTH_TEST));
  }
  setDepthFunc() {
    this.gl.depthFunc(this.gl.LEQUAL);
  }
  setBlending(t = !1) {
    t && !this.state.blending
      ? ((this.state.blending = t), this.gl.enable(this.gl.BLEND))
      : !t &&
        this.state.blending &&
        ((this.state.blending = t), this.gl.disable(this.gl.BLEND));
  }
  setBlendFunc() {
    this.gl.enable(this.gl.BLEND),
      this.premultipliedAlpha
        ? this.gl.blendFuncSeparate(
            this.gl.ONE,
            this.gl.ONE_MINUS_SRC_ALPHA,
            this.gl.ONE,
            this.gl.ONE_MINUS_SRC_ALPHA
          )
        : this.gl.blendFuncSeparate(
            this.gl.SRC_ALPHA,
            this.gl.ONE_MINUS_SRC_ALPHA,
            this.gl.ONE,
            this.gl.ONE_MINUS_SRC_ALPHA
          );
  }
  setFaceCulling(t) {
    if (this.state.cullFace !== t)
      if (((this.state.cullFace = t), t === "none"))
        this.gl.disable(this.gl.CULL_FACE);
      else {
        const e = t === "front" ? this.gl.FRONT : this.gl.BACK;
        this.gl.enable(this.gl.CULL_FACE), this.gl.cullFace(e);
      }
  }
  useProgram(t) {
    (this.state.currentProgramID === null ||
      this.state.currentProgramID !== t.id) &&
      (this.gl.useProgram(t.program), (this.state.currentProgramID = t.id));
  }
  removePlane(t) {
    !this.gl ||
      ((this.planes = this.planes.filter((e) => e.uuid !== t.uuid)),
      this.scene.removePlane(t),
      (t = null),
      this.gl && this.clear(),
      this.onSceneChange());
  }
  removeRenderTarget(t) {
    if (!this.gl) return;
    let e = this.planes.find(
      (r) => r.type !== "PingPongPlane" && r.target && r.target.uuid === t.uuid
    );
    for (let r = 0; r < this.planes.length; r++)
      this.planes[r].target &&
        this.planes[r].target.uuid === t.uuid &&
        (this.planes[r].target = null);
    this.renderTargets = this.renderTargets.filter((r) => r.uuid !== t.uuid);
    for (let r = 0; r < this.renderTargets.length; r++)
      this.renderTargets[r].index = r;
    (t = null),
      this.gl && this.clear(),
      e && this.scene.resetPlaneStacks(),
      this.onSceneChange();
  }
  removeShaderPass(t) {
    !this.gl ||
      ((this.shaderPasses = this.shaderPasses.filter((e) => e.uuid !== t.uuid)),
      this.scene.removeShaderPass(t),
      (t = null),
      this.gl && this.clear(),
      this.onSceneChange());
  }
  enableDrawing() {
    this.state.drawingEnabled = !0;
  }
  disableDrawing() {
    this.state.drawingEnabled = !1;
  }
  needRender() {
    this.state.forceRender = !0;
  }
  render() {
    !this.gl ||
      (this.clear(), (this.state.currentGeometryID = null), this.scene.draw());
  }
  deletePrograms() {
    for (let t = 0; t < this.cache.programs.length; t++) {
      const e = this.cache.programs[t];
      this.gl.deleteProgram(e.program);
    }
  }
  dispose() {
    if (!this.gl) return;
    for (this.state.isActive = !1; this.planes.length > 0; )
      this.removePlane(this.planes[0]);
    for (; this.shaderPasses.length > 0; )
      this.removeShaderPass(this.shaderPasses[0]);
    for (; this.renderTargets.length > 0; )
      this.removeRenderTarget(this.renderTargets[0]);
    let t = this.nextRender.add(() => {
      this.planes.length === 0 &&
        this.shaderPasses.length === 0 &&
        this.renderTargets.length === 0 &&
        ((t.keep = !1),
        this.deletePrograms(),
        this.clear(),
        this.canvas.removeEventListener(
          "webgllost",
          this._contextLostHandler,
          !1
        ),
        this.canvas.removeEventListener(
          "webglrestored",
          this._contextRestoredHandler,
          !1
        ),
        this.gl &&
          this.extensions.WEBGL_lose_context &&
          this.extensions.WEBGL_lose_context.loseContext(),
        (this.canvas.width = this.canvas.width),
        (this.gl = null),
        this.container.removeChild(this.canvas),
        (this.container = null),
        (this.canvas = null),
        this.onDisposed && this.onDisposed());
    }, !0);
  }
}
class xc {
  constructor({
    xOffset: t = 0,
    yOffset: e = 0,
    lastXDelta: r = 0,
    lastYDelta: i = 0,
    shouldWatch: n = !0,
    onScroll: s = () => {},
  } = {}) {
    (this.xOffset = t),
      (this.yOffset = e),
      (this.lastXDelta = r),
      (this.lastYDelta = i),
      (this.shouldWatch = n),
      (this.onScroll = s),
      (this.handler = this.scroll.bind(this, !0)),
      this.shouldWatch &&
        window.addEventListener("scroll", this.handler, { passive: !0 });
  }
  scroll() {
    this.updateScrollValues(window.pageXOffset, window.pageYOffset);
  }
  updateScrollValues(t, e) {
    const r = this.xOffset;
    (this.xOffset = t), (this.lastXDelta = r - this.xOffset);
    const i = this.yOffset;
    (this.yOffset = e),
      (this.lastYDelta = i - this.yOffset),
      this.onScroll && this.onScroll(this.lastXDelta, this.lastYDelta);
  }
  dispose() {
    this.shouldWatch &&
      window.removeEventListener("scroll", this.handler, { passive: !0 });
  }
}
const Tc = "8.1.3";
class wc {
  constructor({
    container: t,
    alpha: e = !0,
    premultipliedAlpha: r = !1,
    antialias: i = !0,
    depth: n = !0,
    failIfMajorPerformanceCaveat: s = !0,
    preserveDrawingBuffer: o = !1,
    stencil: l = !1,
    autoResize: h = !0,
    autoRender: c = !0,
    watchScroll: u = !0,
    pixelRatio: d = window.devicePixelRatio || 1,
    renderingScale: f = 1,
    production: p = !1,
  } = {}) {
    (this.type = "Curtains"),
      (this._autoResize = h),
      (this._autoRender = c),
      (this._watchScroll = u),
      (this.pixelRatio = d),
      (f = isNaN(f) ? 1 : parseFloat(f)),
      (this._renderingScale = Math.max(0.25, Math.min(1, f))),
      (this.premultipliedAlpha = r),
      (this.alpha = e),
      (this.antialias = i),
      (this.depth = n),
      (this.failIfMajorPerformanceCaveat = s),
      (this.preserveDrawingBuffer = o),
      (this.stencil = l),
      (this.production = p),
      (this.errors = !1),
      t
        ? this.setContainer(t)
        : this.production ||
          F(
            this.type +
              ": no container provided in the initial parameters. Use setContainer() method to set one later and initialize the WebGL context"
          );
  }
  setContainer(t) {
    if (t)
      if (typeof t == "string")
        if (((t = document.getElementById(t)), t)) this.container = t;
        else {
          let e = document.createElement("div");
          e.setAttribute("id", "curtains-canvas"),
            document.body.appendChild(e),
            (this.container = e),
            this.production ||
              F(
                'Curtains: no valid container HTML element or ID provided, created a div with "curtains-canvas" ID instead'
              );
        }
      else t instanceof Element && (this.container = t);
    else {
      let e = document.createElement("div");
      e.setAttribute("id", "curtains-canvas"),
        document.body.appendChild(e),
        (this.container = e),
        this.production ||
          F(
            'Curtains: no valid container HTML element or ID provided, created a div with "curtains-canvas" ID instead'
          );
    }
    this._initCurtains();
  }
  _initCurtains() {
    (this.planes = []),
      (this.renderTargets = []),
      (this.shaderPasses = []),
      this._initRenderer(),
      this.gl &&
        (this._initScroll(),
        this._setSize(),
        this._addListeners(),
        this.container.appendChild(this.canvas),
        console.log("curtains.js - v" + Tc),
        (this._animationFrameID = null),
        this._autoRender && this._animate());
  }
  _initRenderer() {
    (this.renderer = new Ec({
      alpha: this.alpha,
      antialias: this.antialias,
      premultipliedAlpha: this.premultipliedAlpha,
      depth: this.depth,
      failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
      preserveDrawingBuffer: this.preserveDrawingBuffer,
      stencil: this.stencil,
      container: this.container,
      pixelRatio: this.pixelRatio,
      renderingScale: this._renderingScale,
      production: this.production,
      onError: () => this._onRendererError(),
      onSuccess: () => this._onRendererSuccess(),
      onContextLost: () => this._onRendererContextLost(),
      onContextRestored: () => this._onRendererContextRestored(),
      onDisposed: () => this._onRendererDisposed(),
      onSceneChange: () => this._keepSync(),
    })),
      (this.gl = this.renderer.gl),
      (this.canvas = this.renderer.canvas);
  }
  restoreContext() {
    this.renderer.restoreContext();
  }
  _animate() {
    this.render(),
      (this._animationFrameID = window.requestAnimationFrame(
        this._animate.bind(this)
      ));
  }
  enableDrawing() {
    this.renderer.enableDrawing();
  }
  disableDrawing() {
    this.renderer.disableDrawing();
  }
  needRender() {
    this.renderer.needRender();
  }
  nextRender(t, e = !1) {
    return this.renderer.nextRender.add(t, e);
  }
  clear() {
    this.renderer && this.renderer.clear();
  }
  clearDepth() {
    this.renderer && this.renderer.clearDepth();
  }
  clearColor() {
    this.renderer && this.renderer.clearColor();
  }
  isWebGL2() {
    return this.gl ? this.renderer._isWebGL2 : !1;
  }
  render() {
    this.renderer.nextRender.execute(),
      !(
        !this.renderer.state.drawingEnabled && !this.renderer.state.forceRender
      ) &&
        (this.renderer.state.forceRender &&
          (this.renderer.state.forceRender = !1),
        this._onRenderCallback && this._onRenderCallback(),
        this.renderer.render());
  }
  _addListeners() {
    (this._resizeHandler = null),
      this._autoResize &&
        ((this._resizeHandler = this.resize.bind(this, !0)),
        window.addEventListener("resize", this._resizeHandler, !1));
  }
  setPixelRatio(t, e) {
    (this.pixelRatio = parseFloat(Math.max(t, 1)) || 1),
      this.renderer.setPixelRatio(t),
      this.resize(e);
  }
  _setSize() {
    this.renderer.setSize(),
      this._scrollManager.shouldWatch &&
        ((this._scrollManager.xOffset = window.pageXOffset),
        (this._scrollManager.yOffset = window.pageYOffset));
  }
  getBoundingRect() {
    return this.renderer._boundingRect;
  }
  resize(t) {
    !this.gl ||
      (this._setSize(),
      this.renderer.resize(),
      this.nextRender(() => {
        this._onAfterResizeCallback && t && this._onAfterResizeCallback();
      }));
  }
  _initScroll() {
    this._scrollManager = new xc({
      xOffset: window.pageXOffset,
      yOffset: window.pageYOffset,
      lastXDelta: 0,
      lastYDelta: 0,
      shouldWatch: this._watchScroll,
      onScroll: (t, e) => this._updateScroll(t, e),
    });
  }
  _updateScroll(t, e) {
    for (let r = 0; r < this.planes.length; r++)
      this.planes[r].watchScroll && this.planes[r].updateScrollPosition(t, e);
    this.renderer.needRender(),
      this._onScrollCallback && this._onScrollCallback();
  }
  updateScrollValues(t, e) {
    this._scrollManager.updateScrollValues(t, e);
  }
  getScrollDeltas() {
    return {
      x: this._scrollManager.lastXDelta,
      y: this._scrollManager.lastYDelta,
    };
  }
  getScrollValues() {
    return { x: this._scrollManager.xOffset, y: this._scrollManager.yOffset };
  }
  _keepSync() {
    (this.planes = this.renderer.planes),
      (this.shaderPasses = this.renderer.shaderPasses),
      (this.renderTargets = this.renderer.renderTargets);
  }
  lerp(t, e, r) {
    return vc(t, e, r);
  }
  onAfterResize(t) {
    return t && (this._onAfterResizeCallback = t), this;
  }
  onError(t) {
    return t && (this._onErrorCallback = t), this;
  }
  _onRendererError() {
    setTimeout(() => {
      this._onErrorCallback && !this.errors && this._onErrorCallback(),
        (this.errors = !0);
    }, 0);
  }
  onSuccess(t) {
    return t && (this._onSuccessCallback = t), this;
  }
  _onRendererSuccess() {
    setTimeout(() => {
      this._onSuccessCallback && this._onSuccessCallback();
    }, 0);
  }
  onContextLost(t) {
    return t && (this._onContextLostCallback = t), this;
  }
  _onRendererContextLost() {
    this._onContextLostCallback && this._onContextLostCallback();
  }
  onContextRestored(t) {
    return t && (this._onContextRestoredCallback = t), this;
  }
  _onRendererContextRestored() {
    this._onContextRestoredCallback && this._onContextRestoredCallback();
  }
  onRender(t) {
    return t && (this._onRenderCallback = t), this;
  }
  onScroll(t) {
    return t && (this._onScrollCallback = t), this;
  }
  dispose() {
    this.renderer.dispose();
  }
  _onRendererDisposed() {
    this._animationFrameID &&
      window.cancelAnimationFrame(this._animationFrameID),
      this._resizeHandler &&
        window.removeEventListener("resize", this._resizeHandler, !1),
      this._scrollManager && this._scrollManager.dispose();
  }
}
class Sc {
  constructor(t, e, r) {
    if (((this.type = "Uniforms"), !t || t.type !== "Renderer"))
      lt(this.type + ": Renderer not passed as first argument", t);
    else if (!t.gl) {
      lt(this.type + ": Renderer WebGL context is undefined", t);
      return;
    }
    if (
      ((this.renderer = t),
      (this.gl = t.gl),
      (this.program = e),
      (this.uniforms = {}),
      r)
    )
      for (const i in r) {
        const n = r[i];
        this.uniforms[i] = {
          name: n.name,
          type: n.type,
          value:
            n.value.clone && typeof n.value.clone == "function"
              ? n.value.clone()
              : n.value,
          update: null,
        };
      }
  }
  handleUniformSetting(t) {
    switch (t.type) {
      case "1i":
        t.update = this.setUniform1i.bind(this);
        break;
      case "1iv":
        t.update = this.setUniform1iv.bind(this);
        break;
      case "1f":
        t.update = this.setUniform1f.bind(this);
        break;
      case "1fv":
        t.update = this.setUniform1fv.bind(this);
        break;
      case "2i":
        t.update = this.setUniform2i.bind(this);
        break;
      case "2iv":
        t.update = this.setUniform2iv.bind(this);
        break;
      case "2f":
        t.update = this.setUniform2f.bind(this);
        break;
      case "2fv":
        t.update = this.setUniform2fv.bind(this);
        break;
      case "3i":
        t.update = this.setUniform3i.bind(this);
        break;
      case "3iv":
        t.update = this.setUniform3iv.bind(this);
        break;
      case "3f":
        t.update = this.setUniform3f.bind(this);
        break;
      case "3fv":
        t.update = this.setUniform3fv.bind(this);
        break;
      case "4i":
        t.update = this.setUniform4i.bind(this);
        break;
      case "4iv":
        t.update = this.setUniform4iv.bind(this);
        break;
      case "4f":
        t.update = this.setUniform4f.bind(this);
        break;
      case "4fv":
        t.update = this.setUniform4fv.bind(this);
        break;
      case "mat2":
        t.update = this.setUniformMatrix2fv.bind(this);
        break;
      case "mat3":
        t.update = this.setUniformMatrix3fv.bind(this);
        break;
      case "mat4":
        t.update = this.setUniformMatrix4fv.bind(this);
        break;
      default:
        this.renderer.production ||
          F(this.type + ": This uniform type is not handled : ", t.type);
    }
  }
  setInternalFormat(t) {
    t.value.type === "Vec2"
      ? ((t._internalFormat = "Vec2"), (t.lastValue = t.value.clone()))
      : t.value.type === "Vec3"
      ? ((t._internalFormat = "Vec3"), (t.lastValue = t.value.clone()))
      : t.value.type === "Mat4"
      ? ((t._internalFormat = "Mat4"), (t.lastValue = t.value.clone()))
      : t.value.type === "Quat"
      ? ((t._internalFormat = "Quat"), (t.lastValue = t.value.clone()))
      : Array.isArray(t.value)
      ? ((t._internalFormat = "array"), (t.lastValue = Array.from(t.value)))
      : t.value.constructor === Float32Array
      ? ((t._internalFormat = "mat"), (t.lastValue = t.value))
      : ((t._internalFormat = "float"), (t.lastValue = t.value));
  }
  setUniforms() {
    if (this.uniforms)
      for (const t in this.uniforms) {
        let e = this.uniforms[t];
        (e.location = this.gl.getUniformLocation(this.program, e.name)),
          e._internalFormat || this.setInternalFormat(e),
          e.type ||
            (e._internalFormat === "Vec2"
              ? (e.type = "2f")
              : e._internalFormat === "Vec3"
              ? (e.type = "3f")
              : e._internalFormat === "Mat4"
              ? (e.type = "mat4")
              : e._internalFormat === "array"
              ? e.value.length === 4
                ? ((e.type = "4f"),
                  this.renderer.production ||
                    F(
                      this.type +
                        ": No uniform type declared for " +
                        e.name +
                        ", applied a 4f (array of 4 floats) uniform type"
                    ))
                : e.value.length === 3
                ? ((e.type = "3f"),
                  this.renderer.production ||
                    F(
                      this.type +
                        ": No uniform type declared for " +
                        e.name +
                        ", applied a 3f (array of 3 floats) uniform type"
                    ))
                : e.value.length === 2 &&
                  ((e.type = "2f"),
                  this.renderer.production ||
                    F(
                      this.type +
                        ": No uniform type declared for " +
                        e.name +
                        ", applied a 2f (array of 2 floats) uniform type"
                    ))
              : e._internalFormat === "mat"
              ? e.value.length === 16
                ? ((e.type = "mat4"),
                  this.renderer.production ||
                    F(
                      this.type +
                        ": No uniform type declared for " +
                        e.name +
                        ", applied a mat4 (4x4 matrix array) uniform type"
                    ))
                : e.value.length === 9
                ? ((e.type = "mat3"),
                  this.renderer.production ||
                    F(
                      this.type +
                        ": No uniform type declared for " +
                        e.name +
                        ", applied a mat3 (3x3 matrix array) uniform type"
                    ))
                : e.value.length === 4 &&
                  ((e.type = "mat2"),
                  this.renderer.production ||
                    F(
                      this.type +
                        ": No uniform type declared for " +
                        e.name +
                        ", applied a mat2 (2x2 matrix array) uniform type"
                    ))
              : ((e.type = "1f"),
                this.renderer.production ||
                  F(
                    this.type +
                      ": No uniform type declared for " +
                      e.name +
                      ", applied a 1f (float) uniform type"
                  ))),
          this.handleUniformSetting(e),
          e.update && e.update(e);
      }
  }
  updateUniforms() {
    if (this.uniforms)
      for (const t in this.uniforms) {
        const e = this.uniforms[t];
        let r = !1;
        e._internalFormat === "Vec2" ||
        e._internalFormat === "Vec3" ||
        e._internalFormat === "Quat"
          ? e.value.equals(e.lastValue) || ((r = !0), e.lastValue.copy(e.value))
          : e.value.length
          ? JSON.stringify(e.value) !== JSON.stringify(e.lastValue) &&
            ((r = !0), (e.lastValue = Array.from(e.value)))
          : e.value !== e.lastValue && ((r = !0), (e.lastValue = e.value)),
          r && e.update && e.update(e);
      }
  }
  setUniform1i(t) {
    this.gl.uniform1i(t.location, t.value);
  }
  setUniform1iv(t) {
    this.gl.uniform1iv(t.location, t.value);
  }
  setUniform1f(t) {
    this.gl.uniform1f(t.location, t.value);
  }
  setUniform1fv(t) {
    this.gl.uniform1fv(t.location, t.value);
  }
  setUniform2i(t) {
    t._internalFormat === "Vec2"
      ? this.gl.uniform2i(t.location, t.value.x, t.value.y)
      : this.gl.uniform2i(t.location, t.value[0], t.value[1]);
  }
  setUniform2iv(t) {
    t._internalFormat === "Vec2"
      ? this.gl.uniform2iv(t.location, [t.value.x, t.value.y])
      : this.gl.uniform2iv(t.location, t.value);
  }
  setUniform2f(t) {
    t._internalFormat === "Vec2"
      ? this.gl.uniform2f(t.location, t.value.x, t.value.y)
      : this.gl.uniform2f(t.location, t.value[0], t.value[1]);
  }
  setUniform2fv(t) {
    t._internalFormat === "Vec2"
      ? this.gl.uniform2fv(t.location, [t.value.x, t.value.y])
      : this.gl.uniform2fv(t.location, t.value);
  }
  setUniform3i(t) {
    t._internalFormat === "Vec3"
      ? this.gl.uniform3i(t.location, t.value.x, t.value.y, t.value.z)
      : this.gl.uniform3i(t.location, t.value[0], t.value[1], t.value[2]);
  }
  setUniform3iv(t) {
    t._internalFormat === "Vec3"
      ? this.gl.uniform3iv(t.location, [t.value.x, t.value.y, t.value.z])
      : this.gl.uniform3iv(t.location, t.value);
  }
  setUniform3f(t) {
    t._internalFormat === "Vec3"
      ? this.gl.uniform3f(t.location, t.value.x, t.value.y, t.value.z)
      : this.gl.uniform3f(t.location, t.value[0], t.value[1], t.value[2]);
  }
  setUniform3fv(t) {
    t._internalFormat === "Vec3"
      ? this.gl.uniform3fv(t.location, [t.value.x, t.value.y, t.value.z])
      : this.gl.uniform3fv(t.location, t.value);
  }
  setUniform4i(t) {
    t._internalFormat === "Quat"
      ? this.gl.uniform4i(
          t.location,
          t.value.elements[0],
          t.value.elements[1],
          t.value.elements[2],
          t.value[3]
        )
      : this.gl.uniform4i(
          t.location,
          t.value[0],
          t.value[1],
          t.value[2],
          t.value[3]
        );
  }
  setUniform4iv(t) {
    t._internalFormat === "Quat"
      ? this.gl.uniform4iv(t.location, [
          t.value.elements[0],
          t.value.elements[1],
          t.value.elements[2],
          t.value[3],
        ])
      : this.gl.uniform4iv(t.location, t.value);
  }
  setUniform4f(t) {
    t._internalFormat === "Quat"
      ? this.gl.uniform4f(
          t.location,
          t.value.elements[0],
          t.value.elements[1],
          t.value.elements[2],
          t.value[3]
        )
      : this.gl.uniform4f(
          t.location,
          t.value[0],
          t.value[1],
          t.value[2],
          t.value[3]
        );
  }
  setUniform4fv(t) {
    t._internalFormat === "Quat"
      ? this.gl.uniform4fv(t.location, [
          t.value.elements[0],
          t.value.elements[1],
          t.value.elements[2],
          t.value[3],
        ])
      : this.gl.uniform4fv(t.location, t.value);
  }
  setUniformMatrix2fv(t) {
    this.gl.uniformMatrix2fv(t.location, !1, t.value);
  }
  setUniformMatrix3fv(t) {
    this.gl.uniformMatrix3fv(t.location, !1, t.value);
  }
  setUniformMatrix4fv(t) {
    t._internalFormat === "Mat4"
      ? this.gl.uniformMatrix4fv(t.location, !1, t.value.elements)
      : this.gl.uniformMatrix4fv(t.location, !1, t.value);
  }
}
const Ac = `
precision mediump float;
`;
var ls = Ac.replace(/\n/g, "");
const Oc = `
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
`;
var sn = Oc.replace(/\n/g, "");
const Cc = `
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
`;
var hs = Cc.replace(/\n/g, "");
const Pc =
  ls +
  sn +
  hs +
  `
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main() {
    vTextureCoord = aTextureCoord;
    vVertexPosition = aVertexPosition;
    
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
`;
var Rc = Pc.replace(/\n/g, "");
const Ic =
  ls +
  hs +
  `
void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`;
var Nc = Ic.replace(/\n/g, "");
const Lc =
  ls +
  sn +
  hs +
  `
void main() {
    vTextureCoord = aTextureCoord;
    vVertexPosition = aVertexPosition;
    
    gl_Position = vec4(aVertexPosition, 1.0);
}
`;
var Mc = Lc.replace(/\n/g, "");
const Dc =
  ls +
  hs +
  `
uniform sampler2D uRenderTexture;

void main() {
    gl_FragColor = texture2D(uRenderTexture, vTextureCoord);
}
`;
var kc = Dc.replace(/\n/g, "");
let Gi = 0;
class Yi {
  constructor(t, { parent: e, vertexShader: r, fragmentShader: i } = {}) {
    if (((this.type = "Program"), !t || t.type !== "Renderer"))
      lt(this.type + ": Renderer not passed as first argument", t);
    else if (!t.gl) {
      lt(this.type + ": Renderer WebGL context is undefined", t);
      return;
    }
    (this.renderer = t),
      (this.gl = this.renderer.gl),
      (this.parent = e),
      (this.defaultVsCode = this.parent.type === "Plane" ? Rc : Mc),
      (this.defaultFsCode = this.parent.type === "Plane" ? Nc : kc),
      r
        ? (this.vsCode = r)
        : (!this.renderer.production &&
            this.parent.type === "Plane" &&
            F(
              this.parent.type +
                ": No vertex shader provided, will use a default one"
            ),
          (this.vsCode = this.defaultVsCode)),
      i
        ? (this.fsCode = i)
        : (this.renderer.production ||
            F(
              this.parent.type +
                ": No fragment shader provided, will use a default one"
            ),
          (this.fsCode = this.defaultFsCode)),
      (this.compiled = !0),
      this.setupProgram();
  }
  createShader(t, e) {
    const r = this.gl.createShader(e);
    if (
      (this.gl.shaderSource(r, t),
      this.gl.compileShader(r),
      !this.renderer.production &&
        !this.gl.getShaderParameter(r, this.gl.COMPILE_STATUS))
    ) {
      const i =
        e === this.gl.VERTEX_SHADER ? "vertex shader" : "fragment shader";
      let s = this.gl.getShaderSource(r).split(`
`);
      for (let o = 0; o < s.length; o++) s[o] = o + 1 + ": " + s[o];
      return (
        (s = s.join(`
`)),
        F(
          this.type + ": Errors occurred while compiling the",
          i,
          `:
`,
          this.gl.getShaderInfoLog(r)
        ),
        lt(s),
        F(this.type + ": Will use a default", i),
        this.createShader(
          e === this.gl.VERTEX_SHADER ? this.defaultVsCode : this.defaultFsCode,
          e
        )
      );
    }
    return r;
  }
  useNewShaders() {
    (this.vertexShader = this.createShader(this.vsCode, this.gl.VERTEX_SHADER)),
      (this.fragmentShader = this.createShader(
        this.fsCode,
        this.gl.FRAGMENT_SHADER
      )),
      (!this.vertexShader || !this.fragmentShader) &&
        (this.renderer.production ||
          F(
            this.type +
              ": Unable to find or compile the vertex or fragment shader"
          ));
  }
  setupProgram() {
    let t = this.renderer.cache.getProgramFromShaders(this.vsCode, this.fsCode);
    t
      ? ((this.vertexShader = t.vertexShader),
        (this.fragmentShader = t.fragmentShader),
        (this.activeUniforms = t.activeUniforms),
        (this.activeAttributes = t.activeAttributes),
        this.createProgram())
      : (this.useNewShaders(),
        this.compiled &&
          (this.createProgram(), this.renderer.cache.addProgram(this)));
  }
  createProgram() {
    if (
      (Gi++,
      (this.id = Gi),
      (this.program = this.gl.createProgram()),
      this.gl.attachShader(this.program, this.vertexShader),
      this.gl.attachShader(this.program, this.fragmentShader),
      this.gl.linkProgram(this.program),
      !this.renderer.production &&
        !this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
    ) {
      F(
        this.type +
          ": Unable to initialize the shader program: " +
          this.gl.getProgramInfoLog(this.program)
      ),
        F(this.type + ": Will use default vertex and fragment shaders"),
        (this.vertexShader = this.createShader(
          this.defaultVsCode,
          this.gl.VERTEX_SHADER
        )),
        (this.fragmentShader = this.createShader(
          this.defaultFsCode,
          this.gl.FRAGMENT_SHADER
        )),
        this.createProgram();
      return;
    }
    if (
      (this.gl.deleteShader(this.vertexShader),
      this.gl.deleteShader(this.fragmentShader),
      !this.activeUniforms || !this.activeAttributes)
    ) {
      this.activeUniforms = { textures: [], textureMatrices: [] };
      const t = this.gl.getProgramParameter(
        this.program,
        this.gl.ACTIVE_UNIFORMS
      );
      for (let r = 0; r < t; r++) {
        const i = this.gl.getActiveUniform(this.program, r);
        i.type === this.gl.SAMPLER_2D &&
          this.activeUniforms.textures.push(i.name),
          i.type === this.gl.FLOAT_MAT4 &&
            i.name !== "uMVMatrix" &&
            i.name !== "uPMatrix" &&
            this.activeUniforms.textureMatrices.push(i.name);
      }
      this.activeAttributes = [];
      const e = this.gl.getProgramParameter(
        this.program,
        this.gl.ACTIVE_ATTRIBUTES
      );
      for (let r = 0; r < e; r++) {
        const i = this.gl.getActiveAttrib(this.program, r);
        this.activeAttributes.push(i.name);
      }
    }
  }
  createUniforms(t) {
    (this.uniformsManager = new Sc(this.renderer, this.program, t)),
      this.setUniforms();
  }
  setUniforms() {
    this.renderer.useProgram(this), this.uniformsManager.setUniforms();
  }
  updateUniforms() {
    this.renderer.useProgram(this), this.uniformsManager.updateUniforms();
  }
}
class Fc {
  constructor(t, { program: e = null, width: r = 1, height: i = 1 } = {}) {
    if (((this.type = "Geometry"), !t || t.type !== "Renderer"))
      lt(this.type + ": Renderer not passed as first argument", t);
    else if (!t.gl) {
      lt(this.type + ": Renderer WebGL context is undefined", t);
      return;
    }
    (this.renderer = t),
      (this.gl = this.renderer.gl),
      (this.definition = { id: r * i + r, width: r, height: i }),
      this.setDefaultAttributes(),
      this.setVerticesUVs();
  }
  restoreContext(t) {
    (this.program = null),
      this.setDefaultAttributes(),
      this.setVerticesUVs(),
      this.setProgram(t);
  }
  setDefaultAttributes() {
    this.attributes = {
      vertexPosition: { name: "aVertexPosition", size: 3, isActive: !1 },
      textureCoord: { name: "aTextureCoord", size: 3, isActive: !1 },
    };
  }
  setVerticesUVs() {
    const t = this.renderer.cache.getGeometryFromID(this.definition.id);
    t
      ? ((this.attributes.vertexPosition.array = t.vertices),
        (this.attributes.textureCoord.array = t.uvs))
      : (this.computeVerticesUVs(),
        this.renderer.cache.addGeometry(
          this.definition.id,
          this.attributes.vertexPosition.array,
          this.attributes.textureCoord.array
        ));
  }
  setProgram(t) {
    (this.program = t),
      this.initAttributes(),
      this.renderer._isWebGL2
        ? ((this._vao = this.gl.createVertexArray()),
          this.gl.bindVertexArray(this._vao))
        : this.renderer.extensions.OES_vertex_array_object &&
          ((this._vao =
            this.renderer.extensions.OES_vertex_array_object.createVertexArrayOES()),
          this.renderer.extensions.OES_vertex_array_object.bindVertexArrayOES(
            this._vao
          )),
      this.initializeBuffers();
  }
  initAttributes() {
    for (const t in this.attributes) {
      if (
        ((this.attributes[t].isActive = this.program.activeAttributes.includes(
          this.attributes[t].name
        )),
        !this.attributes[t].isActive)
      )
        return;
      (this.attributes[t].location = this.gl.getAttribLocation(
        this.program.program,
        this.attributes[t].name
      )),
        (this.attributes[t].buffer = this.gl.createBuffer()),
        (this.attributes[t].numberOfItems =
          this.definition.width *
          this.definition.height *
          this.attributes[t].size *
          2);
    }
  }
  computeVerticesUVs() {
    (this.attributes.vertexPosition.array = []),
      (this.attributes.textureCoord.array = []);
    const t = this.attributes.vertexPosition.array,
      e = this.attributes.textureCoord.array;
    for (let r = 0; r < this.definition.height; r++) {
      const i = r / this.definition.height;
      for (let n = 0; n < this.definition.width; n++) {
        const s = n / this.definition.width;
        e.push(s),
          e.push(i),
          e.push(0),
          t.push((s - 0.5) * 2),
          t.push((i - 0.5) * 2),
          t.push(0),
          e.push(s + 1 / this.definition.width),
          e.push(i),
          e.push(0),
          t.push((s + 1 / this.definition.width - 0.5) * 2),
          t.push((i - 0.5) * 2),
          t.push(0),
          e.push(s),
          e.push(i + 1 / this.definition.height),
          e.push(0),
          t.push((s - 0.5) * 2),
          t.push((i + 1 / this.definition.height - 0.5) * 2),
          t.push(0),
          e.push(s),
          e.push(i + 1 / this.definition.height),
          e.push(0),
          t.push((s - 0.5) * 2),
          t.push((i + 1 / this.definition.height - 0.5) * 2),
          t.push(0),
          e.push(s + 1 / this.definition.width),
          e.push(i),
          e.push(0),
          t.push((s + 1 / this.definition.width - 0.5) * 2),
          t.push((i - 0.5) * 2),
          t.push(0),
          e.push(s + 1 / this.definition.width),
          e.push(i + 1 / this.definition.height),
          e.push(0),
          t.push((s + 1 / this.definition.width - 0.5) * 2),
          t.push((i + 1 / this.definition.height - 0.5) * 2),
          t.push(0);
      }
    }
  }
  initializeBuffers() {
    if (!!this.attributes) {
      for (const t in this.attributes) {
        if (!this.attributes[t].isActive) return;
        this.gl.enableVertexAttribArray(this.attributes[t].location),
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[t].buffer),
          this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(this.attributes[t].array),
            this.gl.STATIC_DRAW
          ),
          this.gl.vertexAttribPointer(
            this.attributes[t].location,
            this.attributes[t].size,
            this.gl.FLOAT,
            !1,
            0,
            0
          );
      }
      this.renderer.state.currentGeometryID = this.definition.id;
    }
  }
  bindBuffers() {
    if (this._vao)
      this.renderer._isWebGL2
        ? this.gl.bindVertexArray(this._vao)
        : this.renderer.extensions.OES_vertex_array_object.bindVertexArrayOES(
            this._vao
          );
    else
      for (const t in this.attributes) {
        if (!this.attributes[t].isActive) return;
        this.gl.enableVertexAttribArray(this.attributes[t].location),
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[t].buffer),
          this.gl.vertexAttribPointer(
            this.attributes[t].location,
            this.attributes[t].size,
            this.gl.FLOAT,
            !1,
            0,
            0
          );
      }
    this.renderer.state.currentGeometryID = this.definition.id;
  }
  draw() {
    this.gl.drawArrays(
      this.gl.TRIANGLES,
      0,
      this.attributes.vertexPosition.numberOfItems
    );
  }
  dispose() {
    this._vao &&
      (this.renderer._isWebGL2
        ? this.gl.deleteVertexArray(this._vao)
        : this.renderer.extensions.OES_vertex_array_object.deleteVertexArrayOES(
            this._vao
          ));
    for (const t in this.attributes) {
      if (!this.attributes[t].isActive) return;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[t].buffer),
        this.gl.bufferData(this.gl.ARRAY_BUFFER, 1, this.gl.STATIC_DRAW),
        this.gl.deleteBuffer(this.attributes[t].buffer);
    }
    (this.attributes = null), (this.renderer.state.currentGeometryID = null);
  }
}
class At {
  constructor(
    t = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  ) {
    (this.type = "Mat4"), (this.elements = t);
  }
  setFromArray(t) {
    for (let e = 0; e < this.elements.length; e++) this.elements[e] = t[e];
    return this;
  }
  copy(t) {
    const e = t.elements;
    return (
      (this.elements[0] = e[0]),
      (this.elements[1] = e[1]),
      (this.elements[2] = e[2]),
      (this.elements[3] = e[3]),
      (this.elements[4] = e[4]),
      (this.elements[5] = e[5]),
      (this.elements[6] = e[6]),
      (this.elements[7] = e[7]),
      (this.elements[8] = e[8]),
      (this.elements[9] = e[9]),
      (this.elements[10] = e[10]),
      (this.elements[11] = e[11]),
      (this.elements[12] = e[12]),
      (this.elements[13] = e[13]),
      (this.elements[14] = e[14]),
      (this.elements[15] = e[15]),
      this
    );
  }
  clone() {
    return new At().copy(this);
  }
  multiply(t) {
    const e = this.elements,
      r = t.elements;
    let i = new At();
    return (
      (i.elements[0] = r[0] * e[0] + r[1] * e[4] + r[2] * e[8] + r[3] * e[12]),
      (i.elements[1] = r[0] * e[1] + r[1] * e[5] + r[2] * e[9] + r[3] * e[13]),
      (i.elements[2] = r[0] * e[2] + r[1] * e[6] + r[2] * e[10] + r[3] * e[14]),
      (i.elements[3] = r[0] * e[3] + r[1] * e[7] + r[2] * e[11] + r[3] * e[15]),
      (i.elements[4] = r[4] * e[0] + r[5] * e[4] + r[6] * e[8] + r[7] * e[12]),
      (i.elements[5] = r[4] * e[1] + r[5] * e[5] + r[6] * e[9] + r[7] * e[13]),
      (i.elements[6] = r[4] * e[2] + r[5] * e[6] + r[6] * e[10] + r[7] * e[14]),
      (i.elements[7] = r[4] * e[3] + r[5] * e[7] + r[6] * e[11] + r[7] * e[15]),
      (i.elements[8] =
        r[8] * e[0] + r[9] * e[4] + r[10] * e[8] + r[11] * e[12]),
      (i.elements[9] =
        r[8] * e[1] + r[9] * e[5] + r[10] * e[9] + r[11] * e[13]),
      (i.elements[10] =
        r[8] * e[2] + r[9] * e[6] + r[10] * e[10] + r[11] * e[14]),
      (i.elements[11] =
        r[8] * e[3] + r[9] * e[7] + r[10] * e[11] + r[11] * e[15]),
      (i.elements[12] =
        r[12] * e[0] + r[13] * e[4] + r[14] * e[8] + r[15] * e[12]),
      (i.elements[13] =
        r[12] * e[1] + r[13] * e[5] + r[14] * e[9] + r[15] * e[13]),
      (i.elements[14] =
        r[12] * e[2] + r[13] * e[6] + r[14] * e[10] + r[15] * e[14]),
      (i.elements[15] =
        r[12] * e[3] + r[13] * e[7] + r[14] * e[11] + r[15] * e[15]),
      i
    );
  }
  getInverse() {
    const t = this.elements,
      e = new At(),
      r = e.elements;
    let i = t[0],
      n = t[1],
      s = t[2],
      o = t[3],
      l = t[4],
      h = t[5],
      c = t[6],
      u = t[7],
      d = t[8],
      f = t[9],
      p = t[10],
      g = t[11],
      m = t[12],
      v = t[13],
      _ = t[14],
      x = t[15],
      y = i * h - n * l,
      E = i * c - s * l,
      b = i * u - o * l,
      S = n * c - s * h,
      C = n * u - o * h,
      R = s * u - o * c,
      N = d * v - f * m,
      T = d * _ - p * m,
      w = d * x - g * m,
      P = f * _ - p * v,
      O = f * x - g * v,
      M = p * x - g * _,
      I = y * M - E * O + b * P + S * w - C * T + R * N;
    return I
      ? ((I = 1 / I),
        (r[0] = (h * M - c * O + u * P) * I),
        (r[1] = (s * O - n * M - o * P) * I),
        (r[2] = (v * R - _ * C + x * S) * I),
        (r[3] = (p * C - f * R - g * S) * I),
        (r[4] = (c * w - l * M - u * T) * I),
        (r[5] = (i * M - s * w + o * T) * I),
        (r[6] = (_ * b - m * R - x * E) * I),
        (r[7] = (d * R - p * b + g * E) * I),
        (r[8] = (l * O - h * w + u * N) * I),
        (r[9] = (n * w - i * O - o * N) * I),
        (r[10] = (m * C - v * b + x * y) * I),
        (r[11] = (f * b - d * C - g * y) * I),
        (r[12] = (h * T - l * P - c * N) * I),
        (r[13] = (i * P - n * T + s * N) * I),
        (r[14] = (v * E - m * S - _ * y) * I),
        (r[15] = (d * S - f * E + p * y) * I),
        e)
      : null;
  }
  scale(t) {
    let e = this.elements;
    return (
      (e[0] *= t.x),
      (e[1] *= t.x),
      (e[2] *= t.x),
      (e[3] *= t.x),
      (e[4] *= t.y),
      (e[5] *= t.y),
      (e[6] *= t.y),
      (e[7] *= t.y),
      (e[8] *= t.z),
      (e[9] *= t.z),
      (e[10] *= t.z),
      (e[11] *= t.z),
      this
    );
  }
  compose(t, e, r) {
    let i = this.elements;
    const n = e.elements[0],
      s = e.elements[1],
      o = e.elements[2],
      l = e.elements[3],
      h = n + n,
      c = s + s,
      u = o + o,
      d = n * h,
      f = n * c,
      p = n * u,
      g = s * c,
      m = s * u,
      v = o * u,
      _ = l * h,
      x = l * c,
      y = l * u,
      E = r.x,
      b = r.y,
      S = r.z;
    return (
      (i[0] = (1 - (g + v)) * E),
      (i[1] = (f + y) * E),
      (i[2] = (p - x) * E),
      (i[3] = 0),
      (i[4] = (f - y) * b),
      (i[5] = (1 - (d + v)) * b),
      (i[6] = (m + _) * b),
      (i[7] = 0),
      (i[8] = (p + x) * S),
      (i[9] = (m - _) * S),
      (i[10] = (1 - (d + g)) * S),
      (i[11] = 0),
      (i[12] = t.x),
      (i[13] = t.y),
      (i[14] = t.z),
      (i[15] = 1),
      this
    );
  }
  composeFromOrigin(t, e, r, i) {
    let n = this.elements;
    const s = e.elements[0],
      o = e.elements[1],
      l = e.elements[2],
      h = e.elements[3],
      c = s + s,
      u = o + o,
      d = l + l,
      f = s * c,
      p = s * u,
      g = s * d,
      m = o * u,
      v = o * d,
      _ = l * d,
      x = h * c,
      y = h * u,
      E = h * d,
      b = r.x,
      S = r.y,
      C = r.z,
      R = i.x,
      N = i.y,
      T = i.z,
      w = (1 - (m + _)) * b,
      P = (p + E) * b,
      O = (g - y) * b,
      M = (p - E) * S,
      I = (1 - (f + _)) * S,
      D = (v + x) * S,
      $ = (g + y) * C,
      U = (v - x) * C,
      z = (1 - (f + m)) * C;
    return (
      (n[0] = w),
      (n[1] = P),
      (n[2] = O),
      (n[3] = 0),
      (n[4] = M),
      (n[5] = I),
      (n[6] = D),
      (n[7] = 0),
      (n[8] = $),
      (n[9] = U),
      (n[10] = z),
      (n[11] = 0),
      (n[12] = t.x + R - (w * R + M * N + $ * T)),
      (n[13] = t.y + N - (P * R + I * N + U * T)),
      (n[14] = t.z + T - (O * R + D * N + z * T)),
      (n[15] = 1),
      this
    );
  }
}
class mt {
  constructor(t = 0, e = t) {
    (this.type = "Vec2"), (this._x = t), (this._y = e);
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  set x(t) {
    const e = t !== this._x;
    (this._x = t), e && this._onChangeCallback && this._onChangeCallback();
  }
  set y(t) {
    const e = t !== this._y;
    (this._y = t), e && this._onChangeCallback && this._onChangeCallback();
  }
  onChange(t) {
    return t && (this._onChangeCallback = t), this;
  }
  set(t, e) {
    return (this._x = t), (this._y = e), this;
  }
  add(t) {
    return (this._x += t.x), (this._y += t.y), this;
  }
  addScalar(t) {
    return (this._x += t), (this._y += t), this;
  }
  sub(t) {
    return (this._x -= t.x), (this._y -= t.y), this;
  }
  subScalar(t) {
    return (this._x -= t), (this._y -= t), this;
  }
  multiply(t) {
    return (this._x *= t.x), (this._y *= t.y), this;
  }
  multiplyScalar(t) {
    return (this._x *= t), (this._y *= t), this;
  }
  copy(t) {
    return (this._x = t.x), (this._y = t.y), this;
  }
  clone() {
    return new mt(this._x, this._y);
  }
  sanitizeNaNValuesWith(t) {
    return (
      (this._x = isNaN(this._x) ? t.x : parseFloat(this._x)),
      (this._y = isNaN(this._y) ? t.y : parseFloat(this._y)),
      this
    );
  }
  max(t) {
    return (
      (this._x = Math.max(this._x, t.x)),
      (this._y = Math.max(this._y, t.y)),
      this
    );
  }
  min(t) {
    return (
      (this._x = Math.min(this._x, t.x)),
      (this._y = Math.min(this._y, t.y)),
      this
    );
  }
  equals(t) {
    return this._x === t.x && this._y === t.y;
  }
  normalize() {
    let t = this._x * this._x + this._y * this._y;
    return (
      t > 0 && (t = 1 / Math.sqrt(t)), (this._x *= t), (this._y *= t), this
    );
  }
  dot(t) {
    return this._x * t.x + this._y * t.y;
  }
}
class q {
  constructor(t = 0, e = t, r = t) {
    (this.type = "Vec3"), (this._x = t), (this._y = e), (this._z = r);
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }
  set x(t) {
    const e = t !== this._x;
    (this._x = t), e && this._onChangeCallback && this._onChangeCallback();
  }
  set y(t) {
    const e = t !== this._y;
    (this._y = t), e && this._onChangeCallback && this._onChangeCallback();
  }
  set z(t) {
    const e = t !== this._z;
    (this._z = t), e && this._onChangeCallback && this._onChangeCallback();
  }
  onChange(t) {
    return t && (this._onChangeCallback = t), this;
  }
  set(t, e, r) {
    return (this._x = t), (this._y = e), (this._z = r), this;
  }
  add(t) {
    return (this._x += t.x), (this._y += t.y), (this._z += t.z), this;
  }
  addScalar(t) {
    return (this._x += t), (this._y += t), (this._z += t), this;
  }
  sub(t) {
    return (this._x -= t.x), (this._y -= t.y), (this._z -= t.z), this;
  }
  subScalar(t) {
    return (this._x -= t), (this._y -= t), (this._z -= t), this;
  }
  multiply(t) {
    return (this._x *= t.x), (this._y *= t.y), (this._z *= t.z), this;
  }
  multiplyScalar(t) {
    return (this._x *= t), (this._y *= t), (this._z *= t), this;
  }
  copy(t) {
    return (this._x = t.x), (this._y = t.y), (this._z = t.z), this;
  }
  clone() {
    return new q(this._x, this._y, this._z);
  }
  sanitizeNaNValuesWith(t) {
    return (
      (this._x = isNaN(this._x) ? t.x : parseFloat(this._x)),
      (this._y = isNaN(this._y) ? t.y : parseFloat(this._y)),
      (this._z = isNaN(this._z) ? t.z : parseFloat(this._z)),
      this
    );
  }
  max(t) {
    return (
      (this._x = Math.max(this._x, t.x)),
      (this._y = Math.max(this._y, t.y)),
      (this._z = Math.max(this._z, t.z)),
      this
    );
  }
  min(t) {
    return (
      (this._x = Math.min(this._x, t.x)),
      (this._y = Math.min(this._y, t.y)),
      (this._z = Math.min(this._z, t.z)),
      this
    );
  }
  equals(t) {
    return this._x === t.x && this._y === t.y && this._z === t.z;
  }
  normalize() {
    let t = this._x * this._x + this._y * this._y + this._z * this._z;
    return (
      t > 0 && (t = 1 / Math.sqrt(t)),
      (this._x *= t),
      (this._y *= t),
      (this._z *= t),
      this
    );
  }
  dot(t) {
    return this._x * t.x + this._y * t.y + this._z * t.z;
  }
  applyMat4(t) {
    const e = this._x,
      r = this._y,
      i = this._z,
      n = t.elements;
    let s = n[3] * e + n[7] * r + n[11] * i + n[15];
    return (
      (s = s || 1),
      (this._x = (n[0] * e + n[4] * r + n[8] * i + n[12]) / s),
      (this._y = (n[1] * e + n[5] * r + n[9] * i + n[13]) / s),
      (this._z = (n[2] * e + n[6] * r + n[10] * i + n[14]) / s),
      this
    );
  }
  applyQuat(t) {
    const e = this._x,
      r = this._y,
      i = this._z,
      n = t.elements[0],
      s = t.elements[1],
      o = t.elements[2],
      l = t.elements[3],
      h = l * e + s * i - o * r,
      c = l * r + o * e - n * i,
      u = l * i + n * r - s * e,
      d = -n * e - s * r - o * i;
    return (
      (this._x = h * l + d * -n + c * -o - u * -s),
      (this._y = c * l + d * -s + u * -n - h * -o),
      (this._z = u * l + d * -o + h * -s - c * -n),
      this
    );
  }
  project(t) {
    return this.applyMat4(t.viewMatrix).applyMat4(t.projectionMatrix), this;
  }
  unproject(t) {
    return (
      this.applyMat4(t.projectionMatrix.getInverse()).applyMat4(t.worldMatrix),
      this
    );
  }
}
const Rs = new mt(),
  $c = new q(),
  Vc = new At();
class we {
  constructor(
    t,
    {
      isFBOTexture: e = !1,
      fromTexture: r = !1,
      loader: i,
      sampler: n,
      floatingPoint: s = "none",
      premultiplyAlpha: o = !1,
      anisotropy: l = 1,
      generateMipmap: h = null,
      wrapS: c,
      wrapT: u,
      minFilter: d,
      magFilter: f,
    } = {}
  ) {
    if (
      ((this.type = "Texture"),
      (t = (t && t.renderer) || t),
      !t || t.type !== "Renderer")
    )
      lt(this.type + ": Renderer not passed as first argument", t);
    else if (!t.gl) {
      t.production ||
        lt(
          this.type +
            ": Unable to create a " +
            this.type +
            " because the Renderer WebGL context is not defined"
        );
      return;
    }
    if (
      ((this.renderer = t),
      (this.gl = this.renderer.gl),
      (this.uuid = en()),
      (this._globalParameters = {
        unpackAlignment: 4,
        flipY: !e,
        premultiplyAlpha: !1,
        shouldPremultiplyAlpha: o,
        floatingPoint: s,
        type: this.gl.UNSIGNED_BYTE,
        internalFormat: this.gl.RGBA,
        format: this.gl.RGBA,
      }),
      (this.parameters = {
        anisotropy: l,
        generateMipmap: h,
        wrapS: c || this.gl.CLAMP_TO_EDGE,
        wrapT: u || this.gl.CLAMP_TO_EDGE,
        minFilter: d || this.gl.LINEAR,
        magFilter: f || this.gl.LINEAR,
        _shouldUpdate: !0,
      }),
      this._initState(),
      (this.sourceType = e ? "fbo" : "empty"),
      (this._useCache = !0),
      (this._samplerName = n),
      (this._sampler = {
        isActive: !1,
        isTextureBound: !1,
        texture: this.gl.createTexture(),
      }),
      (this._textureMatrix = { matrix: new At(), isActive: !1 }),
      (this._size = { width: 1, height: 1 }),
      (this.scale = new mt(1)),
      this.scale.onChange(() => this.resize()),
      (this.offset = new mt()),
      this.offset.onChange(() => this.resize()),
      (this._loader = i),
      (this._sourceLoaded = !1),
      (this._uploaded = !1),
      (this._willUpdate = !1),
      (this.shouldUpdate = !1),
      (this._forceUpdate = !1),
      (this.userData = {}),
      (this._canDraw = !1),
      r)
    ) {
      (this._copyOnInit = !0), (this._copiedFrom = r);
      return;
    }
    (this._copyOnInit = !1), this._initTexture();
  }
  _initState() {
    this._state = {
      anisotropy: 1,
      generateMipmap: !1,
      wrapS: null,
      wrapT: null,
      minFilter: null,
      magFilter: this.gl.LINEAR,
    };
  }
  _initTexture() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this._sampler.texture),
      this.sourceType === "empty" &&
        ((this._globalParameters.flipY = !1),
        this._updateGlobalTexParameters(),
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          0,
          this.gl.RGBA,
          1,
          1,
          0,
          this.gl.RGBA,
          this.gl.UNSIGNED_BYTE,
          new Uint8Array([0, 0, 0, 255])
        ),
        (this._canDraw = !0));
  }
  _restoreFromTexture() {
    this._copyOnInit || this._initTexture(),
      this._parent && (this._setTextureUniforms(), this._setSize()),
      this.copy(this._copiedFrom),
      (this._canDraw = !0);
  }
  _restoreContext() {
    if (
      ((this._canDraw = !1),
      (this._sampler.texture = this.gl.createTexture()),
      (this._sampler.isActive = !1),
      (this._sampler.isTextureBound = !1),
      (this._textureMatrix.isActive = !1),
      this._initState(),
      (this._state.generateMipmap = !1),
      (this.parameters._shouldUpdate = !0),
      !this._copiedFrom)
    )
      this._initTexture(),
        this._parent && this._setParent(),
        this.source &&
          (this.setSource(this.source),
          this.sourceType === "image"
            ? this.renderer.cache.addTexture(this)
            : this.needUpdate()),
        (this._canDraw = !0);
    else {
      const t = this.renderer.nextRender.add(() => {
        this._copiedFrom._canDraw &&
          (this._restoreFromTexture(), (t.keep = !1));
      }, !0);
    }
  }
  addParent(t) {
    if (
      !t ||
      (t.type !== "Plane" &&
        t.type !== "PingPongPlane" &&
        t.type !== "ShaderPass" &&
        t.type !== "RenderTarget")
    ) {
      this.renderer.production ||
        F(
          this.type + ": cannot add texture as a child of ",
          t,
          " because it is not a valid parent"
        );
      return;
    }
    (this._parent = t),
      (this.index = this._parent.textures.length),
      this._parent.textures.push(this),
      this._setParent();
  }
  _setParent() {
    if (
      ((this._sampler.name = this._samplerName || "uSampler" + this.index),
      (this._textureMatrix.name = this._samplerName
        ? this._samplerName + "Matrix"
        : "uTextureMatrix" + this.index),
      this._parent._program)
    ) {
      if (!this._parent._program.compiled) {
        this.renderer.production ||
          F(
            this.type +
              ": Unable to create the texture because the program is not valid"
          );
        return;
      }
      if ((this._setTextureUniforms(), this._copyOnInit)) {
        const t = this.renderer.nextRender.add(() => {
          this._copiedFrom._canDraw &&
            this._copiedFrom._uploaded &&
            (this.copy(this._copiedFrom), (t.keep = !1));
        }, !0);
        return;
      }
      this.source
        ? this._parent.loader &&
          this._parent.loader._addSourceToParent(this.source, this.sourceType)
        : (this._size = {
            width: this._parent._boundingRect.document.width,
            height: this._parent._boundingRect.document.height,
          }),
        this._setSize();
    } else
      this._parent.type === "RenderTarget" &&
        ((this._size = {
          width:
            (this._parent._size && this._parent._size.width) ||
            this.renderer._boundingRect.width,
          height:
            (this._parent._size && this._parent._size.height) ||
            this.renderer._boundingRect.height,
        }),
        this._upload(),
        this._updateTexParameters(),
        (this._canDraw = !0));
  }
  hasParent() {
    return !!this._parent;
  }
  _setTextureUniforms() {
    const t = this._parent._program.activeUniforms;
    for (let e = 0; e < t.textures.length; e++)
      t.textures[e] === this._sampler.name &&
        ((this._sampler.isActive = !0),
        this.renderer.useProgram(this._parent._program),
        (this._sampler.location = this.gl.getUniformLocation(
          this._parent._program.program,
          this._sampler.name
        )),
        t.textureMatrices.find((i) => i === this._textureMatrix.name) &&
          ((this._textureMatrix.isActive = !0),
          (this._textureMatrix.location = this.gl.getUniformLocation(
            this._parent._program.program,
            this._textureMatrix.name
          ))),
        this.gl.uniform1i(this._sampler.location, this.index));
  }
  copy(t) {
    if (!t || t.type !== "Texture") {
      this.renderer.production ||
        F(this.type + ": Unable to set the texture from texture:", t);
      return;
    }
    (this._globalParameters = Object.assign({}, t._globalParameters)),
      (this._state = Object.assign({}, t._state)),
      (this.parameters.generateMipmap = t.parameters.generateMipmap),
      (this._state.generateMipmap = null),
      (this._size = t._size),
      !this._sourceLoaded &&
        t._sourceLoaded &&
        this._onSourceLoadedCallback &&
        this._onSourceLoadedCallback(),
      (this._sourceLoaded = t._sourceLoaded),
      !this._uploaded &&
        t._uploaded &&
        this._onSourceUploadedCallback &&
        this._onSourceUploadedCallback(),
      (this._uploaded = t._uploaded),
      (this.sourceType = t.sourceType),
      (this.source = t.source),
      (this._videoFrameCallbackID = t._videoFrameCallbackID),
      (this._sampler.texture = t._sampler.texture),
      (this._copiedFrom = t),
      this._parent &&
        this._parent._program &&
        (!this._canDraw || !this._textureMatrix.matrix) &&
        (this._setSize(), (this._canDraw = !0)),
      this._updateTexParameters(),
      this.renderer.needRender();
  }
  setSource(t) {
    this._sourceLoaded ||
      this.renderer.nextRender.add(
        () => this._onSourceLoadedCallback && this._onSourceLoadedCallback()
      );
    const e =
      t.tagName.toUpperCase() === "IMG" ? "image" : t.tagName.toLowerCase();
    if (
      ((e === "video" || e === "canvas") && (this._useCache = !1),
      this._useCache)
    ) {
      const r = this.renderer.cache.getTextureFromSource(t);
      if (r && r.uuid !== this.uuid) {
        this._uploaded ||
          (this.renderer.nextRender.add(
            () =>
              this._onSourceUploadedCallback && this._onSourceUploadedCallback()
          ),
          (this._uploaded = !0)),
          this.copy(r),
          this.resize();
        return;
      }
    }
    if (this.sourceType === "empty" || this.sourceType !== e)
      if (e === "video") (this._willUpdate = !1), (this.shouldUpdate = !0);
      else if (e === "canvas")
        (this._willUpdate = !0), (this.shouldUpdate = !0);
      else if (e === "image") (this._willUpdate = !1), (this.shouldUpdate = !1);
      else {
        this.renderer.production ||
          F(
            this.type +
              ": this HTML tag could not be converted into a texture:",
            t.tagName
          );
        return;
      }
    (this.source = t),
      (this.sourceType = e),
      (this._size = {
        width:
          this.source.naturalWidth ||
          this.source.width ||
          this.source.videoWidth,
        height:
          this.source.naturalHeight ||
          this.source.height ||
          this.source.videoHeight,
      }),
      (this._sourceLoaded = !0),
      this.gl.bindTexture(this.gl.TEXTURE_2D, this._sampler.texture),
      this.resize(),
      (this._globalParameters.flipY = !0),
      (this._globalParameters.premultiplyAlpha =
        this._globalParameters.shouldPremultiplyAlpha),
      this.sourceType === "image" &&
        ((this.parameters.generateMipmap =
          this.parameters.generateMipmap ||
          this.parameters.generateMipmap === null),
        (this.parameters._shouldUpdate = this.parameters.generateMipmap),
        (this._state.generateMipmap = !1),
        this._upload()),
      this.renderer.needRender();
  }
  _updateGlobalTexParameters() {
    this.renderer.state.unpackAlignment !==
      this._globalParameters.unpackAlignment &&
      (this.gl.pixelStorei(
        this.gl.UNPACK_ALIGNMENT,
        this._globalParameters.unpackAlignment
      ),
      (this.renderer.state.unpackAlignment =
        this._globalParameters.unpackAlignment)),
      this.renderer.state.flipY !== this._globalParameters.flipY &&
        (this.gl.pixelStorei(
          this.gl.UNPACK_FLIP_Y_WEBGL,
          this._globalParameters.flipY
        ),
        (this.renderer.state.flipY = this._globalParameters.flipY)),
      this.renderer.state.premultiplyAlpha !==
        this._globalParameters.premultiplyAlpha &&
        (this.gl.pixelStorei(
          this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
          this._globalParameters.premultiplyAlpha
        ),
        (this.renderer.state.premultiplyAlpha =
          this._globalParameters.premultiplyAlpha)),
      this._globalParameters.floatingPoint === "half-float"
        ? this.renderer._isWebGL2 &&
          this.renderer.extensions.EXT_color_buffer_float
          ? ((this._globalParameters.internalFormat = this.gl.RGBA16F),
            (this._globalParameters.type = this.gl.HALF_FLOAT))
          : this.renderer.extensions.OES_texture_half_float
          ? (this._globalParameters.type =
              this.renderer.extensions.OES_texture_half_float.HALF_FLOAT_OES)
          : this.renderer.production ||
            F(
              this.type +
                ": could not use half-float textures because the extension is not available"
            )
        : this._globalParameters.floatingPoint === "float" &&
          (this.renderer._isWebGL2 &&
          this.renderer.extensions.EXT_color_buffer_float
            ? ((this._globalParameters.internalFormat = this.gl.RGBA16F),
              (this._globalParameters.type = this.gl.FLOAT))
            : this.renderer.extensions.OES_texture_float
            ? (this._globalParameters.type =
                this.renderer.extensions.OES_texture_half_float.FLOAT)
            : this.renderer.production ||
              F(
                this.type +
                  ": could not use float textures because the extension is not available"
              ));
  }
  _updateTexParameters() {
    this.index &&
      this.renderer.state.activeTexture !== this.index &&
      this._bindTexture(),
      this.parameters.wrapS !== this._state.wrapS &&
        (!this.renderer._isWebGL2 &&
          (!Tt(this._size.width) || !Tt(this._size.height)) &&
          (this.parameters.wrapS = this.gl.CLAMP_TO_EDGE),
        this.parameters.wrapS !== this.gl.REPEAT &&
          this.parameters.wrapS !== this.gl.CLAMP_TO_EDGE &&
          this.parameters.wrapS !== this.gl.MIRRORED_REPEAT &&
          (this.renderer.production ||
            F(
              this.type + ": Wrong wrapS value",
              this.parameters.wrapS,
              "for this texture:",
              this,
              `
gl.CLAMP_TO_EDGE wrapping will be used instead`
            ),
          (this.parameters.wrapS = this.gl.CLAMP_TO_EDGE)),
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_S,
          this.parameters.wrapS
        ),
        (this._state.wrapS = this.parameters.wrapS)),
      this.parameters.wrapT !== this._state.wrapT &&
        (!this.renderer._isWebGL2 &&
          (!Tt(this._size.width) || !Tt(this._size.height)) &&
          (this.parameters.wrapT = this.gl.CLAMP_TO_EDGE),
        this.parameters.wrapT !== this.gl.REPEAT &&
          this.parameters.wrapT !== this.gl.CLAMP_TO_EDGE &&
          this.parameters.wrapT !== this.gl.MIRRORED_REPEAT &&
          (this.renderer.production ||
            F(
              this.type + ": Wrong wrapT value",
              this.parameters.wrapT,
              "for this texture:",
              this,
              `
gl.CLAMP_TO_EDGE wrapping will be used instead`
            ),
          (this.parameters.wrapT = this.gl.CLAMP_TO_EDGE)),
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_T,
          this.parameters.wrapT
        ),
        (this._state.wrapT = this.parameters.wrapT)),
      this.parameters.generateMipmap &&
        !this._state.generateMipmap &&
        this.source &&
        (!this.renderer._isWebGL2 &&
        (!Tt(this._size.width) || !Tt(this._size.height))
          ? (this.parameters.generateMipmap = !1)
          : this.gl.generateMipmap(this.gl.TEXTURE_2D),
        (this._state.generateMipmap = this.parameters.generateMipmap)),
      this.parameters.minFilter !== this._state.minFilter &&
        (!this.renderer._isWebGL2 &&
          (!Tt(this._size.width) || !Tt(this._size.height)) &&
          (this.parameters.minFilter = this.gl.LINEAR),
        !this.parameters.generateMipmap &&
          this.parameters.generateMipmap !== null &&
          (this.parameters.minFilter = this.gl.LINEAR),
        this.parameters.minFilter !== this.gl.LINEAR &&
          this.parameters.minFilter !== this.gl.NEAREST &&
          this.parameters.minFilter !== this.gl.NEAREST_MIPMAP_NEAREST &&
          this.parameters.minFilter !== this.gl.LINEAR_MIPMAP_NEAREST &&
          this.parameters.minFilter !== this.gl.NEAREST_MIPMAP_LINEAR &&
          this.parameters.minFilter !== this.gl.LINEAR_MIPMAP_LINEAR &&
          (this.renderer.production ||
            F(
              this.type + ": Wrong minFilter value",
              this.parameters.minFilter,
              "for this texture:",
              this,
              `
gl.LINEAR filtering will be used instead`
            ),
          (this.parameters.minFilter = this.gl.LINEAR)),
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MIN_FILTER,
          this.parameters.minFilter
        ),
        (this._state.minFilter = this.parameters.minFilter)),
      this.parameters.magFilter !== this._state.magFilter &&
        (!this.renderer._isWebGL2 &&
          (!Tt(this._size.width) || !Tt(this._size.height)) &&
          (this.parameters.magFilter = this.gl.LINEAR),
        this.parameters.magFilter !== this.gl.LINEAR &&
          this.parameters.magFilter !== this.gl.NEAREST &&
          (this.renderer.production ||
            F(
              this.type + ": Wrong magFilter value",
              this.parameters.magFilter,
              "for this texture:",
              this,
              `
gl.LINEAR filtering will be used instead`
            ),
          (this.parameters.magFilter = this.gl.LINEAR)),
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MAG_FILTER,
          this.parameters.magFilter
        ),
        (this._state.magFilter = this.parameters.magFilter));
    const t = this.renderer.extensions.EXT_texture_filter_anisotropic;
    if (t && this.parameters.anisotropy !== this._state.anisotropy) {
      const e = this.gl.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      (this.parameters.anisotropy = Math.max(
        1,
        Math.min(this.parameters.anisotropy, e)
      )),
        this.gl.texParameterf(
          this.gl.TEXTURE_2D,
          t.TEXTURE_MAX_ANISOTROPY_EXT,
          this.parameters.anisotropy
        ),
        (this._state.anisotropy = this.parameters.anisotropy);
    }
  }
  setWrapS(t) {
    this.parameters.wrapS !== t &&
      ((this.parameters.wrapS = t), (this.parameters._shouldUpdate = !0));
  }
  setWrapT(t) {
    this.parameters.wrapT !== t &&
      ((this.parameters.wrapT = t), (this.parameters._shouldUpdate = !0));
  }
  setMinFilter(t) {
    this.parameters.minFilter !== t &&
      ((this.parameters.minFilter = t), (this.parameters._shouldUpdate = !0));
  }
  setMagFilter(t) {
    this.parameters.magFilter !== t &&
      ((this.parameters.magFilter = t), (this.parameters._shouldUpdate = !0));
  }
  setAnisotropy(t) {
    (t = isNaN(t) ? this.parameters.anisotropy : t),
      this.parameters.anisotropy !== t &&
        ((this.parameters.anisotropy = t),
        (this.parameters._shouldUpdate = !0));
  }
  needUpdate() {
    this._forceUpdate = !0;
  }
  _videoFrameCallback() {
    (this._willUpdate = !0),
      this.source.requestVideoFrameCallback(() => this._videoFrameCallback());
  }
  _upload() {
    this._updateGlobalTexParameters(),
      this.source
        ? this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this._globalParameters.internalFormat,
            this._globalParameters.format,
            this._globalParameters.type,
            this.source
          )
        : this.sourceType === "fbo" &&
          this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this._globalParameters.internalFormat,
            this._size.width,
            this._size.height,
            0,
            this._globalParameters.format,
            this._globalParameters.type,
            this.source || null
          ),
      this._uploaded ||
        (this.renderer.nextRender.add(
          () =>
            this._onSourceUploadedCallback && this._onSourceUploadedCallback()
        ),
        (this._uploaded = !0));
  }
  _getSizes() {
    if (this.sourceType === "fbo")
      return {
        parentWidth: this._parent._boundingRect.document.width,
        parentHeight: this._parent._boundingRect.document.height,
        sourceWidth: this._parent._boundingRect.document.width,
        sourceHeight: this._parent._boundingRect.document.height,
        xOffset: 0,
        yOffset: 0,
      };
    const t = this._parent.scale
        ? Rs.set(this._parent.scale.x, this._parent.scale.y)
        : Rs.set(1, 1),
      e = this._parent._boundingRect.document.width * t.x,
      r = this._parent._boundingRect.document.height * t.y,
      i = this._size.width,
      n = this._size.height,
      s = i / n,
      o = e / r;
    let l = 0,
      h = 0;
    return (
      o > s
        ? (h = Math.min(0, r - e * (1 / s)))
        : o < s && (l = Math.min(0, e - r * s)),
      {
        parentWidth: e,
        parentHeight: r,
        sourceWidth: i,
        sourceHeight: n,
        xOffset: l,
        yOffset: h,
      }
    );
  }
  setScale(t) {
    if (!t.type || t.type !== "Vec2") {
      this.renderer.production ||
        F(
          this.type +
            ": Cannot set scale because the parameter passed is not of Vec2 type:",
          t
        );
      return;
    }
    t.sanitizeNaNValuesWith(this.scale).max(Rs.set(0.001, 0.001)),
      t.equals(this.scale) || (this.scale.copy(t), this.resize());
  }
  setOffset(t) {
    if (!t.type || t.type !== "Vec2") {
      this.renderer.production ||
        F(
          this.type +
            ": Cannot set offset because the parameter passed is not of Vec2 type:",
          scale
        );
      return;
    }
    t.sanitizeNaNValuesWith(this.offset),
      t.equals(this.offset) || (this.offset.copy(t), this.resize());
  }
  _setSize() {
    if (this._parent && this._parent._program) {
      const t = this._getSizes();
      this._updateTextureMatrix(t);
    }
  }
  resize() {
    this.sourceType === "fbo"
      ? ((this._size = {
          width:
            (this._parent._size && this._parent._size.width) ||
            this._parent._boundingRect.document.width,
          height:
            (this._parent._size && this._parent._size.height) ||
            this._parent._boundingRect.document.height,
        }),
        this._copiedFrom ||
          (this.gl.bindTexture(this.gl.TEXTURE_2D, this._sampler.texture),
          this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this._globalParameters.internalFormat,
            this._size.width,
            this._size.height,
            0,
            this._globalParameters.format,
            this._globalParameters.type,
            null
          )))
      : this.source &&
        (this._size = {
          width:
            this.source.naturalWidth ||
            this.source.width ||
            this.source.videoWidth,
          height:
            this.source.naturalHeight ||
            this.source.height ||
            this.source.videoHeight,
        }),
      this._setSize();
  }
  _updateTextureMatrix(t) {
    const e = $c.set(
      t.parentWidth / (t.parentWidth - t.xOffset),
      t.parentHeight / (t.parentHeight - t.yOffset),
      1
    );
    (e.x /= this.scale.x),
      (e.y /= this.scale.y),
      (this._textureMatrix.matrix = Vc.setFromArray([
        e.x,
        0,
        0,
        0,
        0,
        e.y,
        0,
        0,
        0,
        0,
        1,
        0,
        (1 - e.x) / 2 + this.offset.x,
        (1 - e.y) / 2 + this.offset.y,
        0,
        1,
      ])),
      this._updateMatrixUniform();
  }
  _updateMatrixUniform() {
    this._textureMatrix.isActive &&
      (this.renderer.useProgram(this._parent._program),
      this.gl.uniformMatrix4fv(
        this._textureMatrix.location,
        !1,
        this._textureMatrix.matrix.elements
      ));
  }
  _onSourceLoaded(t) {
    this.setSource(t),
      this.sourceType === "image" && this.renderer.cache.addTexture(this);
  }
  _bindTexture() {
    this._canDraw &&
      (this.renderer.state.activeTexture !== this.index &&
        (this.gl.activeTexture(this.gl.TEXTURE0 + this.index),
        (this.renderer.state.activeTexture = this.index)),
      this.gl.bindTexture(this.gl.TEXTURE_2D, this._sampler.texture),
      this._sampler.isTextureBound ||
        ((this._sampler.isTextureBound = !!this.gl.getParameter(
          this.gl.TEXTURE_BINDING_2D
        )),
        this._sampler.isTextureBound && this.renderer.needRender()));
  }
  _draw() {
    this._sampler.isActive &&
      (this._bindTexture(),
      this.sourceType === "video" &&
        this.source &&
        !this._videoFrameCallbackID &&
        this.source.readyState >= this.source.HAVE_CURRENT_DATA &&
        !this.source.paused &&
        (this._willUpdate = !0),
      (this._forceUpdate || (this._willUpdate && this.shouldUpdate)) &&
        ((this._state.generateMipmap = !1), this._upload()),
      this.sourceType === "video" && (this._willUpdate = !1),
      (this._forceUpdate = !1)),
      this.parameters._shouldUpdate &&
        (this._updateTexParameters(), (this.parameters._shouldUpdate = !1));
  }
  onSourceLoaded(t) {
    return t && (this._onSourceLoadedCallback = t), this;
  }
  onSourceUploaded(t) {
    return t && (this._onSourceUploadedCallback = t), this;
  }
  _dispose(t = !1) {
    this.sourceType === "video" ||
    (this.sourceType === "image" && !this.renderer.state.isActive)
      ? (this._loader && this._loader._removeSource(this), (this.source = null))
      : this.sourceType === "canvas" &&
        ((this.source.width = this.source.width), (this.source = null)),
      (this._parent = null),
      this.gl &&
        !this._copiedFrom &&
        (t || this.sourceType !== "image" || !this.renderer.state.isActive) &&
        ((this._canDraw = !1),
        this.renderer.cache.removeTexture(this),
        this.gl.activeTexture(this.gl.TEXTURE0 + this.index),
        this.gl.bindTexture(this.gl.TEXTURE_2D, null),
        this.gl.deleteTexture(this._sampler.texture));
  }
}
class jc {
  constructor(t, e = "anonymous") {
    if (
      ((this.type = "TextureLoader"),
      (t = (t && t.renderer) || t),
      !t || t.type !== "Renderer")
    )
      lt(this.type + ": Renderer not passed as first argument", t);
    else if (!t.gl) {
      lt(this.type + ": Renderer WebGL context is undefined", t);
      return;
    }
    (this.renderer = t),
      (this.gl = this.renderer.gl),
      (this.crossOrigin = e),
      (this.elements = []);
  }
  _addElement(t, e, r, i) {
    const n = {
      source: t,
      texture: e,
      load: this._sourceLoaded.bind(this, t, e, r),
      error: this._sourceLoadError.bind(this, t, i),
    };
    return this.elements.push(n), n;
  }
  _sourceLoadError(t, e, r) {
    e && e(t, r);
  }
  _sourceLoaded(t, e, r) {
    e._sourceLoaded ||
      (e._onSourceLoaded(t),
      this._parent &&
        (this._increment && this._increment(),
        this.renderer.nextRender.add(
          () =>
            this._parent._onLoadingCallback &&
            this._parent._onLoadingCallback(e)
        )),
      r && r(e));
  }
  _getSourceType(t) {
    let e;
    return (
      typeof t == "string"
        ? t.match(
            /\.(jpeg|jpg|jfif|pjpeg|pjp|gif|bmp|png|webp|svg|avif|apng)$/
          ) !== null
          ? (e = "image")
          : t.match(/\.(webm|mp4|mpg|mpeg|avi|ogg|ogm|ogv|mov|av1)$/) !==
              null && (e = "video")
        : t.tagName.toUpperCase() === "IMG"
        ? (e = "image")
        : t.tagName.toUpperCase() === "VIDEO"
        ? (e = "video")
        : t.tagName.toUpperCase() === "CANVAS" && (e = "canvas"),
      e
    );
  }
  _createImage(t) {
    if (typeof t == "string" || !t.hasAttribute("crossOrigin")) {
      const e = new Image();
      return (
        (e.crossOrigin = this.crossOrigin),
        typeof t == "string"
          ? (e.src = t)
          : ((e.src = t.src),
            t.hasAttribute("data-sampler") &&
              e.setAttribute("data-sampler", t.getAttribute("data-sampler"))),
        e
      );
    } else return t;
  }
  _createVideo(t) {
    if (typeof t == "string" || t.getAttribute("crossOrigin") === null) {
      const e = document.createElement("video");
      return (
        (e.crossOrigin = this.crossOrigin),
        typeof t == "string"
          ? (e.src = t)
          : ((e.src = t.src),
            t.hasAttribute("data-sampler") &&
              e.setAttribute("data-sampler", t.getAttribute("data-sampler"))),
        e
      );
    } else return t;
  }
  loadSource(t, e, r, i) {
    switch (this._getSourceType(t)) {
      case "image":
        this.loadImage(t, e, r, i);
        break;
      case "video":
        this.loadVideo(t, e, r, i);
        break;
      case "canvas":
        this.loadCanvas(t, e, r);
        break;
      default:
        this._sourceLoadError(
          t,
          i,
          "this source could not be converted into a texture: " + t
        );
        break;
    }
  }
  loadSources(t, e, r, i) {
    for (let n = 0; n < t.length; n++) this.loadSource(t[n], e, r, i);
  }
  loadImage(t, e = {}, r, i) {
    const n = this.renderer.cache.getTextureFromSource(t);
    let s = Object.assign({}, e);
    if (
      (this._parent && (s = Object.assign(s, this._parent._texturesOptions)),
      (s.loader = this),
      n)
    ) {
      (s.sampler =
        typeof t != "string" && t.hasAttribute("data-sampler")
          ? t.getAttribute("data-sampler")
          : s.sampler),
        (s.fromTexture = n);
      const c = new we(this.renderer, s);
      this._sourceLoaded(n.source, c, r),
        this._parent && this._addToParent(c, n.source, "image");
      return;
    }
    const o = this._createImage(t);
    s.sampler = o.hasAttribute("data-sampler")
      ? o.getAttribute("data-sampler")
      : s.sampler;
    const l = new we(this.renderer, s),
      h = this._addElement(o, l, r, i);
    o.complete
      ? this._sourceLoaded(o, l, r)
      : o.decode
      ? o
          .decode()
          .then(this._sourceLoaded.bind(this, o, l, r))
          .catch(() => {
            o.addEventListener("load", h.load, !1),
              o.addEventListener("error", h.error, !1);
          })
      : (o.addEventListener("load", h.load, !1),
        o.addEventListener("error", h.error, !1)),
      this._parent && this._addToParent(l, o, "image");
  }
  loadImages(t, e, r, i) {
    for (let n = 0; n < t.length; n++) this.loadImage(t[n], e, r, i);
  }
  loadVideo(t, e = {}, r, i) {
    const n = this._createVideo(t);
    (n.preload = !0),
      (n.muted = !0),
      (n.loop = !0),
      n.setAttribute("playsinline", ""),
      (n.crossOrigin = this.crossOrigin);
    let s = Object.assign({}, e);
    this._parent && (s = Object.assign(e, this._parent._texturesOptions)),
      (s.loader = this),
      (s.sampler = n.hasAttribute("data-sampler")
        ? n.getAttribute("data-sampler")
        : s.sampler);
    const o = new we(this.renderer, s),
      l = this._addElement(n, o, r, i);
    n.addEventListener("canplaythrough", l.load, !1),
      n.addEventListener("error", l.error, !1),
      n.readyState >= n.HAVE_FUTURE_DATA && r && this._sourceLoaded(n, o, r),
      n.load(),
      this._addToParent && this._addToParent(o, n, "video"),
      "requestVideoFrameCallback" in HTMLVideoElement.prototype &&
        ((l.videoFrameCallback = o._videoFrameCallback.bind(o)),
        (o._videoFrameCallbackID = n.requestVideoFrameCallback(
          l.videoFrameCallback
        )));
  }
  loadVideos(t, e, r, i) {
    for (let n = 0; n < t.length; n++) this.loadVideo(t[n], e, r, i);
  }
  loadCanvas(t, e = {}, r) {
    let i = Object.assign({}, e);
    this._parent && (i = Object.assign(e, this._parent._texturesOptions)),
      (i.loader = this),
      (i.sampler = t.hasAttribute("data-sampler")
        ? t.getAttribute("data-sampler")
        : i.sampler);
    const n = new we(this.renderer, i);
    this._addElement(t, n, r, null),
      this._sourceLoaded(t, n, r),
      this._parent && this._addToParent(n, t, "canvas");
  }
  loadCanvases(t, e, r) {
    for (let i = 0; i < t.length; i++) this.loadCanvas(t[i], e, r);
  }
  _removeSource(t) {
    const e = this.elements.find((r) => r.texture.uuid === t.uuid);
    e &&
      (t.sourceType === "image"
        ? e.source.removeEventListener("load", e.load, !1)
        : t.sourceType === "video" &&
          (e.videoFrameCallback &&
            t._videoFrameCallbackID &&
            e.source.cancelVideoFrameCallback(t._videoFrameCallbackID),
          e.source.removeEventListener("canplaythrough", e.load, !1),
          e.source.pause(),
          e.source.removeAttribute("src"),
          e.source.load()),
      e.source.removeEventListener("error", e.error, !1));
  }
}
class Uc extends jc {
  constructor(
    t,
    e,
    {
      sourcesLoaded: r = 0,
      sourcesToLoad: i = 0,
      complete: n = !1,
      onComplete: s = () => {},
    } = {}
  ) {
    super(t, e.crossOrigin),
      (this.type = "PlaneTextureLoader"),
      (this._parent = e),
      this._parent.type !== "Plane" &&
        this._parent.type !== "PingPongPlane" &&
        this._parent.type !== "ShaderPass" &&
        (F(this.type + ": Wrong parent type assigned to this loader"),
        (this._parent = null)),
      (this.sourcesLoaded = r),
      (this.sourcesToLoad = i),
      (this.complete = n),
      (this.onComplete = s);
  }
  _setLoaderSize(t) {
    (this.sourcesToLoad = t),
      this.sourcesToLoad === 0 &&
        ((this.complete = !0),
        this.renderer.nextRender.add(
          () => this.onComplete && this.onComplete()
        ));
  }
  _increment() {
    this.sourcesLoaded++,
      this.sourcesLoaded >= this.sourcesToLoad &&
        !this.complete &&
        ((this.complete = !0),
        this.renderer.nextRender.add(
          () => this.onComplete && this.onComplete()
        ));
  }
  _addSourceToParent(t, e) {
    if (e === "image") {
      const r = this._parent.images;
      !r.find((n) => n.src === t.src) && r.push(t);
    } else if (e === "video") {
      const r = this._parent.videos;
      !r.find((n) => n.src === t.src) && r.push(t);
    } else if (e === "canvas") {
      const r = this._parent.canvases;
      !r.find((n) => n.isSameNode(t)) && r.push(t);
    }
  }
  _addToParent(t, e, r) {
    this._addSourceToParent(e, r), this._parent && t.addParent(this._parent);
  }
}
class zc {
  constructor(
    t,
    e = "Mesh",
    {
      vertexShaderID: r,
      fragmentShaderID: i,
      vertexShader: n,
      fragmentShader: s,
      uniforms: o = {},
      widthSegments: l = 1,
      heightSegments: h = 1,
      renderOrder: c = 0,
      depthTest: u = !0,
      cullFace: d = "back",
      texturesOptions: f = {},
      crossOrigin: p = "anonymous",
    } = {}
  ) {
    if (
      ((this.type = e),
      (t = (t && t.renderer) || t),
      (!t || t.type !== "Renderer") &&
        (lt(
          this.type +
            ": Curtains not passed as first argument or Curtains Renderer is missing",
          t
        ),
        setTimeout(() => {
          this._onErrorCallback && this._onErrorCallback();
        }, 0)),
      (this.renderer = t),
      (this.gl = this.renderer.gl),
      !this.gl)
    ) {
      this.renderer.production ||
        lt(
          this.type +
            ": Unable to create a " +
            this.type +
            " because the Renderer WebGL context is not defined"
        ),
        setTimeout(() => {
          this._onErrorCallback && this._onErrorCallback();
        }, 0);
      return;
    }
    (this._canDraw = !1),
      (this.renderOrder = c),
      (this._depthTest = u),
      (this.cullFace = d),
      this.cullFace !== "back" &&
        this.cullFace !== "front" &&
        this.cullFace !== "none" &&
        (this.cullFace = "back"),
      (this.textures = []),
      (this._texturesOptions = Object.assign(
        {
          premultiplyAlpha: !1,
          anisotropy: 1,
          floatingPoint: "none",
          wrapS: this.gl.CLAMP_TO_EDGE,
          wrapT: this.gl.CLAMP_TO_EDGE,
          minFilter: this.gl.LINEAR,
          magFilter: this.gl.LINEAR,
        },
        f
      )),
      (this.crossOrigin = p),
      !n &&
        r &&
        document.getElementById(r) &&
        (n = document.getElementById(r).innerHTML),
      !s &&
        i &&
        document.getElementById(i) &&
        (s = document.getElementById(i).innerHTML),
      this._initMesh(),
      (l = parseInt(l)),
      (h = parseInt(h)),
      (this._geometry = new Fc(this.renderer, { width: l, height: h })),
      (this._program = new Yi(this.renderer, {
        parent: this,
        vertexShader: n,
        fragmentShader: s,
      })),
      this._program.compiled
        ? (this._program.createUniforms(o),
          (this.uniforms = this._program.uniformsManager.uniforms),
          this._geometry.setProgram(this._program),
          this.renderer.onSceneChange())
        : this.renderer.nextRender.add(
            () => this._onErrorCallback && this._onErrorCallback()
          );
  }
  _initMesh() {
    (this.uuid = en()),
      (this.loader = new Uc(this.renderer, this, {
        sourcesLoaded: 0,
        initSourcesToLoad: 0,
        complete: !1,
        onComplete: () => {
          this._onReadyCallback && this._onReadyCallback(),
            this.renderer.needRender();
        },
      })),
      (this.images = []),
      (this.videos = []),
      (this.canvases = []),
      (this.userData = {}),
      (this._canDraw = !0);
  }
  _restoreContext() {
    (this._canDraw = !1),
      this._matrices && (this._matrices = null),
      (this._program = new Yi(this.renderer, {
        parent: this,
        vertexShader: this._program.vsCode,
        fragmentShader: this._program.fsCode,
      })),
      this._program.compiled &&
        (this._geometry.restoreContext(this._program),
        this._program.createUniforms(this.uniforms),
        (this.uniforms = this._program.uniformsManager.uniforms),
        this._programRestored());
  }
  setRenderTarget(t) {
    if (!t || t.type !== "RenderTarget") {
      this.renderer.production ||
        F(
          this.type +
            ": Could not set the render target because the argument passed is not a RenderTarget class object",
          t
        );
      return;
    }
    this.type === "Plane" && this.renderer.scene.removePlane(this),
      (this.target = t),
      this.type === "Plane" && this.renderer.scene.addPlane(this);
  }
  setRenderOrder(t = 0) {
    (t = isNaN(t) ? this.renderOrder : parseInt(t)),
      t !== this.renderOrder &&
        ((this.renderOrder = t), this.renderer.scene.setPlaneRenderOrder(this));
  }
  createTexture(t = {}) {
    const e = new we(this.renderer, Object.assign(t, this._texturesOptions));
    return e.addParent(this), e;
  }
  addTexture(t) {
    if (!t || t.type !== "Texture") {
      this.renderer.production ||
        F(
          this.type + ": cannot add ",
          t,
          " to this " + this.type + " because it is not a valid texture"
        );
      return;
    }
    t.addParent(this);
  }
  loadSources(t, e = {}, r, i) {
    for (let n = 0; n < t.length; n++) this.loadSource(t[n], e, r, i);
  }
  loadSource(t, e = {}, r, i) {
    this.loader.loadSource(
      t,
      Object.assign(e, this._texturesOptions),
      (n) => {
        r && r(n);
      },
      (n, s) => {
        this.renderer.production ||
          F(
            this.type +
              ": this HTML tag could not be converted into a texture:",
            n.tagName
          ),
          i && i(n, s);
      }
    );
  }
  loadImage(t, e = {}, r, i) {
    this.loader.loadImage(
      t,
      Object.assign(e, this._texturesOptions),
      (n) => {
        r && r(n);
      },
      (n, s) => {
        this.renderer.production ||
          F(
            this.type +
              `: There has been an error:
`,
            s,
            `
while loading this image:
`,
            n
          ),
          i && i(n, s);
      }
    );
  }
  loadVideo(t, e = {}, r, i) {
    this.loader.loadVideo(
      t,
      Object.assign(e, this._texturesOptions),
      (n) => {
        r && r(n);
      },
      (n, s) => {
        this.renderer.production ||
          F(
            this.type +
              `: There has been an error:
`,
            s,
            `
while loading this video:
`,
            n
          ),
          i && i(n, s);
      }
    );
  }
  loadCanvas(t, e = {}, r) {
    this.loader.loadCanvas(t, Object.assign(e, this._texturesOptions), (i) => {
      r && r(i);
    });
  }
  loadImages(t, e = {}, r, i) {
    for (let n = 0; n < t.length; n++) this.loadImage(t[n], e, r, i);
  }
  loadVideos(t, e = {}, r, i) {
    for (let n = 0; n < t.length; n++) this.loadVideo(t[n], e, r, i);
  }
  loadCanvases(t, e = {}, r) {
    for (let i = 0; i < t.length; i++) this.loadCanvas(t[i], e, r);
  }
  playVideos() {
    for (let t = 0; t < this.textures.length; t++) {
      const e = this.textures[t];
      if (e.sourceType === "video") {
        const r = e.source.play();
        r !== void 0 &&
          r.catch((i) => {
            this.renderer.production ||
              F(this.type + ": Could not play the video : ", i);
          });
      }
    }
  }
  _draw() {
    this.renderer.setDepthTest(this._depthTest),
      this.renderer.setFaceCulling(this.cullFace),
      this._program.updateUniforms(),
      this._geometry.bindBuffers(),
      (this.renderer.state.forceBufferUpdate = !1);
    for (let t = 0; t < this.textures.length; t++)
      if (
        (this.textures[t]._draw(),
        this.textures[t]._sampler.isActive &&
          !this.textures[t]._sampler.isTextureBound)
      )
        return;
    this._geometry.draw(),
      (this.renderer.state.activeTexture = null),
      this._onAfterRenderCallback && this._onAfterRenderCallback();
  }
  onError(t) {
    return t && (this._onErrorCallback = t), this;
  }
  onLoading(t) {
    return t && (this._onLoadingCallback = t), this;
  }
  onReady(t) {
    return t && (this._onReadyCallback = t), this;
  }
  onRender(t) {
    return t && (this._onRenderCallback = t), this;
  }
  onAfterRender(t) {
    return t && (this._onAfterRenderCallback = t), this;
  }
  remove() {
    (this._canDraw = !1),
      this.target && this.renderer.bindFrameBuffer(null),
      this._dispose(),
      this.type === "Plane"
        ? this.renderer.removePlane(this)
        : this.type === "ShaderPass" &&
          (this.target &&
            ((this.target._shaderPass = null),
            this.target.remove(),
            (this.target = null)),
          this.renderer.removeShaderPass(this));
  }
  _dispose() {
    if (this.gl) {
      this._geometry && this._geometry.dispose(),
        this.target &&
          this.type === "ShaderPass" &&
          (this.renderer.removeRenderTarget(this.target),
          this.textures.shift());
      for (let t = 0; t < this.textures.length; t++)
        this.textures[t]._dispose();
      this.textures = [];
    }
  }
}
const Ki = new mt(),
  Bc = new mt();
class Wc extends zc {
  constructor(
    t,
    e,
    r = "DOMMesh",
    {
      widthSegments: i,
      heightSegments: n,
      renderOrder: s,
      depthTest: o,
      cullFace: l,
      uniforms: h,
      vertexShaderID: c,
      fragmentShaderID: u,
      vertexShader: d,
      fragmentShader: f,
      texturesOptions: p,
      crossOrigin: g,
    } = {}
  ) {
    (c = c || (e && e.getAttribute("data-vs-id"))),
      (u = u || (e && e.getAttribute("data-fs-id"))),
      super(t, r, {
        widthSegments: i,
        heightSegments: n,
        renderOrder: s,
        depthTest: o,
        cullFace: l,
        uniforms: h,
        vertexShaderID: c,
        fragmentShaderID: u,
        vertexShader: d,
        fragmentShader: f,
        texturesOptions: p,
        crossOrigin: g,
      }),
      this.gl &&
        ((this.htmlElement = e),
        (!this.htmlElement || this.htmlElement.length === 0) &&
          (this.renderer.production ||
            F(
              this.type +
                ": The HTML element you specified does not currently exists in the DOM"
            )),
        this._setDocumentSizes());
  }
  _setDocumentSizes() {
    let t = this.htmlElement.getBoundingClientRect();
    this._boundingRect || (this._boundingRect = {}),
      (this._boundingRect.document = {
        width: t.width * this.renderer.pixelRatio,
        height: t.height * this.renderer.pixelRatio,
        top: t.top * this.renderer.pixelRatio,
        left: t.left * this.renderer.pixelRatio,
      });
  }
  getBoundingRect() {
    return {
      width: this._boundingRect.document.width,
      height: this._boundingRect.document.height,
      top: this._boundingRect.document.top,
      left: this._boundingRect.document.left,
      right:
        this._boundingRect.document.left + this._boundingRect.document.width,
      bottom:
        this._boundingRect.document.top + this._boundingRect.document.height,
    };
  }
  resize() {
    this._setDocumentSizes(),
      this.type === "Plane" &&
        (this.setPerspective(
          this.camera.fov,
          this.camera.near,
          this.camera.far
        ),
        this._setWorldSizes(),
        this._applyWorldPositions());
    for (let t = 0; t < this.textures.length; t++) this.textures[t].resize();
    this.renderer.nextRender.add(
      () => this._onAfterResizeCallback && this._onAfterResizeCallback()
    );
  }
  mouseToPlaneCoords(t) {
    const e = this.scale ? this.scale : Bc.set(1, 1),
      r = Ki.set(
        (this._boundingRect.document.width -
          this._boundingRect.document.width * e.x) /
          2,
        (this._boundingRect.document.height -
          this._boundingRect.document.height * e.y) /
          2
      ),
      i = {
        width:
          (this._boundingRect.document.width * e.x) / this.renderer.pixelRatio,
        height:
          (this._boundingRect.document.height * e.y) / this.renderer.pixelRatio,
        top: (this._boundingRect.document.top + r.y) / this.renderer.pixelRatio,
        left:
          (this._boundingRect.document.left + r.x) / this.renderer.pixelRatio,
      };
    return Ki.set(
      ((t.x - i.left) / i.width) * 2 - 1,
      1 - ((t.y - i.top) / i.height) * 2
    );
  }
  onAfterResize(t) {
    return t && (this._onAfterResizeCallback = t), this;
  }
}
class Hc {
  constructor({
    fov: t = 50,
    near: e = 0.1,
    far: r = 150,
    width: i,
    height: n,
    pixelRatio: s = 1,
  } = {}) {
    (this.position = new q()),
      (this.projectionMatrix = new At()),
      (this.worldMatrix = new At()),
      (this.viewMatrix = new At()),
      (this._shouldUpdate = !1),
      this.setSize(),
      this.setPerspective(t, e, r, i, n, s);
  }
  setFov(t) {
    (t = isNaN(t) ? this.fov : parseFloat(t)),
      (t = Math.max(1, Math.min(t, 179))),
      t !== this.fov &&
        ((this.fov = t), this.setPosition(), (this._shouldUpdate = !0)),
      this.setCSSPerspective();
  }
  setNear(t) {
    (t = isNaN(t) ? this.near : parseFloat(t)),
      (t = Math.max(t, 0.01)),
      t !== this.near && ((this.near = t), (this._shouldUpdate = !0));
  }
  setFar(t) {
    (t = isNaN(t) ? this.far : parseFloat(t)),
      (t = Math.max(t, 50)),
      t !== this.far && ((this.far = t), (this._shouldUpdate = !0));
  }
  setPixelRatio(t) {
    t !== this.pixelRatio && (this._shouldUpdate = !0), (this.pixelRatio = t);
  }
  setSize(t, e) {
    (t !== this.width || e !== this.height) && (this._shouldUpdate = !0),
      (this.width = t),
      (this.height = e);
  }
  setPerspective(t, e, r, i, n, s) {
    this.setPixelRatio(s),
      this.setSize(i, n),
      this.setFov(t),
      this.setNear(e),
      this.setFar(r),
      this._shouldUpdate && this.updateProjectionMatrix();
  }
  setPosition() {
    this.position.set(0, 0, 1),
      this.worldMatrix.setFromArray([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        this.position.x,
        this.position.y,
        this.position.z,
        1,
      ]),
      (this.viewMatrix = this.viewMatrix.copy(this.worldMatrix).getInverse());
  }
  setCSSPerspective() {
    this.CSSPerspective =
      Math.pow(
        Math.pow(this.width / (2 * this.pixelRatio), 2) +
          Math.pow(this.height / (2 * this.pixelRatio), 2),
        0.5
      ) / Math.tan((this.fov * 0.5 * Math.PI) / 180);
  }
  getScreenRatiosFromFov(t = 0) {
    const e = this.position.z;
    t < e ? (t -= e) : (t += e);
    const r = (this.fov * Math.PI) / 180,
      i = 2 * Math.tan(r / 2) * Math.abs(t);
    return { width: (i * this.width) / this.height, height: i };
  }
  updateProjectionMatrix() {
    const t = this.width / this.height,
      e = this.near * Math.tan((Math.PI / 180) * 0.5 * this.fov),
      r = 2 * e,
      i = t * r,
      n = -0.5 * i,
      s = n + i,
      o = e - r,
      l = (2 * this.near) / (s - n),
      h = (2 * this.near) / (e - o),
      c = (s + n) / (s - n),
      u = (e + o) / (e - o),
      d = -(this.far + this.near) / (this.far - this.near),
      f = (-2 * this.far * this.near) / (this.far - this.near);
    this.projectionMatrix.setFromArray([
      l,
      0,
      0,
      0,
      0,
      h,
      0,
      0,
      c,
      u,
      d,
      -1,
      0,
      0,
      f,
      0,
    ]);
  }
  forceUpdate() {
    this._shouldUpdate = !0;
  }
  cancelUpdate() {
    this._shouldUpdate = !1;
  }
}
class cs {
  constructor(t = new Float32Array([0, 0, 0, 1]), e = "XYZ") {
    (this.type = "Quat"), (this.elements = t), (this.axisOrder = e);
  }
  setFromArray(t) {
    return (
      (this.elements[0] = t[0]),
      (this.elements[1] = t[1]),
      (this.elements[2] = t[2]),
      (this.elements[3] = t[3]),
      this
    );
  }
  setAxisOrder(t) {
    switch (((t = t.toUpperCase()), t)) {
      case "XYZ":
      case "YXZ":
      case "ZXY":
      case "ZYX":
      case "YZX":
      case "XZY":
        this.axisOrder = t;
        break;
      default:
        this.axisOrder = "XYZ";
    }
    return this;
  }
  copy(t) {
    return (this.elements = t.elements), (this.axisOrder = t.axisOrder), this;
  }
  clone() {
    return new cs().copy(this);
  }
  equals(t) {
    return (
      this.elements[0] === t.elements[0] &&
      this.elements[1] === t.elements[1] &&
      this.elements[2] === t.elements[2] &&
      this.elements[3] === t.elements[3] &&
      this.axisOrder === t.axisOrder
    );
  }
  setFromVec3(t) {
    const e = t.x * 0.5,
      r = t.y * 0.5,
      i = t.z * 0.5,
      n = Math.cos(e),
      s = Math.cos(r),
      o = Math.cos(i),
      l = Math.sin(e),
      h = Math.sin(r),
      c = Math.sin(i);
    return (
      this.axisOrder === "XYZ"
        ? ((this.elements[0] = l * s * o + n * h * c),
          (this.elements[1] = n * h * o - l * s * c),
          (this.elements[2] = n * s * c + l * h * o),
          (this.elements[3] = n * s * o - l * h * c))
        : this.axisOrder === "YXZ"
        ? ((this.elements[0] = l * s * o + n * h * c),
          (this.elements[1] = n * h * o - l * s * c),
          (this.elements[2] = n * s * c - l * h * o),
          (this.elements[3] = n * s * o + l * h * c))
        : this.axisOrder === "ZXY"
        ? ((this.elements[0] = l * s * o - n * h * c),
          (this.elements[1] = n * h * o + l * s * c),
          (this.elements[2] = n * s * c + l * h * o),
          (this.elements[3] = n * s * o - l * h * c))
        : this.axisOrder === "ZYX"
        ? ((this.elements[0] = l * s * o - n * h * c),
          (this.elements[1] = n * h * o + l * s * c),
          (this.elements[2] = n * s * c - l * h * o),
          (this.elements[3] = n * s * o + l * h * c))
        : this.axisOrder === "YZX"
        ? ((this.elements[0] = l * s * o + n * h * c),
          (this.elements[1] = n * h * o + l * s * c),
          (this.elements[2] = n * s * c - l * h * o),
          (this.elements[3] = n * s * o - l * h * c))
        : this.axisOrder === "XZY" &&
          ((this.elements[0] = l * s * o - n * h * c),
          (this.elements[1] = n * h * o - l * s * c),
          (this.elements[2] = n * s * c + l * h * o),
          (this.elements[3] = n * s * o + l * h * c)),
      this
    );
  }
}
const Gc = new mt(),
  Yc = new q(),
  Kc = new q(),
  Xc = new q(),
  Qc = new q(),
  Jc = new q(),
  Zc = new q(),
  ft = new q(),
  pt = new q(),
  Xi = new cs(),
  qc = new q(0.5, 0.5, 0),
  tu = new q(),
  eu = new q(),
  su = new q(),
  iu = new q(),
  ru = new mt();
class nu extends Wc {
  constructor(
    t,
    e,
    {
      widthSegments: r,
      heightSegments: i,
      renderOrder: n,
      depthTest: s,
      cullFace: o,
      uniforms: l,
      vertexShaderID: h,
      fragmentShaderID: c,
      vertexShader: u,
      fragmentShader: d,
      texturesOptions: f,
      crossOrigin: p,
      alwaysDraw: g = !1,
      visible: m = !0,
      transparent: v = !1,
      drawCheckMargins: _ = { top: 0, right: 0, bottom: 0, left: 0 },
      autoloadSources: x = !0,
      watchScroll: y = !0,
      fov: E = 50,
    } = {}
  ) {
    super(t, e, "Plane", {
      widthSegments: r,
      heightSegments: i,
      renderOrder: n,
      depthTest: s,
      cullFace: o,
      uniforms: l,
      vertexShaderID: h,
      fragmentShaderID: c,
      vertexShader: u,
      fragmentShader: d,
      texturesOptions: f,
      crossOrigin: p,
    }),
      this.gl &&
        ((this.index = this.renderer.planes.length),
        (this.target = null),
        (this.alwaysDraw = g),
        (this._shouldDraw = !0),
        (this.visible = m),
        (this._transparent = v),
        (this.drawCheckMargins = _),
        (this.autoloadSources = x),
        (this.watchScroll = y),
        (this._updateMVMatrix = !1),
        (this.camera = new Hc({
          fov: E,
          width: this.renderer._boundingRect.width,
          height: this.renderer._boundingRect.height,
          pixelRatio: this.renderer.pixelRatio,
        })),
        this._program.compiled &&
          (this._initPlane(),
          this.renderer.scene.addPlane(this),
          this.renderer.planes.push(this)));
  }
  _programRestored() {
    this.target &&
      this.setRenderTarget(this.renderer.renderTargets[this.target.index]),
      this._initMatrices(),
      this.setPerspective(this.camera.fov, this.camera.near, this.camera.far),
      this._setWorldSizes(),
      this._applyWorldPositions(),
      this.renderer.scene.addPlane(this);
    for (let t = 0; t < this.textures.length; t++)
      (this.textures[t]._parent = this), this.textures[t]._restoreContext();
    this._canDraw = !0;
  }
  _initPlane() {
    this._initTransformValues(),
      this._initPositions(),
      this.setPerspective(this.camera.fov, this.camera.near, this.camera.far),
      this._initSources();
  }
  _initTransformValues() {
    (this.rotation = new q()),
      this.rotation.onChange(() => this._applyRotation()),
      (this.quaternion = new cs()),
      (this.relativeTranslation = new q()),
      this.relativeTranslation.onChange(() => this._setTranslation()),
      (this._translation = new q()),
      (this.scale = new q(1)),
      this.scale.onChange(() => {
        (this.scale.z = 1), this._applyScale();
      }),
      (this.transformOrigin = new q(0.5, 0.5, 0)),
      this.transformOrigin.onChange(() => {
        this._setWorldTransformOrigin(), (this._updateMVMatrix = !0);
      });
  }
  resetPlane(t) {
    this._initTransformValues(),
      this._setWorldTransformOrigin(),
      t !== null && !!t
        ? ((this.htmlElement = t), this.resize())
        : !t &&
          !this.renderer.production &&
          F(
            this.type +
              ": You are trying to reset a plane with a HTML element that does not exist. The old HTML element will be kept instead."
          );
  }
  removeRenderTarget() {
    this.target &&
      (this.renderer.scene.removePlane(this),
      (this.target = null),
      this.renderer.scene.addPlane(this));
  }
  _initPositions() {
    this._initMatrices(), this._setWorldSizes(), this._applyWorldPositions();
  }
  _initMatrices() {
    const t = new At();
    this._matrices = {
      world: { matrix: t },
      modelView: {
        name: "uMVMatrix",
        matrix: t,
        location: this.gl.getUniformLocation(
          this._program.program,
          "uMVMatrix"
        ),
      },
      projection: {
        name: "uPMatrix",
        matrix: t,
        location: this.gl.getUniformLocation(this._program.program, "uPMatrix"),
      },
      modelViewProjection: { matrix: t },
    };
  }
  _setPerspectiveMatrix() {
    this.camera._shouldUpdate &&
      (this.renderer.useProgram(this._program),
      this.gl.uniformMatrix4fv(
        this._matrices.projection.location,
        !1,
        this._matrices.projection.matrix.elements
      )),
      this.camera.cancelUpdate();
  }
  setPerspective(t, e, r) {
    this.camera.setPerspective(
      t,
      e,
      r,
      this.renderer._boundingRect.width,
      this.renderer._boundingRect.height,
      this.renderer.pixelRatio
    ),
      this.renderer.state.isContextLost && this.camera.forceUpdate(),
      (this._matrices.projection.matrix = this.camera.projectionMatrix),
      this.camera._shouldUpdate &&
        (this._setWorldSizes(),
        this._applyWorldPositions(),
        (this._translation.z =
          this.relativeTranslation.z / this.camera.CSSPerspective)),
      (this._updateMVMatrix = this.camera._shouldUpdate);
  }
  _setMVMatrix() {
    this._updateMVMatrix &&
      ((this._matrices.world.matrix =
        this._matrices.world.matrix.composeFromOrigin(
          this._translation,
          this.quaternion,
          this.scale,
          this._boundingRect.world.transformOrigin
        )),
      this._matrices.world.matrix.scale({
        x: this._boundingRect.world.width,
        y: this._boundingRect.world.height,
        z: 1,
      }),
      this._matrices.modelView.matrix.copy(this._matrices.world.matrix),
      (this._matrices.modelView.matrix.elements[14] -= this.camera.position.z),
      (this._matrices.modelViewProjection.matrix =
        this._matrices.projection.matrix.multiply(
          this._matrices.modelView.matrix
        )),
      this.alwaysDraw || this._shouldDrawCheck(),
      this.renderer.useProgram(this._program),
      this.gl.uniformMatrix4fv(
        this._matrices.modelView.location,
        !1,
        this._matrices.modelView.matrix.elements
      )),
      (this._updateMVMatrix = !1);
  }
  _setWorldTransformOrigin() {
    this._boundingRect.world.transformOrigin = new q(
      (this.transformOrigin.x * 2 - 1) * this._boundingRect.world.width,
      -(this.transformOrigin.y * 2 - 1) * this._boundingRect.world.height,
      this.transformOrigin.z
    );
  }
  _documentToWorldSpace(t) {
    return Kc.set(
      ((t.x * this.renderer.pixelRatio) / this.renderer._boundingRect.width) *
        this._boundingRect.world.ratios.width,
      -((t.y * this.renderer.pixelRatio) / this.renderer._boundingRect.height) *
        this._boundingRect.world.ratios.height,
      t.z
    );
  }
  _setWorldSizes() {
    const t = this.camera.getScreenRatiosFromFov();
    (this._boundingRect.world = {
      width:
        ((this._boundingRect.document.width /
          this.renderer._boundingRect.width) *
          t.width) /
        2,
      height:
        ((this._boundingRect.document.height /
          this.renderer._boundingRect.height) *
          t.height) /
        2,
      ratios: t,
    }),
      this._setWorldTransformOrigin();
  }
  _setWorldPosition() {
    const t = {
        x:
          this._boundingRect.document.width / 2 +
          this._boundingRect.document.left,
        y:
          this._boundingRect.document.height / 2 +
          this._boundingRect.document.top,
      },
      e = {
        x:
          this.renderer._boundingRect.width / 2 +
          this.renderer._boundingRect.left,
        y:
          this.renderer._boundingRect.height / 2 +
          this.renderer._boundingRect.top,
      };
    (this._boundingRect.world.top =
      ((e.y - t.y) / this.renderer._boundingRect.height) *
      this._boundingRect.world.ratios.height),
      (this._boundingRect.world.left =
        ((t.x - e.x) / this.renderer._boundingRect.width) *
        this._boundingRect.world.ratios.width);
  }
  setScale(t) {
    if (!t.type || t.type !== "Vec2") {
      this.renderer.production ||
        F(
          this.type +
            ": Cannot set scale because the parameter passed is not of Vec2 type:",
          t
        );
      return;
    }
    t.sanitizeNaNValuesWith(this.scale).max(Gc.set(0.001, 0.001)),
      (t.x !== this.scale.x || t.y !== this.scale.y) &&
        (this.scale.set(t.x, t.y, 1), this._applyScale());
  }
  _applyScale() {
    for (let t = 0; t < this.textures.length; t++) this.textures[t].resize();
    this._updateMVMatrix = !0;
  }
  setRotation(t) {
    if (!t.type || t.type !== "Vec3") {
      this.renderer.production ||
        F(
          this.type +
            ": Cannot set rotation because the parameter passed is not of Vec3 type:",
          t
        );
      return;
    }
    t.sanitizeNaNValuesWith(this.rotation),
      t.equals(this.rotation) || (this.rotation.copy(t), this._applyRotation());
  }
  _applyRotation() {
    this.quaternion.setFromVec3(this.rotation), (this._updateMVMatrix = !0);
  }
  setTransformOrigin(t) {
    if (!t.type || t.type !== "Vec3") {
      this.renderer.production ||
        F(
          this.type +
            ": Cannot set transform origin because the parameter passed is not of Vec3 type:",
          t
        );
      return;
    }
    t.sanitizeNaNValuesWith(this.transformOrigin),
      t.equals(this.transformOrigin) ||
        (this.transformOrigin.copy(t),
        this._setWorldTransformOrigin(),
        (this._updateMVMatrix = !0));
  }
  _setTranslation() {
    let t = Yc.set(0, 0, 0);
    this.relativeTranslation.equals(t) ||
      (t = this._documentToWorldSpace(this.relativeTranslation)),
      this._translation.set(
        this._boundingRect.world.left + t.x,
        this._boundingRect.world.top + t.y,
        this.relativeTranslation.z / this.camera.CSSPerspective
      ),
      (this._updateMVMatrix = !0);
  }
  setRelativeTranslation(t) {
    if (!t.type || t.type !== "Vec3") {
      this.renderer.production ||
        F(
          this.type +
            ": Cannot set translation because the parameter passed is not of Vec3 type:",
          t
        );
      return;
    }
    t.sanitizeNaNValuesWith(this.relativeTranslation),
      t.equals(this.relativeTranslation) ||
        (this.relativeTranslation.copy(t), this._setTranslation());
  }
  _applyWorldPositions() {
    this._setWorldPosition(), this._setTranslation();
  }
  updatePosition() {
    this._setDocumentSizes(), this._applyWorldPositions();
  }
  updateScrollPosition(t, e) {
    (t || e) &&
      ((this._boundingRect.document.top += e * this.renderer.pixelRatio),
      (this._boundingRect.document.left += t * this.renderer.pixelRatio),
      this._applyWorldPositions());
  }
  _getIntersection(t, e) {
    let r = e.clone().sub(t),
      i = t.clone();
    for (; i.z > -1; ) i.add(r);
    return i;
  }
  _getNearPlaneIntersections(t, e, r) {
    const i = this._matrices.modelViewProjection.matrix;
    if (r.length === 1)
      r[0] === 0
        ? ((e[0] = this._getIntersection(
            e[1],
            ft.set(0.95, 1, 0).applyMat4(i)
          )),
          e.push(
            this._getIntersection(e[3], pt.set(-1, -0.95, 0).applyMat4(i))
          ))
        : r[0] === 1
        ? ((e[1] = this._getIntersection(
            e[0],
            ft.set(-0.95, 1, 0).applyMat4(i)
          )),
          e.push(this._getIntersection(e[2], pt.set(1, -0.95, 0).applyMat4(i))))
        : r[0] === 2
        ? ((e[2] = this._getIntersection(
            e[3],
            ft.set(-0.95, -1, 0).applyMat4(i)
          )),
          e.push(this._getIntersection(e[1], pt.set(1, 0.95, 0).applyMat4(i))))
        : r[0] === 3 &&
          ((e[3] = this._getIntersection(
            e[2],
            ft.set(0.95, -1, 0).applyMat4(i)
          )),
          e.push(
            this._getIntersection(e[0], pt.set(-1, 0.95, 0).applyMat4(i))
          ));
    else if (r.length === 2)
      r[0] === 0 && r[1] === 1
        ? ((e[0] = this._getIntersection(
            e[3],
            ft.set(-1, -0.95, 0).applyMat4(i)
          )),
          (e[1] = this._getIntersection(
            e[2],
            pt.set(1, -0.95, 0).applyMat4(i)
          )))
        : r[0] === 1 && r[1] === 2
        ? ((e[1] = this._getIntersection(
            e[0],
            ft.set(-0.95, 1, 0).applyMat4(i)
          )),
          (e[2] = this._getIntersection(
            e[3],
            pt.set(-0.95, -1, 0).applyMat4(i)
          )))
        : r[0] === 2 && r[1] === 3
        ? ((e[2] = this._getIntersection(
            e[1],
            ft.set(1, 0.95, 0).applyMat4(i)
          )),
          (e[3] = this._getIntersection(
            e[0],
            pt.set(-1, 0.95, 0).applyMat4(i)
          )))
        : r[0] === 0 &&
          r[1] === 3 &&
          ((e[0] = this._getIntersection(
            e[1],
            ft.set(0.95, 1, 0).applyMat4(i)
          )),
          (e[3] = this._getIntersection(
            e[2],
            pt.set(0.95, -1, 0).applyMat4(i)
          )));
    else if (r.length === 3) {
      let n = 0;
      for (let s = 0; s < t.length; s++) r.includes(s) || (n = s);
      (e = [e[n]]),
        n === 0
          ? (e.push(
              this._getIntersection(e[0], ft.set(-0.95, 1, 0).applyMat4(i))
            ),
            e.push(
              this._getIntersection(e[0], pt.set(-1, 0.95, 0).applyMat4(i))
            ))
          : n === 1
          ? (e.push(
              this._getIntersection(e[0], ft.set(0.95, 1, 0).applyMat4(i))
            ),
            e.push(
              this._getIntersection(e[0], pt.set(1, 0.95, 0).applyMat4(i))
            ))
          : n === 2
          ? (e.push(
              this._getIntersection(e[0], ft.set(0.95, -1, 0).applyMat4(i))
            ),
            e.push(
              this._getIntersection(e[0], pt.set(1, -0.95, 0).applyMat4(i))
            ))
          : n === 3 &&
            (e.push(
              this._getIntersection(e[0], ft.set(-0.95, -1, 0).applyMat4(i))
            ),
            e.push(
              this._getIntersection(e[0], pt.set(-1 - 0.95, 0).applyMat4(i))
            ));
    } else for (let n = 0; n < t.length; n++) (e[n][0] = 1e4), (e[n][1] = 1e4);
    return e;
  }
  _getWorldCoords() {
    const t = [
      Xc.set(-1, 1, 0),
      Qc.set(1, 1, 0),
      Jc.set(1, -1, 0),
      Zc.set(-1, -1, 0),
    ];
    let e = [],
      r = [];
    for (let l = 0; l < t.length; l++) {
      const h = t[l].applyMat4(this._matrices.modelViewProjection.matrix);
      e.push(h), Math.abs(h.z) > 1 && r.push(l);
    }
    r.length && (e = this._getNearPlaneIntersections(t, e, r));
    let i = 1 / 0,
      n = -1 / 0,
      s = 1 / 0,
      o = -1 / 0;
    for (let l = 0; l < e.length; l++) {
      const h = e[l];
      h.x < i && (i = h.x),
        h.x > n && (n = h.x),
        h.y < s && (s = h.y),
        h.y > o && (o = h.y);
    }
    return { top: o, right: n, bottom: s, left: i };
  }
  _computeWebGLBoundingRect() {
    const t = this._getWorldCoords();
    let e = {
      top: 1 - (t.top + 1) / 2,
      right: (t.right + 1) / 2,
      bottom: 1 - (t.bottom + 1) / 2,
      left: (t.left + 1) / 2,
    };
    (e.width = e.right - e.left),
      (e.height = e.bottom - e.top),
      (this._boundingRect.worldToDocument = {
        width: e.width * this.renderer._boundingRect.width,
        height: e.height * this.renderer._boundingRect.height,
        top:
          e.top * this.renderer._boundingRect.height +
          this.renderer._boundingRect.top,
        left:
          e.left * this.renderer._boundingRect.width +
          this.renderer._boundingRect.left,
        right:
          e.left * this.renderer._boundingRect.width +
          this.renderer._boundingRect.left +
          e.width * this.renderer._boundingRect.width,
        bottom:
          e.top * this.renderer._boundingRect.height +
          this.renderer._boundingRect.top +
          e.height * this.renderer._boundingRect.height,
      });
  }
  getWebGLBoundingRect() {
    if (this._matrices.modelViewProjection)
      (!this._boundingRect.worldToDocument || this.alwaysDraw) &&
        this._computeWebGLBoundingRect();
    else return this._boundingRect.document;
    return this._boundingRect.worldToDocument;
  }
  _getWebGLDrawRect() {
    return (
      this._computeWebGLBoundingRect(),
      {
        top: this._boundingRect.worldToDocument.top - this.drawCheckMargins.top,
        right:
          this._boundingRect.worldToDocument.right +
          this.drawCheckMargins.right,
        bottom:
          this._boundingRect.worldToDocument.bottom +
          this.drawCheckMargins.bottom,
        left:
          this._boundingRect.worldToDocument.left - this.drawCheckMargins.left,
      }
    );
  }
  _shouldDrawCheck() {
    const t = this._getWebGLDrawRect();
    Math.round(t.right) <= this.renderer._boundingRect.left ||
    Math.round(t.left) >=
      this.renderer._boundingRect.left + this.renderer._boundingRect.width ||
    Math.round(t.bottom) <= this.renderer._boundingRect.top ||
    Math.round(t.top) >=
      this.renderer._boundingRect.top + this.renderer._boundingRect.height
      ? this._shouldDraw &&
        ((this._shouldDraw = !1),
        this.renderer.nextRender.add(
          () => this._onLeaveViewCallback && this._onLeaveViewCallback()
        ))
      : (this._shouldDraw ||
          this.renderer.nextRender.add(
            () => this._onReEnterViewCallback && this._onReEnterViewCallback()
          ),
        (this._shouldDraw = !0));
  }
  isDrawn() {
    return (
      this._canDraw && this.visible && (this._shouldDraw || this.alwaysDraw)
    );
  }
  enableDepthTest(t) {
    this._depthTest = t;
  }
  _initSources() {
    let t = 0;
    if (this.autoloadSources) {
      const e = this.htmlElement.getElementsByTagName("img"),
        r = this.htmlElement.getElementsByTagName("video"),
        i = this.htmlElement.getElementsByTagName("canvas");
      e.length && this.loadImages(e),
        r.length && this.loadVideos(r),
        i.length && this.loadCanvases(i),
        (t = e.length + r.length + i.length);
    }
    this.loader._setLoaderSize(t), (this._canDraw = !0);
  }
  _startDrawing() {
    this._canDraw &&
      (this._onRenderCallback && this._onRenderCallback(),
      this.target
        ? this.renderer.bindFrameBuffer(this.target)
        : this.renderer.state.scenePassIndex === null &&
          this.renderer.bindFrameBuffer(null),
      this._setPerspectiveMatrix(),
      this._setMVMatrix(),
      (this.alwaysDraw || this._shouldDraw) && this.visible && this._draw());
  }
  mouseToPlaneCoords(t) {
    if (
      (Xi.setAxisOrder(this.quaternion.axisOrder),
      Xi.equals(this.quaternion) && qc.equals(this.transformOrigin))
    )
      return super.mouseToPlaneCoords(t);
    {
      const e = {
          x:
            2 *
              (t.x /
                (this.renderer._boundingRect.width /
                  this.renderer.pixelRatio)) -
            1,
          y:
            2 *
              (1 -
                t.y /
                  (this.renderer._boundingRect.height /
                    this.renderer.pixelRatio)) -
            1,
        },
        r = this.camera.position.clone(),
        i = tu.set(e.x, e.y, -0.5);
      i.unproject(this.camera), i.sub(r).normalize();
      const n = eu.set(0, 0, -1);
      n.applyQuat(this.quaternion).normalize();
      const s = iu.set(0, 0, 0),
        o = n.dot(i);
      if (Math.abs(o) >= 1e-4) {
        const l = this._matrices.world.matrix
            .getInverse()
            .multiply(this.camera.viewMatrix),
          h = this._boundingRect.world.transformOrigin
            .clone()
            .add(this._translation),
          c = su.set(
            this._translation.x - h.x,
            this._translation.y - h.y,
            this._translation.z - h.z
          );
        c.applyQuat(this.quaternion), h.add(c);
        const u = n.dot(h.clone().sub(r)) / o;
        s.copy(r.add(i.multiplyScalar(u))), s.applyMat4(l);
      } else s.set(1 / 0, 1 / 0, 1 / 0);
      return ru.set(s.x, s.y);
    }
  }
  onReEnterView(t) {
    return t && (this._onReEnterViewCallback = t), this;
  }
  onLeaveView(t) {
    return t && (this._onLeaveViewCallback = t), this;
  }
}
window.addEventListener("load", () => {
  const a = new mt(),
    t = new mt(),
    e = { max: 0, applied: 0 },
    r = new wc({
      container: "canvas",
      watchScroll: !1,
      pixelRatio: Math.min(1.5, window.devicePixelRatio),
    });
  r.onError(() => {
    document.body.classList.add("no-curtains");
  }).onContextLost(() => {
    r.restoreContext();
  });
  const i = document.getElementsByClassName("curtain"),
    o = {
      vertexShader: `
          precision mediump float;
          // default mandatory variables
          attribute vec3 aVertexPosition;
          attribute vec2 aTextureCoord;
          uniform mat4 uMVMatrix;
          uniform mat4 uPMatrix;
          
          // our texture matrix uniform
          uniform mat4 simplePlaneTextureMatrix;
          // custom variables
          varying vec3 vVertexPosition;
          varying vec2 vTextureCoord;
          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec2 uMousePosition;
          uniform float uMouseMoveStrength;
          void main() {
              vec3 vertexPosition = aVertexPosition;
              // get the distance between our vertex and the mouse position
              float distanceFromMouse = distance(uMousePosition, vec2(vertexPosition.x, vertexPosition.y));
              // calculate our wave effect
              float waveSinusoid = cos(5.0 * (distanceFromMouse - (uTime / 75.0)));
              // attenuate the effect based on mouse distance
              float distanceStrength = (0.4 / (distanceFromMouse + 0.4));
              // calculate our distortion effect
              float distortionEffect = distanceStrength * waveSinusoid * uMouseMoveStrength;
              // apply it to our vertex position
              vertexPosition.z +=  distortionEffect / 30.0;
              vertexPosition.x +=  (distortionEffect / 30.0 * (uResolution.x / uResolution.y) * (uMousePosition.x - vertexPosition.x));
              vertexPosition.y +=  distortionEffect / 30.0 * (uMousePosition.y - vertexPosition.y);
              gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
              // varyings
              vTextureCoord = (simplePlaneTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
              vVertexPosition = vertexPosition;
          }
      `,
      fragmentShader: `
          precision mediump float;
          varying vec3 vVertexPosition;
          varying vec2 vTextureCoord;
          uniform sampler2D simplePlaneTexture;
          void main() {
              // apply our texture
              vec4 finalColor = texture2D(simplePlaneTexture, vTextureCoord);
              // fake shadows based on vertex position along Z axis
              finalColor.rgb -= clamp(-vVertexPosition.z, 0.0, 1.0);
              // fake lights based on vertex position along Z axis
              finalColor.rgb += clamp(vVertexPosition.z, 0.0, 1.0);
              // handling premultiplied alpha (useful if we were using a png with transparency)
              finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);
              gl_FragColor = finalColor;
          }
      `,
      widthSegments: 20,
      heightSegments: 20,
      uniforms: {
        resolution: {
          name: "uResolution",
          type: "2f",
          value: [i[0].clientWidth, i[0].clientHeight],
        },
        time: { name: "uTime", type: "1f", value: 0 },
        mousePosition: { name: "uMousePosition", type: "2f", value: a },
        mouseMoveStrength: { name: "uMouseMoveStrength", type: "1f", value: 0 },
      },
    },
    l = new nu(r, i[0], o);
  l.onReady(() => {
    l.setPerspective(35), (e.max = 2);
    const c = document.getElementById("img-wrapper");
    c.addEventListener("mousemove", (u) => {
      h(u, l);
    }),
      c.addEventListener(
        "touchmove",
        (u) => {
          h(u, l);
        },
        { passive: !0 }
      );
  })
    .onRender(() => {
      l.uniforms.time.value++,
        (e.applied += (e.max - e.applied) * 0.02),
        (e.max += (0 - e.max) * 0.01),
        (l.uniforms.mouseMoveStrength.value = e.applied);
    })
    .onAfterResize(() => {
      const c = l.getBoundingRect();
      l.uniforms.resolution.value = [c.width, c.height];
    })
    .onError(() => {
      document.body.classList.add("no-curtains");
    });
  function h(c, u) {
    t.copy(a);
    const d = new mt();
    if (
      (c.targetTouches
        ? d.set(c.targetTouches[0].clientX, c.targetTouches[0].clientY)
        : d.set(c.clientX, c.clientY),
      a.set(r.lerp(a.x, d.x, 0.3), r.lerp(a.y, d.y, 0.3)),
      (u.uniforms.mousePosition.value = u.mouseToPlaneCoords(a)),
      t.x && t.y)
    ) {
      let f = Math.sqrt(Math.pow(a.x - t.x, 2) + Math.pow(a.y - t.y, 2)) / 30;
      (f = Math.min(4, f)), f >= e.max && (e.max = f);
    }
  }
});
(() => {
  var a = {
      9662: (i, n, s) => {
        var o = s(614),
          l = s(6330),
          h = TypeError;
        i.exports = function (c) {
          if (o(c)) return c;
          throw h(l(c) + " is not a function");
        };
      },
      9483: (i, n, s) => {
        var o = s(4411),
          l = s(6330),
          h = TypeError;
        i.exports = function (c) {
          if (o(c)) return c;
          throw h(l(c) + " is not a constructor");
        };
      },
      6077: (i, n, s) => {
        var o = s(614),
          l = String,
          h = TypeError;
        i.exports = function (c) {
          if (typeof c == "object" || o(c)) return c;
          throw h("Can't set " + l(c) + " as a prototype");
        };
      },
      5787: (i, n, s) => {
        var o = s(7976),
          l = TypeError;
        i.exports = function (h, c) {
          if (o(c, h)) return h;
          throw l("Incorrect invocation");
        };
      },
      9670: (i, n, s) => {
        var o = s(111),
          l = String,
          h = TypeError;
        i.exports = function (c) {
          if (o(c)) return c;
          throw h(l(c) + " is not an object");
        };
      },
      8533: (i, n, s) => {
        var o = s(2092).forEach,
          l = s(9341),
          h = l("forEach");
        i.exports = h
          ? [].forEach
          : function (u) {
              return o(this, u, arguments.length > 1 ? arguments[1] : void 0);
            };
      },
      1318: (i, n, s) => {
        var o = s(5656),
          l = s(1400),
          h = s(6244),
          c = function (u) {
            return function (d, f, p) {
              var g = o(d),
                m = h(g),
                v = l(p, m),
                _;
              if (u && f != f) {
                for (; m > v; ) if (((_ = g[v++]), _ != _)) return !0;
              } else
                for (; m > v; v++)
                  if ((u || v in g) && g[v] === f) return u || v || 0;
              return !u && -1;
            };
          };
        i.exports = { includes: c(!0), indexOf: c(!1) };
      },
      2092: (i, n, s) => {
        var o = s(9974),
          l = s(1702),
          h = s(8361),
          c = s(7908),
          u = s(6244),
          d = s(5417),
          f = l([].push),
          p = function (g) {
            var m = g == 1,
              v = g == 2,
              _ = g == 3,
              x = g == 4,
              y = g == 6,
              E = g == 7,
              b = g == 5 || y;
            return function (S, C, R, N) {
              for (
                var T = c(S),
                  w = h(T),
                  P = o(C, R),
                  O = u(w),
                  M = 0,
                  I = N || d,
                  D = m ? I(S, O) : v || E ? I(S, 0) : void 0,
                  $,
                  U;
                O > M;
                M++
              )
                if ((b || M in w) && (($ = w[M]), (U = P($, M, T)), g))
                  if (m) D[M] = U;
                  else if (U)
                    switch (g) {
                      case 3:
                        return !0;
                      case 5:
                        return $;
                      case 6:
                        return M;
                      case 2:
                        f(D, $);
                    }
                  else
                    switch (g) {
                      case 4:
                        return !1;
                      case 7:
                        f(D, $);
                    }
              return y ? -1 : _ || x ? x : D;
            };
          };
        i.exports = {
          forEach: p(0),
          map: p(1),
          filter: p(2),
          some: p(3),
          every: p(4),
          find: p(5),
          findIndex: p(6),
          filterReject: p(7),
        };
      },
      9341: (i, n, s) => {
        var o = s(7293);
        i.exports = function (l, h) {
          var c = [][l];
          return (
            !!c &&
            o(function () {
              c.call(
                null,
                h ||
                  function () {
                    return 1;
                  },
                1
              );
            })
          );
        };
      },
      206: (i, n, s) => {
        var o = s(1702);
        i.exports = o([].slice);
      },
      7475: (i, n, s) => {
        var o = s(3157),
          l = s(4411),
          h = s(111),
          c = s(5112),
          u = c("species"),
          d = Array;
        i.exports = function (f) {
          var p;
          return (
            o(f) &&
              ((p = f.constructor),
              l(p) && (p === d || o(p.prototype))
                ? (p = void 0)
                : h(p) && ((p = p[u]), p === null && (p = void 0))),
            p === void 0 ? d : p
          );
        };
      },
      5417: (i, n, s) => {
        var o = s(7475);
        i.exports = function (l, h) {
          return new (o(l))(h === 0 ? 0 : h);
        };
      },
      7072: (i, n, s) => {
        var o = s(5112),
          l = o("iterator"),
          h = !1;
        try {
          var c = 0,
            u = {
              next: function () {
                return { done: !!c++ };
              },
              return: function () {
                h = !0;
              },
            };
          (u[l] = function () {
            return this;
          }),
            Array.from(u, function () {
              throw 2;
            });
        } catch {}
        i.exports = function (d, f) {
          if (!f && !h) return !1;
          var p = !1;
          try {
            var g = {};
            (g[l] = function () {
              return {
                next: function () {
                  return { done: (p = !0) };
                },
              };
            }),
              d(g);
          } catch {}
          return p;
        };
      },
      4326: (i, n, s) => {
        var o = s(1702),
          l = o({}.toString),
          h = o("".slice);
        i.exports = function (c) {
          return h(l(c), 8, -1);
        };
      },
      648: (i, n, s) => {
        var o = s(1694),
          l = s(614),
          h = s(4326),
          c = s(5112),
          u = c("toStringTag"),
          d = Object,
          f =
            h(
              (function () {
                return arguments;
              })()
            ) == "Arguments",
          p = function (g, m) {
            try {
              return g[m];
            } catch {}
          };
        i.exports = o
          ? h
          : function (g) {
              var m, v, _;
              return g === void 0
                ? "Undefined"
                : g === null
                ? "Null"
                : typeof (v = p((m = d(g)), u)) == "string"
                ? v
                : f
                ? h(m)
                : (_ = h(m)) == "Object" && l(m.callee)
                ? "Arguments"
                : _;
            };
      },
      9920: (i, n, s) => {
        var o = s(2597),
          l = s(3887),
          h = s(1236),
          c = s(3070);
        i.exports = function (u, d, f) {
          for (var p = l(d), g = c.f, m = h.f, v = 0; v < p.length; v++) {
            var _ = p[v];
            !o(u, _) && !(f && o(f, _)) && g(u, _, m(d, _));
          }
        };
      },
      8880: (i, n, s) => {
        var o = s(9781),
          l = s(3070),
          h = s(9114);
        i.exports = o
          ? function (c, u, d) {
              return l.f(c, u, h(1, d));
            }
          : function (c, u, d) {
              return (c[u] = d), c;
            };
      },
      9114: (i) => {
        i.exports = function (n, s) {
          return {
            enumerable: !(n & 1),
            configurable: !(n & 2),
            writable: !(n & 4),
            value: s,
          };
        };
      },
      8052: (i, n, s) => {
        var o = s(614),
          l = s(3070),
          h = s(6339),
          c = s(3072);
        i.exports = function (u, d, f, p) {
          p || (p = {});
          var g = p.enumerable,
            m = p.name !== void 0 ? p.name : d;
          if ((o(f) && h(f, m, p), p.global)) g ? (u[d] = f) : c(d, f);
          else {
            try {
              p.unsafe ? u[d] && (g = !0) : delete u[d];
            } catch {}
            g
              ? (u[d] = f)
              : l.f(u, d, {
                  value: f,
                  enumerable: !1,
                  configurable: !p.nonConfigurable,
                  writable: !p.nonWritable,
                });
          }
          return u;
        };
      },
      3072: (i, n, s) => {
        var o = s(7854),
          l = Object.defineProperty;
        i.exports = function (h, c) {
          try {
            l(o, h, { value: c, configurable: !0, writable: !0 });
          } catch {
            o[h] = c;
          }
          return c;
        };
      },
      9781: (i, n, s) => {
        var o = s(7293);
        i.exports = !o(function () {
          return (
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1] != 7
          );
        });
      },
      4154: (i) => {
        var n = typeof document == "object" && document.all,
          s = typeof n == "undefined" && n !== void 0;
        i.exports = { all: n, IS_HTMLDDA: s };
      },
      317: (i, n, s) => {
        var o = s(7854),
          l = s(111),
          h = o.document,
          c = l(h) && l(h.createElement);
        i.exports = function (u) {
          return c ? h.createElement(u) : {};
        };
      },
      8324: (i) => {
        i.exports = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0,
        };
      },
      8509: (i, n, s) => {
        var o = s(317),
          l = o("span").classList,
          h = l && l.constructor && l.constructor.prototype;
        i.exports = h === Object.prototype ? void 0 : h;
      },
      7871: (i, n, s) => {
        var o = s(3823),
          l = s(5268);
        i.exports =
          !o && !l && typeof window == "object" && typeof document == "object";
      },
      3823: (i) => {
        i.exports =
          typeof Deno == "object" && Deno && typeof Deno.version == "object";
      },
      1528: (i, n, s) => {
        var o = s(8113),
          l = s(7854);
        i.exports = /ipad|iphone|ipod/i.test(o) && l.Pebble !== void 0;
      },
      6833: (i, n, s) => {
        var o = s(8113);
        i.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(o);
      },
      5268: (i, n, s) => {
        var o = s(4326),
          l = s(7854);
        i.exports = o(l.process) == "process";
      },
      1036: (i, n, s) => {
        var o = s(8113);
        i.exports = /web0s(?!.*chrome)/i.test(o);
      },
      8113: (i, n, s) => {
        var o = s(5005);
        i.exports = o("navigator", "userAgent") || "";
      },
      7392: (i, n, s) => {
        var o = s(7854),
          l = s(8113),
          h = o.process,
          c = o.Deno,
          u = (h && h.versions) || (c && c.version),
          d = u && u.v8,
          f,
          p;
        d &&
          ((f = d.split(".")), (p = f[0] > 0 && f[0] < 4 ? 1 : +(f[0] + f[1]))),
          !p &&
            l &&
            ((f = l.match(/Edge\/(\d+)/)),
            (!f || f[1] >= 74) &&
              ((f = l.match(/Chrome\/(\d+)/)), f && (p = +f[1]))),
          (i.exports = p);
      },
      748: (i) => {
        i.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
        ];
      },
      1060: (i, n, s) => {
        var o = s(1702),
          l = Error,
          h = o("".replace),
          c = (function (f) {
            return String(l(f).stack);
          })("zxcasd"),
          u = /\n\s*at [^:]*:[^\n]*/,
          d = u.test(c);
        i.exports = function (f, p) {
          if (d && typeof f == "string" && !l.prepareStackTrace)
            for (; p--; ) f = h(f, u, "");
          return f;
        };
      },
      2914: (i, n, s) => {
        var o = s(7293),
          l = s(9114);
        i.exports = !o(function () {
          var h = Error("a");
          return "stack" in h
            ? (Object.defineProperty(h, "stack", l(1, 7)), h.stack !== 7)
            : !0;
        });
      },
      2109: (i, n, s) => {
        var o = s(7854),
          l = s(1236).f,
          h = s(8880),
          c = s(8052),
          u = s(3072),
          d = s(9920),
          f = s(4705);
        i.exports = function (p, g) {
          var m = p.target,
            v = p.global,
            _ = p.stat,
            x,
            y,
            E,
            b,
            S,
            C;
          if (
            (v
              ? (y = o)
              : _
              ? (y = o[m] || u(m, {}))
              : (y = (o[m] || {}).prototype),
            y)
          )
            for (E in g) {
              if (
                ((S = g[E]),
                p.dontCallGetSet
                  ? ((C = l(y, E)), (b = C && C.value))
                  : (b = y[E]),
                (x = f(v ? E : m + (_ ? "." : "#") + E, p.forced)),
                !x && b !== void 0)
              ) {
                if (typeof S == typeof b) continue;
                d(S, b);
              }
              (p.sham || (b && b.sham)) && h(S, "sham", !0), c(y, E, S, p);
            }
        };
      },
      7293: (i) => {
        i.exports = function (n) {
          try {
            return !!n();
          } catch {
            return !0;
          }
        };
      },
      2104: (i, n, s) => {
        var o = s(4374),
          l = Function.prototype,
          h = l.apply,
          c = l.call;
        i.exports =
          (typeof Reflect == "object" && Reflect.apply) ||
          (o
            ? c.bind(h)
            : function () {
                return c.apply(h, arguments);
              });
      },
      9974: (i, n, s) => {
        var o = s(1470),
          l = s(9662),
          h = s(4374),
          c = o(o.bind);
        i.exports = function (u, d) {
          return (
            l(u),
            d === void 0
              ? u
              : h
              ? c(u, d)
              : function () {
                  return u.apply(d, arguments);
                }
          );
        };
      },
      4374: (i, n, s) => {
        var o = s(7293);
        i.exports = !o(function () {
          var l = function () {}.bind();
          return typeof l != "function" || l.hasOwnProperty("prototype");
        });
      },
      6916: (i, n, s) => {
        var o = s(4374),
          l = Function.prototype.call;
        i.exports = o
          ? l.bind(l)
          : function () {
              return l.apply(l, arguments);
            };
      },
      6530: (i, n, s) => {
        var o = s(9781),
          l = s(2597),
          h = Function.prototype,
          c = o && Object.getOwnPropertyDescriptor,
          u = l(h, "name"),
          d = u && function () {}.name === "something",
          f = u && (!o || (o && c(h, "name").configurable));
        i.exports = { EXISTS: u, PROPER: d, CONFIGURABLE: f };
      },
      1470: (i, n, s) => {
        var o = s(4326),
          l = s(1702);
        i.exports = function (h) {
          if (o(h) === "Function") return l(h);
        };
      },
      1702: (i, n, s) => {
        var o = s(4374),
          l = Function.prototype,
          h = l.call,
          c = o && l.bind.bind(h, h);
        i.exports = o
          ? c
          : function (u) {
              return function () {
                return h.apply(u, arguments);
              };
            };
      },
      5005: (i, n, s) => {
        var o = s(7854),
          l = s(614),
          h = function (c) {
            return l(c) ? c : void 0;
          };
        i.exports = function (c, u) {
          return arguments.length < 2 ? h(o[c]) : o[c] && o[c][u];
        };
      },
      1246: (i, n, s) => {
        var o = s(648),
          l = s(8173),
          h = s(8554),
          c = s(7497),
          u = s(5112),
          d = u("iterator");
        i.exports = function (f) {
          if (!h(f)) return l(f, d) || l(f, "@@iterator") || c[o(f)];
        };
      },
      4121: (i, n, s) => {
        var o = s(6916),
          l = s(9662),
          h = s(9670),
          c = s(6330),
          u = s(1246),
          d = TypeError;
        i.exports = function (f, p) {
          var g = arguments.length < 2 ? u(f) : p;
          if (l(g)) return h(o(g, f));
          throw d(c(f) + " is not iterable");
        };
      },
      8173: (i, n, s) => {
        var o = s(9662),
          l = s(8554);
        i.exports = function (h, c) {
          var u = h[c];
          return l(u) ? void 0 : o(u);
        };
      },
      7854: (i, n, s) => {
        var o = function (l) {
          return l && l.Math == Math && l;
        };
        i.exports =
          o(typeof globalThis == "object" && globalThis) ||
          o(typeof window == "object" && window) ||
          o(typeof self == "object" && self) ||
          o(typeof s.g == "object" && s.g) ||
          (function () {
            return this;
          })() ||
          Function("return this")();
      },
      2597: (i, n, s) => {
        var o = s(1702),
          l = s(7908),
          h = o({}.hasOwnProperty);
        i.exports =
          Object.hasOwn ||
          function (u, d) {
            return h(l(u), d);
          };
      },
      3501: (i) => {
        i.exports = {};
      },
      842: (i, n, s) => {
        var o = s(7854);
        i.exports = function (l, h) {
          var c = o.console;
          c && c.error && (arguments.length == 1 ? c.error(l) : c.error(l, h));
        };
      },
      490: (i, n, s) => {
        var o = s(5005);
        i.exports = o("document", "documentElement");
      },
      4664: (i, n, s) => {
        var o = s(9781),
          l = s(7293),
          h = s(317);
        i.exports =
          !o &&
          !l(function () {
            return (
              Object.defineProperty(h("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a != 7
            );
          });
      },
      8361: (i, n, s) => {
        var o = s(1702),
          l = s(7293),
          h = s(4326),
          c = Object,
          u = o("".split);
        i.exports = l(function () {
          return !c("z").propertyIsEnumerable(0);
        })
          ? function (d) {
              return h(d) == "String" ? u(d, "") : c(d);
            }
          : c;
      },
      9587: (i, n, s) => {
        var o = s(614),
          l = s(111),
          h = s(7674);
        i.exports = function (c, u, d) {
          var f, p;
          return (
            h &&
              o((f = u.constructor)) &&
              f !== d &&
              l((p = f.prototype)) &&
              p !== d.prototype &&
              h(c, p),
            c
          );
        };
      },
      2788: (i, n, s) => {
        var o = s(1702),
          l = s(614),
          h = s(5465),
          c = o(Function.toString);
        l(h.inspectSource) ||
          (h.inspectSource = function (u) {
            return c(u);
          }),
          (i.exports = h.inspectSource);
      },
      8340: (i, n, s) => {
        var o = s(111),
          l = s(8880);
        i.exports = function (h, c) {
          o(c) && "cause" in c && l(h, "cause", c.cause);
        };
      },
      9909: (i, n, s) => {
        var o = s(4811),
          l = s(7854),
          h = s(111),
          c = s(8880),
          u = s(2597),
          d = s(5465),
          f = s(6200),
          p = s(3501),
          g = "Object already initialized",
          m = l.TypeError,
          v = l.WeakMap,
          _,
          x,
          y,
          E = function (R) {
            return y(R) ? x(R) : _(R, {});
          },
          b = function (R) {
            return function (N) {
              var T;
              if (!h(N) || (T = x(N)).type !== R)
                throw m("Incompatible receiver, " + R + " required");
              return T;
            };
          };
        if (o || d.state) {
          var S = d.state || (d.state = new v());
          (S.get = S.get),
            (S.has = S.has),
            (S.set = S.set),
            (_ = function (R, N) {
              if (S.has(R)) throw m(g);
              return (N.facade = R), S.set(R, N), N;
            }),
            (x = function (R) {
              return S.get(R) || {};
            }),
            (y = function (R) {
              return S.has(R);
            });
        } else {
          var C = f("state");
          (p[C] = !0),
            (_ = function (R, N) {
              if (u(R, C)) throw m(g);
              return (N.facade = R), c(R, C, N), N;
            }),
            (x = function (R) {
              return u(R, C) ? R[C] : {};
            }),
            (y = function (R) {
              return u(R, C);
            });
        }
        i.exports = { set: _, get: x, has: y, enforce: E, getterFor: b };
      },
      7659: (i, n, s) => {
        var o = s(5112),
          l = s(7497),
          h = o("iterator"),
          c = Array.prototype;
        i.exports = function (u) {
          return u !== void 0 && (l.Array === u || c[h] === u);
        };
      },
      3157: (i, n, s) => {
        var o = s(4326);
        i.exports =
          Array.isArray ||
          function (h) {
            return o(h) == "Array";
          };
      },
      614: (i, n, s) => {
        var o = s(4154),
          l = o.all;
        i.exports = o.IS_HTMLDDA
          ? function (h) {
              return typeof h == "function" || h === l;
            }
          : function (h) {
              return typeof h == "function";
            };
      },
      4411: (i, n, s) => {
        var o = s(1702),
          l = s(7293),
          h = s(614),
          c = s(648),
          u = s(5005),
          d = s(2788),
          f = function () {},
          p = [],
          g = u("Reflect", "construct"),
          m = /^\s*(?:class|function)\b/,
          v = o(m.exec),
          _ = !m.exec(f),
          x = function (b) {
            if (!h(b)) return !1;
            try {
              return g(f, p, b), !0;
            } catch {
              return !1;
            }
          },
          y = function (b) {
            if (!h(b)) return !1;
            switch (c(b)) {
              case "AsyncFunction":
              case "GeneratorFunction":
              case "AsyncGeneratorFunction":
                return !1;
            }
            try {
              return _ || !!v(m, d(b));
            } catch {
              return !0;
            }
          };
        (y.sham = !0),
          (i.exports =
            !g ||
            l(function () {
              var E;
              return (
                x(x.call) ||
                !x(Object) ||
                !x(function () {
                  E = !0;
                }) ||
                E
              );
            })
              ? y
              : x);
      },
      4705: (i, n, s) => {
        var o = s(7293),
          l = s(614),
          h = /#|\.prototype\./,
          c = function (g, m) {
            var v = d[u(g)];
            return v == p ? !0 : v == f ? !1 : l(m) ? o(m) : !!m;
          },
          u = (c.normalize = function (g) {
            return String(g).replace(h, ".").toLowerCase();
          }),
          d = (c.data = {}),
          f = (c.NATIVE = "N"),
          p = (c.POLYFILL = "P");
        i.exports = c;
      },
      8554: (i) => {
        i.exports = function (n) {
          return n == null;
        };
      },
      111: (i, n, s) => {
        var o = s(614),
          l = s(4154),
          h = l.all;
        i.exports = l.IS_HTMLDDA
          ? function (c) {
              return typeof c == "object" ? c !== null : o(c) || c === h;
            }
          : function (c) {
              return typeof c == "object" ? c !== null : o(c);
            };
      },
      1913: (i) => {
        i.exports = !1;
      },
      2190: (i, n, s) => {
        var o = s(5005),
          l = s(614),
          h = s(7976),
          c = s(3307),
          u = Object;
        i.exports = c
          ? function (d) {
              return typeof d == "symbol";
            }
          : function (d) {
              var f = o("Symbol");
              return l(f) && h(f.prototype, u(d));
            };
      },
      408: (i, n, s) => {
        var o = s(9974),
          l = s(6916),
          h = s(9670),
          c = s(6330),
          u = s(7659),
          d = s(6244),
          f = s(7976),
          p = s(4121),
          g = s(1246),
          m = s(9212),
          v = TypeError,
          _ = function (y, E) {
            (this.stopped = y), (this.result = E);
          },
          x = _.prototype;
        i.exports = function (y, E, b) {
          var S = b && b.that,
            C = !!(b && b.AS_ENTRIES),
            R = !!(b && b.IS_RECORD),
            N = !!(b && b.IS_ITERATOR),
            T = !!(b && b.INTERRUPTED),
            w = o(E, S),
            P,
            O,
            M,
            I,
            D,
            $,
            U,
            z = function (B) {
              return P && m(P, "normal", B), new _(!0, B);
            },
            k = function (B) {
              return C
                ? (h(B), T ? w(B[0], B[1], z) : w(B[0], B[1]))
                : T
                ? w(B, z)
                : w(B);
            };
          if (R) P = y.iterator;
          else if (N) P = y;
          else {
            if (((O = g(y)), !O)) throw v(c(y) + " is not iterable");
            if (u(O)) {
              for (M = 0, I = d(y); I > M; M++)
                if (((D = k(y[M])), D && f(x, D))) return D;
              return new _(!1);
            }
            P = p(y, O);
          }
          for ($ = R ? y.next : P.next; !(U = l($, P)).done; ) {
            try {
              D = k(U.value);
            } catch (B) {
              m(P, "throw", B);
            }
            if (typeof D == "object" && D && f(x, D)) return D;
          }
          return new _(!1);
        };
      },
      9212: (i, n, s) => {
        var o = s(6916),
          l = s(9670),
          h = s(8173);
        i.exports = function (c, u, d) {
          var f, p;
          l(c);
          try {
            if (((f = h(c, "return")), !f)) {
              if (u === "throw") throw d;
              return d;
            }
            f = o(f, c);
          } catch (g) {
            (p = !0), (f = g);
          }
          if (u === "throw") throw d;
          if (p) throw f;
          return l(f), d;
        };
      },
      7497: (i) => {
        i.exports = {};
      },
      6244: (i, n, s) => {
        var o = s(7466);
        i.exports = function (l) {
          return o(l.length);
        };
      },
      6339: (i, n, s) => {
        var o = s(7293),
          l = s(614),
          h = s(2597),
          c = s(9781),
          u = s(6530).CONFIGURABLE,
          d = s(2788),
          f = s(9909),
          p = f.enforce,
          g = f.get,
          m = Object.defineProperty,
          v =
            c &&
            !o(function () {
              return m(function () {}, "length", { value: 8 }).length !== 8;
            }),
          _ = String(String).split("String"),
          x = (i.exports = function (y, E, b) {
            String(E).slice(0, 7) === "Symbol(" &&
              (E = "[" + String(E).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
              b && b.getter && (E = "get " + E),
              b && b.setter && (E = "set " + E),
              (!h(y, "name") || (u && y.name !== E)) &&
                (c
                  ? m(y, "name", { value: E, configurable: !0 })
                  : (y.name = E)),
              v &&
                b &&
                h(b, "arity") &&
                y.length !== b.arity &&
                m(y, "length", { value: b.arity });
            try {
              b && h(b, "constructor") && b.constructor
                ? c && m(y, "prototype", { writable: !1 })
                : y.prototype && (y.prototype = void 0);
            } catch {}
            var S = p(y);
            return (
              h(S, "source") ||
                (S.source = _.join(typeof E == "string" ? E : "")),
              y
            );
          });
        Function.prototype.toString = x(function () {
          return (l(this) && g(this).source) || d(this);
        }, "toString");
      },
      4758: (i) => {
        var n = Math.ceil,
          s = Math.floor;
        i.exports =
          Math.trunc ||
          function (l) {
            var h = +l;
            return (h > 0 ? s : n)(h);
          };
      },
      5948: (i, n, s) => {
        var o = s(7854),
          l = s(9974),
          h = s(1236).f,
          c = s(261).set,
          u = s(6833),
          d = s(1528),
          f = s(1036),
          p = s(5268),
          g = o.MutationObserver || o.WebKitMutationObserver,
          m = o.document,
          v = o.process,
          _ = o.Promise,
          x = h(o, "queueMicrotask"),
          y = x && x.value,
          E,
          b,
          S,
          C,
          R,
          N,
          T,
          w;
        y ||
          ((E = function () {
            var P, O;
            for (p && (P = v.domain) && P.exit(); b; ) {
              (O = b.fn), (b = b.next);
              try {
                O();
              } catch (M) {
                throw (b ? C() : (S = void 0), M);
              }
            }
            (S = void 0), P && P.enter();
          }),
          !u && !p && !f && g && m
            ? ((R = !0),
              (N = m.createTextNode("")),
              new g(E).observe(N, { characterData: !0 }),
              (C = function () {
                N.data = R = !R;
              }))
            : !d && _ && _.resolve
            ? ((T = _.resolve(void 0)),
              (T.constructor = _),
              (w = l(T.then, T)),
              (C = function () {
                w(E);
              }))
            : p
            ? (C = function () {
                v.nextTick(E);
              })
            : ((c = l(c, o)),
              (C = function () {
                c(E);
              }))),
          (i.exports =
            y ||
            function (P) {
              var O = { fn: P, next: void 0 };
              S && (S.next = O), b || ((b = O), C()), (S = O);
            });
      },
      8523: (i, n, s) => {
        var o = s(9662),
          l = TypeError,
          h = function (c) {
            var u, d;
            (this.promise = new c(function (f, p) {
              if (u !== void 0 || d !== void 0)
                throw l("Bad Promise constructor");
              (u = f), (d = p);
            })),
              (this.resolve = o(u)),
              (this.reject = o(d));
          };
        i.exports.f = function (c) {
          return new h(c);
        };
      },
      6277: (i, n, s) => {
        var o = s(1340);
        i.exports = function (l, h) {
          return l === void 0 ? (arguments.length < 2 ? "" : h) : o(l);
        };
      },
      3070: (i, n, s) => {
        var o = s(9781),
          l = s(4664),
          h = s(3353),
          c = s(9670),
          u = s(4948),
          d = TypeError,
          f = Object.defineProperty,
          p = Object.getOwnPropertyDescriptor,
          g = "enumerable",
          m = "configurable",
          v = "writable";
        n.f = o
          ? h
            ? function (x, y, E) {
                if (
                  (c(x),
                  (y = u(y)),
                  c(E),
                  typeof x == "function" &&
                    y === "prototype" &&
                    "value" in E &&
                    v in E &&
                    !E[v])
                ) {
                  var b = p(x, y);
                  b &&
                    b[v] &&
                    ((x[y] = E.value),
                    (E = {
                      configurable: m in E ? E[m] : b[m],
                      enumerable: g in E ? E[g] : b[g],
                      writable: !1,
                    }));
                }
                return f(x, y, E);
              }
            : f
          : function (x, y, E) {
              if ((c(x), (y = u(y)), c(E), l))
                try {
                  return f(x, y, E);
                } catch {}
              if ("get" in E || "set" in E) throw d("Accessors not supported");
              return "value" in E && (x[y] = E.value), x;
            };
      },
      1236: (i, n, s) => {
        var o = s(9781),
          l = s(6916),
          h = s(5296),
          c = s(9114),
          u = s(5656),
          d = s(4948),
          f = s(2597),
          p = s(4664),
          g = Object.getOwnPropertyDescriptor;
        n.f = o
          ? g
          : function (v, _) {
              if (((v = u(v)), (_ = d(_)), p))
                try {
                  return g(v, _);
                } catch {}
              if (f(v, _)) return c(!l(h.f, v, _), v[_]);
            };
      },
      8006: (i, n, s) => {
        var o = s(6324),
          l = s(748),
          h = l.concat("length", "prototype");
        n.f =
          Object.getOwnPropertyNames ||
          function (u) {
            return o(u, h);
          };
      },
      5181: (i, n) => {
        n.f = Object.getOwnPropertySymbols;
      },
      7976: (i, n, s) => {
        var o = s(1702);
        i.exports = o({}.isPrototypeOf);
      },
      6324: (i, n, s) => {
        var o = s(1702),
          l = s(2597),
          h = s(5656),
          c = s(1318).indexOf,
          u = s(3501),
          d = o([].push);
        i.exports = function (f, p) {
          var g = h(f),
            m = 0,
            v = [],
            _;
          for (_ in g) !l(u, _) && l(g, _) && d(v, _);
          for (; p.length > m; ) l(g, (_ = p[m++])) && (~c(v, _) || d(v, _));
          return v;
        };
      },
      1956: (i, n, s) => {
        var o = s(6324),
          l = s(748);
        i.exports =
          Object.keys ||
          function (c) {
            return o(c, l);
          };
      },
      5296: (i, n) => {
        var s = {}.propertyIsEnumerable,
          o = Object.getOwnPropertyDescriptor,
          l = o && !s.call({ 1: 2 }, 1);
        n.f = l
          ? function (c) {
              var u = o(this, c);
              return !!u && u.enumerable;
            }
          : s;
      },
      7674: (i, n, s) => {
        var o = s(1702),
          l = s(9670),
          h = s(6077);
        i.exports =
          Object.setPrototypeOf ||
          ("__proto__" in {}
            ? (function () {
                var c = !1,
                  u = {},
                  d;
                try {
                  (d = o(
                    Object.getOwnPropertyDescriptor(
                      Object.prototype,
                      "__proto__"
                    ).set
                  )),
                    d(u, []),
                    (c = u instanceof Array);
                } catch {}
                return function (p, g) {
                  return l(p), h(g), c ? d(p, g) : (p.__proto__ = g), p;
                };
              })()
            : void 0);
      },
      288: (i, n, s) => {
        var o = s(1694),
          l = s(648);
        i.exports = o
          ? {}.toString
          : function () {
              return "[object " + l(this) + "]";
            };
      },
      2140: (i, n, s) => {
        var o = s(6916),
          l = s(614),
          h = s(111),
          c = TypeError;
        i.exports = function (u, d) {
          var f, p;
          if (
            (d === "string" && l((f = u.toString)) && !h((p = o(f, u)))) ||
            (l((f = u.valueOf)) && !h((p = o(f, u)))) ||
            (d !== "string" && l((f = u.toString)) && !h((p = o(f, u))))
          )
            return p;
          throw c("Can't convert object to primitive value");
        };
      },
      3887: (i, n, s) => {
        var o = s(5005),
          l = s(1702),
          h = s(8006),
          c = s(5181),
          u = s(9670),
          d = l([].concat);
        i.exports =
          o("Reflect", "ownKeys") ||
          function (p) {
            var g = h.f(u(p)),
              m = c.f;
            return m ? d(g, m(p)) : g;
          };
      },
      2534: (i) => {
        i.exports = function (n) {
          try {
            return { error: !1, value: n() };
          } catch (s) {
            return { error: !0, value: s };
          }
        };
      },
      3702: (i, n, s) => {
        var o = s(7854),
          l = s(2492),
          h = s(614),
          c = s(4705),
          u = s(2788),
          d = s(5112),
          f = s(7871),
          p = s(3823),
          g = s(1913),
          m = s(7392),
          v = l && l.prototype,
          _ = d("species"),
          x = !1,
          y = h(o.PromiseRejectionEvent),
          E = c("Promise", function () {
            var b = u(l),
              S = b !== String(l);
            if ((!S && m === 66) || (g && !(v.catch && v.finally))) return !0;
            if (!m || m < 51 || !/native code/.test(b)) {
              var C = new l(function (T) {
                  T(1);
                }),
                R = function (T) {
                  T(
                    function () {},
                    function () {}
                  );
                },
                N = (C.constructor = {});
              if (((N[_] = R), (x = C.then(function () {}) instanceof R), !x))
                return !0;
            }
            return !S && (f || p) && !y;
          });
        i.exports = { CONSTRUCTOR: E, REJECTION_EVENT: y, SUBCLASSING: x };
      },
      2492: (i, n, s) => {
        var o = s(7854);
        i.exports = o.Promise;
      },
      9478: (i, n, s) => {
        var o = s(9670),
          l = s(111),
          h = s(8523);
        i.exports = function (c, u) {
          if ((o(c), l(u) && u.constructor === c)) return u;
          var d = h.f(c),
            f = d.resolve;
          return f(u), d.promise;
        };
      },
      612: (i, n, s) => {
        var o = s(2492),
          l = s(7072),
          h = s(3702).CONSTRUCTOR;
        i.exports =
          h ||
          !l(function (c) {
            o.all(c).then(void 0, function () {});
          });
      },
      2626: (i, n, s) => {
        var o = s(3070).f;
        i.exports = function (l, h, c) {
          c in l ||
            o(l, c, {
              configurable: !0,
              get: function () {
                return h[c];
              },
              set: function (u) {
                h[c] = u;
              },
            });
        };
      },
      8572: (i) => {
        var n = function () {
          (this.head = null), (this.tail = null);
        };
        (n.prototype = {
          add: function (s) {
            var o = { item: s, next: null };
            this.head ? (this.tail.next = o) : (this.head = o), (this.tail = o);
          },
          get: function () {
            var s = this.head;
            if (s)
              return (
                (this.head = s.next),
                this.tail === s && (this.tail = null),
                s.item
              );
          },
        }),
          (i.exports = n);
      },
      4488: (i, n, s) => {
        var o = s(8554),
          l = TypeError;
        i.exports = function (h) {
          if (o(h)) throw l("Can't call method on " + h);
          return h;
        };
      },
      6340: (i, n, s) => {
        var o = s(5005),
          l = s(3070),
          h = s(5112),
          c = s(9781),
          u = h("species");
        i.exports = function (d) {
          var f = o(d),
            p = l.f;
          c &&
            f &&
            !f[u] &&
            p(f, u, {
              configurable: !0,
              get: function () {
                return this;
              },
            });
        };
      },
      8003: (i, n, s) => {
        var o = s(3070).f,
          l = s(2597),
          h = s(5112),
          c = h("toStringTag");
        i.exports = function (u, d, f) {
          u && !f && (u = u.prototype),
            u && !l(u, c) && o(u, c, { configurable: !0, value: d });
        };
      },
      6200: (i, n, s) => {
        var o = s(2309),
          l = s(9711),
          h = o("keys");
        i.exports = function (c) {
          return h[c] || (h[c] = l(c));
        };
      },
      5465: (i, n, s) => {
        var o = s(7854),
          l = s(3072),
          h = "__core-js_shared__",
          c = o[h] || l(h, {});
        i.exports = c;
      },
      2309: (i, n, s) => {
        var o = s(1913),
          l = s(5465);
        (i.exports = function (h, c) {
          return l[h] || (l[h] = c !== void 0 ? c : {});
        })("versions", []).push({
          version: "3.26.1",
          mode: o ? "pure" : "global",
          copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
          license: "https://github.com/zloirock/core-js/blob/v3.26.1/LICENSE",
          source: "https://github.com/zloirock/core-js",
        });
      },
      6707: (i, n, s) => {
        var o = s(9670),
          l = s(9483),
          h = s(8554),
          c = s(5112),
          u = c("species");
        i.exports = function (d, f) {
          var p = o(d).constructor,
            g;
          return p === void 0 || h((g = o(p)[u])) ? f : l(g);
        };
      },
      6293: (i, n, s) => {
        var o = s(7392),
          l = s(7293);
        i.exports =
          !!Object.getOwnPropertySymbols &&
          !l(function () {
            var h = Symbol();
            return (
              !String(h) ||
              !(Object(h) instanceof Symbol) ||
              (!Symbol.sham && o && o < 41)
            );
          });
      },
      261: (i, n, s) => {
        var o = s(7854),
          l = s(2104),
          h = s(9974),
          c = s(614),
          u = s(2597),
          d = s(7293),
          f = s(490),
          p = s(206),
          g = s(317),
          m = s(8053),
          v = s(6833),
          _ = s(5268),
          x = o.setImmediate,
          y = o.clearImmediate,
          E = o.process,
          b = o.Dispatch,
          S = o.Function,
          C = o.MessageChannel,
          R = o.String,
          N = 0,
          T = {},
          w = "onreadystatechange",
          P,
          O,
          M,
          I;
        try {
          P = o.location;
        } catch {}
        var D = function (k) {
            if (u(T, k)) {
              var B = T[k];
              delete T[k], B();
            }
          },
          $ = function (k) {
            return function () {
              D(k);
            };
          },
          U = function (k) {
            D(k.data);
          },
          z = function (k) {
            o.postMessage(R(k), P.protocol + "//" + P.host);
          };
        (!x || !y) &&
          ((x = function (B) {
            m(arguments.length, 1);
            var tt = c(B) ? B : S(B),
              X = p(arguments, 1);
            return (
              (T[++N] = function () {
                l(tt, void 0, X);
              }),
              O(N),
              N
            );
          }),
          (y = function (B) {
            delete T[B];
          }),
          _
            ? (O = function (k) {
                E.nextTick($(k));
              })
            : b && b.now
            ? (O = function (k) {
                b.now($(k));
              })
            : C && !v
            ? ((M = new C()),
              (I = M.port2),
              (M.port1.onmessage = U),
              (O = h(I.postMessage, I)))
            : o.addEventListener &&
              c(o.postMessage) &&
              !o.importScripts &&
              P &&
              P.protocol !== "file:" &&
              !d(z)
            ? ((O = z), o.addEventListener("message", U, !1))
            : w in g("script")
            ? (O = function (k) {
                f.appendChild(g("script"))[w] = function () {
                  f.removeChild(this), D(k);
                };
              })
            : (O = function (k) {
                setTimeout($(k), 0);
              })),
          (i.exports = { set: x, clear: y });
      },
      1400: (i, n, s) => {
        var o = s(9303),
          l = Math.max,
          h = Math.min;
        i.exports = function (c, u) {
          var d = o(c);
          return d < 0 ? l(d + u, 0) : h(d, u);
        };
      },
      5656: (i, n, s) => {
        var o = s(8361),
          l = s(4488);
        i.exports = function (h) {
          return o(l(h));
        };
      },
      9303: (i, n, s) => {
        var o = s(4758);
        i.exports = function (l) {
          var h = +l;
          return h !== h || h === 0 ? 0 : o(h);
        };
      },
      7466: (i, n, s) => {
        var o = s(9303),
          l = Math.min;
        i.exports = function (h) {
          return h > 0 ? l(o(h), 9007199254740991) : 0;
        };
      },
      7908: (i, n, s) => {
        var o = s(4488),
          l = Object;
        i.exports = function (h) {
          return l(o(h));
        };
      },
      7593: (i, n, s) => {
        var o = s(6916),
          l = s(111),
          h = s(2190),
          c = s(8173),
          u = s(2140),
          d = s(5112),
          f = TypeError,
          p = d("toPrimitive");
        i.exports = function (g, m) {
          if (!l(g) || h(g)) return g;
          var v = c(g, p),
            _;
          if (v) {
            if (
              (m === void 0 && (m = "default"), (_ = o(v, g, m)), !l(_) || h(_))
            )
              return _;
            throw f("Can't convert object to primitive value");
          }
          return m === void 0 && (m = "number"), u(g, m);
        };
      },
      4948: (i, n, s) => {
        var o = s(7593),
          l = s(2190);
        i.exports = function (h) {
          var c = o(h, "string");
          return l(c) ? c : c + "";
        };
      },
      1694: (i, n, s) => {
        var o = s(5112),
          l = o("toStringTag"),
          h = {};
        (h[l] = "z"), (i.exports = String(h) === "[object z]");
      },
      1340: (i, n, s) => {
        var o = s(648),
          l = String;
        i.exports = function (h) {
          if (o(h) === "Symbol")
            throw TypeError("Cannot convert a Symbol value to a string");
          return l(h);
        };
      },
      6330: (i) => {
        var n = String;
        i.exports = function (s) {
          try {
            return n(s);
          } catch {
            return "Object";
          }
        };
      },
      9711: (i, n, s) => {
        var o = s(1702),
          l = 0,
          h = Math.random(),
          c = o((1).toString);
        i.exports = function (u) {
          return "Symbol(" + (u === void 0 ? "" : u) + ")_" + c(++l + h, 36);
        };
      },
      3307: (i, n, s) => {
        var o = s(6293);
        i.exports = o && !Symbol.sham && typeof Symbol.iterator == "symbol";
      },
      3353: (i, n, s) => {
        var o = s(9781),
          l = s(7293);
        i.exports =
          o &&
          l(function () {
            return (
              Object.defineProperty(function () {}, "prototype", {
                value: 42,
                writable: !1,
              }).prototype != 42
            );
          });
      },
      8053: (i) => {
        var n = TypeError;
        i.exports = function (s, o) {
          if (s < o) throw n("Not enough arguments");
          return s;
        };
      },
      4811: (i, n, s) => {
        var o = s(7854),
          l = s(614),
          h = o.WeakMap;
        i.exports = l(h) && /native code/.test(String(h));
      },
      5112: (i, n, s) => {
        var o = s(7854),
          l = s(2309),
          h = s(2597),
          c = s(9711),
          u = s(6293),
          d = s(3307),
          f = l("wks"),
          p = o.Symbol,
          g = p && p.for,
          m = d ? p : (p && p.withoutSetter) || c;
        i.exports = function (v) {
          if (!h(f, v) || !(u || typeof f[v] == "string")) {
            var _ = "Symbol." + v;
            u && h(p, v)
              ? (f[v] = p[v])
              : d && g
              ? (f[v] = g(_))
              : (f[v] = m(_));
          }
          return f[v];
        };
      },
      9191: (i, n, s) => {
        var o = s(5005),
          l = s(2597),
          h = s(8880),
          c = s(7976),
          u = s(7674),
          d = s(9920),
          f = s(2626),
          p = s(9587),
          g = s(6277),
          m = s(8340),
          v = s(1060),
          _ = s(2914),
          x = s(9781),
          y = s(1913);
        i.exports = function (E, b, S, C) {
          var R = "stackTraceLimit",
            N = C ? 2 : 1,
            T = E.split("."),
            w = T[T.length - 1],
            P = o.apply(null, T);
          if (!!P) {
            var O = P.prototype;
            if ((!y && l(O, "cause") && delete O.cause, !S)) return P;
            var M = o("Error"),
              I = b(function (D, $) {
                var U = g(C ? $ : D, void 0),
                  z = C ? new P(D) : new P();
                return (
                  U !== void 0 && h(z, "message", U),
                  _ && h(z, "stack", v(z.stack, 2)),
                  this && c(O, this) && p(z, this, I),
                  arguments.length > N && m(z, arguments[N]),
                  z
                );
              });
            if (
              ((I.prototype = O),
              w !== "Error"
                ? u
                  ? u(I, M)
                  : d(I, M, { name: !0 })
                : x && R in P && (f(I, P, R), f(I, P, "prepareStackTrace")),
              d(I, P),
              !y)
            )
              try {
                O.name !== w && h(O, "name", w), (O.constructor = I);
              } catch {}
            return I;
          }
        };
      },
      1703: (i, n, s) => {
        var o = s(2109),
          l = s(7854),
          h = s(2104),
          c = s(9191),
          u = "WebAssembly",
          d = l[u],
          f = Error("e", { cause: 7 }).cause !== 7,
          p = function (m, v) {
            var _ = {};
            (_[m] = c(m, v, f)),
              o({ global: !0, constructor: !0, arity: 1, forced: f }, _);
          },
          g = function (m, v) {
            if (d && d[m]) {
              var _ = {};
              (_[m] = c(u + "." + m, v, f)),
                o(
                  { target: u, stat: !0, constructor: !0, arity: 1, forced: f },
                  _
                );
            }
          };
        p("Error", function (m) {
          return function (_) {
            return h(m, this, arguments);
          };
        }),
          p("EvalError", function (m) {
            return function (_) {
              return h(m, this, arguments);
            };
          }),
          p("RangeError", function (m) {
            return function (_) {
              return h(m, this, arguments);
            };
          }),
          p("ReferenceError", function (m) {
            return function (_) {
              return h(m, this, arguments);
            };
          }),
          p("SyntaxError", function (m) {
            return function (_) {
              return h(m, this, arguments);
            };
          }),
          p("TypeError", function (m) {
            return function (_) {
              return h(m, this, arguments);
            };
          }),
          p("URIError", function (m) {
            return function (_) {
              return h(m, this, arguments);
            };
          }),
          g("CompileError", function (m) {
            return function (_) {
              return h(m, this, arguments);
            };
          }),
          g("LinkError", function (m) {
            return function (_) {
              return h(m, this, arguments);
            };
          }),
          g("RuntimeError", function (m) {
            return function (_) {
              return h(m, this, arguments);
            };
          });
      },
      8862: (i, n, s) => {
        var o = s(2109),
          l = s(5005),
          h = s(2104),
          c = s(6916),
          u = s(1702),
          d = s(7293),
          f = s(3157),
          p = s(614),
          g = s(111),
          m = s(2190),
          v = s(206),
          _ = s(6293),
          x = l("JSON", "stringify"),
          y = u(/./.exec),
          E = u("".charAt),
          b = u("".charCodeAt),
          S = u("".replace),
          C = u((1).toString),
          R = /[\uD800-\uDFFF]/g,
          N = /^[\uD800-\uDBFF]$/,
          T = /^[\uDC00-\uDFFF]$/,
          w =
            !_ ||
            d(function () {
              var I = l("Symbol")();
              return (
                x([I]) != "[null]" ||
                x({ a: I }) != "{}" ||
                x(Object(I)) != "{}"
              );
            }),
          P = d(function () {
            return (
              x("\uDF06\uD834") !== '"\\udf06\\ud834"' ||
              x("\uDEAD") !== '"\\udead"'
            );
          }),
          O = function (I, D) {
            var $ = v(arguments),
              U = D;
            if (!((!g(D) && I === void 0) || m(I)))
              return (
                f(D) ||
                  (D = function (z, k) {
                    if ((p(U) && (k = c(U, this, z, k)), !m(k))) return k;
                  }),
                ($[1] = D),
                h(x, null, $)
              );
          },
          M = function (I, D, $) {
            var U = E($, D - 1),
              z = E($, D + 1);
            return (y(N, I) && !y(T, z)) || (y(T, I) && !y(N, U))
              ? "\\u" + C(b(I, 0), 16)
              : I;
          };
        x &&
          o(
            { target: "JSON", stat: !0, arity: 3, forced: w || P },
            {
              stringify: function (D, $, U) {
                var z = v(arguments),
                  k = h(w ? O : x, null, z);
                return P && typeof k == "string" ? S(k, R, M) : k;
              },
            }
          );
      },
      9070: (i, n, s) => {
        var o = s(2109),
          l = s(9781),
          h = s(3070).f;
        o(
          {
            target: "Object",
            stat: !0,
            forced: Object.defineProperty !== h,
            sham: !l,
          },
          { defineProperty: h }
        );
      },
      7941: (i, n, s) => {
        var o = s(2109),
          l = s(7908),
          h = s(1956),
          c = s(7293),
          u = c(function () {
            h(1);
          });
        o(
          { target: "Object", stat: !0, forced: u },
          {
            keys: function (f) {
              return h(l(f));
            },
          }
        );
      },
      1539: (i, n, s) => {
        var o = s(1694),
          l = s(8052),
          h = s(288);
        o || l(Object.prototype, "toString", h, { unsafe: !0 });
      },
      821: (i, n, s) => {
        var o = s(2109),
          l = s(6916),
          h = s(9662),
          c = s(8523),
          u = s(2534),
          d = s(408),
          f = s(612);
        o(
          { target: "Promise", stat: !0, forced: f },
          {
            all: function (g) {
              var m = this,
                v = c.f(m),
                _ = v.resolve,
                x = v.reject,
                y = u(function () {
                  var E = h(m.resolve),
                    b = [],
                    S = 0,
                    C = 1;
                  d(g, function (R) {
                    var N = S++,
                      T = !1;
                    C++,
                      l(E, m, R).then(function (w) {
                        T || ((T = !0), (b[N] = w), --C || _(b));
                      }, x);
                  }),
                    --C || _(b);
                });
              return y.error && x(y.value), v.promise;
            },
          }
        );
      },
      4164: (i, n, s) => {
        var o = s(2109),
          l = s(1913),
          h = s(3702).CONSTRUCTOR,
          c = s(2492),
          u = s(5005),
          d = s(614),
          f = s(8052),
          p = c && c.prototype;
        if (
          (o(
            { target: "Promise", proto: !0, forced: h, real: !0 },
            {
              catch: function (m) {
                return this.then(void 0, m);
              },
            }
          ),
          !l && d(c))
        ) {
          var g = u("Promise").prototype.catch;
          p.catch !== g && f(p, "catch", g, { unsafe: !0 });
        }
      },
      3401: (i, n, s) => {
        var o = s(2109),
          l = s(1913),
          h = s(5268),
          c = s(7854),
          u = s(6916),
          d = s(8052),
          f = s(7674),
          p = s(8003),
          g = s(6340),
          m = s(9662),
          v = s(614),
          _ = s(111),
          x = s(5787),
          y = s(6707),
          E = s(261).set,
          b = s(5948),
          S = s(842),
          C = s(2534),
          R = s(8572),
          N = s(9909),
          T = s(2492),
          w = s(3702),
          P = s(8523),
          O = "Promise",
          M = w.CONSTRUCTOR,
          I = w.REJECTION_EVENT,
          D = w.SUBCLASSING,
          $ = N.getterFor(O),
          U = N.set,
          z = T && T.prototype,
          k = T,
          B = z,
          tt = c.TypeError,
          X = c.document,
          Z = c.process,
          et = P.f,
          J = et,
          H = !!(X && X.createEvent && c.dispatchEvent),
          st = "unhandledrejection",
          dt = "rejectionhandled",
          nt = 0,
          ht = 1,
          K = 2,
          W = 1,
          it = 2,
          rt,
          kt,
          fs,
          Me,
          xt = function (L) {
            var V;
            return _(L) && v((V = L.then)) ? V : !1;
          },
          Wt = function (L, V) {
            var G = V.value,
              Y = V.state == ht,
              Q = Y ? L.ok : L.fail,
              Zt = L.resolve,
              ke = L.reject,
              qt = L.domain,
              te,
              ii,
              ri;
            try {
              Q
                ? (Y || (V.rejection === it && De(V), (V.rejection = W)),
                  Q === !0
                    ? (te = G)
                    : (qt && qt.enter(),
                      (te = Q(G)),
                      qt && (qt.exit(), (ri = !0))),
                  te === L.promise
                    ? ke(tt("Promise-chain cycle"))
                    : (ii = xt(te))
                    ? u(ii, te, Zt, ke)
                    : Zt(te))
                : ke(G);
            } catch (ln) {
              qt && !ri && qt.exit(), ke(ln);
            }
          },
          _e = function (L, V) {
            L.notified ||
              ((L.notified = !0),
              b(function () {
                for (var G = L.reactions, Y; (Y = G.get()); ) Wt(Y, L);
                (L.notified = !1), V && !L.rejection && be(L);
              }));
          },
          ye = function (L, V, G) {
            var Y, Q;
            H
              ? ((Y = X.createEvent("Event")),
                (Y.promise = V),
                (Y.reason = G),
                Y.initEvent(L, !1, !0),
                c.dispatchEvent(Y))
              : (Y = { promise: V, reason: G }),
              !I && (Q = c["on" + L])
                ? Q(Y)
                : L === st && S("Unhandled promise rejection", G);
          },
          be = function (L) {
            u(E, c, function () {
              var V = L.facade,
                G = L.value,
                Y = Ee(L),
                Q;
              if (
                Y &&
                ((Q = C(function () {
                  h ? Z.emit("unhandledRejection", G, V) : ye(st, V, G);
                })),
                (L.rejection = h || Ee(L) ? it : W),
                Q.error)
              )
                throw Q.value;
            });
          },
          Ee = function (L) {
            return L.rejection !== W && !L.parent;
          },
          De = function (L) {
            u(E, c, function () {
              var V = L.facade;
              h ? Z.emit("rejectionHandled", V) : ye(dt, V, L.value);
            });
          },
          Ct = function (L, V, G) {
            return function (Y) {
              L(V, Y, G);
            };
          },
          Pt = function (L, V, G) {
            L.done ||
              ((L.done = !0),
              G && (L = G),
              (L.value = V),
              (L.state = K),
              _e(L, !0));
          },
          ps = function (L, V, G) {
            if (!L.done) {
              (L.done = !0), G && (L = G);
              try {
                if (L.facade === V)
                  throw tt("Promise can't be resolved itself");
                var Y = xt(V);
                Y
                  ? b(function () {
                      var Q = { done: !1 };
                      try {
                        u(Y, V, Ct(ps, Q, L), Ct(Pt, Q, L));
                      } catch (Zt) {
                        Pt(Q, Zt, L);
                      }
                    })
                  : ((L.value = V), (L.state = ht), _e(L, !1));
              } catch (Q) {
                Pt({ done: !1 }, Q, L);
              }
            }
          };
        if (
          M &&
          ((k = function (V) {
            x(this, B), m(V), u(rt, this);
            var G = $(this);
            try {
              V(Ct(ps, G), Ct(Pt, G));
            } catch (Y) {
              Pt(G, Y);
            }
          }),
          (B = k.prototype),
          (rt = function (V) {
            U(this, {
              type: O,
              done: !1,
              notified: !1,
              parent: !1,
              reactions: new R(),
              rejection: !1,
              state: nt,
              value: void 0,
            });
          }),
          (rt.prototype = d(B, "then", function (V, G) {
            var Y = $(this),
              Q = et(y(this, k));
            return (
              (Y.parent = !0),
              (Q.ok = v(V) ? V : !0),
              (Q.fail = v(G) && G),
              (Q.domain = h ? Z.domain : void 0),
              Y.state == nt
                ? Y.reactions.add(Q)
                : b(function () {
                    Wt(Q, Y);
                  }),
              Q.promise
            );
          })),
          (kt = function () {
            var L = new rt(),
              V = $(L);
            (this.promise = L),
              (this.resolve = Ct(ps, V)),
              (this.reject = Ct(Pt, V));
          }),
          (P.f = et =
            function (L) {
              return L === k || L === fs ? new kt(L) : J(L);
            }),
          !l && v(T) && z !== Object.prototype)
        ) {
          (Me = z.then),
            D ||
              d(
                z,
                "then",
                function (V, G) {
                  var Y = this;
                  return new k(function (Q, Zt) {
                    u(Me, Y, Q, Zt);
                  }).then(V, G);
                },
                { unsafe: !0 }
              );
          try {
            delete z.constructor;
          } catch {}
          f && f(z, B);
        }
        o({ global: !0, constructor: !0, wrap: !0, forced: M }, { Promise: k }),
          p(k, O, !1, !0),
          g(O);
      },
      8674: (i, n, s) => {
        s(3401), s(821), s(4164), s(6027), s(683), s(6294);
      },
      6027: (i, n, s) => {
        var o = s(2109),
          l = s(6916),
          h = s(9662),
          c = s(8523),
          u = s(2534),
          d = s(408),
          f = s(612);
        o(
          { target: "Promise", stat: !0, forced: f },
          {
            race: function (g) {
              var m = this,
                v = c.f(m),
                _ = v.reject,
                x = u(function () {
                  var y = h(m.resolve);
                  d(g, function (E) {
                    l(y, m, E).then(v.resolve, _);
                  });
                });
              return x.error && _(x.value), v.promise;
            },
          }
        );
      },
      683: (i, n, s) => {
        var o = s(2109),
          l = s(6916),
          h = s(8523),
          c = s(3702).CONSTRUCTOR;
        o(
          { target: "Promise", stat: !0, forced: c },
          {
            reject: function (d) {
              var f = h.f(this);
              return l(f.reject, void 0, d), f.promise;
            },
          }
        );
      },
      6294: (i, n, s) => {
        var o = s(2109),
          l = s(5005),
          h = s(1913),
          c = s(2492),
          u = s(3702).CONSTRUCTOR,
          d = s(9478),
          f = l("Promise"),
          p = h && !u;
        o(
          { target: "Promise", stat: !0, forced: h || u },
          {
            resolve: function (m) {
              return d(p && this === f ? c : this, m);
            },
          }
        );
      },
      4747: (i, n, s) => {
        var o = s(7854),
          l = s(8324),
          h = s(8509),
          c = s(8533),
          u = s(8880),
          d = function (p) {
            if (p && p.forEach !== c)
              try {
                u(p, "forEach", c);
              } catch {
                p.forEach = c;
              }
          };
        for (var f in l) l[f] && d(o[f] && o[f].prototype);
        d(h);
      },
    },
    t = {};
  function e(i) {
    var n = t[i];
    if (n !== void 0) return n.exports;
    var s = (t[i] = { exports: {} });
    return a[i](s, s.exports, e), s.exports;
  }
  (e.d = (i, n) => {
    for (var s in n)
      e.o(n, s) &&
        !e.o(i, s) &&
        Object.defineProperty(i, s, { enumerable: !0, get: n[s] });
  }),
    (e.g = (function () {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object") return window;
      }
    })()),
    (e.o = (i, n) => Object.prototype.hasOwnProperty.call(i, n)),
    (e.r = (i) => {
      typeof Symbol != "undefined" &&
        Symbol.toStringTag &&
        Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(i, "__esModule", { value: !0 });
    });
  var r = {};
  (() => {
    e.r(r),
      e.d(r, {
        default: () => g,
        init: () => n,
        send: () => d,
        sendForm: () => p,
      });
    var i = { _origin: "https://api.emailjs.com" },
      n = function (v) {
        var _ =
          arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : "https://api.emailjs.com";
        (i._userID = v), (i._origin = _);
      };
    e(8862);
    var s = function (v, _, x) {
      if (!v)
        throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
      if (!_)
        throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
      if (!x)
        throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
      return !0;
    };
    e(1539), e(8674), e(4747), e(7941), e(1703), e(9070);
    function o(m, v) {
      for (var _ = 0; _ < v.length; _++) {
        var x = v[_];
        (x.enumerable = x.enumerable || !1),
          (x.configurable = !0),
          "value" in x && (x.writable = !0),
          Object.defineProperty(m, x.key, x);
      }
    }
    function l(m, v, _) {
      return v && o(m.prototype, v), _ && o(m, _), m;
    }
    function h(m, v) {
      if (!(m instanceof v))
        throw new TypeError("Cannot call a class as a function");
    }
    var c = l(function m(v) {
        h(this, m),
          (this.status = v ? v.status : 0),
          (this.text = v ? v.responseText : "Network Error");
      }),
      u = function (v, _) {
        var x =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return new Promise(function (y, E) {
          var b = new XMLHttpRequest();
          b.addEventListener("load", function (S) {
            var C = S.target,
              R = new c(C);
            R.status === 200 || R.text === "OK" ? y(R) : E(R);
          }),
            b.addEventListener("error", function (S) {
              var C = S.target;
              E(new c(C));
            }),
            b.open("POST", i._origin + v, !0),
            Object.keys(x).forEach(function (S) {
              b.setRequestHeader(S, x[S]);
            }),
            b.send(_);
        });
      },
      d = function (v, _, x, y) {
        var E = y || i._userID;
        s(E, v, _);
        var b = {
          lib_version: "3.10.0",
          user_id: E,
          service_id: v,
          template_id: _,
          template_params: x,
        };
        return u("/api/v1.0/email/send", JSON.stringify(b), {
          "Content-type": "application/json",
        });
      },
      f = function (v) {
        var _;
        if (
          (typeof v == "string" ? (_ = document.querySelector(v)) : (_ = v),
          !_ || _.nodeName !== "FORM")
        )
          throw "The 3rd parameter is expected to be the HTML form element or the style selector of form";
        return _;
      },
      p = function (v, _, x, y) {
        var E = y || i._userID,
          b = f(x);
        s(E, v, _);
        var S = new FormData(b);
        return (
          S.append("lib_version", "3.10.0"),
          S.append("service_id", v),
          S.append("template_id", _),
          S.append("user_id", E),
          u("/api/v1.0/email/send-form", S)
        );
      };
    const g = { init: n, send: d, sendForm: p };
  })(),
    (self.emailjs = r);
})();
const rn = document.querySelector("#contact_form"),
  Je = document.querySelector("#name"),
  Ze = document.querySelector("#email"),
  qe = document.querySelector("#subject"),
  Ce = document.querySelector("#message"),
  nn = document.querySelector("#send"),
  au = document.querySelector(".thanks"),
  Qi = document.querySelector(".spinner-border"),
  ou = document.querySelector(".valid-feedback"),
  an =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  Ji = "is-invalid",
  $s = "is-valid";
function us(a, t) {
  const e = a.target;
  t
    ? (e.classList.add($s), e.classList.remove(Ji))
    : (e.classList.add(Ji), e.classList.remove($s));
}
Je.addEventListener("keyup", (a) => {
  us(a, a.target.value.length > 1), ds();
});
Ze.addEventListener("keyup", (a) => {
  us(a, !!a.target.value.match(an)), ds();
});
qe.addEventListener("keyup", (a) => {
  us(a, a.target.value.length > 2), ds();
});
Ce.addEventListener("keyup", (a) => {
  us(a, a.target.value.split(" ").length > 5),
    ds(),
    (ou.textContent = `${Ce.value.length} / 400`);
});
function ds() {
  nn.disabled = !(
    Je.value.length > 1 &&
    Ze.value.match(an) &&
    qe.value.length > 2 &&
    Ce.value.split(" ").length > 5
  );
}
const lu = "1sk9CG-9ic3jITh2U",
  hu = "portfolio_service",
  cu = "contact_form",
  uu = "3k6wnfqhoc5aovmn",
  du = `https://api.ipregistry.co/?key=${uu}`,
  fu = "https://api.emailjs.com/api/v1.0/email/send";
async function pu(a) {
  a.preventDefault(),
    (nn.style.display = "none"),
    (Qi.style.display = "inline-block");
  let t;
  await fetch(du)
    .then((r) => r.json())
    .then(
      (r) =>
        (t = `${r.location.country.flag.emoji} ${r.location.city}, ${r.location.latitude} ${r.location.longitude}`)
    );
  var e = {
    service_id: hu,
    template_id: cu,
    user_id: lu,
    template_params: {
      location: String(t),
      name: Je.value,
      email: Ze.value,
      subject: qe.value,
      message: Ce.value,
    },
  };
  await fetch(fu, {
    method: "POST",
    body: JSON.stringify(e),
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then(function () {
      (Qi.style.display = "none"),
        (au.style.display = "block"),
        a.target.reset(),
        [Je, Ze, qe, Ce].forEach((r) => {
          r.classList.remove($s);
        });
    })
    .catch(function (r) {
      alert("Something went wrong!! Please try again.");
    });
}
rn.addEventListener("submit", pu);
rn.reset();
var on = { exports: {} };
(function (a, t) {
  (function (e, r) {
    a.exports = r();
  })(Zr, function () {
    return (function (e) {
      function r(n) {
        if (i[n]) return i[n].exports;
        var s = (i[n] = { exports: {}, id: n, loaded: !1 });
        return (
          e[n].call(s.exports, s, s.exports, r), (s.loaded = !0), s.exports
        );
      }
      var i = {};
      return (r.m = e), (r.c = i), (r.p = "dist/"), r(0);
    })([
      function (e, r, i) {
        function n(O) {
          return O && O.__esModule ? O : { default: O };
        }
        var s =
            Object.assign ||
            function (O) {
              for (var M = 1; M < arguments.length; M++) {
                var I = arguments[M];
                for (var D in I)
                  Object.prototype.hasOwnProperty.call(I, D) && (O[D] = I[D]);
              }
              return O;
            },
          o = i(1),
          l = (n(o), i(6)),
          h = n(l),
          c = i(7),
          u = n(c),
          d = i(8),
          f = n(d),
          p = i(9),
          g = n(p),
          m = i(10),
          v = n(m),
          _ = i(11),
          x = n(_),
          y = i(14),
          E = n(y),
          b = [],
          S = !1,
          C = {
            offset: 120,
            delay: 0,
            easing: "ease",
            duration: 400,
            disable: !1,
            once: !1,
            startEvent: "DOMContentLoaded",
            throttleDelay: 99,
            debounceDelay: 50,
            disableMutationObserver: !1,
          },
          R = function () {
            var O =
              arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
            if ((O && (S = !0), S))
              return (b = (0, x.default)(b, C)), (0, v.default)(b, C.once), b;
          },
          N = function () {
            (b = (0, E.default)()), R();
          },
          T = function () {
            b.forEach(function (O, M) {
              O.node.removeAttribute("data-aos"),
                O.node.removeAttribute("data-aos-easing"),
                O.node.removeAttribute("data-aos-duration"),
                O.node.removeAttribute("data-aos-delay");
            });
          },
          w = function (O) {
            return (
              O === !0 ||
              (O === "mobile" && g.default.mobile()) ||
              (O === "phone" && g.default.phone()) ||
              (O === "tablet" && g.default.tablet()) ||
              (typeof O == "function" && O() === !0)
            );
          },
          P = function (O) {
            (C = s(C, O)), (b = (0, E.default)());
            var M = document.all && !window.atob;
            return w(C.disable) || M
              ? T()
              : (C.disableMutationObserver ||
                  f.default.isSupported() ||
                  (console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),
                  (C.disableMutationObserver = !0)),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-easing", C.easing),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-duration", C.duration),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-delay", C.delay),
                C.startEvent === "DOMContentLoaded" &&
                ["complete", "interactive"].indexOf(document.readyState) > -1
                  ? R(!0)
                  : C.startEvent === "load"
                  ? window.addEventListener(C.startEvent, function () {
                      R(!0);
                    })
                  : document.addEventListener(C.startEvent, function () {
                      R(!0);
                    }),
                window.addEventListener(
                  "resize",
                  (0, u.default)(R, C.debounceDelay, !0)
                ),
                window.addEventListener(
                  "orientationchange",
                  (0, u.default)(R, C.debounceDelay, !0)
                ),
                window.addEventListener(
                  "scroll",
                  (0, h.default)(function () {
                    (0, v.default)(b, C.once);
                  }, C.throttleDelay)
                ),
                C.disableMutationObserver || f.default.ready("[data-aos]", N),
                b);
          };
        e.exports = { init: P, refresh: R, refreshHard: N };
      },
      function (e, r) {},
      ,
      ,
      ,
      ,
      function (e, r) {
        (function (i) {
          function n(w, P, O) {
            function M(W) {
              var it = X,
                rt = Z;
              return (X = Z = void 0), (dt = W), (J = w.apply(rt, it));
            }
            function I(W) {
              return (dt = W), (H = setTimeout(U, P)), nt ? M(W) : J;
            }
            function D(W) {
              var it = W - st,
                rt = W - dt,
                kt = P - it;
              return ht ? N(kt, et - rt) : kt;
            }
            function $(W) {
              var it = W - st,
                rt = W - dt;
              return st === void 0 || it >= P || it < 0 || (ht && rt >= et);
            }
            function U() {
              var W = T();
              return $(W) ? z(W) : void (H = setTimeout(U, D(W)));
            }
            function z(W) {
              return (H = void 0), K && X ? M(W) : ((X = Z = void 0), J);
            }
            function k() {
              H !== void 0 && clearTimeout(H),
                (dt = 0),
                (X = st = Z = H = void 0);
            }
            function B() {
              return H === void 0 ? J : z(T());
            }
            function tt() {
              var W = T(),
                it = $(W);
              if (((X = arguments), (Z = this), (st = W), it)) {
                if (H === void 0) return I(st);
                if (ht) return (H = setTimeout(U, P)), M(st);
              }
              return H === void 0 && (H = setTimeout(U, P)), J;
            }
            var X,
              Z,
              et,
              J,
              H,
              st,
              dt = 0,
              nt = !1,
              ht = !1,
              K = !0;
            if (typeof w != "function") throw new TypeError(d);
            return (
              (P = c(P) || 0),
              o(O) &&
                ((nt = !!O.leading),
                (ht = "maxWait" in O),
                (et = ht ? R(c(O.maxWait) || 0, P) : et),
                (K = "trailing" in O ? !!O.trailing : K)),
              (tt.cancel = k),
              (tt.flush = B),
              tt
            );
          }
          function s(w, P, O) {
            var M = !0,
              I = !0;
            if (typeof w != "function") throw new TypeError(d);
            return (
              o(O) &&
                ((M = "leading" in O ? !!O.leading : M),
                (I = "trailing" in O ? !!O.trailing : I)),
              n(w, P, { leading: M, maxWait: P, trailing: I })
            );
          }
          function o(w) {
            var P = typeof w == "undefined" ? "undefined" : u(w);
            return !!w && (P == "object" || P == "function");
          }
          function l(w) {
            return (
              !!w && (typeof w == "undefined" ? "undefined" : u(w)) == "object"
            );
          }
          function h(w) {
            return (
              (typeof w == "undefined" ? "undefined" : u(w)) == "symbol" ||
              (l(w) && C.call(w) == p)
            );
          }
          function c(w) {
            if (typeof w == "number") return w;
            if (h(w)) return f;
            if (o(w)) {
              var P = typeof w.valueOf == "function" ? w.valueOf() : w;
              w = o(P) ? P + "" : P;
            }
            if (typeof w != "string") return w === 0 ? w : +w;
            w = w.replace(g, "");
            var O = v.test(w);
            return O || _.test(w)
              ? x(w.slice(2), O ? 2 : 8)
              : m.test(w)
              ? f
              : +w;
          }
          var u =
              typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (w) {
                    return typeof w;
                  }
                : function (w) {
                    return w &&
                      typeof Symbol == "function" &&
                      w.constructor === Symbol &&
                      w !== Symbol.prototype
                      ? "symbol"
                      : typeof w;
                  },
            d = "Expected a function",
            f = NaN,
            p = "[object Symbol]",
            g = /^\s+|\s+$/g,
            m = /^[-+]0x[0-9a-f]+$/i,
            v = /^0b[01]+$/i,
            _ = /^0o[0-7]+$/i,
            x = parseInt,
            y =
              (typeof i == "undefined" ? "undefined" : u(i)) == "object" &&
              i &&
              i.Object === Object &&
              i,
            E =
              (typeof self == "undefined" ? "undefined" : u(self)) ==
                "object" &&
              self &&
              self.Object === Object &&
              self,
            b = y || E || Function("return this")(),
            S = Object.prototype,
            C = S.toString,
            R = Math.max,
            N = Math.min,
            T = function () {
              return b.Date.now();
            };
          e.exports = s;
        }).call(
          r,
          (function () {
            return this;
          })()
        );
      },
      function (e, r) {
        (function (i) {
          function n(T, w, P) {
            function O(K) {
              var W = tt,
                it = X;
              return (tt = X = void 0), (st = K), (et = T.apply(it, W));
            }
            function M(K) {
              return (st = K), (J = setTimeout($, w)), dt ? O(K) : et;
            }
            function I(K) {
              var W = K - H,
                it = K - st,
                rt = w - W;
              return nt ? R(rt, Z - it) : rt;
            }
            function D(K) {
              var W = K - H,
                it = K - st;
              return H === void 0 || W >= w || W < 0 || (nt && it >= Z);
            }
            function $() {
              var K = N();
              return D(K) ? U(K) : void (J = setTimeout($, I(K)));
            }
            function U(K) {
              return (J = void 0), ht && tt ? O(K) : ((tt = X = void 0), et);
            }
            function z() {
              J !== void 0 && clearTimeout(J),
                (st = 0),
                (tt = H = X = J = void 0);
            }
            function k() {
              return J === void 0 ? et : U(N());
            }
            function B() {
              var K = N(),
                W = D(K);
              if (((tt = arguments), (X = this), (H = K), W)) {
                if (J === void 0) return M(H);
                if (nt) return (J = setTimeout($, w)), O(H);
              }
              return J === void 0 && (J = setTimeout($, w)), et;
            }
            var tt,
              X,
              Z,
              et,
              J,
              H,
              st = 0,
              dt = !1,
              nt = !1,
              ht = !0;
            if (typeof T != "function") throw new TypeError(u);
            return (
              (w = h(w) || 0),
              s(P) &&
                ((dt = !!P.leading),
                (nt = "maxWait" in P),
                (Z = nt ? C(h(P.maxWait) || 0, w) : Z),
                (ht = "trailing" in P ? !!P.trailing : ht)),
              (B.cancel = z),
              (B.flush = k),
              B
            );
          }
          function s(T) {
            var w = typeof T == "undefined" ? "undefined" : c(T);
            return !!T && (w == "object" || w == "function");
          }
          function o(T) {
            return (
              !!T && (typeof T == "undefined" ? "undefined" : c(T)) == "object"
            );
          }
          function l(T) {
            return (
              (typeof T == "undefined" ? "undefined" : c(T)) == "symbol" ||
              (o(T) && S.call(T) == f)
            );
          }
          function h(T) {
            if (typeof T == "number") return T;
            if (l(T)) return d;
            if (s(T)) {
              var w = typeof T.valueOf == "function" ? T.valueOf() : T;
              T = s(w) ? w + "" : w;
            }
            if (typeof T != "string") return T === 0 ? T : +T;
            T = T.replace(p, "");
            var P = m.test(T);
            return P || v.test(T)
              ? _(T.slice(2), P ? 2 : 8)
              : g.test(T)
              ? d
              : +T;
          }
          var c =
              typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (T) {
                    return typeof T;
                  }
                : function (T) {
                    return T &&
                      typeof Symbol == "function" &&
                      T.constructor === Symbol &&
                      T !== Symbol.prototype
                      ? "symbol"
                      : typeof T;
                  },
            u = "Expected a function",
            d = NaN,
            f = "[object Symbol]",
            p = /^\s+|\s+$/g,
            g = /^[-+]0x[0-9a-f]+$/i,
            m = /^0b[01]+$/i,
            v = /^0o[0-7]+$/i,
            _ = parseInt,
            x =
              (typeof i == "undefined" ? "undefined" : c(i)) == "object" &&
              i &&
              i.Object === Object &&
              i,
            y =
              (typeof self == "undefined" ? "undefined" : c(self)) ==
                "object" &&
              self &&
              self.Object === Object &&
              self,
            E = x || y || Function("return this")(),
            b = Object.prototype,
            S = b.toString,
            C = Math.max,
            R = Math.min,
            N = function () {
              return E.Date.now();
            };
          e.exports = n;
        }).call(
          r,
          (function () {
            return this;
          })()
        );
      },
      function (e, r) {
        function i(c) {
          var u = void 0,
            d = void 0;
          for (u = 0; u < c.length; u += 1)
            if (
              ((d = c[u]),
              (d.dataset && d.dataset.aos) || (d.children && i(d.children)))
            )
              return !0;
          return !1;
        }
        function n() {
          return (
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver
          );
        }
        function s() {
          return !!n();
        }
        function o(c, u) {
          var d = window.document,
            f = n(),
            p = new f(l);
          (h = u),
            p.observe(d.documentElement, {
              childList: !0,
              subtree: !0,
              removedNodes: !0,
            });
        }
        function l(c) {
          c &&
            c.forEach(function (u) {
              var d = Array.prototype.slice.call(u.addedNodes),
                f = Array.prototype.slice.call(u.removedNodes),
                p = d.concat(f);
              if (i(p)) return h();
            });
        }
        Object.defineProperty(r, "__esModule", { value: !0 });
        var h = function () {};
        r.default = { isSupported: s, ready: o };
      },
      function (e, r) {
        function i(d, f) {
          if (!(d instanceof f))
            throw new TypeError("Cannot call a class as a function");
        }
        function n() {
          return navigator.userAgent || navigator.vendor || window.opera || "";
        }
        Object.defineProperty(r, "__esModule", { value: !0 });
        var s = (function () {
            function d(f, p) {
              for (var g = 0; g < p.length; g++) {
                var m = p[g];
                (m.enumerable = m.enumerable || !1),
                  (m.configurable = !0),
                  "value" in m && (m.writable = !0),
                  Object.defineProperty(f, m.key, m);
              }
            }
            return function (f, p, g) {
              return p && d(f.prototype, p), g && d(f, g), f;
            };
          })(),
          o =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
          l =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          h =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
          c =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          u = (function () {
            function d() {
              i(this, d);
            }
            return (
              s(d, [
                {
                  key: "phone",
                  value: function () {
                    var f = n();
                    return !(!o.test(f) && !l.test(f.substr(0, 4)));
                  },
                },
                {
                  key: "mobile",
                  value: function () {
                    var f = n();
                    return !(!h.test(f) && !c.test(f.substr(0, 4)));
                  },
                },
                {
                  key: "tablet",
                  value: function () {
                    return this.mobile() && !this.phone();
                  },
                },
              ]),
              d
            );
          })();
        r.default = new u();
      },
      function (e, r) {
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = function (s, o, l) {
            var h = s.node.getAttribute("data-aos-once");
            o > s.position
              ? s.node.classList.add("aos-animate")
              : typeof h != "undefined" &&
                (h === "false" || (!l && h !== "true")) &&
                s.node.classList.remove("aos-animate");
          },
          n = function (s, o) {
            var l = window.pageYOffset,
              h = window.innerHeight;
            s.forEach(function (c, u) {
              i(c, h + l, o);
            });
          };
        r.default = n;
      },
      function (e, r, i) {
        function n(h) {
          return h && h.__esModule ? h : { default: h };
        }
        Object.defineProperty(r, "__esModule", { value: !0 });
        var s = i(12),
          o = n(s),
          l = function (h, c) {
            return (
              h.forEach(function (u, d) {
                u.node.classList.add("aos-init"),
                  (u.position = (0, o.default)(u.node, c.offset));
              }),
              h
            );
          };
        r.default = l;
      },
      function (e, r, i) {
        function n(h) {
          return h && h.__esModule ? h : { default: h };
        }
        Object.defineProperty(r, "__esModule", { value: !0 });
        var s = i(13),
          o = n(s),
          l = function (h, c) {
            var u = 0,
              d = 0,
              f = window.innerHeight,
              p = {
                offset: h.getAttribute("data-aos-offset"),
                anchor: h.getAttribute("data-aos-anchor"),
                anchorPlacement: h.getAttribute("data-aos-anchor-placement"),
              };
            switch (
              (p.offset && !isNaN(p.offset) && (d = parseInt(p.offset)),
              p.anchor &&
                document.querySelectorAll(p.anchor) &&
                (h = document.querySelectorAll(p.anchor)[0]),
              (u = (0, o.default)(h).top),
              p.anchorPlacement)
            ) {
              case "top-bottom":
                break;
              case "center-bottom":
                u += h.offsetHeight / 2;
                break;
              case "bottom-bottom":
                u += h.offsetHeight;
                break;
              case "top-center":
                u += f / 2;
                break;
              case "bottom-center":
                u += f / 2 + h.offsetHeight;
                break;
              case "center-center":
                u += f / 2 + h.offsetHeight / 2;
                break;
              case "top-top":
                u += f;
                break;
              case "bottom-top":
                u += h.offsetHeight + f;
                break;
              case "center-top":
                u += h.offsetHeight / 2 + f;
            }
            return p.anchorPlacement || p.offset || isNaN(c) || (d = c), u + d;
          };
        r.default = l;
      },
      function (e, r) {
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = function (n) {
          for (
            var s = 0, o = 0;
            n && !isNaN(n.offsetLeft) && !isNaN(n.offsetTop);

          )
            (s += n.offsetLeft - (n.tagName != "BODY" ? n.scrollLeft : 0)),
              (o += n.offsetTop - (n.tagName != "BODY" ? n.scrollTop : 0)),
              (n = n.offsetParent);
          return { top: o, left: s };
        };
        r.default = i;
      },
      function (e, r) {
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = function (n) {
          return (
            (n = n || document.querySelectorAll("[data-aos]")),
            Array.prototype.map.call(n, function (s) {
              return { node: s };
            })
          );
        };
        r.default = i;
      },
    ]);
  });
})(on);
var gu = qr(on.exports);
gu.init({ once: !0 });

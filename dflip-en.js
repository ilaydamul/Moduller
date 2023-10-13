/**
 * @preserve
 * Plugin Name: dflip
 * Description: dflip - 3D & 2D FlipBook
 *
 * Author: Deepak Ghimire
 * Author URI: http://codecanyon.net/user/deip?ref=deip
 */
"use strict";
var DFLIP = DFLIP || {};
var PRESENTATION = DFLIP;
(function e(t, n) {
  t.version = "1.4.31";
  t.PAGE_MODE = { SINGLE: 1, DOUBLE: 2, AUTO: null };
  t.SINGLE_PAGE_MODE = { ZOOM: 1, BOOKLET: 2, AUTO: null };
  t.CONTROLSPOSITION = { HIDDEN: "hide", TOP: "top", BOTTOM: "bottom" };
  t.DIRECTION = { LTR: 1, RTL: 2 };
  t.CORNERS = {
    TL: "tl",
    TR: "tr",
    BL: "bl",
    BR: "br",
    L: "l",
    R: "r",
    NONE: null,
  };
  t.SOURCE_TYPE = { IMAGE: "image", PDF: "pdf", HTML: "html" };
  t.DISPLAY_TYPE = { WEBGL: "3D", HTML: "2D" };
  t.PAGE_SIZE = { AUTO: 0, SINGLE: 1, DOUBLEINTERNAL: 2 };
  var i = (t.defaults = {
    webgl: true,
    webglShadow: true,
    soundEnable: true,
    height: "100%",
    autoEnableOutline: false,
    autoEnableThumbnail: false,
    overwritePDFOutline: false,
    enableDownload: true,
    duration: 800,
    direction: t.DIRECTION.LTR,
    pageMode: t.PAGE_MODE.AUTO,
    singlePageMode: t.SINGLE_PAGE_MODE.AUTO,
    backgroundColor: "#fff",
    forceFit: true,
    transparent: false,
    hard: "none",
    openPage: 1,
    annotationClass: "",
    autoPlay: false,
    autoPlayDuration: 5e3,
    autoPlayStart: false,
    maxTextureSize: 1600,
    minTextureSize: 256,
    rangeChunkSize: 524288,
    icons: {
      altnext: "ti-angle-right",
      altprev: "ti-angle-left",
      next: "ti-angle-right",
      prev: "ti-angle-left",
      end: "ti-angle-double-right",
      start: "ti-angle-double-left",
      share: "ti-sharethis",
      help: "ti-help-alt",
      more: "ti-more-alt",
      download: "ti-download",
      zoomin: "ti-zoom-in",
      zoomout: "ti-zoom-out",
      fullscreen: "ti-fullscreen",
      fitscreen: "ti-arrows-corner",
      thumbnail: "ti-layout-grid2",
      outline: "ti-menu-alt",
      close: "ti-close",
      doublepage: "ti-book",
      singlepage: "ti-file",
      sound: "ti-volume",
      facebook: "ti-facebook",
      google: "ti-google",
      twitter: "ti-twitter-alt",
      mail: "ti-email",
      play: "ti-control-play",
      pause: "ti-control-pause",
    },
    text: {
      toggleSound: "Turn on/off Sound",
      toggleThumbnails: "Toggle Thumbnails",
      toggleOutline: "Toggle Outline/Bookmark",
      previousPage: "Previous Page",
      nextPage: "Next Page",
      toggleFullscreen: "Toggle Fullscreen",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      toggleHelp: "Toggle Help",
      singlePageMode: "Single Page Mode",
      doublePageMode: "Double Page Mode",
      downloadPDFFile: "Download PDF File",
      gotoFirstPage: "Goto First Page",
      gotoLastPage: "Goto Last Page",
      play: "Start AutoPlay",
      pause: "Pause AutoPlay",
      share: "Share",
    },
    allControls:
      "altPrev,pageNumber,altNext,play,outline,thumbnail,zoomIn,zoomOut,fullScreen,share,download,more,pageMode,startPage,endPage,sound",
    moreControls: "download,pageMode,startPage,endPage,sound",
    hideControls: "",
    controlsPosition: t.CONTROLSPOSITION.BOTTOM,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    scrollWheel: true,
    onCreate: function (e) {},
    onCreateUI: function (e) {},
    onFlip: function (e) {},
    beforeFlip: function (e) {},
    onReady: function (e) {},
    zoomRatio: 1.5,
    pageSize: t.PAGE_SIZE.AUTO,
    pdfjsSrc: "https://storage.acerapps.io/app-1280/EklentilerCSS/JS/DFlip/pdf.min.js",
    pdfjsCompatibilitySrc: "js/libs/compatibility.js",
    pdfjsWorkerSrc: "https://storage.acerapps.io/app-1280/EklentilerCSS/JS/DFlip/pdf.worker.min.js",
    threejsSrc: "https://storage.acerapps.io/app-1280/EklentilerCSS/JS/DFlip/three.min.js",
    mockupjsSrc: "https://storage.acerapps.io/app-1280/EklentilerCSS/JS/DFlip/mockup.min.js",
    soundFile: "sound/turn2.mp3",
    imagesLocation: "images",
    imageResourcesPath: "images/pdfjs/",
    cMapUrl: "cmaps/",
    enableDebugLog: false,
    canvasToBlob: false,
    enableAnnotation: true,
    pdfRenderQuality: 0.9,
    textureLoadFallback: "blank",
    stiffness: 3,
    backgroundImage: "",
    pageRatio: null,
    pixelRatio: window.devicePixelRatio || 1,
    thumbElement: "div",
    spotLightIntensity: 0.22,
    ambientLightColor: "#fff",
    ambientLightIntensity: 0.8,
    shadowOpacity: 0.15,
  });
  var a =
      "WebKitCSSMatrix" in window ||
      (document.body && "MozPerspective" in document.body.style),
    o = "onmousedown" in window,
    r = "ontouchstart" in window;
  var s = navigator.userAgent;
  var l = (t.utils = {
    drag: { left: 0, right: 1, none: -1 },
    mouseEvents: o
      ? { type: "mouse", start: "mousedown", move: "mousemove", end: "mouseup" }
      : {
          type: "touch",
          start: "touchstart",
          move: "touchmove",
          end: "touchend",
        },
    html: {
      div: "<div/>",
      img: "<img/>",
      a: "<a>",
      input: "<input type='text'/>",
    },
    toRad: function (e) {
      return (e * Math.PI) / 180;
    },
    isset: function (e, t) {
      return e == null ? t : e;
    },
    isnull: function (e) {
      return e == null || e == null;
    },
    toDeg: function (e) {
      return (e * 180) / Math.PI;
    },
    transition: function (e, t) {
      return e ? t / 1e3 + "s ease-out" : "0s none";
    },
    display: function (e) {
      return e ? "block" : "none";
    },
    resetTranslate: function () {
      return w(0, 0);
    },
    translateStr: function (e, t) {
      return a
        ? " translate3d(" + e + "px," + t + "px, 0px) "
        : " translate(" + e + "px, " + t + "px) ";
    },
    httpsCorrection: function (e) {
      var t = window.location;
      if (t.href.indexOf("https://") > -1 && e.indexOf(t.hostname) > -1) {
        e = e.replace("http://", "https://");
      }
      return e;
    },
    resetBoxShadow: function () {
      return "rgba(0, 0, 0, 0) 0px 0px 20px";
    },
    rotateStr: function (e) {
      return " rotateZ(" + e + "deg) ";
    },
    bg: function (e) {
      return "#fff" + C(e);
    },
    bgImage: function (e) {
      return e == null || e == "blank" ? "" : " url(" + e + ")";
    },
    src: function (e) {
      return e != null ? "" + e + "" : "";
    },
    limitAt: function (e, t, n) {
      return e < t ? t : e > n ? n : e;
    },
    distOrigin: function (e, t) {
      return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2));
    },
    distPoints: function (e, t, n, i) {
      return Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2));
    },
    calculateScale: function (e, t) {
      var n = k(e[0].x, e[0].y, e[1].x, e[1].y),
        i = k(t[0].x, t[0].y, t[1].x, t[1].y);
      return i / n;
    },
    getVectorAvg: function (e) {
      return {
        x:
          e
            .map(function (e) {
              return e.x;
            })
            .reduce(l.sum) / e.length,
        y:
          e
            .map(function (e) {
              return e.y;
            })
            .reduce(l.sum) / e.length,
      };
    },
    sum: function (e, t) {
      return e + t;
    },
    getTouches: function (e, t) {
      t = t || { left: 0, top: 0 };
      return Array.prototype.slice.call(e.touches).map(function (e) {
        return { x: e.pageX - t.left, y: e.pageY - t.top };
      });
    },
    angleByDistance: function (e, t) {
      var n = t / 2;
      var i = S(e, 0, t);
      return i < n ? v(Math.asin(i / n)) : 90 + v(Math.asin((i - n) / n));
    },
    log: function (e) {
      if (i.enableDebugLog == true && window.console) console.log(e);
    },
    lowerPowerOfTwo: function (e) {
      return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
    },
    nearestPowerOfTwo: function (e, t) {
      return Math.min(
        t || 2048,
        Math.pow(2, Math.ceil(Math.log(e) / Math.LN2))
      );
    },
    zoomStops: function (e, t, n, i, a) {
      if (i == null) i = 256;
      if (a == null) a = 2048;
      var o = Math.log(e / i) / Math.log(t);
      return (
        i *
        Math.pow(
          t,
          n == null ? Math.round(o) : n == true ? Math.ceil(o) : Math.floor(o)
        )
      );
    },
    extendOptions: function (e, t) {
      return n.extend(true, {}, e, t);
    },
    getFullscreenElement: function () {
      return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    },
    hasFullscreenEnabled: function () {
      return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled
      );
    },
    getBasePage: function (e) {
      return Math.floor(e / 2) * 2;
    },
    loadResources: function e(t, n, i) {
      var a = document,
        o = a.createElement(t),
        r = a.getElementsByTagName(t)[0];
      o.async = true;
      if (i) {
        o.addEventListener(
          "load",
          function (e) {
            i(null, e);
          },
          false
        );
      }
      o.src = n;
      r.parentNode.insertBefore(o, r);
    },
    getScript: function (e, t, n) {
      var i = document.createElement("script");
      var a = document.body.getElementsByTagName("script")[0];
      i.async = 1;
      i.setAttribute("data-cfasync", false);
      if (a != null) {
        a.parentNode.insertBefore(i, a);
        a = null;
      } else {
        document.body.appendChild(i);
      }
      function o(e, a) {
        if (i != null) {
          if (a || !i.readyState || /loaded|complete/.test(i.readyState)) {
            i.onload = i.onreadystatechange = null;
            i = null;
            i = null;
            if (!a) {
              if (t) t();
              t = null;
              n = null;
            }
          }
        }
      }
      i.addEventListener("load", o, false);
      i.addEventListener("readystatechange", o, false);
      i.addEventListener("complete", o, false);
      if (n) {
        i.addEventListener("error", n, false);
      }
      i.src = e + (z.dom == "MS" ? "?" + Math.random(1) : "");
    },
    isHardPage: function (e, t, n, i) {
      if (e != null) {
        if (e == "cover") {
          return (
            t == 0 ||
            (i && t == 1) ||
            t == Math.floor(n / (i ? 1 : 2)) - (i ? 0 : 1)
          );
        } else if (e == "all") {
          return true;
        } else {
          var a = ("," + e + ",").indexOf("," + (t * 2 + 1) + ",") > -1;
          var o = ("," + e + ",").indexOf("," + (t * 2 + 2) + ",") > -1;
          return a || o;
        }
      }
      return false;
    },
    fixMouseEvent: function (e) {
      if (e) {
        var t = e.originalEvent || e;
        if (t.changedTouches && t.changedTouches.length > 0) {
          var i = n.event.fix(e);
          var a = t.changedTouches[0];
          i.clientX = a.clientX;
          i.clientY = a.clientY;
          i.pageX = a.pageX;
          i.touches = t.touches;
          i.pageY = a.pageY;
          i.movementX = a.movementX;
          i.movementY = a.movementY;
          return i;
        } else {
          return e;
        }
      } else {
        return e;
      }
    },
    hasWebgl: (function () {
      try {
        var e = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (e.getContext("webgl") || e.getContext("experimental-webgl"))
        );
      } catch (e) {
        return false;
      }
    })(),
    isBookletMode: function (e) {
      return (
        e.pageMode == t.PAGE_MODE.SINGLE &&
        e.singlePageMode == t.SINGLE_PAGE_MODE.BOOKLET
      );
    },
    isRTLMode: function (e) {
      return e.direction == t.DIRECTION.RTL;
    },
    isMobile: (function () {
      var e = false;
      (function (t) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            t
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            t.substr(0, 4)
          )
        )
          e = true;
      })(s || navigator.vendor || window.opera);
      return e;
    })(),
    isIOS: /(iPad|iPhone|iPod)/g.test(s),
    isSafari:
      /constructor/i.test(window.HTMLElement) ||
      (function (e) {
        return e.toString() === "[object SafariRemoteNotification]";
      })(!window["safari"] || safari.pushNotification),
    prefix: (function () {
      var e = window.getComputedStyle(document.documentElement, ""),
        t = Array.prototype.slice
          .call(e)
          .join("")
          .match(/-(moz|webkit|ms)-/)[1],
        n = "WebKit|Moz|MS".match(new RegExp("(" + t + ")", "i"))[1];
      return {
        dom: n,
        lowercase: t,
        css: "-" + t + "-",
        js: t[0].toUpperCase() + t.substr(1),
      };
    })(),
    __extends: function (e, t) {
      for (var n in t) if (t.hasOwnProperty(n)) e[n] = t[n];
      function i() {
        this.constructor = e;
      }
      i.prototype = t.prototype;
      e.prototype = new i();
      e.__super = t.prototype;
      return e;
    },
  });
  var u = t.SOURCE_TYPE,
    c = t.DISPLAY_TYPE,
    d = l.drag,
    f = l.mouseEvents,
    h = l.html,
    p = l.isset,
    g = l.isnull,
    m = l.toRad,
    v = l.toDeg,
    b = l.transition,
    w = l.translateStr,
    P = l.resetBoxShadow,
    y = l.rotateStr,
    x = l.bg,
    C = l.bgImage,
    E = l.src,
    S = l.limitAt,
    L = l.distOrigin,
    k = l.distPoints,
    I = l.angleByDistance,
    T = l.log,
    O = l.nearestPowerOfTwo,
    R = l.extendOptions,
    D = l.getBasePage,
    F = l.getScript,
    M = l.fixMouseEvent,
    z = l.prefix,
    N = l.isBookletMode,
    A = l.isRTLMode,
    B = l.isMobile,
    j = l.hasWebgl,
    _ = l.isSafari,
    U = l.isIOS,
    H = l.__extends;
  (function e() {
    if (window.CanvasPixelArray) {
      if (typeof window.CanvasPixelArray.prototype.set !== "function") {
        window.CanvasPixelArray.prototype.set = function (e) {
          for (var t = 0, n = this.length; t < n; t++) {
            this[t] = e[t];
          }
        };
      }
    } else {
      var t = false,
        n;
      if (_) {
        n = s.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//);
        t = n && parseInt(n[1]) < 6;
      }
      if (t) {
        var i = window.CanvasRenderingContext2D.prototype;
        var a = i.createImageData;
        i.createImageData = function (e, t) {
          var n = a.call(this, e, t);
          n.data.set = function (e) {
            for (var t = 0, n = this.length; t < n; t++) {
              this[t] = e[t];
            }
          };
          return n;
        };
        i = null;
      }
    }
  })();
  (function e() {
    function t(e) {
      window.setTimeout(e, 20);
    }
    if ("requestAnimationFrame" in window) {
      return;
    }
    window.requestAnimationFrame =
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      t;
  })();
  (function e() {
    if (typeof Uint8Array !== "undefined") {
      if (typeof Uint8Array.prototype.subarray === "undefined") {
        Uint8Array.prototype.subarray = function e(t, n) {
          return new Uint8Array(this.slice(t, n));
        };
        Float32Array.prototype.subarray = function e(t, n) {
          return new Float32Array(this.slice(t, n));
        };
      }
      if (typeof Float64Array === "undefined") {
        window.Float64Array = Float32Array;
      }
      return;
    }
    function t(e, t) {
      return new i(this.slice(e, t));
    }
    function n(e, t) {
      if (arguments.length < 2) {
        t = 0;
      }
      for (var n = 0, i = e.length; n < i; ++n, ++t) {
        this[t] = e[n] & 255;
      }
    }
    function i(e) {
      var i, a, o;
      if (typeof e === "number") {
        i = [];
        for (a = 0; a < e; ++a) {
          i[a] = 0;
        }
      } else if ("slice" in e) {
        i = e.slice(0);
      } else {
        i = [];
        for (a = 0, o = e.length; a < o; ++a) {
          i[a] = e[a];
        }
      }
      i.subarray = t;
      i.buffer = i;
      i.byteLength = i.length;
      i.set = n;
      if (typeof e === "object" && e.buffer) {
        i.buffer = e.buffer;
      }
      return i;
    }
    window.Uint8Array = i;
    window.Int8Array = i;
    window.Uint32Array = i;
    window.Int32Array = i;
    window.Uint16Array = i;
    window.Float32Array = i;
    window.Float64Array = i;
  })();
  var W = function (e) {
    return n.extend(true, {}, i, e);
  };
  var G = function (e, i) {
    var a = "df-ui";
    var o = "df-ui-wrapper";
    var r = a + "-" + "btn";
    var s = (i.ui = n(h.div, { class: a }));
    var u = i.options;
    s.dispose = function () {
      e.find("." + r).each(function () {
        n(this).off();
      });
      P.off();
      d.off();
      f.off();
      p.off();
      g.off();
      m.off();
      v.off();
      b.off();
      y.off();
      x.off();
      I.off();
      O.off();
      F.off();
      M.off();
      z.off();
      N.off();
      A.off();
      B.off();
      j.off();
      _.off();
      R.remove();
      w.remove();
      f.remove();
      d.remove();
      g.remove();
      if (s.shareBox) {
        if (s.shareBox.dispose) s.shareBox.dispose();
        s.shareBox = null;
      }
      document.removeEventListener("keyup", de, false);
      window.removeEventListener("click", C, false);
      s.update = null;
      i = null;
    };
    var c = function (e) {
      if (isNaN(e)) e = i.target._activePage;
      else if (e < 1) e = 1;
      else if (e > i.target.pageCount) e = i.target.pageCount;
      return e;
    };
    var d = (s.next = n(h.div, {
      class: r + " " + a + "-next " + u.icons["next"],
      title: u.text.nextPage,
      html: "<span>" + u.text.nextPage + "</span>",
    }).on("click", function () {
      i.next();
    }));
    var f = (s.prev = n(h.div, {
      class: r + " " + a + "-prev " + u.icons["prev"],
      title: u.text.previousPage,
      html: "<span>" + u.text.previousPage + "</span>",
    }).on("click", function () {
      i.prev();
    }));
    var p = n(h.div, {
      class: r + " " + a + "-play " + u.icons["play"],
      title: u.text.play,
      html: "<span>" + u.text.play + "</span>",
    }).on("click", function () {
      var e = n(this);
      i.setAutoPlay(!e.hasClass(u.icons["pause"]));
    });
    if (u.autoPlay == true) {
      s.play = p;
      i.setAutoPlay(u.autoPlayStart);
    }
    var g = n(h.div, { class: o + " " + a + "-zoom" });
    var m = (s.zoomIn = n(h.div, {
      class: r + " " + a + "-zoomin " + u.icons["zoomin"],
      title: u.text.zoomIn,
      html: "<span>" + u.text.zoomIn + "</span>",
    }).on("click", function () {
      i.zoom(1);
      s.update();
      if (i.target.startPoint && i.target.pan)
        i.target.pan(i.target.startPoint);
    }));
    var v = (s.zoomOut = n(h.div, {
      class: r + " " + a + "-zoomout " + u.icons["zoomout"],
      title: u.text.zoomOut,
      html: "<span>" + u.text.zoomOut + "</span>",
    }).on("click", function () {
      i.zoom(-1);
      s.update();
      if (i.target.startPoint && i.target.pan)
        i.target.pan(i.target.startPoint);
    }));
    g.append(m).append(v);
    var b = (s.pageNumber = n(h.div, { class: r + " " + a + "-page" })
      .on("change", function () {
        var e = parseInt(s.pageInput.val(), 10);
        e = c(e);
        i.gotoPage(e);
      })
      .on("keyup", function (e) {
        if (e.keyCode == 13) {
          var t = parseInt(s.pageInput.val(), 10);
          t = c(t);
          if (t !== c(i.target._activePage || i._activePage)) i.gotoPage(t);
        }
      }));
    s.pageInput = n('<input id="df_book_page_number" type="text"/>').appendTo(
      b
    );
    s.pageLabel = n('<label for="df_book_page_number"/>').appendTo(b);
    var w = n(h.div, { class: o + " " + a + "-size" });
    var P = n(h.div, {
      class: r + " " + a + "-help " + u.icons["help"],
      title: u.text.toggleHelp,
      html: "<span>" + u.text.toggleHelp + "</span>",
    }).on("click", function () {});
    var y = (s.sound = n(h.div, {
      class: r + " " + a + "-sound " + u.icons["sound"],
      title: u.text.toggleSound,
      html: "<span>" + u.text.toggleSound + "</span>",
    }).on("click", function () {
      u.soundEnable = !u.soundEnable;
      s.updateSound();
    }));
    s.updateSound = function () {
      if (u.soundEnable == false || u.soundEnable == "false")
        y.addClass("disabled");
      else y.removeClass("disabled");
    };
    s.updateSound();
    var x = (s.more = n(h.div, {
      class: r + " " + a + "-more " + u.icons["more"],
    }).on("click", function (e) {
      if (!x.hasClass("df-active")) {
        n(this).addClass("df-active");
        e.stopPropagation();
      }
    }));
    function C(e) {
      x.removeClass("df-active");
    }
    window.addEventListener("click", C, false);
    var E = n(h.div, { class: "more-container" });
    x.append(E);
    if (typeof u.source == "string" && u.enableDownload == true) {
      var S = r + " " + a + "-download " + u.icons["download"];
      var L = (s.download = n(
        '<a download target="_blank" class="' +
          S +
          '"><span>' +
          u.text.downloadPDFFile +
          "</span></a>"
      ));
      L.attr("href", u.source).attr("title", u.text.downloadPDFFile);
    }
    var k = l.hasFullscreenEnabled();
    if (!k) {
      e.addClass("df-custom-fullscreen");
    }
    s.switchFullscreen = function () {
      var e = l.getFullscreenElement();
      var t = i.container[0];
      if (s.isFullscreen != true) {
        i.container.addClass("df-fullscreen");
        if (t.requestFullscreen) {
          t.requestFullscreen();
        } else if (t.msRequestFullscreen) {
          t.msRequestFullscreen();
        } else if (t.mozRequestFullScreen) {
          t.mozRequestFullScreen();
        } else if (t.webkitRequestFullscreen) {
          t.webkitRequestFullscreen();
        }
        s.isFullscreen = true;
      } else {
        i.container.removeClass("df-fullscreen");
        s.isFullscreen = false;
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
      if (!l.hasFullscreenEnabled()) {
        setTimeout(function () {
          i.resize();
        }, 50);
      }
    };
    var I = (s.fullScreen = n(h.div, {
      class: r + " " + a + "-fullscreen " + u.icons["fullscreen"],
      title: u.text.toggleFullscreen,
      html: "<span>" + u.text.toggleFullscreen + "</span>",
    }).on("click", s.switchFullscreen));
    var O = (s.fit = n(h.div, {
      class: r + " " + a + "-fit " + u.icons["fitscreen"],
    }).on("click", function () {
      n(this).toggleClass("df-button-fit-active");
    }));
    w.append(I);
    var R = n(h.div, { class: o + " " + a + "-controls" });
    var D = (s.shareBox = new t.Share(e, u));
    var F = (s.share = n(h.div, {
      class: r + " " + a + "-share " + u.icons["share"],
      title: u.text.share,
      html: "<span>" + u.text.share + "</span>",
    }).on("click", function (e) {
      if (s.shareBox.isOpen == true) s.shareBox.close();
      else {
        s.shareBox.update(i.getURLHash());
        s.shareBox.show();
      }
    }));
    var M = (s.startPage = n(h.div, {
      class: r + " " + a + "-start " + u.icons["start"],
      title: u.text.gotoFirstPage,
      html: "<span>" + u.text.gotoFirstPage + "</span>",
    }).on("click", function () {
      i.start();
    }));
    var z = (s.endPage = n(h.div, {
      class: r + " " + a + "-end " + u.icons["end"],
      title: u.text.gotoLastPage,
      html: "<span>" + u.text.gotoLastPage + "</span>",
    }).on("click", function () {
      i.end();
    }));
    var N = (s.pageMode = n(h.div, {
      class: r + " " + a + "-pagemode " + u.icons["singlepage"],
      html: "<span>" + u.text.singlePageMode + "</span>",
    }).on("click", function () {
      var e = n(this);
      i.setPageMode(!e.hasClass(u.icons["doublepage"]));
    }));
    i.setPageMode(i.target.pageMode == t.PAGE_MODE.SINGLE);
    var A = (s.altPrev = n(h.div, {
      class: r + " " + a + "-prev" + " " + a + "-alt " + u.icons["prev"],
      title: u.text.previousPage,
      html: "<span>" + u.text.previousPage + "</span>",
    }).on("click", function () {
      i.prev();
    }));
    var B = (s.altNext = n(h.div, {
      class: r + " " + a + "-next" + " " + a + "-alt " + u.icons["next"],
      title: u.text.nextPage,
      html: "<span>" + u.text.nextPage + "</span>",
    }).on("click", function () {
      i.next();
    }));
    var j = (s.thumbnail = n(h.div, {
      class: r + " " + a + "-thumbnail " + u.icons["thumbnail"],
      title: u.text.toggleThumbnails,
      html: "<span>" + u.text.toggleThumbnails + "</span>",
    }).on("click", function () {
      var e = n(this);
      if (i.target.thumbContainer) {
        var t = i.target.thumbContainer;
        t.toggleClass("df-sidemenu-visible");
        e.toggleClass("df-active");
      } else {
        i.contentProvider.initThumbs();
        e.toggleClass("df-active");
      }
      if (e.hasClass("df-active")) {
        e.siblings(".df-active").trigger("click");
      }
      s.update(true);
    }));
    var _ = (s.outline = n(h.div, {
      class: r + " " + a + "-outline " + u.icons["outline"],
      title: u.text.toggleOutline,
      html: "<span>" + u.text.toggleOutline + "</span>",
    }).on("click", function () {
      var e = n(this);
      if (i.target.outlineContainer) {
        var t = i.target.outlineContainer;
        e.toggleClass("df-active");
        t.toggleClass("df-sidemenu-visible");
        if (e.hasClass("df-active")) {
          e.siblings(".df-active").trigger("click");
        }
        s.update(true);
      }
    }));
    var U = u.allControls.replace(/ /g, "").split(","),
      H = "," + u.moreControls.replace(/ /g, "") + ",",
      W = "," + u.hideControls.replace(/ /g, "") + ",";
    var G = H.split(",");
    for (var V = 0; V < U.length; V++) {
      var q = U[V];
      if (W.indexOf("," + q + ",") < 0) {
        var Z = s[q];
        if (Z != null) {
          if (
            H.indexOf("," + q + ",") > -1 &&
            q !== "more" &&
            q !== "pageNumber"
          ) {
            E.append(Z);
          } else {
            R.append(Z);
          }
        }
      }
    }
    e.append(R).append(f).append(d).append(g);
    var Y = false,
      K = false,
      X = false;
    var Q = 16,
      J = 17,
      $ = 18,
      ee = 83,
      te = 86,
      ne = 67,
      ie = 69,
      ae = 71,
      oe = 78,
      re = 79,
      se = 46,
      le = 39,
      ue = 37,
      ce = 27;
    document.addEventListener("keyup", de, false);
    function de(e) {
      switch (e.keyCode) {
        case ce:
          if (s.isFullscreen == true) s.fullScreen.trigger("click");
          break;
        case Q:
          K = false;
          break;
        case J:
          Y = false;
          break;
        case $:
          X = false;
          break;
        case ue:
          i.prev();
          break;
        case le:
          i.next();
          break;
        default:
          break;
      }
    }
    s.update = function (n) {
      T("ui update");
      var a = i.target;
      var o = c(a._activePage || i._activePage);
      var r = a.pageCount || i.pageCount;
      var l = a.direction == t.DIRECTION.RTL,
        u = o == 1 || o == 0,
        d = o == r;
      s.next.show();
      s.prev.show();
      s.altNext.removeClass("disabled");
      s.altPrev.removeClass("disabled");
      if ((u && !l) || (d && l)) {
        s.prev.hide();
        s.altPrev.addClass("disabled");
      }
      if ((d && !l) || (u && l)) {
        s.next.hide();
        s.altNext.addClass("disabled");
      }
      s.pageInput.val(o);
      s.pageLabel.html(o + "/" + r);
      if (e.find(".df-sidemenu-visible").length > 0) {
        e.addClass("df-sidemenu-open");
      } else {
        e.removeClass("df-sidemenu-open");
      }
      if (n == true) i.resize();
      if (a.contentProvider.zoomScale == a.contentProvider.maxZoom) {
        s.zoomIn.addClass("disabled");
      } else {
        s.zoomIn.removeClass("disabled");
      }
      if (a.contentProvider.zoomScale == 1) {
        s.zoomOut.addClass("disabled");
      } else {
        s.zoomOut.removeClass("disabled");
      }
    };
    if (i.target != null) {
      i.target.ui = s;
    }
    if (u.onCreateUI != null) u.onCreateUI(i);
  };
  var V = null;
  function q() {
    V = (function (e) {
      H(t, e);
      function t(t) {
        t = t || {};
        var a = this;
        e.call(this, t);
        a.options = t;
        a.canvas = n(a.renderer.domElement).addClass("df-3dcanvas");
        a.container = t.container;
        a.container.append(a.canvas);
        a.type = "PreviewStage";
        a.mouse = new THREE.Vector2();
        a.raycaster = new THREE.Raycaster();
        a.camera.position.set(0, 20, 600);
        a.camera.lookAt(new THREE.Vector3(0, 0, 0));
        a.spotLight.position.set(-220, 330, 550);
        a.spotLight.castShadow = B ? false : t.webglShadow;
        if (a.spotLight.shadow) {
          a.spotLight.shadow.bias = -8e-4;
        }
        a.spotLight.intensity = p(t.spotLightIntensity, i.spotLightIntensity);
        a.ambientLight.color = new THREE.Color(
          p(t.ambientLightColor, i.ambientLightColor)
        );
        a.ambientLight.intensity = p(
          t.ambientLightIntensity,
          i.ambientLightIntensity
        );
        var o = new THREE.ShadowMaterial();
        o.opacity = p(t.shadowOpacity, i.shadowOpacity);
        a.ground.material = o;
        a.ground.position.z = -2;
        a.orbitControl.maxAzimuthAngle = 0.4;
        a.orbitControl.minAzimuthAngle = -0.4;
        a.orbitControl.minPolarAngle = 1.4;
        a.orbitControl.maxPolarAngle = 2.2;
        a.orbitControl.mouseButtons.ORBIT = THREE.MOUSE.RIGHT;
        a.orbitControl.mouseButtons.PAN = -1;
        a.orbitControl.maxDistance = 5e3;
        a.orbitControl.minDistance = 50;
        a.orbitControl.noZoom = true;
        a.selectiveRendering = true;
        a.orbitControl.zoomSpeed = 5;
        a.orbitControl.keyPanSpeed = 0;
        a.orbitControl.center.set(0, 0, 0);
        a.orbitControl.update();
        a.swipe_threshold = B ? 15 : 20;
        var r = (a.cssRenderer = new THREE.CSS3DRenderer());
        n(r.domElement)
          .css({ position: "absolute", top: 0, pointerEvents: "none" })
          .addClass("df-3dcanvas df-csscanvas");
        a.container[0].appendChild(r.domElement);
        var s = (a.cssScene = new THREE.Scene());
        var u = document.createElement("div");
        u.className = "df-page-content df-page-content-left";
        var c = document.createElement("div");
        c.className = "df-page-content df-page-content-right";
        var d = (s.divLeft = new THREE.CSS3DObject(u));
        var h = (s.divRight = new THREE.CSS3DObject(c));
        s.add(d);
        s.add(h);
        a.resizeCallback = function () {
          r.setSize(a.canvas.width(), a.canvas.height());
        };
        function g() {
          a.renderRequestPending = true;
        }
        window.addEventListener(f.move, g, false);
        window.addEventListener("keyup", g, false);
        a.dispose = function () {
          a.clearChild();
          a.render();
          window.removeEventListener(f.move, g, false);
          if (a.options.scrollWheel == true) {
            a.renderer.domElement.removeEventListener("mousewheel", m, false);
            a.renderer.domElement.removeEventListener(
              "DOMMouseScroll",
              m,
              false
            );
          }
          window.removeEventListener("keyup", g, false);
          a.renderer.domElement.removeEventListener("mousemove", v, false);
          a.renderer.domElement.removeEventListener("touchmove", v, false);
          a.renderer.domElement.removeEventListener("mousedown", b, false);
          a.renderer.domElement.removeEventListener("touchstart", b, false);
          a.renderer.domElement.removeEventListener("mouseup", P, false);
          a.renderer.domElement.removeEventListener("touchend", P, false);
          a.canvas.remove();
          r.domElement.parentNode.removeChild(r.domElement);
          r = null;
          a.renderCallback = null;
          a.renderCallback = null;
          a.orbitControl.dispose();
          a.orbitControl = null;
          a.renderer.dispose();
          a.cancelRAF();
        };
        a.renderCallback = function () {
          if (TWEEN.getAll().length > 0) a.renderRequestPending = true;
          TWEEN.update();
          r.render(s, a.camera);
        };
        var m = function (e) {
          var t = 0;
          if (e.wheelDelta != null) {
            t = e.wheelDelta;
          } else if (e.detail != null) {
            t = -e.detail;
          }
          if (t) {
            var n = a.previewObject.contentProvider.zoomScale;
            if ((t > 0 && n == 1) || (t < 0 && n > 1)) {
              e.preventDefault();
            }
            a.previewObject.zoom(t > 0 ? 1 : -1);
          }
          g();
        };
        var v = function (e) {
          a.renderRequestPending = true;
          e = M(e);
          if (a.isMouseDown && e.movementX != 0 && e.movementY != 0) {
            a.isMouseMoving = true;
          }
          if (
            e.touches != null &&
            e.touches.length == 2 &&
            a.startTouches != null
          ) {
            a.zoomDirty = true;
            var t = l.getVectorAvg(l.getTouches(e, a.container.offset())),
              n = l.calculateScale(a.startTouches, l.getTouches(e)),
              i = n / a.lastScale;
            var o = a.previewObject.contentProvider.zoomScale,
              r = t.x,
              s = t.y;
            a.camera.position.z = a.originalZ / n;
            a.lastScale = n;
            a.lastZoomCenter = t;
            e.preventDefault();
            return;
          }
          if (
            a.isMouseDown == true &&
            a.previewObject.contentProvider.zoomScale == 1
          ) {
            var u = e.pageX - a.lastPos,
              c = performance.now() - a.lastTime;
            if (Math.abs(u) > a.swipe_threshold) {
              if (u < 0) {
                a.target.next();
              } else {
                a.target.prev();
              }
              e.preventDefault();
              a.isMouseDown = false;
            }
            a.lastPos = e.pageX;
            a.lastTime = performance.now();
          }
        };
        var b = function (e) {
          e = M(e);
          if (
            e.touches != null &&
            e.touches.length == 2 &&
            a.startTouches == null
          ) {
            a.startTouches = l.getTouches(e);
            a.lastScale = 1;
            a.originalZ = a.camera.position.z * 1;
          }
          document.activeElement.blur();
          a.mouseValue = e.pageX + "," + e.pageY;
          a.isMouseMoving = false;
          a.isMouseDown = true;
          a.lastPos = e.pageX;
          a.lastTime = performance.now();
        };
        var w = function (e) {
          a.isMouseDown = false;
          if (e.button !== 0) return this;
          var t = e.pageX + "," + e.pageY;
          if (a.isMouseMoving) {
          } else if (t == a.mouseValue) {
            e = e || window.event;
            e = n.event.fix(e);
            var i = a.mouse,
              o = a.raycaster;
            i.x = (e.offsetX / a.canvas.innerWidth()) * 2 - 1;
            i.y = 1 - (e.offsetY / a.canvas.innerHeight()) * 2;
            o.setFromCamera(i, a.camera);
            var r = o.intersectObjects(
              a.target instanceof MOCKUP.Bundle
                ? a.target.children
                : [a.target],
              true
            );
            if (r.length > 0) {
              var s,
                l = 0;
              do {
                s = r[l] != null ? r[l].object : null;
                l++;
              } while (
                (s instanceof THREE.BoxHelper ||
                  !(s instanceof MOCKUP.Paper) ||
                  s.isFlipping == true) &&
                l < r.length
              );
              if (s.userData.object != null) {
              } else {
                if (s.angles[1] > 90) {
                  if (s.isEdge != true) a.target.next();
                } else {
                  if (s.isEdge != true) a.target.prev();
                }
              }
            } else {
            }
          }
        };
        var P = function (e) {
          e = M(e);
          if (e.touches != null && e.touches.length == 0) {
            var t = a.previewObject.contentProvider.zoomScale;
            if (a.zoomDirty == true) {
              a.previewObject.contentProvider.zoomScale = l.limitAt(
                a.previewObject.contentProvider.zoomScale * a.lastScale,
                1,
                a.previewObject.contentProvider.maxZoom
              );
              a.previewObject.zoomValue =
                a.previewObject.contentProvider.zoomScale * 1;
              a.previewObject.resize();
              a.zoomDirty = false;
            }
            a.lastScale = null;
            a.startTouches = null;
          }
          if (e.touches != null && e.touches.length > 1) return;
          w(e);
        };
        a.renderer.domElement.addEventListener("mousemove", v, false);
        a.renderer.domElement.addEventListener("touchmove", v, false);
        a.renderer.domElement.addEventListener("mousedown", b, false);
        a.renderer.domElement.addEventListener("touchstart", b, false);
        a.renderer.domElement.addEventListener("mouseup", P, false);
        a.renderer.domElement.addEventListener("touchend", P, false);
        if (a.options.scrollWheel == true) {
          a.renderer.domElement.addEventListener("mousewheel", m, false);
          a.renderer.domElement.addEventListener("DOMMouseScroll", m, false);
        }
        n(a.renderer.domElement).css({ display: "block" });
        n(window).trigger("resize");
        return this;
      }
      t.prototype.width = function () {
        return this.container.width();
      };
      t.prototype.height = function () {
        return this.container.height();
      };
      return t;
    })(MOCKUP.Stage);
    MOCKUP.PreviewStage = V;
    var e = (function (e) {
      H(n, e);
      function n(t, n) {
        t = t || {};
        t.folds = 1;
        e.call(this, t, n);
        this.angle = 0;
        this.isFlipping = false;
        this.material.materials[5].transparent = true;
        this.material.materials[4].transparent = true;
        this.type = "BookPaper";
      }
      n.prototype.tween = function (e, n) {
        var i = this;
        var a = 1e-5;
        i.originalStiff = i.stiffness;
        var o = i.newStiffness;
        var r = N(i.parent);
        var s = n - e;
        var l = e > 90;
        var u = i.parent.direction == t.DIRECTION.RTL;
        i.init = {
          angle: e,
          angle2: e < 90 ? 0 : 180,
          stiff: i.originalStiff,
          index: (l && !u) || (!l && u) ? 1 : 0,
        };
        i.first = {
          angle: e + s / 4,
          angle2: e < 90 ? 90 : 90,
          stiff: i.originalStiff,
          index: (l && !u) || (!l && u) ? 1 : 0.25,
        };
        i.mid = {
          angle: e + (s * 2) / 4,
          angle2: e < 90 ? 135 : 45,
          stiff: i.newStiffness,
          index: (l && !u) || (!l && u) ? 0.5 : 0.5,
        };
        i.mid2 = {
          angle: e + (s * 3) / 4,
          angle2: e < 90 ? 180 : 0,
          stiff: i.newStiffness,
          index: (l && !u) || (!l && u) ? 0.25 : 1,
        };
        i.end = {
          angle: n,
          angle2: e < 90 ? 180 : 0,
          stiff: i.newStiffness,
          index: (l && !u) || (!l && u) ? 0 : 1,
        };
        i.isFlipping = true;
        var c = function (e, t) {
          i.angles[1] = e.angle;
          i.angles[4] = i.isHard ? e.angle : e.angle2;
          if (i.isHard == true) {
            i.stiffness = 0;
          } else {
            i.stiffness = (e.stiff / (o + a)) * (i.newStiffness + a);
            i.stiffness = isNaN(i.stiffness) ? 0 : e.stiff;
          }
          if (r) {
            i.material.materials[5].opacity = i.material.materials[4].opacity =
              e.index;
            i.castShadow =
              (l && !u) || (!l && u) ? e.index > 0.5 : e.index > 0.5;
          }
          i.updateAngle(true);
        };
        if (r && ((!l && !u) || (l && u))) {
          i.material.materials[5].opacity = i.material.materials[4].opacity = 0;
          i.castShadow = false;
        }
        i.currentTween = new TWEEN.Tween(i.init)
          .to(
            {
              angle: [i.first.angle, i.mid.angle, i.mid2.angle, i.end.angle],
              angle2: [
                i.first.angle2,
                i.mid.angle2,
                i.mid2.angle2,
                i.end.angle2,
              ],
              stiff: [i.first.stiff, i.mid.stiff, i.mid2.stiff, i.end.stiff],
              index: [i.first.index, i.mid.index, i.mid2.index, i.end.index],
            },
            i.parent.duration
          )
          .onUpdate(function (e) {
            c(this, e);
          })
          .easing(TWEEN.Easing.Sinusoidal.Out)
          .onComplete(function (e) {
            i.stiffness = i.newStiffness;
            i.updateAngle();
            i.material.materials[5].opacity =
              i.material.materials[4].opacity = 1;
            i.castShadow = true;
            i.isFlipping = false;
            if (i.parent && i.parent.refresh) i.parent.refresh();
          })
          .start();
      };
      return n;
    })(MOCKUP.FlexBoxPaper);
    MOCKUP.BookPaper = e;
    var a = (function (e) {
      H(n, e);
      function n(n, i) {
        n = n || {};
        n.segments = n.segments || 50;
        this.pageCount = n.pageCount;
        this.height = n.height;
        this.width = n.width;
        this.pageCount =
          this.pageCount == 1
            ? this.pageCount
            : Math.ceil(this.pageCount / 2) * 2;
        this.direction = n.direction || t.DIRECTION.LTR;
        this.startPage = 1;
        this.endPage = this.pageCount;
        this.stackCount = n.stackCount || 6;
        this.materials = [];
        e.call(this, n, i);
        this.angles = [0, 0, 0, 0, 0, 0];
        this.stiffness = n.stiffness == null ? 1.5 : n.stiffness;
        this.hardConfig = n.hard;
        this._activePage = n.openPage || this.startPage;
        this.createStack(n);
        this.pageMode =
          n.pageMode ||
          (B || this.pageCount <= 2 ? t.PAGE_MODE.SINGLE : t.PAGE_MODE.DOUBLE);
        this.singlePageMode =
          n.singlePageMode ||
          (B ? t.SINGLE_PAGE_MODE.BOOKLET : t.SINGLE_PAGE_MODE.ZOOM);
        this.type = "Book";
      }
      n.prototype.getPageByNumber = function (e) {
        var t = N(this) ? (A(this) ? e + 1 : e) : Math.floor((e - 1) / 2);
        return this.getObjectByName(t.toString());
      };
      n.prototype.isPageHard = function (e) {
        return l.isHardPage(this.hardConfig, e, this.pageCount);
      };
      n.prototype.activePage = function (e) {
        if (e == null) return this._activePage;
        this.gotoPage(e);
      };
      n.prototype.gotoPage = function (e) {
        e = parseInt(e, 10);
        this._activePage = e;
        if (this.autoPlay == true) {
          this.previewObject.setAutoPlay(this.autoPlay);
        }
        this.updatePage(e);
        if (this && this.thumblist && this.thumblist.review)
          this.thumblist.review();
      };
      n.prototype.moveBy = function (e) {
        var t = this._activePage + e;
        t = S(t, this.startPage, this.endPage);
        this.gotoPage(t);
      };
      n.prototype.next = function (e) {
        if (e == null)
          e =
            this.direction == t.DIRECTION.RTL ? -this.pageMode : this.pageMode;
        this.moveBy(e);
      };
      n.prototype.prev = function (e) {
        if (e == null)
          e =
            this.direction == t.DIRECTION.RTL ? this.pageMode : -this.pageMode;
        this.moveBy(e);
      };
      n.prototype.updateAngle = function () {
        var e = this.angles[1];
        var t = this.angles[4];
        var n = t - e;
        var i = this.stackCount;
        for (var a = 0; a < i; a++) {
          var o = this.children[a];
          o.angles[1] = e + (a * n) / (i * 100);
          o.stiffness = this.stiffness;
          o.updateAngle();
        }
      };
      n.prototype.refresh = function () {
        this.updatePage(this._activePage);
        if (this.flipCallback != null) this.flipCallback();
      };
      n.prototype.updatePage = function (e) {
        var n = this.direction == t.DIRECTION.RTL,
          a = N(this),
          o = D(e);
        var r = a ? 1 : 2;
        e = Math.floor(e / r);
        if (n) e = this.pageCount / r - e;
        var s = this.oldBaseNumber || 0;
        var l = this.pageCount / r;
        var u = this.stackCount;
        var c = 0.02;
        var d = 0.4;
        var f = a ? 0 : (0.5 - Math.abs(l / 2 - e) / l) / this.stiffness;
        var h = 1;
        var p = Math.floor(u / 2);
        var g = false;
        if (s > e) {
          g = true;
          this.children[u - 1].skipFlip = true;
          this.children.unshift(this.children.pop());
        } else if (s < e) {
          this.children[0].skipFlip = true;
          this.children.push(this.children.shift());
        }
        var m = l - e;
        var v = 5 / l;
        var b = (v * e) / 2;
        var w = (v * m) / 2;
        var P = b < w ? w : b;
        for (var y = 0; y < u; y++) {
          var x = this.children[y];
          var C = x.color;
          var E = x.angles[1];
          var S;
          var L = e - p + y;
          if (n)
            L = a ? this.pageCount - L : Math.floor(this.pageCount / 2) - L - 1;
          var k = (x.isHard = this.isPageHard(L));
          var I = x.name;
          x.isEdge = false;
          if (y == 0) {
            x.depth = b < d ? d : b;
          } else if (y == u - 1) {
            x.depth = w < d ? d : w;
          } else {
            x.depth = d;
            x.isEdge = false;
          }
          if (x.isFlipping == true) {
            x.depth = d;
          }
          x.position.x = 0;
          var T = c * y,
            O = 180 - c * (y - p) + c * y;
          if (y < p) {
            x.newStiffness = k || this.stiffness == 0 ? 0 : f / (e / l) / 4;
            S = T;
            x.position.z = P - (-y + p) * d;
            if (g == true) x.position.z -= d;
          } else {
            S = O;
            x.newStiffness =
              k || this.stiffness == 0 ? 0 : f / (Math.abs(l - e) / l) / 4;
            x.position.z = P - (-u + y + p + 1) * d - x.depth;
          }
          if (x.isFlipping == false) {
            if (Math.abs(E - S) > 20 && x.skipFlip == false) {
              x.depth = d;
              var R = x.stiffness;
              if (E > S) {
                R = f / (Math.abs(l - e) / l) / 4;
              } else {
                R = f / (e / l) / 4;
              }
              x.position.z += d;
              x.stiffness = isNaN(R) ? x.stiffness : R;
              x.updateAngle(true);
              x.targetStiffness = k
                ? 0
                : y < e
                ? f / (Math.abs(l - e) / l) / 4
                : f / (e / l) / 4;
              x.targetStiffness = k
                ? 0
                : isNaN(x.targetStiffness)
                ? x.stiffness
                : x.targetStiffness;
              x.isFlipping = true;
              x.tween(E, S);
              if (this.preFlipCallback != null) this.preFlipCallback();
            } else {
              x.skipFlip = false;
              x.newStiffness = isNaN(x.newStiffness) ? 0 : x.newStiffness;
              if (
                x.angles[1] != S ||
                x.stiffness != x.newStiffness ||
                x.depth != x.oldDepth
              ) {
                x.angles[1] = x.angles[4] = S;
                x.stiffness = x.newStiffness;
                x.updateAngle(true);
              } else {
              }
            }
          }
          x.visible = a
            ? n
              ? y < p || x.isFlipping
              : y >= p || x.isFlipping
            : (L >= 0 && L < l) || (a && L == l);
          if (this.requestPage != null && x.visible == true) {
            x.name = L.toString();
            if (x.name != I) {
              x.textureLoaded = false;
              x.frontImage(i.textureLoadFallback);
              x.frontPageStamp = "-1";
              x.frontTextureLoaded = false;
              x.thumbLoaded = false;
              x.backImage(i.textureLoadFallback);
              x.backPageStamp = "-1";
              x.backTextureLoaded = false;
              this.requestPage();
            }
          }
          x.oldDepth = x.depth;
          var F =
            Math.abs(x.geometry.boundingBox.max.x) <
            Math.abs(x.geometry.boundingBox.min.x)
              ? x.geometry.boundingBox.max.x
              : x.geometry.boundingBox.min.x;
          x.position.x =
            x.isEdge == true && x.isFlipping == false ? (y < p ? F : -F) : 0;
        }
        this.oldBaseNumber = e;
        if (this.updatePageCallback != null) this.updatePageCallback();
      };
      n.prototype.createCover = function (e) {
        e.width = e.width * 2;
        this.cover = new MOCKUP.BiFold(e);
        this.add(this.cover);
      };
      n.prototype.createStack = function (e) {
        var t = "red,green,blue,yellow,orange,black".split(",");
        for (var n = 0; n < this.stackCount; n++) {
          e.angles = [, this.stackCount - n];
          e.stiffness = (this.stackCount - n) / 100;
          var i = new MOCKUP.BookPaper(e);
          i.angles[1] = 180;
          i.index = n;
          i.updateAngle();
          i.textureReady = false;
          i.textureRequested = false;
          this.add(i);
          i.color = t[n];
          i.position.z = -1 * n;
        }
      };
      n.prototype.shininess = function (e) {
        if (e == null) {
          return this.mainObject.shininess();
        } else {
          this.mainObject.shininess(e);
        }
      };
      n.prototype.bumpScale = function (e) {
        if (e == null) {
          return this.mainObject.bumpScale();
        } else {
          this.mainObject.bumpScale(e);
        }
      };
      n.prototype.frontImage = function (e) {
        if (e == null) {
          return this.mainObject.frontImage();
        } else {
          this.mainObject.frontImage(e);
        }
      };
      n.prototype.backImage = function (e) {
        if (e == null) {
          return this.mainObject.backImage();
        } else {
          this.mainObject.backImage(e);
        }
      };
      return n;
    })(MOCKUP.Bundle);
    MOCKUP.Book = a;
  }
  var Z = (function (e) {
    function i(e) {
      e = e || {};
      this.type = "PreviewObject";
      var n = this;
      n.zoomValue = 1;
      function i() {
        setTimeout(function () {
          n.resize();
        }, 50);
      }
      window.addEventListener("resize", i, false);
      this.sound = document.createElement("audio");
      this.sound.setAttribute("src", e.soundFile + "?ver=" + t.version);
      this.sound.setAttribute("type", "audio/mpeg");
      this.autoPlayFunction = function () {
        if (n && n.target.autoPlay) {
          if (n.target.direction == t.DIRECTION.RTL) n.target.prev();
          else n.target.next();
        }
      };
      this.dispose = function () {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
        this.autoPlayFunction = null;
        if (this.target && this.target.children) {
          for (var e = 0; e < this.target.children.length; e++) {
            var t = this.target.children[e];
            if (t && t.currentTween) t.currentTween.stop();
          }
        }
        if (this.zoomTween) {
          if (this.zoomTween.stop) this.zoomTween.stop();
          this.zoomTween = null;
        }
        if (this.container && this.container.info && this.container.info.remove)
          this.container.info.remove();
        if (this.target && this.target.dispose) this.target.dispose();
        this.target = null;
        if (this.stage && this.stage.dispose) this.stage.dispose();
        this.stage = null;
        if (this.ui && this.ui.dispose) this.ui.dispose();
        this.ui = null;
        if (this.contentProvider && this.contentProvider.dispose)
          this.contentProvider.dispose();
        this.contentProvider = null;
        window.removeEventListener("resize", i);
      };
    }
    i.prototype = {
      start: function () {
        this.target.gotoPage(this.target.startPage);
      },
      end: function () {
        this.target.gotoPage(this.target.endPage);
      },
      next: function () {},
      prev: function () {},
      zoom: function (e) {
        this.pendingZoom = true;
        this.zoomDelta = e;
        this.resize();
        this.ui.update();
      },
      resize: function () {
        var e = this;
        if (
          e.target == null ||
          e.target.ui == null ||
          e.target.contentProvider == null ||
          e.target.contentProvider.viewport == null ||
          e.target.stage == null
        )
          return;
        if (
          this.ui &&
          this.ui.isFullscreen == true &&
          l.hasFullscreenEnabled() == true &&
          l.getFullscreenElement() == null
        ) {
          this.ui.switchFullscreen();
        }
        var i = e.target,
          a = e.container,
          o = e.options,
          r = i.stage,
          s = i.contentProvider,
          c = s.pageRatio,
          d = s.zoomViewport,
          f = A(i),
          h = i.mode !== "css",
          p = s.pageRatio > 1,
          g,
          m,
          v,
          b,
          w,
          P,
          y,
          x = a.hasClass("df-sidemenu-open") ? 220 : 0,
          C = this.target.pageMode == t.PAGE_MODE.SINGLE;
        a.height(o.height);
        var E = Math.min(a.height(), n(window).height());
        a.height(E);
        var k = a.width();
        if (k < 400) {
          e.container.addClass("df-xs");
        } else {
          e.container.removeClass("df-xs");
        }
        var I = a.find(".df-ui-controls").height();
        var T =
            o.paddingTop +
            (o.controlsPosition == t.CONTROLSPOSITION.TOP ? I : 0),
          O = o.paddingRight,
          R =
            o.paddingBottom +
            (o.controlsPosition == t.CONTROLSPOSITION.BOTTOM ? I : 0),
          D = o.paddingLeft;
        (T = isNaN(T) ? 0 : S(T, 0, T)),
          (R = isNaN(R) ? 0 : S(R, 0, R)),
          (D = isNaN(D) ? 0 : S(D, 0, D)),
          (O = isNaN(O) ? 0 : S(O, 0, O));
        var F = k - x,
          M = E;
        var z = T + R,
          N = D + O;
        var B = F - N,
          j = M - z;
        v = Math.floor(C ? B : B / 2);
        m = Math.floor(v / c);
        g = m > j;
        if (g) {
          m = j;
          v = m * c;
        }
        y = s.maxZoom = s.zoomViewport.height / m;
        if (e.zoomValue == null) e.zoomValue = 1;
        if (s.zoomScale == null) s.zoomScale = 1;
        if (e.pendingZoom == true && e.zoomDelta != null) {
          var _ = e.zoomDelta,
            U,
            H = Math.max(m, v);
          e.zoomValue =
            e.zoomDelta > 0
              ? e.zoomValue * e.options.zoomRatio
              : e.zoomValue / e.options.zoomRatio;
          e.zoomValue = S(e.zoomValue, 1, y);
          if (e.zoomValue == 1) {
            s.zoomScale = 1;
          } else {
            U = m * e.zoomValue;
            U = l.zoomStops(
              U,
              e.options.zoomRatio,
              e.zoomDelta > 0,
              Math.max(v, m)
            );
            s.zoomScale = S(U / H, 1, y);
          }
        }
        P = s.zoomScale;
        s.checkViewportSize(v, m, P);
        if (s.contentSourceType == u.PDF) {
          v = s.imageViewport.width / P;
          m = s.imageViewport.height / P;
        }
        if (s.zoomScale != 1) {
          this.target.container.addClass("df-zoom-enabled");
        }
        var W = (i.zoomWidth = Math.floor(v * P)),
          G = (i.zoomHeight = Math.floor(m * P));
        var V = W * 2;
        if (h) {
          var q = G / i.height,
            Z = F / M;
          var Y = (P * (m + z)) / q,
            K = (P * (v * (C ? 1 : 2) + N)) / q;
          var X = g ? Y : K / Z;
          r.resizeCanvas(F, M);
          b =
            1 /
              ((2 * Math.tan((Math.PI * r.camera.fov * 0.5) / 180)) / (X / P)) +
            2.2;
          r.camera.updateProjectionMatrix();
          r.renderRequestPending = true;
          var Q = ((T - R) * (i.height / m)) / P / 2;
          var J = s.zoomScale == 1;
          if (r.camera.position.z !== b && e.pendingZoom == true) {
            if (e.zoomTween != null) e.zoomTween.stop();
            e.zoomTween = new TWEEN.Tween({
              campos: r.camera.position.z,
              otx: r.orbitControl.target.x,
              oty: r.orbitControl.target.y,
              otz: r.orbitControl.target.z,
            })
              .delay(0)
              .to({ campos: b, otx: 0, oty: Q, otz: 0 }, 100)
              .onUpdate(function () {
                r.camera.position.z = this.campos;
                if (J) {
                  r.camera.position.y = this.oty;
                  r.orbitControl.target = new THREE.Vector3(
                    this.otx,
                    this.oty,
                    this.otz
                  );
                }
                r.orbitControl.update();
              })
              .easing(TWEEN.Easing.Linear.None)
              .onComplete(function () {
                r.camera.position.z = b;
                if (s.zoomScale == 1) {
                  r.camera.position.set(0, Q, b);
                  r.orbitControl.target = new THREE.Vector3(0, Q, 0);
                }
                r.orbitControl.update();
              })
              .start();
          } else {
            if (s.zoomScale == 1) {
              r.camera.position.set(0, Q, b);
              r.orbitControl.target = new THREE.Vector3(0, Q, 0);
            }
            r.orbitControl.update();
          }
          r.orbitControl.update();
          r.orbitControl.mouseButtons.ORBIT = P != 1 ? -1 : THREE.MOUSE.RIGHT;
          r.orbitControl.mouseButtons.PAN = P != 1 ? THREE.MOUSE.LEFT : -1;
        } else {
          i.pageWidth = Math.round(v);
          i.fullWidth = i.pageWidth * 2;
          i.height = Math.round(m);
          var $ = (i.shiftHeight = Math.round(S((G - M + z) / 2, 0, G))),
            ee = (i.shiftWidth = Math.round(S((V - F + N) / 2, 0, V)));
          if (P == 1) {
            i.left = 0;
            i.top = 0;
          }
          i.stage.css({
            top: -$,
            bottom: -$,
            right: -ee + (f ? x : 0),
            left: -ee + (f ? 0 : x),
            paddingTop: T,
            paddingRight: O,
            paddingBottom: R,
            paddingLeft: D,
            transform: "translate3d(" + i.left + "px," + i.top + "px,0)",
          });
          i.stageHeight = r.height();
          i.wrapper.css({
            width: V,
            height: G,
            marginTop: E - G - z > 0 ? (E - z - G) / 2 : 0,
          });
          var te = Math.floor(L(v, m) * P);
          i.stage.find(".df-page-wrapper").width(te).height(te);
          i.stage
            .find(
              ".df-book-page, .df-page-front , .df-page-back, .df-page-fold-inner-shadow"
            )
            .height(G)
            .width(W);
        }
        e.checkCenter({ type: "resize" });
        if (s.zoomScale == 1) {
          this.target.container.removeClass("df-zoom-enabled");
        }
        if (i.thumblist) {
          i.thumblist.reset(n(i.thumblist.container).height());
        }
        e.pendingZoom = false;
      },
      playSound: function () {
        try {
          if (this.options && this.options.soundEnable == true) {
            this.sound.currentTime = 0;
            this.sound.play();
          }
        } catch (e) {}
      },
      setPageMode: function (e) {
        if (e == true) {
          this.ui.pageMode.addClass(this.options.icons["doublepage"]);
          this.ui.pageMode.html(
            "<span>" + this.options.text.doublePageMode + "</span>"
          );
          this.ui.pageMode.attr("title", this.options.text.doublePageMode);
          this.target.pageMode = t.PAGE_MODE.SINGLE;
        } else {
          this.ui.pageMode.removeClass(this.options.icons["doublepage"]);
          this.ui.pageMode.html(
            "<span>" + this.options.text.singlePageMode + "</span>"
          );
          this.ui.pageMode.attr("title", this.options.text.singlePageMode);
          this.target.pageMode = t.PAGE_MODE.DOUBLE;
        }
        if (
          this.target &&
          this.target.singlePageMode == t.SINGLE_PAGE_MODE.BOOKLET
        ) {
          this.target.reset();
        }
        this.resize();
      },
      setAutoPlay: function (e) {
        if (this.options.autoPlay) {
          e = e == true;
          var t = e ? this.options.text.pause : this.options.text.play;
          this.ui.play.toggleClass(this.options.icons["pause"], e);
          this.ui.play.html("<span>" + t + "</span>");
          this.ui.play.attr("title", t);
          clearInterval(this.autoPlayTimer);
          if (e) {
            this.autoPlayTimer = setInterval(
              this.autoPlayFunction,
              this.options.autoPlayDuration
            );
          }
          this.target.autoPlay = e;
        }
      },
      height: function (e) {
        if (e == null) {
          return this.container.height();
        } else {
          this.options.height = e;
          this.container.height(e);
          this.resize();
        }
      },
      checkCenter: function (e) {
        e = e == null ? {} : e;
        this.centerType = this.centerType || "start";
        var n = this.target;
        var i = 0,
          a = 0,
          o = 0;
        var r = l.getBasePage(n._activePage);
        var s = n._activePage % 2 == 0;
        var u = n.direction == t.DIRECTION.RTL;
        var c = n.pageMode == t.PAGE_MODE.SINGLE,
          d = c && n.singlePageMode == t.SINGLE_PAGE_MODE.BOOKLET;
        var f = n.stage.width(),
          h;
        if (n.mode == "css") {
          h = n.wrapper.width();
          i = Math.max((h - f) / 2, 0);
          a = -h / 4;
          o = h / 4;
          if (r == 0 || d) {
            n.wrapper.css({ left: c ? (u ? o - i : a - i) : u ? o : a });
            n.shadow.css({
              width: "50%",
              left: u ? 0 : "50%",
              transitionDelay: "",
            });
          } else if (r == n.pageCount) {
            n.wrapper.css({ left: c ? (u ? a - i : o - i) : u ? a : o });
            n.shadow.css({
              width: "50%",
              left: u ? "50%" : 0,
              transitionDelay: "",
            });
          } else {
            n.wrapper.css({
              left: c ? (u ? (s ? a - i : o - i) : s ? o - i : a - i) : 0,
            });
            n.shadow.css({
              width: "100%",
              left: 0,
              transitionDelay: parseInt(n.duration, 10) + 50 + "ms",
            });
          }
          n.wrapper.css({ transition: e.type == "resize" ? "none" : "" });
        } else if (n.stage != null) {
          var p = n.position.x,
            g;
          i = n.width / 4;
          h = n.width;
          a = -h / 2;
          o = h / 2;
          if (r == 0 || d) {
            g = u ? o : a;
          } else if (r == n.pageCount) {
            g = u ? a : o;
          } else {
            g = c ? (u ? (s ? a : o) : s ? o : a) : 0;
          }
          if (g !== this.centerEnd) {
            this.centerTween = new TWEEN.Tween({ x: p })
              .delay(0)
              .to({ x: g }, n.duration)
              .onUpdate(function () {
                n.position.x = this.x;
                n.stage.cssScene.position.x = this.x;
              })
              .easing(n.ease)
              .start();
            this.centerEnd = g;
          }
        }
      },
      width: function (e) {
        if (e == null) {
          return this.container.width();
        } else {
          this.options.width = e;
          this.container.width(e);
          this.resize();
        }
      },
    };
    return i;
  })({});
  t.PreviewObject = Z;
  var Y = (function (e) {
    H(a, e);
    function a(e, a, o, r) {
      o = o || {};
      var s = this;
      s.contentRawSource = e || [i.textureLoadFallback];
      s.contentSource = s.contentRawSource;
      s.contentSourceType = null;
      s.minDimension = o.minTextureSize || 256;
      s.maxDimension = o.maxTextureSize || 2048;
      s.pdfRenderQuality = o.pdfRenderQuality || t.defaults.pdfRenderQuality;
      s.flipbook = r;
      s.waitPeriod = 50;
      s.maxLength = 297;
      s.enableDebug = false;
      s.zoomScale = 1;
      s.maxZoom = 2;
      s.options = o;
      s.outline = o.outline;
      s.links = o.links;
      s.html = o.html;
      s.isCrossOrigin = o.isCrossOrigin;
      s.normalViewport = { height: 297, width: 210, scale: 1 };
      s.viewport = { height: 297, width: 210, scale: 1 };
      s.imageViewport = { height: 297, width: 210, scale: 1 };
      s.bookSize = { height: 297, width: 210 };
      s.zoomViewport = { height: 297, width: 210 };
      s.thumbsize = 128;
      s.cacheIndex = 256;
      s.cache = [];
      s.pageRatio = o.pageRatio || s.viewport.width / s.viewport.height;
      s.textureLoadTimeOut = null;
      s.type = "TextureLibrary";
      if (
        Array === s.contentSource.constructor ||
        Array.isArray(s.contentSource) ||
        s.contentSource instanceof Array
      ) {
        s.contentSourceType = u.IMAGE;
        s.pageCount = s.contentSource.length;
        n("<img/>")
          .attr("src", s.contentSource[0])
          .on("load", function () {
            s.viewport.height = this.height;
            s.viewport.width = this.width;
            s.pageRatio = s.viewport.width / s.viewport.height;
            s.bookSize = {
              width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxLength,
              height: s.maxLength / (s.pageRatio < 1 ? 1 : s.pageRatio),
            };
            s.zoomViewport = {
              width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxDimension,
              height: s.maxDimension / (s.pageRatio < 1 ? 1 : s.pageRatio),
            };
            s.linkService = new PDFLinkService();
            n(this).off();
            if (s.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL) {
              s.pageCount = s.contentSource.length * 2 - 2;
              if (s.options.webgl == true) s.requiresImageTextureScaling = true;
            }
            if (a != null) {
              a(s);
              a = null;
            }
            T(this.height + ":" + this.width);
          });
      } else if (
        typeof s.contentSource == "string" ||
        s.contentSource instanceof String
      ) {
        var c = function () {
          if (s) {
            PDFJS.workerSrc = i.pdfjsWorkerSrc;
            s.contentSourceType = u.PDF;
            PDFJS.disableAutoFetch = true;
            PDFJS.disableStream = true;
            if (_ || U || s.options.disableFontFace == true) {
              PDFJS.disableFontFace =
                _ || U || s.options.disableFontFace == true;
            }
            PDFJS.imageResourcesPath = i.imageResourcesPath;
            PDFJS.cMapUrl = i.cMapUrl;
            PDFJS.cMapPacked = !0;
            PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK;
            var n = (s.loading = PDFJS.getDocument(
              s.options.docParameters
                ? s.options.docParameters
                : {
                    url: l.httpsCorrection(e),
                    rangeChunkSize: isNaN(t.defaults.rangeChunkSize)
                      ? 524288
                      : t.defaults.rangeChunkSize,
                  }
            ));
            n.then(
              function e(n) {
                s.pdfDocument = n;
                n.getPage(1).then(function (e) {
                  s.normalViewport = e.getViewport(1);
                  s.viewport = e.getViewport(1);
                  s.viewport.height = s.viewport.height / 10;
                  s.viewport.width = s.viewport.width / 10;
                  s.pageRatio = s.viewport.width / s.viewport.height;
                  s.bookSize = {
                    width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxLength,
                    height: s.maxLength / (s.pageRatio < 1 ? 1 : s.pageRatio),
                  };
                  s.zoomViewport = {
                    width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxDimension,
                    height:
                      s.maxDimension / (s.pageRatio < 1 ? 1 : s.pageRatio),
                  };
                  s.refPage = e;
                  if (n.numPages > 1) {
                    n.getPage(2).then(function (e) {
                      if (s.options.pageSize == t.PAGE_SIZE.AUTO) {
                        var i = e.getViewport(1);
                        var o = i.width / i.height;
                        if (o > s.pageRatio * 1.5) {
                          s.options.pageSize = t.PAGE_SIZE.DOUBLEINTERNAL;
                          s.pageCount = n.numPages * 2 - 2;
                        } else {
                          s.options.pageSize = t.PAGE_SIZE.SINGLE;
                        }
                      }
                      if (a != null) {
                        a(s);
                        a = null;
                      }
                    });
                  } else {
                    if (a != null) {
                      a(s);
                      a = null;
                    }
                  }
                });
                s.linkService = new PDFLinkService();
                s.linkService.setDocument(n, null);
                s.pageCount = n.numPages;
                s.contentSource = n;
              },
              function e(t) {
                if (s) {
                  var n = "",
                    i = document.createElement("a");
                  i.href = s.contentSource;
                  if (i.hostname !== window.location.hostname)
                    n = "CROSS ORIGIN!! ";
                  s.updateInfo(n + "Cannot access file!  " + s.contentSource);
                }
              }
            );
            n.onProgress = function e(t) {
              if (s) {
                var n = (100 * t.loaded) / t.total;
                if (isNaN(n)) {
                  if (t && t.loaded) {
                    s.updateInfo(
                      "YÃ¼kleniyor PDF " +
                        (Math.ceil(t.loaded / 1e4) / 100).toString() +
                        "MB ..."
                    );
                  } else {
                    s.updateInfo("YÃ¼kleniyor PDF ...");
                  }
                } else {
                  s.updateInfo(
                    "YÃ¼kleniyor PDF " + n.toString().split(".")[0] + "% ..."
                  );
                }
              }
            };
          }
        };
        var d = function () {
          if (s) {
            i.pdfjsWorkerSrc += "?ver=" + t.version;
            s.updateInfo("YÃ¼kleniyor PDF Worker ...");
            var e = document.createElement("a");
            e.href = i.pdfjsWorkerSrc;
            if (e.hostname !== window.location.hostname) {
              s.updateInfo("YÃ¼kleniyor PDF Worker CORS ...");
              n.ajax({
                url: i.pdfjsWorkerSrc,
                cache: true,
                success: function (e) {
                  i.pdfjsWorkerSrc = t.createObjectURL(e, "text/javascript");
                  c();
                },
              });
            } else {
              c();
            }
          }
        };
        if (window.PDFJS == null) {
          if (s) {
            s.updateInfo("YÃ¼kleniyor PDF Service ...");
            F(
              i.pdfjsSrc + "?ver=" + t.version,
              function () {
                if (typeof define === "function" && define.amd) {
                  s.updateInfo("YÃ¼kleniyor PDF Service (require) ...");
                  require.config({
                    paths: {
                      "pdfjs-dist/build/pdf.worker": i.pdfjsWorkerSrc.replace(
                        ".js",
                        ""
                      ),
                    },
                  });
                  require(["pdfjs-dist/build/pdf"], function (e) {
                    d();
                  });
                } else {
                  d();
                }
              },
              function () {
                s.updateInfo("Unable to load PDF service..");
              }
            );
          }
        } else {
          c();
        }
      } else {
        console.error(
          "Unknown source type. Please check documentation for help"
        );
      }
      this.dispose = function () {
        if (s.loading && s.loading.destroy) {
          s.loading.destroy();
        }
        s.loading = null;
        if (s.textureLoadTimeOut) {
          clearTimeout(s.textureLoadTimeOut);
          s.textureLoadTimeOut = null;
        }
        if (this.targetObject) {
          if (
            this.targetObject.thumbContainer &&
            this.targetObject.thumbContainer.remove
          )
            this.targetObject.thumbContainer.remove();
          if (
            this.targetObject.outlineContainer &&
            this.targetObject.outlineContainer.remove
          )
            this.targetObject.outlineContainer.remove();
          if (this.targetObject.dispose) this.targetObject.dispose();
          this.targetObject.processPage = null;
          this.targetObject.requestPage = null;
          if (this.targetObject.container && this.targetObject.container.off)
            this.targetObject.container.off();
        }
        if (this.pdfDocument && this.pdfDocument.destroy)
          this.pdfDocument.destroy();
        if (this.linkService && this.linkService.dispose)
          this.linkService.dispose();
        if (this.outlineViewer && this.outlineViewer.dispose)
          this.outlineViewer.dispose();
        if (this.thumblist && this.thumblist.dispose) {
          this.thumblist.review = null;
          this.thumblist.dispose();
        }
        this.activeThumb = null;
        this.targetObject = null;
        this.pdfDocument = null;
        this.linkService = null;
        this.outlineViewer = null;
        this.thumblist = null;
        s = null;
      };
      return this;
    }
    a.prototype.updateInfo = function (e) {
      if (this.flipbook && this.flipbook.updateInfo) {
        this.flipbook.updateInfo(e);
      }
    };
    a.prototype.initThumbs = function () {
      var e = this;
      if (e.cache[e.thumbsize] == null) e.cache[e.thumbsize] = [];
      var t;
      var i = function () {
        clearTimeout(t);
        t = setTimeout(function () {
          t = setTimeout(a, e.waitPeriod / 2);
        }, e.waitPeriod);
      };
      var a = function () {
        var a = 0;
        if (Date.now() - e.thumblist.lastScrolled < 100) {
          a = 1;
        } else {
          e.targetObject.container
            .find(".df-thumb-container .df-vrow")
            .each(function () {
              var t = n(this);
              if (!t.hasClass("df-thumb-loaded")) {
                a++;
                var o = n(this).attr("id").replace("df-thumb", "");
                e.getPage(o, i, true);
                t.addClass("df-thumb-loaded");
                return false;
              }
            });
          if (a == 0) {
            clearTimeout(t);
          }
        }
        if (a > 0) {
          i();
        }
        if (e.activeThumb != e.targetObject._activePage) {
          var o =
            e.targetObject.thumbContainer != null &&
            e.targetObject.thumbContainer.hasClass("df-sidemenu-visible");
          if (o) {
            var r = e.thumblist.container;
            var s = r.scrollTop,
              l = r.getBoundingClientRect().height;
            var u = e.targetObject.thumbContainer.find(
              "#df-thumb" + e.targetObject._activePage
            );
            if (u.length > 0) {
              e.targetObject.thumbContainer
                .find(".df-selected")
                .removeClass("df-selected");
              u.addClass("df-selected");
              u = u[0];
              if (s + l < u.offsetTop + u.scrollHeight) u.scrollIntoView(false);
              else if (s > u.offsetTop) u.scrollIntoView();
              e.activeThumb = e.targetObject._activePage;
            } else {
              n(r).scrollTop(e.targetObject._activePage * 124);
              i();
            }
          }
        }
      };
      e.thumblist = e.targetObject.thumblist = new ThumbList({
        h: 500,
        addFn: function (e) {},
        scrollFn: i,
        itemHeight: 128,
        totalRows: e.pageCount,
        generatorFn: function (e) {
          var t = document.createElement("div");
          var n = e + 1;
          t.id = "df-thumb" + n;
          var i = document.createElement("div");
          i.innerHTML = n;
          t.appendChild(i);
          return t;
        },
      });
      e.thumblist.lastScrolled = Date.now();
      e.thumblist.review = i;
      i();
      var o = n("<div>").addClass(
        "df-thumb-container df-sidemenu-visible df-sidemenu"
      );
      o.append(n(e.thumblist.container).addClass("df-thumb-wrapper"));
      e.targetObject.thumbContainer = o;
      e.targetObject.container.append(o);
      var r = n(h.div, { class: "df-ui-btn df-ui-sidemenu-close ti-close" });
      o.append(r);
      e.thumblist.reset(n(e.thumblist.container).height());
      e.targetObject.container.on(
        "click",
        ".df-thumb-container .df-vrow",
        function (t) {
          t.stopPropagation();
          var i = n(this).attr("id").replace("df-thumb", "");
          e.targetObject.gotoPage(parseInt(i, 10));
        }
      );
    };
    a.prototype.initOutline = function () {
      var e = this;
      var t = n("<div>").addClass("df-outline-container df-sidemenu");
      var i = n("<div>").addClass("df-outline-wrapper");
      var a = n(h.div, { class: "df-ui-btn df-ui-sidemenu-close ti-close" });
      t.append(a).append(i);
      e.targetObject.container.append(t);
      e.targetObject.outlineContainer = t;
      e.outlineViewer = new BookMarkViewer({
        container: i[0],
        linkService: e.linkService,
        outlineItemClass: "df-outline-item",
        outlineToggleClass: "df-outline-toggle",
        outlineToggleHiddenClass: "df-outlines-hidden",
      });
      function o(t) {
        if (e.options.overwritePDFOutline == true) {
          t = [];
        }
        t = t || [];
        if (e.outline) {
          for (var n = 0; n < e.outline.length; n++) {
            e.outline[n].custom = true;
            if (t) t.push(e.outline[n]);
          }
        }
        e.outlineViewer.render({ outline: t });
      }
      if (e.pdfDocument) {
        e.pdfDocument.getOutline().then(function (e) {
          o(e);
        });
      } else {
        o([]);
      }
      if (e.options.autoEnableOutline == true) {
        e.targetObject.ui.outline.trigger("click");
      }
      if (e.options.autoEnableThumbnail == true) {
        e.targetObject.ui.thumbnail.trigger("click");
      }
    };
    a.prototype.checkViewportSize = function (e, t, n) {
      var a = this;
      var o = a.targetObject;
      var r = e * n,
        s = t * n;
      var l = a.cacheIndex;
      if (a.contentSourceType == u.PDF) {
        a.cacheIndex = Math.ceil(Math.max(r, s));
        a.cacheIndex = Math.floor(Math.max(r, s));
        a.cacheIndex = S(
          a.cacheIndex * i.pixelRatio,
          a.minDimension,
          a.maxDimension
        );
        if (a.cache[a.cacheIndex] == null) a.cache[a.cacheIndex] = [];
        if (l !== a.cacheIndex) {
          for (var c = 0; c < o.children.length; c++) {
            var d = o.children[c];
          }
          o.refresh();
        }
        a.imageViewport = a.refPage.getViewport(s / a.normalViewport.height);
        a.viewport =
          o.mode == "css"
            ? a.imageViewport
            : a.refPage.getViewport(
                a.bookSize.height / a.normalViewport.height
              );
        T(a.cacheIndex);
        var f = o.container.find(".linkAnnotation"),
          h = a.viewport.clone({ dontFlip: true });
        f.css({ transform: "matrix(" + h.transform.join(",") + ")" });
      } else {
        if (a.cache[a.cacheIndex] == null) a.cache[a.cacheIndex] = [];
      }
    };
    a.prototype.getCache = function (e, t) {
      return t == true
        ? this.cache[this.thumbsize] == null
          ? null
          : this.cache[this.thumbsize][e]
        : this.cache[this.cacheIndex] == null
        ? null
        : this.cache[this.cacheIndex][e];
    };
    a.prototype.setCache = function (e, t, n, i) {
      if (n == true) {
        if (this.cache[this.thumbsize] != null)
          this.cache[this.thumbsize][e] = t;
      } else {
        var a = i == null ? this.cacheIndex : i;
        if (this.cache[a] != null) this.cache[a][e] = t;
      }
    };
    a.prototype.setTarget = function (e) {
      var t = this;
      if (e == null) {
        return this.targetObject;
      } else {
        this.targetObject = e;
        e.contentProvider = this;
        e.container.removeClass("df-loading df-init");
        if (t.linkService != null) {
          t.linkService.setViewer(e);
          t.initOutline();
        }
        e.processPage = function (e, n) {
          if (e > 0 && e <= t.pageCount) {
            t.getPage(e, n);
          } else {
            t.setPage(e, i.textureLoadFallback, n);
          }
        };
        e.requestPage = function () {
          t.review("Request");
        };
        if (e.resize != null) e.resize();
      }
    };
    a.prototype.review = function (e) {
      var t = this;
      e = e || "timer review";
      clearTimeout(t.textureLoadTimeOut);
      t.textureLoadTimeOut = setTimeout(function () {
        t.textureLoadTimeOut = setTimeout(
          t.reviewPages,
          t.waitPeriod / 2,
          t,
          e
        );
      }, t.waitPeriod);
    };
    a.prototype.reviewPages = function (e, t) {
      e = e || this;
      var i = e.targetObject;
      if (i == null) return;
      var a = N(i);
      if (t != null) T(t);
      var o = false;
      var r, s;
      for (r = 0; r < e.targetObject.children.length; r++) {
        s = i.children[r];
        if (s.isFlipping == true) {
          o = true;
          break;
        }
      }
      if (o == false) {
        var l = i.children.length > 3 ? 3 : i.children.length;
        var u = l / 2;
        var c = a ? i._activePage : D(i._activePage);
        e.baseNumber = c;
        if (e.zoomScale > 1) {
          l = 1;
        }
        for (r = 0; r < l; r++) {
          var d = Math.floor(r / 2);
          var f =
            r % 2 == 0 ? -d * (a ? 1 : 2) : (d == 0 ? 1 : d) * (a ? 1 : 2);
          var h = c + f,
            p = c + f + 1;
          var g = i.getPageByNumber(h),
            m = i.getPageByNumber(p),
            v = h + "|" + e.cacheIndex,
            b = p + "|" + e.cacheIndex;
          var w = 0;
          if (g != null && g.frontPageStamp != v && g.visible == true) {
            g.frontTextureLoaded = false;
            i.processPage(h, function () {
              e.review("Batch Call");
            });
            g.frontPageStamp = v;
            w++;
          }
          if (m != null && m.backPageStamp != b && m.visible == true && !a) {
            m.backTextureLoaded = false;
            i.processPage(p, function () {
              e.review("Batch Call");
            });
            m.backPageStamp = b;
            w++;
          }
          if (f == 0 && e.annotedPage !== c) {
            e.getAnnotations(h);
            if (!a) e.getAnnotations(p);
            e.annotedPage = c;
          }
          if (w > 0) {
            break;
          }
        }
        if (w == 0) {
          if (i.mode !== "css") {
            e.setLoading(c);
          } else {
          }
        }
      } else {
        e.review("Revisit request");
        if (e.annotedPage != null && i.mode !== "css") {
          var P = D(i._activePage);
          n(i.getContentLayer(P)).html("");
          n(i.getContentLayer(P + 1)).html("");
          e.annotedPage = null;
        }
      }
    };
    a.prototype.getPage = function (e, n, a) {
      var o = this;
      e = parseInt(e, 10);
      var r = e;
      var s = o.contentSource;
      if (e <= 0 && e >= o.pageCount) {
        o.setPage(e, i.textureLoadFallback, n, a);
      } else {
        if (o.contentSourceType == u.PDF) {
          if (o.getCache(e, a) != null) {
            o.setPage(e, o.getCache(e, a), n, a);
            T("Page " + e + " loaded from cache");
          } else {
            if (a !== true) o.setLoading(e, true);
            if (o.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL && e > 2) {
              r = Math.ceil((e - 1) / 2) + 1;
            }
            s.getPage(r, a).then(function (t) {
              c(t, e, n, a);
            });
          }
        } else if (
          o.contentSourceType == u.IMAGE ||
          o.contentSourceType == u.HTML
        ) {
          if (o.getCache(e, a) != null) {
            o.setPage(e, o.getCache(e, a), n, a);
            T("Page " + e + " loaded from cache");
          } else {
            if (a !== true) o.setLoading(e, true);
            if (o.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL && e > 2) {
              r = Math.ceil((e - 1) / 2) + 1;
            }
            l(
              s[r - 1],
              function (t) {
                o.setCache(e, t, a, o.cacheIndex);
                o.setPage(e, t, n, a);
                if (n != null) n();
              },
              o.isCrossOrigin
            );
          }
        }
      }
      function l(e, n, a) {
        var o = new Image();
        o.crossOrigin = "Anonymous";
        o.onload = function () {
          if (a == true) {
            var r = document.createElement("canvas"),
              s = r.getContext("2d");
            r.width = o.width;
            r.height = o.height;
            s.drawImage(o, 0, 0);
            if (i.canvasToBlob == true) {
              r.toBlob(
                function (e) {
                  var i = t.createObjectURL(e, "image/jpeg");
                  if (n != null) n(i);
                },
                "image/jpeg",
                0.85
              );
            } else {
              if (n != null) n(r);
            }
          } else {
            if (n != null) n(e);
          }
          o.onload = null;
          o = null;
        };
        o.src = e;
        if (o.complete || o.complete === undefined) {
          o.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          o.src = e;
        }
      }
      function c(e, n, i, a) {
        var r = o.options.forceFit;
        var s =
          o.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL &&
          n > 1 &&
          n < o.pageCount;
        var l = s && r ? 2 : 1;
        var u = r ? e.getViewport(1) : o.normalViewport;
        var c = o.cacheIndex / Math.max(u.width / l, u.height);
        if (o.webgl == true) {
          c = O(o.cacheIndex) / (o.pageRatio > 1 ? u.width / l : u.height);
        }
        var d = document.createElement("canvas");
        var f = performance.now();
        var h = o.cacheIndex;
        var p = d.getContext("2d");
        if (a == true) {
          c = o.thumbsize / o.normalViewport.height;
        }
        d.height = Math.round(u.height * c);
        d.width = Math.round((u.width / l) * c);
        if (
          o.targetObject.mode == "css" &&
          Math.abs(o.targetObject.zoomHeight - d.height) < 2
        ) {
          d.height = o.targetObject.zoomHeight + 0;
          d.width = o.targetObject.zoomWidth + 0;
        }
        u = e.getViewport(c);
        T("rendering " + n + " at " + d.width + "x" + d.height);
        if (s) {
          if (A(o.targetObject)) {
            if (n % 2 == 0) {
              u.transform[4] = -d.width;
            }
          } else {
            if (n % 2 == 1) {
              u.transform[4] = -d.width;
            }
          }
        }
        var g = { canvasContext: p, viewport: u };
        e.cleanupAfterRender = true;
        var m = e.render(g);
        m.promise.then(function () {
          T(performance.now() - f);
          f = performance.now();
          if (
            a == true ||
            (o.options.canvasToBlob == true && o.webgl !== true)
          ) {
            d.toBlob(
              function (e) {
                var r = t.createObjectURL(e, "image/jpeg");
                T(performance.now() - f);
                o.setCache(n, r, a, h);
                o.setPage(n, r, i, a);
              },
              "image/jpeg",
              o.pdfRenderQuality
            );
          } else {
            T("Setting Page " + n);
            o.setPage(n, d, i, a);
          }
          g = null;
        });
      }
    };
    a.prototype.getTargetPage = function (e) {};
    a.prototype.setLoading = function (e, t) {
      if (this.targetObject != null) {
        if (this.webgl == true) {
          var i = this.targetObject.container;
          if (t == true) {
            if (i.isLoading !== true) {
              i.addClass("df-loading");
              i.isLoading = true;
              T("YÃ¼kleniyor icon at " + e + " as " + t);
            }
          } else {
            if (i.isLoading != null) {
              i.removeClass("df-loading");
              i.isLoading = null;
              T("YÃ¼kleniyor icon at " + e + " as " + t);
            }
          }
        } else {
          var a = n(this.targetObject.getContentLayer(e));
          if (a != null) {
            if (t == true) a.addClass("df-page-loading");
            else a.removeClass("df-page-loading");
            T("YÃ¼kleniyor icon at " + e + " as " + t);
          }
        }
      }
    };
    a.prototype.getAnnotations = function (e) {
      var i = this;
      if (i.options.enableAnnotation == false) return;
      var a = i.targetObject;
      e = parseInt(e, 10);
      var o = i.contentSource;
      var r = n(a.getContentLayer(e));
      r.empty();
      if (e > 0 && e <= i.pageCount) {
        if (i.contentSourceType == u.PDF) {
          var s = D(e);
          var l = e;
          if (i.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL && e > 2) {
            l = Math.ceil((e - 1) / 2) + 1;
          }
          o.getPage(l).then(function (t) {
            if (r != null && r.length > 0) {
              i.setupAnnotations(t, i.viewport, r, e);
            }
          });
        }
        if (i.links != null && i.links[e] != null) {
          var c = i.links[e];
          for (var d = 0; d < c.length; d++) {
            var f = c[d];
            var h;
            if (f.dest && f.dest.indexOf && f.dest.indexOf("[html]") == 0) {
              h = document.createElement("div");
              h.innerHTML = f.dest.substr(6);
              h.className = "customHtmlAnnotation";
            } else {
              h = document.createElement("a");
              h.setAttribute("dest", f.dest);
              h.className = "customLinkAnnotation";
              h.href = "#" + f.dest;
              h.onclick = function () {
                var e = this.getAttribute("dest");
                if (e) {
                  i.linkService.customNavigateTo(e);
                }
                return false;
              };
            }
            h.style.left = f.x + "%";
            h.style.top = f.y + "%";
            h.style.width = f.w + "%";
            h.style.height = f.h + "%";
            r[0].appendChild(h);
          }
        }
        if (i.html != null && i.html[e] != null) {
          var p = i.html[e];
          r.append(n("<div class='customHTMLAnnotation'>").html(p));
        }
      }
    };
    a.prototype.setPage = function (e, t, n, a) {
      var o = this;
      var r = o.targetObject;
      var s = A(r);
      var l = N(r);
      if (a == true) {
        var u = o.targetObject.container.find("#df-thumb" + e);
        u.css({ backgroundImage: C(t) });
      } else {
        if (t == i.textureLoadFallback) {
          T("Fallback on " + e);
        }
        var c = r.getPageByNumber(e);
        if (c != null) {
          if ((e % 2 != 0 && !s) || (e % 2 != 1 && s && !l) || (l && !s)) {
            T(e + "rendered to back of " + c.color);
            c.backImage(t, function (t, i) {
              c.backTextureLoaded = true;
              o.setLoading(e);
              if (
                o.requiresImageTextureScaling &&
                i &&
                e != 1 &&
                e != o.pageCount
              ) {
                i.repeat.x = 0.5;
                i.offset.x = 0.5;
              }
              if (n != null) n();
            });
          } else {
            T(e + "rendered to front of " + c.color);
            c.frontImage(t, function (t, i) {
              c.frontTextureLoaded = true;
              o.setLoading(e);
              if (
                o.requiresImageTextureScaling &&
                i &&
                e != 1 &&
                e != o.pageCount
              ) {
                i.repeat.x = 0.5;
              }
              if (n != null) n();
            });
          }
        } else {
          T("Invalid set request on Page " + e);
        }
      }
    };
    a.prototype.setupAnnotations = function (e, i, a, o) {
      if (a == null || n(a).length == 0) return;
      var r = this;
      return e.getAnnotations().then(function (s) {
        i = i.clone({ dontFlip: true });
        if (
          r.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL &&
          o > 2 &&
          o % 2 == 1
        ) {
        } else if (o == 1) {
        }
        if (a == null) {
          return;
        }
        a = n(a);
        if (a.find(".annotationDiv").length == 0) {
          a.append(n("<div class='annotationDiv'>"));
        }
        var l = a.find(".annotationDiv");
        l.empty();
        if (
          r.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL &&
          o > 2 &&
          o % 2 == 1
        ) {
          l.css({ left: "-100%" });
        } else if (o == 1) {
          l.css({ left: "" });
        }
        PDFJS.AnnotationLayer.render({
          annotations: s,
          div: l[0],
          page: e,
          viewport: i,
          linkService: r.linkService,
        });
        if (r.options.annotationClass && r.options.annotationClass !== "") {
          l.find(" > section").addClass(r.options.annotationClass);
        }
      });
    };
    return a;
  })({});
  var K = (function () {
    function e(e) {
      this.angles = e.angles || [0, 0, 0, 0, 0, 0];
      this.stiffness = e.angles || 0.1;
      this.segments = e.segments || 1;
      this.canvasMode =
        e.contentSourceType !== u.IMAGE && e.canvasToBlob == false;
      this.initDOM();
    }
    function a(e) {
      var t = (e.contentLayer = n(h.div, { class: "df-page-content" }));
      e.append(t);
    }
    e.prototype = {
      initDOM: function () {
        var e = (this.element = n(h.div, { class: "df-book-page" }));
        var t = (this.wrapper = n(h.div, { class: "df-page-wrapper" }));
        var i = (this.front = n(h.div, { class: "df-page-front" }));
        var o = (this.back = n(h.div, { class: "df-page-back" }));
        var r = (this.foldInnerShadow = n(h.div, {
          class: "df-page-fold-inner-shadow",
        }));
        var s = (this.foldOuterShadow = n(h.div, {
          class: "df-page-fold-outer-shadow",
        }));
        this.frontIMG = new Image();
        this.backIMG = new Image();
        a(i, this.segments, true);
        a(o, this.segments, false);
        e.append(t).append(s);
        t.append(i).append(o).append(r);
      },
      updatePoint: function (e) {
        if (e == null) return;
        var n =
          this.parent.dragPage != null
            ? this.parent.dragPage
            : e.page != null
            ? e.page
            : this;
        var i = n.element.width(),
          a = n.element.height();
        var o = this.parent.corner != null ? this.parent.corner : e.corner,
          r = t.CORNERS;
        var s = n.side == d.right,
          l = o == r.BL || o == r.BR;
        e.rx = s == true ? i * 2 - e.x : e.x;
        e.ry = l == true ? a - e.y : e.y;
        var u = Math.atan2(e.ry, e.rx);
        u = Math.PI / 2 - S(u, 0, m(90));
        var c = s ? e.x / 2 : i - e.x / 2,
          f = e.ry / 2,
          h = Math.max(0, Math.sin(u - Math.atan2(f, c)) * L(c, f)),
          p = 0.5 * L(e.rx, e.ry);
        var g = Math.round(i - h * Math.sin(u)),
          b = Math.round(h * Math.cos(u)),
          P = v(u);
        var x = l ? (s ? 180 + (90 - P) : 180 + P) : s ? P : 90 - P;
        var C = l ? (s ? 180 + (90 - P) : P) : s ? P + 180 : x,
          E = l ? (s ? 90 - P : P + 90) : s ? x - 90 : x + 180,
          k = s ? i - g : g,
          I = l ? a + b : -b,
          T = s ? -g : g - i,
          O = l ? -a - b : b;
        var R = S((e.distance * 0.5) / i, 0, 0.5);
        var D = S(((i * 2 - e.rx) * 0.5) / i, 0.05, 0.3);
        n.element.addClass("df-folding");
        var F = s ? n.back : n.front;
        var M = s ? n.front : n.back;
        var N = n.foldOuterShadow;
        var A = n.foldInnerShadow;
        n.wrapper.css({ transform: w(k, I) + y(x) });
        F.css({ transform: y(-x) + w(-k, -I) });
        M.css({
          transform: y(C) + w(T, O),
          boxShadow: "rgba(0, 0, 0, " + R + ") 0px 0px 20px",
        });
        A.css({
          transform: y(C) + w(T, O),
          opacity: D / 2,
          backgroundImage:
            z.css +
            "linear-gradient( " +
            E +
            "deg, rgba(0, 0, 0, 0.25) , rgb(0, 0, 0) " +
            p * 0.7 +
            "px, rgb(255, 255, 255) " +
            p +
            "px)",
        });
        N.css({
          opacity: D / 2,
          left: s ? "auto" : 0,
          right: s ? 0 : "auto",
          backgroundImage:
            z.css +
            "linear-gradient( " +
            (-E + 180) +
            "deg, rgba(0, 0, 0,0) " +
            p / 3 +
            "px, rgb(0, 0, 0) " +
            p +
            "px)",
        });
      },
      updateAngle: function (e, t) {
        var n = this.element.width() * 5;
        this.wrapper.css({
          perspective: n,
          perspectiveOrigin: t == true ? "0% 50%" : "100% 50%",
        });
        this.front.css({
          display:
            t == true
              ? e <= -90
                ? "block"
                : "none"
              : e < 90
              ? "block"
              : "none",
          transform:
            (z.dom !== "MfS" ? "" : "perspective(" + n + "px) ") +
            (t == true ? "translateX(-100%) " : "") +
            "rotateY(" +
            ((t == true ? 180 : 0) + e) +
            "deg)",
        });
        this.back.css({
          display:
            t == true
              ? e > -90
                ? "block"
                : "none"
              : e >= 90
              ? "block"
              : "none",
          transform:
            (z.dom !== "MSd" ? "" : "perspective(" + n + "px) ") +
            (t == false ? "translateX(100%) " : "") +
            "rotateY(" +
            ((t == false ? -180 : 0) + e) +
            "deg)",
        });
        return;
      },
      tween: function (e) {
        var n = this;
        if (n == null || n.parent == null) return;
        var i = N(n.parent);
        var a = n.side == d.right;
        var o = n.parent.direction == t.DIRECTION.RTL;
        var r =
          n.parent.corner == t.CORNERS.BL || n.parent.corner == t.CORNERS.BR;
        var s = n.magnetic == true;
        var l = r ? n.parent.height : 0;
        var u,
          c,
          f,
          h = 0;
        var p = (n.end =
          n && n.animateToReset == true
            ? { x: a ? n.parent.fullWidth : 0, y: l }
            : { x: a ? 0 : n.parent.fullWidth, y: l });
        n.ease = n.isHard
          ? TWEEN.Easing.Quadratic.InOut
          : TWEEN.Easing.Linear.None;
        var g = n.parent.duration;
        if (n.isHard == true) {
          if (e != null) {
            h = I(e.distance, e.fullWidth);
          }
          u = n.init = { angle: h * (a ? -1 : 1) };
          p = n.end =
            n && n.animateToReset == true
              ? { angle: a ? 0 : -0 }
              : { angle: a ? -180 : 180 };
        } else {
          if (e == null) {
            u = n.init =
              n && n.animateToReset == true
                ? { x: a ? 0 : n.parent.fullWidth, y: 0 }
                : { x: a ? n.parent.fullWidth : 0, y: 0 };
            c = n.first = { x: ((a ? 3 : 1) * n.parent.fullWidth) / 4, y: 0 };
            f = n.mid = { x: ((a ? 1 : 3) * n.parent.fullWidth) / 4, y: 0 };
          } else {
            u = n.init = { x: e.x, y: e.y, opacity: 1 };
            c = n.first = { x: (e.x * 3) / 4, y: (e.y * 3) / 4, opacity: 1 };
            f = n.mid = { x: e.x / 4, y: e.y / 4, opacity: 1 };
            g =
              (n.parent.duration * k(u.x, u.y, p.x, p.y)) / n.parent.fullWidth;
            g = S(g, n.parent.duration / 3, n.parent.duration);
          }
        }
        u.index = 0;
        p.index = 1;
        n.isFlipping = true;
        var m = function (e) {
          if (n.isHard == true) {
            n.updateAngle(e.angle, a);
            n.angle = e.angle;
          } else {
            n.updatePoint({ x: e.x, y: e.y });
            n.x = e.x;
            n.y = e.y;
          }
          if (i && !s)
            n.element[0].style.opacity =
              (a && !o) || (!a && o)
                ? e.index > 0.5
                  ? 2 * (1 - e.index)
                  : 1
                : e.index < 0.5
                ? 2 * e.index
                : 1;
        };
        if (i && ((!a && !o) || (a && o))) n.element[0].style.opacity = 0;
        var v = (n.completeTween =
          n.completeTween ||
          function (e) {
            n.isFlipping = false;
            if (n.isHard == true) {
              n.updateAngle(n.end.angle);
              n.back.css({ display: "block" });
              n.front.css({ display: "block" });
            } else {
              n.updatePoint({ x: n.end.x, y: n.end.y });
            }
            n.element[0].style.opacity = 1;
            if (n.animateToReset !== true) {
              n.side = n.side == d.right ? d.left : d.right;
            } else n.animateToReset = null;
            n.currentTween = null;
            n.pendingPoint = null;
            n.magnetic = false;
            n.parent.dragPage = null;
            n.parent.corner = t.CORNERS.NONE;
            if (e != true) n.parent.refresh();
          });
        if (n.isHard == true) {
          n.currentTween = new TWEEN.Tween(u)
            .delay(0)
            .to(p, n.parent.duration)
            .onUpdate(function () {
              m(this);
            })
            .easing(n.ease)
            .onComplete(n.completeTween)
            .start();
        } else {
          if (e == null) {
            n.currentTween = new TWEEN.Tween(u)
              .delay(0)
              .to(p, n.parent.duration)
              .onUpdate(function () {
                m(this);
              })
              .easing(TWEEN.Easing.Sinusoidal.Out)
              .onComplete(n.completeTween)
              .start();
          } else {
            n.currentTween = new TWEEN.Tween(u)
              .delay(0)
              .to(p, g)
              .onUpdate(function () {
                m(this);
              })
              .easing(TWEEN.Easing.Sinusoidal.Out)
              .onComplete(n.completeTween);
            n.currentTween.start();
          }
        }
      },
      frontImage: function (e, t) {
        var a = this;
        function o() {
          a.front.css({ backgroundImage: C(e) });
          if (t != null) t();
        }
        if (a.canvasMode == true) {
          a.front.find(">canvas").remove();
          if (e !== i.textureLoadFallback) {
            a.front.append(n(e));
          }
          if (t != null) t();
        } else {
          if (e == i.textureLoadFallback) {
            o();
          } else {
            a.frontIMG.onload = o;
            a.frontIMG.src = e;
          }
        }
      },
      backImage: function (e, t) {
        var a = this;
        function o() {
          a.back.css({ backgroundImage: C(e) });
          if (t != null) t();
        }
        if (a.canvasMode == true) {
          a.back.find(">canvas").remove();
          if (e !== i.textureLoadFallback) {
            a.back.append(n(e));
          }
          if (t != null) t();
        } else {
          if (e == i.textureLoadFallback) {
            o();
          } else {
            a.backIMG.onload = o;
            a.backIMG.src = e;
          }
        }
      },
      updateCSS: function (e) {
        this.element.css(e);
      },
      resetCSS: function () {
        this.wrapper.css({ transform: "" });
        this.front.css({ transform: "", boxShadow: "" });
        this.back.css({ transform: "", boxShadow: "" });
      },
      clearTween: function (e) {
        this.currentTween.stop();
        this.completeTween(e == true);
        this.resetCSS();
      },
    };
    return e;
  })();
  var X = (function (e) {
    H(s, e);
    function o(e) {
      e.parent.container.find(".df-folding").removeClass("df-folding");
      e.element.addClass("df-folding");
    }
    function r(e) {
      var t = false;
      for (var n = 0; n < e.pages.length; n++) {
        var i = e.pages[n];
        if (i.isFlipping == true) {
          t = true;
          break;
        }
      }
      return t;
    }
    function s(e, i) {
      var s = this;
      s.type = "BookCSS";
      s.images = e.images || [];
      s.pageCount = e.pageCount || 2;
      s.foldSense = 50;
      s.stackCount = 4;
      s.mode = "css";
      s.pages = [];
      s.duration = e.duration;
      s.container = n(i);
      s.options = e;
      s.drag = d.none;
      s.pageCount =
        s.pageCount == 1 ? s.pageCount : Math.ceil(s.pageCount / 2) * 2;
      s.pageMode =
        e.pageMode ||
        (B || s.pageCount <= 2 ? t.PAGE_MODE.SINGLE : t.PAGE_MODE.DOUBLE);
      s.singlePageMode =
        e.singlePageMode ||
        (B ? t.SINGLE_PAGE_MODE.BOOKLET : t.SINGLE_PAGE_MODE.ZOOM);
      s.swipe_threshold = B ? 15 : 50;
      s.direction = e.direction || t.DIRECTION.LTR;
      s.startPage = 1;
      s.endPage = s.pageCount;
      s._activePage = e.openPage || s.startPage;
      s.hardConfig = e.hard;
      a =
        "WebKitCSSMatrix" in window ||
        (document.body && "MozPerspective" in document.body.style);
      s.animateF = function () {
        if (TWEEN.getAll().length > 0) TWEEN.update();
        else clearInterval(s.animate);
      };
      s.init(e);
      s.skipDrag = false;
      function u(e) {
        if (s.dragPage != e.page && e.page.visible == true) {
          s.dragPage.clearTween(true);
          s.dragPage = e.page;
          s.corner = e.corner;
          s.dragPage.pendingPoint = e;
        }
      }
      var c = function (e) {
          var n = s.eventToPoint(e);
          if (
            e.touches != null &&
            e.touches.length == 2 &&
            s.startTouches != null
          ) {
            s.zoomDirty = true;
            var i = l.getVectorAvg(l.getTouches(e, s.container.offset())),
              a = l.calculateScale(s.startTouches, l.getTouches(e)),
              o = a / s.lastScale;
            var u = s.contentProvider.zoomScale,
              c = i.x,
              f = i.y;
            s.stage.css({
              transform:
                "translate3d(" +
                s.left +
                "px," +
                s.top +
                "px,0) scale3d(" +
                a +
                "," +
                a +
                ",1)",
            });
            s.lastScale = a;
            s.lastZoomCenter = i;
            e.preventDefault();
          }
          if (
            (e.touches != null && e.touches.length > 1) ||
            s.startPoint == null ||
            s.startTouches != null
          )
            return;
          var h = s.dragPage || n.page;
          if (s.contentProvider.zoomScale !== 1) {
            if (e.touches != null || s.isPanning == true) {
              s.pan(n);
              e.preventDefault();
            }
          } else {
            if (s.skipDrag !== true) {
              var p = n.distance;
              if (!r(s)) {
                if (s.dragPage != null || n.isInside == true) {
                  if (s.dragPage != null) {
                    T("set mouse down move");
                  } else {
                    n.y = S(n.y, 1, s.height - 1);
                    n.x = S(n.x, 1, n.fullWidth - 1);
                  }
                  var g = s.corner || n.corner;
                  if (h.isHard) {
                    var m = g == t.CORNERS.BR || g == t.CORNERS.TR;
                    var v = I(n.distance, n.fullWidth);
                    h.updateAngle(v * (m ? -1 : 1), m);
                  } else {
                    h.updatePoint(n, s);
                  }
                  h.magnetic = true;
                  h.magneticCorner = n.corner;
                  e.preventDefault();
                }
                if (
                  s.dragPage == null &&
                  h != null &&
                  n.isInside == false &&
                  h.magnetic == true
                ) {
                  h.pendingPoint = n;
                  h.animateToReset = true;
                  s.corner = h.magneticCorner;
                  s.animatePage(h);
                  h.pendingPoint = null;
                  h.magnetic = false;
                  h.magneticCorner = null;
                }
                if (
                  s.isPanning == true &&
                  s.dragPage == null &&
                  s.contentProvider.zoomScale == 1
                ) {
                  var b = n.x - s.lastPos,
                    w = performance.now() - s.lastTime;
                  if (Math.abs(b) > s.swipe_threshold) {
                    if (b < 0) {
                      s.next();
                    } else {
                      s.prev();
                    }
                    s.drag = d.none;
                    s.isPanning = false;
                    e.preventDefault();
                  }
                  s.lastPos = n.x;
                  s.lastTime = performance.now();
                }
              }
            }
          }
        },
        f = function (e) {
          if (e.touches != null && e.touches.length == 0) {
            var n = s.contentProvider.zoomScale;
            if (s.zoomDirty == true) {
              s.previewObject.contentProvider.zoomScale = l.limitAt(
                s.previewObject.contentProvider.zoomScale * s.lastScale,
                1,
                s.previewObject.contentProvider.maxZoom
              );
              s.previewObject.zoomValue =
                s.previewObject.contentProvider.zoomScale * 1;
              s.previewObject.resize();
              s.zoomDirty = false;
            }
            s.wrapper.css({ transform: "" });
            s.lastScale = null;
            s.startTouches = null;
          }
          s.isPanning = false;
          if (e.touches != null && e.touches.length > 1) return;
          if (s.skipDrag !== true) {
            var i = s.eventToPoint(e);
            if (s.dragPage) {
              e.preventDefault();
              s.dragPage.pendingPoint = i;
              if (
                i.x == s.startPoint.x &&
                i.y == s.startPoint.y &&
                i.isInside == true
              ) {
                if (s.corner == t.CORNERS.BR || s.corner == t.CORNERS.TR) {
                  u(i);
                  if (s.dragPage.isFlipping !== true) s.next();
                } else if (
                  s.corner == t.CORNERS.BL ||
                  s.corner == t.CORNERS.TL
                ) {
                  u(i);
                  if (s.dragPage.isFlipping !== true) s.prev();
                }
              } else if (s.dragPage.isFlipping !== true) {
                if (i.distance > i.fullWidth / 2) {
                  if (i.x > i.fullWidth / 2) s.prev();
                  else s.next();
                } else {
                  s.dragPage.animateToReset = true;
                  s.animatePage(s.dragPage);
                }
              }
              if (s.dragPage) {
                s.dragPage.pendingPoint = null;
                s.dragPage.magnetic = false;
              }
            } else {
            }
            s.drag = d.none;
          }
        },
        h = function (e) {
          var n = s.eventToPoint(e);
          var i = e.srcElement || e.originalTarget;
          if (s.dragPage && s.dragPage.magnetic) return;
          if (
            s.wrapper[0].contains(e.target) &&
            s.contentProvider.zoomScale == 1 &&
            n.x == s.startPoint.x &&
            n.y == s.startPoint.y &&
            n.isInsidePage &&
            s.startPoint.page == n.page &&
            !n.page.isFlipping &&
            i.nodeName !== "A"
          ) {
            if (s.startPoint.page.side == 0) {
              s.corner = t.CORNERS.TL;
              s.prev();
              s.startPoint.page = null;
            } else {
              s.corner = t.CORNERS.TR;
              s.next();
              s.startPoint.page = null;
            }
            s.isPanning = false;
          }
        },
        p = function (e) {
          if (
            e.touches != null &&
            e.touches.length == 2 &&
            s.startTouches == null
          ) {
            s.startTouches = l.getTouches(e);
            s.lastScale = 1;
          }
          if (
            (e.touches != null && e.touches.length > 1) ||
            (e.touches == null && e.button !== 0)
          )
            return;
          var n = s.eventToPoint(e);
          s.startPoint = n;
          s.left = s.left || 0;
          s.top = s.top || 0;
          s.isPanning = true;
          s.lastPos = n.x;
          s.lastTime = performance.now();
          if (s.skipDrag !== true) {
            if (n.isInside == true && !r(s)) {
              s.startPoint = n;
              s.drag = n.drag;
              s.dragPage = n.page;
              s.corner = n.corner;
              T(s.corner);
              o(s.dragPage);
              if (n.page.isHard) {
              } else {
                n.page.updatePoint(n, s);
              }
              if (n.page.name == "0") {
                s.shadow.css({
                  width: "50%",
                  left: s.direction == t.DIRECTION.RTL ? 0 : "50%",
                  transitionDelay: "",
                });
              } else if (n.page.name == Math.ceil(s.pageCount / 2) - 1) {
                s.shadow.css({
                  width: "50%",
                  left: s.direction == t.DIRECTION.RTL ? "50%" : 0,
                  transitionDelay: "",
                });
              }
            }
          }
        },
        g = function (e) {
          var t = 0;
          if (e.wheelDelta != null) {
            t = e.wheelDelta / 120;
          } else if (e.detail != null) {
            t = -e.detail / 3;
          }
          var n = s.contentProvider.zoomScale,
            i = s.contentProvider.maxZoom;
          if (t) {
            if ((t > 0 && n < i) || (t < 0 && n > 1)) {
              e.stopPropagation();
              e.preventDefault();
              var a = s.eventToPoint(e);
              var o = s.eventToPoint(e);
              var r = {
                x: s.container.width() / 2,
                y: -23 + s.container.height() / 2,
              };
              s.previewObject.zoom(t);
              var l = s.contentProvider.zoomScale;
              if (n !== l) {
                var u = l / n;
                if (l == 1) {
                  s.left = 0;
                  s.top = 0;
                } else {
                  s.left *= u;
                  s.top *= u;
                }
                var c = (a.raw.x - r.x) * u,
                  d = (a.raw.y - r.y) * u;
                o.raw.x = r.x + c;
                o.raw.y = r.y + d;
                s.startPoint = o;
                s.pan(a);
                var f = s.dragPage || a.page;
                if (
                  s.dragPage == null &&
                  f != null &&
                  a.isInside == true &&
                  f.magnetic == true
                ) {
                  f.pendingPoint = a;
                  f.animateToReset = true;
                  s.corner = f.magneticCorner;
                  s.animatePage(f);
                  f.pendingPoint = null;
                  f.magnetic = false;
                  f.magneticCorner = null;
                }
              }
            }
          }
        };
      var m = s.container[0];
      var v = s.stage[0];
      if (m) {
        v.addEventListener("mousemove", c, false);
        v.addEventListener("touchmove", c, false);
        v.addEventListener("mousedown", p, false);
        v.addEventListener("click", h, false);
        v.addEventListener("mouseup", f, false);
        v.addEventListener("touchend", f, false);
        v.addEventListener("touchstart", p, false);
        if (s.options.scrollWheel == true) {
          v.addEventListener("mousewheel", g, false);
          v.addEventListener("DOMMouseScroll", g, false);
        }
      }
      this.dispose = function () {
        v.removeEventListener("mousemove", c, false);
        v.removeEventListener("touchmove", c, false);
        v.removeEventListener("mousedown", p, false);
        v.removeEventListener("click", h, false);
        v.removeEventListener("mouseup", f, false);
        v.removeEventListener("touchend", f, false);
        v.removeEventListener("touchstart", p, false);
        if (s.options.scrollWheel == true) {
          v.removeEventListener("mousewheel", g, false);
          v.removeEventListener("DOMMouseScroll", g, false);
        }
        s.updatePageCallback = null;
        s.flipCallback = null;
        s.animateF = null;
        s.stage.remove();
      };
    }
    s.prototype = {
      add: function (e) {
        if (e instanceof K) this.container.append(n(e.element));
        else this.container.append(n(e));
      },
      pan: function (e) {
        var t = this.startPoint;
        var n = this.contentProvider.zoomScale;
        var i = this.left + (e.raw.x - t.raw.x),
          a = this.top + (e.raw.y - t.raw.y);
        this.left = Math.round(S(i, -this.shiftWidth, this.shiftWidth));
        this.top = Math.round(S(a, -this.shiftHeight, this.shiftHeight));
        if (n == 1) {
          this.left = 0;
          this.top = 0;
        }
        this.startPoint = e;
        this.stage.css({
          transform: "translate3d(" + this.left + "px," + this.top + "px,0)",
        });
      },
      getPageByNumber: function (e) {
        var t = N(this) ? (A(this) ? e + 1 : e) : Math.floor((e - 1) / 2);
        var n;
        for (var i = 0; i < this.pages.length; i++) {
          if (t == parseInt(this.pages[i].name, 10)) n = this.pages[i];
        }
        return n;
      },
      getPageSide: function (e) {
        var n = this.direction == t.DIRECTION.RTL;
        var i = this.getPageByNumber(e);
        if (i == null) return;
        if (N(this)) return n ? i.front : i.back;
        if (e % 2 == 0) return n ? i.back : i.front;
        else return n ? i.front : i.back;
      },
      getContentLayer: function (e) {
        var t = this.getPageSide(e);
        return t == null ? null : t.contentLayer;
      },
    };
    s.prototype.init = function (e) {
      var t = this;
      t.stage = n(h.div, { class: "df-book-stage" });
      t.wrapper = n(h.div, { class: "df-book-wrapper" });
      t.shadow = n(h.div, { class: "df-book-shadow" });
      t.container.append(t.stage);
      t.stage.append(t.wrapper);
      t.wrapper.append(t.shadow);
      t.createStack(e);
    };
    s.prototype.createStack = function (e) {
      var t = "red,green,blue,yellow,orange,black".split(",");
      for (var n = 0; n < this.stackCount; n++) {
        e.angles = [, this.stackCount - n];
        e.stiffness = (this.stackCount - n) / 100;
        var i = new K(e);
        i.angles[1] = 180;
        i.index = n;
        i.parent = this;
        i.textureReady = false;
        i.textureRequested = false;
        this.wrapper.append(i.element);
        i.isFlipping = false;
        this.pages.push(i);
        i.color = t[n];
      }
      this.children = this.pages;
    };
    s.prototype.isPageHard = function (e) {
      return l.isHardPage(this.hardConfig, e, this.pageCount, N(this));
    };
    s.prototype.setDuration = function (e) {
      this.duration = e;
    };
    s.prototype.moveBy = function (e) {
      var t = this._activePage + e;
      t = S(t, this.startPage, this.endPage);
      this.gotoPage(t);
    };
    s.prototype.next = function (e) {
      if (e == null)
        e = this.direction == t.DIRECTION.RTL ? -this.pageMode : this.pageMode;
      this.moveBy(e);
    };
    s.prototype.prev = function (e) {
      if (e == null)
        e = this.direction == t.DIRECTION.RTL ? this.pageMode : -this.pageMode;
      this.moveBy(e);
    };
    s.prototype.eventToPoint = function (e) {
      e = M(e);
      var i = this.wrapper,
        a = this.pages,
        o = this.pageWidth,
        r = this.fullWidth,
        s = this.height,
        l = n(window),
        u = { x: e.clientX, y: e.clientY };
      var c = u.x - i[0].getBoundingClientRect().left;
      var f = u.y - i[0].getBoundingClientRect().top;
      u.x = u.x - this.container[0].getBoundingClientRect().left;
      u.y = u.y - this.container[0].getBoundingClientRect().top;
      var h =
        this.drag == d.none
          ? c < o
            ? c
            : r - c
          : this.drag == d.left
          ? c
          : r - c;
      var p = c < o ? a[this.stackCount / 2 - 1] : a[this.stackCount / 2];
      var g =
        c < this.foldSense ? d.left : c > r - this.foldSense ? d.right : d.none;
      var m = c,
        v = f,
        b = s,
        w = r,
        P = this.foldSense,
        y = t.CORNERS,
        x;
      if (m >= 0 && m < P) {
        if (v >= 0 && v <= P) x = y.TL;
        else if (v >= b - P && v <= b) x = y.BL;
        else if (v > P && v < b - P) x = y.L;
        else x = y.NONE;
      } else if (m >= w - P && m <= w) {
        if (v >= 0 && v <= P) x = y.TR;
        else if (v >= b - P && v <= b) x = y.BR;
        else if (v > P && v < b - P) x = y.R;
        else x = y.NONE;
      } else x = y.NONE;
      return {
        isInsidePage: m >= 0 && m <= w && v >= 0 && v <= b,
        isInside: x !== y.NONE && x !== y.L && x !== y.R,
        x: c,
        y: f,
        fullWidth: r,
        rawDistance: r - c,
        distance: h,
        page: p,
        drag: g,
        foldSense: this.foldSense,
        event: e,
        raw: u,
        corner: x,
      };
    };
    s.prototype.gotoPage = function (e) {
      e = parseInt(e, 10);
      this._activePage = e;
      if (this.autoPlay == true) {
        this.previewObject.setAutoPlay(this.autoPlay);
      }
      this.updatePage(e);
      if (this && this.thumblist && this.thumblist.review)
        this.thumblist.review();
    };
    s.prototype.refresh = function () {
      this.updatePage(this._activePage);
      if (this.flipCallback != null) this.flipCallback();
    };
    s.prototype.updatePage = function (e) {
      var a = this.direction == t.DIRECTION.RTL,
        o = N(this),
        r = D(e);
      var s = o ? 1 : 2;
      e = Math.floor(e / s);
      if (a) e = this.pageCount / s - e;
      var l = this.oldBaseNumber || 0;
      var u = this.pageCount / s;
      var c = this.stackCount;
      var f = Math.floor(c / 2);
      if (l > e) {
        this.children[c - 1].skipFlip = true;
        this.children.unshift(this.children.pop());
      } else if (l < e) {
        this.children[0].skipFlip = true;
        this.children.push(this.children.shift());
      }
      for (var h = 0; h < c; h++) {
        var p = this.children[h];
        if (l !== e) {
          if (p.currentTween != null) {
            p.clearTween(true);
          }
        }
        var g = p.side;
        var m;
        var v = e - f + h;
        if (a)
          v = o ? this.pageCount - v : Math.floor(this.pageCount / 2) - v - 1;
        var b = p.name;
        p.isHard = this.isPageHard(v);
        if (p.isHard) {
          p.element.addClass("df-hard-page");
        } else {
          p.element.removeClass("df-hard-page");
          p.front.css({ display: "block" });
          p.back.css({ display: "block" });
        }
        if (v == 0 || v == u) {
          p.element.addClass("df-cover-page");
        } else {
          p.element.removeClass("df-cover-page");
        }
        var w = n(p.element).attr("pageNumber");
        if (w != v) {
          p.front.contentLayer.empty();
          p.back.contentLayer.empty();
        }
        n(p.element).attr("pageNumber", v);
        p.isEdge = false;
        if (h == 0) {
        } else if (h == c - 1) {
        } else {
          p.isEdge = false;
        }
        if (h < f) {
          m = d.left;
        } else {
          m = d.right;
        }
        if (p.isFlipping == false) {
          if (m !== g && p.skipFlip == false) {
            this.animatePage(p);
            if (this.preFlipCallback != null) this.preFlipCallback();
          } else {
            p.skipFlip = false;
            p.element.removeClass(
              "df-flipping df-quick-turn df-folding df-left-side df-right-side"
            );
            p.element.addClass(h < f ? "df-left-side" : "df-right-side");
            p.side = m;
          }
        }
        p.visible = o
          ? a
            ? h < f || p.isFlipping
            : h >= f || p.isFlipping
          : (v >= 0 && v < u) || (o && v == u);
        if (this.requestPage != null && p.visible == true) {
          p.name = v.toString();
          if (p.name != b) {
            p.backTextureLoaded = false;
            p.frontTextureLoaded = false;
            p.backPageStamp = "-1";
            p.frontPageStamp = "-1";
            p.thumbLoaded = false;
            p.front.contentLayer.html("");
            p.back.contentLayer.html("");
            p.frontImage(i.textureLoadFallback);
            p.backImage(i.textureLoadFallback);
            this.requestPage();
          }
        }
        p.oldDepth = p.depth;
        p.updateCSS({
          display: p.visible == true ? "block" : "none",
          zIndex: 6 + (h < f ? h - f : f - h),
          transform: "",
        });
        if (p.pendingPoint == null && p.isFlipping == false) {
          p.resetCSS();
        }
      }
      if (TWEEN.getAll().length == 0) {
        clearInterval(this.animate);
      }
      n(".quick-hint").html(e);
      this.oldBaseNumber = e;
      if (this.updatePageCallback) this.updatePageCallback();
    };
    s.prototype.animatePage = function (e) {
      e.element.addClass("df-flipping");
      e.isFlipping = true;
      if (this.animate != null) {
        clearInterval(this.animate);
      }
      this.animate = setInterval(this.animateF, 30);
      e.tween(e.pendingPoint);
    };
    return s;
  })({});
  var Q = (function (e) {
    H(a, e);
    function a(i, a, o) {
      e.call(this, o);
      var r = this;
      r.type = "FlipBook";
      r.container = i;
      r.options = o;
      r.options.source = a;
      r.contentSource = a;
      if (o.height != null && o.height.toString().indexOf("%") < 0) {
        r.container.height(Math.min(o.height, n(window).height()));
      } else {
        r.container.height(o.height);
      }
      if (r.options.isLightBox) {
        window.dfLightBox.closeButton.addClass(r.options.icons["close"]);
      }
      if (r.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL) {
        if (
          Array === r.contentSource.constructor ||
          Array.isArray(r.contentSource) ||
          r.contentSource instanceof Array
        ) {
          r.options.singlePageMode = t.SINGLE_PAGE_MODE.ZOOM;
        }
        r.container.addClass("df-double-internal");
      }
      if (!r.options.isLightBox && r.container.attr("id") != null) {
        r.options.id = r.container.attr("id");
      }
      if (r.options.parsed !== true && r.options.links != null) {
        t.parseLinks(r.options.links);
      }
      var l = (r.webgl = o.webgl == true && j == true);
      i.addClass(
        "df-container df-loading df-init df-floating" +
          " df-controls-" +
          r.options.controlsPosition
      );
      if (r.options.transparent == true) {
        i.addClass("df-transparent");
      }
      if (r.options.direction == t.DIRECTION.RTL) {
        i.addClass("df-rtl");
      }
      r.container.info = n(h.div, { class: "loading-info" })
        .appendTo(r.container)
        .html("YÃ¼kleniyor...");
      if (
        s.indexOf("MSIE") !== -1 ||
        navigator.appVersion.indexOf("Trident/") > 0 ||
        (_ && !U)
      ) {
        r.options.webgl = false;
      }
      if (!!s.match(/msie\s[5-9]/i)) {
        r.container.info
          .html(
            "Your browser (Internet Explorer) is out of date to run DFlip Flipbook Plugin. <br><a href='http://browsehappy.com/'>Upgrade to a new one</a>"
          )
          .addClass("df-old-browser");
        i.removeClass("df-loading");
        return r;
      }
      var u =
        o.backgroundImage == null || o.backgroundImage == ""
          ? ""
          : "url('" + o.backgroundImage + "')";
      r.container.css({
        position: "relative",
        overflow: "hidden",
        backgroundColor: o.backgroundColor,
        backgroundImage: u,
      });
      r.init(l, a);
      if (r.options.onCreate != null) r.options.onCreate(r);
      return r;
    }
    a.prototype.init = function (e) {
      var a = this;
      var o = a.target;
      var r = a.options;
      if (e == true) {
        var s = function (e) {
          var n = function () {
            MOCKUP.defaults.anisotropy = 0;
            MOCKUP.defaults.groundTexture = "blank";
            THREE.skipPowerOfTwo = true;
            q();
            if (e != null) e();
          };
          if (window.MOCKUP == null) {
            a.updateInfo("YÃ¼kleniyor WEBGL 3D ...");
            if (typeof define === "function" && define.amd) {
              requirejs.config({
                paths: { three: i.threejsSrc.replace(".js", "") },
                shim: { three: { exports: "THREE" } },
              });
              require(["three"], function (e) {
                window.THREE = e;
                F(i.mockupjsSrc + "?ver=" + t.version, function () {
                  n();
                });
                return e;
              });
            } else {
              F(i.threejsSrc + "?ver=" + t.version, function () {
                F(i.mockupjsSrc + "?ver=" + t.version, function () {
                  n();
                });
              });
            }
          } else {
            n();
          }
        };
        s(function () {
          a.container.css({ minHeight: 300, minWidth: 300 });
          a.stage = new V(R(a.options, { container: a.container }));
          a.stage.previewObject = a;
          a.contentProvider = new Y(
            a.contentSource,
            function (i) {
              var r = {
                pageCount: i.pageCount,
                stackCount: 6,
                segments: 20,
                width: i.bookSize.width,
                height: i.bookSize.height,
              };
              a.checkOpenPage();
              a.target =
                o =
                a.stage.target =
                  new MOCKUP.Book(R(a.options, r), a.stage);
              a.extendtarget();
              G(a.container, a);
              o.ui = a.ui;
              o.container = a.container;
              i.webgl = e;
              i.setTarget(a.target);
              o.getContentLayer = function (e) {
                var n = o.direction == t.DIRECTION.RTL,
                  i = a.stage.cssScene.divLeft.element,
                  r = a.stage.cssScene.divRight.element;
                var s = D(o._activePage);
                if (N(o)) return n ? i : r;
                if (e % 2 == 0) return n ? r : i;
                else return n ? i : r;
              };
              o.stage = a.stage;
              o.flipCallback = function () {
                if (a.contentProvider) {
                  a.contentProvider.review("flipCallback");
                  var e = D(o._activePage);
                  var i, r;
                  var s = o.getPageByNumber(e),
                    l = o.getPageByNumber(e + 1);
                  var u = o.parent.cssScene.divLeft,
                    c = o.parent.cssScene.divRight;
                  var d = o.pageMode == t.PAGE_MODE.SINGLE;
                  var f = o.direction == t.DIRECTION.RTL;
                  if (s != null && u != null) {
                    i = Math.abs(
                      s.geometry.boundingBox.max.x -
                        s.geometry.boundingBox.min.x
                    );
                    r = Math.abs(
                      s.geometry.boundingBox.max.z -
                        s.geometry.boundingBox.min.z
                    );
                    u.rotation.y = -Math.atan2(r, i) * 0.9;
                    u.position.z = r * 0.8;
                    u.position.x = r / 2.5;
                    n(u.element).css({ width: i, left: -i / 2 });
                  }
                  if (l != null && c != null) {
                    i = Math.abs(
                      l.geometry.boundingBox.max.x -
                        l.geometry.boundingBox.min.x
                    );
                    r = Math.abs(
                      l.geometry.boundingBox.max.z -
                        l.geometry.boundingBox.min.z
                    );
                    c.rotation.y = Math.atan2(r, i) * 0.9;
                    c.position.z = r * 0.8;
                    c.position.x = -r / 2.5;
                    n(c.element).css({ width: i, left: i / 2 });
                  }
                  if (a.options.onFlip != null) a.options.onFlip(a);
                }
              };
              o.resize = (function () {
                a.resize();
              })();
              o.updatePageCallback = function () {
                a.ui.update();
                a.checkCenter();
                a.stage.renderRequestPending = true;
              };
              var s = n(a.stage.cssScene.divLeft.element);
              var l = n(a.stage.cssScene.divRight.element);
              o.preFlipCallback = function () {
                s.empty();
                l.empty();
                if (a.options.beforeFlip != null) a.options.beforeFlip(a);
                a.playSound();
              };
              n(window).trigger("resize");
              s.css({
                width: i.bookSize.width,
                height: i.bookSize.height,
                left: -i.bookSize.width / 2,
              });
              l.css({
                width: i.bookSize.width,
                height: i.bookSize.height,
                left: i.bookSize.width / 2,
              });
              o.ease = TWEEN.Easing.Cubic.InOut;
              o.contentProvider = i;
              o.duration = a.options.duration;
              o.gotoPage(o._activePage);
              o.flipCallback();
              if (a.options.onReady != null) a.options.onReady(a);
            },
            r,
            a
          );
        });
      } else {
        a.contentProvider = new Y(
          a.contentSource,
          function (t) {
            var i = {
              pageCount: t.pageCount,
              contentSourceType: t.contentSourceType,
            };
            a.checkOpenPage();
            a.target = o = new X(R(a.options, i), a.container);
            a.target.previewObject = a;
            a.extendtarget();
            G(a.container, a);
            t.webgl = e;
            t.setTarget(a.target);
            t.waitPeriod = 2;
            o.ease = TWEEN.Easing.Quadratic.InOut;
            o.duration = a.options.duration;
            o.container = a.container;
            o.updatePageCallback = function () {
              a.ui.update();
              a.checkCenter();
            };
            o.resize = (function () {
              a.resize();
            })();
            n(window).trigger("resize");
            o.flipCallback = function () {
              if (a.contentProvider) {
                a.contentProvider.review("flipCallback");
                if (a.options.onFlip != null) a.options.onFlip(a);
              }
            };
            o.preFlipCallback = function () {
              if (a.options.beforeFlip != null) a.options.beforeFlip(a);
              a.playSound();
            };
            o.gotoPage(o._activePage);
            o.flipCallback();
            if (a.options.onReady != null) a.options.onReady(a);
          },
          r,
          a
        );
      }
    };
    a.prototype.extendtarget = function () {
      var e = this;
      e.target.previewObject = e;
      e.target.reset = function () {
        for (var t = 0; t < e.target.children.length; t++) {
          var n = e.target.children[t];
          n.skipFlip = true;
          n.name = "-2";
        }
        e.contentProvider.annotedPage = "-2";
        e.target.refresh();
      };
    };
    a.prototype.getURLHash = function () {
      if (this.options.id != null) {
        var e =
          "dflip-" +
          (this.options.slug != null ? this.options.slug : this.options.id) +
          "/";
        if (this.target != null && this.target._activePage != null) {
          e += this.target._activePage + "/";
        }
        window.location.hash = e;
      }
      return window.location.href;
    };
    a.prototype.checkOpenPage = function () {
      if (this.options.id != null) {
        var e = n("#" + this.options.id);
        if (e.length > 0 && e.data("page") != null) {
          var t = parseInt(e.data("page"), 10);
          if (!isNaN(t)) this.options.openPage = t;
        }
      }
    };
    a.prototype.end = function () {
      this.target.gotoPage(this.target.endPage);
    };
    a.prototype.gotoPage = function (e) {
      this.target.gotoPage(e);
      if (this.ui != null) this.ui.update();
    };
    a.prototype.prev = function () {
      this.target.prev();
    };
    a.prototype.next = function () {
      this.target.next();
    };
    a.prototype.updateInfo = function (e) {
      if (this.container && this.container.info && this.container.info.html)
        this.container.info.html(e);
    };
    return a;
  })(Z);
  n.fn.extend({
    shelf: function () {},
    flipBook: function (e, t) {
      return new Q(n(this), e, W(t));
    },
  });
})(DFLIP, jQuery);
(function (e) {
  "use strict";
  e.URL = e.URL || e.webkitURL;
  if (e.Blob && e.URL) {
    try {
      new Blob();
      return;
    } catch (e) {}
  }
  var t =
    e.BlobBuilder ||
    e.WebKitBlobBuilder ||
    e.MozBlobBuilder ||
    (function (e) {
      var t = function (e) {
          return Object.prototype.toString
            .call(e)
            .match(/^\[object\s(.*)\]$/)[1];
        },
        n = function e() {
          this.data = [];
        },
        i = function e(t, n, i) {
          this.data = t;
          this.size = t.length;
          this.type = n;
          this.encoding = i;
        },
        a = n.prototype,
        o = i.prototype,
        r = e.FileReaderSync,
        s = function (e) {
          this.code = this[(this.name = e)];
        },
        l = (
          "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR " +
          "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
        ).split(" "),
        u = l.length,
        c = e.URL || e.webkitURL || e,
        d = c.createObjectURL,
        f = c.revokeObjectURL,
        h = c,
        p = e.btoa,
        g = e.atob,
        m = e.ArrayBuffer,
        v = e.Uint8Array,
        b = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
      i.fake = o.fake = true;
      while (u--) {
        s.prototype[l[u]] = u + 1;
      }
      if (!c.createObjectURL) {
        h = e.URL = function (e) {
          var t = document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            n;
          t.href = e;
          if (!("origin" in t)) {
            if (t.protocol.toLowerCase() === "data:") {
              t.origin = null;
            } else {
              n = e.match(b);
              t.origin = n && n[1];
            }
          }
          return t;
        };
      }
      h.createObjectURL = function (e) {
        var t = e.type,
          n;
        if (t === null) {
          t = "application/octet-stream";
        }
        if (e instanceof i) {
          n = "data:" + t;
          if (e.encoding === "base64") {
            return n + ";base64," + e.data;
          } else if (e.encoding === "URI") {
            return n + "," + decodeURIComponent(e.data);
          }
          if (p) {
            return n + ";base64," + p(e.data);
          } else {
            return n + "," + encodeURIComponent(e.data);
          }
        } else if (d) {
          return d.call(c, e);
        }
      };
      h.revokeObjectURL = function (e) {
        if (e.substring(0, 5) !== "data:" && f) {
          f.call(c, e);
        }
      };
      a.append = function (e) {
        var n = this.data;
        if (v && (e instanceof m || e instanceof v)) {
          var a = "",
            o = new v(e),
            l = 0,
            u = o.length;
          for (; l < u; l++) {
            a += String.fromCharCode(o[l]);
          }
          n.push(a);
        } else if (t(e) === "Blob" || t(e) === "File") {
          if (r) {
            var c = new r();
            n.push(c.readAsBinaryString(e));
          } else {
            throw new s("NOT_READABLE_ERR");
          }
        } else if (e instanceof i) {
          if (e.encoding === "base64" && g) {
            n.push(g(e.data));
          } else if (e.encoding === "URI") {
            n.push(decodeURIComponent(e.data));
          } else if (e.encoding === "raw") {
            n.push(e.data);
          }
        } else {
          if (typeof e !== "string") {
            e += "";
          }
          n.push(unescape(encodeURIComponent(e)));
        }
      };
      a.getBlob = function (e) {
        if (!arguments.length) {
          e = null;
        }
        return new i(this.data.join(""), e, "raw");
      };
      a.toString = function () {
        return "[object BlobBuilder]";
      };
      o.slice = function (e, t, n) {
        var a = arguments.length;
        if (a < 3) {
          n = null;
        }
        return new i(
          this.data.slice(e, a > 1 ? t : this.data.length),
          n,
          this.encoding
        );
      };
      o.toString = function () {
        return "[object Blob]";
      };
      o.close = function () {
        this.size = 0;
        delete this.data;
      };
      return n;
    })(e);
  e.Blob = function (e, n) {
    var i = n ? n.type || "" : "";
    var a = new t();
    if (e) {
      for (var o = 0, r = e.length; o < r; o++) {
        if (Uint8Array && e[o] instanceof Uint8Array) {
          a.append(e[o].buffer);
        } else {
          a.append(e[o]);
        }
      }
    }
    var s = a.getBlob(i);
    if (!s.slice && s.webkitSlice) {
      s.slice = s.webkitSlice;
    }
    return s;
  };
  var n =
    Object.getPrototypeOf ||
    function (e) {
      return e.__proto__;
    };
  e.Blob.prototype = n(new e.Blob());
})(window);
(function (e) {
  "use strict";
  var t = e.Uint8Array,
    n = e.HTMLCanvasElement,
    i = n && n.prototype,
    a = /\s*;\s*base64\s*(?:;|$)/i,
    o = "toDataURL",
    r,
    s = function (e) {
      var n = e.length,
        i = new t(((n / 4) * 3) | 0),
        a = 0,
        o = 0,
        s = [0, 0],
        l = 0,
        u = 0,
        c,
        d;
      while (n--) {
        d = e.charCodeAt(a++);
        c = r[d - 43];
        if (c !== 255 && c != null) {
          s[1] = s[0];
          s[0] = d;
          u = (u << 6) | c;
          l++;
          if (l === 4) {
            i[o++] = u >>> 16;
            if (s[1] !== 61) {
              i[o++] = u >>> 8;
            }
            if (s[0] !== 61) {
              i[o++] = u;
            }
            l = 0;
          }
        }
      }
      return i;
    };
  if (t) {
    r = new t([
      62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0,
      -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
      18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
      48, 49, 50, 51,
    ]);
  }
  if (n && !i.toBlob) {
    i.toBlob = function (e, n) {
      if (!n) {
        n = "image/png";
      }
      if (this.mozGetAsFile) {
        e(this.mozGetAsFile("canvas", n));
        return;
      }
      if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(n)) {
        e(this.msToBlob());
        return;
      }
      var i = Array.prototype.slice.call(arguments, 1),
        r = this[o].apply(this, i),
        l = r.indexOf(","),
        u = r.substring(l + 1),
        c = a.test(r.substring(0, l)),
        d;
      if (Blob.fake) {
        d = new Blob();
        if (c) {
          d.encoding = "base64";
        } else {
          d.encoding = "URI";
        }
        d.data = u;
        d.size = u.length;
      } else if (t) {
        if (c) {
          d = new Blob([s(u)], { type: n });
        } else {
          d = new Blob([decodeURIComponent(u)], { type: n });
        }
      }
      e(d);
    };
    if (i.toDataURLHD) {
      i.toBlobHD = function () {
        o = "toDataURLHD";
        var e = this.toBlob();
        o = "toDataURL";
        return e;
      };
    } else {
      i.toBlobHD = i.toBlob;
    }
  }
})(window);
(function e() {
  if ("performance" in window === false) {
    window.performance = {};
  }
  Date.now =
    Date.now ||
    function () {
      return new Date().getTime();
    };
  if ("now" in window.performance === false) {
    var t =
      window.performance.timing && window.performance.timing.navigationStart
        ? window.performance.timing.navigationStart
        : Date.now();
    window.performance.now = function () {
      return Date.now() - t;
    };
  }
})();
(function e() {
  var t =
    t ||
    (function () {
      var e = [];
      return {
        getAll: function () {
          return e;
        },
        removeAll: function () {
          e = [];
        },
        add: function (t) {
          e.push(t);
        },
        remove: function (t) {
          var n = e.indexOf(t);
          if (n !== -1) {
            e.splice(n, 1);
          }
        },
        update: function (t) {
          if (e.length === 0) {
            return false;
          }
          var n = 0;
          t = t != null ? t : window.performance.now();
          while (n < e.length) {
            if (e[n].update(t)) {
              n++;
            } else {
              e.splice(n, 1);
            }
          }
          return true;
        },
      };
    })();
  t.Tween = function (e) {
    var n = e;
    var i = {};
    var a = {};
    var o = {};
    var r = 1e3;
    var s = 0;
    var l = false;
    var u = false;
    var c = false;
    var d = 0;
    var f = null;
    var h = t.Easing.Linear.None;
    var p = t.Interpolation.Linear;
    var g = [];
    var m = null;
    var v = false;
    var b = null;
    var w = null;
    var P = null;
    for (var y in e) {
      i[y] = parseFloat(e[y], 10);
    }
    this.to = function (e, t) {
      if (t != null) {
        r = t;
      }
      a = e;
      return this;
    };
    this.start = function (e) {
      t.add(this);
      u = true;
      v = false;
      f = e != null ? e : window.performance.now();
      f += d;
      for (var r in a) {
        if (a[r] instanceof Array) {
          if (a[r].length === 0) {
            continue;
          }
          a[r] = [n[r]].concat(a[r]);
        }
        if (i[r] === null) {
          continue;
        }
        i[r] = n[r];
        if (i[r] instanceof Array === false) {
          i[r] *= 1;
        }
        o[r] = i[r] || 0;
      }
      return this;
    };
    this.stop = function () {
      if (!u) {
        return this;
      }
      t.remove(this);
      u = false;
      if (P !== null) {
        P.call(n);
      }
      this.stopChainedTweens();
      return this;
    };
    this.stopChainedTweens = function () {
      for (var e = 0, t = g.length; e < t; e++) {
        g[e].stop();
      }
    };
    this.complete = function () {
      if (!u) {
        return this;
      }
      t.remove(this);
      u = false;
      if (w !== null) {
        w.call(n);
      }
      this.completeChainedTweens();
      return this;
    };
    this.completeChainedTweens = function () {
      for (var e = 0, t = g.length; e < t; e++) {
        g[e].complete();
      }
    };
    this.delay = function (e) {
      d = e;
      return this;
    };
    this.repeat = function (e) {
      s = e;
      return this;
    };
    this.yoyo = function (e) {
      l = e;
      return this;
    };
    this.easing = function (e) {
      h = e == null ? h : e;
      return this;
    };
    this.interpolation = function (e) {
      p = e;
      return this;
    };
    this.chain = function () {
      g = arguments;
      return this;
    };
    this.onStart = function (e) {
      m = e;
      return this;
    };
    this.onUpdate = function (e) {
      b = e;
      return this;
    };
    this.onComplete = function (e) {
      w = e;
      return this;
    };
    this.onStop = function (e) {
      P = e;
      return this;
    };
    this.update = function (e) {
      var t;
      var u;
      var P;
      if (e < f) {
        return true;
      }
      if (v === false) {
        if (m !== null) {
          m.call(n);
        }
        v = true;
      }
      u = (e - f) / r;
      u = u > 1 ? 1 : u;
      P = h(u);
      for (t in a) {
        if (i[t] === null) {
          continue;
        }
        var y = i[t] || 0;
        var x = a[t];
        if (x instanceof Array) {
          n[t] = p(x, P);
        } else {
          if (typeof x === "string") {
            if (x.startsWith("+") || x.startsWith("-")) {
              x = y + parseFloat(x, 10);
            } else {
              x = parseFloat(x, 10);
            }
          }
          if (typeof x === "number") {
            n[t] = y + (x - y) * P;
          }
        }
      }
      if (b !== null) {
        b.call(n, P);
      }
      if (u === 1) {
        if (s > 0) {
          if (isFinite(s)) {
            s--;
          }
          for (t in o) {
            if (typeof a[t] === "string") {
              o[t] = o[t] + parseFloat(a[t], 10);
            }
            if (l) {
              var C = o[t];
              o[t] = a[t];
              a[t] = C;
            }
            i[t] = o[t];
          }
          if (l) {
            c = !c;
          }
          f = e + d;
          return true;
        } else {
          if (w !== null) {
            w.call(n);
          }
          for (var E = 0, S = g.length; E < S; E++) {
            g[E].start(f + r);
          }
          return false;
        }
      }
      return true;
    };
  };
  t.Easing = {
    Linear: {
      None: function (e) {
        return e;
      },
    },
    Quadratic: {
      In: function (e) {
        return e * e;
      },
      Out: function (e) {
        return e * (2 - e);
      },
      InOut: function (e) {
        if ((e *= 2) < 1) {
          return 0.5 * e * e;
        }
        return -0.5 * (--e * (e - 2) - 1);
      },
    },
    Quartic: {
      In: function (e) {
        return e * e * e * e;
      },
      Out: function (e) {
        return 1 - --e * e * e * e;
      },
      InOut: function (e) {
        if ((e *= 2) < 1) {
          return 0.5 * e * e * e * e;
        }
        return -0.5 * ((e -= 2) * e * e * e - 2);
      },
    },
    Sinusoidal: {
      In: function (e) {
        return 1 - Math.cos((e * Math.PI) / 2);
      },
      Out: function (e) {
        return Math.sin((e * Math.PI) / 2);
      },
      InOut: function (e) {
        return 0.5 * (1 - Math.cos(Math.PI * e));
      },
    },
    Cubic: {
      In: function (e) {
        return e * e * e;
      },
      Out: function (e) {
        return --e * e * e + 1;
      },
      InOut: function (e) {
        if ((e *= 2) < 1) {
          return 0.5 * e * e * e;
        }
        return 0.5 * ((e -= 2) * e * e + 2);
      },
    },
  };
  t.Interpolation = {
    Linear: function (e, n) {
      var i = e.length - 1;
      var a = i * n;
      var o = Math.floor(a);
      var r = t.Interpolation.Utils.Linear;
      if (n < 0) {
        return r(e[0], e[1], a);
      }
      if (n > 1) {
        return r(e[i], e[i - 1], i - a);
      }
      return r(e[o], e[o + 1 > i ? i : o + 1], a - o);
    },
    Bezier: function (e, n) {
      var i = 0;
      var a = e.length - 1;
      var o = Math.pow;
      var r = t.Interpolation.Utils.Bernstein;
      for (var s = 0; s <= a; s++) {
        i += o(1 - n, a - s) * o(n, s) * e[s] * r(a, s);
      }
      return i;
    },
    Utils: {
      Linear: function (e, t, n) {
        return (t - e) * n + e;
      },
      Bernstein: function (e, n) {
        var i = t.Interpolation.Utils.Factorial;
        return i(e) / i(n) / i(e - n);
      },
      Factorial: (function () {
        var e = [1];
        return function (t) {
          var n = 1;
          if (e[t]) {
            return e[t];
          }
          for (var i = t; i > 1; i--) {
            n *= i;
          }
          e[t] = n;
          return n;
        };
      })(),
      CatmullRom: function (e, t, n, i, a) {
        var o = (n - e) * 0.5;
        var r = (i - t) * 0.5;
        var s = a * a;
        var l = a * s;
        return (
          (2 * t - 2 * n + o + r) * l +
          (-3 * t + 3 * n - 2 * o - r) * s +
          o * a +
          t
        );
      },
    },
  };
  window.TWEEN = t;
})();
DFLIP.createBlob = function e(t, n) {
  if (typeof Blob !== "undefined") {
    return new Blob([t], { type: n });
  }
  var i = new MozBlobBuilder();
  i.append(t);
  return i.getBlob(n);
};
DFLIP.createObjectURL = (function e() {
  var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return function e(n, i) {
    if (typeof URL !== "undefined" && URL.createObjectURL) {
      var a = DFLIP.createBlob(n, i);
      return URL.createObjectURL(a);
    }
    var o = "data:" + i + ";base64,";
    for (var r = 0, s = n.length; r < s; r += 3) {
      var l = n[r] & 255;
      var u = n[r + 1] & 255;
      var c = n[r + 2] & 255;
      var d = l >> 2,
        f = ((l & 3) << 4) | (u >> 4);
      var h = r + 1 < s ? ((u & 15) << 2) | (c >> 6) : 64;
      var p = r + 2 < s ? c & 63 : 64;
      o += t[d] + t[f] + t[h] + t[p];
    }
    return o;
  };
})();
var ThumbList = (function e() {
  function t(e) {
    var n = (e && e.w + "px") || "100%";
    var i = (e && e.h + "px") || "100%";
    var a = (this.itemHeight = e.itemHeight);
    this.items = e.items;
    this.generatorFn = e.generatorFn;
    this.totalRows = e.totalRows || (e.items && e.items.length);
    this.addFn = e.addFn;
    this.scrollFn = e.scrollFn;
    var o = t.createScroller(a * this.totalRows);
    this.container = t.createContainer(n, i);
    this.container.appendChild(o);
    this.screenItemsLen = Math.ceil(e.h / a);
    this.offsetItems = this.screenItemsLen;
    this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
    this._renderChunk(this.container, 0);
    var r = this;
    r.lastRepaintY = 0;
    var s = this.screenItemsLen * a;
    var l = 0;
    var u;
    function c(e) {
      var t = e.target.scrollTop;
      if (
        !r.lastRepaintY ||
        Math.abs(t - r.lastRepaintY) >= r.offsetItems * r.itemHeight
      ) {
        var n = parseInt(t / a, 10) - r.offsetItems;
        r._renderChunk(r.container, n < 0 ? 0 : n);
        r.lastRepaintY = t;
      }
      r.lastScrolled = l = Date.now();
      if (r.scrollFn != null) {
        r.scrollFn();
      }
      e.preventDefault && e.preventDefault();
    }
    r.dispose = function () {
      if (r.container) {
        if (r.container.parentNode) {
          r.container.parentNode.removeChild(r.container);
        }
      }
      r.container.removeEventListener("scroll", c);
    };
    r.container.addEventListener("scroll", c);
  }
  t.prototype.reset = function (e) {
    this.screenItemsLen = Math.ceil(e / this.itemHeight);
    this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
    var t =
      parseInt(this.lastRepaintY / this.itemHeight, 10) - this.offsetItems;
    this.needReset = true;
    this._renderChunk(this.container, Math.max(t, 0));
  };
  t.prototype.createRow = function (e) {
    var t;
    if (this.generatorFn) {
      t = this.generatorFn(e);
      t.classList.add("df-vrow");
      t.style.position = "absolute";
      t.style.top = e * this.itemHeight + "px";
      t.setAttribute("index", e);
    }
    return t;
  };
  t.prototype._renderChunk = function (e, t) {
    var n = this.range == null;
    this.range = this.range || { min: 0, max: this.cachedItemsLen };
    var i = this.range;
    var a = i.min,
      o = i.max;
    var r = n ? true : t >= a;
    if (!n && t == a && this.needReset == false) return;
    var s;
    var l = n ? a : r ? o : t;
    l = l > this.totalRows ? this.totalRows : l < 0 ? 0 : l;
    var u = t + this.cachedItemsLen;
    u = u > this.totalRows ? this.totalRows : u;
    for (s = l; s < u; s++) {
      if (r) e.appendChild(this.createRow(s));
      else e.insertBefore(this.createRow(s), e.childNodes[1 + s - l]);
      if (this.addFn != null) {
        this.addFn(s);
      }
    }
    var c = Math.abs(t - a);
    this.needReset = false;
    if (!n && e.childNodes.length > this.cachedItemsLen + 1) {
      var d = r ? 1 : 1 + this.cachedItemsLen,
        f = d + (u - l);
      for (var h = f; h > d; h--) {
        if (e.childNodes[d]) this.container.removeChild(e.childNodes[d]);
      }
    }
    this.range.min = t;
    this.range.max = u;
  };
  t.createContainer = function (e, t) {
    var n = document.createElement("div");
    n.style.width = e;
    n.style.height = t;
    n.style.overflow = "auto";
    n.style.position = "relative";
    n.style.padding = 0;
    return n;
  };
  t.createScroller = function (e) {
    var t = document.createElement("div");
    t.style.opacity = 0;
    t.style.position = "absolute";
    t.style.top = 0;
    t.style.left = 0;
    t.style.width = "1px";
    t.style.height = e + "px";
    return t;
  };
  return t;
})();
var BookMarkViewer = (function e() {
  function t(e) {
    this.outline = null;
    this.lastToggleIsShow = true;
    this.container = e.container;
    this.linkService = e.linkService;
    this.outlineItemClass = e.outlineItemClass || "outlineItem";
    this.outlineToggleClass = e.outlineToggleClass || "outlineItemToggler";
    this.outlineToggleHiddenClass =
      e.outlineToggleHiddenClass || "outlineItemsHidden";
  }
  t.prototype = {
    dispose: function () {
      if (this.container) {
        if (this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
      }
      this.linkService = null;
    },
    reset: function e() {
      this.outline = null;
      this.lastToggleIsShow = true;
      var t = this.container;
      while (t.firstChild) {
        t.removeChild(t.firstChild);
      }
    },
    _dispatchEvent: function e(t) {
      var n = document.createEvent("CustomEvent");
      n.initCustomEvent("outlineloaded", true, true, { outlineCount: t });
      this.container.dispatchEvent(n);
    },
    _bindLink: function e(t, n) {
      var i = this.linkService;
      if (n.custom == true) {
        t.href = i.getCustomDestinationHash(n.dest);
        t.onclick = function e(t) {
          i.customNavigateTo(n.dest);
          return false;
        };
      } else {
        if (n.url) {
          PDFJS.addLinkAttributes(t, { url: n.url });
          return;
        }
        t.href = i.getDestinationHash(n.dest);
        t.onclick = function e(t) {
          i.navigateTo(n.dest);
          return false;
        };
      }
    },
    _addToggleButton: function e(t) {
      var n = document.createElement("div");
      n.className =
        this.outlineToggleClass + " " + this.outlineToggleHiddenClass;
      n.onclick = function (e) {
        e.stopPropagation();
        n.classList.toggle(this.outlineToggleHiddenClass);
        if (e.shiftKey) {
          var i = !n.classList.contains(this.outlineToggleHiddenClass);
          this._toggleOutlineItem(t, i);
        }
      }.bind(this);
      t.insertBefore(n, t.firstChild);
    },
    _toggleOutlineItem: function e(t, n) {
      this.lastToggleIsShow = n;
      var i = t.querySelectorAll("." + this.outlineToggleClass);
      for (var a = 0, o = i.length; a < o; ++a) {
        i[a].classList[n ? "remove" : "add"](this.outlineToggleHiddenClass);
      }
    },
    toggleOutlineTree: function e() {
      if (!this.outline) {
        return;
      }
      this._toggleOutlineItem(this.container, !this.lastToggleIsShow);
    },
    render: function e(t) {
      var n = (t && t.outline) || null;
      var i = 0;
      if (this.outline) {
        this.reset();
      }
      this.outline = n;
      if (!n) {
        return;
      }
      var a = document.createDocumentFragment();
      var o = [{ parent: a, items: this.outline }];
      var r = false;
      while (o.length > 0) {
        var s = o.shift();
        var l = s.custom;
        for (var u = 0, c = s.items.length; u < c; u++) {
          var d = s.items[u];
          var f = document.createElement("div");
          f.className = this.outlineItemClass;
          var h = document.createElement("a");
          if (d.custom == null && l != null) d.custom = l;
          this._bindLink(h, d);
          h.textContent = d.title.replace(/\x00/g, "");
          f.appendChild(h);
          if (d.items && d.items.length > 0) {
            r = true;
            this._addToggleButton(f);
            var p = document.createElement("div");
            p.className = this.outlineItemClass + "s";
            f.appendChild(p);
            o.push({ parent: p, custom: d.custom, items: d.items });
          }
          s.parent.appendChild(f);
          i++;
        }
      }
      if (r) {
        if (this.container.classList != null) {
          this.container.classList.add(this.outlineItemClass + "s");
        } else if (this.container.className != null) {
          this.container.className += " picWindow";
        }
      }
      this.container.appendChild(a);
      this._dispatchEvent(i);
    },
  };
  return t;
})();
var DFLightBox = (function e(t) {
  function n(e, n) {
    this.duration = 300;
    var i = this;
    i.lightboxWrapper = t("<div>").addClass("df-lightbox-wrapper");
    i.container = t("<div>")
      .addClass("df-container")
      .appendTo(i.lightboxWrapper);
    i.controls = t("<div>")
      .addClass("df-lightbox-controls")
      .appendTo(i.lightboxWrapper);
    i.closeButton = t("<div>")
      .addClass("df-lightbox-close df-ui-btn")
      .on("click", function () {
        i.close(e);
      })
      .appendTo(i.controls);
    i.lightboxWrapper.append(i.container);
    return i;
  }
  n.prototype.show = function (e) {
    if (this.lightboxWrapper.parent().length == 0)
      t("body").append(this.lightboxWrapper);
    this.lightboxWrapper.fadeIn(this.duration, e);
    return this;
  };
  n.prototype.close = function (e) {
    this.lightboxWrapper.fadeOut(this.duration);
    setTimeout(e, this.duration);
    return this;
  };
  return n;
})(jQuery);
DFLIP.Share = (function e(t) {
  function n(e, n) {
    var i = this;
    var a = "<div>";
    var o = "df-share-button";
    var r = "width=500,height=400";
    i.isOpen = false;
    i.shareUrl = "";
    i.wrapper = t('<div class="df-share-wrapper" style="display: none;">').on(
      "click",
      function (e) {
        i.close();
      }
    );
    i.box = t('<div class="df-share-box">')
      .on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
      })
      .appendTo(i.wrapper)
      .html('<span class="df-share-title">' + n.text.share + "</span>");
    i.urlInput = t('<textarea class="df-share-url">').on("click", function () {
      t(this).select();
    });
    i.facebook = t(a, {
      class: o + " df-share-facebook " + n.icons["facebook"],
    }).on("click", function (e) {
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(i.shareUrl),
        "Sharer",
        r
      );
    });
    i.google = t(a, { class: o + " df-share-google " + n.icons["google"] }).on(
      "click",
      function (e) {
        window.open(
          "https://plus.google.com/share?url=" + encodeURIComponent(i.shareUrl),
          "Sharer",
          r
        );
      }
    );
    i.twitter = t(a, {
      class: o + " df-share-twitter " + n.icons["twitter"],
    }).on("click", function (e) {
      window.open(
        "http://twitter.com/share?url=" + encodeURIComponent(i.shareUrl),
        "Sharer",
        r
      );
    });
    i.mail = t("<a>", {
      class: o + " df-share-mail " + n.icons["mail"],
      href:
        "mailto:?subject=I wanted you to see this FlipBook&body=Check out this site " +
        encodeURIComponent(i.shareUrl),
      target: "_blank",
    }).on("click", function (e) {
      t(this).attr(
        "href",
        "mailto:?subject=I wanted you to see this FlipBook&body=Check out this site " +
          encodeURIComponent(i.shareUrl)
      );
      e.stopPropagation();
    });
    i.box
      .append(i.urlInput)
      .append(i.facebook)
      .append(i.google)
      .append(i.twitter)
      .append(i.mail);
    t(e).append(i.wrapper);
  }
  n.prototype.show = function () {
    this.wrapper.fadeIn(300);
    this.urlInput.val(this.shareUrl);
    this.urlInput.trigger("click");
    this.isOpen = true;
  };
  n.prototype.dispose = function () {
    var e = this;
    e.box.off();
    e.google.off();
    e.twitter.off();
    e.facebook.off();
    e.mail.off();
    e.urlInput.off();
    e.wrapper.off().remove();
  };
  n.prototype.close = function () {
    this.wrapper.fadeOut(300);
    this.isOpen = false;
  };
  n.prototype.update = function (e) {
    this.shareUrl = e;
  };
  return n;
})(jQuery);
DFLIP.Popup = (function e(t) {
  function n(e, n) {
    var i = this;
    var a = "<div>";
    var o = "width=500,height=400";
    i.isOpen = false;
    i.wrapper = t('<div class="df-popup-wrapper" style="display: none;">').on(
      "click",
      function (e) {
        i.close();
      }
    );
    i.box = t('<div class="df-popup-box">')
      .on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
      })
      .appendTo(i.wrapper);
    t(e).append(i.wrapper);
  }
  n.prototype.show = function () {
    this.wrapper.fadeIn(300);
    this.isOpen = true;
  };
  n.prototype.dispose = function () {
    var e = this;
    e.box.off();
    e.wrapper.off().remove();
  };
  n.prototype.close = function () {
    this.wrapper.fadeOut(300);
    this.isOpen = false;
  };
  return n;
})(jQuery);
var PDFLinkService = (function () {
  function e() {
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
    this._pagesRefCache = null;
  }
  e.prototype = {
    dispose: function () {
      this.baseUrl = null;
      this.pdfDocument = null;
      this.pdfViewer = null;
      this.pdfHistory = null;
      this._pagesRefCache = null;
    },
    setDocument: function e(t, n) {
      this.baseUrl = n;
      this.pdfDocument = t;
      this._pagesRefCache = Object.create(null);
    },
    setViewer: function e(t) {
      this.pdfViewer = t;
    },
    setHistory: function e(t) {
      this.pdfHistory = t;
    },
    get pagesCount() {
      return this.pdfDocument.numPages;
    },
    get page() {
      return this.pdfViewer.currentPageNumber;
    },
    set page(e) {
      this.pdfViewer.currentPageNumber = e;
    },
    navigateTo: function e(t) {
      var n = "";
      var i = this;
      var a = function (e) {
        var o =
          e instanceof Object
            ? i._pagesRefCache[e.num + " " + e.gen + " R"]
            : e + 1;
        if (o) {
          if (
            i.pdfViewer.contentProvider.options.pageSize ==
              DFLIP.PAGE_SIZE.DOUBLEINTERNAL &&
            o > 2
          ) {
            o = o * 2 - 1;
          }
          if (o > i.pdfViewer.pageCount) {
            o = i.pdfViewer.pageCount;
          }
          i.pdfViewer.gotoPage(o);
          if (i.pdfHistory) {
            i.pdfHistory.push({ dest: t, hash: n, page: o });
          }
        } else {
          i.pdfDocument.getPageIndex(e).then(function (t) {
            var n = t + 1;
            var o = e.num + " " + e.gen + " R";
            i._pagesRefCache[o] = n;
            a(e);
          });
        }
      };
      var o;
      if (typeof t === "string") {
        n = t;
        o = this.pdfDocument.getDestination(t);
      } else {
        o = Promise.resolve(t);
      }
      o.then(function (e) {
        t = e;
        if (!(e instanceof Array)) {
          return;
        }
        a(e[0]);
      });
    },
    customNavigateTo: function e(t) {
      if (t == "" || t == null || t == "null") return;
      var n = null;
      if (!isNaN(Math.round(t))) {
        n = t;
      } else if (typeof t === "string") {
        n = parseInt(t.replace("#", ""), 10);
        if (isNaN(n)) {
          window.open(t);
          return;
        }
      }
      if (n != null) this.pdfViewer.gotoPage(n);
    },
    getDestinationHash: function e(t) {
      if (typeof t === "string") {
        return this.getAnchorUrl("#" + escape(t));
      }
      if (t instanceof Array) {
        var n = t[0];
        var i =
          n instanceof Object
            ? this._pagesRefCache[n.num + " " + n.gen + " R"]
            : n + 1;
        if (i) {
          var a = this.getAnchorUrl("#page=" + i);
          var o = t[1];
          if (typeof o === "object" && "name" in o && o.name === "XYZ") {
            var r = t[4] || this.pdfViewer.currentScaleValue;
            var s = parseFloat(r);
            if (s) {
              r = s * 100;
            }
            a += "&zoom=" + r;
            if (t[2] || t[3]) {
              a += "," + (t[2] || 0) + "," + (t[3] || 0);
            }
          }
          return a;
        }
      }
      return this.getAnchorUrl("");
    },
    getCustomDestinationHash: function e(t) {
      return "#" + escape(t);
    },
    getAnchorUrl: function e(t) {
      return (this.baseUrl || "") + t;
    },
    setHash: function e(t) {
      if (t.indexOf("=") >= 0) {
        var n = parseQueryString(t);
        if ("nameddest" in n) {
          if (this.pdfHistory) {
            this.pdfHistory.updateNextHashParam(n.nameddest);
          }
          this.navigateTo(n.nameddest);
          return;
        }
        var i, a;
        if ("page" in n) {
          i = n.page | 0 || 1;
        }
        if ("zoom" in n) {
          var o = n.zoom.split(",");
          var r = o[0];
          var s = parseFloat(r);
          if (r.indexOf("Fit") === -1) {
            a = [
              null,
              { name: "XYZ" },
              o.length > 1 ? o[1] | 0 : null,
              o.length > 2 ? o[2] | 0 : null,
              s ? s / 100 : r,
            ];
          } else {
            if (r === "Fit" || r === "FitB") {
              a = [null, { name: r }];
            } else if (
              r === "FitH" ||
              r === "FitBH" ||
              r === "FitV" ||
              r === "FitBV"
            ) {
              a = [null, { name: r }, o.length > 1 ? o[1] | 0 : null];
            } else if (r === "FitR") {
              if (o.length !== 5) {
                console.error(
                  "PDFLinkService_setHash: " +
                    "Not enough parameters for 'FitR'."
                );
              } else {
                a = [null, { name: r }, o[1] | 0, o[2] | 0, o[3] | 0, o[4] | 0];
              }
            } else {
              console.error(
                "PDFLinkService_setHash: '" + r + "' is not a valid zoom value."
              );
            }
          }
        }
        if (a) {
          this.pdfViewer.scrollPageIntoView(i || this.page, a);
        } else if (i) {
          this.page = i;
        }
        if ("pagemode" in n) {
          var l = document.createEvent("CustomEvent");
          l.initCustomEvent("pagemode", true, true, { mode: n.pagemode });
          this.pdfViewer.container.dispatchEvent(l);
        }
      } else if (/^\d+$/.test(t)) {
        this.page = t;
      } else {
        if (this.pdfHistory) {
          this.pdfHistory.updateNextHashParam(unescape(t));
        }
        this.navigateTo(unescape(t));
      }
    },
    executeNamedAction: function e(t) {
      switch (t) {
        case "GoBack":
          if (this.pdfHistory) {
            this.pdfHistory.back();
          }
          break;
        case "GoForward":
          if (this.pdfHistory) {
            this.pdfHistory.forward();
          }
          break;
        case "NextPage":
          this.page++;
          break;
        case "PrevPage":
          this.page--;
          break;
        case "LastPage":
          this.page = this.pagesCount;
          break;
        case "FirstPage":
          this.page = 1;
          break;
        default:
          break;
      }
      var n = document.createEvent("CustomEvent");
      n.initCustomEvent("namedaction", true, true, { action: t });
      this.pdfViewer.container.dispatchEvent(n);
    },
    cachePageRef: function e(t, n) {
      var i = n.num + " " + n.gen + " R";
      this._pagesRefCache[i] = t;
    },
  };
  return e;
})();
DFLIP.TextLayerBuilder = (function e() {
  function t(e) {
    this.textLayerDiv = e.textLayerDiv;
    this.renderingDone = false;
    this.divContentDone = false;
    this.pageIdx = e.pageIndex;
    this.pageNumber = this.pageIdx + 1;
    this.matches = [];
    this.viewport = e.viewport;
    this.textDivs = [];
    this.findController = e.findController || null;
    this.textLayerRenderTask = null;
    this.enhanceTextSelection = e.enhanceTextSelection;
    this._bindMouse();
  }
  t.prototype = {
    _finishRendering: function e() {
      this.renderingDone = true;
      if (!this.enhanceTextSelection) {
        var t = document.createElement("div");
        t.className = "endOfContent";
        this.textLayerDiv.appendChild(t);
      }
    },
    render: function e(t) {
      if (!this.divContentDone || this.renderingDone) {
        return;
      }
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }
      this.textDivs = [];
      var n = document.createDocumentFragment();
      this.textLayerRenderTask = PDFJS.renderTextLayer({
        textContent: this.textContent,
        container: n,
        viewport: this.viewport,
        textDivs: this.textDivs,
        timeout: t,
        enhanceTextSelection: this.enhanceTextSelection,
      });
      this.textLayerRenderTask.promise.then(
        function () {
          this.textLayerDiv.appendChild(n);
          this._finishRendering();
          this.updateMatches();
        }.bind(this),
        function (e) {}
      );
    },
    setTextContent: function e(t) {
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }
      this.textContent = t;
      this.divContentDone = true;
    },
    convertMatches: function e(t, n) {
      var i = 0;
      var a = 0;
      var o = this.textContent.items;
      var r = o.length - 1;
      var s =
        this.findController === null
          ? 0
          : this.findController.state.query.length;
      var l = [];
      if (!t) {
        return l;
      }
      for (var u = 0, c = t.length; u < c; u++) {
        var d = t[u];
        while (i !== r && d >= a + o[i].str.length) {
          a += o[i].str.length;
          i++;
        }
        if (i === o.length) {
          console.error("Could not find a matching mapping");
        }
        var f = { begin: { divIdx: i, offset: d - a } };
        if (n) {
          d += n[u];
        } else {
          d += s;
        }
        while (i !== r && d > a + o[i].str.length) {
          a += o[i].str.length;
          i++;
        }
        f.end = { divIdx: i, offset: d - a };
        l.push(f);
      }
      return l;
    },
    renderMatches: function e(t) {
      if (t.length === 0) {
        return;
      }
      var n = this.textContent.items;
      var i = this.textDivs;
      var a = null;
      var o = this.pageIdx;
      var r =
        this.findController === null
          ? false
          : o === this.findController.selected.pageIdx;
      var s =
        this.findController === null
          ? -1
          : this.findController.selected.matchIdx;
      var l =
        this.findController === null
          ? false
          : this.findController.state.highlightAll;
      var u = { divIdx: -1, offset: undefined };
      function c(e, t) {
        var n = e.divIdx;
        i[n].textContent = "";
        d(n, 0, e.offset, t);
      }
      function d(e, t, a, o) {
        var r = i[e];
        var s = n[e].str.substring(t, a);
        var l = document.createTextNode(s);
        if (o) {
          var u = document.createElement("span");
          u.className = o;
          u.appendChild(l);
          r.appendChild(u);
          return;
        }
        r.appendChild(l);
      }
      var f = s,
        h = f + 1;
      if (l) {
        f = 0;
        h = t.length;
      } else if (!r) {
        return;
      }
      for (var p = f; p < h; p++) {
        var g = t[p];
        var m = g.begin;
        var v = g.end;
        var b = r && p === s;
        var w = b ? " selected" : "";
        if (this.findController) {
          this.findController.updateMatchPosition(o, p, i, m.divIdx);
        }
        if (!a || m.divIdx !== a.divIdx) {
          if (a !== null) {
            d(a.divIdx, a.offset, u.offset);
          }
          c(m);
        } else {
          d(a.divIdx, a.offset, m.offset);
        }
        if (m.divIdx === v.divIdx) {
          d(m.divIdx, m.offset, v.offset, "highlight" + w);
        } else {
          d(m.divIdx, m.offset, u.offset, "highlight begin" + w);
          for (var P = m.divIdx + 1, y = v.divIdx; P < y; P++) {
            i[P].className = "highlight middle" + w;
          }
          c(v, "highlight end" + w);
        }
        a = v;
      }
      if (a) {
        d(a.divIdx, a.offset, u.offset);
      }
    },
    updateMatches: function e() {
      if (!this.renderingDone) {
        return;
      }
      var t = this.matches;
      var n = this.textDivs;
      var i = this.textContent.items;
      var a = -1;
      for (var o = 0, r = t.length; o < r; o++) {
        var s = t[o];
        var l = Math.max(a, s.begin.divIdx);
        for (var u = l, c = s.end.divIdx; u <= c; u++) {
          var d = n[u];
          d.textContent = i[u].str;
          d.className = "";
        }
        a = s.end.divIdx + 1;
      }
      if (this.findController === null || !this.findController.active) {
        return;
      }
      var f, h;
      if (this.findController !== null) {
        f = this.findController.pageMatches[this.pageIdx] || null;
        h = this.findController.pageMatchesLength
          ? this.findController.pageMatchesLength[this.pageIdx] || null
          : null;
      }
      this.matches = this.convertMatches(f, h);
      this.renderMatches(this.matches);
    },
    _bindMouse: function e() {
      var t = this.textLayerDiv;
      var n = this;
      t.addEventListener("mousedown", function (e) {
        if (n.enhanceTextSelection && n.textLayerRenderTask) {
          n.textLayerRenderTask.expandTextDivs(true);
          return;
        }
        var i = t.querySelector(".endOfContent");
        if (!i) {
          return;
        }
        var a = e.target !== t;
        a =
          a &&
          window.getComputedStyle(i).getPropertyValue("-moz-user-select") !==
            "none";
        if (a) {
          var o = t.getBoundingClientRect();
          var r = Math.max(0, (e.pageY - o.top) / o.height);
          i.style.top = (r * 100).toFixed(2) + "%";
        }
        i.classList.add("active");
      });
      t.addEventListener("mouseup", function (e) {
        if (n.enhanceTextSelection && n.textLayerRenderTask) {
          n.textLayerRenderTask.expandTextDivs(false);
          return;
        }
        var i = t.querySelector(".endOfContent");
        if (!i) {
          return;
        }
        i.style.top = "";
        i.classList.remove("active");
      });
    },
  };
  return t;
})();
DFLIP.ConvertPageLinks = function () {
  var e = arguments[0] / 100,
    t = arguments[1] / 100;
  var n = function (n, i, a, o, r) {
    return { x: n / e, y: i / t, w: a / e, h: o / t, dest: r };
  };
  var i = [];
  var a;
  for (var o = 2; o < arguments.length; o++) {
    a = arguments[o];
    i[o - 2] = n.apply(this, a);
  }
  return i;
};
DFLIP.parseLinks = function (e) {
  var t;
  if (e != null && e.length > 0) {
    for (var n = 0; n < e.length; n++) {
      t = e[n];
      if (t != null && t[0] != null && t[0].dest == null) {
        t = DFLIP.ConvertPageLinks.apply(this, t);
        e[n] = t;
      }
    }
  }
  return e;
};
(function (e) {
  function t(e) {
    return e == "true" || e == true;
  }
  function n(e) {
    if (e.webgl != null) e.webgl = t(e.webgl);
    if (e.enableDownload != null) e.enableDownload = t(e.enableDownload);
    if (e.scrollWheel != null) e.scrollWheel = t(e.scrollWheel);
    if (e.autoEnableOutline != null)
      e.autoEnableOutline = t(e.autoEnableOutline);
    if (e.autoEnableThumbnail != null)
      e.autoEnableThumbnail = t(e.autoEnableThumbnail);
    if (e.transparent != null) e.transparent = t(e.transparent);
    if (e.overwritePDFOutline != null)
      e.overwritePDFOutline = t(e.overwritePDFOutline);
    if (e.soundEnable != null) e.soundEnable = t(e.soundEnable);
    if (e.forceFit != null) e.forceFit = t(e.forceFit);
    if (e.enableAnnotation != null) e.enableAnnotation = t(e.enableAnnotation);
    if (e.webglShadow != null) e.webglShadow = t(e.webglShadow);
    if (e.autoPlay != null) e.autoPlay = t(e.autoPlay);
    if (e.autoPlayStart != null) e.autoPlayStart = t(e.autoPlayStart);
    if (e.paddingTop != null) e.paddingTop = parseInt(e.paddingTop, 10);
    if (e.paddingRight != null) e.paddingRight = parseInt(e.paddingRight, 10);
    if (e.paddingBottom != null)
      e.paddingBottom = parseInt(e.paddingBottom, 10);
    if (e.paddingLeft != null) e.paddingLeft = parseInt(e.paddingLeft, 10);
    if (e.zoomRatio != null) e.zoomRatio = parseFloat(e.zoomRatio, 10);
    if (e.stiffness != null) e.stiffness = parseFloat(e.stiffness, 10);
    if (e.autoPlayDuration != null)
      e.autoPlayDuration = parseInt(e.autoPlayDuration, 10);
    if (e.pageMode == 0 || e.pageMode == "0") e.pageMode = null;
    if (e.singlePageMode == 0 || e.singlePageMode == "0")
      e.singlePageMode = null;
  }
  function i(e) {
    if (e.parsed == true) return;
    e.parsed = true;
    var t = [];
    n(e);
    if (typeof dFlipWPGlobal !== "undefined" && e.wpOptions == "true") {
      try {
        for (var i in e.links) {
          var a = e.links[i];
          var o = [100, 100];
          for (var r = 0; r < a.length; r++) {
            var s = a[r];
            var l = s.substr(1).slice(0, -1).split(",");
            var u = [];
            for (var c = 0; c < 5; c++) {
              u[c] = l[c];
            }
            o.push(u);
          }
          t[parseInt(i, 10) + 1] = o;
        }
      } catch (e) {
        console.error(e.stack);
      }
      e.links = DFLIP.parseLinks(t);
    } else {
      e.links = DFLIP.parseLinks(e.links);
    }
  }
  DFLIP.getOptions = function (t) {
    t = e(t);
    var n = t.attr("id");
    var a = "option_" + n,
      o = t.attr("source") || t.attr("df-source");
    a = a == null || a == "" || window[a] == null ? {} : window[a];
    a.source = o == null || o == "" ? a.source : o;
    var r = {
      webgl: t.attr("webgl"),
      height: t.attr("height"),
      soundEnable: t.attr("sound"),
      transparent: t.attr("transparent"),
      enableDownload: t.attr("download"),
      duration: t.attr("duration"),
      hard: t.attr("hard"),
      pageMode: t.attr("pagemode"),
      direction: t.attr("direction"),
      backgroundColor: t.attr("backgroundcolor"),
      scrollWheel: t.attr("scrollwheel"),
      backgroundImage: t.attr("backgroundimage"),
      paddingTop: t.attr("paddingtop"),
      paddingRight: t.attr("paddingright"),
      paddingBottom: t.attr("paddingbottom"),
      paddingLeft: t.attr("paddingleft"),
      wpOptions: t.attr("wpoptions"),
    };
    a = e.extend(true, {}, a, r);
    i(a);
    return a;
  };
  DFLIP.parseBooks = function () {
    e("._df_button, ._df_thumb, ._df_custom, ._df_book").each(function () {
      var t = e(this);
      var n = t.attr("parsed") || t.attr("df-parsed");
      if (n !== "true") {
        t.attr("df-parsed", "true");
        if (t.hasClass("_df_book")) {
          var i = t.attr("id"),
            a = t.attr("slug");
          var o = DFLIP.getOptions(t);
          o.id = i;
          if (a != null) o.slug = a;
          if (i) {
            window[i.toString()] = e(t).flipBook(o.source, o);
          } else {
            e(t).flipBook(o.source, o);
          }
        } else {
          if (t.hasClass("_df_thumb")) {
            var r = e("<div class='_df_book-cover'>");
            var s = t.html().trim();
            t.html("");
            var l = e("<span class='_df_book-title'>").html(s).appendTo(r);
            var u = t.attr("thumb") || t.attr("df-thumb"),
              c = t.attr("thumbtype") || DFLIP.defaults.thumbElement || "div",
              d = t.attr("tags") || t.attr("df-tags");
            if (d) {
              d = d.split(",");
              if (d.length > 0) {
                for (var f = 0; f < d.length; f++) {
                  t.append("<span class='_df_book-tag'>" + d[f] + "</span>");
                }
              }
            }
            if (u != null && u.toString().trim() != "") {
              if (c == "img") {
                r.append('<img src="' + u + '" alt="' + s + '"/>');
                t.attr("thumb-type", "img");
              } else {
                r.css({ backgroundImage: "url(" + u + ")" });
              }
            } else {
              r.addClass("_df_thumb-not-found");
            }
            t.append(r);
          }
        }
      }
    });
  };
  e(document).ready(function () {
    if (
      typeof dFlipLocation == "undefined" &&
      DFLIP.autoDetectLocation != false
    ) {
      e("script").each(function () {
        var t = e(this)[0].src;
        if (
          (t.indexOf("/dflip.js") > -1 || t.indexOf("/dflip.min.js") > -1) &&
          (t.indexOf("https://") > -1 || t.indexOf("http://") > -1) &&
          t.indexOf("js/dflip.") > -1
        ) {
          var n = t.split("/");
          window.dFlipLocation = n.slice(0, -2).join("/");
        }
      });
    }
    if (typeof dFlipLocation !== "undefined") {
      if (dFlipLocation.length > 2 && dFlipLocation.slice(-1) !== "/") {
        window.dFlipLocation += "/";
      }
      DFLIP.defaults.mockupjsSrc = dFlipLocation + "https://storage.acerapps.io/app-1280/EklentilerCSS/JS/DFlip/mockup.min.js";
      DFLIP.defaults.pdfjsSrc = dFlipLocation + "https://storage.acerapps.io/app-1280/EklentilerCSS/JS/DFlip/pdf.min.js";
      DFLIP.defaults.pdfjsCompatibilitySrc =
        dFlipLocation + "js/libs/compatibility.js";
      DFLIP.defaults.threejsSrc = dFlipLocation + "https://storage.acerapps.io/app-1280/EklentilerCSS/JS/DFlip/three.min.js";
      DFLIP.defaults.pdfjsWorkerSrc =
        dFlipLocation + "https://storage.acerapps.io/app-1280/EklentilerCSS/JS/DFlip/pdf.worker.min.js";
      DFLIP.defaults.soundFile = dFlipLocation + "sound/turn2.mp3";
      DFLIP.defaults.imagesLocation = dFlipLocation + "images";
      DFLIP.defaults.imageResourcesPath = dFlipLocation + "images/pdfjs/";
      DFLIP.defaults.cMapUrl = dFlipLocation + "js/libs/cmaps/";
      if (typeof dFlipWPGlobal !== "undefined") {
        n(dFlipWPGlobal);
        e.extend(DFLIP.defaults, dFlipWPGlobal);
      }
    }
    DFLIP.preParseHash = window.location.hash;
    DFLIP.parseBooks();
    e("body").on("click", "._df_button, ._df_thumb, ._df_custom", function () {
      var t = e(this);
      if (!window.dfLightBox) {
        window.dfLightBox = new DFLightBox(function () {
          if (window.location.hash.indexOf("#dflip-") == 0)
            window.location.hash = "#_";
          window.dfActiveLightBoxBook.dispose();
          window.dfActiveLightBoxBook = null;
        });
      }
      window.dfLightBox.duration = 500;
      if (window.dfActiveLightBoxBook && window.dfActiveLightBoxBook.dispose) {
        window.dfActiveLightBoxBook.dispose();
      } else {
        window.dfLightBox.show(function () {
          var n = DFLIP.getOptions(t);
          n.transparent = false;
          n.id = t.attr("id");
          var i = t.attr("slug");
          if (i != null) n.slug = i;
          n.isLightBox = true;
          window.dfActiveLightBoxBook = e(window.dfLightBox.container).flipBook(
            n.source,
            n
          );
        });
      }
    });
    if (DFLIP.utils.isSafari || DFLIP.utils.isIOS) {
      e("body").addClass("df-webkit");
    }
    if (DFLIP.preParseHash && DFLIP.preParseHash.indexOf("dflip-") >= 0) {
      var t = DFLIP.preParseHash.split("dflip-")[1].split("/")[0];
      var i = DFLIP.preParseHash.split("dflip-")[1].split("/")[1];
      if (i != null) {
        i = i.split("/")[0];
      }
      var a;
      a = e("[slug=" + t + "]");
      if (a.length == 0) a = e("#" + t);
      if (a.length > 0) {
        if (i != null) {
          a.data("page", i);
        }
        if (a.is("._df_button, ._df_thumb, ._df_custom")) {
          a.trigger("click");
        }
      }
    }
    e("body").on("click", ".df-ui-sidemenu-close", function () {
      var t = e(this);
      t.closest(".df-container")
        .find(".df-ui-outline.df-active , .df-ui-thumbnail.df-active")
        .trigger("click");
    });
  });
})(jQuery);
!(function (t) {
  const e = (t['en-gb'] = t['en-gb'] || {})
  ;(e.dictionary = Object.assign(e.dictionary || {}, {
    '%0 of %1': '%0 of %1',
    Aquamarine: 'Aquamarine',
    Black: 'Black',
    Blue: 'Blue',
    Bold: 'Bold',
    'Bulleted List': 'Bulleted List',
    'Dim grey': 'Dim grey',
    'Dropdown toolbar': '',
    'Edit block': 'Edit block',
    'Editor toolbar': '',
    Green: 'Green',
    Grey: 'Grey',
    Italic: 'Italic',
    'Light blue': 'Light blue',
    'Light green': 'Light green',
    'Light grey': 'Light grey',
    Next: 'Next',
    'Numbered List': 'Numbered List',
    Orange: 'Orange',
    Previous: 'Previous',
    Purple: 'Purple',
    Red: 'Red',
    Redo: 'Redo',
    'Remove Format': 'Remove Format',
    'Rich Text Editor': 'Rich Text Editor',
    'Rich Text Editor, %0': 'Rich Text Editor, %0',
    'Saving changes': 'Saving changes',
    'Show more items': '',
    Turquoise: 'Turquoise',
    Underline: 'Underline',
    Undo: 'Undo',
    White: 'White',
    Yellow: 'Yellow',
  })),
    (e.getPluralForm = function (t) {
      return 1 != t
    })
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {})),
  /*!
   * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
   * For licensing, see LICENSE.md.
   */
  (function (t, e) {
    'object' == typeof exports && 'object' == typeof module
      ? (module.exports = e())
      : 'function' == typeof define && define.amd
      ? define([], e)
      : 'object' == typeof exports
      ? (exports.CKSource = e())
      : (t.CKSource = e())
  })(self, () =>
    (() => {
      'use strict'
      var t = {
        d: (e, n) => {
          for (var i in n) t.o(n, i) && !t.o(e, i) && Object.defineProperty(e, i, { enumerable: !0, get: n[i] })
        },
      }
      ;(t.g = (function () {
        if ('object' == typeof globalThis) return globalThis
        try {
          return this || new Function('return this')()
        } catch (t) {
          if ('object' == typeof window) return window
        }
      })()),
        (t.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e))
      var e = {}
      t.d(e, { default: () => Qm })
      const n = function () {
        return function t() {
          t.called = !0
        }
      }
      class i {
        constructor(t, e) {
          ;(this.source = t), (this.name = e), (this.path = []), (this.stop = n()), (this.off = n())
        }
      }
      const s = new Array(256).fill().map((t, e) => ('0' + e.toString(16)).slice(-2))
      function o() {
        const t = (4294967296 * Math.random()) >>> 0,
          e = (4294967296 * Math.random()) >>> 0,
          n = (4294967296 * Math.random()) >>> 0,
          i = (4294967296 * Math.random()) >>> 0
        return (
          'e' +
          s[(t >> 0) & 255] +
          s[(t >> 8) & 255] +
          s[(t >> 16) & 255] +
          s[(t >> 24) & 255] +
          s[(e >> 0) & 255] +
          s[(e >> 8) & 255] +
          s[(e >> 16) & 255] +
          s[(e >> 24) & 255] +
          s[(n >> 0) & 255] +
          s[(n >> 8) & 255] +
          s[(n >> 16) & 255] +
          s[(n >> 24) & 255] +
          s[(i >> 0) & 255] +
          s[(i >> 8) & 255] +
          s[(i >> 16) & 255] +
          s[(i >> 24) & 255]
        )
      }
      const r = {
        get(t) {
          return 'number' != typeof t ? this[t] || this.normal : t
        },
        highest: 1e5,
        high: 1e3,
        normal: 0,
        low: -1e3,
        lowest: -1e5,
      }
      function a(t, e) {
        const n = r.get(e.priority)
        for (let i = 0; i < t.length; i++) if (r.get(t[i].priority) < n) return void t.splice(i, 0, e)
        t.push(e)
      }
      class c extends Error {
        constructor(t, e, n) {
          super(
            (function (t, e) {
              const n = new WeakSet(),
                i = (t, e) => {
                  if ('object' == typeof e && null !== e) {
                    if (n.has(e)) return `[object ${e.constructor.name}]`
                    n.add(e)
                  }
                  return e
                },
                s = e ? ` ${JSON.stringify(e, i)}` : '',
                o = h(t)
              return t + s + o
            })(t, n)
          ),
            (this.name = 'CKEditorError'),
            (this.context = e),
            (this.data = n)
        }
        is(t) {
          return 'CKEditorError' === t
        }
        static rethrowUnexpectedError(t, e) {
          if (t.is && t.is('CKEditorError')) throw t
          const n = new c(t.message, e)
          throw ((n.stack = t.stack), n)
        }
      }
      function l(t, e) {
        console.warn(...d(t, e))
      }
      function h(t) {
        return `\nRead more: https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-${t}`
      }
      function d(t, e) {
        const n = h(t)
        return e ? [t, e, n] : [t, n]
      }
      const u = '34.1.0',
        f = 'object' == typeof window ? window : t.g
      if (f.CKEDITOR_VERSION) throw new c('ckeditor-duplicated-modules', null)
      f.CKEDITOR_VERSION = u
      const m = Symbol('listeningTo'),
        g = Symbol('emitterId'),
        p = {
          on(t, e, n = {}) {
            this.listenTo(this, t, e, n)
          },
          once(t, e, n) {
            let i = !1
            this.listenTo(
              this,
              t,
              function (t, ...n) {
                i || ((i = !0), t.off(), e.call(this, t, ...n))
              },
              n
            )
          },
          off(t, e) {
            this.stopListening(this, t, e)
          },
          listenTo(t, e, n, i = {}) {
            let s, o
            this[m] || (this[m] = {})
            const r = this[m]
            w(t) || _(t)
            const a = w(t)
            ;(s = r[a]) || (s = r[a] = { emitter: t, callbacks: {} }),
              (o = s.callbacks[e]) || (o = s.callbacks[e] = []),
              o.push(n),
              (function (t, e, n, i, s) {
                e._addEventListener ? e._addEventListener(n, i, s) : t._addEventListener.call(e, n, i, s)
              })(this, t, e, n, i)
          },
          stopListening(t, e, n) {
            const i = this[m]
            let s = t && w(t)
            const o = i && s && i[s],
              r = o && e && o.callbacks[e]
            if (!(!i || (t && !o) || (e && !r)))
              if (n) {
                k(this, t, e, n)
                ;-1 !== r.indexOf(n) && (1 === r.length ? delete o.callbacks[e] : k(this, t, e, n))
              } else if (r) {
                for (; (n = r.pop()); ) k(this, t, e, n)
                delete o.callbacks[e]
              } else if (o) {
                for (e in o.callbacks) this.stopListening(t, e)
                delete i[s]
              } else {
                for (s in i) this.stopListening(i[s].emitter)
                delete this[m]
              }
          },
          fire(t, ...e) {
            try {
              const n = t instanceof i ? t : new i(this, t),
                s = n.name
              let o = v(this, s)
              if ((n.path.push(this), o)) {
                const t = [n, ...e]
                o = Array.from(o)
                for (
                  let e = 0;
                  e < o.length &&
                  (o[e].callback.apply(this, t),
                  n.off.called && (delete n.off.called, this._removeEventListener(s, o[e].callback)),
                  !n.stop.called);
                  e++
                );
              }
              if (this._delegations) {
                const t = this._delegations.get(s),
                  i = this._delegations.get('*')
                t && P(t, n, e), i && P(i, n, e)
              }
              return n.return
            } catch (t) {
              c.rethrowUnexpectedError(t, this)
            }
          },
          delegate(...t) {
            return {
              to: (e, n) => {
                this._delegations || (this._delegations = new Map()),
                  t.forEach(t => {
                    const i = this._delegations.get(t)
                    i ? i.set(e, n) : this._delegations.set(t, new Map([[e, n]]))
                  })
              },
            }
          },
          stopDelegating(t, e) {
            if (this._delegations)
              if (t)
                if (e) {
                  const n = this._delegations.get(t)
                  n && n.delete(e)
                } else this._delegations.delete(t)
              else this._delegations.clear()
          },
          _addEventListener(t, e, n) {
            !(function (t, e) {
              const n = b(t)
              if (n[e]) return
              let i = e,
                s = null
              const o = []
              for (; '' !== i && !n[i]; )
                (n[i] = { callbacks: [], childEvents: [] }),
                  o.push(n[i]),
                  s && n[i].childEvents.push(s),
                  (s = i),
                  (i = i.substr(0, i.lastIndexOf(':')))
              if ('' !== i) {
                for (const t of o) t.callbacks = n[i].callbacks.slice()
                n[i].childEvents.push(s)
              }
            })(this, t)
            const i = y(this, t),
              s = { callback: e, priority: r.get(n.priority) }
            for (const t of i) a(t, s)
          },
          _removeEventListener(t, e) {
            const n = y(this, t)
            for (const t of n) for (let n = 0; n < t.length; n++) t[n].callback == e && (t.splice(n, 1), n--)
          },
        }
      function _(t, e) {
        t[g] || (t[g] = e || o())
      }
      function w(t) {
        return t[g]
      }
      function b(t) {
        return t._events || Object.defineProperty(t, '_events', { value: {} }), t._events
      }
      function y(t, e) {
        const n = b(t)[e]
        if (!n) return []
        let i = [n.callbacks]
        for (let e = 0; e < n.childEvents.length; e++) {
          const s = y(t, n.childEvents[e])
          i = i.concat(s)
        }
        return i
      }
      function v(t, e) {
        let n
        return t._events && (n = t._events[e]) && n.callbacks.length
          ? n.callbacks
          : e.indexOf(':') > -1
          ? v(t, e.substr(0, e.lastIndexOf(':')))
          : null
      }
      function P(t, e, n) {
        for (let [s, o] of t) {
          o ? 'function' == typeof o && (o = o(e.name)) : (o = e.name)
          const t = new i(e.source, o)
          ;(t.path = [...e.path]), s.fire(t, ...n)
        }
      }
      function k(t, e, n, i) {
        e._removeEventListener ? e._removeEventListener(n, i) : t._removeEventListener.call(e, n, i)
      }
      const A = function (t) {
        var e = typeof t
        return null != t && ('object' == e || 'function' == e)
      }
      const C = 'object' == typeof global && global && global.Object === Object && global
      var E = 'object' == typeof self && self && self.Object === Object && self
      const S = C || E || Function('return this')()
      const x = S.Symbol
      var T = Object.prototype,
        R = T.hasOwnProperty,
        O = T.toString,
        I = x ? x.toStringTag : void 0
      const M = function (t) {
        var e = R.call(t, I),
          n = t[I]
        try {
          t[I] = void 0
          var i = !0
        } catch (t) {}
        var s = O.call(t)
        return i && (e ? (t[I] = n) : delete t[I]), s
      }
      var N = Object.prototype.toString
      const D = function (t) {
        return N.call(t)
      }
      var F = x ? x.toStringTag : void 0
      const B = function (t) {
        return null == t ? (void 0 === t ? '[object Undefined]' : '[object Null]') : F && F in Object(t) ? M(t) : D(t)
      }
      const V = function (t) {
        if (!A(t)) return !1
        var e = B(t)
        return (
          '[object Function]' == e ||
          '[object GeneratorFunction]' == e ||
          '[object AsyncFunction]' == e ||
          '[object Proxy]' == e
        )
      }
      const L = S['__core-js_shared__']
      var j = (function () {
        var t = /[^.]+$/.exec((L && L.keys && L.keys.IE_PROTO) || '')
        return t ? 'Symbol(src)_1.' + t : ''
      })()
      const W = function (t) {
        return !!j && j in t
      }
      var z = Function.prototype.toString
      const $ = function (t) {
        if (null != t) {
          try {
            return z.call(t)
          } catch (t) {}
          try {
            return t + ''
          } catch (t) {}
        }
        return ''
      }
      var q = /^\[object .+?Constructor\]$/,
        U = Function.prototype,
        H = Object.prototype,
        K = U.toString,
        G = H.hasOwnProperty,
        J = RegExp(
          '^' +
            K.call(G)
              .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
              .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
            '$'
        )
      const Y = function (t) {
        return !(!A(t) || W(t)) && (V(t) ? J : q).test($(t))
      }
      const X = function (t, e) {
        return null == t ? void 0 : t[e]
      }
      const Z = function (t, e) {
        var n = X(t, e)
        return Y(n) ? n : void 0
      }
      const Q = (function () {
        try {
          var t = Z(Object, 'defineProperty')
          return t({}, '', {}), t
        } catch (t) {}
      })()
      const tt = function (t, e, n) {
        '__proto__' == e && Q ? Q(t, e, { configurable: !0, enumerable: !0, value: n, writable: !0 }) : (t[e] = n)
      }
      const et = function (t, e) {
        return t === e || (t != t && e != e)
      }
      var nt = Object.prototype.hasOwnProperty
      const it = function (t, e, n) {
        var i = t[e]
        ;(nt.call(t, e) && et(i, n) && (void 0 !== n || e in t)) || tt(t, e, n)
      }
      const st = function (t, e, n, i) {
        var s = !n
        n || (n = {})
        for (var o = -1, r = e.length; ++o < r; ) {
          var a = e[o],
            c = i ? i(n[a], t[a], a, n, t) : void 0
          void 0 === c && (c = t[a]), s ? tt(n, a, c) : it(n, a, c)
        }
        return n
      }
      const ot = function (t) {
        return t
      }
      const rt = function (t, e, n) {
        switch (n.length) {
          case 0:
            return t.call(e)
          case 1:
            return t.call(e, n[0])
          case 2:
            return t.call(e, n[0], n[1])
          case 3:
            return t.call(e, n[0], n[1], n[2])
        }
        return t.apply(e, n)
      }
      var at = Math.max
      const ct = function (t, e, n) {
        return (
          (e = at(void 0 === e ? t.length - 1 : e, 0)),
          function () {
            for (var i = arguments, s = -1, o = at(i.length - e, 0), r = Array(o); ++s < o; ) r[s] = i[e + s]
            s = -1
            for (var a = Array(e + 1); ++s < e; ) a[s] = i[s]
            return (a[e] = n(r)), rt(t, this, a)
          }
        )
      }
      const lt = function (t) {
        return function () {
          return t
        }
      }
      const ht = Q
        ? function (t, e) {
            return Q(t, 'toString', { configurable: !0, enumerable: !1, value: lt(e), writable: !0 })
          }
        : ot
      var dt = Date.now
      const ut = function (t) {
        var e = 0,
          n = 0
        return function () {
          var i = dt(),
            s = 16 - (i - n)
          if (((n = i), s > 0)) {
            if (++e >= 800) return arguments[0]
          } else e = 0
          return t.apply(void 0, arguments)
        }
      }
      const ft = ut(ht)
      const mt = function (t, e) {
        return ft(ct(t, e, ot), t + '')
      }
      const gt = function (t) {
        return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
      }
      const pt = function (t) {
        return null != t && gt(t.length) && !V(t)
      }
      var _t = /^(?:0|[1-9]\d*)$/
      const wt = function (t, e) {
        var n = typeof t
        return (
          !!(e = null == e ? 9007199254740991 : e) &&
          ('number' == n || ('symbol' != n && _t.test(t))) &&
          t > -1 &&
          t % 1 == 0 &&
          t < e
        )
      }
      const bt = function (t, e, n) {
        if (!A(n)) return !1
        var i = typeof e
        return !!('number' == i ? pt(n) && wt(e, n.length) : 'string' == i && e in n) && et(n[e], t)
      }
      const yt = function (t) {
        return mt(function (e, n) {
          var i = -1,
            s = n.length,
            o = s > 1 ? n[s - 1] : void 0,
            r = s > 2 ? n[2] : void 0
          for (
            o = t.length > 3 && 'function' == typeof o ? (s--, o) : void 0,
              r && bt(n[0], n[1], r) && ((o = s < 3 ? void 0 : o), (s = 1)),
              e = Object(e);
            ++i < s;

          ) {
            var a = n[i]
            a && t(e, a, i, o)
          }
          return e
        })
      }
      const vt = function (t, e) {
        for (var n = -1, i = Array(t); ++n < t; ) i[n] = e(n)
        return i
      }
      const Pt = function (t) {
        return null != t && 'object' == typeof t
      }
      const kt = function (t) {
        return Pt(t) && '[object Arguments]' == B(t)
      }
      var At = Object.prototype,
        Ct = At.hasOwnProperty,
        Et = At.propertyIsEnumerable
      const St = kt(
        (function () {
          return arguments
        })()
      )
        ? kt
        : function (t) {
            return Pt(t) && Ct.call(t, 'callee') && !Et.call(t, 'callee')
          }
      const xt = Array.isArray
      const Tt = function () {
        return !1
      }
      var Rt = 'object' == typeof exports && exports && !exports.nodeType && exports,
        Ot = Rt && 'object' == typeof module && module && !module.nodeType && module,
        It = Ot && Ot.exports === Rt ? S.Buffer : void 0
      const Mt = (It ? It.isBuffer : void 0) || Tt
      var Nt = {}
      ;(Nt['[object Float32Array]'] =
        Nt['[object Float64Array]'] =
        Nt['[object Int8Array]'] =
        Nt['[object Int16Array]'] =
        Nt['[object Int32Array]'] =
        Nt['[object Uint8Array]'] =
        Nt['[object Uint8ClampedArray]'] =
        Nt['[object Uint16Array]'] =
        Nt['[object Uint32Array]'] =
          !0),
        (Nt['[object Arguments]'] =
          Nt['[object Array]'] =
          Nt['[object ArrayBuffer]'] =
          Nt['[object Boolean]'] =
          Nt['[object DataView]'] =
          Nt['[object Date]'] =
          Nt['[object Error]'] =
          Nt['[object Function]'] =
          Nt['[object Map]'] =
          Nt['[object Number]'] =
          Nt['[object Object]'] =
          Nt['[object RegExp]'] =
          Nt['[object Set]'] =
          Nt['[object String]'] =
          Nt['[object WeakMap]'] =
            !1)
      const Dt = function (t) {
        return Pt(t) && gt(t.length) && !!Nt[B(t)]
      }
      const Ft = function (t) {
        return function (e) {
          return t(e)
        }
      }
      var Bt = 'object' == typeof exports && exports && !exports.nodeType && exports,
        Vt = Bt && 'object' == typeof module && module && !module.nodeType && module,
        Lt = Vt && Vt.exports === Bt && C.process
      const jt = (function () {
        try {
          var t = Vt && Vt.require && Vt.require('util').types
          return t || (Lt && Lt.binding && Lt.binding('util'))
        } catch (t) {}
      })()
      var Wt = jt && jt.isTypedArray
      const zt = Wt ? Ft(Wt) : Dt
      var $t = Object.prototype.hasOwnProperty
      const qt = function (t, e) {
        var n = xt(t),
          i = !n && St(t),
          s = !n && !i && Mt(t),
          o = !n && !i && !s && zt(t),
          r = n || i || s || o,
          a = r ? vt(t.length, String) : [],
          c = a.length
        for (var l in t)
          (!e && !$t.call(t, l)) ||
            (r &&
              ('length' == l ||
                (s && ('offset' == l || 'parent' == l)) ||
                (o && ('buffer' == l || 'byteLength' == l || 'byteOffset' == l)) ||
                wt(l, c))) ||
            a.push(l)
        return a
      }
      var Ut = Object.prototype
      const Ht = function (t) {
        var e = t && t.constructor
        return t === (('function' == typeof e && e.prototype) || Ut)
      }
      const Kt = function (t) {
        var e = []
        if (null != t) for (var n in Object(t)) e.push(n)
        return e
      }
      var Gt = Object.prototype.hasOwnProperty
      const Jt = function (t) {
        if (!A(t)) return Kt(t)
        var e = Ht(t),
          n = []
        for (var i in t) ('constructor' != i || (!e && Gt.call(t, i))) && n.push(i)
        return n
      }
      const Yt = function (t) {
        return pt(t) ? qt(t, !0) : Jt(t)
      }
      const Xt = yt(function (t, e) {
          st(e, Yt(e), t)
        }),
        Zt = Symbol('observableProperties'),
        Qt = Symbol('boundObservables'),
        te = Symbol('boundProperties'),
        ee = Symbol('decoratedMethods'),
        ne = Symbol('decoratedOriginal'),
        ie = {
          set(t, e) {
            if (A(t))
              return void Object.keys(t).forEach(e => {
                this.set(e, t[e])
              }, this)
            oe(this)
            const n = this[Zt]
            if (t in this && !n.has(t)) throw new c('observable-set-cannot-override', this)
            Object.defineProperty(this, t, {
              enumerable: !0,
              configurable: !0,
              get: () => n.get(t),
              set(e) {
                const i = n.get(t)
                let s = this.fire('set:' + t, t, e, i)
                void 0 === s && (s = e), (i === s && n.has(t)) || (n.set(t, s), this.fire('change:' + t, t, s, i))
              },
            }),
              (this[t] = e)
          },
          bind(...t) {
            if (!t.length || !ce(t)) throw new c('observable-bind-wrong-properties', this)
            if (new Set(t).size !== t.length) throw new c('observable-bind-duplicate-properties', this)
            oe(this)
            const e = this[te]
            t.forEach(t => {
              if (e.has(t)) throw new c('observable-bind-rebind', this)
            })
            const n = new Map()
            return (
              t.forEach(t => {
                const i = { property: t, to: [] }
                e.set(t, i), n.set(t, i)
              }),
              { to: re, toMany: ae, _observable: this, _bindProperties: t, _to: [], _bindings: n }
            )
          },
          unbind(...t) {
            if (!this[Zt]) return
            const e = this[te],
              n = this[Qt]
            if (t.length) {
              if (!ce(t)) throw new c('observable-unbind-wrong-properties', this)
              t.forEach(t => {
                const i = e.get(t)
                if (!i) return
                let s, o, r, a
                i.to.forEach(t => {
                  ;(s = t[0]),
                    (o = t[1]),
                    (r = n.get(s)),
                    (a = r[o]),
                    a.delete(i),
                    a.size || delete r[o],
                    Object.keys(r).length || (n.delete(s), this.stopListening(s, 'change'))
                }),
                  e.delete(t)
              })
            } else
              n.forEach((t, e) => {
                this.stopListening(e, 'change')
              }),
                n.clear(),
                e.clear()
          },
          decorate(t) {
            const e = this[t]
            if (!e) throw new c('observablemixin-cannot-decorate-undefined', this, { object: this, methodName: t })
            this.on(t, (t, n) => {
              t.return = e.apply(this, n)
            }),
              (this[t] = function (...e) {
                return this.fire(t, e)
              }),
              (this[t][ne] = e),
              this[ee] || (this[ee] = []),
              this[ee].push(t)
          },
        }
      Xt(ie, p),
        (ie.stopListening = function (t, e, n) {
          if (!t && this[ee]) {
            for (const t of this[ee]) this[t] = this[t][ne]
            delete this[ee]
          }
          p.stopListening.call(this, t, e, n)
        })
      const se = ie
      function oe(t) {
        t[Zt] ||
          (Object.defineProperty(t, Zt, { value: new Map() }),
          Object.defineProperty(t, Qt, { value: new Map() }),
          Object.defineProperty(t, te, { value: new Map() }))
      }
      function re(...t) {
        const e = (function (...t) {
            if (!t.length) throw new c('observable-bind-to-parse-error', null)
            const e = { to: [] }
            let n
            'function' == typeof t[t.length - 1] && (e.callback = t.pop())
            return (
              t.forEach(t => {
                if ('string' == typeof t) n.properties.push(t)
                else {
                  if ('object' != typeof t) throw new c('observable-bind-to-parse-error', null)
                  ;(n = { observable: t, properties: [] }), e.to.push(n)
                }
              }),
              e
            )
          })(...t),
          n = Array.from(this._bindings.keys()),
          i = n.length
        if (!e.callback && e.to.length > 1) throw new c('observable-bind-to-no-callback', this)
        if (i > 1 && e.callback) throw new c('observable-bind-to-extra-callback', this)
        var s
        e.to.forEach(t => {
          if (t.properties.length && t.properties.length !== i)
            throw new c('observable-bind-to-properties-length', this)
          t.properties.length || (t.properties = this._bindProperties)
        }),
          (this._to = e.to),
          e.callback && (this._bindings.get(n[0]).callback = e.callback),
          (s = this._observable),
          this._to.forEach(t => {
            const e = s[Qt]
            let n
            e.get(t.observable) ||
              s.listenTo(t.observable, 'change', (i, o) => {
                ;(n = e.get(t.observable)[o]),
                  n &&
                    n.forEach(t => {
                      le(s, t.property)
                    })
              })
          }),
          (function (t) {
            let e
            t._bindings.forEach((n, i) => {
              t._to.forEach(s => {
                ;(e = s.properties[n.callback ? 0 : t._bindProperties.indexOf(i)]),
                  n.to.push([s.observable, e]),
                  (function (t, e, n, i) {
                    const s = t[Qt],
                      o = s.get(n),
                      r = o || {}
                    r[i] || (r[i] = new Set())
                    r[i].add(e), o || s.set(n, r)
                  })(t._observable, n, s.observable, e)
              })
            })
          })(this),
          this._bindProperties.forEach(t => {
            le(this._observable, t)
          })
      }
      function ae(t, e, n) {
        if (this._bindings.size > 1) throw new c('observable-bind-to-many-not-one-binding', this)
        this.to(
          ...(function (t, e) {
            const n = t.map(t => [t, e])
            return Array.prototype.concat.apply([], n)
          })(t, e),
          n
        )
      }
      function ce(t) {
        return t.every(t => 'string' == typeof t)
      }
      function le(t, e) {
        const n = t[te].get(e)
        let i
        n.callback
          ? (i = n.callback.apply(
              t,
              n.to.map(t => t[0][t[1]])
            ))
          : ((i = n.to[0]), (i = i[0][i[1]])),
          Object.prototype.hasOwnProperty.call(t, e) ? (t[e] = i) : t.set(e, i)
      }
      function he(t, ...e) {
        e.forEach(e => {
          Object.getOwnPropertyNames(e)
            .concat(Object.getOwnPropertySymbols(e))
            .forEach(n => {
              if (n in t.prototype) return
              const i = Object.getOwnPropertyDescriptor(e, n)
              ;(i.enumerable = !1), Object.defineProperty(t.prototype, n, i)
            })
        })
      }
      class de {
        constructor(t) {
          ;(this.editor = t), this.set('isEnabled', !0), (this._disableStack = new Set())
        }
        forceDisabled(t) {
          this._disableStack.add(t),
            1 == this._disableStack.size &&
              (this.on('set:isEnabled', ue, { priority: 'highest' }), (this.isEnabled = !1))
        }
        clearForceDisabled(t) {
          this._disableStack.delete(t),
            0 == this._disableStack.size && (this.off('set:isEnabled', ue), (this.isEnabled = !0))
        }
        destroy() {
          this.stopListening()
        }
        static get isContextPlugin() {
          return !1
        }
      }
      function ue(t) {
        ;(t.return = !1), t.stop()
      }
      he(de, se)
      class fe {
        constructor(t) {
          ;(this.editor = t),
            this.set('value', void 0),
            this.set('isEnabled', !1),
            (this.affectsData = !0),
            (this._disableStack = new Set()),
            this.decorate('execute'),
            this.listenTo(this.editor.model.document, 'change', () => {
              this.refresh()
            }),
            this.on(
              'execute',
              t => {
                this.isEnabled || t.stop()
              },
              { priority: 'high' }
            ),
            this.listenTo(t, 'change:isReadOnly', (t, e, n) => {
              n && this.affectsData ? this.forceDisabled('readOnlyMode') : this.clearForceDisabled('readOnlyMode')
            })
        }
        refresh() {
          this.isEnabled = !0
        }
        forceDisabled(t) {
          this._disableStack.add(t),
            1 == this._disableStack.size &&
              (this.on('set:isEnabled', me, { priority: 'highest' }), (this.isEnabled = !1))
        }
        clearForceDisabled(t) {
          this._disableStack.delete(t), 0 == this._disableStack.size && (this.off('set:isEnabled', me), this.refresh())
        }
        execute() {}
        destroy() {
          this.stopListening()
        }
      }
      function me(t) {
        ;(t.return = !1), t.stop()
      }
      he(fe, se)
      const ge = function (t, e) {
        return function (n) {
          return t(e(n))
        }
      }
      const pe = ge(Object.getPrototypeOf, Object)
      var _e = Function.prototype,
        we = Object.prototype,
        be = _e.toString,
        ye = we.hasOwnProperty,
        ve = be.call(Object)
      const Pe = function (t) {
        if (!Pt(t) || '[object Object]' != B(t)) return !1
        var e = pe(t)
        if (null === e) return !0
        var n = ye.call(e, 'constructor') && e.constructor
        return 'function' == typeof n && n instanceof n && be.call(n) == ve
      }
      const ke = function () {
        ;(this.__data__ = []), (this.size = 0)
      }
      const Ae = function (t, e) {
        for (var n = t.length; n--; ) if (et(t[n][0], e)) return n
        return -1
      }
      var Ce = Array.prototype.splice
      const Ee = function (t) {
        var e = this.__data__,
          n = Ae(e, t)
        return !(n < 0) && (n == e.length - 1 ? e.pop() : Ce.call(e, n, 1), --this.size, !0)
      }
      const Se = function (t) {
        var e = this.__data__,
          n = Ae(e, t)
        return n < 0 ? void 0 : e[n][1]
      }
      const xe = function (t) {
        return Ae(this.__data__, t) > -1
      }
      const Te = function (t, e) {
        var n = this.__data__,
          i = Ae(n, t)
        return i < 0 ? (++this.size, n.push([t, e])) : (n[i][1] = e), this
      }
      function Re(t) {
        var e = -1,
          n = null == t ? 0 : t.length
        for (this.clear(); ++e < n; ) {
          var i = t[e]
          this.set(i[0], i[1])
        }
      }
      ;(Re.prototype.clear = ke),
        (Re.prototype.delete = Ee),
        (Re.prototype.get = Se),
        (Re.prototype.has = xe),
        (Re.prototype.set = Te)
      const Oe = Re
      const Ie = function () {
        ;(this.__data__ = new Oe()), (this.size = 0)
      }
      const Me = function (t) {
        var e = this.__data__,
          n = e.delete(t)
        return (this.size = e.size), n
      }
      const Ne = function (t) {
        return this.__data__.get(t)
      }
      const De = function (t) {
        return this.__data__.has(t)
      }
      const Fe = Z(S, 'Map')
      const Be = Z(Object, 'create')
      const Ve = function () {
        ;(this.__data__ = Be ? Be(null) : {}), (this.size = 0)
      }
      const Le = function (t) {
        var e = this.has(t) && delete this.__data__[t]
        return (this.size -= e ? 1 : 0), e
      }
      var je = Object.prototype.hasOwnProperty
      const We = function (t) {
        var e = this.__data__
        if (Be) {
          var n = e[t]
          return '__lodash_hash_undefined__' === n ? void 0 : n
        }
        return je.call(e, t) ? e[t] : void 0
      }
      var ze = Object.prototype.hasOwnProperty
      const $e = function (t) {
        var e = this.__data__
        return Be ? void 0 !== e[t] : ze.call(e, t)
      }
      const qe = function (t, e) {
        var n = this.__data__
        return (this.size += this.has(t) ? 0 : 1), (n[t] = Be && void 0 === e ? '__lodash_hash_undefined__' : e), this
      }
      function Ue(t) {
        var e = -1,
          n = null == t ? 0 : t.length
        for (this.clear(); ++e < n; ) {
          var i = t[e]
          this.set(i[0], i[1])
        }
      }
      ;(Ue.prototype.clear = Ve),
        (Ue.prototype.delete = Le),
        (Ue.prototype.get = We),
        (Ue.prototype.has = $e),
        (Ue.prototype.set = qe)
      const He = Ue
      const Ke = function () {
        ;(this.size = 0), (this.__data__ = { hash: new He(), map: new (Fe || Oe)(), string: new He() })
      }
      const Ge = function (t) {
        var e = typeof t
        return 'string' == e || 'number' == e || 'symbol' == e || 'boolean' == e ? '__proto__' !== t : null === t
      }
      const Je = function (t, e) {
        var n = t.__data__
        return Ge(e) ? n['string' == typeof e ? 'string' : 'hash'] : n.map
      }
      const Ye = function (t) {
        var e = Je(this, t).delete(t)
        return (this.size -= e ? 1 : 0), e
      }
      const Xe = function (t) {
        return Je(this, t).get(t)
      }
      const Ze = function (t) {
        return Je(this, t).has(t)
      }
      const Qe = function (t, e) {
        var n = Je(this, t),
          i = n.size
        return n.set(t, e), (this.size += n.size == i ? 0 : 1), this
      }
      function tn(t) {
        var e = -1,
          n = null == t ? 0 : t.length
        for (this.clear(); ++e < n; ) {
          var i = t[e]
          this.set(i[0], i[1])
        }
      }
      ;(tn.prototype.clear = Ke),
        (tn.prototype.delete = Ye),
        (tn.prototype.get = Xe),
        (tn.prototype.has = Ze),
        (tn.prototype.set = Qe)
      const en = tn
      const nn = function (t, e) {
        var n = this.__data__
        if (n instanceof Oe) {
          var i = n.__data__
          if (!Fe || i.length < 199) return i.push([t, e]), (this.size = ++n.size), this
          n = this.__data__ = new en(i)
        }
        return n.set(t, e), (this.size = n.size), this
      }
      function sn(t) {
        var e = (this.__data__ = new Oe(t))
        this.size = e.size
      }
      ;(sn.prototype.clear = Ie),
        (sn.prototype.delete = Me),
        (sn.prototype.get = Ne),
        (sn.prototype.has = De),
        (sn.prototype.set = nn)
      const on = sn
      const rn = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length; ++n < i && !1 !== e(t[n], n, t); );
        return t
      }
      const an = ge(Object.keys, Object)
      var cn = Object.prototype.hasOwnProperty
      const ln = function (t) {
        if (!Ht(t)) return an(t)
        var e = []
        for (var n in Object(t)) cn.call(t, n) && 'constructor' != n && e.push(n)
        return e
      }
      const hn = function (t) {
        return pt(t) ? qt(t) : ln(t)
      }
      const dn = function (t, e) {
        return t && st(e, hn(e), t)
      }
      const un = function (t, e) {
        return t && st(e, Yt(e), t)
      }
      var fn = 'object' == typeof exports && exports && !exports.nodeType && exports,
        mn = fn && 'object' == typeof module && module && !module.nodeType && module,
        gn = mn && mn.exports === fn ? S.Buffer : void 0,
        pn = gn ? gn.allocUnsafe : void 0
      const _n = function (t, e) {
        if (e) return t.slice()
        var n = t.length,
          i = pn ? pn(n) : new t.constructor(n)
        return t.copy(i), i
      }
      const wn = function (t, e) {
        var n = -1,
          i = t.length
        for (e || (e = Array(i)); ++n < i; ) e[n] = t[n]
        return e
      }
      const bn = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length, s = 0, o = []; ++n < i; ) {
          var r = t[n]
          e(r, n, t) && (o[s++] = r)
        }
        return o
      }
      const yn = function () {
        return []
      }
      var vn = Object.prototype.propertyIsEnumerable,
        Pn = Object.getOwnPropertySymbols
      const kn = Pn
        ? function (t) {
            return null == t
              ? []
              : ((t = Object(t)),
                bn(Pn(t), function (e) {
                  return vn.call(t, e)
                }))
          }
        : yn
      const An = function (t, e) {
        return st(t, kn(t), e)
      }
      const Cn = function (t, e) {
        for (var n = -1, i = e.length, s = t.length; ++n < i; ) t[s + n] = e[n]
        return t
      }
      const En = Object.getOwnPropertySymbols
        ? function (t) {
            for (var e = []; t; ) Cn(e, kn(t)), (t = pe(t))
            return e
          }
        : yn
      const Sn = function (t, e) {
        return st(t, En(t), e)
      }
      const xn = function (t, e, n) {
        var i = e(t)
        return xt(t) ? i : Cn(i, n(t))
      }
      const Tn = function (t) {
        return xn(t, hn, kn)
      }
      const Rn = function (t) {
        return xn(t, Yt, En)
      }
      const On = Z(S, 'DataView')
      const In = Z(S, 'Promise')
      const Mn = Z(S, 'Set')
      const Nn = Z(S, 'WeakMap')
      var Dn = '[object Map]',
        Fn = '[object Promise]',
        Bn = '[object Set]',
        Vn = '[object WeakMap]',
        Ln = '[object DataView]',
        jn = $(On),
        Wn = $(Fe),
        zn = $(In),
        $n = $(Mn),
        qn = $(Nn),
        Un = B
      ;((On && Un(new On(new ArrayBuffer(1))) != Ln) ||
        (Fe && Un(new Fe()) != Dn) ||
        (In && Un(In.resolve()) != Fn) ||
        (Mn && Un(new Mn()) != Bn) ||
        (Nn && Un(new Nn()) != Vn)) &&
        (Un = function (t) {
          var e = B(t),
            n = '[object Object]' == e ? t.constructor : void 0,
            i = n ? $(n) : ''
          if (i)
            switch (i) {
              case jn:
                return Ln
              case Wn:
                return Dn
              case zn:
                return Fn
              case $n:
                return Bn
              case qn:
                return Vn
            }
          return e
        })
      const Hn = Un
      var Kn = Object.prototype.hasOwnProperty
      const Gn = function (t) {
        var e = t.length,
          n = new t.constructor(e)
        return e && 'string' == typeof t[0] && Kn.call(t, 'index') && ((n.index = t.index), (n.input = t.input)), n
      }
      const Jn = S.Uint8Array
      const Yn = function (t) {
        var e = new t.constructor(t.byteLength)
        return new Jn(e).set(new Jn(t)), e
      }
      const Xn = function (t, e) {
        var n = e ? Yn(t.buffer) : t.buffer
        return new t.constructor(n, t.byteOffset, t.byteLength)
      }
      var Zn = /\w*$/
      const Qn = function (t) {
        var e = new t.constructor(t.source, Zn.exec(t))
        return (e.lastIndex = t.lastIndex), e
      }
      var ti = x ? x.prototype : void 0,
        ei = ti ? ti.valueOf : void 0
      const ni = function (t) {
        return ei ? Object(ei.call(t)) : {}
      }
      const ii = function (t, e) {
        var n = e ? Yn(t.buffer) : t.buffer
        return new t.constructor(n, t.byteOffset, t.length)
      }
      const si = function (t, e, n) {
        var i = t.constructor
        switch (e) {
          case '[object ArrayBuffer]':
            return Yn(t)
          case '[object Boolean]':
          case '[object Date]':
            return new i(+t)
          case '[object DataView]':
            return Xn(t, n)
          case '[object Float32Array]':
          case '[object Float64Array]':
          case '[object Int8Array]':
          case '[object Int16Array]':
          case '[object Int32Array]':
          case '[object Uint8Array]':
          case '[object Uint8ClampedArray]':
          case '[object Uint16Array]':
          case '[object Uint32Array]':
            return ii(t, n)
          case '[object Map]':
          case '[object Set]':
            return new i()
          case '[object Number]':
          case '[object String]':
            return new i(t)
          case '[object RegExp]':
            return Qn(t)
          case '[object Symbol]':
            return ni(t)
        }
      }
      var oi = Object.create
      const ri = (function () {
        function t() {}
        return function (e) {
          if (!A(e)) return {}
          if (oi) return oi(e)
          t.prototype = e
          var n = new t()
          return (t.prototype = void 0), n
        }
      })()
      const ai = function (t) {
        return 'function' != typeof t.constructor || Ht(t) ? {} : ri(pe(t))
      }
      const ci = function (t) {
        return Pt(t) && '[object Map]' == Hn(t)
      }
      var li = jt && jt.isMap
      const hi = li ? Ft(li) : ci
      const di = function (t) {
        return Pt(t) && '[object Set]' == Hn(t)
      }
      var ui = jt && jt.isSet
      const fi = ui ? Ft(ui) : di
      var mi = '[object Arguments]',
        gi = '[object Function]',
        pi = '[object Object]',
        _i = {}
      ;(_i[mi] =
        _i['[object Array]'] =
        _i['[object ArrayBuffer]'] =
        _i['[object DataView]'] =
        _i['[object Boolean]'] =
        _i['[object Date]'] =
        _i['[object Float32Array]'] =
        _i['[object Float64Array]'] =
        _i['[object Int8Array]'] =
        _i['[object Int16Array]'] =
        _i['[object Int32Array]'] =
        _i['[object Map]'] =
        _i['[object Number]'] =
        _i['[object Object]'] =
        _i['[object RegExp]'] =
        _i['[object Set]'] =
        _i['[object String]'] =
        _i['[object Symbol]'] =
        _i['[object Uint8Array]'] =
        _i['[object Uint8ClampedArray]'] =
        _i['[object Uint16Array]'] =
        _i['[object Uint32Array]'] =
          !0),
        (_i['[object Error]'] = _i[gi] = _i['[object WeakMap]'] = !1)
      const wi = function t(e, n, i, s, o, r) {
        var a,
          c = 1 & n,
          l = 2 & n,
          h = 4 & n
        if ((i && (a = o ? i(e, s, o, r) : i(e)), void 0 !== a)) return a
        if (!A(e)) return e
        var d = xt(e)
        if (d) {
          if (((a = Gn(e)), !c)) return wn(e, a)
        } else {
          var u = Hn(e),
            f = u == gi || '[object GeneratorFunction]' == u
          if (Mt(e)) return _n(e, c)
          if (u == pi || u == mi || (f && !o)) {
            if (((a = l || f ? {} : ai(e)), !c)) return l ? Sn(e, un(a, e)) : An(e, dn(a, e))
          } else {
            if (!_i[u]) return o ? e : {}
            a = si(e, u, c)
          }
        }
        r || (r = new on())
        var m = r.get(e)
        if (m) return m
        r.set(e, a),
          fi(e)
            ? e.forEach(function (s) {
                a.add(t(s, n, i, s, e, r))
              })
            : hi(e) &&
              e.forEach(function (s, o) {
                a.set(o, t(s, n, i, o, e, r))
              })
        var g = d ? void 0 : (h ? (l ? Rn : Tn) : l ? Yt : hn)(e)
        return (
          rn(g || e, function (s, o) {
            g && (s = e[(o = s)]), it(a, o, t(s, n, i, o, e, r))
          }),
          a
        )
      }
      const bi = function (t, e) {
        return wi(t, 5, (e = 'function' == typeof e ? e : void 0))
      }
      const yi = function (t) {
        return Pt(t) && 1 === t.nodeType && !Pe(t)
      }
      class vi {
        constructor(t, e) {
          ;(this._config = {}), e && this.define(Pi(e)), t && this._setObjectToTarget(this._config, t)
        }
        set(t, e) {
          this._setToTarget(this._config, t, e)
        }
        define(t, e) {
          this._setToTarget(this._config, t, e, !0)
        }
        get(t) {
          return this._getFromSource(this._config, t)
        }
        *names() {
          for (const t of Object.keys(this._config)) yield t
        }
        _setToTarget(t, e, n, i = !1) {
          if (Pe(e)) return void this._setObjectToTarget(t, e, i)
          const s = e.split('.')
          e = s.pop()
          for (const e of s) Pe(t[e]) || (t[e] = {}), (t = t[e])
          if (Pe(n)) return Pe(t[e]) || (t[e] = {}), (t = t[e]), void this._setObjectToTarget(t, n, i)
          ;(i && void 0 !== t[e]) || (t[e] = n)
        }
        _getFromSource(t, e) {
          const n = e.split('.')
          e = n.pop()
          for (const e of n) {
            if (!Pe(t[e])) {
              t = null
              break
            }
            t = t[e]
          }
          return t ? Pi(t[e]) : void 0
        }
        _setObjectToTarget(t, e, n) {
          Object.keys(e).forEach(i => {
            this._setToTarget(t, i, e[i], n)
          })
        }
      }
      function Pi(t) {
        return bi(t, ki)
      }
      function ki(t) {
        return yi(t) ? t : void 0
      }
      function Ai(t) {
        return !(!t || !t[Symbol.iterator])
      }
      class Ci {
        constructor(t = {}, e = {}) {
          const n = Ai(t)
          if (
            (n || (e = t),
            (this._items = []),
            (this._itemMap = new Map()),
            (this._idProperty = e.idProperty || 'id'),
            (this._bindToExternalToInternalMap = new WeakMap()),
            (this._bindToInternalToExternalMap = new WeakMap()),
            (this._skippedIndexesFromExternal = []),
            n)
          )
            for (const e of t) this._items.push(e), this._itemMap.set(this._getItemIdBeforeAdding(e), e)
        }
        get length() {
          return this._items.length
        }
        get first() {
          return this._items[0] || null
        }
        get last() {
          return this._items[this.length - 1] || null
        }
        add(t, e) {
          return this.addMany([t], e)
        }
        addMany(t, e) {
          if (void 0 === e) e = this._items.length
          else if (e > this._items.length || e < 0) throw new c('collection-add-item-invalid-index', this)
          for (let n = 0; n < t.length; n++) {
            const i = t[n],
              s = this._getItemIdBeforeAdding(i),
              o = e + n
            this._items.splice(o, 0, i), this._itemMap.set(s, i), this.fire('add', i, o)
          }
          return this.fire('change', { added: t, removed: [], index: e }), this
        }
        get(t) {
          let e
          if ('string' == typeof t) e = this._itemMap.get(t)
          else {
            if ('number' != typeof t) throw new c('collection-get-invalid-arg', this)
            e = this._items[t]
          }
          return e || null
        }
        has(t) {
          if ('string' == typeof t) return this._itemMap.has(t)
          {
            const e = t[this._idProperty]
            return this._itemMap.has(e)
          }
        }
        getIndex(t) {
          let e
          return (e = 'string' == typeof t ? this._itemMap.get(t) : t), this._items.indexOf(e)
        }
        remove(t) {
          const [e, n] = this._remove(t)
          return this.fire('change', { added: [], removed: [e], index: n }), e
        }
        map(t, e) {
          return this._items.map(t, e)
        }
        find(t, e) {
          return this._items.find(t, e)
        }
        filter(t, e) {
          return this._items.filter(t, e)
        }
        clear() {
          this._bindToCollection && (this.stopListening(this._bindToCollection), (this._bindToCollection = null))
          const t = Array.from(this._items)
          for (; this.length; ) this._remove(0)
          this.fire('change', { added: [], removed: t, index: 0 })
        }
        bindTo(t) {
          if (this._bindToCollection) throw new c('collection-bind-to-rebind', this)
          return (
            (this._bindToCollection = t),
            {
              as: t => {
                this._setUpBindToBinding(e => new t(e))
              },
              using: t => {
                'function' == typeof t ? this._setUpBindToBinding(e => t(e)) : this._setUpBindToBinding(e => e[t])
              },
            }
          )
        }
        _setUpBindToBinding(t) {
          const e = this._bindToCollection,
            n = (n, i, s) => {
              const o = e._bindToCollection == this,
                r = e._bindToInternalToExternalMap.get(i)
              if (o && r) this._bindToExternalToInternalMap.set(i, r), this._bindToInternalToExternalMap.set(r, i)
              else {
                const n = t(i)
                if (!n) return void this._skippedIndexesFromExternal.push(s)
                let o = s
                for (const t of this._skippedIndexesFromExternal) s > t && o--
                for (const t of e._skippedIndexesFromExternal) o >= t && o++
                this._bindToExternalToInternalMap.set(i, n), this._bindToInternalToExternalMap.set(n, i), this.add(n, o)
                for (let t = 0; t < e._skippedIndexesFromExternal.length; t++)
                  o <= e._skippedIndexesFromExternal[t] && e._skippedIndexesFromExternal[t]++
              }
            }
          for (const t of e) n(0, t, e.getIndex(t))
          this.listenTo(e, 'add', n),
            this.listenTo(e, 'remove', (t, e, n) => {
              const i = this._bindToExternalToInternalMap.get(e)
              i && this.remove(i),
                (this._skippedIndexesFromExternal = this._skippedIndexesFromExternal.reduce(
                  (t, e) => (n < e && t.push(e - 1), n > e && t.push(e), t),
                  []
                ))
            })
        }
        _getItemIdBeforeAdding(t) {
          const e = this._idProperty
          let n
          if (e in t) {
            if (((n = t[e]), 'string' != typeof n)) throw new c('collection-add-invalid-id', this)
            if (this.get(n)) throw new c('collection-add-item-already-exists', this)
          } else t[e] = n = o()
          return n
        }
        _remove(t) {
          let e,
            n,
            i,
            s = !1
          const o = this._idProperty
          if (
            ('string' == typeof t
              ? ((n = t), (i = this._itemMap.get(n)), (s = !i), i && (e = this._items.indexOf(i)))
              : 'number' == typeof t
              ? ((e = t), (i = this._items[e]), (s = !i), i && (n = i[o]))
              : ((i = t), (n = i[o]), (e = this._items.indexOf(i)), (s = -1 == e || !this._itemMap.get(n))),
            s)
          )
            throw new c('collection-remove-404', this)
          this._items.splice(e, 1), this._itemMap.delete(n)
          const r = this._bindToInternalToExternalMap.get(i)
          return (
            this._bindToInternalToExternalMap.delete(i),
            this._bindToExternalToInternalMap.delete(r),
            this.fire('remove', i, e),
            [i, e]
          )
        }
        [Symbol.iterator]() {
          return this._items[Symbol.iterator]()
        }
      }
      he(Ci, p)
      class Ei {
        constructor(t, e = [], n = []) {
          ;(this._context = t), (this._plugins = new Map()), (this._availablePlugins = new Map())
          for (const t of e) t.pluginName && this._availablePlugins.set(t.pluginName, t)
          this._contextPlugins = new Map()
          for (const [t, e] of n)
            this._contextPlugins.set(t, e),
              this._contextPlugins.set(e, t),
              t.pluginName && this._availablePlugins.set(t.pluginName, t)
        }
        *[Symbol.iterator]() {
          for (const t of this._plugins) 'function' == typeof t[0] && (yield t)
        }
        get(t) {
          const e = this._plugins.get(t)
          if (!e) {
            let e = t
            throw (
              ('function' == typeof t && (e = t.pluginName || t.name),
              new c('plugincollection-plugin-not-loaded', this._context, { plugin: e }))
            )
          }
          return e
        }
        has(t) {
          return this._plugins.has(t)
        }
        init(t, e = [], n = []) {
          const i = this,
            s = this._context
          !(function t(e, n = new Set()) {
            e.forEach(e => {
              a(e) &&
                (n.has(e) ||
                  (n.add(e),
                  e.pluginName && !i._availablePlugins.has(e.pluginName) && i._availablePlugins.set(e.pluginName, e),
                  e.requires && t(e.requires, n)))
            })
          })(t),
            u(t)
          const o = [
            ...(function t(e, n = new Set()) {
              return e
                .map(t => (a(t) ? t : i._availablePlugins.get(t)))
                .reduce(
                  (e, i) =>
                    n.has(i)
                      ? e
                      : (n.add(i), i.requires && (u(i.requires, i), t(i.requires, n).forEach(t => e.add(t))), e.add(i)),
                  new Set()
                )
            })(t.filter(t => !h(t, e))),
          ]
          !(function (t, e) {
            for (const n of e) {
              if ('function' != typeof n)
                throw new c('plugincollection-replace-plugin-invalid-type', null, { pluginItem: n })
              const e = n.pluginName
              if (!e) throw new c('plugincollection-replace-plugin-missing-name', null, { pluginItem: n })
              if (n.requires && n.requires.length)
                throw new c('plugincollection-plugin-for-replacing-cannot-have-dependencies', null, { pluginName: e })
              const s = i._availablePlugins.get(e)
              if (!s) throw new c('plugincollection-plugin-for-replacing-not-exist', null, { pluginName: e })
              const o = t.indexOf(s)
              if (-1 === o) {
                if (i._contextPlugins.has(s)) return
                throw new c('plugincollection-plugin-for-replacing-not-loaded', null, { pluginName: e })
              }
              if (s.requires && s.requires.length)
                throw new c('plugincollection-replaced-plugin-cannot-have-dependencies', null, { pluginName: e })
              t.splice(o, 1, n), i._availablePlugins.set(e, n)
            }
          })(o, n)
          const r = (function (t) {
            return t.map(t => {
              const e = i._contextPlugins.get(t) || new t(s)
              return i._add(t, e), e
            })
          })(o)
          return f(r, 'init')
            .then(() => f(r, 'afterInit'))
            .then(() => r)
          function a(t) {
            return 'function' == typeof t
          }
          function l(t) {
            return a(t) && t.isContextPlugin
          }
          function h(t, e) {
            return e.some(e => e === t || d(t) === e || d(e) === t)
          }
          function d(t) {
            return a(t) ? t.pluginName || t.name : t
          }
          function u(t, n = null) {
            t.map(t => (a(t) ? t : i._availablePlugins.get(t) || t)).forEach(t => {
              !(function (t, e) {
                if (a(t)) return
                if (e) throw new c('plugincollection-soft-required', s, { missingPlugin: t, requiredBy: d(e) })
                throw new c('plugincollection-plugin-not-found', s, { plugin: t })
              })(t, n),
                (function (t, e) {
                  if (!l(e)) return
                  if (l(t)) return
                  throw new c('plugincollection-context-required', s, { plugin: d(t), requiredBy: d(e) })
                })(t, n),
                (function (t, n) {
                  if (!n) return
                  if (!h(t, e)) return
                  throw new c('plugincollection-required', s, { plugin: d(t), requiredBy: d(n) })
                })(t, n)
            })
          }
          function f(t, e) {
            return t.reduce(
              (t, n) => (n[e] ? (i._contextPlugins.has(n) ? t : t.then(n[e].bind(n))) : t),
              Promise.resolve()
            )
          }
        }
        destroy() {
          const t = []
          for (const [, e] of this) 'function' != typeof e.destroy || this._contextPlugins.has(e) || t.push(e.destroy())
          return Promise.all(t)
        }
        _add(t, e) {
          this._plugins.set(t, e)
          const n = t.pluginName
          if (n) {
            if (this._plugins.has(n))
              throw new c('plugincollection-plugin-name-conflict', null, {
                pluginName: n,
                plugin1: this._plugins.get(n).constructor,
                plugin2: t,
              })
            this._plugins.set(n, e)
          }
        }
      }
      function Si(t) {
        return Array.isArray(t) ? t : [t]
      }
      function xi(t, e, n = 1) {
        if ('number' != typeof n) throw new c('translation-service-quantity-not-a-number', null, { quantity: n })
        const i = Object.keys(window.CKEDITOR_TRANSLATIONS).length
        1 === i && (t = Object.keys(window.CKEDITOR_TRANSLATIONS)[0])
        const s = e.id || e.string
        if (
          0 === i ||
          !(function (t, e) {
            return !!window.CKEDITOR_TRANSLATIONS[t] && !!window.CKEDITOR_TRANSLATIONS[t].dictionary[e]
          })(t, s)
        )
          return 1 !== n ? e.plural : e.string
        const o = window.CKEDITOR_TRANSLATIONS[t].dictionary,
          r = window.CKEDITOR_TRANSLATIONS[t].getPluralForm || (t => (1 === t ? 0 : 1))
        if ('string' == typeof o[s]) return o[s]
        const a = Number(r(n))
        return o[s][a]
      }
      he(Ei, p), window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {})
      const Ti = ['ar', 'ara', 'fa', 'per', 'fas', 'he', 'heb', 'ku', 'kur', 'ug', 'uig']
      function Ri(t) {
        return Ti.includes(t) ? 'rtl' : 'ltr'
      }
      class Oi {
        constructor(t = {}) {
          ;(this.uiLanguage = t.uiLanguage || 'en'),
            (this.contentLanguage = t.contentLanguage || this.uiLanguage),
            (this.uiLanguageDirection = Ri(this.uiLanguage)),
            (this.contentLanguageDirection = Ri(this.contentLanguage)),
            (this.t = (t, e) => this._t(t, e))
        }
        get language() {
          return (
            console.warn(
              'locale-deprecated-language-property: The Locale#language property has been deprecated and will be removed in the near future. Please use #uiLanguage and #contentLanguage properties instead.'
            ),
            this.uiLanguage
          )
        }
        _t(t, e = []) {
          ;(e = Si(e)), 'string' == typeof t && (t = { string: t })
          const n = !!t.plural ? e[0] : 1
          return (function (t, e) {
            return t.replace(/%(\d+)/g, (t, n) => (n < e.length ? e[n] : t))
          })(xi(this.uiLanguage, t, n), e)
        }
      }
      class Ii {
        constructor(t) {
          this.config = new vi(t, this.constructor.defaultConfig)
          const e = this.constructor.builtinPlugins
          this.config.define('plugins', e), (this.plugins = new Ei(this, e))
          const n = this.config.get('language') || {}
          ;(this.locale = new Oi({
            uiLanguage: 'string' == typeof n ? n : n.ui,
            contentLanguage: this.config.get('language.content'),
          })),
            (this.t = this.locale.t),
            (this.editors = new Ci()),
            (this._contextOwner = null)
        }
        initPlugins() {
          const t = this.config.get('plugins') || [],
            e = this.config.get('substitutePlugins') || []
          for (const n of t.concat(e)) {
            if ('function' != typeof n) throw new c('context-initplugins-constructor-only', null, { Plugin: n })
            if (!0 !== n.isContextPlugin) throw new c('context-initplugins-invalid-plugin', null, { Plugin: n })
          }
          return this.plugins.init(t, [], e)
        }
        destroy() {
          return Promise.all(Array.from(this.editors, t => t.destroy())).then(() => this.plugins.destroy())
        }
        _addEditor(t, e) {
          if (this._contextOwner) throw new c('context-addeditor-private-context')
          this.editors.add(t), e && (this._contextOwner = t)
        }
        _removeEditor(t) {
          return (
            this.editors.has(t) && this.editors.remove(t), this._contextOwner === t ? this.destroy() : Promise.resolve()
          )
        }
        _getEditorConfig() {
          const t = {}
          for (const e of this.config.names())
            ['plugins', 'removePlugins', 'extraPlugins'].includes(e) || (t[e] = this.config.get(e))
          return t
        }
        static create(t) {
          return new Promise(e => {
            const n = new this(t)
            e(n.initPlugins().then(() => n))
          })
        }
      }
      class Mi {
        constructor(t) {
          this.context = t
        }
        destroy() {
          this.stopListening()
        }
        static get isContextPlugin() {
          return !0
        }
      }
      function Ni(t, e) {
        const n = Math.min(t.length, e.length)
        for (let i = 0; i < n; i++) if (t[i] != e[i]) return i
        return t.length == e.length ? 'same' : t.length < e.length ? 'prefix' : 'extension'
      }
      he(Mi, se)
      const Di = function (t) {
        return wi(t, 4)
      }
      class Fi {
        constructor(t) {
          ;(this.document = t), (this.parent = null)
        }
        get index() {
          let t
          if (!this.parent) return null
          if (-1 == (t = this.parent.getChildIndex(this))) throw new c('view-node-not-found-in-parent', this)
          return t
        }
        get nextSibling() {
          const t = this.index
          return (null !== t && this.parent.getChild(t + 1)) || null
        }
        get previousSibling() {
          const t = this.index
          return (null !== t && this.parent.getChild(t - 1)) || null
        }
        get root() {
          let t = this
          for (; t.parent; ) t = t.parent
          return t
        }
        isAttached() {
          return this.root.is('rootElement')
        }
        getPath() {
          const t = []
          let e = this
          for (; e.parent; ) t.unshift(e.index), (e = e.parent)
          return t
        }
        getAncestors(t = { includeSelf: !1, parentFirst: !1 }) {
          const e = []
          let n = t.includeSelf ? this : this.parent
          for (; n; ) e[t.parentFirst ? 'push' : 'unshift'](n), (n = n.parent)
          return e
        }
        getCommonAncestor(t, e = {}) {
          const n = this.getAncestors(e),
            i = t.getAncestors(e)
          let s = 0
          for (; n[s] == i[s] && n[s]; ) s++
          return 0 === s ? null : n[s - 1]
        }
        isBefore(t) {
          if (this == t) return !1
          if (this.root !== t.root) return !1
          const e = this.getPath(),
            n = t.getPath(),
            i = Ni(e, n)
          switch (i) {
            case 'prefix':
              return !0
            case 'extension':
              return !1
            default:
              return e[i] < n[i]
          }
        }
        isAfter(t) {
          return this != t && this.root === t.root && !this.isBefore(t)
        }
        _remove() {
          this.parent._removeChildren(this.index)
        }
        _fireChange(t, e) {
          this.fire('change:' + t, e), this.parent && this.parent._fireChange(t, e)
        }
        toJSON() {
          const t = Di(this)
          return delete t.parent, t
        }
        is(t) {
          return 'node' === t || 'view:node' === t
        }
      }
      he(Fi, p)
      class Bi extends Fi {
        constructor(t, e) {
          super(t), (this._textData = e)
        }
        is(t) {
          return (
            '$text' === t ||
            'view:$text' === t ||
            'text' === t ||
            'view:text' === t ||
            'node' === t ||
            'view:node' === t
          )
        }
        get data() {
          return this._textData
        }
        get _data() {
          return this.data
        }
        set _data(t) {
          this._fireChange('text', this), (this._textData = t)
        }
        isSimilar(t) {
          return t instanceof Bi && (this === t || this.data === t.data)
        }
        _clone() {
          return new Bi(this.document, this.data)
        }
      }
      class Vi {
        constructor(t, e, n) {
          if (((this.textNode = t), e < 0 || e > t.data.length)) throw new c('view-textproxy-wrong-offsetintext', this)
          if (n < 0 || e + n > t.data.length) throw new c('view-textproxy-wrong-length', this)
          ;(this.data = t.data.substring(e, e + n)), (this.offsetInText = e)
        }
        get offsetSize() {
          return this.data.length
        }
        get isPartial() {
          return this.data.length !== this.textNode.data.length
        }
        get parent() {
          return this.textNode.parent
        }
        get root() {
          return this.textNode.root
        }
        get document() {
          return this.textNode.document
        }
        is(t) {
          return '$textProxy' === t || 'view:$textProxy' === t || 'textProxy' === t || 'view:textProxy' === t
        }
        getAncestors(t = { includeSelf: !1, parentFirst: !1 }) {
          const e = []
          let n = t.includeSelf ? this.textNode : this.parent
          for (; null !== n; ) e[t.parentFirst ? 'push' : 'unshift'](n), (n = n.parent)
          return e
        }
      }
      function Li(t) {
        return Ai(t)
          ? new Map(t)
          : (function (t) {
              const e = new Map()
              for (const n in t) e.set(n, t[n])
              return e
            })(t)
      }
      class ji {
        constructor(...t) {
          ;(this._patterns = []), this.add(...t)
        }
        add(...t) {
          for (let e of t) ('string' == typeof e || e instanceof RegExp) && (e = { name: e }), this._patterns.push(e)
        }
        match(...t) {
          for (const e of t)
            for (const t of this._patterns) {
              const n = Wi(e, t)
              if (n) return { element: e, pattern: t, match: n }
            }
          return null
        }
        matchAll(...t) {
          const e = []
          for (const n of t)
            for (const t of this._patterns) {
              const i = Wi(n, t)
              i && e.push({ element: n, pattern: t, match: i })
            }
          return e.length > 0 ? e : null
        }
        getElementName() {
          if (1 !== this._patterns.length) return null
          const t = this._patterns[0],
            e = t.name
          return 'function' == typeof t || !e || e instanceof RegExp ? null : e
        }
      }
      function Wi(t, e) {
        if ('function' == typeof e) return e(t)
        const n = {}
        return (e.name &&
          ((n.name = (function (t, e) {
            if (t instanceof RegExp) return !!e.match(t)
            return t === e
          })(e.name, t.name)),
          !n.name)) ||
          (e.attributes &&
            ((n.attributes = (function (t, e) {
              const n = new Set(e.getAttributeKeys())
              Pe(t)
                ? (void 0 !== t.style && l('matcher-pattern-deprecated-attributes-style-key', t),
                  void 0 !== t.class && l('matcher-pattern-deprecated-attributes-class-key', t))
                : (n.delete('style'), n.delete('class'))
              return zi(t, n, t => e.getAttribute(t))
            })(e.attributes, t)),
            !n.attributes))
          ? null
          : !(
              e.classes &&
              ((n.classes = (function (t, e) {
                return zi(t, e.getClassNames())
              })(e.classes, t)),
              !n.classes)
            ) &&
              !(
                e.styles &&
                ((n.styles = (function (t, e) {
                  return zi(t, e.getStyleNames(!0), t => e.getStyle(t))
                })(e.styles, t)),
                !n.styles)
              ) &&
              n
      }
      function zi(t, e, n) {
        const i = (function (t) {
            if (Array.isArray(t))
              return t.map(t =>
                Pe(t)
                  ? ((void 0 !== t.key && void 0 !== t.value) || l('matcher-pattern-missing-key-or-value', t),
                    [t.key, t.value])
                  : [t, !0]
              )
            if (Pe(t)) return Object.entries(t)
            return [[t, !0]]
          })(t),
          s = Array.from(e),
          o = []
        return (
          i.forEach(([t, e]) => {
            s.forEach(i => {
              ;(function (t, e) {
                return !0 === t || t === e || (t instanceof RegExp && e.match(t))
              })(t, i) &&
                (function (t, e, n) {
                  if (!0 === t) return !0
                  const i = n(e)
                  return t === i || (t instanceof RegExp && !!String(i).match(t))
                })(e, i, n) &&
                o.push(i)
            })
          }),
          !i.length || o.length < i.length ? null : o
        )
      }
      const $i = function (t) {
        return 'symbol' == typeof t || (Pt(t) && '[object Symbol]' == B(t))
      }
      var qi = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        Ui = /^\w*$/
      const Hi = function (t, e) {
        if (xt(t)) return !1
        var n = typeof t
        return (
          !('number' != n && 'symbol' != n && 'boolean' != n && null != t && !$i(t)) ||
          Ui.test(t) ||
          !qi.test(t) ||
          (null != e && t in Object(e))
        )
      }
      function Ki(t, e) {
        if ('function' != typeof t || (null != e && 'function' != typeof e)) throw new TypeError('Expected a function')
        var n = function () {
          var i = arguments,
            s = e ? e.apply(this, i) : i[0],
            o = n.cache
          if (o.has(s)) return o.get(s)
          var r = t.apply(this, i)
          return (n.cache = o.set(s, r) || o), r
        }
        return (n.cache = new (Ki.Cache || en)()), n
      }
      Ki.Cache = en
      const Gi = Ki
      var Ji = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        Yi = /\\(\\)?/g,
        Xi = (function (t) {
          var e = Gi(t, function (t) {
              return 500 === n.size && n.clear(), t
            }),
            n = e.cache
          return e
        })(function (t) {
          var e = []
          return (
            46 === t.charCodeAt(0) && e.push(''),
            t.replace(Ji, function (t, n, i, s) {
              e.push(i ? s.replace(Yi, '$1') : n || t)
            }),
            e
          )
        })
      const Zi = Xi
      const Qi = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length, s = Array(i); ++n < i; ) s[n] = e(t[n], n, t)
        return s
      }
      var ts = x ? x.prototype : void 0,
        es = ts ? ts.toString : void 0
      const ns = function t(e) {
        if ('string' == typeof e) return e
        if (xt(e)) return Qi(e, t) + ''
        if ($i(e)) return es ? es.call(e) : ''
        var n = e + ''
        return '0' == n && 1 / e == -Infinity ? '-0' : n
      }
      const is = function (t) {
        return null == t ? '' : ns(t)
      }
      const ss = function (t, e) {
        return xt(t) ? t : Hi(t, e) ? [t] : Zi(is(t))
      }
      const os = function (t) {
        var e = null == t ? 0 : t.length
        return e ? t[e - 1] : void 0
      }
      const rs = function (t) {
        if ('string' == typeof t || $i(t)) return t
        var e = t + ''
        return '0' == e && 1 / t == -Infinity ? '-0' : e
      }
      const as = function (t, e) {
        for (var n = 0, i = (e = ss(e, t)).length; null != t && n < i; ) t = t[rs(e[n++])]
        return n && n == i ? t : void 0
      }
      const cs = function (t, e, n) {
        var i = -1,
          s = t.length
        e < 0 && (e = -e > s ? 0 : s + e),
          (n = n > s ? s : n) < 0 && (n += s),
          (s = e > n ? 0 : (n - e) >>> 0),
          (e >>>= 0)
        for (var o = Array(s); ++i < s; ) o[i] = t[i + e]
        return o
      }
      const ls = function (t, e) {
        return e.length < 2 ? t : as(t, cs(e, 0, -1))
      }
      const hs = function (t, e) {
        return (e = ss(e, t)), null == (t = ls(t, e)) || delete t[rs(os(e))]
      }
      const ds = function (t, e) {
        return null == t || hs(t, e)
      }
      const us = function (t, e, n) {
        var i = null == t ? void 0 : as(t, e)
        return void 0 === i ? n : i
      }
      const fs = function (t, e, n) {
        ;((void 0 !== n && !et(t[e], n)) || (void 0 === n && !(e in t))) && tt(t, e, n)
      }
      const ms = (function (t) {
        return function (e, n, i) {
          for (var s = -1, o = Object(e), r = i(e), a = r.length; a--; ) {
            var c = r[t ? a : ++s]
            if (!1 === n(o[c], c, o)) break
          }
          return e
        }
      })()
      const gs = function (t) {
        return Pt(t) && pt(t)
      }
      const ps = function (t, e) {
        if (('constructor' !== e || 'function' != typeof t[e]) && '__proto__' != e) return t[e]
      }
      const _s = function (t) {
        return st(t, Yt(t))
      }
      const ws = function (t, e, n, i, s, o, r) {
        var a = ps(t, n),
          c = ps(e, n),
          l = r.get(c)
        if (l) fs(t, n, l)
        else {
          var h = o ? o(a, c, n + '', t, e, r) : void 0,
            d = void 0 === h
          if (d) {
            var u = xt(c),
              f = !u && Mt(c),
              m = !u && !f && zt(c)
            ;(h = c),
              u || f || m
                ? xt(a)
                  ? (h = a)
                  : gs(a)
                  ? (h = wn(a))
                  : f
                  ? ((d = !1), (h = _n(c, !0)))
                  : m
                  ? ((d = !1), (h = ii(c, !0)))
                  : (h = [])
                : Pe(c) || St(c)
                ? ((h = a), St(a) ? (h = _s(a)) : (A(a) && !V(a)) || (h = ai(c)))
                : (d = !1)
          }
          d && (r.set(c, h), s(h, c, i, o, r), r.delete(c)), fs(t, n, h)
        }
      }
      const bs = function t(e, n, i, s, o) {
        e !== n &&
          ms(
            n,
            function (r, a) {
              if ((o || (o = new on()), A(r))) ws(e, n, a, i, t, s, o)
              else {
                var c = s ? s(ps(e, a), r, a + '', e, n, o) : void 0
                void 0 === c && (c = r), fs(e, a, c)
              }
            },
            Yt
          )
      }
      const ys = yt(function (t, e, n) {
        bs(t, e, n)
      })
      const vs = function (t, e, n, i) {
        if (!A(t)) return t
        for (var s = -1, o = (e = ss(e, t)).length, r = o - 1, a = t; null != a && ++s < o; ) {
          var c = rs(e[s]),
            l = n
          if ('__proto__' === c || 'constructor' === c || 'prototype' === c) return t
          if (s != r) {
            var h = a[c]
            void 0 === (l = i ? i(h, c, a) : void 0) && (l = A(h) ? h : wt(e[s + 1]) ? [] : {})
          }
          it(a, c, l), (a = a[c])
        }
        return t
      }
      const Ps = function (t, e, n) {
        return null == t ? t : vs(t, e, n)
      }
      class ks {
        constructor(t) {
          ;(this._styles = {}), (this._styleProcessor = t)
        }
        get isEmpty() {
          const t = Object.entries(this._styles)
          return !Array.from(t).length
        }
        get size() {
          return this.isEmpty ? 0 : this.getStyleNames().length
        }
        setTo(t) {
          this.clear()
          const e = Array.from(
            (function (t) {
              let e = null,
                n = 0,
                i = 0,
                s = null
              const o = new Map()
              if ('' === t) return o
              ';' != t.charAt(t.length - 1) && (t += ';')
              for (let r = 0; r < t.length; r++) {
                const a = t.charAt(r)
                if (null === e)
                  switch (a) {
                    case ':':
                      s || ((s = t.substr(n, r - n)), (i = r + 1))
                      break
                    case '"':
                    case "'":
                      e = a
                      break
                    case ';': {
                      const e = t.substr(i, r - i)
                      s && o.set(s.trim(), e.trim()), (s = null), (n = r + 1)
                      break
                    }
                  }
                else a === e && (e = null)
              }
              return o
            })(t).entries()
          )
          for (const [t, n] of e) this._styleProcessor.toNormalizedForm(t, n, this._styles)
        }
        has(t) {
          if (this.isEmpty) return !1
          const e = this._styleProcessor.getReducedForm(t, this._styles).find(([e]) => e === t)
          return Array.isArray(e)
        }
        set(t, e) {
          if (A(t)) for (const [e, n] of Object.entries(t)) this._styleProcessor.toNormalizedForm(e, n, this._styles)
          else this._styleProcessor.toNormalizedForm(t, e, this._styles)
        }
        remove(t) {
          const e = Cs(t)
          ds(this._styles, e), delete this._styles[t], this._cleanEmptyObjectsOnPath(e)
        }
        getNormalized(t) {
          return this._styleProcessor.getNormalized(t, this._styles)
        }
        toString() {
          return this.isEmpty
            ? ''
            : this._getStylesEntries()
                .map(t => t.join(':'))
                .sort()
                .join(';') + ';'
        }
        getAsString(t) {
          if (this.isEmpty) return
          if (this._styles[t] && !A(this._styles[t])) return this._styles[t]
          const e = this._styleProcessor.getReducedForm(t, this._styles).find(([e]) => e === t)
          return Array.isArray(e) ? e[1] : void 0
        }
        getStyleNames(t = !1) {
          if (this.isEmpty) return []
          if (t) return this._styleProcessor.getStyleNames(this._styles)
          return this._getStylesEntries().map(([t]) => t)
        }
        clear() {
          this._styles = {}
        }
        _getStylesEntries() {
          const t = [],
            e = Object.keys(this._styles)
          for (const n of e) t.push(...this._styleProcessor.getReducedForm(n, this._styles))
          return t
        }
        _cleanEmptyObjectsOnPath(t) {
          const e = t.split('.')
          if (!(e.length > 1)) return
          const n = e.splice(0, e.length - 1).join('.'),
            i = us(this._styles, n)
          if (!i) return
          !Array.from(Object.keys(i)).length && this.remove(n)
        }
      }
      class As {
        constructor() {
          ;(this._normalizers = new Map()),
            (this._extractors = new Map()),
            (this._reducers = new Map()),
            (this._consumables = new Map())
        }
        toNormalizedForm(t, e, n) {
          if (A(e)) Es(n, Cs(t), e)
          else if (this._normalizers.has(t)) {
            const i = this._normalizers.get(t),
              { path: s, value: o } = i(e)
            Es(n, s, o)
          } else Es(n, t, e)
        }
        getNormalized(t, e) {
          if (!t) return ys({}, e)
          if (void 0 !== e[t]) return e[t]
          if (this._extractors.has(t)) {
            const n = this._extractors.get(t)
            if ('string' == typeof n) return us(e, n)
            const i = n(t, e)
            if (i) return i
          }
          return us(e, Cs(t))
        }
        getReducedForm(t, e) {
          const n = this.getNormalized(t, e)
          if (void 0 === n) return []
          if (this._reducers.has(t)) {
            return this._reducers.get(t)(n)
          }
          return [[t, n]]
        }
        getStyleNames(t) {
          const e = Array.from(this._consumables.keys()).filter(e => {
              const n = this.getNormalized(e, t)
              return n && 'object' == typeof n ? Object.keys(n).length : n
            }),
            n = new Set([...e, ...Object.keys(t)])
          return Array.from(n.values())
        }
        getRelatedStyles(t) {
          return this._consumables.get(t) || []
        }
        setNormalizer(t, e) {
          this._normalizers.set(t, e)
        }
        setExtractor(t, e) {
          this._extractors.set(t, e)
        }
        setReducer(t, e) {
          this._reducers.set(t, e)
        }
        setStyleRelation(t, e) {
          this._mapStyleNames(t, e)
          for (const n of e) this._mapStyleNames(n, [t])
        }
        _mapStyleNames(t, e) {
          this._consumables.has(t) || this._consumables.set(t, []), this._consumables.get(t).push(...e)
        }
      }
      function Cs(t) {
        return t.replace('-', '.')
      }
      function Es(t, e, n) {
        let i = n
        A(n) && (i = ys({}, us(t, e), n)), Ps(t, e, i)
      }
      class Ss extends Fi {
        constructor(t, e, n, i) {
          if (
            (super(t),
            (this.name = e),
            (this._attrs = (function (t) {
              t = Li(t)
              for (const [e, n] of t) null === n ? t.delete(e) : 'string' != typeof n && t.set(e, String(n))
              return t
            })(n)),
            (this._children = []),
            i && this._insertChild(0, i),
            (this._classes = new Set()),
            this._attrs.has('class'))
          ) {
            const t = this._attrs.get('class')
            xs(this._classes, t), this._attrs.delete('class')
          }
          ;(this._styles = new ks(this.document.stylesProcessor)),
            this._attrs.has('style') && (this._styles.setTo(this._attrs.get('style')), this._attrs.delete('style')),
            (this._customProperties = new Map()),
            (this._unsafeAttributesToRender = [])
        }
        get childCount() {
          return this._children.length
        }
        get isEmpty() {
          return 0 === this._children.length
        }
        is(t, e = null) {
          return e
            ? e === this.name && ('element' === t || 'view:element' === t)
            : 'element' === t || 'view:element' === t || 'node' === t || 'view:node' === t
        }
        getChild(t) {
          return this._children[t]
        }
        getChildIndex(t) {
          return this._children.indexOf(t)
        }
        getChildren() {
          return this._children[Symbol.iterator]()
        }
        *getAttributeKeys() {
          this._classes.size > 0 && (yield 'class'), this._styles.isEmpty || (yield 'style'), yield* this._attrs.keys()
        }
        *getAttributes() {
          yield* this._attrs.entries(),
            this._classes.size > 0 && (yield ['class', this.getAttribute('class')]),
            this._styles.isEmpty || (yield ['style', this.getAttribute('style')])
        }
        getAttribute(t) {
          if ('class' == t) return this._classes.size > 0 ? [...this._classes].join(' ') : void 0
          if ('style' == t) {
            const t = this._styles.toString()
            return '' == t ? void 0 : t
          }
          return this._attrs.get(t)
        }
        hasAttribute(t) {
          return 'class' == t ? this._classes.size > 0 : 'style' == t ? !this._styles.isEmpty : this._attrs.has(t)
        }
        isSimilar(t) {
          if (!(t instanceof Ss)) return !1
          if (this === t) return !0
          if (this.name != t.name) return !1
          if (
            this._attrs.size !== t._attrs.size ||
            this._classes.size !== t._classes.size ||
            this._styles.size !== t._styles.size
          )
            return !1
          for (const [e, n] of this._attrs) if (!t._attrs.has(e) || t._attrs.get(e) !== n) return !1
          for (const e of this._classes) if (!t._classes.has(e)) return !1
          for (const e of this._styles.getStyleNames())
            if (!t._styles.has(e) || t._styles.getAsString(e) !== this._styles.getAsString(e)) return !1
          return !0
        }
        hasClass(...t) {
          for (const e of t) if (!this._classes.has(e)) return !1
          return !0
        }
        getClassNames() {
          return this._classes.keys()
        }
        getStyle(t) {
          return this._styles.getAsString(t)
        }
        getNormalizedStyle(t) {
          return this._styles.getNormalized(t)
        }
        getStyleNames(t = !1) {
          return this._styles.getStyleNames(t)
        }
        hasStyle(...t) {
          for (const e of t) if (!this._styles.has(e)) return !1
          return !0
        }
        findAncestor(...t) {
          const e = new ji(...t)
          let n = this.parent
          for (; n; ) {
            if (e.match(n)) return n
            n = n.parent
          }
          return null
        }
        getCustomProperty(t) {
          return this._customProperties.get(t)
        }
        *getCustomProperties() {
          yield* this._customProperties.entries()
        }
        getIdentity() {
          const t = Array.from(this._classes).sort().join(','),
            e = this._styles.toString(),
            n = Array.from(this._attrs)
              .map(t => `${t[0]}="${t[1]}"`)
              .sort()
              .join(' ')
          return this.name + ('' == t ? '' : ` class="${t}"`) + (e ? ` style="${e}"` : '') + ('' == n ? '' : ` ${n}`)
        }
        shouldRenderUnsafeAttribute(t) {
          return this._unsafeAttributesToRender.includes(t)
        }
        _clone(t = !1) {
          const e = []
          if (t) for (const n of this.getChildren()) e.push(n._clone(t))
          const n = new this.constructor(this.document, this.name, this._attrs, e)
          return (
            (n._classes = new Set(this._classes)),
            n._styles.set(this._styles.getNormalized()),
            (n._customProperties = new Map(this._customProperties)),
            (n.getFillerOffset = this.getFillerOffset),
            n
          )
        }
        _appendChild(t) {
          return this._insertChild(this.childCount, t)
        }
        _insertChild(t, e) {
          this._fireChange('children', this)
          let n = 0
          const i = (function (t, e) {
            if ('string' == typeof e) return [new Bi(t, e)]
            Ai(e) || (e = [e])
            return Array.from(e).map(e =>
              'string' == typeof e ? new Bi(t, e) : e instanceof Vi ? new Bi(t, e.data) : e
            )
          })(this.document, e)
          for (const e of i)
            null !== e.parent && e._remove(),
              (e.parent = this),
              (e.document = this.document),
              this._children.splice(t, 0, e),
              t++,
              n++
          return n
        }
        _removeChildren(t, e = 1) {
          this._fireChange('children', this)
          for (let n = t; n < t + e; n++) this._children[n].parent = null
          return this._children.splice(t, e)
        }
        _setAttribute(t, e) {
          ;(e = String(e)),
            this._fireChange('attributes', this),
            'class' == t ? xs(this._classes, e) : 'style' == t ? this._styles.setTo(e) : this._attrs.set(t, e)
        }
        _removeAttribute(t) {
          return (
            this._fireChange('attributes', this),
            'class' == t
              ? this._classes.size > 0 && (this._classes.clear(), !0)
              : 'style' == t
              ? !this._styles.isEmpty && (this._styles.clear(), !0)
              : this._attrs.delete(t)
          )
        }
        _addClass(t) {
          this._fireChange('attributes', this)
          for (const e of Si(t)) this._classes.add(e)
        }
        _removeClass(t) {
          this._fireChange('attributes', this)
          for (const e of Si(t)) this._classes.delete(e)
        }
        _setStyle(t, e) {
          this._fireChange('attributes', this), this._styles.set(t, e)
        }
        _removeStyle(t) {
          this._fireChange('attributes', this)
          for (const e of Si(t)) this._styles.remove(e)
        }
        _setCustomProperty(t, e) {
          this._customProperties.set(t, e)
        }
        _removeCustomProperty(t) {
          return this._customProperties.delete(t)
        }
      }
      function xs(t, e) {
        const n = e.split(/\s+/)
        t.clear(), n.forEach(e => t.add(e))
      }
      class Ts extends Ss {
        constructor(t, e, n, i) {
          super(t, e, n, i), (this.getFillerOffset = Rs)
        }
        is(t, e = null) {
          return e
            ? e === this.name &&
                ('containerElement' === t || 'view:containerElement' === t || 'element' === t || 'view:element' === t)
            : 'containerElement' === t ||
                'view:containerElement' === t ||
                'element' === t ||
                'view:element' === t ||
                'node' === t ||
                'view:node' === t
        }
      }
      function Rs() {
        const t = [...this.getChildren()],
          e = t[this.childCount - 1]
        if (e && e.is('element', 'br')) return this.childCount
        for (const e of t) if (!e.is('uiElement')) return null
        return this.childCount
      }
      class Os extends Ts {
        constructor(t, e, n, i) {
          super(t, e, n, i),
            this.set('isReadOnly', !1),
            this.set('isFocused', !1),
            this.bind('isReadOnly').to(t),
            this.bind('isFocused').to(t, 'isFocused', e => e && t.selection.editableElement == this),
            this.listenTo(t.selection, 'change', () => {
              this.isFocused = t.isFocused && t.selection.editableElement == this
            })
        }
        is(t, e = null) {
          return e
            ? e === this.name &&
                ('editableElement' === t ||
                  'view:editableElement' === t ||
                  'containerElement' === t ||
                  'view:containerElement' === t ||
                  'element' === t ||
                  'view:element' === t)
            : 'editableElement' === t ||
                'view:editableElement' === t ||
                'containerElement' === t ||
                'view:containerElement' === t ||
                'element' === t ||
                'view:element' === t ||
                'node' === t ||
                'view:node' === t
        }
        destroy() {
          this.stopListening()
        }
      }
      he(Os, se)
      const Is = Symbol('rootName')
      class Ms extends Os {
        constructor(t, e) {
          super(t, e), (this.rootName = 'main')
        }
        is(t, e = null) {
          return e
            ? e === this.name &&
                ('rootElement' === t ||
                  'view:rootElement' === t ||
                  'editableElement' === t ||
                  'view:editableElement' === t ||
                  'containerElement' === t ||
                  'view:containerElement' === t ||
                  'element' === t ||
                  'view:element' === t)
            : 'rootElement' === t ||
                'view:rootElement' === t ||
                'editableElement' === t ||
                'view:editableElement' === t ||
                'containerElement' === t ||
                'view:containerElement' === t ||
                'element' === t ||
                'view:element' === t ||
                'node' === t ||
                'view:node' === t
        }
        get rootName() {
          return this.getCustomProperty(Is)
        }
        set rootName(t) {
          this._setCustomProperty(Is, t)
        }
        set _name(t) {
          this.name = t
        }
      }
      class Ns {
        constructor(t = {}) {
          if (!t.boundaries && !t.startPosition) throw new c('view-tree-walker-no-start-position', null)
          if (t.direction && 'forward' != t.direction && 'backward' != t.direction)
            throw new c('view-tree-walker-unknown-direction', t.startPosition, { direction: t.direction })
          ;(this.boundaries = t.boundaries || null),
            t.startPosition
              ? (this.position = Ds._createAt(t.startPosition))
              : (this.position = Ds._createAt(t.boundaries['backward' == t.direction ? 'end' : 'start'])),
            (this.direction = t.direction || 'forward'),
            (this.singleCharacters = !!t.singleCharacters),
            (this.shallow = !!t.shallow),
            (this.ignoreElementEnd = !!t.ignoreElementEnd),
            (this._boundaryStartParent = this.boundaries ? this.boundaries.start.parent : null),
            (this._boundaryEndParent = this.boundaries ? this.boundaries.end.parent : null)
        }
        [Symbol.iterator]() {
          return this
        }
        skip(t) {
          let e, n, i
          do {
            ;(i = this.position), ({ done: e, value: n } = this.next())
          } while (!e && t(n))
          e || (this.position = i)
        }
        next() {
          return 'forward' == this.direction ? this._next() : this._previous()
        }
        _next() {
          let t = this.position.clone()
          const e = this.position,
            n = t.parent
          if (null === n.parent && t.offset === n.childCount) return { done: !0 }
          if (n === this._boundaryEndParent && t.offset == this.boundaries.end.offset) return { done: !0 }
          let i
          if (n instanceof Bi) {
            if (t.isAtEnd) return (this.position = Ds._createAfter(n)), this._next()
            i = n.data[t.offset]
          } else i = n.getChild(t.offset)
          if (i instanceof Ss)
            return (
              this.shallow ? t.offset++ : (t = new Ds(i, 0)),
              (this.position = t),
              this._formatReturnValue('elementStart', i, e, t, 1)
            )
          if (i instanceof Bi) {
            if (this.singleCharacters) return (t = new Ds(i, 0)), (this.position = t), this._next()
            {
              let n,
                s = i.data.length
              return (
                i == this._boundaryEndParent
                  ? ((s = this.boundaries.end.offset), (n = new Vi(i, 0, s)), (t = Ds._createAfter(n)))
                  : ((n = new Vi(i, 0, i.data.length)), t.offset++),
                (this.position = t),
                this._formatReturnValue('text', n, e, t, s)
              )
            }
          }
          if ('string' == typeof i) {
            let i
            if (this.singleCharacters) i = 1
            else {
              i = (n === this._boundaryEndParent ? this.boundaries.end.offset : n.data.length) - t.offset
            }
            const s = new Vi(n, t.offset, i)
            return (t.offset += i), (this.position = t), this._formatReturnValue('text', s, e, t, i)
          }
          return (
            (t = Ds._createAfter(n)),
            (this.position = t),
            this.ignoreElementEnd ? this._next() : this._formatReturnValue('elementEnd', n, e, t)
          )
        }
        _previous() {
          let t = this.position.clone()
          const e = this.position,
            n = t.parent
          if (null === n.parent && 0 === t.offset) return { done: !0 }
          if (n == this._boundaryStartParent && t.offset == this.boundaries.start.offset) return { done: !0 }
          let i
          if (n instanceof Bi) {
            if (t.isAtStart) return (this.position = Ds._createBefore(n)), this._previous()
            i = n.data[t.offset - 1]
          } else i = n.getChild(t.offset - 1)
          if (i instanceof Ss)
            return this.shallow
              ? (t.offset--, (this.position = t), this._formatReturnValue('elementStart', i, e, t, 1))
              : ((t = new Ds(i, i.childCount)),
                (this.position = t),
                this.ignoreElementEnd ? this._previous() : this._formatReturnValue('elementEnd', i, e, t))
          if (i instanceof Bi) {
            if (this.singleCharacters) return (t = new Ds(i, i.data.length)), (this.position = t), this._previous()
            {
              let n,
                s = i.data.length
              if (i == this._boundaryStartParent) {
                const e = this.boundaries.start.offset
                ;(n = new Vi(i, e, i.data.length - e)), (s = n.data.length), (t = Ds._createBefore(n))
              } else (n = new Vi(i, 0, i.data.length)), t.offset--
              return (this.position = t), this._formatReturnValue('text', n, e, t, s)
            }
          }
          if ('string' == typeof i) {
            let i
            if (this.singleCharacters) i = 1
            else {
              const e = n === this._boundaryStartParent ? this.boundaries.start.offset : 0
              i = t.offset - e
            }
            t.offset -= i
            const s = new Vi(n, t.offset, i)
            return (this.position = t), this._formatReturnValue('text', s, e, t, i)
          }
          return (t = Ds._createBefore(n)), (this.position = t), this._formatReturnValue('elementStart', n, e, t, 1)
        }
        _formatReturnValue(t, e, n, i, s) {
          return (
            e instanceof Vi &&
              (e.offsetInText + e.data.length == e.textNode.data.length &&
                ('forward' != this.direction || (this.boundaries && this.boundaries.end.isEqual(this.position))
                  ? (n = Ds._createAfter(e.textNode))
                  : ((i = Ds._createAfter(e.textNode)), (this.position = i))),
              0 === e.offsetInText &&
                ('backward' != this.direction || (this.boundaries && this.boundaries.start.isEqual(this.position))
                  ? (n = Ds._createBefore(e.textNode))
                  : ((i = Ds._createBefore(e.textNode)), (this.position = i)))),
            { done: !1, value: { type: t, item: e, previousPosition: n, nextPosition: i, length: s } }
          )
        }
      }
      class Ds {
        constructor(t, e) {
          ;(this.parent = t), (this.offset = e)
        }
        get nodeAfter() {
          return this.parent.is('$text') ? null : this.parent.getChild(this.offset) || null
        }
        get nodeBefore() {
          return this.parent.is('$text') ? null : this.parent.getChild(this.offset - 1) || null
        }
        get isAtStart() {
          return 0 === this.offset
        }
        get isAtEnd() {
          const t = this.parent.is('$text') ? this.parent.data.length : this.parent.childCount
          return this.offset === t
        }
        get root() {
          return this.parent.root
        }
        get editableElement() {
          let t = this.parent
          for (; !(t instanceof Os); ) {
            if (!t.parent) return null
            t = t.parent
          }
          return t
        }
        getShiftedBy(t) {
          const e = Ds._createAt(this),
            n = e.offset + t
          return (e.offset = n < 0 ? 0 : n), e
        }
        getLastMatchingPosition(t, e = {}) {
          e.startPosition = this
          const n = new Ns(e)
          return n.skip(t), n.position
        }
        getAncestors() {
          return this.parent.is('documentFragment') ? [this.parent] : this.parent.getAncestors({ includeSelf: !0 })
        }
        getCommonAncestor(t) {
          const e = this.getAncestors(),
            n = t.getAncestors()
          let i = 0
          for (; e[i] == n[i] && e[i]; ) i++
          return 0 === i ? null : e[i - 1]
        }
        is(t) {
          return 'position' === t || 'view:position' === t
        }
        isEqual(t) {
          return this.parent == t.parent && this.offset == t.offset
        }
        isBefore(t) {
          return 'before' == this.compareWith(t)
        }
        isAfter(t) {
          return 'after' == this.compareWith(t)
        }
        compareWith(t) {
          if (this.root !== t.root) return 'different'
          if (this.isEqual(t)) return 'same'
          const e = this.parent.is('node') ? this.parent.getPath() : [],
            n = t.parent.is('node') ? t.parent.getPath() : []
          e.push(this.offset), n.push(t.offset)
          const i = Ni(e, n)
          switch (i) {
            case 'prefix':
              return 'before'
            case 'extension':
              return 'after'
            default:
              return e[i] < n[i] ? 'before' : 'after'
          }
        }
        getWalker(t = {}) {
          return (t.startPosition = this), new Ns(t)
        }
        clone() {
          return new Ds(this.parent, this.offset)
        }
        static _createAt(t, e) {
          if (t instanceof Ds) return new this(t.parent, t.offset)
          {
            const n = t
            if ('end' == e) e = n.is('$text') ? n.data.length : n.childCount
            else {
              if ('before' == e) return this._createBefore(n)
              if ('after' == e) return this._createAfter(n)
              if (0 !== e && !e) throw new c('view-createpositionat-offset-required', n)
            }
            return new Ds(n, e)
          }
        }
        static _createAfter(t) {
          if (t.is('$textProxy')) return new Ds(t.textNode, t.offsetInText + t.data.length)
          if (!t.parent) throw new c('view-position-after-root', t, { root: t })
          return new Ds(t.parent, t.index + 1)
        }
        static _createBefore(t) {
          if (t.is('$textProxy')) return new Ds(t.textNode, t.offsetInText)
          if (!t.parent) throw new c('view-position-before-root', t, { root: t })
          return new Ds(t.parent, t.index)
        }
      }
      class Fs {
        constructor(t, e = null) {
          ;(this.start = t.clone()), (this.end = e ? e.clone() : t.clone())
        }
        *[Symbol.iterator]() {
          yield* new Ns({ boundaries: this, ignoreElementEnd: !0 })
        }
        get isCollapsed() {
          return this.start.isEqual(this.end)
        }
        get isFlat() {
          return this.start.parent === this.end.parent
        }
        get root() {
          return this.start.root
        }
        getEnlarged() {
          let t = this.start.getLastMatchingPosition(Bs, { direction: 'backward' }),
            e = this.end.getLastMatchingPosition(Bs)
          return (
            t.parent.is('$text') && t.isAtStart && (t = Ds._createBefore(t.parent)),
            e.parent.is('$text') && e.isAtEnd && (e = Ds._createAfter(e.parent)),
            new Fs(t, e)
          )
        }
        getTrimmed() {
          let t = this.start.getLastMatchingPosition(Bs)
          if (t.isAfter(this.end) || t.isEqual(this.end)) return new Fs(t, t)
          let e = this.end.getLastMatchingPosition(Bs, { direction: 'backward' })
          const n = t.nodeAfter,
            i = e.nodeBefore
          return (
            n && n.is('$text') && (t = new Ds(n, 0)), i && i.is('$text') && (e = new Ds(i, i.data.length)), new Fs(t, e)
          )
        }
        isEqual(t) {
          return this == t || (this.start.isEqual(t.start) && this.end.isEqual(t.end))
        }
        containsPosition(t) {
          return t.isAfter(this.start) && t.isBefore(this.end)
        }
        containsRange(t, e = !1) {
          t.isCollapsed && (e = !1)
          const n = this.containsPosition(t.start) || (e && this.start.isEqual(t.start)),
            i = this.containsPosition(t.end) || (e && this.end.isEqual(t.end))
          return n && i
        }
        getDifference(t) {
          const e = []
          return (
            this.isIntersecting(t)
              ? (this.containsPosition(t.start) && e.push(new Fs(this.start, t.start)),
                this.containsPosition(t.end) && e.push(new Fs(t.end, this.end)))
              : e.push(this.clone()),
            e
          )
        }
        getIntersection(t) {
          if (this.isIntersecting(t)) {
            let e = this.start,
              n = this.end
            return (
              this.containsPosition(t.start) && (e = t.start), this.containsPosition(t.end) && (n = t.end), new Fs(e, n)
            )
          }
          return null
        }
        getWalker(t = {}) {
          return (t.boundaries = this), new Ns(t)
        }
        getCommonAncestor() {
          return this.start.getCommonAncestor(this.end)
        }
        getContainedElement() {
          if (this.isCollapsed) return null
          let t = this.start.nodeAfter,
            e = this.end.nodeBefore
          return (
            this.start.parent.is('$text') &&
              this.start.isAtEnd &&
              this.start.parent.nextSibling &&
              (t = this.start.parent.nextSibling),
            this.end.parent.is('$text') &&
              this.end.isAtStart &&
              this.end.parent.previousSibling &&
              (e = this.end.parent.previousSibling),
            t && t.is('element') && t === e ? t : null
          )
        }
        clone() {
          return new Fs(this.start, this.end)
        }
        *getItems(t = {}) {
          ;(t.boundaries = this), (t.ignoreElementEnd = !0)
          const e = new Ns(t)
          for (const t of e) yield t.item
        }
        *getPositions(t = {}) {
          t.boundaries = this
          const e = new Ns(t)
          yield e.position
          for (const t of e) yield t.nextPosition
        }
        is(t) {
          return 'range' === t || 'view:range' === t
        }
        isIntersecting(t) {
          return this.start.isBefore(t.end) && this.end.isAfter(t.start)
        }
        static _createFromParentsAndOffsets(t, e, n, i) {
          return new this(new Ds(t, e), new Ds(n, i))
        }
        static _createFromPositionAndShift(t, e) {
          const n = t,
            i = t.getShiftedBy(e)
          return e > 0 ? new this(n, i) : new this(i, n)
        }
        static _createIn(t) {
          return this._createFromParentsAndOffsets(t, 0, t, t.childCount)
        }
        static _createOn(t) {
          const e = t.is('$textProxy') ? t.offsetSize : 1
          return this._createFromPositionAndShift(Ds._createBefore(t), e)
        }
      }
      function Bs(t) {
        return !(!t.item.is('attributeElement') && !t.item.is('uiElement'))
      }
      function Vs(t) {
        let e = 0
        for (const n of t) e++
        return e
      }
      class Ls {
        constructor(t = null, e, n) {
          ;(this._ranges = []),
            (this._lastRangeBackward = !1),
            (this._isFake = !1),
            (this._fakeSelectionLabel = ''),
            this.setTo(t, e, n)
        }
        get isFake() {
          return this._isFake
        }
        get fakeSelectionLabel() {
          return this._fakeSelectionLabel
        }
        get anchor() {
          if (!this._ranges.length) return null
          const t = this._ranges[this._ranges.length - 1]
          return (this._lastRangeBackward ? t.end : t.start).clone()
        }
        get focus() {
          if (!this._ranges.length) return null
          const t = this._ranges[this._ranges.length - 1]
          return (this._lastRangeBackward ? t.start : t.end).clone()
        }
        get isCollapsed() {
          return 1 === this.rangeCount && this._ranges[0].isCollapsed
        }
        get rangeCount() {
          return this._ranges.length
        }
        get isBackward() {
          return !this.isCollapsed && this._lastRangeBackward
        }
        get editableElement() {
          return this.anchor ? this.anchor.editableElement : null
        }
        *getRanges() {
          for (const t of this._ranges) yield t.clone()
        }
        getFirstRange() {
          let t = null
          for (const e of this._ranges) (t && !e.start.isBefore(t.start)) || (t = e)
          return t ? t.clone() : null
        }
        getLastRange() {
          let t = null
          for (const e of this._ranges) (t && !e.end.isAfter(t.end)) || (t = e)
          return t ? t.clone() : null
        }
        getFirstPosition() {
          const t = this.getFirstRange()
          return t ? t.start.clone() : null
        }
        getLastPosition() {
          const t = this.getLastRange()
          return t ? t.end.clone() : null
        }
        isEqual(t) {
          if (this.isFake != t.isFake) return !1
          if (this.isFake && this.fakeSelectionLabel != t.fakeSelectionLabel) return !1
          if (this.rangeCount != t.rangeCount) return !1
          if (0 === this.rangeCount) return !0
          if (!this.anchor.isEqual(t.anchor) || !this.focus.isEqual(t.focus)) return !1
          for (const e of this._ranges) {
            let n = !1
            for (const i of t._ranges)
              if (e.isEqual(i)) {
                n = !0
                break
              }
            if (!n) return !1
          }
          return !0
        }
        isSimilar(t) {
          if (this.isBackward != t.isBackward) return !1
          const e = Vs(this.getRanges())
          if (e != Vs(t.getRanges())) return !1
          if (0 == e) return !0
          for (let e of this.getRanges()) {
            e = e.getTrimmed()
            let n = !1
            for (let i of t.getRanges())
              if (((i = i.getTrimmed()), e.start.isEqual(i.start) && e.end.isEqual(i.end))) {
                n = !0
                break
              }
            if (!n) return !1
          }
          return !0
        }
        getSelectedElement() {
          return 1 !== this.rangeCount ? null : this.getFirstRange().getContainedElement()
        }
        setTo(t, e, n) {
          if (null === t) this._setRanges([]), this._setFakeOptions(e)
          else if (t instanceof Ls || t instanceof js)
            this._setRanges(t.getRanges(), t.isBackward),
              this._setFakeOptions({ fake: t.isFake, label: t.fakeSelectionLabel })
          else if (t instanceof Fs) this._setRanges([t], e && e.backward), this._setFakeOptions(e)
          else if (t instanceof Ds) this._setRanges([new Fs(t)]), this._setFakeOptions(e)
          else if (t instanceof Fi) {
            const i = !!n && !!n.backward
            let s
            if (void 0 === e) throw new c('view-selection-setto-required-second-parameter', this)
            ;(s = 'in' == e ? Fs._createIn(t) : 'on' == e ? Fs._createOn(t) : new Fs(Ds._createAt(t, e))),
              this._setRanges([s], i),
              this._setFakeOptions(n)
          } else {
            if (!Ai(t)) throw new c('view-selection-setto-not-selectable', this)
            this._setRanges(t, e && e.backward), this._setFakeOptions(e)
          }
          this.fire('change')
        }
        setFocus(t, e) {
          if (null === this.anchor) throw new c('view-selection-setfocus-no-ranges', this)
          const n = Ds._createAt(t, e)
          if ('same' == n.compareWith(this.focus)) return
          const i = this.anchor
          this._ranges.pop(),
            'before' == n.compareWith(i) ? this._addRange(new Fs(n, i), !0) : this._addRange(new Fs(i, n)),
            this.fire('change')
        }
        is(t) {
          return 'selection' === t || 'view:selection' === t
        }
        _setRanges(t, e = !1) {
          ;(t = Array.from(t)), (this._ranges = [])
          for (const e of t) this._addRange(e)
          this._lastRangeBackward = !!e
        }
        _setFakeOptions(t = {}) {
          ;(this._isFake = !!t.fake), (this._fakeSelectionLabel = (t.fake && t.label) || '')
        }
        _addRange(t, e = !1) {
          if (!(t instanceof Fs)) throw new c('view-selection-add-range-not-range', this)
          this._pushRange(t), (this._lastRangeBackward = !!e)
        }
        _pushRange(t) {
          for (const e of this._ranges)
            if (t.isIntersecting(e))
              throw new c('view-selection-range-intersects', this, { addedRange: t, intersectingRange: e })
          this._ranges.push(new Fs(t.start, t.end))
        }
      }
      he(Ls, p)
      class js {
        constructor(t = null, e, n) {
          ;(this._selection = new Ls()), this._selection.delegate('change').to(this), this._selection.setTo(t, e, n)
        }
        get isFake() {
          return this._selection.isFake
        }
        get fakeSelectionLabel() {
          return this._selection.fakeSelectionLabel
        }
        get anchor() {
          return this._selection.anchor
        }
        get focus() {
          return this._selection.focus
        }
        get isCollapsed() {
          return this._selection.isCollapsed
        }
        get rangeCount() {
          return this._selection.rangeCount
        }
        get isBackward() {
          return this._selection.isBackward
        }
        get editableElement() {
          return this._selection.editableElement
        }
        get _ranges() {
          return this._selection._ranges
        }
        *getRanges() {
          yield* this._selection.getRanges()
        }
        getFirstRange() {
          return this._selection.getFirstRange()
        }
        getLastRange() {
          return this._selection.getLastRange()
        }
        getFirstPosition() {
          return this._selection.getFirstPosition()
        }
        getLastPosition() {
          return this._selection.getLastPosition()
        }
        getSelectedElement() {
          return this._selection.getSelectedElement()
        }
        isEqual(t) {
          return this._selection.isEqual(t)
        }
        isSimilar(t) {
          return this._selection.isSimilar(t)
        }
        is(t) {
          return 'selection' === t || 'documentSelection' == t || 'view:selection' == t || 'view:documentSelection' == t
        }
        _setTo(t, e, n) {
          this._selection.setTo(t, e, n)
        }
        _setFocus(t, e) {
          this._selection.setFocus(t, e)
        }
      }
      he(js, p)
      class Ws extends i {
        constructor(t, e, n) {
          super(t, e), (this.startRange = n), (this._eventPhase = 'none'), (this._currentTarget = null)
        }
        get eventPhase() {
          return this._eventPhase
        }
        get currentTarget() {
          return this._currentTarget
        }
      }
      const zs = Symbol('bubbling contexts'),
        $s = {
          fire(t, ...e) {
            try {
              const n = t instanceof i ? t : new i(this, t),
                s = Ks(this)
              if (!s.size) return
              if ((qs(n, 'capturing', this), Us(s, '$capture', n, ...e))) return n.return
              const o = n.startRange || this.selection.getFirstRange(),
                r = o ? o.getContainedElement() : null,
                a = !!r && Boolean(Hs(s, r))
              let c =
                r ||
                (function (t) {
                  if (!t) return null
                  const e = t.start.parent,
                    n = t.end.parent,
                    i = e.getPath(),
                    s = n.getPath()
                  return i.length > s.length ? e : n
                })(o)
              if ((qs(n, 'atTarget', c), !a)) {
                if (Us(s, '$text', n, ...e)) return n.return
                qs(n, 'bubbling', c)
              }
              for (; c; ) {
                if (c.is('rootElement')) {
                  if (Us(s, '$root', n, ...e)) return n.return
                } else if (c.is('element') && Us(s, c.name, n, ...e)) return n.return
                if (Us(s, c, n, ...e)) return n.return
                ;(c = c.parent), qs(n, 'bubbling', c)
              }
              return qs(n, 'bubbling', this), Us(s, '$document', n, ...e), n.return
            } catch (t) {
              c.rethrowUnexpectedError(t, this)
            }
          },
          _addEventListener(t, e, n) {
            const i = Si(n.context || '$document'),
              s = Ks(this)
            for (const o of i) {
              let i = s.get(o)
              i || ((i = Object.create(p)), s.set(o, i)), this.listenTo(i, t, e, n)
            }
          },
          _removeEventListener(t, e) {
            const n = Ks(this)
            for (const i of n.values()) this.stopListening(i, t, e)
          },
        }
      function qs(t, e, n) {
        t instanceof Ws && ((t._eventPhase = e), (t._currentTarget = n))
      }
      function Us(t, e, n, ...i) {
        const s = 'string' == typeof e ? t.get(e) : Hs(t, e)
        return !!s && (s.fire(n, ...i), n.stop.called)
      }
      function Hs(t, e) {
        for (const [n, i] of t) if ('function' == typeof n && n(e)) return i
        return null
      }
      function Ks(t) {
        return t[zs] || (t[zs] = new Map()), t[zs]
      }
      class Gs {
        constructor(t) {
          ;(this.selection = new js()),
            (this.roots = new Ci({ idProperty: 'rootName' })),
            (this.stylesProcessor = t),
            this.set('isReadOnly', !1),
            this.set('isFocused', !1),
            this.set('isSelecting', !1),
            this.set('isComposing', !1),
            (this._postFixers = new Set())
        }
        getRoot(t = 'main') {
          return this.roots.get(t)
        }
        registerPostFixer(t) {
          this._postFixers.add(t)
        }
        destroy() {
          this.roots.map(t => t.destroy()), this.stopListening()
        }
        _callPostFixers(t) {
          let e = !1
          do {
            for (const n of this._postFixers) if (((e = n(t)), e)) break
          } while (e)
        }
      }
      he(Gs, $s), he(Gs, se)
      class Js extends Ss {
        constructor(t, e, n, i) {
          super(t, e, n, i),
            (this.getFillerOffset = Ys),
            (this._priority = 10),
            (this._id = null),
            (this._clonesGroup = null)
        }
        get priority() {
          return this._priority
        }
        get id() {
          return this._id
        }
        getElementsWithSameId() {
          if (null === this.id) throw new c('attribute-element-get-elements-with-same-id-no-id', this)
          return new Set(this._clonesGroup)
        }
        is(t, e = null) {
          return e
            ? e === this.name &&
                ('attributeElement' === t || 'view:attributeElement' === t || 'element' === t || 'view:element' === t)
            : 'attributeElement' === t ||
                'view:attributeElement' === t ||
                'element' === t ||
                'view:element' === t ||
                'node' === t ||
                'view:node' === t
        }
        isSimilar(t) {
          return null !== this.id || null !== t.id
            ? this.id === t.id
            : super.isSimilar(t) && this.priority == t.priority
        }
        _clone(t) {
          const e = super._clone(t)
          return (e._priority = this._priority), (e._id = this._id), e
        }
      }
      function Ys() {
        if (Xs(this)) return null
        let t = this.parent
        for (; t && t.is('attributeElement'); ) {
          if (Xs(t) > 1) return null
          t = t.parent
        }
        return !t || Xs(t) > 1 ? null : this.childCount
      }
      function Xs(t) {
        return Array.from(t.getChildren()).filter(t => !t.is('uiElement')).length
      }
      Js.DEFAULT_PRIORITY = 10
      class Zs extends Ss {
        constructor(t, e, n, i) {
          super(t, e, n, i), (this.getFillerOffset = Qs)
        }
        is(t, e = null) {
          return e
            ? e === this.name &&
                ('emptyElement' === t || 'view:emptyElement' === t || 'element' === t || 'view:element' === t)
            : 'emptyElement' === t ||
                'view:emptyElement' === t ||
                'element' === t ||
                'view:element' === t ||
                'node' === t ||
                'view:node' === t
        }
        _insertChild(t, e) {
          if (e && (e instanceof Fi || Array.from(e).length > 0)) throw new c('view-emptyelement-cannot-add', [this, e])
        }
      }
      function Qs() {
        return null
      }
      const to = navigator.userAgent.toLowerCase(),
        eo = {
          isMac: io(to),
          isWindows: (function (t) {
            return t.indexOf('windows') > -1
          })(to),
          isGecko: (function (t) {
            return !!t.match(/gecko\/\d+/)
          })(to),
          isSafari: (function (t) {
            return t.indexOf(' applewebkit/') > -1 && -1 === t.indexOf('chrome')
          })(to),
          isiOS: (function (t) {
            return !!t.match(/iphone|ipad/i) || (io(t) && navigator.maxTouchPoints > 0)
          })(to),
          isAndroid: (function (t) {
            return t.indexOf('android') > -1
          })(to),
          isBlink: (function (t) {
            return t.indexOf('chrome/') > -1 && t.indexOf('edge/') < 0
          })(to),
          features: {
            isRegExpUnicodePropertySupported: (function () {
              let t = !1
              try {
                t = 0 === 'ć'.search(new RegExp('[\\p{L}]', 'u'))
              } catch (t) {}
              return t
            })(),
          },
        },
        no = eo
      function io(t) {
        return t.indexOf('macintosh') > -1
      }
      const so = { ctrl: '⌃', cmd: '⌘', alt: '⌥', shift: '⇧' },
        oo = { ctrl: 'Ctrl+', alt: 'Alt+', shift: 'Shift+' },
        ro = (function () {
          const t = {
            arrowleft: 37,
            arrowup: 38,
            arrowright: 39,
            arrowdown: 40,
            backspace: 8,
            delete: 46,
            enter: 13,
            space: 32,
            esc: 27,
            tab: 9,
            ctrl: 1114112,
            shift: 2228224,
            alt: 4456448,
            cmd: 8912896,
          }
          for (let e = 65; e <= 90; e++) {
            const n = String.fromCharCode(e)
            t[n.toLowerCase()] = e
          }
          for (let e = 48; e <= 57; e++) t[e - 48] = e
          for (let e = 112; e <= 123; e++) t['f' + (e - 111)] = e
          for (const e of "`-=[];',./\\") t[e] = e.charCodeAt(0)
          return t
        })(),
        ao = Object.fromEntries(Object.entries(ro).map(([t, e]) => [e, t.charAt(0).toUpperCase() + t.slice(1)]))
      function co(t) {
        let e
        if ('string' == typeof t) {
          if (((e = ro[t.toLowerCase()]), !e)) throw new c('keyboard-unknown-key', null, { key: t })
        } else
          e =
            t.keyCode +
            (t.altKey ? ro.alt : 0) +
            (t.ctrlKey ? ro.ctrl : 0) +
            (t.shiftKey ? ro.shift : 0) +
            (t.metaKey ? ro.cmd : 0)
        return e
      }
      function lo(t) {
        return (
          'string' == typeof t &&
            (t = (function (t) {
              return t.split('+').map(t => t.trim())
            })(t)),
          t
            .map(t =>
              'string' == typeof t
                ? (function (t) {
                    if (t.endsWith('!')) return co(t.slice(0, -1))
                    const e = co(t)
                    return no.isMac && e == ro.ctrl ? ro.cmd : e
                  })(t)
                : t
            )
            .reduce((t, e) => e + t, 0)
        )
      }
      function ho(t) {
        let e = lo(t)
        return (
          Object.entries(no.isMac ? so : oo).reduce(
            (t, [n, i]) => (0 != (e & ro[n]) && ((e &= ~ro[n]), (t += i)), t),
            ''
          ) + (e ? ao[e] : '')
        )
      }
      function uo(t, e) {
        const n = 'ltr' === e
        switch (t) {
          case ro.arrowleft:
            return n ? 'left' : 'right'
          case ro.arrowright:
            return n ? 'right' : 'left'
          case ro.arrowup:
            return 'up'
          case ro.arrowdown:
            return 'down'
        }
      }
      class fo extends Ss {
        constructor(t, e, n, i) {
          super(t, e, n, i), (this.getFillerOffset = go)
        }
        is(t, e = null) {
          return e
            ? e === this.name &&
                ('uiElement' === t || 'view:uiElement' === t || 'element' === t || 'view:element' === t)
            : 'uiElement' === t ||
                'view:uiElement' === t ||
                'element' === t ||
                'view:element' === t ||
                'node' === t ||
                'view:node' === t
        }
        _insertChild(t, e) {
          if (e && (e instanceof Fi || Array.from(e).length > 0)) throw new c('view-uielement-cannot-add', this)
        }
        render(t) {
          return this.toDomElement(t)
        }
        toDomElement(t) {
          const e = t.createElement(this.name)
          for (const t of this.getAttributeKeys()) e.setAttribute(t, this.getAttribute(t))
          return e
        }
      }
      function mo(t) {
        t.document.on(
          'arrowKey',
          (e, n) =>
            (function (t, e, n) {
              if (e.keyCode == ro.arrowright) {
                const t = e.domTarget.ownerDocument.defaultView.getSelection(),
                  i = 1 == t.rangeCount && t.getRangeAt(0).collapsed
                if (i || e.shiftKey) {
                  const e = t.focusNode,
                    s = t.focusOffset,
                    o = n.domPositionToView(e, s)
                  if (null === o) return
                  let r = !1
                  const a = o.getLastMatchingPosition(
                    t => (
                      t.item.is('uiElement') && (r = !0), !(!t.item.is('uiElement') && !t.item.is('attributeElement'))
                    )
                  )
                  if (r) {
                    const e = n.viewPositionToDom(a)
                    i ? t.collapse(e.parent, e.offset) : t.extend(e.parent, e.offset)
                  }
                }
              }
            })(0, n, t.domConverter),
          { priority: 'low' }
        )
      }
      function go() {
        return null
      }
      class po extends Ss {
        constructor(t, e, n, i) {
          super(t, e, n, i), (this.getFillerOffset = _o)
        }
        is(t, e = null) {
          return e
            ? e === this.name &&
                ('rawElement' === t || 'view:rawElement' === t || 'element' === t || 'view:element' === t)
            : 'rawElement' === t ||
                'view:rawElement' === t ||
                t === this.name ||
                t === 'view:' + this.name ||
                'element' === t ||
                'view:element' === t ||
                'node' === t ||
                'view:node' === t
        }
        _insertChild(t, e) {
          if (e && (e instanceof Fi || Array.from(e).length > 0)) throw new c('view-rawelement-cannot-add', [this, e])
        }
      }
      function _o() {
        return null
      }
      class wo {
        constructor(t, e) {
          ;(this.document = t), (this._children = []), e && this._insertChild(0, e)
        }
        [Symbol.iterator]() {
          return this._children[Symbol.iterator]()
        }
        get childCount() {
          return this._children.length
        }
        get isEmpty() {
          return 0 === this.childCount
        }
        get root() {
          return this
        }
        get parent() {
          return null
        }
        is(t) {
          return 'documentFragment' === t || 'view:documentFragment' === t
        }
        _appendChild(t) {
          return this._insertChild(this.childCount, t)
        }
        getChild(t) {
          return this._children[t]
        }
        getChildIndex(t) {
          return this._children.indexOf(t)
        }
        getChildren() {
          return this._children[Symbol.iterator]()
        }
        _insertChild(t, e) {
          this._fireChange('children', this)
          let n = 0
          const i = (function (t, e) {
            if ('string' == typeof e) return [new Bi(t, e)]
            Ai(e) || (e = [e])
            return Array.from(e).map(e =>
              'string' == typeof e ? new Bi(t, e) : e instanceof Vi ? new Bi(t, e.data) : e
            )
          })(this.document, e)
          for (const e of i)
            null !== e.parent && e._remove(), (e.parent = this), this._children.splice(t, 0, e), t++, n++
          return n
        }
        _removeChildren(t, e = 1) {
          this._fireChange('children', this)
          for (let n = t; n < t + e; n++) this._children[n].parent = null
          return this._children.splice(t, e)
        }
        _fireChange(t, e) {
          this.fire('change:' + t, e)
        }
      }
      he(wo, p)
      class bo {
        constructor(t) {
          ;(this.document = t), (this._cloneGroups = new Map()), (this._slotFactory = null)
        }
        setSelection(t, e, n) {
          this.document.selection._setTo(t, e, n)
        }
        setSelectionFocus(t, e) {
          this.document.selection._setFocus(t, e)
        }
        createDocumentFragment(t) {
          return new wo(this.document, t)
        }
        createText(t) {
          return new Bi(this.document, t)
        }
        createAttributeElement(t, e, n = {}) {
          const i = new Js(this.document, t, e)
          return (
            'number' == typeof n.priority && (i._priority = n.priority),
            n.id && (i._id = n.id),
            n.renderUnsafeAttributes && i._unsafeAttributesToRender.push(...n.renderUnsafeAttributes),
            i
          )
        }
        createContainerElement(t, e, n = {}, i = {}) {
          let s = null
          Pe(n) ? (i = n) : (s = n)
          const o = new Ts(this.document, t, e, s)
          return i.renderUnsafeAttributes && o._unsafeAttributesToRender.push(...i.renderUnsafeAttributes), o
        }
        createEditableElement(t, e, n = {}) {
          const i = new Os(this.document, t, e)
          return (
            (i._document = this.document),
            n.renderUnsafeAttributes && i._unsafeAttributesToRender.push(...n.renderUnsafeAttributes),
            i
          )
        }
        createEmptyElement(t, e, n = {}) {
          const i = new Zs(this.document, t, e)
          return n.renderUnsafeAttributes && i._unsafeAttributesToRender.push(...n.renderUnsafeAttributes), i
        }
        createUIElement(t, e, n) {
          const i = new fo(this.document, t, e)
          return n && (i.render = n), i
        }
        createRawElement(t, e, n, i = {}) {
          const s = new po(this.document, t, e)
          return (
            (s.render = n || (() => {})),
            i.renderUnsafeAttributes && s._unsafeAttributesToRender.push(...i.renderUnsafeAttributes),
            s
          )
        }
        setAttribute(t, e, n) {
          n._setAttribute(t, e)
        }
        removeAttribute(t, e) {
          e._removeAttribute(t)
        }
        addClass(t, e) {
          e._addClass(t)
        }
        removeClass(t, e) {
          e._removeClass(t)
        }
        setStyle(t, e, n) {
          Pe(t) && void 0 === n && (n = e), n._setStyle(t, e)
        }
        removeStyle(t, e) {
          e._removeStyle(t)
        }
        setCustomProperty(t, e, n) {
          n._setCustomProperty(t, e)
        }
        removeCustomProperty(t, e) {
          return e._removeCustomProperty(t)
        }
        breakAttributes(t) {
          return t instanceof Ds ? this._breakAttributes(t) : this._breakAttributesRange(t)
        }
        breakContainer(t) {
          const e = t.parent
          if (!e.is('containerElement')) throw new c('view-writer-break-non-container-element', this.document)
          if (!e.parent) throw new c('view-writer-break-root', this.document)
          if (t.isAtStart) return Ds._createBefore(e)
          if (!t.isAtEnd) {
            const n = e._clone(!1)
            this.insert(Ds._createAfter(e), n)
            const i = new Fs(t, Ds._createAt(e, 'end')),
              s = new Ds(n, 0)
            this.move(i, s)
          }
          return Ds._createAfter(e)
        }
        mergeAttributes(t) {
          const e = t.offset,
            n = t.parent
          if (n.is('$text')) return t
          if (n.is('attributeElement') && 0 === n.childCount) {
            const t = n.parent,
              e = n.index
            return n._remove(), this._removeFromClonedElementsGroup(n), this.mergeAttributes(new Ds(t, e))
          }
          const i = n.getChild(e - 1),
            s = n.getChild(e)
          if (!i || !s) return t
          if (i.is('$text') && s.is('$text')) return Ao(i, s)
          if (i.is('attributeElement') && s.is('attributeElement') && i.isSimilar(s)) {
            const t = i.childCount
            return (
              i._appendChild(s.getChildren()),
              s._remove(),
              this._removeFromClonedElementsGroup(s),
              this.mergeAttributes(new Ds(i, t))
            )
          }
          return t
        }
        mergeContainers(t) {
          const e = t.nodeBefore,
            n = t.nodeAfter
          if (!(e && n && e.is('containerElement') && n.is('containerElement')))
            throw new c('view-writer-merge-containers-invalid-position', this.document)
          const i = e.getChild(e.childCount - 1),
            s = i instanceof Bi ? Ds._createAt(i, 'end') : Ds._createAt(e, 'end')
          return this.move(Fs._createIn(n), Ds._createAt(e, 'end')), this.remove(Fs._createOn(n)), s
        }
        insert(t, e) {
          Co((e = Ai(e) ? [...e] : [e]), this.document)
          const n = e.reduce((t, e) => {
            const n = t[t.length - 1],
              i = !e.is('uiElement')
            return n && n.breakAttributes == i ? n.nodes.push(e) : t.push({ breakAttributes: i, nodes: [e] }), t
          }, [])
          let i = null,
            s = t
          for (const { nodes: t, breakAttributes: e } of n) {
            const n = this._insertNodes(s, t, e)
            i || (i = n.start), (s = n.end)
          }
          return i ? new Fs(i, s) : new Fs(t)
        }
        remove(t) {
          const e = t instanceof Fs ? t : Fs._createOn(t)
          if ((xo(e, this.document), e.isCollapsed)) return new wo(this.document)
          const { start: n, end: i } = this._breakAttributesRange(e, !0),
            s = n.parent,
            o = i.offset - n.offset,
            r = s._removeChildren(n.offset, o)
          for (const t of r) this._removeFromClonedElementsGroup(t)
          const a = this.mergeAttributes(n)
          return (e.start = a), (e.end = a.clone()), new wo(this.document, r)
        }
        clear(t, e) {
          xo(t, this.document)
          const n = t.getWalker({ direction: 'backward', ignoreElementEnd: !0 })
          for (const i of n) {
            const n = i.item
            let s
            if (n.is('element') && e.isSimilar(n)) s = Fs._createOn(n)
            else if (!i.nextPosition.isAfter(t.start) && n.is('$textProxy')) {
              const t = n.getAncestors().find(t => t.is('element') && e.isSimilar(t))
              t && (s = Fs._createIn(t))
            }
            s &&
              (s.end.isAfter(t.end) && (s.end = t.end),
              s.start.isBefore(t.start) && (s.start = t.start),
              this.remove(s))
          }
        }
        move(t, e) {
          let n
          if (e.isAfter(t.end)) {
            const i = (e = this._breakAttributes(e, !0)).parent,
              s = i.childCount
            ;(t = this._breakAttributesRange(t, !0)), (n = this.remove(t)), (e.offset += i.childCount - s)
          } else n = this.remove(t)
          return this.insert(e, n)
        }
        wrap(t, e) {
          if (!(e instanceof Js)) throw new c('view-writer-wrap-invalid-attribute', this.document)
          if ((xo(t, this.document), t.isCollapsed)) {
            let i = t.start
            i.parent.is('element') &&
              ((n = i.parent), !Array.from(n.getChildren()).some(t => !t.is('uiElement'))) &&
              (i = i.getLastMatchingPosition(t => t.item.is('uiElement'))),
              (i = this._wrapPosition(i, e))
            const s = this.document.selection
            return s.isCollapsed && s.getFirstPosition().isEqual(t.start) && this.setSelection(i), new Fs(i)
          }
          return this._wrapRange(t, e)
          var n
        }
        unwrap(t, e) {
          if (!(e instanceof Js)) throw new c('view-writer-unwrap-invalid-attribute', this.document)
          if ((xo(t, this.document), t.isCollapsed)) return t
          const { start: n, end: i } = this._breakAttributesRange(t, !0),
            s = n.parent,
            o = this._unwrapChildren(s, n.offset, i.offset, e),
            r = this.mergeAttributes(o.start)
          r.isEqual(o.start) || o.end.offset--
          const a = this.mergeAttributes(o.end)
          return new Fs(r, a)
        }
        rename(t, e) {
          const n = new Ts(this.document, t, e.getAttributes())
          return (
            this.insert(Ds._createAfter(e), n),
            this.move(Fs._createIn(e), Ds._createAt(n, 0)),
            this.remove(Fs._createOn(e)),
            n
          )
        }
        clearClonedElementsGroup(t) {
          this._cloneGroups.delete(t)
        }
        createPositionAt(t, e) {
          return Ds._createAt(t, e)
        }
        createPositionAfter(t) {
          return Ds._createAfter(t)
        }
        createPositionBefore(t) {
          return Ds._createBefore(t)
        }
        createRange(t, e) {
          return new Fs(t, e)
        }
        createRangeOn(t) {
          return Fs._createOn(t)
        }
        createRangeIn(t) {
          return Fs._createIn(t)
        }
        createSelection(t, e, n) {
          return new Ls(t, e, n)
        }
        createSlot(t) {
          if (!this._slotFactory) throw new c('view-writer-invalid-create-slot-context', this.document)
          return this._slotFactory(this, t)
        }
        _registerSlotFactory(t) {
          this._slotFactory = t
        }
        _clearSlotFactory() {
          this._slotFactory = null
        }
        _insertNodes(t, e, n) {
          let i, s
          if (((i = n ? yo(t) : t.parent.is('$text') ? t.parent.parent : t.parent), !i))
            throw new c('view-writer-invalid-position-container', this.document)
          s = n ? this._breakAttributes(t, !0) : t.parent.is('$text') ? ko(t) : t
          const o = i._insertChild(s.offset, e)
          for (const t of e) this._addToClonedElementsGroup(t)
          const r = s.getShiftedBy(o),
            a = this.mergeAttributes(s)
          a.isEqual(s) || r.offset--
          const l = this.mergeAttributes(r)
          return new Fs(a, l)
        }
        _wrapChildren(t, e, n, i) {
          let s = e
          const o = []
          for (; s < n; ) {
            const e = t.getChild(s),
              n = e.is('$text'),
              r = e.is('attributeElement')
            if (r && this._wrapAttributeElement(i, e)) o.push(new Ds(t, s))
            else if (n || !r || vo(i, e)) {
              const n = i._clone()
              e._remove(),
                n._appendChild(e),
                t._insertChild(s, n),
                this._addToClonedElementsGroup(n),
                o.push(new Ds(t, s))
            } else this._wrapChildren(e, 0, e.childCount, i)
            s++
          }
          let r = 0
          for (const t of o) {
            if (((t.offset -= r), t.offset == e)) continue
            this.mergeAttributes(t).isEqual(t) || (r++, n--)
          }
          return Fs._createFromParentsAndOffsets(t, e, t, n)
        }
        _unwrapChildren(t, e, n, i) {
          let s = e
          const o = []
          for (; s < n; ) {
            const e = t.getChild(s)
            if (e.is('attributeElement'))
              if (e.isSimilar(i)) {
                const i = e.getChildren(),
                  r = e.childCount
                e._remove(),
                  t._insertChild(s, i),
                  this._removeFromClonedElementsGroup(e),
                  o.push(new Ds(t, s), new Ds(t, s + r)),
                  (s += r),
                  (n += r - 1)
              } else
                this._unwrapAttributeElement(i, e)
                  ? (o.push(new Ds(t, s), new Ds(t, s + 1)), s++)
                  : (this._unwrapChildren(e, 0, e.childCount, i), s++)
            else s++
          }
          let r = 0
          for (const t of o) {
            if (((t.offset -= r), t.offset == e || t.offset == n)) continue
            this.mergeAttributes(t).isEqual(t) || (r++, n--)
          }
          return Fs._createFromParentsAndOffsets(t, e, t, n)
        }
        _wrapRange(t, e) {
          const { start: n, end: i } = this._breakAttributesRange(t, !0),
            s = n.parent,
            o = this._wrapChildren(s, n.offset, i.offset, e),
            r = this.mergeAttributes(o.start)
          r.isEqual(o.start) || o.end.offset--
          const a = this.mergeAttributes(o.end)
          return new Fs(r, a)
        }
        _wrapPosition(t, e) {
          if (e.isSimilar(t.parent)) return Po(t.clone())
          t.parent.is('$text') && (t = ko(t))
          const n = this.createAttributeElement()
          ;(n._priority = Number.POSITIVE_INFINITY), (n.isSimilar = () => !1), t.parent._insertChild(t.offset, n)
          const i = new Fs(t, t.getShiftedBy(1))
          this.wrap(i, e)
          const s = new Ds(n.parent, n.index)
          n._remove()
          const o = s.nodeBefore,
            r = s.nodeAfter
          return o instanceof Bi && r instanceof Bi ? Ao(o, r) : Po(s)
        }
        _wrapAttributeElement(t, e) {
          if (!To(t, e)) return !1
          if (t.name !== e.name || t.priority !== e.priority) return !1
          for (const n of t.getAttributeKeys())
            if ('class' !== n && 'style' !== n && e.hasAttribute(n) && e.getAttribute(n) !== t.getAttribute(n))
              return !1
          for (const n of t.getStyleNames()) if (e.hasStyle(n) && e.getStyle(n) !== t.getStyle(n)) return !1
          for (const n of t.getAttributeKeys())
            'class' !== n && 'style' !== n && (e.hasAttribute(n) || this.setAttribute(n, t.getAttribute(n), e))
          for (const n of t.getStyleNames()) e.hasStyle(n) || this.setStyle(n, t.getStyle(n), e)
          for (const n of t.getClassNames()) e.hasClass(n) || this.addClass(n, e)
          return !0
        }
        _unwrapAttributeElement(t, e) {
          if (!To(t, e)) return !1
          if (t.name !== e.name || t.priority !== e.priority) return !1
          for (const n of t.getAttributeKeys())
            if ('class' !== n && 'style' !== n && (!e.hasAttribute(n) || e.getAttribute(n) !== t.getAttribute(n)))
              return !1
          if (!e.hasClass(...t.getClassNames())) return !1
          for (const n of t.getStyleNames()) if (!e.hasStyle(n) || e.getStyle(n) !== t.getStyle(n)) return !1
          for (const n of t.getAttributeKeys()) 'class' !== n && 'style' !== n && this.removeAttribute(n, e)
          return (
            this.removeClass(Array.from(t.getClassNames()), e), this.removeStyle(Array.from(t.getStyleNames()), e), !0
          )
        }
        _breakAttributesRange(t, e = !1) {
          const n = t.start,
            i = t.end
          if ((xo(t, this.document), t.isCollapsed)) {
            const n = this._breakAttributes(t.start, e)
            return new Fs(n, n)
          }
          const s = this._breakAttributes(i, e),
            o = s.parent.childCount,
            r = this._breakAttributes(n, e)
          return (s.offset += s.parent.childCount - o), new Fs(r, s)
        }
        _breakAttributes(t, e = !1) {
          const n = t.offset,
            i = t.parent
          if (t.parent.is('emptyElement')) throw new c('view-writer-cannot-break-empty-element', this.document)
          if (t.parent.is('uiElement')) throw new c('view-writer-cannot-break-ui-element', this.document)
          if (t.parent.is('rawElement')) throw new c('view-writer-cannot-break-raw-element', this.document)
          if (!e && i.is('$text') && So(i.parent)) return t.clone()
          if (So(i)) return t.clone()
          if (i.is('$text')) return this._breakAttributes(ko(t), e)
          if (n == i.childCount) {
            const t = new Ds(i.parent, i.index + 1)
            return this._breakAttributes(t, e)
          }
          if (0 === n) {
            const t = new Ds(i.parent, i.index)
            return this._breakAttributes(t, e)
          }
          {
            const t = i.index + 1,
              s = i._clone()
            i.parent._insertChild(t, s), this._addToClonedElementsGroup(s)
            const o = i.childCount - n,
              r = i._removeChildren(n, o)
            s._appendChild(r)
            const a = new Ds(i.parent, t)
            return this._breakAttributes(a, e)
          }
        }
        _addToClonedElementsGroup(t) {
          if (!t.root.is('rootElement')) return
          if (t.is('element')) for (const e of t.getChildren()) this._addToClonedElementsGroup(e)
          const e = t.id
          if (!e) return
          let n = this._cloneGroups.get(e)
          n || ((n = new Set()), this._cloneGroups.set(e, n)), n.add(t), (t._clonesGroup = n)
        }
        _removeFromClonedElementsGroup(t) {
          if (t.is('element')) for (const e of t.getChildren()) this._removeFromClonedElementsGroup(e)
          const e = t.id
          if (!e) return
          const n = this._cloneGroups.get(e)
          n && n.delete(t)
        }
      }
      function yo(t) {
        let e = t.parent
        for (; !So(e); ) {
          if (!e) return
          e = e.parent
        }
        return e
      }
      function vo(t, e) {
        return t.priority < e.priority || (!(t.priority > e.priority) && t.getIdentity() < e.getIdentity())
      }
      function Po(t) {
        const e = t.nodeBefore
        if (e && e.is('$text')) return new Ds(e, e.data.length)
        const n = t.nodeAfter
        return n && n.is('$text') ? new Ds(n, 0) : t
      }
      function ko(t) {
        if (t.offset == t.parent.data.length) return new Ds(t.parent.parent, t.parent.index + 1)
        if (0 === t.offset) return new Ds(t.parent.parent, t.parent.index)
        const e = t.parent.data.slice(t.offset)
        return (
          (t.parent._data = t.parent.data.slice(0, t.offset)),
          t.parent.parent._insertChild(t.parent.index + 1, new Bi(t.root.document, e)),
          new Ds(t.parent.parent, t.parent.index + 1)
        )
      }
      function Ao(t, e) {
        const n = t.data.length
        return (t._data += e.data), e._remove(), new Ds(t, n)
      }
      function Co(t, e) {
        for (const n of t) {
          if (!Eo.some(t => n instanceof t)) throw new c('view-writer-insert-invalid-node-type', e)
          n.is('$text') || Co(n.getChildren(), e)
        }
      }
      const Eo = [Bi, Js, Ts, Zs, po, fo]
      function So(t) {
        return t && (t.is('containerElement') || t.is('documentFragment'))
      }
      function xo(t, e) {
        const n = yo(t.start),
          i = yo(t.end)
        if (!n || !i || n !== i) throw new c('view-writer-invalid-range-container', e)
      }
      function To(t, e) {
        return null === t.id && null === e.id
      }
      function Ro(t) {
        return '[object Text]' == Object.prototype.toString.call(t)
      }
      const Oo = t => t.createTextNode(' '),
        Io = t => {
          const e = t.createElement('span')
          return (e.dataset.ckeFiller = !0), (e.innerHTML = ' '), e
        },
        Mo = t => {
          const e = t.createElement('br')
          return (e.dataset.ckeFiller = !0), e
        },
        No = '⁠'.repeat(7)
      function Do(t) {
        return Ro(t) && t.data.substr(0, 7) === No
      }
      function Fo(t) {
        return 7 == t.data.length && Do(t)
      }
      function Bo(t) {
        return Do(t) ? t.data.slice(7) : t.data
      }
      function Vo(t, e) {
        if (e.keyCode == ro.arrowleft) {
          const t = e.domTarget.ownerDocument.defaultView.getSelection()
          if (1 == t.rangeCount && t.getRangeAt(0).collapsed) {
            const e = t.getRangeAt(0).startContainer,
              n = t.getRangeAt(0).startOffset
            Do(e) && n <= 7 && t.collapse(e, 0)
          }
        }
      }
      function Lo(t, e, n, i = !1) {
        ;(n =
          n ||
          function (t, e) {
            return t === e
          }),
          Array.isArray(t) || (t = Array.prototype.slice.call(t)),
          Array.isArray(e) || (e = Array.prototype.slice.call(e))
        const s = (function (t, e, n) {
          const i = jo(t, e, n)
          if (-1 === i) return { firstIndex: -1, lastIndexOld: -1, lastIndexNew: -1 }
          const s = Wo(t, i),
            o = Wo(e, i),
            r = jo(s, o, n),
            a = t.length - r,
            c = e.length - r
          return { firstIndex: i, lastIndexOld: a, lastIndexNew: c }
        })(t, e, n)
        return i
          ? (function (t, e) {
              const { firstIndex: n, lastIndexOld: i, lastIndexNew: s } = t
              if (-1 === n) return Array(e).fill('equal')
              let o = []
              n > 0 && (o = o.concat(Array(n).fill('equal')))
              s - n > 0 && (o = o.concat(Array(s - n).fill('insert')))
              i - n > 0 && (o = o.concat(Array(i - n).fill('delete')))
              s < e && (o = o.concat(Array(e - s).fill('equal')))
              return o
            })(s, e.length)
          : (function (t, e) {
              const n = [],
                { firstIndex: i, lastIndexOld: s, lastIndexNew: o } = e
              o - i > 0 && n.push({ index: i, type: 'insert', values: t.slice(i, o) })
              s - i > 0 && n.push({ index: i + (o - i), type: 'delete', howMany: s - i })
              return n
            })(e, s)
      }
      function jo(t, e, n) {
        for (let i = 0; i < Math.max(t.length, e.length); i++)
          if (void 0 === t[i] || void 0 === e[i] || !n(t[i], e[i])) return i
        return -1
      }
      function Wo(t, e) {
        return t.slice(e).reverse()
      }
      function zo(t, e, n) {
        n =
          n ||
          function (t, e) {
            return t === e
          }
        const i = t.length,
          s = e.length
        if (i > 200 || s > 200 || i + s > 300) return zo.fastDiff(t, e, n, !0)
        let o, r
        if (s < i) {
          const n = t
          ;(t = e), (e = n), (o = 'delete'), (r = 'insert')
        } else (o = 'insert'), (r = 'delete')
        const a = t.length,
          c = e.length,
          l = c - a,
          h = {},
          d = {}
        function u(i) {
          const s = (void 0 !== d[i - 1] ? d[i - 1] : -1) + 1,
            l = void 0 !== d[i + 1] ? d[i + 1] : -1,
            u = s > l ? -1 : 1
          h[i + u] && (h[i] = h[i + u].slice(0)), h[i] || (h[i] = []), h[i].push(s > l ? o : r)
          let f = Math.max(s, l),
            m = f - i
          for (; m < a && f < c && n(t[m], e[f]); ) m++, f++, h[i].push('equal')
          return f
        }
        let f,
          m = 0
        do {
          for (f = -m; f < l; f++) d[f] = u(f)
          for (f = l + m; f > l; f--) d[f] = u(f)
          ;(d[l] = u(l)), m++
        } while (d[l] !== c)
        return h[l].slice(1)
      }
      function $o(t, e, n) {
        t.insertBefore(n, t.childNodes[e] || null)
      }
      function qo(t) {
        const e = t.parentNode
        e && e.removeChild(t)
      }
      function Uo(t) {
        return t && t.nodeType === Node.COMMENT_NODE
      }
      function Ho(t) {
        if (t) {
          if (t.defaultView) return t instanceof t.defaultView.Document
          if (t.ownerDocument && t.ownerDocument.defaultView) return t instanceof t.ownerDocument.defaultView.Node
        }
        return !1
      }
      zo.fastDiff = Lo
      class Ko {
        constructor(t, e) {
          ;(this.domDocuments = new Set()),
            (this.domConverter = t),
            (this.markedAttributes = new Set()),
            (this.markedChildren = new Set()),
            (this.markedTexts = new Set()),
            (this.selection = e),
            this.set('isFocused', !1),
            this.set('isSelecting', !1),
            no.isBlink &&
              !no.isAndroid &&
              this.on('change:isSelecting', () => {
                this.isSelecting || this.render()
              }),
            (this._inlineFiller = null),
            (this._fakeSelectionContainer = null)
        }
        markToSync(t, e) {
          if ('text' === t) this.domConverter.mapViewToDom(e.parent) && this.markedTexts.add(e)
          else {
            if (!this.domConverter.mapViewToDom(e)) return
            if ('attributes' === t) this.markedAttributes.add(e)
            else {
              if ('children' !== t) throw new c('view-renderer-unknown-type', this)
              this.markedChildren.add(e)
            }
          }
        }
        render() {
          let t
          const e = !(no.isBlink && !no.isAndroid) || !this.isSelecting
          for (const t of this.markedChildren) this._updateChildrenMappings(t)
          e
            ? (this._inlineFiller && !this._isSelectionInInlineFiller() && this._removeInlineFiller(),
              this._inlineFiller
                ? (t = this._getInlineFillerPosition())
                : this._needsInlineFillerAtSelection() &&
                  ((t = this.selection.getFirstPosition()), this.markedChildren.add(t.parent)))
            : this._inlineFiller &&
              this._inlineFiller.parentNode &&
              (t = this.domConverter.domPositionToView(this._inlineFiller))
          for (const t of this.markedAttributes) this._updateAttrs(t)
          for (const e of this.markedChildren) this._updateChildren(e, { inlineFillerPosition: t })
          for (const e of this.markedTexts)
            !this.markedChildren.has(e.parent) &&
              this.domConverter.mapViewToDom(e.parent) &&
              this._updateText(e, { inlineFillerPosition: t })
          if (e)
            if (t) {
              const e = this.domConverter.viewPositionToDom(t),
                n = e.parent.ownerDocument
              Do(e.parent) ? (this._inlineFiller = e.parent) : (this._inlineFiller = Go(n, e.parent, e.offset))
            } else this._inlineFiller = null
          this._updateFocus(),
            this._updateSelection(),
            this.markedTexts.clear(),
            this.markedAttributes.clear(),
            this.markedChildren.clear()
        }
        _updateChildrenMappings(t) {
          const e = this.domConverter.mapViewToDom(t)
          if (!e) return
          const n = Array.from(this.domConverter.mapViewToDom(t).childNodes),
            i = Array.from(this.domConverter.viewChildrenToDom(t, e.ownerDocument, { withChildren: !1 })),
            s = this._diffNodeLists(n, i),
            o = this._findReplaceActions(s, n, i)
          if (-1 !== o.indexOf('replace')) {
            const e = { equal: 0, insert: 0, delete: 0 }
            for (const s of o)
              if ('replace' === s) {
                const s = e.equal + e.insert,
                  o = e.equal + e.delete,
                  r = t.getChild(s)
                !r || r.is('uiElement') || r.is('rawElement') || this._updateElementMappings(r, n[o]),
                  qo(i[s]),
                  e.equal++
              } else e[s]++
          }
        }
        _updateElementMappings(t, e) {
          this.domConverter.unbindDomElement(e),
            this.domConverter.bindElements(e, t),
            this.markedChildren.add(t),
            this.markedAttributes.add(t)
        }
        _getInlineFillerPosition() {
          const t = this.selection.getFirstPosition()
          return t.parent.is('$text') ? Ds._createBefore(this.selection.getFirstPosition().parent) : t
        }
        _isSelectionInInlineFiller() {
          if (1 != this.selection.rangeCount || !this.selection.isCollapsed) return !1
          const t = this.selection.getFirstPosition(),
            e = this.domConverter.viewPositionToDom(t)
          return !!(e && Ro(e.parent) && Do(e.parent))
        }
        _removeInlineFiller() {
          const t = this._inlineFiller
          if (!Do(t)) throw new c('view-renderer-filler-was-lost', this)
          Fo(t) ? t.remove() : (t.data = t.data.substr(7)), (this._inlineFiller = null)
        }
        _needsInlineFillerAtSelection() {
          if (1 != this.selection.rangeCount || !this.selection.isCollapsed) return !1
          const t = this.selection.getFirstPosition(),
            e = t.parent,
            n = t.offset
          if (!this.domConverter.mapViewToDom(e.root)) return !1
          if (!e.is('element')) return !1
          if (
            !(function (t) {
              if ('false' == t.getAttribute('contenteditable')) return !1
              const e = t.findAncestor(t => t.hasAttribute('contenteditable'))
              return !e || 'true' == e.getAttribute('contenteditable')
            })(e)
          )
            return !1
          if (n === e.getFillerOffset()) return !1
          const i = t.nodeBefore,
            s = t.nodeAfter
          return !(i instanceof Bi || s instanceof Bi)
        }
        _updateText(t, e) {
          const n = this.domConverter.findCorrespondingDomText(t),
            i = this.domConverter.viewToDom(t, n.ownerDocument),
            s = n.data
          let o = i.data
          const r = e.inlineFillerPosition
          if ((r && r.parent == t.parent && r.offset == t.index && (o = No + o), s != o)) {
            const t = Lo(s, o)
            for (const e of t)
              'insert' === e.type ? n.insertData(e.index, e.values.join('')) : n.deleteData(e.index, e.howMany)
          }
        }
        _updateAttrs(t) {
          const e = this.domConverter.mapViewToDom(t)
          if (!e) return
          const n = Array.from(e.attributes).map(t => t.name),
            i = t.getAttributeKeys()
          for (const n of i) this.domConverter.setDomElementAttribute(e, n, t.getAttribute(n), t)
          for (const i of n) t.hasAttribute(i) || this.domConverter.removeDomElementAttribute(e, i)
        }
        _updateChildren(t, e) {
          const n = this.domConverter.mapViewToDom(t)
          if (!n) return
          const i = e.inlineFillerPosition,
            s = this.domConverter.mapViewToDom(t).childNodes,
            o = Array.from(this.domConverter.viewChildrenToDom(t, n.ownerDocument, { bind: !0 }))
          i && i.parent === t && Go(n.ownerDocument, o, i.offset)
          const r = this._diffNodeLists(s, o)
          let a = 0
          const c = new Set()
          for (const t of r) 'delete' === t ? (c.add(s[a]), qo(s[a])) : 'equal' === t && a++
          a = 0
          for (const t of r)
            'insert' === t
              ? ($o(n, a, o[a]), a++)
              : 'equal' === t && (this._markDescendantTextToSync(this.domConverter.domToView(o[a])), a++)
          for (const t of c) t.parentNode || this.domConverter.unbindDomElement(t)
        }
        _diffNodeLists(t, e) {
          return zo(
            (t = (function (t, e) {
              const n = Array.from(t)
              if (0 == n.length || !e) return n
              n[n.length - 1] == e && n.pop()
              return n
            })(t, this._fakeSelectionContainer)),
            e,
            Yo.bind(null, this.domConverter)
          )
        }
        _findReplaceActions(t, e, n) {
          if (-1 === t.indexOf('insert') || -1 === t.indexOf('delete')) return t
          let i = [],
            s = [],
            o = []
          const r = { equal: 0, insert: 0, delete: 0 }
          for (const a of t)
            'insert' === a
              ? o.push(n[r.equal + r.insert])
              : 'delete' === a
              ? s.push(e[r.equal + r.delete])
              : ((i = i.concat(zo(s, o, Jo).map(t => ('equal' === t ? 'replace' : t)))),
                i.push('equal'),
                (s = []),
                (o = [])),
              r[a]++
          return i.concat(zo(s, o, Jo).map(t => ('equal' === t ? 'replace' : t)))
        }
        _markDescendantTextToSync(t) {
          if (t)
            if (t.is('$text')) this.markedTexts.add(t)
            else if (t.is('element')) for (const e of t.getChildren()) this._markDescendantTextToSync(e)
        }
        _updateSelection() {
          if (no.isBlink && !no.isAndroid && this.isSelecting && !this.markedChildren.size) return
          if (0 === this.selection.rangeCount) return this._removeDomSelection(), void this._removeFakeSelection()
          const t = this.domConverter.mapViewToDom(this.selection.editableElement)
          this.isFocused &&
            t &&
            (this.selection.isFake
              ? this._updateFakeSelection(t)
              : (this._removeFakeSelection(), this._updateDomSelection(t)))
        }
        _updateFakeSelection(t) {
          const e = t.ownerDocument
          this._fakeSelectionContainer ||
            (this._fakeSelectionContainer = (function (t) {
              const e = t.createElement('div')
              return (
                (e.className = 'ck-fake-selection-container'),
                Object.assign(e.style, { position: 'fixed', top: 0, left: '-9999px', width: '42px' }),
                (e.textContent = ' '),
                e
              )
            })(e))
          const n = this._fakeSelectionContainer
          if ((this.domConverter.bindFakeSelection(n, this.selection), !this._fakeSelectionNeedsUpdate(t))) return
          ;(n.parentElement && n.parentElement == t) || t.appendChild(n),
            (n.textContent = this.selection.fakeSelectionLabel || ' ')
          const i = e.getSelection(),
            s = e.createRange()
          i.removeAllRanges(), s.selectNodeContents(n), i.addRange(s)
        }
        _updateDomSelection(t) {
          const e = t.ownerDocument.defaultView.getSelection()
          if (!this._domSelectionNeedsUpdate(e)) return
          const n = this.domConverter.viewPositionToDom(this.selection.anchor),
            i = this.domConverter.viewPositionToDom(this.selection.focus)
          e.collapse(n.parent, n.offset),
            e.extend(i.parent, i.offset),
            no.isGecko &&
              (function (t, e) {
                const n = t.parent
                if (n.nodeType != Node.ELEMENT_NODE || t.offset != n.childNodes.length - 1) return
                const i = n.childNodes[t.offset]
                i && 'BR' == i.tagName && e.addRange(e.getRangeAt(0))
              })(i, e)
        }
        _domSelectionNeedsUpdate(t) {
          if (!this.domConverter.isDomSelectionCorrect(t)) return !0
          const e = t && this.domConverter.domSelectionToView(t)
          return (!e || !this.selection.isEqual(e)) && !(!this.selection.isCollapsed && this.selection.isSimilar(e))
        }
        _fakeSelectionNeedsUpdate(t) {
          const e = this._fakeSelectionContainer,
            n = t.ownerDocument.getSelection()
          return (
            !e ||
            e.parentElement !== t ||
            (n.anchorNode !== e && !e.contains(n.anchorNode)) ||
            e.textContent !== this.selection.fakeSelectionLabel
          )
        }
        _removeDomSelection() {
          for (const t of this.domDocuments) {
            if (t.getSelection().rangeCount) {
              const e = t.activeElement,
                n = this.domConverter.mapDomToView(e)
              e && n && t.getSelection().removeAllRanges()
            }
          }
        }
        _removeFakeSelection() {
          const t = this._fakeSelectionContainer
          t && t.remove()
        }
        _updateFocus() {
          if (this.isFocused) {
            const t = this.selection.editableElement
            t && this.domConverter.focus(t)
          }
        }
      }
      function Go(t, e, n) {
        const i = e instanceof Array ? e : e.childNodes,
          s = i[n]
        if (Ro(s)) return (s.data = No + s.data), s
        {
          const s = t.createTextNode(No)
          return Array.isArray(e) ? i.splice(n, 0, s) : $o(e, n, s), s
        }
      }
      function Jo(t, e) {
        return (
          Ho(t) && Ho(e) && !Ro(t) && !Ro(e) && !Uo(t) && !Uo(e) && t.tagName.toLowerCase() === e.tagName.toLowerCase()
        )
      }
      function Yo(t, e, n) {
        return e === n || (Ro(e) && Ro(n) ? e.data === n.data : !(!t.isBlockFiller(e) || !t.isBlockFiller(n)))
      }
      he(Ko, se)
      const Xo = { window, document }
      function Zo(t) {
        let e = 0
        for (; t.previousSibling; ) (t = t.previousSibling), e++
        return e
      }
      function Qo(t) {
        const e = []
        for (; t && t.nodeType != Node.DOCUMENT_NODE; ) e.unshift(t), (t = t.parentNode)
        return e
      }
      const tr = Mo(document),
        er = Oo(document),
        nr = Io(document),
        ir = 'data-ck-unsafe-attribute-',
        sr = 'data-ck-unsafe-element',
        or = ['script', 'style']
      class rr {
        constructor(t, e = {}) {
          ;(this.document = t),
            (this.renderingMode = e.renderingMode || 'editing'),
            (this.blockFillerMode = e.blockFillerMode || ('editing' === this.renderingMode ? 'br' : 'nbsp')),
            (this.preElements = ['pre']),
            (this.blockElements = [
              'address',
              'article',
              'aside',
              'blockquote',
              'caption',
              'center',
              'dd',
              'details',
              'dir',
              'div',
              'dl',
              'dt',
              'fieldset',
              'figcaption',
              'figure',
              'footer',
              'form',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'header',
              'hgroup',
              'legend',
              'li',
              'main',
              'menu',
              'nav',
              'ol',
              'p',
              'pre',
              'section',
              'summary',
              'table',
              'tbody',
              'td',
              'tfoot',
              'th',
              'thead',
              'tr',
              'ul',
            ]),
            (this.inlineObjectElements = [
              'object',
              'iframe',
              'input',
              'button',
              'textarea',
              'select',
              'option',
              'video',
              'embed',
              'audio',
              'img',
              'canvas',
            ]),
            (this._domToViewMapping = new WeakMap()),
            (this._viewToDomMapping = new WeakMap()),
            (this._fakeSelectionMapping = new WeakMap()),
            (this._rawContentElementMatcher = new ji()),
            (this._encounteredRawContentDomNodes = new WeakSet())
        }
        bindFakeSelection(t, e) {
          this._fakeSelectionMapping.set(t, new Ls(e))
        }
        fakeSelectionToView(t) {
          return this._fakeSelectionMapping.get(t)
        }
        bindElements(t, e) {
          this._domToViewMapping.set(t, e), this._viewToDomMapping.set(e, t)
        }
        unbindDomElement(t) {
          const e = this._domToViewMapping.get(t)
          if (e) {
            this._domToViewMapping.delete(t), this._viewToDomMapping.delete(e)
            for (const e of t.childNodes) this.unbindDomElement(e)
          }
        }
        bindDocumentFragments(t, e) {
          this._domToViewMapping.set(t, e), this._viewToDomMapping.set(e, t)
        }
        shouldRenderAttribute(t, e, n) {
          return (
            'data' === this.renderingMode ||
            (!(t = t.toLowerCase()).startsWith('on') &&
              ('srcdoc' !== t || !e.match(/\bon\S+\s*=|javascript:|<\s*\/*script/i)) &&
              (('img' === n && ('src' === t || 'srcset' === t)) ||
                ('source' === n && 'srcset' === t) ||
                !e.match(/^\s*(javascript:|data:(image\/svg|text\/x?html))/i)))
          )
        }
        setContentOf(t, e) {
          if ('data' === this.renderingMode) return void (t.innerHTML = e)
          const n = new DOMParser().parseFromString(e, 'text/html'),
            i = n.createDocumentFragment(),
            s = n.body.childNodes
          for (; s.length > 0; ) i.appendChild(s[0])
          const o = n.createTreeWalker(i, NodeFilter.SHOW_ELEMENT),
            r = []
          let a
          for (; (a = o.nextNode()); ) r.push(a)
          for (const t of r) {
            for (const e of t.getAttributeNames()) this.setDomElementAttribute(t, e, t.getAttribute(e))
            const e = t.tagName.toLowerCase()
            this._shouldRenameElement(e) && (lr(e), t.replaceWith(this._createReplacementDomElement(e, t)))
          }
          for (; t.firstChild; ) t.firstChild.remove()
          t.append(i)
        }
        viewToDom(t, e, n = {}) {
          if (t.is('$text')) {
            const n = this._processDataFromViewText(t)
            return e.createTextNode(n)
          }
          {
            if (this.mapViewToDom(t)) return this.mapViewToDom(t)
            let i
            if (t.is('documentFragment')) (i = e.createDocumentFragment()), n.bind && this.bindDocumentFragments(i, t)
            else {
              if (t.is('uiElement'))
                return (
                  (i = '$comment' === t.name ? e.createComment(t.getCustomProperty('$rawContent')) : t.render(e, this)),
                  n.bind && this.bindElements(i, t),
                  i
                )
              this._shouldRenameElement(t.name)
                ? (lr(t.name), (i = this._createReplacementDomElement(t.name)))
                : (i = t.hasAttribute('xmlns')
                    ? e.createElementNS(t.getAttribute('xmlns'), t.name)
                    : e.createElement(t.name)),
                t.is('rawElement') && t.render(i, this),
                n.bind && this.bindElements(i, t)
              for (const e of t.getAttributeKeys()) this.setDomElementAttribute(i, e, t.getAttribute(e), t)
            }
            if (!1 !== n.withChildren) for (const s of this.viewChildrenToDom(t, e, n)) i.appendChild(s)
            return i
          }
        }
        setDomElementAttribute(t, e, n, i = null) {
          const s = this.shouldRenderAttribute(e, n, t.tagName.toLowerCase()) || (i && i.shouldRenderUnsafeAttribute(e))
          s || l('domconverter-unsafe-attribute-detected', { domElement: t, key: e, value: n }),
            t.hasAttribute(e) && !s ? t.removeAttribute(e) : t.hasAttribute(ir + e) && s && t.removeAttribute(ir + e),
            t.setAttribute(s ? e : ir + e, n)
        }
        removeDomElementAttribute(t, e) {
          e != sr && (t.removeAttribute(e), t.removeAttribute(ir + e))
        }
        *viewChildrenToDom(t, e, n = {}) {
          const i = t.getFillerOffset && t.getFillerOffset()
          let s = 0
          for (const o of t.getChildren()) {
            i === s && (yield this._getBlockFiller(e))
            const t = o.is('element') && o.getCustomProperty('dataPipeline:transparentRendering')
            t && 'data' == this.renderingMode
              ? yield* this.viewChildrenToDom(o, e, n)
              : (t && l('domconverter-transparent-rendering-unsupported-in-editing-pipeline', { viewElement: o }),
                yield this.viewToDom(o, e, n)),
              s++
          }
          i === s && (yield this._getBlockFiller(e))
        }
        viewRangeToDom(t) {
          const e = this.viewPositionToDom(t.start),
            n = this.viewPositionToDom(t.end),
            i = document.createRange()
          return i.setStart(e.parent, e.offset), i.setEnd(n.parent, n.offset), i
        }
        viewPositionToDom(t) {
          const e = t.parent
          if (e.is('$text')) {
            const n = this.findCorrespondingDomText(e)
            if (!n) return null
            let i = t.offset
            return Do(n) && (i += 7), { parent: n, offset: i }
          }
          {
            let n, i, s
            if (0 === t.offset) {
              if (((n = this.mapViewToDom(e)), !n)) return null
              s = n.childNodes[0]
            } else {
              const e = t.nodeBefore
              if (((i = e.is('$text') ? this.findCorrespondingDomText(e) : this.mapViewToDom(t.nodeBefore)), !i))
                return null
              ;(n = i.parentNode), (s = i.nextSibling)
            }
            if (Ro(s) && Do(s)) return { parent: s, offset: 7 }
            return { parent: n, offset: i ? Zo(i) + 1 : 0 }
          }
        }
        domToView(t, e = {}) {
          if (this.isBlockFiller(t)) return null
          const n = this.getHostViewElement(t)
          if (n) return n
          if (Uo(t) && e.skipComments) return null
          if (Ro(t)) {
            if (Fo(t)) return null
            {
              const e = this._processDataFromDomText(t)
              return '' === e ? null : new Bi(this.document, e)
            }
          }
          {
            if (this.mapDomToView(t)) return this.mapDomToView(t)
            let n
            if (this.isDocumentFragment(t)) (n = new wo(this.document)), e.bind && this.bindDocumentFragments(t, n)
            else {
              ;(n = this._createViewElement(t, e)), e.bind && this.bindElements(t, n)
              const i = t.attributes
              if (i) for (let t = i.length - 1; t >= 0; t--) n._setAttribute(i[t].name, i[t].value)
              if (this._isViewElementWithRawContent(n, e) || Uo(t)) {
                const e = Uo(t) ? t.data : t.innerHTML
                return n._setCustomProperty('$rawContent', e), this._encounteredRawContentDomNodes.add(t), n
              }
            }
            if (!1 !== e.withChildren) for (const i of this.domChildrenToView(t, e)) n._appendChild(i)
            return n
          }
        }
        *domChildrenToView(t, e = {}) {
          for (let n = 0; n < t.childNodes.length; n++) {
            const i = t.childNodes[n],
              s = this.domToView(i, e)
            null !== s && (yield s)
          }
        }
        domSelectionToView(t) {
          if (1 === t.rangeCount) {
            let e = t.getRangeAt(0).startContainer
            Ro(e) && (e = e.parentNode)
            const n = this.fakeSelectionToView(e)
            if (n) return n
          }
          const e = this.isDomSelectionBackward(t),
            n = []
          for (let e = 0; e < t.rangeCount; e++) {
            const i = t.getRangeAt(e),
              s = this.domRangeToView(i)
            s && n.push(s)
          }
          return new Ls(n, { backward: e })
        }
        domRangeToView(t) {
          const e = this.domPositionToView(t.startContainer, t.startOffset),
            n = this.domPositionToView(t.endContainer, t.endOffset)
          return e && n ? new Fs(e, n) : null
        }
        domPositionToView(t, e = 0) {
          if (this.isBlockFiller(t)) return this.domPositionToView(t.parentNode, Zo(t))
          const n = this.mapDomToView(t)
          if (n && (n.is('uiElement') || n.is('rawElement'))) return Ds._createBefore(n)
          if (Ro(t)) {
            if (Fo(t)) return this.domPositionToView(t.parentNode, Zo(t))
            const n = this.findCorrespondingViewText(t)
            let i = e
            return n ? (Do(t) && ((i -= 7), (i = i < 0 ? 0 : i)), new Ds(n, i)) : null
          }
          if (0 === e) {
            const e = this.mapDomToView(t)
            if (e) return new Ds(e, 0)
          } else {
            const n = t.childNodes[e - 1],
              i = Ro(n) ? this.findCorrespondingViewText(n) : this.mapDomToView(n)
            if (i && i.parent) return new Ds(i.parent, i.index + 1)
          }
          return null
        }
        mapDomToView(t) {
          return this.getHostViewElement(t) || this._domToViewMapping.get(t)
        }
        findCorrespondingViewText(t) {
          if (Fo(t)) return null
          const e = this.getHostViewElement(t)
          if (e) return e
          const n = t.previousSibling
          if (n) {
            if (!this.isElement(n)) return null
            const t = this.mapDomToView(n)
            if (t) {
              return t.nextSibling instanceof Bi ? t.nextSibling : null
            }
          } else {
            const e = this.mapDomToView(t.parentNode)
            if (e) {
              const t = e.getChild(0)
              return t instanceof Bi ? t : null
            }
          }
          return null
        }
        mapViewToDom(t) {
          return this._viewToDomMapping.get(t)
        }
        findCorrespondingDomText(t) {
          const e = t.previousSibling
          return e && this.mapViewToDom(e)
            ? this.mapViewToDom(e).nextSibling
            : !e && t.parent && this.mapViewToDom(t.parent)
            ? this.mapViewToDom(t.parent).childNodes[0]
            : null
        }
        focus(t) {
          const e = this.mapViewToDom(t)
          if (e && e.ownerDocument.activeElement !== e) {
            const { scrollX: t, scrollY: n } = Xo.window,
              i = []
            ar(e, t => {
              const { scrollLeft: e, scrollTop: n } = t
              i.push([e, n])
            }),
              e.focus(),
              ar(e, t => {
                const [e, n] = i.shift()
                ;(t.scrollLeft = e), (t.scrollTop = n)
              }),
              Xo.window.scrollTo(t, n)
          }
        }
        isElement(t) {
          return t && t.nodeType == Node.ELEMENT_NODE
        }
        isDocumentFragment(t) {
          return t && t.nodeType == Node.DOCUMENT_FRAGMENT_NODE
        }
        isBlockFiller(t) {
          return 'br' == this.blockFillerMode
            ? t.isEqualNode(tr)
            : !('BR' !== t.tagName || !cr(t, this.blockElements) || 1 !== t.parentNode.childNodes.length) ||
                t.isEqualNode(nr) ||
                (function (t, e) {
                  return t.isEqualNode(er) && cr(t, e) && 1 === t.parentNode.childNodes.length
                })(t, this.blockElements)
        }
        isDomSelectionBackward(t) {
          if (t.isCollapsed) return !1
          const e = document.createRange()
          e.setStart(t.anchorNode, t.anchorOffset), e.setEnd(t.focusNode, t.focusOffset)
          const n = e.collapsed
          return e.detach(), n
        }
        getHostViewElement(t) {
          const e = Qo(t)
          for (e.pop(); e.length; ) {
            const t = e.pop(),
              n = this._domToViewMapping.get(t)
            if (n && (n.is('uiElement') || n.is('rawElement'))) return n
          }
          return null
        }
        isDomSelectionCorrect(t) {
          return (
            this._isDomSelectionPositionCorrect(t.anchorNode, t.anchorOffset) &&
            this._isDomSelectionPositionCorrect(t.focusNode, t.focusOffset)
          )
        }
        registerRawContentMatcher(t) {
          this._rawContentElementMatcher.add(t)
        }
        _getBlockFiller(t) {
          switch (this.blockFillerMode) {
            case 'nbsp':
              return Oo(t)
            case 'markedNbsp':
              return Io(t)
            case 'br':
              return Mo(t)
          }
        }
        _isDomSelectionPositionCorrect(t, e) {
          if (Ro(t) && Do(t) && e < 7) return !1
          if (this.isElement(t) && Do(t.childNodes[e])) return !1
          const n = this.mapDomToView(t)
          return !n || (!n.is('uiElement') && !n.is('rawElement'))
        }
        _processDataFromViewText(t) {
          let e = t.data
          if (t.getAncestors().some(t => this.preElements.includes(t.name))) return e
          if (' ' == e.charAt(0)) {
            const n = this._getTouchingInlineViewNode(t, !1)
            ;(!(n && n.is('$textProxy') && this._nodeEndsWithSpace(n)) && n) || (e = ' ' + e.substr(1))
          }
          if (' ' == e.charAt(e.length - 1)) {
            const n = this._getTouchingInlineViewNode(t, !0),
              i = n && n.is('$textProxy') && ' ' == n.data.charAt(0)
            ;(' ' != e.charAt(e.length - 2) && n && !i) || (e = e.substr(0, e.length - 1) + ' ')
          }
          return e.replace(/ {2}/g, '  ')
        }
        _nodeEndsWithSpace(t) {
          if (t.getAncestors().some(t => this.preElements.includes(t.name))) return !1
          const e = this._processDataFromViewText(t)
          return ' ' == e.charAt(e.length - 1)
        }
        _processDataFromDomText(t) {
          let e = t.data
          if (
            (function (t, e) {
              return Qo(t).some(t => t.tagName && e.includes(t.tagName.toLowerCase()))
            })(t, this.preElements)
          )
            return Bo(t)
          e = e.replace(/[ \n\t\r]{1,}/g, ' ')
          const n = this._getTouchingInlineDomNode(t, !1),
            i = this._getTouchingInlineDomNode(t, !0),
            s = this._checkShouldLeftTrimDomText(t, n),
            o = this._checkShouldRightTrimDomText(t, i)
          s && (e = e.replace(/^ /, '')),
            o && (e = e.replace(/ $/, '')),
            (e = Bo(new Text(e))),
            (e = e.replace(/ \u00A0/g, '  '))
          const r = i && this.isElement(i) && 'BR' != i.tagName,
            a = i && Ro(i) && ' ' == i.data.charAt(0)
          return (
            (/( |\u00A0)\u00A0$/.test(e) || !i || r || a) && (e = e.replace(/\u00A0$/, ' ')),
            (s || (n && this.isElement(n) && 'BR' != n.tagName)) && (e = e.replace(/^\u00A0/, ' ')),
            e
          )
        }
        _checkShouldLeftTrimDomText(t, e) {
          return (
            !e ||
            (this.isElement(e)
              ? 'BR' === e.tagName
              : !this._encounteredRawContentDomNodes.has(t.previousSibling) &&
                /[^\S\u00A0]/.test(e.data.charAt(e.data.length - 1)))
          )
        }
        _checkShouldRightTrimDomText(t, e) {
          return !e && !Do(t)
        }
        _getTouchingInlineViewNode(t, e) {
          const n = new Ns({
            startPosition: e ? Ds._createAfter(t) : Ds._createBefore(t),
            direction: e ? 'forward' : 'backward',
          })
          for (const t of n) {
            if (t.item.is('element') && this.inlineObjectElements.includes(t.item.name)) return t.item
            if (t.item.is('containerElement')) return null
            if (t.item.is('element', 'br')) return null
            if (t.item.is('$textProxy')) return t.item
          }
          return null
        }
        _getTouchingInlineDomNode(t, e) {
          if (!t.parentNode) return null
          const n = e ? 'firstChild' : 'lastChild',
            i = e ? 'nextSibling' : 'previousSibling'
          let s = !0
          do {
            if (
              (!s && t[n] ? (t = t[n]) : t[i] ? ((t = t[i]), (s = !1)) : ((t = t.parentNode), (s = !0)),
              !t || this._isBlockElement(t))
            )
              return null
          } while (!Ro(t) && 'BR' != t.tagName && !this._isInlineObjectElement(t))
          return t
        }
        _isBlockElement(t) {
          return this.isElement(t) && this.blockElements.includes(t.tagName.toLowerCase())
        }
        _isInlineObjectElement(t) {
          return this.isElement(t) && this.inlineObjectElements.includes(t.tagName.toLowerCase())
        }
        _createViewElement(t, e) {
          if (Uo(t)) return new fo(this.document, '$comment')
          const n = e.keepOriginalCase ? t.tagName : t.tagName.toLowerCase()
          return new Ss(this.document, n)
        }
        _isViewElementWithRawContent(t, e) {
          return !1 !== e.withChildren && this._rawContentElementMatcher.match(t)
        }
        _shouldRenameElement(t) {
          const e = t.toLowerCase()
          return 'editing' === this.renderingMode && or.includes(e)
        }
        _createReplacementDomElement(t, e = null) {
          const n = document.createElement('span')
          if ((n.setAttribute(sr, t), e)) {
            for (; e.firstChild; ) n.appendChild(e.firstChild)
            for (const t of e.getAttributeNames()) n.setAttribute(t, e.getAttribute(t))
          }
          return n
        }
      }
      function ar(t, e) {
        for (; t && t != Xo.document; ) e(t), (t = t.parentNode)
      }
      function cr(t, e) {
        const n = t.parentNode
        return n && n.tagName && e.includes(n.tagName.toLowerCase())
      }
      function lr(t) {
        'script' === t && l('domconverter-unsafe-script-element-detected'),
          'style' === t && l('domconverter-unsafe-style-element-detected')
      }
      function hr(t) {
        const e = Object.prototype.toString.apply(t)
        return '[object Window]' == e || '[object global]' == e
      }
      const dr = Xt({}, p, {
        listenTo(t, e, n, i = {}) {
          if (Ho(t) || hr(t)) {
            const s = { capture: !!i.useCapture, passive: !!i.usePassive },
              o = this._getProxyEmitter(t, s) || new ur(t, s)
            this.listenTo(o, e, n, i)
          } else p.listenTo.call(this, t, e, n, i)
        },
        stopListening(t, e, n) {
          if (Ho(t) || hr(t)) {
            const i = this._getAllProxyEmitters(t)
            for (const t of i) this.stopListening(t, e, n)
          } else p.stopListening.call(this, t, e, n)
        },
        _getProxyEmitter(t, e) {
          return (n = this), (i = fr(t, e)), n[m] && n[m][i] ? n[m][i].emitter : null
          var n, i
        },
        _getAllProxyEmitters(t) {
          return [
            { capture: !1, passive: !1 },
            { capture: !1, passive: !0 },
            { capture: !0, passive: !1 },
            { capture: !0, passive: !0 },
          ]
            .map(e => this._getProxyEmitter(t, e))
            .filter(t => !!t)
        },
      })
      class ur {
        constructor(t, e) {
          _(this, fr(t, e)), (this._domNode = t), (this._options = e)
        }
      }
      function fr(t, e) {
        let n = (function (t) {
          return t['data-ck-expando'] || (t['data-ck-expando'] = o())
        })(t)
        for (const t of Object.keys(e).sort()) e[t] && (n += '-' + t)
        return n
      }
      Xt(ur.prototype, p, {
        attach(t) {
          if (this._domListeners && this._domListeners[t]) return
          const e = this._createDomListener(t)
          this._domNode.addEventListener(t, e, this._options),
            this._domListeners || (this._domListeners = {}),
            (this._domListeners[t] = e)
        },
        detach(t) {
          let e
          !this._domListeners[t] ||
            ((e = this._events[t]) && e.callbacks.length) ||
            this._domListeners[t].removeListener()
        },
        _addEventListener(t, e, n) {
          this.attach(t), p._addEventListener.call(this, t, e, n)
        },
        _removeEventListener(t, e) {
          p._removeEventListener.call(this, t, e), this.detach(t)
        },
        _createDomListener(t) {
          const e = e => {
            this.fire(t, e)
          }
          return (
            (e.removeListener = () => {
              this._domNode.removeEventListener(t, e, this._options), delete this._domListeners[t]
            }),
            e
          )
        },
      })
      class mr {
        constructor(t) {
          ;(this.view = t), (this.document = t.document), (this.isEnabled = !1)
        }
        enable() {
          this.isEnabled = !0
        }
        disable() {
          this.isEnabled = !1
        }
        destroy() {
          this.disable(), this.stopListening()
        }
        checkShouldIgnoreEventFromTarget(t) {
          return (
            t && 3 === t.nodeType && (t = t.parentNode),
            !(!t || 1 !== t.nodeType) && t.matches('[data-cke-ignore-events], [data-cke-ignore-events] *')
          )
        }
      }
      he(mr, dr)
      const gr = function (t) {
        return this.__data__.set(t, '__lodash_hash_undefined__'), this
      }
      const pr = function (t) {
        return this.__data__.has(t)
      }
      function _r(t) {
        var e = -1,
          n = null == t ? 0 : t.length
        for (this.__data__ = new en(); ++e < n; ) this.add(t[e])
      }
      ;(_r.prototype.add = _r.prototype.push = gr), (_r.prototype.has = pr)
      const wr = _r
      const br = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length; ++n < i; ) if (e(t[n], n, t)) return !0
        return !1
      }
      const yr = function (t, e) {
        return t.has(e)
      }
      const vr = function (t, e, n, i, s, o) {
        var r = 1 & n,
          a = t.length,
          c = e.length
        if (a != c && !(r && c > a)) return !1
        var l = o.get(t),
          h = o.get(e)
        if (l && h) return l == e && h == t
        var d = -1,
          u = !0,
          f = 2 & n ? new wr() : void 0
        for (o.set(t, e), o.set(e, t); ++d < a; ) {
          var m = t[d],
            g = e[d]
          if (i) var p = r ? i(g, m, d, e, t, o) : i(m, g, d, t, e, o)
          if (void 0 !== p) {
            if (p) continue
            u = !1
            break
          }
          if (f) {
            if (
              !br(e, function (t, e) {
                if (!yr(f, e) && (m === t || s(m, t, n, i, o))) return f.push(e)
              })
            ) {
              u = !1
              break
            }
          } else if (m !== g && !s(m, g, n, i, o)) {
            u = !1
            break
          }
        }
        return o.delete(t), o.delete(e), u
      }
      const Pr = function (t) {
        var e = -1,
          n = Array(t.size)
        return (
          t.forEach(function (t, i) {
            n[++e] = [i, t]
          }),
          n
        )
      }
      const kr = function (t) {
        var e = -1,
          n = Array(t.size)
        return (
          t.forEach(function (t) {
            n[++e] = t
          }),
          n
        )
      }
      var Ar = x ? x.prototype : void 0,
        Cr = Ar ? Ar.valueOf : void 0
      const Er = function (t, e, n, i, s, o, r) {
        switch (n) {
          case '[object DataView]':
            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1
            ;(t = t.buffer), (e = e.buffer)
          case '[object ArrayBuffer]':
            return !(t.byteLength != e.byteLength || !o(new Jn(t), new Jn(e)))
          case '[object Boolean]':
          case '[object Date]':
          case '[object Number]':
            return et(+t, +e)
          case '[object Error]':
            return t.name == e.name && t.message == e.message
          case '[object RegExp]':
          case '[object String]':
            return t == e + ''
          case '[object Map]':
            var a = Pr
          case '[object Set]':
            var c = 1 & i
            if ((a || (a = kr), t.size != e.size && !c)) return !1
            var l = r.get(t)
            if (l) return l == e
            ;(i |= 2), r.set(t, e)
            var h = vr(a(t), a(e), i, s, o, r)
            return r.delete(t), h
          case '[object Symbol]':
            if (Cr) return Cr.call(t) == Cr.call(e)
        }
        return !1
      }
      var Sr = Object.prototype.hasOwnProperty
      const xr = function (t, e, n, i, s, o) {
        var r = 1 & n,
          a = Tn(t),
          c = a.length
        if (c != Tn(e).length && !r) return !1
        for (var l = c; l--; ) {
          var h = a[l]
          if (!(r ? h in e : Sr.call(e, h))) return !1
        }
        var d = o.get(t),
          u = o.get(e)
        if (d && u) return d == e && u == t
        var f = !0
        o.set(t, e), o.set(e, t)
        for (var m = r; ++l < c; ) {
          var g = t[(h = a[l])],
            p = e[h]
          if (i) var _ = r ? i(p, g, h, e, t, o) : i(g, p, h, t, e, o)
          if (!(void 0 === _ ? g === p || s(g, p, n, i, o) : _)) {
            f = !1
            break
          }
          m || (m = 'constructor' == h)
        }
        if (f && !m) {
          var w = t.constructor,
            b = e.constructor
          w == b ||
            !('constructor' in t) ||
            !('constructor' in e) ||
            ('function' == typeof w && w instanceof w && 'function' == typeof b && b instanceof b) ||
            (f = !1)
        }
        return o.delete(t), o.delete(e), f
      }
      var Tr = '[object Arguments]',
        Rr = '[object Array]',
        Or = '[object Object]',
        Ir = Object.prototype.hasOwnProperty
      const Mr = function (t, e, n, i, s, o) {
        var r = xt(t),
          a = xt(e),
          c = r ? Rr : Hn(t),
          l = a ? Rr : Hn(e),
          h = (c = c == Tr ? Or : c) == Or,
          d = (l = l == Tr ? Or : l) == Or,
          u = c == l
        if (u && Mt(t)) {
          if (!Mt(e)) return !1
          ;(r = !0), (h = !1)
        }
        if (u && !h) return o || (o = new on()), r || zt(t) ? vr(t, e, n, i, s, o) : Er(t, e, c, n, i, s, o)
        if (!(1 & n)) {
          var f = h && Ir.call(t, '__wrapped__'),
            m = d && Ir.call(e, '__wrapped__')
          if (f || m) {
            var g = f ? t.value() : t,
              p = m ? e.value() : e
            return o || (o = new on()), s(g, p, n, i, o)
          }
        }
        return !!u && (o || (o = new on()), xr(t, e, n, i, s, o))
      }
      const Nr = function t(e, n, i, s, o) {
        return e === n || (null == e || null == n || (!Pt(e) && !Pt(n)) ? e != e && n != n : Mr(e, n, i, s, t, o))
      }
      const Dr = function (t, e, n) {
        var i = (n = 'function' == typeof n ? n : void 0) ? n(t, e) : void 0
        return void 0 === i ? Nr(t, e, void 0, n) : !!i
      }
      class Fr extends mr {
        constructor(t) {
          super(t),
            (this._config = { childList: !0, characterData: !0, characterDataOldValue: !0, subtree: !0 }),
            (this.domConverter = t.domConverter),
            (this.renderer = t._renderer),
            (this._domElements = []),
            (this._mutationObserver = new window.MutationObserver(this._onMutations.bind(this)))
        }
        flush() {
          this._onMutations(this._mutationObserver.takeRecords())
        }
        observe(t) {
          this._domElements.push(t), this.isEnabled && this._mutationObserver.observe(t, this._config)
        }
        enable() {
          super.enable()
          for (const t of this._domElements) this._mutationObserver.observe(t, this._config)
        }
        disable() {
          super.disable(), this._mutationObserver.disconnect()
        }
        destroy() {
          super.destroy(), this._mutationObserver.disconnect()
        }
        _onMutations(t) {
          if (0 === t.length) return
          const e = this.domConverter,
            n = new Map(),
            i = new Set()
          for (const n of t)
            if ('childList' === n.type) {
              const t = e.mapDomToView(n.target)
              if (t && (t.is('uiElement') || t.is('rawElement'))) continue
              t && !this._isBogusBrMutation(n) && i.add(t)
            }
          for (const s of t) {
            const t = e.mapDomToView(s.target)
            if ((!t || (!t.is('uiElement') && !t.is('rawElement'))) && 'characterData' === s.type) {
              const t = e.findCorrespondingViewText(s.target)
              t && !i.has(t.parent)
                ? n.set(t, { type: 'text', oldText: t.data, newText: Bo(s.target), node: t })
                : !t && Do(s.target) && i.add(e.mapDomToView(s.target.parentNode))
            }
          }
          const s = []
          for (const t of n.values()) this.renderer.markToSync('text', t.node), s.push(t)
          for (const t of i) {
            const n = e.mapViewToDom(t),
              i = Array.from(t.getChildren()),
              o = Array.from(e.domChildrenToView(n, { withChildren: !1 }))
            Dr(i, o, a) ||
              (this.renderer.markToSync('children', t),
              s.push({ type: 'children', oldChildren: i, newChildren: o, node: t }))
          }
          const o = t[0].target.ownerDocument.getSelection()
          let r = null
          if (o && o.anchorNode) {
            const t = e.domPositionToView(o.anchorNode, o.anchorOffset),
              n = e.domPositionToView(o.focusNode, o.focusOffset)
            t && n && ((r = new Ls(t)), r.setFocus(n))
          }
          function a(t, e) {
            if (!Array.isArray(t)) return t === e || (!(!t.is('$text') || !e.is('$text')) && t.data === e.data)
          }
          s.length && (this.document.fire('mutations', s, r), this.view.forceRender())
        }
        _isBogusBrMutation(t) {
          let e = null
          return (
            null === t.nextSibling &&
              0 === t.removedNodes.length &&
              1 == t.addedNodes.length &&
              (e = this.domConverter.domToView(t.addedNodes[0], { withChildren: !1 })),
            e && e.is('element', 'br')
          )
        }
      }
      class Br {
        constructor(t, e, n) {
          ;(this.view = t), (this.document = t.document), (this.domEvent = e), (this.domTarget = e.target), Xt(this, n)
        }
        get target() {
          return this.view.domConverter.mapDomToView(this.domTarget)
        }
        preventDefault() {
          this.domEvent.preventDefault()
        }
        stopPropagation() {
          this.domEvent.stopPropagation()
        }
      }
      class Vr extends mr {
        constructor(t) {
          super(t), (this.useCapture = !1)
        }
        observe(t) {
          ;('string' == typeof this.domEventType ? [this.domEventType] : this.domEventType).forEach(e => {
            this.listenTo(
              t,
              e,
              (t, e) => {
                this.isEnabled && !this.checkShouldIgnoreEventFromTarget(e.target) && this.onDomEvent(e)
              },
              { useCapture: this.useCapture }
            )
          })
        }
        fire(t, e, n) {
          this.isEnabled && this.document.fire(t, new Br(this.view, e, n))
        }
      }
      class Lr extends Vr {
        constructor(t) {
          super(t), (this.domEventType = ['keydown', 'keyup'])
        }
        onDomEvent(t) {
          this.fire(t.type, t, {
            keyCode: t.keyCode,
            altKey: t.altKey,
            ctrlKey: t.ctrlKey,
            shiftKey: t.shiftKey,
            metaKey: t.metaKey,
            get keystroke() {
              return co(this)
            },
          })
        }
      }
      const jr = function () {
        return S.Date.now()
      }
      var Wr = /\s/
      const zr = function (t) {
        for (var e = t.length; e-- && Wr.test(t.charAt(e)); );
        return e
      }
      var $r = /^\s+/
      const qr = function (t) {
        return t ? t.slice(0, zr(t) + 1).replace($r, '') : t
      }
      var Ur = /^[-+]0x[0-9a-f]+$/i,
        Hr = /^0b[01]+$/i,
        Kr = /^0o[0-7]+$/i,
        Gr = parseInt
      const Jr = function (t) {
        if ('number' == typeof t) return t
        if ($i(t)) return NaN
        if (A(t)) {
          var e = 'function' == typeof t.valueOf ? t.valueOf() : t
          t = A(e) ? e + '' : e
        }
        if ('string' != typeof t) return 0 === t ? t : +t
        t = qr(t)
        var n = Hr.test(t)
        return n || Kr.test(t) ? Gr(t.slice(2), n ? 2 : 8) : Ur.test(t) ? NaN : +t
      }
      var Yr = Math.max,
        Xr = Math.min
      const Zr = function (t, e, n) {
        var i,
          s,
          o,
          r,
          a,
          c,
          l = 0,
          h = !1,
          d = !1,
          u = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function f(e) {
          var n = i,
            o = s
          return (i = s = void 0), (l = e), (r = t.apply(o, n))
        }
        function m(t) {
          return (l = t), (a = setTimeout(p, e)), h ? f(t) : r
        }
        function g(t) {
          var n = t - c
          return void 0 === c || n >= e || n < 0 || (d && t - l >= o)
        }
        function p() {
          var t = jr()
          if (g(t)) return _(t)
          a = setTimeout(
            p,
            (function (t) {
              var n = e - (t - c)
              return d ? Xr(n, o - (t - l)) : n
            })(t)
          )
        }
        function _(t) {
          return (a = void 0), u && i ? f(t) : ((i = s = void 0), r)
        }
        function w() {
          var t = jr(),
            n = g(t)
          if (((i = arguments), (s = this), (c = t), n)) {
            if (void 0 === a) return m(c)
            if (d) return clearTimeout(a), (a = setTimeout(p, e)), f(c)
          }
          return void 0 === a && (a = setTimeout(p, e)), r
        }
        return (
          (e = Jr(e) || 0),
          A(n) &&
            ((h = !!n.leading),
            (o = (d = 'maxWait' in n) ? Yr(Jr(n.maxWait) || 0, e) : o),
            (u = 'trailing' in n ? !!n.trailing : u)),
          (w.cancel = function () {
            void 0 !== a && clearTimeout(a), (l = 0), (i = c = s = a = void 0)
          }),
          (w.flush = function () {
            return void 0 === a ? r : _(jr())
          }),
          w
        )
      }
      class Qr extends mr {
        constructor(t) {
          super(t),
            (this._fireSelectionChangeDoneDebounced = Zr(t => this.document.fire('selectionChangeDone', t), 200))
        }
        observe() {
          const t = this.document
          t.on(
            'arrowKey',
            (e, n) => {
              t.selection.isFake && this.isEnabled && n.preventDefault()
            },
            { context: '$capture' }
          ),
            t.on(
              'arrowKey',
              (e, n) => {
                t.selection.isFake && this.isEnabled && this._handleSelectionMove(n.keyCode)
              },
              { priority: 'lowest' }
            )
        }
        destroy() {
          super.destroy(), this._fireSelectionChangeDoneDebounced.cancel()
        }
        _handleSelectionMove(t) {
          const e = this.document.selection,
            n = new Ls(e.getRanges(), { backward: e.isBackward, fake: !1 })
          ;(t != ro.arrowleft && t != ro.arrowup) || n.setTo(n.getFirstPosition()),
            (t != ro.arrowright && t != ro.arrowdown) || n.setTo(n.getLastPosition())
          const i = { oldSelection: e, newSelection: n, domSelection: null }
          this.document.fire('selectionChange', i), this._fireSelectionChangeDoneDebounced(i)
        }
      }
      class ta extends mr {
        constructor(t) {
          super(t),
            (this.mutationObserver = t.getObserver(Fr)),
            (this.selection = this.document.selection),
            (this.domConverter = t.domConverter),
            (this._documents = new WeakSet()),
            (this._fireSelectionChangeDoneDebounced = Zr(t => this.document.fire('selectionChangeDone', t), 200)),
            (this._clearInfiniteLoopInterval = setInterval(() => this._clearInfiniteLoop(), 1e3)),
            (this._documentIsSelectingInactivityTimeoutDebounced = Zr(() => (this.document.isSelecting = !1), 5e3)),
            (this._loopbackCounter = 0)
        }
        observe(t) {
          const e = t.ownerDocument,
            n = () => {
              ;(this.document.isSelecting = !1), this._documentIsSelectingInactivityTimeoutDebounced.cancel()
            }
          this.listenTo(
            t,
            'selectstart',
            () => {
              ;(this.document.isSelecting = !0), this._documentIsSelectingInactivityTimeoutDebounced()
            },
            { priority: 'highest' }
          ),
            this.listenTo(t, 'keydown', n, { priority: 'highest' }),
            this.listenTo(t, 'keyup', n, { priority: 'highest' }),
            this._documents.has(e) ||
              (this.listenTo(e, 'mouseup', n, { priority: 'highest' }),
              this.listenTo(e, 'selectionchange', (t, n) => {
                this._handleSelectionChange(n, e), this._documentIsSelectingInactivityTimeoutDebounced()
              }),
              this._documents.add(e))
        }
        destroy() {
          super.destroy(),
            clearInterval(this._clearInfiniteLoopInterval),
            this._fireSelectionChangeDoneDebounced.cancel(),
            this._documentIsSelectingInactivityTimeoutDebounced.cancel()
        }
        _handleSelectionChange(t, e) {
          if (!this.isEnabled) return
          const n = e.defaultView.getSelection()
          if (this.checkShouldIgnoreEventFromTarget(n.anchorNode)) return
          this.mutationObserver.flush()
          const i = this.domConverter.domSelectionToView(n)
          if (0 != i.rangeCount) {
            if (
              ((this.view.hasDomSelection = !0),
              !(
                (this.selection.isEqual(i) && this.domConverter.isDomSelectionCorrect(n)) ||
                ++this._loopbackCounter > 60
              ))
            )
              if (this.selection.isSimilar(i)) this.view.forceRender()
              else {
                const t = { oldSelection: this.selection, newSelection: i, domSelection: n }
                this.document.fire('selectionChange', t), this._fireSelectionChangeDoneDebounced(t)
              }
          } else this.view.hasDomSelection = !1
        }
        _clearInfiniteLoop() {
          this._loopbackCounter = 0
        }
      }
      class ea extends Vr {
        constructor(t) {
          super(t), (this.domEventType = ['focus', 'blur']), (this.useCapture = !0)
          const e = this.document
          e.on('focus', () => {
            ;(e.isFocused = !0), (this._renderTimeoutId = setTimeout(() => t.change(() => {}), 50))
          }),
            e.on('blur', (n, i) => {
              const s = e.selection.editableElement
              ;(null !== s && s !== i.target) || ((e.isFocused = !1), t.change(() => {}))
            })
        }
        onDomEvent(t) {
          this.fire(t.type, t)
        }
        destroy() {
          this._renderTimeoutId && clearTimeout(this._renderTimeoutId), super.destroy()
        }
      }
      class na extends Vr {
        constructor(t) {
          super(t), (this.domEventType = ['compositionstart', 'compositionupdate', 'compositionend'])
          const e = this.document
          e.on('compositionstart', () => {
            e.isComposing = !0
          }),
            e.on('compositionend', () => {
              e.isComposing = !1
            })
        }
        onDomEvent(t) {
          this.fire(t.type, t)
        }
      }
      class ia extends Vr {
        constructor(t) {
          super(t), (this.domEventType = ['beforeinput'])
        }
        onDomEvent(t) {
          this.fire(t.type, t)
        }
      }
      class sa {
        constructor() {
          this._replacedElements = []
        }
        replace(t, e) {
          this._replacedElements.push({ element: t, newElement: e }),
            (t.style.display = 'none'),
            e && t.parentNode.insertBefore(e, t.nextSibling)
        }
        restore() {
          this._replacedElements.forEach(({ element: t, newElement: e }) => {
            ;(t.style.display = ''), e && e.remove()
          }),
            (this._replacedElements = [])
        }
      }
      function oa(t) {
        return '[object Range]' == Object.prototype.toString.apply(t)
      }
      function ra(t) {
        const e = t.ownerDocument.defaultView.getComputedStyle(t)
        return {
          top: parseInt(e.borderTopWidth, 10),
          right: parseInt(e.borderRightWidth, 10),
          bottom: parseInt(e.borderBottomWidth, 10),
          left: parseInt(e.borderLeftWidth, 10),
        }
      }
      const aa = ['top', 'right', 'bottom', 'left', 'width', 'height']
      class ca {
        constructor(t) {
          const e = oa(t)
          if (
            (Object.defineProperty(this, '_source', { value: t._source || t, writable: !0, enumerable: !1 }),
            yi(t) || e)
          )
            if (e) {
              const e = ca.getDomRangeRects(t)
              la(this, ca.getBoundingRect(e))
            } else la(this, t.getBoundingClientRect())
          else if (hr(t)) {
            const { innerWidth: e, innerHeight: n } = t
            la(this, { top: 0, right: e, bottom: n, left: 0, width: e, height: n })
          } else la(this, t)
        }
        clone() {
          return new ca(this)
        }
        moveTo(t, e) {
          return (this.top = e), (this.right = t + this.width), (this.bottom = e + this.height), (this.left = t), this
        }
        moveBy(t, e) {
          return (this.top += e), (this.right += t), (this.left += t), (this.bottom += e), this
        }
        getIntersection(t) {
          const e = {
            top: Math.max(this.top, t.top),
            right: Math.min(this.right, t.right),
            bottom: Math.min(this.bottom, t.bottom),
            left: Math.max(this.left, t.left),
          }
          return (
            (e.width = e.right - e.left), (e.height = e.bottom - e.top), e.width < 0 || e.height < 0 ? null : new ca(e)
          )
        }
        getIntersectionArea(t) {
          const e = this.getIntersection(t)
          return e ? e.getArea() : 0
        }
        getArea() {
          return this.width * this.height
        }
        getVisible() {
          const t = this._source
          let e = this.clone()
          if (!ha(t)) {
            let n = t.parentNode || t.commonAncestorContainer
            for (; n && !ha(n); ) {
              const t = new ca(n),
                i = e.getIntersection(t)
              if (!i) return null
              i.getArea() < e.getArea() && (e = i), (n = n.parentNode)
            }
          }
          return e
        }
        isEqual(t) {
          for (const e of aa) if (this[e] !== t[e]) return !1
          return !0
        }
        contains(t) {
          const e = this.getIntersection(t)
          return !(!e || !e.isEqual(t))
        }
        excludeScrollbarsAndBorders() {
          const t = this._source
          let e, n, i
          if (hr(t))
            (e = t.innerWidth - t.document.documentElement.clientWidth),
              (n = t.innerHeight - t.document.documentElement.clientHeight),
              (i = t.getComputedStyle(t.document.documentElement).direction)
          else {
            const s = ra(this._source)
            ;(e = t.offsetWidth - t.clientWidth - s.left - s.right),
              (n = t.offsetHeight - t.clientHeight - s.top - s.bottom),
              (i = t.ownerDocument.defaultView.getComputedStyle(t).direction),
              (this.left += s.left),
              (this.top += s.top),
              (this.right -= s.right),
              (this.bottom -= s.bottom),
              (this.width = this.right - this.left),
              (this.height = this.bottom - this.top)
          }
          return (
            (this.width -= e),
            'ltr' === i ? (this.right -= e) : (this.left += e),
            (this.height -= n),
            (this.bottom -= n),
            this
          )
        }
        static getDomRangeRects(t) {
          const e = [],
            n = Array.from(t.getClientRects())
          if (n.length) for (const t of n) e.push(new ca(t))
          else {
            let n = t.startContainer
            Ro(n) && (n = n.parentNode)
            const i = new ca(n.getBoundingClientRect())
            ;(i.right = i.left), (i.width = 0), e.push(i)
          }
          return e
        }
        static getBoundingRect(t) {
          const e = {
            left: Number.POSITIVE_INFINITY,
            top: Number.POSITIVE_INFINITY,
            right: Number.NEGATIVE_INFINITY,
            bottom: Number.NEGATIVE_INFINITY,
          }
          let n = 0
          for (const i of t)
            n++,
              (e.left = Math.min(e.left, i.left)),
              (e.top = Math.min(e.top, i.top)),
              (e.right = Math.max(e.right, i.right)),
              (e.bottom = Math.max(e.bottom, i.bottom))
          return 0 == n ? null : ((e.width = e.right - e.left), (e.height = e.bottom - e.top), new ca(e))
        }
      }
      function la(t, e) {
        for (const n of aa) t[n] = e[n]
      }
      function ha(t) {
        return !!yi(t) && t === t.ownerDocument.body
      }
      class da {
        constructor(t, e) {
          da._observerInstance || da._createObserver(),
            (this._element = t),
            (this._callback = e),
            da._addElementCallback(t, e),
            da._observerInstance.observe(t)
        }
        destroy() {
          da._deleteElementCallback(this._element, this._callback)
        }
        static _addElementCallback(t, e) {
          da._elementCallbacks || (da._elementCallbacks = new Map())
          let n = da._elementCallbacks.get(t)
          n || ((n = new Set()), da._elementCallbacks.set(t, n)), n.add(e)
        }
        static _deleteElementCallback(t, e) {
          const n = da._getElementCallbacks(t)
          n && (n.delete(e), n.size || (da._elementCallbacks.delete(t), da._observerInstance.unobserve(t))),
            da._elementCallbacks &&
              !da._elementCallbacks.size &&
              ((da._observerInstance = null), (da._elementCallbacks = null))
        }
        static _getElementCallbacks(t) {
          return da._elementCallbacks ? da._elementCallbacks.get(t) : null
        }
        static _createObserver() {
          let t
          ;(t = 'function' == typeof Xo.window.ResizeObserver ? Xo.window.ResizeObserver : ua),
            (da._observerInstance = new t(t => {
              for (const e of t) {
                const t = da._getElementCallbacks(e.target)
                if (t) for (const n of t) n(e)
              }
            }))
        }
      }
      ;(da._observerInstance = null), (da._elementCallbacks = null)
      class ua {
        constructor(t) {
          ;(this._callback = t),
            (this._elements = new Set()),
            (this._previousRects = new Map()),
            (this._periodicCheckTimeout = null)
        }
        observe(t) {
          this._elements.add(t),
            this._checkElementRectsAndExecuteCallback(),
            1 === this._elements.size && this._startPeriodicCheck()
        }
        unobserve(t) {
          this._elements.delete(t), this._previousRects.delete(t), this._elements.size || this._stopPeriodicCheck()
        }
        _startPeriodicCheck() {
          const t = () => {
            this._checkElementRectsAndExecuteCallback(), (this._periodicCheckTimeout = setTimeout(t, 100))
          }
          this.listenTo(Xo.window, 'resize', () => {
            this._checkElementRectsAndExecuteCallback()
          }),
            (this._periodicCheckTimeout = setTimeout(t, 100))
        }
        _stopPeriodicCheck() {
          clearTimeout(this._periodicCheckTimeout), this.stopListening(), this._previousRects.clear()
        }
        _checkElementRectsAndExecuteCallback() {
          const t = []
          for (const e of this._elements)
            this._hasRectChanged(e) && t.push({ target: e, contentRect: this._previousRects.get(e) })
          t.length && this._callback(t)
        }
        _hasRectChanged(t) {
          if (!t.ownerDocument.body.contains(t)) return !1
          const e = new ca(t),
            n = this._previousRects.get(t),
            i = !n || !n.isEqual(e)
          return this._previousRects.set(t, e), i
        }
      }
      he(ua, dr)
      function fa({ target: t, viewportOffset: e = 0 }) {
        const n = ya(t)
        let i = n,
          s = null
        for (; i; ) {
          let o
          ;(o = va(i == n ? t : s)), ga(o, () => Pa(t, i))
          const r = Pa(t, i)
          if ((ma(i, r, e), i.parent != i)) {
            if (((s = i.frameElement), (i = i.parent), !s)) return
          } else i = null
        }
      }
      function ma(t, e, n) {
        const i = e.clone().moveBy(0, n),
          s = e.clone().moveBy(0, -n),
          o = new ca(t).excludeScrollbarsAndBorders()
        if (![s, i].every(t => o.contains(t))) {
          let { scrollX: r, scrollY: a } = t
          _a(s, o) ? (a -= o.top - e.top + n) : pa(i, o) && (a += e.bottom - o.bottom + n),
            wa(e, o) ? (r -= o.left - e.left + n) : ba(e, o) && (r += e.right - o.right + n),
            t.scrollTo(r, a)
        }
      }
      function ga(t, e) {
        const n = ya(t)
        let i, s
        for (; t != n.document.body; )
          (s = e()),
            (i = new ca(t).excludeScrollbarsAndBorders()),
            i.contains(s) ||
              (_a(s, i) ? (t.scrollTop -= i.top - s.top) : pa(s, i) && (t.scrollTop += s.bottom - i.bottom),
              wa(s, i) ? (t.scrollLeft -= i.left - s.left) : ba(s, i) && (t.scrollLeft += s.right - i.right)),
            (t = t.parentNode)
      }
      function pa(t, e) {
        return t.bottom > e.bottom
      }
      function _a(t, e) {
        return t.top < e.top
      }
      function wa(t, e) {
        return t.left < e.left
      }
      function ba(t, e) {
        return t.right > e.right
      }
      function ya(t) {
        return oa(t) ? t.startContainer.ownerDocument.defaultView : t.ownerDocument.defaultView
      }
      function va(t) {
        if (oa(t)) {
          let e = t.commonAncestorContainer
          return Ro(e) && (e = e.parentNode), e
        }
        return t.parentNode
      }
      function Pa(t, e) {
        const n = ya(t),
          i = new ca(t)
        if (n === e) return i
        {
          let t = n
          for (; t != e; ) {
            const e = t.frameElement,
              n = new ca(e).excludeScrollbarsAndBorders()
            i.moveBy(n.left, n.top), (t = t.parent)
          }
        }
        return i
      }
      function ka(t) {
        const e = t.next()
        return e.done ? null : e.value
      }
      Object.assign(
        {},
        {
          scrollViewportToShowTarget: fa,
          scrollAncestorsToShowTarget: function (t) {
            ga(va(t), () => new ca(t))
          },
        }
      )
      class Aa {
        constructor() {
          this.set('isFocused', !1),
            this.set('focusedElement', null),
            (this._elements = new Set()),
            (this._nextEventLoopTimeout = null)
        }
        add(t) {
          if (this._elements.has(t)) throw new c('focustracker-add-element-already-exist', this)
          this.listenTo(t, 'focus', () => this._focus(t), { useCapture: !0 }),
            this.listenTo(t, 'blur', () => this._blur(), { useCapture: !0 }),
            this._elements.add(t)
        }
        remove(t) {
          t === this.focusedElement && this._blur(t),
            this._elements.has(t) && (this.stopListening(t), this._elements.delete(t))
        }
        destroy() {
          this.stopListening()
        }
        _focus(t) {
          clearTimeout(this._nextEventLoopTimeout), (this.focusedElement = t), (this.isFocused = !0)
        }
        _blur() {
          clearTimeout(this._nextEventLoopTimeout),
            (this._nextEventLoopTimeout = setTimeout(() => {
              ;(this.focusedElement = null), (this.isFocused = !1)
            }, 0))
        }
      }
      he(Aa, dr), he(Aa, se)
      class Ca {
        constructor() {
          this._listener = Object.create(dr)
        }
        listenTo(t) {
          this._listener.listenTo(t, 'keydown', (t, e) => {
            this._listener.fire('_keydown:' + co(e), e)
          })
        }
        set(t, e, n = {}) {
          const i = lo(t),
            s = n.priority
          this._listener.listenTo(
            this._listener,
            '_keydown:' + i,
            (t, n) => {
              e(n, () => {
                n.preventDefault(), n.stopPropagation(), t.stop()
              }),
                (t.return = !0)
            },
            { priority: s }
          )
        }
        press(t) {
          return !!this._listener.fire('_keydown:' + co(t), t)
        }
        destroy() {
          this._listener.stopListening()
        }
      }
      class Ea extends mr {
        constructor(t) {
          super(t),
            this.document.on('keydown', (t, e) => {
              if (
                this.isEnabled &&
                ((n = e.keyCode) == ro.arrowright || n == ro.arrowleft || n == ro.arrowup || n == ro.arrowdown)
              ) {
                const n = new Ws(this.document, 'arrowKey', this.document.selection.getFirstRange())
                this.document.fire(n, e), n.stop.called && t.stop()
              }
              var n
            })
        }
        observe() {}
      }
      class Sa extends mr {
        constructor(t) {
          super(t)
          const e = this.document
          e.on('keydown', (t, n) => {
            if (!this.isEnabled || n.keyCode != ro.tab || n.ctrlKey) return
            const i = new Ws(e, 'tab', e.selection.getFirstRange())
            e.fire(i, n), i.stop.called && t.stop()
          })
        }
        observe() {}
      }
      class xa {
        constructor(t) {
          ;(this.document = new Gs(t)),
            (this.domConverter = new rr(this.document)),
            (this.domRoots = new Map()),
            this.set('isRenderingInProgress', !1),
            this.set('hasDomSelection', !1),
            (this._renderer = new Ko(this.domConverter, this.document.selection)),
            this._renderer.bind('isFocused', 'isSelecting').to(this.document),
            (this._initialDomRootAttributes = new WeakMap()),
            (this._observers = new Map()),
            (this._ongoingChange = !1),
            (this._postFixersInProgress = !1),
            (this._renderingDisabled = !1),
            (this._hasChangedSinceTheLastRendering = !1),
            (this._writer = new bo(this.document)),
            this.addObserver(Fr),
            this.addObserver(ta),
            this.addObserver(ea),
            this.addObserver(Lr),
            this.addObserver(Qr),
            this.addObserver(na),
            this.addObserver(Ea),
            this.addObserver(Sa),
            no.isAndroid && this.addObserver(ia),
            this.document.on('arrowKey', Vo, { priority: 'low' }),
            mo(this),
            this.on('render', () => {
              this._render(), this.document.fire('layoutChanged'), (this._hasChangedSinceTheLastRendering = !1)
            }),
            this.listenTo(this.document.selection, 'change', () => {
              this._hasChangedSinceTheLastRendering = !0
            }),
            this.listenTo(this.document, 'change:isFocused', () => {
              this._hasChangedSinceTheLastRendering = !0
            })
        }
        attachDomRoot(t, e = 'main') {
          const n = this.document.getRoot(e)
          n._name = t.tagName.toLowerCase()
          const i = {}
          for (const { name: e, value: s } of Array.from(t.attributes))
            (i[e] = s), 'class' === e ? this._writer.addClass(s.split(' '), n) : this._writer.setAttribute(e, s, n)
          this._initialDomRootAttributes.set(t, i)
          const s = () => {
            this._writer.setAttribute('contenteditable', !n.isReadOnly, n),
              n.isReadOnly ? this._writer.addClass('ck-read-only', n) : this._writer.removeClass('ck-read-only', n)
          }
          s(),
            this.domRoots.set(e, t),
            this.domConverter.bindElements(t, n),
            this._renderer.markToSync('children', n),
            this._renderer.markToSync('attributes', n),
            this._renderer.domDocuments.add(t.ownerDocument),
            n.on('change:children', (t, e) => this._renderer.markToSync('children', e)),
            n.on('change:attributes', (t, e) => this._renderer.markToSync('attributes', e)),
            n.on('change:text', (t, e) => this._renderer.markToSync('text', e)),
            n.on('change:isReadOnly', () => this.change(s)),
            n.on('change', () => {
              this._hasChangedSinceTheLastRendering = !0
            })
          for (const n of this._observers.values()) n.observe(t, e)
        }
        detachDomRoot(t) {
          const e = this.domRoots.get(t)
          Array.from(e.attributes).forEach(({ name: t }) => e.removeAttribute(t))
          const n = this._initialDomRootAttributes.get(e)
          for (const t in n) e.setAttribute(t, n[t])
          this.domRoots.delete(t), this.domConverter.unbindDomElement(e)
        }
        getDomRoot(t = 'main') {
          return this.domRoots.get(t)
        }
        addObserver(t) {
          let e = this._observers.get(t)
          if (e) return e
          ;(e = new t(this)), this._observers.set(t, e)
          for (const [t, n] of this.domRoots) e.observe(n, t)
          return e.enable(), e
        }
        getObserver(t) {
          return this._observers.get(t)
        }
        disableObservers() {
          for (const t of this._observers.values()) t.disable()
        }
        enableObservers() {
          for (const t of this._observers.values()) t.enable()
        }
        scrollToTheSelection() {
          const t = this.document.selection.getFirstRange()
          t && fa({ target: this.domConverter.viewRangeToDom(t), viewportOffset: 20 })
        }
        focus() {
          if (!this.document.isFocused) {
            const t = this.document.selection.editableElement
            t && (this.domConverter.focus(t), this.forceRender())
          }
        }
        change(t) {
          if (this.isRenderingInProgress || this._postFixersInProgress) throw new c('cannot-change-view-tree', this)
          try {
            if (this._ongoingChange) return t(this._writer)
            this._ongoingChange = !0
            const e = t(this._writer)
            return (
              (this._ongoingChange = !1),
              !this._renderingDisabled &&
                this._hasChangedSinceTheLastRendering &&
                ((this._postFixersInProgress = !0),
                this.document._callPostFixers(this._writer),
                (this._postFixersInProgress = !1),
                this.fire('render')),
              e
            )
          } catch (t) {
            c.rethrowUnexpectedError(t, this)
          }
        }
        forceRender() {
          ;(this._hasChangedSinceTheLastRendering = !0), this.change(() => {})
        }
        destroy() {
          for (const t of this._observers.values()) t.destroy()
          this.document.destroy(), this.stopListening()
        }
        createPositionAt(t, e) {
          return Ds._createAt(t, e)
        }
        createPositionAfter(t) {
          return Ds._createAfter(t)
        }
        createPositionBefore(t) {
          return Ds._createBefore(t)
        }
        createRange(t, e) {
          return new Fs(t, e)
        }
        createRangeOn(t) {
          return Fs._createOn(t)
        }
        createRangeIn(t) {
          return Fs._createIn(t)
        }
        createSelection(t, e, n) {
          return new Ls(t, e, n)
        }
        _disableRendering(t) {
          ;(this._renderingDisabled = t), 0 == t && this.change(() => {})
        }
        _render() {
          ;(this.isRenderingInProgress = !0),
            this.disableObservers(),
            this._renderer.render(),
            this.enableObservers(),
            (this.isRenderingInProgress = !1)
        }
      }
      he(xa, se)
      class Ta {
        constructor(t) {
          ;(this.parent = null), (this._attrs = Li(t))
        }
        get index() {
          let t
          if (!this.parent) return null
          if (null === (t = this.parent.getChildIndex(this))) throw new c('model-node-not-found-in-parent', this)
          return t
        }
        get startOffset() {
          let t
          if (!this.parent) return null
          if (null === (t = this.parent.getChildStartOffset(this))) throw new c('model-node-not-found-in-parent', this)
          return t
        }
        get offsetSize() {
          return 1
        }
        get endOffset() {
          return this.parent ? this.startOffset + this.offsetSize : null
        }
        get nextSibling() {
          const t = this.index
          return (null !== t && this.parent.getChild(t + 1)) || null
        }
        get previousSibling() {
          const t = this.index
          return (null !== t && this.parent.getChild(t - 1)) || null
        }
        get root() {
          let t = this
          for (; t.parent; ) t = t.parent
          return t
        }
        isAttached() {
          return this.root.is('rootElement')
        }
        getPath() {
          const t = []
          let e = this
          for (; e.parent; ) t.unshift(e.startOffset), (e = e.parent)
          return t
        }
        getAncestors(t = { includeSelf: !1, parentFirst: !1 }) {
          const e = []
          let n = t.includeSelf ? this : this.parent
          for (; n; ) e[t.parentFirst ? 'push' : 'unshift'](n), (n = n.parent)
          return e
        }
        getCommonAncestor(t, e = {}) {
          const n = this.getAncestors(e),
            i = t.getAncestors(e)
          let s = 0
          for (; n[s] == i[s] && n[s]; ) s++
          return 0 === s ? null : n[s - 1]
        }
        isBefore(t) {
          if (this == t) return !1
          if (this.root !== t.root) return !1
          const e = this.getPath(),
            n = t.getPath(),
            i = Ni(e, n)
          switch (i) {
            case 'prefix':
              return !0
            case 'extension':
              return !1
            default:
              return e[i] < n[i]
          }
        }
        isAfter(t) {
          return this != t && this.root === t.root && !this.isBefore(t)
        }
        hasAttribute(t) {
          return this._attrs.has(t)
        }
        getAttribute(t) {
          return this._attrs.get(t)
        }
        getAttributes() {
          return this._attrs.entries()
        }
        getAttributeKeys() {
          return this._attrs.keys()
        }
        toJSON() {
          const t = {}
          return (
            this._attrs.size && (t.attributes = Array.from(this._attrs).reduce((t, e) => ((t[e[0]] = e[1]), t), {})), t
          )
        }
        is(t) {
          return 'node' === t || 'model:node' === t
        }
        _clone() {
          return new Ta(this._attrs)
        }
        _remove() {
          this.parent._removeChildren(this.index)
        }
        _setAttribute(t, e) {
          this._attrs.set(t, e)
        }
        _setAttributesTo(t) {
          this._attrs = Li(t)
        }
        _removeAttribute(t) {
          return this._attrs.delete(t)
        }
        _clearAttributes() {
          this._attrs.clear()
        }
      }
      class Ra extends Ta {
        constructor(t, e) {
          super(e), (this._data = t || '')
        }
        get offsetSize() {
          return this.data.length
        }
        get data() {
          return this._data
        }
        is(t) {
          return (
            '$text' === t ||
            'model:$text' === t ||
            'text' === t ||
            'model:text' === t ||
            'node' === t ||
            'model:node' === t
          )
        }
        toJSON() {
          const t = super.toJSON()
          return (t.data = this.data), t
        }
        _clone() {
          return new Ra(this.data, this.getAttributes())
        }
        static fromJSON(t) {
          return new Ra(t.data, t.attributes)
        }
      }
      class Oa {
        constructor(t, e, n) {
          if (((this.textNode = t), e < 0 || e > t.offsetSize)) throw new c('model-textproxy-wrong-offsetintext', this)
          if (n < 0 || e + n > t.offsetSize) throw new c('model-textproxy-wrong-length', this)
          ;(this.data = t.data.substring(e, e + n)), (this.offsetInText = e)
        }
        get startOffset() {
          return null !== this.textNode.startOffset ? this.textNode.startOffset + this.offsetInText : null
        }
        get offsetSize() {
          return this.data.length
        }
        get endOffset() {
          return null !== this.startOffset ? this.startOffset + this.offsetSize : null
        }
        get isPartial() {
          return this.offsetSize !== this.textNode.offsetSize
        }
        get parent() {
          return this.textNode.parent
        }
        get root() {
          return this.textNode.root
        }
        is(t) {
          return '$textProxy' === t || 'model:$textProxy' === t || 'textProxy' === t || 'model:textProxy' === t
        }
        getPath() {
          const t = this.textNode.getPath()
          return t.length > 0 && (t[t.length - 1] += this.offsetInText), t
        }
        getAncestors(t = { includeSelf: !1, parentFirst: !1 }) {
          const e = []
          let n = t.includeSelf ? this : this.parent
          for (; n; ) e[t.parentFirst ? 'push' : 'unshift'](n), (n = n.parent)
          return e
        }
        hasAttribute(t) {
          return this.textNode.hasAttribute(t)
        }
        getAttribute(t) {
          return this.textNode.getAttribute(t)
        }
        getAttributes() {
          return this.textNode.getAttributes()
        }
        getAttributeKeys() {
          return this.textNode.getAttributeKeys()
        }
      }
      class Ia {
        constructor(t) {
          ;(this._nodes = []), t && this._insertNodes(0, t)
        }
        [Symbol.iterator]() {
          return this._nodes[Symbol.iterator]()
        }
        get length() {
          return this._nodes.length
        }
        get maxOffset() {
          return this._nodes.reduce((t, e) => t + e.offsetSize, 0)
        }
        getNode(t) {
          return this._nodes[t] || null
        }
        getNodeIndex(t) {
          const e = this._nodes.indexOf(t)
          return -1 == e ? null : e
        }
        getNodeStartOffset(t) {
          const e = this.getNodeIndex(t)
          return null === e ? null : this._nodes.slice(0, e).reduce((t, e) => t + e.offsetSize, 0)
        }
        indexToOffset(t) {
          if (t == this._nodes.length) return this.maxOffset
          const e = this._nodes[t]
          if (!e) throw new c('model-nodelist-index-out-of-bounds', this)
          return this.getNodeStartOffset(e)
        }
        offsetToIndex(t) {
          let e = 0
          for (const n of this._nodes) {
            if (t >= e && t < e + n.offsetSize) return this.getNodeIndex(n)
            e += n.offsetSize
          }
          if (e != t) throw new c('model-nodelist-offset-out-of-bounds', this, { offset: t, nodeList: this })
          return this.length
        }
        _insertNodes(t, e) {
          for (const t of e) if (!(t instanceof Ta)) throw new c('model-nodelist-insertnodes-not-node', this)
          this._nodes.splice(t, 0, ...e)
        }
        _removeNodes(t, e = 1) {
          return this._nodes.splice(t, e)
        }
        toJSON() {
          return this._nodes.map(t => t.toJSON())
        }
      }
      class Ma extends Ta {
        constructor(t, e, n) {
          super(e), (this.name = t), (this._children = new Ia()), n && this._insertChild(0, n)
        }
        get childCount() {
          return this._children.length
        }
        get maxOffset() {
          return this._children.maxOffset
        }
        get isEmpty() {
          return 0 === this.childCount
        }
        is(t, e = null) {
          return e
            ? e === this.name && ('element' === t || 'model:element' === t)
            : 'element' === t || 'model:element' === t || 'node' === t || 'model:node' === t
        }
        getChild(t) {
          return this._children.getNode(t)
        }
        getChildren() {
          return this._children[Symbol.iterator]()
        }
        getChildIndex(t) {
          return this._children.getNodeIndex(t)
        }
        getChildStartOffset(t) {
          return this._children.getNodeStartOffset(t)
        }
        offsetToIndex(t) {
          return this._children.offsetToIndex(t)
        }
        getNodeByPath(t) {
          let e = this
          for (const n of t) e = e.getChild(e.offsetToIndex(n))
          return e
        }
        findAncestor(t, e = { includeSelf: !1 }) {
          let n = e.includeSelf ? this : this.parent
          for (; n; ) {
            if (n.name === t) return n
            n = n.parent
          }
          return null
        }
        toJSON() {
          const t = super.toJSON()
          if (((t.name = this.name), this._children.length > 0)) {
            t.children = []
            for (const e of this._children) t.children.push(e.toJSON())
          }
          return t
        }
        _clone(t = !1) {
          const e = t ? Array.from(this._children).map(t => t._clone(!0)) : null
          return new Ma(this.name, this.getAttributes(), e)
        }
        _appendChild(t) {
          this._insertChild(this.childCount, t)
        }
        _insertChild(t, e) {
          const n = (function (t) {
            if ('string' == typeof t) return [new Ra(t)]
            Ai(t) || (t = [t])
            return Array.from(t).map(t =>
              'string' == typeof t ? new Ra(t) : t instanceof Oa ? new Ra(t.data, t.getAttributes()) : t
            )
          })(e)
          for (const t of n) null !== t.parent && t._remove(), (t.parent = this)
          this._children._insertNodes(t, n)
        }
        _removeChildren(t, e = 1) {
          const n = this._children._removeNodes(t, e)
          for (const t of n) t.parent = null
          return n
        }
        static fromJSON(t) {
          let e = null
          if (t.children) {
            e = []
            for (const n of t.children) n.name ? e.push(Ma.fromJSON(n)) : e.push(Ra.fromJSON(n))
          }
          return new Ma(t.name, t.attributes, e)
        }
      }
      class Na {
        constructor(t = {}) {
          if (!t.boundaries && !t.startPosition) throw new c('model-tree-walker-no-start-position', null)
          const e = t.direction || 'forward'
          if ('forward' != e && 'backward' != e) throw new c('model-tree-walker-unknown-direction', t, { direction: e })
          ;(this.direction = e),
            (this.boundaries = t.boundaries || null),
            t.startPosition
              ? (this.position = t.startPosition.clone())
              : (this.position = Fa._createAt(this.boundaries['backward' == this.direction ? 'end' : 'start'])),
            (this.position.stickiness = 'toNone'),
            (this.singleCharacters = !!t.singleCharacters),
            (this.shallow = !!t.shallow),
            (this.ignoreElementEnd = !!t.ignoreElementEnd),
            (this._boundaryStartParent = this.boundaries ? this.boundaries.start.parent : null),
            (this._boundaryEndParent = this.boundaries ? this.boundaries.end.parent : null),
            (this._visitedParent = this.position.parent)
        }
        [Symbol.iterator]() {
          return this
        }
        skip(t) {
          let e, n, i, s
          do {
            ;(i = this.position), (s = this._visitedParent), ({ done: e, value: n } = this.next())
          } while (!e && t(n))
          e || ((this.position = i), (this._visitedParent = s))
        }
        next() {
          return 'forward' == this.direction ? this._next() : this._previous()
        }
        _next() {
          const t = this.position,
            e = this.position.clone(),
            n = this._visitedParent
          if (null === n.parent && e.offset === n.maxOffset) return { done: !0 }
          if (n === this._boundaryEndParent && e.offset == this.boundaries.end.offset) return { done: !0 }
          const i = Ba(e, n),
            s = i || Va(e, n, i)
          if (s instanceof Ma)
            return (
              this.shallow ? e.offset++ : (e.path.push(0), (this._visitedParent = s)),
              (this.position = e),
              Da('elementStart', s, t, e, 1)
            )
          if (s instanceof Ra) {
            let i
            if (this.singleCharacters) i = 1
            else {
              let t = s.endOffset
              this._boundaryEndParent == n && this.boundaries.end.offset < t && (t = this.boundaries.end.offset),
                (i = t - e.offset)
            }
            const o = e.offset - s.startOffset,
              r = new Oa(s, o, i)
            return (e.offset += i), (this.position = e), Da('text', r, t, e, i)
          }
          return (
            e.path.pop(),
            e.offset++,
            (this.position = e),
            (this._visitedParent = n.parent),
            this.ignoreElementEnd ? this._next() : Da('elementEnd', n, t, e)
          )
        }
        _previous() {
          const t = this.position,
            e = this.position.clone(),
            n = this._visitedParent
          if (null === n.parent && 0 === e.offset) return { done: !0 }
          if (n == this._boundaryStartParent && e.offset == this.boundaries.start.offset) return { done: !0 }
          const i = e.parent,
            s = Ba(e, i),
            o = s || La(e, i, s)
          if (o instanceof Ma)
            return (
              e.offset--,
              this.shallow
                ? ((this.position = e), Da('elementStart', o, t, e, 1))
                : (e.path.push(o.maxOffset),
                  (this.position = e),
                  (this._visitedParent = o),
                  this.ignoreElementEnd ? this._previous() : Da('elementEnd', o, t, e))
            )
          if (o instanceof Ra) {
            let i
            if (this.singleCharacters) i = 1
            else {
              let t = o.startOffset
              this._boundaryStartParent == n && this.boundaries.start.offset > t && (t = this.boundaries.start.offset),
                (i = e.offset - t)
            }
            const s = e.offset - o.startOffset,
              r = new Oa(o, s - i, i)
            return (e.offset -= i), (this.position = e), Da('text', r, t, e, i)
          }
          return e.path.pop(), (this.position = e), (this._visitedParent = n.parent), Da('elementStart', n, t, e, 1)
        }
      }
      function Da(t, e, n, i, s) {
        return { done: !1, value: { type: t, item: e, previousPosition: n, nextPosition: i, length: s } }
      }
      class Fa {
        constructor(t, e, n = 'toNone') {
          if (!t.is('element') && !t.is('documentFragment')) throw new c('model-position-root-invalid', t)
          if (!(e instanceof Array) || 0 === e.length)
            throw new c('model-position-path-incorrect-format', t, { path: e })
          t.is('rootElement') ? (e = e.slice()) : ((e = [...t.getPath(), ...e]), (t = t.root)),
            (this.root = t),
            (this.path = e),
            (this.stickiness = n)
        }
        get offset() {
          return this.path[this.path.length - 1]
        }
        set offset(t) {
          this.path[this.path.length - 1] = t
        }
        get parent() {
          let t = this.root
          for (let e = 0; e < this.path.length - 1; e++)
            if (((t = t.getChild(t.offsetToIndex(this.path[e]))), !t))
              throw new c('model-position-path-incorrect', this, { position: this })
          if (t.is('$text')) throw new c('model-position-path-incorrect', this, { position: this })
          return t
        }
        get index() {
          return this.parent.offsetToIndex(this.offset)
        }
        get textNode() {
          return Ba(this, this.parent)
        }
        get nodeAfter() {
          const t = this.parent
          return Va(this, t, Ba(this, t))
        }
        get nodeBefore() {
          const t = this.parent
          return La(this, t, Ba(this, t))
        }
        get isAtStart() {
          return 0 === this.offset
        }
        get isAtEnd() {
          return this.offset == this.parent.maxOffset
        }
        compareWith(t) {
          if (this.root != t.root) return 'different'
          const e = Ni(this.path, t.path)
          switch (e) {
            case 'same':
              return 'same'
            case 'prefix':
              return 'before'
            case 'extension':
              return 'after'
            default:
              return this.path[e] < t.path[e] ? 'before' : 'after'
          }
        }
        getLastMatchingPosition(t, e = {}) {
          e.startPosition = this
          const n = new Na(e)
          return n.skip(t), n.position
        }
        getParentPath() {
          return this.path.slice(0, -1)
        }
        getAncestors() {
          const t = this.parent
          return t.is('documentFragment') ? [t] : t.getAncestors({ includeSelf: !0 })
        }
        findAncestor(t) {
          const e = this.parent
          return e.is('element') ? e.findAncestor(t, { includeSelf: !0 }) : null
        }
        getCommonPath(t) {
          if (this.root != t.root) return []
          const e = Ni(this.path, t.path),
            n = 'string' == typeof e ? Math.min(this.path.length, t.path.length) : e
          return this.path.slice(0, n)
        }
        getCommonAncestor(t) {
          const e = this.getAncestors(),
            n = t.getAncestors()
          let i = 0
          for (; e[i] == n[i] && e[i]; ) i++
          return 0 === i ? null : e[i - 1]
        }
        getShiftedBy(t) {
          const e = this.clone(),
            n = e.offset + t
          return (e.offset = n < 0 ? 0 : n), e
        }
        isAfter(t) {
          return 'after' == this.compareWith(t)
        }
        isBefore(t) {
          return 'before' == this.compareWith(t)
        }
        isEqual(t) {
          return 'same' == this.compareWith(t)
        }
        isTouching(t) {
          let e = null,
            n = null
          switch (this.compareWith(t)) {
            case 'same':
              return !0
            case 'before':
              ;(e = Fa._createAt(this)), (n = Fa._createAt(t))
              break
            case 'after':
              ;(e = Fa._createAt(t)), (n = Fa._createAt(this))
              break
            default:
              return !1
          }
          let i = e.parent
          for (; e.path.length + n.path.length; ) {
            if (e.isEqual(n)) return !0
            if (e.path.length > n.path.length) {
              if (e.offset !== i.maxOffset) return !1
              ;(e.path = e.path.slice(0, -1)), (i = i.parent), e.offset++
            } else {
              if (0 !== n.offset) return !1
              n.path = n.path.slice(0, -1)
            }
          }
        }
        is(t) {
          return 'position' === t || 'model:position' === t
        }
        hasSameParentAs(t) {
          if (this.root !== t.root) return !1
          return 'same' == Ni(this.getParentPath(), t.getParentPath())
        }
        getTransformedByOperation(t) {
          let e
          switch (t.type) {
            case 'insert':
              e = this._getTransformedByInsertOperation(t)
              break
            case 'move':
            case 'remove':
            case 'reinsert':
              e = this._getTransformedByMoveOperation(t)
              break
            case 'split':
              e = this._getTransformedBySplitOperation(t)
              break
            case 'merge':
              e = this._getTransformedByMergeOperation(t)
              break
            default:
              e = Fa._createAt(this)
          }
          return e
        }
        _getTransformedByInsertOperation(t) {
          return this._getTransformedByInsertion(t.position, t.howMany)
        }
        _getTransformedByMoveOperation(t) {
          return this._getTransformedByMove(t.sourcePosition, t.targetPosition, t.howMany)
        }
        _getTransformedBySplitOperation(t) {
          const e = t.movedRange
          return e.containsPosition(this) || (e.start.isEqual(this) && 'toNext' == this.stickiness)
            ? this._getCombined(t.splitPosition, t.moveTargetPosition)
            : t.graveyardPosition
            ? this._getTransformedByMove(t.graveyardPosition, t.insertionPosition, 1)
            : this._getTransformedByInsertion(t.insertionPosition, 1)
        }
        _getTransformedByMergeOperation(t) {
          const e = t.movedRange
          let n
          return (
            e.containsPosition(this) || e.start.isEqual(this)
              ? ((n = this._getCombined(t.sourcePosition, t.targetPosition)),
                t.sourcePosition.isBefore(t.targetPosition) && (n = n._getTransformedByDeletion(t.deletionPosition, 1)))
              : (n = this.isEqual(t.deletionPosition)
                  ? Fa._createAt(t.deletionPosition)
                  : this._getTransformedByMove(t.deletionPosition, t.graveyardPosition, 1)),
            n
          )
        }
        _getTransformedByDeletion(t, e) {
          const n = Fa._createAt(this)
          if (this.root != t.root) return n
          if ('same' == Ni(t.getParentPath(), this.getParentPath())) {
            if (t.offset < this.offset) {
              if (t.offset + e > this.offset) return null
              n.offset -= e
            }
          } else if ('prefix' == Ni(t.getParentPath(), this.getParentPath())) {
            const i = t.path.length - 1
            if (t.offset <= this.path[i]) {
              if (t.offset + e > this.path[i]) return null
              n.path[i] -= e
            }
          }
          return n
        }
        _getTransformedByInsertion(t, e) {
          const n = Fa._createAt(this)
          if (this.root != t.root) return n
          if ('same' == Ni(t.getParentPath(), this.getParentPath()))
            (t.offset < this.offset || (t.offset == this.offset && 'toPrevious' != this.stickiness)) && (n.offset += e)
          else if ('prefix' == Ni(t.getParentPath(), this.getParentPath())) {
            const i = t.path.length - 1
            t.offset <= this.path[i] && (n.path[i] += e)
          }
          return n
        }
        _getTransformedByMove(t, e, n) {
          if (((e = e._getTransformedByDeletion(t, n)), t.isEqual(e))) return Fa._createAt(this)
          const i = this._getTransformedByDeletion(t, n)
          return null === i ||
            (t.isEqual(this) && 'toNext' == this.stickiness) ||
            (t.getShiftedBy(n).isEqual(this) && 'toPrevious' == this.stickiness)
            ? this._getCombined(t, e)
            : i._getTransformedByInsertion(e, n)
        }
        _getCombined(t, e) {
          const n = t.path.length - 1,
            i = Fa._createAt(e)
          return (
            (i.stickiness = this.stickiness),
            (i.offset = i.offset + this.path[n] - t.offset),
            (i.path = [...i.path, ...this.path.slice(n + 1)]),
            i
          )
        }
        toJSON() {
          return { root: this.root.toJSON(), path: Array.from(this.path), stickiness: this.stickiness }
        }
        clone() {
          return new this.constructor(this.root, this.path, this.stickiness)
        }
        static _createAt(t, e, n = 'toNone') {
          if (t instanceof Fa) return new Fa(t.root, t.path, t.stickiness)
          {
            const i = t
            if ('end' == e) e = i.maxOffset
            else {
              if ('before' == e) return this._createBefore(i, n)
              if ('after' == e) return this._createAfter(i, n)
              if (0 !== e && !e) throw new c('model-createpositionat-offset-required', [this, t])
            }
            if (!i.is('element') && !i.is('documentFragment')) throw new c('model-position-parent-incorrect', [this, t])
            const s = i.getPath()
            return s.push(e), new this(i.root, s, n)
          }
        }
        static _createAfter(t, e) {
          if (!t.parent) throw new c('model-position-after-root', [this, t], { root: t })
          return this._createAt(t.parent, t.endOffset, e)
        }
        static _createBefore(t, e) {
          if (!t.parent) throw new c('model-position-before-root', t, { root: t })
          return this._createAt(t.parent, t.startOffset, e)
        }
        static fromJSON(t, e) {
          if ('$graveyard' === t.root) {
            const n = new Fa(e.graveyard, t.path)
            return (n.stickiness = t.stickiness), n
          }
          if (!e.getRoot(t.root)) throw new c('model-position-fromjson-no-root', e, { rootName: t.root })
          return new Fa(e.getRoot(t.root), t.path, t.stickiness)
        }
      }
      function Ba(t, e) {
        const n = e.getChild(e.offsetToIndex(t.offset))
        return n && n.is('$text') && n.startOffset < t.offset ? n : null
      }
      function Va(t, e, n) {
        return null !== n ? null : e.getChild(e.offsetToIndex(t.offset))
      }
      function La(t, e, n) {
        return null !== n ? null : e.getChild(e.offsetToIndex(t.offset) - 1)
      }
      class ja {
        constructor(t, e = null) {
          ;(this.start = Fa._createAt(t)),
            (this.end = e ? Fa._createAt(e) : Fa._createAt(t)),
            (this.start.stickiness = this.isCollapsed ? 'toNone' : 'toNext'),
            (this.end.stickiness = this.isCollapsed ? 'toNone' : 'toPrevious')
        }
        *[Symbol.iterator]() {
          yield* new Na({ boundaries: this, ignoreElementEnd: !0 })
        }
        get isCollapsed() {
          return this.start.isEqual(this.end)
        }
        get isFlat() {
          return 'same' == Ni(this.start.getParentPath(), this.end.getParentPath())
        }
        get root() {
          return this.start.root
        }
        containsPosition(t) {
          return t.isAfter(this.start) && t.isBefore(this.end)
        }
        containsRange(t, e = !1) {
          t.isCollapsed && (e = !1)
          const n = this.containsPosition(t.start) || (e && this.start.isEqual(t.start)),
            i = this.containsPosition(t.end) || (e && this.end.isEqual(t.end))
          return n && i
        }
        containsItem(t) {
          const e = Fa._createBefore(t)
          return this.containsPosition(e) || this.start.isEqual(e)
        }
        is(t) {
          return 'range' === t || 'model:range' === t
        }
        isEqual(t) {
          return this.start.isEqual(t.start) && this.end.isEqual(t.end)
        }
        isIntersecting(t) {
          return this.start.isBefore(t.end) && this.end.isAfter(t.start)
        }
        getDifference(t) {
          const e = []
          return (
            this.isIntersecting(t)
              ? (this.containsPosition(t.start) && e.push(new ja(this.start, t.start)),
                this.containsPosition(t.end) && e.push(new ja(t.end, this.end)))
              : e.push(new ja(this.start, this.end)),
            e
          )
        }
        getIntersection(t) {
          if (this.isIntersecting(t)) {
            let e = this.start,
              n = this.end
            return (
              this.containsPosition(t.start) && (e = t.start), this.containsPosition(t.end) && (n = t.end), new ja(e, n)
            )
          }
          return null
        }
        getJoined(t, e = !1) {
          let n = this.isIntersecting(t)
          if (
            (n ||
              (n = this.start.isBefore(t.start)
                ? e
                  ? this.end.isTouching(t.start)
                  : this.end.isEqual(t.start)
                : e
                ? t.end.isTouching(this.start)
                : t.end.isEqual(this.start)),
            !n)
          )
            return null
          let i = this.start,
            s = this.end
          return t.start.isBefore(i) && (i = t.start), t.end.isAfter(s) && (s = t.end), new ja(i, s)
        }
        getMinimalFlatRanges() {
          const t = [],
            e = this.start.getCommonPath(this.end).length,
            n = Fa._createAt(this.start)
          let i = n.parent
          for (; n.path.length > e + 1; ) {
            const e = i.maxOffset - n.offset
            0 !== e && t.push(new ja(n, n.getShiftedBy(e))), (n.path = n.path.slice(0, -1)), n.offset++, (i = i.parent)
          }
          for (; n.path.length <= this.end.path.length; ) {
            const e = this.end.path[n.path.length - 1],
              i = e - n.offset
            0 !== i && t.push(new ja(n, n.getShiftedBy(i))), (n.offset = e), n.path.push(0)
          }
          return t
        }
        getWalker(t = {}) {
          return (t.boundaries = this), new Na(t)
        }
        *getItems(t = {}) {
          ;(t.boundaries = this), (t.ignoreElementEnd = !0)
          const e = new Na(t)
          for (const t of e) yield t.item
        }
        *getPositions(t = {}) {
          t.boundaries = this
          const e = new Na(t)
          yield e.position
          for (const t of e) yield t.nextPosition
        }
        getTransformedByOperation(t) {
          switch (t.type) {
            case 'insert':
              return this._getTransformedByInsertOperation(t)
            case 'move':
            case 'remove':
            case 'reinsert':
              return this._getTransformedByMoveOperation(t)
            case 'split':
              return [this._getTransformedBySplitOperation(t)]
            case 'merge':
              return [this._getTransformedByMergeOperation(t)]
          }
          return [new ja(this.start, this.end)]
        }
        getTransformedByOperations(t) {
          const e = [new ja(this.start, this.end)]
          for (const n of t)
            for (let t = 0; t < e.length; t++) {
              const i = e[t].getTransformedByOperation(n)
              e.splice(t, 1, ...i), (t += i.length - 1)
            }
          for (let t = 0; t < e.length; t++) {
            const n = e[t]
            for (let i = t + 1; i < e.length; i++) {
              const t = e[i]
              ;(n.containsRange(t) || t.containsRange(n) || n.isEqual(t)) && e.splice(i, 1)
            }
          }
          return e
        }
        getCommonAncestor() {
          return this.start.getCommonAncestor(this.end)
        }
        getContainedElement() {
          if (this.isCollapsed) return null
          const t = this.start.nodeAfter,
            e = this.end.nodeBefore
          return t && t.is('element') && t === e ? t : null
        }
        toJSON() {
          return { start: this.start.toJSON(), end: this.end.toJSON() }
        }
        clone() {
          return new this.constructor(this.start, this.end)
        }
        _getTransformedByInsertOperation(t, e = !1) {
          return this._getTransformedByInsertion(t.position, t.howMany, e)
        }
        _getTransformedByMoveOperation(t, e = !1) {
          const n = t.sourcePosition,
            i = t.howMany,
            s = t.targetPosition
          return this._getTransformedByMove(n, s, i, e)
        }
        _getTransformedBySplitOperation(t) {
          const e = this.start._getTransformedBySplitOperation(t)
          let n = this.end._getTransformedBySplitOperation(t)
          return (
            this.end.isEqual(t.insertionPosition) && (n = this.end.getShiftedBy(1)),
            e.root != n.root && (n = this.end.getShiftedBy(-1)),
            new ja(e, n)
          )
        }
        _getTransformedByMergeOperation(t) {
          if (this.start.isEqual(t.targetPosition) && this.end.isEqual(t.deletionPosition)) return new ja(this.start)
          let e = this.start._getTransformedByMergeOperation(t),
            n = this.end._getTransformedByMergeOperation(t)
          return (
            e.root != n.root && (n = this.end.getShiftedBy(-1)),
            e.isAfter(n)
              ? (t.sourcePosition.isBefore(t.targetPosition)
                  ? ((e = Fa._createAt(n)), (e.offset = 0))
                  : (t.deletionPosition.isEqual(e) || (n = t.deletionPosition), (e = t.targetPosition)),
                new ja(e, n))
              : new ja(e, n)
          )
        }
        _getTransformedByInsertion(t, e, n = !1) {
          if (n && this.containsPosition(t))
            return [new ja(this.start, t), new ja(t.getShiftedBy(e), this.end._getTransformedByInsertion(t, e))]
          {
            const n = new ja(this.start, this.end)
            return (
              (n.start = n.start._getTransformedByInsertion(t, e)),
              (n.end = n.end._getTransformedByInsertion(t, e)),
              [n]
            )
          }
        }
        _getTransformedByMove(t, e, n, i = !1) {
          if (this.isCollapsed) {
            const i = this.start._getTransformedByMove(t, e, n)
            return [new ja(i)]
          }
          const s = ja._createFromPositionAndShift(t, n),
            o = e._getTransformedByDeletion(t, n)
          if (this.containsPosition(e) && !i && (s.containsPosition(this.start) || s.containsPosition(this.end))) {
            const i = this.start._getTransformedByMove(t, e, n),
              s = this.end._getTransformedByMove(t, e, n)
            return [new ja(i, s)]
          }
          let r
          const a = this.getDifference(s)
          let c = null
          const l = this.getIntersection(s)
          if (
            (1 == a.length
              ? (c = new ja(a[0].start._getTransformedByDeletion(t, n), a[0].end._getTransformedByDeletion(t, n)))
              : 2 == a.length && (c = new ja(this.start, this.end._getTransformedByDeletion(t, n))),
            (r = c ? c._getTransformedByInsertion(o, n, null !== l || i) : []),
            l)
          ) {
            const t = new ja(l.start._getCombined(s.start, o), l.end._getCombined(s.start, o))
            2 == r.length ? r.splice(1, 0, t) : r.push(t)
          }
          return r
        }
        _getTransformedByDeletion(t, e) {
          let n = this.start._getTransformedByDeletion(t, e),
            i = this.end._getTransformedByDeletion(t, e)
          return null == n && null == i ? null : (null == n && (n = t), null == i && (i = t), new ja(n, i))
        }
        static _createFromPositionAndShift(t, e) {
          const n = t,
            i = t.getShiftedBy(e)
          return e > 0 ? new this(n, i) : new this(i, n)
        }
        static _createIn(t) {
          return new this(Fa._createAt(t, 0), Fa._createAt(t, t.maxOffset))
        }
        static _createOn(t) {
          return this._createFromPositionAndShift(Fa._createBefore(t), t.offsetSize)
        }
        static _createFromRanges(t) {
          if (0 === t.length) throw new c('range-create-from-ranges-empty-array', null)
          if (1 == t.length) return t[0].clone()
          const e = t[0]
          t.sort((t, e) => (t.start.isAfter(e.start) ? 1 : -1))
          const n = t.indexOf(e),
            i = new this(e.start, e.end)
          if (n > 0) for (let e = n - 1; t[e].end.isEqual(i.start); e++) i.start = Fa._createAt(t[e].start)
          for (let e = n + 1; e < t.length && t[e].start.isEqual(i.end); e++) i.end = Fa._createAt(t[e].end)
          return i
        }
        static fromJSON(t, e) {
          return new this(Fa.fromJSON(t.start, e), Fa.fromJSON(t.end, e))
        }
      }
      class Wa {
        constructor() {
          ;(this._modelToViewMapping = new WeakMap()),
            (this._viewToModelMapping = new WeakMap()),
            (this._viewToModelLengthCallbacks = new Map()),
            (this._markerNameToElements = new Map()),
            (this._elementToMarkerNames = new Map()),
            (this._deferredBindingRemovals = new Map()),
            (this._unboundMarkerNames = new Set()),
            this.on(
              'modelToViewPosition',
              (t, e) => {
                if (e.viewPosition) return
                const n = this._modelToViewMapping.get(e.modelPosition.parent)
                if (!n)
                  throw new c('mapping-model-position-view-parent-not-found', this, { modelPosition: e.modelPosition })
                e.viewPosition = this.findPositionIn(n, e.modelPosition.offset)
              },
              { priority: 'low' }
            ),
            this.on(
              'viewToModelPosition',
              (t, e) => {
                if (e.modelPosition) return
                const n = this.findMappedViewAncestor(e.viewPosition),
                  i = this._viewToModelMapping.get(n),
                  s = this._toModelOffset(e.viewPosition.parent, e.viewPosition.offset, n)
                e.modelPosition = Fa._createAt(i, s)
              },
              { priority: 'low' }
            )
        }
        bindElements(t, e) {
          this._modelToViewMapping.set(t, e), this._viewToModelMapping.set(e, t)
        }
        unbindViewElement(t, e = {}) {
          const n = this.toModelElement(t)
          if (this._elementToMarkerNames.has(t))
            for (const e of this._elementToMarkerNames.get(t)) this._unboundMarkerNames.add(e)
          e.defer
            ? this._deferredBindingRemovals.set(t, t.root)
            : (this._viewToModelMapping.delete(t),
              this._modelToViewMapping.get(n) == t && this._modelToViewMapping.delete(n))
        }
        unbindModelElement(t) {
          const e = this.toViewElement(t)
          this._modelToViewMapping.delete(t), this._viewToModelMapping.get(e) == t && this._viewToModelMapping.delete(e)
        }
        bindElementToMarker(t, e) {
          const n = this._markerNameToElements.get(e) || new Set()
          n.add(t)
          const i = this._elementToMarkerNames.get(t) || new Set()
          i.add(e), this._markerNameToElements.set(e, n), this._elementToMarkerNames.set(t, i)
        }
        unbindElementFromMarkerName(t, e) {
          const n = this._markerNameToElements.get(e)
          n && (n.delete(t), 0 == n.size && this._markerNameToElements.delete(e))
          const i = this._elementToMarkerNames.get(t)
          i && (i.delete(e), 0 == i.size && this._elementToMarkerNames.delete(t))
        }
        flushUnboundMarkerNames() {
          const t = Array.from(this._unboundMarkerNames)
          return this._unboundMarkerNames.clear(), t
        }
        flushDeferredBindings() {
          for (const [t, e] of this._deferredBindingRemovals) t.root == e && this.unbindViewElement(t)
          this._deferredBindingRemovals = new Map()
        }
        clearBindings() {
          ;(this._modelToViewMapping = new WeakMap()),
            (this._viewToModelMapping = new WeakMap()),
            (this._markerNameToElements = new Map()),
            (this._elementToMarkerNames = new Map()),
            (this._unboundMarkerNames = new Set()),
            (this._deferredBindingRemovals = new Map())
        }
        toModelElement(t) {
          return this._viewToModelMapping.get(t)
        }
        toViewElement(t) {
          return this._modelToViewMapping.get(t)
        }
        toModelRange(t) {
          return new ja(this.toModelPosition(t.start), this.toModelPosition(t.end))
        }
        toViewRange(t) {
          return new Fs(this.toViewPosition(t.start), this.toViewPosition(t.end))
        }
        toModelPosition(t) {
          const e = { viewPosition: t, mapper: this }
          return this.fire('viewToModelPosition', e), e.modelPosition
        }
        toViewPosition(t, e = { isPhantom: !1 }) {
          const n = { modelPosition: t, mapper: this, isPhantom: e.isPhantom }
          return this.fire('modelToViewPosition', n), n.viewPosition
        }
        markerNameToElements(t) {
          const e = this._markerNameToElements.get(t)
          if (!e) return null
          const n = new Set()
          for (const t of e)
            if (t.is('attributeElement')) for (const e of t.getElementsWithSameId()) n.add(e)
            else n.add(t)
          return n
        }
        registerViewToModelLength(t, e) {
          this._viewToModelLengthCallbacks.set(t, e)
        }
        findMappedViewAncestor(t) {
          let e = t.parent
          for (; !this._viewToModelMapping.has(e); ) e = e.parent
          return e
        }
        _toModelOffset(t, e, n) {
          if (n != t) {
            return this._toModelOffset(t.parent, t.index, n) + this._toModelOffset(t, e, t)
          }
          if (t.is('$text')) return e
          let i = 0
          for (let n = 0; n < e; n++) i += this.getModelLength(t.getChild(n))
          return i
        }
        getModelLength(t) {
          if (this._viewToModelLengthCallbacks.get(t.name)) {
            return this._viewToModelLengthCallbacks.get(t.name)(t)
          }
          if (this._viewToModelMapping.has(t)) return 1
          if (t.is('$text')) return t.data.length
          if (t.is('uiElement')) return 0
          {
            let e = 0
            for (const n of t.getChildren()) e += this.getModelLength(n)
            return e
          }
        }
        findPositionIn(t, e) {
          let n,
            i = 0,
            s = 0,
            o = 0
          if (t.is('$text')) return new Ds(t, e)
          for (; s < e; ) (n = t.getChild(o)), (i = this.getModelLength(n)), (s += i), o++
          return s == e ? this._moveViewPositionToTextNode(new Ds(t, o)) : this.findPositionIn(n, e - (s - i))
        }
        _moveViewPositionToTextNode(t) {
          const e = t.nodeBefore,
            n = t.nodeAfter
          return e instanceof Bi ? new Ds(e, e.data.length) : n instanceof Bi ? new Ds(n, 0) : t
        }
      }
      he(Wa, p)
      class za {
        constructor() {
          ;(this._consumable = new Map()), (this._textProxyRegistry = new Map())
        }
        add(t, e) {
          ;(e = $a(e)),
            t instanceof Oa && (t = this._getSymbolForTextProxy(t)),
            this._consumable.has(t) || this._consumable.set(t, new Map()),
            this._consumable.get(t).set(e, !0)
        }
        consume(t, e) {
          return (
            (e = $a(e)),
            t instanceof Oa && (t = this._getSymbolForTextProxy(t)),
            !!this.test(t, e) && (this._consumable.get(t).set(e, !1), !0)
          )
        }
        test(t, e) {
          ;(e = $a(e)), t instanceof Oa && (t = this._getSymbolForTextProxy(t))
          const n = this._consumable.get(t)
          if (void 0 === n) return null
          const i = n.get(e)
          return void 0 === i ? null : i
        }
        revert(t, e) {
          ;(e = $a(e)), t instanceof Oa && (t = this._getSymbolForTextProxy(t))
          const n = this.test(t, e)
          return !1 === n ? (this._consumable.get(t).set(e, !0), !0) : !0 !== n && null
        }
        verifyAllConsumed(t) {
          const e = []
          for (const [n, i] of this._consumable)
            for (const [s, o] of i) {
              const i = s.split(':')[0]
              o && t == i && e.push({ event: s, item: n.name || n.description })
            }
          if (e.length) throw new c('conversion-model-consumable-not-consumed', null, { items: e })
        }
        _getSymbolForTextProxy(t) {
          let e = null
          const n = this._textProxyRegistry.get(t.startOffset)
          if (n) {
            const i = n.get(t.endOffset)
            i && (e = i.get(t.parent))
          }
          return e || (e = this._addSymbolForTextProxy(t)), e
        }
        _addSymbolForTextProxy(t) {
          const e = t.startOffset,
            n = t.endOffset,
            i = t.parent,
            s = Symbol('$textProxy:' + t.data)
          let o, r
          return (
            (o = this._textProxyRegistry.get(e)),
            o || ((o = new Map()), this._textProxyRegistry.set(e, o)),
            (r = o.get(n)),
            r || ((r = new Map()), o.set(n, r)),
            r.set(i, s),
            s
          )
        }
      }
      function $a(t) {
        const e = t.split(':')
        return 'insert' == e[0]
          ? e[0]
          : 'addMarker' == e[0] || 'removeMarker' == e[0]
          ? t
          : e.length > 1
          ? e[0] + ':' + e[1]
          : e[0]
      }
      class qa {
        constructor(t) {
          ;(this._conversionApi = { dispatcher: this, ...t }), (this._firedEventsMap = new WeakMap())
        }
        convertChanges(t, e, n) {
          const i = this._createConversionApi(n, t.getRefreshedItems())
          for (const e of t.getMarkersToRemove()) this._convertMarkerRemove(e.name, e.range, i)
          const s = this._reduceChanges(t.getChanges())
          for (const t of s)
            'insert' === t.type
              ? this._convertInsert(ja._createFromPositionAndShift(t.position, t.length), i)
              : 'reinsert' === t.type
              ? this._convertReinsert(ja._createFromPositionAndShift(t.position, t.length), i)
              : 'remove' === t.type
              ? this._convertRemove(t.position, t.length, t.name, i)
              : this._convertAttribute(t.range, t.attributeKey, t.attributeOldValue, t.attributeNewValue, i)
          for (const t of i.mapper.flushUnboundMarkerNames()) {
            const n = e.get(t).getRange()
            this._convertMarkerRemove(t, n, i), this._convertMarkerAdd(t, n, i)
          }
          for (const e of t.getMarkersToAdd()) this._convertMarkerAdd(e.name, e.range, i)
          i.mapper.flushDeferredBindings(), i.consumable.verifyAllConsumed('insert')
        }
        convert(t, e, n, i = {}) {
          const s = this._createConversionApi(n, void 0, i)
          this._convertInsert(t, s)
          for (const [t, n] of e) this._convertMarkerAdd(t, n, s)
          s.consumable.verifyAllConsumed('insert')
        }
        convertSelection(t, e, n) {
          const i = Array.from(e.getMarkersAtPosition(t.getFirstPosition())),
            s = this._createConversionApi(n)
          if (
            (this._addConsumablesForSelection(s.consumable, t, i),
            this.fire('selection', { selection: t }, s),
            t.isCollapsed)
          ) {
            for (const e of i) {
              const n = e.getRange()
              if (!Ua(t.getFirstPosition(), e, s.mapper)) continue
              const i = { item: t, markerName: e.name, markerRange: n }
              s.consumable.test(t, 'addMarker:' + e.name) && this.fire('addMarker:' + e.name, i, s)
            }
            for (const e of t.getAttributeKeys()) {
              const n = {
                item: t,
                range: t.getFirstRange(),
                attributeKey: e,
                attributeOldValue: null,
                attributeNewValue: t.getAttribute(e),
              }
              s.consumable.test(t, 'attribute:' + n.attributeKey) &&
                this.fire('attribute:' + n.attributeKey + ':$text', n, s)
            }
          }
        }
        _convertInsert(t, e, n = {}) {
          n.doNotAddConsumables || this._addConsumablesForInsert(e.consumable, Array.from(t))
          for (const n of Array.from(t.getWalker({ shallow: !0 })).map(Ha)) this._testAndFire('insert', n, e)
        }
        _convertRemove(t, e, n, i) {
          this.fire('remove:' + n, { position: t, length: e }, i)
        }
        _convertAttribute(t, e, n, i, s) {
          this._addConsumablesForRange(s.consumable, t, `attribute:${e}`)
          for (const o of t) {
            const t = {
              item: o.item,
              range: ja._createFromPositionAndShift(o.previousPosition, o.length),
              attributeKey: e,
              attributeOldValue: n,
              attributeNewValue: i,
            }
            this._testAndFire(`attribute:${e}`, t, s)
          }
        }
        _convertReinsert(t, e) {
          const n = Array.from(t.getWalker({ shallow: !0 }))
          this._addConsumablesForInsert(e.consumable, n)
          for (const t of n.map(Ha)) this._testAndFire('insert', { ...t, reconversion: !0 }, e)
        }
        _convertMarkerAdd(t, e, n) {
          if ('$graveyard' == e.root.rootName) return
          const i = 'addMarker:' + t
          if (
            (n.consumable.add(e, i), this.fire(i, { markerName: t, markerRange: e }, n), n.consumable.consume(e, i))
          ) {
            this._addConsumablesForRange(n.consumable, e, i)
            for (const s of e.getItems()) {
              if (!n.consumable.test(s, i)) continue
              const o = { item: s, range: ja._createOn(s), markerName: t, markerRange: e }
              this.fire(i, o, n)
            }
          }
        }
        _convertMarkerRemove(t, e, n) {
          '$graveyard' != e.root.rootName && this.fire('removeMarker:' + t, { markerName: t, markerRange: e }, n)
        }
        _reduceChanges(t) {
          const e = { changes: t }
          return this.fire('reduceChanges', e), e.changes
        }
        _addConsumablesForInsert(t, e) {
          for (const n of e) {
            const e = n.item
            if (null === t.test(e, 'insert')) {
              t.add(e, 'insert')
              for (const n of e.getAttributeKeys()) t.add(e, 'attribute:' + n)
            }
          }
          return t
        }
        _addConsumablesForRange(t, e, n) {
          for (const i of e.getItems()) t.add(i, n)
          return t
        }
        _addConsumablesForSelection(t, e, n) {
          t.add(e, 'selection')
          for (const i of n) t.add(e, 'addMarker:' + i.name)
          for (const n of e.getAttributeKeys()) t.add(e, 'attribute:' + n)
          return t
        }
        _testAndFire(t, e, n) {
          const i = (function (t, e) {
              const n = e.item.name || '$text'
              return `${t}:${n}`
            })(t, e),
            s = e.item.is('$textProxy') ? n.consumable._getSymbolForTextProxy(e.item) : e.item,
            o = this._firedEventsMap.get(n),
            r = o.get(s)
          if (r) {
            if (r.has(i)) return
            r.add(i)
          } else o.set(s, new Set([i]))
          this.fire(i, e, n)
        }
        _testAndFireAddAttributes(t, e) {
          const n = { item: t, range: ja._createOn(t) }
          for (const t of n.item.getAttributeKeys())
            (n.attributeKey = t),
              (n.attributeOldValue = null),
              (n.attributeNewValue = n.item.getAttribute(t)),
              this._testAndFire(`attribute:${t}`, n, e)
        }
        _createConversionApi(t, e = new Set(), n = {}) {
          const i = {
            ...this._conversionApi,
            consumable: new za(),
            writer: t,
            options: n,
            convertItem: t => this._convertInsert(ja._createOn(t), i),
            convertChildren: t => this._convertInsert(ja._createIn(t), i, { doNotAddConsumables: !0 }),
            convertAttributes: t => this._testAndFireAddAttributes(t, i),
            canReuseView: t => !e.has(i.mapper.toModelElement(t)),
          }
          return this._firedEventsMap.set(i, new Map()), i
        }
      }
      function Ua(t, e, n) {
        const i = e.getRange(),
          s = Array.from(t.getAncestors())
        s.shift(), s.reverse()
        return !s.some(t => {
          if (i.containsItem(t)) {
            return !!n.toViewElement(t).getCustomProperty('addHighlight')
          }
        })
      }
      function Ha(t) {
        return { item: t.item, range: ja._createFromPositionAndShift(t.previousPosition, t.length) }
      }
      he(qa, p)
      class Ka {
        constructor(t, e, n) {
          ;(this._lastRangeBackward = !1), (this._ranges = []), (this._attrs = new Map()), t && this.setTo(t, e, n)
        }
        get anchor() {
          if (this._ranges.length > 0) {
            const t = this._ranges[this._ranges.length - 1]
            return this._lastRangeBackward ? t.end : t.start
          }
          return null
        }
        get focus() {
          if (this._ranges.length > 0) {
            const t = this._ranges[this._ranges.length - 1]
            return this._lastRangeBackward ? t.start : t.end
          }
          return null
        }
        get isCollapsed() {
          return 1 === this._ranges.length && this._ranges[0].isCollapsed
        }
        get rangeCount() {
          return this._ranges.length
        }
        get isBackward() {
          return !this.isCollapsed && this._lastRangeBackward
        }
        isEqual(t) {
          if (this.rangeCount != t.rangeCount) return !1
          if (0 === this.rangeCount) return !0
          if (!this.anchor.isEqual(t.anchor) || !this.focus.isEqual(t.focus)) return !1
          for (const e of this._ranges) {
            let n = !1
            for (const i of t._ranges)
              if (e.isEqual(i)) {
                n = !0
                break
              }
            if (!n) return !1
          }
          return !0
        }
        *getRanges() {
          for (const t of this._ranges) yield new ja(t.start, t.end)
        }
        getFirstRange() {
          let t = null
          for (const e of this._ranges) (t && !e.start.isBefore(t.start)) || (t = e)
          return t ? new ja(t.start, t.end) : null
        }
        getLastRange() {
          let t = null
          for (const e of this._ranges) (t && !e.end.isAfter(t.end)) || (t = e)
          return t ? new ja(t.start, t.end) : null
        }
        getFirstPosition() {
          const t = this.getFirstRange()
          return t ? t.start.clone() : null
        }
        getLastPosition() {
          const t = this.getLastRange()
          return t ? t.end.clone() : null
        }
        setTo(t, e, n) {
          if (null === t) this._setRanges([])
          else if (t instanceof Ka) this._setRanges(t.getRanges(), t.isBackward)
          else if (t && 'function' == typeof t.getRanges) this._setRanges(t.getRanges(), t.isBackward)
          else if (t instanceof ja) this._setRanges([t], !!e && !!e.backward)
          else if (t instanceof Fa) this._setRanges([new ja(t)])
          else if (t instanceof Ta) {
            const i = !!n && !!n.backward
            let s
            if ('in' == e) s = ja._createIn(t)
            else if ('on' == e) s = ja._createOn(t)
            else {
              if (void 0 === e) throw new c('model-selection-setto-required-second-parameter', [this, t])
              s = new ja(Fa._createAt(t, e))
            }
            this._setRanges([s], i)
          } else {
            if (!Ai(t)) throw new c('model-selection-setto-not-selectable', [this, t])
            this._setRanges(t, e && !!e.backward)
          }
        }
        _setRanges(t, e = !1) {
          const n = (t = Array.from(t)).some(e => {
            if (!(e instanceof ja)) throw new c('model-selection-set-ranges-not-range', [this, t])
            return this._ranges.every(t => !t.isEqual(e))
          })
          if (t.length !== this._ranges.length || n) {
            this._removeAllRanges()
            for (const e of t) this._pushRange(e)
            ;(this._lastRangeBackward = !!e), this.fire('change:range', { directChange: !0 })
          }
        }
        setFocus(t, e) {
          if (null === this.anchor) throw new c('model-selection-setfocus-no-ranges', [this, t])
          const n = Fa._createAt(t, e)
          if ('same' == n.compareWith(this.focus)) return
          const i = this.anchor
          this._ranges.length && this._popRange(),
            'before' == n.compareWith(i)
              ? (this._pushRange(new ja(n, i)), (this._lastRangeBackward = !0))
              : (this._pushRange(new ja(i, n)), (this._lastRangeBackward = !1)),
            this.fire('change:range', { directChange: !0 })
        }
        getAttribute(t) {
          return this._attrs.get(t)
        }
        getAttributes() {
          return this._attrs.entries()
        }
        getAttributeKeys() {
          return this._attrs.keys()
        }
        hasAttribute(t) {
          return this._attrs.has(t)
        }
        removeAttribute(t) {
          this.hasAttribute(t) &&
            (this._attrs.delete(t), this.fire('change:attribute', { attributeKeys: [t], directChange: !0 }))
        }
        setAttribute(t, e) {
          this.getAttribute(t) !== e &&
            (this._attrs.set(t, e), this.fire('change:attribute', { attributeKeys: [t], directChange: !0 }))
        }
        getSelectedElement() {
          return 1 !== this.rangeCount ? null : this.getFirstRange().getContainedElement()
        }
        is(t) {
          return 'selection' === t || 'model:selection' === t
        }
        *getSelectedBlocks() {
          const t = new WeakSet()
          for (const e of this.getRanges()) {
            const n = Ya(e.start, t)
            n && Xa(n, e) && (yield n)
            for (const n of e.getWalker()) {
              const i = n.item
              'elementEnd' == n.type && Ja(i, t, e) && (yield i)
            }
            const i = Ya(e.end, t)
            i && !e.end.isTouching(Fa._createAt(i, 0)) && Xa(i, e) && (yield i)
          }
        }
        containsEntireContent(t = this.anchor.root) {
          const e = Fa._createAt(t, 0),
            n = Fa._createAt(t, 'end')
          return e.isTouching(this.getFirstPosition()) && n.isTouching(this.getLastPosition())
        }
        _pushRange(t) {
          this._checkRange(t), this._ranges.push(new ja(t.start, t.end))
        }
        _checkRange(t) {
          for (let e = 0; e < this._ranges.length; e++)
            if (t.isIntersecting(this._ranges[e]))
              throw new c('model-selection-range-intersects', [this, t], {
                addedRange: t,
                intersectingRange: this._ranges[e],
              })
        }
        _removeAllRanges() {
          for (; this._ranges.length > 0; ) this._popRange()
        }
        _popRange() {
          this._ranges.pop()
        }
      }
      function Ga(t, e) {
        return !e.has(t) && (e.add(t), t.root.document.model.schema.isBlock(t) && t.parent)
      }
      function Ja(t, e, n) {
        return Ga(t, e) && Xa(t, n)
      }
      function Ya(t, e) {
        const n = t.parent.root.document.model.schema,
          i = t.parent.getAncestors({ parentFirst: !0, includeSelf: !0 })
        let s = !1
        const o = i.find(t => !s && ((s = n.isLimit(t)), !s && Ga(t, e)))
        return i.forEach(t => e.add(t)), o
      }
      function Xa(t, e) {
        const n = (function (t) {
          const e = t.root.document.model.schema
          let n = t.parent
          for (; n; ) {
            if (e.isBlock(n)) return n
            n = n.parent
          }
        })(t)
        if (!n) return !0
        return !e.containsRange(ja._createOn(n), !0)
      }
      he(Ka, p)
      class Za extends ja {
        constructor(t, e) {
          super(t, e), Qa.call(this)
        }
        detach() {
          this.stopListening()
        }
        is(t) {
          return 'liveRange' === t || 'model:liveRange' === t || 'range' == t || 'model:range' === t
        }
        toRange() {
          return new ja(this.start, this.end)
        }
        static fromRange(t) {
          return new Za(t.start, t.end)
        }
      }
      function Qa() {
        this.listenTo(
          this.root.document.model,
          'applyOperation',
          (t, e) => {
            const n = e[0]
            n.isDocumentOperation && tc.call(this, n)
          },
          { priority: 'low' }
        )
      }
      function tc(t) {
        const e = this.getTransformedByOperation(t),
          n = ja._createFromRanges(e),
          i = !n.isEqual(this),
          s = (function (t, e) {
            switch (e.type) {
              case 'insert':
                return t.containsPosition(e.position)
              case 'move':
              case 'remove':
              case 'reinsert':
              case 'merge':
                return (
                  t.containsPosition(e.sourcePosition) ||
                  t.start.isEqual(e.sourcePosition) ||
                  t.containsPosition(e.targetPosition)
                )
              case 'split':
                return t.containsPosition(e.splitPosition) || t.containsPosition(e.insertionPosition)
            }
            return !1
          })(this, t)
        let o = null
        if (i) {
          '$graveyard' == n.root.rootName && (o = 'remove' == t.type ? t.sourcePosition : t.deletionPosition)
          const e = this.toRange()
          ;(this.start = n.start), (this.end = n.end), this.fire('change:range', e, { deletionPosition: o })
        } else s && this.fire('change:content', this.toRange(), { deletionPosition: o })
      }
      he(Za, p)
      const ec = 'selection:'
      class nc {
        constructor(t) {
          ;(this._selection = new ic(t)),
            this._selection.delegate('change:range').to(this),
            this._selection.delegate('change:attribute').to(this),
            this._selection.delegate('change:marker').to(this)
        }
        get isCollapsed() {
          return this._selection.isCollapsed
        }
        get anchor() {
          return this._selection.anchor
        }
        get focus() {
          return this._selection.focus
        }
        get rangeCount() {
          return this._selection.rangeCount
        }
        get hasOwnRange() {
          return this._selection.hasOwnRange
        }
        get isBackward() {
          return this._selection.isBackward
        }
        get isGravityOverridden() {
          return this._selection.isGravityOverridden
        }
        get markers() {
          return this._selection.markers
        }
        get _ranges() {
          return this._selection._ranges
        }
        getRanges() {
          return this._selection.getRanges()
        }
        getFirstPosition() {
          return this._selection.getFirstPosition()
        }
        getLastPosition() {
          return this._selection.getLastPosition()
        }
        getFirstRange() {
          return this._selection.getFirstRange()
        }
        getLastRange() {
          return this._selection.getLastRange()
        }
        getSelectedBlocks() {
          return this._selection.getSelectedBlocks()
        }
        getSelectedElement() {
          return this._selection.getSelectedElement()
        }
        containsEntireContent(t) {
          return this._selection.containsEntireContent(t)
        }
        destroy() {
          this._selection.destroy()
        }
        getAttributeKeys() {
          return this._selection.getAttributeKeys()
        }
        getAttributes() {
          return this._selection.getAttributes()
        }
        getAttribute(t) {
          return this._selection.getAttribute(t)
        }
        hasAttribute(t) {
          return this._selection.hasAttribute(t)
        }
        refresh() {
          this._selection._updateMarkers(), this._selection._updateAttributes(!1)
        }
        observeMarkers(t) {
          this._selection.observeMarkers(t)
        }
        is(t) {
          return (
            'selection' === t || 'model:selection' == t || 'documentSelection' == t || 'model:documentSelection' == t
          )
        }
        _setFocus(t, e) {
          this._selection.setFocus(t, e)
        }
        _setTo(t, e, n) {
          this._selection.setTo(t, e, n)
        }
        _setAttribute(t, e) {
          this._selection.setAttribute(t, e)
        }
        _removeAttribute(t) {
          this._selection.removeAttribute(t)
        }
        _getStoredAttributes() {
          return this._selection._getStoredAttributes()
        }
        _overrideGravity() {
          return this._selection.overrideGravity()
        }
        _restoreGravity(t) {
          this._selection.restoreGravity(t)
        }
        static _getStoreAttributeKey(t) {
          return ec + t
        }
        static _isStoreAttributeKey(t) {
          return t.startsWith(ec)
        }
      }
      he(nc, p)
      class ic extends Ka {
        constructor(t) {
          super(),
            (this.markers = new Ci({ idProperty: 'name' })),
            (this._model = t.model),
            (this._document = t),
            (this._attributePriority = new Map()),
            (this._selectionRestorePosition = null),
            (this._hasChangedRange = !1),
            (this._overriddenGravityRegister = new Set()),
            (this._observedMarkers = new Set()),
            this.listenTo(
              this._model,
              'applyOperation',
              (t, e) => {
                const n = e[0]
                n.isDocumentOperation &&
                  'marker' != n.type &&
                  'rename' != n.type &&
                  'noop' != n.type &&
                  (0 == this._ranges.length &&
                    this._selectionRestorePosition &&
                    this._fixGraveyardSelection(this._selectionRestorePosition),
                  (this._selectionRestorePosition = null),
                  this._hasChangedRange &&
                    ((this._hasChangedRange = !1), this.fire('change:range', { directChange: !1 })))
              },
              { priority: 'lowest' }
            ),
            this.on('change:range', () => {
              for (const t of this.getRanges())
                if (!this._document._validateSelectionRange(t))
                  throw new c('document-selection-wrong-position', this, { range: t })
            }),
            this.listenTo(this._model.markers, 'update', (t, e, n, i) => {
              this._updateMarker(e, i)
            }),
            this.listenTo(this._document, 'change', (t, e) => {
              !(function (t, e) {
                const n = t.document.differ
                for (const i of n.getChanges()) {
                  if ('insert' != i.type) continue
                  const n = i.position.parent
                  i.length === n.maxOffset &&
                    t.enqueueChange(e, t => {
                      const e = Array.from(n.getAttributeKeys()).filter(t => t.startsWith(ec))
                      for (const i of e) t.removeAttribute(i, n)
                    })
                }
              })(this._model, e)
            })
        }
        get isCollapsed() {
          return 0 === this._ranges.length ? this._document._getDefaultRange().isCollapsed : super.isCollapsed
        }
        get anchor() {
          return super.anchor || this._document._getDefaultRange().start
        }
        get focus() {
          return super.focus || this._document._getDefaultRange().end
        }
        get rangeCount() {
          return this._ranges.length ? this._ranges.length : 1
        }
        get hasOwnRange() {
          return this._ranges.length > 0
        }
        get isGravityOverridden() {
          return !!this._overriddenGravityRegister.size
        }
        destroy() {
          for (let t = 0; t < this._ranges.length; t++) this._ranges[t].detach()
          this.stopListening()
        }
        *getRanges() {
          this._ranges.length ? yield* super.getRanges() : yield this._document._getDefaultRange()
        }
        getFirstRange() {
          return super.getFirstRange() || this._document._getDefaultRange()
        }
        getLastRange() {
          return super.getLastRange() || this._document._getDefaultRange()
        }
        setTo(t, e, n) {
          super.setTo(t, e, n), this._updateAttributes(!0), this._updateMarkers()
        }
        setFocus(t, e) {
          super.setFocus(t, e), this._updateAttributes(!0), this._updateMarkers()
        }
        setAttribute(t, e) {
          if (this._setAttribute(t, e)) {
            const e = [t]
            this.fire('change:attribute', { attributeKeys: e, directChange: !0 })
          }
        }
        removeAttribute(t) {
          if (this._removeAttribute(t)) {
            const e = [t]
            this.fire('change:attribute', { attributeKeys: e, directChange: !0 })
          }
        }
        overrideGravity() {
          const t = o()
          return (
            this._overriddenGravityRegister.add(t),
            1 === this._overriddenGravityRegister.size && this._updateAttributes(!0),
            t
          )
        }
        restoreGravity(t) {
          if (!this._overriddenGravityRegister.has(t))
            throw new c('document-selection-gravity-wrong-restore', this, { uid: t })
          this._overriddenGravityRegister.delete(t), this.isGravityOverridden || this._updateAttributes(!0)
        }
        observeMarkers(t) {
          this._observedMarkers.add(t), this._updateMarkers()
        }
        _popRange() {
          this._ranges.pop().detach()
        }
        _pushRange(t) {
          const e = this._prepareRange(t)
          e && this._ranges.push(e)
        }
        _prepareRange(t) {
          if ((this._checkRange(t), t.root == this._document.graveyard)) return
          const e = Za.fromRange(t)
          return (
            e.on('change:range', (t, n, i) => {
              if (((this._hasChangedRange = !0), e.root == this._document.graveyard)) {
                this._selectionRestorePosition = i.deletionPosition
                const t = this._ranges.indexOf(e)
                this._ranges.splice(t, 1), e.detach()
              }
            }),
            e
          )
        }
        _updateMarkers() {
          if (!this._observedMarkers.size) return
          const t = []
          let e = !1
          for (const e of this._model.markers) {
            const n = e.name.split(':', 1)[0]
            if (!this._observedMarkers.has(n)) continue
            const i = e.getRange()
            for (const n of this.getRanges()) i.containsRange(n, !n.isCollapsed) && t.push(e)
          }
          const n = Array.from(this.markers)
          for (const n of t) this.markers.has(n) || (this.markers.add(n), (e = !0))
          for (const n of Array.from(this.markers)) t.includes(n) || (this.markers.remove(n), (e = !0))
          e && this.fire('change:marker', { oldMarkers: n, directChange: !1 })
        }
        _updateMarker(t, e) {
          const n = t.name.split(':', 1)[0]
          if (!this._observedMarkers.has(n)) return
          let i = !1
          const s = Array.from(this.markers),
            o = this.markers.has(t)
          if (e) {
            let n = !1
            for (const t of this.getRanges())
              if (e.containsRange(t, !t.isCollapsed)) {
                n = !0
                break
              }
            n && !o ? (this.markers.add(t), (i = !0)) : !n && o && (this.markers.remove(t), (i = !0))
          } else o && (this.markers.remove(t), (i = !0))
          i && this.fire('change:marker', { oldMarkers: s, directChange: !1 })
        }
        _updateAttributes(t) {
          const e = Li(this._getSurroundingAttributes()),
            n = Li(this.getAttributes())
          if (t) (this._attributePriority = new Map()), (this._attrs = new Map())
          else
            for (const [t, e] of this._attributePriority)
              'low' == e && (this._attrs.delete(t), this._attributePriority.delete(t))
          this._setAttributesTo(e)
          const i = []
          for (const [t, e] of this.getAttributes()) (n.has(t) && n.get(t) === e) || i.push(t)
          for (const [t] of n) this.hasAttribute(t) || i.push(t)
          i.length > 0 && this.fire('change:attribute', { attributeKeys: i, directChange: !1 })
        }
        _setAttribute(t, e, n = !0) {
          const i = n ? 'normal' : 'low'
          if ('low' == i && 'normal' == this._attributePriority.get(t)) return !1
          return super.getAttribute(t) !== e && (this._attrs.set(t, e), this._attributePriority.set(t, i), !0)
        }
        _removeAttribute(t, e = !0) {
          const n = e ? 'normal' : 'low'
          return (
            ('low' != n || 'normal' != this._attributePriority.get(t)) &&
            (this._attributePriority.set(t, n), !!super.hasAttribute(t) && (this._attrs.delete(t), !0))
          )
        }
        _setAttributesTo(t) {
          const e = new Set()
          for (const [e, n] of this.getAttributes()) t.get(e) !== n && this._removeAttribute(e, !1)
          for (const [n, i] of t) {
            this._setAttribute(n, i, !1) && e.add(n)
          }
          return e
        }
        *_getStoredAttributes() {
          const t = this.getFirstPosition().parent
          if (this.isCollapsed && t.isEmpty)
            for (const e of t.getAttributeKeys())
              if (e.startsWith(ec)) {
                const n = e.substr(ec.length)
                yield [n, t.getAttribute(e)]
              }
        }
        _getSurroundingAttributes() {
          const t = this.getFirstPosition(),
            e = this._model.schema
          let n = null
          if (this.isCollapsed) {
            const i = t.textNode ? t.textNode : t.nodeBefore,
              s = t.textNode ? t.textNode : t.nodeAfter
            if ((this.isGravityOverridden || (n = sc(i)), n || (n = sc(s)), !this.isGravityOverridden && !n)) {
              let t = i
              for (; t && !e.isInline(t) && !n; ) (t = t.previousSibling), (n = sc(t))
            }
            if (!n) {
              let t = s
              for (; t && !e.isInline(t) && !n; ) (t = t.nextSibling), (n = sc(t))
            }
            n || (n = this._getStoredAttributes())
          } else {
            const t = this.getFirstRange()
            for (const i of t) {
              if (i.item.is('element') && e.isObject(i.item)) break
              if ('text' == i.type) {
                n = i.item.getAttributes()
                break
              }
            }
          }
          return n
        }
        _fixGraveyardSelection(t) {
          const e = this._model.schema.getNearestSelectionRange(t)
          e && this._pushRange(e)
        }
      }
      function sc(t) {
        return t instanceof Oa || t instanceof Ra ? t.getAttributes() : null
      }
      class oc {
        constructor(t) {
          this._dispatchers = t
        }
        add(t) {
          for (const e of this._dispatchers) t(e)
          return this
        }
      }
      const rc = function (t) {
        return wi(t, 5)
      }
      class ac extends oc {
        elementToElement(t) {
          return this.add(
            (function (t) {
              ;((t = rc(t)).model = hc(t.model)),
                (t.view = dc(t.view, 'container')),
                t.model.attributes.length && (t.model.children = !0)
              return e => {
                e.on(
                  'insert:' + t.model.name,
                  (function (t, e = bc) {
                    return (n, i, s) => {
                      if (!e(i.item, s.consumable, { preflight: !0 })) return
                      const o = t(i.item, s, i)
                      if (!o) return
                      e(i.item, s.consumable)
                      const r = s.mapper.toViewPosition(i.range.start)
                      s.mapper.bindElements(i.item, o),
                        s.writer.insert(r, o),
                        s.convertAttributes(i.item),
                        _c(o, i.item.getChildren(), s, { reconversion: i.reconversion })
                    }
                  })(t.view, pc(t.model)),
                  { priority: t.converterPriority || 'normal' }
                ),
                  (t.model.children || t.model.attributes.length) &&
                    e.on('reduceChanges', gc(t.model), { priority: 'low' })
              }
            })(t)
          )
        }
        elementToStructure(t) {
          return this.add(
            (function (t) {
              return (
                ((t = rc(t)).model = hc(t.model)),
                (t.view = dc(t.view, 'container')),
                (t.model.children = !0),
                e => {
                  if (e._conversionApi.schema.checkChild(t.model.name, '$text'))
                    throw new c('conversion-element-to-structure-disallowed-text', e, { elementName: t.model.name })
                  var n, i
                  e.on(
                    'insert:' + t.model.name,
                    ((n = t.view),
                    (i = pc(t.model)),
                    (t, e, s) => {
                      if (!i(e.item, s.consumable, { preflight: !0 })) return
                      const o = new Map()
                      s.writer._registerSlotFactory(
                        (function (t, e, n) {
                          return (i, s = 'children') => {
                            const o = i.createContainerElement('$slot')
                            let r = null
                            if ('children' === s) r = Array.from(t.getChildren())
                            else {
                              if ('function' != typeof s)
                                throw new c('conversion-slot-mode-unknown', n.dispatcher, { modeOrFilter: s })
                              r = Array.from(t.getChildren()).filter(t => s(t))
                            }
                            return e.set(o, r), o
                          }
                        })(e.item, o, s)
                      )
                      const r = n(e.item, s, e)
                      if ((s.writer._clearSlotFactory(), !r)) return
                      !(function (t, e, n) {
                        const i = Array.from(e.values()).flat(),
                          s = new Set(i)
                        if (s.size != i.length)
                          throw new c('conversion-slot-filter-overlap', n.dispatcher, { element: t })
                        if (s.size != t.childCount)
                          throw new c('conversion-slot-filter-incomplete', n.dispatcher, { element: t })
                      })(e.item, o, s),
                        i(e.item, s.consumable)
                      const a = s.mapper.toViewPosition(e.range.start)
                      s.mapper.bindElements(e.item, r),
                        s.writer.insert(a, r),
                        s.convertAttributes(e.item),
                        (function (t, e, n, i) {
                          n.mapper.on('modelToViewPosition', r, { priority: 'highest' })
                          let s = null,
                            o = null
                          for ([s, o] of e)
                            _c(t, o, n, i),
                              n.writer.move(n.writer.createRangeIn(s), n.writer.createPositionBefore(s)),
                              n.writer.remove(s)
                          function r(t, e) {
                            const n = e.modelPosition.nodeAfter,
                              i = o.indexOf(n)
                            i < 0 || (e.viewPosition = e.mapper.findPositionIn(s, i))
                          }
                          n.mapper.off('modelToViewPosition', r)
                        })(r, o, s, { reconversion: e.reconversion })
                    }),
                    { priority: t.converterPriority || 'normal' }
                  ),
                    e.on('reduceChanges', gc(t.model), { priority: 'low' })
                }
              )
            })(t)
          )
        }
        attributeToElement(t) {
          return this.add(
            (function (t) {
              t = rc(t)
              let e = 'attribute:' + (t.model.key ? t.model.key : t.model)
              t.model.name && (e += ':' + t.model.name)
              if (t.model.values) for (const e of t.model.values) t.view[e] = dc(t.view[e], 'attribute')
              else t.view = dc(t.view, 'attribute')
              const n = uc(t)
              return i => {
                i.on(
                  e,
                  (function (t) {
                    return (e, n, i) => {
                      if (!i.consumable.test(n.item, e.name)) return
                      const s = t(n.attributeOldValue, i, n),
                        o = t(n.attributeNewValue, i, n)
                      if (!s && !o) return
                      i.consumable.consume(n.item, e.name)
                      const r = i.writer,
                        a = r.document.selection
                      if (n.item instanceof Ka || n.item instanceof nc) r.wrap(a.getFirstRange(), o)
                      else {
                        let t = i.mapper.toViewRange(n.range)
                        null !== n.attributeOldValue && s && (t = r.unwrap(t, s)),
                          null !== n.attributeNewValue && o && r.wrap(t, o)
                      }
                    }
                  })(n),
                  { priority: t.converterPriority || 'normal' }
                )
              }
            })(t)
          )
        }
        attributeToAttribute(t) {
          return this.add(
            (function (t) {
              t = rc(t)
              let e = 'attribute:' + (t.model.key ? t.model.key : t.model)
              t.model.name && (e += ':' + t.model.name)
              if (t.model.values) for (const e of t.model.values) t.view[e] = fc(t.view[e])
              else t.view = fc(t.view)
              const n = uc(t)
              return i => {
                var s
                i.on(
                  e,
                  ((s = n),
                  (t, e, n) => {
                    if (!n.consumable.test(e.item, t.name)) return
                    const i = s(e.attributeOldValue, n, e),
                      o = s(e.attributeNewValue, n, e)
                    if (!i && !o) return
                    n.consumable.consume(e.item, t.name)
                    const r = n.mapper.toViewElement(e.item),
                      a = n.writer
                    if (!r) throw new c('conversion-attribute-to-attribute-on-text', n.dispatcher, e)
                    if (null !== e.attributeOldValue && i)
                      if ('class' == i.key) {
                        const t = Si(i.value)
                        for (const e of t) a.removeClass(e, r)
                      } else if ('style' == i.key) {
                        const t = Object.keys(i.value)
                        for (const e of t) a.removeStyle(e, r)
                      } else a.removeAttribute(i.key, r)
                    if (null !== e.attributeNewValue && o)
                      if ('class' == o.key) {
                        const t = Si(o.value)
                        for (const e of t) a.addClass(e, r)
                      } else if ('style' == o.key) {
                        const t = Object.keys(o.value)
                        for (const e of t) a.setStyle(e, o.value[e], r)
                      } else a.setAttribute(o.key, o.value, r)
                  }),
                  { priority: t.converterPriority || 'normal' }
                )
              }
            })(t)
          )
        }
        markerToElement(t) {
          return this.add(
            (function (t) {
              return (
                ((t = rc(t)).view = dc(t.view, 'ui')),
                e => {
                  var n
                  e.on(
                    'addMarker:' + t.model,
                    ((n = t.view),
                    (t, e, i) => {
                      e.isOpening = !0
                      const s = n(e, i)
                      e.isOpening = !1
                      const o = n(e, i)
                      if (!s || !o) return
                      const r = e.markerRange
                      if (r.isCollapsed && !i.consumable.consume(r, t.name)) return
                      for (const e of r) if (!i.consumable.consume(e.item, t.name)) return
                      const a = i.mapper,
                        c = i.writer
                      c.insert(a.toViewPosition(r.start), s),
                        i.mapper.bindElementToMarker(s, e.markerName),
                        r.isCollapsed ||
                          (c.insert(a.toViewPosition(r.end), o), i.mapper.bindElementToMarker(o, e.markerName)),
                        t.stop()
                    }),
                    { priority: t.converterPriority || 'normal' }
                  ),
                    e.on(
                      'removeMarker:' + t.model,
                      (t.view,
                      (t, e, n) => {
                        const i = n.mapper.markerNameToElements(e.markerName)
                        if (i) {
                          for (const t of i)
                            n.mapper.unbindElementFromMarkerName(t, e.markerName),
                              n.writer.clear(n.writer.createRangeOn(t), t)
                          n.writer.clearClonedElementsGroup(e.markerName), t.stop()
                        }
                      }),
                      { priority: t.converterPriority || 'normal' }
                    )
                }
              )
            })(t)
          )
        }
        markerToHighlight(t) {
          return this.add(
            (function (t) {
              return e => {
                var n
                e.on(
                  'addMarker:' + t.model,
                  ((n = t.view),
                  (t, e, i) => {
                    if (!e.item) return
                    if (!(e.item instanceof Ka || e.item instanceof nc || e.item.is('$textProxy'))) return
                    const s = mc(n, e, i)
                    if (!s) return
                    if (!i.consumable.consume(e.item, t.name)) return
                    const o = i.writer,
                      r = cc(o, s),
                      a = o.document.selection
                    if (e.item instanceof Ka || e.item instanceof nc) o.wrap(a.getFirstRange(), r, a)
                    else {
                      const t = i.mapper.toViewRange(e.range),
                        n = o.wrap(t, r)
                      for (const t of n.getItems())
                        if (t.is('attributeElement') && t.isSimilar(r)) {
                          i.mapper.bindElementToMarker(t, e.markerName)
                          break
                        }
                    }
                  }),
                  { priority: t.converterPriority || 'normal' }
                ),
                  e.on(
                    'addMarker:' + t.model,
                    (function (t) {
                      return (e, n, i) => {
                        if (!n.item) return
                        if (!(n.item instanceof Ma)) return
                        const s = mc(t, n, i)
                        if (!s) return
                        if (!i.consumable.test(n.item, e.name)) return
                        const o = i.mapper.toViewElement(n.item)
                        if (o && o.getCustomProperty('addHighlight')) {
                          i.consumable.consume(n.item, e.name)
                          for (const t of ja._createIn(n.item)) i.consumable.consume(t.item, e.name)
                          o.getCustomProperty('addHighlight')(o, s, i.writer),
                            i.mapper.bindElementToMarker(o, n.markerName)
                        }
                      }
                    })(t.view),
                    { priority: t.converterPriority || 'normal' }
                  ),
                  e.on(
                    'removeMarker:' + t.model,
                    (function (t) {
                      return (e, n, i) => {
                        if (n.markerRange.isCollapsed) return
                        const s = mc(t, n, i)
                        if (!s) return
                        const o = cc(i.writer, s),
                          r = i.mapper.markerNameToElements(n.markerName)
                        if (r) {
                          for (const t of r)
                            i.mapper.unbindElementFromMarkerName(t, n.markerName),
                              t.is('attributeElement')
                                ? i.writer.unwrap(i.writer.createRangeOn(t), o)
                                : t.getCustomProperty('removeHighlight')(t, s.id, i.writer)
                          i.writer.clearClonedElementsGroup(n.markerName), e.stop()
                        }
                      }
                    })(t.view),
                    { priority: t.converterPriority || 'normal' }
                  )
              }
            })(t)
          )
        }
        markerToData(t) {
          return this.add(
            (function (t) {
              const e = (t = rc(t)).model
              t.view || (t.view = n => ({ group: e, name: n.substr(t.model.length + 1) }))
              return n => {
                var i
                n.on(
                  'addMarker:' + e,
                  ((i = t.view),
                  (t, e, n) => {
                    const s = i(e.markerName, n)
                    if (!s) return
                    const o = e.markerRange
                    n.consumable.consume(o, t.name) && (lc(o, !1, n, e, s), lc(o, !0, n, e, s), t.stop())
                  }),
                  { priority: t.converterPriority || 'normal' }
                ),
                  n.on(
                    'removeMarker:' + e,
                    (function (t) {
                      return (e, n, i) => {
                        const s = t(n.markerName, i)
                        if (!s) return
                        const o = i.mapper.markerNameToElements(n.markerName)
                        if (o) {
                          for (const t of o)
                            i.mapper.unbindElementFromMarkerName(t, n.markerName),
                              t.is('containerElement')
                                ? (r(`data-${s.group}-start-before`, t),
                                  r(`data-${s.group}-start-after`, t),
                                  r(`data-${s.group}-end-before`, t),
                                  r(`data-${s.group}-end-after`, t))
                                : i.writer.clear(i.writer.createRangeOn(t), t)
                          i.writer.clearClonedElementsGroup(n.markerName), e.stop()
                        }
                        function r(t, e) {
                          if (e.hasAttribute(t)) {
                            const n = new Set(e.getAttribute(t).split(','))
                            n.delete(s.name),
                              0 == n.size
                                ? i.writer.removeAttribute(t, e)
                                : i.writer.setAttribute(t, Array.from(n).join(','), e)
                          }
                        }
                      }
                    })(t.view),
                    { priority: t.converterPriority || 'normal' }
                  )
              }
            })(t)
          )
        }
      }
      function cc(t, e) {
        const n = t.createAttributeElement('span', e.attributes)
        return (
          e.classes && n._addClass(e.classes),
          'number' == typeof e.priority && (n._priority = e.priority),
          (n._id = e.id),
          n
        )
      }
      function lc(t, e, n, i, s) {
        const o = e ? t.start : t.end,
          r = o.nodeAfter && o.nodeAfter.is('element') ? o.nodeAfter : null,
          a = o.nodeBefore && o.nodeBefore.is('element') ? o.nodeBefore : null
        if (r || a) {
          let t, o
          ;(e && r) || (!e && !a) ? ((t = r), (o = !0)) : ((t = a), (o = !1))
          const c = n.mapper.toViewElement(t)
          if (c)
            return void (function (t, e, n, i, s, o) {
              const r = `data-${o.group}-${e ? 'start' : 'end'}-${n ? 'before' : 'after'}`,
                a = t.hasAttribute(r) ? t.getAttribute(r).split(',') : []
              a.unshift(o.name), i.writer.setAttribute(r, a.join(','), t), i.mapper.bindElementToMarker(t, s.markerName)
            })(c, e, o, n, i, s)
        }
        !(function (t, e, n, i, s) {
          const o = `${s.group}-${e ? 'start' : 'end'}`,
            r = s.name ? { name: s.name } : null,
            a = n.writer.createUIElement(o, r)
          n.writer.insert(t, a), n.mapper.bindElementToMarker(a, i.markerName)
        })(n.mapper.toViewPosition(o), e, n, i, s)
      }
      function hc(t) {
        return (
          'string' == typeof t && (t = { name: t }),
          t.attributes ? Array.isArray(t.attributes) || (t.attributes = [t.attributes]) : (t.attributes = []),
          (t.children = !!t.children),
          t
        )
      }
      function dc(t, e) {
        return 'function' == typeof t
          ? t
          : (n, i) =>
              (function (t, e, n) {
                'string' == typeof t && (t = { name: t })
                let i
                const s = e.writer,
                  o = Object.assign({}, t.attributes)
                if ('container' == n) i = s.createContainerElement(t.name, o)
                else if ('attribute' == n) {
                  const e = { priority: t.priority || Js.DEFAULT_PRIORITY }
                  i = s.createAttributeElement(t.name, o, e)
                } else i = s.createUIElement(t.name, o)
                if (t.styles) {
                  const e = Object.keys(t.styles)
                  for (const n of e) s.setStyle(n, t.styles[n], i)
                }
                if (t.classes) {
                  const e = t.classes
                  if ('string' == typeof e) s.addClass(e, i)
                  else for (const t of e) s.addClass(t, i)
                }
                return i
              })(t, i, e)
      }
      function uc(t) {
        return t.model.values
          ? (e, n) => {
              const i = t.view[e]
              return i ? i(e, n) : null
            }
          : t.view
      }
      function fc(t) {
        return 'string' == typeof t
          ? e => ({ key: t, value: e })
          : 'object' == typeof t
          ? t.value
            ? () => t
            : e => ({ key: t.key, value: e })
          : t
      }
      function mc(t, e, n) {
        const i = 'function' == typeof t ? t(e, n) : t
        return i ? (i.priority || (i.priority = 10), i.id || (i.id = e.markerName), i) : null
      }
      function gc(t) {
        const e = (function (t) {
          return (e, n) => {
            if (!e.is('element', t.name)) return !1
            if ('attribute' == n.type) {
              if (t.attributes.includes(n.attributeKey)) return !0
            } else if (t.children) return !0
            return !1
          }
        })(t)
        return (t, n) => {
          const i = []
          n.reconvertedElements || (n.reconvertedElements = new Set())
          for (const t of n.changes) {
            const s = t.position ? t.position.parent : t.range.start.nodeAfter
            if (s && e(s, t)) {
              if (!n.reconvertedElements.has(s)) {
                n.reconvertedElements.add(s)
                const t = Fa._createBefore(s)
                i.push(
                  { type: 'remove', name: s.name, position: t, length: 1 },
                  { type: 'reinsert', name: s.name, position: t, length: 1 }
                )
              }
            } else i.push(t)
          }
          n.changes = i
        }
      }
      function pc(t) {
        return (e, n, i = {}) => {
          const s = ['insert']
          for (const n of t.attributes) e.hasAttribute(n) && s.push(`attribute:${n}`)
          return !!s.every(t => n.test(e, t)) && (i.preflight || s.forEach(t => n.consume(e, t)), !0)
        }
      }
      function _c(t, e, n, i) {
        for (const s of e) wc(t.root, s, n, i) || n.convertItem(s)
      }
      function wc(t, e, n, i) {
        const { writer: s, mapper: o } = n
        if (!i.reconversion) return !1
        const r = o.toViewElement(e)
        return (
          !(!r || r.root == t) &&
          !!n.canReuseView(r) &&
          (s.move(s.createRangeOn(r), o.toViewPosition(Fa._createBefore(e))), !0)
        )
      }
      function bc(t, e, { preflight: n } = {}) {
        return n ? e.test(t, 'insert') : e.consume(t, 'insert')
      }
      function yc(t) {
        const { schema: e, document: n } = t.model
        for (const i of n.getRootNames()) {
          const s = n.getRoot(i)
          if (s.isEmpty && !e.checkChild(s, '$text') && e.checkChild(s, 'paragraph'))
            return t.insertElement('paragraph', s), !0
        }
        return !1
      }
      function vc(t, e, n) {
        const i = n.createContext(t)
        return !!n.checkChild(i, 'paragraph') && !!n.checkChild(i.push('paragraph'), e)
      }
      function Pc(t, e) {
        const n = e.createElement('paragraph')
        return e.insert(n, t), e.createPositionAt(n, 0)
      }
      class kc extends oc {
        elementToElement(t) {
          return this.add(Ac(t))
        }
        elementToAttribute(t) {
          return this.add(
            (function (t) {
              Sc((t = rc(t)))
              const e = xc(t, !1),
                n = Cc(t.view),
                i = n ? 'element:' + n : 'element'
              return n => {
                n.on(i, e, { priority: t.converterPriority || 'low' })
              }
            })(t)
          )
        }
        attributeToAttribute(t) {
          return this.add(
            (function (t) {
              t = rc(t)
              let e = null
              ;('string' == typeof t.view || t.view.key) &&
                (e = (function (t) {
                  'string' == typeof t.view && (t.view = { key: t.view })
                  const e = t.view.key
                  let n
                  if ('class' == e || 'style' == e) {
                    n = { ['class' == e ? 'classes' : 'styles']: t.view.value }
                  } else {
                    n = { attributes: { [e]: void 0 === t.view.value ? /[\s\S]*/ : t.view.value } }
                  }
                  t.view.name && (n.name = t.view.name)
                  return (t.view = n), e
                })(t))
              Sc(t, e)
              const n = xc(t, !0)
              return e => {
                e.on('element', n, { priority: t.converterPriority || 'low' })
              }
            })(t)
          )
        }
        elementToMarker(t) {
          return this.add(
            (function (t) {
              return (
                (function (t) {
                  const e = t.model
                  t.model = (t, n) => {
                    const i = 'string' == typeof e ? e : e(t, n)
                    return n.writer.createElement('$marker', { 'data-name': i })
                  }
                })((t = rc(t))),
                Ac(t)
              )
            })(t)
          )
        }
        dataToMarker(t) {
          return this.add(
            (function (t) {
              ;(t = rc(t)).model || (t.model = e => (e ? t.view + ':' + e : t.view))
              const e = Ec(Tc(t, 'start')),
                n = Ec(Tc(t, 'end'))
              return i => {
                i.on('element:' + t.view + '-start', e, { priority: t.converterPriority || 'normal' }),
                  i.on('element:' + t.view + '-end', n, { priority: t.converterPriority || 'normal' })
                const s = r.get('low'),
                  o = r.get('highest'),
                  a = r.get(t.converterPriority) / o
                i.on(
                  'element',
                  (function (t) {
                    return (e, n, i) => {
                      const s = `data-${t.view}`
                      function o(e, s) {
                        for (const o of s) {
                          const s = t.model(o, i),
                            r = i.writer.createElement('$marker', { 'data-name': s })
                          i.writer.insert(r, e),
                            n.modelCursor.isEqual(e)
                              ? (n.modelCursor = n.modelCursor.getShiftedBy(1))
                              : (n.modelCursor = n.modelCursor._getTransformedByInsertion(e, 1)),
                            (n.modelRange = n.modelRange._getTransformedByInsertion(e, 1)[0])
                        }
                      }
                      ;(i.consumable.test(n.viewItem, { attributes: s + '-end-after' }) ||
                        i.consumable.test(n.viewItem, { attributes: s + '-start-after' }) ||
                        i.consumable.test(n.viewItem, { attributes: s + '-end-before' }) ||
                        i.consumable.test(n.viewItem, { attributes: s + '-start-before' })) &&
                        (n.modelRange || Object.assign(n, i.convertChildren(n.viewItem, n.modelCursor)),
                        i.consumable.consume(n.viewItem, { attributes: s + '-end-after' }) &&
                          o(n.modelRange.end, n.viewItem.getAttribute(s + '-end-after').split(',')),
                        i.consumable.consume(n.viewItem, { attributes: s + '-start-after' }) &&
                          o(n.modelRange.end, n.viewItem.getAttribute(s + '-start-after').split(',')),
                        i.consumable.consume(n.viewItem, { attributes: s + '-end-before' }) &&
                          o(n.modelRange.start, n.viewItem.getAttribute(s + '-end-before').split(',')),
                        i.consumable.consume(n.viewItem, { attributes: s + '-start-before' }) &&
                          o(n.modelRange.start, n.viewItem.getAttribute(s + '-start-before').split(',')))
                    }
                  })(t),
                  { priority: s + a }
                )
              }
            })(t)
          )
        }
      }
      function Ac(t) {
        const e = Ec((t = rc(t))),
          n = Cc(t.view),
          i = n ? 'element:' + n : 'element'
        return n => {
          n.on(i, e, { priority: t.converterPriority || 'normal' })
        }
      }
      function Cc(t) {
        return 'string' == typeof t ? t : 'object' == typeof t && 'string' == typeof t.name ? t.name : null
      }
      function Ec(t) {
        const e = new ji(t.view)
        return (n, i, s) => {
          const o = e.match(i.viewItem)
          if (!o) return
          const r = o.match
          if (((r.name = !0), !s.consumable.test(i.viewItem, r))) return
          const a = (function (t, e, n) {
            return t instanceof Function ? t(e, n) : n.writer.createElement(t)
          })(t.model, i.viewItem, s)
          a &&
            s.safeInsert(a, i.modelCursor) &&
            (s.consumable.consume(i.viewItem, r), s.convertChildren(i.viewItem, a), s.updateConversionResult(a, i))
        }
      }
      function Sc(t, e = null) {
        const n = null === e || (t => t.getAttribute(e)),
          i = 'object' != typeof t.model ? t.model : t.model.key,
          s = 'object' != typeof t.model || void 0 === t.model.value ? n : t.model.value
        t.model = { key: i, value: s }
      }
      function xc(t, e) {
        const n = new ji(t.view)
        return (i, s, o) => {
          if (!s.modelRange && e) return
          const r = n.match(s.viewItem)
          if (!r) return
          if (
            (!(function (t, e) {
              const n = 'function' == typeof t ? t(e) : t
              if ('object' == typeof n && !Cc(n)) return !1
              return !n.classes && !n.attributes && !n.styles
            })(t.view, s.viewItem)
              ? delete r.match.name
              : (r.match.name = !0),
            !o.consumable.test(s.viewItem, r.match))
          )
            return
          const a = t.model.key,
            c = 'function' == typeof t.model.value ? t.model.value(s.viewItem, o) : t.model.value
          if (null === c) return
          s.modelRange || Object.assign(s, o.convertChildren(s.viewItem, s.modelCursor))
          const l = (function (t, e, n, i) {
            let s = !1
            for (const o of Array.from(t.getItems({ shallow: n })))
              i.schema.checkAttribute(o, e.key) &&
                ((s = !0), o.hasAttribute(e.key) || i.writer.setAttribute(e.key, e.value, o))
            return s
          })(s.modelRange, { key: a, value: c }, e, o)
          l &&
            (o.consumable.test(s.viewItem, { name: !0 }) && (r.match.name = !0),
            o.consumable.consume(s.viewItem, r.match))
        }
      }
      function Tc(t, e) {
        const n = {}
        return (
          (n.view = t.view + '-' + e),
          (n.model = (e, n) => {
            const i = e.getAttribute('name'),
              s = t.model(i, n)
            return n.writer.createElement('$marker', { 'data-name': s })
          }),
          n
        )
      }
      class Rc {
        constructor(t, e) {
          ;(this.model = t),
            (this.view = new xa(e)),
            (this.mapper = new Wa()),
            (this.downcastDispatcher = new qa({ mapper: this.mapper, schema: t.schema }))
          const n = this.model.document,
            i = n.selection,
            s = this.model.markers
          this.listenTo(
            this.model,
            '_beforeChanges',
            () => {
              this.view._disableRendering(!0)
            },
            { priority: 'highest' }
          ),
            this.listenTo(
              this.model,
              '_afterChanges',
              () => {
                this.view._disableRendering(!1)
              },
              { priority: 'lowest' }
            ),
            this.listenTo(
              n,
              'change',
              () => {
                this.view.change(t => {
                  this.downcastDispatcher.convertChanges(n.differ, s, t),
                    this.downcastDispatcher.convertSelection(i, s, t)
                })
              },
              { priority: 'low' }
            ),
            this.listenTo(
              this.view.document,
              'selectionChange',
              (function (t, e) {
                return (n, i) => {
                  const s = i.newSelection,
                    o = []
                  for (const t of s.getRanges()) o.push(e.toModelRange(t))
                  const r = t.createSelection(o, { backward: s.isBackward })
                  r.isEqual(t.document.selection) ||
                    t.change(t => {
                      t.setSelection(r)
                    })
                }
              })(this.model, this.mapper)
            ),
            this.downcastDispatcher.on(
              'insert:$text',
              (t, e, n) => {
                if (!n.consumable.consume(e.item, t.name)) return
                const i = n.writer,
                  s = n.mapper.toViewPosition(e.range.start),
                  o = i.createText(e.item.data)
                i.insert(s, o)
              },
              { priority: 'lowest' }
            ),
            this.downcastDispatcher.on(
              'insert',
              (t, e, n) => {
                n.convertAttributes(e.item),
                  e.reconversion || !e.item.is('element') || e.item.isEmpty || n.convertChildren(e.item)
              },
              { priority: 'lowest' }
            ),
            this.downcastDispatcher.on(
              'remove',
              (t, e, n) => {
                const i = n.mapper.toViewPosition(e.position),
                  s = e.position.getShiftedBy(e.length),
                  o = n.mapper.toViewPosition(s, { isPhantom: !0 }),
                  r = n.writer.createRange(i, o),
                  a = n.writer.remove(r.getTrimmed())
                for (const t of n.writer.createRangeIn(a).getItems()) n.mapper.unbindViewElement(t, { defer: !0 })
              },
              { priority: 'low' }
            ),
            this.downcastDispatcher.on(
              'selection',
              (t, e, n) => {
                const i = n.writer,
                  s = i.document.selection
                for (const t of s.getRanges())
                  t.isCollapsed && t.end.parent.isAttached() && n.writer.mergeAttributes(t.start)
                i.setSelection(null)
              },
              { priority: 'high' }
            ),
            this.downcastDispatcher.on(
              'selection',
              (t, e, n) => {
                const i = e.selection
                if (i.isCollapsed) return
                if (!n.consumable.consume(i, 'selection')) return
                const s = []
                for (const t of i.getRanges()) {
                  const e = n.mapper.toViewRange(t)
                  s.push(e)
                }
                n.writer.setSelection(s, { backward: i.isBackward })
              },
              { priority: 'low' }
            ),
            this.downcastDispatcher.on(
              'selection',
              (t, e, n) => {
                const i = e.selection
                if (!i.isCollapsed) return
                if (!n.consumable.consume(i, 'selection')) return
                const s = n.writer,
                  o = i.getFirstPosition(),
                  r = n.mapper.toViewPosition(o),
                  a = s.breakAttributes(r)
                s.setSelection(a)
              },
              { priority: 'low' }
            ),
            this.view.document.roots.bindTo(this.model.document.roots).using(t => {
              if ('$graveyard' == t.rootName) return null
              const e = new Ms(this.view.document, t.name)
              return (e.rootName = t.rootName), this.mapper.bindElements(t, e), e
            })
        }
        destroy() {
          this.view.destroy(), this.stopListening()
        }
        reconvertMarker(t) {
          const e = 'string' == typeof t ? t : t.name,
            n = this.model.markers.get(e)
          if (!n) throw new c('editingcontroller-reconvertmarker-marker-not-exist', this, { markerName: e })
          this.model.change(() => {
            this.model.markers._refresh(n)
          })
        }
        reconvertItem(t) {
          this.model.change(() => {
            this.model.document.differ._refreshItem(t)
          })
        }
      }
      he(Rc, se)
      class Oc {
        constructor() {
          this._commands = new Map()
        }
        add(t, e) {
          this._commands.set(t, e)
        }
        get(t) {
          return this._commands.get(t)
        }
        execute(t, ...e) {
          const n = this.get(t)
          if (!n) throw new c('commandcollection-command-not-found', this, { commandName: t })
          return n.execute(...e)
        }
        *names() {
          yield* this._commands.keys()
        }
        *commands() {
          yield* this._commands.values()
        }
        [Symbol.iterator]() {
          return this._commands[Symbol.iterator]()
        }
        destroy() {
          for (const t of this.commands()) t.destroy()
        }
      }
      class Ic {
        constructor() {
          this._consumables = new Map()
        }
        add(t, e) {
          let n
          t.is('$text') || t.is('documentFragment')
            ? this._consumables.set(t, !0)
            : (this._consumables.has(t)
                ? (n = this._consumables.get(t))
                : ((n = new Mc(t)), this._consumables.set(t, n)),
              n.add(e))
        }
        test(t, e) {
          const n = this._consumables.get(t)
          return void 0 === n ? null : t.is('$text') || t.is('documentFragment') ? n : n.test(e)
        }
        consume(t, e) {
          return (
            !!this.test(t, e) &&
            (t.is('$text') || t.is('documentFragment')
              ? this._consumables.set(t, !1)
              : this._consumables.get(t).consume(e),
            !0)
          )
        }
        revert(t, e) {
          const n = this._consumables.get(t)
          void 0 !== n && (t.is('$text') || t.is('documentFragment') ? this._consumables.set(t, !0) : n.revert(e))
        }
        static consumablesFromElement(t) {
          const e = { element: t, name: !0, attributes: [], classes: [], styles: [] },
            n = t.getAttributeKeys()
          for (const t of n) 'style' != t && 'class' != t && e.attributes.push(t)
          const i = t.getClassNames()
          for (const t of i) e.classes.push(t)
          const s = t.getStyleNames()
          for (const t of s) e.styles.push(t)
          return e
        }
        static createFrom(t, e) {
          if ((e || (e = new Ic(t)), t.is('$text'))) return e.add(t), e
          t.is('element') && e.add(t, Ic.consumablesFromElement(t)), t.is('documentFragment') && e.add(t)
          for (const n of t.getChildren()) e = Ic.createFrom(n, e)
          return e
        }
      }
      class Mc {
        constructor(t) {
          ;(this.element = t),
            (this._canConsumeName = null),
            (this._consumables = { attributes: new Map(), styles: new Map(), classes: new Map() })
        }
        add(t) {
          t.name && (this._canConsumeName = !0)
          for (const e in this._consumables) e in t && this._add(e, t[e])
        }
        test(t) {
          if (t.name && !this._canConsumeName) return this._canConsumeName
          for (const e in this._consumables)
            if (e in t) {
              const n = this._test(e, t[e])
              if (!0 !== n) return n
            }
          return !0
        }
        consume(t) {
          t.name && (this._canConsumeName = !1)
          for (const e in this._consumables) e in t && this._consume(e, t[e])
        }
        revert(t) {
          t.name && (this._canConsumeName = !0)
          for (const e in this._consumables) e in t && this._revert(e, t[e])
        }
        _add(t, e) {
          const n = xt(e) ? e : [e],
            i = this._consumables[t]
          for (const e of n) {
            if ('attributes' === t && ('class' === e || 'style' === e))
              throw new c('viewconsumable-invalid-attribute', this)
            if ((i.set(e, !0), 'styles' === t))
              for (const t of this.element.document.stylesProcessor.getRelatedStyles(e)) i.set(t, !0)
          }
        }
        _test(t, e) {
          const n = xt(e) ? e : [e],
            i = this._consumables[t]
          for (const e of n)
            if ('attributes' !== t || ('class' !== e && 'style' !== e)) {
              const t = i.get(e)
              if (void 0 === t) return null
              if (!t) return !1
            } else {
              const t = 'class' == e ? 'classes' : 'styles',
                n = this._test(t, [...this._consumables[t].keys()])
              if (!0 !== n) return n
            }
          return !0
        }
        _consume(t, e) {
          const n = xt(e) ? e : [e],
            i = this._consumables[t]
          for (const e of n)
            if ('attributes' !== t || ('class' !== e && 'style' !== e)) {
              if ((i.set(e, !1), 'styles' == t))
                for (const t of this.element.document.stylesProcessor.getRelatedStyles(e)) i.set(t, !1)
            } else {
              const t = 'class' == e ? 'classes' : 'styles'
              this._consume(t, [...this._consumables[t].keys()])
            }
        }
        _revert(t, e) {
          const n = xt(e) ? e : [e],
            i = this._consumables[t]
          for (const e of n)
            if ('attributes' !== t || ('class' !== e && 'style' !== e)) {
              !1 === i.get(e) && i.set(e, !0)
            } else {
              const t = 'class' == e ? 'classes' : 'styles'
              this._revert(t, [...this._consumables[t].keys()])
            }
        }
      }
      class Nc {
        constructor() {
          ;(this._sourceDefinitions = {}),
            (this._attributeProperties = {}),
            this.decorate('checkChild'),
            this.decorate('checkAttribute'),
            this.on(
              'checkAttribute',
              (t, e) => {
                e[0] = new Dc(e[0])
              },
              { priority: 'highest' }
            ),
            this.on(
              'checkChild',
              (t, e) => {
                ;(e[0] = new Dc(e[0])), (e[1] = this.getDefinition(e[1]))
              },
              { priority: 'highest' }
            )
        }
        register(t, e) {
          if (this._sourceDefinitions[t]) throw new c('schema-cannot-register-item-twice', this, { itemName: t })
          ;(this._sourceDefinitions[t] = [Object.assign({}, e)]), this._clearCache()
        }
        extend(t, e) {
          if (!this._sourceDefinitions[t]) throw new c('schema-cannot-extend-missing-item', this, { itemName: t })
          this._sourceDefinitions[t].push(Object.assign({}, e)), this._clearCache()
        }
        getDefinitions() {
          return this._compiledDefinitions || this._compile(), this._compiledDefinitions
        }
        getDefinition(t) {
          let e
          return (
            (e = 'string' == typeof t ? t : t.is && (t.is('$text') || t.is('$textProxy')) ? '$text' : t.name),
            this.getDefinitions()[e]
          )
        }
        isRegistered(t) {
          return !!this.getDefinition(t)
        }
        isBlock(t) {
          const e = this.getDefinition(t)
          return !(!e || !e.isBlock)
        }
        isLimit(t) {
          const e = this.getDefinition(t)
          return !!e && !(!e.isLimit && !e.isObject)
        }
        isObject(t) {
          const e = this.getDefinition(t)
          return !!e && !!(e.isObject || (e.isLimit && e.isSelectable && e.isContent))
        }
        isInline(t) {
          const e = this.getDefinition(t)
          return !(!e || !e.isInline)
        }
        isSelectable(t) {
          const e = this.getDefinition(t)
          return !!e && !(!e.isSelectable && !e.isObject)
        }
        isContent(t) {
          const e = this.getDefinition(t)
          return !!e && !(!e.isContent && !e.isObject)
        }
        checkChild(t, e) {
          return !!e && this._checkContextMatch(e, t)
        }
        checkAttribute(t, e) {
          const n = this.getDefinition(t.last)
          return !!n && n.allowAttributes.includes(e)
        }
        checkMerge(t, e = null) {
          if (t instanceof Fa) {
            const e = t.nodeBefore,
              n = t.nodeAfter
            if (!(e instanceof Ma)) throw new c('schema-check-merge-no-element-before', this)
            if (!(n instanceof Ma)) throw new c('schema-check-merge-no-element-after', this)
            return this.checkMerge(e, n)
          }
          for (const n of e.getChildren()) if (!this.checkChild(t, n)) return !1
          return !0
        }
        addChildCheck(t) {
          this.on(
            'checkChild',
            (e, [n, i]) => {
              if (!i) return
              const s = t(n, i)
              'boolean' == typeof s && (e.stop(), (e.return = s))
            },
            { priority: 'high' }
          )
        }
        addAttributeCheck(t) {
          this.on(
            'checkAttribute',
            (e, [n, i]) => {
              const s = t(n, i)
              'boolean' == typeof s && (e.stop(), (e.return = s))
            },
            { priority: 'high' }
          )
        }
        setAttributeProperties(t, e) {
          this._attributeProperties[t] = Object.assign(this.getAttributeProperties(t), e)
        }
        getAttributeProperties(t) {
          return this._attributeProperties[t] || {}
        }
        getLimitElement(t) {
          let e
          if (t instanceof Fa) e = t.parent
          else {
            e = (t instanceof ja ? [t] : Array.from(t.getRanges())).reduce((t, e) => {
              const n = e.getCommonAncestor()
              return t ? t.getCommonAncestor(n, { includeSelf: !0 }) : n
            }, null)
          }
          for (; !this.isLimit(e) && e.parent; ) e = e.parent
          return e
        }
        checkAttributeInSelection(t, e) {
          if (t.isCollapsed) {
            const n = [...t.getFirstPosition().getAncestors(), new Ra('', t.getAttributes())]
            return this.checkAttribute(n, e)
          }
          {
            const n = t.getRanges()
            for (const t of n) for (const n of t) if (this.checkAttribute(n.item, e)) return !0
          }
          return !1
        }
        *getValidRanges(t, e) {
          t = (function* (t) {
            for (const e of t) yield* e.getMinimalFlatRanges()
          })(t)
          for (const n of t) yield* this._getValidRangesForRange(n, e)
        }
        getNearestSelectionRange(t, e = 'both') {
          if (this.checkChild(t, '$text')) return new ja(t)
          let n, i
          const s =
            t
              .getAncestors()
              .reverse()
              .find(t => this.isLimit(t)) || t.root
          ;('both' != e && 'backward' != e) ||
            (n = new Na({ boundaries: ja._createIn(s), startPosition: t, direction: 'backward' })),
            ('both' != e && 'forward' != e) || (i = new Na({ boundaries: ja._createIn(s), startPosition: t }))
          for (const t of (function* (t, e) {
            let n = !1
            for (; !n; ) {
              if (((n = !0), t)) {
                const e = t.next()
                e.done || ((n = !1), yield { walker: t, value: e.value })
              }
              if (e) {
                const t = e.next()
                t.done || ((n = !1), yield { walker: e, value: t.value })
              }
            }
          })(n, i)) {
            const e = t.walker == n ? 'elementEnd' : 'elementStart',
              i = t.value
            if (i.type == e && this.isObject(i.item)) return ja._createOn(i.item)
            if (this.checkChild(i.nextPosition, '$text')) return new ja(i.nextPosition)
          }
          return null
        }
        findAllowedParent(t, e) {
          let n = t.parent
          for (; n; ) {
            if (this.checkChild(n, e)) return n
            if (this.isLimit(n)) return null
            n = n.parent
          }
          return null
        }
        setAllowedAttributes(t, e, n) {
          const i = n.model
          for (const [s, o] of Object.entries(e)) i.schema.checkAttribute(t, s) && n.setAttribute(s, o, t)
        }
        removeDisallowedAttributes(t, e) {
          for (const n of t)
            if (n.is('$text')) Gc(this, n, e)
            else {
              const t = ja._createIn(n).getPositions()
              for (const n of t) {
                Gc(this, n.nodeBefore || n.parent, e)
              }
            }
        }
        getAttributesWithProperty(t, e, n) {
          const i = {}
          for (const [s, o] of t.getAttributes()) {
            const t = this.getAttributeProperties(s)
            void 0 !== t[e] && ((void 0 !== n && n !== t[e]) || (i[s] = o))
          }
          return i
        }
        createContext(t) {
          return new Dc(t)
        }
        _clearCache() {
          this._compiledDefinitions = null
        }
        _compile() {
          const t = {},
            e = this._sourceDefinitions,
            n = Object.keys(e)
          for (const i of n) t[i] = Fc(e[i], i)
          for (const e of n) Bc(t, e)
          for (const e of n) Vc(t, e)
          for (const e of n) Lc(t, e)
          for (const e of n) jc(t, e), Wc(t, e)
          for (const e of n) zc(t, e), $c(t, e), qc(t, e)
          this._compiledDefinitions = t
        }
        _checkContextMatch(t, e, n = e.length - 1) {
          const i = e.getItem(n)
          if (t.allowIn.includes(i.name)) {
            if (0 == n) return !0
            {
              const t = this.getDefinition(i)
              return this._checkContextMatch(t, e, n - 1)
            }
          }
          return !1
        }
        *_getValidRangesForRange(t, e) {
          let n = t.start,
            i = t.start
          for (const s of t.getItems({ shallow: !0 }))
            s.is('element') && (yield* this._getValidRangesForRange(ja._createIn(s), e)),
              this.checkAttribute(s, e) || (n.isEqual(i) || (yield new ja(n, i)), (n = Fa._createAfter(s))),
              (i = Fa._createAfter(s))
          n.isEqual(i) || (yield new ja(n, i))
        }
      }
      he(Nc, se)
      class Dc {
        constructor(t) {
          if (t instanceof Dc) return t
          'string' == typeof t ? (t = [t]) : Array.isArray(t) || (t = t.getAncestors({ includeSelf: !0 })),
            (this._items = t.map(Kc))
        }
        get length() {
          return this._items.length
        }
        get last() {
          return this._items[this._items.length - 1]
        }
        [Symbol.iterator]() {
          return this._items[Symbol.iterator]()
        }
        push(t) {
          const e = new Dc([t])
          return (e._items = [...this._items, ...e._items]), e
        }
        getItem(t) {
          return this._items[t]
        }
        *getNames() {
          yield* this._items.map(t => t.name)
        }
        endsWith(t) {
          return Array.from(this.getNames()).join(' ').endsWith(t)
        }
        startsWith(t) {
          return Array.from(this.getNames()).join(' ').startsWith(t)
        }
      }
      function Fc(t, e) {
        const n = {
          name: e,
          allowIn: [],
          allowContentOf: [],
          allowWhere: [],
          allowAttributes: [],
          allowAttributesOf: [],
          allowChildren: [],
          inheritTypesFrom: [],
        }
        return (
          (function (t, e) {
            for (const n of t) {
              const t = Object.keys(n).filter(t => t.startsWith('is'))
              for (const i of t) e[i] = n[i]
            }
          })(t, n),
          Uc(t, n, 'allowIn'),
          Uc(t, n, 'allowContentOf'),
          Uc(t, n, 'allowWhere'),
          Uc(t, n, 'allowAttributes'),
          Uc(t, n, 'allowAttributesOf'),
          Uc(t, n, 'allowChildren'),
          Uc(t, n, 'inheritTypesFrom'),
          (function (t, e) {
            for (const n of t) {
              const t = n.inheritAllFrom
              t &&
                (e.allowContentOf.push(t),
                e.allowWhere.push(t),
                e.allowAttributesOf.push(t),
                e.inheritTypesFrom.push(t))
            }
          })(t, n),
          n
        )
      }
      function Bc(t, e) {
        const n = t[e]
        for (const i of n.allowChildren) {
          const n = t[i]
          n && n.allowIn.push(e)
        }
        n.allowChildren.length = 0
      }
      function Vc(t, e) {
        for (const n of t[e].allowContentOf)
          if (t[n]) {
            Hc(t, n).forEach(t => {
              t.allowIn.push(e)
            })
          }
        delete t[e].allowContentOf
      }
      function Lc(t, e) {
        for (const n of t[e].allowWhere) {
          const i = t[n]
          if (i) {
            const n = i.allowIn
            t[e].allowIn.push(...n)
          }
        }
        delete t[e].allowWhere
      }
      function jc(t, e) {
        for (const n of t[e].allowAttributesOf) {
          const i = t[n]
          if (i) {
            const n = i.allowAttributes
            t[e].allowAttributes.push(...n)
          }
        }
        delete t[e].allowAttributesOf
      }
      function Wc(t, e) {
        const n = t[e]
        for (const e of n.inheritTypesFrom) {
          const i = t[e]
          if (i) {
            const t = Object.keys(i).filter(t => t.startsWith('is'))
            for (const e of t) e in n || (n[e] = i[e])
          }
        }
        delete n.inheritTypesFrom
      }
      function zc(t, e) {
        const n = t[e],
          i = n.allowIn.filter(e => t[e])
        n.allowIn = Array.from(new Set(i))
      }
      function $c(t, e) {
        const n = t[e]
        for (const i of n.allowIn) {
          t[i].allowChildren.push(e)
        }
      }
      function qc(t, e) {
        const n = t[e]
        n.allowAttributes = Array.from(new Set(n.allowAttributes))
      }
      function Uc(t, e, n) {
        for (const i of t) 'string' == typeof i[n] ? e[n].push(i[n]) : Array.isArray(i[n]) && e[n].push(...i[n])
      }
      function Hc(t, e) {
        const n = t[e]
        return ((i = t), Object.keys(i).map(t => i[t])).filter(t => t.allowIn.includes(n.name))
        var i
      }
      function Kc(t) {
        return 'string' == typeof t || t.is('documentFragment')
          ? { name: 'string' == typeof t ? t : '$documentFragment', *getAttributeKeys() {}, getAttribute() {} }
          : {
              name: t.is('element') ? t.name : '$text',
              *getAttributeKeys() {
                yield* t.getAttributeKeys()
              },
              getAttribute: e => t.getAttribute(e),
            }
      }
      function Gc(t, e, n) {
        for (const i of e.getAttributeKeys()) t.checkAttribute(e, i) || n.removeAttribute(i, e)
      }
      class Jc {
        constructor(t = {}) {
          ;(this._splitParts = new Map()),
            (this._cursorParents = new Map()),
            (this._modelCursor = null),
            (this._emptyElementsToKeep = new Set()),
            (this.conversionApi = Object.assign({}, t)),
            (this.conversionApi.convertItem = this._convertItem.bind(this)),
            (this.conversionApi.convertChildren = this._convertChildren.bind(this)),
            (this.conversionApi.safeInsert = this._safeInsert.bind(this)),
            (this.conversionApi.updateConversionResult = this._updateConversionResult.bind(this)),
            (this.conversionApi.splitToAllowedParent = this._splitToAllowedParent.bind(this)),
            (this.conversionApi.getSplitParts = this._getSplitParts.bind(this)),
            (this.conversionApi.keepEmptyElement = this._keepEmptyElement.bind(this))
        }
        convert(t, e, n = ['$root']) {
          this.fire('viewCleanup', t),
            (this._modelCursor = (function (t, e) {
              let n
              for (const i of new Dc(t)) {
                const t = {}
                for (const e of i.getAttributeKeys()) t[e] = i.getAttribute(e)
                const s = e.createElement(i.name, t)
                n && e.append(s, n), (n = Fa._createAt(s, 0))
              }
              return n
            })(n, e)),
            (this.conversionApi.writer = e),
            (this.conversionApi.consumable = Ic.createFrom(t)),
            (this.conversionApi.store = {})
          const { modelRange: i } = this._convertItem(t, this._modelCursor),
            s = e.createDocumentFragment()
          if (i) {
            this._removeEmptyElements()
            for (const t of Array.from(this._modelCursor.parent.getChildren())) e.append(t, s)
            s.markers = (function (t, e) {
              const n = new Set(),
                i = new Map(),
                s = ja._createIn(t).getItems()
              for (const t of s) '$marker' == t.name && n.add(t)
              for (const t of n) {
                const n = t.getAttribute('data-name'),
                  s = e.createPositionBefore(t)
                i.has(n) ? (i.get(n).end = s.clone()) : i.set(n, new ja(s.clone())), e.remove(t)
              }
              return i
            })(s, e)
          }
          return (
            (this._modelCursor = null),
            this._splitParts.clear(),
            this._cursorParents.clear(),
            this._emptyElementsToKeep.clear(),
            (this.conversionApi.writer = null),
            (this.conversionApi.store = null),
            s
          )
        }
        _convertItem(t, e) {
          const n = Object.assign({ viewItem: t, modelCursor: e, modelRange: null })
          if (
            (t.is('element')
              ? this.fire('element:' + t.name, n, this.conversionApi)
              : t.is('$text')
              ? this.fire('text', n, this.conversionApi)
              : this.fire('documentFragment', n, this.conversionApi),
            n.modelRange && !(n.modelRange instanceof ja))
          )
            throw new c('view-conversion-dispatcher-incorrect-result', this)
          return { modelRange: n.modelRange, modelCursor: n.modelCursor }
        }
        _convertChildren(t, e) {
          let n = e.is('position') ? e : Fa._createAt(e, 0)
          const i = new ja(n)
          for (const e of Array.from(t.getChildren())) {
            const t = this._convertItem(e, n)
            t.modelRange instanceof ja && ((i.end = t.modelRange.end), (n = t.modelCursor))
          }
          return { modelRange: i, modelCursor: n }
        }
        _safeInsert(t, e) {
          const n = this._splitToAllowedParent(t, e)
          return !!n && (this.conversionApi.writer.insert(t, n.position), !0)
        }
        _updateConversionResult(t, e) {
          const n = this._getSplitParts(t),
            i = this.conversionApi.writer
          e.modelRange ||
            (e.modelRange = i.createRange(i.createPositionBefore(t), i.createPositionAfter(n[n.length - 1])))
          const s = this._cursorParents.get(t)
          e.modelCursor = s ? i.createPositionAt(s, 0) : e.modelRange.end
        }
        _splitToAllowedParent(t, e) {
          const { schema: n, writer: i } = this.conversionApi
          let s = n.findAllowedParent(e, t)
          if (s) {
            if (s === e.parent) return { position: e }
            this._modelCursor.parent.getAncestors().includes(s) && (s = null)
          }
          if (!s) return vc(e, t, n) ? { position: Pc(e, i) } : null
          const o = this.conversionApi.writer.split(e, s),
            r = []
          for (const t of o.range.getWalker())
            if ('elementEnd' == t.type) r.push(t.item)
            else {
              const e = r.pop(),
                n = t.item
              this._registerSplitPair(e, n)
            }
          const a = o.range.end.parent
          return this._cursorParents.set(t, a), { position: o.position, cursorParent: a }
        }
        _registerSplitPair(t, e) {
          this._splitParts.has(t) || this._splitParts.set(t, [t])
          const n = this._splitParts.get(t)
          this._splitParts.set(e, n), n.push(e)
        }
        _getSplitParts(t) {
          let e
          return (e = this._splitParts.has(t) ? this._splitParts.get(t) : [t]), e
        }
        _keepEmptyElement(t) {
          this._emptyElementsToKeep.add(t)
        }
        _removeEmptyElements() {
          let t = !1
          for (const e of this._splitParts.keys())
            e.isEmpty &&
              !this._emptyElementsToKeep.has(e) &&
              (this.conversionApi.writer.remove(e), this._splitParts.delete(e), (t = !0))
          t && this._removeEmptyElements()
        }
      }
      he(Jc, p)
      class Yc {
        getHtml(t) {
          const e = document.implementation.createHTMLDocument('').createElement('div')
          return e.appendChild(t), e.innerHTML
        }
      }
      class Xc {
        constructor(t) {
          ;(this.domParser = new DOMParser()),
            (this.domConverter = new rr(t, { renderingMode: 'data' })),
            (this.htmlWriter = new Yc())
        }
        toData(t) {
          const e = this.domConverter.viewToDom(t, document)
          return this.htmlWriter.getHtml(e)
        }
        toView(t) {
          const e = this._toDom(t)
          return this.domConverter.domToView(e)
        }
        registerRawContentMatcher(t) {
          this.domConverter.registerRawContentMatcher(t)
        }
        useFillerType(t) {
          this.domConverter.blockFillerMode = 'marked' == t ? 'markedNbsp' : 'nbsp'
        }
        _toDom(t) {
          t.match(/<(?:html|body|head|meta)(?:\s[^>]*)?>/i) || (t = `<body>${t}</body>`)
          const e = this.domParser.parseFromString(t, 'text/html'),
            n = e.createDocumentFragment(),
            i = e.body.childNodes
          for (; i.length > 0; ) n.appendChild(i[0])
          return n
        }
      }
      class Zc {
        constructor(t, e) {
          ;(this.model = t),
            (this.mapper = new Wa()),
            (this.downcastDispatcher = new qa({ mapper: this.mapper, schema: t.schema })),
            this.downcastDispatcher.on(
              'insert:$text',
              (t, e, n) => {
                if (!n.consumable.consume(e.item, t.name)) return
                const i = n.writer,
                  s = n.mapper.toViewPosition(e.range.start),
                  o = i.createText(e.item.data)
                i.insert(s, o)
              },
              { priority: 'lowest' }
            ),
            this.downcastDispatcher.on(
              'insert',
              (t, e, n) => {
                n.convertAttributes(e.item),
                  e.reconversion || !e.item.is('element') || e.item.isEmpty || n.convertChildren(e.item)
              },
              { priority: 'lowest' }
            ),
            (this.upcastDispatcher = new Jc({ schema: t.schema })),
            (this.viewDocument = new Gs(e)),
            (this.stylesProcessor = e),
            (this.htmlProcessor = new Xc(this.viewDocument)),
            (this.processor = this.htmlProcessor),
            (this._viewWriter = new bo(this.viewDocument)),
            this.upcastDispatcher.on(
              'text',
              (t, e, { schema: n, consumable: i, writer: s }) => {
                let o = e.modelCursor
                if (!i.test(e.viewItem)) return
                if (!n.checkChild(o, '$text')) {
                  if (!vc(o, '$text', n)) return
                  o = Pc(o, s)
                }
                i.consume(e.viewItem)
                const r = s.createText(e.viewItem.data)
                s.insert(r, o),
                  (e.modelRange = s.createRange(o, o.getShiftedBy(r.offsetSize))),
                  (e.modelCursor = e.modelRange.end)
              },
              { priority: 'lowest' }
            ),
            this.upcastDispatcher.on(
              'element',
              (t, e, n) => {
                if (!e.modelRange && n.consumable.consume(e.viewItem, { name: !0 })) {
                  const { modelRange: t, modelCursor: i } = n.convertChildren(e.viewItem, e.modelCursor)
                  ;(e.modelRange = t), (e.modelCursor = i)
                }
              },
              { priority: 'lowest' }
            ),
            this.upcastDispatcher.on(
              'documentFragment',
              (t, e, n) => {
                if (!e.modelRange && n.consumable.consume(e.viewItem, { name: !0 })) {
                  const { modelRange: t, modelCursor: i } = n.convertChildren(e.viewItem, e.modelCursor)
                  ;(e.modelRange = t), (e.modelCursor = i)
                }
              },
              { priority: 'lowest' }
            ),
            this.decorate('init'),
            this.decorate('set'),
            this.decorate('get'),
            this.on(
              'init',
              () => {
                this.fire('ready')
              },
              { priority: 'lowest' }
            ),
            this.on(
              'ready',
              () => {
                this.model.enqueueChange({ isUndoable: !1 }, yc)
              },
              { priority: 'lowest' }
            )
        }
        get(t = {}) {
          const { rootName: e = 'main', trim: n = 'empty' } = t
          if (!this._checkIfRootsExists([e])) throw new c('datacontroller-get-non-existent-root', this)
          const i = this.model.document.getRoot(e)
          return 'empty' !== n || this.model.hasContent(i, { ignoreWhitespaces: !0 }) ? this.stringify(i, t) : ''
        }
        stringify(t, e = {}) {
          const n = this.toView(t, e)
          return this.processor.toData(n)
        }
        toView(t, e = {}) {
          const n = this.viewDocument,
            i = this._viewWriter
          this.mapper.clearBindings()
          const s = ja._createIn(t),
            o = new wo(n)
          this.mapper.bindElements(t, o)
          const r = t.is('documentFragment')
            ? t.markers
            : (function (t) {
                const e = [],
                  n = t.root.document
                if (!n) return new Map()
                const i = ja._createIn(t)
                for (const t of n.model.markers) {
                  const n = t.getRange(),
                    s = n.isCollapsed,
                    o = n.start.isEqual(i.start) || n.end.isEqual(i.end)
                  if (s && o) e.push([t.name, n])
                  else {
                    const s = i.getIntersection(n)
                    s && e.push([t.name, s])
                  }
                }
                return (
                  e.sort(([t, e], [n, i]) => {
                    if ('after' !== e.end.compareWith(i.start)) return 1
                    if ('before' !== e.start.compareWith(i.end)) return -1
                    switch (e.start.compareWith(i.start)) {
                      case 'before':
                        return 1
                      case 'after':
                        return -1
                      default:
                        switch (e.end.compareWith(i.end)) {
                          case 'before':
                            return 1
                          case 'after':
                            return -1
                          default:
                            return n.localeCompare(t)
                        }
                    }
                  }),
                  new Map(e)
                )
              })(t)
          return this.downcastDispatcher.convert(s, r, i, e), o
        }
        init(t) {
          if (this.model.document.version) throw new c('datacontroller-init-document-not-empty', this)
          let e = {}
          if (('string' == typeof t ? (e.main = t) : (e = t), !this._checkIfRootsExists(Object.keys(e))))
            throw new c('datacontroller-init-non-existent-root', this)
          return (
            this.model.enqueueChange({ isUndoable: !1 }, t => {
              for (const n of Object.keys(e)) {
                const i = this.model.document.getRoot(n)
                t.insert(this.parse(e[n], i), i, 0)
              }
            }),
            Promise.resolve()
          )
        }
        set(t, e = {}) {
          let n = {}
          if (('string' == typeof t ? (n.main = t) : (n = t), !this._checkIfRootsExists(Object.keys(n))))
            throw new c('datacontroller-set-non-existent-root', this)
          this.model.enqueueChange(e.batchType || {}, t => {
            t.setSelection(null), t.removeSelectionAttribute(this.model.document.selection.getAttributeKeys())
            for (const e of Object.keys(n)) {
              const i = this.model.document.getRoot(e)
              t.remove(t.createRangeIn(i)), t.insert(this.parse(n[e], i), i, 0)
            }
          })
        }
        parse(t, e = '$root') {
          const n = this.processor.toView(t)
          return this.toModel(n, e)
        }
        toModel(t, e = '$root') {
          return this.model.change(n => this.upcastDispatcher.convert(t, n, e))
        }
        addStyleProcessorRules(t) {
          t(this.stylesProcessor)
        }
        registerRawContentMatcher(t) {
          this.processor && this.processor !== this.htmlProcessor && this.processor.registerRawContentMatcher(t),
            this.htmlProcessor.registerRawContentMatcher(t)
        }
        destroy() {
          this.stopListening()
        }
        _checkIfRootsExists(t) {
          for (const e of t) if (!this.model.document.getRootNames().includes(e)) return !1
          return !0
        }
      }
      he(Zc, se)
      class Qc {
        constructor(t, e) {
          ;(this._helpers = new Map()),
            (this._downcast = Si(t)),
            this._createConversionHelpers({ name: 'downcast', dispatchers: this._downcast, isDowncast: !0 }),
            (this._upcast = Si(e)),
            this._createConversionHelpers({ name: 'upcast', dispatchers: this._upcast, isDowncast: !1 })
        }
        addAlias(t, e) {
          const n = this._downcast.includes(e)
          if (!this._upcast.includes(e) && !n) throw new c('conversion-add-alias-dispatcher-not-registered', this)
          this._createConversionHelpers({ name: t, dispatchers: [e], isDowncast: n })
        }
        for(t) {
          if (!this._helpers.has(t)) throw new c('conversion-for-unknown-group', this)
          return this._helpers.get(t)
        }
        elementToElement(t) {
          this.for('downcast').elementToElement(t)
          for (const { model: e, view: n } of tl(t))
            this.for('upcast').elementToElement({ model: e, view: n, converterPriority: t.converterPriority })
        }
        attributeToElement(t) {
          this.for('downcast').attributeToElement(t)
          for (const { model: e, view: n } of tl(t))
            this.for('upcast').elementToAttribute({ view: n, model: e, converterPriority: t.converterPriority })
        }
        attributeToAttribute(t) {
          this.for('downcast').attributeToAttribute(t)
          for (const { model: e, view: n } of tl(t)) this.for('upcast').attributeToAttribute({ view: n, model: e })
        }
        _createConversionHelpers({ name: t, dispatchers: e, isDowncast: n }) {
          if (this._helpers.has(t)) throw new c('conversion-group-exists', this)
          const i = n ? new ac(e) : new kc(e)
          this._helpers.set(t, i)
        }
      }
      function* tl(t) {
        if (t.model.values)
          for (const e of t.model.values) {
            const n = { key: t.model.key, value: e },
              i = t.view[e],
              s = t.upcastAlso ? t.upcastAlso[e] : void 0
            yield* el(n, i, s)
          }
        else yield* el(t.model, t.view, t.upcastAlso)
      }
      function* el(t, e, n) {
        if ((yield { model: t, view: e }, n)) for (const e of Si(n)) yield { model: t, view: e }
      }
      class nl {
        constructor(t = {}) {
          'string' == typeof t &&
            ((t = 'transparent' === t ? { isUndoable: !1 } : {}), l('batch-constructor-deprecated-string-type'))
          const { isUndoable: e = !0, isLocal: n = !0, isUndo: i = !1, isTyping: s = !1 } = t
          ;(this.operations = []), (this.isUndoable = e), (this.isLocal = n), (this.isUndo = i), (this.isTyping = s)
        }
        get type() {
          return l('batch-type-deprecated'), 'default'
        }
        get baseVersion() {
          for (const t of this.operations) if (null !== t.baseVersion) return t.baseVersion
          return null
        }
        addOperation(t) {
          return (t.batch = this), this.operations.push(t), t
        }
      }
      class il {
        constructor(t) {
          ;(this.baseVersion = t), (this.isDocumentOperation = null !== this.baseVersion), (this.batch = null)
        }
        _validate() {}
        toJSON() {
          const t = Object.assign({}, this)
          return (t.__className = this.constructor.className), delete t.batch, delete t.isDocumentOperation, t
        }
        static get className() {
          return 'Operation'
        }
        static fromJSON(t) {
          return new this(t.baseVersion)
        }
      }
      class sl {
        constructor(t) {
          ;(this.markers = new Map()), (this._children = new Ia()), t && this._insertChild(0, t)
        }
        [Symbol.iterator]() {
          return this.getChildren()
        }
        get childCount() {
          return this._children.length
        }
        get maxOffset() {
          return this._children.maxOffset
        }
        get isEmpty() {
          return 0 === this.childCount
        }
        get root() {
          return this
        }
        get parent() {
          return null
        }
        is(t) {
          return 'documentFragment' === t || 'model:documentFragment' === t
        }
        getChild(t) {
          return this._children.getNode(t)
        }
        getChildren() {
          return this._children[Symbol.iterator]()
        }
        getChildIndex(t) {
          return this._children.getNodeIndex(t)
        }
        getChildStartOffset(t) {
          return this._children.getNodeStartOffset(t)
        }
        getPath() {
          return []
        }
        getNodeByPath(t) {
          let e = this
          for (const n of t) e = e.getChild(e.offsetToIndex(n))
          return e
        }
        offsetToIndex(t) {
          return this._children.offsetToIndex(t)
        }
        toJSON() {
          const t = []
          for (const e of this._children) t.push(e.toJSON())
          return t
        }
        static fromJSON(t) {
          const e = []
          for (const n of t) n.name ? e.push(Ma.fromJSON(n)) : e.push(Ra.fromJSON(n))
          return new sl(e)
        }
        _appendChild(t) {
          this._insertChild(this.childCount, t)
        }
        _insertChild(t, e) {
          const n = (function (t) {
            if ('string' == typeof t) return [new Ra(t)]
            Ai(t) || (t = [t])
            return Array.from(t).map(t =>
              'string' == typeof t ? new Ra(t) : t instanceof Oa ? new Ra(t.data, t.getAttributes()) : t
            )
          })(e)
          for (const t of n) null !== t.parent && t._remove(), (t.parent = this)
          this._children._insertNodes(t, n)
        }
        _removeChildren(t, e = 1) {
          const n = this._children._removeNodes(t, e)
          for (const t of n) t.parent = null
          return n
        }
      }
      function ol(t, e) {
        const n = (e = cl(e)).reduce((t, e) => t + e.offsetSize, 0),
          i = t.parent
        hl(t)
        const s = t.index
        return i._insertChild(s, e), ll(i, s + e.length), ll(i, s), new ja(t, t.getShiftedBy(n))
      }
      function rl(t) {
        if (!t.isFlat) throw new c('operation-utils-remove-range-not-flat', this)
        const e = t.start.parent
        hl(t.start), hl(t.end)
        const n = e._removeChildren(t.start.index, t.end.index - t.start.index)
        return ll(e, t.start.index), n
      }
      function al(t, e) {
        if (!t.isFlat) throw new c('operation-utils-move-range-not-flat', this)
        const n = rl(t)
        return ol((e = e._getTransformedByDeletion(t.start, t.end.offset - t.start.offset)), n)
      }
      function cl(t) {
        const e = []
        t instanceof Array || (t = [t])
        for (let n = 0; n < t.length; n++)
          if ('string' == typeof t[n]) e.push(new Ra(t[n]))
          else if (t[n] instanceof Oa) e.push(new Ra(t[n].data, t[n].getAttributes()))
          else if (t[n] instanceof sl || t[n] instanceof Ia) for (const i of t[n]) e.push(i)
          else t[n] instanceof Ta && e.push(t[n])
        for (let t = 1; t < e.length; t++) {
          const n = e[t],
            i = e[t - 1]
          n instanceof Ra &&
            i instanceof Ra &&
            dl(n, i) &&
            (e.splice(t - 1, 2, new Ra(i.data + n.data, i.getAttributes())), t--)
        }
        return e
      }
      function ll(t, e) {
        const n = t.getChild(e - 1),
          i = t.getChild(e)
        if (n && i && n.is('$text') && i.is('$text') && dl(n, i)) {
          const s = new Ra(n.data + i.data, n.getAttributes())
          t._removeChildren(e - 1, 2), t._insertChild(e - 1, s)
        }
      }
      function hl(t) {
        const e = t.textNode,
          n = t.parent
        if (e) {
          const i = t.offset - e.startOffset,
            s = e.index
          n._removeChildren(s, 1)
          const o = new Ra(e.data.substr(0, i), e.getAttributes()),
            r = new Ra(e.data.substr(i), e.getAttributes())
          n._insertChild(s, [o, r])
        }
      }
      function dl(t, e) {
        const n = t.getAttributes(),
          i = e.getAttributes()
        for (const t of n) {
          if (t[1] !== e.getAttribute(t[0])) return !1
          i.next()
        }
        return i.next().done
      }
      const ul = function (t, e) {
        return Nr(t, e)
      }
      class fl extends il {
        constructor(t, e, n, i, s) {
          super(s),
            (this.range = t.clone()),
            (this.key = e),
            (this.oldValue = void 0 === n ? null : n),
            (this.newValue = void 0 === i ? null : i)
        }
        get type() {
          return null === this.oldValue
            ? 'addAttribute'
            : null === this.newValue
            ? 'removeAttribute'
            : 'changeAttribute'
        }
        clone() {
          return new fl(this.range, this.key, this.oldValue, this.newValue, this.baseVersion)
        }
        getReversed() {
          return new fl(this.range, this.key, this.newValue, this.oldValue, this.baseVersion + 1)
        }
        toJSON() {
          const t = super.toJSON()
          return (t.range = this.range.toJSON()), t
        }
        _validate() {
          if (!this.range.isFlat) throw new c('attribute-operation-range-not-flat', this)
          for (const t of this.range.getItems({ shallow: !0 })) {
            if (null !== this.oldValue && !ul(t.getAttribute(this.key), this.oldValue))
              throw new c('attribute-operation-wrong-old-value', this, { item: t, key: this.key, value: this.oldValue })
            if (null === this.oldValue && null !== this.newValue && t.hasAttribute(this.key))
              throw new c('attribute-operation-attribute-exists', this, { node: t, key: this.key })
          }
        }
        _execute() {
          ul(this.oldValue, this.newValue) ||
            (function (t, e, n) {
              hl(t.start), hl(t.end)
              for (const i of t.getItems({ shallow: !0 })) {
                const t = i.is('$textProxy') ? i.textNode : i
                null !== n ? t._setAttribute(e, n) : t._removeAttribute(e), ll(t.parent, t.index)
              }
              ll(t.end.parent, t.end.index)
            })(this.range, this.key, this.newValue)
        }
        static get className() {
          return 'AttributeOperation'
        }
        static fromJSON(t, e) {
          return new fl(ja.fromJSON(t.range, e), t.key, t.oldValue, t.newValue, t.baseVersion)
        }
      }
      class ml extends il {
        constructor(t, e) {
          super(null), (this.sourcePosition = t.clone()), (this.howMany = e)
        }
        get type() {
          return 'detach'
        }
        toJSON() {
          const t = super.toJSON()
          return (t.sourcePosition = this.sourcePosition.toJSON()), t
        }
        _validate() {
          if (this.sourcePosition.root.document) throw new c('detach-operation-on-document-node', this)
        }
        _execute() {
          rl(ja._createFromPositionAndShift(this.sourcePosition, this.howMany))
        }
        static get className() {
          return 'DetachOperation'
        }
      }
      class gl extends il {
        constructor(t, e, n, i) {
          super(i),
            (this.sourcePosition = t.clone()),
            (this.sourcePosition.stickiness = 'toNext'),
            (this.howMany = e),
            (this.targetPosition = n.clone()),
            (this.targetPosition.stickiness = 'toNone')
        }
        get type() {
          return '$graveyard' == this.targetPosition.root.rootName
            ? 'remove'
            : '$graveyard' == this.sourcePosition.root.rootName
            ? 'reinsert'
            : 'move'
        }
        clone() {
          return new this.constructor(this.sourcePosition, this.howMany, this.targetPosition, this.baseVersion)
        }
        getMovedRangeStart() {
          return this.targetPosition._getTransformedByDeletion(this.sourcePosition, this.howMany)
        }
        getReversed() {
          const t = this.sourcePosition._getTransformedByInsertion(this.targetPosition, this.howMany)
          return new this.constructor(this.getMovedRangeStart(), this.howMany, t, this.baseVersion + 1)
        }
        _validate() {
          const t = this.sourcePosition.parent,
            e = this.targetPosition.parent,
            n = this.sourcePosition.offset,
            i = this.targetPosition.offset
          if (n + this.howMany > t.maxOffset) throw new c('move-operation-nodes-do-not-exist', this)
          if (t === e && n < i && i < n + this.howMany) throw new c('move-operation-range-into-itself', this)
          if (
            this.sourcePosition.root == this.targetPosition.root &&
            'prefix' == Ni(this.sourcePosition.getParentPath(), this.targetPosition.getParentPath())
          ) {
            const t = this.sourcePosition.path.length - 1
            if (this.targetPosition.path[t] >= n && this.targetPosition.path[t] < n + this.howMany)
              throw new c('move-operation-node-into-itself', this)
          }
        }
        _execute() {
          al(ja._createFromPositionAndShift(this.sourcePosition, this.howMany), this.targetPosition)
        }
        toJSON() {
          const t = super.toJSON()
          return (t.sourcePosition = this.sourcePosition.toJSON()), (t.targetPosition = this.targetPosition.toJSON()), t
        }
        static get className() {
          return 'MoveOperation'
        }
        static fromJSON(t, e) {
          const n = Fa.fromJSON(t.sourcePosition, e),
            i = Fa.fromJSON(t.targetPosition, e)
          return new this(n, t.howMany, i, t.baseVersion)
        }
      }
      class pl extends il {
        constructor(t, e, n) {
          super(n),
            (this.position = t.clone()),
            (this.position.stickiness = 'toNone'),
            (this.nodes = new Ia(cl(e))),
            (this.shouldReceiveAttributes = !1)
        }
        get type() {
          return 'insert'
        }
        get howMany() {
          return this.nodes.maxOffset
        }
        clone() {
          const t = new Ia([...this.nodes].map(t => t._clone(!0))),
            e = new pl(this.position, t, this.baseVersion)
          return (e.shouldReceiveAttributes = this.shouldReceiveAttributes), e
        }
        getReversed() {
          const t = this.position.root.document.graveyard,
            e = new Fa(t, [0])
          return new gl(this.position, this.nodes.maxOffset, e, this.baseVersion + 1)
        }
        _validate() {
          const t = this.position.parent
          if (!t || t.maxOffset < this.position.offset) throw new c('insert-operation-position-invalid', this)
        }
        _execute() {
          const t = this.nodes
          ;(this.nodes = new Ia([...t].map(t => t._clone(!0)))), ol(this.position, t)
        }
        toJSON() {
          const t = super.toJSON()
          return (t.position = this.position.toJSON()), (t.nodes = this.nodes.toJSON()), t
        }
        static get className() {
          return 'InsertOperation'
        }
        static fromJSON(t, e) {
          const n = []
          for (const e of t.nodes) e.name ? n.push(Ma.fromJSON(e)) : n.push(Ra.fromJSON(e))
          const i = new pl(Fa.fromJSON(t.position, e), n, t.baseVersion)
          return (i.shouldReceiveAttributes = t.shouldReceiveAttributes), i
        }
      }
      class _l extends il {
        constructor(t, e, n, i, s, o) {
          super(o),
            (this.name = t),
            (this.oldRange = e ? e.clone() : null),
            (this.newRange = n ? n.clone() : null),
            (this.affectsData = s),
            (this._markers = i)
        }
        get type() {
          return 'marker'
        }
        clone() {
          return new _l(this.name, this.oldRange, this.newRange, this._markers, this.affectsData, this.baseVersion)
        }
        getReversed() {
          return new _l(this.name, this.newRange, this.oldRange, this._markers, this.affectsData, this.baseVersion + 1)
        }
        _execute() {
          const t = this.newRange ? '_set' : '_remove'
          this._markers[t](this.name, this.newRange, !0, this.affectsData)
        }
        toJSON() {
          const t = super.toJSON()
          return (
            this.oldRange && (t.oldRange = this.oldRange.toJSON()),
            this.newRange && (t.newRange = this.newRange.toJSON()),
            delete t._markers,
            t
          )
        }
        static get className() {
          return 'MarkerOperation'
        }
        static fromJSON(t, e) {
          return new _l(
            t.name,
            t.oldRange ? ja.fromJSON(t.oldRange, e) : null,
            t.newRange ? ja.fromJSON(t.newRange, e) : null,
            e.model.markers,
            t.affectsData,
            t.baseVersion
          )
        }
      }
      class wl extends il {
        constructor(t, e, n, i) {
          super(i), (this.position = t), (this.position.stickiness = 'toNext'), (this.oldName = e), (this.newName = n)
        }
        get type() {
          return 'rename'
        }
        clone() {
          return new wl(this.position.clone(), this.oldName, this.newName, this.baseVersion)
        }
        getReversed() {
          return new wl(this.position.clone(), this.newName, this.oldName, this.baseVersion + 1)
        }
        _validate() {
          const t = this.position.nodeAfter
          if (!(t instanceof Ma)) throw new c('rename-operation-wrong-position', this)
          if (t.name !== this.oldName) throw new c('rename-operation-wrong-name', this)
        }
        _execute() {
          this.position.nodeAfter.name = this.newName
        }
        toJSON() {
          const t = super.toJSON()
          return (t.position = this.position.toJSON()), t
        }
        static get className() {
          return 'RenameOperation'
        }
        static fromJSON(t, e) {
          return new wl(Fa.fromJSON(t.position, e), t.oldName, t.newName, t.baseVersion)
        }
      }
      class bl extends il {
        constructor(t, e, n, i, s) {
          super(s), (this.root = t), (this.key = e), (this.oldValue = n), (this.newValue = i)
        }
        get type() {
          return null === this.oldValue
            ? 'addRootAttribute'
            : null === this.newValue
            ? 'removeRootAttribute'
            : 'changeRootAttribute'
        }
        clone() {
          return new bl(this.root, this.key, this.oldValue, this.newValue, this.baseVersion)
        }
        getReversed() {
          return new bl(this.root, this.key, this.newValue, this.oldValue, this.baseVersion + 1)
        }
        _validate() {
          if (this.root != this.root.root || this.root.is('documentFragment'))
            throw new c('rootattribute-operation-not-a-root', this, { root: this.root, key: this.key })
          if (null !== this.oldValue && this.root.getAttribute(this.key) !== this.oldValue)
            throw new c('rootattribute-operation-wrong-old-value', this, { root: this.root, key: this.key })
          if (null === this.oldValue && null !== this.newValue && this.root.hasAttribute(this.key))
            throw new c('rootattribute-operation-attribute-exists', this, { root: this.root, key: this.key })
        }
        _execute() {
          null !== this.newValue
            ? this.root._setAttribute(this.key, this.newValue)
            : this.root._removeAttribute(this.key)
        }
        toJSON() {
          const t = super.toJSON()
          return (t.root = this.root.toJSON()), t
        }
        static get className() {
          return 'RootAttributeOperation'
        }
        static fromJSON(t, e) {
          if (!e.getRoot(t.root)) throw new c('rootattribute-operation-fromjson-no-root', this, { rootName: t.root })
          return new bl(e.getRoot(t.root), t.key, t.oldValue, t.newValue, t.baseVersion)
        }
      }
      class yl extends il {
        constructor(t, e, n, i, s) {
          super(s),
            (this.sourcePosition = t.clone()),
            (this.sourcePosition.stickiness = 'toPrevious'),
            (this.howMany = e),
            (this.targetPosition = n.clone()),
            (this.targetPosition.stickiness = 'toNext'),
            (this.graveyardPosition = i.clone())
        }
        get type() {
          return 'merge'
        }
        get deletionPosition() {
          return new Fa(this.sourcePosition.root, this.sourcePosition.path.slice(0, -1))
        }
        get movedRange() {
          const t = this.sourcePosition.getShiftedBy(Number.POSITIVE_INFINITY)
          return new ja(this.sourcePosition, t)
        }
        clone() {
          return new this.constructor(
            this.sourcePosition,
            this.howMany,
            this.targetPosition,
            this.graveyardPosition,
            this.baseVersion
          )
        }
        getReversed() {
          const t = this.targetPosition._getTransformedByMergeOperation(this),
            e = this.sourcePosition.path.slice(0, -1),
            n = new Fa(this.sourcePosition.root, e)._getTransformedByMergeOperation(this)
          return new vl(t, this.howMany, n, this.graveyardPosition, this.baseVersion + 1)
        }
        _validate() {
          const t = this.sourcePosition.parent,
            e = this.targetPosition.parent
          if (!t.parent) throw new c('merge-operation-source-position-invalid', this)
          if (!e.parent) throw new c('merge-operation-target-position-invalid', this)
          if (this.howMany != t.maxOffset) throw new c('merge-operation-how-many-invalid', this)
        }
        _execute() {
          const t = this.sourcePosition.parent
          al(ja._createIn(t), this.targetPosition), al(ja._createOn(t), this.graveyardPosition)
        }
        toJSON() {
          const t = super.toJSON()
          return (
            (t.sourcePosition = t.sourcePosition.toJSON()),
            (t.targetPosition = t.targetPosition.toJSON()),
            (t.graveyardPosition = t.graveyardPosition.toJSON()),
            t
          )
        }
        static get className() {
          return 'MergeOperation'
        }
        static fromJSON(t, e) {
          const n = Fa.fromJSON(t.sourcePosition, e),
            i = Fa.fromJSON(t.targetPosition, e),
            s = Fa.fromJSON(t.graveyardPosition, e)
          return new this(n, t.howMany, i, s, t.baseVersion)
        }
      }
      class vl extends il {
        constructor(t, e, n, i, s) {
          super(s),
            (this.splitPosition = t.clone()),
            (this.splitPosition.stickiness = 'toNext'),
            (this.howMany = e),
            (this.insertionPosition = n),
            (this.graveyardPosition = i ? i.clone() : null),
            this.graveyardPosition && (this.graveyardPosition.stickiness = 'toNext')
        }
        get type() {
          return 'split'
        }
        get moveTargetPosition() {
          const t = this.insertionPosition.path.slice()
          return t.push(0), new Fa(this.insertionPosition.root, t)
        }
        get movedRange() {
          const t = this.splitPosition.getShiftedBy(Number.POSITIVE_INFINITY)
          return new ja(this.splitPosition, t)
        }
        clone() {
          return new this.constructor(
            this.splitPosition,
            this.howMany,
            this.insertionPosition,
            this.graveyardPosition,
            this.baseVersion
          )
        }
        getReversed() {
          const t = this.splitPosition.root.document.graveyard,
            e = new Fa(t, [0])
          return new yl(this.moveTargetPosition, this.howMany, this.splitPosition, e, this.baseVersion + 1)
        }
        _validate() {
          const t = this.splitPosition.parent,
            e = this.splitPosition.offset
          if (!t || t.maxOffset < e) throw new c('split-operation-position-invalid', this)
          if (!t.parent) throw new c('split-operation-split-in-root', this)
          if (this.howMany != t.maxOffset - this.splitPosition.offset)
            throw new c('split-operation-how-many-invalid', this)
          if (this.graveyardPosition && !this.graveyardPosition.nodeAfter)
            throw new c('split-operation-graveyard-position-invalid', this)
        }
        _execute() {
          const t = this.splitPosition.parent
          if (this.graveyardPosition)
            al(ja._createFromPositionAndShift(this.graveyardPosition, 1), this.insertionPosition)
          else {
            const e = t._clone()
            ol(this.insertionPosition, e)
          }
          al(new ja(Fa._createAt(t, this.splitPosition.offset), Fa._createAt(t, t.maxOffset)), this.moveTargetPosition)
        }
        toJSON() {
          const t = super.toJSON()
          return (
            (t.splitPosition = this.splitPosition.toJSON()),
            (t.insertionPosition = this.insertionPosition.toJSON()),
            this.graveyardPosition && (t.graveyardPosition = this.graveyardPosition.toJSON()),
            t
          )
        }
        static get className() {
          return 'SplitOperation'
        }
        static getInsertionPosition(t) {
          const e = t.path.slice(0, -1)
          return e[e.length - 1]++, new Fa(t.root, e, 'toPrevious')
        }
        static fromJSON(t, e) {
          const n = Fa.fromJSON(t.splitPosition, e),
            i = Fa.fromJSON(t.insertionPosition, e),
            s = t.graveyardPosition ? Fa.fromJSON(t.graveyardPosition, e) : null
          return new this(n, t.howMany, i, s, t.baseVersion)
        }
      }
      class Pl extends Ma {
        constructor(t, e, n = 'main') {
          super(e), (this._document = t), (this.rootName = n)
        }
        get document() {
          return this._document
        }
        is(t, e) {
          return e
            ? e === this.name &&
                ('rootElement' === t || 'model:rootElement' === t || 'element' === t || 'model:element' === t)
            : 'rootElement' === t ||
                'model:rootElement' === t ||
                'element' === t ||
                'model:element' === t ||
                'node' === t ||
                'model:node' === t
        }
        toJSON() {
          return this.rootName
        }
      }
      class kl {
        constructor(t, e) {
          ;(this.model = t), (this.batch = e)
        }
        createText(t, e) {
          return new Ra(t, e)
        }
        createElement(t, e) {
          return new Ma(t, e)
        }
        createDocumentFragment() {
          return new sl()
        }
        cloneElement(t, e = !0) {
          return t._clone(e)
        }
        insert(t, e, n = 0) {
          if ((this._assertWriterUsedCorrectly(), t instanceof Ra && '' == t.data)) return
          const i = Fa._createAt(e, n)
          if (t.parent) {
            if (xl(t.root, i.root)) return void this.move(ja._createOn(t), i)
            if (t.root.document) throw new c('model-writer-insert-forbidden-move', this)
            this.remove(t)
          }
          const s = i.root.document ? i.root.document.version : null,
            o = new pl(i, t, s)
          if (
            (t instanceof Ra && (o.shouldReceiveAttributes = !0),
            this.batch.addOperation(o),
            this.model.applyOperation(o),
            t instanceof sl)
          )
            for (const [e, n] of t.markers) {
              const t = Fa._createAt(n.root, 0),
                s = {
                  range: new ja(n.start._getCombined(t, i), n.end._getCombined(t, i)),
                  usingOperation: !0,
                  affectsData: !0,
                }
              this.model.markers.has(e) ? this.updateMarker(e, s) : this.addMarker(e, s)
            }
        }
        insertText(t, e, n, i) {
          e instanceof sl || e instanceof Ma || e instanceof Fa
            ? this.insert(this.createText(t), e, n)
            : this.insert(this.createText(t, e), n, i)
        }
        insertElement(t, e, n, i) {
          e instanceof sl || e instanceof Ma || e instanceof Fa
            ? this.insert(this.createElement(t), e, n)
            : this.insert(this.createElement(t, e), n, i)
        }
        append(t, e) {
          this.insert(t, e, 'end')
        }
        appendText(t, e, n) {
          e instanceof sl || e instanceof Ma
            ? this.insert(this.createText(t), e, 'end')
            : this.insert(this.createText(t, e), n, 'end')
        }
        appendElement(t, e, n) {
          e instanceof sl || e instanceof Ma
            ? this.insert(this.createElement(t), e, 'end')
            : this.insert(this.createElement(t, e), n, 'end')
        }
        setAttribute(t, e, n) {
          if ((this._assertWriterUsedCorrectly(), n instanceof ja)) {
            const i = n.getMinimalFlatRanges()
            for (const n of i) Al(this, t, e, n)
          } else Cl(this, t, e, n)
        }
        setAttributes(t, e) {
          for (const [n, i] of Li(t)) this.setAttribute(n, i, e)
        }
        removeAttribute(t, e) {
          if ((this._assertWriterUsedCorrectly(), e instanceof ja)) {
            const n = e.getMinimalFlatRanges()
            for (const e of n) Al(this, t, null, e)
          } else Cl(this, t, null, e)
        }
        clearAttributes(t) {
          this._assertWriterUsedCorrectly()
          const e = t => {
            for (const e of t.getAttributeKeys()) this.removeAttribute(e, t)
          }
          if (t instanceof ja) for (const n of t.getItems()) e(n)
          else e(t)
        }
        move(t, e, n) {
          if ((this._assertWriterUsedCorrectly(), !(t instanceof ja))) throw new c('writer-move-invalid-range', this)
          if (!t.isFlat) throw new c('writer-move-range-not-flat', this)
          const i = Fa._createAt(e, n)
          if (i.isEqual(t.start)) return
          if ((this._addOperationForAffectedMarkers('move', t), !xl(t.root, i.root)))
            throw new c('writer-move-different-document', this)
          const s = t.root.document ? t.root.document.version : null,
            o = new gl(t.start, t.end.offset - t.start.offset, i, s)
          this.batch.addOperation(o), this.model.applyOperation(o)
        }
        remove(t) {
          this._assertWriterUsedCorrectly()
          const e = (t instanceof ja ? t : ja._createOn(t)).getMinimalFlatRanges().reverse()
          for (const t of e)
            this._addOperationForAffectedMarkers('move', t),
              Sl(t.start, t.end.offset - t.start.offset, this.batch, this.model)
        }
        merge(t) {
          this._assertWriterUsedCorrectly()
          const e = t.nodeBefore,
            n = t.nodeAfter
          if ((this._addOperationForAffectedMarkers('merge', t), !(e instanceof Ma)))
            throw new c('writer-merge-no-element-before', this)
          if (!(n instanceof Ma)) throw new c('writer-merge-no-element-after', this)
          t.root.document ? this._merge(t) : this._mergeDetached(t)
        }
        createPositionFromPath(t, e, n) {
          return this.model.createPositionFromPath(t, e, n)
        }
        createPositionAt(t, e) {
          return this.model.createPositionAt(t, e)
        }
        createPositionAfter(t) {
          return this.model.createPositionAfter(t)
        }
        createPositionBefore(t) {
          return this.model.createPositionBefore(t)
        }
        createRange(t, e) {
          return this.model.createRange(t, e)
        }
        createRangeIn(t) {
          return this.model.createRangeIn(t)
        }
        createRangeOn(t) {
          return this.model.createRangeOn(t)
        }
        createSelection(t, e, n) {
          return this.model.createSelection(t, e, n)
        }
        _mergeDetached(t) {
          const e = t.nodeBefore,
            n = t.nodeAfter
          this.move(ja._createIn(n), Fa._createAt(e, 'end')), this.remove(n)
        }
        _merge(t) {
          const e = Fa._createAt(t.nodeBefore, 'end'),
            n = Fa._createAt(t.nodeAfter, 0),
            i = t.root.document.graveyard,
            s = new Fa(i, [0]),
            o = t.root.document.version,
            r = new yl(n, t.nodeAfter.maxOffset, e, s, o)
          this.batch.addOperation(r), this.model.applyOperation(r)
        }
        rename(t, e) {
          if ((this._assertWriterUsedCorrectly(), !(t instanceof Ma)))
            throw new c('writer-rename-not-element-instance', this)
          const n = t.root.document ? t.root.document.version : null,
            i = new wl(Fa._createBefore(t), t.name, e, n)
          this.batch.addOperation(i), this.model.applyOperation(i)
        }
        split(t, e) {
          this._assertWriterUsedCorrectly()
          let n,
            i,
            s = t.parent
          if (!s.parent) throw new c('writer-split-element-no-parent', this)
          if ((e || (e = s.parent), !t.parent.getAncestors({ includeSelf: !0 }).includes(e)))
            throw new c('writer-split-invalid-limit-element', this)
          do {
            const e = s.root.document ? s.root.document.version : null,
              o = s.maxOffset - t.offset,
              r = vl.getInsertionPosition(t),
              a = new vl(t, o, r, null, e)
            this.batch.addOperation(a),
              this.model.applyOperation(a),
              n || i || ((n = s), (i = t.parent.nextSibling)),
              (s = (t = this.createPositionAfter(t.parent)).parent)
          } while (s !== e)
          return { position: t, range: new ja(Fa._createAt(n, 'end'), Fa._createAt(i, 0)) }
        }
        wrap(t, e) {
          if ((this._assertWriterUsedCorrectly(), !t.isFlat)) throw new c('writer-wrap-range-not-flat', this)
          const n = e instanceof Ma ? e : new Ma(e)
          if (n.childCount > 0) throw new c('writer-wrap-element-not-empty', this)
          if (null !== n.parent) throw new c('writer-wrap-element-attached', this)
          this.insert(n, t.start)
          const i = new ja(t.start.getShiftedBy(1), t.end.getShiftedBy(1))
          this.move(i, Fa._createAt(n, 0))
        }
        unwrap(t) {
          if ((this._assertWriterUsedCorrectly(), null === t.parent))
            throw new c('writer-unwrap-element-no-parent', this)
          this.move(ja._createIn(t), this.createPositionAfter(t)), this.remove(t)
        }
        addMarker(t, e) {
          if ((this._assertWriterUsedCorrectly(), !e || 'boolean' != typeof e.usingOperation))
            throw new c('writer-addmarker-no-usingoperation', this)
          const n = e.usingOperation,
            i = e.range,
            s = void 0 !== e.affectsData && e.affectsData
          if (this.model.markers.has(t)) throw new c('writer-addmarker-marker-exists', this)
          if (!i) throw new c('writer-addmarker-no-range', this)
          return n ? (El(this, t, null, i, s), this.model.markers.get(t)) : this.model.markers._set(t, i, n, s)
        }
        updateMarker(t, e) {
          this._assertWriterUsedCorrectly()
          const n = 'string' == typeof t ? t : t.name,
            i = this.model.markers.get(n)
          if (!i) throw new c('writer-updatemarker-marker-not-exists', this)
          if (!e)
            return (
              l('writer-updatemarker-reconvert-using-editingcontroller', { markerName: n }),
              void this.model.markers._refresh(i)
            )
          const s = 'boolean' == typeof e.usingOperation,
            o = 'boolean' == typeof e.affectsData,
            r = o ? e.affectsData : i.affectsData
          if (!s && !e.range && !o) throw new c('writer-updatemarker-wrong-options', this)
          const a = i.getRange(),
            h = e.range ? e.range : a
          s && e.usingOperation !== i.managedUsingOperations
            ? e.usingOperation
              ? El(this, n, null, h, r)
              : (El(this, n, a, null, r), this.model.markers._set(n, h, void 0, r))
            : i.managedUsingOperations
            ? El(this, n, a, h, r)
            : this.model.markers._set(n, h, void 0, r)
        }
        removeMarker(t) {
          this._assertWriterUsedCorrectly()
          const e = 'string' == typeof t ? t : t.name
          if (!this.model.markers.has(e)) throw new c('writer-removemarker-no-marker', this)
          const n = this.model.markers.get(e)
          if (!n.managedUsingOperations) return void this.model.markers._remove(e)
          El(this, e, n.getRange(), null, n.affectsData)
        }
        setSelection(t, e, n) {
          this._assertWriterUsedCorrectly(), this.model.document.selection._setTo(t, e, n)
        }
        setSelectionFocus(t, e) {
          this._assertWriterUsedCorrectly(), this.model.document.selection._setFocus(t, e)
        }
        setSelectionAttribute(t, e) {
          if ((this._assertWriterUsedCorrectly(), 'string' == typeof t)) this._setSelectionAttribute(t, e)
          else for (const [e, n] of Li(t)) this._setSelectionAttribute(e, n)
        }
        removeSelectionAttribute(t) {
          if ((this._assertWriterUsedCorrectly(), 'string' == typeof t)) this._removeSelectionAttribute(t)
          else for (const e of t) this._removeSelectionAttribute(e)
        }
        overrideSelectionGravity() {
          return this.model.document.selection._overrideGravity()
        }
        restoreSelectionGravity(t) {
          this.model.document.selection._restoreGravity(t)
        }
        _setSelectionAttribute(t, e) {
          const n = this.model.document.selection
          if (n.isCollapsed && n.anchor.parent.isEmpty) {
            const i = nc._getStoreAttributeKey(t)
            this.setAttribute(i, e, n.anchor.parent)
          }
          n._setAttribute(t, e)
        }
        _removeSelectionAttribute(t) {
          const e = this.model.document.selection
          if (e.isCollapsed && e.anchor.parent.isEmpty) {
            const n = nc._getStoreAttributeKey(t)
            this.removeAttribute(n, e.anchor.parent)
          }
          e._removeAttribute(t)
        }
        _assertWriterUsedCorrectly() {
          if (this.model._currentWriter !== this) throw new c('writer-incorrect-use', this)
        }
        _addOperationForAffectedMarkers(t, e) {
          for (const n of this.model.markers) {
            if (!n.managedUsingOperations) continue
            const i = n.getRange()
            let s = !1
            if ('move' === t)
              s =
                e.containsPosition(i.start) ||
                e.start.isEqual(i.start) ||
                e.containsPosition(i.end) ||
                e.end.isEqual(i.end)
            else {
              const t = e.nodeBefore,
                n = e.nodeAfter,
                o = i.start.parent == t && i.start.isAtEnd,
                r = i.end.parent == n && 0 == i.end.offset,
                a = i.end.nodeAfter == n,
                c = i.start.nodeAfter == n
              s = o || r || a || c
            }
            s && this.updateMarker(n.name, { range: i })
          }
        }
      }
      function Al(t, e, n, i) {
        const s = t.model,
          o = s.document
        let r,
          a,
          c,
          l = i.start
        for (const t of i.getWalker({ shallow: !0 }))
          (c = t.item.getAttribute(e)), r && a != c && (a != n && h(), (l = r)), (r = t.nextPosition), (a = c)
        function h() {
          const i = new ja(l, r),
            c = i.root.document ? o.version : null,
            h = new fl(i, e, a, n, c)
          t.batch.addOperation(h), s.applyOperation(h)
        }
        r instanceof Fa && r != l && a != n && h()
      }
      function Cl(t, e, n, i) {
        const s = t.model,
          o = s.document,
          r = i.getAttribute(e)
        let a, c
        if (r != n) {
          if (i.root === i) {
            const t = i.document ? o.version : null
            c = new bl(i, e, r, n, t)
          } else {
            a = new ja(Fa._createBefore(i), t.createPositionAfter(i))
            const s = a.root.document ? o.version : null
            c = new fl(a, e, r, n, s)
          }
          t.batch.addOperation(c), s.applyOperation(c)
        }
      }
      function El(t, e, n, i, s) {
        const o = t.model,
          r = o.document,
          a = new _l(e, n, i, o.markers, s, r.version)
        t.batch.addOperation(a), o.applyOperation(a)
      }
      function Sl(t, e, n, i) {
        let s
        if (t.root.document) {
          const n = i.document,
            o = new Fa(n.graveyard, [0])
          s = new gl(t, e, o, n.version)
        } else s = new ml(t, e)
        n.addOperation(s), i.applyOperation(s)
      }
      function xl(t, e) {
        return t === e || (t instanceof Pl && e instanceof Pl)
      }
      class Tl {
        constructor(t) {
          ;(this._markerCollection = t),
            (this._changesInElement = new Map()),
            (this._elementSnapshots = new Map()),
            (this._changedMarkers = new Map()),
            (this._changeCount = 0),
            (this._cachedChanges = null),
            (this._cachedChangesWithGraveyard = null),
            (this._refreshedItems = new Set())
        }
        get isEmpty() {
          return 0 == this._changesInElement.size && 0 == this._changedMarkers.size
        }
        bufferOperation(t) {
          switch (t.type) {
            case 'insert':
              if (this._isInInsertedElement(t.position.parent)) return
              this._markInsert(t.position.parent, t.position.offset, t.nodes.maxOffset)
              break
            case 'addAttribute':
            case 'removeAttribute':
            case 'changeAttribute':
              for (const e of t.range.getItems({ shallow: !0 }))
                this._isInInsertedElement(e.parent) || this._markAttribute(e)
              break
            case 'remove':
            case 'move':
            case 'reinsert': {
              if (
                t.sourcePosition.isEqual(t.targetPosition) ||
                t.sourcePosition.getShiftedBy(t.howMany).isEqual(t.targetPosition)
              )
                return
              const e = this._isInInsertedElement(t.sourcePosition.parent),
                n = this._isInInsertedElement(t.targetPosition.parent)
              e || this._markRemove(t.sourcePosition.parent, t.sourcePosition.offset, t.howMany),
                n || this._markInsert(t.targetPosition.parent, t.getMovedRangeStart().offset, t.howMany)
              break
            }
            case 'rename': {
              if (this._isInInsertedElement(t.position.parent)) return
              this._markRemove(t.position.parent, t.position.offset, 1),
                this._markInsert(t.position.parent, t.position.offset, 1)
              const e = ja._createFromPositionAndShift(t.position, 1)
              for (const t of this._markerCollection.getMarkersIntersectingRange(e)) {
                const e = t.getData()
                this.bufferMarkerChange(t.name, e, e)
              }
              break
            }
            case 'split': {
              const e = t.splitPosition.parent
              this._isInInsertedElement(e) || this._markRemove(e, t.splitPosition.offset, t.howMany),
                this._isInInsertedElement(t.insertionPosition.parent) ||
                  this._markInsert(t.insertionPosition.parent, t.insertionPosition.offset, 1),
                t.graveyardPosition && this._markRemove(t.graveyardPosition.parent, t.graveyardPosition.offset, 1)
              break
            }
            case 'merge': {
              const e = t.sourcePosition.parent
              this._isInInsertedElement(e.parent) || this._markRemove(e.parent, e.startOffset, 1)
              const n = t.graveyardPosition.parent
              this._markInsert(n, t.graveyardPosition.offset, 1)
              const i = t.targetPosition.parent
              this._isInInsertedElement(i) || this._markInsert(i, t.targetPosition.offset, e.maxOffset)
              break
            }
          }
          this._cachedChanges = null
        }
        bufferMarkerChange(t, e, n) {
          const i = this._changedMarkers.get(t)
          i
            ? ((i.newMarkerData = n),
              null == i.oldMarkerData.range && null == n.range && this._changedMarkers.delete(t))
            : this._changedMarkers.set(t, { newMarkerData: n, oldMarkerData: e })
        }
        getMarkersToRemove() {
          const t = []
          for (const [e, n] of this._changedMarkers)
            null != n.oldMarkerData.range && t.push({ name: e, range: n.oldMarkerData.range })
          return t
        }
        getMarkersToAdd() {
          const t = []
          for (const [e, n] of this._changedMarkers)
            null != n.newMarkerData.range && t.push({ name: e, range: n.newMarkerData.range })
          return t
        }
        getChangedMarkers() {
          return Array.from(this._changedMarkers).map(([t, e]) => ({
            name: t,
            data: { oldRange: e.oldMarkerData.range, newRange: e.newMarkerData.range },
          }))
        }
        hasDataChanges() {
          if (this._changesInElement.size > 0) return !0
          for (const { newMarkerData: t, oldMarkerData: e } of this._changedMarkers.values()) {
            if (t.affectsData !== e.affectsData) return !0
            if (t.affectsData) {
              const n = t.range && !e.range,
                i = !t.range && e.range,
                s = t.range && e.range && !t.range.isEqual(e.range)
              if (n || i || s) return !0
            }
          }
          return !1
        }
        getChanges(t = { includeChangesInGraveyard: !1 }) {
          if (this._cachedChanges)
            return t.includeChangesInGraveyard ? this._cachedChangesWithGraveyard.slice() : this._cachedChanges.slice()
          let e = []
          for (const t of this._changesInElement.keys()) {
            const n = this._changesInElement
                .get(t)
                .sort((t, e) =>
                  t.offset === e.offset
                    ? t.type != e.type
                      ? 'remove' == t.type
                        ? -1
                        : 1
                      : 0
                    : t.offset < e.offset
                    ? -1
                    : 1
                ),
              i = this._elementSnapshots.get(t),
              s = Rl(t.getChildren()),
              o = Ol(i.length, n)
            let r = 0,
              a = 0
            for (const n of o)
              if ('i' === n) e.push(this._getInsertDiff(t, r, s[r])), r++
              else if ('r' === n) e.push(this._getRemoveDiff(t, r, i[a])), a++
              else if ('a' === n) {
                const n = s[r].attributes,
                  o = i[a].attributes
                let c
                if ('$text' == s[r].name) c = new ja(Fa._createAt(t, r), Fa._createAt(t, r + 1))
                else {
                  const e = t.offsetToIndex(r)
                  c = new ja(Fa._createAt(t, r), Fa._createAt(t.getChild(e), 0))
                }
                e.push(...this._getAttributesDiff(c, o, n)), r++, a++
              } else r++, a++
          }
          e.sort((t, e) =>
            t.position.root != e.position.root
              ? t.position.root.rootName < e.position.root.rootName
                ? -1
                : 1
              : t.position.isEqual(e.position)
              ? t.changeCount - e.changeCount
              : t.position.isBefore(e.position)
              ? -1
              : 1
          )
          for (let t = 1, n = 0; t < e.length; t++) {
            const i = e[n],
              s = e[t],
              o =
                'remove' == i.type &&
                'remove' == s.type &&
                '$text' == i.name &&
                '$text' == s.name &&
                i.position.isEqual(s.position),
              r =
                'insert' == i.type &&
                'insert' == s.type &&
                '$text' == i.name &&
                '$text' == s.name &&
                i.position.parent == s.position.parent &&
                i.position.offset + i.length == s.position.offset,
              a =
                'attribute' == i.type &&
                'attribute' == s.type &&
                i.position.parent == s.position.parent &&
                i.range.isFlat &&
                s.range.isFlat &&
                i.position.offset + i.length == s.position.offset &&
                i.attributeKey == s.attributeKey &&
                i.attributeOldValue == s.attributeOldValue &&
                i.attributeNewValue == s.attributeNewValue
            o || r || a ? (i.length++, a && (i.range.end = i.range.end.getShiftedBy(1)), (e[t] = null)) : (n = t)
          }
          e = e.filter(t => t)
          for (const t of e) delete t.changeCount, 'attribute' == t.type && (delete t.position, delete t.length)
          return (
            (this._changeCount = 0),
            (this._cachedChangesWithGraveyard = e),
            (this._cachedChanges = e.filter(Il)),
            t.includeChangesInGraveyard ? this._cachedChangesWithGraveyard.slice() : this._cachedChanges.slice()
          )
        }
        getRefreshedItems() {
          return new Set(this._refreshedItems)
        }
        reset() {
          this._changesInElement.clear(),
            this._elementSnapshots.clear(),
            this._changedMarkers.clear(),
            (this._refreshedItems = new Set()),
            (this._cachedChanges = null)
        }
        _refreshItem(t) {
          if (this._isInInsertedElement(t.parent)) return
          this._markRemove(t.parent, t.startOffset, t.offsetSize),
            this._markInsert(t.parent, t.startOffset, t.offsetSize),
            this._refreshedItems.add(t)
          const e = ja._createOn(t)
          for (const t of this._markerCollection.getMarkersIntersectingRange(e)) {
            const e = t.getData()
            this.bufferMarkerChange(t.name, e, e)
          }
          this._cachedChanges = null
        }
        _markInsert(t, e, n) {
          const i = { type: 'insert', offset: e, howMany: n, count: this._changeCount++ }
          this._markChange(t, i)
        }
        _markRemove(t, e, n) {
          const i = { type: 'remove', offset: e, howMany: n, count: this._changeCount++ }
          this._markChange(t, i), this._removeAllNestedChanges(t, e, n)
        }
        _markAttribute(t) {
          const e = { type: 'attribute', offset: t.startOffset, howMany: t.offsetSize, count: this._changeCount++ }
          this._markChange(t.parent, e)
        }
        _markChange(t, e) {
          this._makeSnapshot(t)
          const n = this._getChangesForElement(t)
          this._handleChange(e, n), n.push(e)
          for (let t = 0; t < n.length; t++) n[t].howMany < 1 && (n.splice(t, 1), t--)
        }
        _getChangesForElement(t) {
          let e
          return (
            this._changesInElement.has(t)
              ? (e = this._changesInElement.get(t))
              : ((e = []), this._changesInElement.set(t, e)),
            e
          )
        }
        _makeSnapshot(t) {
          this._elementSnapshots.has(t) || this._elementSnapshots.set(t, Rl(t.getChildren()))
        }
        _handleChange(t, e) {
          t.nodesToHandle = t.howMany
          for (const n of e) {
            const i = t.offset + t.howMany,
              s = n.offset + n.howMany
            if (
              'insert' == t.type &&
              ('insert' == n.type &&
                (t.offset <= n.offset
                  ? (n.offset += t.howMany)
                  : t.offset < s && ((n.howMany += t.nodesToHandle), (t.nodesToHandle = 0))),
              'remove' == n.type && t.offset < n.offset && (n.offset += t.howMany),
              'attribute' == n.type)
            )
              if (t.offset <= n.offset) n.offset += t.howMany
              else if (t.offset < s) {
                const s = n.howMany
                ;(n.howMany = t.offset - n.offset),
                  e.unshift({ type: 'attribute', offset: i, howMany: s - n.howMany, count: this._changeCount++ })
              }
            if ('remove' == t.type) {
              if ('insert' == n.type)
                if (i <= n.offset) n.offset -= t.howMany
                else if (i <= s)
                  if (t.offset < n.offset) {
                    const e = i - n.offset
                    ;(n.offset = t.offset), (n.howMany -= e), (t.nodesToHandle -= e)
                  } else (n.howMany -= t.nodesToHandle), (t.nodesToHandle = 0)
                else if (t.offset <= n.offset) (t.nodesToHandle -= n.howMany), (n.howMany = 0)
                else if (t.offset < s) {
                  const e = s - t.offset
                  ;(n.howMany -= e), (t.nodesToHandle -= e)
                }
              if (
                ('remove' == n.type &&
                  (i <= n.offset
                    ? (n.offset -= t.howMany)
                    : t.offset < n.offset && ((t.nodesToHandle += n.howMany), (n.howMany = 0))),
                'attribute' == n.type)
              )
                if (i <= n.offset) n.offset -= t.howMany
                else if (t.offset < n.offset) {
                  const e = i - n.offset
                  ;(n.offset = t.offset), (n.howMany -= e)
                } else if (t.offset < s)
                  if (i <= s) {
                    const i = n.howMany
                    n.howMany = t.offset - n.offset
                    const s = i - n.howMany - t.nodesToHandle
                    e.unshift({ type: 'attribute', offset: t.offset, howMany: s, count: this._changeCount++ })
                  } else n.howMany -= s - t.offset
            }
            if ('attribute' == t.type) {
              if ('insert' == n.type)
                if (t.offset < n.offset && i > n.offset) {
                  if (i > s) {
                    const t = { type: 'attribute', offset: s, howMany: i - s, count: this._changeCount++ }
                    this._handleChange(t, e), e.push(t)
                  }
                  ;(t.nodesToHandle = n.offset - t.offset), (t.howMany = t.nodesToHandle)
                } else
                  t.offset >= n.offset &&
                    t.offset < s &&
                    (i > s ? ((t.nodesToHandle = i - s), (t.offset = s)) : (t.nodesToHandle = 0))
              if ('remove' == n.type && t.offset < n.offset && i > n.offset) {
                const s = { type: 'attribute', offset: n.offset, howMany: i - n.offset, count: this._changeCount++ }
                this._handleChange(s, e),
                  e.push(s),
                  (t.nodesToHandle = n.offset - t.offset),
                  (t.howMany = t.nodesToHandle)
              }
              'attribute' == n.type &&
                (t.offset >= n.offset && i <= s
                  ? ((t.nodesToHandle = 0), (t.howMany = 0), (t.offset = 0))
                  : t.offset <= n.offset && i >= s && (n.howMany = 0))
            }
          }
          ;(t.howMany = t.nodesToHandle), delete t.nodesToHandle
        }
        _getInsertDiff(t, e, n) {
          return {
            type: 'insert',
            position: Fa._createAt(t, e),
            name: n.name,
            attributes: new Map(n.attributes),
            length: 1,
            changeCount: this._changeCount++,
          }
        }
        _getRemoveDiff(t, e, n) {
          return {
            type: 'remove',
            position: Fa._createAt(t, e),
            name: n.name,
            attributes: new Map(n.attributes),
            length: 1,
            changeCount: this._changeCount++,
          }
        }
        _getAttributesDiff(t, e, n) {
          const i = []
          n = new Map(n)
          for (const [s, o] of e) {
            const e = n.has(s) ? n.get(s) : null
            e !== o &&
              i.push({
                type: 'attribute',
                position: t.start,
                range: t.clone(),
                length: 1,
                attributeKey: s,
                attributeOldValue: o,
                attributeNewValue: e,
                changeCount: this._changeCount++,
              }),
              n.delete(s)
          }
          for (const [e, s] of n)
            i.push({
              type: 'attribute',
              position: t.start,
              range: t.clone(),
              length: 1,
              attributeKey: e,
              attributeOldValue: null,
              attributeNewValue: s,
              changeCount: this._changeCount++,
            })
          return i
        }
        _isInInsertedElement(t) {
          const e = t.parent
          if (!e) return !1
          const n = this._changesInElement.get(e),
            i = t.startOffset
          if (n) for (const t of n) if ('insert' == t.type && i >= t.offset && i < t.offset + t.howMany) return !0
          return this._isInInsertedElement(e)
        }
        _removeAllNestedChanges(t, e, n) {
          const i = new ja(Fa._createAt(t, e), Fa._createAt(t, e + n))
          for (const t of i.getItems({ shallow: !0 }))
            t.is('element') &&
              (this._elementSnapshots.delete(t),
              this._changesInElement.delete(t),
              this._removeAllNestedChanges(t, 0, t.maxOffset))
        }
      }
      function Rl(t) {
        const e = []
        for (const n of t)
          if (n.is('$text'))
            for (let t = 0; t < n.data.length; t++) e.push({ name: '$text', attributes: new Map(n.getAttributes()) })
          else e.push({ name: n.name, attributes: new Map(n.getAttributes()) })
        return e
      }
      function Ol(t, e) {
        const n = []
        let i = 0,
          s = 0
        for (const t of e) {
          if (t.offset > i) {
            for (let e = 0; e < t.offset - i; e++) n.push('e')
            s += t.offset - i
          }
          if ('insert' == t.type) {
            for (let e = 0; e < t.howMany; e++) n.push('i')
            i = t.offset + t.howMany
          } else if ('remove' == t.type) {
            for (let e = 0; e < t.howMany; e++) n.push('r')
            ;(i = t.offset), (s += t.howMany)
          } else n.push(...'a'.repeat(t.howMany).split('')), (i = t.offset + t.howMany), (s += t.howMany)
        }
        if (s < t) for (let e = 0; e < t - s - i; e++) n.push('e')
        return n
      }
      function Il(t) {
        const e = t.position && '$graveyard' == t.position.root.rootName,
          n = t.range && '$graveyard' == t.range.root.rootName
        return !e && !n
      }
      class Ml {
        constructor() {
          ;(this._operations = []),
            (this._undoPairs = new Map()),
            (this._undoneOperations = new Set()),
            (this._baseVersionToOperationIndex = new Map()),
            (this._version = 0),
            (this._gaps = new Map())
        }
        get version() {
          return this._version
        }
        set version(t) {
          this._operations.length && t > this._version + 1 && this._gaps.set(this._version, t), (this._version = t)
        }
        get lastOperation() {
          return this._operations[this._operations.length - 1]
        }
        addOperation(t) {
          if (t.baseVersion !== this.version)
            throw new c('model-document-history-addoperation-incorrect-version', this, {
              operation: t,
              historyVersion: this.version,
            })
          this._operations.push(t),
            this._version++,
            this._baseVersionToOperationIndex.set(t.baseVersion, this._operations.length - 1)
        }
        getOperations(t, e = this.version) {
          if (!this._operations.length) return []
          const n = this._operations[0]
          void 0 === t && (t = n.baseVersion)
          let i = e - 1
          for (const [e, n] of this._gaps) t > e && t < n && (t = n), i > e && i < n && (i = e - 1)
          if (i < n.baseVersion || t > this.lastOperation.baseVersion) return []
          let s = this._baseVersionToOperationIndex.get(t)
          void 0 === s && (s = 0)
          let o = this._baseVersionToOperationIndex.get(i)
          return void 0 === o && (o = this._operations.length - 1), this._operations.slice(s, o + 1)
        }
        getOperation(t) {
          const e = this._baseVersionToOperationIndex.get(t)
          if (void 0 !== e) return this._operations[e]
        }
        setOperationAsUndone(t, e) {
          this._undoPairs.set(e, t), this._undoneOperations.add(t)
        }
        isUndoingOperation(t) {
          return this._undoPairs.has(t)
        }
        isUndoneOperation(t) {
          return this._undoneOperations.has(t)
        }
        getUndoneOperation(t) {
          return this._undoPairs.get(t)
        }
        reset() {
          ;(this._version = 0),
            (this._undoPairs = new Map()),
            (this._operations = []),
            (this._undoneOperations = new Set()),
            (this._gaps = new Map()),
            (this._baseVersionToOperationIndex = new Map())
        }
      }
      function Nl(t, e) {
        return (
          !!(n = t.charAt(e - 1)) &&
          1 == n.length &&
          /[\ud800-\udbff]/.test(n) &&
          (function (t) {
            return !!t && 1 == t.length && /[\udc00-\udfff]/.test(t)
          })(t.charAt(e))
        )
        var n
      }
      function Dl(t, e) {
        return (
          !!(n = t.charAt(e)) &&
          1 == n.length &&
          /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/.test(n)
        )
        var n
      }
      const Fl = (function () {
        const t = /\p{Regional_Indicator}{2}/u.source,
          e =
            '(?:' +
            [
              /\p{Emoji}[\u{E0020}-\u{E007E}]+\u{E007F}/u,
              /\p{Emoji}\u{FE0F}?\u{20E3}/u,
              /\p{Emoji}\u{FE0F}/u,
              /(?=\p{General_Category=Other_Symbol})\p{Emoji}\p{Emoji_Modifier}*/u,
            ]
              .map(t => t.source)
              .join('|') +
            ')'
        return new RegExp(`${t}|${e}(?:‍${e})*`, 'ug')
      })()
      function Bl(t, e) {
        const n = String(t).matchAll(Fl)
        return Array.from(n).some(t => t.index < e && e < t.index + t[0].length)
      }
      const Vl = '$graveyard'
      class Ll {
        constructor(t) {
          ;(this.model = t),
            (this.history = new Ml()),
            (this.selection = new nc(this)),
            (this.roots = new Ci({ idProperty: 'rootName' })),
            (this.differ = new Tl(t.markers)),
            (this._postFixers = new Set()),
            (this._hasSelectionChangedFromTheLastChangeBlock = !1),
            this.createRoot('$root', Vl),
            this.listenTo(
              t,
              'applyOperation',
              (t, e) => {
                const n = e[0]
                n.isDocumentOperation && this.differ.bufferOperation(n)
              },
              { priority: 'high' }
            ),
            this.listenTo(
              t,
              'applyOperation',
              (t, e) => {
                const n = e[0]
                n.isDocumentOperation && this.history.addOperation(n)
              },
              { priority: 'low' }
            ),
            this.listenTo(this.selection, 'change', () => {
              this._hasSelectionChangedFromTheLastChangeBlock = !0
            }),
            this.listenTo(t.markers, 'update', (t, e, n, i, s) => {
              const o = { ...e.getData(), range: i }
              this.differ.bufferMarkerChange(e.name, s, o),
                null === n &&
                  e.on('change', (t, n) => {
                    const i = e.getData()
                    this.differ.bufferMarkerChange(e.name, { ...i, range: n }, i)
                  })
            })
        }
        get version() {
          return this.history.version
        }
        set version(t) {
          this.history.version = t
        }
        get graveyard() {
          return this.getRoot(Vl)
        }
        createRoot(t = '$root', e = 'main') {
          if (this.roots.get(e)) throw new c('model-document-createroot-name-exists', this, { name: e })
          const n = new Pl(this, t, e)
          return this.roots.add(n), n
        }
        destroy() {
          this.selection.destroy(), this.stopListening()
        }
        getRoot(t = 'main') {
          return this.roots.get(t)
        }
        getRootNames() {
          return Array.from(this.roots, t => t.rootName).filter(t => t != Vl)
        }
        registerPostFixer(t) {
          this._postFixers.add(t)
        }
        toJSON() {
          const t = Di(this)
          return (t.selection = '[engine.model.DocumentSelection]'), (t.model = '[engine.model.Model]'), t
        }
        _handleChangeBlock(t) {
          this._hasDocumentChangedFromTheLastChangeBlock() &&
            (this._callPostFixers(t),
            this.selection.refresh(),
            this.differ.hasDataChanges() ? this.fire('change:data', t.batch) : this.fire('change', t.batch),
            this.selection.refresh(),
            this.differ.reset()),
            (this._hasSelectionChangedFromTheLastChangeBlock = !1)
        }
        _hasDocumentChangedFromTheLastChangeBlock() {
          return !this.differ.isEmpty || this._hasSelectionChangedFromTheLastChangeBlock
        }
        _getDefaultRoot() {
          for (const t of this.roots) if (t !== this.graveyard) return t
          return this.graveyard
        }
        _getDefaultRange() {
          const t = this._getDefaultRoot(),
            e = this.model,
            n = e.schema,
            i = e.createPositionFromPath(t, [0])
          return n.getNearestSelectionRange(i) || e.createRange(i)
        }
        _validateSelectionRange(t) {
          return jl(t.start) && jl(t.end)
        }
        _callPostFixers(t) {
          let e = !1
          do {
            for (const n of this._postFixers) if ((this.selection.refresh(), (e = n(t)), e)) break
          } while (e)
        }
      }
      function jl(t) {
        const e = t.textNode
        if (e) {
          const n = e.data,
            i = t.offset - e.startOffset
          return !Nl(n, i) && !Dl(n, i)
        }
        return !0
      }
      he(Ll, p)
      class Wl {
        constructor() {
          this._markers = new Map()
        }
        [Symbol.iterator]() {
          return this._markers.values()
        }
        has(t) {
          const e = t instanceof zl ? t.name : t
          return this._markers.has(e)
        }
        get(t) {
          return this._markers.get(t) || null
        }
        _set(t, e, n = !1, i = !1) {
          const s = t instanceof zl ? t.name : t
          if (s.includes(',')) throw new c('markercollection-incorrect-marker-name', this)
          const o = this._markers.get(s)
          if (o) {
            const t = o.getData(),
              r = o.getRange()
            let a = !1
            return (
              r.isEqual(e) || (o._attachLiveRange(Za.fromRange(e)), (a = !0)),
              n != o.managedUsingOperations && ((o._managedUsingOperations = n), (a = !0)),
              'boolean' == typeof i && i != o.affectsData && ((o._affectsData = i), (a = !0)),
              a && this.fire('update:' + s, o, r, e, t),
              o
            )
          }
          const r = Za.fromRange(e),
            a = new zl(s, r, n, i)
          return this._markers.set(s, a), this.fire('update:' + s, a, null, e, { ...a.getData(), range: null }), a
        }
        _remove(t) {
          const e = t instanceof zl ? t.name : t,
            n = this._markers.get(e)
          return (
            !!n &&
            (this._markers.delete(e),
            this.fire('update:' + e, n, n.getRange(), null, n.getData()),
            this._destroyMarker(n),
            !0)
          )
        }
        _refresh(t) {
          const e = t instanceof zl ? t.name : t,
            n = this._markers.get(e)
          if (!n) throw new c('markercollection-refresh-marker-not-exists', this)
          const i = n.getRange()
          this.fire('update:' + e, n, i, i, n.getData())
        }
        *getMarkersAtPosition(t) {
          for (const e of this) e.getRange().containsPosition(t) && (yield e)
        }
        *getMarkersIntersectingRange(t) {
          for (const e of this) null !== e.getRange().getIntersection(t) && (yield e)
        }
        destroy() {
          for (const t of this._markers.values()) this._destroyMarker(t)
          ;(this._markers = null), this.stopListening()
        }
        *getMarkersGroup(t) {
          for (const e of this._markers.values()) e.name.startsWith(t + ':') && (yield e)
        }
        _destroyMarker(t) {
          t.stopListening(), t._detachLiveRange()
        }
      }
      he(Wl, p)
      class zl {
        constructor(t, e, n, i) {
          ;(this.name = t),
            (this._liveRange = this._attachLiveRange(e)),
            (this._managedUsingOperations = n),
            (this._affectsData = i)
        }
        get managedUsingOperations() {
          if (!this._liveRange) throw new c('marker-destroyed', this)
          return this._managedUsingOperations
        }
        get affectsData() {
          if (!this._liveRange) throw new c('marker-destroyed', this)
          return this._affectsData
        }
        getData() {
          return {
            range: this.getRange(),
            affectsData: this.affectsData,
            managedUsingOperations: this.managedUsingOperations,
          }
        }
        getStart() {
          if (!this._liveRange) throw new c('marker-destroyed', this)
          return this._liveRange.start.clone()
        }
        getEnd() {
          if (!this._liveRange) throw new c('marker-destroyed', this)
          return this._liveRange.end.clone()
        }
        getRange() {
          if (!this._liveRange) throw new c('marker-destroyed', this)
          return this._liveRange.toRange()
        }
        is(t) {
          return 'marker' === t || 'model:marker' === t
        }
        _attachLiveRange(t) {
          return (
            this._liveRange && this._detachLiveRange(),
            t.delegate('change:range').to(this),
            t.delegate('change:content').to(this),
            (this._liveRange = t),
            t
          )
        }
        _detachLiveRange() {
          this._liveRange.stopDelegating('change:range', this),
            this._liveRange.stopDelegating('change:content', this),
            this._liveRange.detach(),
            (this._liveRange = null)
        }
      }
      he(zl, p)
      class $l extends il {
        get type() {
          return 'noop'
        }
        clone() {
          return new $l(this.baseVersion)
        }
        getReversed() {
          return new $l(this.baseVersion + 1)
        }
        _execute() {}
        static get className() {
          return 'NoOperation'
        }
      }
      const ql = {}
      ;(ql[fl.className] = fl),
        (ql[pl.className] = pl),
        (ql[_l.className] = _l),
        (ql[gl.className] = gl),
        (ql[$l.className] = $l),
        (ql[il.className] = il),
        (ql[wl.className] = wl),
        (ql[bl.className] = bl),
        (ql[vl.className] = vl),
        (ql[yl.className] = yl)
      class Ul extends Fa {
        constructor(t, e, n = 'toNone') {
          if ((super(t, e, n), !this.root.is('rootElement'))) throw new c('model-liveposition-root-not-rootelement', t)
          Hl.call(this)
        }
        detach() {
          this.stopListening()
        }
        is(t) {
          return 'livePosition' === t || 'model:livePosition' === t || 'position' == t || 'model:position' === t
        }
        toPosition() {
          return new Fa(this.root, this.path.slice(), this.stickiness)
        }
        static fromPosition(t, e) {
          return new this(t.root, t.path.slice(), e || t.stickiness)
        }
      }
      function Hl() {
        this.listenTo(
          this.root.document.model,
          'applyOperation',
          (t, e) => {
            const n = e[0]
            n.isDocumentOperation && Kl.call(this, n)
          },
          { priority: 'low' }
        )
      }
      function Kl(t) {
        const e = this.getTransformedByOperation(t)
        if (!this.isEqual(e)) {
          const t = this.toPosition()
          ;(this.path = e.path), (this.root = e.root), this.fire('change', t)
        }
      }
      he(Ul, p)
      class Gl {
        constructor(t, e, n) {
          ;(this.model = t),
            (this.writer = e),
            (this.position = n),
            (this.canMergeWith = new Set([this.position.parent])),
            (this.schema = t.schema),
            (this._documentFragment = e.createDocumentFragment()),
            (this._documentFragmentPosition = e.createPositionAt(this._documentFragment, 0)),
            (this._firstNode = null),
            (this._lastNode = null),
            (this._lastAutoParagraph = null),
            (this._filterAttributesOf = []),
            (this._affectedStart = null),
            (this._affectedEnd = null)
        }
        handleNodes(t) {
          for (const e of Array.from(t)) this._handleNode(e)
          this._insertPartialFragment(),
            this._lastAutoParagraph && this._updateLastNodeFromAutoParagraph(this._lastAutoParagraph),
            this._mergeOnRight(),
            this.schema.removeDisallowedAttributes(this._filterAttributesOf, this.writer),
            (this._filterAttributesOf = [])
        }
        _updateLastNodeFromAutoParagraph(t) {
          const e = this.writer.createPositionAfter(this._lastNode),
            n = this.writer.createPositionAfter(t)
          if (n.isAfter(e)) {
            if (((this._lastNode = t), this.position.parent != t || !this.position.isAtEnd))
              throw new c('insertcontent-invalid-insertion-position', this)
            ;(this.position = n), this._setAffectedBoundaries(this.position)
          }
        }
        getSelectionRange() {
          return this.nodeToSelect
            ? ja._createOn(this.nodeToSelect)
            : this.model.schema.getNearestSelectionRange(this.position)
        }
        getAffectedRange() {
          return this._affectedStart ? new ja(this._affectedStart, this._affectedEnd) : null
        }
        destroy() {
          this._affectedStart && this._affectedStart.detach(), this._affectedEnd && this._affectedEnd.detach()
        }
        _handleNode(t) {
          if (this.schema.isObject(t)) return void this._handleObject(t)
          let e = this._checkAndAutoParagraphToAllowedPosition(t)
          e || ((e = this._checkAndSplitToAllowedPosition(t)), e)
            ? (this._appendToFragment(t), this._firstNode || (this._firstNode = t), (this._lastNode = t))
            : this._handleDisallowedNode(t)
        }
        _insertPartialFragment() {
          if (this._documentFragment.isEmpty) return
          const t = Ul.fromPosition(this.position, 'toNext')
          this._setAffectedBoundaries(this.position),
            this._documentFragment.getChild(0) == this._firstNode &&
              (this.writer.insert(this._firstNode, this.position),
              this._mergeOnLeft(),
              (this.position = t.toPosition())),
            this._documentFragment.isEmpty || this.writer.insert(this._documentFragment, this.position),
            (this._documentFragmentPosition = this.writer.createPositionAt(this._documentFragment, 0)),
            (this.position = t.toPosition()),
            t.detach()
        }
        _handleObject(t) {
          this._checkAndSplitToAllowedPosition(t) ? this._appendToFragment(t) : this._tryAutoparagraphing(t)
        }
        _handleDisallowedNode(t) {
          t.is('element') ? this.handleNodes(t.getChildren()) : this._tryAutoparagraphing(t)
        }
        _appendToFragment(t) {
          if (!this.schema.checkChild(this.position, t))
            throw new c('insertcontent-wrong-position', this, { node: t, position: this.position })
          this.writer.insert(t, this._documentFragmentPosition),
            (this._documentFragmentPosition = this._documentFragmentPosition.getShiftedBy(t.offsetSize)),
            this.schema.isObject(t) && !this.schema.checkChild(this.position, '$text')
              ? (this.nodeToSelect = t)
              : (this.nodeToSelect = null),
            this._filterAttributesOf.push(t)
        }
        _setAffectedBoundaries(t) {
          this._affectedStart || (this._affectedStart = Ul.fromPosition(t, 'toPrevious')),
            (this._affectedEnd && !this._affectedEnd.isBefore(t)) ||
              (this._affectedEnd && this._affectedEnd.detach(), (this._affectedEnd = Ul.fromPosition(t, 'toNext')))
        }
        _mergeOnLeft() {
          const t = this._firstNode
          if (!(t instanceof Ma)) return
          if (!this._canMergeLeft(t)) return
          const e = Ul._createBefore(t)
          e.stickiness = 'toNext'
          const n = Ul.fromPosition(this.position, 'toNext')
          this._affectedStart.isEqual(e) &&
            (this._affectedStart.detach(), (this._affectedStart = Ul._createAt(e.nodeBefore, 'end', 'toPrevious'))),
            this._firstNode === this._lastNode && ((this._firstNode = e.nodeBefore), (this._lastNode = e.nodeBefore)),
            this.writer.merge(e),
            e.isEqual(this._affectedEnd) &&
              this._firstNode === this._lastNode &&
              (this._affectedEnd.detach(), (this._affectedEnd = Ul._createAt(e.nodeBefore, 'end', 'toNext'))),
            (this.position = n.toPosition()),
            n.detach(),
            this._filterAttributesOf.push(this.position.parent),
            e.detach()
        }
        _mergeOnRight() {
          const t = this._lastNode
          if (!(t instanceof Ma)) return
          if (!this._canMergeRight(t)) return
          const e = Ul._createAfter(t)
          if (((e.stickiness = 'toNext'), !this.position.isEqual(e)))
            throw new c('insertcontent-invalid-insertion-position', this)
          this.position = Fa._createAt(e.nodeBefore, 'end')
          const n = Ul.fromPosition(this.position, 'toPrevious')
          this._affectedEnd.isEqual(e) &&
            (this._affectedEnd.detach(), (this._affectedEnd = Ul._createAt(e.nodeBefore, 'end', 'toNext'))),
            this._firstNode === this._lastNode && ((this._firstNode = e.nodeBefore), (this._lastNode = e.nodeBefore)),
            this.writer.merge(e),
            e.getShiftedBy(-1).isEqual(this._affectedStart) &&
              this._firstNode === this._lastNode &&
              (this._affectedStart.detach(), (this._affectedStart = Ul._createAt(e.nodeBefore, 0, 'toPrevious'))),
            (this.position = n.toPosition()),
            n.detach(),
            this._filterAttributesOf.push(this.position.parent),
            e.detach()
        }
        _canMergeLeft(t) {
          const e = t.previousSibling
          return e instanceof Ma && this.canMergeWith.has(e) && this.model.schema.checkMerge(e, t)
        }
        _canMergeRight(t) {
          const e = t.nextSibling
          return e instanceof Ma && this.canMergeWith.has(e) && this.model.schema.checkMerge(t, e)
        }
        _tryAutoparagraphing(t) {
          const e = this.writer.createElement('paragraph')
          this._getAllowedIn(this.position.parent, e) &&
            this.schema.checkChild(e, t) &&
            (e._appendChild(t), this._handleNode(e))
        }
        _checkAndAutoParagraphToAllowedPosition(t) {
          if (this.schema.checkChild(this.position.parent, t)) return !0
          if (!this.schema.checkChild(this.position.parent, 'paragraph') || !this.schema.checkChild('paragraph', t))
            return !1
          this._insertPartialFragment()
          const e = this.writer.createElement('paragraph')
          return (
            this.writer.insert(e, this.position),
            this._setAffectedBoundaries(this.position),
            (this._lastAutoParagraph = e),
            (this.position = this.writer.createPositionAt(e, 0)),
            !0
          )
        }
        _checkAndSplitToAllowedPosition(t) {
          const e = this._getAllowedIn(this.position.parent, t)
          if (!e) return !1
          for (e != this.position.parent && this._insertPartialFragment(); e != this.position.parent; )
            if (this.position.isAtStart) {
              const t = this.position.parent
              ;(this.position = this.writer.createPositionBefore(t)),
                t.isEmpty && t.parent === e && this.writer.remove(t)
            } else if (this.position.isAtEnd) this.position = this.writer.createPositionAfter(this.position.parent)
            else {
              const t = this.writer.createPositionAfter(this.position.parent)
              this._setAffectedBoundaries(this.position),
                this.writer.split(this.position),
                (this.position = t),
                this.canMergeWith.add(this.position.nodeAfter)
            }
          return !0
        }
        _getAllowedIn(t, e) {
          return this.schema.checkChild(t, e) ? t : this.schema.isLimit(t) ? null : this._getAllowedIn(t.parent, e)
        }
      }
      function Jl(t, e, n = 'auto') {
        const i = t.getSelectedElement()
        if (i && e.schema.isObject(i) && !e.schema.isInline(i))
          return ['before', 'after'].includes(n) ? e.createRange(e.createPositionAt(i, n)) : e.createRangeOn(i)
        const s = ka(t.getSelectedBlocks())
        if (!s) return e.createRange(t.focus)
        if (s.isEmpty) return e.createRange(e.createPositionAt(s, 0))
        const o = e.createPositionAfter(s)
        return t.focus.isTouching(o) ? e.createRange(o) : e.createRange(e.createPositionBefore(s))
      }
      function Yl(t, e, n, i, s = {}) {
        if (!t.schema.isObject(e)) throw new c('insertobject-element-not-an-object', t, { object: e })
        let o
        o = n ? (n.is('selection') ? n : t.createSelection(n, i)) : t.document.selection
        let r = o
        s.findOptimalPosition && t.schema.isBlock(e) && (r = t.createSelection(Jl(o, t, s.findOptimalPosition)))
        const a = ka(o.getSelectedBlocks()),
          l = {}
        return (
          a && Object.assign(l, t.schema.getAttributesWithProperty(a, 'copyOnReplace', !0)),
          t.change(n => {
            r.isCollapsed || t.deleteContent(r, { doNotAutoparagraph: !0 })
            let i = e
            const o = r.anchor.parent
            !t.schema.checkChild(o, e) &&
              t.schema.checkChild(o, 'paragraph') &&
              t.schema.checkChild('paragraph', e) &&
              ((i = n.createElement('paragraph')), n.insert(e, i)),
              t.schema.setAllowedAttributes(i, l, n)
            const a = t.insertContent(i, r)
            return (
              a.isCollapsed ||
                (s.setSelection &&
                  (function (t, e, n, i) {
                    const s = t.model
                    if ('after' == n) {
                      let n = e.nextSibling
                      !(n && s.schema.checkChild(n, '$text')) &&
                        s.schema.checkChild(e.parent, 'paragraph') &&
                        ((n = t.createElement('paragraph')),
                        s.schema.setAllowedAttributes(n, i, t),
                        s.insertContent(n, t.createPositionAfter(e))),
                        n && t.setSelection(n, 0)
                    } else {
                      if ('on' != n) throw new c('insertobject-invalid-place-parameter-value', s)
                      t.setSelection(e, 'on')
                    }
                  })(n, e, s.setSelection, l)),
              a
            )
          })
        )
      }
      function Xl(t, e, n = {}) {
        if (e.isCollapsed) return
        const i = e.getFirstRange()
        if ('$graveyard' == i.root.rootName) return
        const s = t.schema
        t.change(t => {
          if (
            !n.doNotResetEntireContent &&
            (function (t, e) {
              const n = t.getLimitElement(e)
              if (!e.containsEntireContent(n)) return !1
              const i = e.getFirstRange()
              if (i.start.parent == i.end.parent) return !1
              return t.checkChild(n, 'paragraph')
            })(s, e)
          )
            return void (function (t, e) {
              const n = t.model.schema.getLimitElement(e)
              t.remove(t.createRangeIn(n)), eh(t, t.createPositionAt(n, 0), e)
            })(t, e)
          const o = {}
          if (!n.doNotAutoparagraph) {
            const t = e.getSelectedElement()
            t && Object.assign(o, s.getAttributesWithProperty(t, 'copyOnReplace', !0))
          }
          const [r, a] = (function (t) {
            const e = t.root.document.model,
              n = t.start
            let i = t.end
            if (e.hasContent(t, { ignoreMarkers: !0 })) {
              const n = (function (t) {
                const e = t.parent,
                  n = e.root.document.model.schema,
                  i = e.getAncestors({ parentFirst: !0, includeSelf: !0 })
                for (const t of i) {
                  if (n.isLimit(t)) return null
                  if (n.isBlock(t)) return t
                }
              })(i)
              if (n && i.isTouching(e.createPositionAt(n, 0))) {
                const n = e.createSelection(t)
                e.modifySelection(n, { direction: 'backward' })
                const s = n.getLastPosition(),
                  o = e.createRange(s, i)
                e.hasContent(o, { ignoreMarkers: !0 }) || (i = s)
              }
            }
            return [Ul.fromPosition(n, 'toPrevious'), Ul.fromPosition(i, 'toNext')]
          })(i)
          r.isTouching(a) || t.remove(t.createRange(r, a)),
            n.leaveUnmerged ||
              (!(function (t, e, n) {
                const i = t.model
                if (!th(t.model.schema, e, n)) return
                const [s, o] = (function (t, e) {
                  const n = t.getAncestors(),
                    i = e.getAncestors()
                  let s = 0
                  for (; n[s] && n[s] == i[s]; ) s++
                  return [n[s], i[s]]
                })(e, n)
                if (!s || !o) return
                !i.hasContent(s, { ignoreMarkers: !0 }) && i.hasContent(o, { ignoreMarkers: !0 })
                  ? Ql(t, e, n, s.parent)
                  : Zl(t, e, n, s.parent)
              })(t, r, a),
              s.removeDisallowedAttributes(r.parent.getChildren(), t)),
            nh(t, e, r),
            !n.doNotAutoparagraph &&
              (function (t, e) {
                const n = t.checkChild(e, '$text'),
                  i = t.checkChild(e, 'paragraph')
                return !n && i
              })(s, r) &&
              eh(t, r, e, o),
            r.detach(),
            a.detach()
        })
      }
      function Zl(t, e, n, i) {
        const s = e.parent,
          o = n.parent
        if (s != i && o != i) {
          for (
            e = t.createPositionAfter(s), (n = t.createPositionBefore(o)).isEqual(e) || t.insert(o, e), t.merge(e);
            n.parent.isEmpty;

          ) {
            const e = n.parent
            ;(n = t.createPositionBefore(e)), t.remove(e)
          }
          th(t.model.schema, e, n) && Zl(t, e, n, i)
        }
      }
      function Ql(t, e, n, i) {
        const s = e.parent,
          o = n.parent
        if (s != i && o != i) {
          for (
            e = t.createPositionAfter(s), (n = t.createPositionBefore(o)).isEqual(e) || t.insert(s, n);
            e.parent.isEmpty;

          ) {
            const n = e.parent
            ;(e = t.createPositionBefore(n)), t.remove(n)
          }
          ;(n = t.createPositionBefore(o)),
            (function (t, e) {
              const n = e.nodeBefore,
                i = e.nodeAfter
              n.name != i.name && t.rename(n, i.name)
              t.clearAttributes(n), t.setAttributes(Object.fromEntries(i.getAttributes()), n), t.merge(e)
            })(t, n),
            th(t.model.schema, e, n) && Ql(t, e, n, i)
        }
      }
      function th(t, e, n) {
        const i = e.parent,
          s = n.parent
        return (
          i != s &&
          !t.isLimit(i) &&
          !t.isLimit(s) &&
          (function (t, e, n) {
            const i = new ja(t, e)
            for (const t of i.getWalker()) if (n.isLimit(t.item)) return !1
            return !0
          })(e, n, t)
        )
      }
      function eh(t, e, n, i = {}) {
        const s = t.createElement('paragraph')
        t.model.schema.setAllowedAttributes(s, i, t), t.insert(s, e), nh(t, n, t.createPositionAt(s, 0))
      }
      function nh(t, e, n) {
        e instanceof nc ? t.setSelection(n) : e.setTo(n)
      }
      const ih = ' ,.?!:;"-()'
      function sh(t, e) {
        const { isForward: n, walker: i, unit: s, schema: o, treatEmojiAsSingleUnit: r } = t,
          { type: a, item: c, nextPosition: l } = e
        if ('text' == a)
          return 'word' === t.unit
            ? (function (t, e) {
                let n = t.position.textNode
                if (n) {
                  let i = t.position.offset - n.startOffset
                  for (; !rh(n.data, i, e) && !ah(n, i, e); ) {
                    t.next()
                    const s = e ? t.position.nodeAfter : t.position.nodeBefore
                    if (s && s.is('$text')) {
                      const i = s.data.charAt(e ? 0 : s.data.length - 1)
                      ih.includes(i) || (t.next(), (n = t.position.textNode))
                    }
                    i = t.position.offset - n.startOffset
                  }
                }
                return t.position
              })(i, n)
            : (function (t, e, n) {
                const i = t.position.textNode
                if (i) {
                  const s = i.data
                  let o = t.position.offset - i.startOffset
                  for (; Nl(s, o) || ('character' == e && Dl(s, o)) || (n && Bl(s, o)); )
                    t.next(), (o = t.position.offset - i.startOffset)
                }
                return t.position
              })(i, s, r)
        if (a == (n ? 'elementStart' : 'elementEnd')) {
          if (o.isSelectable(c)) return Fa._createAt(c, n ? 'after' : 'before')
          if (o.checkChild(l, '$text')) return l
        } else {
          if (o.isLimit(c)) return void i.skip(() => !0)
          if (o.checkChild(l, '$text')) return l
        }
      }
      function oh(t, e) {
        const n = t.root,
          i = Fa._createAt(n, e ? 'end' : 0)
        return e ? new ja(t, i) : new ja(i, t)
      }
      function rh(t, e, n) {
        const i = e + (n ? 0 : -1)
        return ih.includes(t.charAt(i))
      }
      function ah(t, e, n) {
        return e === (n ? t.endOffset : 0)
      }
      function ch(t, e) {
        const n = []
        Array.from(t.getItems({ direction: 'backward' }))
          .map(t => e.createRangeOn(t))
          .filter(
            e =>
              (e.start.isAfter(t.start) || e.start.isEqual(t.start)) && (e.end.isBefore(t.end) || e.end.isEqual(t.end))
          )
          .forEach(t => {
            n.push(t.start.parent), e.remove(t)
          }),
          n.forEach(t => {
            let n = t
            for (; n.parent && n.isEmpty; ) {
              const t = e.createRangeOn(n)
              ;(n = n.parent), e.remove(t)
            }
          })
      }
      function lh(t) {
        t.document.registerPostFixer(e =>
          (function (t, e) {
            const n = e.document.selection,
              i = e.schema,
              s = []
            let o = !1
            for (const t of n.getRanges()) {
              const e = hh(t, i)
              e && !e.isEqual(t) ? (s.push(e), (o = !0)) : s.push(t)
            }
            o &&
              t.setSelection(
                (function (t) {
                  const e = [...t],
                    n = new Set()
                  let i = 1
                  for (; i < e.length; ) {
                    const t = e[i],
                      s = e.slice(0, i)
                    for (const [o, r] of s.entries())
                      if (!n.has(o))
                        if (t.isEqual(r)) n.add(o)
                        else if (t.isIntersecting(r)) {
                          n.add(o), n.add(i)
                          const s = t.getJoined(r)
                          e.push(s)
                        }
                    i++
                  }
                  return e.filter((t, e) => !n.has(e))
                })(s),
                { backward: n.isBackward }
              )
          })(e, t)
        )
      }
      function hh(t, e) {
        return t.isCollapsed
          ? (function (t, e) {
              const n = t.start,
                i = e.getNearestSelectionRange(n)
              if (!i) {
                const t = n
                  .getAncestors()
                  .reverse()
                  .find(t => e.isObject(t))
                return t ? ja._createOn(t) : null
              }
              if (!i.isCollapsed) return i
              const s = i.start
              if (n.isEqual(s)) return null
              return new ja(s)
            })(t, e)
          : (function (t, e) {
              const { start: n, end: i } = t,
                s = e.checkChild(n, '$text'),
                o = e.checkChild(i, '$text'),
                r = e.getLimitElement(n),
                a = e.getLimitElement(i)
              if (r === a) {
                if (s && o) return null
                if (
                  (function (t, e, n) {
                    const i = (t.nodeAfter && !n.isLimit(t.nodeAfter)) || n.checkChild(t, '$text'),
                      s = (e.nodeBefore && !n.isLimit(e.nodeBefore)) || n.checkChild(e, '$text')
                    return i || s
                  })(n, i, e)
                ) {
                  const t =
                      n.nodeAfter && e.isSelectable(n.nodeAfter) ? null : e.getNearestSelectionRange(n, 'forward'),
                    s = i.nodeBefore && e.isSelectable(i.nodeBefore) ? null : e.getNearestSelectionRange(i, 'backward'),
                    o = t ? t.start : n,
                    r = s ? s.end : i
                  return new ja(o, r)
                }
              }
              const c = r && !r.is('rootElement'),
                l = a && !a.is('rootElement')
              if (c || l) {
                const t = n.nodeAfter && i.nodeBefore && n.nodeAfter.parent === i.nodeBefore.parent,
                  s = c && (!t || !uh(n.nodeAfter, e)),
                  o = l && (!t || !uh(i.nodeBefore, e))
                let h = n,
                  d = i
                return s && (h = Fa._createBefore(dh(r, e))), o && (d = Fa._createAfter(dh(a, e))), new ja(h, d)
              }
              return null
            })(t, e)
      }
      function dh(t, e) {
        let n = t,
          i = n
        for (; e.isLimit(i) && i.parent; ) (n = i), (i = i.parent)
        return n
      }
      function uh(t, e) {
        return t && e.isSelectable(t)
      }
      class fh {
        constructor() {
          ;(this.markers = new Wl()),
            (this.document = new Ll(this)),
            (this.schema = new Nc()),
            (this._pendingChanges = []),
            (this._currentWriter = null),
            [
              'insertContent',
              'insertObject',
              'deleteContent',
              'modifySelection',
              'getSelectedContent',
              'applyOperation',
            ].forEach(t => this.decorate(t)),
            this.on(
              'applyOperation',
              (t, e) => {
                e[0]._validate()
              },
              { priority: 'highest' }
            ),
            this.schema.register('$root', { isLimit: !0 }),
            this.schema.register('$container', { allowIn: ['$root', '$container'] }),
            this.schema.register('$block', { allowIn: ['$root', '$container'], isBlock: !0 }),
            this.schema.register('$blockObject', { allowWhere: '$block', isBlock: !0, isObject: !0 }),
            this.schema.register('$inlineObject', {
              allowWhere: '$text',
              allowAttributesOf: '$text',
              isInline: !0,
              isObject: !0,
            }),
            this.schema.register('$text', { allowIn: '$block', isInline: !0, isContent: !0 }),
            this.schema.register('$clipboardHolder', { allowContentOf: '$root', allowChildren: '$text', isLimit: !0 }),
            this.schema.register('$documentFragment', { allowContentOf: '$root', allowChildren: '$text', isLimit: !0 }),
            this.schema.register('$marker'),
            this.schema.addChildCheck((t, e) => {
              if ('$marker' === e.name) return !0
            }),
            lh(this),
            this.document.registerPostFixer(yc)
        }
        change(t) {
          try {
            return 0 === this._pendingChanges.length
              ? (this._pendingChanges.push({ batch: new nl(), callback: t }), this._runPendingChanges()[0])
              : t(this._currentWriter)
          } catch (t) {
            c.rethrowUnexpectedError(t, this)
          }
        }
        enqueueChange(t, e) {
          try {
            t
              ? 'function' == typeof t
                ? ((e = t), (t = new nl()))
                : t instanceof nl || (t = new nl(t))
              : (t = new nl()),
              this._pendingChanges.push({ batch: t, callback: e }),
              1 == this._pendingChanges.length && this._runPendingChanges()
          } catch (t) {
            c.rethrowUnexpectedError(t, this)
          }
        }
        applyOperation(t) {
          t._execute()
        }
        insertContent(t, e, n) {
          return (function (t, e, n, i) {
            return t.change(s => {
              let o
              ;(o = n ? (n instanceof Ka || n instanceof nc ? n : s.createSelection(n, i)) : t.document.selection),
                o.isCollapsed || t.deleteContent(o, { doNotAutoparagraph: !0 })
              const r = new Gl(t, s, o.anchor)
              let a
              ;(a = e.is('documentFragment') ? e.getChildren() : [e]), r.handleNodes(a)
              const c = r.getSelectionRange()
              c && (o instanceof nc ? s.setSelection(c) : o.setTo(c))
              const l = r.getAffectedRange() || t.createRange(o.anchor)
              return r.destroy(), l
            })
          })(this, t, e, n)
        }
        insertObject(t, e, n, i) {
          return Yl(this, t, e, n, i)
        }
        deleteContent(t, e) {
          Xl(this, t, e)
        }
        modifySelection(t, e) {
          !(function (t, e, n = {}) {
            const i = t.schema,
              s = 'backward' != n.direction,
              o = n.unit ? n.unit : 'character',
              r = !!n.treatEmojiAsSingleUnit,
              a = e.focus,
              c = new Na({ boundaries: oh(a, s), singleCharacters: !0, direction: s ? 'forward' : 'backward' }),
              l = { walker: c, schema: i, isForward: s, unit: o, treatEmojiAsSingleUnit: r }
            let h
            for (; (h = c.next()); ) {
              if (h.done) return
              const n = sh(l, h.value)
              if (n)
                return void (e instanceof nc
                  ? t.change(t => {
                      t.setSelectionFocus(n)
                    })
                  : e.setFocus(n))
            }
          })(this, t, e)
        }
        getSelectedContent(t) {
          return (function (t, e) {
            return t.change(t => {
              const n = t.createDocumentFragment(),
                i = e.getFirstRange()
              if (!i || i.isCollapsed) return n
              const s = i.start.root,
                o = i.start.getCommonPath(i.end),
                r = s.getNodeByPath(o)
              let a
              a =
                i.start.parent == i.end.parent
                  ? i
                  : t.createRange(
                      t.createPositionAt(r, i.start.path[o.length]),
                      t.createPositionAt(r, i.end.path[o.length] + 1)
                    )
              const c = a.end.offset - a.start.offset
              for (const e of a.getItems({ shallow: !0 }))
                e.is('$textProxy') ? t.appendText(e.data, e.getAttributes(), n) : t.append(t.cloneElement(e, !0), n)
              if (a != i) {
                const e = i._getTransformedByMove(a.start, t.createPositionAt(n, 0), c)[0],
                  s = t.createRange(t.createPositionAt(n, 0), e.start)
                ch(t.createRange(e.end, t.createPositionAt(n, 'end')), t), ch(s, t)
              }
              return n
            })
          })(this, t)
        }
        hasContent(t, e = {}) {
          const n = t instanceof Ma ? ja._createIn(t) : t
          if (n.isCollapsed) return !1
          const { ignoreWhitespaces: i = !1, ignoreMarkers: s = !1 } = e
          if (!s) for (const t of this.markers.getMarkersIntersectingRange(n)) if (t.affectsData) return !0
          for (const t of n.getItems())
            if (this.schema.isContent(t)) {
              if (!t.is('$textProxy')) return !0
              if (!i) return !0
              if (-1 !== t.data.search(/\S/)) return !0
            }
          return !1
        }
        createPositionFromPath(t, e, n) {
          return new Fa(t, e, n)
        }
        createPositionAt(t, e) {
          return Fa._createAt(t, e)
        }
        createPositionAfter(t) {
          return Fa._createAfter(t)
        }
        createPositionBefore(t) {
          return Fa._createBefore(t)
        }
        createRange(t, e) {
          return new ja(t, e)
        }
        createRangeIn(t) {
          return ja._createIn(t)
        }
        createRangeOn(t) {
          return ja._createOn(t)
        }
        createSelection(t, e, n) {
          return new Ka(t, e, n)
        }
        createBatch(t) {
          return new nl(t)
        }
        createOperationFromJSON(t) {
          return class {
            static fromJSON(t, e) {
              return ql[t.__className].fromJSON(t, e)
            }
          }.fromJSON(t, this.document)
        }
        destroy() {
          this.document.destroy(), this.stopListening()
        }
        _runPendingChanges() {
          const t = []
          for (this.fire('_beforeChanges'); this._pendingChanges.length; ) {
            const e = this._pendingChanges[0].batch
            this._currentWriter = new kl(this, e)
            const n = this._pendingChanges[0].callback(this._currentWriter)
            t.push(n),
              this.document._handleChangeBlock(this._currentWriter),
              this._pendingChanges.shift(),
              (this._currentWriter = null)
          }
          return this.fire('_afterChanges'), t
        }
      }
      he(fh, se)
      class mh extends Ca {
        constructor(t) {
          super(), (this.editor = t)
        }
        set(t, e, n = {}) {
          if ('string' == typeof e) {
            const t = e
            e = (e, n) => {
              this.editor.execute(t), n()
            }
          }
          super.set(t, e, n)
        }
      }
      class gh {
        constructor(t = {}) {
          const e = t.language || (this.constructor.defaultConfig && this.constructor.defaultConfig.language)
          ;(this._context = t.context || new Ii({ language: e })), this._context._addEditor(this, !t.context)
          const n = Array.from(this.constructor.builtinPlugins || [])
          ;(this.config = new vi(t, this.constructor.defaultConfig)),
            this.config.define('plugins', n),
            this.config.define(this._context._getEditorConfig()),
            (this.plugins = new Ei(this, n, this._context.plugins)),
            (this.locale = this._context.locale),
            (this.t = this.locale.t),
            (this._readOnlyLocks = new Set()),
            (this.commands = new Oc()),
            this.set('state', 'initializing'),
            this.once('ready', () => (this.state = 'ready'), { priority: 'high' }),
            this.once('destroy', () => (this.state = 'destroyed'), { priority: 'high' }),
            (this.model = new fh())
          const i = new As()
          ;(this.data = new Zc(this.model, i)),
            (this.editing = new Rc(this.model, i)),
            this.editing.view.document.bind('isReadOnly').to(this),
            (this.conversion = new Qc(
              [this.editing.downcastDispatcher, this.data.downcastDispatcher],
              this.data.upcastDispatcher
            )),
            this.conversion.addAlias('dataDowncast', this.data.downcastDispatcher),
            this.conversion.addAlias('editingDowncast', this.editing.downcastDispatcher),
            (this.keystrokes = new mh(this)),
            this.keystrokes.listenTo(this.editing.view.document)
        }
        get isReadOnly() {
          return this._readOnlyLocks.size > 0
        }
        set isReadOnly(t) {
          throw new c('editor-isreadonly-has-no-setter')
        }
        enableReadOnlyMode(t) {
          if ('string' != typeof t && 'symbol' != typeof t)
            throw new c('editor-read-only-lock-id-invalid', null, { lockId: t })
          this._readOnlyLocks.has(t) ||
            (this._readOnlyLocks.add(t),
            1 === this._readOnlyLocks.size && this.fire('change:isReadOnly', 'isReadOnly', !0, !1))
        }
        disableReadOnlyMode(t) {
          if ('string' != typeof t && 'symbol' != typeof t)
            throw new c('editor-read-only-lock-id-invalid', null, { lockId: t })
          this._readOnlyLocks.has(t) &&
            (this._readOnlyLocks.delete(t),
            0 === this._readOnlyLocks.size && this.fire('change:isReadOnly', 'isReadOnly', !1, !0))
        }
        initPlugins() {
          const t = this.config,
            e = t.get('plugins'),
            n = t.get('removePlugins') || [],
            i = t.get('extraPlugins') || [],
            s = t.get('substitutePlugins') || []
          return this.plugins.init(e.concat(i), n, s)
        }
        destroy() {
          let t = Promise.resolve()
          return (
            'initializing' == this.state && (t = new Promise(t => this.once('ready', t))),
            t
              .then(() => {
                this.fire('destroy'), this.stopListening(), this.commands.destroy()
              })
              .then(() => this.plugins.destroy())
              .then(() => {
                this.model.destroy(), this.data.destroy(), this.editing.destroy(), this.keystrokes.destroy()
              })
              .then(() => this._context._removeEditor(this))
          )
        }
        execute(...t) {
          try {
            return this.commands.execute(...t)
          } catch (t) {
            c.rethrowUnexpectedError(t, this)
          }
        }
        focus() {
          this.editing.view.focus()
        }
      }
      he(gh, se)
      class ph {
        constructor(t) {
          ;(this.editor = t), (this._components = new Map())
        }
        *names() {
          for (const t of this._components.values()) yield t.originalName
        }
        add(t, e) {
          this._components.set(_h(t), { callback: e, originalName: t })
        }
        create(t) {
          if (!this.has(t)) throw new c('componentfactory-item-missing', this, { name: t })
          return this._components.get(_h(t)).callback(this.editor.locale)
        }
        has(t) {
          return this._components.has(_h(t))
        }
      }
      function _h(t) {
        return String(t).toLowerCase()
      }
      class wh {
        constructor(t) {
          ;(this.editor = t),
            (this.componentFactory = new ph(t)),
            (this.focusTracker = new Aa()),
            this.set('viewportOffset', this._readViewportOffsetFromConfig()),
            (this._editableElementsMap = new Map()),
            this.listenTo(t.editing.view.document, 'layoutChanged', () => this.update())
        }
        get element() {
          return null
        }
        update() {
          this.fire('update')
        }
        destroy() {
          this.stopListening(), this.focusTracker.destroy()
          for (const t of this._editableElementsMap.values()) t.ckeditorInstance = null
          this._editableElementsMap = new Map()
        }
        setEditableElement(t, e) {
          this._editableElementsMap.set(t, e), e.ckeditorInstance || (e.ckeditorInstance = this.editor)
        }
        getEditableElement(t = 'main') {
          return this._editableElementsMap.get(t)
        }
        getEditableElementsNames() {
          return this._editableElementsMap.keys()
        }
        get _editableElements() {
          return (
            console.warn(
              'editor-ui-deprecated-editable-elements: The EditorUI#_editableElements property has been deprecated and will be removed in the near future.',
              { editorUI: this }
            ),
            this._editableElementsMap
          )
        }
        _readViewportOffsetFromConfig() {
          const t = this.editor,
            e = t.config.get('ui.viewportOffset')
          if (e) return e
          const n = t.config.get('toolbar.viewportTopOffset')
          return n
            ? (console.warn(
                'editor-ui-deprecated-viewport-offset-config: The `toolbar.vieportTopOffset` configuration option is deprecated. It will be removed from future CKEditor versions. Use `ui.viewportOffset.top` instead.'
              ),
              { top: n })
            : { top: 0 }
        }
      }
      he(wh, se)
      const bh = {
        setData(t) {
          this.data.set(t)
        },
        getData(t) {
          return this.data.get(t)
        },
      }
      const yh = {
        updateSourceElement() {
          if (!this.sourceElement) throw new c('editor-missing-sourceelement', this)
          var t, e
          ;(t = this.sourceElement),
            (e = this.data.get()),
            t instanceof HTMLTextAreaElement && (t.value = e),
            (t.innerHTML = e)
        },
      }
      class vh extends Mi {
        static get pluginName() {
          return 'PendingActions'
        }
        init() {
          this.set('hasAny', !1),
            (this._actions = new Ci({ idProperty: '_id' })),
            this._actions.delegate('add', 'remove').to(this)
        }
        add(t) {
          if ('string' != typeof t) throw new c('pendingactions-add-invalid-message', this)
          const e = Object.create(se)
          return e.set('message', t), this._actions.add(e), (this.hasAny = !0), e
        }
        remove(t) {
          this._actions.remove(t), (this.hasAny = !!this._actions.length)
        }
        get first() {
          return this._actions.get(0)
        }
        [Symbol.iterator]() {
          return this._actions[Symbol.iterator]()
        }
      }
      const Ph =
        '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="9.5" cy="4.5" r="1.5"/><circle cx="9.5" cy="10.5" r="1.5"/><circle cx="9.5" cy="16.5" r="1.5"/></svg>'
      class kh extends Ci {
        constructor(t = []) {
          super(t, { idProperty: 'viewUid' }),
            this.on('add', (t, e, n) => {
              this._renderViewIntoCollectionParent(e, n)
            }),
            this.on('remove', (t, e) => {
              e.element && this._parentElement && e.element.remove()
            }),
            (this._parentElement = null)
        }
        destroy() {
          this.map(t => t.destroy())
        }
        setParent(t) {
          this._parentElement = t
          for (const t of this) this._renderViewIntoCollectionParent(t)
        }
        delegate(...t) {
          if (!t.length || !t.every(t => 'string' == typeof t))
            throw new c('ui-viewcollection-delegate-wrong-events', this)
          return {
            to: e => {
              for (const n of this) for (const i of t) n.delegate(i).to(e)
              this.on('add', (n, i) => {
                for (const n of t) i.delegate(n).to(e)
              }),
                this.on('remove', (n, i) => {
                  for (const n of t) i.stopDelegating(n, e)
                })
            },
          }
        }
        _renderViewIntoCollectionParent(t, e) {
          t.isRendered || t.render(),
            t.element &&
              this._parentElement &&
              this._parentElement.insertBefore(t.element, this._parentElement.children[e])
        }
      }
      class Ah {
        constructor(t) {
          ;(this.element = null),
            (this.isRendered = !1),
            (this.locale = t),
            (this.t = t && t.t),
            (this._viewCollections = new Ci()),
            (this._unboundChildren = this.createCollection()),
            this._viewCollections.on('add', (e, n) => {
              n.locale = t
            }),
            this.decorate('render')
        }
        get bindTemplate() {
          return this._bindTemplate ? this._bindTemplate : (this._bindTemplate = Ch.bind(this, this))
        }
        createCollection(t) {
          const e = new kh(t)
          return this._viewCollections.add(e), e
        }
        registerChild(t) {
          Ai(t) || (t = [t])
          for (const e of t) this._unboundChildren.add(e)
        }
        deregisterChild(t) {
          Ai(t) || (t = [t])
          for (const e of t) this._unboundChildren.remove(e)
        }
        setTemplate(t) {
          this.template = new Ch(t)
        }
        extendTemplate(t) {
          Ch.extend(this.template, t)
        }
        render() {
          if (this.isRendered) throw new c('ui-view-render-already-rendered', this)
          this.template && ((this.element = this.template.render()), this.registerChild(this.template.getViews())),
            (this.isRendered = !0)
        }
        destroy() {
          this.stopListening(),
            this._viewCollections.map(t => t.destroy()),
            this.template && this.template._revertData && this.template.revert(this.element)
        }
      }
      he(Ah, dr), he(Ah, se)
      class Ch {
        constructor(t) {
          Object.assign(this, Dh(Nh(t))), (this._isRendered = !1), (this._revertData = null)
        }
        render() {
          const t = this._renderNode({ intoFragment: !0 })
          return (this._isRendered = !0), t
        }
        apply(t) {
          return (
            (this._revertData = { children: [], bindings: [], attributes: {} }),
            this._renderNode({ node: t, isApplying: !0, revertData: this._revertData }),
            t
          )
        }
        revert(t) {
          if (!this._revertData) throw new c('ui-template-revert-not-applied', [this, t])
          this._revertTemplateFromNode(t, this._revertData)
        }
        *getViews() {
          yield* (function* t(e) {
            if (e.children) for (const n of e.children) Wh(n) ? yield n : zh(n) && (yield* t(n))
          })(this)
        }
        static bind(t, e) {
          return {
            to: (n, i) => new Sh({ eventNameOrFunction: n, attribute: n, observable: t, emitter: e, callback: i }),
            if: (n, i, s) => new xh({ observable: t, emitter: e, attribute: n, valueIfTrue: i, callback: s }),
          }
        }
        static extend(t, e) {
          if (t._isRendered) throw new c('template-extend-render', [this, t])
          Lh(t, Dh(Nh(e)))
        }
        _renderNode(t) {
          let e
          if (((e = t.node ? this.tag && this.text : this.tag ? this.text : !this.text), e))
            throw new c('ui-template-wrong-syntax', this)
          return this.text ? this._renderText(t) : this._renderElement(t)
        }
        _renderElement(t) {
          let e = t.node
          return (
            e || (e = t.node = document.createElementNS(this.ns || 'http://www.w3.org/1999/xhtml', this.tag)),
            this._renderAttributes(t),
            this._renderElementChildren(t),
            this._setUpListeners(t),
            e
          )
        }
        _renderText(t) {
          let e = t.node
          return (
            e ? (t.revertData.text = e.textContent) : (e = t.node = document.createTextNode('')),
            Th(this.text)
              ? this._bindToObservable({ schema: this.text, updater: Oh(e), data: t })
              : (e.textContent = this.text.join('')),
            e
          )
        }
        _renderAttributes(t) {
          let e, n, i, s
          if (!this.attributes) return
          const o = t.node,
            r = t.revertData
          for (e in this.attributes)
            if (
              ((i = o.getAttribute(e)),
              (n = this.attributes[e]),
              r && (r.attributes[e] = i),
              (s = A(n[0]) && n[0].ns ? n[0].ns : null),
              Th(n))
            ) {
              const a = s ? n[0].value : n
              r && qh(e) && a.unshift(i), this._bindToObservable({ schema: a, updater: Ih(o, e, s), data: t })
            } else
              'style' == e && 'string' != typeof n[0]
                ? this._renderStyleAttribute(n[0], t)
                : (r && i && qh(e) && n.unshift(i),
                  (n = n
                    .map(t => (t && t.value) || t)
                    .reduce((t, e) => t.concat(e), [])
                    .reduce(Bh, '')),
                  jh(n) || o.setAttributeNS(s, e, n))
        }
        _renderStyleAttribute(t, e) {
          const n = e.node
          for (const i in t) {
            const s = t[i]
            Th(s) ? this._bindToObservable({ schema: [s], updater: Mh(n, i), data: e }) : (n.style[i] = s)
          }
        }
        _renderElementChildren(t) {
          const e = t.node,
            n = t.intoFragment ? document.createDocumentFragment() : e,
            i = t.isApplying
          let s = 0
          for (const o of this.children)
            if ($h(o)) {
              if (!i) {
                o.setParent(e)
                for (const t of o) n.appendChild(t.element)
              }
            } else if (Wh(o)) i || (o.isRendered || o.render(), n.appendChild(o.element))
            else if (Ho(o)) n.appendChild(o)
            else if (i) {
              const e = { children: [], bindings: [], attributes: {} }
              t.revertData.children.push(e), o._renderNode({ node: n.childNodes[s++], isApplying: !0, revertData: e })
            } else n.appendChild(o.render())
          t.intoFragment && e.appendChild(n)
        }
        _setUpListeners(t) {
          if (this.eventListeners)
            for (const e in this.eventListeners) {
              const n = this.eventListeners[e].map(n => {
                const [i, s] = e.split('@')
                return n.activateDomEventListener(i, s, t)
              })
              t.revertData && t.revertData.bindings.push(n)
            }
        }
        _bindToObservable({ schema: t, updater: e, data: n }) {
          const i = n.revertData
          Rh(t, e, n)
          const s = t
            .filter(t => !jh(t))
            .filter(t => t.observable)
            .map(i => i.activateAttributeListener(t, e, n))
          i && i.bindings.push(s)
        }
        _revertTemplateFromNode(t, e) {
          for (const t of e.bindings) for (const e of t) e()
          if (e.text) t.textContent = e.text
          else {
            for (const n in e.attributes) {
              const i = e.attributes[n]
              null === i ? t.removeAttribute(n) : t.setAttribute(n, i)
            }
            for (let n = 0; n < e.children.length; ++n) this._revertTemplateFromNode(t.childNodes[n], e.children[n])
          }
        }
      }
      he(Ch, p)
      class Eh {
        constructor(t) {
          Object.assign(this, t)
        }
        getValue(t) {
          const e = this.observable[this.attribute]
          return this.callback ? this.callback(e, t) : e
        }
        activateAttributeListener(t, e, n) {
          const i = () => Rh(t, e, n)
          return (
            this.emitter.listenTo(this.observable, 'change:' + this.attribute, i),
            () => {
              this.emitter.stopListening(this.observable, 'change:' + this.attribute, i)
            }
          )
        }
      }
      class Sh extends Eh {
        activateDomEventListener(t, e, n) {
          const i = (t, n) => {
            ;(e && !n.target.matches(e)) ||
              ('function' == typeof this.eventNameOrFunction
                ? this.eventNameOrFunction(n)
                : this.observable.fire(this.eventNameOrFunction, n))
          }
          return (
            this.emitter.listenTo(n.node, t, i),
            () => {
              this.emitter.stopListening(n.node, t, i)
            }
          )
        }
      }
      class xh extends Eh {
        getValue(t) {
          return !jh(super.getValue(t)) && (this.valueIfTrue || !0)
        }
      }
      function Th(t) {
        return !!t && (t.value && (t = t.value), Array.isArray(t) ? t.some(Th) : t instanceof Eh)
      }
      function Rh(t, e, { node: n }) {
        let i = (function (t, e) {
          return t.map(t => (t instanceof Eh ? t.getValue(e) : t))
        })(t, n)
        ;(i = 1 == t.length && t[0] instanceof xh ? i[0] : i.reduce(Bh, '')), jh(i) ? e.remove() : e.set(i)
      }
      function Oh(t) {
        return {
          set(e) {
            t.textContent = e
          },
          remove() {
            t.textContent = ''
          },
        }
      }
      function Ih(t, e, n) {
        return {
          set(i) {
            t.setAttributeNS(n, e, i)
          },
          remove() {
            t.removeAttributeNS(n, e)
          },
        }
      }
      function Mh(t, e) {
        return {
          set(n) {
            t.style[e] = n
          },
          remove() {
            t.style[e] = null
          },
        }
      }
      function Nh(t) {
        return bi(t, t => {
          if (t && (t instanceof Eh || zh(t) || Wh(t) || $h(t))) return t
        })
      }
      function Dh(t) {
        if (
          ('string' == typeof t
            ? (t = (function (t) {
                return { text: [t] }
              })(t))
            : t.text &&
              (function (t) {
                t.text = Si(t.text)
              })(t),
          t.on &&
            ((t.eventListeners = (function (t) {
              for (const e in t) Fh(t, e)
              return t
            })(t.on)),
            delete t.on),
          !t.text)
        ) {
          t.attributes &&
            (function (t) {
              for (const e in t) t[e].value && (t[e].value = Si(t[e].value)), Fh(t, e)
            })(t.attributes)
          const e = []
          if (t.children)
            if ($h(t.children)) e.push(t.children)
            else for (const n of t.children) zh(n) || Wh(n) || Ho(n) ? e.push(n) : e.push(new Ch(n))
          t.children = e
        }
        return t
      }
      function Fh(t, e) {
        t[e] = Si(t[e])
      }
      function Bh(t, e) {
        return jh(e) ? t : jh(t) ? e : `${t} ${e}`
      }
      function Vh(t, e) {
        for (const n in e) t[n] ? t[n].push(...e[n]) : (t[n] = e[n])
      }
      function Lh(t, e) {
        if (
          (e.attributes && (t.attributes || (t.attributes = {}), Vh(t.attributes, e.attributes)),
          e.eventListeners && (t.eventListeners || (t.eventListeners = {}), Vh(t.eventListeners, e.eventListeners)),
          e.text && t.text.push(...e.text),
          e.children && e.children.length)
        ) {
          if (t.children.length != e.children.length) throw new c('ui-template-extend-children-mismatch', t)
          let n = 0
          for (const i of e.children) Lh(t.children[n++], i)
        }
      }
      function jh(t) {
        return !t && 0 !== t
      }
      function Wh(t) {
        return t instanceof Ah
      }
      function zh(t) {
        return t instanceof Ch
      }
      function $h(t) {
        return t instanceof kh
      }
      function qh(t) {
        return 'class' == t || 'style' == t
      }
      const Uh = function (t) {
        return 'string' == typeof t || (!xt(t) && Pt(t) && '[object String]' == B(t))
      }
      class Hh extends kh {
        constructor(t, e = []) {
          super(e), (this.locale = t)
        }
        attachToDom() {
          this._bodyCollectionContainer = new Ch({
            tag: 'div',
            attributes: {
              class: ['ck', 'ck-reset_all', 'ck-body', 'ck-rounded-corners'],
              dir: this.locale.uiLanguageDirection,
            },
            children: this,
          }).render()
          let t = document.querySelector('.ck-body-wrapper')
          t ||
            ((t = (function (t, e, n = {}, i = []) {
              const s = n && n.xmlns,
                o = s ? t.createElementNS(s, e) : t.createElement(e)
              for (const t in n) o.setAttribute(t, n[t])
              ;(!Uh(i) && Ai(i)) || (i = [i])
              for (let e of i) Uh(e) && (e = t.createTextNode(e)), o.appendChild(e)
              return o
            })(document, 'div', { class: 'ck-body-wrapper' })),
            document.body.appendChild(t)),
            t.appendChild(this._bodyCollectionContainer)
        }
        detachFromDom() {
          super.destroy(), this._bodyCollectionContainer && this._bodyCollectionContainer.remove()
          const t = document.querySelector('.ck-body-wrapper')
          t && 0 == t.childElementCount && t.remove()
        }
      }
      class Kh extends Ah {
        constructor() {
          super()
          const t = this.bindTemplate
          this.set('content', ''),
            this.set('viewBox', '0 0 20 20'),
            this.set('fillColor', ''),
            this.setTemplate({
              tag: 'svg',
              ns: 'http://www.w3.org/2000/svg',
              attributes: { class: ['ck', 'ck-icon'], viewBox: t.to('viewBox') },
            })
        }
        render() {
          super.render(),
            this._updateXMLContent(),
            this._colorFillPaths(),
            this.on('change:content', () => {
              this._updateXMLContent(), this._colorFillPaths()
            }),
            this.on('change:fillColor', () => {
              this._colorFillPaths()
            })
        }
        _updateXMLContent() {
          if (this.content) {
            const t = new DOMParser().parseFromString(this.content.trim(), 'image/svg+xml').querySelector('svg'),
              e = t.getAttribute('viewBox')
            for (e && (this.viewBox = e), this.element.innerHTML = ''; t.childNodes.length > 0; )
              this.element.appendChild(t.childNodes[0])
          }
        }
        _colorFillPaths() {
          this.fillColor &&
            this.element.querySelectorAll('.ck-icon__fill').forEach(t => {
              t.style.fill = this.fillColor
            })
        }
      }
      class Gh extends Ah {
        constructor(t) {
          super(t), this.set('text', ''), this.set('position', 's')
          const e = this.bindTemplate
          this.setTemplate({
            tag: 'span',
            attributes: {
              class: [
                'ck',
                'ck-tooltip',
                e.to('position', t => 'ck-tooltip_' + t),
                e.if('text', 'ck-hidden', t => !t.trim()),
              ],
            },
            children: [
              { tag: 'span', attributes: { class: ['ck', 'ck-tooltip__text'] }, children: [{ text: e.to('text') }] },
            ],
          })
        }
      }
      class Jh extends Ah {
        constructor(t) {
          super(t)
          const e = this.bindTemplate,
            n = o()
          this.set('class'),
            this.set('labelStyle'),
            this.set('icon'),
            this.set('isEnabled', !0),
            this.set('isOn', !1),
            this.set('isVisible', !0),
            this.set('isToggleable', !1),
            this.set('keystroke'),
            this.set('label'),
            this.set('tabindex', -1),
            this.set('tooltip'),
            this.set('tooltipPosition', 's'),
            this.set('type', 'button'),
            this.set('withText', !1),
            this.set('withKeystroke', !1),
            (this.children = this.createCollection()),
            (this.tooltipView = this._createTooltipView()),
            (this.labelView = this._createLabelView(n)),
            (this.iconView = new Kh()),
            this.iconView.extendTemplate({ attributes: { class: 'ck-button__icon' } }),
            (this.keystrokeView = this._createKeystrokeView()),
            this.bind('_tooltipString').to(
              this,
              'tooltip',
              this,
              'label',
              this,
              'keystroke',
              this._getTooltipString.bind(this)
            ),
            this.setTemplate({
              tag: 'button',
              attributes: {
                class: [
                  'ck',
                  'ck-button',
                  e.to('class'),
                  e.if('isEnabled', 'ck-disabled', t => !t),
                  e.if('isVisible', 'ck-hidden', t => !t),
                  e.to('isOn', t => (t ? 'ck-on' : 'ck-off')),
                  e.if('withText', 'ck-button_with-text'),
                  e.if('withKeystroke', 'ck-button_with-keystroke'),
                ],
                type: e.to('type', t => t || 'button'),
                tabindex: e.to('tabindex'),
                'aria-labelledby': `ck-editor__aria-label_${n}`,
                'aria-disabled': e.if('isEnabled', !0, t => !t),
                'aria-pressed': e.to('isOn', t => !!this.isToggleable && String(t)),
              },
              children: this.children,
              on: {
                mousedown: e.to(t => {
                  t.preventDefault()
                }),
                click: e.to(t => {
                  this.isEnabled ? this.fire('execute') : t.preventDefault()
                }),
              },
            })
        }
        render() {
          super.render(),
            this.icon && (this.iconView.bind('content').to(this, 'icon'), this.children.add(this.iconView)),
            this.children.add(this.tooltipView),
            this.children.add(this.labelView),
            this.withKeystroke && this.keystroke && this.children.add(this.keystrokeView)
        }
        focus() {
          this.element.focus()
        }
        _createTooltipView() {
          const t = new Gh()
          return t.bind('text').to(this, '_tooltipString'), t.bind('position').to(this, 'tooltipPosition'), t
        }
        _createLabelView(t) {
          const e = new Ah(),
            n = this.bindTemplate
          return (
            e.setTemplate({
              tag: 'span',
              attributes: {
                class: ['ck', 'ck-button__label'],
                style: n.to('labelStyle'),
                id: `ck-editor__aria-label_${t}`,
              },
              children: [{ text: this.bindTemplate.to('label') }],
            }),
            e
          )
        }
        _createKeystrokeView() {
          const t = new Ah()
          return (
            t.setTemplate({
              tag: 'span',
              attributes: { class: ['ck', 'ck-button__keystroke'] },
              children: [{ text: this.bindTemplate.to('keystroke', t => ho(t)) }],
            }),
            t
          )
        }
        _getTooltipString(t, e, n) {
          return t
            ? 'string' == typeof t
              ? t
              : (n && (n = ho(n)), t instanceof Function ? t(e, n) : `${e}${n ? ` (${n})` : ''}`)
            : ''
        }
      }
      class Yh extends Jh {
        constructor(t) {
          super(t),
            (this.isToggleable = !0),
            (this.toggleSwitchView = this._createToggleView()),
            this.extendTemplate({ attributes: { class: 'ck-switchbutton' } })
        }
        render() {
          super.render(), this.children.add(this.toggleSwitchView)
        }
        _createToggleView() {
          const t = new Ah()
          return (
            t.setTemplate({
              tag: 'span',
              attributes: { class: ['ck', 'ck-button__toggle'] },
              children: [{ tag: 'span', attributes: { class: ['ck', 'ck-button__toggle__inner'] } }],
            }),
            t
          )
        }
      }
      class Xh extends Jh {
        constructor(t) {
          super(t),
            (this.arrowView = this._createArrowView()),
            this.extendTemplate({ attributes: { 'aria-haspopup': !0 } }),
            this.delegate('execute').to(this, 'open')
        }
        render() {
          super.render(), this.children.add(this.arrowView)
        }
        _createArrowView() {
          const t = new Kh()
          return (
            (t.content =
              '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"/></svg>'),
            t.extendTemplate({ attributes: { class: 'ck-dropdown__arrow' } }),
            t
          )
        }
      }
      class Zh extends Ah {
        constructor(t) {
          super(t)
          const e = this.bindTemplate
          this.set('isVisible', !1),
            this.set('position', 'se'),
            (this.children = this.createCollection()),
            this.setTemplate({
              tag: 'div',
              attributes: {
                class: [
                  'ck',
                  'ck-reset',
                  'ck-dropdown__panel',
                  e.to('position', t => `ck-dropdown__panel_${t}`),
                  e.if('isVisible', 'ck-dropdown__panel-visible'),
                ],
              },
              children: this.children,
              on: { selectstart: e.to(t => t.preventDefault()) },
            })
        }
        focus() {
          this.children.length && this.children.first.focus()
        }
        focusLast() {
          if (this.children.length) {
            const t = this.children.last
            'function' == typeof t.focusLast ? t.focusLast() : t.focus()
          }
        }
      }
      function Qh({ element: t, target: e, positions: n, limiter: i, fitInViewport: s, viewportOffsetConfig: o }) {
        V(e) && (e = e()), V(i) && (i = i())
        const r = (function (t) {
            return t && t.parentNode ? (t.offsetParent === Xo.document.body ? null : t.offsetParent) : null
          })(t),
          a = new ca(t)
        let c
        const l = { targetRect: new ca(e), elementRect: a, positionedElementAncestor: r }
        if (i || s) {
          const t = i && new ca(i).getVisible(),
            e =
              s &&
              (function (t) {
                t = Object.assign({ top: 0, bottom: 0, left: 0, right: 0 }, t)
                const e = new ca(Xo.window)
                return (e.top += t.top), (e.height -= t.top), (e.bottom -= t.bottom), (e.height -= t.bottom), e
              })(o)
          Object.assign(l, { limiterRect: t, viewportRect: e }),
            (c =
              (function (t, e) {
                const { elementRect: n } = e,
                  i = n.getArea(),
                  s = t.map(t => new ed(t, e)).filter(t => !!t.name)
                let o = 0,
                  r = null
                for (const t of s) {
                  const { _limiterIntersectionArea: e, _viewportIntersectionArea: n } = t
                  if (e === i) return t
                  const s = n ** 2 + e ** 2
                  s > o && ((o = s), (r = t))
                }
                return r
              })(n, l) || new ed(n[0], l))
        } else c = new ed(n[0], l)
        return c
      }
      function td(t) {
        const { scrollX: e, scrollY: n } = Xo.window
        return t.clone().moveBy(e, n)
      }
      class ed {
        constructor(t, e) {
          const n = t(e.targetRect, e.elementRect, e.viewportRect)
          if (!n) return
          const { left: i, top: s, name: o, config: r } = n
          Object.assign(this, { name: o, config: r }),
            (this._positioningFunctionCorrdinates = { left: i, top: s }),
            (this._options = e)
        }
        get left() {
          return this._absoluteRect.left
        }
        get top() {
          return this._absoluteRect.top
        }
        get _limiterIntersectionArea() {
          const t = this._options.limiterRect
          if (t) {
            const e = this._options.viewportRect
            if (!e) return t.getIntersectionArea(this._rect)
            {
              const n = t.getIntersection(e)
              if (n) return n.getIntersectionArea(this._rect)
            }
          }
          return 0
        }
        get _viewportIntersectionArea() {
          const t = this._options.viewportRect
          return t ? t.getIntersectionArea(this._rect) : 0
        }
        get _rect() {
          return (
            this._cachedRect ||
              (this._cachedRect = this._options.elementRect
                .clone()
                .moveTo(this._positioningFunctionCorrdinates.left, this._positioningFunctionCorrdinates.top)),
            this._cachedRect
          )
        }
        get _absoluteRect() {
          return (
            this._cachedAbsoluteRect ||
              ((this._cachedAbsoluteRect = td(this._rect)),
              this._options.positionedElementAncestor &&
                (function (t, e) {
                  const n = td(new ca(e)),
                    i = ra(e)
                  let s = 0,
                    o = 0
                  ;(s -= n.left),
                    (o -= n.top),
                    (s += e.scrollLeft),
                    (o += e.scrollTop),
                    (s -= i.left),
                    (o -= i.top),
                    t.moveBy(s, o)
                })(this._cachedAbsoluteRect, this._options.positionedElementAncestor)),
            this._cachedAbsoluteRect
          )
        }
      }
      class nd extends Ah {
        constructor(t, e, n) {
          super(t)
          const i = this.bindTemplate
          ;(this.buttonView = e),
            (this.panelView = n),
            this.set('isOpen', !1),
            this.set('isEnabled', !0),
            this.set('class'),
            this.set('id'),
            this.set('panelPosition', 'auto'),
            (this.keystrokes = new Ca()),
            this.setTemplate({
              tag: 'div',
              attributes: {
                class: ['ck', 'ck-dropdown', i.to('class'), i.if('isEnabled', 'ck-disabled', t => !t)],
                id: i.to('id'),
                'aria-describedby': i.to('ariaDescribedById'),
              },
              children: [e, n],
            }),
            e.extendTemplate({ attributes: { class: ['ck-dropdown__button'] } })
        }
        render() {
          super.render(),
            this.listenTo(this.buttonView, 'open', () => {
              this.isOpen = !this.isOpen
            }),
            this.panelView.bind('isVisible').to(this, 'isOpen'),
            this.on('change:isOpen', () => {
              this.isOpen &&
                ('auto' === this.panelPosition
                  ? (this.panelView.position = nd._getOptimalPosition({
                      element: this.panelView.element,
                      target: this.buttonView.element,
                      fitInViewport: !0,
                      positions: this._panelPositions,
                    }).name)
                  : (this.panelView.position = this.panelPosition))
            }),
            this.keystrokes.listenTo(this.element)
          const t = (t, e) => {
            this.isOpen && (this.buttonView.focus(), (this.isOpen = !1), e())
          }
          this.keystrokes.set('arrowdown', (t, e) => {
            this.buttonView.isEnabled && !this.isOpen && ((this.isOpen = !0), e())
          }),
            this.keystrokes.set('arrowright', (t, e) => {
              this.isOpen && e()
            }),
            this.keystrokes.set('arrowleft', t),
            this.keystrokes.set('esc', t)
        }
        focus() {
          this.buttonView.focus()
        }
        get _panelPositions() {
          const {
            south: t,
            north: e,
            southEast: n,
            southWest: i,
            northEast: s,
            northWest: o,
            southMiddleEast: r,
            southMiddleWest: a,
            northMiddleEast: c,
            northMiddleWest: l,
          } = nd.defaultPanelPositions
          return 'rtl' !== this.locale.uiLanguageDirection
            ? [n, i, r, a, t, s, o, c, l, e]
            : [i, n, a, r, t, o, s, l, c, e]
        }
      }
      function id(t) {
        return !!(t && t.getClientRects && t.getClientRects().length)
      }
      ;(nd.defaultPanelPositions = {
        south: (t, e) => ({ top: t.bottom, left: t.left - (e.width - t.width) / 2, name: 's' }),
        southEast: t => ({ top: t.bottom, left: t.left, name: 'se' }),
        southWest: (t, e) => ({ top: t.bottom, left: t.left - e.width + t.width, name: 'sw' }),
        southMiddleEast: (t, e) => ({ top: t.bottom, left: t.left - (e.width - t.width) / 4, name: 'sme' }),
        southMiddleWest: (t, e) => ({ top: t.bottom, left: t.left - (3 * (e.width - t.width)) / 4, name: 'smw' }),
        north: (t, e) => ({ top: t.top - e.height, left: t.left - (e.width - t.width) / 2, name: 'n' }),
        northEast: (t, e) => ({ top: t.top - e.height, left: t.left, name: 'ne' }),
        northWest: (t, e) => ({ top: t.top - e.height, left: t.left - e.width + t.width, name: 'nw' }),
        northMiddleEast: (t, e) => ({ top: t.top - e.height, left: t.left - (e.width - t.width) / 4, name: 'nme' }),
        northMiddleWest: (t, e) => ({
          top: t.top - e.height,
          left: t.left - (3 * (e.width - t.width)) / 4,
          name: 'nmw',
        }),
      }),
        (nd._getOptimalPosition = Qh)
      class sd {
        constructor(t) {
          if ((Object.assign(this, t), t.actions && t.keystrokeHandler))
            for (const e in t.actions) {
              let n = t.actions[e]
              'string' == typeof n && (n = [n])
              for (const i of n)
                t.keystrokeHandler.set(i, (t, n) => {
                  this[e](), n()
                })
            }
        }
        get first() {
          return this.focusables.find(od) || null
        }
        get last() {
          return this.focusables.filter(od).slice(-1)[0] || null
        }
        get next() {
          return this._getFocusableItem(1)
        }
        get previous() {
          return this._getFocusableItem(-1)
        }
        get current() {
          let t = null
          return null === this.focusTracker.focusedElement
            ? null
            : (this.focusables.find((e, n) => {
                const i = e.element === this.focusTracker.focusedElement
                return i && (t = n), i
              }),
              t)
        }
        focusFirst() {
          this._focus(this.first)
        }
        focusLast() {
          this._focus(this.last)
        }
        focusNext() {
          this._focus(this.next)
        }
        focusPrevious() {
          this._focus(this.previous)
        }
        _focus(t) {
          t && t.focus()
        }
        _getFocusableItem(t) {
          const e = this.current,
            n = this.focusables.length
          if (!n) return null
          if (null === e) return this[1 === t ? 'first' : 'last']
          let i = (e + n + t) % n
          do {
            const e = this.focusables.get(i)
            if (od(e)) return e
            i = (i + n + t) % n
          } while (i !== e)
          return null
        }
      }
      function od(t) {
        return !(!t.focus || !id(t.element))
      }
      class rd extends Ah {
        constructor(t) {
          super(t), this.setTemplate({ tag: 'span', attributes: { class: ['ck', 'ck-toolbar__separator'] } })
        }
      }
      class ad extends Ah {
        constructor(t) {
          super(t), this.setTemplate({ tag: 'span', attributes: { class: ['ck', 'ck-toolbar__line-break'] } })
        }
      }
      function cd(t) {
        return Array.isArray(t)
          ? { items: t, removeItems: [] }
          : t
          ? Object.assign({ items: [], removeItems: [] }, t)
          : { items: [], removeItems: [] }
      }
      class ld extends Ah {
        constructor(t, e) {
          super(t)
          const n = this.bindTemplate,
            i = this.t
          ;(this.options = e || {}),
            this.set('ariaLabel', i('Editor toolbar')),
            this.set('maxWidth', 'auto'),
            (this.items = this.createCollection()),
            (this.focusTracker = new Aa()),
            (this.keystrokes = new Ca()),
            this.set('class'),
            this.set('isCompact', !1),
            (this.itemsView = new hd(t)),
            (this.children = this.createCollection()),
            this.children.add(this.itemsView),
            (this.focusables = this.createCollection())
          const s = 'rtl' === t.uiLanguageDirection
          this._focusCycler = new sd({
            focusables: this.focusables,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
              focusPrevious: [s ? 'arrowright' : 'arrowleft', 'arrowup'],
              focusNext: [s ? 'arrowleft' : 'arrowright', 'arrowdown'],
            },
          })
          const o = ['ck', 'ck-toolbar', n.to('class'), n.if('isCompact', 'ck-toolbar_compact')]
          var r
          this.options.shouldGroupWhenFull && this.options.isFloating && o.push('ck-toolbar_floating'),
            this.setTemplate({
              tag: 'div',
              attributes: {
                class: o,
                role: 'toolbar',
                'aria-label': n.to('ariaLabel'),
                style: { maxWidth: n.to('maxWidth') },
              },
              children: this.children,
              on: {
                mousedown:
                  ((r = this),
                  r.bindTemplate.to(t => {
                    t.target === r.element && t.preventDefault()
                  })),
              },
            }),
            (this._behavior = this.options.shouldGroupWhenFull ? new ud(this) : new dd(this))
        }
        render() {
          super.render()
          for (const t of this.items) this.focusTracker.add(t.element)
          this.items.on('add', (t, e) => {
            this.focusTracker.add(e.element)
          }),
            this.items.on('remove', (t, e) => {
              this.focusTracker.remove(e.element)
            }),
            this.keystrokes.listenTo(this.element),
            this._behavior.render(this)
        }
        destroy() {
          return this._behavior.destroy(), this.focusTracker.destroy(), this.keystrokes.destroy(), super.destroy()
        }
        focus() {
          this._focusCycler.focusFirst()
        }
        focusLast() {
          this._focusCycler.focusLast()
        }
        fillFromConfig(t, e) {
          const n = cd(t),
            i = n.items.filter(
              (t, i, s) =>
                '|' === t ||
                (-1 === n.removeItems.indexOf(t) &&
                  ('-' === t
                    ? !this.options.shouldGroupWhenFull ||
                      (l('toolbarview-line-break-ignored-when-grouping-items', s), !1)
                    : !!e.has(t) || (l('toolbarview-item-unavailable', { name: t }), !1)))
            ),
            s = this._cleanSeparators(i).map(t => ('|' === t ? new rd() : '-' === t ? new ad() : e.create(t)))
          this.items.addMany(s)
        }
        _cleanSeparators(t) {
          const e = t => '-' !== t && '|' !== t,
            n = t.length,
            i = t.findIndex(e),
            s = n - t.slice().reverse().findIndex(e)
          return t.slice(i, s).filter((t, n, i) => {
            if (e(t)) return !0
            return !(n > 0 && i[n - 1] === t)
          })
        }
      }
      class hd extends Ah {
        constructor(t) {
          super(t),
            (this.children = this.createCollection()),
            this.setTemplate({
              tag: 'div',
              attributes: { class: ['ck', 'ck-toolbar__items'] },
              children: this.children,
            })
        }
      }
      class dd {
        constructor(t) {
          const e = t.bindTemplate
          t.set('isVertical', !1),
            t.itemsView.children.bindTo(t.items).using(t => t),
            t.focusables.bindTo(t.items).using(t => t),
            t.extendTemplate({ attributes: { class: [e.if('isVertical', 'ck-toolbar_vertical')] } })
        }
        render() {}
        destroy() {}
      }
      class ud {
        constructor(t) {
          ;(this.view = t),
            (this.viewChildren = t.children),
            (this.viewFocusables = t.focusables),
            (this.viewItemsView = t.itemsView),
            (this.viewFocusTracker = t.focusTracker),
            (this.viewLocale = t.locale),
            (this.ungroupedItems = t.createCollection()),
            (this.groupedItems = t.createCollection()),
            (this.groupedItemsDropdown = this._createGroupedItemsDropdown()),
            (this.resizeObserver = null),
            (this.cachedPadding = null),
            (this.shouldUpdateGroupingOnNextResize = !1),
            t.itemsView.children.bindTo(this.ungroupedItems).using(t => t),
            this.ungroupedItems.on('add', this._updateFocusCycleableItems.bind(this)),
            this.ungroupedItems.on('remove', this._updateFocusCycleableItems.bind(this)),
            t.children.on('add', this._updateFocusCycleableItems.bind(this)),
            t.children.on('remove', this._updateFocusCycleableItems.bind(this)),
            t.items.on('change', (t, e) => {
              const n = e.index
              for (const t of e.removed)
                n >= this.ungroupedItems.length ? this.groupedItems.remove(t) : this.ungroupedItems.remove(t)
              for (let t = n; t < n + e.added.length; t++) {
                const i = e.added[t - n]
                t > this.ungroupedItems.length
                  ? this.groupedItems.add(i, t - this.ungroupedItems.length)
                  : this.ungroupedItems.add(i, t)
              }
              this._updateGrouping()
            }),
            t.extendTemplate({ attributes: { class: ['ck-toolbar_grouping'] } })
        }
        render(t) {
          ;(this.viewElement = t.element), this._enableGroupingOnResize(), this._enableGroupingOnMaxWidthChange(t)
        }
        destroy() {
          this.groupedItemsDropdown.destroy(), this.resizeObserver.destroy()
        }
        _updateGrouping() {
          if (!this.viewElement.ownerDocument.body.contains(this.viewElement)) return
          if (!id(this.viewElement)) return void (this.shouldUpdateGroupingOnNextResize = !0)
          const t = this.groupedItems.length
          let e
          for (; this._areItemsOverflowing; ) this._groupLastItem(), (e = !0)
          if (!e && this.groupedItems.length) {
            for (; this.groupedItems.length && !this._areItemsOverflowing; ) this._ungroupFirstItem()
            this._areItemsOverflowing && this._groupLastItem()
          }
          this.groupedItems.length !== t && this.view.fire('groupedItemsUpdate')
        }
        get _areItemsOverflowing() {
          if (!this.ungroupedItems.length) return !1
          const t = this.viewElement,
            e = this.viewLocale.uiLanguageDirection,
            n = new ca(t.lastChild),
            i = new ca(t)
          if (!this.cachedPadding) {
            const n = Xo.window.getComputedStyle(t),
              i = 'ltr' === e ? 'paddingRight' : 'paddingLeft'
            this.cachedPadding = Number.parseInt(n[i])
          }
          return 'ltr' === e ? n.right > i.right - this.cachedPadding : n.left < i.left + this.cachedPadding
        }
        _enableGroupingOnResize() {
          let t
          ;(this.resizeObserver = new da(this.viewElement, e => {
            ;(t && t === e.contentRect.width && !this.shouldUpdateGroupingOnNextResize) ||
              ((this.shouldUpdateGroupingOnNextResize = !1), this._updateGrouping(), (t = e.contentRect.width))
          })),
            this._updateGrouping()
        }
        _enableGroupingOnMaxWidthChange(t) {
          t.on('change:maxWidth', () => {
            this._updateGrouping()
          })
        }
        _groupLastItem() {
          this.groupedItems.length ||
            (this.viewChildren.add(new rd()),
            this.viewChildren.add(this.groupedItemsDropdown),
            this.viewFocusTracker.add(this.groupedItemsDropdown.element)),
            this.groupedItems.add(this.ungroupedItems.remove(this.ungroupedItems.last), 0)
        }
        _ungroupFirstItem() {
          this.ungroupedItems.add(this.groupedItems.remove(this.groupedItems.first)),
            this.groupedItems.length ||
              (this.viewChildren.remove(this.groupedItemsDropdown),
              this.viewChildren.remove(this.viewChildren.last),
              this.viewFocusTracker.remove(this.groupedItemsDropdown.element))
        }
        _createGroupedItemsDropdown() {
          const t = this.viewLocale,
            e = t.t,
            n = pd(t)
          return (
            (n.class = 'ck-toolbar__grouped-dropdown'),
            (n.panelPosition = 'ltr' === t.uiLanguageDirection ? 'sw' : 'se'),
            (function (t, e) {
              const n = t.locale,
                i = n.t,
                s = (t.toolbarView = new ld(n))
              s.set('ariaLabel', i('Dropdown toolbar')),
                t.extendTemplate({ attributes: { class: ['ck-toolbar-dropdown'] } }),
                e.map(t => s.items.add(t)),
                t.panelView.children.add(s),
                s.items.delegate('execute').to(t)
            })(n, []),
            n.buttonView.set({
              label: e('Show more items'),
              tooltip: !0,
              tooltipPosition: 'rtl' === t.uiLanguageDirection ? 'se' : 'sw',
              icon: Ph,
            }),
            n.toolbarView.items.bindTo(this.groupedItems).using(t => t),
            n
          )
        }
        _updateFocusCycleableItems() {
          this.viewFocusables.clear(),
            this.ungroupedItems.map(t => {
              this.viewFocusables.add(t)
            }),
            this.groupedItems.length && this.viewFocusables.add(this.groupedItemsDropdown)
        }
      }
      class fd extends Ah {
        constructor() {
          super(),
            (this.items = this.createCollection()),
            (this.focusTracker = new Aa()),
            (this.keystrokes = new Ca()),
            (this._focusCycler = new sd({
              focusables: this.items,
              focusTracker: this.focusTracker,
              keystrokeHandler: this.keystrokes,
              actions: { focusPrevious: 'arrowup', focusNext: 'arrowdown' },
            })),
            this.setTemplate({ tag: 'ul', attributes: { class: ['ck', 'ck-reset', 'ck-list'] }, children: this.items })
        }
        render() {
          super.render()
          for (const t of this.items) this.focusTracker.add(t.element)
          this.items.on('add', (t, e) => {
            this.focusTracker.add(e.element)
          }),
            this.items.on('remove', (t, e) => {
              this.focusTracker.remove(e.element)
            }),
            this.keystrokes.listenTo(this.element)
        }
        destroy() {
          super.destroy(), this.focusTracker.destroy(), this.keystrokes.destroy()
        }
        focus() {
          this._focusCycler.focusFirst()
        }
        focusLast() {
          this._focusCycler.focusLast()
        }
      }
      class md extends Ah {
        constructor(t) {
          super(t),
            (this.children = this.createCollection()),
            this.setTemplate({ tag: 'li', attributes: { class: ['ck', 'ck-list__item'] }, children: this.children })
        }
        focus() {
          this.children.first.focus()
        }
      }
      class gd extends Ah {
        constructor(t) {
          super(t), this.setTemplate({ tag: 'li', attributes: { class: ['ck', 'ck-list__separator'] } })
        }
      }
      function pd(t, e = Xh) {
        const n = new e(t),
          i = new Zh(t),
          s = new nd(t, n, i)
        return (
          n.bind('isEnabled').to(s),
          n instanceof Xh ? n.bind('isOn').to(s, 'isOpen') : n.arrowView.bind('isOn').to(s, 'isOpen'),
          (function (t) {
            ;(function (t) {
              t.on('render', () => {
                !(function ({ emitter: t, activator: e, callback: n, contextElements: i }) {
                  t.listenTo(document, 'mousedown', (t, s) => {
                    if (!e()) return
                    const o = 'function' == typeof s.composedPath ? s.composedPath() : []
                    for (const t of i) if (t.contains(s.target) || o.includes(t)) return
                    n()
                  })
                })({
                  emitter: t,
                  activator: () => t.isOpen,
                  callback: () => {
                    t.isOpen = !1
                  },
                  contextElements: [t.element],
                })
              })
            })(t),
              (function (t) {
                t.on('execute', e => {
                  e.source instanceof Yh || (t.isOpen = !1)
                })
              })(t),
              (function (t) {
                t.keystrokes.set('arrowdown', (e, n) => {
                  t.isOpen && (t.panelView.focus(), n())
                }),
                  t.keystrokes.set('arrowup', (e, n) => {
                    t.isOpen && (t.panelView.focusLast(), n())
                  })
              })(t)
          })(s),
          s
        )
      }
      class _d extends Ah {
        constructor(t) {
          super(t), (this.body = new Hh(t))
        }
        render() {
          super.render(), this.body.attachToDom()
        }
        destroy() {
          return this.body.detachFromDom(), super.destroy()
        }
      }
      class wd extends Ah {
        constructor(t) {
          super(t), this.set('text'), this.set('for'), (this.id = `ck-editor__label_${o()}`)
          const e = this.bindTemplate
          this.setTemplate({
            tag: 'label',
            attributes: { class: ['ck', 'ck-label'], id: this.id, for: e.to('for') },
            children: [{ text: e.to('text') }],
          })
        }
      }
      class bd extends _d {
        constructor(t) {
          super(t),
            (this.top = this.createCollection()),
            (this.main = this.createCollection()),
            (this._voiceLabelView = this._createVoiceLabel()),
            this.setTemplate({
              tag: 'div',
              attributes: {
                class: ['ck', 'ck-reset', 'ck-editor', 'ck-rounded-corners'],
                role: 'application',
                dir: t.uiLanguageDirection,
                lang: t.uiLanguage,
                'aria-labelledby': this._voiceLabelView.id,
              },
              children: [
                this._voiceLabelView,
                {
                  tag: 'div',
                  attributes: { class: ['ck', 'ck-editor__top', 'ck-reset_all'], role: 'presentation' },
                  children: this.top,
                },
                {
                  tag: 'div',
                  attributes: { class: ['ck', 'ck-editor__main'], role: 'presentation' },
                  children: this.main,
                },
              ],
            })
        }
        _createVoiceLabel() {
          const t = this.t,
            e = new wd()
          return (e.text = t('Rich Text Editor')), e.extendTemplate({ attributes: { class: 'ck-voice-label' } }), e
        }
      }
      class yd extends Ah {
        constructor(t, e, n) {
          super(t),
            this.setTemplate({
              tag: 'div',
              attributes: {
                class: ['ck', 'ck-content', 'ck-editor__editable', 'ck-rounded-corners'],
                lang: t.contentLanguage,
                dir: t.contentLanguageDirection,
              },
            }),
            (this.name = null),
            this.set('isFocused', !1),
            (this._editableElement = n),
            (this._hasExternalElement = !!this._editableElement),
            (this._editingView = e)
        }
        render() {
          super.render(),
            this._hasExternalElement
              ? this.template.apply((this.element = this._editableElement))
              : (this._editableElement = this.element),
            this.on('change:isFocused', () => this._updateIsFocusedClasses()),
            this._updateIsFocusedClasses()
        }
        destroy() {
          this._hasExternalElement && this.template.revert(this._editableElement), super.destroy()
        }
        _updateIsFocusedClasses() {
          const t = this._editingView
          function e(e) {
            t.change(n => {
              const i = t.document.getRoot(e.name)
              n.addClass(e.isFocused ? 'ck-focused' : 'ck-blurred', i),
                n.removeClass(e.isFocused ? 'ck-blurred' : 'ck-focused', i)
            })
          }
          t.isRenderingInProgress
            ? (function n(i) {
                t.once('change:isRenderingInProgress', (t, s, o) => {
                  o ? n(i) : e(i)
                })
              })(this)
            : e(this)
        }
      }
      class vd extends yd {
        constructor(t, e, n) {
          super(t, e, n), this.extendTemplate({ attributes: { role: 'textbox', class: 'ck-editor__editable_inline' } })
        }
        render() {
          super.render()
          const t = this._editingView,
            e = this.t
          t.change(n => {
            const i = t.document.getRoot(this.name)
            n.setAttribute('aria-label', e('Rich Text Editor, %0', this.name), i)
          })
        }
      }
      class Pd {
        constructor(t, e) {
          e && Xt(this, e), t && this.set(t)
        }
      }
      function kd(t) {
        return e => e + t
      }
      he(Pd, se)
      const Ad = kd('px'),
        Cd = Xo.document.body
      class Ed extends Ah {
        constructor(t) {
          super(t)
          const e = this.bindTemplate
          this.set('top', 0),
            this.set('left', 0),
            this.set('position', 'arrow_nw'),
            this.set('isVisible', !1),
            this.set('withArrow', !0),
            this.set('class'),
            (this.content = this.createCollection()),
            this.setTemplate({
              tag: 'div',
              attributes: {
                class: [
                  'ck',
                  'ck-balloon-panel',
                  e.to('position', t => `ck-balloon-panel_${t}`),
                  e.if('isVisible', 'ck-balloon-panel_visible'),
                  e.if('withArrow', 'ck-balloon-panel_with-arrow'),
                  e.to('class'),
                ],
                style: { top: e.to('top', Ad), left: e.to('left', Ad) },
              },
              children: this.content,
            })
        }
        show() {
          this.isVisible = !0
        }
        hide() {
          this.isVisible = !1
        }
        attachTo(t) {
          this.show()
          const e = Ed.defaultPositions,
            n = Object.assign(
              {},
              {
                element: this.element,
                positions: [
                  e.southArrowNorth,
                  e.southArrowNorthMiddleWest,
                  e.southArrowNorthMiddleEast,
                  e.southArrowNorthWest,
                  e.southArrowNorthEast,
                  e.northArrowSouth,
                  e.northArrowSouthMiddleWest,
                  e.northArrowSouthMiddleEast,
                  e.northArrowSouthWest,
                  e.northArrowSouthEast,
                  e.viewportStickyNorth,
                ],
                limiter: Cd,
                fitInViewport: !0,
              },
              t
            ),
            i = Ed._getOptimalPosition(n),
            s = parseInt(i.left),
            o = parseInt(i.top),
            { name: r, config: a = {} } = i,
            { withArrow: c = !0 } = a
          Object.assign(this, { top: o, left: s, position: r, withArrow: c })
        }
        pin(t) {
          this.unpin(),
            (this._pinWhenIsVisibleCallback = () => {
              this.isVisible ? this._startPinning(t) : this._stopPinning()
            }),
            this._startPinning(t),
            this.listenTo(this, 'change:isVisible', this._pinWhenIsVisibleCallback)
        }
        unpin() {
          this._pinWhenIsVisibleCallback &&
            (this._stopPinning(),
            this.stopListening(this, 'change:isVisible', this._pinWhenIsVisibleCallback),
            (this._pinWhenIsVisibleCallback = null),
            this.hide())
        }
        _startPinning(t) {
          this.attachTo(t)
          const e = Sd(t.target),
            n = t.limiter ? Sd(t.limiter) : Cd
          this.listenTo(
            Xo.document,
            'scroll',
            (i, s) => {
              const o = s.target,
                r = e && o.contains(e),
                a = n && o.contains(n)
              ;(!r && !a && e && n) || this.attachTo(t)
            },
            { useCapture: !0 }
          ),
            this.listenTo(Xo.window, 'resize', () => {
              this.attachTo(t)
            })
        }
        _stopPinning() {
          this.stopListening(Xo.document, 'scroll'), this.stopListening(Xo.window, 'resize')
        }
      }
      function Sd(t) {
        return yi(t) ? t : oa(t) ? t.commonAncestorContainer : 'function' == typeof t ? Sd(t()) : null
      }
      ;(Ed.arrowHorizontalOffset = 25),
        (Ed.arrowVerticalOffset = 10),
        (Ed.stickyVerticalOffset = 20),
        (Ed._getOptimalPosition = Qh),
        (Ed.defaultPositions = (function ({
          horizontalOffset: t = Ed.arrowHorizontalOffset,
          verticalOffset: e = Ed.arrowVerticalOffset,
          stickyVerticalOffset: n = Ed.stickyVerticalOffset,
          config: i,
        } = {}) {
          return {
            northWestArrowSouthWest: (e, n) => ({
              top: s(e, n),
              left: e.left - t,
              name: 'arrow_sw',
              ...(i && { config: i }),
            }),
            northWestArrowSouthMiddleWest: (e, n) => ({
              top: s(e, n),
              left: e.left - 0.25 * n.width - t,
              name: 'arrow_smw',
              ...(i && { config: i }),
            }),
            northWestArrowSouth: (t, e) => ({
              top: s(t, e),
              left: t.left - e.width / 2,
              name: 'arrow_s',
              ...(i && { config: i }),
            }),
            northWestArrowSouthMiddleEast: (e, n) => ({
              top: s(e, n),
              left: e.left - 0.75 * n.width + t,
              name: 'arrow_sme',
              ...(i && { config: i }),
            }),
            northWestArrowSouthEast: (e, n) => ({
              top: s(e, n),
              left: e.left - n.width + t,
              name: 'arrow_se',
              ...(i && { config: i }),
            }),
            northArrowSouthWest: (e, n) => ({
              top: s(e, n),
              left: e.left + e.width / 2 - t,
              name: 'arrow_sw',
              ...(i && { config: i }),
            }),
            northArrowSouthMiddleWest: (e, n) => ({
              top: s(e, n),
              left: e.left + e.width / 2 - 0.25 * n.width - t,
              name: 'arrow_smw',
              ...(i && { config: i }),
            }),
            northArrowSouth: (t, e) => ({
              top: s(t, e),
              left: t.left + t.width / 2 - e.width / 2,
              name: 'arrow_s',
              ...(i && { config: i }),
            }),
            northArrowSouthMiddleEast: (e, n) => ({
              top: s(e, n),
              left: e.left + e.width / 2 - 0.75 * n.width + t,
              name: 'arrow_sme',
              ...(i && { config: i }),
            }),
            northArrowSouthEast: (e, n) => ({
              top: s(e, n),
              left: e.left + e.width / 2 - n.width + t,
              name: 'arrow_se',
              ...(i && { config: i }),
            }),
            northEastArrowSouthWest: (e, n) => ({
              top: s(e, n),
              left: e.right - t,
              name: 'arrow_sw',
              ...(i && { config: i }),
            }),
            northEastArrowSouthMiddleWest: (e, n) => ({
              top: s(e, n),
              left: e.right - 0.25 * n.width - t,
              name: 'arrow_smw',
              ...(i && { config: i }),
            }),
            northEastArrowSouth: (t, e) => ({
              top: s(t, e),
              left: t.right - e.width / 2,
              name: 'arrow_s',
              ...(i && { config: i }),
            }),
            northEastArrowSouthMiddleEast: (e, n) => ({
              top: s(e, n),
              left: e.right - 0.75 * n.width + t,
              name: 'arrow_sme',
              ...(i && { config: i }),
            }),
            northEastArrowSouthEast: (e, n) => ({
              top: s(e, n),
              left: e.right - n.width + t,
              name: 'arrow_se',
              ...(i && { config: i }),
            }),
            southWestArrowNorthWest: (e, n) => ({
              top: o(e),
              left: e.left - t,
              name: 'arrow_nw',
              ...(i && { config: i }),
            }),
            southWestArrowNorthMiddleWest: (e, n) => ({
              top: o(e),
              left: e.left - 0.25 * n.width - t,
              name: 'arrow_nmw',
              ...(i && { config: i }),
            }),
            southWestArrowNorth: (t, e) => ({
              top: o(t),
              left: t.left - e.width / 2,
              name: 'arrow_n',
              ...(i && { config: i }),
            }),
            southWestArrowNorthMiddleEast: (e, n) => ({
              top: o(e),
              left: e.left - 0.75 * n.width + t,
              name: 'arrow_nme',
              ...(i && { config: i }),
            }),
            southWestArrowNorthEast: (e, n) => ({
              top: o(e),
              left: e.left - n.width + t,
              name: 'arrow_ne',
              ...(i && { config: i }),
            }),
            southArrowNorthWest: (e, n) => ({
              top: o(e),
              left: e.left + e.width / 2 - t,
              name: 'arrow_nw',
              ...(i && { config: i }),
            }),
            southArrowNorthMiddleWest: (e, n) => ({
              top: o(e),
              left: e.left + e.width / 2 - 0.25 * n.width - t,
              name: 'arrow_nmw',
              ...(i && { config: i }),
            }),
            southArrowNorth: (t, e) => ({
              top: o(t),
              left: t.left + t.width / 2 - e.width / 2,
              name: 'arrow_n',
              ...(i && { config: i }),
            }),
            southArrowNorthMiddleEast: (e, n) => ({
              top: o(e),
              left: e.left + e.width / 2 - 0.75 * n.width + t,
              name: 'arrow_nme',
              ...(i && { config: i }),
            }),
            southArrowNorthEast: (e, n) => ({
              top: o(e),
              left: e.left + e.width / 2 - n.width + t,
              name: 'arrow_ne',
              ...(i && { config: i }),
            }),
            southEastArrowNorthWest: (e, n) => ({
              top: o(e),
              left: e.right - t,
              name: 'arrow_nw',
              ...(i && { config: i }),
            }),
            southEastArrowNorthMiddleWest: (e, n) => ({
              top: o(e),
              left: e.right - 0.25 * n.width - t,
              name: 'arrow_nmw',
              ...(i && { config: i }),
            }),
            southEastArrowNorth: (t, e) => ({
              top: o(t),
              left: t.right - e.width / 2,
              name: 'arrow_n',
              ...(i && { config: i }),
            }),
            southEastArrowNorthMiddleEast: (e, n) => ({
              top: o(e),
              left: e.right - 0.75 * n.width + t,
              name: 'arrow_nme',
              ...(i && { config: i }),
            }),
            southEastArrowNorthEast: (e, n) => ({
              top: o(e),
              left: e.right - n.width + t,
              name: 'arrow_ne',
              ...(i && { config: i }),
            }),
            viewportStickyNorth: (t, e, s) =>
              t.getIntersection(s)
                ? {
                    top: s.top + n,
                    left: t.left + t.width / 2 - e.width / 2,
                    name: 'arrowless',
                    config: { withArrow: !1, ...i },
                  }
                : null,
          }
          function s(t, n) {
            return t.top - n.height - e
          }
          function o(t) {
            return t.bottom + e
          }
        })())
      kd('px')
      const xd = kd('px')
      class Td extends Ah {
        constructor(t) {
          super(t)
          const e = this.bindTemplate
          this.set('isActive', !1),
            this.set('isSticky', !1),
            this.set('limiterElement', null),
            this.set('limiterBottomOffset', 50),
            this.set('viewportTopOffset', 0),
            this.set('_marginLeft', null),
            this.set('_isStickyToTheLimiter', !1),
            this.set('_hasViewportTopOffset', !1),
            (this.content = this.createCollection()),
            (this._contentPanelPlaceholder = new Ch({
              tag: 'div',
              attributes: {
                class: ['ck', 'ck-sticky-panel__placeholder'],
                style: {
                  display: e.to('isSticky', t => (t ? 'block' : 'none')),
                  height: e.to('isSticky', t => (t ? xd(this._panelRect.height) : null)),
                },
              },
            }).render()),
            (this._contentPanel = new Ch({
              tag: 'div',
              attributes: {
                class: [
                  'ck',
                  'ck-sticky-panel__content',
                  e.if('isSticky', 'ck-sticky-panel__content_sticky'),
                  e.if('_isStickyToTheLimiter', 'ck-sticky-panel__content_sticky_bottom-limit'),
                ],
                style: {
                  width: e.to('isSticky', t =>
                    t ? xd(this._contentPanelPlaceholder.getBoundingClientRect().width) : null
                  ),
                  top: e.to('_hasViewportTopOffset', t => (t ? xd(this.viewportTopOffset) : null)),
                  bottom: e.to('_isStickyToTheLimiter', t => (t ? xd(this.limiterBottomOffset) : null)),
                  marginLeft: e.to('_marginLeft'),
                },
              },
              children: this.content,
            }).render()),
            this.setTemplate({
              tag: 'div',
              attributes: { class: ['ck', 'ck-sticky-panel'] },
              children: [this._contentPanelPlaceholder, this._contentPanel],
            })
        }
        render() {
          super.render(),
            this._checkIfShouldBeSticky(),
            this.listenTo(Xo.window, 'scroll', () => {
              this._checkIfShouldBeSticky()
            }),
            this.listenTo(this, 'change:isActive', () => {
              this._checkIfShouldBeSticky()
            })
        }
        _checkIfShouldBeSticky() {
          const t = (this._panelRect = this._contentPanel.getBoundingClientRect())
          let e
          this.limiterElement
            ? ((e = this._limiterRect = this.limiterElement.getBoundingClientRect()),
              (this.isSticky =
                this.isActive &&
                e.top < this.viewportTopOffset &&
                this._panelRect.height + this.limiterBottomOffset < e.height))
            : (this.isSticky = !1),
            this.isSticky
              ? ((this._isStickyToTheLimiter = e.bottom < t.height + this.limiterBottomOffset + this.viewportTopOffset),
                (this._hasViewportTopOffset = !this._isStickyToTheLimiter && !!this.viewportTopOffset),
                (this._marginLeft = this._isStickyToTheLimiter ? null : xd(-Xo.window.scrollX)))
              : ((this._isStickyToTheLimiter = !1), (this._hasViewportTopOffset = !1), (this._marginLeft = null))
        }
      }
      kd('px')
      kd('px')
      kd('px')
      const Rd = new WeakMap()
      function Od(t, e) {
        return !!e.hasClass('ck-placeholder') && (t.removeClass('ck-placeholder', e), !0)
      }
      function Id(t, e) {
        const n = Rd.get(t),
          i = []
        let s = !1
        for (const [t, o] of n) o.isDirectHost && (i.push(t), Md(e, t, o) && (s = !0))
        for (const [t, o] of n) {
          if (o.isDirectHost) continue
          const n = Nd(t)
          n && (i.includes(n) || ((o.hostElement = n), Md(e, t, o) && (s = !0)))
        }
        return s
      }
      function Md(t, e, n) {
        const { text: i, isDirectHost: s, hostElement: o } = n
        let r = !1
        o.getAttribute('data-placeholder') !== i && (t.setAttribute('data-placeholder', i, o), (r = !0))
        return (
          (s || 1 == e.childCount) &&
          (function (t, e) {
            if (!t.isAttached()) return !1
            const n = Array.from(t.getChildren()).some(t => !t.is('uiElement'))
            if (n) return !1
            if (e) return !0
            const i = t.document
            if (!i.isFocused) return !0
            const s = i.selection.anchor
            return s && s.parent !== t
          })(o, n.keepOnFocus)
            ? (function (t, e) {
                return !e.hasClass('ck-placeholder') && (t.addClass('ck-placeholder', e), !0)
              })(t, o) && (r = !0)
            : Od(t, o) && (r = !0),
          r
        )
      }
      function Nd(t) {
        if (t.childCount) {
          const e = t.getChild(0)
          if (e.is('element') && !e.is('uiElement') && !e.is('attributeElement')) return e
        }
        return null
      }
      const Dd = new Map()
      function Fd(t, e, n) {
        let i = Dd.get(t)
        i || ((i = new Map()), Dd.set(t, i)), i.set(e, n)
      }
      function Bd(t) {
        return [t]
      }
      function Vd(t, e, n = {}) {
        const i = (function (t, e) {
          const n = Dd.get(t)
          return n && n.has(e) ? n.get(e) : Bd
        })(t.constructor, e.constructor)
        try {
          return i((t = t.clone()), e, n)
        } catch (t) {
          throw t
        }
      }
      function Ld(t, e, n) {
        ;(t = t.slice()), (e = e.slice())
        const i = new jd(n.document, n.useRelations, n.forceWeakRemove)
        i.setOriginalOperations(t), i.setOriginalOperations(e)
        const s = i.originalOperations
        if (0 == t.length || 0 == e.length) return { operationsA: t, operationsB: e, originalOperations: s }
        const o = new WeakMap()
        for (const e of t) o.set(e, 0)
        const r = {
          nextBaseVersionA: t[t.length - 1].baseVersion + 1,
          nextBaseVersionB: e[e.length - 1].baseVersion + 1,
          originalOperationsACount: t.length,
          originalOperationsBCount: e.length,
        }
        let a = 0
        for (; a < t.length; ) {
          const n = t[a],
            s = o.get(n)
          if (s == e.length) {
            a++
            continue
          }
          const r = e[s],
            c = Vd(n, r, i.getContext(n, r, !0)),
            l = Vd(r, n, i.getContext(r, n, !1))
          i.updateRelation(n, r), i.setOriginalOperations(c, n), i.setOriginalOperations(l, r)
          for (const t of c) o.set(t, s + l.length)
          t.splice(a, 1, ...c), e.splice(s, 1, ...l)
        }
        if (n.padWithNoOps) {
          const n = t.length - r.originalOperationsACount,
            i = e.length - r.originalOperationsBCount
          zd(t, i - n), zd(e, n - i)
        }
        return (
          Wd(t, r.nextBaseVersionB),
          Wd(e, r.nextBaseVersionA),
          { operationsA: t, operationsB: e, originalOperations: s }
        )
      }
      class jd {
        constructor(t, e, n = !1) {
          ;(this.originalOperations = new Map()),
            (this._history = t.history),
            (this._useRelations = e),
            (this._forceWeakRemove = !!n),
            (this._relations = new Map())
        }
        setOriginalOperations(t, e = null) {
          const n = e ? this.originalOperations.get(e) : null
          for (const e of t) this.originalOperations.set(e, n || e)
        }
        updateRelation(t, e) {
          switch (t.constructor) {
            case gl:
              switch (e.constructor) {
                case yl:
                  t.targetPosition.isEqual(e.sourcePosition) || e.movedRange.containsPosition(t.targetPosition)
                    ? this._setRelation(t, e, 'insertAtSource')
                    : t.targetPosition.isEqual(e.deletionPosition)
                    ? this._setRelation(t, e, 'insertBetween')
                    : t.targetPosition.isAfter(e.sourcePosition) && this._setRelation(t, e, 'moveTargetAfter')
                  break
                case gl:
                  t.targetPosition.isEqual(e.sourcePosition) || t.targetPosition.isBefore(e.sourcePosition)
                    ? this._setRelation(t, e, 'insertBefore')
                    : this._setRelation(t, e, 'insertAfter')
              }
              break
            case vl:
              switch (e.constructor) {
                case yl:
                  t.splitPosition.isBefore(e.sourcePosition) && this._setRelation(t, e, 'splitBefore')
                  break
                case gl:
                  if (t.splitPosition.isEqual(e.sourcePosition) || t.splitPosition.isBefore(e.sourcePosition))
                    this._setRelation(t, e, 'splitBefore')
                  else {
                    const n = ja._createFromPositionAndShift(e.sourcePosition, e.howMany)
                    if (t.splitPosition.hasSameParentAs(e.sourcePosition) && n.containsPosition(t.splitPosition)) {
                      const i = n.end.offset - t.splitPosition.offset,
                        s = t.splitPosition.offset - n.start.offset
                      this._setRelation(t, e, { howMany: i, offset: s })
                    }
                  }
              }
              break
            case yl:
              switch (e.constructor) {
                case yl:
                  t.targetPosition.isEqual(e.sourcePosition) || this._setRelation(t, e, 'mergeTargetNotMoved'),
                    t.sourcePosition.isEqual(e.targetPosition) && this._setRelation(t, e, 'mergeSourceNotMoved'),
                    t.sourcePosition.isEqual(e.sourcePosition) && this._setRelation(t, e, 'mergeSameElement')
                  break
                case vl:
                  t.sourcePosition.isEqual(e.splitPosition) && this._setRelation(t, e, 'splitAtSource')
              }
              break
            case _l: {
              const n = t.newRange
              if (!n) return
              switch (e.constructor) {
                case gl: {
                  const i = ja._createFromPositionAndShift(e.sourcePosition, e.howMany),
                    s = i.containsPosition(n.start) || i.start.isEqual(n.start),
                    o = i.containsPosition(n.end) || i.end.isEqual(n.end)
                  ;(!s && !o) ||
                    i.containsRange(n) ||
                    this._setRelation(t, e, {
                      side: s ? 'left' : 'right',
                      path: s ? n.start.path.slice() : n.end.path.slice(),
                    })
                  break
                }
                case yl: {
                  const i = n.start.isEqual(e.targetPosition),
                    s = n.start.isEqual(e.deletionPosition),
                    o = n.end.isEqual(e.deletionPosition),
                    r = n.end.isEqual(e.sourcePosition)
                  ;(i || s || o || r) &&
                    this._setRelation(t, e, {
                      wasInLeftElement: i,
                      wasStartBeforeMergedElement: s,
                      wasEndBeforeMergedElement: o,
                      wasInRightElement: r,
                    })
                  break
                }
              }
              break
            }
          }
        }
        getContext(t, e, n) {
          return {
            aIsStrong: n,
            aWasUndone: this._wasUndone(t),
            bWasUndone: this._wasUndone(e),
            abRelation: this._useRelations ? this._getRelation(t, e) : null,
            baRelation: this._useRelations ? this._getRelation(e, t) : null,
            forceWeakRemove: this._forceWeakRemove,
          }
        }
        _wasUndone(t) {
          const e = this.originalOperations.get(t)
          return e.wasUndone || this._history.isUndoneOperation(e)
        }
        _getRelation(t, e) {
          const n = this.originalOperations.get(e),
            i = this._history.getUndoneOperation(n)
          if (!i) return null
          const s = this.originalOperations.get(t),
            o = this._relations.get(s)
          return (o && o.get(i)) || null
        }
        _setRelation(t, e, n) {
          const i = this.originalOperations.get(t),
            s = this.originalOperations.get(e)
          let o = this._relations.get(i)
          o || ((o = new Map()), this._relations.set(i, o)), o.set(s, n)
        }
      }
      function Wd(t, e) {
        for (const n of t) n.baseVersion = e++
      }
      function zd(t, e) {
        for (let n = 0; n < e; n++) t.push(new $l(0))
      }
      function $d(t, e, n) {
        const i = t.nodes.getNode(0).getAttribute(e)
        if (i == n) return null
        const s = new ja(t.position, t.position.getShiftedBy(t.howMany))
        return new fl(s, e, i, n, 0)
      }
      function qd(t, e) {
        return null === t.targetPosition._getTransformedByDeletion(e.sourcePosition, e.howMany)
      }
      function Ud(t, e) {
        const n = []
        for (let i = 0; i < t.length; i++) {
          const s = t[i],
            o = new gl(s.start, s.end.offset - s.start.offset, e, 0)
          n.push(o)
          for (let e = i + 1; e < t.length; e++)
            t[e] = t[e]._getTransformedByMove(o.sourcePosition, o.targetPosition, o.howMany)[0]
          e = e._getTransformedByMove(o.sourcePosition, o.targetPosition, o.howMany)
        }
        return n
      }
      Fd(fl, fl, (t, e, n) => {
        if (t.key === e.key && t.range.start.hasSameParentAs(e.range.start)) {
          const i = t.range.getDifference(e.range).map(e => new fl(e, t.key, t.oldValue, t.newValue, 0)),
            s = t.range.getIntersection(e.range)
          return (
            s && n.aIsStrong && i.push(new fl(s, e.key, e.newValue, t.newValue, 0)), 0 == i.length ? [new $l(0)] : i
          )
        }
        return [t]
      }),
        Fd(fl, pl, (t, e) => {
          if (t.range.start.hasSameParentAs(e.position) && t.range.containsPosition(e.position)) {
            const n = t.range
              ._getTransformedByInsertion(e.position, e.howMany, !e.shouldReceiveAttributes)
              .map(e => new fl(e, t.key, t.oldValue, t.newValue, t.baseVersion))
            if (e.shouldReceiveAttributes) {
              const i = $d(e, t.key, t.oldValue)
              i && n.unshift(i)
            }
            return n
          }
          return (t.range = t.range._getTransformedByInsertion(e.position, e.howMany, !1)[0]), [t]
        }),
        Fd(fl, yl, (t, e) => {
          const n = []
          t.range.start.hasSameParentAs(e.deletionPosition) &&
            (t.range.containsPosition(e.deletionPosition) || t.range.start.isEqual(e.deletionPosition)) &&
            n.push(ja._createFromPositionAndShift(e.graveyardPosition, 1))
          const i = t.range._getTransformedByMergeOperation(e)
          return i.isCollapsed || n.push(i), n.map(e => new fl(e, t.key, t.oldValue, t.newValue, t.baseVersion))
        }),
        Fd(fl, gl, (t, e) => {
          const n = (function (t, e) {
            const n = ja._createFromPositionAndShift(e.sourcePosition, e.howMany)
            let i = null,
              s = []
            n.containsRange(t, !0)
              ? (i = t)
              : t.start.hasSameParentAs(n.start)
              ? ((s = t.getDifference(n)), (i = t.getIntersection(n)))
              : (s = [t])
            const o = []
            for (let t of s) {
              t = t._getTransformedByDeletion(e.sourcePosition, e.howMany)
              const n = e.getMovedRangeStart(),
                i = t.start.hasSameParentAs(n)
              ;(t = t._getTransformedByInsertion(n, e.howMany, i)), o.push(...t)
            }
            i && o.push(i._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany, !1)[0])
            return o
          })(t.range, e)
          return n.map(e => new fl(e, t.key, t.oldValue, t.newValue, t.baseVersion))
        }),
        Fd(fl, vl, (t, e) => {
          if (t.range.end.isEqual(e.insertionPosition)) return e.graveyardPosition || t.range.end.offset++, [t]
          if (t.range.start.hasSameParentAs(e.splitPosition) && t.range.containsPosition(e.splitPosition)) {
            const n = t.clone()
            return (
              (n.range = new ja(
                e.moveTargetPosition.clone(),
                t.range.end._getCombined(e.splitPosition, e.moveTargetPosition)
              )),
              (t.range.end = e.splitPosition.clone()),
              (t.range.end.stickiness = 'toPrevious'),
              [t, n]
            )
          }
          return (t.range = t.range._getTransformedBySplitOperation(e)), [t]
        }),
        Fd(pl, fl, (t, e) => {
          const n = [t]
          if (
            t.shouldReceiveAttributes &&
            t.position.hasSameParentAs(e.range.start) &&
            e.range.containsPosition(t.position)
          ) {
            const i = $d(t, e.key, e.newValue)
            i && n.push(i)
          }
          return n
        }),
        Fd(
          pl,
          pl,
          (t, e, n) => (
            (t.position.isEqual(e.position) && n.aIsStrong) ||
              (t.position = t.position._getTransformedByInsertOperation(e)),
            [t]
          )
        ),
        Fd(pl, gl, (t, e) => ((t.position = t.position._getTransformedByMoveOperation(e)), [t])),
        Fd(pl, vl, (t, e) => ((t.position = t.position._getTransformedBySplitOperation(e)), [t])),
        Fd(pl, yl, (t, e) => ((t.position = t.position._getTransformedByMergeOperation(e)), [t])),
        Fd(
          _l,
          pl,
          (t, e) => (
            t.oldRange && (t.oldRange = t.oldRange._getTransformedByInsertOperation(e)[0]),
            t.newRange && (t.newRange = t.newRange._getTransformedByInsertOperation(e)[0]),
            [t]
          )
        ),
        Fd(_l, _l, (t, e, n) => {
          if (t.name == e.name) {
            if (!n.aIsStrong) return [new $l(0)]
            t.oldRange = e.newRange ? e.newRange.clone() : null
          }
          return [t]
        }),
        Fd(
          _l,
          yl,
          (t, e) => (
            t.oldRange && (t.oldRange = t.oldRange._getTransformedByMergeOperation(e)),
            t.newRange && (t.newRange = t.newRange._getTransformedByMergeOperation(e)),
            [t]
          )
        ),
        Fd(_l, gl, (t, e, n) => {
          if (
            (t.oldRange && (t.oldRange = ja._createFromRanges(t.oldRange._getTransformedByMoveOperation(e))),
            t.newRange)
          ) {
            if (n.abRelation) {
              const i = ja._createFromRanges(t.newRange._getTransformedByMoveOperation(e))
              if ('left' == n.abRelation.side && e.targetPosition.isEqual(t.newRange.start))
                return (t.newRange.start.path = n.abRelation.path), (t.newRange.end = i.end), [t]
              if ('right' == n.abRelation.side && e.targetPosition.isEqual(t.newRange.end))
                return (t.newRange.start = i.start), (t.newRange.end.path = n.abRelation.path), [t]
            }
            t.newRange = ja._createFromRanges(t.newRange._getTransformedByMoveOperation(e))
          }
          return [t]
        }),
        Fd(_l, vl, (t, e, n) => {
          if ((t.oldRange && (t.oldRange = t.oldRange._getTransformedBySplitOperation(e)), t.newRange)) {
            if (n.abRelation) {
              const i = t.newRange._getTransformedBySplitOperation(e)
              return (
                t.newRange.start.isEqual(e.splitPosition) && n.abRelation.wasStartBeforeMergedElement
                  ? (t.newRange.start = Fa._createAt(e.insertionPosition))
                  : t.newRange.start.isEqual(e.splitPosition) &&
                    !n.abRelation.wasInLeftElement &&
                    (t.newRange.start = Fa._createAt(e.moveTargetPosition)),
                t.newRange.end.isEqual(e.splitPosition) && n.abRelation.wasInRightElement
                  ? (t.newRange.end = Fa._createAt(e.moveTargetPosition))
                  : t.newRange.end.isEqual(e.splitPosition) && n.abRelation.wasEndBeforeMergedElement
                  ? (t.newRange.end = Fa._createAt(e.insertionPosition))
                  : (t.newRange.end = i.end),
                [t]
              )
            }
            t.newRange = t.newRange._getTransformedBySplitOperation(e)
          }
          return [t]
        }),
        Fd(
          yl,
          pl,
          (t, e) => (
            t.sourcePosition.hasSameParentAs(e.position) && (t.howMany += e.howMany),
            (t.sourcePosition = t.sourcePosition._getTransformedByInsertOperation(e)),
            (t.targetPosition = t.targetPosition._getTransformedByInsertOperation(e)),
            [t]
          )
        ),
        Fd(yl, yl, (t, e, n) => {
          if (t.sourcePosition.isEqual(e.sourcePosition) && t.targetPosition.isEqual(e.targetPosition)) {
            if (n.bWasUndone) {
              const n = e.graveyardPosition.path.slice()
              return n.push(0), (t.sourcePosition = new Fa(e.graveyardPosition.root, n)), (t.howMany = 0), [t]
            }
            return [new $l(0)]
          }
          if (
            t.sourcePosition.isEqual(e.sourcePosition) &&
            !t.targetPosition.isEqual(e.targetPosition) &&
            !n.bWasUndone &&
            'splitAtSource' != n.abRelation
          ) {
            const i = '$graveyard' == t.targetPosition.root.rootName,
              s = '$graveyard' == e.targetPosition.root.rootName,
              o = i && !s
            if ((s && !i) || (!o && n.aIsStrong)) {
              const n = e.targetPosition._getTransformedByMergeOperation(e),
                i = t.targetPosition._getTransformedByMergeOperation(e)
              return [new gl(n, t.howMany, i, 0)]
            }
            return [new $l(0)]
          }
          return (
            t.sourcePosition.hasSameParentAs(e.targetPosition) && (t.howMany += e.howMany),
            (t.sourcePosition = t.sourcePosition._getTransformedByMergeOperation(e)),
            (t.targetPosition = t.targetPosition._getTransformedByMergeOperation(e)),
            (t.graveyardPosition.isEqual(e.graveyardPosition) && n.aIsStrong) ||
              (t.graveyardPosition = t.graveyardPosition._getTransformedByMergeOperation(e)),
            [t]
          )
        }),
        Fd(yl, gl, (t, e, n) => {
          const i = ja._createFromPositionAndShift(e.sourcePosition, e.howMany)
          return 'remove' == e.type &&
            !n.bWasUndone &&
            !n.forceWeakRemove &&
            t.deletionPosition.hasSameParentAs(e.sourcePosition) &&
            i.containsPosition(t.sourcePosition)
            ? [new $l(0)]
            : (t.sourcePosition.hasSameParentAs(e.targetPosition) && (t.howMany += e.howMany),
              t.sourcePosition.hasSameParentAs(e.sourcePosition) && (t.howMany -= e.howMany),
              (t.sourcePosition = t.sourcePosition._getTransformedByMoveOperation(e)),
              (t.targetPosition = t.targetPosition._getTransformedByMoveOperation(e)),
              t.graveyardPosition.isEqual(e.targetPosition) ||
                (t.graveyardPosition = t.graveyardPosition._getTransformedByMoveOperation(e)),
              [t])
        }),
        Fd(yl, vl, (t, e, n) => {
          if (
            (e.graveyardPosition &&
              ((t.graveyardPosition = t.graveyardPosition._getTransformedByDeletion(e.graveyardPosition, 1)),
              t.deletionPosition.isEqual(e.graveyardPosition) && (t.howMany = e.howMany)),
            t.targetPosition.isEqual(e.splitPosition))
          ) {
            const i = 0 != e.howMany,
              s = e.graveyardPosition && t.deletionPosition.isEqual(e.graveyardPosition)
            if (i || s || 'mergeTargetNotMoved' == n.abRelation)
              return (t.sourcePosition = t.sourcePosition._getTransformedBySplitOperation(e)), [t]
          }
          if (t.sourcePosition.isEqual(e.splitPosition)) {
            if ('mergeSourceNotMoved' == n.abRelation)
              return (t.howMany = 0), (t.targetPosition = t.targetPosition._getTransformedBySplitOperation(e)), [t]
            if ('mergeSameElement' == n.abRelation || t.sourcePosition.offset > 0)
              return (
                (t.sourcePosition = e.moveTargetPosition.clone()),
                (t.targetPosition = t.targetPosition._getTransformedBySplitOperation(e)),
                [t]
              )
          }
          return (
            t.sourcePosition.hasSameParentAs(e.splitPosition) && (t.howMany = e.splitPosition.offset),
            (t.sourcePosition = t.sourcePosition._getTransformedBySplitOperation(e)),
            (t.targetPosition = t.targetPosition._getTransformedBySplitOperation(e)),
            [t]
          )
        }),
        Fd(gl, pl, (t, e) => {
          const n = ja
            ._createFromPositionAndShift(t.sourcePosition, t.howMany)
            ._getTransformedByInsertOperation(e, !1)[0]
          return (
            (t.sourcePosition = n.start),
            (t.howMany = n.end.offset - n.start.offset),
            t.targetPosition.isEqual(e.position) ||
              (t.targetPosition = t.targetPosition._getTransformedByInsertOperation(e)),
            [t]
          )
        }),
        Fd(gl, gl, (t, e, n) => {
          const i = ja._createFromPositionAndShift(t.sourcePosition, t.howMany),
            s = ja._createFromPositionAndShift(e.sourcePosition, e.howMany)
          let o,
            r = n.aIsStrong,
            a = !n.aIsStrong
          if (
            ('insertBefore' == n.abRelation || 'insertAfter' == n.baRelation
              ? (a = !0)
              : ('insertAfter' != n.abRelation && 'insertBefore' != n.baRelation) || (a = !1),
            (o =
              t.targetPosition.isEqual(e.targetPosition) && a
                ? t.targetPosition._getTransformedByDeletion(e.sourcePosition, e.howMany)
                : t.targetPosition._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany)),
            qd(t, e) && qd(e, t))
          )
            return [e.getReversed()]
          if (i.containsPosition(e.targetPosition) && i.containsRange(s, !0))
            return (
              (i.start = i.start._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany)),
              (i.end = i.end._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany)),
              Ud([i], o)
            )
          if (s.containsPosition(t.targetPosition) && s.containsRange(i, !0))
            return (
              (i.start = i.start._getCombined(e.sourcePosition, e.getMovedRangeStart())),
              (i.end = i.end._getCombined(e.sourcePosition, e.getMovedRangeStart())),
              Ud([i], o)
            )
          const c = Ni(t.sourcePosition.getParentPath(), e.sourcePosition.getParentPath())
          if ('prefix' == c || 'extension' == c)
            return (
              (i.start = i.start._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany)),
              (i.end = i.end._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany)),
              Ud([i], o)
            )
          'remove' != t.type || 'remove' == e.type || n.aWasUndone || n.forceWeakRemove
            ? 'remove' == t.type || 'remove' != e.type || n.bWasUndone || n.forceWeakRemove || (r = !1)
            : (r = !0)
          const l = [],
            h = i.getDifference(s)
          for (const t of h) {
            ;(t.start = t.start._getTransformedByDeletion(e.sourcePosition, e.howMany)),
              (t.end = t.end._getTransformedByDeletion(e.sourcePosition, e.howMany))
            const n = 'same' == Ni(t.start.getParentPath(), e.getMovedRangeStart().getParentPath()),
              i = t._getTransformedByInsertion(e.getMovedRangeStart(), e.howMany, n)
            l.push(...i)
          }
          const d = i.getIntersection(s)
          return (
            null !== d &&
              r &&
              ((d.start = d.start._getCombined(e.sourcePosition, e.getMovedRangeStart())),
              (d.end = d.end._getCombined(e.sourcePosition, e.getMovedRangeStart())),
              0 === l.length
                ? l.push(d)
                : 1 == l.length
                ? s.start.isBefore(i.start) || s.start.isEqual(i.start)
                  ? l.unshift(d)
                  : l.push(d)
                : l.splice(1, 0, d)),
            0 === l.length ? [new $l(t.baseVersion)] : Ud(l, o)
          )
        }),
        Fd(gl, vl, (t, e, n) => {
          let i = t.targetPosition.clone()
          ;(t.targetPosition.isEqual(e.insertionPosition) &&
            e.graveyardPosition &&
            'moveTargetAfter' != n.abRelation) ||
            (i = t.targetPosition._getTransformedBySplitOperation(e))
          const s = ja._createFromPositionAndShift(t.sourcePosition, t.howMany)
          if (s.end.isEqual(e.insertionPosition)) return e.graveyardPosition || t.howMany++, (t.targetPosition = i), [t]
          if (s.start.hasSameParentAs(e.splitPosition) && s.containsPosition(e.splitPosition)) {
            let t = new ja(e.splitPosition, s.end)
            t = t._getTransformedBySplitOperation(e)
            return Ud([new ja(s.start, e.splitPosition), t], i)
          }
          t.targetPosition.isEqual(e.splitPosition) && 'insertAtSource' == n.abRelation && (i = e.moveTargetPosition),
            t.targetPosition.isEqual(e.insertionPosition) && 'insertBetween' == n.abRelation && (i = t.targetPosition)
          const o = [s._getTransformedBySplitOperation(e)]
          if (e.graveyardPosition) {
            const i = s.start.isEqual(e.graveyardPosition) || s.containsPosition(e.graveyardPosition)
            t.howMany > 1 && i && !n.aWasUndone && o.push(ja._createFromPositionAndShift(e.insertionPosition, 1))
          }
          return Ud(o, i)
        }),
        Fd(gl, yl, (t, e, n) => {
          const i = ja._createFromPositionAndShift(t.sourcePosition, t.howMany)
          if (e.deletionPosition.hasSameParentAs(t.sourcePosition) && i.containsPosition(e.sourcePosition))
            if ('remove' != t.type || n.forceWeakRemove) {
              if (1 == t.howMany)
                return n.bWasUndone
                  ? ((t.sourcePosition = e.graveyardPosition.clone()),
                    (t.targetPosition = t.targetPosition._getTransformedByMergeOperation(e)),
                    [t])
                  : [new $l(0)]
            } else if (!n.aWasUndone) {
              const n = []
              let i = e.graveyardPosition.clone(),
                s = e.targetPosition._getTransformedByMergeOperation(e)
              t.howMany > 1 &&
                (n.push(new gl(t.sourcePosition, t.howMany - 1, t.targetPosition, 0)),
                (i = i._getTransformedByMove(t.sourcePosition, t.targetPosition, t.howMany - 1)),
                (s = s._getTransformedByMove(t.sourcePosition, t.targetPosition, t.howMany - 1)))
              const o = e.deletionPosition._getCombined(t.sourcePosition, t.targetPosition),
                r = new gl(i, 1, o, 0),
                a = r.getMovedRangeStart().path.slice()
              a.push(0)
              const c = new Fa(r.targetPosition.root, a)
              s = s._getTransformedByMove(i, o, 1)
              const l = new gl(s, e.howMany, c, 0)
              return n.push(r), n.push(l), n
            }
          const s = ja._createFromPositionAndShift(t.sourcePosition, t.howMany)._getTransformedByMergeOperation(e)
          return (
            (t.sourcePosition = s.start),
            (t.howMany = s.end.offset - s.start.offset),
            (t.targetPosition = t.targetPosition._getTransformedByMergeOperation(e)),
            [t]
          )
        }),
        Fd(wl, pl, (t, e) => ((t.position = t.position._getTransformedByInsertOperation(e)), [t])),
        Fd(wl, yl, (t, e) =>
          t.position.isEqual(e.deletionPosition)
            ? ((t.position = e.graveyardPosition.clone()), (t.position.stickiness = 'toNext'), [t])
            : ((t.position = t.position._getTransformedByMergeOperation(e)), [t])
        ),
        Fd(wl, gl, (t, e) => ((t.position = t.position._getTransformedByMoveOperation(e)), [t])),
        Fd(wl, wl, (t, e, n) => {
          if (t.position.isEqual(e.position)) {
            if (!n.aIsStrong) return [new $l(0)]
            t.oldName = e.newName
          }
          return [t]
        }),
        Fd(wl, vl, (t, e) => {
          if ('same' == Ni(t.position.path, e.splitPosition.getParentPath()) && !e.graveyardPosition) {
            const e = new wl(t.position.getShiftedBy(1), t.oldName, t.newName, 0)
            return [t, e]
          }
          return (t.position = t.position._getTransformedBySplitOperation(e)), [t]
        }),
        Fd(bl, bl, (t, e, n) => {
          if (t.root === e.root && t.key === e.key) {
            if (!n.aIsStrong || t.newValue === e.newValue) return [new $l(0)]
            t.oldValue = e.newValue
          }
          return [t]
        }),
        Fd(
          vl,
          pl,
          (t, e) => (
            t.splitPosition.hasSameParentAs(e.position) &&
              t.splitPosition.offset < e.position.offset &&
              (t.howMany += e.howMany),
            (t.splitPosition = t.splitPosition._getTransformedByInsertOperation(e)),
            (t.insertionPosition = t.insertionPosition._getTransformedByInsertOperation(e)),
            [t]
          )
        ),
        Fd(vl, yl, (t, e, n) => {
          if (!t.graveyardPosition && !n.bWasUndone && t.splitPosition.hasSameParentAs(e.sourcePosition)) {
            const n = e.graveyardPosition.path.slice()
            n.push(0)
            const i = new Fa(e.graveyardPosition.root, n),
              s = vl.getInsertionPosition(new Fa(e.graveyardPosition.root, n)),
              o = new vl(i, 0, s, null, 0)
            return (
              (t.splitPosition = t.splitPosition._getTransformedByMergeOperation(e)),
              (t.insertionPosition = vl.getInsertionPosition(t.splitPosition)),
              (t.graveyardPosition = o.insertionPosition.clone()),
              (t.graveyardPosition.stickiness = 'toNext'),
              [o, t]
            )
          }
          return (
            t.splitPosition.hasSameParentAs(e.deletionPosition) &&
              !t.splitPosition.isAfter(e.deletionPosition) &&
              t.howMany--,
            t.splitPosition.hasSameParentAs(e.targetPosition) && (t.howMany += e.howMany),
            (t.splitPosition = t.splitPosition._getTransformedByMergeOperation(e)),
            (t.insertionPosition = vl.getInsertionPosition(t.splitPosition)),
            t.graveyardPosition && (t.graveyardPosition = t.graveyardPosition._getTransformedByMergeOperation(e)),
            [t]
          )
        }),
        Fd(vl, gl, (t, e, n) => {
          const i = ja._createFromPositionAndShift(e.sourcePosition, e.howMany)
          if (t.graveyardPosition) {
            const s = i.start.isEqual(t.graveyardPosition) || i.containsPosition(t.graveyardPosition)
            if (!n.bWasUndone && s) {
              const n = t.splitPosition._getTransformedByMoveOperation(e),
                i = t.graveyardPosition._getTransformedByMoveOperation(e),
                s = i.path.slice()
              s.push(0)
              const o = new Fa(i.root, s)
              return [new gl(n, t.howMany, o, 0)]
            }
            t.graveyardPosition = t.graveyardPosition._getTransformedByMoveOperation(e)
          }
          const s = t.splitPosition.isEqual(e.targetPosition)
          if (s && ('insertAtSource' == n.baRelation || 'splitBefore' == n.abRelation))
            return (
              (t.howMany += e.howMany),
              (t.splitPosition = t.splitPosition._getTransformedByDeletion(e.sourcePosition, e.howMany)),
              (t.insertionPosition = vl.getInsertionPosition(t.splitPosition)),
              [t]
            )
          if (s && n.abRelation && n.abRelation.howMany) {
            const { howMany: e, offset: i } = n.abRelation
            return (t.howMany += e), (t.splitPosition = t.splitPosition.getShiftedBy(i)), [t]
          }
          if (t.splitPosition.hasSameParentAs(e.sourcePosition) && i.containsPosition(t.splitPosition)) {
            const n = e.howMany - (t.splitPosition.offset - e.sourcePosition.offset)
            return (
              (t.howMany -= n),
              t.splitPosition.hasSameParentAs(e.targetPosition) &&
                t.splitPosition.offset < e.targetPosition.offset &&
                (t.howMany += e.howMany),
              (t.splitPosition = e.sourcePosition.clone()),
              (t.insertionPosition = vl.getInsertionPosition(t.splitPosition)),
              [t]
            )
          }
          return (
            e.sourcePosition.isEqual(e.targetPosition) ||
              (t.splitPosition.hasSameParentAs(e.sourcePosition) &&
                t.splitPosition.offset <= e.sourcePosition.offset &&
                (t.howMany -= e.howMany),
              t.splitPosition.hasSameParentAs(e.targetPosition) &&
                t.splitPosition.offset < e.targetPosition.offset &&
                (t.howMany += e.howMany)),
            (t.splitPosition.stickiness = 'toNone'),
            (t.splitPosition = t.splitPosition._getTransformedByMoveOperation(e)),
            (t.splitPosition.stickiness = 'toNext'),
            t.graveyardPosition
              ? (t.insertionPosition = t.insertionPosition._getTransformedByMoveOperation(e))
              : (t.insertionPosition = vl.getInsertionPosition(t.splitPosition)),
            [t]
          )
        }),
        Fd(vl, vl, (t, e, n) => {
          if (t.splitPosition.isEqual(e.splitPosition)) {
            if (!t.graveyardPosition && !e.graveyardPosition) return [new $l(0)]
            if (t.graveyardPosition && e.graveyardPosition && t.graveyardPosition.isEqual(e.graveyardPosition))
              return [new $l(0)]
            if ('splitBefore' == n.abRelation)
              return (
                (t.howMany = 0), (t.graveyardPosition = t.graveyardPosition._getTransformedBySplitOperation(e)), [t]
              )
          }
          if (t.graveyardPosition && e.graveyardPosition && t.graveyardPosition.isEqual(e.graveyardPosition)) {
            const i = '$graveyard' == t.splitPosition.root.rootName,
              s = '$graveyard' == e.splitPosition.root.rootName,
              o = i && !s
            if ((s && !i) || (!o && n.aIsStrong)) {
              const n = []
              return (
                e.howMany && n.push(new gl(e.moveTargetPosition, e.howMany, e.splitPosition, 0)),
                t.howMany && n.push(new gl(t.splitPosition, t.howMany, t.moveTargetPosition, 0)),
                n
              )
            }
            return [new $l(0)]
          }
          if (
            (t.graveyardPosition && (t.graveyardPosition = t.graveyardPosition._getTransformedBySplitOperation(e)),
            t.splitPosition.isEqual(e.insertionPosition) && 'splitBefore' == n.abRelation)
          )
            return t.howMany++, [t]
          if (e.splitPosition.isEqual(t.insertionPosition) && 'splitBefore' == n.baRelation) {
            const n = e.insertionPosition.path.slice()
            n.push(0)
            const i = new Fa(e.insertionPosition.root, n)
            return [t, new gl(t.insertionPosition, 1, i, 0)]
          }
          return (
            t.splitPosition.hasSameParentAs(e.splitPosition) &&
              t.splitPosition.offset < e.splitPosition.offset &&
              (t.howMany -= e.howMany),
            (t.splitPosition = t.splitPosition._getTransformedBySplitOperation(e)),
            (t.insertionPosition = vl.getInsertionPosition(t.splitPosition)),
            [t]
          )
        })
      class Hd extends Vr {
        constructor(t) {
          super(t), (this.domEventType = ['mousedown', 'mouseup', 'mouseover', 'mouseout'])
        }
        onDomEvent(t) {
          this.fire(t.type, t)
        }
      }
      class Kd {
        constructor(t) {
          this.document = t
        }
        createDocumentFragment(t) {
          return new wo(this.document, t)
        }
        createElement(t, e, n) {
          return new Ss(this.document, t, e, n)
        }
        createText(t) {
          return new Bi(this.document, t)
        }
        clone(t, e = !1) {
          return t._clone(e)
        }
        appendChild(t, e) {
          return e._appendChild(t)
        }
        insertChild(t, e, n) {
          return n._insertChild(t, e)
        }
        removeChildren(t, e, n) {
          return n._removeChildren(t, e)
        }
        remove(t) {
          const e = t.parent
          return e ? this.removeChildren(e.getChildIndex(t), 1, e) : []
        }
        replace(t, e) {
          const n = t.parent
          if (n) {
            const i = n.getChildIndex(t)
            return this.removeChildren(i, 1, n), this.insertChild(i, e, n), !0
          }
          return !1
        }
        unwrapElement(t) {
          const e = t.parent
          if (e) {
            const n = e.getChildIndex(t)
            this.remove(t), this.insertChild(n, t.getChildren(), e)
          }
        }
        rename(t, e) {
          const n = new Ss(this.document, t, e.getAttributes(), e.getChildren())
          return this.replace(e, n) ? n : null
        }
        setAttribute(t, e, n) {
          n._setAttribute(t, e)
        }
        removeAttribute(t, e) {
          e._removeAttribute(t)
        }
        addClass(t, e) {
          e._addClass(t)
        }
        removeClass(t, e) {
          e._removeClass(t)
        }
        setStyle(t, e, n) {
          Pe(t) && void 0 === n && (n = e), n._setStyle(t, e)
        }
        removeStyle(t, e) {
          e._removeStyle(t)
        }
        setCustomProperty(t, e, n) {
          n._setCustomProperty(t, e)
        }
        removeCustomProperty(t, e) {
          return e._removeCustomProperty(t)
        }
        createPositionAt(t, e) {
          return Ds._createAt(t, e)
        }
        createPositionAfter(t) {
          return Ds._createAfter(t)
        }
        createPositionBefore(t) {
          return Ds._createBefore(t)
        }
        createRange(t, e) {
          return new Fs(t, e)
        }
        createRangeOn(t) {
          return Fs._createOn(t)
        }
        createRangeIn(t) {
          return Fs._createIn(t)
        }
        createSelection(t, e, n) {
          return new Ls(t, e, n)
        }
      }
      new Set([
        'black',
        'silver',
        'gray',
        'white',
        'maroon',
        'red',
        'purple',
        'fuchsia',
        'green',
        'lime',
        'olive',
        'yellow',
        'navy',
        'blue',
        'teal',
        'aqua',
        'orange',
        'aliceblue',
        'antiquewhite',
        'aquamarine',
        'azure',
        'beige',
        'bisque',
        'blanchedalmond',
        'blueviolet',
        'brown',
        'burlywood',
        'cadetblue',
        'chartreuse',
        'chocolate',
        'coral',
        'cornflowerblue',
        'cornsilk',
        'crimson',
        'cyan',
        'darkblue',
        'darkcyan',
        'darkgoldenrod',
        'darkgray',
        'darkgreen',
        'darkgrey',
        'darkkhaki',
        'darkmagenta',
        'darkolivegreen',
        'darkorange',
        'darkorchid',
        'darkred',
        'darksalmon',
        'darkseagreen',
        'darkslateblue',
        'darkslategray',
        'darkslategrey',
        'darkturquoise',
        'darkviolet',
        'deeppink',
        'deepskyblue',
        'dimgray',
        'dimgrey',
        'dodgerblue',
        'firebrick',
        'floralwhite',
        'forestgreen',
        'gainsboro',
        'ghostwhite',
        'gold',
        'goldenrod',
        'greenyellow',
        'grey',
        'honeydew',
        'hotpink',
        'indianred',
        'indigo',
        'ivory',
        'khaki',
        'lavender',
        'lavenderblush',
        'lawngreen',
        'lemonchiffon',
        'lightblue',
        'lightcoral',
        'lightcyan',
        'lightgoldenrodyellow',
        'lightgray',
        'lightgreen',
        'lightgrey',
        'lightpink',
        'lightsalmon',
        'lightseagreen',
        'lightskyblue',
        'lightslategray',
        'lightslategrey',
        'lightsteelblue',
        'lightyellow',
        'limegreen',
        'linen',
        'magenta',
        'mediumaquamarine',
        'mediumblue',
        'mediumorchid',
        'mediumpurple',
        'mediumseagreen',
        'mediumslateblue',
        'mediumspringgreen',
        'mediumturquoise',
        'mediumvioletred',
        'midnightblue',
        'mintcream',
        'mistyrose',
        'moccasin',
        'navajowhite',
        'oldlace',
        'olivedrab',
        'orangered',
        'orchid',
        'palegoldenrod',
        'palegreen',
        'paleturquoise',
        'palevioletred',
        'papayawhip',
        'peachpuff',
        'peru',
        'pink',
        'plum',
        'powderblue',
        'rosybrown',
        'royalblue',
        'saddlebrown',
        'salmon',
        'sandybrown',
        'seagreen',
        'seashell',
        'sienna',
        'skyblue',
        'slateblue',
        'slategray',
        'slategrey',
        'snow',
        'springgreen',
        'steelblue',
        'tan',
        'thistle',
        'tomato',
        'turquoise',
        'violet',
        'wheat',
        'whitesmoke',
        'yellowgreen',
        'activeborder',
        'activecaption',
        'appworkspace',
        'background',
        'buttonface',
        'buttonhighlight',
        'buttonshadow',
        'buttontext',
        'captiontext',
        'graytext',
        'highlight',
        'highlighttext',
        'inactiveborder',
        'inactivecaption',
        'inactivecaptiontext',
        'infobackground',
        'infotext',
        'menu',
        'menutext',
        'scrollbar',
        'threeddarkshadow',
        'threedface',
        'threedhighlight',
        'threedlightshadow',
        'threedshadow',
        'window',
        'windowframe',
        'windowtext',
        'rebeccapurple',
        'currentcolor',
        'transparent',
      ])
      class Gd extends wh {
        constructor(t, e) {
          super(t),
            (this.view = e),
            (this._toolbarConfig = cd(t.config.get('toolbar'))),
            (this._elementReplacer = new sa())
        }
        get element() {
          return this.view.element
        }
        init(t) {
          const e = this.editor,
            n = this.view,
            i = e.editing.view,
            s = n.editable,
            o = i.document.getRoot()
          ;(s.name = o.rootName), n.render()
          const r = s.element
          this.setEditableElement(s.name, r),
            this.focusTracker.add(r),
            n.editable.bind('isFocused').to(this.focusTracker),
            i.attachDomRoot(r),
            t && this._elementReplacer.replace(t, this.element),
            this._initPlaceholder(),
            this._initToolbar(),
            this.fire('ready')
        }
        destroy() {
          const t = this.view,
            e = this.editor.editing.view
          this._elementReplacer.restore(), e.detachDomRoot(t.editable.name), t.destroy(), super.destroy()
        }
        _initToolbar() {
          const t = this.editor,
            e = this.view,
            n = t.editing.view
          e.stickyPanel.bind('isActive').to(this.focusTracker, 'isFocused'),
            (e.stickyPanel.limiterElement = e.element),
            e.stickyPanel.bind('viewportTopOffset').to(this, 'viewportOffset', ({ top: t }) => t),
            e.toolbar.fillFromConfig(this._toolbarConfig, this.componentFactory),
            (function ({
              origin: t,
              originKeystrokeHandler: e,
              originFocusTracker: n,
              toolbar: i,
              beforeFocus: s,
              afterBlur: o,
            }) {
              n.add(i.element),
                e.set('Alt+F10', (t, e) => {
                  n.isFocused && !i.focusTracker.isFocused && (s && s(), i.focus(), e())
                }),
                i.keystrokes.set('Esc', (e, n) => {
                  i.focusTracker.isFocused && (t.focus(), o && o(), n())
                })
            })({
              origin: n,
              originFocusTracker: this.focusTracker,
              originKeystrokeHandler: t.keystrokes,
              toolbar: e.toolbar,
            })
        }
        _initPlaceholder() {
          const t = this.editor,
            e = t.editing.view,
            n = e.document.getRoot(),
            i = t.sourceElement,
            s =
              t.config.get('placeholder') ||
              (i && 'textarea' === i.tagName.toLowerCase() && i.getAttribute('placeholder'))
          s &&
            (function (t) {
              const { view: e, element: n, text: i, isDirectHost: s = !0, keepOnFocus: o = !1 } = t,
                r = e.document
              Rd.has(r) || (Rd.set(r, new Map()), r.registerPostFixer(t => Id(r, t))),
                Rd.get(r).set(n, { text: i, isDirectHost: s, keepOnFocus: o, hostElement: s ? n : null }),
                e.change(t => Id(r, t))
            })({ view: e, element: n, text: s, isDirectHost: !1, keepOnFocus: !0 })
        }
      }
      class Jd extends bd {
        constructor(t, e, n = {}) {
          super(t),
            (this.stickyPanel = new Td(t)),
            (this.toolbar = new ld(t, { shouldGroupWhenFull: n.shouldToolbarGroupWhenFull })),
            (this.editable = new vd(t, e))
        }
        render() {
          super.render(),
            this.stickyPanel.content.add(this.toolbar),
            this.top.add(this.stickyPanel),
            this.main.add(this.editable)
        }
      }
      class Yd extends gh {
        constructor(t, e = {}) {
          if (!yi(t) && void 0 !== e.initialData) throw new c('editor-create-initial-data', null)
          super(e),
            void 0 === this.config.get('initialData') &&
              this.config.set(
                'initialData',
                (function (t) {
                  return yi(t) ? ((e = t), e instanceof HTMLTextAreaElement ? e.value : e.innerHTML) : t
                  var e
                })(t)
              ),
            yi(t) && (this.sourceElement = t),
            this.model.document.createRoot()
          const n = !this.config.get('toolbar.shouldNotGroupWhenFull'),
            i = new Jd(this.locale, this.editing.view, { shouldToolbarGroupWhenFull: n })
          ;(this.ui = new Gd(this, i)),
            (function (t) {
              if (!V(t.updateSourceElement)) throw new c('attachtoform-missing-elementapi-interface', t)
              const e = t.sourceElement
              if (e && 'textarea' === e.tagName.toLowerCase() && e.form) {
                let n
                const i = e.form,
                  s = () => t.updateSourceElement()
                V(i.submit) &&
                  ((n = i.submit),
                  (i.submit = () => {
                    s(), n.apply(i)
                  })),
                  i.addEventListener('submit', s),
                  t.on('destroy', () => {
                    i.removeEventListener('submit', s), n && (i.submit = n)
                  })
              }
            })(this)
        }
        destroy() {
          return this.sourceElement && this.updateSourceElement(), this.ui.destroy(), super.destroy()
        }
        static create(t, e = {}) {
          return new Promise(n => {
            const i = new this(t, e)
            n(
              i
                .initPlugins()
                .then(() => i.ui.init(yi(t) ? t : null))
                .then(() => i.data.init(i.config.get('initialData')))
                .then(() => i.fire('ready'))
                .then(() => i)
            )
          })
        }
      }
      he(Yd, bh), he(Yd, yh)
      class Xd extends de {
        static get pluginName() {
          return 'Autosave'
        }
        static get requires() {
          return [vh]
        }
        constructor(t) {
          super(t)
          const e = t.config.get('autosave') || {},
            n = e.waitingTime || 1e3
          this.set('state', 'synchronized'),
            (this._debouncedSave = Zr(this._save.bind(this), n)),
            (this._lastDocumentVersion = t.model.document.version),
            (this._savePromise = null),
            (this._domEmitter = Object.create(dr)),
            (this._config = e),
            (this._pendingActions = t.plugins.get(vh)),
            (this._makeImmediateSave = !1)
        }
        init() {
          const t = this.editor,
            e = t.model.document
          this.listenTo(t, 'ready', () => {
            this.listenTo(e, 'change:data', (t, e) => {
              this._saveCallbacks.length &&
                e.isLocal &&
                ('synchronized' === this.state && ((this.state = 'waiting'), this._setPendingAction()),
                'waiting' === this.state && this._debouncedSave())
            })
          }),
            this.listenTo(t, 'destroy', () => this._flush(), { priority: 'highest' }),
            this._domEmitter.listenTo(window, 'beforeunload', (t, e) => {
              this._pendingActions.hasAny && (e.returnValue = this._pendingActions.first.message)
            })
        }
        destroy() {
          this._domEmitter.stopListening(), super.destroy()
        }
        save() {
          return this._debouncedSave.cancel(), this._save()
        }
        _flush() {
          this._debouncedSave.flush()
        }
        _save() {
          return this._savePromise
            ? ((this._makeImmediateSave = this.editor.model.document.version > this._lastDocumentVersion),
              this._savePromise)
            : (this._setPendingAction(),
              (this.state = 'saving'),
              (this._lastDocumentVersion = this.editor.model.document.version),
              (this._savePromise = Promise.resolve()
                .then(() => Promise.all(this._saveCallbacks.map(t => t(this.editor))))
                .finally(() => {
                  this._savePromise = null
                })
                .then(() => {
                  if (this._makeImmediateSave) return (this._makeImmediateSave = !1), this._save()
                  this.editor.model.document.version > this._lastDocumentVersion
                    ? ((this.state = 'waiting'), this._debouncedSave())
                    : ((this.state = 'synchronized'), this._pendingActions.remove(this._action), (this._action = null))
                })
                .catch(t => {
                  throw ((this.state = 'error'), (this.state = 'saving'), this._debouncedSave(), t)
                })),
              this._savePromise)
        }
        _setPendingAction() {
          const t = this.editor.t
          this._action || (this._action = this._pendingActions.add(t('Saving changes')))
        }
        get _saveCallbacks() {
          const t = []
          return (
            this.adapter && this.adapter.save && t.push(this.adapter.save),
            this._config.save && t.push(this._config.save),
            t
          )
        }
      }
      he(Xd, se)
      class Zd extends fe {
        constructor(t, e) {
          super(t), (this.attributeKey = e)
        }
        refresh() {
          const t = this.editor.model,
            e = t.document
          ;(this.value = this._getValueFromFirstAllowedNode()),
            (this.isEnabled = t.schema.checkAttributeInSelection(e.selection, this.attributeKey))
        }
        execute(t = {}) {
          const e = this.editor.model,
            n = e.document.selection,
            i = void 0 === t.forceValue ? !this.value : t.forceValue
          e.change(t => {
            if (n.isCollapsed)
              i ? t.setSelectionAttribute(this.attributeKey, !0) : t.removeSelectionAttribute(this.attributeKey)
            else {
              const s = e.schema.getValidRanges(n.getRanges(), this.attributeKey)
              for (const e of s) i ? t.setAttribute(this.attributeKey, i, e) : t.removeAttribute(this.attributeKey, e)
            }
          })
        }
        _getValueFromFirstAllowedNode() {
          const t = this.editor.model,
            e = t.schema,
            n = t.document.selection
          if (n.isCollapsed) return n.hasAttribute(this.attributeKey)
          for (const t of n.getRanges())
            for (const n of t.getItems())
              if (e.checkAttribute(n, this.attributeKey)) return n.hasAttribute(this.attributeKey)
          return !1
        }
      }
      const Qd = 'bold'
      class tu extends de {
        static get pluginName() {
          return 'BoldEditing'
        }
        init() {
          const t = this.editor
          t.model.schema.extend('$text', { allowAttributes: Qd }),
            t.model.schema.setAttributeProperties(Qd, { isFormatting: !0, copyOnEnter: !0 }),
            t.conversion.attributeToElement({
              model: Qd,
              view: 'strong',
              upcastAlso: [
                'b',
                t => {
                  const e = t.getStyle('font-weight')
                  return e ? ('bold' == e || Number(e) >= 600 ? { name: !0, styles: ['font-weight'] } : void 0) : null
                },
              ],
            }),
            t.commands.add(Qd, new Zd(t, Qd)),
            t.keystrokes.set('CTRL+B', Qd)
        }
      }
      const eu = 'bold'
      class nu extends de {
        static get pluginName() {
          return 'BoldUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add(eu, n => {
            const i = t.commands.get(eu),
              s = new Jh(n)
            return (
              s.set({
                label: e('Bold'),
                icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z"/></svg>',
                keystroke: 'CTRL+B',
                tooltip: !0,
                isToggleable: !0,
              }),
              s.bind('isOn', 'isEnabled').to(i, 'value', 'isEnabled'),
              this.listenTo(s, 'execute', () => {
                t.execute(eu), t.editing.view.focus()
              }),
              s
            )
          })
        }
      }
      class iu {
        constructor(t) {
          ;(this.files = (function (t) {
            const e = Array.from(t.files || []),
              n = Array.from(t.items || [])
            if (e.length) return e
            return n.filter(t => 'file' === t.kind).map(t => t.getAsFile())
          })(t)),
            (this._native = t)
        }
        get types() {
          return this._native.types
        }
        getData(t) {
          return this._native.getData(t)
        }
        setData(t, e) {
          this._native.setData(t, e)
        }
        set effectAllowed(t) {
          this._native.effectAllowed = t
        }
        get effectAllowed() {
          return this._native.effectAllowed
        }
        set dropEffect(t) {
          this._native.dropEffect = t
        }
        get dropEffect() {
          return this._native.dropEffect
        }
        get isCanceled() {
          return 'none' == this._native.dropEffect || !!this._native.mozUserCancelled
        }
      }
      class su extends Vr {
        constructor(t) {
          super(t)
          const e = this.document
          function n(t) {
            return (n, s) => {
              s.preventDefault()
              const o = s.dropRange ? [s.dropRange] : null,
                r = new i(e, t)
              e.fire(r, { dataTransfer: s.dataTransfer, method: n.name, targetRanges: o, target: s.target }),
                r.stop.called && s.stopPropagation()
            }
          }
          ;(this.domEventType = [
            'paste',
            'copy',
            'cut',
            'drop',
            'dragover',
            'dragstart',
            'dragend',
            'dragenter',
            'dragleave',
          ]),
            this.listenTo(e, 'paste', n('clipboardInput'), { priority: 'low' }),
            this.listenTo(e, 'drop', n('clipboardInput'), { priority: 'low' }),
            this.listenTo(e, 'dragover', n('dragging'), { priority: 'low' })
        }
        onDomEvent(t) {
          const e = { dataTransfer: new iu(t.clipboardData ? t.clipboardData : t.dataTransfer) }
          ;('drop' != t.type && 'dragover' != t.type) ||
            (e.dropRange = (function (t, e) {
              const n = e.target.ownerDocument,
                i = e.clientX,
                s = e.clientY
              let o
              n.caretRangeFromPoint && n.caretRangeFromPoint(i, s)
                ? (o = n.caretRangeFromPoint(i, s))
                : e.rangeParent && ((o = n.createRange()), o.setStart(e.rangeParent, e.rangeOffset), o.collapse(!0))
              if (o) return t.domConverter.domRangeToView(o)
              return null
            })(this.view, t)),
            this.fire(t.type, t, e)
        }
      }
      const ou = ['figcaption', 'li']
      function ru(t) {
        let e = ''
        if (t.is('$text') || t.is('$textProxy')) e = t.data
        else if (t.is('element', 'img') && t.hasAttribute('alt')) e = t.getAttribute('alt')
        else if (t.is('element', 'br')) e = '\n'
        else {
          let n = null
          for (const i of t.getChildren()) {
            const t = ru(i)
            n &&
              (n.is('containerElement') || i.is('containerElement')) &&
              (ou.includes(n.name) || ou.includes(i.name) ? (e += '\n') : (e += '\n\n')),
              (e += t),
              (n = i)
          }
        }
        return e
      }
      class au extends de {
        static get pluginName() {
          return 'ClipboardPipeline'
        }
        init() {
          this.editor.editing.view.addObserver(su), this._setupPasteDrop(), this._setupCopyCut()
        }
        _setupPasteDrop() {
          const t = this.editor,
            e = t.model,
            n = t.editing.view,
            s = n.document
          this.listenTo(
            s,
            'clipboardInput',
            e => {
              t.isReadOnly && e.stop()
            },
            { priority: 'highest' }
          ),
            this.listenTo(
              s,
              'clipboardInput',
              (t, e) => {
                const s = e.dataTransfer
                let o = e.content || ''
                var r
                o ||
                  (s.getData('text/html')
                    ? (o = (function (t) {
                        return t
                          .replace(/<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g, (t, e) =>
                            1 == e.length ? ' ' : e
                          )
                          .replace(/<!--[\s\S]*?-->/g, '')
                      })(s.getData('text/html')))
                    : s.getData('text/plain') &&
                      (((r = (r = s.getData('text/plain'))
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\r?\n\r?\n/g, '</p><p>')
                        .replace(/\r?\n/g, '<br>')
                        .replace(/^\s/, '&nbsp;')
                        .replace(/\s$/, '&nbsp;')
                        .replace(/\s\s/g, ' &nbsp;')).includes('</p><p>') ||
                        r.includes('<br>')) &&
                        (r = `<p>${r}</p>`),
                      (o = r)),
                  (o = this.editor.data.htmlProcessor.toView(o)))
                const a = new i(this, 'inputTransformation')
                this.fire(a, { content: o, dataTransfer: s, targetRanges: e.targetRanges, method: e.method }),
                  a.stop.called && t.stop(),
                  n.scrollToTheSelection()
              },
              { priority: 'low' }
            ),
            this.listenTo(
              this,
              'inputTransformation',
              (t, n) => {
                if (n.content.isEmpty) return
                const i = this.editor.data.toModel(n.content, '$clipboardHolder')
                0 != i.childCount &&
                  (t.stop(),
                  e.change(() => {
                    this.fire('contentInsertion', {
                      content: i,
                      method: n.method,
                      dataTransfer: n.dataTransfer,
                      targetRanges: n.targetRanges,
                    })
                  }))
              },
              { priority: 'low' }
            ),
            this.listenTo(
              this,
              'contentInsertion',
              (t, n) => {
                n.resultRange = e.insertContent(n.content)
              },
              { priority: 'low' }
            )
        }
        _setupCopyCut() {
          const t = this.editor,
            e = t.model.document,
            n = t.editing.view.document
          function i(i, s) {
            const o = s.dataTransfer
            s.preventDefault()
            const r = t.data.toView(t.model.getSelectedContent(e.selection))
            n.fire('clipboardOutput', { dataTransfer: o, content: r, method: i.name })
          }
          this.listenTo(n, 'copy', i, { priority: 'low' }),
            this.listenTo(
              n,
              'cut',
              (e, n) => {
                t.isReadOnly ? n.preventDefault() : i(e, n)
              },
              { priority: 'low' }
            ),
            this.listenTo(
              n,
              'clipboardOutput',
              (n, i) => {
                i.content.isEmpty ||
                  (i.dataTransfer.setData('text/html', this.editor.data.htmlProcessor.toData(i.content)),
                  i.dataTransfer.setData('text/plain', ru(i.content))),
                  'cut' == i.method && t.model.deleteContent(e.selection)
              },
              { priority: 'low' }
            )
        }
      }
      function* cu(t, e) {
        for (const n of e) n && t.getAttributeProperties(n[0]).copyOnEnter && (yield n)
      }
      class lu extends fe {
        execute() {
          const t = this.editor.model,
            e = t.document
          t.change(n => {
            !(function (t, e, n, i) {
              const s = n.isCollapsed,
                o = n.getFirstRange(),
                r = o.start.parent,
                a = o.end.parent
              if (i.isLimit(r) || i.isLimit(a)) return void (s || r != a || t.deleteContent(n))
              if (s) {
                const t = cu(e.model.schema, n.getAttributes())
                hu(e, o.start), e.setSelectionAttribute(t)
              } else {
                const i = !(o.start.isAtStart && o.end.isAtEnd),
                  s = r == a
                t.deleteContent(n, { leaveUnmerged: i }), i && (s ? hu(e, n.focus) : e.setSelection(a, 0))
              }
            })(this.editor.model, n, e.selection, t.schema),
              this.fire('afterExecute', { writer: n })
          })
        }
      }
      function hu(t, e) {
        t.split(e), t.setSelection(e.parent.nextSibling, 0)
      }
      class du extends mr {
        constructor(t) {
          super(t)
          const e = this.document
          e.on('keydown', (t, n) => {
            if (this.isEnabled && n.keyCode == ro.enter) {
              const i = new Ws(e, 'enter', e.selection.getFirstRange())
              e.fire(i, new Br(e, n.domEvent, { isSoft: n.shiftKey })), i.stop.called && t.stop()
            }
          })
        }
        observe() {}
      }
      class uu extends de {
        static get pluginName() {
          return 'Enter'
        }
        init() {
          const t = this.editor,
            e = t.editing.view,
            n = e.document
          e.addObserver(du),
            t.commands.add('enter', new lu(t)),
            this.listenTo(
              n,
              'enter',
              (n, i) => {
                i.preventDefault(), i.isSoft || (t.execute('enter'), e.scrollToTheSelection())
              },
              { priority: 'low' }
            )
        }
      }
      class fu {
        constructor(t, e = 20) {
          ;(this.model = t),
            (this.size = 0),
            (this.limit = e),
            (this.isLocked = !1),
            (this._changeCallback = (t, e) => {
              e.isLocal && e.isUndoable && e !== this._batch && this._reset(!0)
            }),
            (this._selectionChangeCallback = () => {
              this._reset()
            }),
            this.model.document.on('change', this._changeCallback),
            this.model.document.selection.on('change:range', this._selectionChangeCallback),
            this.model.document.selection.on('change:attribute', this._selectionChangeCallback)
        }
        get batch() {
          return this._batch || (this._batch = this.model.createBatch({ isTyping: !0 })), this._batch
        }
        input(t) {
          ;(this.size += t), this.size >= this.limit && this._reset(!0)
        }
        lock() {
          this.isLocked = !0
        }
        unlock() {
          this.isLocked = !1
        }
        destroy() {
          this.model.document.off('change', this._changeCallback),
            this.model.document.selection.off('change:range', this._selectionChangeCallback),
            this.model.document.selection.off('change:attribute', this._selectionChangeCallback)
        }
        _reset(t) {
          ;(this.isLocked && !t) || ((this._batch = null), (this.size = 0))
        }
      }
      class mu extends fe {
        constructor(t, e) {
          super(t), (this.direction = e), (this._buffer = new fu(t.model, t.config.get('typing.undoStep')))
        }
        get buffer() {
          return this._buffer
        }
        execute(t = {}) {
          const e = this.editor.model,
            n = e.document
          e.enqueueChange(this._buffer.batch, i => {
            this._buffer.lock()
            const s = i.createSelection(t.selection || n.selection),
              o = t.sequence || 1,
              r = s.isCollapsed
            if (
              (s.isCollapsed &&
                e.modifySelection(s, { direction: this.direction, unit: t.unit, treatEmojiAsSingleUnit: !0 }),
              this._shouldEntireContentBeReplacedWithParagraph(o))
            )
              return void this._replaceEntireContentWithParagraph(i)
            if (this._shouldReplaceFirstBlockWithParagraph(s, o))
              return void this.editor.execute('paragraph', { selection: s })
            if (s.isCollapsed) return
            let a = 0
            s
              .getFirstRange()
              .getMinimalFlatRanges()
              .forEach(t => {
                a += Vs(t.getWalker({ singleCharacters: !0, ignoreElementEnd: !0, shallow: !0 }))
              }),
              e.deleteContent(s, { doNotResetEntireContent: r, direction: this.direction }),
              this._buffer.input(a),
              i.setSelection(s),
              this._buffer.unlock()
          })
        }
        _shouldEntireContentBeReplacedWithParagraph(t) {
          if (t > 1) return !1
          const e = this.editor.model,
            n = e.document.selection,
            i = e.schema.getLimitElement(n)
          if (!(n.isCollapsed && n.containsEntireContent(i))) return !1
          if (!e.schema.checkChild(i, 'paragraph')) return !1
          const s = i.getChild(0)
          return !s || 'paragraph' !== s.name
        }
        _replaceEntireContentWithParagraph(t) {
          const e = this.editor.model,
            n = e.document.selection,
            i = e.schema.getLimitElement(n),
            s = t.createElement('paragraph')
          t.remove(t.createRangeIn(i)), t.insert(s, i), t.setSelection(s, 0)
        }
        _shouldReplaceFirstBlockWithParagraph(t, e) {
          const n = this.editor.model
          if (e > 1 || 'backward' != this.direction) return !1
          if (!t.isCollapsed) return !1
          const i = t.getFirstPosition(),
            s = n.schema.getLimitElement(i),
            o = s.getChild(0)
          return (
            i.parent == o &&
            !!t.containsEntireContent(o) &&
            !!n.schema.checkChild(s, 'paragraph') &&
            'paragraph' != o.name
          )
        }
      }
      function gu(t) {
        if (t.newChildren.length - t.oldChildren.length != 1) return
        const e = (function (t, e) {
          const n = []
          let i,
            s = 0
          return (
            t.forEach(t => {
              'equal' == t
                ? (o(), s++)
                : 'insert' == t
                ? (r('insert') ? i.values.push(e[s]) : (o(), (i = { type: 'insert', index: s, values: [e[s]] })), s++)
                : r('delete')
                ? i.howMany++
                : (o(), (i = { type: 'delete', index: s, howMany: 1 }))
            }),
            o(),
            n
          )
          function o() {
            i && (n.push(i), (i = null))
          }
          function r(t) {
            return i && i.type == t
          }
        })(zo(t.oldChildren, t.newChildren, pu), t.newChildren)
        if (e.length > 1) return
        const n = e[0]
        return n.values[0] && n.values[0].is('$text') ? n : void 0
      }
      function pu(t, e) {
        return t && t.is('$text') && e && e.is('$text') ? t.data === e.data : t === e
      }
      function _u(t, e) {
        const n = e.selection,
          i = t.shiftKey && t.keyCode === ro.delete,
          s = !n.isCollapsed
        return i && s
      }
      class wu extends mr {
        constructor(t) {
          super(t)
          const e = t.document
          let n = 0
          function i(t, n, i) {
            const s = new Ws(e, 'delete', e.selection.getFirstRange())
            e.fire(s, new Br(e, n, i)), s.stop.called && t.stop()
          }
          e.on('keyup', (t, e) => {
            ;(e.keyCode != ro.delete && e.keyCode != ro.backspace) || (n = 0)
          }),
            e.on('keydown', (t, s) => {
              if (no.isWindows && _u(s, e)) return
              const o = {}
              if (s.keyCode == ro.delete) (o.direction = 'forward'), (o.unit = 'character')
              else {
                if (s.keyCode != ro.backspace) return
                ;(o.direction = 'backward'), (o.unit = 'codePoint')
              }
              const r = no.isMac ? s.altKey : s.ctrlKey
              ;(o.unit = r ? 'word' : o.unit), (o.sequence = ++n), i(t, s.domEvent, o)
            }),
            no.isAndroid &&
              e.on('beforeinput', (e, n) => {
                if ('deleteContentBackward' != n.domEvent.inputType) return
                const s = { unit: 'codepoint', direction: 'backward', sequence: 1 },
                  o = n.domTarget.ownerDocument.defaultView.getSelection()
                o.anchorNode == o.focusNode &&
                  o.anchorOffset + 1 != o.focusOffset &&
                  (s.selectionToRemove = t.domConverter.domSelectionToView(o)),
                  i(e, n.domEvent, s)
              })
        }
        observe() {}
      }
      class bu extends de {
        static get pluginName() {
          return 'Delete'
        }
        init() {
          const t = this.editor,
            e = t.editing.view,
            n = e.document,
            i = t.model.document
          e.addObserver(wu), (this._undoOnBackspace = !1)
          const s = new mu(t, 'forward')
          if (
            (t.commands.add('deleteForward', s),
            t.commands.add('forwardDelete', s),
            t.commands.add('delete', new mu(t, 'backward')),
            this.listenTo(
              n,
              'delete',
              (n, i) => {
                const s = { unit: i.unit, sequence: i.sequence }
                if (i.selectionToRemove) {
                  const e = t.model.createSelection(),
                    n = []
                  for (const e of i.selectionToRemove.getRanges()) n.push(t.editing.mapper.toModelRange(e))
                  e.setTo(n), (s.selection = e)
                }
                t.execute('forward' == i.direction ? 'deleteForward' : 'delete', s),
                  i.preventDefault(),
                  e.scrollToTheSelection()
              },
              { priority: 'low' }
            ),
            no.isAndroid)
          ) {
            let t = null
            this.listenTo(
              n,
              'delete',
              (e, n) => {
                const i = n.domTarget.ownerDocument.defaultView.getSelection()
                t = {
                  anchorNode: i.anchorNode,
                  anchorOffset: i.anchorOffset,
                  focusNode: i.focusNode,
                  focusOffset: i.focusOffset,
                }
              },
              { priority: 'lowest' }
            ),
              this.listenTo(n, 'keyup', (e, n) => {
                if (t) {
                  const e = n.domTarget.ownerDocument.defaultView.getSelection()
                  e.collapse(t.anchorNode, t.anchorOffset), e.extend(t.focusNode, t.focusOffset), (t = null)
                }
              })
          }
          this.editor.plugins.has('UndoEditing') &&
            (this.listenTo(
              n,
              'delete',
              (e, n) => {
                this._undoOnBackspace &&
                  'backward' == n.direction &&
                  1 == n.sequence &&
                  'codePoint' == n.unit &&
                  ((this._undoOnBackspace = !1), t.execute('undo'), n.preventDefault(), e.stop())
              },
              { context: '$capture' }
            ),
            this.listenTo(i, 'change', () => {
              this._undoOnBackspace = !1
            }))
        }
        requestUndoOnBackspace() {
          this.editor.plugins.has('UndoEditing') && (this._undoOnBackspace = !0)
        }
      }
      class yu {
        constructor() {
          this._stack = []
        }
        add(t, e) {
          const n = this._stack,
            i = n[0]
          this._insertDescriptor(t)
          const s = n[0]
          i === s || vu(i, s) || this.fire('change:top', { oldDescriptor: i, newDescriptor: s, writer: e })
        }
        remove(t, e) {
          const n = this._stack,
            i = n[0]
          this._removeDescriptor(t)
          const s = n[0]
          i === s || vu(i, s) || this.fire('change:top', { oldDescriptor: i, newDescriptor: s, writer: e })
        }
        _insertDescriptor(t) {
          const e = this._stack,
            n = e.findIndex(e => e.id === t.id)
          if (vu(t, e[n])) return
          n > -1 && e.splice(n, 1)
          let i = 0
          for (; e[i] && Pu(e[i], t); ) i++
          e.splice(i, 0, t)
        }
        _removeDescriptor(t) {
          const e = this._stack,
            n = e.findIndex(e => e.id === t)
          n > -1 && e.splice(n, 1)
        }
      }
      function vu(t, e) {
        return t && e && t.priority == e.priority && ku(t.classes) == ku(e.classes)
      }
      function Pu(t, e) {
        return t.priority > e.priority || (!(t.priority < e.priority) && ku(t.classes) > ku(e.classes))
      }
      function ku(t) {
        return Array.isArray(t) ? t.sort().join(',') : t
      }
      he(yu, p)
      const Au =
          '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z"/><path fill-opacity=".256" d="M1 1h14v14H1z"/><g class="ck-icon__selected-indicator"><path d="M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z"/><path fill-opacity=".254" d="M1 1h14v14H1z"/></g></svg>',
        Cu = 'ck-widget_selected'
      function Eu(t) {
        return !!t.is('element') && !!t.getCustomProperty('widget')
      }
      function Su(t, e, n = {}) {
        if (!t.is('containerElement')) throw new c('widget-to-widget-wrong-element-type', null, { element: t })
        return (
          e.setAttribute('contenteditable', 'false', t),
          e.addClass('ck-widget', t),
          e.setCustomProperty('widget', !0, t),
          (t.getFillerOffset = Iu),
          n.label &&
            (function (t, e, n) {
              n.setCustomProperty('widgetLabel', e, t)
            })(t, n.label, e),
          n.hasSelectionHandle &&
            (function (t, e) {
              const n = e.createUIElement('div', { class: 'ck ck-widget__selection-handle' }, function (t) {
                const e = this.toDomElement(t),
                  n = new Kh()
                return n.set('content', Au), n.render(), e.appendChild(n.element), e
              })
              e.insert(e.createPositionAt(t, 0), n), e.addClass(['ck-widget_with-selection-handle'], t)
            })(t, e),
          Ru(t, e),
          t
        )
      }
      function xu(t, e, n) {
        if ((e.classes && n.addClass(Si(e.classes), t), e.attributes))
          for (const i in e.attributes) n.setAttribute(i, e.attributes[i], t)
      }
      function Tu(t, e, n) {
        if ((e.classes && n.removeClass(Si(e.classes), t), e.attributes))
          for (const i in e.attributes) n.removeAttribute(i, t)
      }
      function Ru(t, e, n = xu, i = Tu) {
        const s = new yu()
        s.on('change:top', (e, s) => {
          s.oldDescriptor && i(t, s.oldDescriptor, s.writer), s.newDescriptor && n(t, s.newDescriptor, s.writer)
        }),
          e.setCustomProperty('addHighlight', (t, e, n) => s.add(e, n), t),
          e.setCustomProperty('removeHighlight', (t, e, n) => s.remove(e, n), t)
      }
      function Ou(t) {
        const e = t.getCustomProperty('widgetLabel')
        return e ? ('function' == typeof e ? e() : e) : ''
      }
      function Iu() {
        return null
      }
      const Mu = 'widget-type-around'
      function Nu(t, e, n) {
        return t && Eu(t) && !n.isInline(e)
      }
      function Du(t) {
        return t.getAttribute(Mu)
      }
      const Fu = [
        co('arrowUp'),
        co('arrowRight'),
        co('arrowDown'),
        co('arrowLeft'),
        9,
        16,
        17,
        18,
        19,
        20,
        27,
        33,
        34,
        35,
        36,
        45,
        91,
        93,
        144,
        145,
        173,
        174,
        175,
        176,
        177,
        178,
        179,
        255,
      ]
      for (let t = 112; t <= 135; t++) Fu.push(t)
      function Bu(t) {
        return !(!t.ctrlKey && !t.metaKey) || Fu.includes(t.keyCode)
      }
      const Vu = ['before', 'after'],
        Lu = new DOMParser().parseFromString(
          '<svg viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"/></svg>',
          'image/svg+xml'
        ).firstChild,
        ju = 'ck-widget__type-around_disabled'
      class Wu extends de {
        static get pluginName() {
          return 'WidgetTypeAround'
        }
        static get requires() {
          return [uu, bu]
        }
        constructor(t) {
          super(t), (this._currentFakeCaretModelElement = null)
        }
        init() {
          const t = this.editor,
            e = t.editing.view
          this.on('change:isEnabled', (n, i, s) => {
            e.change(t => {
              for (const n of e.document.roots) s ? t.removeClass(ju, n) : t.addClass(ju, n)
            }),
              s ||
                t.model.change(t => {
                  t.removeSelectionAttribute(Mu)
                })
          }),
            this._enableTypeAroundUIInjection(),
            this._enableInsertingParagraphsOnButtonClick(),
            this._enableInsertingParagraphsOnEnterKeypress(),
            this._enableInsertingParagraphsOnTypingKeystroke(),
            this._enableTypeAroundFakeCaretActivationUsingKeyboardArrows(),
            this._enableDeleteIntegration(),
            this._enableInsertContentIntegration(),
            this._enableInsertObjectIntegration(),
            this._enableDeleteContentIntegration()
        }
        destroy() {
          this._currentFakeCaretModelElement = null
        }
        _insertParagraph(t, e) {
          const n = this.editor,
            i = n.editing.view,
            s = n.model.schema.getAttributesWithProperty(t, 'copyOnReplace', !0)
          n.execute('insertParagraph', { position: n.model.createPositionAt(t, e), attributes: s }),
            i.focus(),
            i.scrollToTheSelection()
        }
        _listenToIfEnabled(t, e, n, i) {
          this.listenTo(
            t,
            e,
            (...t) => {
              this.isEnabled && n(...t)
            },
            i
          )
        }
        _insertParagraphAccordingToFakeCaretPosition() {
          const t = this.editor.model.document.selection,
            e = Du(t)
          if (!e) return !1
          const n = t.getSelectedElement()
          return this._insertParagraph(n, e), !0
        }
        _enableTypeAroundUIInjection() {
          const t = this.editor,
            e = t.model.schema,
            n = t.locale.t,
            i = { before: n('Insert paragraph before block'), after: n('Insert paragraph after block') }
          t.editing.downcastDispatcher.on(
            'insert',
            (t, n, s) => {
              const o = s.mapper.toViewElement(n.item)
              Nu(o, n.item, e) &&
                (function (t, e, n) {
                  const i = t.createUIElement('div', { class: 'ck ck-reset_all ck-widget__type-around' }, function (t) {
                    const n = this.toDomElement(t)
                    return (
                      (function (t, e) {
                        for (const n of Vu) {
                          const i = new Ch({
                            tag: 'div',
                            attributes: {
                              class: ['ck', 'ck-widget__type-around__button', `ck-widget__type-around__button_${n}`],
                              title: e[n],
                            },
                            children: [t.ownerDocument.importNode(Lu, !0)],
                          })
                          t.appendChild(i.render())
                        }
                      })(n, e),
                      (function (t) {
                        const e = new Ch({
                          tag: 'div',
                          attributes: { class: ['ck', 'ck-widget__type-around__fake-caret'] },
                        })
                        t.appendChild(e.render())
                      })(n),
                      n
                    )
                  })
                  t.insert(t.createPositionAt(n, 'end'), i)
                })(s.writer, i, o)
            },
            { priority: 'low' }
          )
        }
        _enableTypeAroundFakeCaretActivationUsingKeyboardArrows() {
          const t = this.editor,
            e = t.model,
            n = e.document.selection,
            i = e.schema,
            s = t.editing.view
          function o(t) {
            return `ck-widget_type-around_show-fake-caret_${t}`
          }
          this._listenToIfEnabled(
            s.document,
            'arrowKey',
            (t, e) => {
              this._handleArrowKeyPress(t, e)
            },
            { context: [Eu, '$text'], priority: 'high' }
          ),
            this._listenToIfEnabled(n, 'change:range', (e, n) => {
              n.directChange &&
                t.model.change(t => {
                  t.removeSelectionAttribute(Mu)
                })
            }),
            this._listenToIfEnabled(e.document, 'change:data', () => {
              const e = n.getSelectedElement()
              if (e) {
                if (Nu(t.editing.mapper.toViewElement(e), e, i)) return
              }
              t.model.change(t => {
                t.removeSelectionAttribute(Mu)
              })
            }),
            this._listenToIfEnabled(t.editing.downcastDispatcher, 'selection', (t, e, n) => {
              const s = n.writer
              if (this._currentFakeCaretModelElement) {
                const t = n.mapper.toViewElement(this._currentFakeCaretModelElement)
                t && (s.removeClass(Vu.map(o), t), (this._currentFakeCaretModelElement = null))
              }
              const r = e.selection.getSelectedElement()
              if (!r) return
              const a = n.mapper.toViewElement(r)
              if (!Nu(a, r, i)) return
              const c = Du(e.selection)
              c && (s.addClass(o(c), a), (this._currentFakeCaretModelElement = r))
            }),
            this._listenToIfEnabled(t.ui.focusTracker, 'change:isFocused', (e, n, i) => {
              i ||
                t.model.change(t => {
                  t.removeSelectionAttribute(Mu)
                })
            })
        }
        _handleArrowKeyPress(t, e) {
          const n = this.editor,
            i = n.model,
            s = i.document.selection,
            o = i.schema,
            r = n.editing.view,
            a = (function (t, e) {
              const n = uo(t, e)
              return 'down' === n || 'right' === n
            })(e.keyCode, n.locale.contentLanguageDirection),
            c = r.document.selection.getSelectedElement()
          let l
          Nu(c, n.editing.mapper.toModelElement(c), o)
            ? (l = this._handleArrowKeyPressOnSelectedWidget(a))
            : s.isCollapsed
            ? (l = this._handleArrowKeyPressWhenSelectionNextToAWidget(a))
            : e.shiftKey || (l = this._handleArrowKeyPressWhenNonCollapsedSelection(a)),
            l && (e.preventDefault(), t.stop())
        }
        _handleArrowKeyPressOnSelectedWidget(t) {
          const e = this.editor.model,
            n = Du(e.document.selection)
          return e.change(e => {
            if (!n) return e.setSelectionAttribute(Mu, t ? 'after' : 'before'), !0
            if (!(n === (t ? 'after' : 'before'))) return e.removeSelectionAttribute(Mu), !0
            return !1
          })
        }
        _handleArrowKeyPressWhenSelectionNextToAWidget(t) {
          const e = this.editor,
            n = e.model,
            i = n.schema,
            s = e.plugins.get('Widget'),
            o = s._getObjectElementNextToSelection(t)
          return (
            !!Nu(e.editing.mapper.toViewElement(o), o, i) &&
            (n.change(e => {
              s._setSelectionOverElement(o), e.setSelectionAttribute(Mu, t ? 'before' : 'after')
            }),
            !0)
          )
        }
        _handleArrowKeyPressWhenNonCollapsedSelection(t) {
          const e = this.editor,
            n = e.model,
            i = n.schema,
            s = e.editing.mapper,
            o = n.document.selection,
            r = t ? o.getLastPosition().nodeBefore : o.getFirstPosition().nodeAfter
          return (
            !!Nu(s.toViewElement(r), r, i) &&
            (n.change(e => {
              e.setSelection(r, 'on'), e.setSelectionAttribute(Mu, t ? 'after' : 'before')
            }),
            !0)
          )
        }
        _enableInsertingParagraphsOnButtonClick() {
          const t = this.editor,
            e = t.editing.view
          this._listenToIfEnabled(e.document, 'mousedown', (n, i) => {
            const s = i.domTarget.closest('.ck-widget__type-around__button')
            if (!s) return
            const o = (function (t) {
                return t.classList.contains('ck-widget__type-around__button_before') ? 'before' : 'after'
              })(s),
              r = (function (t, e) {
                const n = t.closest('.ck-widget')
                return e.mapDomToView(n)
              })(s, e.domConverter),
              a = t.editing.mapper.toModelElement(r)
            this._insertParagraph(a, o), i.preventDefault(), n.stop()
          })
        }
        _enableInsertingParagraphsOnEnterKeypress() {
          const t = this.editor,
            e = t.model.document.selection,
            n = t.editing.view
          this._listenToIfEnabled(
            n.document,
            'enter',
            (n, i) => {
              if ('atTarget' != n.eventPhase) return
              const s = e.getSelectedElement(),
                o = t.editing.mapper.toViewElement(s),
                r = t.model.schema
              let a
              this._insertParagraphAccordingToFakeCaretPosition()
                ? (a = !0)
                : Nu(o, s, r) && (this._insertParagraph(s, i.isSoft ? 'before' : 'after'), (a = !0)),
                a && (i.preventDefault(), n.stop())
            },
            { context: Eu }
          )
        }
        _enableInsertingParagraphsOnTypingKeystroke() {
          const t = this.editor.editing.view,
            e = [ro.enter, ro.delete, ro.backspace]
          this._listenToIfEnabled(
            t.document,
            'keydown',
            (t, n) => {
              e.includes(n.keyCode) || Bu(n) || this._insertParagraphAccordingToFakeCaretPosition()
            },
            { priority: 'high' }
          )
        }
        _enableDeleteIntegration() {
          const t = this.editor,
            e = t.editing.view,
            n = t.model,
            i = n.schema
          this._listenToIfEnabled(
            e.document,
            'delete',
            (e, s) => {
              if ('atTarget' != e.eventPhase) return
              const o = Du(n.document.selection)
              if (!o) return
              const r = s.direction,
                a = n.document.selection.getSelectedElement(),
                c = 'forward' == r
              if (('before' === o) === c) t.execute('delete', { selection: n.createSelection(a, 'on') })
              else {
                const e = i.getNearestSelectionRange(n.createPositionAt(a, o), r)
                if (e)
                  if (e.isCollapsed) {
                    const s = n.createSelection(e.start)
                    if ((n.modifySelection(s, { direction: r }), s.focus.isEqual(e.start))) {
                      const t = (function (t, e) {
                        let n = e
                        for (const i of e.getAncestors({ parentFirst: !0 })) {
                          if (i.childCount > 1 || t.isLimit(i)) break
                          n = i
                        }
                        return n
                      })(i, e.start.parent)
                      n.deleteContent(n.createSelection(t, 'on'), { doNotAutoparagraph: !0 })
                    } else
                      n.change(n => {
                        n.setSelection(e), t.execute(c ? 'deleteForward' : 'delete')
                      })
                  } else
                    n.change(n => {
                      n.setSelection(e), t.execute(c ? 'deleteForward' : 'delete')
                    })
              }
              s.preventDefault(), e.stop()
            },
            { context: Eu }
          )
        }
        _enableInsertContentIntegration() {
          const t = this.editor,
            e = this.editor.model,
            n = e.document.selection
          this._listenToIfEnabled(
            t.model,
            'insertContent',
            (t, [i, s]) => {
              if (s && !s.is('documentSelection')) return
              const o = Du(n)
              return o
                ? (t.stop(),
                  e.change(t => {
                    const s = n.getSelectedElement(),
                      r = e.createPositionAt(s, o),
                      a = t.createSelection(r),
                      c = e.insertContent(i, a)
                    return t.setSelection(a), c
                  }))
                : void 0
            },
            { priority: 'high' }
          )
        }
        _enableInsertObjectIntegration() {
          const t = this.editor,
            e = this.editor.model.document.selection
          this._listenToIfEnabled(
            t.model,
            'insertObject',
            (t, n) => {
              const [, i, , s = {}] = n
              if (i && !i.is('documentSelection')) return
              const o = Du(e)
              o && ((s.findOptimalPosition = o), (n[3] = s))
            },
            { priority: 'high' }
          )
        }
        _enableDeleteContentIntegration() {
          const t = this.editor,
            e = this.editor.model.document.selection
          this._listenToIfEnabled(
            t.model,
            'deleteContent',
            (t, [n]) => {
              if (n && !n.is('documentSelection')) return
              Du(e) && t.stop()
            },
            { priority: 'high' }
          )
        }
      }
      function zu(t) {
        const e = t.model
        return (n, i) => {
          const s = i.keyCode == ro.arrowup,
            o = i.keyCode == ro.arrowdown,
            r = i.shiftKey,
            a = e.document.selection
          if (!s && !o) return
          const c = o
          if (
            r &&
            (function (t, e) {
              return !t.isCollapsed && t.isBackward == e
            })(a, c)
          )
            return
          const l = (function (t, e, n) {
            const i = t.model
            if (n) {
              const t = e.isCollapsed ? e.focus : e.getLastPosition(),
                n = $u(i, t, 'forward')
              if (!n) return null
              const s = i.createRange(t, n),
                o = qu(i.schema, s, 'backward')
              return o ? i.createRange(t, o) : null
            }
            {
              const t = e.isCollapsed ? e.focus : e.getFirstPosition(),
                n = $u(i, t, 'backward')
              if (!n) return null
              const s = i.createRange(n, t),
                o = qu(i.schema, s, 'forward')
              return o ? i.createRange(o, t) : null
            }
          })(t, a, c)
          if (l) {
            if (l.isCollapsed) {
              if (a.isCollapsed) return
              if (r) return
            }
            ;(l.isCollapsed ||
              (function (t, e, n) {
                const i = t.model,
                  s = t.view.domConverter
                if (n) {
                  const t = i.createSelection(e.start)
                  i.modifySelection(t),
                    t.focus.isAtEnd || e.start.isEqual(t.focus) || (e = i.createRange(t.focus, e.end))
                }
                const o = t.mapper.toViewRange(e),
                  r = s.viewRangeToDom(o),
                  a = ca.getDomRangeRects(r)
                let c
                for (const t of a)
                  if (void 0 !== c) {
                    if (Math.round(t.top) >= c) return !1
                    c = Math.max(c, Math.round(t.bottom))
                  } else c = Math.round(t.bottom)
                return !0
              })(t, l, c)) &&
              (e.change(t => {
                const n = c ? l.end : l.start
                if (r) {
                  const i = e.createSelection(a.anchor)
                  i.setFocus(n), t.setSelection(i)
                } else t.setSelection(n)
              }),
              n.stop(),
              i.preventDefault(),
              i.stopPropagation())
          }
        }
      }
      function $u(t, e, n) {
        const i = t.schema,
          s = t.createRangeIn(e.root),
          o = 'forward' == n ? 'elementStart' : 'elementEnd'
        for (const { previousPosition: t, item: r, type: a } of s.getWalker({ startPosition: e, direction: n })) {
          if (i.isLimit(r) && !i.isInline(r)) return t
          if (a == o && i.isBlock(r)) return null
        }
        return null
      }
      function qu(t, e, n) {
        const i = 'backward' == n ? e.end : e.start
        if (t.checkChild(i, '$text')) return i
        for (const { nextPosition: i } of e.getWalker({ direction: n })) if (t.checkChild(i, '$text')) return i
        return null
      }
      class Uu extends de {
        static get pluginName() {
          return 'Widget'
        }
        static get requires() {
          return [Wu, bu]
        }
        init() {
          const t = this.editor,
            e = t.editing.view,
            n = e.document
          ;(this._previouslySelected = new Set()),
            this.editor.editing.downcastDispatcher.on('selection', (e, n, i) => {
              const s = i.writer,
                o = n.selection
              if (o.isCollapsed) return
              const r = o.getSelectedElement()
              if (!r) return
              const a = t.editing.mapper.toViewElement(r)
              Eu(a) &&
                i.consumable.consume(o, 'selection') &&
                s.setSelection(s.createRangeOn(a), { fake: !0, label: Ou(a) })
            }),
            this.editor.editing.downcastDispatcher.on(
              'selection',
              (t, e, n) => {
                this._clearPreviouslySelectedWidgets(n.writer)
                const i = n.writer,
                  s = i.document.selection
                let o = null
                for (const t of s.getRanges())
                  for (const e of t) {
                    const t = e.item
                    Eu(t) && !Hu(t, o) && (i.addClass(Cu, t), this._previouslySelected.add(t), (o = t))
                  }
              },
              { priority: 'low' }
            ),
            e.addObserver(Hd),
            this.listenTo(n, 'mousedown', (...t) => this._onMousedown(...t)),
            this.listenTo(
              n,
              'arrowKey',
              (...t) => {
                this._handleSelectionChangeOnArrowKeyPress(...t)
              },
              { context: [Eu, '$text'] }
            ),
            this.listenTo(
              n,
              'arrowKey',
              (...t) => {
                this._preventDefaultOnArrowKeyPress(...t)
              },
              { context: '$root' }
            ),
            this.listenTo(n, 'arrowKey', zu(this.editor.editing), { context: '$text' }),
            this.listenTo(
              n,
              'delete',
              (t, e) => {
                this._handleDelete('forward' == e.direction) && (e.preventDefault(), t.stop())
              },
              { context: '$root' }
            )
        }
        _onMousedown(t, e) {
          const n = this.editor,
            i = n.editing.view,
            s = i.document
          let o = e.target
          if (
            (function (t) {
              for (; t; ) {
                if (t.is('editableElement') && !t.is('rootElement')) return !0
                if (Eu(t)) return !1
                t = t.parent
              }
              return !1
            })(o)
          ) {
            if ((no.isSafari || no.isGecko) && e.domEvent.detail >= 3) {
              const t = n.editing.mapper,
                i = o.is('attributeElement') ? o.findAncestor(t => !t.is('attributeElement')) : o,
                s = t.toModelElement(i)
              e.preventDefault(),
                this.editor.model.change(t => {
                  t.setSelection(s, 'in')
                })
            }
            return
          }
          if (!Eu(o) && ((o = o.findAncestor(Eu)), !o)) return
          no.isAndroid && e.preventDefault(), s.isFocused || i.focus()
          const r = n.editing.mapper.toModelElement(o)
          this._setSelectionOverElement(r)
        }
        _handleSelectionChangeOnArrowKeyPress(t, e) {
          const n = e.keyCode,
            i = this.editor.model,
            s = i.schema,
            o = i.document.selection,
            r = o.getSelectedElement(),
            a = uo(n, this.editor.locale.contentLanguageDirection),
            c = 'down' == a || 'right' == a,
            l = 'up' == a || 'down' == a
          if (r && s.isObject(r)) {
            const n = c ? o.getLastPosition() : o.getFirstPosition(),
              r = s.getNearestSelectionRange(n, c ? 'forward' : 'backward')
            return void (
              r &&
              (i.change(t => {
                t.setSelection(r)
              }),
              e.preventDefault(),
              t.stop())
            )
          }
          if (!o.isCollapsed && !e.shiftKey) {
            const n = o.getFirstPosition(),
              r = o.getLastPosition(),
              a = n.nodeAfter,
              l = r.nodeBefore
            return void (
              ((a && s.isObject(a)) || (l && s.isObject(l))) &&
              (i.change(t => {
                t.setSelection(c ? r : n)
              }),
              e.preventDefault(),
              t.stop())
            )
          }
          if (!o.isCollapsed) return
          const h = this._getObjectElementNextToSelection(c)
          if (h && s.isObject(h)) {
            if (s.isInline(h) && l) return
            this._setSelectionOverElement(h), e.preventDefault(), t.stop()
          }
        }
        _preventDefaultOnArrowKeyPress(t, e) {
          const n = this.editor.model,
            i = n.schema,
            s = n.document.selection.getSelectedElement()
          s && i.isObject(s) && (e.preventDefault(), t.stop())
        }
        _handleDelete(t) {
          if (this.editor.isReadOnly) return
          const e = this.editor.model.document.selection
          if (!e.isCollapsed) return
          const n = this._getObjectElementNextToSelection(t)
          return n
            ? (this.editor.model.change(t => {
                let i = e.anchor.parent
                for (; i.isEmpty; ) {
                  const e = i
                  ;(i = e.parent), t.remove(e)
                }
                this._setSelectionOverElement(n)
              }),
              !0)
            : void 0
        }
        _setSelectionOverElement(t) {
          this.editor.model.change(e => {
            e.setSelection(e.createRangeOn(t))
          })
        }
        _getObjectElementNextToSelection(t) {
          const e = this.editor.model,
            n = e.schema,
            i = e.document.selection,
            s = e.createSelection(i)
          if ((e.modifySelection(s, { direction: t ? 'forward' : 'backward' }), s.isEqual(i))) return null
          const o = t ? s.focus.nodeBefore : s.focus.nodeAfter
          return o && n.isObject(o) ? o : null
        }
        _clearPreviouslySelectedWidgets(t) {
          for (const e of this._previouslySelected) t.removeClass(Cu, e)
          this._previouslySelected.clear()
        }
      }
      function Hu(t, e) {
        return !!e && Array.from(t.getAncestors()).includes(e)
      }
      const Ku = function (t, e, n) {
        var i = !0,
          s = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        return (
          A(n) && ((i = 'leading' in n ? !!n.leading : i), (s = 'trailing' in n ? !!n.trailing : s)),
          Zr(t, e, { leading: i, maxWait: e, trailing: s })
        )
      }
      class Gu extends de {
        static get pluginName() {
          return 'DragDrop'
        }
        static get requires() {
          return [au, Uu]
        }
        init() {
          const t = this.editor,
            e = t.editing.view
          ;(this._draggedRange = null),
            (this._draggingUid = ''),
            (this._draggableElement = null),
            (this._updateDropMarkerThrottled = Ku(t => this._updateDropMarker(t), 40)),
            (this._removeDropMarkerDelayed = Xu(() => this._removeDropMarker(), 40)),
            (this._clearDraggableAttributesDelayed = Xu(() => this._clearDraggableAttributes(), 40)),
            e.addObserver(su),
            e.addObserver(Hd),
            this._setupDragging(),
            this._setupContentInsertionIntegration(),
            this._setupClipboardInputIntegration(),
            this._setupDropMarker(),
            this._setupDraggableAttributeHandling(),
            this.listenTo(t, 'change:isReadOnly', (t, e, n) => {
              n ? this.forceDisabled('readOnlyMode') : this.clearForceDisabled('readOnlyMode')
            }),
            this.on('change:isEnabled', (t, e, n) => {
              n || this._finalizeDragging(!1)
            }),
            no.isAndroid && this.forceDisabled('noAndroidSupport')
        }
        destroy() {
          return (
            this._draggedRange && (this._draggedRange.detach(), (this._draggedRange = null)),
            this._updateDropMarkerThrottled.cancel(),
            this._removeDropMarkerDelayed.cancel(),
            this._clearDraggableAttributesDelayed.cancel(),
            super.destroy()
          )
        }
        _setupDragging() {
          const t = this.editor,
            e = t.model,
            n = e.document,
            i = t.editing.view,
            s = i.document
          this.listenTo(
            s,
            'dragstart',
            (i, r) => {
              const a = n.selection
              if (r.target && r.target.is('editableElement')) return void r.preventDefault()
              const c = r.target ? Zu(r.target) : null
              if (c) {
                const n = t.editing.mapper.toModelElement(c)
                ;(this._draggedRange = Za.fromRange(e.createRangeOn(n))),
                  t.plugins.has('WidgetToolbarRepository') &&
                    t.plugins.get('WidgetToolbarRepository').forceDisabled('dragDrop')
              } else if (!s.selection.isCollapsed) {
                const t = s.selection.getSelectedElement()
                ;(t && Eu(t)) || (this._draggedRange = Za.fromRange(a.getFirstRange()))
              }
              if (!this._draggedRange) return void r.preventDefault()
              ;(this._draggingUid = o()),
                (r.dataTransfer.effectAllowed = this.isEnabled ? 'copyMove' : 'copy'),
                r.dataTransfer.setData('application/ckeditor5-dragging-uid', this._draggingUid)
              const l = e.createSelection(this._draggedRange.toRange()),
                h = t.data.toView(e.getSelectedContent(l))
              s.fire('clipboardOutput', { dataTransfer: r.dataTransfer, content: h, method: i.name }),
                this.isEnabled || (this._draggedRange.detach(), (this._draggedRange = null), (this._draggingUid = ''))
            },
            { priority: 'low' }
          ),
            this.listenTo(
              s,
              'dragend',
              (t, e) => {
                this._finalizeDragging(!e.dataTransfer.isCanceled && 'move' == e.dataTransfer.dropEffect)
              },
              { priority: 'low' }
            ),
            this.listenTo(s, 'dragenter', () => {
              this.isEnabled && i.focus()
            }),
            this.listenTo(s, 'dragleave', () => {
              this._removeDropMarkerDelayed()
            }),
            this.listenTo(
              s,
              'dragging',
              (e, n) => {
                if (!this.isEnabled) return void (n.dataTransfer.dropEffect = 'none')
                this._removeDropMarkerDelayed.cancel()
                const i = Ju(t, n.targetRanges, n.target)
                this._draggedRange || (n.dataTransfer.dropEffect = 'copy'),
                  no.isGecko ||
                    ('copy' == n.dataTransfer.effectAllowed
                      ? (n.dataTransfer.dropEffect = 'copy')
                      : ['all', 'copyMove'].includes(n.dataTransfer.effectAllowed) &&
                        (n.dataTransfer.dropEffect = 'move')),
                  i && this._updateDropMarkerThrottled(i)
              },
              { priority: 'low' }
            )
        }
        _setupClipboardInputIntegration() {
          const t = this.editor,
            e = t.editing.view.document
          this.listenTo(
            e,
            'clipboardInput',
            (e, n) => {
              if ('drop' != n.method) return
              const i = Ju(t, n.targetRanges, n.target)
              if ((this._removeDropMarker(), !i)) return this._finalizeDragging(!1), void e.stop()
              this._draggedRange &&
                this._draggingUid != n.dataTransfer.getData('application/ckeditor5-dragging-uid') &&
                (this._draggedRange.detach(), (this._draggedRange = null), (this._draggingUid = ''))
              if ('move' == Yu(n.dataTransfer) && this._draggedRange && this._draggedRange.containsRange(i, !0))
                return this._finalizeDragging(!1), void e.stop()
              n.targetRanges = [t.editing.mapper.toViewRange(i)]
            },
            { priority: 'high' }
          )
        }
        _setupContentInsertionIntegration() {
          const t = this.editor.plugins.get(au)
          t.on(
            'contentInsertion',
            (t, e) => {
              if (!this.isEnabled || 'drop' !== e.method) return
              const n = e.targetRanges.map(t => this.editor.editing.mapper.toModelRange(t))
              this.editor.model.change(t => t.setSelection(n))
            },
            { priority: 'high' }
          ),
            t.on(
              'contentInsertion',
              (t, e) => {
                if (!this.isEnabled || 'drop' !== e.method) return
                const n = 'move' == Yu(e.dataTransfer),
                  i = !e.resultRange || !e.resultRange.isCollapsed
                this._finalizeDragging(i && n)
              },
              { priority: 'lowest' }
            )
        }
        _setupDraggableAttributeHandling() {
          const t = this.editor,
            e = t.editing.view,
            n = e.document
          this.listenTo(n, 'mousedown', (i, s) => {
            if (no.isAndroid || !s) return
            this._clearDraggableAttributesDelayed.cancel()
            let o = Zu(s.target)
            if (no.isBlink && !t.isReadOnly && !o && !n.selection.isCollapsed) {
              const t = n.selection.getSelectedElement()
              ;(t && Eu(t)) || (o = n.selection.editableElement)
            }
            o &&
              (e.change(t => {
                t.setAttribute('draggable', 'true', o)
              }),
              (this._draggableElement = t.editing.mapper.toModelElement(o)))
          }),
            this.listenTo(n, 'mouseup', () => {
              no.isAndroid || this._clearDraggableAttributesDelayed()
            })
        }
        _clearDraggableAttributes() {
          const t = this.editor.editing
          t.view.change(e => {
            this._draggableElement &&
              '$graveyard' != this._draggableElement.root.rootName &&
              e.removeAttribute('draggable', t.mapper.toViewElement(this._draggableElement)),
              (this._draggableElement = null)
          })
        }
        _setupDropMarker() {
          const t = this.editor
          t.conversion
            .for('editingDowncast')
            .markerToHighlight({ model: 'drop-target', view: { classes: ['ck-clipboard-drop-target-range'] } }),
            t.conversion.for('editingDowncast').markerToElement({
              model: 'drop-target',
              view: (e, { writer: n }) => {
                if (t.model.schema.checkChild(e.markerRange.start, '$text'))
                  return n.createUIElement('span', { class: 'ck ck-clipboard-drop-target-position' }, function (t) {
                    const e = this.toDomElement(t)
                    return (e.innerHTML = '&NoBreak;<span></span>&NoBreak;'), e
                  })
              },
            })
        }
        _updateDropMarker(t) {
          const e = this.editor,
            n = e.model.markers
          e.model.change(e => {
            n.has('drop-target')
              ? n.get('drop-target').getRange().isEqual(t) || e.updateMarker('drop-target', { range: t })
              : e.addMarker('drop-target', { range: t, usingOperation: !1, affectsData: !1 })
          })
        }
        _removeDropMarker() {
          const t = this.editor.model
          this._removeDropMarkerDelayed.cancel(),
            this._updateDropMarkerThrottled.cancel(),
            t.markers.has('drop-target') &&
              t.change(t => {
                t.removeMarker('drop-target')
              })
        }
        _finalizeDragging(t) {
          const e = this.editor,
            n = e.model
          this._removeDropMarker(),
            this._clearDraggableAttributes(),
            e.plugins.has('WidgetToolbarRepository') &&
              e.plugins.get('WidgetToolbarRepository').clearForceDisabled('dragDrop'),
            (this._draggingUid = ''),
            this._draggedRange &&
              (t &&
                this.isEnabled &&
                n.deleteContent(n.createSelection(this._draggedRange), { doNotAutoparagraph: !0 }),
              this._draggedRange.detach(),
              (this._draggedRange = null))
        }
      }
      function Ju(t, e, n) {
        const i = t.model,
          s = t.editing.mapper
        let o = null
        const r = e ? e[0].start : null
        if (
          (n.is('uiElement') && (n = n.parent),
          (o = (function (t, e) {
            const n = t.model,
              i = t.editing.mapper
            if (Eu(e)) return n.createRangeOn(i.toModelElement(e))
            if (!e.is('editableElement')) {
              const t = e.findAncestor(t => Eu(t) || t.is('editableElement'))
              if (Eu(t)) return n.createRangeOn(i.toModelElement(t))
            }
            return null
          })(t, n)),
          o)
        )
          return o
        const a = (function (t, e) {
            const n = t.editing.mapper,
              i = t.editing.view,
              s = n.toModelElement(e)
            if (s) return s
            const o = i.createPositionBefore(e),
              r = n.findMappedViewAncestor(o)
            return n.toModelElement(r)
          })(t, n),
          c = r ? s.toModelPosition(r) : null
        return c
          ? ((o = (function (t, e, n) {
              const i = t.model
              if (!i.schema.checkChild(n, '$block')) return null
              const s = i.createPositionAt(n, 0),
                o = e.path.slice(0, s.path.length),
                r = i.createPositionFromPath(e.root, o).nodeAfter
              if (r && i.schema.isObject(r)) return i.createRangeOn(r)
              return null
            })(t, c, a)),
            o ||
              ((o = i.schema.getNearestSelectionRange(c, no.isGecko ? 'forward' : 'backward')),
              o ||
                (function (t, e) {
                  const n = t.model
                  for (; e; ) {
                    if (n.schema.isObject(e)) return n.createRangeOn(e)
                    e = e.parent
                  }
                })(t, c.parent)))
          : (function (t, e) {
              const n = t.model,
                i = n.schema,
                s = n.createPositionAt(e, 0)
              return i.getNearestSelectionRange(s, 'forward')
            })(t, a)
      }
      function Yu(t) {
        return no.isGecko ? t.dropEffect : ['all', 'copyMove'].includes(t.effectAllowed) ? 'move' : 'copy'
      }
      function Xu(t, e) {
        let n
        function i(...s) {
          i.cancel(), (n = setTimeout(() => t(...s), e))
        }
        return (
          (i.cancel = () => {
            clearTimeout(n)
          }),
          i
        )
      }
      function Zu(t) {
        if (t.is('editableElement')) return null
        if (t.hasClass('ck-widget__selection-handle')) return t.findAncestor(Eu)
        if (Eu(t)) return t
        const e = t.findAncestor(t => Eu(t) || t.is('editableElement'))
        return Eu(e) ? e : null
      }
      class Qu extends de {
        static get pluginName() {
          return 'PastePlainText'
        }
        static get requires() {
          return [au]
        }
        init() {
          const t = this.editor,
            e = t.model,
            n = t.editing.view,
            i = n.document,
            s = e.document.selection
          let o = !1
          n.addObserver(su),
            this.listenTo(i, 'keydown', (t, e) => {
              o = e.shiftKey
            }),
            t.plugins.get(au).on('contentInsertion', (t, n) => {
              ;(o ||
                (function (t, e) {
                  if (t.childCount > 1) return !1
                  const n = t.getChild(0)
                  if (e.isObject(n)) return !1
                  return 0 == [...n.getAttributeKeys()].length
                })(n.content, e.schema)) &&
                e.change(t => {
                  const i = Array.from(s.getAttributes()).filter(
                    ([t]) => e.schema.getAttributeProperties(t).isFormatting
                  )
                  s.isCollapsed || e.deleteContent(s, { doNotAutoparagraph: !0 }), i.push(...s.getAttributes())
                  const o = t.createRangeIn(n.content)
                  for (const e of o.getItems()) e.is('$textProxy') && t.setAttributes(i, e)
                })
            })
        }
      }
      class tf extends de {
        static get pluginName() {
          return 'Clipboard'
        }
        static get requires() {
          return [au, Gu, Qu]
        }
      }
      class ef extends fe {
        execute() {
          const t = this.editor.model,
            e = t.document
          t.change(n => {
            !(function (t, e, n) {
              const i = n.isCollapsed,
                s = n.getFirstRange(),
                o = s.start.parent,
                r = s.end.parent,
                a = o == r
              if (i) {
                const i = cu(t.schema, n.getAttributes())
                nf(t, e, s.end), e.removeSelectionAttribute(n.getAttributeKeys()), e.setSelectionAttribute(i)
              } else {
                const i = !(s.start.isAtStart && s.end.isAtEnd)
                t.deleteContent(n, { leaveUnmerged: i }), a ? nf(t, e, n.focus) : i && e.setSelection(r, 0)
              }
            })(t, n, e.selection),
              this.fire('afterExecute', { writer: n })
          })
        }
        refresh() {
          const t = this.editor.model,
            e = t.document
          this.isEnabled = (function (t, e) {
            if (e.rangeCount > 1) return !1
            const n = e.anchor
            if (!n || !t.checkChild(n, 'softBreak')) return !1
            const i = e.getFirstRange(),
              s = i.start.parent,
              o = i.end.parent
            if ((sf(s, t) || sf(o, t)) && s !== o) return !1
            return !0
          })(t.schema, e.selection)
        }
      }
      function nf(t, e, n) {
        const i = e.createElement('softBreak')
        t.insertContent(i, n), e.setSelection(i, 'after')
      }
      function sf(t, e) {
        return !t.is('rootElement') && (e.isLimit(t) || sf(t.parent, e))
      }
      class of extends de {
        static get pluginName() {
          return 'ShiftEnter'
        }
        init() {
          const t = this.editor,
            e = t.model.schema,
            n = t.conversion,
            i = t.editing.view,
            s = i.document
          e.register('softBreak', { allowWhere: '$text', isInline: !0 }),
            n.for('upcast').elementToElement({ model: 'softBreak', view: 'br' }),
            n
              .for('downcast')
              .elementToElement({ model: 'softBreak', view: (t, { writer: e }) => e.createEmptyElement('br') }),
            i.addObserver(du),
            t.commands.add('shiftEnter', new ef(t)),
            this.listenTo(
              s,
              'enter',
              (e, n) => {
                n.preventDefault(), n.isSoft && (t.execute('shiftEnter'), i.scrollToTheSelection())
              },
              { priority: 'low' }
            )
        }
      }
      class rf extends fe {
        constructor(t) {
          super(t), (this.affectsData = !1)
        }
        execute() {
          const t = this.editor.model,
            e = t.document.selection
          let n = t.schema.getLimitElement(e)
          if (e.containsEntireContent(n) || !af(t.schema, n))
            do {
              if (((n = n.parent), !n)) return
            } while (!af(t.schema, n))
          t.change(t => {
            t.setSelection(n, 'in')
          })
        }
      }
      function af(t, e) {
        return t.isLimit(e) && (t.checkChild(e, '$text') || t.checkChild(e, 'paragraph'))
      }
      const cf = lo('Ctrl+A')
      class lf extends de {
        static get pluginName() {
          return 'SelectAllEditing'
        }
        init() {
          const t = this.editor,
            e = t.editing.view.document
          t.commands.add('selectAll', new rf(t)),
            this.listenTo(e, 'keydown', (e, n) => {
              co(n) === cf && (t.execute('selectAll'), n.preventDefault())
            })
        }
      }
      class hf extends de {
        static get pluginName() {
          return 'SelectAllUI'
        }
        init() {
          const t = this.editor
          t.ui.componentFactory.add('selectAll', e => {
            const n = t.commands.get('selectAll'),
              i = new Jh(e),
              s = e.t
            return (
              i.set({
                label: s('Select all'),
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M.75 15.5a.75.75 0 0 1 .75.75V18l.008.09A.5.5 0 0 0 2 18.5h1.75a.75.75 0 1 1 0 1.5H1.5l-.144-.007a1.5 1.5 0 0 1-1.35-1.349L0 18.5v-2.25a.75.75 0 0 1 .75-.75zm18.5 0a.75.75 0 0 1 .75.75v2.25l-.007.144a1.5 1.5 0 0 1-1.349 1.35L18.5 20h-2.25a.75.75 0 1 1 0-1.5H18a.5.5 0 0 0 .492-.41L18.5 18v-1.75a.75.75 0 0 1 .75-.75zm-10.45 3c.11 0 .2.09.2.2v1.1a.2.2 0 0 1-.2.2H7.2a.2.2 0 0 1-.2-.2v-1.1c0-.11.09-.2.2-.2h1.6zm4 0c.11 0 .2.09.2.2v1.1a.2.2 0 0 1-.2.2h-1.6a.2.2 0 0 1-.2-.2v-1.1c0-.11.09-.2.2-.2h1.6zm.45-5.5a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5zM1.3 11c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H.2a.2.2 0 0 1-.2-.2v-1.6c0-.11.09-.2.2-.2h1.1zm18.5 0c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2h-1.1a.2.2 0 0 1-.2-.2v-1.6c0-.11.09-.2.2-.2h1.1zm-4.55-2a.75.75 0 1 1 0 1.5H4.75a.75.75 0 1 1 0-1.5h10.5zM1.3 7c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H.2a.2.2 0 0 1-.2-.2V7.2c0-.11.09-.2.2-.2h1.1zm18.5 0c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2h-1.1a.2.2 0 0 1-.2-.2V7.2c0-.11.09-.2.2-.2h1.1zm-4.55-2a.75.75 0 1 1 0 1.5h-2.5a.75.75 0 1 1 0-1.5h2.5zm-5 0a.75.75 0 1 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5h5.5zm-6.5-5a.75.75 0 0 1 0 1.5H2a.5.5 0 0 0-.492.41L1.5 2v1.75a.75.75 0 0 1-1.5 0V1.5l.007-.144A1.5 1.5 0 0 1 1.356.006L1.5 0h2.25zM18.5 0l.144.007a1.5 1.5 0 0 1 1.35 1.349L20 1.5v2.25a.75.75 0 1 1-1.5 0V2l-.008-.09A.5.5 0 0 0 18 1.5h-1.75a.75.75 0 1 1 0-1.5h2.25zM8.8 0c.11 0 .2.09.2.2v1.1a.2.2 0 0 1-.2.2H7.2a.2.2 0 0 1-.2-.2V.2c0-.11.09-.2.2-.2h1.6zm4 0c.11 0 .2.09.2.2v1.1a.2.2 0 0 1-.2.2h-1.6a.2.2 0 0 1-.2-.2V.2c0-.11.09-.2.2-.2h1.6z"/></svg>',
                keystroke: 'Ctrl+A',
                tooltip: !0,
              }),
              i.bind('isOn', 'isEnabled').to(n, 'value', 'isEnabled'),
              this.listenTo(i, 'execute', () => {
                t.execute('selectAll'), t.editing.view.focus()
              }),
              i
            )
          })
        }
      }
      class df extends de {
        static get requires() {
          return [lf, hf]
        }
        static get pluginName() {
          return 'SelectAll'
        }
      }
      class uf extends fe {
        constructor(t, e) {
          super(t), (this._buffer = new fu(t.model, e))
        }
        get buffer() {
          return this._buffer
        }
        destroy() {
          super.destroy(), this._buffer.destroy()
        }
        execute(t = {}) {
          const e = this.editor.model,
            n = e.document,
            i = t.text || '',
            s = i.length,
            o = t.range ? e.createSelection(t.range) : n.selection,
            r = t.resultRange
          e.enqueueChange(this._buffer.batch, t => {
            this._buffer.lock(),
              e.deleteContent(o),
              i && e.insertContent(t.createText(i, n.selection.getAttributes()), o),
              r ? t.setSelection(r) : o.is('documentSelection') || t.setSelection(o),
              this._buffer.unlock(),
              this._buffer.input(s)
          })
        }
      }
      class ff {
        constructor(t) {
          ;(this.editor = t), (this.editing = this.editor.editing)
        }
        handle(t, e) {
          if (
            (function (t) {
              if (0 == t.length) return !1
              for (const e of t) if ('children' === e.type && !gu(e)) return !0
              return !1
            })(t)
          )
            this._handleContainerChildrenMutations(t, e)
          else for (const n of t) this._handleTextMutation(n, e), this._handleTextNodeInsertion(n)
        }
        _handleContainerChildrenMutations(t, e) {
          const n = (function (t) {
            const e = t.map(t => t.node).reduce((t, e) => t.getCommonAncestor(e, { includeSelf: !0 }))
            if (!e) return
            return e
              .getAncestors({ includeSelf: !0, parentFirst: !0 })
              .find(t => t.is('containerElement') || t.is('rootElement'))
          })(t)
          if (!n) return
          const i = this.editor.editing.view.domConverter.mapViewToDom(n),
            s = new rr(this.editor.editing.view.document),
            o = this.editor.data.toModel(s.domToView(i)).getChild(0),
            r = this.editor.editing.mapper.toModelElement(n)
          if (!r) return
          const a = Array.from(o.getChildren()),
            c = Array.from(r.getChildren()),
            l = a[a.length - 1],
            h = c[c.length - 1],
            d = l && l.is('element', 'softBreak'),
            u = h && !h.is('element', 'softBreak')
          d && u && a.pop()
          const f = this.editor.model.schema
          if (!mf(a, f) || !mf(c, f)) return
          const m = a
              .map(t => (t.is('$text') ? t.data : '@'))
              .join('')
              .replace(/\u00A0/g, ' '),
            g = c
              .map(t => (t.is('$text') ? t.data : '@'))
              .join('')
              .replace(/\u00A0/g, ' ')
          if (g === m) return
          const p = zo(g, m),
            { firstChangeAt: _, insertions: w, deletions: b } = gf(p)
          let y = null
          e && (y = this.editing.mapper.toModelRange(e.getFirstRange()))
          const v = m.substr(_, w),
            P = this.editor.model.createRange(
              this.editor.model.createPositionAt(r, _),
              this.editor.model.createPositionAt(r, _ + b)
            )
          this.editor.execute('input', { text: v, range: P, resultRange: y })
        }
        _handleTextMutation(t, e) {
          if ('text' != t.type) return
          const n = t.newText.replace(/\u00A0/g, ' '),
            i = t.oldText.replace(/\u00A0/g, ' ')
          if (i === n) return
          const s = zo(i, n),
            { firstChangeAt: o, insertions: r, deletions: a } = gf(s)
          let c = null
          e && (c = this.editing.mapper.toModelRange(e.getFirstRange()))
          const l = this.editing.view.createPositionAt(t.node, o),
            h = this.editing.mapper.toModelPosition(l),
            d = this.editor.model.createRange(h, h.getShiftedBy(a)),
            u = n.substr(o, r)
          this.editor.execute('input', { text: u, range: d, resultRange: c })
        }
        _handleTextNodeInsertion(t) {
          if ('children' != t.type) return
          const e = gu(t),
            n = this.editing.view.createPositionAt(t.node, e.index),
            i = this.editing.mapper.toModelPosition(n),
            s = e.values[0].data
          this.editor.execute('input', { text: s.replace(/\u00A0/g, ' '), range: this.editor.model.createRange(i) })
        }
      }
      function mf(t, e) {
        return t.every(t => e.isInline(t))
      }
      function gf(t) {
        let e = null,
          n = null
        for (let i = 0; i < t.length; i++) {
          'equal' != t[i] && ((e = null === e ? i : e), (n = i))
        }
        let i = 0,
          s = 0
        for (let o = e; o <= n; o++) 'insert' != t[o] && i++, 'delete' != t[o] && s++
        return { insertions: s, deletions: i, firstChangeAt: e }
      }
      class pf extends de {
        static get pluginName() {
          return 'Input'
        }
        init() {
          const t = this.editor,
            e = new uf(t, t.config.get('typing.undoStep') || 20)
          t.commands.add('input', e),
            (function (t) {
              let e = null
              const n = t.model,
                i = t.editing.view,
                s = t.commands.get('input')
              function o(t) {
                if (no.isWindows && _u(t, i.document)) return
                const o = n.document,
                  a = i.document.isComposing,
                  c = e && e.isEqual(o.selection)
                ;(e = null),
                  s.isEnabled &&
                    (Bu(t) ||
                      o.selection.isCollapsed ||
                      (a && 229 === t.keyCode) ||
                      (!a && 229 === t.keyCode && c) ||
                      r())
              }
              function r() {
                const t = s.buffer
                t.lock()
                const e = t.batch
                n.enqueueChange(e, () => {
                  n.deleteContent(n.document.selection)
                }),
                  t.unlock()
              }
              no.isAndroid
                ? i.document.on('beforeinput', (t, e) => o(e), { priority: 'lowest' })
                : i.document.on('keydown', (t, e) => o(e), { priority: 'lowest' }),
                i.document.on(
                  'compositionstart',
                  function () {
                    const t = n.document,
                      e = 1 !== t.selection.rangeCount || t.selection.getFirstRange().isFlat
                    t.selection.isCollapsed || e || r()
                  },
                  { priority: 'lowest' }
                ),
                i.document.on(
                  'compositionend',
                  () => {
                    e = n.createSelection(n.document.selection)
                  },
                  { priority: 'lowest' }
                )
            })(t),
            (function (t) {
              t.editing.view.document.on('mutations', (e, n, i) => {
                new ff(t).handle(n, i)
              })
            })(t)
        }
      }
      class _f extends de {
        static get requires() {
          return [pf, bu]
        }
        static get pluginName() {
          return 'Typing'
        }
      }
      he(
        class {
          constructor(t, e) {
            ;(this.model = t),
              (this.testCallback = e),
              (this.hasMatch = !1),
              this.set('isEnabled', !0),
              this.on('change:isEnabled', () => {
                this.isEnabled
                  ? this._startListening()
                  : (this.stopListening(t.document.selection), this.stopListening(t.document))
              }),
              this._startListening()
          }
          _startListening() {
            const t = this.model.document
            this.listenTo(t.selection, 'change:range', (e, { directChange: n }) => {
              n &&
                (t.selection.isCollapsed
                  ? this._evaluateTextBeforeSelection('selection')
                  : this.hasMatch && (this.fire('unmatched'), (this.hasMatch = !1)))
            }),
              this.listenTo(t, 'change:data', (t, e) => {
                !e.isUndo && e.isLocal && this._evaluateTextBeforeSelection('data', { batch: e })
              })
          }
          _evaluateTextBeforeSelection(t, e = {}) {
            const n = this.model,
              i = n.document.selection,
              s = n.createRange(n.createPositionAt(i.focus.parent, 0), i.focus),
              { text: o, range: r } = (function (t, e) {
                let n = t.start
                return {
                  text: Array.from(t.getItems()).reduce(
                    (t, i) => (i.is('$text') || i.is('$textProxy') ? t + i.data : ((n = e.createPositionAfter(i)), '')),
                    ''
                  ),
                  range: e.createRange(n, t.end),
                }
              })(s, n),
              a = this.testCallback(o)
            if ((!a && this.hasMatch && this.fire('unmatched'), (this.hasMatch = !!a), a)) {
              const n = Object.assign(e, { text: o, range: r })
              'object' == typeof a && Object.assign(n, a), this.fire(`matched:${t}`, n)
            }
          }
        },
        se
      )
      wf('"'), wf("'"), wf("'"), wf('"'), wf('"'), wf("'")
      function wf(t) {
        return new RegExp(`(^|\\s)(${t})([^${t}]*)(${t})$`)
      }
      class bf extends fe {
        constructor(t) {
          super(t),
            (this._stack = []),
            (this._createdBatches = new WeakSet()),
            this.refresh(),
            this.listenTo(
              t.data,
              'set',
              (t, e) => {
                e[1] = { ...e[1] }
                const n = e[1]
                n.batchType || (n.batchType = { isUndoable: !1 })
              },
              { priority: 'high' }
            ),
            this.listenTo(t.data, 'set', (t, e) => {
              e[1].batchType.isUndoable || this.clearStack()
            })
        }
        refresh() {
          this.isEnabled = this._stack.length > 0
        }
        addBatch(t) {
          const e = this.editor.model.document.selection,
            n = { ranges: e.hasOwnRange ? Array.from(e.getRanges()) : [], isBackward: e.isBackward }
          this._stack.push({ batch: t, selection: n }), this.refresh()
        }
        clearStack() {
          ;(this._stack = []), this.refresh()
        }
        _restoreSelection(t, e, n) {
          const i = this.editor.model,
            s = i.document,
            o = [],
            r = t.map(t => t.getTransformedByOperations(n)),
            a = r.flat()
          for (const t of r) {
            const e = t.filter(t => t.root != s.graveyard).filter(t => !vf(t, a))
            e.length && (yf(e), o.push(e[0]))
          }
          o.length &&
            i.change(t => {
              t.setSelection(o, { backward: e })
            })
        }
        _undo(t, e) {
          const n = this.editor.model,
            i = n.document
          this._createdBatches.add(e)
          const s = t.operations.slice().filter(t => t.isDocumentOperation)
          s.reverse()
          for (const t of s) {
            const s = t.baseVersion + 1,
              o = Array.from(i.history.getOperations(s)),
              r = Ld([t.getReversed()], o, {
                useRelations: !0,
                document: this.editor.model.document,
                padWithNoOps: !1,
                forceWeakRemove: !0,
              }).operationsA
            for (const s of r) e.addOperation(s), n.applyOperation(s), i.history.setOperationAsUndone(t, s)
          }
        }
      }
      function yf(t) {
        t.sort((t, e) => (t.start.isBefore(e.start) ? -1 : 1))
        for (let e = 1; e < t.length; e++) {
          const n = t[e - 1].getJoined(t[e], !0)
          n && (e--, t.splice(e, 2, n))
        }
      }
      function vf(t, e) {
        return e.some(e => e !== t && e.containsRange(t, !0))
      }
      class Pf extends bf {
        execute(t = null) {
          const e = t ? this._stack.findIndex(e => e.batch == t) : this._stack.length - 1,
            n = this._stack.splice(e, 1)[0],
            i = this.editor.model.createBatch({ isUndo: !0 })
          this.editor.model.enqueueChange(i, () => {
            this._undo(n.batch, i)
            const t = this.editor.model.document.history.getOperations(n.batch.baseVersion)
            this._restoreSelection(n.selection.ranges, n.selection.isBackward, t), this.fire('revert', n.batch, i)
          }),
            this.refresh()
        }
      }
      class kf extends bf {
        execute() {
          const t = this._stack.pop(),
            e = this.editor.model.createBatch({ isUndo: !0 })
          this.editor.model.enqueueChange(e, () => {
            const n = t.batch.operations[t.batch.operations.length - 1].baseVersion + 1,
              i = this.editor.model.document.history.getOperations(n)
            this._restoreSelection(t.selection.ranges, t.selection.isBackward, i), this._undo(t.batch, e)
          }),
            this.refresh()
        }
      }
      class Af extends de {
        static get pluginName() {
          return 'UndoEditing'
        }
        constructor(t) {
          super(t), (this._batchRegistry = new WeakSet())
        }
        init() {
          const t = this.editor
          ;(this._undoCommand = new Pf(t)),
            (this._redoCommand = new kf(t)),
            t.commands.add('undo', this._undoCommand),
            t.commands.add('redo', this._redoCommand),
            this.listenTo(
              t.model,
              'applyOperation',
              (t, e) => {
                const n = e[0]
                if (!n.isDocumentOperation) return
                const i = n.batch,
                  s = this._redoCommand._createdBatches.has(i),
                  o = this._undoCommand._createdBatches.has(i)
                this._batchRegistry.has(i) ||
                  (this._batchRegistry.add(i),
                  i.isUndoable &&
                    (s
                      ? this._undoCommand.addBatch(i)
                      : o || (this._undoCommand.addBatch(i), this._redoCommand.clearStack())))
              },
              { priority: 'highest' }
            ),
            this.listenTo(this._undoCommand, 'revert', (t, e, n) => {
              this._redoCommand.addBatch(n)
            }),
            t.keystrokes.set('CTRL+Z', 'undo'),
            t.keystrokes.set('CTRL+Y', 'redo'),
            t.keystrokes.set('CTRL+SHIFT+Z', 'redo')
        }
      }
      const Cf =
          '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m5.042 9.367 2.189 1.837a.75.75 0 0 1-.965 1.149l-3.788-3.18a.747.747 0 0 1-.21-.284.75.75 0 0 1 .17-.945L6.23 4.762a.75.75 0 1 1 .964 1.15L4.863 7.866h8.917A.75.75 0 0 1 14 7.9a4 4 0 1 1-1.477 7.718l.344-1.489a2.5 2.5 0 1 0 1.094-4.73l.008-.032H5.042z"/></svg>',
        Ef =
          '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m14.958 9.367-2.189 1.837a.75.75 0 0 0 .965 1.149l3.788-3.18a.747.747 0 0 0 .21-.284.75.75 0 0 0-.17-.945L13.77 4.762a.75.75 0 1 0-.964 1.15l2.331 1.955H6.22A.75.75 0 0 0 6 7.9a4 4 0 1 0 1.477 7.718l-.344-1.489A2.5 2.5 0 1 1 6.039 9.4l-.008-.032h8.927z"/></svg>'
      class Sf extends de {
        static get pluginName() {
          return 'UndoUI'
        }
        init() {
          const t = this.editor,
            e = t.locale,
            n = t.t,
            i = 'ltr' == e.uiLanguageDirection ? Cf : Ef,
            s = 'ltr' == e.uiLanguageDirection ? Ef : Cf
          this._addButton('undo', n('Undo'), 'CTRL+Z', i), this._addButton('redo', n('Redo'), 'CTRL+Y', s)
        }
        _addButton(t, e, n, i) {
          const s = this.editor
          s.ui.componentFactory.add(t, o => {
            const r = s.commands.get(t),
              a = new Jh(o)
            return (
              a.set({ label: e, icon: i, keystroke: n, tooltip: !0 }),
              a.bind('isEnabled').to(r, 'isEnabled'),
              this.listenTo(a, 'execute', () => {
                s.execute(t), s.editing.view.focus()
              }),
              a
            )
          })
        }
      }
      class xf extends de {
        static get requires() {
          return [Af, Sf]
        }
        static get pluginName() {
          return 'Undo'
        }
      }
      class Tf {
        constructor(t) {
          this.set('activeHandlePosition', null),
            this.set('proposedWidthPercents', null),
            this.set('proposedWidth', null),
            this.set('proposedHeight', null),
            this.set('proposedHandleHostWidth', null),
            this.set('proposedHandleHostHeight', null),
            (this._options = t),
            (this._referenceCoordinates = null)
        }
        begin(t, e, n) {
          const i = new ca(e)
          ;(this.activeHandlePosition = (function (t) {
            const e = ['top-left', 'top-right', 'bottom-right', 'bottom-left']
            for (const n of e) if (t.classList.contains(Rf(n))) return n
          })(t)),
            (this._referenceCoordinates = (function (t, e) {
              const n = new ca(t),
                i = e.split('-'),
                s = { x: 'right' == i[1] ? n.right : n.left, y: 'bottom' == i[0] ? n.bottom : n.top }
              return (s.x += t.ownerDocument.defaultView.scrollX), (s.y += t.ownerDocument.defaultView.scrollY), s
            })(
              e,
              (function (t) {
                const e = t.split('-'),
                  n = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }
                return `${n[e[0]]}-${n[e[1]]}`
              })(this.activeHandlePosition)
            )),
            (this.originalWidth = i.width),
            (this.originalHeight = i.height),
            (this.aspectRatio = i.width / i.height)
          const s = n.style.width
          s && s.match(/^\d+(\.\d*)?%$/)
            ? (this.originalWidthPercents = parseFloat(s))
            : (this.originalWidthPercents = (function (t, e) {
                const n = t.parentElement,
                  i = parseFloat(n.ownerDocument.defaultView.getComputedStyle(n).width)
                return (e.width / i) * 100
              })(n, i))
        }
        update(t) {
          ;(this.proposedWidth = t.width),
            (this.proposedHeight = t.height),
            (this.proposedWidthPercents = t.widthPercents),
            (this.proposedHandleHostWidth = t.handleHostWidth),
            (this.proposedHandleHostHeight = t.handleHostHeight)
        }
      }
      function Rf(t) {
        return `ck-widget__resizer__handle-${t}`
      }
      he(Tf, se)
      class Of extends Ah {
        constructor() {
          super()
          const t = this.bindTemplate
          this.setTemplate({
            tag: 'div',
            attributes: {
              class: ['ck', 'ck-size-view', t.to('_viewPosition', t => (t ? `ck-orientation-${t}` : ''))],
              style: { display: t.if('_isVisible', 'none', t => !t) },
            },
            children: [{ text: t.to('_label') }],
          })
        }
        _bindToState(t, e) {
          this.bind('_isVisible').to(e, 'proposedWidth', e, 'proposedHeight', (t, e) => null !== t && null !== e),
            this.bind('_label').to(
              e,
              'proposedHandleHostWidth',
              e,
              'proposedHandleHostHeight',
              e,
              'proposedWidthPercents',
              (e, n, i) => ('px' === t.unit ? `${e}×${n}` : `${i}%`)
            ),
            this.bind('_viewPosition').to(
              e,
              'activeHandlePosition',
              e,
              'proposedHandleHostWidth',
              e,
              'proposedHandleHostHeight',
              (t, e, n) => (e < 50 || n < 50 ? 'above-center' : t)
            )
        }
        _dismiss() {
          this.unbind(), (this._isVisible = !1)
        }
      }
      class If {
        constructor(t) {
          ;(this._options = t),
            (this._viewResizerWrapper = null),
            this.set('isEnabled', !0),
            this.decorate('begin'),
            this.decorate('cancel'),
            this.decorate('commit'),
            this.decorate('updateSize'),
            this.on(
              'commit',
              t => {
                this.state.proposedWidth || this.state.proposedWidthPercents || (this._cleanup(), t.stop())
              },
              { priority: 'high' }
            ),
            this.on('change:isEnabled', () => {
              this.isEnabled && this.redraw()
            })
        }
        attach() {
          const t = this,
            e = this._options.viewElement
          this._options.editor.editing.view.change(n => {
            const i = n.createUIElement('div', { class: 'ck ck-reset_all ck-widget__resizer' }, function (e) {
              const n = this.toDomElement(e)
              return (
                t._appendHandles(n),
                t._appendSizeUI(n),
                t.on('change:isEnabled', (t, e, i) => {
                  n.style.display = i ? '' : 'none'
                }),
                (n.style.display = t.isEnabled ? '' : 'none'),
                n
              )
            })
            n.insert(n.createPositionAt(e, 'end'), i),
              n.addClass('ck-widget_with-resizer', e),
              (this._viewResizerWrapper = i)
          })
        }
        begin(t) {
          ;(this.state = new Tf(this._options)),
            this._sizeView._bindToState(this._options, this.state),
            (this._initialViewWidth = this._options.viewElement.getStyle('width')),
            this.state.begin(t, this._getHandleHost(), this._getResizeHost())
        }
        updateSize(t) {
          const e = this._proposeNewSize(t)
          this._options.editor.editing.view.change(t => {
            const n = this._options.unit || '%',
              i = ('%' === n ? e.widthPercents : e.width) + n
            t.setStyle('width', i, this._options.viewElement)
          })
          const n = this._getHandleHost(),
            i = new ca(n)
          ;(e.handleHostWidth = Math.round(i.width)), (e.handleHostHeight = Math.round(i.height))
          const s = new ca(n)
          ;(e.width = Math.round(s.width)), (e.height = Math.round(s.height)), this.redraw(i), this.state.update(e)
        }
        commit() {
          const t = this._options.unit || '%',
            e = ('%' === t ? this.state.proposedWidthPercents : this.state.proposedWidth) + t
          this._options.editor.editing.view.change(() => {
            this._cleanup(), this._options.onCommit(e)
          })
        }
        cancel() {
          this._cleanup()
        }
        destroy() {
          this.cancel()
        }
        redraw(t) {
          const e = this._domResizerWrapper
          if (!((n = e) && n.ownerDocument && n.ownerDocument.contains(n))) return
          var n
          const i = e.parentElement,
            s = this._getHandleHost(),
            o = this._viewResizerWrapper,
            r = [o.getStyle('width'), o.getStyle('height'), o.getStyle('left'), o.getStyle('top')]
          let a
          if (i.isSameNode(s)) {
            const e = t || new ca(s)
            a = [e.width + 'px', e.height + 'px', void 0, void 0]
          } else a = [s.offsetWidth + 'px', s.offsetHeight + 'px', s.offsetLeft + 'px', s.offsetTop + 'px']
          'same' !== Ni(r, a) &&
            this._options.editor.editing.view.change(t => {
              t.setStyle({ width: a[0], height: a[1], left: a[2], top: a[3] }, o)
            })
        }
        containsHandle(t) {
          return this._domResizerWrapper.contains(t)
        }
        static isResizeHandle(t) {
          return t.classList.contains('ck-widget__resizer__handle')
        }
        _cleanup() {
          this._sizeView._dismiss()
          this._options.editor.editing.view.change(t => {
            t.setStyle('width', this._initialViewWidth, this._options.viewElement)
          })
        }
        _proposeNewSize(t) {
          const e = this.state,
            n = { x: (i = t).pageX, y: i.pageY }
          var i
          const s = !this._options.isCentered || this._options.isCentered(this),
            o = {
              x: e._referenceCoordinates.x - (n.x + e.originalWidth),
              y: n.y - e.originalHeight - e._referenceCoordinates.y,
            }
          s && e.activeHandlePosition.endsWith('-right') && (o.x = n.x - (e._referenceCoordinates.x + e.originalWidth)),
            s && (o.x *= 2)
          const r = { width: Math.abs(e.originalWidth + o.x), height: Math.abs(e.originalHeight + o.y) }
          ;(r.dominant = r.width / e.aspectRatio > r.height ? 'width' : 'height'), (r.max = r[r.dominant])
          const a = { width: r.width, height: r.height }
          return (
            'width' == r.dominant ? (a.height = a.width / e.aspectRatio) : (a.width = a.height * e.aspectRatio),
            {
              width: Math.round(a.width),
              height: Math.round(a.height),
              widthPercents: Math.min(
                Math.round((e.originalWidthPercents / e.originalWidth) * a.width * 100) / 100,
                100
              ),
            }
          )
        }
        _getResizeHost() {
          const t = this._domResizerWrapper.parentElement
          return this._options.getResizeHost(t)
        }
        _getHandleHost() {
          const t = this._domResizerWrapper.parentElement
          return this._options.getHandleHost(t)
        }
        get _domResizerWrapper() {
          return this._options.editor.editing.view.domConverter.mapViewToDom(this._viewResizerWrapper)
        }
        _appendHandles(t) {
          const e = ['top-left', 'top-right', 'bottom-right', 'bottom-left']
          for (const i of e)
            t.appendChild(
              new Ch({
                tag: 'div',
                attributes: { class: 'ck-widget__resizer__handle ' + ((n = i), `ck-widget__resizer__handle-${n}`) },
              }).render()
            )
          var n
        }
        _appendSizeUI(t) {
          ;(this._sizeView = new Of()), this._sizeView.render(), t.appendChild(this._sizeView.element)
        }
      }
      he(If, se)
      he(
        class extends de {
          static get pluginName() {
            return 'WidgetResize'
          }
          init() {
            const t = this.editor.editing,
              e = Xo.window.document
            this.set('visibleResizer', null),
              this.set('_activeResizer', null),
              (this._resizers = new Map()),
              t.view.addObserver(Hd),
              (this._observer = Object.create(dr)),
              this.listenTo(t.view.document, 'mousedown', this._mouseDownListener.bind(this), { priority: 'high' }),
              this._observer.listenTo(e, 'mousemove', this._mouseMoveListener.bind(this)),
              this._observer.listenTo(e, 'mouseup', this._mouseUpListener.bind(this))
            const n = () => {
              this.visibleResizer && this.visibleResizer.redraw()
            }
            ;(this._redrawFocusedResizerThrottled = Ku(n, 200)),
              this.on('change:visibleResizer', n),
              this.editor.ui.on('update', this._redrawFocusedResizerThrottled),
              this.editor.model.document.on(
                'change',
                () => {
                  for (const [t, e] of this._resizers) t.isAttached() || (this._resizers.delete(t), e.destroy())
                },
                { priority: 'lowest' }
              ),
              this._observer.listenTo(Xo.window, 'resize', this._redrawFocusedResizerThrottled)
            const i = this.editor.editing.view.document.selection
            i.on('change', () => {
              const t = i.getSelectedElement()
              this.visibleResizer = this.getResizerByViewElement(t) || null
            })
          }
          destroy() {
            this._observer.stopListening()
            for (const t of this._resizers.values()) t.destroy()
            this._redrawFocusedResizerThrottled.cancel()
          }
          attachTo(t) {
            const e = new If(t),
              n = this.editor.plugins
            if ((e.attach(), n.has('WidgetToolbarRepository'))) {
              const t = n.get('WidgetToolbarRepository')
              e.on(
                'begin',
                () => {
                  t.forceDisabled('resize')
                },
                { priority: 'lowest' }
              ),
                e.on(
                  'cancel',
                  () => {
                    t.clearForceDisabled('resize')
                  },
                  { priority: 'highest' }
                ),
                e.on(
                  'commit',
                  () => {
                    t.clearForceDisabled('resize')
                  },
                  { priority: 'highest' }
                )
            }
            this._resizers.set(t.viewElement, e)
            const i = this.editor.editing.view.document.selection.getSelectedElement()
            return this.getResizerByViewElement(i) == e && (this.visibleResizer = e), e
          }
          getResizerByViewElement(t) {
            return this._resizers.get(t)
          }
          _getResizerByHandle(t) {
            for (const e of this._resizers.values()) if (e.containsHandle(t)) return e
          }
          _mouseDownListener(t, e) {
            const n = e.domTarget
            If.isResizeHandle(n) &&
              ((this._activeResizer = this._getResizerByHandle(n)),
              this._activeResizer && (this._activeResizer.begin(n), t.stop(), e.preventDefault()))
          }
          _mouseMoveListener(t, e) {
            this._activeResizer && this._activeResizer.updateSize(e)
          }
          _mouseUpListener() {
            this._activeResizer && (this._activeResizer.commit(), (this._activeResizer = null))
          }
        },
        se
      )
      class Mf extends fe {
        refresh() {
          const t = this.editor.model,
            e = t.schema,
            n = t.document.selection
          this.isEnabled = (function (t, e, n) {
            const i = (function (t, e) {
              const n = (function (t, e) {
                const n = t.getSelectedElement()
                if (n) {
                  const i = Du(t)
                  if (i) return e.createRange(e.createPositionAt(n, i))
                }
                return Jl(t, e)
              })(t, e).start.parent
              if (n.isEmpty && !n.is('element', '$root')) return n.parent
              return n
            })(t, n)
            return e.checkChild(i, 'horizontalLine')
          })(n, e, t)
        }
        execute() {
          const t = this.editor.model
          t.change(e => {
            const n = e.createElement('horizontalLine')
            t.insertObject(n, null, null, { setSelection: 'after' })
          })
        }
      }
      class Nf extends de {
        static get pluginName() {
          return 'HorizontalLineEditing'
        }
        init() {
          const t = this.editor,
            e = t.model.schema,
            n = t.t,
            i = t.conversion
          e.register('horizontalLine', { inheritAllFrom: '$blockObject' }),
            i
              .for('dataDowncast')
              .elementToElement({ model: 'horizontalLine', view: (t, { writer: e }) => e.createEmptyElement('hr') }),
            i.for('editingDowncast').elementToStructure({
              model: 'horizontalLine',
              view: (t, { writer: e }) => {
                const i = n('Horizontal line'),
                  s = e.createContainerElement('div', null, e.createEmptyElement('hr'))
                return (
                  e.addClass('ck-horizontal-line', s),
                  e.setCustomProperty('hr', !0, s),
                  (function (t, e, n) {
                    return e.setCustomProperty('horizontalLine', !0, t), Su(t, e, { label: n })
                  })(s, e, i)
                )
              },
            }),
            i.for('upcast').elementToElement({ view: 'hr', model: 'horizontalLine' }),
            t.commands.add('horizontalLine', new Mf(t))
        }
      }
      class Df extends de {
        static get pluginName() {
          return 'HorizontalLineUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add('horizontalLine', n => {
            const i = t.commands.get('horizontalLine'),
              s = new Jh(n)
            return (
              s.set({
                label: e('Horizontal line'),
                icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 9h16v2H2z"/></svg>',
                tooltip: !0,
              }),
              s.bind('isEnabled').to(i, 'isEnabled'),
              this.listenTo(s, 'execute', () => {
                t.execute('horizontalLine'), t.editing.view.focus()
              }),
              s
            )
          })
        }
      }
      const Ff = 'italic'
      class Bf extends de {
        static get pluginName() {
          return 'ItalicEditing'
        }
        init() {
          const t = this.editor
          t.model.schema.extend('$text', { allowAttributes: Ff }),
            t.model.schema.setAttributeProperties(Ff, { isFormatting: !0, copyOnEnter: !0 }),
            t.conversion.attributeToElement({
              model: Ff,
              view: 'i',
              upcastAlso: ['em', { styles: { 'font-style': 'italic' } }],
            }),
            t.commands.add(Ff, new Zd(t, Ff)),
            t.keystrokes.set('CTRL+I', Ff)
        }
      }
      const Vf = 'italic'
      class Lf extends de {
        static get pluginName() {
          return 'ItalicUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add(Vf, n => {
            const i = t.commands.get(Vf),
              s = new Jh(n)
            return (
              s.set({
                label: e('Italic'),
                icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m9.586 14.633.021.004c-.036.335.095.655.393.962.082.083.173.15.274.201h1.474a.6.6 0 1 1 0 1.2H5.304a.6.6 0 0 1 0-1.2h1.15c.474-.07.809-.182 1.005-.334.157-.122.291-.32.404-.597l2.416-9.55a1.053 1.053 0 0 0-.281-.823 1.12 1.12 0 0 0-.442-.296H8.15a.6.6 0 0 1 0-1.2h6.443a.6.6 0 1 1 0 1.2h-1.195c-.376.056-.65.155-.823.296-.215.175-.423.439-.623.79l-2.366 9.347z"/></svg>',
                keystroke: 'CTRL+I',
                tooltip: !0,
                isToggleable: !0,
              }),
              s.bind('isOn', 'isEnabled').to(i, 'value', 'isEnabled'),
              this.listenTo(s, 'execute', () => {
                t.execute(Vf), t.editing.view.focus()
              }),
              s
            )
          })
        }
      }
      class jf extends fe {
        constructor(t, e) {
          super(t), (this.type = e)
        }
        refresh() {
          ;(this.value = this._getValue()), (this.isEnabled = this._checkEnabled())
        }
        execute(t = {}) {
          const e = this.editor.model,
            n = e.document,
            i = Array.from(n.selection.getSelectedBlocks()).filter(t => zf(t, e.schema)),
            s = void 0 !== t.forceValue ? !t.forceValue : this.value
          e.change(t => {
            if (s) {
              let e = i[i.length - 1].nextSibling,
                n = Number.POSITIVE_INFINITY,
                s = []
              for (; e && 'listItem' == e.name && 0 !== e.getAttribute('listIndent'); ) {
                const t = e.getAttribute('listIndent')
                t < n && (n = t)
                const i = t - n
                s.push({ element: e, listIndent: i }), (e = e.nextSibling)
              }
              s = s.reverse()
              for (const e of s) t.setAttribute('listIndent', e.listIndent, e.element)
            }
            if (!s) {
              let t = Number.POSITIVE_INFINITY
              for (const e of i)
                e.is('element', 'listItem') && e.getAttribute('listIndent') < t && (t = e.getAttribute('listIndent'))
              ;(t = 0 === t ? 1 : t), Wf(i, !0, t), Wf(i, !1, t)
            }
            for (const e of i.reverse())
              s && 'listItem' == e.name
                ? t.rename(e, 'paragraph')
                : s || 'listItem' == e.name
                ? s ||
                  'listItem' != e.name ||
                  e.getAttribute('listType') == this.type ||
                  t.setAttribute('listType', this.type, e)
                : (t.setAttributes({ listType: this.type, listIndent: 0 }, e), t.rename(e, 'listItem'))
            this.fire('_executeCleanup', i)
          })
        }
        _getValue() {
          const t = ka(this.editor.model.document.selection.getSelectedBlocks())
          return !!t && t.is('element', 'listItem') && t.getAttribute('listType') == this.type
        }
        _checkEnabled() {
          if (this.value) return !0
          const t = this.editor.model.document.selection,
            e = this.editor.model.schema,
            n = ka(t.getSelectedBlocks())
          return !!n && zf(n, e)
        }
      }
      function Wf(t, e, n) {
        const i = e ? t[0] : t[t.length - 1]
        if (i.is('element', 'listItem')) {
          let s = i[e ? 'previousSibling' : 'nextSibling'],
            o = i.getAttribute('listIndent')
          for (; s && s.is('element', 'listItem') && s.getAttribute('listIndent') >= n; )
            o > s.getAttribute('listIndent') && (o = s.getAttribute('listIndent')),
              s.getAttribute('listIndent') == o && t[e ? 'unshift' : 'push'](s),
              (s = s[e ? 'previousSibling' : 'nextSibling'])
        }
      }
      function zf(t, e) {
        return e.checkChild(t.parent, 'listItem') && !e.isObject(t)
      }
      class $f extends fe {
        constructor(t, e) {
          super(t), (this._indentBy = 'forward' == e ? 1 : -1)
        }
        refresh() {
          this.isEnabled = this._checkEnabled()
        }
        execute() {
          const t = this.editor.model,
            e = t.document
          let n = Array.from(e.selection.getSelectedBlocks())
          t.change(t => {
            const e = n[n.length - 1]
            let i = e.nextSibling
            for (; i && 'listItem' == i.name && i.getAttribute('listIndent') > e.getAttribute('listIndent'); )
              n.push(i), (i = i.nextSibling)
            this._indentBy < 0 && (n = n.reverse())
            for (const e of n) {
              const n = e.getAttribute('listIndent') + this._indentBy
              n < 0 ? t.rename(e, 'paragraph') : t.setAttribute('listIndent', n, e)
            }
            this.fire('_executeCleanup', n)
          })
        }
        _checkEnabled() {
          const t = ka(this.editor.model.document.selection.getSelectedBlocks())
          if (!t || !t.is('element', 'listItem')) return !1
          if (this._indentBy > 0) {
            const e = t.getAttribute('listIndent'),
              n = t.getAttribute('listType')
            let i = t.previousSibling
            for (; i && i.is('element', 'listItem') && i.getAttribute('listIndent') >= e; ) {
              if (i.getAttribute('listIndent') == e) return i.getAttribute('listType') == n
              i = i.previousSibling
            }
            return !1
          }
          return !0
        }
      }
      function qf(t, e) {
        const n = e.mapper,
          i = e.writer,
          s = 'numbered' == t.getAttribute('listType') ? 'ol' : 'ul',
          o = (function (t) {
            const e = t.createContainerElement('li')
            return (e.getFillerOffset = Yf), e
          })(i),
          r = i.createContainerElement(s, null)
        return i.insert(i.createPositionAt(r, 0), o), n.bindElements(t, o), o
      }
      function Uf(t, e, n, i) {
        const s = e.parent,
          o = n.mapper,
          r = n.writer
        let a = o.toViewPosition(i.createPositionBefore(t))
        const c = Gf(t.previousSibling, {
            sameIndent: !0,
            smallerIndent: !0,
            listIndent: t.getAttribute('listIndent'),
          }),
          l = t.previousSibling
        if (c && c.getAttribute('listIndent') == t.getAttribute('listIndent')) {
          const t = o.toViewElement(c)
          a = r.breakContainer(r.createPositionAfter(t))
        } else if (l && 'listItem' == l.name) {
          a = o.toViewPosition(i.createPositionAt(l, 'end'))
          const t = o.findMappedViewAncestor(a),
            e = (function (t) {
              for (const e of t.getChildren()) if ('ul' == e.name || 'ol' == e.name) return e
              return null
            })(t)
          a = e ? r.createPositionBefore(e) : r.createPositionAt(t, 'end')
        } else a = o.toViewPosition(i.createPositionBefore(t))
        if (((a = Kf(a)), r.insert(a, s), l && 'listItem' == l.name)) {
          const t = o.toViewElement(l),
            n = r.createRange(r.createPositionAt(t, 0), a).getWalker({ ignoreElementEnd: !0 })
          for (const t of n)
            if (t.item.is('element', 'li')) {
              const i = r.breakContainer(r.createPositionBefore(t.item)),
                s = t.item.parent,
                o = r.createPositionAt(e, 'end')
              Hf(r, o.nodeBefore, o.nodeAfter), r.move(r.createRangeOn(s), o), (n.position = i)
            }
        } else {
          const n = s.nextSibling
          if (n && (n.is('element', 'ul') || n.is('element', 'ol'))) {
            let i = null
            for (const e of n.getChildren()) {
              const n = o.toModelElement(e)
              if (!(n && n.getAttribute('listIndent') > t.getAttribute('listIndent'))) break
              i = e
            }
            i &&
              (r.breakContainer(r.createPositionAfter(i)),
              r.move(r.createRangeOn(i.parent), r.createPositionAt(e, 'end')))
          }
        }
        Hf(r, s, s.nextSibling), Hf(r, s.previousSibling, s)
      }
      function Hf(t, e, n) {
        return !e ||
          !n ||
          ('ul' != e.name && 'ol' != e.name) ||
          e.name != n.name ||
          e.getAttribute('class') !== n.getAttribute('class')
          ? null
          : t.mergeContainers(t.createPositionAfter(e))
      }
      function Kf(t) {
        return t.getLastMatchingPosition(t => t.item.is('uiElement'))
      }
      function Gf(t, e) {
        const n = !!e.sameIndent,
          i = !!e.smallerIndent,
          s = e.listIndent
        let o = t
        for (; o && 'listItem' == o.name; ) {
          const t = o.getAttribute('listIndent')
          if ((n && s == t) || (i && s > t)) return o
          o = 'forward' === e.direction ? o.nextSibling : o.previousSibling
        }
        return null
      }
      function Jf(t, e, n, i) {
        t.ui.componentFactory.add(e, s => {
          const o = t.commands.get(e),
            r = new Jh(s)
          return (
            r.set({ label: n, icon: i, tooltip: !0, isToggleable: !0 }),
            r.bind('isOn', 'isEnabled').to(o, 'value', 'isEnabled'),
            r.on('execute', () => {
              t.execute(e), t.editing.view.focus()
            }),
            r
          )
        })
      }
      function Yf() {
        const t = !this.isEmpty && ('ul' == this.getChild(0).name || 'ol' == this.getChild(0).name)
        return this.isEmpty || t ? 0 : Rs.call(this)
      }
      function Xf(t) {
        return (e, n, i) => {
          const s = i.consumable
          if (
            !s.test(n.item, 'insert') ||
            !s.test(n.item, 'attribute:listType') ||
            !s.test(n.item, 'attribute:listIndent')
          )
            return
          s.consume(n.item, 'insert'),
            s.consume(n.item, 'attribute:listType'),
            s.consume(n.item, 'attribute:listIndent')
          const o = n.item
          Uf(o, qf(o, i), i, t)
        }
      }
      function Zf(t, e, n) {
        if (!n.consumable.test(e.item, t.name)) return
        const i = n.mapper.toViewElement(e.item),
          s = n.writer
        s.breakContainer(s.createPositionBefore(i)), s.breakContainer(s.createPositionAfter(i))
        const o = i.parent,
          r = 'numbered' == e.attributeNewValue ? 'ol' : 'ul'
        s.rename(r, o)
      }
      function Qf(t, e, n) {
        n.consumable.consume(e.item, t.name)
        const i = n.mapper.toViewElement(e.item).parent,
          s = n.writer
        Hf(s, i, i.nextSibling), Hf(s, i.previousSibling, i)
      }
      function tm(t, e, n) {
        if (n.consumable.test(e.item, t.name) && 'listItem' != e.item.name) {
          let t = n.mapper.toViewPosition(e.range.start)
          const i = n.writer,
            s = []
          for (
            ;
            ('ul' == t.parent.name || 'ol' == t.parent.name) && ((t = i.breakContainer(t)), 'li' == t.parent.name);

          ) {
            const e = t,
              n = i.createPositionAt(t.parent, 'end')
            if (!e.isEqual(n)) {
              const t = i.remove(i.createRange(e, n))
              s.push(t)
            }
            t = i.createPositionAfter(t.parent)
          }
          if (s.length > 0) {
            for (let e = 0; e < s.length; e++) {
              const n = t.nodeBefore
              if (((t = i.insert(t, s[e]).end), e > 0)) {
                const e = Hf(i, n, n.nextSibling)
                e && e.parent == n && t.offset--
              }
            }
            Hf(i, t.nodeBefore, t.nodeAfter)
          }
        }
      }
      function em(t, e, n) {
        const i = n.mapper.toViewPosition(e.position),
          s = i.nodeBefore,
          o = i.nodeAfter
        Hf(n.writer, s, o)
      }
      function nm(t, e, n) {
        if (n.consumable.consume(e.viewItem, { name: !0 })) {
          const t = n.writer,
            i = t.createElement('listItem'),
            s = (function (t) {
              let e = 0,
                n = t.parent
              for (; n; ) {
                if (n.is('element', 'li')) e++
                else {
                  const t = n.previousSibling
                  t && t.is('element', 'li') && e++
                }
                n = n.parent
              }
              return e
            })(e.viewItem)
          t.setAttribute('listIndent', s, i)
          const o = e.viewItem.parent && 'ol' == e.viewItem.parent.name ? 'numbered' : 'bulleted'
          if ((t.setAttribute('listType', o, i), !n.safeInsert(i, e.modelCursor))) return
          const r = (function (t, e, n) {
            const { writer: i, schema: s } = n
            let o = i.createPositionAfter(t)
            for (const r of e)
              if ('ul' == r.name || 'ol' == r.name) o = n.convertItem(r, o).modelCursor
              else {
                const e = n.convertItem(r, i.createPositionAt(t, 'end')),
                  a = e.modelRange.start.nodeAfter
                a &&
                  a.is('element') &&
                  !s.checkChild(t, a.name) &&
                  ((t = e.modelCursor.parent.is('element', 'listItem') ? e.modelCursor.parent : am(e.modelCursor)),
                  (o = i.createPositionAfter(t)))
              }
            return o
          })(i, e.viewItem.getChildren(), n)
          ;(e.modelRange = t.createRange(e.modelCursor, r)), n.updateConversionResult(i, e)
        }
      }
      function im(t, e, n) {
        if (n.consumable.test(e.viewItem, { name: !0 })) {
          const t = Array.from(e.viewItem.getChildren())
          for (const e of t) {
            !(e.is('element', 'li') || lm(e)) && e._remove()
          }
        }
      }
      function sm(t, e, n) {
        if (n.consumable.test(e.viewItem, { name: !0 })) {
          if (0 === e.viewItem.childCount) return
          const t = [...e.viewItem.getChildren()]
          let n = !1
          for (const e of t) n && !lm(e) && e._remove(), lm(e) && (n = !0)
        }
      }
      function om(t) {
        return (e, n) => {
          if (n.isPhantom) return
          const i = n.modelPosition.nodeBefore
          if (i && i.is('element', 'listItem')) {
            const e = n.mapper.toViewElement(i),
              s = e.getAncestors().find(lm),
              o = t.createPositionAt(e, 0).getWalker()
            for (const t of o) {
              if ('elementStart' == t.type && t.item.is('element', 'li')) {
                n.viewPosition = t.previousPosition
                break
              }
              if ('elementEnd' == t.type && t.item == s) {
                n.viewPosition = t.nextPosition
                break
              }
            }
          }
        }
      }
      function rm(t, [e, n]) {
        let i,
          s = e.is('documentFragment') ? e.getChild(0) : e
        if (((i = n ? this.createSelection(n) : this.document.selection), s && s.is('element', 'listItem'))) {
          const t = i.getFirstPosition()
          let e = null
          if (
            (t.parent.is('element', 'listItem')
              ? (e = t.parent)
              : t.nodeBefore && t.nodeBefore.is('element', 'listItem') && (e = t.nodeBefore),
            e)
          ) {
            const t = e.getAttribute('listIndent')
            if (t > 0)
              for (; s && s.is('element', 'listItem'); )
                s._setAttribute('listIndent', s.getAttribute('listIndent') + t), (s = s.nextSibling)
          }
        }
      }
      function am(t) {
        const e = new Na({ startPosition: t })
        let n
        do {
          n = e.next()
        } while (!n.value.item.is('element', 'listItem'))
        return n.value.item
      }
      function cm(t, e, n, i, s, o) {
        const r = Gf(e.nodeBefore, { sameIndent: !0, smallerIndent: !0, listIndent: t, foo: 'b' }),
          a = s.mapper,
          c = s.writer,
          l = r ? r.getAttribute('listIndent') : null
        let h
        if (r)
          if (l == t) {
            const t = a.toViewElement(r).parent
            h = c.createPositionAfter(t)
          } else {
            const t = o.createPositionAt(r, 'end')
            h = a.toViewPosition(t)
          }
        else h = n
        h = Kf(h)
        for (const t of [...i.getChildren()])
          lm(t) && ((h = c.move(c.createRangeOn(t), h).end), Hf(c, t, t.nextSibling), Hf(c, t.previousSibling, t))
      }
      function lm(t) {
        return t.is('element', 'ol') || t.is('element', 'ul')
      }
      class hm extends de {
        static get pluginName() {
          return 'ListEditing'
        }
        static get requires() {
          return [uu, bu]
        }
        init() {
          const t = this.editor
          t.model.schema.register('listItem', { inheritAllFrom: '$block', allowAttributes: ['listType', 'listIndent'] })
          const e = t.data,
            n = t.editing
          var i
          t.model.document.registerPostFixer(e =>
            (function (t, e) {
              const n = t.document.differ.getChanges(),
                i = new Map()
              let s = !1
              for (const i of n)
                if ('insert' == i.type && 'listItem' == i.name) o(i.position)
                else if ('insert' == i.type && 'listItem' != i.name) {
                  if ('$text' != i.name) {
                    const n = i.position.nodeAfter
                    n.hasAttribute('listIndent') && (e.removeAttribute('listIndent', n), (s = !0)),
                      n.hasAttribute('listType') && (e.removeAttribute('listType', n), (s = !0)),
                      n.hasAttribute('listStyle') && (e.removeAttribute('listStyle', n), (s = !0)),
                      n.hasAttribute('listReversed') && (e.removeAttribute('listReversed', n), (s = !0)),
                      n.hasAttribute('listStart') && (e.removeAttribute('listStart', n), (s = !0))
                    for (const e of Array.from(t.createRangeIn(n)).filter(t => t.item.is('element', 'listItem')))
                      o(e.previousPosition)
                  }
                  o(i.position.getShiftedBy(i.length))
                } else
                  'remove' == i.type && 'listItem' == i.name
                    ? o(i.position)
                    : (('attribute' == i.type && 'listIndent' == i.attributeKey) ||
                        ('attribute' == i.type && 'listType' == i.attributeKey)) &&
                      o(i.range.start)
              for (const t of i.values()) r(t), a(t)
              return s
              function o(t) {
                const e = t.nodeBefore
                if (e && e.is('element', 'listItem')) {
                  let t = e
                  if (i.has(t)) return
                  for (let e = t.previousSibling; e && e.is('element', 'listItem'); e = t.previousSibling)
                    if (((t = e), i.has(t))) return
                  i.set(e, t)
                } else {
                  const e = t.nodeAfter
                  e && e.is('element', 'listItem') && i.set(e, e)
                }
              }
              function r(t) {
                let n = 0,
                  i = null
                for (; t && t.is('element', 'listItem'); ) {
                  const o = t.getAttribute('listIndent')
                  if (o > n) {
                    let r
                    null === i ? ((i = o - n), (r = n)) : (i > o && (i = o), (r = o - i)),
                      e.setAttribute('listIndent', r, t),
                      (s = !0)
                  } else (i = null), (n = t.getAttribute('listIndent') + 1)
                  t = t.nextSibling
                }
              }
              function a(t) {
                let n = [],
                  i = null
                for (; t && t.is('element', 'listItem'); ) {
                  const o = t.getAttribute('listIndent')
                  if ((i && i.getAttribute('listIndent') > o && (n = n.slice(0, o + 1)), 0 != o))
                    if (n[o]) {
                      const i = n[o]
                      t.getAttribute('listType') != i && (e.setAttribute('listType', i, t), (s = !0))
                    } else n[o] = t.getAttribute('listType')
                  ;(i = t), (t = t.nextSibling)
                }
              }
            })(t.model, e)
          ),
            n.mapper.registerViewToModelLength('li', dm),
            e.mapper.registerViewToModelLength('li', dm),
            n.mapper.on('modelToViewPosition', om(n.view)),
            n.mapper.on(
              'viewToModelPosition',
              ((i = t.model),
              (t, e) => {
                const n = e.viewPosition,
                  s = n.parent,
                  o = e.mapper
                if ('ul' == s.name || 'ol' == s.name) {
                  if (n.isAtEnd) {
                    const t = o.toModelElement(n.nodeBefore),
                      s = o.getModelLength(n.nodeBefore)
                    e.modelPosition = i.createPositionBefore(t).getShiftedBy(s)
                  } else {
                    const t = o.toModelElement(n.nodeAfter)
                    e.modelPosition = i.createPositionBefore(t)
                  }
                  t.stop()
                } else if ('li' == s.name && n.nodeBefore && ('ul' == n.nodeBefore.name || 'ol' == n.nodeBefore.name)) {
                  const r = o.toModelElement(s)
                  let a = 1,
                    c = n.nodeBefore
                  for (; c && lm(c); ) (a += o.getModelLength(c)), (c = c.previousSibling)
                  ;(e.modelPosition = i.createPositionBefore(r).getShiftedBy(a)), t.stop()
                }
              })
            ),
            e.mapper.on('modelToViewPosition', om(n.view)),
            t.conversion.for('editingDowncast').add(e => {
              e.on('insert', tm, { priority: 'high' }),
                e.on('insert:listItem', Xf(t.model)),
                e.on('attribute:listType:listItem', Zf, { priority: 'high' }),
                e.on('attribute:listType:listItem', Qf, { priority: 'low' }),
                e.on(
                  'attribute:listIndent:listItem',
                  (function (t) {
                    return (e, n, i) => {
                      if (!i.consumable.consume(n.item, 'attribute:listIndent')) return
                      const s = i.mapper.toViewElement(n.item),
                        o = i.writer
                      o.breakContainer(o.createPositionBefore(s)), o.breakContainer(o.createPositionAfter(s))
                      const r = s.parent,
                        a = r.previousSibling,
                        c = o.createRangeOn(r)
                      o.remove(c),
                        a && a.nextSibling && Hf(o, a, a.nextSibling),
                        cm(n.attributeOldValue + 1, n.range.start, c.start, s, i, t),
                        Uf(n.item, s, i, t)
                      for (const t of n.item.getChildren()) i.consumable.consume(t, 'insert')
                    }
                  })(t.model)
                ),
                e.on(
                  'remove:listItem',
                  (function (t) {
                    return (e, n, i) => {
                      const s = i.mapper
                          .toViewPosition(n.position)
                          .getLastMatchingPosition(t => !t.item.is('element', 'li')).nodeAfter,
                        o = i.writer
                      o.breakContainer(o.createPositionBefore(s)), o.breakContainer(o.createPositionAfter(s))
                      const r = s.parent,
                        a = r.previousSibling,
                        c = o.createRangeOn(r),
                        l = o.remove(c)
                      a && a.nextSibling && Hf(o, a, a.nextSibling),
                        cm(i.mapper.toModelElement(s).getAttribute('listIndent') + 1, n.position, c.start, s, i, t)
                      for (const t of o.createRangeIn(l).getItems()) i.mapper.unbindViewElement(t)
                      e.stop()
                    }
                  })(t.model)
                ),
                e.on('remove', em, { priority: 'low' })
            }),
            t.conversion.for('dataDowncast').add(e => {
              e.on('insert', tm, { priority: 'high' }), e.on('insert:listItem', Xf(t.model))
            }),
            t.conversion.for('upcast').add(t => {
              t.on('element:ul', im, { priority: 'high' }),
                t.on('element:ol', im, { priority: 'high' }),
                t.on('element:li', sm, { priority: 'high' }),
                t.on('element:li', nm)
            }),
            t.model.on('insertContent', rm, { priority: 'high' }),
            t.commands.add('numberedList', new jf(t, 'numbered')),
            t.commands.add('bulletedList', new jf(t, 'bulleted')),
            t.commands.add('indentList', new $f(t, 'forward')),
            t.commands.add('outdentList', new $f(t, 'backward'))
          const s = n.view.document
          this.listenTo(
            s,
            'enter',
            (t, e) => {
              const n = this.editor.model.document,
                i = n.selection.getLastPosition().parent
              n.selection.isCollapsed &&
                'listItem' == i.name &&
                i.isEmpty &&
                (this.editor.execute('outdentList'), e.preventDefault(), t.stop())
            },
            { context: 'li' }
          ),
            this.listenTo(
              s,
              'delete',
              (t, e) => {
                if ('backward' !== e.direction) return
                const n = this.editor.model.document.selection
                if (!n.isCollapsed) return
                const i = n.getFirstPosition()
                if (!i.isAtStart) return
                const s = i.parent
                if ('listItem' !== s.name) return
                ;(s.previousSibling && 'listItem' === s.previousSibling.name) ||
                  (this.editor.execute('outdentList'), e.preventDefault(), t.stop())
              },
              { context: 'li' }
            ),
            this.listenTo(
              t.editing.view.document,
              'tab',
              (e, n) => {
                const i = n.shiftKey ? 'outdentList' : 'indentList'
                this.editor.commands.get(i).isEnabled &&
                  (t.execute(i), n.stopPropagation(), n.preventDefault(), e.stop())
              },
              { context: 'li' }
            )
        }
        afterInit() {
          const t = this.editor.commands,
            e = t.get('indent'),
            n = t.get('outdent')
          e && e.registerChildCommand(t.get('indentList')), n && n.registerChildCommand(t.get('outdentList'))
        }
      }
      function dm(t) {
        let e = 1
        for (const n of t.getChildren())
          if ('ul' == n.name || 'ol' == n.name) for (const t of n.getChildren()) e += dm(t)
        return e
      }
      class um extends de {
        static get pluginName() {
          return 'ListUI'
        }
        init() {
          const t = this.editor.t
          Jf(
            this.editor,
            'numberedList',
            t('Numbered List'),
            '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM3.5 3v5H2V3.7H1v-1h2.5V3zM.343 17.857l2.59-3.257H2.92a.6.6 0 1 0-1.04 0H.302a2 2 0 1 1 3.995 0h-.001c-.048.405-.16.734-.333.988-.175.254-.59.692-1.244 1.312H4.3v1h-4l.043-.043zM7 14.75a.75.75 0 0 1 .75-.75h9.5a.75.75 0 1 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75z"/></svg>'
          ),
            Jf(
              this.editor,
              'bulletedList',
              t('Bulleted List'),
              '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0C1 4.784 1.777 4 2.75 4c.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75C1.784 7.5 1 6.723 1 5.75zm6 9c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0c0-.966.777-1.75 1.75-1.75.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75-.966 0-1.75-.777-1.75-1.75z"/></svg>'
            )
        }
      }
      class fm extends fe {
        refresh() {
          const t = this.editor.model,
            e = ka(t.document.selection.getSelectedBlocks())
          ;(this.value = !!e && e.is('element', 'paragraph')), (this.isEnabled = !!e && mm(e, t.schema))
        }
        execute(t = {}) {
          const e = this.editor.model,
            n = e.document
          e.change(i => {
            const s = (t.selection || n.selection).getSelectedBlocks()
            for (const t of s) !t.is('element', 'paragraph') && mm(t, e.schema) && i.rename(t, 'paragraph')
          })
        }
      }
      function mm(t, e) {
        return e.checkChild(t.parent, 'paragraph') && !e.isObject(t)
      }
      class gm extends fe {
        execute(t) {
          const e = this.editor.model,
            n = t.attributes
          let i = t.position
          e.change(t => {
            const s = t.createElement('paragraph')
            if ((n && e.schema.setAllowedAttributes(s, n, t), !e.schema.checkChild(i.parent, s))) {
              const n = e.schema.findAllowedParent(i, s)
              if (!n) return
              i = t.split(i, n).position
            }
            e.insertContent(s, i), t.setSelection(s, 'in')
          })
        }
      }
      class pm extends de {
        static get pluginName() {
          return 'Paragraph'
        }
        init() {
          const t = this.editor,
            e = t.model
          t.commands.add('paragraph', new fm(t)),
            t.commands.add('insertParagraph', new gm(t)),
            e.schema.register('paragraph', { inheritAllFrom: '$block' }),
            t.conversion.elementToElement({ model: 'paragraph', view: 'p' }),
            t.conversion
              .for('upcast')
              .elementToElement({
                model: (t, { writer: e }) =>
                  pm.paragraphLikeElements.has(t.name) ? (t.isEmpty ? null : e.createElement('paragraph')) : null,
                view: /.+/,
                converterPriority: 'low',
              })
        }
      }
      function _m(t, e) {
        if (!t.childCount) return
        const n = new Kd(t.document),
          i = (function (t, e) {
            const n = e.createRangeIn(t),
              i = new ji({ name: /^p|h\d+$/, styles: { 'mso-list': /.*/ } }),
              s = []
            for (const t of n)
              if ('elementStart' === t.type && i.match(t.item)) {
                const e = ym(t.item)
                s.push({ element: t.item, id: e.id, order: e.order, indent: e.indent })
              }
            return s
          })(t, n)
        if (!i.length) return
        let s = null,
          o = 1
        i.forEach((t, r) => {
          const a = (function (t, e) {
              if (!t) return !0
              if (t.id !== e.id) return e.indent - t.indent != 1
              const n = e.element.previousSibling
              if (!n) return !0
              return (i = n), !(i.is('element', 'ol') || i.is('element', 'ul'))
              var i
            })(i[r - 1], t),
            c = a ? null : i[r - 1],
            l = ((d = t), (h = c) ? d.indent - h.indent : d.indent - 1)
          var h, d
          if ((a && ((s = null), (o = 1)), !s || 0 !== l)) {
            const i = (function (t, e) {
              const n = new RegExp(`@list l${t.id}:level${t.indent}\\s*({[^}]*)`, 'gi'),
                i = /mso-level-number-format:([^;]{0,100});/gi,
                s = /mso-level-start-at:\s{0,100}([0-9]{0,10})\s{0,100};/gi,
                o = n.exec(e)
              let r = 'decimal',
                a = 'ol',
                c = null
              if (o && o[1]) {
                const e = i.exec(o[1])
                if (
                  (e && e[1] && ((r = e[1].trim()), (a = 'bullet' !== r && 'image' !== r ? 'ol' : 'ul')),
                  'bullet' === r)
                ) {
                  const e = (function (t) {
                    const e = (function (t) {
                      if (t.getChild(0).is('$text')) return null
                      for (const e of t.getChildren()) {
                        if (!e.is('element', 'span')) continue
                        const t = e.getChild(0)
                        return t.is('$text') ? t : t.getChild(0)
                      }
                    })(t)
                    if (!e) return null
                    const n = e._data
                    if ('o' === n) return 'circle'
                    if ('·' === n) return 'disc'
                    if ('§' === n) return 'square'
                    return null
                  })(t.element)
                  e && (r = e)
                } else {
                  const t = s.exec(o[1])
                  t && t[1] && (c = parseInt(t[1]))
                }
              }
              return { type: a, startIndex: c, style: wm(r) }
            })(t, e)
            if (s) {
              if (t.indent > o) {
                const t = s.getChild(s.childCount - 1),
                  e = t.getChild(t.childCount - 1)
                ;(s = bm(i, e, n)), (o += 1)
              } else if (t.indent < o) {
                const e = o - t.indent
                ;(s = (function (t, e) {
                  const n = t.getAncestors({ parentFirst: !0 })
                  let i = null,
                    s = 0
                  for (const t of n)
                    if ((('ul' !== t.name && 'ol' !== t.name) || s++, s === e)) {
                      i = t
                      break
                    }
                  return i
                })(s, e)),
                  (o = parseInt(t.indent))
              }
            } else s = bm(i, t.element, n)
            t.indent <= o && (s.is('element', i.type) || (s = n.rename(i.type, s)))
          }
          const u = (function (t, e) {
            return (
              (function (t, e) {
                const n = new ji({ name: 'span', styles: { 'mso-list': 'Ignore' } }),
                  i = e.createRangeIn(t)
                for (const t of i) 'elementStart' === t.type && n.match(t.item) && e.remove(t.item)
              })(t, e),
              e.rename('li', t)
            )
          })(t.element, n)
          n.appendChild(u, s)
        })
      }
      function wm(t) {
        if (t.startsWith('arabic-leading-zero')) return 'decimal-leading-zero'
        switch (t) {
          case 'alpha-upper':
            return 'upper-alpha'
          case 'alpha-lower':
            return 'lower-alpha'
          case 'roman-upper':
            return 'upper-roman'
          case 'roman-lower':
            return 'lower-roman'
          case 'circle':
          case 'disc':
          case 'square':
            return t
          default:
            return null
        }
      }
      function bm(t, e, n) {
        const i = e.parent,
          s = n.createElement(t.type),
          o = i.getChildIndex(e) + 1
        return (
          n.insertChild(o, s, i),
          t.style && n.setStyle('list-style-type', t.style, s),
          t.startIndex && t.startIndex > 1 && n.setAttribute('start', t.startIndex, s),
          s
        )
      }
      function ym(t) {
        const e = {},
          n = t.getStyle('mso-list')
        if (n) {
          const t = n.match(/(^|\s{1,100})l(\d+)/i),
            i = n.match(/\s{0,100}lfo(\d+)/i),
            s = n.match(/\s{0,100}level(\d+)/i)
          t && i && s && ((e.id = t[2]), (e.order = i[1]), (e.indent = s[1]))
        }
        return e
      }
      pm.paragraphLikeElements = new Set([
        'blockquote',
        'dd',
        'div',
        'dt',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'li',
        'p',
        'td',
        'th',
      ])
      const vm = /id=("|')docs-internal-guid-[-0-9a-f]+("|')/i
      class Pm {
        constructor(t) {
          this.document = t
        }
        isActive(t) {
          return vm.test(t)
        }
        execute(t) {
          const e = new Kd(this.document),
            { body: n } = t._parsedData
          !(function (t, e) {
            for (const n of t.getChildren())
              if (n.is('element', 'b') && 'normal' === n.getStyle('font-weight')) {
                const i = t.getChildIndex(n)
                e.remove(n), e.insertChild(i, n.getChildren(), t)
              }
          })(n, e),
            (function (t, e) {
              for (const n of e.createRangeIn(t)) {
                const t = n.item
                if (t.is('element', 'li')) {
                  const n = t.getChild(0)
                  n && n.is('element', 'p') && e.unwrapElement(n)
                }
              }
            })(n, e),
            (t.content = n)
        }
      }
      function km(t, e) {
        if (!t.childCount) return
        const n = new Kd(),
          i = (function (t, e) {
            const n = e.createRangeIn(t),
              i = new ji({ name: /v:(.+)/ }),
              s = []
            for (const t of n) {
              if ('elementStart' != t.type) continue
              const e = t.item,
                n = (e.previousSibling && e.previousSibling.name) || null
              i.match(e) && e.getAttribute('o:gfxdata') && 'v:shapetype' !== n && s.push(t.item.getAttribute('id'))
            }
            return s
          })(t, n)
        !(function (t, e, n) {
          const i = n.createRangeIn(e),
            s = new ji({ name: 'img' }),
            o = []
          for (const e of i)
            if (s.match(e.item)) {
              const n = e.item,
                i = n.getAttribute('v:shapes') ? n.getAttribute('v:shapes').split(' ') : []
              i.length && i.every(e => t.indexOf(e) > -1) ? o.push(n) : n.getAttribute('src') || o.push(n)
            }
          for (const t of o) n.remove(t)
        })(i, t, n),
          (function (t, e) {
            const n = e.createRangeIn(t),
              i = new ji({ name: /v:(.+)/ }),
              s = []
            for (const t of n) 'elementStart' == t.type && i.match(t.item) && s.push(t.item)
            for (const t of s) e.remove(t)
          })(t, n)
        const s = (function (t, e) {
          const n = e.createRangeIn(t),
            i = new ji({ name: 'img' }),
            s = []
          for (const t of n) i.match(t.item) && t.item.getAttribute('src').startsWith('file://') && s.push(t.item)
          return s
        })(t, n)
        s.length &&
          (function (t, e, n) {
            if (t.length === e.length)
              for (let i = 0; i < t.length; i++) {
                const s = `data:${e[i].type};base64,${Am(e[i].hex)}`
                n.setAttribute('src', s, t[i])
              }
          })(
            s,
            (function (t) {
              if (!t) return []
              const e = /{\\pict[\s\S]+?\\bliptag-?\d+(\\blipupi-?\d+)?({\\\*\\blipuid\s?[\da-fA-F]+)?[\s}]*?/,
                n = new RegExp('(?:(' + e.source + '))([\\da-fA-F\\s]+)\\}', 'g'),
                i = t.match(n),
                s = []
              if (i)
                for (const t of i) {
                  let n = !1
                  t.includes('\\pngblip') ? (n = 'image/png') : t.includes('\\jpegblip') && (n = 'image/jpeg'),
                    n && s.push({ hex: t.replace(e, '').replace(/[^\da-fA-F]/g, ''), type: n })
                }
              return s
            })(e),
            n
          )
      }
      function Am(t) {
        return btoa(
          t
            .match(/\w{2}/g)
            .map(t => String.fromCharCode(parseInt(t, 16)))
            .join('')
        )
      }
      const Cm = /<meta\s*name="?generator"?\s*content="?microsoft\s*word\s*\d+"?\/?>/i,
        Em = /xmlns:o="urn:schemas-microsoft-com/i
      class Sm {
        constructor(t) {
          this.document = t
        }
        isActive(t) {
          return Cm.test(t) || Em.test(t)
        }
        execute(t) {
          const { body: e, stylesString: n } = t._parsedData
          _m(e, n), km(e, t.dataTransfer.getData('text/rtf')), (t.content = e)
        }
      }
      function xm(t) {
        return t.replace(/<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g, (t, e) =>
          1 === e.length
            ? ' '
            : Array(e.length + 1)
                .join('  ')
                .substr(0, e.length)
        )
      }
      function Tm(t, e) {
        const n = new DOMParser(),
          i = (function (t) {
            return xm(xm(t))
              .replace(/(<span\s+style=['"]mso-spacerun:yes['"]>[^\S\r\n]*?)[\r\n]+([^\S\r\n]*<\/span>)/g, '$1$2')
              .replace(/<span\s+style=['"]mso-spacerun:yes['"]><\/span>/g, '')
              .replace(/ <\//g, ' </')
              .replace(/ <o:p><\/o:p>/g, ' <o:p></o:p>')
              .replace(/<o:p>(&nbsp;|\u00A0)<\/o:p>/g, '')
              .replace(/>([^\S\r\n]*[\r\n]\s*)</g, '><')
          })(
            (function (t) {
              const e = '</body>',
                n = '</html>',
                i = t.indexOf(e)
              if (i < 0) return t
              const s = t.indexOf(n, i + e.length)
              return t.substring(0, i + e.length) + (s >= 0 ? t.substring(s) : '')
            })((t = t.replace(/<!--\[if gte vml 1]>/g, '')))
          ),
          s = n.parseFromString(i, 'text/html')
        !(function (t) {
          t.querySelectorAll('span[style*=spacerun]').forEach(t => {
            const e = t.innerText.length || 0
            t.innerHTML = Array(e + 1)
              .join('  ')
              .substr(0, e)
          })
        })(s)
        const o = s.body.innerHTML,
          r = (function (t, e) {
            const n = new Gs(e),
              i = new rr(n, { renderingMode: 'data' }),
              s = t.createDocumentFragment(),
              o = t.body.childNodes
            for (; o.length > 0; ) s.appendChild(o[0])
            return i.domToView(s, { skipComments: !0 })
          })(s, e),
          a = (function (t) {
            const e = [],
              n = [],
              i = Array.from(t.getElementsByTagName('style'))
            for (const t of i)
              t.sheet && t.sheet.cssRules && t.sheet.cssRules.length && (e.push(t.sheet), n.push(t.innerHTML))
            return { styles: e, stylesString: n.join(' ') }
          })(s)
        return { body: r, bodyString: o, styles: a.styles, stylesString: a.stylesString }
      }
      const Rm = 'removeFormat'
      class Om extends de {
        static get pluginName() {
          return 'RemoveFormatUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add(Rm, n => {
            const i = t.commands.get(Rm),
              s = new Jh(n)
            return (
              s.set({
                label: e('Remove Format'),
                icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.69 14.915c.053.052.173.083.36.093a.366.366 0 0 1 .345.485l-.003.01a.738.738 0 0 1-.697.497h-2.67a.374.374 0 0 1-.353-.496l.013-.038a.681.681 0 0 1 .644-.458c.197-.012.325-.043.386-.093a.28.28 0 0 0 .072-.11L9.592 4.5H6.269c-.359-.017-.609.013-.75.09-.142.078-.289.265-.442.563-.192.29-.516.464-.864.464H4.17a.43.43 0 0 1-.407-.569L4.46 3h13.08l-.62 2.043a.81.81 0 0 1-.775.574h-.114a.486.486 0 0 1-.486-.486c.001-.284-.054-.464-.167-.54-.112-.076-.367-.106-.766-.091h-3.28l-2.68 10.257c-.006.074.007.127.038.158zM3 17h8a.5.5 0 1 1 0 1H3a.5.5 0 1 1 0-1zm11.299 1.17a.75.75 0 1 1-1.06-1.06l1.414-1.415-1.415-1.414a.75.75 0 0 1 1.06-1.06l1.415 1.414 1.414-1.415a.75.75 0 1 1 1.06 1.06l-1.413 1.415 1.414 1.415a.75.75 0 0 1-1.06 1.06l-1.415-1.414-1.414 1.414z"/></svg>',
                tooltip: !0,
              }),
              s.bind('isOn', 'isEnabled').to(i, 'value', 'isEnabled'),
              this.listenTo(s, 'execute', () => {
                t.execute(Rm), t.editing.view.focus()
              }),
              s
            )
          })
        }
      }
      class Im extends fe {
        refresh() {
          const t = this.editor.model
          this.isEnabled = !!ka(this._getFormattingItems(t.document.selection, t.schema))
        }
        execute() {
          const t = this.editor.model,
            e = t.schema
          t.change(n => {
            for (const i of this._getFormattingItems(t.document.selection, e))
              if (i.is('selection')) for (const t of this._getFormattingAttributes(i, e)) n.removeSelectionAttribute(t)
              else {
                const t = n.createRangeOn(i)
                for (const s of this._getFormattingAttributes(i, e)) n.removeAttribute(s, t)
              }
          })
        }
        *_getFormattingItems(t, e) {
          const n = t => !!ka(this._getFormattingAttributes(t, e))
          for (const i of t.getRanges()) for (const t of i.getItems()) !e.isBlock(t) && n(t) && (yield t)
          for (const e of t.getSelectedBlocks()) n(e) && (yield e)
          n(t) && (yield t)
        }
        *_getFormattingAttributes(t, e) {
          for (const [n] of t.getAttributes()) {
            const t = e.getAttributeProperties(n)
            t && t.isFormatting && (yield n)
          }
        }
      }
      class Mm extends de {
        static get pluginName() {
          return 'RemoveFormatEditing'
        }
        init() {
          const t = this.editor
          t.commands.add('removeFormat', new Im(t))
        }
      }
      const Nm = 'underline'
      class Dm extends de {
        static get pluginName() {
          return 'UnderlineEditing'
        }
        init() {
          const t = this.editor
          t.model.schema.extend('$text', { allowAttributes: Nm }),
            t.model.schema.setAttributeProperties(Nm, { isFormatting: !0, copyOnEnter: !0 }),
            t.conversion.attributeToElement({
              model: Nm,
              view: 'u',
              upcastAlso: { styles: { 'text-decoration': 'underline' } },
            }),
            t.commands.add(Nm, new Zd(t, Nm)),
            t.keystrokes.set('CTRL+U', 'underline')
        }
      }
      const Fm = 'underline'
      class Bm extends de {
        static get pluginName() {
          return 'UnderlineUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add(Fm, n => {
            const i = t.commands.get(Fm),
              s = new Jh(n)
            return (
              s.set({
                label: e('Underline'),
                icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 18v-1.5h14V18zm2.2-8V3.6c0-.4.4-.6.8-.6.3 0 .7.2.7.6v6.2c0 2 1.3 2.8 3.2 2.8 1.9 0 3.4-.9 3.4-2.9V3.6c0-.3.4-.5.8-.5.3 0 .7.2.7.5V10c0 2.7-2.2 4-4.9 4-2.6 0-4.7-1.2-4.7-4z"/></svg>',
                keystroke: 'CTRL+U',
                tooltip: !0,
                isToggleable: !0,
              }),
              s.bind('isOn', 'isEnabled').to(i, 'value', 'isEnabled'),
              this.listenTo(s, 'execute', () => {
                t.execute(Fm), t.editing.view.focus()
              }),
              s
            )
          })
        }
      }
      class Vm extends fe {
        execute(t = {}) {
          this.editor.plugins.get('WProofreader').toggle()
        }
      }
      class Lm extends fe {
        execute(t = {}) {
          this.editor.plugins.get('WProofreader').openSettings()
        }
      }
      class jm extends fe {
        execute(t = {}) {
          this.editor.plugins.get('WProofreader').openDialog()
        }
      }
      class Wm extends de {
        static get pluginName() {
          return 'WProofreaderEditing'
        }
        init() {
          this._addCommands(), this._enableInTrackChanges()
        }
        _addCommands() {
          this.editor.commands.add('WProofreaderToggle', new Vm(this.editor)),
            this.editor.commands.add('WProofreaderSettings', new Lm(this.editor)),
            this.editor.commands.add('WProofreaderDialog', new jm(this.editor))
        }
        _enableInTrackChanges() {
          if (this.editor.plugins.has('TrackChanges')) {
            const t = this.editor.plugins.get('TrackChangesEditing')
            ;['WProofreaderToggle', 'WProofreaderSettings', 'WProofreaderDialog'].forEach(e => t.enableCommand(e))
          }
        }
      }
      class zm extends de {
        static get pluginName() {
          return 'WProofreaderUI'
        }
        constructor(t) {
          super(t),
            (this._commands = {
              toggle: 'WProofreaderToggle',
              settings: 'WProofreaderSettings',
              proofreadDialog: 'WProofreaderDialog',
            })
        }
        init() {
          this._registerDropdown()
        }
        _registerDropdown() {
          const t = this.editor,
            e = t.plugins.get('WProofreader')
          t.ui.componentFactory.add('wproofreader', n => {
            const i = pd(n)
            let s, o
            return (
              i.buttonView.set({
                label: 'WProofreader',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polygon points="10.46 17.747 7.014 14.292 8.076 13.232 10.461 15.624 16.377 9.708 17.437 10.768 10.46 17.747"/><path d="M10.147,12.276c.063.153.138.331.226.531a2.7,2.7,0,0,0,.144.286L12,11.614l-.01-.027L9.4,5.189c-.122-.321-.222-.576-.3-.768A2.871,2.871,0,0,0,8.8,3.883a1.355,1.355,0,0,0-.453-.409,1.4,1.4,0,0,0-.7-.159,1.387,1.387,0,0,0-.693.159,1.314,1.314,0,0,0-.453.416,3.4,3.4,0,0,0-.325.646L5.92,5.2,3.383,11.641c-.1.257-.178.457-.223.6a1.4,1.4,0,0,0-.067.419.852.852,0,0,0,.29.629.941.941,0,0,0,.67.277.756.756,0,0,0,.643-.26,4.432,4.432,0,0,0,.473-1l.473-1.272H9.673ZM6.17,9.524,7.638,5.432,9.132,9.524Z"/></svg>\n',
                tooltip: !0,
              }),
              i.on('change:isOpen', t => {
                const n = e.isInstancesReady(),
                  r = e.isInstancesEnabled()
                n
                  ? (s ||
                      ((o = e.getStaticActions()),
                      (s = this._getDropdownItemsDefinitions(o)),
                      (function (t, e) {
                        const n = t.locale,
                          i = (t.listView = new fd(n))
                        i.items.bindTo(e).using(({ type: t, model: e }) => {
                          if ('separator' === t) return new gd(n)
                          if ('button' === t || 'switchbutton' === t) {
                            const i = new md(n)
                            let s
                            return (
                              (s = 'button' === t ? new Jh(n) : new Yh(n)),
                              s.bind(...Object.keys(e)).to(e),
                              s.delegate('execute').to(i),
                              i.children.add(s),
                              i
                            )
                          }
                        }),
                          t.panelView.children.add(i),
                          i.items.delegate('execute').to(t)
                      })(i, s)),
                    (i.class = ''),
                    s.map(t => {
                      ;(t.model.class = r ? '' : 'ck-hidden'),
                        'WProofreaderToggle' === t.model.commandParam &&
                          ((t.model.label = r ? t.model.localization.disable : t.model.localization.enable),
                          (t.model.class = ''))
                    }))
                  : (i.class = 'ck-wproofreader-empty')
              }),
              i.on('execute', e => {
                t.execute(e.source.commandParam)
              }),
              i.bind('isEnabled').to(t.commands.get('WProofreaderToggle')),
              i
            )
          })
        }
        _getDropdownItemsDefinitions(t) {
          const e = new Ci()
          return (
            t.forEach(t => {
              const n = {
                type: 'button',
                model: new Pd({
                  commandParam: this._commands[t.name],
                  label: t.localization.default,
                  localization: t.localization,
                  class: '',
                  withText: !0,
                }),
              }
              e.add(n)
            }),
            e
          )
        }
      }
      class $m {
        constructor() {
          this._create()
        }
        _create() {
          ;(window.WPROOFREADER_SRCSTORAGE = window.WPROOFREADER_SRCSTORAGE || {}),
            (this._storage = window.WPROOFREADER_SRCSTORAGE)
        }
        has(t) {
          return !!this._storage[t]
        }
        add(t) {
          this._storage[t] = { onLoad: [], onError: [] }
        }
        addCallbacks(t, e, n) {
          this._storage[t].onLoad.push(e), this._storage[t].onError.push(n)
        }
        eachOnLoad(t, e) {
          this._storage[t].onLoad.forEach(e)
        }
        eachOnError(t, e) {
          this._storage[t].onError.forEach(e)
        }
        delete(t) {
          delete this._storage[t]
        }
        get(t) {
          return this._storage[t]
        }
      }
      class qm {
        constructor(t) {
          this._validateSrc(t), (this._src = t), (this._globalSrcStorage = new $m())
        }
        load() {
          return new Promise((t, e) => {
            this._isScriptOnPage() ? this._processExistingScript(t, e) : this._createScript(t, e)
          })
        }
        _validateSrc(t) {
          if (!t) throw new Error('Path to the script is not specified.')
        }
        _isScriptOnPage() {
          return !!document.querySelector('script[src="' + this._src + '"]')
        }
        _createScript(t, e) {
          ;(this._script = this._createElement()),
            this._globalSrcStorage.add(this._src),
            this._globalSrcStorage.addCallbacks(this._src, t, e),
            this._subscribeOnScriptLoad(),
            this._subscribeOnScriptError(),
            this._appendScript(this._script)
        }
        _createElement() {
          const t = document.createElement('script')
          return (t.type = 'text/javascript'), (t.charset = 'UTF-8'), (t.src = this._src), t
        }
        _subscribeOnScriptLoad() {
          this._script.onload = () => {
            this._globalSrcStorage.eachOnLoad(this._src, t => {
              t()
            }),
              this._destroy()
          }
        }
        _subscribeOnScriptError() {
          this._script.onerror = () => {
            const t = new Error(`${this._src} failed to load.`)
            this._globalSrcStorage.eachOnError(this._src, e => {
              e(t)
            }),
              this._destroy()
          }
        }
        _destroy() {
          this._removeListeners(), this._globalSrcStorage.delete(this._src), (this._src = null), (this._script = null)
        }
        _removeListeners() {
          ;(this._script.onload = null), (this._script.onerror = null)
        }
        _appendScript(t) {
          document.getElementsByTagName('head')[0].appendChild(t)
        }
        _processExistingScript(t, e) {
          this._globalSrcStorage.has(this._src) ? this._addCallbacks(t, e) : this._processLoadedScript(t)
        }
        _addCallbacks(t, e) {
          this._globalSrcStorage.addCallbacks(this._src, t, e)
        }
        _processLoadedScript(t) {
          t()
        }
      }
      const Um = 'InstancesDisabling'
      function Hm(t, e = new Set()) {
        const n = [t],
          i = new Set()
        let s = 0
        for (; n.length > s; ) {
          const t = n[s++]
          if (!(i.has(t) || Km(t) || e.has(t)))
            if ((i.add(t), t[Symbol.iterator]))
              try {
                for (const e of t) n.push(e)
              } catch (t) {}
            else for (const e in t) 'defaultValue' !== e && n.push(t[e])
        }
        return i
      }
      function Km(t) {
        const e = Object.prototype.toString.call(t),
          n = typeof t
        return (
          'number' === n ||
          'boolean' === n ||
          'string' === n ||
          'symbol' === n ||
          'function' === n ||
          '[object Date]' === e ||
          '[object RegExp]' === e ||
          '[object Module]' === e ||
          null == t ||
          t instanceof EventTarget ||
          t instanceof Event
        )
      }
      class Gm extends Yd {}
      var Jm = window.wproofreaderProtocol,
        Ym = window.wproofreaderHost,
        Xm = window.wproofreaderPort,
        Zm = Jm + '://' + Ym + (Xm ? ':' + Xm : '')
      ;(Gm.builtinPlugins = [
        Xd,
        class extends de {
          static get requires() {
            return [tu, nu]
          }
          static get pluginName() {
            return 'Bold'
          }
        },
        class extends de {
          static get requires() {
            return [tf, uu, df, of, _f, xf]
          }
          static get pluginName() {
            return 'Essentials'
          }
        },
        class extends de {
          static get requires() {
            return [Nf, Df, Uu]
          }
          static get pluginName() {
            return 'HorizontalLine'
          }
        },
        class extends de {
          static get requires() {
            return [Bf, Lf]
          }
          static get pluginName() {
            return 'Italic'
          }
        },
        class extends de {
          static get requires() {
            return [hm, um]
          }
          static get pluginName() {
            return 'List'
          }
        },
        pm,
        class extends de {
          static get pluginName() {
            return 'PasteFromOffice'
          }
          static get requires() {
            return [au]
          }
          init() {
            const t = this.editor,
              e = t.editing.view.document,
              n = []
            n.push(new Sm(e)),
              n.push(new Pm(e)),
              t.plugins.get('ClipboardPipeline').on(
                'inputTransformation',
                (i, s) => {
                  if (s._isTransformedWithPasteFromOffice) return
                  if (t.model.document.selection.getFirstPosition().parent.is('element', 'codeBlock')) return
                  const o = s.dataTransfer.getData('text/html'),
                    r = n.find(t => t.isActive(o))
                  r &&
                    ((s._parsedData = Tm(o, e.stylesProcessor)),
                    r.execute(s),
                    (s._isTransformedWithPasteFromOffice = !0))
                },
                { priority: 'high' }
              )
          }
        },
        class extends de {
          static get requires() {
            return [Mm, Om]
          }
          static get pluginName() {
            return 'RemoveFormat'
          }
        },
        class extends de {
          static get requires() {
            return [Dm, Bm]
          }
          static get pluginName() {
            return 'Underline'
          }
        },
        class extends de {
          static get requires() {
            return [Wm, zm]
          }
          static get pluginName() {
            return 'WProofreader'
          }
          constructor(t) {
            super(t),
              this.set('isToggleCommandEnabled', !0),
              (this._instances = []),
              (this._collaborationPluginNames = [
                'RealTimeCollaborativeEditing',
                'RealTimeCollaborativeTrackChanges',
                'RealTimeCollaborativeComments',
                'RealTimeCollaborationClient',
              ])
          }
          init() {
            ;(this._userOptions = this._getUserOptions()),
              this._setTheme(),
              this._setAutoStartup(),
              this._setIsEnabled(this._userOptions.autoStartup, Um),
              this._loadWscbundle()
                .then(() => {
                  this._handleWscbundleLoaded()
                })
                .catch(t => {
                  throw new Error(t)
                }),
              this.bind('isToggleCommandEnabled').to(this.editor.commands.get('WProofreaderToggle'), 'isEnabled', t =>
                this._handleToggleCommandEnabled(t)
              )
          }
          destroy() {
            super.destroy(), this._instances.forEach(t => t.destroy()), (this._instances = null)
          }
          _getUserOptions() {
            const t = this.editor.config.get('wproofreader')
            if (!t) throw new Error('No WProofreader configuration.')
            return t
          }
          _setTheme() {
            this._userOptions.theme || (this._userOptions.theme = 'ckeditor5')
          }
          _setAutoStartup() {
            this._userOptions.hasOwnProperty('autoStartup') || (this._userOptions.autoStartup = !0)
          }
          _setIsEnabled(t, e) {
            t ? this.clearForceDisabled(e) : this.forceDisabled(e)
          }
          _loadWscbundle() {
            return new qm(this._userOptions.srcUrl).load()
          }
          _handleWscbundleLoaded() {
            'ready' === this.editor.state ? this._createInstances() : this._subscribeOnEditorReady()
          }
          _createInstances() {
            const t = this.editor.editing.view.domRoots.values()
            this._setFields()
            for (const e of t) this._createInstance(e)
          }
          _setFields() {
            ;(this._isMultiRoot = this._checkMultiRoot()),
              (this._isCollaboration = this._checkCollaborationMode()),
              (this._options = this._createOptions())
          }
          _checkMultiRoot() {
            return this.editor.editing.view.domRoots.size > 1
          }
          _checkCollaborationMode() {
            for (let t = 0; t <= this._collaborationPluginNames.length; t++)
              if (this.editor.plugins.has(this._collaborationPluginNames[t])) return !0
            return !1
          }
          _createOptions() {
            return {
              appType: 'proofreader_ck5',
              disableDialog: this._isMultiRoot || this._isCollaboration,
              hideStaticActions: !0,
              disableBadgePulsing: !0,
              onCommitOptions: this._onCommitOptions.bind(this),
              onToggle: this._onToggle.bind(this),
            }
          }
          _onCommitOptions(t) {
            this._syncOptions(t)
          }
          _syncOptions(t) {
            this._instances.forEach(e => {
              e.commitOption(t, { ignoreCallback: !0 })
            })
          }
          _onToggle(t) {
            const e = !t.isDisabled()
            this._setIsEnabled(e, Um), this._syncToggle(e)
          }
          _syncToggle(t) {
            this._instances.forEach(e => {
              t ? this._enableInstance(e) : this._disableInstance(e)
            })
          }
          _enableInstance(t) {
            this.isEnabled && t.enable({ ignoreCallback: !0 })
          }
          _disableInstance(t) {
            t.disable({ ignoreCallback: !0 })
          }
          _createInstance(t) {
            WEBSPELLCHECKER.init(this._mergeOptions(t), this._handleInstanceCreated.bind(this))
          }
          _mergeOptions(t) {
            return Object.assign({}, this._userOptions, this._options, { container: t })
          }
          _handleInstanceCreated(t) {
            t &&
              ('destroyed' !== this.editor.state
                ? (this.isEnabled || this._disableInstance(t), this._instances.push(t))
                : t.destroy())
          }
          _subscribeOnEditorReady() {
            this.editor.on('ready', () => {
              this._createInstances()
            })
          }
          _handleToggleCommandEnabled(t) {
            return this._setIsEnabled(t, 'WProofreaderToggleCommandDisabling'), this._syncToggle(t), t
          }
          getStaticActions() {
            return 0 === this._instances.length ? [] : this._instances[0].getStaticActions()
          }
          toggle() {
            if (0 === this._instances.length) return
            const t = this.isInstancesEnabled()
            this._setIsEnabled(!t, Um), this._syncToggle(!t)
          }
          openSettings() {
            0 !== this._instances.length && this._instances[0].openSettings()
          }
          openDialog() {
            0 !== this._instances.length && this._instances[0].openDialog()
          }
          isInstancesReady() {
            return this._instances.length > 0
          }
          isInstancesEnabled() {
            return 0 !== this._instances.length && !this._instances[0].isDisabled()
          }
        },
      ]),
        (Gm.defaultConfig = {
          toolbar: {
            items: [
              'bold',
              'italic',
              'underline',
              '|',
              'bulletedList',
              'numberedList',
              'horizontalLine',
              '|',
              'undo',
              'redo',
              '|',
              'removeFormat',
              '|',
              'wproofreader',
            ],
          },
          language: 'en-gb',
          wproofreader: {
            lang: 'en_GB',
            serviceProtocol: Jm,
            serviceHost: Ym,
            servicePort: Xm || '80',
            servicePath: 'wscservice/api',
            removeBranding: !0,
            settingsSections: ['general', 'options'],
            srcUrl: Zm + '/wscservice/wscbundle/wscbundle.js',
          },
        })
      const Qm = {
        Editor: Gm,
        EditorWatchdog: class extends class {
          constructor(t) {
            if (
              ((this.crashes = []),
              (this.state = 'initializing'),
              (this._crashNumberLimit = 'number' == typeof t.crashNumberLimit ? t.crashNumberLimit : 3),
              (this._now = Date.now),
              (this._minimumNonErrorTimePeriod =
                'number' == typeof t.minimumNonErrorTimePeriod ? t.minimumNonErrorTimePeriod : 5e3),
              (this._boundErrorHandler = t => {
                const e = t.error || t.reason
                e instanceof Error && this._handleError(e, t)
              }),
              (this._listeners = {}),
              !this._restart)
            )
              throw new Error(
                'The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.'
              )
          }
          setCreator(t) {
            this._creator = t
          }
          setDestructor(t) {
            this._destructor = t
          }
          destroy() {
            this._stopErrorHandling(), (this._listeners = {})
          }
          on(t, e) {
            this._listeners[t] || (this._listeners[t] = []), this._listeners[t].push(e)
          }
          off(t, e) {
            this._listeners[t] = this._listeners[t].filter(t => t !== e)
          }
          _fire(t, ...e) {
            const n = this._listeners[t] || []
            for (const t of n) t.apply(this, [null, ...e])
          }
          _startErrorHandling() {
            window.addEventListener('error', this._boundErrorHandler),
              window.addEventListener('unhandledrejection', this._boundErrorHandler)
          }
          _stopErrorHandling() {
            window.removeEventListener('error', this._boundErrorHandler),
              window.removeEventListener('unhandledrejection', this._boundErrorHandler)
          }
          _handleError(t, e) {
            if (this._shouldReactToError(t)) {
              this.crashes.push({
                message: t.message,
                stack: t.stack,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                date: this._now(),
              })
              const n = this._shouldRestart()
              ;(this.state = 'crashed'),
                this._fire('stateChange'),
                this._fire('error', { error: t, causesRestart: n }),
                n ? this._restart() : ((this.state = 'crashedPermanently'), this._fire('stateChange'))
            }
          }
          _shouldReactToError(t) {
            return (
              t.is &&
              t.is('CKEditorError') &&
              void 0 !== t.context &&
              null !== t.context &&
              'ready' === this.state &&
              this._isErrorComingFromThisItem(t)
            )
          }
          _shouldRestart() {
            if (this.crashes.length <= this._crashNumberLimit) return !0
            return (
              (this.crashes[this.crashes.length - 1].date -
                this.crashes[this.crashes.length - 1 - this._crashNumberLimit].date) /
                this._crashNumberLimit >
              this._minimumNonErrorTimePeriod
            )
          }
        } {
          constructor(t, e = {}) {
            super(e),
              (this._editor = null),
              (this._throttledSave = Ku(
                this._save.bind(this),
                'number' == typeof e.saveInterval ? e.saveInterval : 5e3
              )),
              (this._creator = (e, n) => t.create(e, n)),
              (this._destructor = t => t.destroy())
          }
          get editor() {
            return this._editor
          }
          get _item() {
            return this._editor
          }
          _restart() {
            return Promise.resolve()
              .then(() => ((this.state = 'initializing'), this._fire('stateChange'), this._destroy()))
              .catch(t => {
                console.error('An error happened during the editor destroying.', t)
              })
              .then(() => {
                if ('string' == typeof this._elementOrData)
                  return this.create(this._data, this._config, this._config.context)
                {
                  const t = Object.assign({}, this._config, { initialData: this._data })
                  return this.create(this._elementOrData, t, t.context)
                }
              })
              .then(() => {
                this._fire('restart')
              })
          }
          create(t = this._elementOrData, e = this._config, n) {
            return Promise.resolve()
              .then(
                () => (
                  super._startErrorHandling(),
                  (this._elementOrData = t),
                  (this._config = this._cloneEditorConfiguration(e) || {}),
                  (this._config.context = n),
                  this._creator(t, this._config)
                )
              )
              .then(t => {
                ;(this._editor = t),
                  t.model.document.on('change:data', this._throttledSave),
                  (this._lastDocumentVersion = t.model.document.version),
                  (this._data = this._getData()),
                  (this.state = 'ready'),
                  this._fire('stateChange')
              })
          }
          destroy() {
            return Promise.resolve().then(
              () => ((this.state = 'destroyed'), this._fire('stateChange'), super.destroy(), this._destroy())
            )
          }
          _destroy() {
            return Promise.resolve().then(() => {
              this._stopErrorHandling(), this._throttledSave.flush()
              const t = this._editor
              return (
                (this._editor = null), t.model.document.off('change:data', this._throttledSave), this._destructor(t)
              )
            })
          }
          _save() {
            const t = this._editor.model.document.version
            try {
              ;(this._data = this._getData()), (this._lastDocumentVersion = t)
            } catch (t) {
              console.error(
                t,
                'An error happened during restoring editor data. Editor will be restored from the previously saved data.'
              )
            }
          }
          _setExcludedProperties(t) {
            this._excludedProps = t
          }
          _getData() {
            const t = {}
            for (const e of this._editor.model.document.getRootNames()) t[e] = this._editor.data.get({ rootName: e })
            return t
          }
          _isErrorComingFromThisItem(t) {
            return (function (t, e, n = new Set()) {
              if (t === e && 'object' == typeof (i = t) && null !== i) return !0
              var i
              const s = Hm(t, n),
                o = Hm(e, n)
              for (const t of s) if (o.has(t)) return !0
              return !1
            })(this._editor, t.context, this._excludedProps)
          }
          _cloneEditorConfiguration(t) {
            return bi(t, (t, e) => (yi(t) || 'context' === e ? t : void 0))
          }
        },
      }
      return (e = e.default)
    })()
  )
//# sourceMappingURL=ckeditor.js.map

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
    'Editor block content toolbar': '',
    'Editor contextual toolbar': '',
    'Editor editing area: %0': '',
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
      ? (exports.ClassicEditor = e())
      : (t.ClassicEditor = e())
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
      t.d(e, { default: () => lg })
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
      const s = new Array(256).fill('').map((t, e) => ('0' + e.toString(16)).slice(-2))
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
        get(t = 'normal') {
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
      class l extends Error {
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
          const n = new l(t.message, e)
          throw ((n.stack = t.stack), n)
        }
      }
      function c(t, e) {
        console.warn(...d(t, e))
      }
      function h(t) {
        return `\nRead more: https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-${t}`
      }
      function d(t, e) {
        const n = h(t)
        return e ? [t, e, n] : [t, n]
      }
      const u = '35.1.0',
        f = 'object' == typeof window ? window : t.g
      if (f.CKEDITOR_VERSION) throw new l('ckeditor-duplicated-modules', null)
      f.CKEDITOR_VERSION = u
      const m = Symbol('listeningTo'),
        g = Symbol('emitterId'),
        p = Symbol('delegations')
      function _(t) {
        return class extends t {
          on(t, e, n) {
            this.listenTo(this, t, e, n)
          }
          once(t, e, n) {
            let i = !1
            this.listenTo(
              this,
              t,
              (t, ...n) => {
                i || ((i = !0), t.off(), e.call(this, t, ...n))
              },
              n
            )
          }
          off(t, e) {
            this.stopListening(this, t, e)
          }
          listenTo(t, e, n, i = {}) {
            let s, o
            this[m] || (this[m] = {})
            const r = this[m]
            y(t) || b(t)
            const a = y(t)
            ;(s = r[a]) || (s = r[a] = { emitter: t, callbacks: {} }),
              (o = s.callbacks[e]) || (o = s.callbacks[e] = []),
              o.push(n),
              (function (t, e, n, i, s) {
                e._addEventListener ? e._addEventListener(n, i, s) : t._addEventListener.call(e, n, i, s)
              })(this, t, e, n, i)
          }
          stopListening(t, e, n) {
            const i = this[m]
            let s = t && y(t)
            const o = i && s ? i[s] : void 0,
              r = o && e ? o.callbacks[e] : void 0
            if (!(!i || (t && !o) || (e && !r)))
              if (n) {
                C(this, t, e, n)
                ;-1 !== r.indexOf(n) && (1 === r.length ? delete o.callbacks[e] : C(this, t, e, n))
              } else if (r) {
                for (; (n = r.pop()); ) C(this, t, e, n)
                delete o.callbacks[e]
              } else if (o) {
                for (e in o.callbacks) this.stopListening(t, e)
                delete i[s]
              } else {
                for (s in i) this.stopListening(i[s].emitter)
                delete this[m]
              }
          }
          fire(t, ...e) {
            try {
              const n = t instanceof i ? t : new i(this, t),
                s = n.name
              let o = k(this, s)
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
              const r = this[p]
              if (r) {
                const t = r.get(s),
                  i = r.get('*')
                t && A(t, n, e), i && A(i, n, e)
              }
              return n.return
            } catch (t) {
              l.rethrowUnexpectedError(t, this)
            }
          }
          delegate(...t) {
            return {
              to: (e, n) => {
                this[p] || (this[p] = new Map()),
                  t.forEach(t => {
                    const i = this[p].get(t)
                    i ? i.set(e, n) : this[p].set(t, new Map([[e, n]]))
                  })
              },
            }
          }
          stopDelegating(t, e) {
            if (this[p])
              if (t)
                if (e) {
                  const n = this[p].get(t)
                  n && n.delete(e)
                } else this[p].delete(t)
              else this[p].clear()
          }
          _addEventListener(t, e, n) {
            !(function (t, e) {
              const n = v(t)
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
            const i = P(this, t),
              s = { callback: e, priority: r.get(n.priority) }
            for (const t of i) a(t, s)
          }
          _removeEventListener(t, e) {
            const n = P(this, t)
            for (const t of n) for (let n = 0; n < t.length; n++) t[n].callback == e && (t.splice(n, 1), n--)
          }
        }
      }
      const w = _(Object)
      function b(t, e) {
        t[g] || (t[g] = e || o())
      }
      function y(t) {
        return t[g]
      }
      function v(t) {
        return t._events || Object.defineProperty(t, '_events', { value: {} }), t._events
      }
      function P(t, e) {
        const n = v(t)[e]
        if (!n) return []
        let i = [n.callbacks]
        for (let e = 0; e < n.childEvents.length; e++) {
          const s = P(t, n.childEvents[e])
          i = i.concat(s)
        }
        return i
      }
      function k(t, e) {
        let n
        return t._events && (n = t._events[e]) && n.callbacks.length
          ? n.callbacks
          : e.indexOf(':') > -1
          ? k(t, e.substr(0, e.lastIndexOf(':')))
          : null
      }
      function A(t, e, n) {
        for (let [s, o] of t) {
          o ? 'function' == typeof o && (o = o(e.name)) : (o = e.name)
          const t = new i(e.source, o)
          ;(t.path = [...e.path]), s.fire(t, ...n)
        }
      }
      function C(t, e, n, i) {
        e._removeEventListener ? e._removeEventListener(n, i) : t._removeEventListener.call(e, n, i)
      }
      ;[
        'on',
        'once',
        'off',
        'listenTo',
        'stopListening',
        'fire',
        'delegate',
        'stopDelegating',
        '_addEventListener',
        '_removeEventListener',
      ].forEach(t => {
        _[t] = w.prototype[t]
      })
      const E = function (t) {
          var e = typeof t
          return null != t && ('object' == e || 'function' == e)
        },
        T = Symbol('observableProperties'),
        x = Symbol('boundObservables'),
        S = Symbol('boundProperties'),
        R = Symbol('decoratedMethods'),
        O = Symbol('decoratedOriginal')
      function I(t) {
        return class extends t {
          set(t, e) {
            if (E(t))
              return void Object.keys(t).forEach(e => {
                this.set(e, t[e])
              }, this)
            N(this)
            const n = this[T]
            if (t in this && !n.has(t)) throw new l('observable-set-cannot-override', this)
            Object.defineProperty(this, t, {
              enumerable: !0,
              configurable: !0,
              get: () => n.get(t),
              set(e) {
                const i = n.get(t)
                let s = this.fire(`set:${t}`, t, e, i)
                void 0 === s && (s = e), (i === s && n.has(t)) || (n.set(t, s), this.fire(`change:${t}`, t, s, i))
              },
            }),
              (this[t] = e)
          }
          bind(...t) {
            if (!t.length || !B(t)) throw new l('observable-bind-wrong-properties', this)
            if (new Set(t).size !== t.length) throw new l('observable-bind-duplicate-properties', this)
            N(this)
            const e = this[S]
            t.forEach(t => {
              if (e.has(t)) throw new l('observable-bind-rebind', this)
            })
            const n = new Map()
            return (
              t.forEach(t => {
                const i = { property: t, to: [] }
                e.set(t, i), n.set(t, i)
              }),
              { to: D, toMany: F, _observable: this, _bindProperties: t, _to: [], _bindings: n }
            )
          }
          unbind(...t) {
            if (!this[T]) return
            const e = this[S],
              n = this[x]
            if (t.length) {
              if (!B(t)) throw new l('observable-unbind-wrong-properties', this)
              t.forEach(t => {
                const i = e.get(t)
                i &&
                  (i.to.forEach(([t, e]) => {
                    const s = n.get(t),
                      o = s[e]
                    o.delete(i),
                      o.size || delete s[e],
                      Object.keys(s).length || (n.delete(t), this.stopListening(t, 'change'))
                  }),
                  e.delete(t))
              })
            } else
              n.forEach((t, e) => {
                this.stopListening(e, 'change')
              }),
                n.clear(),
                e.clear()
          }
          decorate(t) {
            N(this)
            const e = this[t]
            if (!e) throw new l('observablemixin-cannot-decorate-undefined', this, { object: this, methodName: t })
            this.on(t, (t, n) => {
              t.return = e.apply(this, n)
            }),
              (this[t] = function (...e) {
                return this.fire(t, e)
              }),
              (this[t][O] = e),
              this[R] || (this[R] = []),
              this[R].push(t)
          }
          stopListening(t, e, n) {
            if (!t && this[R]) {
              for (const t of this[R]) this[t] = this[t][O]
              delete this[R]
            }
            w.prototype.stopListening.call(this, t, e, n)
          }
        }
      }
      const M = I(w)
      function N(t) {
        t[T] ||
          (Object.defineProperty(t, T, { value: new Map() }),
          Object.defineProperty(t, x, { value: new Map() }),
          Object.defineProperty(t, S, { value: new Map() }))
      }
      function D(...t) {
        const e = (function (...t) {
            if (!t.length) throw new l('observable-bind-to-parse-error', null)
            const e = { to: [] }
            let n
            'function' == typeof t[t.length - 1] && (e.callback = t.pop())
            return (
              t.forEach(t => {
                if ('string' == typeof t) n.properties.push(t)
                else {
                  if ('object' != typeof t) throw new l('observable-bind-to-parse-error', null)
                  ;(n = { observable: t, properties: [] }), e.to.push(n)
                }
              }),
              e
            )
          })(...t),
          n = Array.from(this._bindings.keys()),
          i = n.length
        if (!e.callback && e.to.length > 1) throw new l('observable-bind-to-no-callback', this)
        if (i > 1 && e.callback) throw new l('observable-bind-to-extra-callback', this)
        var s
        e.to.forEach(t => {
          if (t.properties.length && t.properties.length !== i)
            throw new l('observable-bind-to-properties-length', this)
          t.properties.length || (t.properties = this._bindProperties)
        }),
          (this._to = e.to),
          e.callback && (this._bindings.get(n[0]).callback = e.callback),
          (s = this._observable),
          this._to.forEach(t => {
            const e = s[x]
            let n
            e.get(t.observable) ||
              s.listenTo(t.observable, 'change', (i, o) => {
                ;(n = e.get(t.observable)[o]),
                  n &&
                    n.forEach(t => {
                      V(s, t.property)
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
                    const s = t[x],
                      o = s.get(n),
                      r = o || {}
                    r[i] || (r[i] = new Set())
                    r[i].add(e), o || s.set(n, r)
                  })(t._observable, n, s.observable, e)
              })
            })
          })(this),
          this._bindProperties.forEach(t => {
            V(this._observable, t)
          })
      }
      function F(t, e, n) {
        if (this._bindings.size > 1) throw new l('observable-bind-to-many-not-one-binding', this)
        this.to(
          ...(function (t, e) {
            const n = t.map(t => [t, e])
            return Array.prototype.concat.apply([], n)
          })(t, e),
          n
        )
      }
      function B(t) {
        return t.every(t => 'string' == typeof t)
      }
      function V(t, e) {
        const n = t[S].get(e)
        let i
        n.callback
          ? (i = n.callback.apply(
              t,
              n.to.map(t => t[0][t[1]])
            ))
          : ((i = n.to[0]), (i = i[0][i[1]])),
          Object.prototype.hasOwnProperty.call(t, e) ? (t[e] = i) : t.set(e, i)
      }
      function L(t, ...e) {
        e.forEach(e => {
          const n = Object.getOwnPropertyNames(e),
            i = Object.getOwnPropertySymbols(e)
          n.concat(i).forEach(n => {
            if (n in t.prototype) return
            if ('function' == typeof e && ('length' == n || 'name' == n || 'prototype' == n)) return
            const i = Object.getOwnPropertyDescriptor(e, n)
            ;(i.enumerable = !1), Object.defineProperty(t.prototype, n, i)
          })
        })
      }
      ;[
        'set',
        'bind',
        'unbind',
        'decorate',
        'on',
        'once',
        'off',
        'listenTo',
        'stopListening',
        'fire',
        'delegate',
        'stopDelegating',
        '_addEventListener',
        '_removeEventListener',
      ].forEach(t => {
        I[t] = M.prototype[t]
      })
      class j {
        constructor(t) {
          ;(this.editor = t), this.set('isEnabled', !0), (this._disableStack = new Set())
        }
        forceDisabled(t) {
          this._disableStack.add(t),
            1 == this._disableStack.size &&
              (this.on('set:isEnabled', W, { priority: 'highest' }), (this.isEnabled = !1))
        }
        clearForceDisabled(t) {
          this._disableStack.delete(t),
            0 == this._disableStack.size && (this.off('set:isEnabled', W), (this.isEnabled = !0))
        }
        destroy() {
          this.stopListening()
        }
        static get isContextPlugin() {
          return !1
        }
      }
      function W(t) {
        ;(t.return = !1), t.stop()
      }
      L(j, I)
      class $ {
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
              (this.on('set:isEnabled', z, { priority: 'highest' }), (this.isEnabled = !1))
        }
        clearForceDisabled(t) {
          this._disableStack.delete(t), 0 == this._disableStack.size && (this.off('set:isEnabled', z), this.refresh())
        }
        execute() {}
        destroy() {
          this.stopListening()
        }
      }
      function z(t) {
        ;(t.return = !1), t.stop()
      }
      L($, I)
      const q = 'object' == typeof global && global && global.Object === Object && global
      var U = 'object' == typeof self && self && self.Object === Object && self
      const H = q || U || Function('return this')()
      const K = H.Symbol
      var G = Object.prototype,
        J = G.hasOwnProperty,
        Y = G.toString,
        X = K ? K.toStringTag : void 0
      const Z = function (t) {
        var e = J.call(t, X),
          n = t[X]
        try {
          t[X] = void 0
          var i = !0
        } catch (t) {}
        var s = Y.call(t)
        return i && (e ? (t[X] = n) : delete t[X]), s
      }
      var Q = Object.prototype.toString
      const tt = function (t) {
        return Q.call(t)
      }
      var et = K ? K.toStringTag : void 0
      const nt = function (t) {
        return null == t
          ? void 0 === t
            ? '[object Undefined]'
            : '[object Null]'
          : et && et in Object(t)
          ? Z(t)
          : tt(t)
      }
      const it = function (t, e) {
        return function (n) {
          return t(e(n))
        }
      }
      const st = it(Object.getPrototypeOf, Object)
      const ot = function (t) {
        return null != t && 'object' == typeof t
      }
      var rt = Function.prototype,
        at = Object.prototype,
        lt = rt.toString,
        ct = at.hasOwnProperty,
        ht = lt.call(Object)
      const dt = function (t) {
        if (!ot(t) || '[object Object]' != nt(t)) return !1
        var e = st(t)
        if (null === e) return !0
        var n = ct.call(e, 'constructor') && e.constructor
        return 'function' == typeof n && n instanceof n && lt.call(n) == ht
      }
      const ut = function () {
        ;(this.__data__ = []), (this.size = 0)
      }
      const ft = function (t, e) {
        return t === e || (t != t && e != e)
      }
      const mt = function (t, e) {
        for (var n = t.length; n--; ) if (ft(t[n][0], e)) return n
        return -1
      }
      var gt = Array.prototype.splice
      const pt = function (t) {
        var e = this.__data__,
          n = mt(e, t)
        return !(n < 0) && (n == e.length - 1 ? e.pop() : gt.call(e, n, 1), --this.size, !0)
      }
      const _t = function (t) {
        var e = this.__data__,
          n = mt(e, t)
        return n < 0 ? void 0 : e[n][1]
      }
      const wt = function (t) {
        return mt(this.__data__, t) > -1
      }
      const bt = function (t, e) {
        var n = this.__data__,
          i = mt(n, t)
        return i < 0 ? (++this.size, n.push([t, e])) : (n[i][1] = e), this
      }
      function yt(t) {
        var e = -1,
          n = null == t ? 0 : t.length
        for (this.clear(); ++e < n; ) {
          var i = t[e]
          this.set(i[0], i[1])
        }
      }
      ;(yt.prototype.clear = ut),
        (yt.prototype.delete = pt),
        (yt.prototype.get = _t),
        (yt.prototype.has = wt),
        (yt.prototype.set = bt)
      const vt = yt
      const Pt = function () {
        ;(this.__data__ = new vt()), (this.size = 0)
      }
      const kt = function (t) {
        var e = this.__data__,
          n = e.delete(t)
        return (this.size = e.size), n
      }
      const At = function (t) {
        return this.__data__.get(t)
      }
      const Ct = function (t) {
        return this.__data__.has(t)
      }
      const Et = function (t) {
        if (!E(t)) return !1
        var e = nt(t)
        return (
          '[object Function]' == e ||
          '[object GeneratorFunction]' == e ||
          '[object AsyncFunction]' == e ||
          '[object Proxy]' == e
        )
      }
      const Tt = H['__core-js_shared__']
      var xt = (function () {
        var t = /[^.]+$/.exec((Tt && Tt.keys && Tt.keys.IE_PROTO) || '')
        return t ? 'Symbol(src)_1.' + t : ''
      })()
      const St = function (t) {
        return !!xt && xt in t
      }
      var Rt = Function.prototype.toString
      const Ot = function (t) {
        if (null != t) {
          try {
            return Rt.call(t)
          } catch (t) {}
          try {
            return t + ''
          } catch (t) {}
        }
        return ''
      }
      var It = /^\[object .+?Constructor\]$/,
        Mt = Function.prototype,
        Nt = Object.prototype,
        Dt = Mt.toString,
        Ft = Nt.hasOwnProperty,
        Bt = RegExp(
          '^' +
            Dt.call(Ft)
              .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
              .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
            '$'
        )
      const Vt = function (t) {
        return !(!E(t) || St(t)) && (Et(t) ? Bt : It).test(Ot(t))
      }
      const Lt = function (t, e) {
        return null == t ? void 0 : t[e]
      }
      const jt = function (t, e) {
        var n = Lt(t, e)
        return Vt(n) ? n : void 0
      }
      const Wt = jt(H, 'Map')
      const $t = jt(Object, 'create')
      const zt = function () {
        ;(this.__data__ = $t ? $t(null) : {}), (this.size = 0)
      }
      const qt = function (t) {
        var e = this.has(t) && delete this.__data__[t]
        return (this.size -= e ? 1 : 0), e
      }
      var Ut = Object.prototype.hasOwnProperty
      const Ht = function (t) {
        var e = this.__data__
        if ($t) {
          var n = e[t]
          return '__lodash_hash_undefined__' === n ? void 0 : n
        }
        return Ut.call(e, t) ? e[t] : void 0
      }
      var Kt = Object.prototype.hasOwnProperty
      const Gt = function (t) {
        var e = this.__data__
        return $t ? void 0 !== e[t] : Kt.call(e, t)
      }
      const Jt = function (t, e) {
        var n = this.__data__
        return (this.size += this.has(t) ? 0 : 1), (n[t] = $t && void 0 === e ? '__lodash_hash_undefined__' : e), this
      }
      function Yt(t) {
        var e = -1,
          n = null == t ? 0 : t.length
        for (this.clear(); ++e < n; ) {
          var i = t[e]
          this.set(i[0], i[1])
        }
      }
      ;(Yt.prototype.clear = zt),
        (Yt.prototype.delete = qt),
        (Yt.prototype.get = Ht),
        (Yt.prototype.has = Gt),
        (Yt.prototype.set = Jt)
      const Xt = Yt
      const Zt = function () {
        ;(this.size = 0), (this.__data__ = { hash: new Xt(), map: new (Wt || vt)(), string: new Xt() })
      }
      const Qt = function (t) {
        var e = typeof t
        return 'string' == e || 'number' == e || 'symbol' == e || 'boolean' == e ? '__proto__' !== t : null === t
      }
      const te = function (t, e) {
        var n = t.__data__
        return Qt(e) ? n['string' == typeof e ? 'string' : 'hash'] : n.map
      }
      const ee = function (t) {
        var e = te(this, t).delete(t)
        return (this.size -= e ? 1 : 0), e
      }
      const ne = function (t) {
        return te(this, t).get(t)
      }
      const ie = function (t) {
        return te(this, t).has(t)
      }
      const se = function (t, e) {
        var n = te(this, t),
          i = n.size
        return n.set(t, e), (this.size += n.size == i ? 0 : 1), this
      }
      function oe(t) {
        var e = -1,
          n = null == t ? 0 : t.length
        for (this.clear(); ++e < n; ) {
          var i = t[e]
          this.set(i[0], i[1])
        }
      }
      ;(oe.prototype.clear = Zt),
        (oe.prototype.delete = ee),
        (oe.prototype.get = ne),
        (oe.prototype.has = ie),
        (oe.prototype.set = se)
      const re = oe
      const ae = function (t, e) {
        var n = this.__data__
        if (n instanceof vt) {
          var i = n.__data__
          if (!Wt || i.length < 199) return i.push([t, e]), (this.size = ++n.size), this
          n = this.__data__ = new re(i)
        }
        return n.set(t, e), (this.size = n.size), this
      }
      function le(t) {
        var e = (this.__data__ = new vt(t))
        this.size = e.size
      }
      ;(le.prototype.clear = Pt),
        (le.prototype.delete = kt),
        (le.prototype.get = At),
        (le.prototype.has = Ct),
        (le.prototype.set = ae)
      const ce = le
      const he = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length; ++n < i && !1 !== e(t[n], n, t); );
        return t
      }
      const de = (function () {
        try {
          var t = jt(Object, 'defineProperty')
          return t({}, '', {}), t
        } catch (t) {}
      })()
      const ue = function (t, e, n) {
        '__proto__' == e && de ? de(t, e, { configurable: !0, enumerable: !0, value: n, writable: !0 }) : (t[e] = n)
      }
      var fe = Object.prototype.hasOwnProperty
      const me = function (t, e, n) {
        var i = t[e]
        ;(fe.call(t, e) && ft(i, n) && (void 0 !== n || e in t)) || ue(t, e, n)
      }
      const ge = function (t, e, n, i) {
        var s = !n
        n || (n = {})
        for (var o = -1, r = e.length; ++o < r; ) {
          var a = e[o],
            l = i ? i(n[a], t[a], a, n, t) : void 0
          void 0 === l && (l = t[a]), s ? ue(n, a, l) : me(n, a, l)
        }
        return n
      }
      const pe = function (t, e) {
        for (var n = -1, i = Array(t); ++n < t; ) i[n] = e(n)
        return i
      }
      const _e = function (t) {
        return ot(t) && '[object Arguments]' == nt(t)
      }
      var we = Object.prototype,
        be = we.hasOwnProperty,
        ye = we.propertyIsEnumerable
      const ve = _e(
        (function () {
          return arguments
        })()
      )
        ? _e
        : function (t) {
            return ot(t) && be.call(t, 'callee') && !ye.call(t, 'callee')
          }
      const Pe = Array.isArray
      const ke = function () {
        return !1
      }
      var Ae = 'object' == typeof exports && exports && !exports.nodeType && exports,
        Ce = Ae && 'object' == typeof module && module && !module.nodeType && module,
        Ee = Ce && Ce.exports === Ae ? H.Buffer : void 0
      const Te = (Ee ? Ee.isBuffer : void 0) || ke
      var xe = /^(?:0|[1-9]\d*)$/
      const Se = function (t, e) {
        var n = typeof t
        return (
          !!(e = null == e ? 9007199254740991 : e) &&
          ('number' == n || ('symbol' != n && xe.test(t))) &&
          t > -1 &&
          t % 1 == 0 &&
          t < e
        )
      }
      const Re = function (t) {
        return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
      }
      var Oe = {}
      ;(Oe['[object Float32Array]'] =
        Oe['[object Float64Array]'] =
        Oe['[object Int8Array]'] =
        Oe['[object Int16Array]'] =
        Oe['[object Int32Array]'] =
        Oe['[object Uint8Array]'] =
        Oe['[object Uint8ClampedArray]'] =
        Oe['[object Uint16Array]'] =
        Oe['[object Uint32Array]'] =
          !0),
        (Oe['[object Arguments]'] =
          Oe['[object Array]'] =
          Oe['[object ArrayBuffer]'] =
          Oe['[object Boolean]'] =
          Oe['[object DataView]'] =
          Oe['[object Date]'] =
          Oe['[object Error]'] =
          Oe['[object Function]'] =
          Oe['[object Map]'] =
          Oe['[object Number]'] =
          Oe['[object Object]'] =
          Oe['[object RegExp]'] =
          Oe['[object Set]'] =
          Oe['[object String]'] =
          Oe['[object WeakMap]'] =
            !1)
      const Ie = function (t) {
        return ot(t) && Re(t.length) && !!Oe[nt(t)]
      }
      const Me = function (t) {
        return function (e) {
          return t(e)
        }
      }
      var Ne = 'object' == typeof exports && exports && !exports.nodeType && exports,
        De = Ne && 'object' == typeof module && module && !module.nodeType && module,
        Fe = De && De.exports === Ne && q.process
      const Be = (function () {
        try {
          var t = De && De.require && De.require('util').types
          return t || (Fe && Fe.binding && Fe.binding('util'))
        } catch (t) {}
      })()
      var Ve = Be && Be.isTypedArray
      const Le = Ve ? Me(Ve) : Ie
      var je = Object.prototype.hasOwnProperty
      const We = function (t, e) {
        var n = Pe(t),
          i = !n && ve(t),
          s = !n && !i && Te(t),
          o = !n && !i && !s && Le(t),
          r = n || i || s || o,
          a = r ? pe(t.length, String) : [],
          l = a.length
        for (var c in t)
          (!e && !je.call(t, c)) ||
            (r &&
              ('length' == c ||
                (s && ('offset' == c || 'parent' == c)) ||
                (o && ('buffer' == c || 'byteLength' == c || 'byteOffset' == c)) ||
                Se(c, l))) ||
            a.push(c)
        return a
      }
      var $e = Object.prototype
      const ze = function (t) {
        var e = t && t.constructor
        return t === (('function' == typeof e && e.prototype) || $e)
      }
      const qe = it(Object.keys, Object)
      var Ue = Object.prototype.hasOwnProperty
      const He = function (t) {
        if (!ze(t)) return qe(t)
        var e = []
        for (var n in Object(t)) Ue.call(t, n) && 'constructor' != n && e.push(n)
        return e
      }
      const Ke = function (t) {
        return null != t && Re(t.length) && !Et(t)
      }
      const Ge = function (t) {
        return Ke(t) ? We(t) : He(t)
      }
      const Je = function (t, e) {
        return t && ge(e, Ge(e), t)
      }
      const Ye = function (t) {
        var e = []
        if (null != t) for (var n in Object(t)) e.push(n)
        return e
      }
      var Xe = Object.prototype.hasOwnProperty
      const Ze = function (t) {
        if (!E(t)) return Ye(t)
        var e = ze(t),
          n = []
        for (var i in t) ('constructor' != i || (!e && Xe.call(t, i))) && n.push(i)
        return n
      }
      const Qe = function (t) {
        return Ke(t) ? We(t, !0) : Ze(t)
      }
      const tn = function (t, e) {
        return t && ge(e, Qe(e), t)
      }
      var en = 'object' == typeof exports && exports && !exports.nodeType && exports,
        nn = en && 'object' == typeof module && module && !module.nodeType && module,
        sn = nn && nn.exports === en ? H.Buffer : void 0,
        on = sn ? sn.allocUnsafe : void 0
      const rn = function (t, e) {
        if (e) return t.slice()
        var n = t.length,
          i = on ? on(n) : new t.constructor(n)
        return t.copy(i), i
      }
      const an = function (t, e) {
        var n = -1,
          i = t.length
        for (e || (e = Array(i)); ++n < i; ) e[n] = t[n]
        return e
      }
      const ln = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length, s = 0, o = []; ++n < i; ) {
          var r = t[n]
          e(r, n, t) && (o[s++] = r)
        }
        return o
      }
      const cn = function () {
        return []
      }
      var hn = Object.prototype.propertyIsEnumerable,
        dn = Object.getOwnPropertySymbols
      const un = dn
        ? function (t) {
            return null == t
              ? []
              : ((t = Object(t)),
                ln(dn(t), function (e) {
                  return hn.call(t, e)
                }))
          }
        : cn
      const fn = function (t, e) {
        return ge(t, un(t), e)
      }
      const mn = function (t, e) {
        for (var n = -1, i = e.length, s = t.length; ++n < i; ) t[s + n] = e[n]
        return t
      }
      const gn = Object.getOwnPropertySymbols
        ? function (t) {
            for (var e = []; t; ) mn(e, un(t)), (t = st(t))
            return e
          }
        : cn
      const pn = function (t, e) {
        return ge(t, gn(t), e)
      }
      const _n = function (t, e, n) {
        var i = e(t)
        return Pe(t) ? i : mn(i, n(t))
      }
      const wn = function (t) {
        return _n(t, Ge, un)
      }
      const bn = function (t) {
        return _n(t, Qe, gn)
      }
      const yn = jt(H, 'DataView')
      const vn = jt(H, 'Promise')
      const Pn = jt(H, 'Set')
      const kn = jt(H, 'WeakMap')
      var An = '[object Map]',
        Cn = '[object Promise]',
        En = '[object Set]',
        Tn = '[object WeakMap]',
        xn = '[object DataView]',
        Sn = Ot(yn),
        Rn = Ot(Wt),
        On = Ot(vn),
        In = Ot(Pn),
        Mn = Ot(kn),
        Nn = nt
      ;((yn && Nn(new yn(new ArrayBuffer(1))) != xn) ||
        (Wt && Nn(new Wt()) != An) ||
        (vn && Nn(vn.resolve()) != Cn) ||
        (Pn && Nn(new Pn()) != En) ||
        (kn && Nn(new kn()) != Tn)) &&
        (Nn = function (t) {
          var e = nt(t),
            n = '[object Object]' == e ? t.constructor : void 0,
            i = n ? Ot(n) : ''
          if (i)
            switch (i) {
              case Sn:
                return xn
              case Rn:
                return An
              case On:
                return Cn
              case In:
                return En
              case Mn:
                return Tn
            }
          return e
        })
      const Dn = Nn
      var Fn = Object.prototype.hasOwnProperty
      const Bn = function (t) {
        var e = t.length,
          n = new t.constructor(e)
        return e && 'string' == typeof t[0] && Fn.call(t, 'index') && ((n.index = t.index), (n.input = t.input)), n
      }
      const Vn = H.Uint8Array
      const Ln = function (t) {
        var e = new t.constructor(t.byteLength)
        return new Vn(e).set(new Vn(t)), e
      }
      const jn = function (t, e) {
        var n = e ? Ln(t.buffer) : t.buffer
        return new t.constructor(n, t.byteOffset, t.byteLength)
      }
      var Wn = /\w*$/
      const $n = function (t) {
        var e = new t.constructor(t.source, Wn.exec(t))
        return (e.lastIndex = t.lastIndex), e
      }
      var zn = K ? K.prototype : void 0,
        qn = zn ? zn.valueOf : void 0
      const Un = function (t) {
        return qn ? Object(qn.call(t)) : {}
      }
      const Hn = function (t, e) {
        var n = e ? Ln(t.buffer) : t.buffer
        return new t.constructor(n, t.byteOffset, t.length)
      }
      const Kn = function (t, e, n) {
        var i = t.constructor
        switch (e) {
          case '[object ArrayBuffer]':
            return Ln(t)
          case '[object Boolean]':
          case '[object Date]':
            return new i(+t)
          case '[object DataView]':
            return jn(t, n)
          case '[object Float32Array]':
          case '[object Float64Array]':
          case '[object Int8Array]':
          case '[object Int16Array]':
          case '[object Int32Array]':
          case '[object Uint8Array]':
          case '[object Uint8ClampedArray]':
          case '[object Uint16Array]':
          case '[object Uint32Array]':
            return Hn(t, n)
          case '[object Map]':
          case '[object Set]':
            return new i()
          case '[object Number]':
          case '[object String]':
            return new i(t)
          case '[object RegExp]':
            return $n(t)
          case '[object Symbol]':
            return Un(t)
        }
      }
      var Gn = Object.create
      const Jn = (function () {
        function t() {}
        return function (e) {
          if (!E(e)) return {}
          if (Gn) return Gn(e)
          t.prototype = e
          var n = new t()
          return (t.prototype = void 0), n
        }
      })()
      const Yn = function (t) {
        return 'function' != typeof t.constructor || ze(t) ? {} : Jn(st(t))
      }
      const Xn = function (t) {
        return ot(t) && '[object Map]' == Dn(t)
      }
      var Zn = Be && Be.isMap
      const Qn = Zn ? Me(Zn) : Xn
      const ti = function (t) {
        return ot(t) && '[object Set]' == Dn(t)
      }
      var ei = Be && Be.isSet
      const ni = ei ? Me(ei) : ti
      var ii = '[object Arguments]',
        si = '[object Function]',
        oi = '[object Object]',
        ri = {}
      ;(ri[ii] =
        ri['[object Array]'] =
        ri['[object ArrayBuffer]'] =
        ri['[object DataView]'] =
        ri['[object Boolean]'] =
        ri['[object Date]'] =
        ri['[object Float32Array]'] =
        ri['[object Float64Array]'] =
        ri['[object Int8Array]'] =
        ri['[object Int16Array]'] =
        ri['[object Int32Array]'] =
        ri['[object Map]'] =
        ri['[object Number]'] =
        ri['[object Object]'] =
        ri['[object RegExp]'] =
        ri['[object Set]'] =
        ri['[object String]'] =
        ri['[object Symbol]'] =
        ri['[object Uint8Array]'] =
        ri['[object Uint8ClampedArray]'] =
        ri['[object Uint16Array]'] =
        ri['[object Uint32Array]'] =
          !0),
        (ri['[object Error]'] = ri[si] = ri['[object WeakMap]'] = !1)
      const ai = function t(e, n, i, s, o, r) {
        var a,
          l = 1 & n,
          c = 2 & n,
          h = 4 & n
        if ((i && (a = o ? i(e, s, o, r) : i(e)), void 0 !== a)) return a
        if (!E(e)) return e
        var d = Pe(e)
        if (d) {
          if (((a = Bn(e)), !l)) return an(e, a)
        } else {
          var u = Dn(e),
            f = u == si || '[object GeneratorFunction]' == u
          if (Te(e)) return rn(e, l)
          if (u == oi || u == ii || (f && !o)) {
            if (((a = c || f ? {} : Yn(e)), !l)) return c ? pn(e, tn(a, e)) : fn(e, Je(a, e))
          } else {
            if (!ri[u]) return o ? e : {}
            a = Kn(e, u, l)
          }
        }
        r || (r = new ce())
        var m = r.get(e)
        if (m) return m
        r.set(e, a),
          ni(e)
            ? e.forEach(function (s) {
                a.add(t(s, n, i, s, e, r))
              })
            : Qn(e) &&
              e.forEach(function (s, o) {
                a.set(o, t(s, n, i, o, e, r))
              })
        var g = d ? void 0 : (h ? (c ? bn : wn) : c ? Qe : Ge)(e)
        return (
          he(g || e, function (s, o) {
            g && (s = e[(o = s)]), me(a, o, t(s, n, i, o, e, r))
          }),
          a
        )
      }
      const li = function (t, e) {
        return ai(t, 5, (e = 'function' == typeof e ? e : void 0))
      }
      const ci = function (t) {
        return ot(t) && 1 === t.nodeType && !dt(t)
      }
      class hi {
        constructor(t, e) {
          ;(this._config = {}), e && this.define(di(e)), t && this._setObjectToTarget(this._config, t)
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
          if (dt(e)) return void this._setObjectToTarget(t, e, i)
          const s = e.split('.')
          e = s.pop()
          for (const e of s) dt(t[e]) || (t[e] = {}), (t = t[e])
          if (dt(n)) return dt(t[e]) || (t[e] = {}), (t = t[e]), void this._setObjectToTarget(t, n, i)
          ;(i && void 0 !== t[e]) || (t[e] = n)
        }
        _getFromSource(t, e) {
          const n = e.split('.')
          e = n.pop()
          for (const e of n) {
            if (!dt(t[e])) {
              t = null
              break
            }
            t = t[e]
          }
          return t ? di(t[e]) : void 0
        }
        _setObjectToTarget(t, e, n) {
          Object.keys(e).forEach(i => {
            this._setToTarget(t, i, e[i], n)
          })
        }
      }
      function di(t) {
        return li(t, ui)
      }
      function ui(t) {
        return ci(t) ? t : void 0
      }
      function fi(t) {
        return !(!t || !t[Symbol.iterator])
      }
      class mi extends w {
        constructor(t = {}, e = {}) {
          super()
          const n = fi(t)
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
          else if (e > this._items.length || e < 0) throw new l('collection-add-item-invalid-index', this)
          let n = 0
          for (const i of t) {
            const t = this._getItemIdBeforeAdding(i),
              s = e + n
            this._items.splice(s, 0, i), this._itemMap.set(t, i), this.fire('add', i, s), n++
          }
          return this.fire('change', { added: t, removed: [], index: e }), this
        }
        get(t) {
          let e
          if ('string' == typeof t) e = this._itemMap.get(t)
          else {
            if ('number' != typeof t) throw new l('collection-get-invalid-arg', this)
            e = this._items[t]
          }
          return e || null
        }
        has(t) {
          if ('string' == typeof t) return this._itemMap.has(t)
          {
            const e = t[this._idProperty]
            return e && this._itemMap.has(e)
          }
        }
        getIndex(t) {
          let e
          return (e = 'string' == typeof t ? this._itemMap.get(t) : t), e ? this._items.indexOf(e) : -1
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
          if (this._bindToCollection) throw new l('collection-bind-to-rebind', this)
          return (
            (this._bindToCollection = t),
            {
              as: t => {
                this._setUpBindToBinding(e => new t(e))
              },
              using: t => {
                'function' == typeof t ? this._setUpBindToBinding(t) : this._setUpBindToBinding(e => e[t])
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
            if (((n = t[e]), 'string' != typeof n)) throw new l('collection-add-invalid-id', this)
            if (this.get(n)) throw new l('collection-add-item-already-exists', this)
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
            throw new l('collection-remove-404', this)
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
      class gi {
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
              new l('plugincollection-plugin-not-loaded', this._context, { plugin: e }))
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
                throw new l('plugincollection-replace-plugin-invalid-type', null, { pluginItem: n })
              const e = n.pluginName
              if (!e) throw new l('plugincollection-replace-plugin-missing-name', null, { pluginItem: n })
              if (n.requires && n.requires.length)
                throw new l('plugincollection-plugin-for-replacing-cannot-have-dependencies', null, { pluginName: e })
              const s = i._availablePlugins.get(e)
              if (!s) throw new l('plugincollection-plugin-for-replacing-not-exist', null, { pluginName: e })
              const o = t.indexOf(s)
              if (-1 === o) {
                if (i._contextPlugins.has(s)) return
                throw new l('plugincollection-plugin-for-replacing-not-loaded', null, { pluginName: e })
              }
              if (s.requires && s.requires.length)
                throw new l('plugincollection-replaced-plugin-cannot-have-dependencies', null, { pluginName: e })
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
          function c(t) {
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
                if (e) throw new l('plugincollection-soft-required', s, { missingPlugin: t, requiredBy: d(e) })
                throw new l('plugincollection-plugin-not-found', s, { plugin: t })
              })(t, n),
                (function (t, e) {
                  if (!c(e)) return
                  if (c(t)) return
                  throw new l('plugincollection-context-required', s, { plugin: d(t), requiredBy: d(e) })
                })(t, n),
                (function (t, n) {
                  if (!n) return
                  if (!h(t, e)) return
                  throw new l('plugincollection-required', s, { plugin: d(t), requiredBy: d(n) })
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
              throw new l('plugincollection-plugin-name-conflict', null, {
                pluginName: n,
                plugin1: this._plugins.get(n).constructor,
                plugin2: t,
              })
            this._plugins.set(n, e)
          }
        }
      }
      function pi(t) {
        return Array.isArray(t) ? t : [t]
      }
      let _i
      L(gi, _)
      try {
        _i = { window, document }
      } catch (t) {
        _i = { window: {}, document: {} }
      }
      const wi = _i
      function bi(t, e, n = 1) {
        if ('number' != typeof n) throw new l('translation-service-quantity-not-a-number', null, { quantity: n })
        const i = Object.keys(wi.window.CKEDITOR_TRANSLATIONS).length
        1 === i && (t = Object.keys(wi.window.CKEDITOR_TRANSLATIONS)[0])
        const s = e.id || e.string
        if (
          0 === i ||
          !(function (t, e) {
            return !!wi.window.CKEDITOR_TRANSLATIONS[t] && !!wi.window.CKEDITOR_TRANSLATIONS[t].dictionary[e]
          })(t, s)
        )
          return 1 !== n ? e.plural : e.string
        const o = wi.window.CKEDITOR_TRANSLATIONS[t].dictionary,
          r = wi.window.CKEDITOR_TRANSLATIONS[t].getPluralForm || (t => (1 === t ? 0 : 1)),
          a = o[s]
        if ('string' == typeof a) return a
        return a[Number(r(n))]
      }
      wi.window.CKEDITOR_TRANSLATIONS || (wi.window.CKEDITOR_TRANSLATIONS = {})
      const yi = ['ar', 'ara', 'fa', 'per', 'fas', 'he', 'heb', 'ku', 'kur', 'ug', 'uig']
      function vi(t) {
        return yi.includes(t) ? 'rtl' : 'ltr'
      }
      class Pi {
        constructor(t = {}) {
          ;(this.uiLanguage = t.uiLanguage || 'en'),
            (this.contentLanguage = t.contentLanguage || this.uiLanguage),
            (this.uiLanguageDirection = vi(this.uiLanguage)),
            (this.contentLanguageDirection = vi(this.contentLanguage)),
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
          ;(e = pi(e)), 'string' == typeof t && (t = { string: t })
          const n = !!t.plural ? e[0] : 1
          return (function (t, e) {
            return t.replace(/%(\d+)/g, (t, n) => (n < e.length ? e[n] : t))
          })(bi(this.uiLanguage, t, n), e)
        }
      }
      class ki {
        constructor(t) {
          this.config = new hi(t, this.constructor.defaultConfig)
          const e = this.constructor.builtinPlugins
          this.config.define('plugins', e), (this.plugins = new gi(this, e))
          const n = this.config.get('language') || {}
          ;(this.locale = new Pi({
            uiLanguage: 'string' == typeof n ? n : n.ui,
            contentLanguage: this.config.get('language.content'),
          })),
            (this.t = this.locale.t),
            (this.editors = new mi()),
            (this._contextOwner = null)
        }
        initPlugins() {
          const t = this.config.get('plugins') || [],
            e = this.config.get('substitutePlugins') || []
          for (const n of t.concat(e)) {
            if ('function' != typeof n) throw new l('context-initplugins-constructor-only', null, { Plugin: n })
            if (!0 !== n.isContextPlugin) throw new l('context-initplugins-invalid-plugin', null, { Plugin: n })
          }
          return this.plugins.init(t, [], e)
        }
        destroy() {
          return Promise.all(Array.from(this.editors, t => t.destroy())).then(() => this.plugins.destroy())
        }
        _addEditor(t, e) {
          if (this._contextOwner) throw new l('context-addeditor-private-context')
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
      class Ai {
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
      L(Ai, I)
      class Ci {
        is() {
          throw new Error('is() method is abstract')
        }
      }
      function Ei(t, e) {
        const n = Math.min(t.length, e.length)
        for (let i = 0; i < n; i++) if (t[i] != e[i]) return i
        return t.length == e.length ? 'same' : t.length < e.length ? 'prefix' : 'extension'
      }
      const Ti = function (t) {
        return ai(t, 4)
      }
      class xi extends _(Ci) {
        constructor(t) {
          super(), (this.document = t), (this.parent = null)
        }
        get index() {
          let t
          if (!this.parent) return null
          if (-1 == (t = this.parent.getChildIndex(this))) throw new l('view-node-not-found-in-parent', this)
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
        getAncestors(t = {}) {
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
            i = Ei(e, n)
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
          this.fire(`change:${t}`, e), this.parent && this.parent._fireChange(t, e)
        }
        toJSON() {
          const t = Ti(this)
          return delete t.parent, t
        }
      }
      xi.prototype.is = function (t) {
        return 'node' === t || 'view:node' === t
      }
      class Si extends xi {
        constructor(t, e) {
          super(t), (this._textData = e)
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
          return t instanceof Si && (this === t || this.data === t.data)
        }
        _clone() {
          return new Si(this.document, this.data)
        }
      }
      Si.prototype.is = function (t) {
        return (
          '$text' === t || 'view:$text' === t || 'text' === t || 'view:text' === t || 'node' === t || 'view:node' === t
        )
      }
      class Ri extends Ci {
        constructor(t, e, n) {
          if ((super(), (this.textNode = t), e < 0 || e > t.data.length))
            throw new l('view-textproxy-wrong-offsetintext', this)
          if (n < 0 || e + n > t.data.length) throw new l('view-textproxy-wrong-length', this)
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
        getAncestors(t = {}) {
          const e = []
          let n = t.includeSelf ? this.textNode : this.parent
          for (; null !== n; ) e[t.parentFirst ? 'push' : 'unshift'](n), (n = n.parent)
          return e
        }
      }
      function Oi(t) {
        return fi(t)
          ? new Map(t)
          : (function (t) {
              const e = new Map()
              for (const n in t) e.set(n, t[n])
              return e
            })(t)
      }
      Ri.prototype.is = function (t) {
        return '$textProxy' === t || 'view:$textProxy' === t || 'textProxy' === t || 'view:textProxy' === t
      }
      class Ii {
        constructor(...t) {
          ;(this._patterns = []), this.add(...t)
        }
        add(...t) {
          for (let e of t) ('string' == typeof e || e instanceof RegExp) && (e = { name: e }), this._patterns.push(e)
        }
        match(...t) {
          for (const e of t)
            for (const t of this._patterns) {
              const n = Mi(e, t)
              if (n) return { element: e, pattern: t, match: n }
            }
          return null
        }
        matchAll(...t) {
          const e = []
          for (const n of t)
            for (const t of this._patterns) {
              const i = Mi(n, t)
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
      function Mi(t, e) {
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
              dt(t)
                ? (void 0 !== t.style && c('matcher-pattern-deprecated-attributes-style-key', t),
                  void 0 !== t.class && c('matcher-pattern-deprecated-attributes-class-key', t))
                : (n.delete('style'), n.delete('class'))
              return Ni(t, n, t => e.getAttribute(t))
            })(e.attributes, t)),
            !n.attributes)) ||
          (e.classes &&
            ((n.classes = (function (t, e) {
              return Ni(t, e.getClassNames(), () => {})
            })(e.classes, t)),
            !n.classes)) ||
          (e.styles &&
            ((n.styles = (function (t, e) {
              return Ni(t, e.getStyleNames(!0), t => e.getStyle(t))
            })(e.styles, t)),
            !n.styles))
          ? null
          : n
      }
      function Ni(t, e, n) {
        const i = (function (t) {
            if (Array.isArray(t))
              return t.map(t =>
                dt(t)
                  ? ((void 0 !== t.key && void 0 !== t.value) || c('matcher-pattern-missing-key-or-value', t),
                    [t.key, t.value])
                  : [t, !0]
              )
            if (dt(t)) return Object.entries(t)
            return [[t, !0]]
          })(t),
          s = Array.from(e),
          o = []
        if (
          (i.forEach(([t, e]) => {
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
          i.length && !(o.length < i.length))
        )
          return o
      }
      const Di = function (t) {
        return 'symbol' == typeof t || (ot(t) && '[object Symbol]' == nt(t))
      }
      var Fi = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        Bi = /^\w*$/
      const Vi = function (t, e) {
        if (Pe(t)) return !1
        var n = typeof t
        return (
          !('number' != n && 'symbol' != n && 'boolean' != n && null != t && !Di(t)) ||
          Bi.test(t) ||
          !Fi.test(t) ||
          (null != e && t in Object(e))
        )
      }
      function Li(t, e) {
        if ('function' != typeof t || (null != e && 'function' != typeof e)) throw new TypeError('Expected a function')
        var n = function () {
          var i = arguments,
            s = e ? e.apply(this, i) : i[0],
            o = n.cache
          if (o.has(s)) return o.get(s)
          var r = t.apply(this, i)
          return (n.cache = o.set(s, r) || o), r
        }
        return (n.cache = new (Li.Cache || re)()), n
      }
      Li.Cache = re
      const ji = Li
      var Wi = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        $i = /\\(\\)?/g,
        zi = (function (t) {
          var e = ji(t, function (t) {
              return 500 === n.size && n.clear(), t
            }),
            n = e.cache
          return e
        })(function (t) {
          var e = []
          return (
            46 === t.charCodeAt(0) && e.push(''),
            t.replace(Wi, function (t, n, i, s) {
              e.push(i ? s.replace($i, '$1') : n || t)
            }),
            e
          )
        })
      const qi = zi
      const Ui = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length, s = Array(i); ++n < i; ) s[n] = e(t[n], n, t)
        return s
      }
      var Hi = K ? K.prototype : void 0,
        Ki = Hi ? Hi.toString : void 0
      const Gi = function t(e) {
        if ('string' == typeof e) return e
        if (Pe(e)) return Ui(e, t) + ''
        if (Di(e)) return Ki ? Ki.call(e) : ''
        var n = e + ''
        return '0' == n && 1 / e == -Infinity ? '-0' : n
      }
      const Ji = function (t) {
        return null == t ? '' : Gi(t)
      }
      const Yi = function (t, e) {
        return Pe(t) ? t : Vi(t, e) ? [t] : qi(Ji(t))
      }
      const Xi = function (t) {
        var e = null == t ? 0 : t.length
        return e ? t[e - 1] : void 0
      }
      const Zi = function (t) {
        if ('string' == typeof t || Di(t)) return t
        var e = t + ''
        return '0' == e && 1 / t == -Infinity ? '-0' : e
      }
      const Qi = function (t, e) {
        for (var n = 0, i = (e = Yi(e, t)).length; null != t && n < i; ) t = t[Zi(e[n++])]
        return n && n == i ? t : void 0
      }
      const ts = function (t, e, n) {
        var i = -1,
          s = t.length
        e < 0 && (e = -e > s ? 0 : s + e),
          (n = n > s ? s : n) < 0 && (n += s),
          (s = e > n ? 0 : (n - e) >>> 0),
          (e >>>= 0)
        for (var o = Array(s); ++i < s; ) o[i] = t[i + e]
        return o
      }
      const es = function (t, e) {
        return e.length < 2 ? t : Qi(t, ts(e, 0, -1))
      }
      const ns = function (t, e) {
        return (e = Yi(e, t)), null == (t = es(t, e)) || delete t[Zi(Xi(e))]
      }
      const is = function (t, e) {
        return null == t || ns(t, e)
      }
      const ss = function (t, e, n) {
        var i = null == t ? void 0 : Qi(t, e)
        return void 0 === i ? n : i
      }
      const os = function (t, e, n) {
        ;((void 0 !== n && !ft(t[e], n)) || (void 0 === n && !(e in t))) && ue(t, e, n)
      }
      const rs = (function (t) {
        return function (e, n, i) {
          for (var s = -1, o = Object(e), r = i(e), a = r.length; a--; ) {
            var l = r[t ? a : ++s]
            if (!1 === n(o[l], l, o)) break
          }
          return e
        }
      })()
      const as = function (t) {
        return ot(t) && Ke(t)
      }
      const ls = function (t, e) {
        if (('constructor' !== e || 'function' != typeof t[e]) && '__proto__' != e) return t[e]
      }
      const cs = function (t) {
        return ge(t, Qe(t))
      }
      const hs = function (t, e, n, i, s, o, r) {
        var a = ls(t, n),
          l = ls(e, n),
          c = r.get(l)
        if (c) os(t, n, c)
        else {
          var h = o ? o(a, l, n + '', t, e, r) : void 0,
            d = void 0 === h
          if (d) {
            var u = Pe(l),
              f = !u && Te(l),
              m = !u && !f && Le(l)
            ;(h = l),
              u || f || m
                ? Pe(a)
                  ? (h = a)
                  : as(a)
                  ? (h = an(a))
                  : f
                  ? ((d = !1), (h = rn(l, !0)))
                  : m
                  ? ((d = !1), (h = Hn(l, !0)))
                  : (h = [])
                : dt(l) || ve(l)
                ? ((h = a), ve(a) ? (h = cs(a)) : (E(a) && !Et(a)) || (h = Yn(l)))
                : (d = !1)
          }
          d && (r.set(l, h), s(h, l, i, o, r), r.delete(l)), os(t, n, h)
        }
      }
      const ds = function t(e, n, i, s, o) {
        e !== n &&
          rs(
            n,
            function (r, a) {
              if ((o || (o = new ce()), E(r))) hs(e, n, a, i, t, s, o)
              else {
                var l = s ? s(ls(e, a), r, a + '', e, n, o) : void 0
                void 0 === l && (l = r), os(e, a, l)
              }
            },
            Qe
          )
      }
      const us = function (t) {
        return t
      }
      const fs = function (t, e, n) {
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
      var ms = Math.max
      const gs = function (t, e, n) {
        return (
          (e = ms(void 0 === e ? t.length - 1 : e, 0)),
          function () {
            for (var i = arguments, s = -1, o = ms(i.length - e, 0), r = Array(o); ++s < o; ) r[s] = i[e + s]
            s = -1
            for (var a = Array(e + 1); ++s < e; ) a[s] = i[s]
            return (a[e] = n(r)), fs(t, this, a)
          }
        )
      }
      const ps = function (t) {
        return function () {
          return t
        }
      }
      const _s = de
        ? function (t, e) {
            return de(t, 'toString', { configurable: !0, enumerable: !1, value: ps(e), writable: !0 })
          }
        : us
      var ws = Date.now
      const bs = function (t) {
        var e = 0,
          n = 0
        return function () {
          var i = ws(),
            s = 16 - (i - n)
          if (((n = i), s > 0)) {
            if (++e >= 800) return arguments[0]
          } else e = 0
          return t.apply(void 0, arguments)
        }
      }
      const ys = bs(_s)
      const vs = function (t, e) {
        return ys(gs(t, e, us), t + '')
      }
      const Ps = function (t, e, n) {
        if (!E(n)) return !1
        var i = typeof e
        return !!('number' == i ? Ke(n) && Se(e, n.length) : 'string' == i && e in n) && ft(n[e], t)
      }
      const ks = function (t) {
        return vs(function (e, n) {
          var i = -1,
            s = n.length,
            o = s > 1 ? n[s - 1] : void 0,
            r = s > 2 ? n[2] : void 0
          for (
            o = t.length > 3 && 'function' == typeof o ? (s--, o) : void 0,
              r && Ps(n[0], n[1], r) && ((o = s < 3 ? void 0 : o), (s = 1)),
              e = Object(e);
            ++i < s;

          ) {
            var a = n[i]
            a && t(e, a, i, o)
          }
          return e
        })
      }
      const As = ks(function (t, e, n) {
        ds(t, e, n)
      })
      const Cs = function (t, e, n, i) {
        if (!E(t)) return t
        for (var s = -1, o = (e = Yi(e, t)).length, r = o - 1, a = t; null != a && ++s < o; ) {
          var l = Zi(e[s]),
            c = n
          if ('__proto__' === l || 'constructor' === l || 'prototype' === l) return t
          if (s != r) {
            var h = a[l]
            void 0 === (c = i ? i(h, l, a) : void 0) && (c = E(h) ? h : Se(e[s + 1]) ? [] : {})
          }
          me(a, l, c), (a = a[l])
        }
        return t
      }
      const Es = function (t, e, n) {
        return null == t ? t : Cs(t, e, n)
      }
      class Ts {
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
          if (E(t)) for (const [e, n] of Object.entries(t)) this._styleProcessor.toNormalizedForm(e, n, this._styles)
          else this._styleProcessor.toNormalizedForm(t, e, this._styles)
        }
        remove(t) {
          const e = Ss(t)
          is(this._styles, e), delete this._styles[t], this._cleanEmptyObjectsOnPath(e)
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
          if (this._styles[t] && !E(this._styles[t])) return this._styles[t]
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
            i = ss(this._styles, n)
          if (!i) return
          !Array.from(Object.keys(i)).length && this.remove(n)
        }
      }
      class xs {
        constructor() {
          ;(this._normalizers = new Map()),
            (this._extractors = new Map()),
            (this._reducers = new Map()),
            (this._consumables = new Map())
        }
        toNormalizedForm(t, e, n) {
          if (E(e)) Rs(n, Ss(t), e)
          else if (this._normalizers.has(t)) {
            const i = this._normalizers.get(t),
              { path: s, value: o } = i(e)
            Rs(n, s, o)
          } else Rs(n, t, e)
        }
        getNormalized(t, e) {
          if (!t) return As({}, e)
          if (void 0 !== e[t]) return e[t]
          if (this._extractors.has(t)) {
            const n = this._extractors.get(t)
            if ('string' == typeof n) return ss(e, n)
            const i = n(t, e)
            if (i) return i
          }
          return ss(e, Ss(t))
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
      function Ss(t) {
        return t.replace('-', '.')
      }
      function Rs(t, e, n) {
        let i = n
        E(n) && (i = As({}, ss(t, e), n)), Es(t, e, i)
      }
      class Os extends xi {
        constructor(t, e, n, i) {
          if (
            (super(t),
            (this.name = e),
            (this._attrs = (function (t) {
              const e = Oi(t)
              for (const [t, n] of e) null === n ? e.delete(t) : 'string' != typeof n && e.set(t, String(n))
              return e
            })(n)),
            (this._children = []),
            i && this._insertChild(0, i),
            (this._classes = new Set()),
            this._attrs.has('class'))
          ) {
            const t = this._attrs.get('class')
            Is(this._classes, t), this._attrs.delete('class')
          }
          ;(this._styles = new Ts(this.document.stylesProcessor)),
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
          if (!(t instanceof Os)) return !1
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
        getStyleNames(t) {
          return this._styles.getStyleNames(t)
        }
        hasStyle(...t) {
          for (const e of t) if (!this._styles.has(e)) return !1
          return !0
        }
        findAncestor(...t) {
          const e = new Ii(...t)
          let n = this.parent
          for (; n && !n.is('documentFragment'); ) {
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
            (n._unsafeAttributesToRender = this._unsafeAttributesToRender),
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
            if ('string' == typeof e) return [new Si(t, e)]
            fi(e) || (e = [e])
            return Array.from(e).map(e =>
              'string' == typeof e ? new Si(t, e) : e instanceof Ri ? new Si(t, e.data) : e
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
            'class' == t ? Is(this._classes, e) : 'style' == t ? this._styles.setTo(e) : this._attrs.set(t, e)
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
          for (const e of pi(t)) this._classes.add(e)
        }
        _removeClass(t) {
          this._fireChange('attributes', this)
          for (const e of pi(t)) this._classes.delete(e)
        }
        _setStyle(t, e) {
          this._fireChange('attributes', this), dt(t) ? this._styles.set(t) : this._styles.set(t, e)
        }
        _removeStyle(t) {
          this._fireChange('attributes', this)
          for (const e of pi(t)) this._styles.remove(e)
        }
        _setCustomProperty(t, e) {
          this._customProperties.set(t, e)
        }
        _removeCustomProperty(t) {
          return this._customProperties.delete(t)
        }
      }
      function Is(t, e) {
        const n = e.split(/\s+/)
        t.clear(), n.forEach(e => t.add(e))
      }
      Os.prototype.is = function (t, e) {
        return e
          ? e === this.name && ('element' === t || 'view:element' === t)
          : 'element' === t || 'view:element' === t || 'node' === t || 'view:node' === t
      }
      class Ms extends Os {
        constructor(...t) {
          super(...t), (this.getFillerOffset = Ns)
        }
      }
      function Ns() {
        const t = [...this.getChildren()],
          e = t[this.childCount - 1]
        if (e && e.is('element', 'br')) return this.childCount
        for (const e of t) if (!e.is('uiElement')) return null
        return this.childCount
      }
      Ms.prototype.is = function (t, e) {
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
      class Ds extends I(Ms) {
        constructor(...t) {
          super(...t)
          const e = t[0]
          this.set('isReadOnly', !1),
            this.set('isFocused', !1),
            this.bind('isReadOnly').to(e),
            this.bind('isFocused').to(e, 'isFocused', t => t && e.selection.editableElement == this),
            this.listenTo(e.selection, 'change', () => {
              this.isFocused = e.isFocused && e.selection.editableElement == this
            })
        }
        destroy() {
          this.stopListening()
        }
      }
      Ds.prototype.is = function (t, e) {
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
      const Fs = Symbol('rootName')
      class Bs extends Ds {
        constructor(t, e) {
          super(t, e), (this.rootName = 'main')
        }
        get rootName() {
          return this.getCustomProperty(Fs)
        }
        set rootName(t) {
          this._setCustomProperty(Fs, t)
        }
        set _name(t) {
          this.name = t
        }
      }
      Bs.prototype.is = function (t, e) {
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
      class Vs {
        constructor(t = {}) {
          if (!t.boundaries && !t.startPosition) throw new l('view-tree-walker-no-start-position', null)
          if (t.direction && 'forward' != t.direction && 'backward' != t.direction)
            throw new l('view-tree-walker-unknown-direction', t.startPosition, { direction: t.direction })
          ;(this.boundaries = t.boundaries || null),
            t.startPosition
              ? (this.position = Ls._createAt(t.startPosition))
              : (this.position = Ls._createAt(t.boundaries['backward' == t.direction ? 'end' : 'start'])),
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
          if (null === n.parent && t.offset === n.childCount) return { done: !0, value: void 0 }
          if (n === this._boundaryEndParent && t.offset == this.boundaries.end.offset)
            return { done: !0, value: void 0 }
          let i
          if (n instanceof Si) {
            if (t.isAtEnd) return (this.position = Ls._createAfter(n)), this._next()
            i = n.data[t.offset]
          } else i = n.getChild(t.offset)
          if (i instanceof Os)
            return (
              this.shallow ? t.offset++ : (t = new Ls(i, 0)),
              (this.position = t),
              this._formatReturnValue('elementStart', i, e, t, 1)
            )
          if (i instanceof Si) {
            if (this.singleCharacters) return (t = new Ls(i, 0)), (this.position = t), this._next()
            {
              let n,
                s = i.data.length
              return (
                i == this._boundaryEndParent
                  ? ((s = this.boundaries.end.offset), (n = new Ri(i, 0, s)), (t = Ls._createAfter(n)))
                  : ((n = new Ri(i, 0, i.data.length)), t.offset++),
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
            const s = new Ri(n, t.offset, i)
            return (t.offset += i), (this.position = t), this._formatReturnValue('text', s, e, t, i)
          }
          return (
            (t = Ls._createAfter(n)),
            (this.position = t),
            this.ignoreElementEnd ? this._next() : this._formatReturnValue('elementEnd', n, e, t)
          )
        }
        _previous() {
          let t = this.position.clone()
          const e = this.position,
            n = t.parent
          if (null === n.parent && 0 === t.offset) return { done: !0, value: void 0 }
          if (n == this._boundaryStartParent && t.offset == this.boundaries.start.offset)
            return { done: !0, value: void 0 }
          let i
          if (n instanceof Si) {
            if (t.isAtStart) return (this.position = Ls._createBefore(n)), this._previous()
            i = n.data[t.offset - 1]
          } else i = n.getChild(t.offset - 1)
          if (i instanceof Os)
            return this.shallow
              ? (t.offset--, (this.position = t), this._formatReturnValue('elementStart', i, e, t, 1))
              : ((t = new Ls(i, i.childCount)),
                (this.position = t),
                this.ignoreElementEnd ? this._previous() : this._formatReturnValue('elementEnd', i, e, t))
          if (i instanceof Si) {
            if (this.singleCharacters) return (t = new Ls(i, i.data.length)), (this.position = t), this._previous()
            {
              let n,
                s = i.data.length
              if (i == this._boundaryStartParent) {
                const e = this.boundaries.start.offset
                ;(n = new Ri(i, e, i.data.length - e)), (s = n.data.length), (t = Ls._createBefore(n))
              } else (n = new Ri(i, 0, i.data.length)), t.offset--
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
            const s = new Ri(n, t.offset, i)
            return (this.position = t), this._formatReturnValue('text', s, e, t, i)
          }
          return (t = Ls._createBefore(n)), (this.position = t), this._formatReturnValue('elementStart', n, e, t, 1)
        }
        _formatReturnValue(t, e, n, i, s) {
          return (
            e instanceof Ri &&
              (e.offsetInText + e.data.length == e.textNode.data.length &&
                ('forward' != this.direction || (this.boundaries && this.boundaries.end.isEqual(this.position))
                  ? (n = Ls._createAfter(e.textNode))
                  : ((i = Ls._createAfter(e.textNode)), (this.position = i))),
              0 === e.offsetInText &&
                ('backward' != this.direction || (this.boundaries && this.boundaries.start.isEqual(this.position))
                  ? (n = Ls._createBefore(e.textNode))
                  : ((i = Ls._createBefore(e.textNode)), (this.position = i)))),
            { done: !1, value: { type: t, item: e, previousPosition: n, nextPosition: i, length: s } }
          )
        }
      }
      class Ls extends Ci {
        constructor(t, e) {
          super(), (this.parent = t), (this.offset = e)
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
          for (; !(t instanceof Ds); ) {
            if (!t.parent) return null
            t = t.parent
          }
          return t
        }
        getShiftedBy(t) {
          const e = Ls._createAt(this),
            n = e.offset + t
          return (e.offset = n < 0 ? 0 : n), e
        }
        getLastMatchingPosition(t, e = {}) {
          e.startPosition = this
          const n = new Vs(e)
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
          const i = Ei(e, n)
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
          return (t.startPosition = this), new Vs(t)
        }
        clone() {
          return new Ls(this.parent, this.offset)
        }
        static _createAt(t, e) {
          if (t instanceof Ls) return new this(t.parent, t.offset)
          {
            const n = t
            if ('end' == e) e = n.is('$text') ? n.data.length : n.childCount
            else {
              if ('before' == e) return this._createBefore(n)
              if ('after' == e) return this._createAfter(n)
              if (0 !== e && !e) throw new l('view-createpositionat-offset-required', n)
            }
            return new Ls(n, e)
          }
        }
        static _createAfter(t) {
          if (t.is('$textProxy')) return new Ls(t.textNode, t.offsetInText + t.data.length)
          if (!t.parent) throw new l('view-position-after-root', t, { root: t })
          return new Ls(t.parent, t.index + 1)
        }
        static _createBefore(t) {
          if (t.is('$textProxy')) return new Ls(t.textNode, t.offsetInText)
          if (!t.parent) throw new l('view-position-before-root', t, { root: t })
          return new Ls(t.parent, t.index)
        }
      }
      Ls.prototype.is = function (t) {
        return 'position' === t || 'view:position' === t
      }
      class js extends Ci {
        constructor(t, e = null) {
          super(), (this.start = t.clone()), (this.end = e ? e.clone() : t.clone())
        }
        *[Symbol.iterator]() {
          yield* new Vs({ boundaries: this, ignoreElementEnd: !0 })
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
          let t = this.start.getLastMatchingPosition(Ws, { direction: 'backward' }),
            e = this.end.getLastMatchingPosition(Ws)
          return (
            t.parent.is('$text') && t.isAtStart && (t = Ls._createBefore(t.parent)),
            e.parent.is('$text') && e.isAtEnd && (e = Ls._createAfter(e.parent)),
            new js(t, e)
          )
        }
        getTrimmed() {
          let t = this.start.getLastMatchingPosition(Ws)
          if (t.isAfter(this.end) || t.isEqual(this.end)) return new js(t, t)
          let e = this.end.getLastMatchingPosition(Ws, { direction: 'backward' })
          const n = t.nodeAfter,
            i = e.nodeBefore
          return (
            n && n.is('$text') && (t = new Ls(n, 0)), i && i.is('$text') && (e = new Ls(i, i.data.length)), new js(t, e)
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
              ? (this.containsPosition(t.start) && e.push(new js(this.start, t.start)),
                this.containsPosition(t.end) && e.push(new js(t.end, this.end)))
              : e.push(this.clone()),
            e
          )
        }
        getIntersection(t) {
          if (this.isIntersecting(t)) {
            let e = this.start,
              n = this.end
            return (
              this.containsPosition(t.start) && (e = t.start), this.containsPosition(t.end) && (n = t.end), new js(e, n)
            )
          }
          return null
        }
        getWalker(t = {}) {
          return (t.boundaries = this), new Vs(t)
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
          return new js(this.start, this.end)
        }
        *getItems(t = {}) {
          ;(t.boundaries = this), (t.ignoreElementEnd = !0)
          const e = new Vs(t)
          for (const t of e) yield t.item
        }
        *getPositions(t = {}) {
          t.boundaries = this
          const e = new Vs(t)
          yield e.position
          for (const t of e) yield t.nextPosition
        }
        isIntersecting(t) {
          return this.start.isBefore(t.end) && this.end.isAfter(t.start)
        }
        static _createFromParentsAndOffsets(t, e, n, i) {
          return new this(new Ls(t, e), new Ls(n, i))
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
          return this._createFromPositionAndShift(Ls._createBefore(t), e)
        }
      }
      function Ws(t) {
        return !(!t.item.is('attributeElement') && !t.item.is('uiElement'))
      }
      function $s(t) {
        let e = 0
        for (const n of t) e++
        return e
      }
      js.prototype.is = function (t) {
        return 'range' === t || 'view:range' === t
      }
      class zs extends _(Ci) {
        constructor(...t) {
          super(),
            (this._ranges = []),
            (this._lastRangeBackward = !1),
            (this._isFake = !1),
            (this._fakeSelectionLabel = ''),
            t.length && this.setTo(...t)
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
          const e = $s(this.getRanges())
          if (e != $s(t.getRanges())) return !1
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
        setTo(...t) {
          let [e, n, i] = t
          if (('object' == typeof n && ((i = n), (n = void 0)), null === e))
            this._setRanges([]), this._setFakeOptions(i)
          else if (e instanceof zs || e instanceof qs)
            this._setRanges(e.getRanges(), e.isBackward),
              this._setFakeOptions({ fake: e.isFake, label: e.fakeSelectionLabel })
          else if (e instanceof js) this._setRanges([e], i && i.backward), this._setFakeOptions(i)
          else if (e instanceof Ls) this._setRanges([new js(e)]), this._setFakeOptions(i)
          else if (e instanceof xi) {
            const t = !!i && !!i.backward
            let s
            if (void 0 === n) throw new l('view-selection-setto-required-second-parameter', this)
            ;(s = 'in' == n ? js._createIn(e) : 'on' == n ? js._createOn(e) : new js(Ls._createAt(e, n))),
              this._setRanges([s], t),
              this._setFakeOptions(i)
          } else {
            if (!fi(e)) throw new l('view-selection-setto-not-selectable', this)
            this._setRanges(e, i && i.backward), this._setFakeOptions(i)
          }
          this.fire('change')
        }
        setFocus(t, e) {
          if (null === this.anchor) throw new l('view-selection-setfocus-no-ranges', this)
          const n = Ls._createAt(t, e)
          if ('same' == n.compareWith(this.focus)) return
          const i = this.anchor
          this._ranges.pop(),
            'before' == n.compareWith(i) ? this._addRange(new js(n, i), !0) : this._addRange(new js(i, n)),
            this.fire('change')
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
          if (!(t instanceof js)) throw new l('view-selection-add-range-not-range', this)
          this._pushRange(t), (this._lastRangeBackward = !!e)
        }
        _pushRange(t) {
          for (const e of this._ranges)
            if (t.isIntersecting(e))
              throw new l('view-selection-range-intersects', this, { addedRange: t, intersectingRange: e })
          this._ranges.push(new js(t.start, t.end))
        }
      }
      zs.prototype.is = function (t) {
        return 'selection' === t || 'view:selection' === t
      }
      class qs extends _(Ci) {
        constructor(...t) {
          super(),
            (this._selection = new zs()),
            this._selection.delegate('change').to(this),
            t.length && this._selection.setTo(...t)
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
        _setTo(...t) {
          this._selection.setTo(...t)
        }
        _setFocus(t, e) {
          this._selection.setFocus(t, e)
        }
      }
      qs.prototype.is = function (t) {
        return 'selection' === t || 'documentSelection' == t || 'view:selection' == t || 'view:documentSelection' == t
      }
      class Us extends i {
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
      const Hs = Symbol('bubbling contexts')
      function Ks(t) {
        return class extends t {
          fire(t, ...e) {
            try {
              const n = t instanceof i ? t : new i(this, t),
                s = Xs(this)
              if (!s.size) return
              if ((Gs(n, 'capturing', this), Js(s, '$capture', n, ...e))) return n.return
              const o = n.startRange || this.selection.getFirstRange(),
                r = o ? o.getContainedElement() : null,
                a = !!r && Boolean(Ys(s, r))
              let l =
                r ||
                (function (t) {
                  if (!t) return null
                  const e = t.start.parent,
                    n = t.end.parent,
                    i = e.getPath(),
                    s = n.getPath()
                  return i.length > s.length ? e : n
                })(o)
              if ((Gs(n, 'atTarget', l), !a)) {
                if (Js(s, '$text', n, ...e)) return n.return
                Gs(n, 'bubbling', l)
              }
              for (; l; ) {
                if (l.is('rootElement')) {
                  if (Js(s, '$root', n, ...e)) return n.return
                } else if (l.is('element') && Js(s, l.name, n, ...e)) return n.return
                if (Js(s, l, n, ...e)) return n.return
                ;(l = l.parent), Gs(n, 'bubbling', l)
              }
              return Gs(n, 'bubbling', this), Js(s, '$document', n, ...e), n.return
            } catch (t) {
              l.rethrowUnexpectedError(t, this)
            }
          }
          _addEventListener(t, e, n) {
            const i = pi(n.context || '$document'),
              s = Xs(this)
            for (const o of i) {
              let i = s.get(o)
              i || ((i = new w()), s.set(o, i)), this.listenTo(i, t, e, n)
            }
          }
          _removeEventListener(t, e) {
            const n = Xs(this)
            for (const i of n.values()) this.stopListening(i, t, e)
          }
        }
      }
      {
        const t = Ks(Object)
        ;['fire', '_addEventListener', '_removeEventListener'].forEach(e => {
          Ks[e] = t.prototype[e]
        })
      }
      function Gs(t, e, n) {
        t instanceof Us && ((t._eventPhase = e), (t._currentTarget = n))
      }
      function Js(t, e, n, ...i) {
        const s = 'string' == typeof e ? t.get(e) : Ys(t, e)
        return !!s && (s.fire(n, ...i), n.stop.called)
      }
      function Ys(t, e) {
        for (const [n, i] of t) if ('function' == typeof n && n(e)) return i
        return null
      }
      function Xs(t) {
        return t[Hs] || (t[Hs] = new Map()), t[Hs]
      }
      class Zs extends Ks(M) {
        constructor(t) {
          super(),
            (this.selection = new qs()),
            (this.roots = new mi({ idProperty: 'rootName' })),
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
      class Qs extends Os {
        constructor(...t) {
          super(...t), (this.getFillerOffset = to), (this._priority = 10), (this._id = null), (this._clonesGroup = null)
        }
        get priority() {
          return this._priority
        }
        get id() {
          return this._id
        }
        getElementsWithSameId() {
          if (null === this.id) throw new l('attribute-element-get-elements-with-same-id-no-id', this)
          return new Set(this._clonesGroup)
        }
        isSimilar(t) {
          return null !== this.id || null !== t.id
            ? this.id === t.id
            : super.isSimilar(t) && this.priority == t.priority
        }
        _clone(t = !1) {
          const e = super._clone(t)
          return (e._priority = this._priority), (e._id = this._id), e
        }
      }
      function to() {
        if (eo(this)) return null
        let t = this.parent
        for (; t && t.is('attributeElement'); ) {
          if (eo(t) > 1) return null
          t = t.parent
        }
        return !t || eo(t) > 1 ? null : this.childCount
      }
      function eo(t) {
        return Array.from(t.getChildren()).filter(t => !t.is('uiElement')).length
      }
      ;(Qs.DEFAULT_PRIORITY = 10),
        (Qs.prototype.is = function (t, e) {
          return e
            ? e === this.name &&
                ('attributeElement' === t || 'view:attributeElement' === t || 'element' === t || 'view:element' === t)
            : 'attributeElement' === t ||
                'view:attributeElement' === t ||
                'element' === t ||
                'view:element' === t ||
                'node' === t ||
                'view:node' === t
        })
      class no extends Os {
        constructor(t, e, n, i) {
          super(t, e, n, i), (this.getFillerOffset = io)
        }
        _insertChild(t, e) {
          if (e && (e instanceof xi || Array.from(e).length > 0)) throw new l('view-emptyelement-cannot-add', [this, e])
          return 0
        }
      }
      function io() {
        return null
      }
      no.prototype.is = function (t, e) {
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
      const so = (function () {
          try {
            return navigator.userAgent.toLowerCase()
          } catch (t) {
            return ''
          }
        })(),
        oo = {
          isMac: ao(so),
          isWindows: (function (t) {
            return t.indexOf('windows') > -1
          })(so),
          isGecko: (function (t) {
            return !!t.match(/gecko\/\d+/)
          })(so),
          isSafari: (function (t) {
            return t.indexOf(' applewebkit/') > -1 && -1 === t.indexOf('chrome')
          })(so),
          isiOS: (function (t) {
            return !!t.match(/iphone|ipad/i) || (ao(t) && navigator.maxTouchPoints > 0)
          })(so),
          isAndroid: (function (t) {
            return t.indexOf('android') > -1
          })(so),
          isBlink: (function (t) {
            return t.indexOf('chrome/') > -1 && t.indexOf('edge/') < 0
          })(so),
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
        ro = oo
      function ao(t) {
        return t.indexOf('macintosh') > -1
      }
      const lo = { ctrl: '⌃', cmd: '⌘', alt: '⌥', shift: '⇧' },
        co = { ctrl: 'Ctrl+', alt: 'Alt+', shift: 'Shift+' },
        ho = (function () {
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
        uo = Object.fromEntries(Object.entries(ho).map(([t, e]) => [e, t.charAt(0).toUpperCase() + t.slice(1)]))
      function fo(t) {
        let e
        if ('string' == typeof t) {
          if (((e = ho[t.toLowerCase()]), !e)) throw new l('keyboard-unknown-key', null, { key: t })
        } else
          e =
            t.keyCode +
            (t.altKey ? ho.alt : 0) +
            (t.ctrlKey ? ho.ctrl : 0) +
            (t.shiftKey ? ho.shift : 0) +
            (t.metaKey ? ho.cmd : 0)
        return e
      }
      function mo(t) {
        return (
          'string' == typeof t &&
            (t = (function (t) {
              return t.split('+').map(t => t.trim())
            })(t)),
          t
            .map(t =>
              'string' == typeof t
                ? (function (t) {
                    if (t.endsWith('!')) return fo(t.slice(0, -1))
                    const e = fo(t)
                    return ro.isMac && e == ho.ctrl ? ho.cmd : e
                  })(t)
                : t
            )
            .reduce((t, e) => e + t, 0)
        )
      }
      function go(t) {
        let e = mo(t)
        return (
          Object.entries(ro.isMac ? lo : co).reduce(
            (t, [n, i]) => (0 != (e & ho[n]) && ((e &= ~ho[n]), (t += i)), t),
            ''
          ) + (e ? uo[e] : '')
        )
      }
      function po(t, e) {
        const n = 'ltr' === e
        switch (t) {
          case ho.arrowleft:
            return n ? 'left' : 'right'
          case ho.arrowright:
            return n ? 'right' : 'left'
          case ho.arrowup:
            return 'up'
          case ho.arrowdown:
            return 'down'
        }
      }
      class _o extends Os {
        constructor(...t) {
          super(...t), (this.getFillerOffset = bo)
        }
        _insertChild(t, e) {
          if (e && (e instanceof xi || Array.from(e).length > 0)) throw new l('view-uielement-cannot-add', [this, e])
          return 0
        }
        render(t, e) {
          return this.toDomElement(t)
        }
        toDomElement(t) {
          const e = t.createElement(this.name)
          for (const t of this.getAttributeKeys()) e.setAttribute(t, this.getAttribute(t))
          return e
        }
      }
      function wo(t) {
        t.document.on(
          'arrowKey',
          (e, n) =>
            (function (t, e, n) {
              if (e.keyCode == ho.arrowright) {
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
      function bo() {
        return null
      }
      _o.prototype.is = function (t, e) {
        return e
          ? e === this.name && ('uiElement' === t || 'view:uiElement' === t || 'element' === t || 'view:element' === t)
          : 'uiElement' === t ||
              'view:uiElement' === t ||
              'element' === t ||
              'view:element' === t ||
              'node' === t ||
              'view:node' === t
      }
      class yo extends Os {
        constructor(...t) {
          super(...t), (this.getFillerOffset = vo)
        }
        _insertChild(t, e) {
          if (e && (e instanceof xi || Array.from(e).length > 0)) throw new l('view-rawelement-cannot-add', [this, e])
          return 0
        }
        render() {}
      }
      function vo() {
        return null
      }
      yo.prototype.is = function (t, e) {
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
      class Po extends _(Ci) {
        constructor(t, e) {
          super(), (this.document = t), (this._children = []), e && this._insertChild(0, e)
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
            if ('string' == typeof e) return [new Si(t, e)]
            fi(e) || (e = [e])
            return Array.from(e).map(e =>
              'string' == typeof e ? new Si(t, e) : e instanceof Ri ? new Si(t, e.data) : e
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
      Po.prototype.is = function (t) {
        return 'documentFragment' === t || 'view:documentFragment' === t
      }
      class ko {
        constructor(t) {
          ;(this.document = t), (this._cloneGroups = new Map()), (this._slotFactory = null)
        }
        setSelection(...t) {
          this.document.selection._setTo(...t)
        }
        setSelectionFocus(...t) {
          this.document.selection._setFocus(...t)
        }
        createDocumentFragment(t) {
          return new Po(this.document, t)
        }
        createText(t) {
          return new Si(this.document, t)
        }
        createAttributeElement(t, e, n = {}) {
          const i = new Qs(this.document, t, e)
          return (
            'number' == typeof n.priority && (i._priority = n.priority),
            n.id && (i._id = n.id),
            n.renderUnsafeAttributes && i._unsafeAttributesToRender.push(...n.renderUnsafeAttributes),
            i
          )
        }
        createContainerElement(t, e, n = {}, i = {}) {
          let s = null
          dt(n) ? (i = n) : (s = n)
          const o = new Ms(this.document, t, e, s)
          return i.renderUnsafeAttributes && o._unsafeAttributesToRender.push(...i.renderUnsafeAttributes), o
        }
        createEditableElement(t, e, n = {}) {
          const i = new Ds(this.document, t, e)
          return n.renderUnsafeAttributes && i._unsafeAttributesToRender.push(...n.renderUnsafeAttributes), i
        }
        createEmptyElement(t, e, n = {}) {
          const i = new no(this.document, t, e)
          return n.renderUnsafeAttributes && i._unsafeAttributesToRender.push(...n.renderUnsafeAttributes), i
        }
        createUIElement(t, e, n) {
          const i = new _o(this.document, t, e)
          return n && (i.render = n), i
        }
        createRawElement(t, e, n, i = {}) {
          const s = new yo(this.document, t, e)
          return (
            n && (s.render = n),
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
          dt(t) && void 0 === n ? e._setStyle(t) : n._setStyle(t, e)
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
          return t instanceof Ls ? this._breakAttributes(t) : this._breakAttributesRange(t)
        }
        breakContainer(t) {
          const e = t.parent
          if (!e.is('containerElement')) throw new l('view-writer-break-non-container-element', this.document)
          if (!e.parent) throw new l('view-writer-break-root', this.document)
          if (t.isAtStart) return Ls._createBefore(e)
          if (!t.isAtEnd) {
            const n = e._clone(!1)
            this.insert(Ls._createAfter(e), n)
            const i = new js(t, Ls._createAt(e, 'end')),
              s = new Ls(n, 0)
            this.move(i, s)
          }
          return Ls._createAfter(e)
        }
        mergeAttributes(t) {
          const e = t.offset,
            n = t.parent
          if (n.is('$text')) return t
          if (n.is('attributeElement') && 0 === n.childCount) {
            const t = n.parent,
              e = n.index
            return n._remove(), this._removeFromClonedElementsGroup(n), this.mergeAttributes(new Ls(t, e))
          }
          const i = n.getChild(e - 1),
            s = n.getChild(e)
          if (!i || !s) return t
          if (i.is('$text') && s.is('$text')) return xo(i, s)
          if (i.is('attributeElement') && s.is('attributeElement') && i.isSimilar(s)) {
            const t = i.childCount
            return (
              i._appendChild(s.getChildren()),
              s._remove(),
              this._removeFromClonedElementsGroup(s),
              this.mergeAttributes(new Ls(i, t))
            )
          }
          return t
        }
        mergeContainers(t) {
          const e = t.nodeBefore,
            n = t.nodeAfter
          if (!(e && n && e.is('containerElement') && n.is('containerElement')))
            throw new l('view-writer-merge-containers-invalid-position', this.document)
          const i = e.getChild(e.childCount - 1),
            s = i instanceof Si ? Ls._createAt(i, 'end') : Ls._createAt(e, 'end')
          return this.move(js._createIn(n), Ls._createAt(e, 'end')), this.remove(js._createOn(n)), s
        }
        insert(t, e) {
          Ro((e = fi(e) ? [...e] : [e]), this.document)
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
          return i ? new js(i, s) : new js(t)
        }
        remove(t) {
          const e = t instanceof js ? t : js._createOn(t)
          if ((Io(e, this.document), e.isCollapsed)) return new Po(this.document)
          const { start: n, end: i } = this._breakAttributesRange(e, !0),
            s = n.parent,
            o = i.offset - n.offset,
            r = s._removeChildren(n.offset, o)
          for (const t of r) this._removeFromClonedElementsGroup(t)
          const a = this.mergeAttributes(n)
          return (e.start = a), (e.end = a.clone()), new Po(this.document, r)
        }
        clear(t, e) {
          Io(t, this.document)
          const n = t.getWalker({ direction: 'backward', ignoreElementEnd: !0 })
          for (const i of n) {
            const n = i.item
            let s
            if (n.is('element') && e.isSimilar(n)) s = js._createOn(n)
            else if (!i.nextPosition.isAfter(t.start) && n.is('$textProxy')) {
              const t = n.getAncestors().find(t => t.is('element') && e.isSimilar(t))
              t && (s = js._createIn(t))
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
          if (!(e instanceof Qs)) throw new l('view-writer-wrap-invalid-attribute', this.document)
          if ((Io(t, this.document), t.isCollapsed)) {
            let i = t.start
            i.parent.is('element') &&
              ((n = i.parent), !Array.from(n.getChildren()).some(t => !t.is('uiElement'))) &&
              (i = i.getLastMatchingPosition(t => t.item.is('uiElement'))),
              (i = this._wrapPosition(i, e))
            const s = this.document.selection
            return s.isCollapsed && s.getFirstPosition().isEqual(t.start) && this.setSelection(i), new js(i)
          }
          return this._wrapRange(t, e)
          var n
        }
        unwrap(t, e) {
          if (!(e instanceof Qs)) throw new l('view-writer-unwrap-invalid-attribute', this.document)
          if ((Io(t, this.document), t.isCollapsed)) return t
          const { start: n, end: i } = this._breakAttributesRange(t, !0),
            s = n.parent,
            o = this._unwrapChildren(s, n.offset, i.offset, e),
            r = this.mergeAttributes(o.start)
          r.isEqual(o.start) || o.end.offset--
          const a = this.mergeAttributes(o.end)
          return new js(r, a)
        }
        rename(t, e) {
          const n = new Ms(this.document, t, e.getAttributes())
          return (
            this.insert(Ls._createAfter(e), n),
            this.move(js._createIn(e), Ls._createAt(n, 0)),
            this.remove(js._createOn(e)),
            n
          )
        }
        clearClonedElementsGroup(t) {
          this._cloneGroups.delete(t)
        }
        createPositionAt(t, e) {
          return Ls._createAt(t, e)
        }
        createPositionAfter(t) {
          return Ls._createAfter(t)
        }
        createPositionBefore(t) {
          return Ls._createBefore(t)
        }
        createRange(...t) {
          return new js(...t)
        }
        createRangeOn(t) {
          return js._createOn(t)
        }
        createRangeIn(t) {
          return js._createIn(t)
        }
        createSelection(...t) {
          return new zs(...t)
        }
        createSlot(t) {
          if (!this._slotFactory) throw new l('view-writer-invalid-create-slot-context', this.document)
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
          if (((i = n ? Ao(t) : t.parent.is('$text') ? t.parent.parent : t.parent), !i))
            throw new l('view-writer-invalid-position-container', this.document)
          s = n ? this._breakAttributes(t, !0) : t.parent.is('$text') ? To(t) : t
          const o = i._insertChild(s.offset, e)
          for (const t of e) this._addToClonedElementsGroup(t)
          const r = s.getShiftedBy(o),
            a = this.mergeAttributes(s)
          a.isEqual(s) || r.offset--
          const c = this.mergeAttributes(r)
          return new js(a, c)
        }
        _wrapChildren(t, e, n, i) {
          let s = e
          const o = []
          for (; s < n; ) {
            const e = t.getChild(s),
              n = e.is('$text'),
              r = e.is('attributeElement')
            if (r && this._wrapAttributeElement(i, e)) o.push(new Ls(t, s))
            else if (n || !r || Co(i, e)) {
              const n = i._clone()
              e._remove(),
                n._appendChild(e),
                t._insertChild(s, n),
                this._addToClonedElementsGroup(n),
                o.push(new Ls(t, s))
            } else this._wrapChildren(e, 0, e.childCount, i)
            s++
          }
          let r = 0
          for (const t of o) {
            if (((t.offset -= r), t.offset == e)) continue
            this.mergeAttributes(t).isEqual(t) || (r++, n--)
          }
          return js._createFromParentsAndOffsets(t, e, t, n)
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
                  o.push(new Ls(t, s), new Ls(t, s + r)),
                  (s += r),
                  (n += r - 1)
              } else
                this._unwrapAttributeElement(i, e)
                  ? (o.push(new Ls(t, s), new Ls(t, s + 1)), s++)
                  : (this._unwrapChildren(e, 0, e.childCount, i), s++)
            else s++
          }
          let r = 0
          for (const t of o) {
            if (((t.offset -= r), t.offset == e || t.offset == n)) continue
            this.mergeAttributes(t).isEqual(t) || (r++, n--)
          }
          return js._createFromParentsAndOffsets(t, e, t, n)
        }
        _wrapRange(t, e) {
          const { start: n, end: i } = this._breakAttributesRange(t, !0),
            s = n.parent,
            o = this._wrapChildren(s, n.offset, i.offset, e),
            r = this.mergeAttributes(o.start)
          r.isEqual(o.start) || o.end.offset--
          const a = this.mergeAttributes(o.end)
          return new js(r, a)
        }
        _wrapPosition(t, e) {
          if (e.isSimilar(t.parent)) return Eo(t.clone())
          t.parent.is('$text') && (t = To(t))
          const n = this.createAttributeElement('_wrapPosition-fake-element')
          ;(n._priority = Number.POSITIVE_INFINITY), (n.isSimilar = () => !1), t.parent._insertChild(t.offset, n)
          const i = new js(t, t.getShiftedBy(1))
          this.wrap(i, e)
          const s = new Ls(n.parent, n.index)
          n._remove()
          const o = s.nodeBefore,
            r = s.nodeAfter
          return o instanceof Si && r instanceof Si ? xo(o, r) : Eo(s)
        }
        _wrapAttributeElement(t, e) {
          if (!Mo(t, e)) return !1
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
          if (!Mo(t, e)) return !1
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
          if ((Io(t, this.document), t.isCollapsed)) {
            const n = this._breakAttributes(t.start, e)
            return new js(n, n)
          }
          const s = this._breakAttributes(i, e),
            o = s.parent.childCount,
            r = this._breakAttributes(n, e)
          return (s.offset += s.parent.childCount - o), new js(r, s)
        }
        _breakAttributes(t, e = !1) {
          const n = t.offset,
            i = t.parent
          if (t.parent.is('emptyElement')) throw new l('view-writer-cannot-break-empty-element', this.document)
          if (t.parent.is('uiElement')) throw new l('view-writer-cannot-break-ui-element', this.document)
          if (t.parent.is('rawElement')) throw new l('view-writer-cannot-break-raw-element', this.document)
          if (!e && i.is('$text') && Oo(i.parent)) return t.clone()
          if (Oo(i)) return t.clone()
          if (i.is('$text')) return this._breakAttributes(To(t), e)
          if (n == i.childCount) {
            const t = new Ls(i.parent, i.index + 1)
            return this._breakAttributes(t, e)
          }
          if (0 === n) {
            const t = new Ls(i.parent, i.index)
            return this._breakAttributes(t, e)
          }
          {
            const t = i.index + 1,
              s = i._clone()
            i.parent._insertChild(t, s), this._addToClonedElementsGroup(s)
            const o = i.childCount - n,
              r = i._removeChildren(n, o)
            s._appendChild(r)
            const a = new Ls(i.parent, t)
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
      function Ao(t) {
        let e = t.parent
        for (; !Oo(e); ) {
          if (!e) return
          e = e.parent
        }
        return e
      }
      function Co(t, e) {
        return t.priority < e.priority || (!(t.priority > e.priority) && t.getIdentity() < e.getIdentity())
      }
      function Eo(t) {
        const e = t.nodeBefore
        if (e && e.is('$text')) return new Ls(e, e.data.length)
        const n = t.nodeAfter
        return n && n.is('$text') ? new Ls(n, 0) : t
      }
      function To(t) {
        if (t.offset == t.parent.data.length) return new Ls(t.parent.parent, t.parent.index + 1)
        if (0 === t.offset) return new Ls(t.parent.parent, t.parent.index)
        const e = t.parent.data.slice(t.offset)
        return (
          (t.parent._data = t.parent.data.slice(0, t.offset)),
          t.parent.parent._insertChild(t.parent.index + 1, new Si(t.root.document, e)),
          new Ls(t.parent.parent, t.parent.index + 1)
        )
      }
      function xo(t, e) {
        const n = t.data.length
        return (t._data += e.data), e._remove(), new Ls(t, n)
      }
      const So = [Si, Qs, Ms, no, yo, _o]
      function Ro(t, e) {
        for (const n of t) {
          if (!So.some(t => n instanceof t)) throw new l('view-writer-insert-invalid-node-type', e)
          n.is('$text') || Ro(n.getChildren(), e)
        }
      }
      function Oo(t) {
        return t && (t.is('containerElement') || t.is('documentFragment'))
      }
      function Io(t, e) {
        const n = Ao(t.start),
          i = Ao(t.end)
        if (!n || !i || n !== i) throw new l('view-writer-invalid-range-container', e)
      }
      function Mo(t, e) {
        return null === t.id && null === e.id
      }
      function No(t) {
        return '[object Text]' == Object.prototype.toString.call(t)
      }
      const Do = t => t.createTextNode(' '),
        Fo = t => {
          const e = t.createElement('span')
          return (e.dataset.ckeFiller = 'true'), (e.innerText = ' '), e
        },
        Bo = t => {
          const e = t.createElement('br')
          return (e.dataset.ckeFiller = 'true'), e
        },
        Vo = '⁠'.repeat(7)
      function Lo(t) {
        return No(t) && t.data.substr(0, 7) === Vo
      }
      function jo(t) {
        return 7 == t.data.length && Lo(t)
      }
      function Wo(t) {
        return Lo(t) ? t.data.slice(7) : t.data
      }
      function $o(t, e) {
        if (e.keyCode == ho.arrowleft) {
          const t = e.domTarget.ownerDocument.defaultView.getSelection()
          if (1 == t.rangeCount && t.getRangeAt(0).collapsed) {
            const e = t.getRangeAt(0).startContainer,
              n = t.getRangeAt(0).startOffset
            Lo(e) && n <= 7 && t.collapse(e, 0)
          }
        }
      }
      function zo(t, e, n, i = !1) {
        n =
          n ||
          function (t, e) {
            return t === e
          }
        const s = Array.isArray(t) ? t : Array.prototype.slice.call(t),
          o = Array.isArray(e) ? e : Array.prototype.slice.call(e),
          r = (function (t, e, n) {
            const i = qo(t, e, n)
            if (-1 === i) return { firstIndex: -1, lastIndexOld: -1, lastIndexNew: -1 }
            const s = Uo(t, i),
              o = Uo(e, i),
              r = qo(s, o, n),
              a = t.length - r,
              l = e.length - r
            return { firstIndex: i, lastIndexOld: a, lastIndexNew: l }
          })(s, o, n)
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
            })(r, o.length)
          : (function (t, e) {
              const n = [],
                { firstIndex: i, lastIndexOld: s, lastIndexNew: o } = e
              o - i > 0 && n.push({ index: i, type: 'insert', values: t.slice(i, o) })
              s - i > 0 && n.push({ index: i + (o - i), type: 'delete', howMany: s - i })
              return n
            })(o, r)
      }
      function qo(t, e, n) {
        for (let i = 0; i < Math.max(t.length, e.length); i++)
          if (void 0 === t[i] || void 0 === e[i] || !n(t[i], e[i])) return i
        return -1
      }
      function Uo(t, e) {
        return t.slice(e).reverse()
      }
      function Ho(t, e, n) {
        n =
          n ||
          function (t, e) {
            return t === e
          }
        const i = t.length,
          s = e.length
        if (i > 200 || s > 200 || i + s > 300) return Ho.fastDiff(t, e, n, !0)
        let o, r
        if (s < i) {
          const n = t
          ;(t = e), (e = n), (o = 'delete'), (r = 'insert')
        } else (o = 'insert'), (r = 'delete')
        const a = t.length,
          l = e.length,
          c = l - a,
          h = {},
          d = {}
        function u(i) {
          const s = (void 0 !== d[i - 1] ? d[i - 1] : -1) + 1,
            c = void 0 !== d[i + 1] ? d[i + 1] : -1,
            u = s > c ? -1 : 1
          h[i + u] && (h[i] = h[i + u].slice(0)), h[i] || (h[i] = []), h[i].push(s > c ? o : r)
          let f = Math.max(s, c),
            m = f - i
          for (; m < a && f < l && n(t[m], e[f]); ) m++, f++, h[i].push('equal')
          return f
        }
        let f,
          m = 0
        do {
          for (f = -m; f < c; f++) d[f] = u(f)
          for (f = c + m; f > c; f--) d[f] = u(f)
          ;(d[c] = u(c)), m++
        } while (d[c] !== l)
        return h[c].slice(1)
      }
      function Ko(t, e, n) {
        t.insertBefore(n, t.childNodes[e] || null)
      }
      function Go(t) {
        const e = t.parentNode
        e && e.removeChild(t)
      }
      function Jo(t) {
        return t && t.nodeType === Node.COMMENT_NODE
      }
      function Yo(t) {
        if (t) {
          if (t.defaultView) return t instanceof t.defaultView.Document
          if (t.ownerDocument && t.ownerDocument.defaultView) return t instanceof t.ownerDocument.defaultView.Node
        }
        return !1
      }
      Ho.fastDiff = zo
      class Xo extends M {
        constructor(t, e) {
          super(),
            (this.domDocuments = new Set()),
            (this.domConverter = t),
            (this.markedAttributes = new Set()),
            (this.markedChildren = new Set()),
            (this.markedTexts = new Set()),
            (this.selection = e),
            this.set('isFocused', !1),
            this.set('isSelecting', !1),
            ro.isBlink &&
              !ro.isAndroid &&
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
              if ('children' !== t) throw new l('view-renderer-unknown-type', this)
              this.markedChildren.add(e)
            }
          }
        }
        render() {
          let t = null
          const e = !(ro.isBlink && !ro.isAndroid) || !this.isSelecting
          for (const t of this.markedChildren) this._updateChildrenMappings(t)
          e
            ? (this._inlineFiller && !this._isSelectionInInlineFiller() && this._removeInlineFiller(),
              this._inlineFiller
                ? (t = this._getInlineFillerPosition())
                : this._needsInlineFillerAtSelection() &&
                  ((t = this.selection.getFirstPosition()), this.markedChildren.add(t.parent)))
            : this._inlineFiller &&
              this._inlineFiller.parentNode &&
              ((t = this.domConverter.domPositionToView(this._inlineFiller)),
              t && t.parent.is('$text') && (t = Ls._createBefore(t.parent)))
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
              Lo(e.parent) ? (this._inlineFiller = e.parent) : (this._inlineFiller = Zo(n, e.parent, e.offset))
            } else this._inlineFiller = null
          this._updateFocus(),
            this._updateSelection(),
            this.markedTexts.clear(),
            this.markedAttributes.clear(),
            this.markedChildren.clear()
        }
        _updateChildrenMappings(t) {
          if (!this.domConverter.mapViewToDom(t)) return
          const e = Array.from(this.domConverter.mapViewToDom(t).childNodes),
            n = Array.from(this.domConverter.viewChildrenToDom(t, { withChildren: !1 })),
            i = this._diffNodeLists(e, n),
            s = this._findReplaceActions(i, e, n)
          if (-1 !== s.indexOf('replace')) {
            const i = { equal: 0, insert: 0, delete: 0 }
            for (const o of s)
              if ('replace' === o) {
                const s = i.equal + i.insert,
                  o = i.equal + i.delete,
                  r = t.getChild(s)
                !r || r.is('uiElement') || r.is('rawElement') || this._updateElementMappings(r, e[o]),
                  Go(n[s]),
                  i.equal++
              } else i[o]++
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
          return t.parent.is('$text') ? Ls._createBefore(t.parent) : t
        }
        _isSelectionInInlineFiller() {
          if (1 != this.selection.rangeCount || !this.selection.isCollapsed) return !1
          const t = this.selection.getFirstPosition(),
            e = this.domConverter.viewPositionToDom(t)
          return !!(e && No(e.parent) && Lo(e.parent))
        }
        _removeInlineFiller() {
          const t = this._inlineFiller
          if (!Lo(t)) throw new l('view-renderer-filler-was-lost', this)
          jo(t) ? t.remove() : (t.data = t.data.substr(7)), (this._inlineFiller = null)
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
          return !(i instanceof Si || s instanceof Si)
        }
        _updateText(t, e) {
          const n = this.domConverter.findCorrespondingDomText(t),
            i = this.domConverter.viewToDom(t),
            s = n.data
          let o = i.data
          const r = e.inlineFillerPosition
          if ((r && r.parent == t.parent && r.offset == t.index && (o = Vo + o), s != o)) {
            const t = zo(s, o)
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
            o = Array.from(this.domConverter.viewChildrenToDom(t, { bind: !0 }))
          i && i.parent === t && Zo(n.ownerDocument, o, i.offset)
          const r = this._diffNodeLists(s, o)
          let a = 0
          const l = new Set()
          for (const t of r) 'delete' === t ? (l.add(s[a]), Go(s[a])) : 'equal' === t && a++
          a = 0
          for (const t of r)
            'insert' === t
              ? (Ko(n, a, o[a]), a++)
              : 'equal' === t && (this._markDescendantTextToSync(this.domConverter.domToView(o[a])), a++)
          for (const t of l) t.parentNode || this.domConverter.unbindDomElement(t)
        }
        _diffNodeLists(t, e) {
          return Ho(
            (t = (function (t, e) {
              const n = Array.from(t)
              if (0 == n.length || !e) return n
              n[n.length - 1] == e && n.pop()
              return n
            })(t, this._fakeSelectionContainer)),
            e,
            tr.bind(null, this.domConverter)
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
              : ((i = i.concat(Ho(s, o, Qo).map(t => ('equal' === t ? 'replace' : t)))),
                i.push('equal'),
                (s = []),
                (o = [])),
              r[a]++
          return i.concat(Ho(s, o, Qo).map(t => ('equal' === t ? 'replace' : t)))
        }
        _markDescendantTextToSync(t) {
          if (t)
            if (t.is('$text')) this.markedTexts.add(t)
            else if (t.is('element')) for (const e of t.getChildren()) this._markDescendantTextToSync(e)
        }
        _updateSelection() {
          if (ro.isBlink && !ro.isAndroid && this.isSelecting && !this.markedChildren.size) return
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
            ro.isGecko &&
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
            const e = t.getSelection()
            if (e.rangeCount) {
              const n = t.activeElement,
                i = this.domConverter.mapDomToView(n)
              n && i && e.removeAllRanges()
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
      function Zo(t, e, n) {
        const i = e instanceof Array ? e : e.childNodes,
          s = i[n]
        if (No(s)) return (s.data = Vo + s.data), s
        {
          const s = t.createTextNode(Vo)
          return Array.isArray(e) ? i.splice(n, 0, s) : Ko(e, n, s), s
        }
      }
      function Qo(t, e) {
        return (
          Yo(t) && Yo(e) && !No(t) && !No(e) && !Jo(t) && !Jo(e) && t.tagName.toLowerCase() === e.tagName.toLowerCase()
        )
      }
      function tr(t, e, n) {
        return e === n || (No(e) && No(n) ? e.data === n.data : !(!t.isBlockFiller(e) || !t.isBlockFiller(n)))
      }
      function er(t) {
        let e = 0
        for (; t.previousSibling; ) (t = t.previousSibling), e++
        return e
      }
      function nr(t) {
        const e = []
        let n = t
        for (; n && n.nodeType != Node.DOCUMENT_NODE; ) e.unshift(n), (n = n.parentNode)
        return e
      }
      const ir = Bo(wi.document),
        sr = Do(wi.document),
        or = Fo(wi.document),
        rr = 'data-ck-unsafe-attribute-',
        ar = 'data-ck-unsafe-element'
      class lr {
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
            (this.unsafeElements = ['script', 'style']),
            (this._domDocument =
              'editing' === this.renderingMode ? wi.document : wi.document.implementation.createHTMLDocument('')),
            (this._domToViewMapping = new WeakMap()),
            (this._viewToDomMapping = new WeakMap()),
            (this._fakeSelectionMapping = new WeakMap()),
            (this._rawContentElementMatcher = new Ii()),
            (this._encounteredRawContentDomNodes = new WeakSet())
        }
        bindFakeSelection(t, e) {
          this._fakeSelectionMapping.set(t, new zs(e))
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
            for (const e of Array.from(t.children)) this.unbindDomElement(e)
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
            this._shouldRenameElement(e) && (dr(e), t.replaceWith(this._createReplacementDomElement(e, t)))
          }
          for (; t.firstChild; ) t.firstChild.remove()
          t.append(i)
        }
        viewToDom(t, e = {}) {
          if (t.is('$text')) {
            const e = this._processDataFromViewText(t)
            return this._domDocument.createTextNode(e)
          }
          {
            if (this.mapViewToDom(t)) return this.mapViewToDom(t)
            let n
            if (t.is('documentFragment'))
              (n = this._domDocument.createDocumentFragment()), e.bind && this.bindDocumentFragments(n, t)
            else {
              if (t.is('uiElement'))
                return (
                  (n =
                    '$comment' === t.name
                      ? this._domDocument.createComment(t.getCustomProperty('$rawContent'))
                      : t.render(this._domDocument, this)),
                  e.bind && this.bindElements(n, t),
                  n
                )
              this._shouldRenameElement(t.name)
                ? (dr(t.name), (n = this._createReplacementDomElement(t.name)))
                : (n = t.hasAttribute('xmlns')
                    ? this._domDocument.createElementNS(t.getAttribute('xmlns'), t.name)
                    : this._domDocument.createElement(t.name)),
                t.is('rawElement') && t.render(n, this),
                e.bind && this.bindElements(n, t)
              for (const e of t.getAttributeKeys()) this.setDomElementAttribute(n, e, t.getAttribute(e), t)
            }
            if (!1 !== e.withChildren) for (const i of this.viewChildrenToDom(t, e)) n.appendChild(i)
            return n
          }
        }
        setDomElementAttribute(t, e, n, i) {
          const s = this.shouldRenderAttribute(e, n, t.tagName.toLowerCase()) || (i && i.shouldRenderUnsafeAttribute(e))
          s || c('domconverter-unsafe-attribute-detected', { domElement: t, key: e, value: n }),
            t.hasAttribute(e) && !s ? t.removeAttribute(e) : t.hasAttribute(rr + e) && s && t.removeAttribute(rr + e),
            t.setAttribute(s ? e : rr + e, n)
        }
        removeDomElementAttribute(t, e) {
          e != ar && (t.removeAttribute(e), t.removeAttribute(rr + e))
        }
        *viewChildrenToDom(t, e = {}) {
          const n = t.getFillerOffset && t.getFillerOffset()
          let i = 0
          for (const s of t.getChildren()) {
            n === i && (yield this._getBlockFiller())
            const t = s.is('element') && s.getCustomProperty('dataPipeline:transparentRendering')
            t && 'data' == this.renderingMode
              ? yield* this.viewChildrenToDom(s, e)
              : (t && c('domconverter-transparent-rendering-unsupported-in-editing-pipeline', { viewElement: s }),
                yield this.viewToDom(s, e)),
              i++
          }
          n === i && (yield this._getBlockFiller())
        }
        viewRangeToDom(t) {
          const e = this.viewPositionToDom(t.start),
            n = this.viewPositionToDom(t.end),
            i = this._domDocument.createRange()
          return i.setStart(e.parent, e.offset), i.setEnd(n.parent, n.offset), i
        }
        viewPositionToDom(t) {
          const e = t.parent
          if (e.is('$text')) {
            const n = this.findCorrespondingDomText(e)
            if (!n) return null
            let i = t.offset
            return Lo(n) && (i += 7), { parent: n, offset: i }
          }
          {
            let n, i, s
            if (0 === t.offset) {
              if (((n = this.mapViewToDom(e)), !n)) return null
              s = n.childNodes[0]
            } else {
              const e = t.nodeBefore
              if (((i = e.is('$text') ? this.findCorrespondingDomText(e) : this.mapViewToDom(e)), !i)) return null
              ;(n = i.parentNode), (s = i.nextSibling)
            }
            if (No(s) && Lo(s)) return { parent: s, offset: 7 }
            return { parent: n, offset: i ? er(i) + 1 : 0 }
          }
        }
        domToView(t, e = {}) {
          if (this.isBlockFiller(t)) return null
          const n = this.getHostViewElement(t)
          if (n) return n
          if (Jo(t) && e.skipComments) return null
          if (No(t)) {
            if (jo(t)) return null
            {
              const e = this._processDataFromDomText(t)
              return '' === e ? null : new Si(this.document, e)
            }
          }
          {
            if (this.mapDomToView(t)) return this.mapDomToView(t)
            let n
            if (this.isDocumentFragment(t)) (n = new Po(this.document)), e.bind && this.bindDocumentFragments(t, n)
            else {
              ;(n = this._createViewElement(t, e)), e.bind && this.bindElements(t, n)
              const i = t.attributes
              if (i) for (let t = i.length, e = 0; e < t; e++) n._setAttribute(i[e].name, i[e].value)
              if (this._isViewElementWithRawContent(n, e) || Jo(t)) {
                const e = Jo(t) ? t.data : t.innerHTML
                return n._setCustomProperty('$rawContent', e), this._encounteredRawContentDomNodes.add(t), n
              }
            }
            if (!1 !== e.withChildren) for (const i of this.domChildrenToView(t, e)) n._appendChild(i)
            return n
          }
        }
        *domChildrenToView(t, e) {
          for (let n = 0; n < t.childNodes.length; n++) {
            const i = t.childNodes[n],
              s = this.domToView(i, e)
            null !== s && (yield s)
          }
        }
        domSelectionToView(t) {
          if (1 === t.rangeCount) {
            let e = t.getRangeAt(0).startContainer
            No(e) && (e = e.parentNode)
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
          return new zs(n, { backward: e })
        }
        domRangeToView(t) {
          const e = this.domPositionToView(t.startContainer, t.startOffset),
            n = this.domPositionToView(t.endContainer, t.endOffset)
          return e && n ? new js(e, n) : null
        }
        domPositionToView(t, e = 0) {
          if (this.isBlockFiller(t)) return this.domPositionToView(t.parentNode, er(t))
          const n = this.mapDomToView(t)
          if (n && (n.is('uiElement') || n.is('rawElement'))) return Ls._createBefore(n)
          if (No(t)) {
            if (jo(t)) return this.domPositionToView(t.parentNode, er(t))
            const n = this.findCorrespondingViewText(t)
            let i = e
            return n ? (Lo(t) && ((i -= 7), (i = i < 0 ? 0 : i)), new Ls(n, i)) : null
          }
          if (0 === e) {
            const e = this.mapDomToView(t)
            if (e) return new Ls(e, 0)
          } else {
            const n = t.childNodes[e - 1],
              i = No(n) ? this.findCorrespondingViewText(n) : this.mapDomToView(n)
            if (i && i.parent) return new Ls(i.parent, i.index + 1)
          }
          return null
        }
        mapDomToView(t) {
          return this.getHostViewElement(t) || this._domToViewMapping.get(t)
        }
        findCorrespondingViewText(t) {
          if (jo(t)) return null
          const e = this.getHostViewElement(t)
          if (e) return e
          const n = t.previousSibling
          if (n) {
            if (!this.isElement(n)) return null
            const t = this.mapDomToView(n)
            if (t) {
              const e = t.nextSibling
              return e instanceof Si ? e : null
            }
          } else {
            const e = this.mapDomToView(t.parentNode)
            if (e) {
              const t = e.getChild(0)
              return t instanceof Si ? t : null
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
            const { scrollX: t, scrollY: n } = wi.window,
              i = []
            cr(e, t => {
              const { scrollLeft: e, scrollTop: n } = t
              i.push([e, n])
            }),
              e.focus(),
              cr(e, t => {
                const [e, n] = i.shift()
                ;(t.scrollLeft = e), (t.scrollTop = n)
              }),
              wi.window.scrollTo(t, n)
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
            ? t.isEqualNode(ir)
            : !('BR' !== t.tagName || !hr(t, this.blockElements) || 1 !== t.parentNode.childNodes.length) ||
                t.isEqualNode(or) ||
                (function (t, e) {
                  return t.isEqualNode(sr) && hr(t, e) && 1 === t.parentNode.childNodes.length
                })(t, this.blockElements)
        }
        isDomSelectionBackward(t) {
          if (t.isCollapsed) return !1
          const e = this._domDocument.createRange()
          e.setStart(t.anchorNode, t.anchorOffset), e.setEnd(t.focusNode, t.focusOffset)
          const n = e.collapsed
          return e.detach(), n
        }
        getHostViewElement(t) {
          const e = nr(t)
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
        _getBlockFiller() {
          switch (this.blockFillerMode) {
            case 'nbsp':
              return Do(this._domDocument)
            case 'markedNbsp':
              return Fo(this._domDocument)
            case 'br':
              return Bo(this._domDocument)
          }
        }
        _isDomSelectionPositionCorrect(t, e) {
          if (No(t) && Lo(t) && e < 7) return !1
          if (this.isElement(t) && Lo(t.childNodes[e])) return !1
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
              return nr(t).some(t => t.tagName && e.includes(t.tagName.toLowerCase()))
            })(t, this.preElements)
          )
            return Wo(t)
          e = e.replace(/[ \n\t\r]{1,}/g, ' ')
          const n = this._getTouchingInlineDomNode(t, !1),
            i = this._getTouchingInlineDomNode(t, !0),
            s = this._checkShouldLeftTrimDomText(t, n),
            o = this._checkShouldRightTrimDomText(t, i)
          s && (e = e.replace(/^ /, '')),
            o && (e = e.replace(/ $/, '')),
            (e = Wo(new Text(e))),
            (e = e.replace(/ \u00A0/g, '  '))
          const r = i && this.isElement(i) && 'BR' != i.tagName,
            a = i && No(i) && ' ' == i.data.charAt(0)
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
          return !e && !Lo(t)
        }
        _getTouchingInlineViewNode(t, e) {
          const n = new Vs({
            startPosition: e ? Ls._createAfter(t) : Ls._createBefore(t),
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
          let s = !0,
            o = t
          do {
            if (
              (!s && o[n] ? (o = o[n]) : o[i] ? ((o = o[i]), (s = !1)) : ((o = o.parentNode), (s = !0)),
              !o || this._isBlockElement(o))
            )
              return null
          } while (!No(o) && 'BR' != o.tagName && !this._isInlineObjectElement(o))
          return o
        }
        _isBlockElement(t) {
          return this.isElement(t) && this.blockElements.includes(t.tagName.toLowerCase())
        }
        _isInlineObjectElement(t) {
          return this.isElement(t) && this.inlineObjectElements.includes(t.tagName.toLowerCase())
        }
        _createViewElement(t, e) {
          if (Jo(t)) return new _o(this.document, '$comment')
          const n = e.keepOriginalCase ? t.tagName : t.tagName.toLowerCase()
          return new Os(this.document, n)
        }
        _isViewElementWithRawContent(t, e) {
          return !1 !== e.withChildren && !!this._rawContentElementMatcher.match(t)
        }
        _shouldRenameElement(t) {
          const e = t.toLowerCase()
          return 'editing' === this.renderingMode && this.unsafeElements.includes(e)
        }
        _createReplacementDomElement(t, e) {
          const n = this._domDocument.createElement('span')
          if ((n.setAttribute(ar, t), e)) {
            for (; e.firstChild; ) n.appendChild(e.firstChild)
            for (const t of e.getAttributeNames()) n.setAttribute(t, e.getAttribute(t))
          }
          return n
        }
      }
      function cr(t, e) {
        let n = t
        for (; n; ) e(n), (n = n.parentElement)
      }
      function hr(t, e) {
        const n = t.parentNode
        return !!n && !!n.tagName && e.includes(n.tagName.toLowerCase())
      }
      function dr(t) {
        'script' === t && c('domconverter-unsafe-script-element-detected'),
          'style' === t && c('domconverter-unsafe-style-element-detected')
      }
      function ur(t) {
        const e = Object.prototype.toString.apply(t)
        return '[object Window]' == e || '[object global]' == e
      }
      function fr(t) {
        return class extends t {
          listenTo(t, e, n, i = {}) {
            if (Yo(t) || ur(t)) {
              const s = { capture: !!i.useCapture, passive: !!i.usePassive },
                o = this._getProxyEmitter(t, s) || new gr(t, s)
              this.listenTo(o, e, n, i)
            } else w.prototype.listenTo.call(this, t, e, n, i)
          }
          stopListening(t, e, n) {
            if (Yo(t) || ur(t)) {
              const i = this._getAllProxyEmitters(t)
              for (const t of i) this.stopListening(t, e, n)
            } else w.prototype.stopListening.call(this, t, e, n)
          }
          _getProxyEmitter(t, e) {
            return (function (t, e) {
              const n = t[m]
              return n && n[e] ? n[e].emitter : null
            })(this, pr(t, e))
          }
          _getAllProxyEmitters(t) {
            return [
              { capture: !1, passive: !1 },
              { capture: !1, passive: !0 },
              { capture: !0, passive: !1 },
              { capture: !0, passive: !0 },
            ]
              .map(e => this._getProxyEmitter(t, e))
              .filter(t => !!t)
          }
        }
      }
      const mr = fr(w)
      ;[
        '_getProxyEmitter',
        '_getAllProxyEmitters',
        'on',
        'once',
        'off',
        'listenTo',
        'stopListening',
        'fire',
        'delegate',
        'stopDelegating',
        '_addEventListener',
        '_removeEventListener',
      ].forEach(t => {
        fr[t] = mr.prototype[t]
      })
      class gr extends w {
        constructor(t, e) {
          super(), b(this, pr(t, e)), (this._domNode = t), (this._options = e)
        }
        attach(t) {
          if (this._domListeners && this._domListeners[t]) return
          const e = this._createDomListener(t)
          this._domNode.addEventListener(t, e, this._options),
            this._domListeners || (this._domListeners = {}),
            (this._domListeners[t] = e)
        }
        detach(t) {
          let e
          !this._domListeners[t] ||
            ((e = this._events[t]) && e.callbacks.length) ||
            this._domListeners[t].removeListener()
        }
        _addEventListener(t, e, n) {
          this.attach(t), w.prototype._addEventListener.call(this, t, e, n)
        }
        _removeEventListener(t, e) {
          w.prototype._removeEventListener.call(this, t, e), this.detach(t)
        }
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
        }
      }
      function pr(t, e) {
        let n = (function (t) {
          return t['data-ck-expando'] || (t['data-ck-expando'] = o())
        })(t)
        for (const t of Object.keys(e).sort()) e[t] && (n += '-' + t)
        return n
      }
      class _r extends mr {
        constructor(t) {
          super(), (this.view = t), (this.document = t.document), (this.isEnabled = !1)
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
      const wr = function (t) {
        return this.__data__.set(t, '__lodash_hash_undefined__'), this
      }
      const br = function (t) {
        return this.__data__.has(t)
      }
      function yr(t) {
        var e = -1,
          n = null == t ? 0 : t.length
        for (this.__data__ = new re(); ++e < n; ) this.add(t[e])
      }
      ;(yr.prototype.add = yr.prototype.push = wr), (yr.prototype.has = br)
      const vr = yr
      const Pr = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length; ++n < i; ) if (e(t[n], n, t)) return !0
        return !1
      }
      const kr = function (t, e) {
        return t.has(e)
      }
      const Ar = function (t, e, n, i, s, o) {
        var r = 1 & n,
          a = t.length,
          l = e.length
        if (a != l && !(r && l > a)) return !1
        var c = o.get(t),
          h = o.get(e)
        if (c && h) return c == e && h == t
        var d = -1,
          u = !0,
          f = 2 & n ? new vr() : void 0
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
              !Pr(e, function (t, e) {
                if (!kr(f, e) && (m === t || s(m, t, n, i, o))) return f.push(e)
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
      const Cr = function (t) {
        var e = -1,
          n = Array(t.size)
        return (
          t.forEach(function (t, i) {
            n[++e] = [i, t]
          }),
          n
        )
      }
      const Er = function (t) {
        var e = -1,
          n = Array(t.size)
        return (
          t.forEach(function (t) {
            n[++e] = t
          }),
          n
        )
      }
      var Tr = K ? K.prototype : void 0,
        xr = Tr ? Tr.valueOf : void 0
      const Sr = function (t, e, n, i, s, o, r) {
        switch (n) {
          case '[object DataView]':
            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1
            ;(t = t.buffer), (e = e.buffer)
          case '[object ArrayBuffer]':
            return !(t.byteLength != e.byteLength || !o(new Vn(t), new Vn(e)))
          case '[object Boolean]':
          case '[object Date]':
          case '[object Number]':
            return ft(+t, +e)
          case '[object Error]':
            return t.name == e.name && t.message == e.message
          case '[object RegExp]':
          case '[object String]':
            return t == e + ''
          case '[object Map]':
            var a = Cr
          case '[object Set]':
            var l = 1 & i
            if ((a || (a = Er), t.size != e.size && !l)) return !1
            var c = r.get(t)
            if (c) return c == e
            ;(i |= 2), r.set(t, e)
            var h = Ar(a(t), a(e), i, s, o, r)
            return r.delete(t), h
          case '[object Symbol]':
            if (xr) return xr.call(t) == xr.call(e)
        }
        return !1
      }
      var Rr = Object.prototype.hasOwnProperty
      const Or = function (t, e, n, i, s, o) {
        var r = 1 & n,
          a = wn(t),
          l = a.length
        if (l != wn(e).length && !r) return !1
        for (var c = l; c--; ) {
          var h = a[c]
          if (!(r ? h in e : Rr.call(e, h))) return !1
        }
        var d = o.get(t),
          u = o.get(e)
        if (d && u) return d == e && u == t
        var f = !0
        o.set(t, e), o.set(e, t)
        for (var m = r; ++c < l; ) {
          var g = t[(h = a[c])],
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
      var Ir = '[object Arguments]',
        Mr = '[object Array]',
        Nr = '[object Object]',
        Dr = Object.prototype.hasOwnProperty
      const Fr = function (t, e, n, i, s, o) {
        var r = Pe(t),
          a = Pe(e),
          l = r ? Mr : Dn(t),
          c = a ? Mr : Dn(e),
          h = (l = l == Ir ? Nr : l) == Nr,
          d = (c = c == Ir ? Nr : c) == Nr,
          u = l == c
        if (u && Te(t)) {
          if (!Te(e)) return !1
          ;(r = !0), (h = !1)
        }
        if (u && !h) return o || (o = new ce()), r || Le(t) ? Ar(t, e, n, i, s, o) : Sr(t, e, l, n, i, s, o)
        if (!(1 & n)) {
          var f = h && Dr.call(t, '__wrapped__'),
            m = d && Dr.call(e, '__wrapped__')
          if (f || m) {
            var g = f ? t.value() : t,
              p = m ? e.value() : e
            return o || (o = new ce()), s(g, p, n, i, o)
          }
        }
        return !!u && (o || (o = new ce()), Or(t, e, n, i, s, o))
      }
      const Br = function t(e, n, i, s, o) {
        return e === n || (null == e || null == n || (!ot(e) && !ot(n)) ? e != e && n != n : Fr(e, n, i, s, t, o))
      }
      const Vr = function (t, e, n) {
        var i = (n = 'function' == typeof n ? n : void 0) ? n(t, e) : void 0
        return void 0 === i ? Br(t, e, void 0, n) : !!i
      }
      class Lr extends _r {
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
                ? n.set(t, { type: 'text', oldText: t.data, newText: Wo(s.target), node: t })
                : !t && Lo(s.target) && i.add(e.mapDomToView(s.target.parentNode))
            }
          }
          const s = []
          for (const t of n.values()) this.renderer.markToSync('text', t.node), s.push(t)
          for (const t of i) {
            const n = e.mapViewToDom(t),
              i = Array.from(t.getChildren()),
              o = Array.from(e.domChildrenToView(n, { withChildren: !1 }))
            Vr(i, o, a) ||
              (this.renderer.markToSync('children', t),
              s.push({ type: 'children', oldChildren: i, newChildren: o, node: t }))
          }
          const o = t[0].target.ownerDocument.getSelection()
          let r = null
          if (o && o.anchorNode) {
            const t = e.domPositionToView(o.anchorNode, o.anchorOffset),
              n = e.domPositionToView(o.focusNode, o.focusOffset)
            t && n && ((r = new zs(t)), r.setFocus(n))
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
      const jr = ks(function (t, e) {
        ge(e, Qe(e), t)
      })
      class Wr {
        constructor(t, e, n) {
          ;(this.view = t), (this.document = t.document), (this.domEvent = e), (this.domTarget = e.target), jr(this, n)
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
      class $r extends _r {
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
          this.isEnabled && this.document.fire(t, new Wr(this.view, e, n))
        }
      }
      class zr extends $r {
        constructor(t) {
          super(t), (this.domEventType = ['keydown', 'keyup'])
        }
        onDomEvent(t) {
          const e = {
            keyCode: t.keyCode,
            altKey: t.altKey,
            ctrlKey: t.ctrlKey,
            shiftKey: t.shiftKey,
            metaKey: t.metaKey,
            get keystroke() {
              return fo(this)
            },
          }
          this.fire(t.type, t, e)
        }
      }
      const qr = function () {
        return H.Date.now()
      }
      var Ur = /\s/
      const Hr = function (t) {
        for (var e = t.length; e-- && Ur.test(t.charAt(e)); );
        return e
      }
      var Kr = /^\s+/
      const Gr = function (t) {
        return t ? t.slice(0, Hr(t) + 1).replace(Kr, '') : t
      }
      var Jr = /^[-+]0x[0-9a-f]+$/i,
        Yr = /^0b[01]+$/i,
        Xr = /^0o[0-7]+$/i,
        Zr = parseInt
      const Qr = function (t) {
        if ('number' == typeof t) return t
        if (Di(t)) return NaN
        if (E(t)) {
          var e = 'function' == typeof t.valueOf ? t.valueOf() : t
          t = E(e) ? e + '' : e
        }
        if ('string' != typeof t) return 0 === t ? t : +t
        t = Gr(t)
        var n = Yr.test(t)
        return n || Xr.test(t) ? Zr(t.slice(2), n ? 2 : 8) : Jr.test(t) ? NaN : +t
      }
      var ta = Math.max,
        ea = Math.min
      const na = function (t, e, n) {
        var i,
          s,
          o,
          r,
          a,
          l,
          c = 0,
          h = !1,
          d = !1,
          u = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function f(e) {
          var n = i,
            o = s
          return (i = s = void 0), (c = e), (r = t.apply(o, n))
        }
        function m(t) {
          return (c = t), (a = setTimeout(p, e)), h ? f(t) : r
        }
        function g(t) {
          var n = t - l
          return void 0 === l || n >= e || n < 0 || (d && t - c >= o)
        }
        function p() {
          var t = qr()
          if (g(t)) return _(t)
          a = setTimeout(
            p,
            (function (t) {
              var n = e - (t - l)
              return d ? ea(n, o - (t - c)) : n
            })(t)
          )
        }
        function _(t) {
          return (a = void 0), u && i ? f(t) : ((i = s = void 0), r)
        }
        function w() {
          var t = qr(),
            n = g(t)
          if (((i = arguments), (s = this), (l = t), n)) {
            if (void 0 === a) return m(l)
            if (d) return clearTimeout(a), (a = setTimeout(p, e)), f(l)
          }
          return void 0 === a && (a = setTimeout(p, e)), r
        }
        return (
          (e = Qr(e) || 0),
          E(n) &&
            ((h = !!n.leading),
            (o = (d = 'maxWait' in n) ? ta(Qr(n.maxWait) || 0, e) : o),
            (u = 'trailing' in n ? !!n.trailing : u)),
          (w.cancel = function () {
            void 0 !== a && clearTimeout(a), (c = 0), (i = l = s = a = void 0)
          }),
          (w.flush = function () {
            return void 0 === a ? r : _(qr())
          }),
          w
        )
      }
      class ia extends _r {
        constructor(t) {
          super(t),
            (this._fireSelectionChangeDoneDebounced = na(t => {
              this.document.fire('selectionChangeDone', t)
            }, 200))
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
            n = new zs(e.getRanges(), { backward: e.isBackward, fake: !1 })
          ;(t != ho.arrowleft && t != ho.arrowup) || n.setTo(n.getFirstPosition()),
            (t != ho.arrowright && t != ho.arrowdown) || n.setTo(n.getLastPosition())
          const i = { oldSelection: e, newSelection: n, domSelection: null }
          this.document.fire('selectionChange', i), this._fireSelectionChangeDoneDebounced(i)
        }
      }
      class sa extends _r {
        constructor(t) {
          super(t),
            (this.mutationObserver = t.getObserver(Lr)),
            (this.selection = this.document.selection),
            (this.domConverter = t.domConverter),
            (this._documents = new WeakSet()),
            (this._fireSelectionChangeDoneDebounced = na(t => {
              this.document.fire('selectionChangeDone', t)
            }, 200)),
            (this._clearInfiniteLoopInterval = setInterval(() => this._clearInfiniteLoop(), 1e3)),
            (this._documentIsSelectingInactivityTimeoutDebounced = na(() => (this.document.isSelecting = !1), 5e3)),
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
      class oa extends $r {
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
      class ra extends $r {
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
      class aa extends $r {
        constructor(t) {
          super(t), (this.domEventType = ['beforeinput'])
        }
        onDomEvent(t) {
          this.fire(t.type, t)
        }
      }
      class la {
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
      class ca {
        constructor(t, e) {
          ca._observerInstance || ca._createObserver(),
            (this._element = t),
            (this._callback = e),
            ca._addElementCallback(t, e),
            ca._observerInstance.observe(t)
        }
        destroy() {
          ca._deleteElementCallback(this._element, this._callback)
        }
        static _addElementCallback(t, e) {
          ca._elementCallbacks || (ca._elementCallbacks = new Map())
          let n = ca._elementCallbacks.get(t)
          n || ((n = new Set()), ca._elementCallbacks.set(t, n)), n.add(e)
        }
        static _deleteElementCallback(t, e) {
          const n = ca._getElementCallbacks(t)
          n && (n.delete(e), n.size || (ca._elementCallbacks.delete(t), ca._observerInstance.unobserve(t))),
            ca._elementCallbacks &&
              !ca._elementCallbacks.size &&
              ((ca._observerInstance = null), (ca._elementCallbacks = null))
        }
        static _getElementCallbacks(t) {
          return ca._elementCallbacks ? ca._elementCallbacks.get(t) : null
        }
        static _createObserver() {
          ca._observerInstance = new wi.window.ResizeObserver(t => {
            for (const e of t) {
              const t = ca._getElementCallbacks(e.target)
              if (t) for (const n of t) n(e)
            }
          })
        }
      }
      function ha(t) {
        return !!(t && t.getClientRects && t.getClientRects().length)
      }
      function da(t) {
        const e = t.next()
        return e.done ? null : e.value
      }
      ;(ca._observerInstance = null), (ca._elementCallbacks = null)
      class ua extends fr(M) {
        constructor() {
          super(),
            this.set('isFocused', !1),
            this.set('focusedElement', null),
            (this._elements = new Set()),
            (this._nextEventLoopTimeout = null)
        }
        add(t) {
          if (this._elements.has(t)) throw new l('focustracker-add-element-already-exist', this)
          this.listenTo(t, 'focus', () => this._focus(t), { useCapture: !0 }),
            this.listenTo(t, 'blur', () => this._blur(), { useCapture: !0 }),
            this._elements.add(t)
        }
        remove(t) {
          t === this.focusedElement && this._blur(),
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
      class fa {
        constructor() {
          this._listener = Object.create(fr)
        }
        listenTo(t) {
          this._listener.listenTo(t, 'keydown', (t, e) => {
            this._listener.fire('_keydown:' + fo(e), e)
          })
        }
        set(t, e, n = {}) {
          const i = mo(t),
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
          return !!this._listener.fire('_keydown:' + fo(t), t)
        }
        destroy() {
          this._listener.stopListening()
        }
      }
      class ma extends _r {
        constructor(t) {
          super(t),
            this.document.on('keydown', (t, e) => {
              if (
                this.isEnabled &&
                ((n = e.keyCode) == ho.arrowright || n == ho.arrowleft || n == ho.arrowup || n == ho.arrowdown)
              ) {
                const n = new Us(this.document, 'arrowKey', this.document.selection.getFirstRange())
                this.document.fire(n, e), n.stop.called && t.stop()
              }
              var n
            })
        }
        observe() {}
      }
      class ga extends _r {
        constructor(t) {
          super(t)
          const e = this.document
          e.on('keydown', (t, n) => {
            if (!this.isEnabled || n.keyCode != ho.tab || n.ctrlKey) return
            const i = new Us(e, 'tab', e.selection.getFirstRange())
            e.fire(i, n), i.stop.called && t.stop()
          })
        }
        observe() {}
      }
      function pa(t) {
        return '[object Range]' == Object.prototype.toString.apply(t)
      }
      function _a(t) {
        const e = t.ownerDocument.defaultView.getComputedStyle(t)
        return {
          top: parseInt(e.borderTopWidth, 10),
          right: parseInt(e.borderRightWidth, 10),
          bottom: parseInt(e.borderBottomWidth, 10),
          left: parseInt(e.borderLeftWidth, 10),
        }
      }
      const wa = ['top', 'right', 'bottom', 'left', 'width', 'height']
      class ba {
        constructor(t) {
          const e = pa(t)
          if (
            (Object.defineProperty(this, '_source', { value: t._source || t, writable: !0, enumerable: !1 }),
            Pa(t) || e)
          )
            if (e) {
              const e = ba.getDomRangeRects(t)
              ya(this, ba.getBoundingRect(e))
            } else ya(this, t.getBoundingClientRect())
          else if (ur(t)) {
            const { innerWidth: e, innerHeight: n } = t
            ya(this, { top: 0, right: e, bottom: n, left: 0, width: e, height: n })
          } else ya(this, t)
        }
        clone() {
          return new ba(this)
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
            width: 0,
            height: 0,
          }
          return (
            (e.width = e.right - e.left), (e.height = e.bottom - e.top), e.width < 0 || e.height < 0 ? null : new ba(e)
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
          if (!va(t)) {
            let n = t.parentNode || t.commonAncestorContainer
            for (; n && !va(n); ) {
              const t = new ba(n),
                i = e.getIntersection(t)
              if (!i) return null
              i.getArea() < e.getArea() && (e = i), (n = n.parentNode)
            }
          }
          return e
        }
        isEqual(t) {
          for (const e of wa) if (this[e] !== t[e]) return !1
          return !0
        }
        contains(t) {
          const e = this.getIntersection(t)
          return !(!e || !e.isEqual(t))
        }
        excludeScrollbarsAndBorders() {
          const t = this._source
          let e, n, i
          if (ur(t))
            (e = t.innerWidth - t.document.documentElement.clientWidth),
              (n = t.innerHeight - t.document.documentElement.clientHeight),
              (i = t.getComputedStyle(t.document.documentElement).direction)
          else {
            const s = _a(t)
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
          if (n.length) for (const t of n) e.push(new ba(t))
          else {
            let n = t.startContainer
            No(n) && (n = n.parentNode)
            const i = new ba(n.getBoundingClientRect())
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
            width: 0,
            height: 0,
          }
          let n = 0
          for (const i of t)
            n++,
              (e.left = Math.min(e.left, i.left)),
              (e.top = Math.min(e.top, i.top)),
              (e.right = Math.max(e.right, i.right)),
              (e.bottom = Math.max(e.bottom, i.bottom))
          return 0 == n ? null : ((e.width = e.right - e.left), (e.height = e.bottom - e.top), new ba(e))
        }
      }
      function ya(t, e) {
        for (const n of wa) t[n] = e[n]
      }
      function va(t) {
        return !!Pa(t) && t === t.ownerDocument.body
      }
      function Pa(t) {
        return ci(t)
      }
      function ka(t, e, n) {
        const i = e.clone().moveBy(0, n),
          s = e.clone().moveBy(0, -n),
          o = new ba(t).excludeScrollbarsAndBorders()
        if (![s, i].every(t => o.contains(t))) {
          let { scrollX: r, scrollY: a } = t
          Ea(s, o) ? (a -= o.top - e.top + n) : Ca(i, o) && (a += e.bottom - o.bottom + n),
            Ta(e, o) ? (r -= o.left - e.left + n) : xa(e, o) && (r += e.right - o.right + n),
            t.scrollTo(r, a)
        }
      }
      function Aa(t, e) {
        const n = Sa(t)
        let i, s
        for (; t != n.document.body; )
          (s = e()),
            (i = new ba(t).excludeScrollbarsAndBorders()),
            i.contains(s) ||
              (Ea(s, i) ? (t.scrollTop -= i.top - s.top) : Ca(s, i) && (t.scrollTop += s.bottom - i.bottom),
              Ta(s, i) ? (t.scrollLeft -= i.left - s.left) : xa(s, i) && (t.scrollLeft += s.right - i.right)),
            (t = t.parentNode)
      }
      function Ca(t, e) {
        return t.bottom > e.bottom
      }
      function Ea(t, e) {
        return t.top < e.top
      }
      function Ta(t, e) {
        return t.left < e.left
      }
      function xa(t, e) {
        return t.right > e.right
      }
      function Sa(t) {
        return pa(t) ? t.startContainer.ownerDocument.defaultView : t.ownerDocument.defaultView
      }
      function Ra(t) {
        if (pa(t)) {
          let e = t.commonAncestorContainer
          return No(e) && (e = e.parentNode), e
        }
        return t.parentNode
      }
      function Oa(t, e) {
        const n = Sa(t),
          i = new ba(t)
        if (n === e) return i
        {
          let t = n
          for (; t != e; ) {
            const e = t.frameElement,
              n = new ba(e).excludeScrollbarsAndBorders()
            i.moveBy(n.left, n.top), (t = t.parent)
          }
        }
        return i
      }
      class Ia extends M {
        constructor(t) {
          super(),
            (this.document = new Zs(t)),
            (this.domConverter = new lr(this.document)),
            (this.domRoots = new Map()),
            this.set('isRenderingInProgress', !1),
            this.set('hasDomSelection', !1),
            (this._renderer = new Xo(this.domConverter, this.document.selection)),
            this._renderer.bind('isFocused', 'isSelecting').to(this.document, 'isFocused', 'isSelecting'),
            (this._initialDomRootAttributes = new WeakMap()),
            (this._observers = new Map()),
            (this._ongoingChange = !1),
            (this._postFixersInProgress = !1),
            (this._renderingDisabled = !1),
            (this._hasChangedSinceTheLastRendering = !1),
            (this._writer = new ko(this.document)),
            this.addObserver(Lr),
            this.addObserver(sa),
            this.addObserver(oa),
            this.addObserver(zr),
            this.addObserver(ia),
            this.addObserver(ra),
            this.addObserver(ma),
            this.addObserver(ga),
            ro.isAndroid && this.addObserver(aa),
            this.document.on('arrowKey', $o, { priority: 'low' }),
            wo(this),
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
            this._writer.setAttribute('contenteditable', (!n.isReadOnly).toString(), n),
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
          t &&
            (function ({ target: t, viewportOffset: e = 0 }) {
              const n = Sa(t)
              let i = n,
                s = null
              for (; i; ) {
                let o
                ;(o = Ra(i == n ? t : s)), Aa(o, () => Oa(t, i))
                const r = Oa(t, i)
                if ((ka(i, r, e), i.parent != i)) {
                  if (((s = i.frameElement), (i = i.parent), !s)) return
                } else i = null
              }
            })({ target: this.domConverter.viewRangeToDom(t), viewportOffset: 20 })
        }
        focus() {
          if (!this.document.isFocused) {
            const t = this.document.selection.editableElement
            t && (this.domConverter.focus(t), this.forceRender())
          }
        }
        change(t) {
          if (this.isRenderingInProgress || this._postFixersInProgress) throw new l('cannot-change-view-tree', this)
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
            l.rethrowUnexpectedError(t, this)
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
          return Ls._createAt(t, e)
        }
        createPositionAfter(t) {
          return Ls._createAfter(t)
        }
        createPositionBefore(t) {
          return Ls._createBefore(t)
        }
        createRange(...t) {
          return new js(...t)
        }
        createRangeOn(t) {
          return js._createOn(t)
        }
        createRangeIn(t) {
          return js._createIn(t)
        }
        createSelection(...t) {
          return new zs(...t)
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
      class Ma {
        is() {
          throw new Error('is() method is abstract')
        }
      }
      class Na extends Ma {
        constructor(t) {
          super(), (this.parent = null), (this._attrs = Oi(t))
        }
        get document() {
          return null
        }
        get index() {
          let t
          if (!this.parent) return null
          if (null === (t = this.parent.getChildIndex(this))) throw new l('model-node-not-found-in-parent', this)
          return t
        }
        get startOffset() {
          let t
          if (!this.parent) return null
          if (null === (t = this.parent.getChildStartOffset(this))) throw new l('model-node-not-found-in-parent', this)
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
        getAncestors(t = {}) {
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
            i = Ei(e, n)
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
        _clone(t) {
          return new Na(this._attrs)
        }
        _remove() {
          this.parent._removeChildren(this.index)
        }
        _setAttribute(t, e) {
          this._attrs.set(t, e)
        }
        _setAttributesTo(t) {
          this._attrs = Oi(t)
        }
        _removeAttribute(t) {
          return this._attrs.delete(t)
        }
        _clearAttributes() {
          this._attrs.clear()
        }
      }
      Na.prototype.is = function (t) {
        return 'node' === t || 'model:node' === t
      }
      class Da {
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
          if (!e) throw new l('model-nodelist-index-out-of-bounds', this)
          return this.getNodeStartOffset(e)
        }
        offsetToIndex(t) {
          let e = 0
          for (const n of this._nodes) {
            if (t >= e && t < e + n.offsetSize) return this.getNodeIndex(n)
            e += n.offsetSize
          }
          if (e != t) throw new l('model-nodelist-offset-out-of-bounds', this, { offset: t, nodeList: this })
          return this.length
        }
        _insertNodes(t, e) {
          for (const t of e) if (!(t instanceof Na)) throw new l('model-nodelist-insertnodes-not-node', this)
          this._nodes.splice(t, 0, ...e)
        }
        _removeNodes(t, e = 1) {
          return this._nodes.splice(t, e)
        }
        toJSON() {
          return this._nodes.map(t => t.toJSON())
        }
      }
      class Fa extends Na {
        constructor(t, e) {
          super(e), (this._data = t || '')
        }
        get offsetSize() {
          return this.data.length
        }
        get data() {
          return this._data
        }
        toJSON() {
          const t = super.toJSON()
          return (t.data = this.data), t
        }
        _clone() {
          return new Fa(this.data, this.getAttributes())
        }
        static fromJSON(t) {
          return new Fa(t.data, t.attributes)
        }
      }
      Fa.prototype.is = function (t) {
        return (
          '$text' === t ||
          'model:$text' === t ||
          'text' === t ||
          'model:text' === t ||
          'node' === t ||
          'model:node' === t
        )
      }
      class Ba extends Ma {
        constructor(t, e, n) {
          if ((super(), (this.textNode = t), e < 0 || e > t.offsetSize))
            throw new l('model-textproxy-wrong-offsetintext', this)
          if (n < 0 || e + n > t.offsetSize) throw new l('model-textproxy-wrong-length', this)
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
        getPath() {
          const t = this.textNode.getPath()
          return t.length > 0 && (t[t.length - 1] += this.offsetInText), t
        }
        getAncestors(t = {}) {
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
      Ba.prototype.is = function (t) {
        return '$textProxy' === t || 'model:$textProxy' === t || 'textProxy' === t || 'model:textProxy' === t
      }
      class Va extends Na {
        constructor(t, e, n) {
          super(e), (this.name = t), (this._children = new Da()), n && this._insertChild(0, n)
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
        findAncestor(t, e = {}) {
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
          const e = t ? Array.from(this._children).map(t => t._clone(!0)) : void 0
          return new Va(this.name, this.getAttributes(), e)
        }
        _appendChild(t) {
          this._insertChild(this.childCount, t)
        }
        _insertChild(t, e) {
          const n = (function (t) {
            if ('string' == typeof t) return [new Fa(t)]
            fi(t) || (t = [t])
            return Array.from(t).map(t =>
              'string' == typeof t ? new Fa(t) : t instanceof Ba ? new Fa(t.data, t.getAttributes()) : t
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
          let e
          if (t.children) {
            e = []
            for (const n of t.children) n.name ? e.push(Va.fromJSON(n)) : e.push(Fa.fromJSON(n))
          }
          return new Va(t.name, t.attributes, e)
        }
      }
      Va.prototype.is = function (t, e) {
        return e
          ? e === this.name && ('element' === t || 'model:element' === t)
          : 'element' === t || 'model:element' === t || 'node' === t || 'model:node' === t
      }
      class La {
        constructor(t = {}) {
          if (!t.boundaries && !t.startPosition) throw new l('model-tree-walker-no-start-position', null)
          const e = t.direction || 'forward'
          if ('forward' != e && 'backward' != e) throw new l('model-tree-walker-unknown-direction', t, { direction: e })
          ;(this.direction = e),
            (this.boundaries = t.boundaries || null),
            t.startPosition
              ? (this.position = t.startPosition.clone())
              : (this.position = Wa._createAt(this.boundaries['backward' == this.direction ? 'end' : 'start'])),
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
          if (null === n.parent && e.offset === n.maxOffset) return { done: !0, value: void 0 }
          if (n === this._boundaryEndParent && e.offset == this.boundaries.end.offset)
            return { done: !0, value: void 0 }
          const i = $a(e, n),
            s = i || za(e, n, i)
          if (s instanceof Va)
            return (
              this.shallow ? e.offset++ : (e.path.push(0), (this._visitedParent = s)),
              (this.position = e),
              ja('elementStart', s, t, e, 1)
            )
          if (s instanceof Fa) {
            let i
            if (this.singleCharacters) i = 1
            else {
              let t = s.endOffset
              this._boundaryEndParent == n && this.boundaries.end.offset < t && (t = this.boundaries.end.offset),
                (i = t - e.offset)
            }
            const o = e.offset - s.startOffset,
              r = new Ba(s, o, i)
            return (e.offset += i), (this.position = e), ja('text', r, t, e, i)
          }
          return (
            e.path.pop(),
            e.offset++,
            (this.position = e),
            (this._visitedParent = n.parent),
            this.ignoreElementEnd ? this._next() : ja('elementEnd', n, t, e)
          )
        }
        _previous() {
          const t = this.position,
            e = this.position.clone(),
            n = this._visitedParent
          if (null === n.parent && 0 === e.offset) return { done: !0, value: void 0 }
          if (n == this._boundaryStartParent && e.offset == this.boundaries.start.offset)
            return { done: !0, value: void 0 }
          const i = e.parent,
            s = $a(e, i),
            o = s || qa(e, i, s)
          if (o instanceof Va)
            return (
              e.offset--,
              this.shallow
                ? ((this.position = e), ja('elementStart', o, t, e, 1))
                : (e.path.push(o.maxOffset),
                  (this.position = e),
                  (this._visitedParent = o),
                  this.ignoreElementEnd ? this._previous() : ja('elementEnd', o, t, e))
            )
          if (o instanceof Fa) {
            let i
            if (this.singleCharacters) i = 1
            else {
              let t = o.startOffset
              this._boundaryStartParent == n && this.boundaries.start.offset > t && (t = this.boundaries.start.offset),
                (i = e.offset - t)
            }
            const s = e.offset - o.startOffset,
              r = new Ba(o, s - i, i)
            return (e.offset -= i), (this.position = e), ja('text', r, t, e, i)
          }
          return e.path.pop(), (this.position = e), (this._visitedParent = n.parent), ja('elementStart', n, t, e, 1)
        }
      }
      function ja(t, e, n, i, s) {
        return { done: !1, value: { type: t, item: e, previousPosition: n, nextPosition: i, length: s } }
      }
      class Wa extends Ma {
        constructor(t, e, n = 'toNone') {
          if ((super(), !t.is('element') && !t.is('documentFragment'))) throw new l('model-position-root-invalid', t)
          if (!(e instanceof Array) || 0 === e.length)
            throw new l('model-position-path-incorrect-format', t, { path: e })
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
              throw new l('model-position-path-incorrect', this, { position: this })
          if (t.is('$text')) throw new l('model-position-path-incorrect', this, { position: this })
          return t
        }
        get index() {
          return this.parent.offsetToIndex(this.offset)
        }
        get textNode() {
          return $a(this, this.parent)
        }
        get nodeAfter() {
          const t = this.parent
          return za(this, t, $a(this, t))
        }
        get nodeBefore() {
          const t = this.parent
          return qa(this, t, $a(this, t))
        }
        get isAtStart() {
          return 0 === this.offset
        }
        get isAtEnd() {
          return this.offset == this.parent.maxOffset
        }
        compareWith(t) {
          if (this.root != t.root) return 'different'
          const e = Ei(this.path, t.path)
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
          const n = new La(e)
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
          const e = Ei(this.path, t.path),
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
              ;(e = Wa._createAt(this)), (n = Wa._createAt(t))
              break
            case 'after':
              ;(e = Wa._createAt(t)), (n = Wa._createAt(this))
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
          throw new Error('unreachable code')
        }
        hasSameParentAs(t) {
          if (this.root !== t.root) return !1
          return 'same' == Ei(this.getParentPath(), t.getParentPath())
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
              e = Wa._createAt(this)
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
                  ? Wa._createAt(t.deletionPosition)
                  : this._getTransformedByMove(t.deletionPosition, t.graveyardPosition, 1)),
            n
          )
        }
        _getTransformedByDeletion(t, e) {
          const n = Wa._createAt(this)
          if (this.root != t.root) return n
          if ('same' == Ei(t.getParentPath(), this.getParentPath())) {
            if (t.offset < this.offset) {
              if (t.offset + e > this.offset) return null
              n.offset -= e
            }
          } else if ('prefix' == Ei(t.getParentPath(), this.getParentPath())) {
            const i = t.path.length - 1
            if (t.offset <= this.path[i]) {
              if (t.offset + e > this.path[i]) return null
              n.path[i] -= e
            }
          }
          return n
        }
        _getTransformedByInsertion(t, e) {
          const n = Wa._createAt(this)
          if (this.root != t.root) return n
          if ('same' == Ei(t.getParentPath(), this.getParentPath()))
            (t.offset < this.offset || (t.offset == this.offset && 'toPrevious' != this.stickiness)) && (n.offset += e)
          else if ('prefix' == Ei(t.getParentPath(), this.getParentPath())) {
            const i = t.path.length - 1
            t.offset <= this.path[i] && (n.path[i] += e)
          }
          return n
        }
        _getTransformedByMove(t, e, n) {
          if (((e = e._getTransformedByDeletion(t, n)), t.isEqual(e))) return Wa._createAt(this)
          const i = this._getTransformedByDeletion(t, n)
          return null === i ||
            (t.isEqual(this) && 'toNext' == this.stickiness) ||
            (t.getShiftedBy(n).isEqual(this) && 'toPrevious' == this.stickiness)
            ? this._getCombined(t, e)
            : i._getTransformedByInsertion(e, n)
        }
        _getCombined(t, e) {
          const n = t.path.length - 1,
            i = Wa._createAt(e)
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
          if (t instanceof Wa) return new Wa(t.root, t.path, t.stickiness)
          {
            const i = t
            if ('end' == e) e = i.maxOffset
            else {
              if ('before' == e) return this._createBefore(i, n)
              if ('after' == e) return this._createAfter(i, n)
              if (0 !== e && !e) throw new l('model-createpositionat-offset-required', [this, t])
            }
            if (!i.is('element') && !i.is('documentFragment')) throw new l('model-position-parent-incorrect', [this, t])
            const s = i.getPath()
            return s.push(e), new this(i.root, s, n)
          }
        }
        static _createAfter(t, e) {
          if (!t.parent) throw new l('model-position-after-root', [this, t], { root: t })
          return this._createAt(t.parent, t.endOffset, e)
        }
        static _createBefore(t, e) {
          if (!t.parent) throw new l('model-position-before-root', t, { root: t })
          return this._createAt(t.parent, t.startOffset, e)
        }
        static fromJSON(t, e) {
          if ('$graveyard' === t.root) {
            const n = new Wa(e.graveyard, t.path)
            return (n.stickiness = t.stickiness), n
          }
          if (!e.getRoot(t.root)) throw new l('model-position-fromjson-no-root', e, { rootName: t.root })
          return new Wa(e.getRoot(t.root), t.path, t.stickiness)
        }
      }
      function $a(t, e) {
        const n = e.getChild(e.offsetToIndex(t.offset))
        return n && n.is('$text') && n.startOffset < t.offset ? n : null
      }
      function za(t, e, n) {
        return null !== n ? null : e.getChild(e.offsetToIndex(t.offset))
      }
      function qa(t, e, n) {
        return null !== n ? null : e.getChild(e.offsetToIndex(t.offset) - 1)
      }
      Wa.prototype.is = function (t) {
        return 'position' === t || 'model:position' === t
      }
      class Ua extends Ma {
        constructor(t, e) {
          super(),
            (this.start = Wa._createAt(t)),
            (this.end = e ? Wa._createAt(e) : Wa._createAt(t)),
            (this.start.stickiness = this.isCollapsed ? 'toNone' : 'toNext'),
            (this.end.stickiness = this.isCollapsed ? 'toNone' : 'toPrevious')
        }
        *[Symbol.iterator]() {
          yield* new La({ boundaries: this, ignoreElementEnd: !0 })
        }
        get isCollapsed() {
          return this.start.isEqual(this.end)
        }
        get isFlat() {
          return 'same' == Ei(this.start.getParentPath(), this.end.getParentPath())
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
          const e = Wa._createBefore(t)
          return this.containsPosition(e) || this.start.isEqual(e)
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
              ? (this.containsPosition(t.start) && e.push(new Ua(this.start, t.start)),
                this.containsPosition(t.end) && e.push(new Ua(t.end, this.end)))
              : e.push(new Ua(this.start, this.end)),
            e
          )
        }
        getIntersection(t) {
          if (this.isIntersecting(t)) {
            let e = this.start,
              n = this.end
            return (
              this.containsPosition(t.start) && (e = t.start), this.containsPosition(t.end) && (n = t.end), new Ua(e, n)
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
          return t.start.isBefore(i) && (i = t.start), t.end.isAfter(s) && (s = t.end), new Ua(i, s)
        }
        getMinimalFlatRanges() {
          const t = [],
            e = this.start.getCommonPath(this.end).length,
            n = Wa._createAt(this.start)
          let i = n.parent
          for (; n.path.length > e + 1; ) {
            const e = i.maxOffset - n.offset
            0 !== e && t.push(new Ua(n, n.getShiftedBy(e))), (n.path = n.path.slice(0, -1)), n.offset++, (i = i.parent)
          }
          for (; n.path.length <= this.end.path.length; ) {
            const e = this.end.path[n.path.length - 1],
              i = e - n.offset
            0 !== i && t.push(new Ua(n, n.getShiftedBy(i))), (n.offset = e), n.path.push(0)
          }
          return t
        }
        getWalker(t = {}) {
          return (t.boundaries = this), new La(t)
        }
        *getItems(t = {}) {
          ;(t.boundaries = this), (t.ignoreElementEnd = !0)
          const e = new La(t)
          for (const t of e) yield t.item
        }
        *getPositions(t = {}) {
          t.boundaries = this
          const e = new La(t)
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
          return [new Ua(this.start, this.end)]
        }
        getTransformedByOperations(t) {
          const e = [new Ua(this.start, this.end)]
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
            new Ua(e, n)
          )
        }
        _getTransformedByMergeOperation(t) {
          if (this.start.isEqual(t.targetPosition) && this.end.isEqual(t.deletionPosition)) return new Ua(this.start)
          let e = this.start._getTransformedByMergeOperation(t),
            n = this.end._getTransformedByMergeOperation(t)
          return (
            e.root != n.root && (n = this.end.getShiftedBy(-1)),
            e.isAfter(n)
              ? (t.sourcePosition.isBefore(t.targetPosition)
                  ? ((e = Wa._createAt(n)), (e.offset = 0))
                  : (t.deletionPosition.isEqual(e) || (n = t.deletionPosition), (e = t.targetPosition)),
                new Ua(e, n))
              : new Ua(e, n)
          )
        }
        _getTransformedByInsertion(t, e, n = !1) {
          if (n && this.containsPosition(t))
            return [new Ua(this.start, t), new Ua(t.getShiftedBy(e), this.end._getTransformedByInsertion(t, e))]
          {
            const n = new Ua(this.start, this.end)
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
            return [new Ua(i)]
          }
          const s = Ua._createFromPositionAndShift(t, n),
            o = e._getTransformedByDeletion(t, n)
          if (this.containsPosition(e) && !i && (s.containsPosition(this.start) || s.containsPosition(this.end))) {
            const i = this.start._getTransformedByMove(t, e, n),
              s = this.end._getTransformedByMove(t, e, n)
            return [new Ua(i, s)]
          }
          let r
          const a = this.getDifference(s)
          let l = null
          const c = this.getIntersection(s)
          if (
            (1 == a.length
              ? (l = new Ua(a[0].start._getTransformedByDeletion(t, n), a[0].end._getTransformedByDeletion(t, n)))
              : 2 == a.length && (l = new Ua(this.start, this.end._getTransformedByDeletion(t, n))),
            (r = l ? l._getTransformedByInsertion(o, n, null !== c || i) : []),
            c)
          ) {
            const t = new Ua(c.start._getCombined(s.start, o), c.end._getCombined(s.start, o))
            2 == r.length ? r.splice(1, 0, t) : r.push(t)
          }
          return r
        }
        _getTransformedByDeletion(t, e) {
          let n = this.start._getTransformedByDeletion(t, e),
            i = this.end._getTransformedByDeletion(t, e)
          return null == n && null == i ? null : (null == n && (n = t), null == i && (i = t), new Ua(n, i))
        }
        static _createFromPositionAndShift(t, e) {
          const n = t,
            i = t.getShiftedBy(e)
          return e > 0 ? new this(n, i) : new this(i, n)
        }
        static _createIn(t) {
          return new this(Wa._createAt(t, 0), Wa._createAt(t, t.maxOffset))
        }
        static _createOn(t) {
          return this._createFromPositionAndShift(Wa._createBefore(t), t.offsetSize)
        }
        static _createFromRanges(t) {
          if (0 === t.length) throw new l('range-create-from-ranges-empty-array', null)
          if (1 == t.length) return t[0].clone()
          const e = t[0]
          t.sort((t, e) => (t.start.isAfter(e.start) ? 1 : -1))
          const n = t.indexOf(e),
            i = new this(e.start, e.end)
          if (n > 0) for (let e = n - 1; t[e].end.isEqual(i.start); e++) i.start = Wa._createAt(t[e].start)
          for (let e = n + 1; e < t.length && t[e].start.isEqual(i.end); e++) i.end = Wa._createAt(t[e].end)
          return i
        }
        static fromJSON(t, e) {
          return new this(Wa.fromJSON(t.start, e), Wa.fromJSON(t.end, e))
        }
      }
      Ua.prototype.is = function (t) {
        return 'range' === t || 'model:range' === t
      }
      class Ha extends w {
        constructor() {
          super(),
            (this._modelToViewMapping = new WeakMap()),
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
                  throw new l('mapping-model-position-view-parent-not-found', this, { modelPosition: e.modelPosition })
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
                e.modelPosition = Wa._createAt(i, s)
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
          return new Ua(this.toModelPosition(t.start), this.toModelPosition(t.end))
        }
        toViewRange(t) {
          return new js(this.toViewPosition(t.start), this.toViewPosition(t.end))
        }
        toModelPosition(t) {
          const e = { viewPosition: t, mapper: this }
          return this.fire('viewToModelPosition', e), e.modelPosition
        }
        toViewPosition(t, e = {}) {
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
          if (t.is('$text')) return new Ls(t, e)
          for (; s < e; ) (n = t.getChild(o)), (i = this.getModelLength(n)), (s += i), o++
          return s == e ? this._moveViewPositionToTextNode(new Ls(t, o)) : this.findPositionIn(n, e - (s - i))
        }
        _moveViewPositionToTextNode(t) {
          const e = t.nodeBefore,
            n = t.nodeAfter
          return e instanceof Si ? new Ls(e, e.data.length) : n instanceof Si ? new Ls(n, 0) : t
        }
      }
      class Ka {
        constructor() {
          ;(this._consumable = new Map()), (this._textProxyRegistry = new Map())
        }
        add(t, e) {
          ;(e = Ga(e)),
            t instanceof Ba && (t = this._getSymbolForTextProxy(t)),
            this._consumable.has(t) || this._consumable.set(t, new Map()),
            this._consumable.get(t).set(e, !0)
        }
        consume(t, e) {
          return (
            (e = Ga(e)),
            t instanceof Ba && (t = this._getSymbolForTextProxy(t)),
            !!this.test(t, e) && (this._consumable.get(t).set(e, !1), !0)
          )
        }
        test(t, e) {
          ;(e = Ga(e)), t instanceof Ba && (t = this._getSymbolForTextProxy(t))
          const n = this._consumable.get(t)
          if (void 0 === n) return null
          const i = n.get(e)
          return void 0 === i ? null : i
        }
        revert(t, e) {
          ;(e = Ga(e)), t instanceof Ba && (t = this._getSymbolForTextProxy(t))
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
          if (e.length) throw new l('conversion-model-consumable-not-consumed', null, { items: e })
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
      function Ga(t) {
        const e = t.split(':')
        return 'insert' == e[0]
          ? e[0]
          : 'addMarker' == e[0] || 'removeMarker' == e[0]
          ? t
          : e.length > 1
          ? e[0] + ':' + e[1]
          : e[0]
      }
      class Ja extends w {
        constructor(t) {
          super(), (this._conversionApi = { dispatcher: this, ...t }), (this._firedEventsMap = new WeakMap())
        }
        convertChanges(t, e, n) {
          const i = this._createConversionApi(n, t.getRefreshedItems())
          for (const e of t.getMarkersToRemove()) this._convertMarkerRemove(e.name, e.range, i)
          const s = this._reduceChanges(t.getChanges())
          for (const t of s)
            'insert' === t.type
              ? this._convertInsert(Ua._createFromPositionAndShift(t.position, t.length), i)
              : 'reinsert' === t.type
              ? this._convertReinsert(Ua._createFromPositionAndShift(t.position, t.length), i)
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
              if (!Ya(t.getFirstPosition(), e, s.mapper)) continue
              const i = { item: t, markerName: e.name, markerRange: n }
              s.consumable.test(t, 'addMarker:' + e.name) && this.fire(`addMarker:${e.name}`, i, s)
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
                this.fire(`attribute:${n.attributeKey}:$text`, n, s)
            }
          }
        }
        _convertInsert(t, e, n = {}) {
          n.doNotAddConsumables || this._addConsumablesForInsert(e.consumable, Array.from(t))
          for (const n of Array.from(t.getWalker({ shallow: !0 })).map(Xa)) this._testAndFire('insert', n, e)
        }
        _convertRemove(t, e, n, i) {
          this.fire(`remove:${n}`, { position: t, length: e }, i)
        }
        _convertAttribute(t, e, n, i, s) {
          this._addConsumablesForRange(s.consumable, t, `attribute:${e}`)
          for (const o of t) {
            const t = {
              item: o.item,
              range: Ua._createFromPositionAndShift(o.previousPosition, o.length),
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
          for (const t of n.map(Xa)) this._testAndFire('insert', { ...t, reconversion: !0 }, e)
        }
        _convertMarkerAdd(t, e, n) {
          if ('$graveyard' == e.root.rootName) return
          const i = `addMarker:${t}`
          if (
            (n.consumable.add(e, i), this.fire(i, { markerName: t, markerRange: e }, n), n.consumable.consume(e, i))
          ) {
            this._addConsumablesForRange(n.consumable, e, i)
            for (const s of e.getItems()) {
              if (!n.consumable.test(s, i)) continue
              const o = { item: s, range: Ua._createOn(s), markerName: t, markerRange: e }
              this.fire(i, o, n)
            }
          }
        }
        _convertMarkerRemove(t, e, n) {
          '$graveyard' != e.root.rootName && this.fire(`removeMarker:${t}`, { markerName: t, markerRange: e }, n)
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
              const n = e.item.is('element') ? e.item.name : '$text'
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
          const n = { item: t, range: Ua._createOn(t) }
          for (const t of n.item.getAttributeKeys())
            (n.attributeKey = t),
              (n.attributeOldValue = null),
              (n.attributeNewValue = n.item.getAttribute(t)),
              this._testAndFire(`attribute:${t}`, n, e)
        }
        _createConversionApi(t, e = new Set(), n = {}) {
          const i = {
            ...this._conversionApi,
            consumable: new Ka(),
            writer: t,
            options: n,
            convertItem: t => this._convertInsert(Ua._createOn(t), i),
            convertChildren: t => this._convertInsert(Ua._createIn(t), i, { doNotAddConsumables: !0 }),
            convertAttributes: t => this._testAndFireAddAttributes(t, i),
            canReuseView: t => !e.has(i.mapper.toModelElement(t)),
          }
          return this._firedEventsMap.set(i, new Map()), i
        }
      }
      function Ya(t, e, n) {
        const i = e.getRange(),
          s = Array.from(t.getAncestors())
        s.shift(), s.reverse()
        return !s.some(t => {
          if (i.containsItem(t)) {
            return !!n.toViewElement(t).getCustomProperty('addHighlight')
          }
        })
      }
      function Xa(t) {
        return { item: t.item, range: Ua._createFromPositionAndShift(t.previousPosition, t.length) }
      }
      class Za extends _(Ma) {
        constructor(...t) {
          super(),
            (this._lastRangeBackward = !1),
            (this._ranges = []),
            (this._attrs = new Map()),
            t.length && this.setTo(...t)
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
          for (const t of this._ranges) yield new Ua(t.start, t.end)
        }
        getFirstRange() {
          let t = null
          for (const e of this._ranges) (t && !e.start.isBefore(t.start)) || (t = e)
          return t ? new Ua(t.start, t.end) : null
        }
        getLastRange() {
          let t = null
          for (const e of this._ranges) (t && !e.end.isAfter(t.end)) || (t = e)
          return t ? new Ua(t.start, t.end) : null
        }
        getFirstPosition() {
          const t = this.getFirstRange()
          return t ? t.start.clone() : null
        }
        getLastPosition() {
          const t = this.getLastRange()
          return t ? t.end.clone() : null
        }
        setTo(...t) {
          let [e, n, i] = t
          if (('object' == typeof n && ((i = n), (n = void 0)), null === e)) this._setRanges([])
          else if (e instanceof Za) this._setRanges(e.getRanges(), e.isBackward)
          else if (e && 'function' == typeof e.getRanges) this._setRanges(e.getRanges(), e.isBackward)
          else if (e instanceof Ua) this._setRanges([e], !!i && !!i.backward)
          else if (e instanceof Wa) this._setRanges([new Ua(e)])
          else if (e instanceof Na) {
            const t = !!i && !!i.backward
            let s
            if ('in' == n) s = Ua._createIn(e)
            else if ('on' == n) s = Ua._createOn(e)
            else {
              if (void 0 === n) throw new l('model-selection-setto-required-second-parameter', [this, e])
              s = new Ua(Wa._createAt(e, n))
            }
            this._setRanges([s], t)
          } else {
            if (!fi(e)) throw new l('model-selection-setto-not-selectable', [this, e])
            this._setRanges(e, i && !!i.backward)
          }
        }
        _setRanges(t, e = !1) {
          const n = Array.from(t),
            i = n.some(e => {
              if (!(e instanceof Ua)) throw new l('model-selection-set-ranges-not-range', [this, t])
              return this._ranges.every(t => !t.isEqual(e))
            })
          ;(n.length !== this._ranges.length || i) &&
            (this._replaceAllRanges(n),
            (this._lastRangeBackward = !!e),
            this.fire('change:range', { directChange: !0 }))
        }
        setFocus(t, e) {
          if (null === this.anchor) throw new l('model-selection-setfocus-no-ranges', [this, t])
          const n = Wa._createAt(t, e)
          if ('same' == n.compareWith(this.focus)) return
          const i = this.anchor
          this._ranges.length && this._popRange(),
            'before' == n.compareWith(i)
              ? (this._pushRange(new Ua(n, i)), (this._lastRangeBackward = !0))
              : (this._pushRange(new Ua(i, n)), (this._lastRangeBackward = !1)),
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
        *getSelectedBlocks() {
          const t = new WeakSet()
          for (const e of this.getRanges()) {
            const n = el(e.start, t)
            n && nl(n, e) && (yield n)
            for (const n of e.getWalker()) {
              const i = n.item
              'elementEnd' == n.type && tl(i, t, e) && (yield i)
            }
            const i = el(e.end, t)
            i && !e.end.isTouching(Wa._createAt(i, 0)) && nl(i, e) && (yield i)
          }
        }
        containsEntireContent(t = this.anchor.root) {
          const e = Wa._createAt(t, 0),
            n = Wa._createAt(t, 'end')
          return e.isTouching(this.getFirstPosition()) && n.isTouching(this.getLastPosition())
        }
        _pushRange(t) {
          this._checkRange(t), this._ranges.push(new Ua(t.start, t.end))
        }
        _checkRange(t) {
          for (let e = 0; e < this._ranges.length; e++)
            if (t.isIntersecting(this._ranges[e]))
              throw new l('model-selection-range-intersects', [this, t], {
                addedRange: t,
                intersectingRange: this._ranges[e],
              })
        }
        _replaceAllRanges(t) {
          this._removeAllRanges()
          for (const e of t) this._pushRange(e)
        }
        _removeAllRanges() {
          for (; this._ranges.length > 0; ) this._popRange()
        }
        _popRange() {
          this._ranges.pop()
        }
      }
      function Qa(t, e) {
        return !e.has(t) && (e.add(t), t.root.document.model.schema.isBlock(t) && t.parent)
      }
      function tl(t, e, n) {
        return Qa(t, e) && nl(t, n)
      }
      function el(t, e) {
        const n = t.parent.root.document.model.schema,
          i = t.parent.getAncestors({ parentFirst: !0, includeSelf: !0 })
        let s = !1
        const o = i.find(t => !s && ((s = n.isLimit(t)), !s && Qa(t, e)))
        return i.forEach(t => e.add(t)), o
      }
      function nl(t, e) {
        const n = (function (t) {
          const e = t.root.document.model.schema
          let n = t.parent
          for (; n; ) {
            if (e.isBlock(n)) return n
            n = n.parent
          }
        })(t)
        if (!n) return !0
        return !e.containsRange(Ua._createOn(n), !0)
      }
      Za.prototype.is = function (t) {
        return 'selection' === t || 'model:selection' === t
      }
      class il extends _(Ua) {
        constructor(t, e) {
          super(t, e), sl.call(this)
        }
        detach() {
          this.stopListening()
        }
        toRange() {
          return new Ua(this.start, this.end)
        }
        static fromRange(t) {
          return new il(t.start, t.end)
        }
      }
      function sl() {
        this.listenTo(
          this.root.document.model,
          'applyOperation',
          (t, e) => {
            const n = e[0]
            n.isDocumentOperation && ol.call(this, n)
          },
          { priority: 'low' }
        )
      }
      function ol(t) {
        const e = this.getTransformedByOperation(t),
          n = Ua._createFromRanges(e),
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
      il.prototype.is = function (t) {
        return 'liveRange' === t || 'model:liveRange' === t || 'range' == t || 'model:range' === t
      }
      const rl = 'selection:'
      class al extends _(Ma) {
        constructor(t) {
          super(),
            (this._selection = new ll(t)),
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
          this._selection.updateMarkers(), this._selection._updateAttributes(!1)
        }
        observeMarkers(t) {
          this._selection.observeMarkers(t)
        }
        _setFocus(t, e) {
          this._selection.setFocus(t, e)
        }
        _setTo(...t) {
          this._selection.setTo(...t)
        }
        _setAttribute(t, e) {
          this._selection.setAttribute(t, e)
        }
        _removeAttribute(t) {
          this._selection.removeAttribute(t)
        }
        _getStoredAttributes() {
          return this._selection.getStoredAttributes()
        }
        _overrideGravity() {
          return this._selection.overrideGravity()
        }
        _restoreGravity(t) {
          this._selection.restoreGravity(t)
        }
        static _getStoreAttributeKey(t) {
          return rl + t
        }
        static _isStoreAttributeKey(t) {
          return t.startsWith(rl)
        }
      }
      al.prototype.is = function (t) {
        return 'selection' === t || 'model:selection' == t || 'documentSelection' == t || 'model:documentSelection' == t
      }
      class ll extends Za {
        constructor(t) {
          super(),
            (this.markers = new mi({ idProperty: 'name' })),
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
              this._validateSelectionRanges(this.getRanges())
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
                      const e = Array.from(n.getAttributeKeys()).filter(t => t.startsWith(rl))
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
        setTo(...t) {
          super.setTo(...t), this._updateAttributes(!0), this.updateMarkers()
        }
        setFocus(t, e) {
          super.setFocus(t, e), this._updateAttributes(!0), this.updateMarkers()
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
            throw new l('document-selection-gravity-wrong-restore', this, { uid: t })
          this._overriddenGravityRegister.delete(t), this.isGravityOverridden || this._updateAttributes(!0)
        }
        observeMarkers(t) {
          this._observedMarkers.add(t), this.updateMarkers()
        }
        _replaceAllRanges(t) {
          this._validateSelectionRanges(t), super._replaceAllRanges(t)
        }
        _popRange() {
          this._ranges.pop().detach()
        }
        _pushRange(t) {
          const e = this._prepareRange(t)
          e && this._ranges.push(e)
        }
        _validateSelectionRanges(t) {
          for (const e of t)
            if (!this._document._validateSelectionRange(e))
              throw new l('document-selection-wrong-position', this, { range: e })
        }
        _prepareRange(t) {
          if ((this._checkRange(t), t.root == this._document.graveyard)) return
          const e = il.fromRange(t)
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
        updateMarkers() {
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
          const e = Oi(this._getSurroundingAttributes()),
            n = Oi(this.getAttributes())
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
        *getStoredAttributes() {
          const t = this.getFirstPosition().parent
          if (this.isCollapsed && t.isEmpty)
            for (const e of t.getAttributeKeys())
              if (e.startsWith(rl)) {
                const n = e.substr(rl.length)
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
            if ((this.isGravityOverridden || (n = cl(i)), n || (n = cl(s)), !this.isGravityOverridden && !n)) {
              let t = i
              for (; t && !e.isInline(t) && !n; ) (t = t.previousSibling), (n = cl(t))
            }
            if (!n) {
              let t = s
              for (; t && !e.isInline(t) && !n; ) (t = t.nextSibling), (n = cl(t))
            }
            n || (n = this.getStoredAttributes())
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
      function cl(t) {
        return t instanceof Ba || t instanceof Fa ? t.getAttributes() : null
      }
      class hl {
        constructor(t) {
          this._dispatchers = t
        }
        add(t) {
          for (const e of this._dispatchers) t(e)
          return this
        }
      }
      const dl = function (t) {
        return ai(t, 5)
      }
      class ul extends hl {
        elementToElement(t) {
          return this.add(
            (function (t) {
              const e = gl(t.model),
                n = pl(t.view, 'container')
              e.attributes.length && (e.children = !0)
              return i => {
                i.on(
                  `insert:${e.name}`,
                  (function (t, e = Al) {
                    return (n, i, s) => {
                      if (!e(i.item, s.consumable, { preflight: !0 })) return
                      const o = t(i.item, s, i)
                      if (!o) return
                      e(i.item, s.consumable)
                      const r = s.mapper.toViewPosition(i.range.start)
                      s.mapper.bindElements(i.item, o),
                        s.writer.insert(r, o),
                        s.convertAttributes(i.item),
                        Pl(o, i.item.getChildren(), s, { reconversion: i.reconversion })
                    }
                  })(n, vl(e)),
                  { priority: t.converterPriority || 'normal' }
                ),
                  (e.children || e.attributes.length) && i.on('reduceChanges', yl(e), { priority: 'low' })
              }
            })(t)
          )
        }
        elementToStructure(t) {
          return this.add(
            (function (t) {
              const e = gl(t.model),
                n = pl(t.view, 'container')
              return (
                (e.children = !0),
                i => {
                  if (i._conversionApi.schema.checkChild(e.name, '$text'))
                    throw new l('conversion-element-to-structure-disallowed-text', i, { elementName: e.name })
                  var s, o
                  i.on(
                    `insert:${e.name}`,
                    ((s = n),
                    (o = vl(e)),
                    (t, e, n) => {
                      if (!o(e.item, n.consumable, { preflight: !0 })) return
                      const i = new Map()
                      n.writer._registerSlotFactory(
                        (function (t, e, n) {
                          return (i, s = 'children') => {
                            const o = i.createContainerElement('$slot')
                            let r = null
                            if ('children' === s) r = Array.from(t.getChildren())
                            else {
                              if ('function' != typeof s)
                                throw new l('conversion-slot-mode-unknown', n.dispatcher, { modeOrFilter: s })
                              r = Array.from(t.getChildren()).filter(t => s(t))
                            }
                            return e.set(o, r), o
                          }
                        })(e.item, i, n)
                      )
                      const r = s(e.item, n, e)
                      if ((n.writer._clearSlotFactory(), !r)) return
                      !(function (t, e, n) {
                        const i = Array.from(e.values()).flat(),
                          s = new Set(i)
                        if (s.size != i.length)
                          throw new l('conversion-slot-filter-overlap', n.dispatcher, { element: t })
                        if (s.size != t.childCount)
                          throw new l('conversion-slot-filter-incomplete', n.dispatcher, { element: t })
                      })(e.item, i, n),
                        o(e.item, n.consumable)
                      const a = n.mapper.toViewPosition(e.range.start)
                      n.mapper.bindElements(e.item, r),
                        n.writer.insert(a, r),
                        n.convertAttributes(e.item),
                        (function (t, e, n, i) {
                          n.mapper.on('modelToViewPosition', r, { priority: 'highest' })
                          let s = null,
                            o = null
                          for ([s, o] of e)
                            Pl(t, o, n, i),
                              n.writer.move(n.writer.createRangeIn(s), n.writer.createPositionBefore(s)),
                              n.writer.remove(s)
                          function r(t, e) {
                            const n = e.modelPosition.nodeAfter,
                              i = o.indexOf(n)
                            i < 0 || (e.viewPosition = e.mapper.findPositionIn(s, i))
                          }
                          n.mapper.off('modelToViewPosition', r)
                        })(r, i, n, { reconversion: e.reconversion })
                    }),
                    { priority: t.converterPriority || 'normal' }
                  ),
                    i.on('reduceChanges', yl(e), { priority: 'low' })
                }
              )
            })(t)
          )
        }
        attributeToElement(t) {
          return this.add(
            (function (t) {
              let e = (t = dl(t)).model
              'string' == typeof e && (e = { key: e })
              let n = `attribute:${e.key}`
              e.name && (n += ':' + e.name)
              if (e.values) for (const n of e.values) t.view[n] = pl(t.view[n], 'attribute')
              else t.view = pl(t.view, 'attribute')
              const i = _l(t)
              return e => {
                e.on(
                  n,
                  (function (t) {
                    return (e, n, i) => {
                      if (!i.consumable.test(n.item, e.name)) return
                      const s = t(n.attributeOldValue, i, n),
                        o = t(n.attributeNewValue, i, n)
                      if (!s && !o) return
                      i.consumable.consume(n.item, e.name)
                      const r = i.writer,
                        a = r.document.selection
                      if (n.item instanceof Za || n.item instanceof al) r.wrap(a.getFirstRange(), o)
                      else {
                        let t = i.mapper.toViewRange(n.range)
                        null !== n.attributeOldValue && s && (t = r.unwrap(t, s)),
                          null !== n.attributeNewValue && o && r.wrap(t, o)
                      }
                    }
                  })(i),
                  { priority: t.converterPriority || 'normal' }
                )
              }
            })(t)
          )
        }
        attributeToAttribute(t) {
          return this.add(
            (function (t) {
              let e = (t = dl(t)).model
              'string' == typeof e && (e = { key: e })
              let n = `attribute:${e.key}`
              e.name && (n += ':' + e.name)
              if (e.values) for (const n of e.values) t.view[n] = wl(t.view[n])
              else t.view = wl(t.view)
              const i = _l(t)
              return e => {
                var s
                e.on(
                  n,
                  ((s = i),
                  (t, e, n) => {
                    if (!n.consumable.test(e.item, t.name)) return
                    const i = s(e.attributeOldValue, n, e),
                      o = s(e.attributeNewValue, n, e)
                    if (!i && !o) return
                    n.consumable.consume(e.item, t.name)
                    const r = n.mapper.toViewElement(e.item),
                      a = n.writer
                    if (!r) throw new l('conversion-attribute-to-attribute-on-text', n.dispatcher, e)
                    if (null !== e.attributeOldValue && i)
                      if ('class' == i.key) {
                        const t = pi(i.value)
                        for (const e of t) a.removeClass(e, r)
                      } else if ('style' == i.key) {
                        const t = Object.keys(i.value)
                        for (const e of t) a.removeStyle(e, r)
                      } else a.removeAttribute(i.key, r)
                    if (null !== e.attributeNewValue && o)
                      if ('class' == o.key) {
                        const t = pi(o.value)
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
              const e = pl(t.view, 'ui')
              return n => {
                var i
                n.on(
                  `addMarker:${t.model}`,
                  ((i = e),
                  (t, e, n) => {
                    e.isOpening = !0
                    const s = i(e, n)
                    e.isOpening = !1
                    const o = i(e, n)
                    if (!s || !o) return
                    const r = e.markerRange
                    if (r.isCollapsed && !n.consumable.consume(r, t.name)) return
                    for (const e of r) if (!n.consumable.consume(e.item, t.name)) return
                    const a = n.mapper,
                      l = n.writer
                    l.insert(a.toViewPosition(r.start), s),
                      n.mapper.bindElementToMarker(s, e.markerName),
                      r.isCollapsed ||
                        (l.insert(a.toViewPosition(r.end), o), n.mapper.bindElementToMarker(o, e.markerName)),
                      t.stop()
                  }),
                  { priority: t.converterPriority || 'normal' }
                ),
                  n.on(
                    `removeMarker:${t.model}`,
                    (t, e, n) => {
                      const i = n.mapper.markerNameToElements(e.markerName)
                      if (i) {
                        for (const t of i)
                          n.mapper.unbindElementFromMarkerName(t, e.markerName),
                            n.writer.clear(n.writer.createRangeOn(t), t)
                        n.writer.clearClonedElementsGroup(e.markerName), t.stop()
                      }
                    },
                    { priority: t.converterPriority || 'normal' }
                  )
              }
            })(t)
          )
        }
        markerToHighlight(t) {
          return this.add(
            (function (t) {
              return e => {
                var n
                e.on(
                  `addMarker:${t.model}`,
                  ((n = t.view),
                  (t, e, i) => {
                    if (!e.item) return
                    if (!(e.item instanceof Za || e.item instanceof al || e.item.is('$textProxy'))) return
                    const s = bl(n, e, i)
                    if (!s) return
                    if (!i.consumable.consume(e.item, t.name)) return
                    const o = i.writer,
                      r = fl(o, s),
                      a = o.document.selection
                    if (e.item instanceof Za || e.item instanceof al) o.wrap(a.getFirstRange(), r)
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
                    `addMarker:${t.model}`,
                    (function (t) {
                      return (e, n, i) => {
                        if (!n.item) return
                        if (!(n.item instanceof Va)) return
                        const s = bl(t, n, i)
                        if (!s) return
                        if (!i.consumable.test(n.item, e.name)) return
                        const o = i.mapper.toViewElement(n.item)
                        if (o && o.getCustomProperty('addHighlight')) {
                          i.consumable.consume(n.item, e.name)
                          for (const t of Ua._createIn(n.item)) i.consumable.consume(t.item, e.name)
                          o.getCustomProperty('addHighlight')(o, s, i.writer),
                            i.mapper.bindElementToMarker(o, n.markerName)
                        }
                      }
                    })(t.view),
                    { priority: t.converterPriority || 'normal' }
                  ),
                  e.on(
                    `removeMarker:${t.model}`,
                    (function (t) {
                      return (e, n, i) => {
                        if (n.markerRange.isCollapsed) return
                        const s = bl(t, n, i)
                        if (!s) return
                        const o = fl(i.writer, s),
                          r = i.mapper.markerNameToElements(n.markerName)
                        if (r) {
                          for (const t of r)
                            if ((i.mapper.unbindElementFromMarkerName(t, n.markerName), t.is('attributeElement')))
                              i.writer.unwrap(i.writer.createRangeOn(t), o)
                            else {
                              t.getCustomProperty('removeHighlight')(t, s.id, i.writer)
                            }
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
              const e = (t = dl(t)).model
              let n = t.view
              n || (n = n => ({ group: e, name: n.substr(t.model.length + 1) }))
              return i => {
                var s
                i.on(
                  `addMarker:${e}`,
                  ((s = n),
                  (t, e, n) => {
                    const i = s(e.markerName, n)
                    if (!i) return
                    const o = e.markerRange
                    n.consumable.consume(o, t.name) && (ml(o, !1, n, e, i), ml(o, !0, n, e, i), t.stop())
                  }),
                  { priority: t.converterPriority || 'normal' }
                ),
                  i.on(
                    `removeMarker:${e}`,
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
                    })(n),
                    { priority: t.converterPriority || 'normal' }
                  )
              }
            })(t)
          )
        }
      }
      function fl(t, e) {
        const n = t.createAttributeElement('span', e.attributes)
        return (
          e.classes && n._addClass(e.classes),
          'number' == typeof e.priority && (n._priority = e.priority),
          (n._id = e.id),
          n
        )
      }
      function ml(t, e, n, i, s) {
        const o = e ? t.start : t.end,
          r = o.nodeAfter && o.nodeAfter.is('element') ? o.nodeAfter : null,
          a = o.nodeBefore && o.nodeBefore.is('element') ? o.nodeBefore : null
        if (r || a) {
          let t, o
          ;(e && r) || (!e && !a) ? ((t = r), (o = !0)) : ((t = a), (o = !1))
          const l = n.mapper.toViewElement(t)
          if (l)
            return void (function (t, e, n, i, s, o) {
              const r = `data-${o.group}-${e ? 'start' : 'end'}-${n ? 'before' : 'after'}`,
                a = t.hasAttribute(r) ? t.getAttribute(r).split(',') : []
              a.unshift(o.name), i.writer.setAttribute(r, a.join(','), t), i.mapper.bindElementToMarker(t, s.markerName)
            })(l, e, o, n, i, s)
        }
        !(function (t, e, n, i, s) {
          const o = `${s.group}-${e ? 'start' : 'end'}`,
            r = s.name ? { name: s.name } : null,
            a = n.writer.createUIElement(o, r)
          n.writer.insert(t, a), n.mapper.bindElementToMarker(a, i.markerName)
        })(n.mapper.toViewPosition(o), e, n, i, s)
      }
      function gl(t) {
        return (
          'string' == typeof t && (t = { name: t }),
          t.attributes ? Array.isArray(t.attributes) || (t.attributes = [t.attributes]) : (t.attributes = []),
          (t.children = !!t.children),
          t
        )
      }
      function pl(t, e) {
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
                  const e = { priority: t.priority || Qs.DEFAULT_PRIORITY }
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
      function _l(t) {
        return t.model.values
          ? (e, n, i) => {
              const s = t.view[e]
              return s ? s(e, n, i) : null
            }
          : t.view
      }
      function wl(t) {
        return 'string' == typeof t
          ? e => ({ key: t, value: e })
          : 'object' == typeof t
          ? t.value
            ? () => t
            : e => ({ key: t.key, value: e })
          : t
      }
      function bl(t, e, n) {
        const i = 'function' == typeof t ? t(e, n) : t
        return i ? (i.priority || (i.priority = 10), i.id || (i.id = e.markerName), i) : null
      }
      function yl(t) {
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
            const s = 'attribute' == t.type ? t.range.start.nodeAfter : t.position.parent
            if (s && e(s, t)) {
              if (!n.reconvertedElements.has(s)) {
                n.reconvertedElements.add(s)
                const t = Wa._createBefore(s)
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
      function vl(t) {
        return (e, n, i = {}) => {
          const s = ['insert']
          for (const n of t.attributes) e.hasAttribute(n) && s.push(`attribute:${n}`)
          return !!s.every(t => n.test(e, t)) && (i.preflight || s.forEach(t => n.consume(e, t)), !0)
        }
      }
      function Pl(t, e, n, i) {
        for (const s of e) kl(t.root, s, n, i) || n.convertItem(s)
      }
      function kl(t, e, n, i) {
        const { writer: s, mapper: o } = n
        if (!i.reconversion) return !1
        const r = o.toViewElement(e)
        return (
          !(!r || r.root == t) &&
          !!n.canReuseView(r) &&
          (s.move(s.createRangeOn(r), o.toViewPosition(Wa._createBefore(e))), !0)
        )
      }
      function Al(t, e, { preflight: n } = {}) {
        return n ? e.test(t, 'insert') : e.consume(t, 'insert')
      }
      function Cl(t) {
        const { schema: e, document: n } = t.model
        for (const i of n.getRootNames()) {
          const s = n.getRoot(i)
          if (s.isEmpty && !e.checkChild(s, '$text') && e.checkChild(s, 'paragraph'))
            return t.insertElement('paragraph', s), !0
        }
        return !1
      }
      function El(t, e, n) {
        const i = n.createContext(t)
        return !!n.checkChild(i, 'paragraph') && !!n.checkChild(i.push('paragraph'), e)
      }
      function Tl(t, e) {
        const n = e.createElement('paragraph')
        return e.insert(n, t), e.createPositionAt(n, 0)
      }
      class xl extends hl {
        elementToElement(t) {
          return this.add(Sl(t))
        }
        elementToAttribute(t) {
          return this.add(
            (function (t) {
              Il((t = dl(t)))
              const e = Ml(t, !1),
                n = Rl(t.view),
                i = n ? `element:${n}` : 'element'
              return n => {
                n.on(i, e, { priority: t.converterPriority || 'low' })
              }
            })(t)
          )
        }
        attributeToAttribute(t) {
          return this.add(
            (function (t) {
              t = dl(t)
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
              Il(t, e)
              const n = Ml(t, !0)
              return e => {
                e.on('element', n, { priority: t.converterPriority || 'low' })
              }
            })(t)
          )
        }
        elementToMarker(t) {
          return this.add(
            (function (t) {
              const e = (function (t) {
                return (e, n) => {
                  const i = 'string' == typeof t ? t : t(e, n)
                  return n.writer.createElement('$marker', { 'data-name': i })
                }
              })(t.model)
              return Sl({ ...t, model: e })
            })(t)
          )
        }
        dataToMarker(t) {
          return this.add(
            (function (t) {
              ;(t = dl(t)).model || (t.model = e => (e ? t.view + ':' + e : t.view))
              const e = { view: t.view, model: t.model },
                n = Ol(Nl(e, 'start')),
                i = Ol(Nl(e, 'end'))
              return s => {
                s.on(`element:${t.view}-start`, n, { priority: t.converterPriority || 'normal' }),
                  s.on(`element:${t.view}-end`, i, { priority: t.converterPriority || 'normal' })
                const o = r.get('low'),
                  a = r.get('highest'),
                  l = r.get(t.converterPriority) / a
                s.on(
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
                  })(e),
                  { priority: o + l }
                )
              }
            })(t)
          )
        }
      }
      function Sl(t) {
        const e = Ol((t = dl(t))),
          n = Rl(t.view),
          i = n ? `element:${n}` : 'element'
        return n => {
          n.on(i, e, { priority: t.converterPriority || 'normal' })
        }
      }
      function Rl(t) {
        return 'string' == typeof t ? t : 'object' == typeof t && 'string' == typeof t.name ? t.name : null
      }
      function Ol(t) {
        const e = new Ii(t.view)
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
      function Il(t, e = null) {
        const n = null === e || (t => t.getAttribute(e)),
          i = 'object' != typeof t.model ? t.model : t.model.key,
          s = 'object' != typeof t.model || void 0 === t.model.value ? n : t.model.value
        t.model = { key: i, value: s }
      }
      function Ml(t, e) {
        const n = new Ii(t.view)
        return (i, s, o) => {
          if (!s.modelRange && e) return
          const r = n.match(s.viewItem)
          if (!r) return
          if (
            (!(function (t, e) {
              const n = 'function' == typeof t ? t(e) : t
              if ('object' == typeof n && !Rl(n)) return !1
              return !n.classes && !n.attributes && !n.styles
            })(t.view, s.viewItem)
              ? delete r.match.name
              : (r.match.name = !0),
            !o.consumable.test(s.viewItem, r.match))
          )
            return
          const a = t.model.key,
            l = 'function' == typeof t.model.value ? t.model.value(s.viewItem, o) : t.model.value
          if (null === l) return
          s.modelRange || Object.assign(s, o.convertChildren(s.viewItem, s.modelCursor))
          const c = (function (t, e, n, i) {
            let s = !1
            for (const o of Array.from(t.getItems({ shallow: n })))
              i.schema.checkAttribute(o, e.key) &&
                ((s = !0), o.hasAttribute(e.key) || i.writer.setAttribute(e.key, e.value, o))
            return s
          })(s.modelRange, { key: a, value: l }, e, o)
          c &&
            (o.consumable.test(s.viewItem, { name: !0 }) && (r.match.name = !0),
            o.consumable.consume(s.viewItem, r.match))
        }
      }
      function Nl(t, e) {
        return {
          view: `${t.view}-${e}`,
          model: (e, n) => {
            const i = e.getAttribute('name'),
              s = t.model(i, n)
            return n.writer.createElement('$marker', { 'data-name': s })
          },
        }
      }
      class Dl extends M {
        constructor(t, e) {
          super(),
            (this.model = t),
            (this.view = new Ia(e)),
            (this.mapper = new Ha()),
            (this.downcastDispatcher = new Ja({ mapper: this.mapper, schema: t.schema }))
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
                for (const t of i.getRanges()) s.push(n.mapper.toViewRange(t))
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
              const e = new Bs(this.view.document, t.name)
              return (e.rootName = t.rootName), this.mapper.bindElements(t, e), e
            })
        }
        destroy() {
          this.view.destroy(), this.stopListening()
        }
        reconvertMarker(t) {
          const e = 'string' == typeof t ? t : t.name,
            n = this.model.markers.get(e)
          if (!n) throw new l('editingcontroller-reconvertmarker-marker-not-exist', this, { markerName: e })
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
      class Fl {
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
          if (!n) throw new l('commandcollection-command-not-found', this, { commandName: t })
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
      class Bl {
        constructor() {
          this._consumables = new Map()
        }
        add(t, e) {
          let n
          t.is('$text') || t.is('documentFragment')
            ? this._consumables.set(t, !0)
            : (this._consumables.has(t)
                ? (n = this._consumables.get(t))
                : ((n = new Ll(t)), this._consumables.set(t, n)),
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
          if ((e || (e = new Bl()), t.is('$text'))) return e.add(t), e
          t.is('element') && e.add(t, Bl.consumablesFromElement(t)), t.is('documentFragment') && e.add(t)
          for (const n of t.getChildren()) e = Bl.createFrom(n, e)
          return e
        }
      }
      const Vl = ['attributes', 'classes', 'styles']
      class Ll {
        constructor(t) {
          ;(this.element = t),
            (this._canConsumeName = null),
            (this._consumables = { attributes: new Map(), styles: new Map(), classes: new Map() })
        }
        add(t) {
          t.name && (this._canConsumeName = !0)
          for (const e of Vl) e in t && this._add(e, t[e])
        }
        test(t) {
          if (t.name && !this._canConsumeName) return this._canConsumeName
          for (const e of Vl)
            if (e in t) {
              const n = this._test(e, t[e])
              if (!0 !== n) return n
            }
          return !0
        }
        consume(t) {
          t.name && (this._canConsumeName = !1)
          for (const e of Vl) e in t && this._consume(e, t[e])
        }
        revert(t) {
          t.name && (this._canConsumeName = !0)
          for (const e of Vl) e in t && this._revert(e, t[e])
        }
        _add(t, e) {
          const n = Pe(e) ? e : [e],
            i = this._consumables[t]
          for (const e of n) {
            if ('attributes' === t && ('class' === e || 'style' === e))
              throw new l('viewconsumable-invalid-attribute', this)
            if ((i.set(e, !0), 'styles' === t))
              for (const t of this.element.document.stylesProcessor.getRelatedStyles(e)) i.set(t, !0)
          }
        }
        _test(t, e) {
          const n = Pe(e) ? e : [e],
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
          const n = Pe(e) ? e : [e],
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
          const n = Pe(e) ? e : [e],
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
      class jl extends M {
        constructor() {
          super(),
            (this._sourceDefinitions = {}),
            (this._attributeProperties = {}),
            this.decorate('checkChild'),
            this.decorate('checkAttribute'),
            this.on(
              'checkAttribute',
              (t, e) => {
                e[0] = new Wl(e[0])
              },
              { priority: 'highest' }
            ),
            this.on(
              'checkChild',
              (t, e) => {
                ;(e[0] = new Wl(e[0])), (e[1] = this.getDefinition(e[1]))
              },
              { priority: 'highest' }
            )
        }
        register(t, e) {
          if (this._sourceDefinitions[t]) throw new l('schema-cannot-register-item-twice', this, { itemName: t })
          ;(this._sourceDefinitions[t] = [Object.assign({}, e)]), this._clearCache()
        }
        extend(t, e) {
          if (!this._sourceDefinitions[t]) throw new l('schema-cannot-extend-missing-item', this, { itemName: t })
          this._sourceDefinitions[t].push(Object.assign({}, e)), this._clearCache()
        }
        getDefinitions() {
          return this._compiledDefinitions || this._compile(), this._compiledDefinitions
        }
        getDefinition(t) {
          let e
          return (
            (e = 'string' == typeof t ? t : 'is' in t && (t.is('$text') || t.is('$textProxy')) ? '$text' : t.name),
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
        checkMerge(t, e) {
          if (t instanceof Wa) {
            const e = t.nodeBefore,
              n = t.nodeAfter
            if (!(e instanceof Va)) throw new l('schema-check-merge-no-element-before', this)
            if (!(n instanceof Va)) throw new l('schema-check-merge-no-element-after', this)
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
          if (t instanceof Wa) e = t.parent
          else {
            e = (t instanceof Ua ? [t] : Array.from(t.getRanges())).reduce((t, e) => {
              const n = e.getCommonAncestor()
              return t ? t.getCommonAncestor(n, { includeSelf: !0 }) : n
            }, null)
          }
          for (; !this.isLimit(e) && e.parent; ) e = e.parent
          return e
        }
        checkAttributeInSelection(t, e) {
          if (t.isCollapsed) {
            const n = [...t.getFirstPosition().getAncestors(), new Fa('', t.getAttributes())]
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
          if (this.checkChild(t, '$text')) return new Ua(t)
          let n, i
          const s =
            t
              .getAncestors()
              .reverse()
              .find(t => this.isLimit(t)) || t.root
          ;('both' != e && 'backward' != e) ||
            (n = new La({ boundaries: Ua._createIn(s), startPosition: t, direction: 'backward' })),
            ('both' != e && 'forward' != e) || (i = new La({ boundaries: Ua._createIn(s), startPosition: t }))
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
            if (i.type == e && this.isObject(i.item)) return Ua._createOn(i.item)
            if (this.checkChild(i.nextPosition, '$text')) return new Ua(i.nextPosition)
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
            if (n.is('$text')) tc(this, n, e)
            else {
              const t = Ua._createIn(n).getPositions()
              for (const n of t) {
                tc(this, n.nodeBefore || n.parent, e)
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
          return new Wl(t)
        }
        _clearCache() {
          this._compiledDefinitions = null
        }
        _compile() {
          const t = {},
            e = this._sourceDefinitions,
            n = Object.keys(e)
          for (const i of n) t[i] = $l(e[i], i)
          for (const e of n) zl(t, e)
          for (const e of n) ql(t, e)
          for (const e of n) Ul(t, e)
          for (const e of n) Hl(t, e), Kl(t, e)
          for (const e of n) Gl(t, e), Jl(t, e), Yl(t, e)
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
            s.is('element') && (yield* this._getValidRangesForRange(Ua._createIn(s), e)),
              this.checkAttribute(s, e) || (n.isEqual(i) || (yield new Ua(n, i)), (n = Wa._createAfter(s))),
              (i = Wa._createAfter(s))
          n.isEqual(i) || (yield new Ua(n, i))
        }
      }
      class Wl {
        constructor(t) {
          if (t instanceof Wl) return t
          let e
          ;(e = 'string' == typeof t ? [t] : Array.isArray(t) ? t : t.getAncestors({ includeSelf: !0 })),
            (this._items = e.map(Ql))
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
          const e = new Wl([t])
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
      function $l(t, e) {
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
              for (const i of t) e[i] = !!n[i]
            }
          })(t, n),
          Xl(t, n, 'allowIn'),
          Xl(t, n, 'allowContentOf'),
          Xl(t, n, 'allowWhere'),
          Xl(t, n, 'allowAttributes'),
          Xl(t, n, 'allowAttributesOf'),
          Xl(t, n, 'allowChildren'),
          Xl(t, n, 'inheritTypesFrom'),
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
      function zl(t, e) {
        const n = t[e]
        for (const i of n.allowChildren) {
          const n = t[i]
          n && n.allowIn.push(e)
        }
        n.allowChildren.length = 0
      }
      function ql(t, e) {
        for (const n of t[e].allowContentOf)
          if (t[n]) {
            Zl(t, n).forEach(t => {
              t.allowIn.push(e)
            })
          }
        delete t[e].allowContentOf
      }
      function Ul(t, e) {
        for (const n of t[e].allowWhere) {
          const i = t[n]
          if (i) {
            const n = i.allowIn
            t[e].allowIn.push(...n)
          }
        }
        delete t[e].allowWhere
      }
      function Hl(t, e) {
        for (const n of t[e].allowAttributesOf) {
          const i = t[n]
          if (i) {
            const n = i.allowAttributes
            t[e].allowAttributes.push(...n)
          }
        }
        delete t[e].allowAttributesOf
      }
      function Kl(t, e) {
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
      function Gl(t, e) {
        const n = t[e],
          i = n.allowIn.filter(e => t[e])
        n.allowIn = Array.from(new Set(i))
      }
      function Jl(t, e) {
        const n = t[e]
        for (const i of n.allowIn) {
          t[i].allowChildren.push(e)
        }
      }
      function Yl(t, e) {
        const n = t[e]
        n.allowAttributes = Array.from(new Set(n.allowAttributes))
      }
      function Xl(t, e, n) {
        for (const i of t) {
          const t = i[n]
          'string' == typeof t ? e[n].push(t) : Array.isArray(t) && e[n].push(...t)
        }
      }
      function Zl(t, e) {
        const n = t[e]
        return ((i = t), Object.keys(i).map(t => i[t])).filter(t => t.allowIn.includes(n.name))
        var i
      }
      function Ql(t) {
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
      function tc(t, e, n) {
        for (const i of e.getAttributeKeys()) t.checkAttribute(e, i) || n.removeAttribute(i, e)
      }
      class ec extends w {
        constructor(t) {
          super(),
            (this._splitParts = new Map()),
            (this._cursorParents = new Map()),
            (this._modelCursor = null),
            (this._emptyElementsToKeep = new Set()),
            (this.conversionApi = {
              ...t,
              consumable: null,
              writer: null,
              store: null,
              convertItem: (t, e) => this._convertItem(t, e),
              convertChildren: (t, e) => this._convertChildren(t, e),
              safeInsert: (t, e) => this._safeInsert(t, e),
              updateConversionResult: (t, e) => this._updateConversionResult(t, e),
              splitToAllowedParent: (t, e) => this._splitToAllowedParent(t, e),
              getSplitParts: t => this._getSplitParts(t),
              keepEmptyElement: t => this._keepEmptyElement(t),
            })
        }
        convert(t, e, n = ['$root']) {
          this.fire('viewCleanup', t),
            (this._modelCursor = (function (t, e) {
              let n
              for (const i of new Wl(t)) {
                const t = {}
                for (const e of i.getAttributeKeys()) t[e] = i.getAttribute(e)
                const s = e.createElement(i.name, t)
                n && e.insert(s, n), (n = Wa._createAt(s, 0))
              }
              return n
            })(n, e)),
            (this.conversionApi.writer = e),
            (this.conversionApi.consumable = Bl.createFrom(t)),
            (this.conversionApi.store = {})
          const { modelRange: i } = this._convertItem(t, this._modelCursor),
            s = e.createDocumentFragment()
          if (i) {
            this._removeEmptyElements()
            for (const t of Array.from(this._modelCursor.parent.getChildren())) e.append(t, s)
            s.markers = (function (t, e) {
              const n = new Set(),
                i = new Map(),
                s = Ua._createIn(t).getItems()
              for (const t of s) t.is('element', '$marker') && n.add(t)
              for (const t of n) {
                const n = t.getAttribute('data-name'),
                  s = e.createPositionBefore(t)
                i.has(n) ? (i.get(n).end = s.clone()) : i.set(n, new Ua(s.clone())), e.remove(t)
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
          const n = { viewItem: t, modelCursor: e, modelRange: null }
          if (
            (t.is('element')
              ? this.fire(`element:${t.name}`, n, this.conversionApi)
              : t.is('$text')
              ? this.fire('text', n, this.conversionApi)
              : this.fire('documentFragment', n, this.conversionApi),
            n.modelRange && !(n.modelRange instanceof Ua))
          )
            throw new l('view-conversion-dispatcher-incorrect-result', this)
          return { modelRange: n.modelRange, modelCursor: n.modelCursor }
        }
        _convertChildren(t, e) {
          let n = e.is('position') ? e : Wa._createAt(e, 0)
          const i = new Ua(n)
          for (const e of Array.from(t.getChildren())) {
            const t = this._convertItem(e, n)
            t.modelRange instanceof Ua && ((i.end = t.modelRange.end), (n = t.modelCursor))
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
          if (!s) return El(e, t, n) ? { position: Tl(e, i) } : null
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
      class nc {
        getHtml(t) {
          const e = document.implementation.createHTMLDocument('').createElement('div')
          return e.appendChild(t), e.innerHTML
        }
      }
      class ic {
        constructor(t) {
          ;(this.domParser = new DOMParser()),
            (this.domConverter = new lr(t, { renderingMode: 'data' })),
            (this.htmlWriter = new nc())
        }
        toData(t) {
          const e = this.domConverter.viewToDom(t)
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
      class sc extends w {
        constructor(t, e) {
          super(),
            (this.model = t),
            (this.mapper = new Ha()),
            (this.downcastDispatcher = new Ja({ mapper: this.mapper, schema: t.schema })),
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
            (this.upcastDispatcher = new ec({ schema: t.schema })),
            (this.viewDocument = new Zs(e)),
            (this.stylesProcessor = e),
            (this.htmlProcessor = new ic(this.viewDocument)),
            (this.processor = this.htmlProcessor),
            (this._viewWriter = new ko(this.viewDocument)),
            this.upcastDispatcher.on(
              'text',
              (t, e, { schema: n, consumable: i, writer: s }) => {
                let o = e.modelCursor
                if (!i.test(e.viewItem)) return
                if (!n.checkChild(o, '$text')) {
                  if (!El(o, '$text', n)) return
                  if (0 == e.viewItem.data.trim().length) return
                  o = Tl(o, s)
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
            M.prototype.decorate.call(this, 'init'),
            M.prototype.decorate.call(this, 'set'),
            M.prototype.decorate.call(this, 'get'),
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
                this.model.enqueueChange({ isUndoable: !1 }, Cl)
              },
              { priority: 'lowest' }
            )
        }
        get(t = {}) {
          const { rootName: e = 'main', trim: n = 'empty' } = t
          if (!this._checkIfRootsExists([e])) throw new l('datacontroller-get-non-existent-root', this)
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
          const s = Ua._createIn(t),
            o = new Po(n)
          this.mapper.bindElements(t, o)
          const r = t.is('documentFragment')
            ? t.markers
            : (function (t) {
                const e = [],
                  n = t.root.document
                if (!n) return new Map()
                const i = Ua._createIn(t)
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
          if (this.model.document.version) throw new l('datacontroller-init-document-not-empty', this)
          let e = {}
          if (('string' == typeof t ? (e.main = t) : (e = t), !this._checkIfRootsExists(Object.keys(e))))
            throw new l('datacontroller-init-non-existent-root', this)
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
            throw new l('datacontroller-set-non-existent-root', this)
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
      class oc {
        constructor(t, e) {
          ;(this._helpers = new Map()),
            (this._downcast = pi(t)),
            this._createConversionHelpers({ name: 'downcast', dispatchers: this._downcast, isDowncast: !0 }),
            (this._upcast = pi(e)),
            this._createConversionHelpers({ name: 'upcast', dispatchers: this._upcast, isDowncast: !1 })
        }
        addAlias(t, e) {
          const n = this._downcast.includes(e)
          if (!this._upcast.includes(e) && !n) throw new l('conversion-add-alias-dispatcher-not-registered', this)
          this._createConversionHelpers({ name: t, dispatchers: [e], isDowncast: n })
        }
        for(t) {
          if (!this._helpers.has(t)) throw new l('conversion-for-unknown-group', this)
          return this._helpers.get(t)
        }
        elementToElement(t) {
          this.for('downcast').elementToElement(t)
          for (const { model: e, view: n } of rc(t))
            this.for('upcast').elementToElement({ model: e, view: n, converterPriority: t.converterPriority })
        }
        attributeToElement(t) {
          this.for('downcast').attributeToElement(t)
          for (const { model: e, view: n } of rc(t))
            this.for('upcast').elementToAttribute({ view: n, model: e, converterPriority: t.converterPriority })
        }
        attributeToAttribute(t) {
          this.for('downcast').attributeToAttribute(t)
          for (const { model: e, view: n } of rc(t)) this.for('upcast').attributeToAttribute({ view: n, model: e })
        }
        _createConversionHelpers({ name: t, dispatchers: e, isDowncast: n }) {
          if (this._helpers.has(t)) throw new l('conversion-group-exists', this)
          const i = n ? new ul(e) : new xl(e)
          this._helpers.set(t, i)
        }
      }
      function* rc(t) {
        if (t.model.values)
          for (const e of t.model.values) {
            const n = { key: t.model.key, value: e },
              i = t.view[e],
              s = t.upcastAlso ? t.upcastAlso[e] : void 0
            yield* ac(n, i, s)
          }
        else yield* ac(t.model, t.view, t.upcastAlso)
      }
      function* ac(t, e, n) {
        if ((yield { model: t, view: e }, n)) for (const e of pi(n)) yield { model: t, view: e }
      }
      class lc {
        constructor(t = {}) {
          'string' == typeof t &&
            ((t = 'transparent' === t ? { isUndoable: !1 } : {}), c('batch-constructor-deprecated-string-type'))
          const { isUndoable: e = !0, isLocal: n = !0, isUndo: i = !1, isTyping: s = !1 } = t
          ;(this.operations = []), (this.isUndoable = e), (this.isLocal = n), (this.isUndo = i), (this.isTyping = s)
        }
        get type() {
          return c('batch-type-deprecated'), 'default'
        }
        get baseVersion() {
          for (const t of this.operations) if (null !== t.baseVersion) return t.baseVersion
          return null
        }
        addOperation(t) {
          return (t.batch = this), this.operations.push(t), t
        }
      }
      class cc {
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
          const e = t
          switch (e.type) {
            case 'insert':
              if (this._isInInsertedElement(e.position.parent)) return
              this._markInsert(e.position.parent, e.position.offset, e.nodes.maxOffset)
              break
            case 'addAttribute':
            case 'removeAttribute':
            case 'changeAttribute':
              for (const t of e.range.getItems({ shallow: !0 }))
                this._isInInsertedElement(t.parent) || this._markAttribute(t)
              break
            case 'remove':
            case 'move':
            case 'reinsert': {
              if (
                e.sourcePosition.isEqual(e.targetPosition) ||
                e.sourcePosition.getShiftedBy(e.howMany).isEqual(e.targetPosition)
              )
                return
              const t = this._isInInsertedElement(e.sourcePosition.parent),
                n = this._isInInsertedElement(e.targetPosition.parent)
              t || this._markRemove(e.sourcePosition.parent, e.sourcePosition.offset, e.howMany),
                n || this._markInsert(e.targetPosition.parent, e.getMovedRangeStart().offset, e.howMany)
              break
            }
            case 'rename': {
              if (this._isInInsertedElement(e.position.parent)) return
              this._markRemove(e.position.parent, e.position.offset, 1),
                this._markInsert(e.position.parent, e.position.offset, 1)
              const t = Ua._createFromPositionAndShift(e.position, 1)
              for (const e of this._markerCollection.getMarkersIntersectingRange(t)) {
                const t = e.getData()
                this.bufferMarkerChange(e.name, t, t)
              }
              break
            }
            case 'split': {
              const t = e.splitPosition.parent
              this._isInInsertedElement(t) || this._markRemove(t, e.splitPosition.offset, e.howMany),
                this._isInInsertedElement(e.insertionPosition.parent) ||
                  this._markInsert(e.insertionPosition.parent, e.insertionPosition.offset, 1),
                e.graveyardPosition && this._markRemove(e.graveyardPosition.parent, e.graveyardPosition.offset, 1)
              break
            }
            case 'merge': {
              const t = e.sourcePosition.parent
              this._isInInsertedElement(t.parent) || this._markRemove(t.parent, t.startOffset, 1)
              const n = e.graveyardPosition.parent
              this._markInsert(n, e.graveyardPosition.offset, 1)
              const i = e.targetPosition.parent
              this._isInInsertedElement(i) || this._markInsert(i, e.targetPosition.offset, t.maxOffset)
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
        getChanges(t = {}) {
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
              s = hc(t.getChildren()),
              o = dc(i.length, n)
            let r = 0,
              a = 0
            for (const n of o)
              if ('i' === n) e.push(this._getInsertDiff(t, r, s[r])), r++
              else if ('r' === n) e.push(this._getRemoveDiff(t, r, i[a])), a++
              else if ('a' === n) {
                const n = s[r].attributes,
                  o = i[a].attributes
                let l
                if ('$text' == s[r].name) l = new Ua(Wa._createAt(t, r), Wa._createAt(t, r + 1))
                else {
                  const e = t.offsetToIndex(r)
                  l = new Ua(Wa._createAt(t, r), Wa._createAt(t.getChild(e), 0))
                }
                e.push(...this._getAttributesDiff(l, o, n)), r++, a++
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
            (this._cachedChanges = e.filter(uc)),
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
          const e = Ua._createOn(t)
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
          this._elementSnapshots.has(t) || this._elementSnapshots.set(t, hc(t.getChildren()))
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
            position: Wa._createAt(t, e),
            name: n.name,
            attributes: new Map(n.attributes),
            length: 1,
            changeCount: this._changeCount++,
          }
        }
        _getRemoveDiff(t, e, n) {
          return {
            type: 'remove',
            position: Wa._createAt(t, e),
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
          const i = new Ua(Wa._createAt(t, e), Wa._createAt(t, e + n))
          for (const t of i.getItems({ shallow: !0 }))
            t.is('element') &&
              (this._elementSnapshots.delete(t),
              this._changesInElement.delete(t),
              this._removeAllNestedChanges(t, 0, t.maxOffset))
        }
      }
      function hc(t) {
        const e = []
        for (const n of t)
          if (n.is('$text'))
            for (let t = 0; t < n.data.length; t++) e.push({ name: '$text', attributes: new Map(n.getAttributes()) })
          else e.push({ name: n.name, attributes: new Map(n.getAttributes()) })
        return e
      }
      function dc(t, e) {
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
      function uc(t) {
        const e = 'position' in t && '$graveyard' == t.position.root.rootName,
          n = 'range' in t && '$graveyard' == t.range.root.rootName
        return !e && !n
      }
      class fc {
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
            throw new l('model-document-history-addoperation-incorrect-version', this, {
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
      class mc extends Va {
        constructor(t, e, n = 'main') {
          super(e), (this._document = t), (this.rootName = n)
        }
        get document() {
          return this._document
        }
        toJSON() {
          return this.rootName
        }
      }
      function gc(t, e) {
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
      function pc(t, e) {
        return (
          !!(n = t.charAt(e)) &&
          1 == n.length &&
          /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/.test(n)
        )
        var n
      }
      mc.prototype.is = function (t, e) {
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
      const _c = (function () {
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
      function wc(t, e) {
        const n = String(t).matchAll(_c)
        return Array.from(n).some(t => t.index < e && e < t.index + t[0].length)
      }
      const bc = '$graveyard'
      class yc extends w {
        constructor(t) {
          super(),
            (this.model = t),
            (this.history = new fc()),
            (this.selection = new al(this)),
            (this.roots = new mi({ idProperty: 'rootName' })),
            (this.differ = new cc(t.markers)),
            (this._postFixers = new Set()),
            (this._hasSelectionChangedFromTheLastChangeBlock = !1),
            this.createRoot('$root', bc),
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
          return this.getRoot(bc)
        }
        createRoot(t = '$root', e = 'main') {
          if (this.roots.get(e)) throw new l('model-document-createroot-name-exists', this, { name: e })
          const n = new mc(this, t, e)
          return this.roots.add(n), n
        }
        destroy() {
          this.selection.destroy(), this.stopListening()
        }
        getRoot(t = 'main') {
          return this.roots.get(t)
        }
        getRootNames() {
          return Array.from(this.roots, t => t.rootName).filter(t => t != bc)
        }
        registerPostFixer(t) {
          this._postFixers.add(t)
        }
        toJSON() {
          const t = Ti(this)
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
          return vc(t.start) && vc(t.end)
        }
        _callPostFixers(t) {
          let e = !1
          do {
            for (const n of this._postFixers) if ((this.selection.refresh(), (e = n(t)), e)) break
          } while (e)
        }
      }
      function vc(t) {
        const e = t.textNode
        if (e) {
          const n = e.data,
            i = t.offset - e.startOffset
          return !gc(n, i) && !pc(n, i)
        }
        return !0
      }
      class Pc extends w {
        constructor() {
          super(), (this._markers = new Map())
        }
        [Symbol.iterator]() {
          return this._markers.values()
        }
        has(t) {
          const e = t instanceof kc ? t.name : t
          return this._markers.has(e)
        }
        get(t) {
          return this._markers.get(t) || null
        }
        _set(t, e, n = !1, i = !1) {
          const s = t instanceof kc ? t.name : t
          if (s.includes(',')) throw new l('markercollection-incorrect-marker-name', this)
          const o = this._markers.get(s)
          if (o) {
            const t = o.getData(),
              r = o.getRange()
            let a = !1
            return (
              r.isEqual(e) || (o._attachLiveRange(il.fromRange(e)), (a = !0)),
              n != o.managedUsingOperations && ((o._managedUsingOperations = n), (a = !0)),
              'boolean' == typeof i && i != o.affectsData && ((o._affectsData = i), (a = !0)),
              a && this.fire(`update:${s}`, o, r, e, t),
              o
            )
          }
          const r = il.fromRange(e),
            a = new kc(s, r, n, i)
          return this._markers.set(s, a), this.fire(`update:${s}`, a, null, e, { ...a.getData(), range: null }), a
        }
        _remove(t) {
          const e = t instanceof kc ? t.name : t,
            n = this._markers.get(e)
          return (
            !!n &&
            (this._markers.delete(e),
            this.fire(`update:${e}`, n, n.getRange(), null, n.getData()),
            this._destroyMarker(n),
            !0)
          )
        }
        _refresh(t) {
          const e = t instanceof kc ? t.name : t,
            n = this._markers.get(e)
          if (!n) throw new l('markercollection-refresh-marker-not-exists', this)
          const i = n.getRange()
          this.fire(`update:${e}`, n, i, i, n.getData())
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
      class kc extends _(Ma) {
        constructor(t, e, n, i) {
          super(),
            (this.name = t),
            (this._liveRange = this._attachLiveRange(e)),
            (this._managedUsingOperations = n),
            (this._affectsData = i)
        }
        get managedUsingOperations() {
          if (!this._liveRange) throw new l('marker-destroyed', this)
          return this._managedUsingOperations
        }
        get affectsData() {
          if (!this._liveRange) throw new l('marker-destroyed', this)
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
          if (!this._liveRange) throw new l('marker-destroyed', this)
          return this._liveRange.start.clone()
        }
        getEnd() {
          if (!this._liveRange) throw new l('marker-destroyed', this)
          return this._liveRange.end.clone()
        }
        getRange() {
          if (!this._liveRange) throw new l('marker-destroyed', this)
          return this._liveRange.toRange()
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
      kc.prototype.is = function (t) {
        return 'marker' === t || 'model:marker' === t
      }
      class Ac {
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
        static fromJSON(t, e) {
          return new this(t.baseVersion)
        }
      }
      function Cc(t, e) {
        const n = xc(e),
          i = n.reduce((t, e) => t + e.offsetSize, 0),
          s = t.parent
        Rc(t)
        const o = t.index
        return s._insertChild(o, n), Sc(s, o + n.length), Sc(s, o), new Ua(t, t.getShiftedBy(i))
      }
      function Ec(t) {
        if (!t.isFlat) throw new l('operation-utils-remove-range-not-flat', this)
        const e = t.start.parent
        Rc(t.start), Rc(t.end)
        const n = e._removeChildren(t.start.index, t.end.index - t.start.index)
        return Sc(e, t.start.index), n
      }
      function Tc(t, e) {
        if (!t.isFlat) throw new l('operation-utils-move-range-not-flat', this)
        const n = Ec(t)
        return Cc((e = e._getTransformedByDeletion(t.start, t.end.offset - t.start.offset)), n)
      }
      function xc(t) {
        const e = []
        !(function t(n) {
          if ('string' == typeof n) e.push(new Fa(n))
          else if (n instanceof Ba) e.push(new Fa(n.data, n.getAttributes()))
          else if (n instanceof Na) e.push(n)
          else if (fi(n)) for (const e of n) t(e)
        })(t)
        for (let t = 1; t < e.length; t++) {
          const n = e[t],
            i = e[t - 1]
          n instanceof Fa &&
            i instanceof Fa &&
            Oc(n, i) &&
            (e.splice(t - 1, 2, new Fa(i.data + n.data, i.getAttributes())), t--)
        }
        return e
      }
      function Sc(t, e) {
        const n = t.getChild(e - 1),
          i = t.getChild(e)
        if (n && i && n.is('$text') && i.is('$text') && Oc(n, i)) {
          const s = new Fa(n.data + i.data, n.getAttributes())
          t._removeChildren(e - 1, 2), t._insertChild(e - 1, s)
        }
      }
      function Rc(t) {
        const e = t.textNode,
          n = t.parent
        if (e) {
          const i = t.offset - e.startOffset,
            s = e.index
          n._removeChildren(s, 1)
          const o = new Fa(e.data.substr(0, i), e.getAttributes()),
            r = new Fa(e.data.substr(i), e.getAttributes())
          n._insertChild(s, [o, r])
        }
      }
      function Oc(t, e) {
        const n = t.getAttributes(),
          i = e.getAttributes()
        for (const t of n) {
          if (t[1] !== e.getAttribute(t[0])) return !1
          i.next()
        }
        return i.next().done
      }
      const Ic = function (t, e) {
        return Br(t, e)
      }
      class Mc extends Ac {
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
          return new Mc(this.range, this.key, this.oldValue, this.newValue, this.baseVersion)
        }
        getReversed() {
          return new Mc(this.range, this.key, this.newValue, this.oldValue, this.baseVersion + 1)
        }
        toJSON() {
          const t = super.toJSON()
          return (t.range = this.range.toJSON()), t
        }
        _validate() {
          if (!this.range.isFlat) throw new l('attribute-operation-range-not-flat', this)
          for (const t of this.range.getItems({ shallow: !0 })) {
            if (null !== this.oldValue && !Ic(t.getAttribute(this.key), this.oldValue))
              throw new l('attribute-operation-wrong-old-value', this, { item: t, key: this.key, value: this.oldValue })
            if (null === this.oldValue && null !== this.newValue && t.hasAttribute(this.key))
              throw new l('attribute-operation-attribute-exists', this, { node: t, key: this.key })
          }
        }
        _execute() {
          Ic(this.oldValue, this.newValue) ||
            (function (t, e, n) {
              Rc(t.start), Rc(t.end)
              for (const i of t.getItems({ shallow: !0 })) {
                const t = i.is('$textProxy') ? i.textNode : i
                null !== n ? t._setAttribute(e, n) : t._removeAttribute(e), Sc(t.parent, t.index)
              }
              Sc(t.end.parent, t.end.index)
            })(this.range, this.key, this.newValue)
        }
        static get className() {
          return 'AttributeOperation'
        }
        static fromJSON(t, e) {
          return new Mc(Ua.fromJSON(t.range, e), t.key, t.oldValue, t.newValue, t.baseVersion)
        }
      }
      class Nc extends Ac {
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
          return new Nc(this.sourcePosition, this.howMany, this.targetPosition, this.baseVersion)
        }
        getMovedRangeStart() {
          return this.targetPosition._getTransformedByDeletion(this.sourcePosition, this.howMany)
        }
        getReversed() {
          const t = this.sourcePosition._getTransformedByInsertion(this.targetPosition, this.howMany)
          return new Nc(this.getMovedRangeStart(), this.howMany, t, this.baseVersion + 1)
        }
        _validate() {
          const t = this.sourcePosition.parent,
            e = this.targetPosition.parent,
            n = this.sourcePosition.offset,
            i = this.targetPosition.offset
          if (n + this.howMany > t.maxOffset) throw new l('move-operation-nodes-do-not-exist', this)
          if (t === e && n < i && i < n + this.howMany) throw new l('move-operation-range-into-itself', this)
          if (
            this.sourcePosition.root == this.targetPosition.root &&
            'prefix' == Ei(this.sourcePosition.getParentPath(), this.targetPosition.getParentPath())
          ) {
            const t = this.sourcePosition.path.length - 1
            if (this.targetPosition.path[t] >= n && this.targetPosition.path[t] < n + this.howMany)
              throw new l('move-operation-node-into-itself', this)
          }
        }
        _execute() {
          Tc(Ua._createFromPositionAndShift(this.sourcePosition, this.howMany), this.targetPosition)
        }
        toJSON() {
          const t = super.toJSON()
          return (t.sourcePosition = this.sourcePosition.toJSON()), (t.targetPosition = this.targetPosition.toJSON()), t
        }
        static get className() {
          return 'MoveOperation'
        }
        static fromJSON(t, e) {
          const n = Wa.fromJSON(t.sourcePosition, e),
            i = Wa.fromJSON(t.targetPosition, e)
          return new this(n, t.howMany, i, t.baseVersion)
        }
      }
      class Dc extends Ac {
        constructor(t, e, n) {
          super(n),
            (this.position = t.clone()),
            (this.position.stickiness = 'toNone'),
            (this.nodes = new Da(xc(e))),
            (this.shouldReceiveAttributes = !1)
        }
        get type() {
          return 'insert'
        }
        get howMany() {
          return this.nodes.maxOffset
        }
        clone() {
          const t = new Da([...this.nodes].map(t => t._clone(!0))),
            e = new Dc(this.position, t, this.baseVersion)
          return (e.shouldReceiveAttributes = this.shouldReceiveAttributes), e
        }
        getReversed() {
          const t = this.position.root.document.graveyard,
            e = new Wa(t, [0])
          return new Nc(this.position, this.nodes.maxOffset, e, this.baseVersion + 1)
        }
        _validate() {
          const t = this.position.parent
          if (!t || t.maxOffset < this.position.offset) throw new l('insert-operation-position-invalid', this)
        }
        _execute() {
          const t = this.nodes
          ;(this.nodes = new Da([...t].map(t => t._clone(!0)))), Cc(this.position, t)
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
          for (const e of t.nodes) e.name ? n.push(Va.fromJSON(e)) : n.push(Fa.fromJSON(e))
          const i = new Dc(Wa.fromJSON(t.position, e), n, t.baseVersion)
          return (i.shouldReceiveAttributes = t.shouldReceiveAttributes), i
        }
      }
      class Fc extends Ac {
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
          return new Fc(this.name, this.oldRange, this.newRange, this._markers, this.affectsData, this.baseVersion)
        }
        getReversed() {
          return new Fc(this.name, this.newRange, this.oldRange, this._markers, this.affectsData, this.baseVersion + 1)
        }
        _execute() {
          this.newRange
            ? this._markers._set(this.name, this.newRange, !0, this.affectsData)
            : this._markers._remove(this.name)
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
          return new Fc(
            t.name,
            t.oldRange ? Ua.fromJSON(t.oldRange, e) : null,
            t.newRange ? Ua.fromJSON(t.newRange, e) : null,
            e.model.markers,
            t.affectsData,
            t.baseVersion
          )
        }
      }
      class Bc extends Ac {
        get type() {
          return 'noop'
        }
        clone() {
          return new Bc(this.baseVersion)
        }
        getReversed() {
          return new Bc(this.baseVersion + 1)
        }
        _execute() {}
        static get className() {
          return 'NoOperation'
        }
      }
      class Vc extends Ac {
        constructor(t, e, n, i) {
          super(i), (this.position = t), (this.position.stickiness = 'toNext'), (this.oldName = e), (this.newName = n)
        }
        get type() {
          return 'rename'
        }
        clone() {
          return new Vc(this.position.clone(), this.oldName, this.newName, this.baseVersion)
        }
        getReversed() {
          return new Vc(this.position.clone(), this.newName, this.oldName, this.baseVersion + 1)
        }
        _validate() {
          const t = this.position.nodeAfter
          if (!(t instanceof Va)) throw new l('rename-operation-wrong-position', this)
          if (t.name !== this.oldName) throw new l('rename-operation-wrong-name', this)
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
          return new Vc(Wa.fromJSON(t.position, e), t.oldName, t.newName, t.baseVersion)
        }
      }
      class Lc extends Ac {
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
          return new Lc(this.root, this.key, this.oldValue, this.newValue, this.baseVersion)
        }
        getReversed() {
          return new Lc(this.root, this.key, this.newValue, this.oldValue, this.baseVersion + 1)
        }
        _validate() {
          if (this.root != this.root.root || this.root.is('documentFragment'))
            throw new l('rootattribute-operation-not-a-root', this, { root: this.root, key: this.key })
          if (null !== this.oldValue && this.root.getAttribute(this.key) !== this.oldValue)
            throw new l('rootattribute-operation-wrong-old-value', this, { root: this.root, key: this.key })
          if (null === this.oldValue && null !== this.newValue && this.root.hasAttribute(this.key))
            throw new l('rootattribute-operation-attribute-exists', this, { root: this.root, key: this.key })
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
          if (!e.getRoot(t.root)) throw new l('rootattribute-operation-fromjson-no-root', this, { rootName: t.root })
          return new Lc(e.getRoot(t.root), t.key, t.oldValue, t.newValue, t.baseVersion)
        }
      }
      class jc extends Ac {
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
          return new Wa(this.sourcePosition.root, this.sourcePosition.path.slice(0, -1))
        }
        get movedRange() {
          const t = this.sourcePosition.getShiftedBy(Number.POSITIVE_INFINITY)
          return new Ua(this.sourcePosition, t)
        }
        clone() {
          return new jc(
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
            n = new Wa(this.sourcePosition.root, e)._getTransformedByMergeOperation(this)
          return new Wc(t, this.howMany, n, this.graveyardPosition, this.baseVersion + 1)
        }
        _validate() {
          const t = this.sourcePosition.parent,
            e = this.targetPosition.parent
          if (!t.parent) throw new l('merge-operation-source-position-invalid', this)
          if (!e.parent) throw new l('merge-operation-target-position-invalid', this)
          if (this.howMany != t.maxOffset) throw new l('merge-operation-how-many-invalid', this)
        }
        _execute() {
          const t = this.sourcePosition.parent
          Tc(Ua._createIn(t), this.targetPosition), Tc(Ua._createOn(t), this.graveyardPosition)
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
          const n = Wa.fromJSON(t.sourcePosition, e),
            i = Wa.fromJSON(t.targetPosition, e),
            s = Wa.fromJSON(t.graveyardPosition, e)
          return new this(n, t.howMany, i, s, t.baseVersion)
        }
      }
      class Wc extends Ac {
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
          return t.push(0), new Wa(this.insertionPosition.root, t)
        }
        get movedRange() {
          const t = this.splitPosition.getShiftedBy(Number.POSITIVE_INFINITY)
          return new Ua(this.splitPosition, t)
        }
        clone() {
          return new Wc(
            this.splitPosition,
            this.howMany,
            this.insertionPosition,
            this.graveyardPosition,
            this.baseVersion
          )
        }
        getReversed() {
          const t = this.splitPosition.root.document.graveyard,
            e = new Wa(t, [0])
          return new jc(this.moveTargetPosition, this.howMany, this.splitPosition, e, this.baseVersion + 1)
        }
        _validate() {
          const t = this.splitPosition.parent,
            e = this.splitPosition.offset
          if (!t || t.maxOffset < e) throw new l('split-operation-position-invalid', this)
          if (!t.parent) throw new l('split-operation-split-in-root', this)
          if (this.howMany != t.maxOffset - this.splitPosition.offset)
            throw new l('split-operation-how-many-invalid', this)
          if (this.graveyardPosition && !this.graveyardPosition.nodeAfter)
            throw new l('split-operation-graveyard-position-invalid', this)
        }
        _execute() {
          const t = this.splitPosition.parent
          if (this.graveyardPosition)
            Tc(Ua._createFromPositionAndShift(this.graveyardPosition, 1), this.insertionPosition)
          else {
            const e = t._clone()
            Cc(this.insertionPosition, e)
          }
          Tc(new Ua(Wa._createAt(t, this.splitPosition.offset), Wa._createAt(t, t.maxOffset)), this.moveTargetPosition)
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
          return e[e.length - 1]++, new Wa(t.root, e, 'toPrevious')
        }
        static fromJSON(t, e) {
          const n = Wa.fromJSON(t.splitPosition, e),
            i = Wa.fromJSON(t.insertionPosition, e),
            s = t.graveyardPosition ? Wa.fromJSON(t.graveyardPosition, e) : null
          return new this(n, t.howMany, i, s, t.baseVersion)
        }
      }
      const $c = {}
      ;($c[Mc.className] = Mc),
        ($c[Dc.className] = Dc),
        ($c[Fc.className] = Fc),
        ($c[Nc.className] = Nc),
        ($c[Bc.className] = Bc),
        ($c[Ac.className] = Ac),
        ($c[Vc.className] = Vc),
        ($c[Lc.className] = Lc),
        ($c[Wc.className] = Wc),
        ($c[jc.className] = jc)
      class zc extends Ac {
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
          if (this.sourcePosition.root.document) throw new l('detach-operation-on-document-node', this)
        }
        _execute() {
          Ec(Ua._createFromPositionAndShift(this.sourcePosition, this.howMany))
        }
        static get className() {
          return 'DetachOperation'
        }
      }
      class qc extends Ma {
        constructor(t) {
          super(), (this.markers = new Map()), (this._children = new Da()), t && this._insertChild(0, t)
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
        get nextSibling() {
          return null
        }
        get previousSibling() {
          return null
        }
        get root() {
          return this
        }
        get parent() {
          return null
        }
        get document() {
          return null
        }
        getAncestors() {
          return []
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
          for (const n of t) n.name ? e.push(Va.fromJSON(n)) : e.push(Fa.fromJSON(n))
          return new qc(e)
        }
        _appendChild(t) {
          this._insertChild(this.childCount, t)
        }
        _insertChild(t, e) {
          const n = (function (t) {
            if ('string' == typeof t) return [new Fa(t)]
            fi(t) || (t = [t])
            return Array.from(t).map(t =>
              'string' == typeof t ? new Fa(t) : t instanceof Ba ? new Fa(t.data, t.getAttributes()) : t
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
      qc.prototype.is = function (t) {
        return 'documentFragment' === t || 'model:documentFragment' === t
      }
      class Uc {
        constructor(t, e) {
          ;(this.model = t), (this.batch = e)
        }
        createText(t, e) {
          return new Fa(t, e)
        }
        createElement(t, e) {
          return new Va(t, e)
        }
        createDocumentFragment() {
          return new qc()
        }
        cloneElement(t, e = !0) {
          return t._clone(e)
        }
        insert(t, e, n = 0) {
          if ((this._assertWriterUsedCorrectly(), t instanceof Fa && '' == t.data)) return
          const i = Wa._createAt(e, n)
          if (t.parent) {
            if (Yc(t.root, i.root)) return void this.move(Ua._createOn(t), i)
            if (t.root.document) throw new l('model-writer-insert-forbidden-move', this)
            this.remove(t)
          }
          const s = i.root.document ? i.root.document.version : null,
            o = new Dc(i, t, s)
          if (
            (t instanceof Fa && (o.shouldReceiveAttributes = !0),
            this.batch.addOperation(o),
            this.model.applyOperation(o),
            t instanceof qc)
          )
            for (const [e, n] of t.markers) {
              const t = Wa._createAt(n.root, 0),
                s = {
                  range: new Ua(n.start._getCombined(t, i), n.end._getCombined(t, i)),
                  usingOperation: !0,
                  affectsData: !0,
                }
              this.model.markers.has(e) ? this.updateMarker(e, s) : this.addMarker(e, s)
            }
        }
        insertText(t, e, n, i) {
          e instanceof qc || e instanceof Va || e instanceof Wa
            ? this.insert(this.createText(t), e, n)
            : this.insert(this.createText(t, e), n, i)
        }
        insertElement(t, e, n, i) {
          e instanceof qc || e instanceof Va || e instanceof Wa
            ? this.insert(this.createElement(t), e, n)
            : this.insert(this.createElement(t, e), n, i)
        }
        append(t, e) {
          this.insert(t, e, 'end')
        }
        appendText(t, e, n) {
          e instanceof qc || e instanceof Va
            ? this.insert(this.createText(t), e, 'end')
            : this.insert(this.createText(t, e), n, 'end')
        }
        appendElement(t, e, n) {
          e instanceof qc || e instanceof Va
            ? this.insert(this.createElement(t), e, 'end')
            : this.insert(this.createElement(t, e), n, 'end')
        }
        setAttribute(t, e, n) {
          if ((this._assertWriterUsedCorrectly(), n instanceof Ua)) {
            const i = n.getMinimalFlatRanges()
            for (const n of i) Hc(this, t, e, n)
          } else Kc(this, t, e, n)
        }
        setAttributes(t, e) {
          for (const [n, i] of Oi(t)) this.setAttribute(n, i, e)
        }
        removeAttribute(t, e) {
          if ((this._assertWriterUsedCorrectly(), e instanceof Ua)) {
            const n = e.getMinimalFlatRanges()
            for (const e of n) Hc(this, t, null, e)
          } else Kc(this, t, null, e)
        }
        clearAttributes(t) {
          this._assertWriterUsedCorrectly()
          const e = t => {
            for (const e of t.getAttributeKeys()) this.removeAttribute(e, t)
          }
          if (t instanceof Ua) for (const n of t.getItems()) e(n)
          else e(t)
        }
        move(t, e, n) {
          if ((this._assertWriterUsedCorrectly(), !(t instanceof Ua))) throw new l('writer-move-invalid-range', this)
          if (!t.isFlat) throw new l('writer-move-range-not-flat', this)
          const i = Wa._createAt(e, n)
          if (i.isEqual(t.start)) return
          if ((this._addOperationForAffectedMarkers('move', t), !Yc(t.root, i.root)))
            throw new l('writer-move-different-document', this)
          const s = t.root.document ? t.root.document.version : null,
            o = new Nc(t.start, t.end.offset - t.start.offset, i, s)
          this.batch.addOperation(o), this.model.applyOperation(o)
        }
        remove(t) {
          this._assertWriterUsedCorrectly()
          const e = (t instanceof Ua ? t : Ua._createOn(t)).getMinimalFlatRanges().reverse()
          for (const t of e)
            this._addOperationForAffectedMarkers('move', t),
              Jc(t.start, t.end.offset - t.start.offset, this.batch, this.model)
        }
        merge(t) {
          this._assertWriterUsedCorrectly()
          const e = t.nodeBefore,
            n = t.nodeAfter
          if ((this._addOperationForAffectedMarkers('merge', t), !(e instanceof Va)))
            throw new l('writer-merge-no-element-before', this)
          if (!(n instanceof Va)) throw new l('writer-merge-no-element-after', this)
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
        createSelection(...t) {
          return this.model.createSelection(...t)
        }
        _mergeDetached(t) {
          const e = t.nodeBefore,
            n = t.nodeAfter
          this.move(Ua._createIn(n), Wa._createAt(e, 'end')), this.remove(n)
        }
        _merge(t) {
          const e = Wa._createAt(t.nodeBefore, 'end'),
            n = Wa._createAt(t.nodeAfter, 0),
            i = t.root.document.graveyard,
            s = new Wa(i, [0]),
            o = t.root.document.version,
            r = new jc(n, t.nodeAfter.maxOffset, e, s, o)
          this.batch.addOperation(r), this.model.applyOperation(r)
        }
        rename(t, e) {
          if ((this._assertWriterUsedCorrectly(), !(t instanceof Va)))
            throw new l('writer-rename-not-element-instance', this)
          const n = t.root.document ? t.root.document.version : null,
            i = new Vc(Wa._createBefore(t), t.name, e, n)
          this.batch.addOperation(i), this.model.applyOperation(i)
        }
        split(t, e) {
          this._assertWriterUsedCorrectly()
          let n,
            i,
            s = t.parent
          if (!s.parent) throw new l('writer-split-element-no-parent', this)
          if ((e || (e = s.parent), !t.parent.getAncestors({ includeSelf: !0 }).includes(e)))
            throw new l('writer-split-invalid-limit-element', this)
          do {
            const e = s.root.document ? s.root.document.version : null,
              o = s.maxOffset - t.offset,
              r = Wc.getInsertionPosition(t),
              a = new Wc(t, o, r, null, e)
            this.batch.addOperation(a),
              this.model.applyOperation(a),
              n || i || ((n = s), (i = t.parent.nextSibling)),
              (s = (t = this.createPositionAfter(t.parent)).parent)
          } while (s !== e)
          return { position: t, range: new Ua(Wa._createAt(n, 'end'), Wa._createAt(i, 0)) }
        }
        wrap(t, e) {
          if ((this._assertWriterUsedCorrectly(), !t.isFlat)) throw new l('writer-wrap-range-not-flat', this)
          const n = e instanceof Va ? e : new Va(e)
          if (n.childCount > 0) throw new l('writer-wrap-element-not-empty', this)
          if (null !== n.parent) throw new l('writer-wrap-element-attached', this)
          this.insert(n, t.start)
          const i = new Ua(t.start.getShiftedBy(1), t.end.getShiftedBy(1))
          this.move(i, Wa._createAt(n, 0))
        }
        unwrap(t) {
          if ((this._assertWriterUsedCorrectly(), null === t.parent))
            throw new l('writer-unwrap-element-no-parent', this)
          this.move(Ua._createIn(t), this.createPositionAfter(t)), this.remove(t)
        }
        addMarker(t, e) {
          if ((this._assertWriterUsedCorrectly(), !e || 'boolean' != typeof e.usingOperation))
            throw new l('writer-addmarker-no-usingoperation', this)
          const n = e.usingOperation,
            i = e.range,
            s = void 0 !== e.affectsData && e.affectsData
          if (this.model.markers.has(t)) throw new l('writer-addmarker-marker-exists', this)
          if (!i) throw new l('writer-addmarker-no-range', this)
          return n ? (Gc(this, t, null, i, s), this.model.markers.get(t)) : this.model.markers._set(t, i, n, s)
        }
        updateMarker(t, e) {
          this._assertWriterUsedCorrectly()
          const n = 'string' == typeof t ? t : t.name,
            i = this.model.markers.get(n)
          if (!i) throw new l('writer-updatemarker-marker-not-exists', this)
          if (!e)
            return (
              c('writer-updatemarker-reconvert-using-editingcontroller', { markerName: n }),
              void this.model.markers._refresh(i)
            )
          const s = 'boolean' == typeof e.usingOperation,
            o = 'boolean' == typeof e.affectsData,
            r = o ? e.affectsData : i.affectsData
          if (!s && !e.range && !o) throw new l('writer-updatemarker-wrong-options', this)
          const a = i.getRange(),
            h = e.range ? e.range : a
          s && e.usingOperation !== i.managedUsingOperations
            ? e.usingOperation
              ? Gc(this, n, null, h, r)
              : (Gc(this, n, a, null, r), this.model.markers._set(n, h, void 0, r))
            : i.managedUsingOperations
            ? Gc(this, n, a, h, r)
            : this.model.markers._set(n, h, void 0, r)
        }
        removeMarker(t) {
          this._assertWriterUsedCorrectly()
          const e = 'string' == typeof t ? t : t.name
          if (!this.model.markers.has(e)) throw new l('writer-removemarker-no-marker', this)
          const n = this.model.markers.get(e)
          if (!n.managedUsingOperations) return void this.model.markers._remove(e)
          Gc(this, e, n.getRange(), null, n.affectsData)
        }
        setSelection(...t) {
          this._assertWriterUsedCorrectly(), this.model.document.selection._setTo(...t)
        }
        setSelectionFocus(t, e) {
          this._assertWriterUsedCorrectly(), this.model.document.selection._setFocus(t, e)
        }
        setSelectionAttribute(t, e) {
          if ((this._assertWriterUsedCorrectly(), 'string' == typeof t)) this._setSelectionAttribute(t, e)
          else for (const [e, n] of Oi(t)) this._setSelectionAttribute(e, n)
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
            const i = al._getStoreAttributeKey(t)
            this.setAttribute(i, e, n.anchor.parent)
          }
          n._setAttribute(t, e)
        }
        _removeSelectionAttribute(t) {
          const e = this.model.document.selection
          if (e.isCollapsed && e.anchor.parent.isEmpty) {
            const n = al._getStoreAttributeKey(t)
            this.removeAttribute(n, e.anchor.parent)
          }
          e._removeAttribute(t)
        }
        _assertWriterUsedCorrectly() {
          if (this.model._currentWriter !== this) throw new l('writer-incorrect-use', this)
        }
        _addOperationForAffectedMarkers(t, e) {
          for (const n of this.model.markers) {
            if (!n.managedUsingOperations) continue
            const i = n.getRange()
            let s = !1
            if ('move' === t) {
              const t = e
              s =
                t.containsPosition(i.start) ||
                t.start.isEqual(i.start) ||
                t.containsPosition(i.end) ||
                t.end.isEqual(i.end)
            } else {
              const t = e,
                n = t.nodeBefore,
                o = t.nodeAfter,
                r = i.start.parent == n && i.start.isAtEnd,
                a = i.end.parent == o && 0 == i.end.offset,
                l = i.end.nodeAfter == o,
                c = i.start.nodeAfter == o
              s = r || a || l || c
            }
            s && this.updateMarker(n.name, { range: i })
          }
        }
      }
      function Hc(t, e, n, i) {
        const s = t.model,
          o = s.document
        let r,
          a,
          l,
          c = i.start
        for (const t of i.getWalker({ shallow: !0 }))
          (l = t.item.getAttribute(e)), r && a != l && (a != n && h(), (c = r)), (r = t.nextPosition), (a = l)
        function h() {
          const i = new Ua(c, r),
            l = i.root.document ? o.version : null,
            h = new Mc(i, e, a, n, l)
          t.batch.addOperation(h), s.applyOperation(h)
        }
        r instanceof Wa && r != c && a != n && h()
      }
      function Kc(t, e, n, i) {
        const s = t.model,
          o = s.document,
          r = i.getAttribute(e)
        let a, l
        if (r != n) {
          if (i.root === i) {
            const t = i.document ? o.version : null
            l = new Lc(i, e, r, n, t)
          } else {
            a = new Ua(Wa._createBefore(i), t.createPositionAfter(i))
            const s = a.root.document ? o.version : null
            l = new Mc(a, e, r, n, s)
          }
          t.batch.addOperation(l), s.applyOperation(l)
        }
      }
      function Gc(t, e, n, i, s) {
        const o = t.model,
          r = o.document,
          a = new Fc(e, n, i, o.markers, !!s, r.version)
        t.batch.addOperation(a), o.applyOperation(a)
      }
      function Jc(t, e, n, i) {
        let s
        if (t.root.document) {
          const n = i.document,
            o = new Wa(n.graveyard, [0])
          s = new Nc(t, e, o, n.version)
        } else s = new zc(t, e)
        n.addOperation(s), i.applyOperation(s)
      }
      function Yc(t, e) {
        return t === e || (t instanceof mc && e instanceof mc)
      }
      function Xc(t) {
        t.document.registerPostFixer(e =>
          (function (t, e) {
            const n = e.document.selection,
              i = e.schema,
              s = []
            let o = !1
            for (const t of n.getRanges()) {
              const e = Zc(t, i)
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
            return !1
          })(e, t)
        )
      }
      function Zc(t, e) {
        return t.isCollapsed
          ? (function (t, e) {
              const n = t.start,
                i = e.getNearestSelectionRange(n)
              if (!i) {
                const t = n
                  .getAncestors()
                  .reverse()
                  .find(t => e.isObject(t))
                return t ? Ua._createOn(t) : null
              }
              if (!i.isCollapsed) return i
              const s = i.start
              if (n.isEqual(s)) return null
              return new Ua(s)
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
                  return new Ua(o, r)
                }
              }
              const l = r && !r.is('rootElement'),
                c = a && !a.is('rootElement')
              if (l || c) {
                const t = n.nodeAfter && i.nodeBefore && n.nodeAfter.parent === i.nodeBefore.parent,
                  s = l && (!t || !th(n.nodeAfter, e)),
                  o = c && (!t || !th(i.nodeBefore, e))
                let h = n,
                  d = i
                return s && (h = Wa._createBefore(Qc(r, e))), o && (d = Wa._createAfter(Qc(a, e))), new Ua(h, d)
              }
              return null
            })(t, e)
      }
      function Qc(t, e) {
        let n = t,
          i = n
        for (; e.isLimit(i) && i.parent; ) (n = i), (i = i.parent)
        return n
      }
      function th(t, e) {
        return t && e.isSelectable(t)
      }
      class eh extends _(Wa) {
        constructor(t, e, n = 'toNone') {
          if ((super(t, e, n), !this.root.is('rootElement'))) throw new l('model-liveposition-root-not-rootelement', t)
          nh.call(this)
        }
        detach() {
          this.stopListening()
        }
        toPosition() {
          return new Wa(this.root, this.path.slice(), this.stickiness)
        }
        static fromPosition(t, e) {
          return new this(t.root, t.path.slice(), e || t.stickiness)
        }
      }
      function nh() {
        this.listenTo(
          this.root.document.model,
          'applyOperation',
          (t, e) => {
            const n = e[0]
            n.isDocumentOperation && ih.call(this, n)
          },
          { priority: 'low' }
        )
      }
      function ih(t) {
        const e = this.getTransformedByOperation(t)
        if (!this.isEqual(e)) {
          const t = this.toPosition()
          ;(this.path = e.path), (this.root = e.root), this.fire('change', t)
        }
      }
      function sh(t, e, n = {}) {
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
              t.remove(t.createRangeIn(n)), lh(t, t.createPositionAt(n, 0), e)
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
            return [eh.fromPosition(n, 'toPrevious'), eh.fromPosition(i, 'toNext')]
          })(i)
          r.isTouching(a) || t.remove(t.createRange(r, a)),
            n.leaveUnmerged ||
              (!(function (t, e, n) {
                const i = t.model
                if (!ah(t.model.schema, e, n)) return
                const [s, o] = (function (t, e) {
                  const n = t.getAncestors(),
                    i = e.getAncestors()
                  let s = 0
                  for (; n[s] && n[s] == i[s]; ) s++
                  return [n[s], i[s]]
                })(e, n)
                if (!s || !o) return
                !i.hasContent(s, { ignoreMarkers: !0 }) && i.hasContent(o, { ignoreMarkers: !0 })
                  ? rh(t, e, n, s.parent)
                  : oh(t, e, n, s.parent)
              })(t, r, a),
              s.removeDisallowedAttributes(r.parent.getChildren(), t)),
            ch(t, e, r),
            !n.doNotAutoparagraph &&
              (function (t, e) {
                const n = t.checkChild(e, '$text'),
                  i = t.checkChild(e, 'paragraph')
                return !n && i
              })(s, r) &&
              lh(t, r, e, o),
            r.detach(),
            a.detach()
        })
      }
      function oh(t, e, n, i) {
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
          ah(t.model.schema, e, n) && oh(t, e, n, i)
        }
      }
      function rh(t, e, n, i) {
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
            ah(t.model.schema, e, n) && rh(t, e, n, i)
        }
      }
      function ah(t, e, n) {
        const i = e.parent,
          s = n.parent
        return (
          i != s &&
          !t.isLimit(i) &&
          !t.isLimit(s) &&
          (function (t, e, n) {
            const i = new Ua(t, e)
            for (const t of i.getWalker()) if (n.isLimit(t.item)) return !1
            return !0
          })(e, n, t)
        )
      }
      function lh(t, e, n, i = {}) {
        const s = t.createElement('paragraph')
        t.model.schema.setAllowedAttributes(s, i, t), t.insert(s, e), ch(t, n, t.createPositionAt(s, 0))
      }
      function ch(t, e, n) {
        e instanceof al ? t.setSelection(n) : e.setTo(n)
      }
      function hh(t, e) {
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
      eh.prototype.is = function (t) {
        return 'livePosition' === t || 'model:livePosition' === t || 'position' == t || 'model:position' === t
      }
      class dh {
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
              throw new l('insertcontent-invalid-insertion-position', this)
            ;(this.position = n), this._setAffectedBoundaries(this.position)
          }
        }
        getSelectionRange() {
          return this._nodeToSelect
            ? Ua._createOn(this._nodeToSelect)
            : this.model.schema.getNearestSelectionRange(this.position)
        }
        getAffectedRange() {
          return this._affectedStart ? new Ua(this._affectedStart, this._affectedEnd) : null
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
          const t = eh.fromPosition(this.position, 'toNext')
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
            throw new l('insertcontent-wrong-position', this, { node: t, position: this.position })
          this.writer.insert(t, this._documentFragmentPosition),
            (this._documentFragmentPosition = this._documentFragmentPosition.getShiftedBy(t.offsetSize)),
            this.schema.isObject(t) && !this.schema.checkChild(this.position, '$text')
              ? (this._nodeToSelect = t)
              : (this._nodeToSelect = null),
            this._filterAttributesOf.push(t)
        }
        _setAffectedBoundaries(t) {
          this._affectedStart || (this._affectedStart = eh.fromPosition(t, 'toPrevious')),
            (this._affectedEnd && !this._affectedEnd.isBefore(t)) ||
              (this._affectedEnd && this._affectedEnd.detach(), (this._affectedEnd = eh.fromPosition(t, 'toNext')))
        }
        _mergeOnLeft() {
          const t = this._firstNode
          if (!(t instanceof Va)) return
          if (!this._canMergeLeft(t)) return
          const e = eh._createBefore(t)
          e.stickiness = 'toNext'
          const n = eh.fromPosition(this.position, 'toNext')
          this._affectedStart.isEqual(e) &&
            (this._affectedStart.detach(), (this._affectedStart = eh._createAt(e.nodeBefore, 'end', 'toPrevious'))),
            this._firstNode === this._lastNode && ((this._firstNode = e.nodeBefore), (this._lastNode = e.nodeBefore)),
            this.writer.merge(e),
            e.isEqual(this._affectedEnd) &&
              this._firstNode === this._lastNode &&
              (this._affectedEnd.detach(), (this._affectedEnd = eh._createAt(e.nodeBefore, 'end', 'toNext'))),
            (this.position = n.toPosition()),
            n.detach(),
            this._filterAttributesOf.push(this.position.parent),
            e.detach()
        }
        _mergeOnRight() {
          const t = this._lastNode
          if (!(t instanceof Va)) return
          if (!this._canMergeRight(t)) return
          const e = eh._createAfter(t)
          if (((e.stickiness = 'toNext'), !this.position.isEqual(e)))
            throw new l('insertcontent-invalid-insertion-position', this)
          this.position = Wa._createAt(e.nodeBefore, 'end')
          const n = eh.fromPosition(this.position, 'toPrevious')
          this._affectedEnd.isEqual(e) &&
            (this._affectedEnd.detach(), (this._affectedEnd = eh._createAt(e.nodeBefore, 'end', 'toNext'))),
            this._firstNode === this._lastNode && ((this._firstNode = e.nodeBefore), (this._lastNode = e.nodeBefore)),
            this.writer.merge(e),
            e.getShiftedBy(-1).isEqual(this._affectedStart) &&
              this._firstNode === this._lastNode &&
              (this._affectedStart.detach(), (this._affectedStart = eh._createAt(e.nodeBefore, 0, 'toPrevious'))),
            (this.position = n.toPosition()),
            n.detach(),
            this._filterAttributesOf.push(this.position.parent),
            e.detach()
        }
        _canMergeLeft(t) {
          const e = t.previousSibling
          return e instanceof Va && this.canMergeWith.has(e) && this.model.schema.checkMerge(e, t)
        }
        _canMergeRight(t) {
          const e = t.nextSibling
          return e instanceof Va && this.canMergeWith.has(e) && this.model.schema.checkMerge(t, e)
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
      function uh(t, e, n = 'auto') {
        const i = t.getSelectedElement()
        if (i && e.schema.isObject(i) && !e.schema.isInline(i))
          return 'before' == n || 'after' == n ? e.createRange(e.createPositionAt(i, n)) : e.createRangeOn(i)
        const s = da(t.getSelectedBlocks())
        if (!s) return e.createRange(t.focus)
        if (s.isEmpty) return e.createRange(e.createPositionAt(s, 0))
        const o = e.createPositionAfter(s)
        return t.focus.isTouching(o) ? e.createRange(o) : e.createRange(e.createPositionBefore(s))
      }
      function fh(t, e, n, i, s = {}) {
        if (!t.schema.isObject(e)) throw new l('insertobject-element-not-an-object', t, { object: e })
        let o
        o = n ? (n instanceof Za || n instanceof al ? n : t.createSelection(n, i)) : t.document.selection
        let r = o
        s.findOptimalPosition && t.schema.isBlock(e) && (r = t.createSelection(uh(o, t, s.findOptimalPosition)))
        const a = da(o.getSelectedBlocks()),
          c = {}
        return (
          a && Object.assign(c, t.schema.getAttributesWithProperty(a, 'copyOnReplace', !0)),
          t.change(n => {
            r.isCollapsed || t.deleteContent(r, { doNotAutoparagraph: !0 })
            let i = e
            const o = r.anchor.parent
            !t.schema.checkChild(o, e) &&
              t.schema.checkChild(o, 'paragraph') &&
              t.schema.checkChild('paragraph', e) &&
              ((i = n.createElement('paragraph')), n.insert(e, i)),
              t.schema.setAllowedAttributes(i, c, n)
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
                      if ('on' != n) throw new l('insertobject-invalid-place-parameter-value', s)
                      t.setSelection(e, 'on')
                    }
                  })(n, e, s.setSelection, c)),
              a
            )
          })
        )
      }
      const mh = ' ,.?!:;"-()'
      function gh(t, e) {
        const { isForward: n, walker: i, unit: s, schema: o, treatEmojiAsSingleUnit: r } = t,
          { type: a, item: l, nextPosition: c } = e
        if ('text' == a)
          return 'word' === t.unit
            ? (function (t, e) {
                let n = t.position.textNode
                if (n) {
                  let i = t.position.offset - n.startOffset
                  for (; !_h(n.data, i, e) && !wh(n, i, e); ) {
                    t.next()
                    const s = e ? t.position.nodeAfter : t.position.nodeBefore
                    if (s && s.is('$text')) {
                      const i = s.data.charAt(e ? 0 : s.data.length - 1)
                      mh.includes(i) || (t.next(), (n = t.position.textNode))
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
                  for (; gc(s, o) || ('character' == e && pc(s, o)) || (n && wc(s, o)); )
                    t.next(), (o = t.position.offset - i.startOffset)
                }
                return t.position
              })(i, s, r)
        if (a == (n ? 'elementStart' : 'elementEnd')) {
          if (o.isSelectable(l)) return Wa._createAt(l, n ? 'after' : 'before')
          if (o.checkChild(c, '$text')) return c
        } else {
          if (o.isLimit(l)) return void i.skip(() => !0)
          if (o.checkChild(c, '$text')) return c
        }
      }
      function ph(t, e) {
        const n = t.root,
          i = Wa._createAt(n, e ? 'end' : 0)
        return e ? new Ua(t, i) : new Ua(i, t)
      }
      function _h(t, e, n) {
        const i = e + (n ? 0 : -1)
        return mh.includes(t.charAt(i))
      }
      function wh(t, e, n) {
        return e === (n ? t.endOffset : 0)
      }
      class bh extends M {
        constructor() {
          super(),
            (this.markers = new Pc()),
            (this.document = new yc(this)),
            (this.schema = new jl()),
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
            Xc(this),
            this.document.registerPostFixer(Cl)
        }
        change(t) {
          try {
            return 0 === this._pendingChanges.length
              ? (this._pendingChanges.push({ batch: new lc(), callback: t }), this._runPendingChanges()[0])
              : t(this._currentWriter)
          } catch (t) {
            l.rethrowUnexpectedError(t, this)
          }
        }
        enqueueChange(t, e) {
          try {
            t
              ? 'function' == typeof t
                ? ((e = t), (t = new lc()))
                : t instanceof lc || (t = new lc(t))
              : (t = new lc()),
              this._pendingChanges.push({ batch: t, callback: e }),
              1 == this._pendingChanges.length && this._runPendingChanges()
          } catch (t) {
            l.rethrowUnexpectedError(t, this)
          }
        }
        applyOperation(t) {
          t._execute()
        }
        insertContent(t, e, n) {
          return (function (t, e, n, i) {
            return t.change(s => {
              let o
              ;(o = n ? (n instanceof Za || n instanceof al ? n : s.createSelection(n, i)) : t.document.selection),
                o.isCollapsed || t.deleteContent(o, { doNotAutoparagraph: !0 })
              const r = new dh(t, s, o.anchor)
              let a
              ;(a = e.is('documentFragment') ? e.getChildren() : [e]), r.handleNodes(a)
              const l = r.getSelectionRange()
              l && (o instanceof al ? s.setSelection(l) : o.setTo(l))
              const c = r.getAffectedRange() || t.createRange(o.anchor)
              return r.destroy(), c
            })
          })(this, t, e, n)
        }
        insertObject(t, e, n, i) {
          return fh(this, t, e, n, i)
        }
        deleteContent(t, e) {
          sh(this, t, e)
        }
        modifySelection(t, e) {
          !(function (t, e, n = {}) {
            const i = t.schema,
              s = 'backward' != n.direction,
              o = n.unit ? n.unit : 'character',
              r = !!n.treatEmojiAsSingleUnit,
              a = e.focus,
              l = new La({ boundaries: ph(a, s), singleCharacters: !0, direction: s ? 'forward' : 'backward' }),
              c = { walker: l, schema: i, isForward: s, unit: o, treatEmojiAsSingleUnit: r }
            let h
            for (; (h = l.next()); ) {
              if (h.done) return
              const n = gh(c, h.value)
              if (n)
                return void (e instanceof al
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
              const l = a.end.offset - a.start.offset
              for (const e of a.getItems({ shallow: !0 }))
                e.is('$textProxy') ? t.appendText(e.data, e.getAttributes(), n) : t.append(t.cloneElement(e, !0), n)
              if (a != i) {
                const e = i._getTransformedByMove(a.start, t.createPositionAt(n, 0), l)[0],
                  s = t.createRange(t.createPositionAt(n, 0), e.start)
                hh(t.createRange(e.end, t.createPositionAt(n, 'end')), t), hh(s, t)
              }
              return n
            })
          })(this, t)
        }
        hasContent(t, e = {}) {
          const n = t instanceof Ua ? t : Ua._createIn(t)
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
          return new Wa(t, e, n)
        }
        createPositionAt(t, e) {
          return Wa._createAt(t, e)
        }
        createPositionAfter(t) {
          return Wa._createAfter(t)
        }
        createPositionBefore(t) {
          return Wa._createBefore(t)
        }
        createRange(t, e) {
          return new Ua(t, e)
        }
        createRangeIn(t) {
          return Ua._createIn(t)
        }
        createRangeOn(t) {
          return Ua._createOn(t)
        }
        createSelection(...t) {
          return new Za(...t)
        }
        createBatch(t) {
          return new lc(t)
        }
        createOperationFromJSON(t) {
          return class {
            static fromJSON(t, e) {
              return $c[t.__className].fromJSON(t, e)
            }
          }.fromJSON(t, this.document)
        }
        destroy() {
          this.document.destroy(), this.stopListening()
        }
        _runPendingChanges() {
          const t = []
          this.fire('_beforeChanges')
          try {
            for (; this._pendingChanges.length; ) {
              const e = this._pendingChanges[0].batch
              this._currentWriter = new Uc(this, e)
              const n = this._pendingChanges[0].callback(this._currentWriter)
              t.push(n),
                this.document._handleChangeBlock(this._currentWriter),
                this._pendingChanges.shift(),
                (this._currentWriter = null)
            }
          } finally {
            ;(this._pendingChanges.length = 0), (this._currentWriter = null), this.fire('_afterChanges')
          }
          return t
        }
      }
      class yh extends fa {
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
      class vh {
        constructor(t = {}) {
          const e = t.language || (this.constructor.defaultConfig && this.constructor.defaultConfig.language)
          ;(this._context = t.context || new ki({ language: e })), this._context._addEditor(this, !t.context)
          const n = Array.from(this.constructor.builtinPlugins || [])
          ;(this.config = new hi(t, this.constructor.defaultConfig)),
            this.config.define('plugins', n),
            this.config.define(this._context._getEditorConfig()),
            (this.plugins = new gi(this, n, this._context.plugins)),
            (this.locale = this._context.locale),
            (this.t = this.locale.t),
            (this._readOnlyLocks = new Set()),
            (this.commands = new Fl()),
            this.set('state', 'initializing'),
            this.once('ready', () => (this.state = 'ready'), { priority: 'high' }),
            this.once('destroy', () => (this.state = 'destroyed'), { priority: 'high' }),
            (this.model = new bh())
          const i = new xs()
          ;(this.data = new sc(this.model, i)),
            (this.editing = new Dl(this.model, i)),
            this.editing.view.document.bind('isReadOnly').to(this),
            (this.conversion = new oc(
              [this.editing.downcastDispatcher, this.data.downcastDispatcher],
              this.data.upcastDispatcher
            )),
            this.conversion.addAlias('dataDowncast', this.data.downcastDispatcher),
            this.conversion.addAlias('editingDowncast', this.editing.downcastDispatcher),
            (this.keystrokes = new yh(this)),
            this.keystrokes.listenTo(this.editing.view.document)
        }
        get isReadOnly() {
          return this._readOnlyLocks.size > 0
        }
        set isReadOnly(t) {
          throw new l('editor-isreadonly-has-no-setter')
        }
        enableReadOnlyMode(t) {
          if ('string' != typeof t && 'symbol' != typeof t)
            throw new l('editor-read-only-lock-id-invalid', null, { lockId: t })
          this._readOnlyLocks.has(t) ||
            (this._readOnlyLocks.add(t),
            1 === this._readOnlyLocks.size && this.fire('change:isReadOnly', 'isReadOnly', !0, !1))
        }
        disableReadOnlyMode(t) {
          if ('string' != typeof t && 'symbol' != typeof t)
            throw new l('editor-read-only-lock-id-invalid', null, { lockId: t })
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
            l.rethrowUnexpectedError(t, this)
          }
        }
        focus() {
          this.editing.view.focus()
        }
      }
      L(vh, I)
      class Ph {
        constructor(t) {
          ;(this.editor = t), (this._components = new Map())
        }
        *names() {
          for (const t of this._components.values()) yield t.originalName
        }
        add(t, e) {
          this._components.set(kh(t), { callback: e, originalName: t })
        }
        create(t) {
          if (!this.has(t)) throw new l('componentfactory-item-missing', this, { name: t })
          return this._components.get(kh(t)).callback(this.editor.locale)
        }
        has(t) {
          return this._components.has(kh(t))
        }
      }
      function kh(t) {
        return String(t).toLowerCase()
      }
      class Ah extends mi {
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
            throw new l('ui-viewcollection-delegate-wrong-events', this)
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
          if (!this._revertData) throw new l('ui-template-revert-not-applied', [this, t])
          this._revertTemplateFromNode(t, this._revertData)
        }
        *getViews() {
          yield* (function* t(e) {
            if (e.children) for (const n of e.children) Wh(n) ? yield n : $h(n) && (yield* t(n))
          })(this)
        }
        static bind(t, e) {
          return {
            to: (n, i) => new Th({ eventNameOrFunction: n, attribute: n, observable: t, emitter: e, callback: i }),
            if: (n, i, s) => new xh({ observable: t, emitter: e, attribute: n, valueIfTrue: i, callback: s }),
          }
        }
        static extend(t, e) {
          if (t._isRendered) throw new l('template-extend-render', [this, t])
          Lh(t, Dh(Nh(e)))
        }
        _renderNode(t) {
          let e
          if (((e = t.node ? this.tag && this.text : this.tag ? this.text : !this.text), e))
            throw new l('ui-template-wrong-syntax', this)
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
            Sh(this.text)
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
              (s = E(n[0]) && n[0].ns ? n[0].ns : null),
              Sh(n))
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
            Sh(s) ? this._bindToObservable({ schema: [s], updater: Mh(n, i), data: e }) : (n.style[i] = s)
          }
        }
        _renderElementChildren(t) {
          const e = t.node,
            n = t.intoFragment ? document.createDocumentFragment() : e,
            i = t.isApplying
          let s = 0
          for (const o of this.children)
            if (zh(o)) {
              if (!i) {
                o.setParent(e)
                for (const t of o) n.appendChild(t.element)
              }
            } else if (Wh(o)) i || (o.isRendered || o.render(), n.appendChild(o.element))
            else if (Yo(o)) n.appendChild(o)
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
      L(Ch, _)
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
      class Th extends Eh {
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
      function Sh(t) {
        return !!t && (t.value && (t = t.value), Array.isArray(t) ? t.some(Sh) : t instanceof Eh)
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
        return li(t, t => {
          if (t && (t instanceof Eh || $h(t) || Wh(t) || zh(t))) return t
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
                t.text = pi(t.text)
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
              for (const e in t) t[e].value && (t[e].value = pi(t[e].value)), Fh(t, e)
            })(t.attributes)
          const e = []
          if (t.children)
            if (zh(t.children)) e.push(t.children)
            else for (const n of t.children) $h(n) || Wh(n) || Yo(n) ? e.push(n) : e.push(new Ch(n))
          t.children = e
        }
        return t
      }
      function Fh(t, e) {
        t[e] = pi(t[e])
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
          if (t.children.length != e.children.length) throw new l('ui-template-extend-children-mismatch', t)
          let n = 0
          for (const i of e.children) Lh(t.children[n++], i)
        }
      }
      function jh(t) {
        return !t && 0 !== t
      }
      function Wh(t) {
        return t instanceof Uh
      }
      function $h(t) {
        return t instanceof Ch
      }
      function zh(t) {
        return t instanceof Ah
      }
      function qh(t) {
        return 'class' == t || 'style' == t
      }
      class Uh {
        constructor(t) {
          ;(this.element = null),
            (this.isRendered = !1),
            (this.locale = t),
            (this.t = t && t.t),
            (this._viewCollections = new mi()),
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
          const e = new Ah(t)
          return this._viewCollections.add(e), e
        }
        registerChild(t) {
          fi(t) || (t = [t])
          for (const e of t) this._unboundChildren.add(e)
        }
        deregisterChild(t) {
          fi(t) || (t = [t])
          for (const e of t) this._unboundChildren.remove(e)
        }
        setTemplate(t) {
          this.template = new Ch(t)
        }
        extendTemplate(t) {
          Ch.extend(this.template, t)
        }
        render() {
          if (this.isRendered) throw new l('ui-view-render-already-rendered', this)
          this.template && ((this.element = this.template.render()), this.registerChild(this.template.getViews())),
            (this.isRendered = !0)
        }
        destroy() {
          this.stopListening(),
            this._viewCollections.map(t => t.destroy()),
            this.template && this.template._revertData && this.template.revert(this.element)
        }
      }
      function Hh({ element: t, target: e, positions: n, limiter: i, fitInViewport: s, viewportOffsetConfig: o }) {
        Et(e) && (e = e()), Et(i) && (i = i())
        const r = (function (t) {
            return t && t.parentNode ? (t.offsetParent === wi.document.body ? null : t.offsetParent) : null
          })(t),
          a = new ba(t),
          l = new ba(e)
        let c
        const h =
            (s &&
              (function (t) {
                t = Object.assign({ top: 0, bottom: 0, left: 0, right: 0 }, t)
                const e = new ba(wi.window)
                return (e.top += t.top), (e.height -= t.top), (e.bottom -= t.bottom), (e.height -= t.bottom), e
              })(o)) ||
            null,
          d = { targetRect: l, elementRect: a, positionedElementAncestor: r, viewportRect: h }
        if (i || s) {
          const t = i && new ba(i).getVisible()
          Object.assign(d, { limiterRect: t, viewportRect: h }),
            (c =
              (function (t, e) {
                const { elementRect: n } = e,
                  i = n.getArea(),
                  s = t.map(t => new Gh(t, e)).filter(t => !!t.name)
                let o = 0,
                  r = null
                for (const t of s) {
                  const { limiterIntersectionArea: e, viewportIntersectionArea: n } = t
                  if (e === i) return t
                  const s = n ** 2 + e ** 2
                  s > o && ((o = s), (r = t))
                }
                return r
              })(n, d) || new Gh(n[0], d))
        } else c = new Gh(n[0], d)
        return c
      }
      function Kh(t) {
        const { scrollX: e, scrollY: n } = wi.window
        return t.clone().moveBy(e, n)
      }
      L(Uh, fr), L(Uh, I)
      class Gh {
        constructor(t, e) {
          const n = t(e.targetRect, e.elementRect, e.viewportRect)
          if (!n) return
          const { left: i, top: s, name: o, config: r } = n
          ;(this.name = o),
            (this.config = r),
            (this._positioningFunctionCorrdinates = { left: i, top: s }),
            (this._options = e)
        }
        get left() {
          return this._absoluteRect.left
        }
        get top() {
          return this._absoluteRect.top
        }
        get limiterIntersectionArea() {
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
        get viewportIntersectionArea() {
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
              ((this._cachedAbsoluteRect = Kh(this._rect)),
              this._options.positionedElementAncestor &&
                (function (t, e) {
                  const n = Kh(new ba(e)),
                    i = _a(e)
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
      function Jh(t) {
        return e => e + t
      }
      const Yh = Jh('px'),
        Xh = wi.document.body
      class Zh extends Uh {
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
                style: { top: e.to('top', Yh), left: e.to('left', Yh) },
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
          const e = Zh.defaultPositions,
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
                limiter: Xh,
                fitInViewport: !0,
              },
              t
            ),
            i = Zh._getOptimalPosition(n),
            s = parseInt(i.left),
            o = parseInt(i.top),
            { name: r, config: a = {} } = i,
            { withArrow: l = !0 } = a
          Object.assign(this, { top: o, left: s, position: r, withArrow: l })
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
          const e = Qh(t.target),
            n = t.limiter ? Qh(t.limiter) : Xh
          this.listenTo(
            wi.document,
            'scroll',
            (i, s) => {
              const o = s.target,
                r = e && o.contains(e),
                a = n && o.contains(n)
              ;(!r && !a && e && n) || this.attachTo(t)
            },
            { useCapture: !0 }
          ),
            this.listenTo(wi.window, 'resize', () => {
              this.attachTo(t)
            })
        }
        _stopPinning() {
          this.stopListening(wi.document, 'scroll'), this.stopListening(wi.window, 'resize')
        }
      }
      function Qh(t) {
        return ci(t) ? t : pa(t) ? t.commonAncestorContainer : 'function' == typeof t ? Qh(t()) : null
      }
      function td({
        sideOffset: t = Zh.arrowSideOffset,
        heightOffset: e = Zh.arrowHeightOffset,
        stickyVerticalOffset: n = Zh.stickyVerticalOffset,
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
          westArrowEast: (t, n) => ({
            top: t.top + t.height / 2 - n.height / 2,
            left: t.left - n.width - e,
            name: 'arrow_e',
            ...(i && { config: i }),
          }),
          eastArrowWest: (t, n) => ({
            top: t.top + t.height / 2 - n.height / 2,
            left: t.right + e,
            name: 'arrow_w',
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
      }
      ;(Zh.arrowSideOffset = 25),
        (Zh.arrowHeightOffset = 10),
        (Zh.stickyVerticalOffset = 20),
        (Zh._getOptimalPosition = Hh),
        (Zh.defaultPositions = td())
      const ed = 'ck-tooltip'
      class nd {
        constructor(t) {
          if ((nd._editors.add(t), nd._instance)) return nd._instance
          ;(nd._instance = this),
            (this.tooltipTextView = new Uh(t.locale)),
            this.tooltipTextView.set('text', ''),
            this.tooltipTextView.setTemplate({
              tag: 'span',
              attributes: { class: ['ck', 'ck-tooltip__text'] },
              children: [{ text: this.tooltipTextView.bindTemplate.to('text') }],
            }),
            (this.balloonPanelView = new Zh(t.locale)),
            (this.balloonPanelView.class = ed),
            this.balloonPanelView.content.add(this.tooltipTextView),
            (this._currentElementWithTooltip = null),
            (this._currentTooltipPosition = null),
            (this._pinTooltipDebounced = na(this._pinTooltip, 600)),
            this.listenTo(wi.document, 'mouseenter', this._onEnterOrFocus.bind(this), { useCapture: !0 }),
            this.listenTo(wi.document, 'mouseleave', this._onLeaveOrBlur.bind(this), { useCapture: !0 }),
            this.listenTo(wi.document, 'focus', this._onEnterOrFocus.bind(this), { useCapture: !0 }),
            this.listenTo(wi.document, 'blur', this._onLeaveOrBlur.bind(this), { useCapture: !0 }),
            this.listenTo(wi.document, 'scroll', this._onScroll.bind(this), { useCapture: !0 }),
            (this._watchdogExcluded = !0)
        }
        destroy(t) {
          nd._editors.delete(t),
            this.stopListening(t.ui),
            nd._editors.size ||
              (this._unpinTooltip(), this.balloonPanelView.destroy(), this.stopListening(), (nd._instance = null))
        }
        _onEnterOrFocus(t, { target: e }) {
          const n = id(e)
          var i
          n &&
            n !== this._currentElementWithTooltip &&
            (this._unpinTooltip(),
            this._pinTooltipDebounced(n, {
              text: (i = n).dataset.ckeTooltipText,
              position: i.dataset.ckeTooltipPosition || 's',
              cssClass: i.dataset.ckeTooltipClass || '',
            }))
        }
        _onLeaveOrBlur(t, { target: e, relatedTarget: n }) {
          if ('mouseleave' === t.name) {
            if (!ci(e)) return
            if (this._currentElementWithTooltip && e !== this._currentElementWithTooltip) return
            const t = id(e),
              i = id(n)
            t && t !== i && this._unpinTooltip()
          } else {
            if (this._currentElementWithTooltip && e !== this._currentElementWithTooltip) return
            this._unpinTooltip()
          }
        }
        _onScroll(t, { target: e }) {
          this._currentElementWithTooltip &&
            ((e.contains(this.balloonPanelView.element) && e.contains(this._currentElementWithTooltip)) ||
              this._unpinTooltip())
        }
        _pinTooltip(t, { text: e, position: n, cssClass: i }) {
          const s = da(nd._editors.values()).ui.view.body
          s.has(this.balloonPanelView) || s.add(this.balloonPanelView),
            (this.tooltipTextView.text = e),
            this.balloonPanelView.pin({ target: t, positions: nd.getPositioningFunctions(n) }),
            (this.balloonPanelView.class = [ed, i].filter(t => t).join(' '))
          for (const t of nd._editors)
            this.listenTo(t.ui, 'update', this._updateTooltipPosition.bind(this), { priority: 'low' })
          ;(this._currentElementWithTooltip = t), (this._currentTooltipPosition = n)
        }
        _unpinTooltip() {
          this._pinTooltipDebounced.cancel(), this.balloonPanelView.unpin()
          for (const t of nd._editors) this.stopListening(t.ui, 'update')
          ;(this._currentElementWithTooltip = null), (this._currentTooltipPosition = null)
        }
        _updateTooltipPosition() {
          ha(this._currentElementWithTooltip)
            ? this.balloonPanelView.pin({
                target: this._currentElementWithTooltip,
                positions: nd.getPositioningFunctions(this._currentTooltipPosition),
              })
            : this._unpinTooltip()
        }
        static getPositioningFunctions(t) {
          const e = nd.defaultBalloonPositions
          return {
            s: [e.southArrowNorth, e.southArrowNorthEast, e.southArrowNorthWest],
            n: [e.northArrowSouth],
            e: [e.eastArrowWest],
            w: [e.westArrowEast],
            sw: [e.southArrowNorthEast],
            se: [e.southArrowNorthWest],
          }[t]
        }
      }
      function id(t) {
        return ci(t) ? t.closest('[data-cke-tooltip-text]:not([data-cke-tooltip-disabled])') : null
      }
      L(nd, fr),
        (nd.defaultBalloonPositions = td({ heightOffset: 5, sideOffset: 13 })),
        (nd._instance = null),
        (nd._editors = new Set())
      class sd {
        constructor(t) {
          ;(this.editor = t),
            (this.componentFactory = new Ph(t)),
            (this.focusTracker = new ua()),
            (this.tooltipManager = new nd(t)),
            this.set('viewportOffset', this._readViewportOffsetFromConfig()),
            (this.isReady = !1),
            this.once('ready', () => {
              this.isReady = !0
            }),
            (this._editableElementsMap = new Map()),
            (this._focusableToolbarDefinitions = []),
            this.listenTo(t.editing.view.document, 'layoutChanged', () => this.update()),
            this._initFocusTracking()
        }
        get element() {
          return null
        }
        update() {
          this.fire('update')
        }
        destroy() {
          this.stopListening(), this.focusTracker.destroy(), this.tooltipManager.destroy(this.editor)
          for (const t of this._editableElementsMap.values()) t.ckeditorInstance = null
          ;(this._editableElementsMap = new Map()), (this._focusableToolbarDefinitions = [])
        }
        setEditableElement(t, e) {
          this._editableElementsMap.set(t, e),
            e.ckeditorInstance || (e.ckeditorInstance = this.editor),
            this.focusTracker.add(e)
          const n = () => {
            this.editor.editing.view.getDomRoot(t) || this.editor.keystrokes.listenTo(e)
          }
          this.isReady ? n() : this.once('ready', n)
        }
        getEditableElement(t = 'main') {
          return this._editableElementsMap.get(t)
        }
        getEditableElementsNames() {
          return this._editableElementsMap.keys()
        }
        addToolbar(t, e = {}) {
          t.isRendered
            ? (this.focusTracker.add(t.element), this.editor.keystrokes.listenTo(t.element))
            : t.once('render', () => {
                this.focusTracker.add(t.element), this.editor.keystrokes.listenTo(t.element)
              }),
            this._focusableToolbarDefinitions.push({ toolbarView: t, options: e })
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
        _initFocusTracking() {
          const t = this.editor,
            e = t.editing.view
          let n, i
          t.keystrokes.set('Alt+F10', (t, s) => {
            const o = this.focusTracker.focusedElement
            Array.from(this._editableElementsMap.values()).includes(o) &&
              !Array.from(e.domRoots.values()).includes(o) &&
              (n = o)
            const r = this._getCurrentFocusedToolbarDefinition()
            ;(r && i) || (i = this._getFocusableCandidateToolbarDefinitions(r))
            for (let t = 0; t < i.length; t++) {
              const t = i.shift()
              if ((i.push(t), t !== r && this._focusFocusableCandidateToolbar(t))) {
                r && r.options.afterBlur && r.options.afterBlur()
                break
              }
            }
            s()
          }),
            t.keystrokes.set('Esc', (e, i) => {
              const s = this._getCurrentFocusedToolbarDefinition()
              s &&
                (n ? (n.focus(), (n = null)) : t.editing.view.focus(),
                s.options.afterBlur && s.options.afterBlur(),
                i())
            })
        }
        _getFocusableCandidateToolbarDefinitions() {
          const t = []
          for (const e of this._focusableToolbarDefinitions) {
            const { toolbarView: n, options: i } = e
            ;(ha(n.element) || i.beforeFocus) && t.push(e)
          }
          return t.sort((t, e) => od(t) - od(e)), t
        }
        _getCurrentFocusedToolbarDefinition() {
          for (const t of this._focusableToolbarDefinitions)
            if (t.toolbarView.element && t.toolbarView.element.contains(this.focusTracker.focusedElement)) return t
          return null
        }
        _focusFocusableCandidateToolbar(t) {
          const {
            toolbarView: e,
            options: { beforeFocus: n },
          } = t
          return n && n(), !!ha(e.element) && (e.focus(), !0)
        }
      }
      function od(t) {
        const { toolbarView: e, options: n } = t
        let i = 10
        return ha(e.element) && i--, n.isContextual && i--, i
      }
      L(sd, I)
      const rd = {
        setData(t) {
          this.data.set(t)
        },
        getData(t) {
          return this.data.get(t)
        },
      }
      function ad(t, e) {
        t instanceof HTMLTextAreaElement && (t.value = e), (t.innerHTML = e)
      }
      const ld = {
        updateSourceElement(t = this.data.get()) {
          if (!this.sourceElement) throw new l('editor-missing-sourceelement', this)
          const e = this.config.get('updateSourceElementOnDestroy'),
            n = this.sourceElement instanceof HTMLTextAreaElement
          ad(this.sourceElement, e || n ? t : '')
        },
      }
      class cd extends Ai {
        static get pluginName() {
          return 'PendingActions'
        }
        init() {
          this.set('hasAny', !1),
            (this._actions = new mi({ idProperty: '_id' })),
            this._actions.delegate('add', 'remove').to(this)
        }
        add(t) {
          if ('string' != typeof t) throw new l('pendingactions-add-invalid-message', this)
          const e = Object.create(I)
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
      const hd =
        '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="9.5" cy="4.5" r="1.5"/><circle cx="9.5" cy="10.5" r="1.5"/><circle cx="9.5" cy="16.5" r="1.5"/></svg>'
      const dd = function (t) {
        return 'string' == typeof t || (!Pe(t) && ot(t) && '[object String]' == nt(t))
      }
      class ud extends Ah {
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
              ;(!dd(i) && fi(i)) || (i = [i])
              for (let e of i) dd(e) && (e = t.createTextNode(e)), o.appendChild(e)
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
      class fd extends Uh {
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
            for (e && (this.viewBox = e); this.element.firstChild; ) this.element.removeChild(this.element.firstChild)
            for (; t.childNodes.length > 0; ) this.element.appendChild(t.childNodes[0])
          }
        }
        _colorFillPaths() {
          this.fillColor &&
            this.element.querySelectorAll('.ck-icon__fill').forEach(t => {
              t.style.fill = this.fillColor
            })
        }
      }
      class md extends Uh {
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
            (this.labelView = this._createLabelView(n)),
            (this.iconView = new fd()),
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
            )
          const i = {
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
              'aria-pressed': e.to('isOn', t => !!this.isToggleable && String(!!t)),
              'data-cke-tooltip-text': e.to('_tooltipString'),
              'data-cke-tooltip-position': e.to('tooltipPosition'),
            },
            children: this.children,
            on: {
              click: e.to(t => {
                this.isEnabled ? this.fire('execute') : t.preventDefault()
              }),
            },
          }
          ro.isSafari &&
            (i.on.mousedown = e.to(t => {
              this.focus(), t.preventDefault()
            })),
            this.setTemplate(i)
        }
        render() {
          super.render(),
            this.icon && (this.iconView.bind('content').to(this, 'icon'), this.children.add(this.iconView)),
            this.children.add(this.labelView),
            this.withKeystroke && this.keystroke && this.children.add(this.keystrokeView)
        }
        focus() {
          this.element.focus()
        }
        _createLabelView(t) {
          const e = new Uh(),
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
          const t = new Uh()
          return (
            t.setTemplate({
              tag: 'span',
              attributes: { class: ['ck', 'ck-button__keystroke'] },
              children: [{ text: this.bindTemplate.to('keystroke', t => go(t)) }],
            }),
            t
          )
        }
        _getTooltipString(t, e, n) {
          return t
            ? 'string' == typeof t
              ? t
              : (n && (n = go(n)), t instanceof Function ? t(e, n) : `${e}${n ? ` (${n})` : ''}`)
            : ''
        }
      }
      class gd extends md {
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
          const t = new Uh()
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
      class pd extends md {
        constructor(t) {
          super(t),
            (this.arrowView = this._createArrowView()),
            this.extendTemplate({
              attributes: { 'aria-haspopup': !0, 'aria-expanded': this.bindTemplate.to('isOn', t => String(t)) },
            }),
            this.delegate('execute').to(this, 'open')
        }
        render() {
          super.render(), this.children.add(this.arrowView)
        }
        _createArrowView() {
          const t = new fd()
          return (
            (t.content =
              '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"/></svg>'),
            t.extendTemplate({ attributes: { class: 'ck-dropdown__arrow' } }),
            t
          )
        }
      }
      class _d extends Uh {
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
          this.children.length &&
            ('function' == typeof this.children.first.focus
              ? this.children.first.focus()
              : c('ui-dropdown-panel-focus-child-missing-focus', {
                  childView: this.children.first,
                  dropdownPanel: this,
                }))
        }
        focusLast() {
          if (this.children.length) {
            const t = this.children.last
            'function' == typeof t.focusLast ? t.focusLast() : t.focus()
          }
        }
      }
      class wd extends Uh {
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
            (this.keystrokes = new fa()),
            this.setTemplate({
              tag: 'div',
              attributes: {
                class: ['ck', 'ck-dropdown', i.to('class'), i.if('isEnabled', 'ck-disabled', t => !t)],
                id: i.to('id'),
                'aria-describedby': i.to('ariaDescribedById'),
              },
              children: [e, n],
            }),
            e.extendTemplate({
              attributes: { class: ['ck-dropdown__button'], 'data-cke-tooltip-disabled': i.to('isOpen') },
            })
        }
        render() {
          super.render(),
            this.listenTo(this.buttonView, 'open', () => {
              this.isOpen = !this.isOpen
            }),
            this.panelView.bind('isVisible').to(this, 'isOpen'),
            this.on('change:isOpen', () => {
              this.isOpen
                ? ('auto' === this.panelPosition
                    ? (this.panelView.position = wd._getOptimalPosition({
                        element: this.panelView.element,
                        target: this.buttonView.element,
                        fitInViewport: !0,
                        positions: this._panelPositions,
                      }).name)
                    : (this.panelView.position = this.panelPosition),
                  this.panelView.focus())
                : this.focus()
            }),
            this.keystrokes.listenTo(this.element)
          const t = (t, e) => {
            this.isOpen && ((this.isOpen = !1), e())
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
            northMiddleEast: l,
            northMiddleWest: c,
          } = wd.defaultPanelPositions
          return 'rtl' !== this.locale.uiLanguageDirection
            ? [n, i, r, a, t, s, o, l, c, e]
            : [i, n, a, r, t, o, s, c, l, e]
        }
      }
      ;(wd.defaultPanelPositions = {
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
        (wd._getOptimalPosition = Hh)
      class bd {
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
          return this.focusables.find(yd) || null
        }
        get last() {
          return this.focusables.filter(yd).slice(-1)[0] || null
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
            if (yd(e)) return e
            i = (i + n + t) % n
          } while (i !== e)
          return null
        }
      }
      function yd(t) {
        return !(!t.focus || !ha(t.element))
      }
      class vd extends Uh {
        constructor(t) {
          super(t), this.setTemplate({ tag: 'span', attributes: { class: ['ck', 'ck-toolbar__separator'] } })
        }
      }
      class Pd extends Uh {
        constructor(t) {
          super(t), this.setTemplate({ tag: 'span', attributes: { class: ['ck', 'ck-toolbar__line-break'] } })
        }
      }
      function kd(t) {
        return Array.isArray(t)
          ? { items: t, removeItems: [] }
          : t
          ? Object.assign({ items: [], removeItems: [] }, t)
          : { items: [], removeItems: [] }
      }
      class Ad extends Uh {
        constructor(t, e) {
          super(t)
          const n = this.bindTemplate,
            i = this.t
          ;(this.options = e || {}),
            this.set('ariaLabel', i('Editor toolbar')),
            this.set('maxWidth', 'auto'),
            (this.items = this.createCollection()),
            (this.focusTracker = new ua()),
            (this.keystrokes = new fa()),
            this.set('class'),
            this.set('isCompact', !1),
            (this.itemsView = new Cd(t)),
            (this.children = this.createCollection()),
            this.children.add(this.itemsView),
            (this.focusables = this.createCollection())
          const s = 'rtl' === t.uiLanguageDirection
          this._focusCycler = new bd({
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
            (this._behavior = this.options.shouldGroupWhenFull ? new Td(this) : new Ed(this))
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
          const n = kd(t),
            i = n.items.filter(
              (t, i, s) =>
                '|' === t ||
                (-1 === n.removeItems.indexOf(t) &&
                  ('-' === t
                    ? !this.options.shouldGroupWhenFull ||
                      (c('toolbarview-line-break-ignored-when-grouping-items', s), !1)
                    : !!e.has(t) || (c('toolbarview-item-unavailable', { name: t }), !1)))
            ),
            s = this._cleanSeparators(i).map(t => ('|' === t ? new vd() : '-' === t ? new Pd() : e.create(t)))
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
      class Cd extends Uh {
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
      class Ed {
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
      class Td {
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
          if (!ha(this.viewElement)) return void (this.shouldUpdateGroupingOnNextResize = !0)
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
            n = new ba(t.lastChild),
            i = new ba(t)
          if (!this.cachedPadding) {
            const n = wi.window.getComputedStyle(t),
              i = 'ltr' === e ? 'paddingRight' : 'paddingLeft'
            this.cachedPadding = Number.parseInt(n[i])
          }
          return 'ltr' === e ? n.right > i.right - this.cachedPadding : n.left < i.left + this.cachedPadding
        }
        _enableGroupingOnResize() {
          let t
          ;(this.resizeObserver = new ca(this.viewElement, e => {
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
            (this.viewChildren.add(new vd()),
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
            n = Od(t)
          return (
            (n.class = 'ck-toolbar__grouped-dropdown'),
            (n.panelPosition = 'ltr' === t.uiLanguageDirection ? 'sw' : 'se'),
            (function (t, e, n = {}) {
              const i = t.locale,
                s = i.t,
                o = (t.toolbarView = new Ad(i))
              o.set('ariaLabel', s('Dropdown toolbar')),
                t.extendTemplate({ attributes: { class: ['ck-toolbar-dropdown'] } }),
                e.map(t => o.items.add(t)),
                n.enableActiveItemFocusOnDropdownOpen && Id(t, () => o.items.find(t => t.isOn))
              t.panelView.children.add(o), o.items.delegate('execute').to(t)
            })(n, []),
            n.buttonView.set({
              label: e('Show more items'),
              tooltip: !0,
              tooltipPosition: 'rtl' === t.uiLanguageDirection ? 'se' : 'sw',
              icon: hd,
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
      class xd extends Uh {
        constructor() {
          super(),
            (this.items = this.createCollection()),
            (this.focusTracker = new ua()),
            (this.keystrokes = new fa()),
            (this._focusCycler = new bd({
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
      class Sd extends Uh {
        constructor(t) {
          super(t)
          const e = this.bindTemplate
          this.set('isVisible', !0),
            (this.children = this.createCollection()),
            this.setTemplate({
              tag: 'li',
              attributes: { class: ['ck', 'ck-list__item', e.if('isVisible', 'ck-hidden', t => !t)] },
              children: this.children,
            })
        }
        focus() {
          this.children.first.focus()
        }
      }
      class Rd extends Uh {
        constructor(t) {
          super(t), this.setTemplate({ tag: 'li', attributes: { class: ['ck', 'ck-list__separator'] } })
        }
      }
      function Od(t, e = pd) {
        const n = new e(t),
          i = new _d(t),
          s = new wd(t, n, i)
        return (
          n.bind('isEnabled').to(s),
          n instanceof pd ? n.bind('isOn').to(s, 'isOpen') : n.arrowView.bind('isOn').to(s, 'isOpen'),
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
                  e.source instanceof gd || (t.isOpen = !1)
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
      function Id(t, e) {
        t.on(
          'change:isOpen',
          () => {
            if (!t.isOpen) return
            const n = e()
            n &&
              ('function' == typeof n.focus
                ? n.focus()
                : c('ui-dropdown-focus-child-on-open-child-missing-focus', { view: n }))
          },
          { priority: 'low' }
        )
      }
      class Md extends Uh {
        constructor(t) {
          super(t), (this.body = new ud(t))
        }
        render() {
          super.render(), this.body.attachToDom()
        }
        destroy() {
          return this.body.detachFromDom(), super.destroy()
        }
      }
      class Nd extends Uh {
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
      class Dd extends Md {
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
            e = new Nd()
          return (e.text = t('Rich Text Editor')), e.extendTemplate({ attributes: { class: 'ck-voice-label' } }), e
        }
      }
      class Fd extends Uh {
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
      class Bd extends Fd {
        constructor(t, e, n, i = {}) {
          super(t, e, n)
          const s = t.t
          this.extendTemplate({ attributes: { role: 'textbox', class: 'ck-editor__editable_inline' } }),
            (this._generateLabel = i.label || (() => s('Editor editing area: %0', this.name)))
        }
        render() {
          super.render()
          const t = this._editingView
          t.change(e => {
            const n = t.document.getRoot(this.name)
            e.setAttribute('aria-label', this._generateLabel(this), n)
          })
        }
      }
      class Vd {
        constructor(t, e) {
          e && jr(this, e), t && this.set(t)
        }
      }
      L(Vd, I)
      Jh('px')
      const Ld = Jh('px')
      class jd extends Uh {
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
                  height: e.to('isSticky', t => (t ? Ld(this._panelRect.height) : null)),
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
                    t ? Ld(this._contentPanelPlaceholder.getBoundingClientRect().width) : null
                  ),
                  top: e.to('_hasViewportTopOffset', t => (t ? Ld(this.viewportTopOffset) : null)),
                  bottom: e.to('_isStickyToTheLimiter', t => (t ? Ld(this.limiterBottomOffset) : null)),
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
            this.listenTo(wi.window, 'scroll', () => {
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
                (this._marginLeft = this._isStickyToTheLimiter ? null : Ld(-wi.window.scrollX)))
              : ((this._isStickyToTheLimiter = !1), (this._hasViewportTopOffset = !1), (this._marginLeft = null))
        }
      }
      Jh('px')
      Jh('px')
      Jh('px')
      const Wd = new WeakMap()
      function $d(t, e) {
        return !!e.hasClass('ck-placeholder') && (t.removeClass('ck-placeholder', e), !0)
      }
      function zd(t, e) {
        const n = Wd.get(t),
          i = []
        let s = !1
        for (const [t, o] of n) o.isDirectHost && (i.push(t), qd(e, t, o) && (s = !0))
        for (const [t, o] of n) {
          if (o.isDirectHost) continue
          const n = Ud(t)
          n && (i.includes(n) || ((o.hostElement = n), qd(e, t, o) && (s = !0)))
        }
        return s
      }
      function qd(t, e, n) {
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
            return !!s && s.parent !== t
          })(o, n.keepOnFocus)
            ? (function (t, e) {
                return !e.hasClass('ck-placeholder') && (t.addClass('ck-placeholder', e), !0)
              })(t, o) && (r = !0)
            : $d(t, o) && (r = !0),
          r
        )
      }
      function Ud(t) {
        if (t.childCount) {
          const e = t.getChild(0)
          if (e.is('element') && !e.is('uiElement') && !e.is('attributeElement')) return e
        }
        return null
      }
      const Hd = new Map()
      function Kd(t, e, n) {
        let i = Hd.get(t)
        i || ((i = new Map()), Hd.set(t, i)), i.set(e, n)
      }
      function Gd(t) {
        return [t]
      }
      function Jd(t, e, n = {}) {
        const i = (function (t, e) {
          const n = Hd.get(t)
          return n && n.has(e) ? n.get(e) : Gd
        })(t.constructor, e.constructor)
        try {
          return i((t = t.clone()), e, n)
        } catch (t) {
          throw t
        }
      }
      function Yd(t, e, n) {
        ;(t = t.slice()), (e = e.slice())
        const i = new Xd(n.document, n.useRelations, n.forceWeakRemove)
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
            l = Jd(n, r, i.getContext(n, r, !0)),
            c = Jd(r, n, i.getContext(r, n, !1))
          i.updateRelation(n, r), i.setOriginalOperations(l, n), i.setOriginalOperations(c, r)
          for (const t of l) o.set(t, s + c.length)
          t.splice(a, 1, ...l), e.splice(s, 1, ...c)
        }
        if (n.padWithNoOps) {
          const n = t.length - r.originalOperationsACount,
            i = e.length - r.originalOperationsBCount
          Qd(t, i - n), Qd(e, n - i)
        }
        return (
          Zd(t, r.nextBaseVersionB),
          Zd(e, r.nextBaseVersionA),
          { operationsA: t, operationsB: e, originalOperations: s }
        )
      }
      class Xd {
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
          if (t instanceof Nc)
            e instanceof jc
              ? t.targetPosition.isEqual(e.sourcePosition) || e.movedRange.containsPosition(t.targetPosition)
                ? this._setRelation(t, e, 'insertAtSource')
                : t.targetPosition.isEqual(e.deletionPosition)
                ? this._setRelation(t, e, 'insertBetween')
                : t.targetPosition.isAfter(e.sourcePosition) && this._setRelation(t, e, 'moveTargetAfter')
              : e instanceof Nc &&
                (t.targetPosition.isEqual(e.sourcePosition) || t.targetPosition.isBefore(e.sourcePosition)
                  ? this._setRelation(t, e, 'insertBefore')
                  : this._setRelation(t, e, 'insertAfter'))
          else if (t instanceof Wc) {
            if (e instanceof jc) t.splitPosition.isBefore(e.sourcePosition) && this._setRelation(t, e, 'splitBefore')
            else if (e instanceof Nc)
              if (t.splitPosition.isEqual(e.sourcePosition) || t.splitPosition.isBefore(e.sourcePosition))
                this._setRelation(t, e, 'splitBefore')
              else {
                const n = Ua._createFromPositionAndShift(e.sourcePosition, e.howMany)
                if (t.splitPosition.hasSameParentAs(e.sourcePosition) && n.containsPosition(t.splitPosition)) {
                  const i = n.end.offset - t.splitPosition.offset,
                    s = t.splitPosition.offset - n.start.offset
                  this._setRelation(t, e, { howMany: i, offset: s })
                }
              }
          } else if (t instanceof jc)
            e instanceof jc
              ? (t.targetPosition.isEqual(e.sourcePosition) || this._setRelation(t, e, 'mergeTargetNotMoved'),
                t.sourcePosition.isEqual(e.targetPosition) && this._setRelation(t, e, 'mergeSourceNotMoved'),
                t.sourcePosition.isEqual(e.sourcePosition) && this._setRelation(t, e, 'mergeSameElement'))
              : e instanceof Wc && t.sourcePosition.isEqual(e.splitPosition) && this._setRelation(t, e, 'splitAtSource')
          else if (t instanceof Fc) {
            const n = t.newRange
            if (!n) return
            if (e instanceof Nc) {
              const i = Ua._createFromPositionAndShift(e.sourcePosition, e.howMany),
                s = i.containsPosition(n.start) || i.start.isEqual(n.start),
                o = i.containsPosition(n.end) || i.end.isEqual(n.end)
              ;(!s && !o) ||
                i.containsRange(n) ||
                this._setRelation(t, e, {
                  side: s ? 'left' : 'right',
                  path: s ? n.start.path.slice() : n.end.path.slice(),
                })
            } else if (e instanceof jc) {
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
      function Zd(t, e) {
        for (const n of t) n.baseVersion = e++
      }
      function Qd(t, e) {
        for (let n = 0; n < e; n++) t.push(new Bc(0))
      }
      function tu(t, e, n) {
        const i = t.nodes.getNode(0).getAttribute(e)
        if (i == n) return null
        const s = new Ua(t.position, t.position.getShiftedBy(t.howMany))
        return new Mc(s, e, i, n, 0)
      }
      function eu(t, e) {
        return null === t.targetPosition._getTransformedByDeletion(e.sourcePosition, e.howMany)
      }
      function nu(t, e) {
        const n = []
        for (let i = 0; i < t.length; i++) {
          const s = t[i],
            o = new Nc(s.start, s.end.offset - s.start.offset, e, 0)
          n.push(o)
          for (let e = i + 1; e < t.length; e++)
            t[e] = t[e]._getTransformedByMove(o.sourcePosition, o.targetPosition, o.howMany)[0]
          e = e._getTransformedByMove(o.sourcePosition, o.targetPosition, o.howMany)
        }
        return n
      }
      Kd(Mc, Mc, (t, e, n) => {
        if (t.key === e.key && t.range.start.hasSameParentAs(e.range.start)) {
          const i = t.range.getDifference(e.range).map(e => new Mc(e, t.key, t.oldValue, t.newValue, 0)),
            s = t.range.getIntersection(e.range)
          return (
            s && n.aIsStrong && i.push(new Mc(s, e.key, e.newValue, t.newValue, 0)), 0 == i.length ? [new Bc(0)] : i
          )
        }
        return [t]
      }),
        Kd(Mc, Dc, (t, e) => {
          if (t.range.start.hasSameParentAs(e.position) && t.range.containsPosition(e.position)) {
            const n = t.range
              ._getTransformedByInsertion(e.position, e.howMany, !e.shouldReceiveAttributes)
              .map(e => new Mc(e, t.key, t.oldValue, t.newValue, t.baseVersion))
            if (e.shouldReceiveAttributes) {
              const i = tu(e, t.key, t.oldValue)
              i && n.unshift(i)
            }
            return n
          }
          return (t.range = t.range._getTransformedByInsertion(e.position, e.howMany, !1)[0]), [t]
        }),
        Kd(Mc, jc, (t, e) => {
          const n = []
          t.range.start.hasSameParentAs(e.deletionPosition) &&
            (t.range.containsPosition(e.deletionPosition) || t.range.start.isEqual(e.deletionPosition)) &&
            n.push(Ua._createFromPositionAndShift(e.graveyardPosition, 1))
          const i = t.range._getTransformedByMergeOperation(e)
          return i.isCollapsed || n.push(i), n.map(e => new Mc(e, t.key, t.oldValue, t.newValue, t.baseVersion))
        }),
        Kd(Mc, Nc, (t, e) => {
          const n = (function (t, e) {
            const n = Ua._createFromPositionAndShift(e.sourcePosition, e.howMany)
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
                i = t.start.hasSameParentAs(n),
                s = t._getTransformedByInsertion(n, e.howMany, i)
              o.push(...s)
            }
            i && o.push(i._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany, !1)[0])
            return o
          })(t.range, e)
          return n.map(e => new Mc(e, t.key, t.oldValue, t.newValue, t.baseVersion))
        }),
        Kd(Mc, Wc, (t, e) => {
          if (t.range.end.isEqual(e.insertionPosition)) return e.graveyardPosition || t.range.end.offset++, [t]
          if (t.range.start.hasSameParentAs(e.splitPosition) && t.range.containsPosition(e.splitPosition)) {
            const n = t.clone()
            return (
              (n.range = new Ua(
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
        Kd(Dc, Mc, (t, e) => {
          const n = [t]
          if (
            t.shouldReceiveAttributes &&
            t.position.hasSameParentAs(e.range.start) &&
            e.range.containsPosition(t.position)
          ) {
            const i = tu(t, e.key, e.newValue)
            i && n.push(i)
          }
          return n
        }),
        Kd(
          Dc,
          Dc,
          (t, e, n) => (
            (t.position.isEqual(e.position) && n.aIsStrong) ||
              (t.position = t.position._getTransformedByInsertOperation(e)),
            [t]
          )
        ),
        Kd(Dc, Nc, (t, e) => ((t.position = t.position._getTransformedByMoveOperation(e)), [t])),
        Kd(Dc, Wc, (t, e) => ((t.position = t.position._getTransformedBySplitOperation(e)), [t])),
        Kd(Dc, jc, (t, e) => ((t.position = t.position._getTransformedByMergeOperation(e)), [t])),
        Kd(
          Fc,
          Dc,
          (t, e) => (
            t.oldRange && (t.oldRange = t.oldRange._getTransformedByInsertOperation(e)[0]),
            t.newRange && (t.newRange = t.newRange._getTransformedByInsertOperation(e)[0]),
            [t]
          )
        ),
        Kd(Fc, Fc, (t, e, n) => {
          if (t.name == e.name) {
            if (!n.aIsStrong) return [new Bc(0)]
            t.oldRange = e.newRange ? e.newRange.clone() : null
          }
          return [t]
        }),
        Kd(
          Fc,
          jc,
          (t, e) => (
            t.oldRange && (t.oldRange = t.oldRange._getTransformedByMergeOperation(e)),
            t.newRange && (t.newRange = t.newRange._getTransformedByMergeOperation(e)),
            [t]
          )
        ),
        Kd(Fc, Nc, (t, e, n) => {
          if (
            (t.oldRange && (t.oldRange = Ua._createFromRanges(t.oldRange._getTransformedByMoveOperation(e))),
            t.newRange)
          ) {
            if (n.abRelation) {
              const i = Ua._createFromRanges(t.newRange._getTransformedByMoveOperation(e))
              if ('left' == n.abRelation.side && e.targetPosition.isEqual(t.newRange.start))
                return (t.newRange.end = i.end), (t.newRange.start.path = n.abRelation.path), [t]
              if ('right' == n.abRelation.side && e.targetPosition.isEqual(t.newRange.end))
                return (t.newRange.start = i.start), (t.newRange.end.path = n.abRelation.path), [t]
            }
            t.newRange = Ua._createFromRanges(t.newRange._getTransformedByMoveOperation(e))
          }
          return [t]
        }),
        Kd(Fc, Wc, (t, e, n) => {
          if ((t.oldRange && (t.oldRange = t.oldRange._getTransformedBySplitOperation(e)), t.newRange)) {
            if (n.abRelation) {
              const i = t.newRange._getTransformedBySplitOperation(e)
              return (
                t.newRange.start.isEqual(e.splitPosition) && n.abRelation.wasStartBeforeMergedElement
                  ? (t.newRange.start = Wa._createAt(e.insertionPosition))
                  : t.newRange.start.isEqual(e.splitPosition) &&
                    !n.abRelation.wasInLeftElement &&
                    (t.newRange.start = Wa._createAt(e.moveTargetPosition)),
                t.newRange.end.isEqual(e.splitPosition) && n.abRelation.wasInRightElement
                  ? (t.newRange.end = Wa._createAt(e.moveTargetPosition))
                  : t.newRange.end.isEqual(e.splitPosition) && n.abRelation.wasEndBeforeMergedElement
                  ? (t.newRange.end = Wa._createAt(e.insertionPosition))
                  : (t.newRange.end = i.end),
                [t]
              )
            }
            t.newRange = t.newRange._getTransformedBySplitOperation(e)
          }
          return [t]
        }),
        Kd(
          jc,
          Dc,
          (t, e) => (
            t.sourcePosition.hasSameParentAs(e.position) && (t.howMany += e.howMany),
            (t.sourcePosition = t.sourcePosition._getTransformedByInsertOperation(e)),
            (t.targetPosition = t.targetPosition._getTransformedByInsertOperation(e)),
            [t]
          )
        ),
        Kd(jc, jc, (t, e, n) => {
          if (t.sourcePosition.isEqual(e.sourcePosition) && t.targetPosition.isEqual(e.targetPosition)) {
            if (n.bWasUndone) {
              const n = e.graveyardPosition.path.slice()
              return n.push(0), (t.sourcePosition = new Wa(e.graveyardPosition.root, n)), (t.howMany = 0), [t]
            }
            return [new Bc(0)]
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
              return [new Nc(n, t.howMany, i, 0)]
            }
            return [new Bc(0)]
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
        Kd(jc, Nc, (t, e, n) => {
          const i = Ua._createFromPositionAndShift(e.sourcePosition, e.howMany)
          return 'remove' == e.type &&
            !n.bWasUndone &&
            !n.forceWeakRemove &&
            t.deletionPosition.hasSameParentAs(e.sourcePosition) &&
            i.containsPosition(t.sourcePosition)
            ? [new Bc(0)]
            : (t.sourcePosition.hasSameParentAs(e.targetPosition) && (t.howMany += e.howMany),
              t.sourcePosition.hasSameParentAs(e.sourcePosition) && (t.howMany -= e.howMany),
              (t.sourcePosition = t.sourcePosition._getTransformedByMoveOperation(e)),
              (t.targetPosition = t.targetPosition._getTransformedByMoveOperation(e)),
              t.graveyardPosition.isEqual(e.targetPosition) ||
                (t.graveyardPosition = t.graveyardPosition._getTransformedByMoveOperation(e)),
              [t])
        }),
        Kd(jc, Wc, (t, e, n) => {
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
        Kd(Nc, Dc, (t, e) => {
          const n = Ua._createFromPositionAndShift(t.sourcePosition, t.howMany)._getTransformedByInsertOperation(
            e,
            !1
          )[0]
          return (
            (t.sourcePosition = n.start),
            (t.howMany = n.end.offset - n.start.offset),
            t.targetPosition.isEqual(e.position) ||
              (t.targetPosition = t.targetPosition._getTransformedByInsertOperation(e)),
            [t]
          )
        }),
        Kd(Nc, Nc, (t, e, n) => {
          const i = Ua._createFromPositionAndShift(t.sourcePosition, t.howMany),
            s = Ua._createFromPositionAndShift(e.sourcePosition, e.howMany)
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
            eu(t, e) && eu(e, t))
          )
            return [e.getReversed()]
          if (i.containsPosition(e.targetPosition) && i.containsRange(s, !0))
            return (
              (i.start = i.start._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany)),
              (i.end = i.end._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany)),
              nu([i], o)
            )
          if (s.containsPosition(t.targetPosition) && s.containsRange(i, !0))
            return (
              (i.start = i.start._getCombined(e.sourcePosition, e.getMovedRangeStart())),
              (i.end = i.end._getCombined(e.sourcePosition, e.getMovedRangeStart())),
              nu([i], o)
            )
          const l = Ei(t.sourcePosition.getParentPath(), e.sourcePosition.getParentPath())
          if ('prefix' == l || 'extension' == l)
            return (
              (i.start = i.start._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany)),
              (i.end = i.end._getTransformedByMove(e.sourcePosition, e.targetPosition, e.howMany)),
              nu([i], o)
            )
          'remove' != t.type || 'remove' == e.type || n.aWasUndone || n.forceWeakRemove
            ? 'remove' == t.type || 'remove' != e.type || n.bWasUndone || n.forceWeakRemove || (r = !1)
            : (r = !0)
          const c = [],
            h = i.getDifference(s)
          for (const t of h) {
            ;(t.start = t.start._getTransformedByDeletion(e.sourcePosition, e.howMany)),
              (t.end = t.end._getTransformedByDeletion(e.sourcePosition, e.howMany))
            const n = 'same' == Ei(t.start.getParentPath(), e.getMovedRangeStart().getParentPath()),
              i = t._getTransformedByInsertion(e.getMovedRangeStart(), e.howMany, n)
            c.push(...i)
          }
          const d = i.getIntersection(s)
          return (
            null !== d &&
              r &&
              ((d.start = d.start._getCombined(e.sourcePosition, e.getMovedRangeStart())),
              (d.end = d.end._getCombined(e.sourcePosition, e.getMovedRangeStart())),
              0 === c.length
                ? c.push(d)
                : 1 == c.length
                ? s.start.isBefore(i.start) || s.start.isEqual(i.start)
                  ? c.unshift(d)
                  : c.push(d)
                : c.splice(1, 0, d)),
            0 === c.length ? [new Bc(t.baseVersion)] : nu(c, o)
          )
        }),
        Kd(Nc, Wc, (t, e, n) => {
          let i = t.targetPosition.clone()
          ;(t.targetPosition.isEqual(e.insertionPosition) &&
            e.graveyardPosition &&
            'moveTargetAfter' != n.abRelation) ||
            (i = t.targetPosition._getTransformedBySplitOperation(e))
          const s = Ua._createFromPositionAndShift(t.sourcePosition, t.howMany)
          if (s.end.isEqual(e.insertionPosition)) return e.graveyardPosition || t.howMany++, (t.targetPosition = i), [t]
          if (s.start.hasSameParentAs(e.splitPosition) && s.containsPosition(e.splitPosition)) {
            let t = new Ua(e.splitPosition, s.end)
            t = t._getTransformedBySplitOperation(e)
            return nu([new Ua(s.start, e.splitPosition), t], i)
          }
          t.targetPosition.isEqual(e.splitPosition) && 'insertAtSource' == n.abRelation && (i = e.moveTargetPosition),
            t.targetPosition.isEqual(e.insertionPosition) && 'insertBetween' == n.abRelation && (i = t.targetPosition)
          const o = [s._getTransformedBySplitOperation(e)]
          if (e.graveyardPosition) {
            const i = s.start.isEqual(e.graveyardPosition) || s.containsPosition(e.graveyardPosition)
            t.howMany > 1 && i && !n.aWasUndone && o.push(Ua._createFromPositionAndShift(e.insertionPosition, 1))
          }
          return nu(o, i)
        }),
        Kd(Nc, jc, (t, e, n) => {
          const i = Ua._createFromPositionAndShift(t.sourcePosition, t.howMany)
          if (e.deletionPosition.hasSameParentAs(t.sourcePosition) && i.containsPosition(e.sourcePosition))
            if ('remove' != t.type || n.forceWeakRemove) {
              if (1 == t.howMany)
                return n.bWasUndone
                  ? ((t.sourcePosition = e.graveyardPosition.clone()),
                    (t.targetPosition = t.targetPosition._getTransformedByMergeOperation(e)),
                    [t])
                  : [new Bc(0)]
            } else if (!n.aWasUndone) {
              const n = []
              let i = e.graveyardPosition.clone(),
                s = e.targetPosition._getTransformedByMergeOperation(e)
              t.howMany > 1 &&
                (n.push(new Nc(t.sourcePosition, t.howMany - 1, t.targetPosition, 0)),
                (i = i._getTransformedByMove(t.sourcePosition, t.targetPosition, t.howMany - 1)),
                (s = s._getTransformedByMove(t.sourcePosition, t.targetPosition, t.howMany - 1)))
              const o = e.deletionPosition._getCombined(t.sourcePosition, t.targetPosition),
                r = new Nc(i, 1, o, 0),
                a = r.getMovedRangeStart().path.slice()
              a.push(0)
              const l = new Wa(r.targetPosition.root, a)
              s = s._getTransformedByMove(i, o, 1)
              const c = new Nc(s, e.howMany, l, 0)
              return n.push(r), n.push(c), n
            }
          const s = Ua._createFromPositionAndShift(t.sourcePosition, t.howMany)._getTransformedByMergeOperation(e)
          return (
            (t.sourcePosition = s.start),
            (t.howMany = s.end.offset - s.start.offset),
            (t.targetPosition = t.targetPosition._getTransformedByMergeOperation(e)),
            [t]
          )
        }),
        Kd(Vc, Dc, (t, e) => ((t.position = t.position._getTransformedByInsertOperation(e)), [t])),
        Kd(Vc, jc, (t, e) =>
          t.position.isEqual(e.deletionPosition)
            ? ((t.position = e.graveyardPosition.clone()), (t.position.stickiness = 'toNext'), [t])
            : ((t.position = t.position._getTransformedByMergeOperation(e)), [t])
        ),
        Kd(Vc, Nc, (t, e) => ((t.position = t.position._getTransformedByMoveOperation(e)), [t])),
        Kd(Vc, Vc, (t, e, n) => {
          if (t.position.isEqual(e.position)) {
            if (!n.aIsStrong) return [new Bc(0)]
            t.oldName = e.newName
          }
          return [t]
        }),
        Kd(Vc, Wc, (t, e) => {
          if ('same' == Ei(t.position.path, e.splitPosition.getParentPath()) && !e.graveyardPosition) {
            const e = new Vc(t.position.getShiftedBy(1), t.oldName, t.newName, 0)
            return [t, e]
          }
          return (t.position = t.position._getTransformedBySplitOperation(e)), [t]
        }),
        Kd(Lc, Lc, (t, e, n) => {
          if (t.root === e.root && t.key === e.key) {
            if (!n.aIsStrong || t.newValue === e.newValue) return [new Bc(0)]
            t.oldValue = e.newValue
          }
          return [t]
        }),
        Kd(
          Wc,
          Dc,
          (t, e) => (
            t.splitPosition.hasSameParentAs(e.position) &&
              t.splitPosition.offset < e.position.offset &&
              (t.howMany += e.howMany),
            (t.splitPosition = t.splitPosition._getTransformedByInsertOperation(e)),
            (t.insertionPosition = t.insertionPosition._getTransformedByInsertOperation(e)),
            [t]
          )
        ),
        Kd(Wc, jc, (t, e, n) => {
          if (!t.graveyardPosition && !n.bWasUndone && t.splitPosition.hasSameParentAs(e.sourcePosition)) {
            const n = e.graveyardPosition.path.slice()
            n.push(0)
            const i = new Wa(e.graveyardPosition.root, n),
              s = Wc.getInsertionPosition(new Wa(e.graveyardPosition.root, n)),
              o = new Wc(i, 0, s, null, 0)
            return (
              (t.splitPosition = t.splitPosition._getTransformedByMergeOperation(e)),
              (t.insertionPosition = Wc.getInsertionPosition(t.splitPosition)),
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
            (t.insertionPosition = Wc.getInsertionPosition(t.splitPosition)),
            t.graveyardPosition && (t.graveyardPosition = t.graveyardPosition._getTransformedByMergeOperation(e)),
            [t]
          )
        }),
        Kd(Wc, Nc, (t, e, n) => {
          const i = Ua._createFromPositionAndShift(e.sourcePosition, e.howMany)
          if (t.graveyardPosition) {
            const s = i.start.isEqual(t.graveyardPosition) || i.containsPosition(t.graveyardPosition)
            if (!n.bWasUndone && s) {
              const n = t.splitPosition._getTransformedByMoveOperation(e),
                i = t.graveyardPosition._getTransformedByMoveOperation(e),
                s = i.path.slice()
              s.push(0)
              const o = new Wa(i.root, s)
              return [new Nc(n, t.howMany, o, 0)]
            }
            t.graveyardPosition = t.graveyardPosition._getTransformedByMoveOperation(e)
          }
          const s = t.splitPosition.isEqual(e.targetPosition)
          if (s && ('insertAtSource' == n.baRelation || 'splitBefore' == n.abRelation))
            return (
              (t.howMany += e.howMany),
              (t.splitPosition = t.splitPosition._getTransformedByDeletion(e.sourcePosition, e.howMany)),
              (t.insertionPosition = Wc.getInsertionPosition(t.splitPosition)),
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
              (t.insertionPosition = Wc.getInsertionPosition(t.splitPosition)),
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
              : (t.insertionPosition = Wc.getInsertionPosition(t.splitPosition)),
            [t]
          )
        }),
        Kd(Wc, Wc, (t, e, n) => {
          if (t.splitPosition.isEqual(e.splitPosition)) {
            if (!t.graveyardPosition && !e.graveyardPosition) return [new Bc(0)]
            if (t.graveyardPosition && e.graveyardPosition && t.graveyardPosition.isEqual(e.graveyardPosition))
              return [new Bc(0)]
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
                e.howMany && n.push(new Nc(e.moveTargetPosition, e.howMany, e.splitPosition, 0)),
                t.howMany && n.push(new Nc(t.splitPosition, t.howMany, t.moveTargetPosition, 0)),
                n
              )
            }
            return [new Bc(0)]
          }
          if (
            (t.graveyardPosition && (t.graveyardPosition = t.graveyardPosition._getTransformedBySplitOperation(e)),
            t.splitPosition.isEqual(e.insertionPosition) && 'splitBefore' == n.abRelation)
          )
            return t.howMany++, [t]
          if (e.splitPosition.isEqual(t.insertionPosition) && 'splitBefore' == n.baRelation) {
            const n = e.insertionPosition.path.slice()
            n.push(0)
            const i = new Wa(e.insertionPosition.root, n)
            return [t, new Nc(t.insertionPosition, 1, i, 0)]
          }
          return (
            t.splitPosition.hasSameParentAs(e.splitPosition) &&
              t.splitPosition.offset < e.splitPosition.offset &&
              (t.howMany -= e.howMany),
            (t.splitPosition = t.splitPosition._getTransformedBySplitOperation(e)),
            (t.insertionPosition = Wc.getInsertionPosition(t.splitPosition)),
            [t]
          )
        })
      class iu extends $r {
        constructor(t) {
          super(t), (this.domEventType = ['mousedown', 'mouseup', 'mouseover', 'mouseout'])
        }
        onDomEvent(t) {
          this.fire(t.type, t)
        }
      }
      class su {
        constructor(t) {
          this.document = t
        }
        createDocumentFragment(t) {
          return new Po(this.document, t)
        }
        createElement(t, e, n) {
          return new Os(this.document, t, e, n)
        }
        createText(t) {
          return new Si(this.document, t)
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
          const n = new Os(this.document, t, e.getAttributes(), e.getChildren())
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
          dt(t) && void 0 === n ? e._setStyle(t) : n._setStyle(t, e)
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
          return Ls._createAt(t, e)
        }
        createPositionAfter(t) {
          return Ls._createAfter(t)
        }
        createPositionBefore(t) {
          return Ls._createBefore(t)
        }
        createRange(t, e) {
          return new js(t, e)
        }
        createRangeOn(t) {
          return js._createOn(t)
        }
        createRangeIn(t) {
          return js._createIn(t)
        }
        createSelection(...t) {
          return new zs(...t)
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
      class ou extends sd {
        constructor(t, e) {
          super(t),
            (this.view = e),
            (this._toolbarConfig = kd(t.config.get('toolbar'))),
            (this._elementReplacer = new la())
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
          const t = this.view
          t.stickyPanel.bind('isActive').to(this.focusTracker, 'isFocused'),
            (t.stickyPanel.limiterElement = t.element),
            t.stickyPanel.bind('viewportTopOffset').to(this, 'viewportOffset', ({ top: t }) => t),
            t.toolbar.fillFromConfig(this._toolbarConfig, this.componentFactory),
            this.addToolbar(t.toolbar)
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
              Wd.has(r) || (Wd.set(r, new Map()), r.registerPostFixer(t => zd(r, t))),
                Wd.get(r).set(n, { text: i, isDirectHost: s, keepOnFocus: o, hostElement: s ? n : null }),
                e.change(t => zd(r, t))
            })({ view: e, element: n, text: s, isDirectHost: !1, keepOnFocus: !0 })
        }
      }
      class ru extends Dd {
        constructor(t, e, n = {}) {
          super(t),
            (this.stickyPanel = new jd(t)),
            (this.toolbar = new Ad(t, { shouldGroupWhenFull: n.shouldToolbarGroupWhenFull })),
            (this.editable = new Bd(t, e))
        }
        render() {
          super.render(),
            this.stickyPanel.content.add(this.toolbar),
            this.top.add(this.stickyPanel),
            this.main.add(this.editable)
        }
      }
      class au extends vh {
        constructor(t, e = {}) {
          if (!ci(t) && void 0 !== e.initialData) throw new l('editor-create-initial-data', null)
          super(e),
            void 0 === this.config.get('initialData') &&
              this.config.set(
                'initialData',
                (function (t) {
                  return ci(t) ? ((e = t), e instanceof HTMLTextAreaElement ? e.value : e.innerHTML) : t
                  var e
                })(t)
              ),
            ci(t) && (this.sourceElement = t),
            this.model.document.createRoot()
          const n = !this.config.get('toolbar.shouldNotGroupWhenFull'),
            i = new ru(this.locale, this.editing.view, { shouldToolbarGroupWhenFull: n })
          ;(this.ui = new ou(this, i)),
            (function (t) {
              if (!Et(t.updateSourceElement)) throw new l('attachtoform-missing-elementapi-interface', t)
              const e = t.sourceElement
              if (e && 'textarea' === e.tagName.toLowerCase() && e.form) {
                let n
                const i = e.form,
                  s = () => t.updateSourceElement()
                Et(i.submit) &&
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
                .then(() => i.ui.init(ci(t) ? t : null))
                .then(() => i.data.init(i.config.get('initialData')))
                .then(() => i.fire('ready'))
                .then(() => i)
            )
          })
        }
      }
      L(au, rd), L(au, ld)
      class lu extends j {
        static get pluginName() {
          return 'Autosave'
        }
        static get requires() {
          return [cd]
        }
        constructor(t) {
          super(t)
          const e = t.config.get('autosave') || {},
            n = e.waitingTime || 1e3
          this.set('state', 'synchronized'),
            (this._debouncedSave = na(this._save.bind(this), n)),
            (this._lastDocumentVersion = t.model.document.version),
            (this._savePromise = null),
            (this._domEmitter = Object.create(fr)),
            (this._config = e),
            (this._pendingActions = t.plugins.get(cd)),
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
      L(lu, I)
      class cu extends $ {
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
      const hu = 'bold'
      class du extends j {
        static get pluginName() {
          return 'BoldEditing'
        }
        init() {
          const t = this.editor
          t.model.schema.extend('$text', { allowAttributes: hu }),
            t.model.schema.setAttributeProperties(hu, { isFormatting: !0, copyOnEnter: !0 }),
            t.conversion.attributeToElement({
              model: hu,
              view: 'strong',
              upcastAlso: [
                'b',
                t => {
                  const e = t.getStyle('font-weight')
                  return e ? ('bold' == e || Number(e) >= 600 ? { name: !0, styles: ['font-weight'] } : void 0) : null
                },
              ],
            }),
            t.commands.add(hu, new cu(t, hu)),
            t.keystrokes.set('CTRL+B', hu)
        }
      }
      const uu = 'bold'
      class fu extends j {
        static get pluginName() {
          return 'BoldUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add(uu, n => {
            const i = t.commands.get(uu),
              s = new md(n)
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
                t.execute(uu), t.editing.view.focus()
              }),
              s
            )
          })
        }
      }
      class mu {
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
      class gu extends $r {
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
          const e = { dataTransfer: new mu(t.clipboardData ? t.clipboardData : t.dataTransfer) }
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
      const pu = ['figcaption', 'li']
      function _u(t) {
        let e = ''
        if (t.is('$text') || t.is('$textProxy')) e = t.data
        else if (t.is('element', 'img') && t.hasAttribute('alt')) e = t.getAttribute('alt')
        else if (t.is('element', 'br')) e = '\n'
        else {
          let n = null
          for (const i of t.getChildren()) {
            const t = _u(i)
            n &&
              (n.is('containerElement') || i.is('containerElement')) &&
              (pu.includes(n.name) || pu.includes(i.name) ? (e += '\n') : (e += '\n\n')),
              (e += t),
              (n = i)
          }
        }
        return e
      }
      class wu extends j {
        static get pluginName() {
          return 'ClipboardPipeline'
        }
        init() {
          this.editor.editing.view.addObserver(gu), this._setupPasteDrop(), this._setupCopyCut()
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
                  i.dataTransfer.setData('text/plain', _u(i.content))),
                  'cut' == i.method && t.model.deleteContent(e.selection)
              },
              { priority: 'low' }
            )
        }
      }
      function* bu(t, e) {
        for (const n of e) n && t.getAttributeProperties(n[0]).copyOnEnter && (yield n)
      }
      class yu extends $ {
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
                const t = bu(e.model.schema, n.getAttributes())
                vu(e, o.start), e.setSelectionAttribute(t)
              } else {
                const i = !(o.start.isAtStart && o.end.isAtEnd),
                  s = r == a
                t.deleteContent(n, { leaveUnmerged: i }), i && (s ? vu(e, n.focus) : e.setSelection(a, 0))
              }
            })(this.editor.model, n, e.selection, t.schema),
              this.fire('afterExecute', { writer: n })
          })
        }
      }
      function vu(t, e) {
        t.split(e), t.setSelection(e.parent.nextSibling, 0)
      }
      class Pu extends _r {
        constructor(t) {
          super(t)
          const e = this.document
          e.on('keydown', (t, n) => {
            if (this.isEnabled && n.keyCode == ho.enter) {
              const i = new Us(e, 'enter', e.selection.getFirstRange())
              e.fire(i, new Wr(e, n.domEvent, { isSoft: n.shiftKey })), i.stop.called && t.stop()
            }
          })
        }
        observe() {}
      }
      class ku extends j {
        static get pluginName() {
          return 'Enter'
        }
        init() {
          const t = this.editor,
            e = t.editing.view,
            n = e.document
          e.addObserver(Pu),
            t.commands.add('enter', new yu(t)),
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
      class Au {
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
      class Cu extends $ {
        constructor(t, e) {
          super(t), (this.direction = e), (this._buffer = new Au(t.model, t.config.get('typing.undoStep')))
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
                a += $s(t.getWalker({ singleCharacters: !0, ignoreElementEnd: !0, shallow: !0 }))
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
      function Eu(t) {
        if (t.newChildren.length - t.oldChildren.length != 1) return
        const e = (function (t, e) {
          const n = []
          let i = 0,
            s = null
          return (
            t.forEach(t => {
              'equal' == t
                ? (o(), i++)
                : 'insert' == t
                ? (s && 'insert' == s.type
                    ? s.values.push(e[i])
                    : (o(), (s = { type: 'insert', index: i, values: [e[i]] })),
                  i++)
                : s && 'delete' == s.type
                ? s.howMany++
                : (o(), (s = { type: 'delete', index: i, howMany: 1 }))
            }),
            o(),
            n
          )
          function o() {
            s && (n.push(s), (s = null))
          }
        })(Ho(t.oldChildren, t.newChildren, Tu), t.newChildren)
        if (e.length > 1) return
        const n = e[0]
        return n.values[0] && n.values[0].is('$text') ? n : void 0
      }
      function Tu(t, e) {
        return t && t.is('$text') && e && e.is('$text') ? t.data === e.data : t === e
      }
      function xu(t, e) {
        const n = e.selection,
          i = t.shiftKey && t.keyCode === ho.delete,
          s = !n.isCollapsed
        return i && s
      }
      class Su extends _r {
        constructor(t) {
          super(t)
          const e = t.document
          let n = 0
          function i(t, n, i) {
            const s = new Us(e, 'delete', e.selection.getFirstRange())
            e.fire(s, new Wr(e, n, i)), s.stop.called && t.stop()
          }
          e.on('keyup', (t, e) => {
            ;(e.keyCode != ho.delete && e.keyCode != ho.backspace) || (n = 0)
          }),
            e.on('keydown', (t, s) => {
              if (ro.isWindows && xu(s, e)) return
              const o = {}
              if (s.keyCode == ho.delete) (o.direction = 'forward'), (o.unit = 'character')
              else {
                if (s.keyCode != ho.backspace) return
                ;(o.direction = 'backward'), (o.unit = 'codePoint')
              }
              const r = ro.isMac ? s.altKey : s.ctrlKey
              ;(o.unit = r ? 'word' : o.unit), (o.sequence = ++n), i(t, s.domEvent, o)
            }),
            ro.isAndroid &&
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
      class Ru extends j {
        static get pluginName() {
          return 'Delete'
        }
        init() {
          const t = this.editor,
            e = t.editing.view,
            n = e.document,
            i = t.model.document
          e.addObserver(Su), (this._undoOnBackspace = !1)
          const s = new Cu(t, 'forward')
          if (
            (t.commands.add('deleteForward', s),
            t.commands.add('forwardDelete', s),
            t.commands.add('delete', new Cu(t, 'backward')),
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
            ro.isAndroid)
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
      class Ou {
        constructor() {
          this._stack = []
        }
        add(t, e) {
          const n = this._stack,
            i = n[0]
          this._insertDescriptor(t)
          const s = n[0]
          i === s || Iu(i, s) || this.fire('change:top', { oldDescriptor: i, newDescriptor: s, writer: e })
        }
        remove(t, e) {
          const n = this._stack,
            i = n[0]
          this._removeDescriptor(t)
          const s = n[0]
          i === s || Iu(i, s) || this.fire('change:top', { oldDescriptor: i, newDescriptor: s, writer: e })
        }
        _insertDescriptor(t) {
          const e = this._stack,
            n = e.findIndex(e => e.id === t.id)
          if (Iu(t, e[n])) return
          n > -1 && e.splice(n, 1)
          let i = 0
          for (; e[i] && Mu(e[i], t); ) i++
          e.splice(i, 0, t)
        }
        _removeDescriptor(t) {
          const e = this._stack,
            n = e.findIndex(e => e.id === t)
          n > -1 && e.splice(n, 1)
        }
      }
      function Iu(t, e) {
        return t && e && t.priority == e.priority && Nu(t.classes) == Nu(e.classes)
      }
      function Mu(t, e) {
        return t.priority > e.priority || (!(t.priority < e.priority) && Nu(t.classes) > Nu(e.classes))
      }
      function Nu(t) {
        return Array.isArray(t) ? t.sort().join(',') : t
      }
      L(Ou, _)
      const Du =
          '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z"/><path fill-opacity=".256" d="M1 1h14v14H1z"/><g class="ck-icon__selected-indicator"><path d="M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z"/><path fill-opacity=".254" d="M1 1h14v14H1z"/></g></svg>',
        Fu = 'ck-widget_selected'
      function Bu(t) {
        return !!t.is('element') && !!t.getCustomProperty('widget')
      }
      function Vu(t, e, n = {}) {
        if (!t.is('containerElement')) throw new l('widget-to-widget-wrong-element-type', null, { element: t })
        return (
          e.setAttribute('contenteditable', 'false', t),
          e.addClass('ck-widget', t),
          e.setCustomProperty('widget', !0, t),
          (t.getFillerOffset = zu),
          n.label &&
            (function (t, e, n) {
              n.setCustomProperty('widgetLabel', e, t)
            })(t, n.label, e),
          n.hasSelectionHandle &&
            (function (t, e) {
              const n = e.createUIElement('div', { class: 'ck ck-widget__selection-handle' }, function (t) {
                const e = this.toDomElement(t),
                  n = new fd()
                return n.set('content', Du), n.render(), e.appendChild(n.element), e
              })
              e.insert(e.createPositionAt(t, 0), n), e.addClass(['ck-widget_with-selection-handle'], t)
            })(t, e),
          Wu(t, e),
          t
        )
      }
      function Lu(t, e, n) {
        if ((e.classes && n.addClass(pi(e.classes), t), e.attributes))
          for (const i in e.attributes) n.setAttribute(i, e.attributes[i], t)
      }
      function ju(t, e, n) {
        if ((e.classes && n.removeClass(pi(e.classes), t), e.attributes))
          for (const i in e.attributes) n.removeAttribute(i, t)
      }
      function Wu(t, e, n = Lu, i = ju) {
        const s = new Ou()
        s.on('change:top', (e, s) => {
          s.oldDescriptor && i(t, s.oldDescriptor, s.writer), s.newDescriptor && n(t, s.newDescriptor, s.writer)
        }),
          e.setCustomProperty('addHighlight', (t, e, n) => s.add(e, n), t),
          e.setCustomProperty('removeHighlight', (t, e, n) => s.remove(e, n), t)
      }
      function $u(t) {
        const e = t.getCustomProperty('widgetLabel')
        return e ? ('function' == typeof e ? e() : e) : ''
      }
      function zu() {
        return null
      }
      const qu = 'widget-type-around'
      function Uu(t, e, n) {
        return t && Bu(t) && !n.isInline(e)
      }
      function Hu(t) {
        return t.getAttribute(qu)
      }
      const Ku = [
        fo('arrowUp'),
        fo('arrowRight'),
        fo('arrowDown'),
        fo('arrowLeft'),
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
      for (let t = 112; t <= 135; t++) Ku.push(t)
      function Gu(t) {
        return !(!t.ctrlKey && !t.metaKey) || Ku.includes(t.keyCode)
      }
      const Ju = ['before', 'after'],
        Yu = new DOMParser().parseFromString(
          '<svg viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"/></svg>',
          'image/svg+xml'
        ).firstChild,
        Xu = 'ck-widget__type-around_disabled'
      class Zu extends j {
        static get pluginName() {
          return 'WidgetTypeAround'
        }
        static get requires() {
          return [ku, Ru]
        }
        constructor(t) {
          super(t), (this._currentFakeCaretModelElement = null)
        }
        init() {
          const t = this.editor,
            e = t.editing.view
          this.on('change:isEnabled', (n, i, s) => {
            e.change(t => {
              for (const n of e.document.roots) s ? t.removeClass(Xu, n) : t.addClass(Xu, n)
            }),
              s ||
                t.model.change(t => {
                  t.removeSelectionAttribute(qu)
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
            e = Hu(t)
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
              Uu(o, n.item, e) &&
                (function (t, e, n) {
                  const i = t.createUIElement('div', { class: 'ck ck-reset_all ck-widget__type-around' }, function (t) {
                    const n = this.toDomElement(t)
                    return (
                      (function (t, e) {
                        for (const n of Ju) {
                          const i = new Ch({
                            tag: 'div',
                            attributes: {
                              class: ['ck', 'ck-widget__type-around__button', `ck-widget__type-around__button_${n}`],
                              title: e[n],
                            },
                            children: [t.ownerDocument.importNode(Yu, !0)],
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
            { context: [Bu, '$text'], priority: 'high' }
          ),
            this._listenToIfEnabled(n, 'change:range', (e, n) => {
              n.directChange &&
                t.model.change(t => {
                  t.removeSelectionAttribute(qu)
                })
            }),
            this._listenToIfEnabled(e.document, 'change:data', () => {
              const e = n.getSelectedElement()
              if (e) {
                if (Uu(t.editing.mapper.toViewElement(e), e, i)) return
              }
              t.model.change(t => {
                t.removeSelectionAttribute(qu)
              })
            }),
            this._listenToIfEnabled(t.editing.downcastDispatcher, 'selection', (t, e, n) => {
              const s = n.writer
              if (this._currentFakeCaretModelElement) {
                const t = n.mapper.toViewElement(this._currentFakeCaretModelElement)
                t && (s.removeClass(Ju.map(o), t), (this._currentFakeCaretModelElement = null))
              }
              const r = e.selection.getSelectedElement()
              if (!r) return
              const a = n.mapper.toViewElement(r)
              if (!Uu(a, r, i)) return
              const l = Hu(e.selection)
              l && (s.addClass(o(l), a), (this._currentFakeCaretModelElement = r))
            }),
            this._listenToIfEnabled(t.ui.focusTracker, 'change:isFocused', (e, n, i) => {
              i ||
                t.model.change(t => {
                  t.removeSelectionAttribute(qu)
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
              const n = po(t, e)
              return 'down' === n || 'right' === n
            })(e.keyCode, n.locale.contentLanguageDirection),
            l = r.document.selection.getSelectedElement()
          let c
          Uu(l, n.editing.mapper.toModelElement(l), o)
            ? (c = this._handleArrowKeyPressOnSelectedWidget(a))
            : s.isCollapsed
            ? (c = this._handleArrowKeyPressWhenSelectionNextToAWidget(a))
            : e.shiftKey || (c = this._handleArrowKeyPressWhenNonCollapsedSelection(a)),
            c && (e.preventDefault(), t.stop())
        }
        _handleArrowKeyPressOnSelectedWidget(t) {
          const e = this.editor.model,
            n = Hu(e.document.selection)
          return e.change(e => {
            if (!n) return e.setSelectionAttribute(qu, t ? 'after' : 'before'), !0
            if (!(n === (t ? 'after' : 'before'))) return e.removeSelectionAttribute(qu), !0
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
            !!Uu(e.editing.mapper.toViewElement(o), o, i) &&
            (n.change(e => {
              s._setSelectionOverElement(o), e.setSelectionAttribute(qu, t ? 'before' : 'after')
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
            !!Uu(s.toViewElement(r), r, i) &&
            (n.change(e => {
              e.setSelection(r, 'on'), e.setSelectionAttribute(qu, t ? 'after' : 'before')
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
                : Uu(o, s, r) && (this._insertParagraph(s, i.isSoft ? 'before' : 'after'), (a = !0)),
                a && (i.preventDefault(), n.stop())
            },
            { context: Bu }
          )
        }
        _enableInsertingParagraphsOnTypingKeystroke() {
          const t = this.editor.editing.view,
            e = [ho.enter, ho.delete, ho.backspace]
          this._listenToIfEnabled(
            t.document,
            'keydown',
            (t, n) => {
              e.includes(n.keyCode) || Gu(n) || this._insertParagraphAccordingToFakeCaretPosition()
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
              const o = Hu(n.document.selection)
              if (!o) return
              const r = s.direction,
                a = n.document.selection.getSelectedElement(),
                l = 'forward' == r
              if (('before' === o) === l) t.execute('delete', { selection: n.createSelection(a, 'on') })
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
                        n.setSelection(e), t.execute(l ? 'deleteForward' : 'delete')
                      })
                  } else
                    n.change(n => {
                      n.setSelection(e), t.execute(l ? 'deleteForward' : 'delete')
                    })
              }
              s.preventDefault(), e.stop()
            },
            { context: Bu }
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
              const o = Hu(n)
              return o
                ? (t.stop(),
                  e.change(t => {
                    const s = n.getSelectedElement(),
                      r = e.createPositionAt(s, o),
                      a = t.createSelection(r),
                      l = e.insertContent(i, a)
                    return t.setSelection(a), l
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
              const o = Hu(e)
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
              Hu(e) && t.stop()
            },
            { priority: 'high' }
          )
        }
      }
      function Qu(t) {
        const e = t.model
        return (n, i) => {
          const s = i.keyCode == ho.arrowup,
            o = i.keyCode == ho.arrowdown,
            r = i.shiftKey,
            a = e.document.selection
          if (!s && !o) return
          const l = o
          if (
            r &&
            (function (t, e) {
              return !t.isCollapsed && t.isBackward == e
            })(a, l)
          )
            return
          const c = (function (t, e, n) {
            const i = t.model
            if (n) {
              const t = e.isCollapsed ? e.focus : e.getLastPosition(),
                n = tf(i, t, 'forward')
              if (!n) return null
              const s = i.createRange(t, n),
                o = ef(i.schema, s, 'backward')
              return o ? i.createRange(t, o) : null
            }
            {
              const t = e.isCollapsed ? e.focus : e.getFirstPosition(),
                n = tf(i, t, 'backward')
              if (!n) return null
              const s = i.createRange(n, t),
                o = ef(i.schema, s, 'forward')
              return o ? i.createRange(o, t) : null
            }
          })(t, a, l)
          if (c) {
            if (c.isCollapsed) {
              if (a.isCollapsed) return
              if (r) return
            }
            ;(c.isCollapsed ||
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
                  a = ba.getDomRangeRects(r)
                let l
                for (const t of a)
                  if (void 0 !== l) {
                    if (Math.round(t.top) >= l) return !1
                    l = Math.max(l, Math.round(t.bottom))
                  } else l = Math.round(t.bottom)
                return !0
              })(t, c, l)) &&
              (e.change(t => {
                const n = l ? c.end : c.start
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
      function tf(t, e, n) {
        const i = t.schema,
          s = t.createRangeIn(e.root),
          o = 'forward' == n ? 'elementStart' : 'elementEnd'
        for (const { previousPosition: t, item: r, type: a } of s.getWalker({ startPosition: e, direction: n })) {
          if (i.isLimit(r) && !i.isInline(r)) return t
          if (a == o && i.isBlock(r)) return null
        }
        return null
      }
      function ef(t, e, n) {
        const i = 'backward' == n ? e.end : e.start
        if (t.checkChild(i, '$text')) return i
        for (const { nextPosition: i } of e.getWalker({ direction: n })) if (t.checkChild(i, '$text')) return i
        return null
      }
      class nf extends j {
        static get pluginName() {
          return 'Widget'
        }
        static get requires() {
          return [Zu, Ru]
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
              Bu(a) &&
                i.consumable.consume(o, 'selection') &&
                s.setSelection(s.createRangeOn(a), { fake: !0, label: $u(a) })
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
                    Bu(t) && !sf(t, o) && (i.addClass(Fu, t), this._previouslySelected.add(t), (o = t))
                  }
              },
              { priority: 'low' }
            ),
            e.addObserver(iu),
            this.listenTo(n, 'mousedown', (...t) => this._onMousedown(...t)),
            this.listenTo(
              n,
              'arrowKey',
              (...t) => {
                this._handleSelectionChangeOnArrowKeyPress(...t)
              },
              { context: [Bu, '$text'] }
            ),
            this.listenTo(
              n,
              'arrowKey',
              (...t) => {
                this._preventDefaultOnArrowKeyPress(...t)
              },
              { context: '$root' }
            ),
            this.listenTo(n, 'arrowKey', Qu(this.editor.editing), { context: '$text' }),
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
                if (Bu(t)) return !1
                t = t.parent
              }
              return !1
            })(o)
          ) {
            if ((ro.isSafari || ro.isGecko) && e.domEvent.detail >= 3) {
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
          if (!Bu(o) && ((o = o.findAncestor(Bu)), !o)) return
          ro.isAndroid && e.preventDefault(), s.isFocused || i.focus()
          const r = n.editing.mapper.toModelElement(o)
          this._setSelectionOverElement(r)
        }
        _handleSelectionChangeOnArrowKeyPress(t, e) {
          const n = e.keyCode,
            i = this.editor.model,
            s = i.schema,
            o = i.document.selection,
            r = o.getSelectedElement(),
            a = po(n, this.editor.locale.contentLanguageDirection),
            l = 'down' == a || 'right' == a,
            c = 'up' == a || 'down' == a
          if (r && s.isObject(r)) {
            const n = l ? o.getLastPosition() : o.getFirstPosition(),
              r = s.getNearestSelectionRange(n, l ? 'forward' : 'backward')
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
              c = r.nodeBefore
            return void (
              ((a && s.isObject(a)) || (c && s.isObject(c))) &&
              (i.change(t => {
                t.setSelection(l ? r : n)
              }),
              e.preventDefault(),
              t.stop())
            )
          }
          if (!o.isCollapsed) return
          const h = this._getObjectElementNextToSelection(l)
          if (h && s.isObject(h)) {
            if (s.isInline(h) && c) return
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
          for (const e of this._previouslySelected) t.removeClass(Fu, e)
          this._previouslySelected.clear()
        }
      }
      function sf(t, e) {
        return !!e && Array.from(t.getAncestors()).includes(e)
      }
      const of = function (t, e, n) {
        var i = !0,
          s = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        return (
          E(n) && ((i = 'leading' in n ? !!n.leading : i), (s = 'trailing' in n ? !!n.trailing : s)),
          na(t, e, { leading: i, maxWait: e, trailing: s })
        )
      }
      class rf extends j {
        static get pluginName() {
          return 'DragDrop'
        }
        static get requires() {
          return [wu, nf]
        }
        init() {
          const t = this.editor,
            e = t.editing.view
          ;(this._draggedRange = null),
            (this._draggingUid = ''),
            (this._draggableElement = null),
            (this._updateDropMarkerThrottled = of(t => this._updateDropMarker(t), 40)),
            (this._removeDropMarkerDelayed = cf(() => this._removeDropMarker(), 40)),
            (this._clearDraggableAttributesDelayed = cf(() => this._clearDraggableAttributes(), 40)),
            e.addObserver(gu),
            e.addObserver(iu),
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
            ro.isAndroid && this.forceDisabled('noAndroidSupport')
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
              const l = r.target ? hf(r.target) : null
              if (l) {
                const n = t.editing.mapper.toModelElement(l)
                ;(this._draggedRange = il.fromRange(e.createRangeOn(n))),
                  t.plugins.has('WidgetToolbarRepository') &&
                    t.plugins.get('WidgetToolbarRepository').forceDisabled('dragDrop')
              } else if (!s.selection.isCollapsed) {
                const t = s.selection.getSelectedElement()
                ;(t && Bu(t)) || (this._draggedRange = il.fromRange(a.getFirstRange()))
              }
              if (!this._draggedRange) return void r.preventDefault()
              ;(this._draggingUid = o()),
                (r.dataTransfer.effectAllowed = this.isEnabled ? 'copyMove' : 'copy'),
                r.dataTransfer.setData('application/ckeditor5-dragging-uid', this._draggingUid)
              const c = e.createSelection(this._draggedRange.toRange()),
                h = t.data.toView(e.getSelectedContent(c))
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
                const i = af(t, n.targetRanges, n.target)
                this._draggedRange || (n.dataTransfer.dropEffect = 'copy'),
                  ro.isGecko ||
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
              const i = af(t, n.targetRanges, n.target)
              if ((this._removeDropMarker(), !i)) return this._finalizeDragging(!1), void e.stop()
              this._draggedRange &&
                this._draggingUid != n.dataTransfer.getData('application/ckeditor5-dragging-uid') &&
                (this._draggedRange.detach(), (this._draggedRange = null), (this._draggingUid = ''))
              if ('move' == lf(n.dataTransfer) && this._draggedRange && this._draggedRange.containsRange(i, !0))
                return this._finalizeDragging(!1), void e.stop()
              n.targetRanges = [t.editing.mapper.toViewRange(i)]
            },
            { priority: 'high' }
          )
        }
        _setupContentInsertionIntegration() {
          const t = this.editor.plugins.get(wu)
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
                const n = 'move' == lf(e.dataTransfer),
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
            if (ro.isAndroid || !s) return
            this._clearDraggableAttributesDelayed.cancel()
            let o = hf(s.target)
            if (ro.isBlink && !t.isReadOnly && !o && !n.selection.isCollapsed) {
              const t = n.selection.getSelectedElement()
              ;(t && Bu(t)) || (o = n.selection.editableElement)
            }
            o &&
              (e.change(t => {
                t.setAttribute('draggable', 'true', o)
              }),
              (this._draggableElement = t.editing.mapper.toModelElement(o)))
          }),
            this.listenTo(n, 'mouseup', () => {
              ro.isAndroid || this._clearDraggableAttributesDelayed()
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
                    return e.append('⁠', t.createElement('span'), '⁠'), e
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
      function af(t, e, n) {
        const i = t.model,
          s = t.editing.mapper
        let o = null
        const r = e ? e[0].start : null
        if (
          (n.is('uiElement') && (n = n.parent),
          (o = (function (t, e) {
            const n = t.model,
              i = t.editing.mapper
            if (Bu(e)) return n.createRangeOn(i.toModelElement(e))
            if (!e.is('editableElement')) {
              const t = e.findAncestor(t => Bu(t) || t.is('editableElement'))
              if (Bu(t)) return n.createRangeOn(i.toModelElement(t))
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
          l = r ? s.toModelPosition(r) : null
        return l
          ? ((o = (function (t, e, n) {
              const i = t.model
              if (!i.schema.checkChild(n, '$block')) return null
              const s = i.createPositionAt(n, 0),
                o = e.path.slice(0, s.path.length),
                r = i.createPositionFromPath(e.root, o).nodeAfter
              if (r && i.schema.isObject(r)) return i.createRangeOn(r)
              return null
            })(t, l, a)),
            o ||
              ((o = i.schema.getNearestSelectionRange(l, ro.isGecko ? 'forward' : 'backward')),
              o ||
                (function (t, e) {
                  const n = t.model
                  for (; e; ) {
                    if (n.schema.isObject(e)) return n.createRangeOn(e)
                    e = e.parent
                  }
                })(t, l.parent)))
          : (function (t, e) {
              const n = t.model,
                i = n.schema,
                s = n.createPositionAt(e, 0)
              return i.getNearestSelectionRange(s, 'forward')
            })(t, a)
      }
      function lf(t) {
        return ro.isGecko ? t.dropEffect : ['all', 'copyMove'].includes(t.effectAllowed) ? 'move' : 'copy'
      }
      function cf(t, e) {
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
      function hf(t) {
        if (t.is('editableElement')) return null
        if (t.hasClass('ck-widget__selection-handle')) return t.findAncestor(Bu)
        if (Bu(t)) return t
        const e = t.findAncestor(t => Bu(t) || t.is('editableElement'))
        return Bu(e) ? e : null
      }
      class df extends j {
        static get pluginName() {
          return 'PastePlainText'
        }
        static get requires() {
          return [wu]
        }
        init() {
          const t = this.editor,
            e = t.model,
            n = t.editing.view,
            i = n.document,
            s = e.document.selection
          let o = !1
          n.addObserver(gu),
            this.listenTo(i, 'keydown', (t, e) => {
              o = e.shiftKey
            }),
            t.plugins.get(wu).on('contentInsertion', (t, n) => {
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
      class uf extends j {
        static get pluginName() {
          return 'Clipboard'
        }
        static get requires() {
          return [wu, rf, df]
        }
      }
      class ff extends $ {
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
                const i = bu(t.schema, n.getAttributes())
                mf(t, e, s.end), e.removeSelectionAttribute(n.getAttributeKeys()), e.setSelectionAttribute(i)
              } else {
                const i = !(s.start.isAtStart && s.end.isAtEnd)
                t.deleteContent(n, { leaveUnmerged: i }), a ? mf(t, e, n.focus) : i && e.setSelection(r, 0)
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
            if ((gf(s, t) || gf(o, t)) && s !== o) return !1
            return !0
          })(t.schema, e.selection)
        }
      }
      function mf(t, e, n) {
        const i = e.createElement('softBreak')
        t.insertContent(i, n), e.setSelection(i, 'after')
      }
      function gf(t, e) {
        return !t.is('rootElement') && (e.isLimit(t) || gf(t.parent, e))
      }
      class pf extends j {
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
            i.addObserver(Pu),
            t.commands.add('shiftEnter', new ff(t)),
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
      class _f extends $ {
        constructor(t) {
          super(t), (this.affectsData = !1)
        }
        execute() {
          const t = this.editor.model,
            e = t.document.selection
          let n = t.schema.getLimitElement(e)
          if (e.containsEntireContent(n) || !wf(t.schema, n))
            do {
              if (((n = n.parent), !n)) return
            } while (!wf(t.schema, n))
          t.change(t => {
            t.setSelection(n, 'in')
          })
        }
      }
      function wf(t, e) {
        return t.isLimit(e) && (t.checkChild(e, '$text') || t.checkChild(e, 'paragraph'))
      }
      const bf = mo('Ctrl+A')
      class yf extends j {
        static get pluginName() {
          return 'SelectAllEditing'
        }
        init() {
          const t = this.editor,
            e = t.editing.view.document
          t.commands.add('selectAll', new _f(t)),
            this.listenTo(e, 'keydown', (e, n) => {
              fo(n) === bf && (t.execute('selectAll'), n.preventDefault())
            })
        }
      }
      class vf extends j {
        static get pluginName() {
          return 'SelectAllUI'
        }
        init() {
          const t = this.editor
          t.ui.componentFactory.add('selectAll', e => {
            const n = t.commands.get('selectAll'),
              i = new md(e),
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
      class Pf extends j {
        static get requires() {
          return [yf, vf]
        }
        static get pluginName() {
          return 'SelectAll'
        }
      }
      class kf extends $ {
        constructor(t, e) {
          super(t), (this._buffer = new Au(t.model, e))
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
      class Af {
        constructor(t) {
          ;(this.editor = t), (this.editing = this.editor.editing)
        }
        handle(t, e) {
          if (
            (function (t) {
              if (0 == t.length) return !1
              for (const e of t) if ('children' === e.type && !Eu(e)) return !0
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
            s = new lr(this.editor.editing.view.document),
            o = this.editor.data.toModel(s.domToView(i)).getChild(0),
            r = this.editor.editing.mapper.toModelElement(n)
          if (!r) return
          const a = Array.from(o.getChildren()),
            l = Array.from(r.getChildren()),
            c = a[a.length - 1],
            h = l[l.length - 1],
            d = c && c.is('element', 'softBreak'),
            u = h && !h.is('element', 'softBreak')
          d && u && a.pop()
          const f = this.editor.model.schema
          if (!Cf(a, f) || !Cf(l, f)) return
          const m = a
              .map(t => (t.is('$text') ? t.data : '@'))
              .join('')
              .replace(/\u00A0/g, ' '),
            g = l
              .map(t => (t.is('$text') ? t.data : '@'))
              .join('')
              .replace(/\u00A0/g, ' ')
          if (g === m) return
          const p = Ho(g, m),
            { firstChangeAt: _, insertions: w, deletions: b } = Ef(p)
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
          const s = Ho(i, n),
            { firstChangeAt: o, insertions: r, deletions: a } = Ef(s)
          let l = null
          e && (l = this.editing.mapper.toModelRange(e.getFirstRange()))
          const c = this.editing.view.createPositionAt(t.node, o),
            h = this.editing.mapper.toModelPosition(c),
            d = this.editor.model.createRange(h, h.getShiftedBy(a)),
            u = n.substr(o, r)
          this.editor.execute('input', { text: u, range: d, resultRange: l })
        }
        _handleTextNodeInsertion(t) {
          if ('children' != t.type) return
          const e = Eu(t),
            n = this.editing.view.createPositionAt(t.node, e.index),
            i = this.editing.mapper.toModelPosition(n),
            s = e.values[0].data
          this.editor.execute('input', { text: s.replace(/\u00A0/g, ' '), range: this.editor.model.createRange(i) })
        }
      }
      function Cf(t, e) {
        return t.every(t => e.isInline(t))
      }
      function Ef(t) {
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
      class Tf extends j {
        static get pluginName() {
          return 'Input'
        }
        init() {
          const t = this.editor,
            e = new kf(t, t.config.get('typing.undoStep') || 20)
          t.commands.add('input', e),
            (function (t) {
              let e = null
              const n = t.model,
                i = t.editing.view,
                s = t.commands.get('input')
              function o(t) {
                if (ro.isWindows && xu(t, i.document)) return
                const o = n.document,
                  a = i.document.isComposing,
                  l = e && e.isEqual(o.selection)
                ;(e = null),
                  s.isEnabled &&
                    (Gu(t) ||
                      o.selection.isCollapsed ||
                      (a && 229 === t.keyCode) ||
                      (!a && 229 === t.keyCode && l) ||
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
              ro.isAndroid
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
                new Af(t).handle(n, i)
              })
            })(t)
        }
      }
      class xf extends j {
        static get requires() {
          return [Tf, Ru]
        }
        static get pluginName() {
          return 'Typing'
        }
      }
      L(
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
        I
      )
      Sf('"'), Sf("'"), Sf("'"), Sf('"'), Sf('"'), Sf("'")
      function Sf(t) {
        return new RegExp(`(^|\\s)(${t})([^${t}]*)(${t})$`)
      }
      class Rf extends $ {
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
            const e = t.filter(t => t.root != s.graveyard).filter(t => !If(t, a))
            e.length && (Of(e), o.push(e[0]))
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
              r = Yd([t.getReversed()], o, {
                useRelations: !0,
                document: this.editor.model.document,
                padWithNoOps: !1,
                forceWeakRemove: !0,
              }).operationsA
            for (const s of r) e.addOperation(s), n.applyOperation(s), i.history.setOperationAsUndone(t, s)
          }
        }
      }
      function Of(t) {
        t.sort((t, e) => (t.start.isBefore(e.start) ? -1 : 1))
        for (let e = 1; e < t.length; e++) {
          const n = t[e - 1].getJoined(t[e], !0)
          n && (e--, t.splice(e, 2, n))
        }
      }
      function If(t, e) {
        return e.some(e => e !== t && e.containsRange(t, !0))
      }
      class Mf extends Rf {
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
      class Nf extends Rf {
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
      class Df extends j {
        static get pluginName() {
          return 'UndoEditing'
        }
        constructor(t) {
          super(t), (this._batchRegistry = new WeakSet())
        }
        init() {
          const t = this.editor
          ;(this._undoCommand = new Mf(t)),
            (this._redoCommand = new Nf(t)),
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
      const Ff =
          '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m5.042 9.367 2.189 1.837a.75.75 0 0 1-.965 1.149l-3.788-3.18a.747.747 0 0 1-.21-.284.75.75 0 0 1 .17-.945L6.23 4.762a.75.75 0 1 1 .964 1.15L4.863 7.866h8.917A.75.75 0 0 1 14 7.9a4 4 0 1 1-1.477 7.718l.344-1.489a2.5 2.5 0 1 0 1.094-4.73l.008-.032H5.042z"/></svg>',
        Bf =
          '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m14.958 9.367-2.189 1.837a.75.75 0 0 0 .965 1.149l3.788-3.18a.747.747 0 0 0 .21-.284.75.75 0 0 0-.17-.945L13.77 4.762a.75.75 0 1 0-.964 1.15l2.331 1.955H6.22A.75.75 0 0 0 6 7.9a4 4 0 1 0 1.477 7.718l-.344-1.489A2.5 2.5 0 1 1 6.039 9.4l-.008-.032h8.927z"/></svg>'
      class Vf extends j {
        static get pluginName() {
          return 'UndoUI'
        }
        init() {
          const t = this.editor,
            e = t.locale,
            n = t.t,
            i = 'ltr' == e.uiLanguageDirection ? Ff : Bf,
            s = 'ltr' == e.uiLanguageDirection ? Bf : Ff
          this._addButton('undo', n('Undo'), 'CTRL+Z', i), this._addButton('redo', n('Redo'), 'CTRL+Y', s)
        }
        _addButton(t, e, n, i) {
          const s = this.editor
          s.ui.componentFactory.add(t, o => {
            const r = s.commands.get(t),
              a = new md(o)
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
      class Lf extends j {
        static get requires() {
          return [Df, Vf]
        }
        static get pluginName() {
          return 'Undo'
        }
      }
      class jf {
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
          const i = new ba(e)
          ;(this.activeHandlePosition = (function (t) {
            const e = ['top-left', 'top-right', 'bottom-right', 'bottom-left']
            for (const n of e) if (t.classList.contains(Wf(n))) return n
          })(t)),
            (this._referenceCoordinates = (function (t, e) {
              const n = new ba(t),
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
      function Wf(t) {
        return `ck-widget__resizer__handle-${t}`
      }
      L(jf, I)
      class $f extends Uh {
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
      class zf {
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
          ;(this.state = new jf(this._options)),
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
            i = new ba(n)
          ;(e.handleHostWidth = Math.round(i.width)), (e.handleHostHeight = Math.round(i.height))
          const s = new ba(n)
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
            const e = t || new ba(s)
            a = [e.width + 'px', e.height + 'px', void 0, void 0]
          } else a = [s.offsetWidth + 'px', s.offsetHeight + 'px', s.offsetLeft + 'px', s.offsetTop + 'px']
          'same' !== Ei(r, a) &&
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
          ;(this._sizeView = new $f()), this._sizeView.render(), t.appendChild(this._sizeView.element)
        }
      }
      L(zf, I)
      L(
        class extends j {
          static get pluginName() {
            return 'WidgetResize'
          }
          init() {
            const t = this.editor.editing,
              e = wi.window.document
            this.set('visibleResizer', null),
              this.set('_activeResizer', null),
              (this._resizers = new Map()),
              t.view.addObserver(iu),
              (this._observer = Object.create(fr)),
              this.listenTo(t.view.document, 'mousedown', this._mouseDownListener.bind(this), { priority: 'high' }),
              this._observer.listenTo(e, 'mousemove', this._mouseMoveListener.bind(this)),
              this._observer.listenTo(e, 'mouseup', this._mouseUpListener.bind(this))
            const n = () => {
              this.visibleResizer && this.visibleResizer.redraw()
            }
            ;(this._redrawFocusedResizerThrottled = of(n, 200)),
              this.on('change:visibleResizer', n),
              this.editor.ui.on('update', this._redrawFocusedResizerThrottled),
              this.editor.model.document.on(
                'change',
                () => {
                  for (const [t, e] of this._resizers) t.isAttached() || (this._resizers.delete(t), e.destroy())
                },
                { priority: 'lowest' }
              ),
              this._observer.listenTo(wi.window, 'resize', this._redrawFocusedResizerThrottled)
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
            const e = new zf(t),
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
            zf.isResizeHandle(n) &&
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
        I
      )
      class qf extends $ {
        refresh() {
          const t = this.editor.model,
            e = t.schema,
            n = t.document.selection
          this.isEnabled = (function (t, e, n) {
            const i = (function (t, e) {
              const n = (function (t, e) {
                const n = t.getSelectedElement()
                if (n) {
                  const i = Hu(t)
                  if (i) return e.createRange(e.createPositionAt(n, i))
                }
                return uh(t, e)
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
      class Uf extends j {
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
                    return e.setCustomProperty('horizontalLine', !0, t), Vu(t, e, { label: n })
                  })(s, e, i)
                )
              },
            }),
            i.for('upcast').elementToElement({ view: 'hr', model: 'horizontalLine' }),
            t.commands.add('horizontalLine', new qf(t))
        }
      }
      class Hf extends j {
        static get pluginName() {
          return 'HorizontalLineUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add('horizontalLine', n => {
            const i = t.commands.get('horizontalLine'),
              s = new md(n)
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
      const Kf = 'italic'
      class Gf extends j {
        static get pluginName() {
          return 'ItalicEditing'
        }
        init() {
          const t = this.editor
          t.model.schema.extend('$text', { allowAttributes: Kf }),
            t.model.schema.setAttributeProperties(Kf, { isFormatting: !0, copyOnEnter: !0 }),
            t.conversion.attributeToElement({
              model: Kf,
              view: 'i',
              upcastAlso: ['em', { styles: { 'font-style': 'italic' } }],
            }),
            t.commands.add(Kf, new cu(t, Kf)),
            t.keystrokes.set('CTRL+I', Kf)
        }
      }
      const Jf = 'italic'
      class Yf extends j {
        static get pluginName() {
          return 'ItalicUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add(Jf, n => {
            const i = t.commands.get(Jf),
              s = new md(n)
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
                t.execute(Jf), t.editing.view.focus()
              }),
              s
            )
          })
        }
      }
      class Xf extends $ {
        constructor(t, e) {
          super(t), (this.type = e)
        }
        refresh() {
          ;(this.value = this._getValue()), (this.isEnabled = this._checkEnabled())
        }
        execute(t = {}) {
          const e = this.editor.model,
            n = e.document,
            i = Array.from(n.selection.getSelectedBlocks()).filter(t => Qf(t, e.schema)),
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
              ;(t = 0 === t ? 1 : t), Zf(i, !0, t), Zf(i, !1, t)
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
          const t = da(this.editor.model.document.selection.getSelectedBlocks())
          return !!t && t.is('element', 'listItem') && t.getAttribute('listType') == this.type
        }
        _checkEnabled() {
          if (this.value) return !0
          const t = this.editor.model.document.selection,
            e = this.editor.model.schema,
            n = da(t.getSelectedBlocks())
          return !!n && Qf(n, e)
        }
      }
      function Zf(t, e, n) {
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
      function Qf(t, e) {
        return e.checkChild(t.parent, 'listItem') && !e.isObject(t)
      }
      class tm extends $ {
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
          const t = da(this.editor.model.document.selection.getSelectedBlocks())
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
      function em(t, e) {
        const n = e.mapper,
          i = e.writer,
          s = 'numbered' == t.getAttribute('listType') ? 'ol' : 'ul',
          o = (function (t) {
            const e = t.createContainerElement('li')
            return (e.getFillerOffset = am), e
          })(i),
          r = i.createContainerElement(s, null)
        return i.insert(i.createPositionAt(r, 0), o), n.bindElements(t, o), o
      }
      function nm(t, e, n, i) {
        const s = e.parent,
          o = n.mapper,
          r = n.writer
        let a = o.toViewPosition(i.createPositionBefore(t))
        const l = om(t.previousSibling, {
            sameIndent: !0,
            smallerIndent: !0,
            listIndent: t.getAttribute('listIndent'),
          }),
          c = t.previousSibling
        if (l && l.getAttribute('listIndent') == t.getAttribute('listIndent')) {
          const t = o.toViewElement(l)
          a = r.breakContainer(r.createPositionAfter(t))
        } else if (c && 'listItem' == c.name) {
          a = o.toViewPosition(i.createPositionAt(c, 'end'))
          const t = o.findMappedViewAncestor(a),
            e = (function (t) {
              for (const e of t.getChildren()) if ('ul' == e.name || 'ol' == e.name) return e
              return null
            })(t)
          a = e ? r.createPositionBefore(e) : r.createPositionAt(t, 'end')
        } else a = o.toViewPosition(i.createPositionBefore(t))
        if (((a = sm(a)), r.insert(a, s), c && 'listItem' == c.name)) {
          const t = o.toViewElement(c),
            n = r.createRange(r.createPositionAt(t, 0), a).getWalker({ ignoreElementEnd: !0 })
          for (const t of n)
            if (t.item.is('element', 'li')) {
              const i = r.breakContainer(r.createPositionBefore(t.item)),
                s = t.item.parent,
                o = r.createPositionAt(e, 'end')
              im(r, o.nodeBefore, o.nodeAfter), r.move(r.createRangeOn(s), o), (n.position = i)
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
        im(r, s, s.nextSibling), im(r, s.previousSibling, s)
      }
      function im(t, e, n) {
        return !e ||
          !n ||
          ('ul' != e.name && 'ol' != e.name) ||
          e.name != n.name ||
          e.getAttribute('class') !== n.getAttribute('class')
          ? null
          : t.mergeContainers(t.createPositionAfter(e))
      }
      function sm(t) {
        return t.getLastMatchingPosition(t => t.item.is('uiElement'))
      }
      function om(t, e) {
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
      function rm(t, e, n, i) {
        t.ui.componentFactory.add(e, s => {
          const o = t.commands.get(e),
            r = new md(s)
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
      function am() {
        const t = !this.isEmpty && ('ul' == this.getChild(0).name || 'ol' == this.getChild(0).name)
        return this.isEmpty || t ? 0 : Ns.call(this)
      }
      function lm(t) {
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
          nm(o, em(o, i), i, t)
        }
      }
      function cm(t, e, n) {
        if (!n.consumable.test(e.item, t.name)) return
        const i = n.mapper.toViewElement(e.item),
          s = n.writer
        s.breakContainer(s.createPositionBefore(i)), s.breakContainer(s.createPositionAfter(i))
        const o = i.parent,
          r = 'numbered' == e.attributeNewValue ? 'ol' : 'ul'
        s.rename(r, o)
      }
      function hm(t, e, n) {
        n.consumable.consume(e.item, t.name)
        const i = n.mapper.toViewElement(e.item).parent,
          s = n.writer
        im(s, i, i.nextSibling), im(s, i.previousSibling, i)
      }
      function dm(t, e, n) {
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
                const e = im(i, n, n.nextSibling)
                e && e.parent == n && t.offset--
              }
            }
            im(i, t.nodeBefore, t.nodeAfter)
          }
        }
      }
      function um(t, e, n) {
        const i = n.mapper.toViewPosition(e.position),
          s = i.nodeBefore,
          o = i.nodeAfter
        im(n.writer, s, o)
      }
      function fm(t, e, n) {
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
                  ((t = e.modelCursor.parent.is('element', 'listItem') ? e.modelCursor.parent : wm(e.modelCursor)),
                  (o = i.createPositionAfter(t)))
              }
            return o
          })(i, e.viewItem.getChildren(), n)
          ;(e.modelRange = t.createRange(e.modelCursor, r)), n.updateConversionResult(i, e)
        }
      }
      function mm(t, e, n) {
        if (n.consumable.test(e.viewItem, { name: !0 })) {
          const t = Array.from(e.viewItem.getChildren())
          for (const e of t) {
            !(e.is('element', 'li') || ym(e)) && e._remove()
          }
        }
      }
      function gm(t, e, n) {
        if (n.consumable.test(e.viewItem, { name: !0 })) {
          if (0 === e.viewItem.childCount) return
          const t = [...e.viewItem.getChildren()]
          let n = !1
          for (const e of t) n && !ym(e) && e._remove(), ym(e) && (n = !0)
        }
      }
      function pm(t) {
        return (e, n) => {
          if (n.isPhantom) return
          const i = n.modelPosition.nodeBefore
          if (i && i.is('element', 'listItem')) {
            const e = n.mapper.toViewElement(i),
              s = e.getAncestors().find(ym),
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
      function _m(t, [e, n]) {
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
      function wm(t) {
        const e = new La({ startPosition: t })
        let n
        do {
          n = e.next()
        } while (!n.value.item.is('element', 'listItem'))
        return n.value.item
      }
      function bm(t, e, n, i, s, o) {
        const r = om(e.nodeBefore, { sameIndent: !0, smallerIndent: !0, listIndent: t, foo: 'b' }),
          a = s.mapper,
          l = s.writer,
          c = r ? r.getAttribute('listIndent') : null
        let h
        if (r)
          if (c == t) {
            const t = a.toViewElement(r).parent
            h = l.createPositionAfter(t)
          } else {
            const t = o.createPositionAt(r, 'end')
            h = a.toViewPosition(t)
          }
        else h = n
        h = sm(h)
        for (const t of [...i.getChildren()])
          ym(t) && ((h = l.move(l.createRangeOn(t), h).end), im(l, t, t.nextSibling), im(l, t.previousSibling, t))
      }
      function ym(t) {
        return t.is('element', 'ol') || t.is('element', 'ul')
      }
      class vm extends j {
        static get pluginName() {
          return 'ListEditing'
        }
        static get requires() {
          return [ku, Ru]
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
            n.mapper.registerViewToModelLength('li', Pm),
            e.mapper.registerViewToModelLength('li', Pm),
            n.mapper.on('modelToViewPosition', pm(n.view)),
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
                    l = n.nodeBefore
                  for (; l && ym(l); ) (a += o.getModelLength(l)), (l = l.previousSibling)
                  ;(e.modelPosition = i.createPositionBefore(r).getShiftedBy(a)), t.stop()
                }
              })
            ),
            e.mapper.on('modelToViewPosition', pm(n.view)),
            t.conversion.for('editingDowncast').add(e => {
              e.on('insert', dm, { priority: 'high' }),
                e.on('insert:listItem', lm(t.model)),
                e.on('attribute:listType:listItem', cm, { priority: 'high' }),
                e.on('attribute:listType:listItem', hm, { priority: 'low' }),
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
                        l = o.createRangeOn(r)
                      o.remove(l),
                        a && a.nextSibling && im(o, a, a.nextSibling),
                        bm(n.attributeOldValue + 1, n.range.start, l.start, s, i, t),
                        nm(n.item, s, i, t)
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
                        l = o.createRangeOn(r),
                        c = o.remove(l)
                      a && a.nextSibling && im(o, a, a.nextSibling),
                        bm(i.mapper.toModelElement(s).getAttribute('listIndent') + 1, n.position, l.start, s, i, t)
                      for (const t of o.createRangeIn(c).getItems()) i.mapper.unbindViewElement(t)
                      e.stop()
                    }
                  })(t.model)
                ),
                e.on('remove', um, { priority: 'low' })
            }),
            t.conversion.for('dataDowncast').add(e => {
              e.on('insert', dm, { priority: 'high' }), e.on('insert:listItem', lm(t.model))
            }),
            t.conversion.for('upcast').add(t => {
              t.on('element:ul', mm, { priority: 'high' }),
                t.on('element:ol', mm, { priority: 'high' }),
                t.on('element:li', gm, { priority: 'high' }),
                t.on('element:li', fm)
            }),
            t.model.on('insertContent', _m, { priority: 'high' }),
            t.commands.add('numberedList', new Xf(t, 'numbered')),
            t.commands.add('bulletedList', new Xf(t, 'bulleted')),
            t.commands.add('indentList', new tm(t, 'forward')),
            t.commands.add('outdentList', new tm(t, 'backward'))
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
      function Pm(t) {
        let e = 1
        for (const n of t.getChildren())
          if ('ul' == n.name || 'ol' == n.name) for (const t of n.getChildren()) e += Pm(t)
        return e
      }
      class km extends j {
        static get pluginName() {
          return 'ListUI'
        }
        init() {
          const t = this.editor.t
          rm(
            this.editor,
            'numberedList',
            t('Numbered List'),
            '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM3.5 3v5H2V3.7H1v-1h2.5V3zM.343 17.857l2.59-3.257H2.92a.6.6 0 1 0-1.04 0H.302a2 2 0 1 1 3.995 0h-.001c-.048.405-.16.734-.333.988-.175.254-.59.692-1.244 1.312H4.3v1h-4l.043-.043zM7 14.75a.75.75 0 0 1 .75-.75h9.5a.75.75 0 1 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75z"/></svg>'
          ),
            rm(
              this.editor,
              'bulletedList',
              t('Bulleted List'),
              '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0C1 4.784 1.777 4 2.75 4c.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75C1.784 7.5 1 6.723 1 5.75zm6 9c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0c0-.966.777-1.75 1.75-1.75.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75-.966 0-1.75-.777-1.75-1.75z"/></svg>'
            )
        }
      }
      class Am extends $ {
        refresh() {
          const t = this.editor.model,
            e = da(t.document.selection.getSelectedBlocks())
          ;(this.value = !!e && e.is('element', 'paragraph')), (this.isEnabled = !!e && Cm(e, t.schema))
        }
        execute(t = {}) {
          const e = this.editor.model,
            n = e.document
          e.change(i => {
            const s = (t.selection || n.selection).getSelectedBlocks()
            for (const t of s) !t.is('element', 'paragraph') && Cm(t, e.schema) && i.rename(t, 'paragraph')
          })
        }
      }
      function Cm(t, e) {
        return e.checkChild(t.parent, 'paragraph') && !e.isObject(t)
      }
      class Em extends $ {
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
      class Tm extends j {
        static get pluginName() {
          return 'Paragraph'
        }
        init() {
          const t = this.editor,
            e = t.model
          t.commands.add('paragraph', new Am(t)),
            t.commands.add('insertParagraph', new Em(t)),
            e.schema.register('paragraph', { inheritAllFrom: '$block' }),
            t.conversion.elementToElement({ model: 'paragraph', view: 'p' }),
            t.conversion.for('upcast').elementToElement({
              model: (t, { writer: e }) =>
                Tm.paragraphLikeElements.has(t.name) ? (t.isEmpty ? null : e.createElement('paragraph')) : null,
              view: /.+/,
              converterPriority: 'low',
            })
        }
      }
      function xm(t, e) {
        if (!t.childCount) return
        const n = new su(t.document),
          i = (function (t, e) {
            const n = e.createRangeIn(t),
              i = new Ii({ name: /^p|h\d+$/, styles: { 'mso-list': /.*/ } }),
              s = []
            for (const t of n)
              if ('elementStart' === t.type && i.match(t.item)) {
                const e = Om(t.item)
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
            l = a ? null : i[r - 1],
            c = ((d = t), (h = l) ? d.indent - h.indent : d.indent - 1)
          var h, d
          if ((a && ((s = null), (o = 1)), !s || 0 !== c)) {
            const i = (function (t, e) {
              const n = new RegExp(`@list l${t.id}:level${t.indent}\\s*({[^}]*)`, 'gi'),
                i = /mso-level-number-format:([^;]{0,100});/gi,
                s = /mso-level-start-at:\s{0,100}([0-9]{0,10})\s{0,100};/gi,
                o = n.exec(e)
              let r = 'decimal',
                a = 'ol',
                l = null
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
                  t && t[1] && (l = parseInt(t[1]))
                }
              }
              return { type: a, startIndex: l, style: Sm(r) }
            })(t, e)
            if (s) {
              if (t.indent > o) {
                const t = s.getChild(s.childCount - 1),
                  e = t.getChild(t.childCount - 1)
                ;(s = Rm(i, e, n)), (o += 1)
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
            } else s = Rm(i, t.element, n)
            t.indent <= o && (s.is('element', i.type) || (s = n.rename(i.type, s)))
          }
          const u = (function (t, e) {
            return (
              (function (t, e) {
                const n = new Ii({ name: 'span', styles: { 'mso-list': 'Ignore' } }),
                  i = e.createRangeIn(t)
                for (const t of i) 'elementStart' === t.type && n.match(t.item) && e.remove(t.item)
              })(t, e),
              e.rename('li', t)
            )
          })(t.element, n)
          n.appendChild(u, s)
        })
      }
      function Sm(t) {
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
      function Rm(t, e, n) {
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
      function Om(t) {
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
      Tm.paragraphLikeElements = new Set([
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
      const Im = /id=("|')docs-internal-guid-[-0-9a-f]+("|')/i
      class Mm {
        constructor(t) {
          this.document = t
        }
        isActive(t) {
          return Im.test(t)
        }
        execute(t) {
          const e = new su(this.document),
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
      function Nm(t, e) {
        if (!t.childCount) return
        const n = new su(),
          i = (function (t, e) {
            const n = e.createRangeIn(t),
              i = new Ii({ name: /v:(.+)/ }),
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
            s = new Ii({ name: 'img' }),
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
              i = new Ii({ name: /v:(.+)/ }),
              s = []
            for (const t of n) 'elementStart' == t.type && i.match(t.item) && s.push(t.item)
            for (const t of s) e.remove(t)
          })(t, n)
        const s = (function (t, e) {
          const n = e.createRangeIn(t),
            i = new Ii({ name: 'img' }),
            s = []
          for (const t of n) i.match(t.item) && t.item.getAttribute('src').startsWith('file://') && s.push(t.item)
          return s
        })(t, n)
        s.length &&
          (function (t, e, n) {
            if (t.length === e.length)
              for (let i = 0; i < t.length; i++) {
                const s = `data:${e[i].type};base64,${Dm(e[i].hex)}`
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
      function Dm(t) {
        return btoa(
          t
            .match(/\w{2}/g)
            .map(t => String.fromCharCode(parseInt(t, 16)))
            .join('')
        )
      }
      const Fm = /<meta\s*name="?generator"?\s*content="?microsoft\s*word\s*\d+"?\/?>/i,
        Bm = /xmlns:o="urn:schemas-microsoft-com/i
      class Vm {
        constructor(t) {
          this.document = t
        }
        isActive(t) {
          return Fm.test(t) || Bm.test(t)
        }
        execute(t) {
          const { body: e, stylesString: n } = t._parsedData
          xm(e, n), Nm(e, t.dataTransfer.getData('text/rtf')), (t.content = e)
        }
      }
      function Lm(t) {
        return t.replace(/<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g, (t, e) =>
          1 === e.length
            ? ' '
            : Array(e.length + 1)
                .join('  ')
                .substr(0, e.length)
        )
      }
      function jm(t, e) {
        const n = new DOMParser(),
          i = (function (t) {
            return Lm(Lm(t))
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
            t.innerText = Array(e + 1)
              .join('  ')
              .substr(0, e)
          })
        })(s)
        const o = s.body.innerHTML,
          r = (function (t, e) {
            const n = new Zs(e),
              i = new lr(n, { renderingMode: 'data' }),
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
      const Wm = 'removeFormat'
      class $m extends j {
        static get pluginName() {
          return 'RemoveFormatUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add(Wm, n => {
            const i = t.commands.get(Wm),
              s = new md(n)
            return (
              s.set({
                label: e('Remove Format'),
                icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.69 14.915c.053.052.173.083.36.093a.366.366 0 0 1 .345.485l-.003.01a.738.738 0 0 1-.697.497h-2.67a.374.374 0 0 1-.353-.496l.013-.038a.681.681 0 0 1 .644-.458c.197-.012.325-.043.386-.093a.28.28 0 0 0 .072-.11L9.592 4.5H6.269c-.359-.017-.609.013-.75.09-.142.078-.289.265-.442.563-.192.29-.516.464-.864.464H4.17a.43.43 0 0 1-.407-.569L4.46 3h13.08l-.62 2.043a.81.81 0 0 1-.775.574h-.114a.486.486 0 0 1-.486-.486c.001-.284-.054-.464-.167-.54-.112-.076-.367-.106-.766-.091h-3.28l-2.68 10.257c-.006.074.007.127.038.158zM3 17h8a.5.5 0 1 1 0 1H3a.5.5 0 1 1 0-1zm11.299 1.17a.75.75 0 1 1-1.06-1.06l1.414-1.415-1.415-1.414a.75.75 0 0 1 1.06-1.06l1.415 1.414 1.414-1.415a.75.75 0 1 1 1.06 1.06l-1.413 1.415 1.414 1.415a.75.75 0 0 1-1.06 1.06l-1.415-1.414-1.414 1.414z"/></svg>',
                tooltip: !0,
              }),
              s.bind('isOn', 'isEnabled').to(i, 'value', 'isEnabled'),
              this.listenTo(s, 'execute', () => {
                t.execute(Wm), t.editing.view.focus()
              }),
              s
            )
          })
        }
      }
      class zm extends $ {
        refresh() {
          const t = this.editor.model
          this.isEnabled = !!da(this._getFormattingItems(t.document.selection, t.schema))
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
          const n = t => !!da(this._getFormattingAttributes(t, e))
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
      class qm extends j {
        static get pluginName() {
          return 'RemoveFormatEditing'
        }
        init() {
          const t = this.editor
          t.commands.add('removeFormat', new zm(t))
        }
      }
      const Um = 'underline'
      class Hm extends j {
        static get pluginName() {
          return 'UnderlineEditing'
        }
        init() {
          const t = this.editor
          t.model.schema.extend('$text', { allowAttributes: Um }),
            t.model.schema.setAttributeProperties(Um, { isFormatting: !0, copyOnEnter: !0 }),
            t.conversion.attributeToElement({
              model: Um,
              view: 'u',
              upcastAlso: { styles: { 'text-decoration': 'underline' } },
            }),
            t.commands.add(Um, new cu(t, Um)),
            t.keystrokes.set('CTRL+U', 'underline')
        }
      }
      const Km = 'underline'
      class Gm extends j {
        static get pluginName() {
          return 'UnderlineUI'
        }
        init() {
          const t = this.editor,
            e = t.t
          t.ui.componentFactory.add(Km, n => {
            const i = t.commands.get(Km),
              s = new md(n)
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
                t.execute(Km), t.editing.view.focus()
              }),
              s
            )
          })
        }
      }
      class Jm extends $ {
        execute(t = {}) {
          this.editor.plugins.get('WProofreader').toggle()
        }
      }
      class Ym extends $ {
        execute(t = {}) {
          this.editor.plugins.get('WProofreader').openSettings()
        }
      }
      class Xm extends $ {
        execute(t = {}) {
          this.editor.plugins.get('WProofreader').openDialog()
        }
      }
      class Zm extends j {
        static get pluginName() {
          return 'WProofreaderEditing'
        }
        init() {
          this._addCommands(), this._enableInTrackChanges()
        }
        _addCommands() {
          this.editor.commands.add('WProofreaderToggle', new Jm(this.editor)),
            this.editor.commands.add('WProofreaderSettings', new Ym(this.editor)),
            this.editor.commands.add('WProofreaderDialog', new Xm(this.editor))
        }
        _enableInTrackChanges() {
          if (this.editor.plugins.has('TrackChanges')) {
            const t = this.editor.plugins.get('TrackChangesEditing')
            ;['WProofreaderToggle', 'WProofreaderSettings', 'WProofreaderDialog'].forEach(e => t.enableCommand(e))
          }
        }
      }
      class Qm extends j {
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
            const i = Od(n)
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
                          i = (t.listView = new xd(n))
                        i.items.bindTo(e).using(({ type: t, model: e }) => {
                          if ('separator' === t) return new Rd(n)
                          if ('button' === t || 'switchbutton' === t) {
                            const i = new Sd(n)
                            let s
                            return (
                              (s = 'button' === t ? new md(n) : new gd(n)),
                              s.bind(...Object.keys(e)).to(e),
                              s.delegate('execute').to(i),
                              i.children.add(s),
                              i
                            )
                          }
                        }),
                          t.panelView.children.add(i),
                          i.items.delegate('execute').to(t),
                          Id(t, () => i.items.find(t => t instanceof Sd && t.children.first.isOn))
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
          const e = new mi()
          return (
            t.forEach(t => {
              const n = {
                type: 'button',
                model: new Vd({
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
      class tg {
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
      class eg {
        constructor(t) {
          this._validateSrc(t), (this._src = t), (this._globalSrcStorage = new tg())
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
      const ng = 'InstancesDisabling'
      class ig extends au {}
      var sg = window.wproofreaderProtocol,
        og = window.wproofreaderHost,
        rg = window.wproofreaderPort,
        ag = sg + '://' + og + (rg && rg.length ? ':' + rg : '')
      ;(ig.builtinPlugins = [
        lu,
        class extends j {
          static get requires() {
            return [du, fu]
          }
          static get pluginName() {
            return 'Bold'
          }
        },
        class extends j {
          static get requires() {
            return [uf, ku, Pf, pf, xf, Lf]
          }
          static get pluginName() {
            return 'Essentials'
          }
        },
        class extends j {
          static get requires() {
            return [Uf, Hf, nf]
          }
          static get pluginName() {
            return 'HorizontalLine'
          }
        },
        class extends j {
          static get requires() {
            return [Gf, Yf]
          }
          static get pluginName() {
            return 'Italic'
          }
        },
        class extends j {
          static get requires() {
            return [vm, km]
          }
          static get pluginName() {
            return 'List'
          }
        },
        Tm,
        class extends j {
          static get pluginName() {
            return 'PasteFromOffice'
          }
          static get requires() {
            return [wu]
          }
          init() {
            const t = this.editor,
              e = t.editing.view.document,
              n = []
            n.push(new Vm(e)),
              n.push(new Mm(e)),
              t.plugins.get('ClipboardPipeline').on(
                'inputTransformation',
                (i, s) => {
                  if (s._isTransformedWithPasteFromOffice) return
                  if (t.model.document.selection.getFirstPosition().parent.is('element', 'codeBlock')) return
                  const o = s.dataTransfer.getData('text/html'),
                    r = n.find(t => t.isActive(o))
                  r &&
                    ((s._parsedData = jm(o, e.stylesProcessor)),
                    r.execute(s),
                    (s._isTransformedWithPasteFromOffice = !0))
                },
                { priority: 'high' }
              )
          }
        },
        class extends j {
          static get requires() {
            return [qm, $m]
          }
          static get pluginName() {
            return 'RemoveFormat'
          }
        },
        class extends j {
          static get requires() {
            return [Hm, Gm]
          }
          static get pluginName() {
            return 'Underline'
          }
        },
        class extends j {
          static get requires() {
            return [Zm, Qm]
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
              this._setIsEnabled(this._userOptions.autoStartup, ng),
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
            return new eg(this._userOptions.srcUrl).load()
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
            this._setIsEnabled(e, ng), this._syncToggle(e)
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
            this._setIsEnabled(!t, ng), this._syncToggle(!t)
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
        (ig.defaultConfig = {
          toolbar: {
            items: [
              'bold',
              'italic',
              'underline',
              '|',
              'bulletedList',
              'numberedList',
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
            serviceProtocol: sg,
            serviceHost: og,
            servicePort: rg || (sg === 'https' ? '443' : '80'),
            servicePath: 'wscservice/api',
            removeBranding: !0,
            settingsSections: ['general', 'options'],
            srcUrl: ag + '/wscservice/wscbundle/wscbundle.js',
          },
        })
      const lg = ig
      return (e = e.default)
    })()
  )
//# sourceMappingURL=ckeditor.js.map

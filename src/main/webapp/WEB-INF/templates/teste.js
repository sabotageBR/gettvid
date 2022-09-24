function analyze() {
    var n = $("#txt-url").val();
    n.trim() !== "" &&
        (k_busy ||
            ((k_busy = !0),
            $.ajax({
                type: "POST",
                url: k_analyze_url,
                data: { url: n, q_auto: k_get_query !== undefined && k_get_query !== null && k_get_query !== "" ? 1 : 0, ajax: 1, token: client_token },
                beforeSend: function () {
                    $(".autocomplete-suggestions").css("display", "none");
                    $("#loading_img").css("display", "inline");
                    $("#result").empty();
                    $("#btn-submit").focus();
                },
                success: function (n, t, i) {
                    if (
                        (i.status != 200 &&
                            setTimeout(function () {
                                window.location.reload();
                            }, 3e3),
                        n.status == "success"
                            ? ($("#loading_img").css("display", "none"), $("#result").empty().append(n.result))
                            : setTimeout(function () {
                                  window.location.reload();
                              }, 3e3),
                        video_extractor && k_data_vid)
                    ) {
                        var r = wLocation;
                        video_extractor == "search" && k_data_vid.indexOf("/") > -1 && (k_data_vid = k_data_vid.replace(/\//g, "!!slash!!"));
                        r += video_extractor == "youtube" && k_tmp_url !== "/_hl_/" ? encodeURIComponent(k_data_vid) : video_extractor + "/" + encodeURIComponent(k_data_vid);
                        (video_extractor == "channel" || video_extractor == "user") && k_qs.order !== undefined && k_qs.order !== null && (r += "?order=" + encodeURIComponent(k_qs.order));
                        video_extractor == "channel" && $("#txt-url").val("");
                        window.history.replaceState(null, null, r);
                        $("#menu-lang a").each(function () {
                            var n = k_tmp_url;
                            n = video_extractor == "youtube" && k_tmp_url !== "/_hl_/" ? k_tmp_url.replace("_hl_", $(this).data("lang")) + k_data_vid : k_tmp_url.replace("_hl_", $(this).data("lang")) + video_extractor + "/" + k_data_vid;
                            (video_extractor == "channel" || video_extractor == "user") && k_qs.order !== undefined && k_qs.order !== null && (n += "?order=" + encodeURIComponent(k_qs.order));
                            $(this).attr("href", n);
                        });
                    }
                    k_busy = !1;
                },
            })));
}
function convert_Server(n, t, i) {
    $.ajax({
        type: "POST",
        url: n + "/api/json/convert",
        data: { v_id: k_data_vid, ftype: i, fquality: t, fname: k_file_name, token: k__id, timeExpire: k_time },
        success: function (t) {
            typeof t.status == "undefined"
                ? renderFail(k_MessageError404)
                : t.status == "success"
                ? t.statusCode == 200
                    ? convertSuccess(t.result, i)
                    : t.statusCode == 300 && typeof t.jobId != "undefined"
                    ? (renderConverting(), WSCheckStatus(n, t.jobId, i))
                    : renderFail(k_MessageError404)
                : renderFail(k_MessageError404);
        },
        error: function () {
            renderFail(k_MessageError500);
        },
    });
}
function WSCheckStatus(n, t, i) {
    const r = new URL(n);
    var u = r.protocol == "https:" ? "wss:" : "ws:",
        f = u + "//" + r.host + "/sub/" + t + "?fname=" + k_prefix_name;
    socket = new WebSocket(f);
    socket.onmessage = function (n) {
        var t = JSON.parse(n.data);
        t.action === "success" ? convertSuccess(t.url, i) : t.action === "progress" ? UpdateProgress(t.value) : t.action === "error" && renderFail(k_MessageError500);
    };
    socket.onclose = function () {
        console.log("Convert success.");
    };
    socket.onerror = function () {
        renderFail(k_MessageError500);
    };
}
function renderFail(n) {
    $("#process-waiting").hide();
    var t = '<div class="alert alert-danger" role="alert">\n<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n <span class="sr-only">' + k_text_error + ": </span>" + n + "</div>";
    $("#process-result").empty().append(t);
}
function renderConverting() {
    var n =
        '<div class="progress progress-striped progress-bar-warning active">\n<div id="progress-bar" class="progress-bar progress-bar-success" style="width: 0.3517%;"></div>\n<small><b>' +
        k_ConvertingText +
        '</b> <span style="font-weight: normal">' +
        k_ConvertWatingText +
        "</span></small></div>";
    $("#process-result").empty().append(n);
}
function UpdateProgress(n) {
    $("#progress-bar").css("width", n + "%");
}
function convertSuccess(n, t) {
    $("#process-waiting").hide();
    var i = '<div class="form-group has-success has-feedback">\n<a href="' + n + '" rel="nofollow" type="button" class="btn btn-success btn-download-link">\n<i class="glyphicon glyphicon-download-alt"></i>&nbsp; Download .' + t + "</a>";
    t == "mp3" && (i += '<a href="https://mp3cutterpro.com" rel="nofollow" target="_blank" class="btn btn-danger btn-mp3-cutter"><i class="glyphicon glyphicon-scissors"></i>&nbsp; Edit &amp; cut MP3</a>');
    i += "</div>";
    $("#process-result").empty().append(i);
}
if (
    (!(function (n, t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports
            ? (module.exports = n.document
                  ? t(n, !0)
                  : function (n) {
                        if (!n.document) throw new Error("jQuery requires a window with a document");
                        return t(n);
                    })
            : t(n);
    })("undefined" != typeof window ? window : this, function (n, t) {
        "use strict";
        function br(n, t, i) {
            var r,
                e,
                u = (i = i || f).createElement("script");
            if (((u.text = n), t)) for (r in ee) (e = t[r] || (t.getAttribute && t.getAttribute(r))) && u.setAttribute(r, e);
            i.head.appendChild(u).parentNode.removeChild(u);
        }
        function it(n) {
            return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? ri[pr.call(n)] || "object" : typeof n;
        }
        function pi(n) {
            var t = !!n && "length" in n && n.length,
                i = it(n);
            return !u(n) && !tt(n) && ("array" === i || 0 === t || ("number" == typeof t && 0 < t && t - 1 in n));
        }
        function c(n, t) {
            return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase();
        }
        function bi(n, t, r) {
            return u(t)
                ? i.grep(n, function (n, i) {
                      return !!t.call(n, i, n) !== r;
                  })
                : t.nodeType
                ? i.grep(n, function (n) {
                      return (n === t) !== r;
                  })
                : "string" != typeof t
                ? i.grep(n, function (n) {
                      return -1 < ii.call(t, n) !== r;
                  })
                : i.filter(t, n, r);
        }
        function uu(n, t) {
            while ((n = n[t]) && 1 !== n.nodeType);
            return n;
        }
        function ut(n) {
            return n;
        }
        function fi(n) {
            throw n;
        }
        function fu(n, t, i, r) {
            var f;
            try {
                n && u((f = n.promise)) ? f.call(n).done(t).fail(i) : n && u((f = n.then)) ? f.call(n, t, i) : t.apply(void 0, [n].slice(r));
            } catch (n) {
                i.apply(void 0, [n]);
            }
        }
        function oi() {
            f.removeEventListener("DOMContentLoaded", oi);
            n.removeEventListener("load", oi);
            i.ready();
        }
        function ce(n, t) {
            return t.toUpperCase();
        }
        function y(n) {
            return n.replace(se, "ms-").replace(he, ce);
        }
        function pt() {
            this.expando = i.expando + pt.uid++;
        }
        function ou(n, t, i) {
            var u, r;
            if (void 0 === i && 1 === n.nodeType)
                if (((u = "data-" + t.replace(ae, "-$&").toLowerCase()), "string" == typeof (i = n.getAttribute(u)))) {
                    try {
                        i = "true" === (r = i) || ("false" !== r && ("null" === r ? null : r === +r + "" ? +r : le.test(r) ? JSON.parse(r) : r));
                    } catch (n) {}
                    o.set(n, t, i);
                } else i = void 0;
            return i;
        }
        function hu(n, t, r, u) {
            var s,
                h,
                c = 20,
                l = u
                    ? function () {
                          return u.cur();
                      }
                    : function () {
                          return i.css(n, t, "");
                      },
                o = l(),
                e = (r && r[3]) || (i.cssNumber[t] ? "" : "px"),
                f = n.nodeType && (i.cssNumber[t] || ("px" !== e && +o)) && wt.exec(i.css(n, t));
            if (f && f[3] !== e) {
                for (o /= 2, e = e || f[3], f = +o || 1; c--; ) i.style(n, t, f + e), (1 - h) * (1 - (h = l() / o || 0.5)) <= 0 && (c = 0), (f /= h);
                f *= 2;
                i.style(n, t, f + e);
                r = r || [];
            }
            return r && ((f = +f || +o || 0), (s = r[1] ? f + (r[1] + 1) * r[2] : +r[2]), u && ((u.unit = e), (u.start = f), (u.end = s))), s;
        }
        function et(n, t) {
            for (var h, f, a, s, c, l, e, o = [], u = 0, v = n.length; u < v; u++)
                (f = n[u]).style &&
                    ((h = f.style.display),
                    t
                        ? ("none" === h && ((o[u] = r.get(f, "display") || null), o[u] || (f.style.display = "")),
                          "" === f.style.display &&
                              kt(f) &&
                              (o[u] =
                                  ((e = c = s = void 0),
                                  (c = (a = f).ownerDocument),
                                  (l = a.nodeName),
                                  (e = di[l]) || ((s = c.body.appendChild(c.createElement(l))), (e = i.css(s, "display")), s.parentNode.removeChild(s), "none" === e && (e = "block"), (di[l] = e)))))
                        : "none" !== h && ((o[u] = "none"), r.set(f, "display", h)));
            for (u = 0; u < v; u++) null != o[u] && (n[u].style.display = o[u]);
            return n;
        }
        function s(n, t) {
            var r;
            return (r = "undefined" != typeof n.getElementsByTagName ? n.getElementsByTagName(t || "*") : "undefined" != typeof n.querySelectorAll ? n.querySelectorAll(t || "*") : []), void 0 === t || (t && c(n, t)) ? i.merge([n], r) : r;
        }
        function gi(n, t) {
            for (var i = 0, u = n.length; i < u; i++) r.set(n[i], "globalEval", !t || r.get(t[i], "globalEval"));
        }
        function vu(n, t, r, u, f) {
            for (var e, o, p, a, w, v, c = t.createDocumentFragment(), y = [], l = 0, b = n.length; l < b; l++)
                if ((e = n[l]) || 0 === e)
                    if ("object" === it(e)) i.merge(y, e.nodeType ? [e] : e);
                    else if (au.test(e)) {
                        for (o = o || c.appendChild(t.createElement("div")), p = (cu.exec(e) || ["", ""])[1].toLowerCase(), a = h[p] || h._default, o.innerHTML = a[1] + i.htmlPrefilter(e) + a[2], v = a[0]; v--; ) o = o.lastChild;
                        i.merge(y, o.childNodes);
                        (o = c.firstChild).textContent = "";
                    } else y.push(t.createTextNode(e));
            for (c.textContent = "", l = 0; (e = y[l++]); )
                if (u && -1 < i.inArray(e, u)) f && f.push(e);
                else if (((w = ft(e)), (o = s(c.appendChild(e), "script")), w && gi(o), r)) for (v = 0; (e = o[v++]); ) lu.test(e.type || "") && r.push(e);
            return c;
        }
        function ot() {
            return !0;
        }
        function st() {
            return !1;
        }
        function we(n, t) {
            return (
                (n ===
                    (function () {
                        try {
                            return f.activeElement;
                        } catch (n) {}
                    })()) ==
                ("focus" === t)
            );
        }
        function nr(n, t, r, u, f, e) {
            var o, s;
            if ("object" == typeof t) {
                for (s in ("string" != typeof r && ((u = u || r), (r = void 0)), t)) nr(n, s, r, u, t[s], e);
                return n;
            }
            if ((null == u && null == f ? ((f = r), (u = r = void 0)) : null == f && ("string" == typeof r ? ((f = u), (u = void 0)) : ((f = u), (u = r), (r = void 0))), !1 === f)) f = st;
            else if (!f) return n;
            return (
                1 === e &&
                    ((o = f),
                    ((f = function (n) {
                        return i().off(n), o.apply(this, arguments);
                    }).guid = o.guid || (o.guid = i.guid++))),
                n.each(function () {
                    i.event.add(this, t, f, u, r);
                })
            );
        }
        function hi(n, t, u) {
            u
                ? (r.set(n, t, !1),
                  i.event.add(n, t, {
                      namespace: !1,
                      handler: function (n) {
                          var o,
                              e,
                              f = r.get(this, t);
                          if (1 & n.isTrigger && this[t]) {
                              if (f) (i.event.special[t] || {}).delegateType && n.stopPropagation();
                              else if (((f = b.call(arguments)), r.set(this, t, f), (o = u(this, t)), this[t](), f !== (e = r.get(this, t)) || o ? r.set(this, t, !1) : (e = void 0), f !== e))
                                  return n.stopImmediatePropagation(), n.preventDefault(), e;
                          } else f && (r.set(this, t, i.event.trigger(i.extend(f.shift(), i.Event.prototype), f, this)), n.stopImmediatePropagation());
                      },
                  }))
                : i.event.add(n, t, ot);
        }
        function pu(n, t) {
            return (c(n, "table") && c(11 !== t.nodeType ? t : t.firstChild, "tr") && i(n).children("tbody")[0]) || n;
        }
        function no(n) {
            return (n.type = (null !== n.getAttribute("type")) + "/" + n.type), n;
        }
        function to(n) {
            return "true/" === (n.type || "").slice(0, 5) ? (n.type = n.type.slice(5)) : n.removeAttribute("type"), n;
        }
        function wu(n, t) {
            var u, c, f, s, h, l, a, e;
            if (1 === t.nodeType) {
                if (r.hasData(n) && ((s = r.access(n)), (h = r.set(t, s)), (e = s.events))) for (f in (delete h.handle, (h.events = {}), e)) for (u = 0, c = e[f].length; u < c; u++) i.event.add(t, f, e[f][u]);
                o.hasData(n) && ((l = o.access(n)), (a = i.extend({}, l)), o.set(t, a));
            }
        }
        function ht(n, t, f, o) {
            t = yr.apply([], t);
            var a,
                w,
                l,
                v,
                h,
                b,
                c = 0,
                y = n.length,
                d = y - 1,
                p = t[0],
                k = u(p);
            if (k || (1 < y && "string" == typeof p && !e.checkClone && de.test(p)))
                return n.each(function (i) {
                    var r = n.eq(i);
                    k && (t[0] = p.call(this, i, r.html()));
                    ht(r, t, f, o);
                });
            if (y && ((w = (a = vu(t, n[0].ownerDocument, !1, n, o)).firstChild), 1 === a.childNodes.length && (a = w), w || o)) {
                for (v = (l = i.map(s(a, "script"), no)).length; c < y; c++) (h = a), c !== d && ((h = i.clone(h, !0, !0)), v && i.merge(l, s(h, "script"))), f.call(n[c], h, c);
                if (v)
                    for (b = l[l.length - 1].ownerDocument, i.map(l, to), c = 0; c < v; c++)
                        (h = l[c]),
                            lu.test(h.type || "") &&
                                !r.access(h, "globalEval") &&
                                i.contains(b, h) &&
                                (h.src && "module" !== (h.type || "").toLowerCase() ? i._evalUrl && !h.noModule && i._evalUrl(h.src, { nonce: h.nonce || h.getAttribute("nonce") }) : br(h.textContent.replace(ge, ""), h, b));
            }
            return n;
        }
        function bu(n, t, r) {
            for (var u, e = t ? i.filter(t, n) : n, f = 0; null != (u = e[f]); f++) r || 1 !== u.nodeType || i.cleanData(s(u)), u.parentNode && (r && ft(u) && gi(s(u, "script")), u.parentNode.removeChild(u));
            return n;
        }
        function ni(n, t, r) {
            var o,
                s,
                h,
                f,
                u = n.style;
            return (
                (r = r || ci(n)) &&
                    ("" !== (f = r.getPropertyValue(t) || r[t]) || ft(n) || (f = i.style(n, t)),
                    !e.pixelBoxStyles() && tr.test(f) && io.test(t) && ((o = u.width), (s = u.minWidth), (h = u.maxWidth), (u.minWidth = u.maxWidth = u.width = f), (f = r.width), (u.width = o), (u.minWidth = s), (u.maxWidth = h))),
                void 0 !== f ? f + "" : f
            );
        }
        function ku(n, t) {
            return {
                get: function () {
                    if (!n()) return (this.get = t).apply(this, arguments);
                    delete this.get;
                },
            };
        }
        function ir(n) {
            var t = i.cssProps[n] || nf[n];
            return (
                t ||
                (n in gu
                    ? n
                    : (nf[n] =
                          (function (n) {
                              for (var i = n[0].toUpperCase() + n.slice(1), t = du.length; t--; ) if ((n = du[t] + i) in gu) return n;
                          })(n) || n))
            );
        }
        function uf(n, t, i) {
            var r = wt.exec(t);
            return r ? Math.max(0, r[2] - (i || 0)) + (r[3] || "px") : t;
        }
        function rr(n, t, r, u, f, e) {
            var o = "width" === t ? 1 : 0,
                h = 0,
                s = 0;
            if (r === (u ? "border" : "content")) return 0;
            for (; o < 4; o += 2)
                "margin" === r && (s += i.css(n, r + w[o], !0, f)),
                    u
                        ? ("content" === r && (s -= i.css(n, "padding" + w[o], !0, f)), "margin" !== r && (s -= i.css(n, "border" + w[o] + "Width", !0, f)))
                        : ((s += i.css(n, "padding" + w[o], !0, f)), "padding" !== r ? (s += i.css(n, "border" + w[o] + "Width", !0, f)) : (h += i.css(n, "border" + w[o] + "Width", !0, f)));
            return !u && 0 <= e && (s += Math.max(0, Math.ceil(n["offset" + t[0].toUpperCase() + t.slice(1)] - e - s - h - 0.5)) || 0), s;
        }
        function ff(n, t, r) {
            var f = ci(n),
                o = (!e.boxSizingReliable() || r) && "border-box" === i.css(n, "boxSizing", !1, f),
                s = o,
                u = ni(n, t, f),
                h = "offset" + t[0].toUpperCase() + t.slice(1);
            if (tr.test(u)) {
                if (!r) return u;
                u = "auto";
            }
            return (
                ((!e.boxSizingReliable() && o) || "auto" === u || (!parseFloat(u) && "inline" === i.css(n, "display", !1, f))) &&
                    n.getClientRects().length &&
                    ((o = "border-box" === i.css(n, "boxSizing", !1, f)), (s = h in n) && (u = n[h])),
                (u = parseFloat(u) || 0) + rr(n, t, r || (o ? "border" : "content"), s, f, u) + "px"
            );
        }
        function a(n, t, i, r, u) {
            return new a.prototype.init(n, t, i, r, u);
        }
        function ur() {
            li && (!1 === f.hidden && n.requestAnimationFrame ? n.requestAnimationFrame(ur) : n.setTimeout(ur, i.fx.interval), i.fx.tick());
        }
        function hf() {
            return (
                n.setTimeout(function () {
                    ct = void 0;
                }),
                (ct = Date.now())
            );
        }
        function ai(n, t) {
            var u,
                r = 0,
                i = { height: n };
            for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (u = w[r])] = i["padding" + u] = n;
            return t && (i.opacity = i.width = n), i;
        }
        function cf(n, t, i) {
            for (var u, f = (v.tweeners[t] || []).concat(v.tweeners["*"]), r = 0, e = f.length; r < e; r++) if ((u = f[r].call(i, t, n))) return u;
        }
        function v(n, t, r) {
            var o,
                s,
                h = 0,
                a = v.prefilters.length,
                e = i.Deferred().always(function () {
                    delete l.elem;
                }),
                l = function () {
                    if (s) return !1;
                    for (var o = ct || hf(), t = Math.max(0, f.startTime + f.duration - o), i = 1 - (t / f.duration || 0), r = 0, u = f.tweens.length; r < u; r++) f.tweens[r].run(i);
                    return e.notifyWith(n, [f, i, t]), i < 1 && u ? t : (u || e.notifyWith(n, [f, 1, 0]), e.resolveWith(n, [f]), !1);
                },
                f = e.promise({
                    elem: n,
                    props: i.extend({}, t),
                    opts: i.extend(!0, { specialEasing: {}, easing: i.easing._default }, r),
                    originalProperties: t,
                    originalOptions: r,
                    startTime: ct || hf(),
                    duration: r.duration,
                    tweens: [],
                    createTween: function (t, r) {
                        var u = i.Tween(n, f.opts, t, r, f.opts.specialEasing[t] || f.opts.easing);
                        return f.tweens.push(u), u;
                    },
                    stop: function (t) {
                        var i = 0,
                            r = t ? f.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; i < r; i++) f.tweens[i].run(1);
                        return t ? (e.notifyWith(n, [f, 1, 0]), e.resolveWith(n, [f, t])) : e.rejectWith(n, [f, t]), this;
                    },
                }),
                c = f.props;
            for (
                !(function (n, t) {
                    var r, f, e, u, o;
                    for (r in n)
                        if (((e = t[(f = y(r))]), (u = n[r]), Array.isArray(u) && ((e = u[1]), (u = n[r] = u[0])), r !== f && ((n[f] = u), delete n[r]), (o = i.cssHooks[f]) && ("expand" in o)))
                            for (r in ((u = o.expand(u)), delete n[f], u)) (r in n) || ((n[r] = u[r]), (t[r] = e));
                        else t[f] = e;
                })(c, f.opts.specialEasing);
                h < a;
                h++
            )
                if ((o = v.prefilters[h].call(f, n, c, f.opts))) return u(o.stop) && (i._queueHooks(f.elem, f.opts.queue).stop = o.stop.bind(o)), o;
            return (
                i.map(c, cf, f),
                u(f.opts.start) && f.opts.start.call(n, f),
                f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always),
                i.fx.timer(i.extend(l, { elem: n, anim: f, queue: f.opts.queue })),
                f
            );
        }
        function g(n) {
            return (n.match(l) || []).join(" ");
        }
        function nt(n) {
            return (n.getAttribute && n.getAttribute("class")) || "";
        }
        function fr(n) {
            return Array.isArray(n) ? n : ("string" == typeof n && n.match(l)) || [];
        }
        function hr(n, t, r, u) {
            var f;
            if (Array.isArray(t))
                i.each(t, function (t, i) {
                    r || fo.test(n) ? u(n, i) : hr(n + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, r, u);
                });
            else if (r || "object" !== it(t)) u(n, t);
            else for (f in t) hr(n + "[" + f + "]", t[f], r, u);
        }
        function df(n) {
            return function (t, i) {
                "string" != typeof t && ((i = t), (t = "*"));
                var r,
                    f = 0,
                    e = t.toLowerCase().match(l) || [];
                if (u(i)) while ((r = e[f++])) "+" === r[0] ? ((r = r.slice(1) || "*"), (n[r] = n[r] || []).unshift(i)) : (n[r] = n[r] || []).push(i);
            };
        }
        function gf(n, t, r, u) {
            function e(s) {
                var h;
                return (
                    (f[s] = !0),
                    i.each(n[s] || [], function (n, i) {
                        var s = i(t, r, u);
                        return "string" != typeof s || o || f[s] ? (o ? !(h = s) : void 0) : (t.dataTypes.unshift(s), e(s), !1);
                    }),
                    h
                );
            }
            var f = {},
                o = n === cr;
            return e(t.dataTypes[0]) || (!f["*"] && e("*"));
        }
        function ar(n, t) {
            var r,
                u,
                f = i.ajaxSettings.flatOptions || {};
            for (r in t) void 0 !== t[r] && ((f[r] ? n : u || (u = {}))[r] = t[r]);
            return u && i.extend(!0, n, u), n;
        }
        var d = [],
            f = n.document,
            ue = Object.getPrototypeOf,
            b = d.slice,
            yr = d.concat,
            yi = d.push,
            ii = d.indexOf,
            ri = {},
            pr = ri.toString,
            ui = ri.hasOwnProperty,
            wr = ui.toString,
            fe = wr.call(Object),
            e = {},
            u = function (n) {
                return "function" == typeof n && "number" != typeof n.nodeType;
            },
            tt = function (n) {
                return null != n && n === n.window;
            },
            ee = { type: !0, src: !0, nonce: !0, noModule: !0 },
            kr = "3.4.0",
            i = function (n, t) {
                return new i.fn.init(n, t);
            },
            oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            k,
            wi,
            nu,
            tu,
            iu,
            ru,
            l,
            eu,
            ei,
            yt,
            kt,
            ki,
            di,
            gt,
            si,
            au,
            ct,
            li,
            lt,
            ef,
            of,
            sf,
            lf,
            at,
            af,
            vf,
            yf,
            er,
            or,
            ne,
            vt,
            te,
            vr,
            vi,
            ie,
            re;
        i.fn = i.prototype = {
            jquery: kr,
            constructor: i,
            length: 0,
            toArray: function () {
                return b.call(this);
            },
            get: function (n) {
                return null == n ? b.call(this) : n < 0 ? this[n + this.length] : this[n];
            },
            pushStack: function (n) {
                var t = i.merge(this.constructor(), n);
                return (t.prevObject = this), t;
            },
            each: function (n) {
                return i.each(this, n);
            },
            map: function (n) {
                return this.pushStack(
                    i.map(this, function (t, i) {
                        return n.call(t, i, t);
                    })
                );
            },
            slice: function () {
                return this.pushStack(b.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (n) {
                var i = this.length,
                    t = +n + (n < 0 ? i : 0);
                return this.pushStack(0 <= t && t < i ? [this[t]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: yi,
            sort: d.sort,
            splice: d.splice,
        };
        i.extend = i.fn.extend = function () {
            var s,
                f,
                e,
                t,
                o,
                c,
                n = arguments[0] || {},
                r = 1,
                l = arguments.length,
                h = !1;
            for ("boolean" == typeof n && ((h = n), (n = arguments[r] || {}), r++), "object" == typeof n || u(n) || (n = {}), r === l && ((n = this), r--); r < l; r++)
                if (null != (s = arguments[r]))
                    for (f in s)
                        (t = s[f]),
                            "__proto__" !== f &&
                                n !== t &&
                                (h && t && (i.isPlainObject(t) || (o = Array.isArray(t)))
                                    ? ((e = n[f]), (c = o && !Array.isArray(e) ? [] : o || i.isPlainObject(e) ? e : {}), (o = !1), (n[f] = i.extend(h, c, t)))
                                    : void 0 !== t && (n[f] = t));
            return n;
        };
        i.extend({
            expando: "jQuery" + (kr + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (n) {
                throw new Error(n);
            },
            noop: function () {},
            isPlainObject: function (n) {
                var t, i;
                return !(!n || "[object Object]" !== pr.call(n)) && (!(t = ue(n)) || ("function" == typeof (i = ui.call(t, "constructor") && t.constructor) && wr.call(i) === fe));
            },
            isEmptyObject: function (n) {
                for (var t in n) return !1;
                return !0;
            },
            globalEval: function (n, t) {
                br(n, { nonce: t && t.nonce });
            },
            each: function (n, t) {
                var r,
                    i = 0;
                if (pi(n)) {
                    for (r = n.length; i < r; i++) if (!1 === t.call(n[i], i, n[i])) break;
                } else for (i in n) if (!1 === t.call(n[i], i, n[i])) break;
                return n;
            },
            trim: function (n) {
                return null == n ? "" : (n + "").replace(oe, "");
            },
            makeArray: function (n, t) {
                var r = t || [];
                return null != n && (pi(Object(n)) ? i.merge(r, "string" == typeof n ? [n] : n) : yi.call(r, n)), r;
            },
            inArray: function (n, t, i) {
                return null == t ? -1 : ii.call(t, n, i);
            },
            merge: function (n, t) {
                for (var u = +t.length, i = 0, r = n.length; i < u; i++) n[r++] = t[i];
                return (n.length = r), n;
            },
            grep: function (n, t, i) {
                for (var u = [], r = 0, f = n.length, e = !i; r < f; r++) !t(n[r], r) !== e && u.push(n[r]);
                return u;
            },
            map: function (n, t, i) {
                var e,
                    u,
                    r = 0,
                    f = [];
                if (pi(n)) for (e = n.length; r < e; r++) null != (u = t(n[r], r, i)) && f.push(u);
                else for (r in n) null != (u = t(n[r], r, i)) && f.push(u);
                return yr.apply([], f);
            },
            guid: 1,
            support: e,
        });
        "function" == typeof Symbol && (i.fn[Symbol.iterator] = d[Symbol.iterator]);
        i.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (n, t) {
            ri["[object " + t + "]"] = t.toLowerCase();
        });
        k = (function (n) {
            function u(n, t, r, u) {
                var s,
                    p,
                    l,
                    v,
                    w,
                    d,
                    g,
                    y = t && t.ownerDocument,
                    a = t ? t.nodeType : 9;
                if (((r = r || []), "string" != typeof n || !n || (1 !== a && 9 !== a && 11 !== a))) return r;
                if (!u && ((t ? t.ownerDocument || t : c) !== i && b(t), (t = t || i), h)) {
                    if (11 !== a && (w = ar.exec(n)))
                        if ((s = w[1])) {
                            if (9 === a) {
                                if (!(l = t.getElementById(s))) return r;
                                if (l.id === s) return r.push(l), r;
                            } else if (y && (l = y.getElementById(s)) && et(t, l) && l.id === s) return r.push(l), r;
                        } else {
                            if (w[2]) return k.apply(r, t.getElementsByTagName(n)), r;
                            if ((s = w[3]) && e.getElementsByClassName && t.getElementsByClassName) return k.apply(r, t.getElementsByClassName(s)), r;
                        }
                    if (e.qsa && !lt[n + " "] && (!o || !o.test(n)) && (1 !== a || "object" !== t.nodeName.toLowerCase())) {
                        if (((g = n), (y = t), 1 === a && er.test(n))) {
                            for ((v = t.getAttribute("id")) ? (v = v.replace(yi, pi)) : t.setAttribute("id", (v = f)), p = (d = ft(n)).length; p--; ) d[p] = "#" + v + " " + pt(d[p]);
                            g = d.join(",");
                            y = (ti.test(n) && ri(t.parentNode)) || t;
                        }
                        try {
                            return k.apply(r, y.querySelectorAll(g)), r;
                        } catch (t) {
                            lt(n, !0);
                        } finally {
                            v === f && t.removeAttribute("id");
                        }
                    }
                }
                return si(n.replace(at, "$1"), t, r, u);
            }
            function yt() {
                var n = [];
                return function i(r, u) {
                    return n.push(r + " ") > t.cacheLength && delete i[n.shift()], (i[r + " "] = u);
                };
            }
            function l(n) {
                return (n[f] = !0), n;
            }
            function a(n) {
                var t = i.createElement("fieldset");
                try {
                    return !!n(t);
                } catch (n) {
                    return !1;
                } finally {
                    t.parentNode && t.parentNode.removeChild(t);
                    t = null;
                }
            }
            function ii(n, i) {
                for (var r = n.split("|"), u = r.length; u--; ) t.attrHandle[r[u]] = i;
            }
            function bi(n, t) {
                var i = t && n,
                    r = i && 1 === n.nodeType && 1 === t.nodeType && n.sourceIndex - t.sourceIndex;
                if (r) return r;
                if (i) while ((i = i.nextSibling)) if (i === t) return -1;
                return n ? 1 : -1;
            }
            function yr(n) {
                return function (t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === n;
                };
            }
            function pr(n) {
                return function (t) {
                    var i = t.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && t.type === n;
                };
            }
            function ki(n) {
                return function (t) {
                    return "form" in t
                        ? t.parentNode && !1 === t.disabled
                            ? "label" in t
                                ? "label" in t.parentNode
                                    ? t.parentNode.disabled === n
                                    : t.disabled === n
                                : t.isDisabled === n || (t.isDisabled !== !n && vr(t) === n)
                            : t.disabled === n
                        : "label" in t && t.disabled === n;
                };
            }
            function it(n) {
                return l(function (t) {
                    return (
                        (t = +t),
                        l(function (i, r) {
                            for (var u, f = n([], i.length, t), e = f.length; e--; ) i[(u = f[e])] && (i[u] = !(r[u] = i[u]));
                        })
                    );
                });
            }
            function ri(n) {
                return n && "undefined" != typeof n.getElementsByTagName && n;
            }
            function di() {}
            function pt(n) {
                for (var t = 0, r = n.length, i = ""; t < r; t++) i += n[t].value;
                return i;
            }
            function wt(n, t, i) {
                var r = t.dir,
                    u = t.next,
                    e = u || r,
                    o = i && "parentNode" === e,
                    s = gi++;
                return t.first
                    ? function (t, i, u) {
                          while ((t = t[r])) if (1 === t.nodeType || o) return n(t, i, u);
                          return !1;
                      }
                    : function (t, i, h) {
                          var c,
                              l,
                              a,
                              y = [v, s];
                          if (h) {
                              while ((t = t[r])) if ((1 === t.nodeType || o) && n(t, i, h)) return !0;
                          } else
                              while ((t = t[r]))
                                  if (1 === t.nodeType || o)
                                      if (((l = (a = t[f] || (t[f] = {}))[t.uniqueID] || (a[t.uniqueID] = {})), u && u === t.nodeName.toLowerCase())) t = t[r] || t;
                                      else {
                                          if ((c = l[e]) && c[0] === v && c[1] === s) return (y[2] = c[2]);
                                          if (((l[e] = y)[2] = n(t, i, h))) return !0;
                                      }
                          return !1;
                      };
            }
            function ui(n) {
                return 1 < n.length
                    ? function (t, i, r) {
                          for (var u = n.length; u--; ) if (!n[u](t, i, r)) return !1;
                          return !0;
                      }
                    : n[0];
            }
            function bt(n, t, i, r, u) {
                for (var e, o = [], f = 0, s = n.length, h = null != t; f < s; f++) (e = n[f]) && ((i && !i(e, r, u)) || (o.push(e), h && t.push(f)));
                return o;
            }
            function fi(n, t, i, r, e, o) {
                return (
                    r && !r[f] && (r = fi(r)),
                    e && !e[f] && (e = fi(e, o)),
                    l(function (f, o, s, h) {
                        var a,
                            l,
                            v,
                            w = [],
                            p = [],
                            b = o.length,
                            d =
                                f ||
                                (function (n, t, i) {
                                    for (var r = 0, f = t.length; r < f; r++) u(n, t[r], i);
                                    return i;
                                })(t || "*", s.nodeType ? [s] : s, []),
                            y = !n || (!f && t) ? d : bt(d, w, n, s, h),
                            c = i ? (e || (f ? n : b || r) ? [] : o) : y;
                        if ((i && i(y, c, s, h), r)) for (a = bt(c, p), r(a, [], s, h), l = a.length; l--; ) (v = a[l]) && (c[p[l]] = !(y[p[l]] = v));
                        if (f) {
                            if (e || n) {
                                if (e) {
                                    for (a = [], l = c.length; l--; ) (v = c[l]) && a.push((y[l] = v));
                                    e(null, (c = []), a, h);
                                }
                                for (l = c.length; l--; ) (v = c[l]) && -1 < (a = e ? nt(f, v) : w[l]) && (f[a] = !(o[a] = v));
                            }
                        } else (c = bt(c === o ? c.splice(b, c.length) : c)), e ? e(null, o, c, h) : k.apply(o, c);
                    })
                );
            }
            function ei(n) {
                for (
                    var o,
                        u,
                        r,
                        s = n.length,
                        h = t.relative[n[0].type],
                        c = h || t.relative[" "],
                        i = h ? 1 : 0,
                        l = wt(
                            function (n) {
                                return n === o;
                            },
                            c,
                            !0
                        ),
                        a = wt(
                            function (n) {
                                return -1 < nt(o, n);
                            },
                            c,
                            !0
                        ),
                        e = [
                            function (n, t, i) {
                                var r = (!h && (i || t !== ht)) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
                                return (o = null), r;
                            },
                        ];
                    i < s;
                    i++
                )
                    if ((u = t.relative[n[i].type])) e = [wt(ui(e), u)];
                    else {
                        if ((u = t.filter[n[i].type].apply(null, n[i].matches))[f]) {
                            for (r = ++i; r < s; r++) if (t.relative[n[r].type]) break;
                            return fi(1 < i && ui(e), 1 < i && pt(n.slice(0, i - 1).concat({ value: " " === n[i - 2].type ? "*" : "" })).replace(at, "$1"), u, i < r && ei(n.slice(i, r)), r < s && ei((n = n.slice(r))), r < s && pt(n));
                        }
                        e.push(u);
                    }
                return ui(e);
            }
            var rt,
                e,
                t,
                st,
                oi,
                ft,
                kt,
                si,
                ht,
                w,
                ut,
                b,
                i,
                s,
                h,
                o,
                d,
                ct,
                et,
                f = "sizzle" + 1 * new Date(),
                c = n.document,
                v = 0,
                gi = 0,
                hi = yt(),
                ci = yt(),
                li = yt(),
                lt = yt(),
                dt = function (n, t) {
                    return n === t && (ut = !0), 0;
                },
                nr = {}.hasOwnProperty,
                g = [],
                tr = g.pop,
                ir = g.push,
                k = g.push,
                ai = g.slice,
                nt = function (n, t) {
                    for (var i = 0, r = n.length; i < r; i++) if (n[i] === t) return i;
                    return -1;
                },
                gt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                r = "[\\x20\\t\\r\\n\\f]",
                tt = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                vi = "\\[" + r + "*(" + tt + ")(?:" + r + "*([*^$|!~]?=)" + r + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + tt + "))|)" + r + "*\\]",
                ni = ":(" + tt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + vi + ")*)|.*)\\)|)",
                rr = new RegExp(r + "+", "g"),
                at = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"),
                ur = new RegExp("^" + r + "*," + r + "*"),
                fr = new RegExp("^" + r + "*([>+~]|" + r + ")" + r + "*"),
                er = new RegExp(r + "|>"),
                or = new RegExp(ni),
                sr = new RegExp("^" + tt + "$"),
                vt = {
                    ID: new RegExp("^#(" + tt + ")"),
                    CLASS: new RegExp("^\\.(" + tt + ")"),
                    TAG: new RegExp("^(" + tt + "|[*])"),
                    ATTR: new RegExp("^" + vi),
                    PSEUDO: new RegExp("^" + ni),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + gt + ")$", "i"),
                    needsContext: new RegExp("^" + r + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + r + "*((?:-\\d)?\\d*)" + r + "*\\)|)(?=[^-]|$)", "i"),
                },
                hr = /HTML$/i,
                cr = /^(?:input|select|textarea|button)$/i,
                lr = /^h\d$/i,
                ot = /^[^{]+\{\s*\[native \w/,
                ar = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ti = /[+~]/,
                y = new RegExp("\\\\([\\da-f]{1,6}" + r + "?|(" + r + ")|.)", "ig"),
                p = function (n, t, i) {
                    var r = "0x" + t - 65536;
                    return r != r || i ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
                },
                yi = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                pi = function (n, t) {
                    return t ? ("\0" === n ? "ï¿½" : n.slice(0, -1) + "\\" + n.charCodeAt(n.length - 1).toString(16) + " ") : "\\" + n;
                },
                wi = function () {
                    b();
                },
                vr = wt(
                    function (n) {
                        return !0 === n.disabled && "fieldset" === n.nodeName.toLowerCase();
                    },
                    { dir: "parentNode", next: "legend" }
                );
            try {
                k.apply((g = ai.call(c.childNodes)), c.childNodes);
                g[c.childNodes.length].nodeType;
            } catch (rt) {
                k = {
                    apply: g.length
                        ? function (n, t) {
                              ir.apply(n, ai.call(t));
                          }
                        : function (n, t) {
                              for (var i = n.length, r = 0; (n[i++] = t[r++]); );
                              n.length = i - 1;
                          },
                };
            }
            for (rt in ((e = u.support = {}),
            (oi = u.isXML = function (n) {
                var i = n.namespaceURI,
                    t = (n.ownerDocument || n).documentElement;
                return !hr.test(i || (t && t.nodeName) || "HTML");
            }),
            (b = u.setDocument = function (n) {
                var v,
                    u,
                    l = n ? n.ownerDocument || n : c;
                return (
                    l !== i &&
                        9 === l.nodeType &&
                        l.documentElement &&
                        ((s = (i = l).documentElement),
                        (h = !oi(i)),
                        c !== i && (u = i.defaultView) && u.top !== u && (u.addEventListener ? u.addEventListener("unload", wi, !1) : u.attachEvent && u.attachEvent("onunload", wi)),
                        (e.attributes = a(function (n) {
                            return (n.className = "i"), !n.getAttribute("className");
                        })),
                        (e.getElementsByTagName = a(function (n) {
                            return n.appendChild(i.createComment("")), !n.getElementsByTagName("*").length;
                        })),
                        (e.getElementsByClassName = ot.test(i.getElementsByClassName)),
                        (e.getById = a(function (n) {
                            return (s.appendChild(n).id = f), !i.getElementsByName || !i.getElementsByName(f).length;
                        })),
                        e.getById
                            ? ((t.filter.ID = function (n) {
                                  var t = n.replace(y, p);
                                  return function (n) {
                                      return n.getAttribute("id") === t;
                                  };
                              }),
                              (t.find.ID = function (n, t) {
                                  if ("undefined" != typeof t.getElementById && h) {
                                      var i = t.getElementById(n);
                                      return i ? [i] : [];
                                  }
                              }))
                            : ((t.filter.ID = function (n) {
                                  var t = n.replace(y, p);
                                  return function (n) {
                                      var i = "undefined" != typeof n.getAttributeNode && n.getAttributeNode("id");
                                      return i && i.value === t;
                                  };
                              }),
                              (t.find.ID = function (n, t) {
                                  if ("undefined" != typeof t.getElementById && h) {
                                      var r,
                                          u,
                                          f,
                                          i = t.getElementById(n);
                                      if (i) {
                                          if ((r = i.getAttributeNode("id")) && r.value === n) return [i];
                                          for (f = t.getElementsByName(n), u = 0; (i = f[u++]); ) if ((r = i.getAttributeNode("id")) && r.value === n) return [i];
                                      }
                                      return [];
                                  }
                              })),
                        (t.find.TAG = e.getElementsByTagName
                            ? function (n, t) {
                                  return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(n) : e.qsa ? t.querySelectorAll(n) : void 0;
                              }
                            : function (n, t) {
                                  var i,
                                      r = [],
                                      f = 0,
                                      u = t.getElementsByTagName(n);
                                  if ("*" === n) {
                                      while ((i = u[f++])) 1 === i.nodeType && r.push(i);
                                      return r;
                                  }
                                  return u;
                              }),
                        (t.find.CLASS =
                            e.getElementsByClassName &&
                            function (n, t) {
                                if ("undefined" != typeof t.getElementsByClassName && h) return t.getElementsByClassName(n);
                            }),
                        (d = []),
                        (o = []),
                        (e.qsa = ot.test(i.querySelectorAll)) &&
                            (a(function (n) {
                                s.appendChild(n).innerHTML = "<a id='" + f + "'></a><select id='" + f + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                                n.querySelectorAll("[msallowcapture^='']").length && o.push("[*^$]=" + r + "*(?:''|\"\")");
                                n.querySelectorAll("[selected]").length || o.push("\\[" + r + "*(?:value|" + gt + ")");
                                n.querySelectorAll("[id~=" + f + "-]").length || o.push("~=");
                                n.querySelectorAll(":checked").length || o.push(":checked");
                                n.querySelectorAll("a#" + f + "+*").length || o.push(".#.+[+~]");
                            }),
                            a(function (n) {
                                n.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                var t = i.createElement("input");
                                t.setAttribute("type", "hidden");
                                n.appendChild(t).setAttribute("name", "D");
                                n.querySelectorAll("[name=d]").length && o.push("name" + r + "*[*^$|!~]?=");
                                2 !== n.querySelectorAll(":enabled").length && o.push(":enabled", ":disabled");
                                s.appendChild(n).disabled = !0;
                                2 !== n.querySelectorAll(":disabled").length && o.push(":enabled", ":disabled");
                                n.querySelectorAll("*,:x");
                                o.push(",.*:");
                            })),
                        (e.matchesSelector = ot.test((ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector))) &&
                            a(function (n) {
                                e.disconnectedMatch = ct.call(n, "*");
                                ct.call(n, "[s!='']:x");
                                d.push("!=", ni);
                            }),
                        (o = o.length && new RegExp(o.join("|"))),
                        (d = d.length && new RegExp(d.join("|"))),
                        (v = ot.test(s.compareDocumentPosition)),
                        (et =
                            v || ot.test(s.contains)
                                ? function (n, t) {
                                      var r = 9 === n.nodeType ? n.documentElement : n,
                                          i = t && t.parentNode;
                                      return n === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(i)));
                                  }
                                : function (n, t) {
                                      if (t) while ((t = t.parentNode)) if (t === n) return !0;
                                      return !1;
                                  }),
                        (dt = v
                            ? function (n, t) {
                                  if (n === t) return (ut = !0), 0;
                                  var r = !n.compareDocumentPosition - !t.compareDocumentPosition;
                                  return (
                                      r ||
                                      (1 & (r = (n.ownerDocument || n) === (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1) || (!e.sortDetached && t.compareDocumentPosition(n) === r)
                                          ? n === i || (n.ownerDocument === c && et(c, n))
                                              ? -1
                                              : t === i || (t.ownerDocument === c && et(c, t))
                                              ? 1
                                              : w
                                              ? nt(w, n) - nt(w, t)
                                              : 0
                                          : 4 & r
                                          ? -1
                                          : 1)
                                  );
                              }
                            : function (n, t) {
                                  if (n === t) return (ut = !0), 0;
                                  var r,
                                      u = 0,
                                      o = n.parentNode,
                                      s = t.parentNode,
                                      f = [n],
                                      e = [t];
                                  if (!o || !s) return n === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
                                  if (o === s) return bi(n, t);
                                  for (r = n; (r = r.parentNode); ) f.unshift(r);
                                  for (r = t; (r = r.parentNode); ) e.unshift(r);
                                  while (f[u] === e[u]) u++;
                                  return u ? bi(f[u], e[u]) : f[u] === c ? -1 : e[u] === c ? 1 : 0;
                              })),
                    i
                );
            }),
            (u.matches = function (n, t) {
                return u(n, null, null, t);
            }),
            (u.matchesSelector = function (n, t) {
                if (((n.ownerDocument || n) !== i && b(n), e.matchesSelector && h && !lt[t + " "] && (!d || !d.test(t)) && (!o || !o.test(t))))
                    try {
                        var r = ct.call(n, t);
                        if (r || e.disconnectedMatch || (n.document && 11 !== n.document.nodeType)) return r;
                    } catch (n) {
                        lt(t, !0);
                    }
                return 0 < u(t, i, null, [n]).length;
            }),
            (u.contains = function (n, t) {
                return (n.ownerDocument || n) !== i && b(n), et(n, t);
            }),
            (u.attr = function (n, r) {
                (n.ownerDocument || n) !== i && b(n);
                var f = t.attrHandle[r.toLowerCase()],
                    u = f && nr.call(t.attrHandle, r.toLowerCase()) ? f(n, r, !h) : void 0;
                return void 0 !== u ? u : e.attributes || !h ? n.getAttribute(r) : (u = n.getAttributeNode(r)) && u.specified ? u.value : null;
            }),
            (u.escape = function (n) {
                return (n + "").replace(yi, pi);
            }),
            (u.error = function (n) {
                throw new Error("Syntax error, unrecognized expression: " + n);
            }),
            (u.uniqueSort = function (n) {
                var r,
                    u = [],
                    t = 0,
                    i = 0;
                if (((ut = !e.detectDuplicates), (w = !e.sortStable && n.slice(0)), n.sort(dt), ut)) {
                    while ((r = n[i++])) r === n[i] && (t = u.push(i));
                    while (t--) n.splice(u[t], 1);
                }
                return (w = null), n;
            }),
            (st = u.getText = function (n) {
                var r,
                    i = "",
                    u = 0,
                    t = n.nodeType;
                if (t) {
                    if (1 === t || 9 === t || 11 === t) {
                        if ("string" == typeof n.textContent) return n.textContent;
                        for (n = n.firstChild; n; n = n.nextSibling) i += st(n);
                    } else if (3 === t || 4 === t) return n.nodeValue;
                } else while ((r = n[u++])) i += st(r);
                return i;
            }),
            ((t = u.selectors = {
                cacheLength: 50,
                createPseudo: l,
                match: vt,
                attrHandle: {},
                find: {},
                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                preFilter: {
                    ATTR: function (n) {
                        return (n[1] = n[1].replace(y, p)), (n[3] = (n[3] || n[4] || n[5] || "").replace(y, p)), "~=" === n[2] && (n[3] = " " + n[3] + " "), n.slice(0, 4);
                    },
                    CHILD: function (n) {
                        return (
                            (n[1] = n[1].toLowerCase()),
                            "nth" === n[1].slice(0, 3) ? (n[3] || u.error(n[0]), (n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * ("even" === n[3] || "odd" === n[3]))), (n[5] = +(n[7] + n[8] || "odd" === n[3]))) : n[3] && u.error(n[0]),
                            n
                        );
                    },
                    PSEUDO: function (n) {
                        var i,
                            t = !n[6] && n[2];
                        return vt.CHILD.test(n[0])
                            ? null
                            : (n[3] ? (n[2] = n[4] || n[5] || "") : t && or.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && ((n[0] = n[0].slice(0, i)), (n[2] = t.slice(0, i))), n.slice(0, 3));
                    },
                },
                filter: {
                    TAG: function (n) {
                        var t = n.replace(y, p).toLowerCase();
                        return "*" === n
                            ? function () {
                                  return !0;
                              }
                            : function (n) {
                                  return n.nodeName && n.nodeName.toLowerCase() === t;
                              };
                    },
                    CLASS: function (n) {
                        var t = hi[n + " "];
                        return (
                            t ||
                            ((t = new RegExp("(^|" + r + ")" + n + "(" + r + "|$)")) &&
                                hi(n, function (n) {
                                    return t.test(("string" == typeof n.className && n.className) || ("undefined" != typeof n.getAttribute && n.getAttribute("class")) || "");
                                }))
                        );
                    },
                    ATTR: function (n, t, i) {
                        return function (r) {
                            var f = u.attr(r, n);
                            return null == f
                                ? "!=" === t
                                : !t ||
                                      ((f += ""),
                                      "=" === t
                                          ? f === i
                                          : "!=" === t
                                          ? f !== i
                                          : "^=" === t
                                          ? i && 0 === f.indexOf(i)
                                          : "*=" === t
                                          ? i && -1 < f.indexOf(i)
                                          : "$=" === t
                                          ? i && f.slice(-i.length) === i
                                          : "~=" === t
                                          ? -1 < (" " + f.replace(rr, " ") + " ").indexOf(i)
                                          : "|=" === t && (f === i || f.slice(0, i.length + 1) === i + "-"));
                        };
                    },
                    CHILD: function (n, t, i, r, u) {
                        var s = "nth" !== n.slice(0, 3),
                            o = "last" !== n.slice(-4),
                            e = "of-type" === t;
                        return 1 === r && 0 === u
                            ? function (n) {
                                  return !!n.parentNode;
                              }
                            : function (t, i, h) {
                                  var p,
                                      d,
                                      y,
                                      c,
                                      a,
                                      w,
                                      b = s !== o ? "nextSibling" : "previousSibling",
                                      k = t.parentNode,
                                      nt = e && t.nodeName.toLowerCase(),
                                      g = !h && !e,
                                      l = !1;
                                  if (k) {
                                      if (s) {
                                          while (b) {
                                              for (c = t; (c = c[b]); ) if (e ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType) return !1;
                                              w = b = "only" === n && !w && "nextSibling";
                                          }
                                          return !0;
                                      }
                                      if (((w = [o ? k.firstChild : k.lastChild]), o && g)) {
                                          for (
                                              l = (a = (p = (d = (y = (c = k)[f] || (c[f] = {}))[c.uniqueID] || (y[c.uniqueID] = {}))[n] || [])[0] === v && p[1]) && p[2], c = a && k.childNodes[a];
                                              (c = (++a && c && c[b]) || (l = a = 0) || w.pop());

                                          )
                                              if (1 === c.nodeType && ++l && c === t) {
                                                  d[n] = [v, a, l];
                                                  break;
                                              }
                                      } else if ((g && (l = a = (p = (d = (y = (c = t)[f] || (c[f] = {}))[c.uniqueID] || (y[c.uniqueID] = {}))[n] || [])[0] === v && p[1]), !1 === l))
                                          while ((c = (++a && c && c[b]) || (l = a = 0) || w.pop()))
                                              if ((e ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType) && ++l && (g && ((d = (y = c[f] || (c[f] = {}))[c.uniqueID] || (y[c.uniqueID] = {}))[n] = [v, l]), c === t)) break;
                                      return (l -= u) === r || (l % r == 0 && 0 <= l / r);
                                  }
                              };
                    },
                    PSEUDO: function (n, i) {
                        var e,
                            r = t.pseudos[n] || t.setFilters[n.toLowerCase()] || u.error("unsupported pseudo: " + n);
                        return r[f]
                            ? r(i)
                            : 1 < r.length
                            ? ((e = [n, n, "", i]),
                              t.setFilters.hasOwnProperty(n.toLowerCase())
                                  ? l(function (n, t) {
                                        for (var e, u = r(n, i), f = u.length; f--; ) n[(e = nt(n, u[f]))] = !(t[e] = u[f]);
                                    })
                                  : function (n) {
                                        return r(n, 0, e);
                                    })
                            : r;
                    },
                },
                pseudos: {
                    not: l(function (n) {
                        var t = [],
                            r = [],
                            i = kt(n.replace(at, "$1"));
                        return i[f]
                            ? l(function (n, t, r, u) {
                                  for (var e, o = i(n, null, u, []), f = n.length; f--; ) (e = o[f]) && (n[f] = !(t[f] = e));
                              })
                            : function (n, u, f) {
                                  return (t[0] = n), i(t, null, f, r), (t[0] = null), !r.pop();
                              };
                    }),
                    has: l(function (n) {
                        return function (t) {
                            return 0 < u(n, t).length;
                        };
                    }),
                    contains: l(function (n) {
                        return (
                            (n = n.replace(y, p)),
                            function (t) {
                                return -1 < (t.textContent || st(t)).indexOf(n);
                            }
                        );
                    }),
                    lang: l(function (n) {
                        return (
                            sr.test(n || "") || u.error("unsupported lang: " + n),
                            (n = n.replace(y, p).toLowerCase()),
                            function (t) {
                                var i;
                                do if ((i = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))) return (i = i.toLowerCase()) === n || 0 === i.indexOf(n + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1;
                            }
                        );
                    }),
                    target: function (t) {
                        var i = n.location && n.location.hash;
                        return i && i.slice(1) === t.id;
                    },
                    root: function (n) {
                        return n === s;
                    },
                    focus: function (n) {
                        return n === i.activeElement && (!i.hasFocus || i.hasFocus()) && !!(n.type || n.href || ~n.tabIndex);
                    },
                    enabled: ki(!1),
                    disabled: ki(!0),
                    checked: function (n) {
                        var t = n.nodeName.toLowerCase();
                        return ("input" === t && !!n.checked) || ("option" === t && !!n.selected);
                    },
                    selected: function (n) {
                        return n.parentNode && n.parentNode.selectedIndex, !0 === n.selected;
                    },
                    empty: function (n) {
                        for (n = n.firstChild; n; n = n.nextSibling) if (n.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (n) {
                        return !t.pseudos.empty(n);
                    },
                    header: function (n) {
                        return lr.test(n.nodeName);
                    },
                    input: function (n) {
                        return cr.test(n.nodeName);
                    },
                    button: function (n) {
                        var t = n.nodeName.toLowerCase();
                        return ("input" === t && "button" === n.type) || "button" === t;
                    },
                    text: function (n) {
                        var t;
                        return "input" === n.nodeName.toLowerCase() && "text" === n.type && (null == (t = n.getAttribute("type")) || "text" === t.toLowerCase());
                    },
                    first: it(function () {
                        return [0];
                    }),
                    last: it(function (n, t) {
                        return [t - 1];
                    }),
                    eq: it(function (n, t, i) {
                        return [i < 0 ? i + t : i];
                    }),
                    even: it(function (n, t) {
                        for (var i = 0; i < t; i += 2) n.push(i);
                        return n;
                    }),
                    odd: it(function (n, t) {
                        for (var i = 1; i < t; i += 2) n.push(i);
                        return n;
                    }),
                    lt: it(function (n, t, i) {
                        for (var r = i < 0 ? i + t : t < i ? t : i; 0 <= --r; ) n.push(r);
                        return n;
                    }),
                    gt: it(function (n, t, i) {
                        for (var r = i < 0 ? i + t : i; ++r < t; ) n.push(r);
                        return n;
                    }),
                },
            }).pseudos.nth = t.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
                t.pseudos[rt] = yr(rt);
            for (rt in { submit: !0, reset: !0 }) t.pseudos[rt] = pr(rt);
            return (
                (di.prototype = t.filters = t.pseudos),
                (t.setFilters = new di()),
                (ft = u.tokenize = function (n, i) {
                    var e,
                        f,
                        s,
                        o,
                        r,
                        h,
                        c,
                        l = ci[n + " "];
                    if (l) return i ? 0 : l.slice(0);
                    for (r = n, h = [], c = t.preFilter; r; ) {
                        for (o in ((e && !(f = ur.exec(r))) || (f && (r = r.slice(f[0].length) || r), h.push((s = []))),
                        (e = !1),
                        (f = fr.exec(r)) && ((e = f.shift()), s.push({ value: e, type: f[0].replace(at, " ") }), (r = r.slice(e.length))),
                        t.filter))
                            (f = vt[o].exec(r)) && (!c[o] || (f = c[o](f))) && ((e = f.shift()), s.push({ value: e, type: o, matches: f }), (r = r.slice(e.length)));
                        if (!e) break;
                    }
                    return i ? r.length : r ? u.error(n) : ci(n, h).slice(0);
                }),
                (kt = u.compile = function (n, r) {
                    var s,
                        c,
                        a,
                        o,
                        y,
                        p,
                        w = [],
                        d = [],
                        e = li[n + " "];
                    if (!e) {
                        for (r || (r = ft(n)), s = r.length; s--; ) (e = ei(r[s]))[f] ? w.push(e) : d.push(e);
                        (e = li(
                            n,
                            ((c = d),
                            (o = 0 < (a = w).length),
                            (y = 0 < c.length),
                            (p = function (n, r, f, e, s) {
                                var l,
                                    nt,
                                    d,
                                    g = 0,
                                    p = "0",
                                    tt = n && [],
                                    w = [],
                                    it = ht,
                                    rt = n || (y && t.find.TAG("*", s)),
                                    ut = (v += null == it ? 1 : Math.random() || 0.1),
                                    ft = rt.length;
                                for (s && (ht = r === i || r || s); p !== ft && null != (l = rt[p]); p++) {
                                    if (y && l) {
                                        for (nt = 0, r || l.ownerDocument === i || (b(l), (f = !h)); (d = c[nt++]); )
                                            if (d(l, r || i, f)) {
                                                e.push(l);
                                                break;
                                            }
                                        s && (v = ut);
                                    }
                                    o && ((l = !d && l) && g--, n && tt.push(l));
                                }
                                if (((g += p), o && p !== g)) {
                                    for (nt = 0; (d = a[nt++]); ) d(tt, w, r, f);
                                    if (n) {
                                        if (0 < g) while (p--) tt[p] || w[p] || (w[p] = tr.call(e));
                                        w = bt(w);
                                    }
                                    k.apply(e, w);
                                    s && !n && 0 < w.length && 1 < g + a.length && u.uniqueSort(e);
                                }
                                return s && ((v = ut), (ht = it)), tt;
                            }),
                            o ? l(p) : p)
                        )).selector = n;
                    }
                    return e;
                }),
                (si = u.select = function (n, i, r, u) {
                    var o,
                        f,
                        e,
                        l,
                        a,
                        c = "function" == typeof n && n,
                        s = !u && ft((n = c.selector || n));
                    if (((r = r || []), 1 === s.length)) {
                        if (2 < (f = s[0] = s[0].slice(0)).length && "ID" === (e = f[0]).type && 9 === i.nodeType && h && t.relative[f[1].type]) {
                            if (!(i = (t.find.ID(e.matches[0].replace(y, p), i) || [])[0])) return r;
                            c && (i = i.parentNode);
                            n = n.slice(f.shift().value.length);
                        }
                        for (o = vt.needsContext.test(n) ? 0 : f.length; o--; ) {
                            if (((e = f[o]), t.relative[(l = e.type)])) break;
                            if ((a = t.find[l]) && (u = a(e.matches[0].replace(y, p), (ti.test(f[0].type) && ri(i.parentNode)) || i))) {
                                if ((f.splice(o, 1), !(n = u.length && pt(f)))) return k.apply(r, u), r;
                                break;
                            }
                        }
                    }
                    return (c || kt(n, s))(u, i, !h, r, !i || (ti.test(n) && ri(i.parentNode)) || i), r;
                }),
                (e.sortStable = f.split("").sort(dt).join("") === f),
                (e.detectDuplicates = !!ut),
                b(),
                (e.sortDetached = a(function (n) {
                    return 1 & n.compareDocumentPosition(i.createElement("fieldset"));
                })),
                a(function (n) {
                    return (n.innerHTML = "<a href='#'></a>"), "#" === n.firstChild.getAttribute("href");
                }) ||
                    ii("type|href|height|width", function (n, t, i) {
                        if (!i) return n.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                    }),
                (e.attributes &&
                    a(function (n) {
                        return (n.innerHTML = "<input/>"), n.firstChild.setAttribute("value", ""), "" === n.firstChild.getAttribute("value");
                    })) ||
                    ii("value", function (n, t, i) {
                        if (!i && "input" === n.nodeName.toLowerCase()) return n.defaultValue;
                    }),
                a(function (n) {
                    return null == n.getAttribute("disabled");
                }) ||
                    ii(gt, function (n, t, i) {
                        var r;
                        if (!i) return !0 === n[t] ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null;
                    }),
                u
            );
        })(n);
        i.find = k;
        i.expr = k.selectors;
        i.expr[":"] = i.expr.pseudos;
        i.uniqueSort = i.unique = k.uniqueSort;
        i.text = k.getText;
        i.isXMLDoc = k.isXML;
        i.contains = k.contains;
        i.escapeSelector = k.escape;
        var rt = function (n, t, r) {
                for (var u = [], f = void 0 !== r; (n = n[t]) && 9 !== n.nodeType; )
                    if (1 === n.nodeType) {
                        if (f && i(n).is(r)) break;
                        u.push(n);
                    }
                return u;
            },
            dr = function (n, t) {
                for (var i = []; n; n = n.nextSibling) 1 === n.nodeType && n !== t && i.push(n);
                return i;
            },
            gr = i.expr.match.needsContext;
        wi = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        i.filter = function (n, t, r) {
            var u = t[0];
            return (
                r && (n = ":not(" + n + ")"),
                1 === t.length && 1 === u.nodeType
                    ? i.find.matchesSelector(u, n)
                        ? [u]
                        : []
                    : i.find.matches(
                          n,
                          i.grep(t, function (n) {
                              return 1 === n.nodeType;
                          })
                      )
            );
        };
        i.fn.extend({
            find: function (n) {
                var t,
                    r,
                    u = this.length,
                    f = this;
                if ("string" != typeof n)
                    return this.pushStack(
                        i(n).filter(function () {
                            for (t = 0; t < u; t++) if (i.contains(f[t], this)) return !0;
                        })
                    );
                for (r = this.pushStack([]), t = 0; t < u; t++) i.find(n, f[t], r);
                return 1 < u ? i.uniqueSort(r) : r;
            },
            filter: function (n) {
                return this.pushStack(bi(this, n || [], !1));
            },
            not: function (n) {
                return this.pushStack(bi(this, n || [], !0));
            },
            is: function (n) {
                return !!bi(this, "string" == typeof n && gr.test(n) ? i(n) : n || [], !1).length;
            },
        });
        tu = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (i.fn.init = function (n, t, r) {
            var e, o;
            if (!n) return this;
            if (((r = r || nu), "string" == typeof n)) {
                if (!(e = "<" === n[0] && ">" === n[n.length - 1] && 3 <= n.length ? [null, n, null] : tu.exec(n)) || (!e[1] && t)) return !t || t.jquery ? (t || r).find(n) : this.constructor(t).find(n);
                if (e[1]) {
                    if (((t = t instanceof i ? t[0] : t), i.merge(this, i.parseHTML(e[1], t && t.nodeType ? t.ownerDocument || t : f, !0)), wi.test(e[1]) && i.isPlainObject(t))) for (e in t) u(this[e]) ? this[e](t[e]) : this.attr(e, t[e]);
                    return this;
                }
                return (o = f.getElementById(e[2])) && ((this[0] = o), (this.length = 1)), this;
            }
            return n.nodeType ? ((this[0] = n), (this.length = 1), this) : u(n) ? (void 0 !== r.ready ? r.ready(n) : n(i)) : i.makeArray(n, this);
        }).prototype = i.fn;
        nu = i(f);
        iu = /^(?:parents|prev(?:Until|All))/;
        ru = { children: !0, contents: !0, next: !0, prev: !0 };
        i.fn.extend({
            has: function (n) {
                var t = i(n, this),
                    r = t.length;
                return this.filter(function () {
                    for (var n = 0; n < r; n++) if (i.contains(this, t[n])) return !0;
                });
            },
            closest: function (n, t) {
                var r,
                    f = 0,
                    o = this.length,
                    u = [],
                    e = "string" != typeof n && i(n);
                if (!gr.test(n))
                    for (; f < o; f++)
                        for (r = this[f]; r && r !== t; r = r.parentNode)
                            if (r.nodeType < 11 && (e ? -1 < e.index(r) : 1 === r.nodeType && i.find.matchesSelector(r, n))) {
                                u.push(r);
                                break;
                            }
                return this.pushStack(1 < u.length ? i.uniqueSort(u) : u);
            },
            index: function (n) {
                return n ? ("string" == typeof n ? ii.call(i(n), this[0]) : ii.call(this, n.jquery ? n[0] : n)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (n, t) {
                return this.pushStack(i.uniqueSort(i.merge(this.get(), i(n, t))));
            },
            addBack: function (n) {
                return this.add(null == n ? this.prevObject : this.prevObject.filter(n));
            },
        });
        i.each(
            {
                parent: function (n) {
                    var t = n.parentNode;
                    return t && 11 !== t.nodeType ? t : null;
                },
                parents: function (n) {
                    return rt(n, "parentNode");
                },
                parentsUntil: function (n, t, i) {
                    return rt(n, "parentNode", i);
                },
                next: function (n) {
                    return uu(n, "nextSibling");
                },
                prev: function (n) {
                    return uu(n, "previousSibling");
                },
                nextAll: function (n) {
                    return rt(n, "nextSibling");
                },
                prevAll: function (n) {
                    return rt(n, "previousSibling");
                },
                nextUntil: function (n, t, i) {
                    return rt(n, "nextSibling", i);
                },
                prevUntil: function (n, t, i) {
                    return rt(n, "previousSibling", i);
                },
                siblings: function (n) {
                    return dr((n.parentNode || {}).firstChild, n);
                },
                children: function (n) {
                    return dr(n.firstChild);
                },
                contents: function (n) {
                    return "undefined" != typeof n.contentDocument ? n.contentDocument : (c(n, "template") && (n = n.content || n), i.merge([], n.childNodes));
                },
            },
            function (n, t) {
                i.fn[n] = function (r, u) {
                    var f = i.map(this, t, r);
                    return "Until" !== n.slice(-5) && (u = r), u && "string" == typeof u && (f = i.filter(u, f)), 1 < this.length && (ru[n] || i.uniqueSort(f), iu.test(n) && f.reverse()), this.pushStack(f);
                };
            }
        );
        l = /[^\x20\t\r\n\f]+/g;
        i.Callbacks = function (n) {
            var a, h;
            n =
                "string" == typeof n
                    ? ((a = n),
                      (h = {}),
                      i.each(a.match(l) || [], function (n, t) {
                          h[t] = !0;
                      }),
                      h)
                    : i.extend({}, n);
            var o,
                r,
                v,
                f,
                t = [],
                s = [],
                e = -1,
                y = function () {
                    for (f = f || n.once, v = o = !0; s.length; e = -1) for (r = s.shift(); ++e < t.length; ) !1 === t[e].apply(r[0], r[1]) && n.stopOnFalse && ((e = t.length), (r = !1));
                    n.memory || (r = !1);
                    o = !1;
                    f && (t = r ? [] : "");
                },
                c = {
                    add: function () {
                        return (
                            t &&
                                (r && !o && ((e = t.length - 1), s.push(r)),
                                (function f(r) {
                                    i.each(r, function (i, r) {
                                        u(r) ? (n.unique && c.has(r)) || t.push(r) : r && r.length && "string" !== it(r) && f(r);
                                    });
                                })(arguments),
                                r && !o && y()),
                            this
                        );
                    },
                    remove: function () {
                        return (
                            i.each(arguments, function (n, r) {
                                for (var u; -1 < (u = i.inArray(r, t, u)); ) t.splice(u, 1), u <= e && e--;
                            }),
                            this
                        );
                    },
                    has: function (n) {
                        return n ? -1 < i.inArray(n, t) : 0 < t.length;
                    },
                    empty: function () {
                        return t && (t = []), this;
                    },
                    disable: function () {
                        return (f = s = []), (t = r = ""), this;
                    },
                    disabled: function () {
                        return !t;
                    },
                    lock: function () {
                        return (f = s = []), r || o || (t = r = ""), this;
                    },
                    locked: function () {
                        return !!f;
                    },
                    fireWith: function (n, t) {
                        return f || ((t = [n, (t = t || []).slice ? t.slice() : t]), s.push(t), o || y()), this;
                    },
                    fire: function () {
                        return c.fireWith(this, arguments), this;
                    },
                    fired: function () {
                        return !!v;
                    },
                };
            return c;
        };
        i.extend({
            Deferred: function (t) {
                var f = [
                        ["notify", "progress", i.Callbacks("memory"), i.Callbacks("memory"), 2],
                        ["resolve", "done", i.Callbacks("once memory"), i.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", i.Callbacks("once memory"), i.Callbacks("once memory"), 1, "rejected"],
                    ],
                    o = "pending",
                    e = {
                        state: function () {
                            return o;
                        },
                        always: function () {
                            return r.done(arguments).fail(arguments), this;
                        },
                        catch: function (n) {
                            return e.then(null, n);
                        },
                        pipe: function () {
                            var n = arguments;
                            return i
                                .Deferred(function (t) {
                                    i.each(f, function (i, f) {
                                        var e = u(n[f[4]]) && n[f[4]];
                                        r[f[1]](function () {
                                            var n = e && e.apply(this, arguments);
                                            n && u(n.promise) ? n.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[f[0] + "With"](this, e ? [n] : arguments);
                                        });
                                    });
                                    n = null;
                                })
                                .promise();
                        },
                        then: function (t, r, e) {
                            function s(t, r, f, e) {
                                return function () {
                                    var h = this,
                                        c = arguments,
                                        l = function () {
                                            var n, i;
                                            if (!(t < o)) {
                                                if ((n = f.apply(h, c)) === r.promise()) throw new TypeError("Thenable self-resolution");
                                                i = n && ("object" == typeof n || "function" == typeof n) && n.then;
                                                u(i)
                                                    ? e
                                                        ? i.call(n, s(o, r, ut, e), s(o, r, fi, e))
                                                        : (o++, i.call(n, s(o, r, ut, e), s(o, r, fi, e), s(o, r, ut, r.notifyWith)))
                                                    : (f !== ut && ((h = void 0), (c = [n])), (e || r.resolveWith)(h, c));
                                            }
                                        },
                                        a = e
                                            ? l
                                            : function () {
                                                  try {
                                                      l();
                                                  } catch (l) {
                                                      i.Deferred.exceptionHook && i.Deferred.exceptionHook(l, a.stackTrace);
                                                      o <= t + 1 && (f !== fi && ((h = void 0), (c = [l])), r.rejectWith(h, c));
                                                  }
                                              };
                                    t ? a() : (i.Deferred.getStackHook && (a.stackTrace = i.Deferred.getStackHook()), n.setTimeout(a));
                                };
                            }
                            var o = 0;
                            return i
                                .Deferred(function (n) {
                                    f[0][3].add(s(0, n, u(e) ? e : ut, n.notifyWith));
                                    f[1][3].add(s(0, n, u(t) ? t : ut));
                                    f[2][3].add(s(0, n, u(r) ? r : fi));
                                })
                                .promise();
                        },
                        promise: function (n) {
                            return null != n ? i.extend(n, e) : e;
                        },
                    },
                    r = {};
                return (
                    i.each(f, function (n, t) {
                        var i = t[2],
                            u = t[5];
                        e[t[1]] = i.add;
                        u &&
                            i.add(
                                function () {
                                    o = u;
                                },
                                f[3 - n][2].disable,
                                f[3 - n][3].disable,
                                f[0][2].lock,
                                f[0][3].lock
                            );
                        i.add(t[3].fire);
                        r[t[0]] = function () {
                            return r[t[0] + "With"](this === r ? void 0 : this, arguments), this;
                        };
                        r[t[0] + "With"] = i.fireWith;
                    }),
                    e.promise(r),
                    t && t.call(r, r),
                    r
                );
            },
            when: function (n) {
                var e = arguments.length,
                    t = e,
                    o = Array(t),
                    f = b.call(arguments),
                    r = i.Deferred(),
                    s = function (n) {
                        return function (t) {
                            o[n] = this;
                            f[n] = 1 < arguments.length ? b.call(arguments) : t;
                            --e || r.resolveWith(o, f);
                        };
                    };
                if (e <= 1 && (fu(n, r.done(s(t)).resolve, r.reject, !e), "pending" === r.state() || u(f[t] && f[t].then))) return r.then();
                while (t--) fu(f[t], s(t), r.reject);
                return r.promise();
            },
        });
        eu = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        i.Deferred.exceptionHook = function (t, i) {
            n.console && n.console.warn && t && eu.test(t.name) && n.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i);
        };
        i.readyException = function (t) {
            n.setTimeout(function () {
                throw t;
            });
        };
        ei = i.Deferred();
        i.fn.ready = function (n) {
            return (
                ei.then(n)["catch"](function (n) {
                    i.readyException(n);
                }),
                this
            );
        };
        i.extend({
            isReady: !1,
            readyWait: 1,
            ready: function (n) {
                (!0 === n ? --i.readyWait : i.isReady) || ((i.isReady = !0) !== n && 0 < --i.readyWait) || ei.resolveWith(f, [i]);
            },
        });
        i.ready.then = ei.then;
        "complete" === f.readyState || ("loading" !== f.readyState && !f.documentElement.doScroll) ? n.setTimeout(i.ready) : (f.addEventListener("DOMContentLoaded", oi), n.addEventListener("load", oi));
        var p = function (n, t, r, f, e, o, s) {
                var h = 0,
                    l = n.length,
                    c = null == r;
                if ("object" === it(r)) for (h in ((e = !0), r)) p(n, t, h, r[h], !0, o, s);
                else if (
                    void 0 !== f &&
                    ((e = !0),
                    u(f) || (s = !0),
                    c &&
                        (s
                            ? (t.call(n, f), (t = null))
                            : ((c = t),
                              (t = function (n, t, r) {
                                  return c.call(i(n), r);
                              }))),
                    t)
                )
                    for (; h < l; h++) t(n[h], r, s ? f : f.call(n[h], h, t(n[h], r)));
                return e ? n : c ? t.call(n) : l ? t(n[0], r) : o;
            },
            se = /^-ms-/,
            he = /-([a-z])/g;
        yt = function (n) {
            return 1 === n.nodeType || 9 === n.nodeType || !+n.nodeType;
        };
        pt.uid = 1;
        pt.prototype = {
            cache: function (n) {
                var t = n[this.expando];
                return t || ((t = {}), yt(n) && (n.nodeType ? (n[this.expando] = t) : Object.defineProperty(n, this.expando, { value: t, configurable: !0 }))), t;
            },
            set: function (n, t, i) {
                var r,
                    u = this.cache(n);
                if ("string" == typeof t) u[y(t)] = i;
                else for (r in t) u[y(r)] = t[r];
                return u;
            },
            get: function (n, t) {
                return void 0 === t ? this.cache(n) : n[this.expando] && n[this.expando][y(t)];
            },
            access: function (n, t, i) {
                return void 0 === t || (t && "string" == typeof t && void 0 === i) ? this.get(n, t) : (this.set(n, t, i), void 0 !== i ? i : t);
            },
            remove: function (n, t) {
                var u,
                    r = n[this.expando];
                if (void 0 !== r) {
                    if (void 0 !== t) for (u = (t = Array.isArray(t) ? t.map(y) : ((t = y(t)) in r) ? [t] : t.match(l) || []).length; u--; ) delete r[t[u]];
                    (void 0 === t || i.isEmptyObject(r)) && (n.nodeType ? (n[this.expando] = void 0) : delete n[this.expando]);
                }
            },
            hasData: function (n) {
                var t = n[this.expando];
                return void 0 !== t && !i.isEmptyObject(t);
            },
        };
        var r = new pt(),
            o = new pt(),
            le = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            ae = /[A-Z]/g;
        i.extend({
            hasData: function (n) {
                return o.hasData(n) || r.hasData(n);
            },
            data: function (n, t, i) {
                return o.access(n, t, i);
            },
            removeData: function (n, t) {
                o.remove(n, t);
            },
            _data: function (n, t, i) {
                return r.access(n, t, i);
            },
            _removeData: function (n, t) {
                r.remove(n, t);
            },
        });
        i.fn.extend({
            data: function (n, t) {
                var f,
                    u,
                    e,
                    i = this[0],
                    s = i && i.attributes;
                if (void 0 === n) {
                    if (this.length && ((e = o.get(i)), 1 === i.nodeType && !r.get(i, "hasDataAttrs"))) {
                        for (f = s.length; f--; ) s[f] && 0 === (u = s[f].name).indexOf("data-") && ((u = y(u.slice(5))), ou(i, u, e[u]));
                        r.set(i, "hasDataAttrs", !0);
                    }
                    return e;
                }
                return "object" == typeof n
                    ? this.each(function () {
                          o.set(this, n);
                      })
                    : p(
                          this,
                          function (t) {
                              var r;
                              if (i && void 0 === t) return void 0 !== (r = o.get(i, n)) ? r : void 0 !== (r = ou(i, n)) ? r : void 0;
                              this.each(function () {
                                  o.set(this, n, t);
                              });
                          },
                          null,
                          t,
                          1 < arguments.length,
                          null,
                          !0
                      );
            },
            removeData: function (n) {
                return this.each(function () {
                    o.remove(this, n);
                });
            },
        });
        i.extend({
            queue: function (n, t, u) {
                var f;
                if (n) return (t = (t || "fx") + "queue"), (f = r.get(n, t)), u && (!f || Array.isArray(u) ? (f = r.access(n, t, i.makeArray(u))) : f.push(u)), f || [];
            },
            dequeue: function (n, t) {
                t = t || "fx";
                var r = i.queue(n, t),
                    e = r.length,
                    u = r.shift(),
                    f = i._queueHooks(n, t);
                "inprogress" === u && ((u = r.shift()), e--);
                u &&
                    ("fx" === t && r.unshift("inprogress"),
                    delete f.stop,
                    u.call(
                        n,
                        function () {
                            i.dequeue(n, t);
                        },
                        f
                    ));
                !e && f && f.empty.fire();
            },
            _queueHooks: function (n, t) {
                var u = t + "queueHooks";
                return (
                    r.get(n, u) ||
                    r.access(n, u, {
                        empty: i.Callbacks("once memory").add(function () {
                            r.remove(n, [t + "queue", u]);
                        }),
                    })
                );
            },
        });
        i.fn.extend({
            queue: function (n, t) {
                var r = 2;
                return (
                    "string" != typeof n && ((t = n), (n = "fx"), r--),
                    arguments.length < r
                        ? i.queue(this[0], n)
                        : void 0 === t
                        ? this
                        : this.each(function () {
                              var r = i.queue(this, n, t);
                              i._queueHooks(this, n);
                              "fx" === n && "inprogress" !== r[0] && i.dequeue(this, n);
                          })
                );
            },
            dequeue: function (n) {
                return this.each(function () {
                    i.dequeue(this, n);
                });
            },
            clearQueue: function (n) {
                return this.queue(n || "fx", []);
            },
            promise: function (n, t) {
                var u,
                    e = 1,
                    o = i.Deferred(),
                    f = this,
                    s = this.length,
                    h = function () {
                        --e || o.resolveWith(f, [f]);
                    };
                for ("string" != typeof n && ((t = n), (n = void 0)), n = n || "fx"; s--; ) (u = r.get(f[s], n + "queueHooks")) && u.empty && (e++, u.empty.add(h));
                return h(), o.promise(t);
            },
        });
        var su = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            wt = new RegExp("^(?:([+-])=|)(" + su + ")([a-z%]*)$", "i"),
            w = ["Top", "Right", "Bottom", "Left"],
            bt = f.documentElement,
            ft = function (n) {
                return i.contains(n.ownerDocument, n);
            },
            ve = { composed: !0 };
        bt.attachShadow &&
            (ft = function (n) {
                return i.contains(n.ownerDocument, n) || n.getRootNode(ve) === n.ownerDocument;
            });
        kt = function (n, t) {
            return "none" === (n = t || n).style.display || ("" === n.style.display && ft(n) && "none" === i.css(n, "display"));
        };
        ki = function (n, t, i, r) {
            var f,
                u,
                e = {};
            for (u in t) (e[u] = n.style[u]), (n.style[u] = t[u]);
            for (u in ((f = i.apply(n, r || [])), t)) n.style[u] = e[u];
            return f;
        };
        di = {};
        i.fn.extend({
            show: function () {
                return et(this, !0);
            },
            hide: function () {
                return et(this);
            },
            toggle: function (n) {
                return "boolean" == typeof n
                    ? n
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          kt(this) ? i(this).show() : i(this).hide();
                      });
            },
        });
        var dt = /^(?:checkbox|radio)$/i,
            cu = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            lu = /^$|^module$|\/(?:java|ecma)script/i,
            h = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""],
            };
        h.optgroup = h.option;
        h.tbody = h.tfoot = h.colgroup = h.caption = h.thead;
        h.th = h.td;
        au = /<|&#?\w+;/;
        gt = f.createDocumentFragment().appendChild(f.createElement("div"));
        (si = f.createElement("input")).setAttribute("type", "radio");
        si.setAttribute("checked", "checked");
        si.setAttribute("name", "t");
        gt.appendChild(si);
        e.checkClone = gt.cloneNode(!0).cloneNode(!0).lastChild.checked;
        gt.innerHTML = "<textarea>x</textarea>";
        e.noCloneChecked = !!gt.cloneNode(!0).lastChild.defaultValue;
        var ye = /^key/,
            pe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            yu = /^([^.]*)(?:\.(.+)|)/;
        i.event = {
            global: {},
            add: function (n, t, u, f, e) {
                var p,
                    v,
                    k,
                    y,
                    w,
                    h,
                    s,
                    c,
                    o,
                    b,
                    d,
                    a = r.get(n);
                if (a)
                    for (
                        u.handler && ((u = (p = u).handler), (e = p.selector)),
                            e && i.find.matchesSelector(bt, e),
                            u.guid || (u.guid = i.guid++),
                            (y = a.events) || (y = a.events = {}),
                            (v = a.handle) ||
                                (v = a.handle = function (t) {
                                    if ("undefined" != typeof i && i.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments);
                                }),
                            w = (t = (t || "").match(l) || [""]).length;
                        w--;

                    )
                        (o = d = (k = yu.exec(t[w]) || [])[1]),
                            (b = (k[2] || "").split(".").sort()),
                            o &&
                                ((s = i.event.special[o] || {}),
                                (o = (e ? s.delegateType : s.bindType) || o),
                                (s = i.event.special[o] || {}),
                                (h = i.extend({ type: o, origType: d, data: f, handler: u, guid: u.guid, selector: e, needsContext: e && i.expr.match.needsContext.test(e), namespace: b.join(".") }, p)),
                                (c = y[o]) || (((c = y[o] = []).delegateCount = 0), (s.setup && !1 !== s.setup.call(n, f, b, v)) || (n.addEventListener && n.addEventListener(o, v))),
                                s.add && (s.add.call(n, h), h.handler.guid || (h.handler.guid = u.guid)),
                                e ? c.splice(c.delegateCount++, 0, h) : c.push(h),
                                (i.event.global[o] = !0));
            },
            remove: function (n, t, u, f, e) {
                var y,
                    k,
                    c,
                    v,
                    p,
                    s,
                    h,
                    a,
                    o,
                    b,
                    d,
                    w = r.hasData(n) && r.get(n);
                if (w && (v = w.events)) {
                    for (p = (t = (t || "").match(l) || [""]).length; p--; )
                        if (((o = d = (c = yu.exec(t[p]) || [])[1]), (b = (c[2] || "").split(".").sort()), o)) {
                            for (h = i.event.special[o] || {}, a = v[(o = (f ? h.delegateType : h.bindType) || o)] || [], c = c[2] && new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)"), k = y = a.length; y--; )
                                (s = a[y]),
                                    (!e && d !== s.origType) ||
                                        (u && u.guid !== s.guid) ||
                                        (c && !c.test(s.namespace)) ||
                                        (f && f !== s.selector && ("**" !== f || !s.selector)) ||
                                        (a.splice(y, 1), s.selector && a.delegateCount--, h.remove && h.remove.call(n, s));
                            k && !a.length && ((h.teardown && !1 !== h.teardown.call(n, b, w.handle)) || i.removeEvent(n, o, w.handle), delete v[o]);
                        } else for (o in v) i.event.remove(n, o + t[p], u, f, !0);
                    i.isEmptyObject(v) && r.remove(n, "handle events");
                }
            },
            dispatch: function (n) {
                var u,
                    h,
                    c,
                    e,
                    f,
                    l,
                    t = i.event.fix(n),
                    s = new Array(arguments.length),
                    a = (r.get(this, "events") || {})[t.type] || [],
                    o = i.event.special[t.type] || {};
                for (s[0] = t, u = 1; u < arguments.length; u++) s[u] = arguments[u];
                if (((t.delegateTarget = this), !o.preDispatch || !1 !== o.preDispatch.call(this, t))) {
                    for (l = i.event.handlers.call(this, t, a), u = 0; (e = l[u++]) && !t.isPropagationStopped(); )
                        for (t.currentTarget = e.elem, h = 0; (f = e.handlers[h++]) && !t.isImmediatePropagationStopped(); )
                            (t.rnamespace && !1 !== f.namespace && !t.rnamespace.test(f.namespace)) ||
                                ((t.handleObj = f), (t.data = f.data), void 0 !== (c = ((i.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, s)) && !1 === (t.result = c) && (t.preventDefault(), t.stopPropagation()));
                    return o.postDispatch && o.postDispatch.call(this, t), t.result;
                }
            },
            handlers: function (n, t) {
                var f,
                    h,
                    u,
                    e,
                    o,
                    c = [],
                    s = t.delegateCount,
                    r = n.target;
                if (s && r.nodeType && !("click" === n.type && 1 <= n.button))
                    for (; r !== this; r = r.parentNode || this)
                        if (1 === r.nodeType && ("click" !== n.type || !0 !== r.disabled)) {
                            for (e = [], o = {}, f = 0; f < s; f++) void 0 === o[(u = (h = t[f]).selector + " ")] && (o[u] = h.needsContext ? -1 < i(u, this).index(r) : i.find(u, this, null, [r]).length), o[u] && e.push(h);
                            e.length && c.push({ elem: r, handlers: e });
                        }
                return (r = this), s < t.length && c.push({ elem: r, handlers: t.slice(s) }), c;
            },
            addProp: function (n, t) {
                Object.defineProperty(i.Event.prototype, n, {
                    enumerable: !0,
                    configurable: !0,
                    get: u(t)
                        ? function () {
                              if (this.originalEvent) return t(this.originalEvent);
                          }
                        : function () {
                              if (this.originalEvent) return this.originalEvent[n];
                          },
                    set: function (t) {
                        Object.defineProperty(this, n, { enumerable: !0, configurable: !0, writable: !0, value: t });
                    },
                });
            },
            fix: function (n) {
                return n[i.expando] ? n : new i.Event(n);
            },
            special: {
                load: { noBubble: !0 },
                click: {
                    setup: function (n) {
                        var t = this || n;
                        return dt.test(t.type) && t.click && c(t, "input") && void 0 === r.get(t, "click") && hi(t, "click", ot), !1;
                    },
                    trigger: function (n) {
                        var t = this || n;
                        return dt.test(t.type) && t.click && c(t, "input") && void 0 === r.get(t, "click") && hi(t, "click"), !0;
                    },
                    _default: function (n) {
                        var t = n.target;
                        return (dt.test(t.type) && t.click && c(t, "input") && r.get(t, "click")) || c(t, "a");
                    },
                },
                beforeunload: {
                    postDispatch: function (n) {
                        void 0 !== n.result && n.originalEvent && (n.originalEvent.returnValue = n.result);
                    },
                },
            },
        };
        i.removeEvent = function (n, t, i) {
            n.removeEventListener && n.removeEventListener(t, i);
        };
        i.Event = function (n, t) {
            if (!(this instanceof i.Event)) return new i.Event(n, t);
            n && n.type
                ? ((this.originalEvent = n),
                  (this.type = n.type),
                  (this.isDefaultPrevented = n.defaultPrevented || (void 0 === n.defaultPrevented && !1 === n.returnValue) ? ot : st),
                  (this.target = n.target && 3 === n.target.nodeType ? n.target.parentNode : n.target),
                  (this.currentTarget = n.currentTarget),
                  (this.relatedTarget = n.relatedTarget))
                : (this.type = n);
            t && i.extend(this, t);
            this.timeStamp = (n && n.timeStamp) || Date.now();
            this[i.expando] = !0;
        };
        i.Event.prototype = {
            constructor: i.Event,
            isDefaultPrevented: st,
            isPropagationStopped: st,
            isImmediatePropagationStopped: st,
            isSimulated: !1,
            preventDefault: function () {
                var n = this.originalEvent;
                this.isDefaultPrevented = ot;
                n && !this.isSimulated && n.preventDefault();
            },
            stopPropagation: function () {
                var n = this.originalEvent;
                this.isPropagationStopped = ot;
                n && !this.isSimulated && n.stopPropagation();
            },
            stopImmediatePropagation: function () {
                var n = this.originalEvent;
                this.isImmediatePropagationStopped = ot;
                n && !this.isSimulated && n.stopImmediatePropagation();
                this.stopPropagation();
            },
        };
        i.each(
            {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function (n) {
                    var t = n.button;
                    return null == n.which && ye.test(n.type) ? (null != n.charCode ? n.charCode : n.keyCode) : !n.which && void 0 !== t && pe.test(n.type) ? (1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0) : n.which;
                },
            },
            i.event.addProp
        );
        i.each({ focus: "focusin", blur: "focusout" }, function (n, t) {
            i.event.special[n] = {
                setup: function () {
                    return hi(this, n, we), !1;
                },
                trigger: function () {
                    return hi(this, n), !0;
                },
                delegateType: t,
            };
        });
        i.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (n, t) {
            i.event.special[n] = {
                delegateType: t,
                bindType: t,
                handle: function (n) {
                    var u,
                        r = n.relatedTarget,
                        f = n.handleObj;
                    return (r && (r === this || i.contains(this, r))) || ((n.type = f.origType), (u = f.handler.apply(this, arguments)), (n.type = t)), u;
                },
            };
        });
        i.fn.extend({
            on: function (n, t, i, r) {
                return nr(this, n, t, i, r);
            },
            one: function (n, t, i, r) {
                return nr(this, n, t, i, r, 1);
            },
            off: function (n, t, r) {
                var u, f;
                if (n && n.preventDefault && n.handleObj) return (u = n.handleObj), i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
                if ("object" == typeof n) {
                    for (f in n) this.off(f, t, n[f]);
                    return this;
                }
                return (
                    (!1 !== t && "function" != typeof t) || ((r = t), (t = void 0)),
                    !1 === r && (r = st),
                    this.each(function () {
                        i.event.remove(this, n, r, t);
                    })
                );
            },
        });
        var be = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            ke = /<script|<style|<link/i,
            de = /checked\s*(?:[^=]|=\s*.checked.)/i,
            ge = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        i.extend({
            htmlPrefilter: function (n) {
                return n.replace(be, "<$1></$2>");
            },
            clone: function (n, t, r) {
                var u,
                    c,
                    o,
                    f,
                    l,
                    a,
                    v,
                    h = n.cloneNode(!0),
                    y = ft(n);
                if (!(e.noCloneChecked || (1 !== n.nodeType && 11 !== n.nodeType) || i.isXMLDoc(n)))
                    for (f = s(h), u = 0, c = (o = s(n)).length; u < c; u++)
                        (l = o[u]), (a = f[u]), void 0, "input" === (v = a.nodeName.toLowerCase()) && dt.test(l.type) ? (a.checked = l.checked) : ("input" !== v && "textarea" !== v) || (a.defaultValue = l.defaultValue);
                if (t)
                    if (r) for (o = o || s(n), f = f || s(h), u = 0, c = o.length; u < c; u++) wu(o[u], f[u]);
                    else wu(n, h);
                return 0 < (f = s(h, "script")).length && gi(f, !y && s(n, "script")), h;
            },
            cleanData: function (n) {
                for (var u, t, f, s = i.event.special, e = 0; void 0 !== (t = n[e]); e++)
                    if (yt(t)) {
                        if ((u = t[r.expando])) {
                            if (u.events) for (f in u.events) s[f] ? i.event.remove(t, f) : i.removeEvent(t, f, u.handle);
                            t[r.expando] = void 0;
                        }
                        t[o.expando] && (t[o.expando] = void 0);
                    }
            },
        });
        i.fn.extend({
            detach: function (n) {
                return bu(this, n, !0);
            },
            remove: function (n) {
                return bu(this, n);
            },
            text: function (n) {
                return p(
                    this,
                    function (n) {
                        return void 0 === n
                            ? i.text(this)
                            : this.empty().each(function () {
                                  (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = n);
                              });
                    },
                    null,
                    n,
                    arguments.length
                );
            },
            append: function () {
                return ht(this, arguments, function (n) {
                    (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || pu(this, n).appendChild(n);
                });
            },
            prepend: function () {
                return ht(this, arguments, function (n) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = pu(this, n);
                        t.insertBefore(n, t.firstChild);
                    }
                });
            },
            before: function () {
                return ht(this, arguments, function (n) {
                    this.parentNode && this.parentNode.insertBefore(n, this);
                });
            },
            after: function () {
                return ht(this, arguments, function (n) {
                    this.parentNode && this.parentNode.insertBefore(n, this.nextSibling);
                });
            },
            empty: function () {
                for (var n, t = 0; null != (n = this[t]); t++) 1 === n.nodeType && (i.cleanData(s(n, !1)), (n.textContent = ""));
                return this;
            },
            clone: function (n, t) {
                return (
                    (n = null != n && n),
                    (t = null == t ? n : t),
                    this.map(function () {
                        return i.clone(this, n, t);
                    })
                );
            },
            html: function (n) {
                return p(
                    this,
                    function (n) {
                        var t = this[0] || {},
                            r = 0,
                            u = this.length;
                        if (void 0 === n && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof n && !ke.test(n) && !h[(cu.exec(n) || ["", ""])[1].toLowerCase()]) {
                            n = i.htmlPrefilter(n);
                            try {
                                for (; r < u; r++) 1 === (t = this[r] || {}).nodeType && (i.cleanData(s(t, !1)), (t.innerHTML = n));
                                t = 0;
                            } catch (n) {}
                        }
                        t && this.empty().append(n);
                    },
                    null,
                    n,
                    arguments.length
                );
            },
            replaceWith: function () {
                var n = [];
                return ht(
                    this,
                    arguments,
                    function (t) {
                        var r = this.parentNode;
                        i.inArray(this, n) < 0 && (i.cleanData(s(this)), r && r.replaceChild(t, this));
                    },
                    n
                );
            },
        });
        i.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (n, t) {
            i.fn[n] = function (n) {
                for (var u, f = [], e = i(n), o = e.length - 1, r = 0; r <= o; r++) (u = r === o ? this : this.clone(!0)), i(e[r])[t](u), yi.apply(f, u.get());
                return this.pushStack(f);
            };
        });
        var tr = new RegExp("^(" + su + ")(?!px)[a-z%]+$", "i"),
            ci = function (t) {
                var i = t.ownerDocument.defaultView;
                return (i && i.opener) || (i = n), i.getComputedStyle(t);
            },
            io = new RegExp(w.join("|"), "i");
        !(function () {
            function r() {
                if (t) {
                    o.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
                    t.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
                    bt.appendChild(o).appendChild(t);
                    var i = n.getComputedStyle(t);
                    s = "1%" !== i.top;
                    a = 12 === u(i.marginLeft);
                    t.style.right = "60%";
                    l = 36 === u(i.right);
                    h = 36 === u(i.width);
                    t.style.position = "absolute";
                    c = 12 === u(t.offsetWidth / 3);
                    bt.removeChild(o);
                    t = null;
                }
            }
            function u(n) {
                return Math.round(parseFloat(n));
            }
            var s,
                h,
                c,
                l,
                a,
                o = f.createElement("div"),
                t = f.createElement("div");
            t.style &&
                ((t.style.backgroundClip = "content-box"),
                (t.cloneNode(!0).style.backgroundClip = ""),
                (e.clearCloneStyle = "content-box" === t.style.backgroundClip),
                i.extend(e, {
                    boxSizingReliable: function () {
                        return r(), h;
                    },
                    pixelBoxStyles: function () {
                        return r(), l;
                    },
                    pixelPosition: function () {
                        return r(), s;
                    },
                    reliableMarginLeft: function () {
                        return r(), a;
                    },
                    scrollboxSize: function () {
                        return r(), c;
                    },
                }));
        })();
        var du = ["Webkit", "Moz", "ms"],
            gu = f.createElement("div").style,
            nf = {};
        var ro = /^(none|table(?!-c[ea]).+)/,
            tf = /^--/,
            uo = { position: "absolute", visibility: "hidden", display: "block" },
            rf = { letterSpacing: "0", fontWeight: "400" };
        i.extend({
            cssHooks: {
                opacity: {
                    get: function (n, t) {
                        if (t) {
                            var i = ni(n, "opacity");
                            return "" === i ? "1" : i;
                        }
                    },
                },
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
            },
            cssProps: {},
            style: function (n, t, r, u) {
                if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
                    var f,
                        h,
                        o,
                        c = y(t),
                        l = tf.test(t),
                        s = n.style;
                    if ((l || (t = ir(c)), (o = i.cssHooks[t] || i.cssHooks[c]), void 0 === r)) return o && "get" in o && void 0 !== (f = o.get(n, !1, u)) ? f : s[t];
                    "string" == (h = typeof r) && (f = wt.exec(r)) && f[1] && ((r = hu(n, t, f)), (h = "number"));
                    null != r &&
                        r == r &&
                        ("number" !== h || l || (r += (f && f[3]) || (i.cssNumber[c] ? "" : "px")),
                        e.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (s[t] = "inherit"),
                        (o && "set" in o && void 0 === (r = o.set(n, r, u))) || (l ? s.setProperty(t, r) : (s[t] = r)));
                }
            },
            css: function (n, t, r, u) {
                var f,
                    e,
                    o,
                    s = y(t);
                return (
                    tf.test(t) || (t = ir(s)),
                    (o = i.cssHooks[t] || i.cssHooks[s]) && "get" in o && (f = o.get(n, !0, r)),
                    void 0 === f && (f = ni(n, t, u)),
                    "normal" === f && t in rf && (f = rf[t]),
                    "" === r || r ? ((e = parseFloat(f)), !0 === r || isFinite(e) ? e || 0 : f) : f
                );
            },
        });
        i.each(["height", "width"], function (n, t) {
            i.cssHooks[t] = {
                get: function (n, r, u) {
                    if (r)
                        return !ro.test(i.css(n, "display")) || (n.getClientRects().length && n.getBoundingClientRect().width)
                            ? ff(n, t, u)
                            : ki(n, uo, function () {
                                  return ff(n, t, u);
                              });
                },
                set: function (n, r, u) {
                    var s,
                        f = ci(n),
                        h = !e.scrollboxSize() && "absolute" === f.position,
                        c = (h || u) && "border-box" === i.css(n, "boxSizing", !1, f),
                        o = u ? rr(n, t, u, c, f) : 0;
                    return (
                        c && h && (o -= Math.ceil(n["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(f[t]) - rr(n, t, "border", !1, f) - 0.5)),
                        o && (s = wt.exec(r)) && "px" !== (s[3] || "px") && ((n.style[t] = r), (r = i.css(n, t))),
                        uf(0, r, o)
                    );
                },
            };
        });
        i.cssHooks.marginLeft = ku(e.reliableMarginLeft, function (n, t) {
            if (t)
                return (
                    (parseFloat(ni(n, "marginLeft")) ||
                        n.getBoundingClientRect().left -
                            ki(n, { marginLeft: 0 }, function () {
                                return n.getBoundingClientRect().left;
                            })) + "px"
                );
        });
        i.each({ margin: "", padding: "", border: "Width" }, function (n, t) {
            i.cssHooks[n + t] = {
                expand: function (i) {
                    for (var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; r < 4; r++) f[n + w[r] + t] = u[r] || u[r - 2] || u[0];
                    return f;
                },
            };
            "margin" !== n && (i.cssHooks[n + t].set = uf);
        });
        i.fn.extend({
            css: function (n, t) {
                return p(
                    this,
                    function (n, t, r) {
                        var f,
                            e,
                            o = {},
                            u = 0;
                        if (Array.isArray(t)) {
                            for (f = ci(n), e = t.length; u < e; u++) o[t[u]] = i.css(n, t[u], !1, f);
                            return o;
                        }
                        return void 0 !== r ? i.style(n, t, r) : i.css(n, t);
                    },
                    n,
                    t,
                    1 < arguments.length
                );
            },
        });
        ((i.Tween = a).prototype = {
            constructor: a,
            init: function (n, t, r, u, f, e) {
                this.elem = n;
                this.prop = r;
                this.easing = f || i.easing._default;
                this.options = t;
                this.start = this.now = this.cur();
                this.end = u;
                this.unit = e || (i.cssNumber[r] ? "" : "px");
            },
            cur: function () {
                var n = a.propHooks[this.prop];
                return n && n.get ? n.get(this) : a.propHooks._default.get(this);
            },
            run: function (n) {
                var t,
                    r = a.propHooks[this.prop];
                return (
                    (this.pos = this.options.duration ? (t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration)) : (t = n)),
                    (this.now = (this.end - this.start) * t + this.start),
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    r && r.set ? r.set(this) : a.propHooks._default.set(this),
                    this
                );
            },
        }).init.prototype = a.prototype;
        (a.propHooks = {
            _default: {
                get: function (n) {
                    var t;
                    return 1 !== n.elem.nodeType || (null != n.elem[n.prop] && null == n.elem.style[n.prop]) ? n.elem[n.prop] : (t = i.css(n.elem, n.prop, "")) && "auto" !== t ? t : 0;
                },
                set: function (n) {
                    i.fx.step[n.prop] ? i.fx.step[n.prop](n) : 1 !== n.elem.nodeType || (!i.cssHooks[n.prop] && null == n.elem.style[ir(n.prop)]) ? (n.elem[n.prop] = n.now) : i.style(n.elem, n.prop, n.now + n.unit);
                },
            },
        }).scrollTop = a.propHooks.scrollLeft = {
            set: function (n) {
                n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now);
            },
        };
        i.easing = {
            linear: function (n) {
                return n;
            },
            swing: function (n) {
                return 0.5 - Math.cos(n * Math.PI) / 2;
            },
            _default: "swing",
        };
        i.fx = a.prototype.init;
        i.fx.step = {};
        of = /^(?:toggle|show|hide)$/;
        sf = /queueHooks$/;
        i.Animation = i.extend(v, {
            tweeners: {
                "*": [
                    function (n, t) {
                        var i = this.createTween(n, t);
                        return hu(i.elem, n, wt.exec(t), i), i;
                    },
                ],
            },
            tweener: function (n, t) {
                u(n) ? ((t = n), (n = ["*"])) : (n = n.match(l));
                for (var i, r = 0, f = n.length; r < f; r++) (i = n[r]), (v.tweeners[i] = v.tweeners[i] || []), v.tweeners[i].unshift(t);
            },
            prefilters: [
                function (n, t, u) {
                    var f,
                        y,
                        w,
                        c,
                        b,
                        h,
                        o,
                        l,
                        k = "width" in t || "height" in t,
                        v = this,
                        p = {},
                        s = n.style,
                        a = n.nodeType && kt(n),
                        e = r.get(n, "fxshow");
                    for (f in (u.queue ||
                        (null == (c = i._queueHooks(n, "fx")).unqueued &&
                            ((c.unqueued = 0),
                            (b = c.empty.fire),
                            (c.empty.fire = function () {
                                c.unqueued || b();
                            })),
                        c.unqueued++,
                        v.always(function () {
                            v.always(function () {
                                c.unqueued--;
                                i.queue(n, "fx").length || c.empty.fire();
                            });
                        })),
                    t))
                        if (((y = t[f]), of.test(y))) {
                            if ((delete t[f], (w = w || "toggle" === y), y === (a ? "hide" : "show"))) {
                                if ("show" !== y || !e || void 0 === e[f]) continue;
                                a = !0;
                            }
                            p[f] = (e && e[f]) || i.style(n, f);
                        }
                    if ((h = !i.isEmptyObject(t)) || !i.isEmptyObject(p))
                        for (f in (k &&
                            1 === n.nodeType &&
                            ((u.overflow = [s.overflow, s.overflowX, s.overflowY]),
                            null == (o = e && e.display) && (o = r.get(n, "display")),
                            "none" === (l = i.css(n, "display")) && (o ? (l = o) : (et([n], !0), (o = n.style.display || o), (l = i.css(n, "display")), et([n]))),
                            ("inline" === l || ("inline-block" === l && null != o)) &&
                                "none" === i.css(n, "float") &&
                                (h ||
                                    (v.done(function () {
                                        s.display = o;
                                    }),
                                    null == o && ((l = s.display), (o = "none" === l ? "" : l))),
                                (s.display = "inline-block"))),
                        u.overflow &&
                            ((s.overflow = "hidden"),
                            v.always(function () {
                                s.overflow = u.overflow[0];
                                s.overflowX = u.overflow[1];
                                s.overflowY = u.overflow[2];
                            })),
                        (h = !1),
                        p))
                            h ||
                                (e ? "hidden" in e && (a = e.hidden) : (e = r.access(n, "fxshow", { display: o })),
                                w && (e.hidden = !a),
                                a && et([n], !0),
                                v.done(function () {
                                    for (f in (a || et([n]), r.remove(n, "fxshow"), p)) i.style(n, f, p[f]);
                                })),
                                (h = cf(a ? e[f] : 0, f, v)),
                                f in e || ((e[f] = h.start), a && ((h.end = h.start), (h.start = 0)));
                },
            ],
            prefilter: function (n, t) {
                t ? v.prefilters.unshift(n) : v.prefilters.push(n);
            },
        });
        i.speed = function (n, t, r) {
            var f = n && "object" == typeof n ? i.extend({}, n) : { complete: r || (!r && t) || (u(n) && n), duration: n, easing: (r && t) || (t && !u(t) && t) };
            return (
                i.fx.off ? (f.duration = 0) : "number" != typeof f.duration && (f.duration = f.duration in i.fx.speeds ? i.fx.speeds[f.duration] : i.fx.speeds._default),
                (null != f.queue && !0 !== f.queue) || (f.queue = "fx"),
                (f.old = f.complete),
                (f.complete = function () {
                    u(f.old) && f.old.call(this);
                    f.queue && i.dequeue(this, f.queue);
                }),
                f
            );
        };
        i.fn.extend({
            fadeTo: function (n, t, i, r) {
                return this.filter(kt).css("opacity", 0).show().end().animate({ opacity: t }, n, i, r);
            },
            animate: function (n, t, u, f) {
                var s = i.isEmptyObject(n),
                    o = i.speed(t, u, f),
                    e = function () {
                        var t = v(this, i.extend({}, n), o);
                        (s || r.get(this, "finish")) && t.stop(!0);
                    };
                return (e.finish = e), s || !1 === o.queue ? this.each(e) : this.queue(o.queue, e);
            },
            stop: function (n, t, u) {
                var f = function (n) {
                    var t = n.stop;
                    delete n.stop;
                    t(u);
                };
                return (
                    "string" != typeof n && ((u = t), (t = n), (n = void 0)),
                    t && !1 !== n && this.queue(n || "fx", []),
                    this.each(function () {
                        var s = !0,
                            t = null != n && n + "queueHooks",
                            o = i.timers,
                            e = r.get(this);
                        if (t) e[t] && e[t].stop && f(e[t]);
                        else for (t in e) e[t] && e[t].stop && sf.test(t) && f(e[t]);
                        for (t = o.length; t--; ) o[t].elem !== this || (null != n && o[t].queue !== n) || (o[t].anim.stop(u), (s = !1), o.splice(t, 1));
                        (!s && u) || i.dequeue(this, n);
                    })
                );
            },
            finish: function (n) {
                return (
                    !1 !== n && (n = n || "fx"),
                    this.each(function () {
                        var t,
                            e = r.get(this),
                            u = e[n + "queue"],
                            o = e[n + "queueHooks"],
                            f = i.timers,
                            s = u ? u.length : 0;
                        for (e.finish = !0, i.queue(this, n, []), o && o.stop && o.stop.call(this, !0), t = f.length; t--; ) f[t].elem === this && f[t].queue === n && (f[t].anim.stop(!0), f.splice(t, 1));
                        for (t = 0; t < s; t++) u[t] && u[t].finish && u[t].finish.call(this);
                        delete e.finish;
                    })
                );
            },
        });
        i.each(["toggle", "show", "hide"], function (n, t) {
            var r = i.fn[t];
            i.fn[t] = function (n, i, u) {
                return null == n || "boolean" == typeof n ? r.apply(this, arguments) : this.animate(ai(t, !0), n, i, u);
            };
        });
        i.each({ slideDown: ai("show"), slideUp: ai("hide"), slideToggle: ai("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (n, t) {
            i.fn[n] = function (n, i, r) {
                return this.animate(t, n, i, r);
            };
        });
        i.timers = [];
        i.fx.tick = function () {
            var r,
                n = 0,
                t = i.timers;
            for (ct = Date.now(); n < t.length; n++) (r = t[n])() || t[n] !== r || t.splice(n--, 1);
            t.length || i.fx.stop();
            ct = void 0;
        };
        i.fx.timer = function (n) {
            i.timers.push(n);
            i.fx.start();
        };
        i.fx.interval = 13;
        i.fx.start = function () {
            li || ((li = !0), ur());
        };
        i.fx.stop = function () {
            li = null;
        };
        i.fx.speeds = { slow: 600, fast: 200, _default: 400 };
        i.fn.delay = function (t, r) {
            return (
                (t = (i.fx && i.fx.speeds[t]) || t),
                (r = r || "fx"),
                this.queue(r, function (i, r) {
                    var u = n.setTimeout(i, t);
                    r.stop = function () {
                        n.clearTimeout(u);
                    };
                })
            );
        };
        lt = f.createElement("input");
        ef = f.createElement("select").appendChild(f.createElement("option"));
        lt.type = "checkbox";
        e.checkOn = "" !== lt.value;
        e.optSelected = ef.selected;
        (lt = f.createElement("input")).value = "t";
        lt.type = "radio";
        e.radioValue = "t" === lt.value;
        at = i.expr.attrHandle;
        i.fn.extend({
            attr: function (n, t) {
                return p(this, i.attr, n, t, 1 < arguments.length);
            },
            removeAttr: function (n) {
                return this.each(function () {
                    i.removeAttr(this, n);
                });
            },
        });
        i.extend({
            attr: function (n, t, r) {
                var f,
                    u,
                    e = n.nodeType;
                if (3 !== e && 8 !== e && 2 !== e)
                    return "undefined" == typeof n.getAttribute
                        ? i.prop(n, t, r)
                        : ((1 === e && i.isXMLDoc(n)) || (u = i.attrHooks[t.toLowerCase()] || (i.expr.match.bool.test(t) ? lf : void 0)),
                          void 0 !== r
                              ? null === r
                                  ? void i.removeAttr(n, t)
                                  : u && "set" in u && void 0 !== (f = u.set(n, r, t))
                                  ? f
                                  : (n.setAttribute(t, r + ""), r)
                              : u && "get" in u && null !== (f = u.get(n, t))
                              ? f
                              : null == (f = i.find.attr(n, t))
                              ? void 0
                              : f);
            },
            attrHooks: {
                type: {
                    set: function (n, t) {
                        if (!e.radioValue && "radio" === t && c(n, "input")) {
                            var i = n.value;
                            return n.setAttribute("type", t), i && (n.value = i), t;
                        }
                    },
                },
            },
            removeAttr: function (n, t) {
                var i,
                    u = 0,
                    r = t && t.match(l);
                if (r && 1 === n.nodeType) while ((i = r[u++])) n.removeAttribute(i);
            },
        });
        lf = {
            set: function (n, t, r) {
                return !1 === t ? i.removeAttr(n, r) : n.setAttribute(r, r), r;
            },
        };
        i.each(i.expr.match.bool.source.match(/\w+/g), function (n, t) {
            var r = at[t] || i.find.attr;
            at[t] = function (n, t, i) {
                var f,
                    e,
                    u = t.toLowerCase();
                return i || ((e = at[u]), (at[u] = f), (f = null != r(n, t, i) ? u : null), (at[u] = e)), f;
            };
        });
        af = /^(?:input|select|textarea|button)$/i;
        vf = /^(?:a|area)$/i;
        i.fn.extend({
            prop: function (n, t) {
                return p(this, i.prop, n, t, 1 < arguments.length);
            },
            removeProp: function (n) {
                return this.each(function () {
                    delete this[i.propFix[n] || n];
                });
            },
        });
        i.extend({
            prop: function (n, t, r) {
                var f,
                    u,
                    e = n.nodeType;
                if (3 !== e && 8 !== e && 2 !== e)
                    return (
                        (1 === e && i.isXMLDoc(n)) || ((t = i.propFix[t] || t), (u = i.propHooks[t])),
                        void 0 !== r ? (u && "set" in u && void 0 !== (f = u.set(n, r, t)) ? f : (n[t] = r)) : u && "get" in u && null !== (f = u.get(n, t)) ? f : n[t]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (n) {
                        var t = i.find.attr(n, "tabindex");
                        return t ? parseInt(t, 10) : af.test(n.nodeName) || (vf.test(n.nodeName) && n.href) ? 0 : -1;
                    },
                },
            },
            propFix: { for: "htmlFor", class: "className" },
        });
        e.optSelected ||
            (i.propHooks.selected = {
                get: function (n) {
                    var t = n.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function (n) {
                    var t = n.parentNode;
                    t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                },
            });
        i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            i.propFix[this.toLowerCase()] = this;
        });
        i.fn.extend({
            addClass: function (n) {
                var o,
                    t,
                    r,
                    f,
                    e,
                    s,
                    h,
                    c = 0;
                if (u(n))
                    return this.each(function (t) {
                        i(this).addClass(n.call(this, t, nt(this)));
                    });
                if ((o = fr(n)).length)
                    while ((t = this[c++]))
                        if (((f = nt(t)), (r = 1 === t.nodeType && " " + g(f) + " "))) {
                            for (s = 0; (e = o[s++]); ) r.indexOf(" " + e + " ") < 0 && (r += e + " ");
                            f !== (h = g(r)) && t.setAttribute("class", h);
                        }
                return this;
            },
            removeClass: function (n) {
                var o,
                    r,
                    t,
                    f,
                    e,
                    s,
                    h,
                    c = 0;
                if (u(n))
                    return this.each(function (t) {
                        i(this).removeClass(n.call(this, t, nt(this)));
                    });
                if (!arguments.length) return this.attr("class", "");
                if ((o = fr(n)).length)
                    while ((r = this[c++]))
                        if (((f = nt(r)), (t = 1 === r.nodeType && " " + g(f) + " "))) {
                            for (s = 0; (e = o[s++]); ) while (-1 < t.indexOf(" " + e + " ")) t = t.replace(" " + e + " ", " ");
                            f !== (h = g(t)) && r.setAttribute("class", h);
                        }
                return this;
            },
            toggleClass: function (n, t) {
                var f = typeof n,
                    e = "string" === f || Array.isArray(n);
                return "boolean" == typeof t && e
                    ? t
                        ? this.addClass(n)
                        : this.removeClass(n)
                    : u(n)
                    ? this.each(function (r) {
                          i(this).toggleClass(n.call(this, r, nt(this), t), t);
                      })
                    : this.each(function () {
                          var t, o, u, s;
                          if (e) for (o = 0, u = i(this), s = fr(n); (t = s[o++]); ) u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
                          else (void 0 !== n && "boolean" !== f) || ((t = nt(this)) && r.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === n ? "" : r.get(this, "__className__") || ""));
                      });
            },
            hasClass: function (n) {
                for (var t, r = 0, i = " " + n + " "; (t = this[r++]); ) if (1 === t.nodeType && -1 < (" " + g(nt(t)) + " ").indexOf(i)) return !0;
                return !1;
            },
        });
        yf = /\r/g;
        i.fn.extend({
            val: function (n) {
                var t,
                    r,
                    e,
                    f = this[0];
                return arguments.length
                    ? ((e = u(n)),
                      this.each(function (r) {
                          var u;
                          1 === this.nodeType &&
                              (null == (u = e ? n.call(this, r, i(this).val()) : n)
                                  ? (u = "")
                                  : "number" == typeof u
                                  ? (u += "")
                                  : Array.isArray(u) &&
                                    (u = i.map(u, function (n) {
                                        return null == n ? "" : n + "";
                                    })),
                              ((t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, u, "value")) || (this.value = u));
                      }))
                    : f
                    ? (t = i.valHooks[f.type] || i.valHooks[f.nodeName.toLowerCase()]) && "get" in t && void 0 !== (r = t.get(f, "value"))
                        ? r
                        : "string" == typeof (r = f.value)
                        ? r.replace(yf, "")
                        : null == r
                        ? ""
                        : r
                    : void 0;
            },
        });
        i.extend({
            valHooks: {
                option: {
                    get: function (n) {
                        var t = i.find.attr(n, "value");
                        return null != t ? t : g(i.text(n));
                    },
                },
                select: {
                    get: function (n) {
                        for (var e, t, o = n.options, u = n.selectedIndex, f = "select-one" === n.type, s = f ? null : [], h = f ? u + 1 : o.length, r = u < 0 ? h : f ? u : 0; r < h; r++)
                            if (((t = o[r]).selected || r === u) && !t.disabled && (!t.parentNode.disabled || !c(t.parentNode, "optgroup"))) {
                                if (((e = i(t).val()), f)) return e;
                                s.push(e);
                            }
                        return s;
                    },
                    set: function (n, t) {
                        for (var r, u, f = n.options, e = i.makeArray(t), o = f.length; o--; ) ((u = f[o]).selected = -1 < i.inArray(i.valHooks.option.get(u), e)) && (r = !0);
                        return r || (n.selectedIndex = -1), e;
                    },
                },
            },
        });
        i.each(["radio", "checkbox"], function () {
            i.valHooks[this] = {
                set: function (n, t) {
                    if (Array.isArray(t)) return (n.checked = -1 < i.inArray(i(n).val(), t));
                },
            };
            e.checkOn ||
                (i.valHooks[this].get = function (n) {
                    return null === n.getAttribute("value") ? "on" : n.value;
                });
        });
        e.focusin = "onfocusin" in n;
        er = /^(?:focusinfocus|focusoutblur)$/;
        or = function (n) {
            n.stopPropagation();
        };
        i.extend(i.event, {
            trigger: function (t, e, o, s) {
                var k,
                    c,
                    l,
                    d,
                    v,
                    y,
                    a,
                    p,
                    w = [o || f],
                    h = ui.call(t, "type") ? t.type : t,
                    b = ui.call(t, "namespace") ? t.namespace.split(".") : [];
                if (
                    ((c = p = l = o = o || f),
                    3 !== o.nodeType &&
                        8 !== o.nodeType &&
                        !er.test(h + i.event.triggered) &&
                        (-1 < h.indexOf(".") && ((h = (b = h.split(".")).shift()), b.sort()),
                        (v = h.indexOf(":") < 0 && "on" + h),
                        ((t = t[i.expando] ? t : new i.Event(h, "object" == typeof t && t)).isTrigger = s ? 2 : 3),
                        (t.namespace = b.join(".")),
                        (t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                        (t.result = void 0),
                        t.target || (t.target = o),
                        (e = null == e ? [t] : i.makeArray(e, [t])),
                        (a = i.event.special[h] || {}),
                        s || !a.trigger || !1 !== a.trigger.apply(o, e)))
                ) {
                    if (!s && !a.noBubble && !tt(o)) {
                        for (d = a.delegateType || h, er.test(d + h) || (c = c.parentNode); c; c = c.parentNode) w.push(c), (l = c);
                        l === (o.ownerDocument || f) && w.push(l.defaultView || l.parentWindow || n);
                    }
                    for (k = 0; (c = w[k++]) && !t.isPropagationStopped(); )
                        (p = c),
                            (t.type = 1 < k ? d : a.bindType || h),
                            (y = (r.get(c, "events") || {})[t.type] && r.get(c, "handle")) && y.apply(c, e),
                            (y = v && c[v]) && y.apply && yt(c) && ((t.result = y.apply(c, e)), !1 === t.result && t.preventDefault());
                    return (
                        (t.type = h),
                        s ||
                            t.isDefaultPrevented() ||
                            (a._default && !1 !== a._default.apply(w.pop(), e)) ||
                            !yt(o) ||
                            (v &&
                                u(o[h]) &&
                                !tt(o) &&
                                ((l = o[v]) && (o[v] = null),
                                (i.event.triggered = h),
                                t.isPropagationStopped() && p.addEventListener(h, or),
                                o[h](),
                                t.isPropagationStopped() && p.removeEventListener(h, or),
                                (i.event.triggered = void 0),
                                l && (o[v] = l))),
                        t.result
                    );
                }
            },
            simulate: function (n, t, r) {
                var u = i.extend(new i.Event(), r, { type: n, isSimulated: !0 });
                i.event.trigger(u, null, t);
            },
        });
        i.fn.extend({
            trigger: function (n, t) {
                return this.each(function () {
                    i.event.trigger(n, t, this);
                });
            },
            triggerHandler: function (n, t) {
                var r = this[0];
                if (r) return i.event.trigger(n, t, r, !0);
            },
        });
        e.focusin ||
            i.each({ focus: "focusin", blur: "focusout" }, function (n, t) {
                var u = function (n) {
                    i.event.simulate(t, n.target, i.event.fix(n));
                };
                i.event.special[t] = {
                    setup: function () {
                        var i = this.ownerDocument || this,
                            f = r.access(i, t);
                        f || i.addEventListener(n, u, !0);
                        r.access(i, t, (f || 0) + 1);
                    },
                    teardown: function () {
                        var i = this.ownerDocument || this,
                            f = r.access(i, t) - 1;
                        f ? r.access(i, t, f) : (i.removeEventListener(n, u, !0), r.remove(i, t));
                    },
                };
            });
        var ti = n.location,
            pf = Date.now(),
            sr = /\?/;
        i.parseXML = function (t) {
            var r;
            if (!t || "string" != typeof t) return null;
            try {
                r = new n.DOMParser().parseFromString(t, "text/xml");
            } catch (t) {
                r = void 0;
            }
            return (r && !r.getElementsByTagName("parsererror").length) || i.error("Invalid XML: " + t), r;
        };
        var fo = /\[\]$/,
            wf = /\r?\n/g,
            eo = /^(?:submit|button|image|reset|file)$/i,
            oo = /^(?:input|select|textarea|keygen)/i;
        i.param = function (n, t) {
            var r,
                f = [],
                e = function (n, t) {
                    var i = u(t) ? t() : t;
                    f[f.length] = encodeURIComponent(n) + "=" + encodeURIComponent(null == i ? "" : i);
                };
            if (null == n) return "";
            if (Array.isArray(n) || (n.jquery && !i.isPlainObject(n)))
                i.each(n, function () {
                    e(this.name, this.value);
                });
            else for (r in n) hr(r, n[r], t, e);
            return f.join("&");
        };
        i.fn.extend({
            serialize: function () {
                return i.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var n = i.prop(this, "elements");
                    return n ? i.makeArray(n) : this;
                })
                    .filter(function () {
                        var n = this.type;
                        return this.name && !i(this).is(":disabled") && oo.test(this.nodeName) && !eo.test(n) && (this.checked || !dt.test(n));
                    })
                    .map(function (n, t) {
                        var r = i(this).val();
                        return null == r
                            ? null
                            : Array.isArray(r)
                            ? i.map(r, function (n) {
                                  return { name: t.name, value: n.replace(wf, "\r\n") };
                              })
                            : { name: t.name, value: r.replace(wf, "\r\n") };
                    })
                    .get();
            },
        });
        var so = /%20/g,
            ho = /#.*$/,
            co = /([?&])_=[^&]*/,
            lo = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            ao = /^(?:GET|HEAD)$/,
            vo = /^\/\//,
            bf = {},
            cr = {},
            kf = "*/".concat("*"),
            lr = f.createElement("a");
        return (
            (lr.href = ti.href),
            i.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: ti.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ti.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: { "*": kf, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                    contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                    responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                    converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": i.parseXML },
                    flatOptions: { url: !0, context: !0 },
                },
                ajaxSetup: function (n, t) {
                    return t ? ar(ar(n, i.ajaxSettings), t) : ar(i.ajaxSettings, n);
                },
                ajaxPrefilter: df(bf),
                ajaxTransport: df(cr),
                ajax: function (t, r) {
                    function b(t, r, f, c) {
                        var v,
                            rt,
                            b,
                            p,
                            g,
                            l = r;
                        s ||
                            ((s = !0),
                            d && n.clearTimeout(d),
                            (a = void 0),
                            (k = c || ""),
                            (e.readyState = 0 < t ? 4 : 0),
                            (v = (200 <= t && t < 300) || 304 === t),
                            f &&
                                (p = (function (n, t, i) {
                                    for (var e, u, f, o, s = n.contents, r = n.dataTypes; "*" === r[0]; ) r.shift(), void 0 === e && (e = n.mimeType || t.getResponseHeader("Content-Type"));
                                    if (e)
                                        for (u in s)
                                            if (s[u] && s[u].test(e)) {
                                                r.unshift(u);
                                                break;
                                            }
                                    if (r[0] in i) f = r[0];
                                    else {
                                        for (u in i) {
                                            if (!r[0] || n.converters[u + " " + r[0]]) {
                                                f = u;
                                                break;
                                            }
                                            o || (o = u);
                                        }
                                        f = f || o;
                                    }
                                    if (f) return f !== r[0] && r.unshift(f), i[f];
                                })(u, e, f)),
                            (p = (function (n, t, i, r) {
                                var h,
                                    u,
                                    f,
                                    s,
                                    e,
                                    o = {},
                                    c = n.dataTypes.slice();
                                if (c[1]) for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
                                for (u = c.shift(); u; )
                                    if ((n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), (e = u), (u = c.shift())))
                                        if ("*" === u) u = e;
                                        else if ("*" !== e && e !== u) {
                                            if (!(f = o[e + " " + u] || o["* " + u]))
                                                for (h in o)
                                                    if ((s = h.split(" "))[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]])) {
                                                        !0 === f ? (f = o[h]) : !0 !== o[h] && ((u = s[0]), c.unshift(s[1]));
                                                        break;
                                                    }
                                            if (!0 !== f)
                                                if (f && n.throws) t = f(t);
                                                else
                                                    try {
                                                        t = f(t);
                                                    } catch (n) {
                                                        return { state: "parsererror", error: f ? n : "No conversion from " + e + " to " + u };
                                                    }
                                        }
                                return { state: "success", data: t };
                            })(u, p, e, v)),
                            v
                                ? (u.ifModified && ((g = e.getResponseHeader("Last-Modified")) && (i.lastModified[o] = g), (g = e.getResponseHeader("etag")) && (i.etag[o] = g)),
                                  204 === t || "HEAD" === u.type ? (l = "nocontent") : 304 === t ? (l = "notmodified") : ((l = p.state), (rt = p.data), (v = !(b = p.error))))
                                : ((b = l), (!t && l) || ((l = "error"), t < 0 && (t = 0))),
                            (e.status = t),
                            (e.statusText = (r || l) + ""),
                            v ? tt.resolveWith(h, [rt, l, e]) : tt.rejectWith(h, [e, l, b]),
                            e.statusCode(w),
                            (w = void 0),
                            y && nt.trigger(v ? "ajaxSuccess" : "ajaxError", [e, u, v ? rt : b]),
                            it.fireWith(h, [e, l]),
                            y && (nt.trigger("ajaxComplete", [e, u]), --i.active || i.event.trigger("ajaxStop")));
                    }
                    "object" == typeof t && ((r = t), (t = void 0));
                    r = r || {};
                    var a,
                        o,
                        k,
                        v,
                        d,
                        c,
                        s,
                        y,
                        g,
                        p,
                        u = i.ajaxSetup({}, r),
                        h = u.context || u,
                        nt = u.context && (h.nodeType || h.jquery) ? i(h) : i.event,
                        tt = i.Deferred(),
                        it = i.Callbacks("once memory"),
                        w = u.statusCode || {},
                        rt = {},
                        ut = {},
                        ft = "canceled",
                        e = {
                            readyState: 0,
                            getResponseHeader: function (n) {
                                var t;
                                if (s) {
                                    if (!v) for (v = {}; (t = lo.exec(k)); ) v[t[1].toLowerCase() + " "] = (v[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                    t = v[n.toLowerCase() + " "];
                                }
                                return null == t ? null : t.join(", ");
                            },
                            getAllResponseHeaders: function () {
                                return s ? k : null;
                            },
                            setRequestHeader: function (n, t) {
                                return null == s && ((n = ut[n.toLowerCase()] = ut[n.toLowerCase()] || n), (rt[n] = t)), this;
                            },
                            overrideMimeType: function (n) {
                                return null == s && (u.mimeType = n), this;
                            },
                            statusCode: function (n) {
                                var t;
                                if (n)
                                    if (s) e.always(n[e.status]);
                                    else for (t in n) w[t] = [w[t], n[t]];
                                return this;
                            },
                            abort: function (n) {
                                var t = n || ft;
                                return a && a.abort(t), b(0, t), this;
                            },
                        };
                    if (
                        (tt.promise(e),
                        (u.url = ((t || u.url || ti.href) + "").replace(vo, ti.protocol + "//")),
                        (u.type = r.method || r.type || u.method || u.type),
                        (u.dataTypes = (u.dataType || "*").toLowerCase().match(l) || [""]),
                        null == u.crossDomain)
                    ) {
                        c = f.createElement("a");
                        try {
                            c.href = u.url;
                            c.href = c.href;
                            u.crossDomain = lr.protocol + "//" + lr.host != c.protocol + "//" + c.host;
                        } catch (t) {
                            u.crossDomain = !0;
                        }
                    }
                    if ((u.data && u.processData && "string" != typeof u.data && (u.data = i.param(u.data, u.traditional)), gf(bf, u, r, e), s)) return e;
                    for (g in ((y = i.event && u.global) && 0 == i.active++ && i.event.trigger("ajaxStart"),
                    (u.type = u.type.toUpperCase()),
                    (u.hasContent = !ao.test(u.type)),
                    (o = u.url.replace(ho, "")),
                    u.hasContent
                        ? u.data && u.processData && 0 === (u.contentType || "").indexOf("application/x-www-form-urlencoded") && (u.data = u.data.replace(so, "+"))
                        : ((p = u.url.slice(o.length)),
                          u.data && (u.processData || "string" == typeof u.data) && ((o += (sr.test(o) ? "&" : "?") + u.data), delete u.data),
                          !1 === u.cache && ((o = o.replace(co, "$1")), (p = (sr.test(o) ? "&" : "?") + "_=" + pf++ + p)),
                          (u.url = o + p)),
                    u.ifModified && (i.lastModified[o] && e.setRequestHeader("If-Modified-Since", i.lastModified[o]), i.etag[o] && e.setRequestHeader("If-None-Match", i.etag[o])),
                    ((u.data && u.hasContent && !1 !== u.contentType) || r.contentType) && e.setRequestHeader("Content-Type", u.contentType),
                    e.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + kf + "; q=0.01" : "") : u.accepts["*"]),
                    u.headers))
                        e.setRequestHeader(g, u.headers[g]);
                    if (u.beforeSend && (!1 === u.beforeSend.call(h, e, u) || s)) return e.abort();
                    if (((ft = "abort"), it.add(u.complete), e.done(u.success), e.fail(u.error), (a = gf(cr, u, r, e)))) {
                        if (((e.readyState = 1), y && nt.trigger("ajaxSend", [e, u]), s)) return e;
                        u.async &&
                            0 < u.timeout &&
                            (d = n.setTimeout(function () {
                                e.abort("timeout");
                            }, u.timeout));
                        try {
                            s = !1;
                            a.send(rt, b);
                        } catch (t) {
                            if (s) throw t;
                            b(-1, t);
                        }
                    } else b(-1, "No Transport");
                    return e;
                },
                getJSON: function (n, t, r) {
                    return i.get(n, t, r, "json");
                },
                getScript: function (n, t) {
                    return i.get(n, void 0, t, "script");
                },
            }),
            i.each(["get", "post"], function (n, t) {
                i[t] = function (n, r, f, e) {
                    return u(r) && ((e = e || f), (f = r), (r = void 0)), i.ajax(i.extend({ url: n, type: t, dataType: e, data: r, success: f }, i.isPlainObject(n) && n));
                };
            }),
            (i._evalUrl = function (n, t) {
                return i.ajax({
                    url: n,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: { "text script": function () {} },
                    dataFilter: function (n) {
                        i.globalEval(n, t);
                    },
                });
            }),
            i.fn.extend({
                wrapAll: function (n) {
                    var t;
                    return (
                        this[0] &&
                            (u(n) && (n = n.call(this[0])),
                            (t = i(n, this[0].ownerDocument).eq(0).clone(!0)),
                            this[0].parentNode && t.insertBefore(this[0]),
                            t
                                .map(function () {
                                    for (var n = this; n.firstElementChild; ) n = n.firstElementChild;
                                    return n;
                                })
                                .append(this)),
                        this
                    );
                },
                wrapInner: function (n) {
                    return u(n)
                        ? this.each(function (t) {
                              i(this).wrapInner(n.call(this, t));
                          })
                        : this.each(function () {
                              var t = i(this),
                                  r = t.contents();
                              r.length ? r.wrapAll(n) : t.append(n);
                          });
                },
                wrap: function (n) {
                    var t = u(n);
                    return this.each(function (r) {
                        i(this).wrapAll(t ? n.call(this, r) : n);
                    });
                },
                unwrap: function (n) {
                    return (
                        this.parent(n)
                            .not("body")
                            .each(function () {
                                i(this).replaceWith(this.childNodes);
                            }),
                        this
                    );
                },
            }),
            (i.expr.pseudos.hidden = function (n) {
                return !i.expr.pseudos.visible(n);
            }),
            (i.expr.pseudos.visible = function (n) {
                return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length);
            }),
            (i.ajaxSettings.xhr = function () {
                try {
                    return new n.XMLHttpRequest();
                } catch (t) {}
            }),
            (ne = { 0: 200, 1223: 204 }),
            (vt = i.ajaxSettings.xhr()),
            (e.cors = !!vt && "withCredentials" in vt),
            (e.ajax = vt = !!vt),
            i.ajaxTransport(function (t) {
                var i, r;
                if (e.cors || (vt && !t.crossDomain))
                    return {
                        send: function (u, f) {
                            var o,
                                e = t.xhr();
                            if ((e.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)) for (o in t.xhrFields) e[o] = t.xhrFields[o];
                            for (o in (t.mimeType && e.overrideMimeType && e.overrideMimeType(t.mimeType), t.crossDomain || u["X-Requested-With"] || (u["X-Requested-With"] = "XMLHttpRequest"), u)) e.setRequestHeader(o, u[o]);
                            i = function (n) {
                                return function () {
                                    i &&
                                        ((i = r = e.onload = e.onerror = e.onabort = e.ontimeout = e.onreadystatechange = null),
                                        "abort" === n
                                            ? e.abort()
                                            : "error" === n
                                            ? "number" != typeof e.status
                                                ? f(0, "error")
                                                : f(e.status, e.statusText)
                                            : f(
                                                  ne[e.status] || e.status,
                                                  e.statusText,
                                                  "text" !== (e.responseType || "text") || "string" != typeof e.responseText ? { binary: e.response } : { text: e.responseText },
                                                  e.getAllResponseHeaders()
                                              ));
                                };
                            };
                            e.onload = i();
                            r = e.onerror = e.ontimeout = i("error");
                            void 0 !== e.onabort
                                ? (e.onabort = r)
                                : (e.onreadystatechange = function () {
                                      4 === e.readyState &&
                                          n.setTimeout(function () {
                                              i && r();
                                          });
                                  });
                            i = i("abort");
                            try {
                                e.send((t.hasContent && t.data) || null);
                            } catch (u) {
                                if (i) throw u;
                            }
                        },
                        abort: function () {
                            i && i();
                        },
                    };
            }),
            i.ajaxPrefilter(function (n) {
                n.crossDomain && (n.contents.script = !1);
            }),
            i.ajaxSetup({
                accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                contents: { script: /\b(?:java|ecma)script\b/ },
                converters: {
                    "text script": function (n) {
                        return i.globalEval(n), n;
                    },
                },
            }),
            i.ajaxPrefilter("script", function (n) {
                void 0 === n.cache && (n.cache = !1);
                n.crossDomain && (n.type = "GET");
            }),
            i.ajaxTransport("script", function (n) {
                var r, t;
                if (n.crossDomain || n.scriptAttrs)
                    return {
                        send: function (u, e) {
                            r = i("<script>")
                                .attr(n.scriptAttrs || {})
                                .prop({ charset: n.scriptCharset, src: n.url })
                                .on(
                                    "load error",
                                    (t = function (n) {
                                        r.remove();
                                        t = null;
                                        n && e("error" === n.type ? 404 : 200, n.type);
                                    })
                                );
                            f.head.appendChild(r[0]);
                        },
                        abort: function () {
                            t && t();
                        },
                    };
            }),
            (vr = []),
            (vi = /(=)\?(?=&|$)|\?\?/),
            i.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function () {
                    var n = vr.pop() || i.expando + "_" + pf++;
                    return (this[n] = !0), n;
                },
            }),
            i.ajaxPrefilter("json jsonp", function (t, r, f) {
                var e,
                    o,
                    s,
                    h = !1 !== t.jsonp && (vi.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && vi.test(t.data) && "data");
                if (h || "jsonp" === t.dataTypes[0])
                    return (
                        (e = t.jsonpCallback = u(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                        h ? (t[h] = t[h].replace(vi, "$1" + e)) : !1 !== t.jsonp && (t.url += (sr.test(t.url) ? "&" : "?") + t.jsonp + "=" + e),
                        (t.converters["script json"] = function () {
                            return s || i.error(e + " was not called"), s[0];
                        }),
                        (t.dataTypes[0] = "json"),
                        (o = n[e]),
                        (n[e] = function () {
                            s = arguments;
                        }),
                        f.always(function () {
                            void 0 === o ? i(n).removeProp(e) : (n[e] = o);
                            t[e] && ((t.jsonpCallback = r.jsonpCallback), vr.push(e));
                            s && u(o) && o(s[0]);
                            s = o = void 0;
                        }),
                        "script"
                    );
            }),
            (e.createHTMLDocument = (((te = f.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>"), 2 === te.childNodes.length)),
            (i.parseHTML = function (n, t, r) {
                return "string" != typeof n
                    ? []
                    : ("boolean" == typeof t && ((r = t), (t = !1)),
                      t || (e.createHTMLDocument ? (((s = (t = f.implementation.createHTMLDocument("")).createElement("base")).href = f.location.href), t.head.appendChild(s)) : (t = f)),
                      (u = !r && []),
                      (o = wi.exec(n)) ? [t.createElement(o[1])] : ((o = vu([n], t, u)), u && u.length && i(u).remove(), i.merge([], o.childNodes)));
                var s, o, u;
            }),
            (i.fn.load = function (n, t, r) {
                var f,
                    s,
                    h,
                    e = this,
                    o = n.indexOf(" ");
                return (
                    -1 < o && ((f = g(n.slice(o))), (n = n.slice(0, o))),
                    u(t) ? ((r = t), (t = void 0)) : t && "object" == typeof t && (s = "POST"),
                    0 < e.length &&
                        i
                            .ajax({ url: n, type: s || "GET", dataType: "html", data: t })
                            .done(function (n) {
                                h = arguments;
                                e.html(f ? i("<div>").append(i.parseHTML(n)).find(f) : n);
                            })
                            .always(
                                r &&
                                    function (n, t) {
                                        e.each(function () {
                                            r.apply(this, h || [n.responseText, t, n]);
                                        });
                                    }
                            ),
                    this
                );
            }),
            i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (n, t) {
                i.fn[t] = function (n) {
                    return this.on(t, n);
                };
            }),
            (i.expr.pseudos.animated = function (n) {
                return i.grep(i.timers, function (t) {
                    return n === t.elem;
                }).length;
            }),
            (i.offset = {
                setOffset: function (n, t, r) {
                    var v,
                        o,
                        s,
                        h,
                        f,
                        c,
                        l = i.css(n, "position"),
                        a = i(n),
                        e = {};
                    "static" === l && (n.style.position = "relative");
                    f = a.offset();
                    s = i.css(n, "top");
                    c = i.css(n, "left");
                    ("absolute" === l || "fixed" === l) && -1 < (s + c).indexOf("auto") ? ((h = (v = a.position()).top), (o = v.left)) : ((h = parseFloat(s) || 0), (o = parseFloat(c) || 0));
                    u(t) && (t = t.call(n, r, i.extend({}, f)));
                    null != t.top && (e.top = t.top - f.top + h);
                    null != t.left && (e.left = t.left - f.left + o);
                    "using" in t ? t.using.call(n, e) : a.css(e);
                },
            }),
            i.fn.extend({
                offset: function (n) {
                    if (arguments.length)
                        return void 0 === n
                            ? this
                            : this.each(function (t) {
                                  i.offset.setOffset(this, n, t);
                              });
                    var r,
                        u,
                        t = this[0];
                    if (t) return t.getClientRects().length ? ((r = t.getBoundingClientRect()), (u = t.ownerDocument.defaultView), { top: r.top + u.pageYOffset, left: r.left + u.pageXOffset }) : { top: 0, left: 0 };
                },
                position: function () {
                    if (this[0]) {
                        var n,
                            r,
                            u,
                            t = this[0],
                            f = { top: 0, left: 0 };
                        if ("fixed" === i.css(t, "position")) r = t.getBoundingClientRect();
                        else {
                            for (r = this.offset(), u = t.ownerDocument, n = t.offsetParent || u.documentElement; n && (n === u.body || n === u.documentElement) && "static" === i.css(n, "position"); ) n = n.parentNode;
                            n && n !== t && 1 === n.nodeType && (((f = i(n).offset()).top += i.css(n, "borderTopWidth", !0)), (f.left += i.css(n, "borderLeftWidth", !0)));
                        }
                        return { top: r.top - f.top - i.css(t, "marginTop", !0), left: r.left - f.left - i.css(t, "marginLeft", !0) };
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        for (var n = this.offsetParent; n && "static" === i.css(n, "position"); ) n = n.offsetParent;
                        return n || bt;
                    });
                },
            }),
            i.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (n, t) {
                var r = "pageYOffset" === t;
                i.fn[n] = function (i) {
                    return p(
                        this,
                        function (n, i, u) {
                            var f;
                            if ((tt(n) ? (f = n) : 9 === n.nodeType && (f = n.defaultView), void 0 === u)) return f ? f[t] : n[i];
                            f ? f.scrollTo(r ? f.pageXOffset : u, r ? u : f.pageYOffset) : (n[i] = u);
                        },
                        n,
                        i,
                        arguments.length
                    );
                };
            }),
            i.each(["top", "left"], function (n, t) {
                i.cssHooks[t] = ku(e.pixelPosition, function (n, r) {
                    if (r) return (r = ni(n, t)), tr.test(r) ? i(n).position()[t] + "px" : r;
                });
            }),
            i.each({ Height: "height", Width: "width" }, function (n, t) {
                i.each({ padding: "inner" + n, content: t, "": "outer" + n }, function (r, u) {
                    i.fn[u] = function (f, e) {
                        var o = arguments.length && (r || "boolean" != typeof f),
                            s = r || (!0 === f || !0 === e ? "margin" : "border");
                        return p(
                            this,
                            function (t, r, f) {
                                var e;
                                return tt(t)
                                    ? 0 === u.indexOf("outer")
                                        ? t["inner" + n]
                                        : t.document.documentElement["client" + n]
                                    : 9 === t.nodeType
                                    ? ((e = t.documentElement), Math.max(t.body["scroll" + n], e["scroll" + n], t.body["offset" + n], e["offset" + n], e["client" + n]))
                                    : void 0 === f
                                    ? i.css(t, r, s)
                                    : i.style(t, r, f, s);
                            },
                            t,
                            o ? f : void 0,
                            o
                        );
                    };
                });
            }),
            i.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (n, t) {
                i.fn[t] = function (n, i) {
                    return 0 < arguments.length ? this.on(t, null, n, i) : this.trigger(t);
                };
            }),
            i.fn.extend({
                hover: function (n, t) {
                    return this.mouseenter(n).mouseleave(t || n);
                },
            }),
            i.fn.extend({
                bind: function (n, t, i) {
                    return this.on(n, null, t, i);
                },
                unbind: function (n, t) {
                    return this.off(n, null, t);
                },
                delegate: function (n, t, i, r) {
                    return this.on(t, n, i, r);
                },
                undelegate: function (n, t, i) {
                    return 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", i);
                },
            }),
            (i.proxy = function (n, t) {
                var r, f, e;
                if (("string" == typeof t && ((r = n[t]), (t = n), (n = r)), u(n)))
                    return (
                        (f = b.call(arguments, 2)),
                        ((e = function () {
                            return n.apply(t || this, f.concat(b.call(arguments)));
                        }).guid = n.guid = n.guid || i.guid++),
                        e
                    );
            }),
            (i.holdReady = function (n) {
                n ? i.readyWait++ : i.ready(!0);
            }),
            (i.isArray = Array.isArray),
            (i.parseJSON = JSON.parse),
            (i.nodeName = c),
            (i.isFunction = u),
            (i.isWindow = tt),
            (i.camelCase = y),
            (i.type = it),
            (i.now = Date.now),
            (i.isNumeric = function (n) {
                var t = i.type(n);
                return ("number" === t || "string" === t) && !isNaN(n - parseFloat(n));
            }),
            "function" == typeof define &&
                define.amd &&
                define("jquery", [], function () {
                    return i;
                }),
            (ie = n.jQuery),
            (re = n.$),
            (i.noConflict = function (t) {
                return n.$ === i && (n.$ = re), t && n.jQuery === i && (n.jQuery = ie), i;
            }),
            t || (n.jQuery = n.$ = i),
            i
        );
    }),
    "undefined" == typeof jQuery)
)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (n) {
    "use strict";
    var t = n.fn.jquery.split(" ")[0].split(".");
    if ((t[0] < 2 && t[1] < 9) || (1 == t[0] && 9 == t[1] && t[2] < 1)) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
})(jQuery);
+(function (n) {
    "use strict";
    function t() {
        var i = document.createElement("bootstrap"),
            n = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
        for (var t in n) if (void 0 !== i.style[t]) return { end: n[t] };
        return !1;
    }
    n.fn.emulateTransitionEnd = function (t) {
        var i = !1,
            u = this,
            r;
        n(this).one("bsTransitionEnd", function () {
            i = !0;
        });
        return (
            (r = function () {
                i || n(u).trigger(n.support.transition.end);
            }),
            setTimeout(r, t),
            this
        );
    };
    n(function () {
        n.support.transition = t();
        n.support.transition &&
            (n.event.special.bsTransitionEnd = {
                bindType: n.support.transition.end,
                delegateType: n.support.transition.end,
                handle: function (t) {
                    if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
                },
            });
    });
})(jQuery);
+(function (n) {
    "use strict";
    function u(i) {
        return this.each(function () {
            var r = n(this),
                u = r.data("bs.alert");
            u || r.data("bs.alert", (u = new t(this)));
            "string" == typeof i && u[i].call(r);
        });
    }
    var i = '[data-dismiss="alert"]',
        t = function (t) {
            n(t).on("click", i, this.close);
        },
        r;
    t.VERSION = "3.3.2";
    t.TRANSITION_DURATION = 150;
    t.prototype.close = function (i) {
        function e() {
            r.detach().trigger("closed.bs.alert").remove();
        }
        var f = n(this),
            u = f.attr("data-target"),
            r;
        u || ((u = f.attr("href")), (u = u && u.replace(/.*(?=#[^\s]*$)/, "")));
        r = n(u);
        i && i.preventDefault();
        r.length || (r = f.closest(".alert"));
        r.trigger((i = n.Event("close.bs.alert")));
        i.isDefaultPrevented() || (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e());
    };
    r = n.fn.alert;
    n.fn.alert = u;
    n.fn.alert.Constructor = t;
    n.fn.alert.noConflict = function () {
        return (n.fn.alert = r), this;
    };
    n(document).on("click.bs.alert.data-api", i, t.prototype.close);
})(jQuery);
+(function (n) {
    "use strict";
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.button"),
                f = "object" == typeof i && i;
            r || u.data("bs.button", (r = new t(this, f)));
            "toggle" == i ? r.toggle() : i && r.setState(i);
        });
    }
    var t = function (i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.isLoading = !1;
        },
        r;
    t.VERSION = "3.3.2";
    t.DEFAULTS = { loadingText: "loading..." };
    t.prototype.setState = function (t) {
        var r = "disabled",
            i = this.$element,
            f = i.is("input") ? "val" : "html",
            u = i.data();
        t += "Text";
        null == u.resetText && i.data("resetText", i[f]());
        setTimeout(
            n.proxy(function () {
                i[f](null == u[t] ? this.options[t] : u[t]);
                "loadingText" == t ? ((this.isLoading = !0), i.addClass(r).attr(r, r)) : this.isLoading && ((this.isLoading = !1), i.removeClass(r).removeAttr(r));
            }, this),
            0
        );
    };
    t.prototype.toggle = function () {
        var t = !0,
            i = this.$element.closest('[data-toggle="buttons"]'),
            n;
        i.length
            ? ((n = this.$element.find("input")),
              "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? (t = !1) : i.find(".active").removeClass("active")),
              t && n.prop("checked", !this.$element.hasClass("active")).trigger("change"))
            : this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active");
    };
    r = n.fn.button;
    n.fn.button = i;
    n.fn.button.Constructor = t;
    n.fn.button.noConflict = function () {
        return (n.fn.button = r), this;
    };
    n(document)
        .on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
            var r = n(t.target);
            r.hasClass("btn") || (r = r.closest(".btn"));
            i.call(r, "toggle");
            t.preventDefault();
        })
        .on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (t) {
            n(t.target)
                .closest(".btn")
                .toggleClass("focus", /^focus(in)?$/.test(t.type));
        });
})(jQuery);
+(function (n) {
    "use strict";
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.carousel"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i),
                e = "string" == typeof i ? i : f.slide;
            r || u.data("bs.carousel", (r = new t(this, f)));
            "number" == typeof i ? r.to(i) : e ? r[e]() : f.interval && r.pause().cycle();
        });
    }
    var t = function (t, i) {
            this.$element = n(t);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = i;
            this.paused = this.sliding = this.interval = this.$active = this.$items = null;
            this.options.keyboard && this.$element.on("keydown.bs.carousel", n.proxy(this.keydown, this));
            "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", n.proxy(this.pause, this)).on("mouseleave.bs.carousel", n.proxy(this.cycle, this));
        },
        u,
        r;
    t.VERSION = "3.3.2";
    t.TRANSITION_DURATION = 600;
    t.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 };
    t.prototype.keydown = function (n) {
        if (!/input|textarea/i.test(n.target.tagName)) {
            switch (n.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return;
            }
            n.preventDefault();
        }
    };
    t.prototype.cycle = function (t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(n.proxy(this.next, this), this.options.interval)), this;
    };
    t.prototype.getItemIndex = function (n) {
        return (this.$items = n.parent().children(".item")), this.$items.index(n || this.$active);
    };
    t.prototype.getItemForDirection = function (n, t) {
        var i = this.getItemIndex(t),
            f = ("prev" == n && 0 === i) || ("next" == n && i == this.$items.length - 1),
            r,
            u;
        return f && !this.options.wrap ? t : ((r = "prev" == n ? -1 : 1), (u = (i + r) % this.$items.length), this.$items.eq(u));
    };
    t.prototype.to = function (n) {
        var i = this,
            t = this.getItemIndex((this.$active = this.$element.find(".item.active")));
        if (!(n > this.$items.length - 1) && !(0 > n))
            return this.sliding
                ? this.$element.one("slid.bs.carousel", function () {
                      i.to(n);
                  })
                : t == n
                ? this.pause().cycle()
                : this.slide(n > t ? "next" : "prev", this.$items.eq(n));
    };
    t.prototype.pause = function (t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && n.support.transition && (this.$element.trigger(n.support.transition.end), this.cycle(!0)), (this.interval = clearInterval(this.interval)), this;
    };
    t.prototype.next = function () {
        if (!this.sliding) return this.slide("next");
    };
    t.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev");
    };
    t.prototype.slide = function (i, r) {
        var e = this.$element.find(".item.active"),
            u = r || this.getItemForDirection(i, e),
            l = this.interval,
            f = "next" == i ? "left" : "right",
            a = this,
            o,
            s,
            h,
            c;
        return u.hasClass("active")
            ? (this.sliding = !1)
            : ((o = u[0]),
              (s = n.Event("slide.bs.carousel", { relatedTarget: o, direction: f })),
              (this.$element.trigger(s), !s.isDefaultPrevented())
                  ? (((this.sliding = !0), l && this.pause(), this.$indicators.length) && (this.$indicators.find(".active").removeClass("active"), (h = n(this.$indicators.children()[this.getItemIndex(u)])), h && h.addClass("active")),
                    (c = n.Event("slid.bs.carousel", { relatedTarget: o, direction: f })),
                    n.support.transition && this.$element.hasClass("slide")
                        ? (u.addClass(i),
                          u[0].offsetWidth,
                          e.addClass(f),
                          u.addClass(f),
                          e
                              .one("bsTransitionEnd", function () {
                                  u.removeClass([i, f].join(" ")).addClass("active");
                                  e.removeClass(["active", f].join(" "));
                                  a.sliding = !1;
                                  setTimeout(function () {
                                      a.$element.trigger(c);
                                  }, 0);
                              })
                              .emulateTransitionEnd(t.TRANSITION_DURATION))
                        : (e.removeClass("active"), u.addClass("active"), (this.sliding = !1), this.$element.trigger(c)),
                    l && this.cycle(),
                    this)
                  : void 0);
    };
    u = n.fn.carousel;
    n.fn.carousel = i;
    n.fn.carousel.Constructor = t;
    n.fn.carousel.noConflict = function () {
        return (n.fn.carousel = u), this;
    };
    r = function (t) {
        var o,
            r = n(this),
            u = n(r.attr("data-target") || ((o = r.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""))),
            e,
            f;
        u.hasClass("carousel") && ((e = n.extend({}, u.data(), r.data())), (f = r.attr("data-slide-to")), f && (e.interval = !1), i.call(u, e), f && u.data("bs.carousel").to(f), t.preventDefault());
    };
    n(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r);
    n(window).on("load", function () {
        n('[data-ride="carousel"]').each(function () {
            var t = n(this);
            i.call(t, t.data());
        });
    });
})(jQuery);
+(function (n) {
    "use strict";
    function r(t) {
        var i,
            r = t.attr("data-target") || ((i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        return n(r);
    }
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.collapse"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i);
            !r && f.toggle && "show" == i && (f.toggle = !1);
            r || u.data("bs.collapse", (r = new t(this, f)));
            "string" == typeof i && r[i]();
        });
    }
    var t = function (i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$trigger = n(this.options.trigger).filter('[href="#' + i.id + '"], [data-target="#' + i.id + '"]');
            this.transitioning = null;
            this.options.parent ? (this.$parent = this.getParent()) : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
            this.options.toggle && this.toggle();
        },
        u;
    t.VERSION = "3.3.2";
    t.TRANSITION_DURATION = 350;
    t.DEFAULTS = { toggle: !0, trigger: '[data-toggle="collapse"]' };
    t.prototype.dimension = function () {
        var n = this.$element.hasClass("width");
        return n ? "width" : "height";
    };
    t.prototype.show = function () {
        var f, r, e, u, o, s;
        if (
            !this.transitioning &&
            !this.$element.hasClass("in") &&
            ((r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing")),
            !(r && r.length && ((f = r.data("bs.collapse")), f && f.transitioning)) && ((e = n.Event("show.bs.collapse")), this.$element.trigger(e), !e.isDefaultPrevented()))
        ) {
            if (
                (r && r.length && (i.call(r, "hide"), f || r.data("bs.collapse", null)),
                (u = this.dimension()),
                this.$element.removeClass("collapse").addClass("collapsing")[u](0).attr("aria-expanded", !0),
                this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                (this.transitioning = 1),
                (o = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[u]("");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse");
                }),
                !n.support.transition)
            )
                return o.call(this);
            s = n.camelCase(["scroll", u].join("-"));
            this.$element.one("bsTransitionEnd", n.proxy(o, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[u](this.$element[0][s]);
        }
    };
    t.prototype.hide = function () {
        var r, i, u;
        if (!this.transitioning && this.$element.hasClass("in") && ((r = n.Event("hide.bs.collapse")), this.$element.trigger(r), !r.isDefaultPrevented()))
            return (
                (i = this.dimension()),
                this.$element[i](this.$element[i]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                (this.transitioning = 1),
                (u = function () {
                    this.transitioning = 0;
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                }),
                n.support.transition ? void this.$element[i](0).one("bsTransitionEnd", n.proxy(u, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : u.call(this)
            );
    };
    t.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };
    t.prototype.getParent = function () {
        return n(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each(
                n.proxy(function (t, i) {
                    var u = n(i);
                    this.addAriaAndCollapsedClass(r(u), u);
                }, this)
            )
            .end();
    };
    t.prototype.addAriaAndCollapsedClass = function (n, t) {
        var i = n.hasClass("in");
        n.attr("aria-expanded", i);
        t.toggleClass("collapsed", !i).attr("aria-expanded", i);
    };
    u = n.fn.collapse;
    n.fn.collapse = i;
    n.fn.collapse.Constructor = t;
    n.fn.collapse.noConflict = function () {
        return (n.fn.collapse = u), this;
    };
    n(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
        var u = n(this);
        u.attr("data-target") || t.preventDefault();
        var f = r(u),
            e = f.data("bs.collapse"),
            o = e ? "toggle" : n.extend({}, u.data(), { trigger: this });
        i.call(f, o);
    });
})(jQuery);
+(function (n) {
    "use strict";
    function r(t) {
        (t && 3 === t.which) ||
            (n(o).remove(),
            n(i).each(function () {
                var r = n(this),
                    i = u(r),
                    f = { relatedTarget: this };
                i.hasClass("open") && (i.trigger((t = n.Event("hide.bs.dropdown", f))), t.isDefaultPrevented() || (r.attr("aria-expanded", "false"), i.removeClass("open").trigger("hidden.bs.dropdown", f)));
            }));
    }
    function u(t) {
        var i = t.attr("data-target"),
            r;
        return i || ((i = t.attr("href")), (i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""))), (r = i && n(i)), r && r.length ? r : t.parent();
    }
    function e(i) {
        return this.each(function () {
            var r = n(this),
                u = r.data("bs.dropdown");
            u || r.data("bs.dropdown", (u = new t(this)));
            "string" == typeof i && u[i].call(r);
        });
    }
    var o = ".dropdown-backdrop",
        i = '[data-toggle="dropdown"]',
        t = function (t) {
            n(t).on("click.bs.dropdown", this.toggle);
        },
        f;
    t.VERSION = "3.3.2";
    t.prototype.toggle = function (t) {
        var f = n(this),
            i,
            o,
            e;
        if (!f.is(".disabled, :disabled")) {
            if (((i = u(f)), (o = i.hasClass("open")), r(), !o)) {
                if (
                    ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && n('<div class="dropdown-backdrop"/>').insertAfter(n(this)).on("click", r),
                    (e = { relatedTarget: this }),
                    i.trigger((t = n.Event("show.bs.dropdown", e))),
                    t.isDefaultPrevented())
                )
                    return;
                f.trigger("focus").attr("aria-expanded", "true");
                i.toggleClass("open").trigger("shown.bs.dropdown", e);
            }
            return !1;
        }
    };
    t.prototype.keydown = function (t) {
        var e, o, s, h, f, r;
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName) && ((e = n(this)), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
            if (((o = u(e)), (s = o.hasClass("open")), (!s && 27 != t.which) || (s && 27 == t.which))) return 27 == t.which && o.find(i).trigger("focus"), e.trigger("click");
            h = " li:not(.divider):visible a";
            f = o.find('[role="menu"]' + h + ', [role="listbox"]' + h);
            f.length && ((r = f.index(t.target)), 38 == t.which && r > 0 && r--, 40 == t.which && r < f.length - 1 && r++, ~r || (r = 0), f.eq(r).trigger("focus"));
        }
    };
    f = n.fn.dropdown;
    n.fn.dropdown = e;
    n.fn.dropdown.Constructor = t;
    n.fn.dropdown.noConflict = function () {
        return (n.fn.dropdown = f), this;
    };
    n(document)
        .on("click.bs.dropdown.data-api", r)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (n) {
            n.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", i, t.prototype.toggle)
        .on("keydown.bs.dropdown.data-api", i, t.prototype.keydown)
        .on("keydown.bs.dropdown.data-api", '[role="menu"]', t.prototype.keydown)
        .on("keydown.bs.dropdown.data-api", '[role="listbox"]', t.prototype.keydown);
})(jQuery);
+(function (n) {
    "use strict";
    function i(i, r) {
        return this.each(function () {
            var f = n(this),
                u = f.data("bs.modal"),
                e = n.extend({}, t.DEFAULTS, f.data(), "object" == typeof i && i);
            u || f.data("bs.modal", (u = new t(this, e)));
            "string" == typeof i ? u[i](r) : e.show && u.show(r);
        });
    }
    var t = function (t, i) {
            this.options = i;
            this.$body = n(document.body);
            this.$element = n(t);
            this.$backdrop = this.isShown = null;
            this.scrollbarWidth = 0;
            this.options.remote &&
                this.$element.find(".modal-content").load(
                    this.options.remote,
                    n.proxy(function () {
                        this.$element.trigger("loaded.bs.modal");
                    }, this)
                );
        },
        r;
    t.VERSION = "3.3.2";
    t.TRANSITION_DURATION = 300;
    t.BACKDROP_TRANSITION_DURATION = 150;
    t.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 };
    t.prototype.toggle = function (n) {
        return this.isShown ? this.hide() : this.show(n);
    };
    t.prototype.show = function (i) {
        var r = this,
            u = n.Event("show.bs.modal", { relatedTarget: i });
        this.$element.trigger(u);
        this.isShown ||
            u.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.setScrollbar(),
            this.$body.addClass("modal-open"),
            this.escape(),
            this.resize(),
            this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this)),
            this.backdrop(function () {
                var f = n.support.transition && r.$element.hasClass("fade"),
                    u;
                r.$element.parent().length || r.$element.appendTo(r.$body);
                r.$element.show().scrollTop(0);
                r.options.backdrop && r.adjustBackdrop();
                r.adjustDialog();
                f && r.$element[0].offsetWidth;
                r.$element.addClass("in").attr("aria-hidden", !1);
                r.enforceFocus();
                u = n.Event("shown.bs.modal", { relatedTarget: i });
                f
                    ? r.$element
                          .find(".modal-dialog")
                          .one("bsTransitionEnd", function () {
                              r.$element.trigger("focus").trigger(u);
                          })
                          .emulateTransitionEnd(t.TRANSITION_DURATION)
                    : r.$element.trigger("focus").trigger(u);
            }));
    };
    t.prototype.hide = function (i) {
        i && i.preventDefault();
        i = n.Event("hide.bs.modal");
        this.$element.trigger(i);
        this.isShown &&
            !i.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            n(document).off("focusin.bs.modal"),
            this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
            n.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", n.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal());
    };
    t.prototype.enforceFocus = function () {
        n(document)
            .off("focusin.bs.modal")
            .on(
                "focusin.bs.modal",
                n.proxy(function (n) {
                    this.$element[0] === n.target || this.$element.has(n.target).length || this.$element.trigger("focus");
                }, this)
            );
    };
    t.prototype.escape = function () {
        this.isShown && this.options.keyboard
            ? this.$element.on(
                  "keydown.dismiss.bs.modal",
                  n.proxy(function (n) {
                      27 == n.which && this.hide();
                  }, this)
              )
            : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    };
    t.prototype.resize = function () {
        this.isShown ? n(window).on("resize.bs.modal", n.proxy(this.handleUpdate, this)) : n(window).off("resize.bs.modal");
    };
    t.prototype.hideModal = function () {
        var n = this;
        this.$element.hide();
        this.backdrop(function () {
            n.$body.removeClass("modal-open");
            n.resetAdjustments();
            n.resetScrollbar();
            n.$element.trigger("hidden.bs.modal");
        });
    };
    t.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };
    t.prototype.backdrop = function (i) {
        var e = this,
            f = this.$element.hasClass("fade") ? "fade" : "",
            r,
            u;
        if (this.isShown && this.options.backdrop) {
            if (
                ((r = n.support.transition && f),
                (this.$backdrop = n('<div class="modal-backdrop ' + f + '" />')
                    .prependTo(this.$element)
                    .on(
                        "click.dismiss.bs.modal",
                        n.proxy(function (n) {
                            n.target === n.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
                        }, this)
                    )),
                r && this.$backdrop[0].offsetWidth,
                this.$backdrop.addClass("in"),
                !i)
            )
                return;
            r ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i();
        } else
            !this.isShown && this.$backdrop
                ? (this.$backdrop.removeClass("in"),
                  (u = function () {
                      e.removeBackdrop();
                      i && i();
                  }),
                  n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", u).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : u())
                : i && i();
    };
    t.prototype.handleUpdate = function () {
        this.options.backdrop && this.adjustBackdrop();
        this.adjustDialog();
    };
    t.prototype.adjustBackdrop = function () {
        this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight);
    };
    t.prototype.adjustDialog = function () {
        var n = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({ paddingLeft: !this.bodyIsOverflowing && n ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !n ? this.scrollbarWidth : "" });
    };
    t.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: "", paddingRight: "" });
    };
    t.prototype.checkScrollbar = function () {
        this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight;
        this.scrollbarWidth = this.measureScrollbar();
    };
    t.prototype.setScrollbar = function () {
        var n = parseInt(this.$body.css("padding-right") || 0, 10);
        this.bodyIsOverflowing && this.$body.css("padding-right", n + this.scrollbarWidth);
    };
    t.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "");
    };
    t.prototype.measureScrollbar = function () {
        var n = document.createElement("div"),
            t;
        return (n.className = "modal-scrollbar-measure"), this.$body.append(n), (t = n.offsetWidth - n.clientWidth), this.$body[0].removeChild(n), t;
    };
    r = n.fn.modal;
    n.fn.modal = i;
    n.fn.modal.Constructor = t;
    n.fn.modal.noConflict = function () {
        return (n.fn.modal = r), this;
    };
    n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
        var r = n(this),
            f = r.attr("href"),
            u = n(r.attr("data-target") || (f && f.replace(/.*(?=#[^\s]+$)/, ""))),
            e = u.data("bs.modal") ? "toggle" : n.extend({ remote: !/#/.test(f) && f }, u.data(), r.data());
        r.is("a") && t.preventDefault();
        u.one("show.bs.modal", function (n) {
            n.isDefaultPrevented() ||
                u.one("hidden.bs.modal", function () {
                    r.is(":visible") && r.trigger("focus");
                });
        });
        i.call(u, e, this);
    });
})(jQuery);
+(function (n) {
    "use strict";
    function r(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.tooltip"),
                f = "object" == typeof i && i;
            (r || "destroy" != i) && (r || u.data("bs.tooltip", (r = new t(this, f))), "string" == typeof i && r[i]());
        });
    }
    var t = function (n, t) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
            this.init("tooltip", n, t);
        },
        i;
    t.VERSION = "3.3.2";
    t.TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
    };
    t.prototype.init = function (t, i, r) {
        var f, e, u, o, s;
        for (
            this.enabled = !0,
                this.type = t,
                this.$element = n(i),
                this.options = this.getOptions(r),
                this.$viewport = this.options.viewport && n(this.options.viewport.selector || this.options.viewport),
                f = this.options.trigger.split(" "),
                e = f.length;
            e--;

        )
            if (((u = f[e]), "click" == u)) this.$element.on("click." + this.type, this.options.selector, n.proxy(this.toggle, this));
            else
                "manual" != u &&
                    ((o = "hover" == u ? "mouseenter" : "focusin"),
                    (s = "hover" == u ? "mouseleave" : "focusout"),
                    this.$element.on(o + "." + this.type, this.options.selector, n.proxy(this.enter, this)),
                    this.$element.on(s + "." + this.type, this.options.selector, n.proxy(this.leave, this)));
        this.options.selector ? (this._options = n.extend({}, this.options, { trigger: "manual", selector: "" })) : this.fixTitle();
    };
    t.prototype.getDefaults = function () {
        return t.DEFAULTS;
    };
    t.prototype.getOptions = function (t) {
        return (t = n.extend({}, this.getDefaults(), this.$element.data(), t)), t.delay && "number" == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }), t;
    };
    t.prototype.getDelegateOptions = function () {
        var t = {},
            i = this.getDefaults();
        return (
            this._options &&
                n.each(this._options, function (n, r) {
                    i[n] != r && (t[n] = r);
                }),
            t
        );
    };
    t.prototype.enter = function (t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible")
            ? void (i.hoverState = "in")
            : (i || ((i = new this.constructor(t.currentTarget, this.getDelegateOptions())), n(t.currentTarget).data("bs." + this.type, i)),
              clearTimeout(i.timeout),
              (i.hoverState = "in"),
              i.options.delay && i.options.delay.show
                  ? void (i.timeout = setTimeout(function () {
                        "in" == i.hoverState && i.show();
                    }, i.options.delay.show))
                  : i.show());
    };
    t.prototype.leave = function (t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        return (
            i || ((i = new this.constructor(t.currentTarget, this.getDelegateOptions())), n(t.currentTarget).data("bs." + this.type, i)),
            clearTimeout(i.timeout),
            (i.hoverState = "out"),
            i.options.delay && i.options.delay.hide
                ? void (i.timeout = setTimeout(function () {
                      "out" == i.hoverState && i.hide();
                  }, i.options.delay.hide))
                : i.hide()
        );
    };
    t.prototype.show = function () {
        var c = n.Event("show.bs." + this.type),
            l,
            p,
            h;
        if (this.hasContent() && this.enabled) {
            if ((this.$element.trigger(c), (l = n.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])), c.isDefaultPrevented() || !l)) return;
            var u = this,
                r = this.tip(),
                a = this.getUID(this.type);
            this.setContent();
            r.attr("id", a);
            this.$element.attr("aria-describedby", a);
            this.options.animation && r.addClass("fade");
            var i = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                v = /\s?auto?\s?/i,
                y = v.test(i);
            y && (i = i.replace(v, "") || "top");
            r.detach()
                .css({ top: 0, left: 0, display: "block" })
                .addClass(i)
                .data("bs." + this.type, this);
            this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
            var f = this.getPosition(),
                o = r[0].offsetWidth,
                s = r[0].offsetHeight;
            if (y) {
                var w = i,
                    b = this.options.container ? n(this.options.container) : this.$element.parent(),
                    e = this.getPosition(b);
                i = "bottom" == i && f.bottom + s > e.bottom ? "top" : "top" == i && f.top - s < e.top ? "bottom" : "right" == i && f.right + o > e.width ? "left" : "left" == i && f.left - o < e.left ? "right" : i;
                r.removeClass(w).addClass(i);
            }
            p = this.getCalculatedOffset(i, f, o, s);
            this.applyPlacement(p, i);
            h = function () {
                var n = u.hoverState;
                u.$element.trigger("shown.bs." + u.type);
                u.hoverState = null;
                "out" == n && u.leave(u);
            };
            n.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", h).emulateTransitionEnd(t.TRANSITION_DURATION) : h();
        }
    };
    t.prototype.applyPlacement = function (t, i) {
        var r = this.tip(),
            l = r[0].offsetWidth,
            e = r[0].offsetHeight,
            o = parseInt(r.css("margin-top"), 10),
            s = parseInt(r.css("margin-left"), 10),
            h,
            f,
            u;
        isNaN(o) && (o = 0);
        isNaN(s) && (s = 0);
        t.top = t.top + o;
        t.left = t.left + s;
        n.offset.setOffset(
            r[0],
            n.extend(
                {
                    using: function (n) {
                        r.css({ top: Math.round(n.top), left: Math.round(n.left) });
                    },
                },
                t
            ),
            0
        );
        r.addClass("in");
        h = r[0].offsetWidth;
        f = r[0].offsetHeight;
        "top" == i && f != e && (t.top = t.top + e - f);
        u = this.getViewportAdjustedDelta(i, t, h, f);
        u.left ? (t.left += u.left) : (t.top += u.top);
        var c = /top|bottom/.test(i),
            a = c ? 2 * u.left - l + h : 2 * u.top - e + f,
            v = c ? "offsetWidth" : "offsetHeight";
        r.offset(t);
        this.replaceArrow(a, r[0][v], c);
    };
    t.prototype.replaceArrow = function (n, t, i) {
        this.arrow()
            .css(i ? "left" : "top", 50 * (1 - n / t) + "%")
            .css(i ? "top" : "left", "");
    };
    t.prototype.setContent = function () {
        var n = this.tip(),
            t = this.getTitle();
        n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
        n.removeClass("fade in top bottom left right");
    };
    t.prototype.hide = function (i) {
        function f() {
            "in" != r.hoverState && u.detach();
            r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type);
            i && i();
        }
        var r = this,
            u = this.tip(),
            e = n.Event("hide.bs." + this.type);
        return (
            this.$element.trigger(e),
            e.isDefaultPrevented() ? void 0 : (u.removeClass("in"), n.support.transition && this.$tip.hasClass("fade") ? u.one("bsTransitionEnd", f).emulateTransitionEnd(t.TRANSITION_DURATION) : f(), (this.hoverState = null), this)
        );
    };
    t.prototype.fixTitle = function () {
        var n = this.$element;
        (n.attr("title") || "string" != typeof n.attr("data-original-title")) && n.attr("data-original-title", n.attr("title") || "").attr("title", "");
    };
    t.prototype.hasContent = function () {
        return this.getTitle();
    };
    t.prototype.getPosition = function (t) {
        t = t || this.$element;
        var u = t[0],
            r = "BODY" == u.tagName,
            i = u.getBoundingClientRect();
        null == i.width && (i = n.extend({}, i, { width: i.right - i.left, height: i.bottom - i.top }));
        var f = r ? { top: 0, left: 0 } : t.offset(),
            e = { scroll: r ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop() },
            o = r ? { width: n(window).width(), height: n(window).height() } : null;
        return n.extend({}, i, e, o, f);
    };
    t.prototype.getCalculatedOffset = function (n, t, i, r) {
        return "bottom" == n
            ? { top: t.top + t.height, left: t.left + t.width / 2 - i / 2 }
            : "top" == n
            ? { top: t.top - r, left: t.left + t.width / 2 - i / 2 }
            : "left" == n
            ? { top: t.top + t.height / 2 - r / 2, left: t.left - i }
            : { top: t.top + t.height / 2 - r / 2, left: t.left + t.width };
    };
    t.prototype.getViewportAdjustedDelta = function (n, t, i, r) {
        var f = { top: 0, left: 0 },
            e,
            u,
            o,
            s,
            h,
            c;
        return this.$viewport
            ? ((e = (this.options.viewport && this.options.viewport.padding) || 0),
              (u = this.getPosition(this.$viewport)),
              /right|left/.test(n)
                  ? ((o = t.top - e - u.scroll), (s = t.top + e - u.scroll + r), o < u.top ? (f.top = u.top - o) : s > u.top + u.height && (f.top = u.top + u.height - s))
                  : ((h = t.left - e), (c = t.left + e + i), h < u.left ? (f.left = u.left - h) : c > u.width && (f.left = u.left + u.width - c)),
              f)
            : f;
    };
    t.prototype.getTitle = function () {
        var t = this.$element,
            n = this.options;
        return t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title);
    };
    t.prototype.getUID = function (n) {
        do n += ~~(1e6 * Math.random());
        while (document.getElementById(n));
        return n;
    };
    t.prototype.tip = function () {
        return (this.$tip = this.$tip || n(this.options.template));
    };
    t.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
    };
    t.prototype.enable = function () {
        this.enabled = !0;
    };
    t.prototype.disable = function () {
        this.enabled = !1;
    };
    t.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
    };
    t.prototype.toggle = function (t) {
        var i = this;
        t && ((i = n(t.currentTarget).data("bs." + this.type)), i || ((i = new this.constructor(t.currentTarget, this.getDelegateOptions())), n(t.currentTarget).data("bs." + this.type, i)));
        i.tip().hasClass("in") ? i.leave(i) : i.enter(i);
    };
    t.prototype.destroy = function () {
        var n = this;
        clearTimeout(this.timeout);
        this.hide(function () {
            n.$element.off("." + n.type).removeData("bs." + n.type);
        });
    };
    i = n.fn.tooltip;
    n.fn.tooltip = r;
    n.fn.tooltip.Constructor = t;
    n.fn.tooltip.noConflict = function () {
        return (n.fn.tooltip = i), this;
    };
})(jQuery);
+(function (n) {
    "use strict";
    function r(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.popover"),
                f = "object" == typeof i && i;
            (r || "destroy" != i) && (r || u.data("bs.popover", (r = new t(this, f))), "string" == typeof i && r[i]());
        });
    }
    var t = function (n, t) {
            this.init("popover", n, t);
        },
        i;
    if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.3.2";
    t.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
    });
    t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype);
    t.prototype.constructor = t;
    t.prototype.getDefaults = function () {
        return t.DEFAULTS;
    };
    t.prototype.setContent = function () {
        var n = this.tip(),
            i = this.getTitle(),
            t = this.getContent();
        n.find(".popover-title")[this.options.html ? "html" : "text"](i);
        n.find(".popover-content").children().detach().end()[this.options.html ? ("string" == typeof t ? "html" : "append") : "text"](t);
        n.removeClass("fade top bottom left right in");
        n.find(".popover-title").html() || n.find(".popover-title").hide();
    };
    t.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
    };
    t.prototype.getContent = function () {
        var t = this.$element,
            n = this.options;
        return t.attr("data-content") || ("function" == typeof n.content ? n.content.call(t[0]) : n.content);
    };
    t.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
    };
    t.prototype.tip = function () {
        return this.$tip || (this.$tip = n(this.options.template)), this.$tip;
    };
    i = n.fn.popover;
    n.fn.popover = r;
    n.fn.popover.Constructor = t;
    n.fn.popover.noConflict = function () {
        return (n.fn.popover = i), this;
    };
})(jQuery);
+(function (n) {
    "use strict";
    function t(i, r) {
        var u = n.proxy(this.process, this);
        this.$body = n("body");
        this.$scrollElement = n(n(i).is("body") ? window : i);
        this.options = n.extend({}, t.DEFAULTS, r);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", u);
        this.refresh();
        this.process();
    }
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.scrollspy"),
                f = "object" == typeof i && i;
            r || u.data("bs.scrollspy", (r = new t(this, f)));
            "string" == typeof i && r[i]();
        });
    }
    t.VERSION = "3.3.2";
    t.DEFAULTS = { offset: 10 };
    t.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    };
    t.prototype.refresh = function () {
        var i = "offset",
            r = 0,
            t;
        n.isWindow(this.$scrollElement[0]) || ((i = "position"), (r = this.$scrollElement.scrollTop()));
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        t = this;
        this.$body
            .find(this.selector)
            .map(function () {
                var f = n(this),
                    u = f.data("target") || f.attr("href"),
                    t = /^#./.test(u) && n(u);
                return (t && t.length && t.is(":visible") && [[t[i]().top + r, u]]) || null;
            })
            .sort(function (n, t) {
                return n[0] - t[0];
            })
            .each(function () {
                t.offsets.push(this[0]);
                t.targets.push(this[1]);
            });
    };
    t.prototype.process = function () {
        var n,
            i = this.$scrollElement.scrollTop() + this.options.offset,
            f = this.getScrollHeight(),
            e = this.options.offset + f - this.$scrollElement.height(),
            t = this.offsets,
            r = this.targets,
            u = this.activeTarget;
        if ((this.scrollHeight != f && this.refresh(), i >= e)) return u != (n = r[r.length - 1]) && this.activate(n);
        if (u && i < t[0]) return (this.activeTarget = null), this.clear();
        for (n = t.length; n--; ) u != r[n] && i >= t[n] && (!t[n + 1] || i <= t[n + 1]) && this.activate(r[n]);
    };
    t.prototype.activate = function (t) {
        this.activeTarget = t;
        this.clear();
        var r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = n(r).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active"));
        i.trigger("activate.bs.scrollspy");
    };
    t.prototype.clear = function () {
        n(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var r = n.fn.scrollspy;
    n.fn.scrollspy = i;
    n.fn.scrollspy.Constructor = t;
    n.fn.scrollspy.noConflict = function () {
        return (n.fn.scrollspy = r), this;
    };
    n(window).on("load.bs.scrollspy.data-api", function () {
        n('[data-spy="scroll"]').each(function () {
            var t = n(this);
            i.call(t, t.data());
        });
    });
})(jQuery);
+(function (n) {
    "use strict";
    function r(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.tab");
            r || u.data("bs.tab", (r = new t(this)));
            "string" == typeof i && r[i]();
        });
    }
    var t = function (t) {
            this.element = n(t);
        },
        u,
        i;
    t.VERSION = "3.3.2";
    t.TRANSITION_DURATION = 150;
    t.prototype.show = function () {
        var t = this.element,
            f = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target"),
            u;
        if ((i || ((i = t.attr("href")), (i = i && i.replace(/.*(?=#[^\s]*$)/, ""))), !t.parent("li").hasClass("active"))) {
            var r = f.find(".active:last a"),
                e = n.Event("hide.bs.tab", { relatedTarget: t[0] }),
                o = n.Event("show.bs.tab", { relatedTarget: r[0] });
            (r.trigger(e), t.trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented()) ||
                ((u = n(i)),
                this.activate(t.closest("li"), f),
                this.activate(u, u.parent(), function () {
                    r.trigger({ type: "hidden.bs.tab", relatedTarget: t[0] });
                    t.trigger({ type: "shown.bs.tab", relatedTarget: r[0] });
                }));
        }
    };
    t.prototype.activate = function (i, r, u) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
            o ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade");
            i.parent(".dropdown-menu") && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
            u && u();
        }
        var f = r.find("> .active"),
            o = u && n.support.transition && ((f.length && f.hasClass("fade")) || !!r.find("> .fade").length);
        f.length && o ? f.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e();
        f.removeClass("in");
    };
    u = n.fn.tab;
    n.fn.tab = r;
    n.fn.tab.Constructor = t;
    n.fn.tab.noConflict = function () {
        return (n.fn.tab = u), this;
    };
    i = function (t) {
        t.preventDefault();
        r.call(n(this), "show");
    };
    n(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i);
})(jQuery);
+(function (n) {
    "use strict";
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.affix"),
                f = "object" == typeof i && i;
            r || u.data("bs.affix", (r = new t(this, f)));
            "string" == typeof i && r[i]();
        });
    }
    var t = function (i, r) {
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$target = n(this.options.target).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
            this.$element = n(i);
            this.affixed = this.unpin = this.pinnedOffset = null;
            this.checkPosition();
        },
        r;
    t.VERSION = "3.3.2";
    t.RESET = "affix affix-top affix-bottom";
    t.DEFAULTS = { offset: 0, target: window };
    t.prototype.getState = function (n, t, i, r) {
        var u = this.$target.scrollTop(),
            f = this.$element.offset(),
            e = this.$target.height();
        if (null != i && "top" == this.affixed) return i > u ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? (u + this.unpin <= f.top ? !1 : "bottom") : n - r >= u + e ? !1 : "bottom";
        var o = null == this.affixed,
            s = o ? u : f.top,
            h = o ? e : t;
        return null != i && i >= u ? "top" : null != r && s + h >= n - r ? "bottom" : !1;
    };
    t.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var n = this.$target.scrollTop(),
            i = this.$element.offset();
        return (this.pinnedOffset = i.top - n);
    };
    t.prototype.checkPositionWithEventLoop = function () {
        setTimeout(n.proxy(this.checkPosition, this), 1);
    };
    t.prototype.checkPosition = function () {
        var i, e, o;
        if (this.$element.is(":visible")) {
            var s = this.$element.height(),
                r = this.options.offset,
                f = r.top,
                u = r.bottom,
                h = n("body").height();
            if (("object" != typeof r && (u = f = r), "function" == typeof f && (f = r.top(this.$element)), "function" == typeof u && (u = r.bottom(this.$element)), (i = this.getState(h, s, f, u)), this.affixed != i)) {
                if ((null != this.unpin && this.$element.css("top", ""), (e = "affix" + (i ? "-" + i : "")), (o = n.Event(e + ".bs.affix")), this.$element.trigger(o), o.isDefaultPrevented())) return;
                this.affixed = i;
                this.unpin = "bottom" == i ? this.getPinnedOffset() : null;
                this.$element
                    .removeClass(t.RESET)
                    .addClass(e)
                    .trigger(e.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == i && this.$element.offset({ top: h - s - u });
        }
    };
    r = n.fn.affix;
    n.fn.affix = i;
    n.fn.affix.Constructor = t;
    n.fn.affix.noConflict = function () {
        return (n.fn.affix = r), this;
    };
    n(window).on("load", function () {
        n('[data-spy="affix"]').each(function () {
            var r = n(this),
                t = r.data();
            t.offset = t.offset || {};
            null != t.offsetBottom && (t.offset.bottom = t.offsetBottom);
            null != t.offsetTop && (t.offset.top = t.offsetTop);
            i.call(r, t);
        });
    });
})(jQuery);
$(document).ready(function () {
    $("#txt-url").keypress(function (n) {
        n.which == 13 && (n.preventDefault(), analyze());
    });
    k_get_query !== undefined && k_get_query !== null && k_get_query !== "" && analyze();
    $.ajaxSetup({ cache: !0 });
    $.getScript("/js/common.min.js?v=21");
    $.getScript("/js/suggeser.js?v=3", function () {
        $.ajaxSetup({ cache: !1 });
    });
    $("#progress").on("show.bs.modal", function (n) {
        if (!k_data_vid || !k__id) return !1;
        var i = $(n.relatedTarget),
            t = i.data("ftype"),
            r = i.data("fquality");
        p_b ||
            ((p_b = !0),
            $(this).find(".modal-title").text(k_data_vtitle),
            $("#process-waiting").css("display", "block"),
            $("#process-result").empty(),
            $.ajax({
                type: "POST",
                url: k_convert_url,
                headers: { "X-Requested-Key": "de0cfuirtgf67a" },
                data: { v_id: k_data_vid, fquality: r, ftype: t, token: k__id, timeExpire: k_time, client: k_prefix_name },
                beforeSend: function () {
                    $("#formatSelect").addClass("hidden");
                    $("#btn-action").addClass("hidden");
                    $("#mesg-convert").removeClass("hidden");
                },
                success: function (n) {
                    n.c_status == "error"
                        ? setTimeout(function () {
                              window.location.reload();
                          }, 2e3)
                        : n.c_status == "ok" && typeof n.c_server != "undefined"
                        ? convert_Server(n.c_server, r, t)
                        : n.c_status == "ok" && typeof n.d_url != "undefined"
                        ? convertSuccess(n.d_url, t)
                        : setTimeout(function () {
                              window.location.reload();
                          }, 5e3);
                    p_b = !1;
                },
                error: function () {
                    p_b = !1;
                    renderFail(k_MessageError500);
                },
            }));
    });
});

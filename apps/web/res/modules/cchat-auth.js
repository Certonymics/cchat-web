//#region \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), t;
function n(e, t, n) {
	function r(n, r) {
		if (n._zod || Object.defineProperty(n, "_zod", {
			value: {
				def: r,
				constr: o,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: !1
		}), n._zod.traits.has(e)) return;
		n._zod.traits.add(e), t(n, r);
		let i = o.prototype, a = Object.keys(i);
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			t in n || (n[t] = i[t].bind(n));
		}
	}
	let i = n?.Parent ?? Object;
	class a extends i {}
	Object.defineProperty(a, "name", { value: e });
	function o(e) {
		var t;
		let i = n?.Parent ? new a() : this;
		r(i, e), (t = i._zod).deferred ?? (t.deferred = []);
		for (let e of i._zod.deferred) e();
		return i;
	}
	return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, { value: (t) => n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(o, "name", { value: e }), o;
}
var r = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, i = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(t = globalThis).__zod_globalConfig ?? (t.__zod_globalConfig = {});
var a = globalThis.__zod_globalConfig;
function o(e) {
	return e && Object.assign(a, e), a;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
function s(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function c(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function l(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
	} };
}
function u(e) {
	return e == null;
}
function d(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function f(e, t) {
	let n = e / t, r = Math.round(n), i = 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
var p = /* @__PURE__*/ Symbol("evaluating");
function m(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== p) return r === void 0 && (r = p, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function h(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function g(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function ee(e) {
	return JSON.stringify(e);
}
function te(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var ne = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function _(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var re = /* @__PURE__*/ l(() => {
	if (a.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function v(e) {
	if (_(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return _(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function ie(e) {
	return v(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
var ae = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function y(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function b(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function x(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function oe(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var se = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function ce(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return b(e, g(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return h(this, "shape", e), e;
		},
		checks: []
	}));
}
function le(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return b(e, g(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return h(this, "shape", r), r;
		},
		checks: []
	}));
}
function ue(e, t) {
	if (!v(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return b(e, g(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return h(this, "shape", n), n;
	} }));
}
function de(e, t) {
	if (!v(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return b(e, g(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return h(this, "shape", n), n;
	} }));
}
function fe(e, t) {
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return b(e, g(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return h(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function pe(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
	return b(t, g(t._zod.def, {
		get shape() {
			let r = t._zod.def.shape, i = { ...r };
			if (n) for (let t in n) {
				if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
				n[t] && (i[t] = e ? new e({
					type: "optional",
					innerType: r[t]
				}) : r[t]);
			}
			else for (let t in r) i[t] = e ? new e({
				type: "optional",
				innerType: r[t]
			}) : r[t];
			return h(this, "shape", i), i;
		},
		checks: []
	}));
}
function me(e, t, n) {
	return b(t, g(t._zod.def, { get shape() {
		let r = t._zod.def.shape, i = { ...r };
		if (n) for (let t in n) {
			if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
			n[t] && (i[t] = new e({
				type: "nonoptional",
				innerType: r[t]
			}));
		}
		else for (let t in r) i[t] = new e({
			type: "nonoptional",
			innerType: r[t]
		});
		return h(this, "shape", i), i;
	} }));
}
function S(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function he(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function ge(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function C(e) {
	return typeof e == "string" ? e : e?.message;
}
function w(e, t, n) {
	let r = e.message ? e.message : C(e.inst?._zod.def?.error?.(e)) ?? C(t?.error?.(e)) ?? C(n.customError?.(e)) ?? C(n.localeError?.(e)) ?? "Invalid input", { inst: i, continue: a, input: o, ...s } = e;
	return s.path ??= [], s.message = r, t?.reportInput && (s.input = o), s;
}
function _e(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function T(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
var ve = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, c, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, ye = n("$ZodError", ve), be = n("$ZodError", ve, { Parent: Error });
function xe(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Se(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i];
					i === e.length - 1 ? (r[n] = r[n] || { _errors: [] }, r[n]._errors.push(t(a))) : r[n] = r[n] || { _errors: [] }, r = r[n], i++;
				}
			}
		}
	};
	return r(e), n;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
var Ce = (e) => (t, n, i, a) => {
	let s = i ? {
		...i,
		async: !1
	} : { async: !1 }, c = t._zod.run({
		value: n,
		issues: []
	}, s);
	if (c instanceof Promise) throw new r();
	if (c.issues.length) {
		let t = new ((a?.Err) ?? e)(c.issues.map((e) => w(e, s, o())));
		throw ne(t, a?.callee), t;
	}
	return c.value;
}, we = (e) => async (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !0
	} : { async: !0 }, s = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (s instanceof Promise && (s = await s), s.issues.length) {
		let t = new ((i?.Err) ?? e)(s.issues.map((e) => w(e, a, o())));
		throw ne(t, i?.callee), t;
	}
	return s.value;
}, E = (e) => (t, n, i) => {
	let a = i ? {
		...i,
		async: !1
	} : { async: !1 }, s = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (s instanceof Promise) throw new r();
	return s.issues.length ? {
		success: !1,
		error: new (e ?? ye)(s.issues.map((e) => w(e, a, o())))
	} : {
		success: !0,
		data: s.value
	};
}, Te = /* @__PURE__*/ E(be), D = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => w(e, i, o())))
	} : {
		success: !0,
		data: a.value
	};
}, Ee = /* @__PURE__*/ D(be), De = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Ce(e)(t, n, i);
}, Oe = (e) => (t, n, r) => Ce(e)(t, n, r), ke = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return we(e)(t, n, i);
}, Ae = (e) => async (t, n, r) => we(e)(t, n, r), je = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return E(e)(t, n, i);
}, Me = (e) => (t, n, r) => E(e)(t, n, r), Ne = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return D(e)(t, n, i);
}, Pe = (e) => async (t, n, r) => D(e)(t, n, r), Fe = /^[cC][0-9a-z]{6,}$/, Ie = /^[0-9a-z]+$/, Le = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Re = /^[0-9a-vA-V]{20}$/, ze = /^[A-Za-z0-9]{27}$/, Be = /^[a-zA-Z0-9_-]{21}$/, Ve = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, He = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Ue = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, We = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Ge = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Ke() {
	return new RegExp(Ge, "u");
}
var qe = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Je = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Ye = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Xe = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Ze = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Qe = /^[A-Za-z0-9_-]*$/, $e = /^https?$/, et = /^\+[1-9]\d{6,14}$/, tt = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", nt = /*@__PURE__*/ RegExp(`^${tt}$`);
function rt(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function it(e) {
	return RegExp(`^${rt(e)}$`);
}
function at(e) {
	let t = rt({ precision: e.precision }), n = ["Z"];
	e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let r = `${t}(?:${n.join("|")})`;
	return RegExp(`^${tt}T(?:${r})$`);
}
var ot = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, st = /^-?\d+$/, ct = /^-?\d+(?:\.\d+)?$/, lt = /^(?:true|false)$/i, ut = /^[^A-Z]*$/, dt = /^[^a-z]*$/, O = /*@__PURE__*/ n("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), ft = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, pt = /*@__PURE__*/ n("$ZodCheckLessThan", (e, t) => {
	O.init(e, t);
	let n = ft[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
		t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), mt = /*@__PURE__*/ n("$ZodCheckGreaterThan", (e, t) => {
	O.init(e, t);
	let n = ft[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
		t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), ht = /*@__PURE__*/ n("$ZodCheckMultipleOf", (e, t) => {
	O.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : f(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), gt = /*@__PURE__*/ n("$ZodCheckNumberFormat", (e, t) => {
	O.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = se[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = st);
	}), e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), _t = /*@__PURE__*/ n("$ZodCheckMaxLength", (e, t) => {
	var n;
	O.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !u(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = _e(r);
		n.issues.push({
			origin: i,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), vt = /*@__PURE__*/ n("$ZodCheckMinLength", (e, t) => {
	var n;
	O.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !u(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = _e(r);
		n.issues.push({
			origin: i,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), yt = /*@__PURE__*/ n("$ZodCheckLengthEquals", (e, t) => {
	var n;
	O.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !u(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = _e(r), o = i > t.length;
		n.issues.push({
			origin: a,
			...o ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), k = /*@__PURE__*/ n("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	O.init(e, t), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
	}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), bt = /*@__PURE__*/ n("$ZodCheckRegex", (e, t) => {
	k.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), xt = /*@__PURE__*/ n("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= ut, k.init(e, t);
}), St = /*@__PURE__*/ n("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= dt, k.init(e, t);
}), Ct = /*@__PURE__*/ n("$ZodCheckIncludes", (e, t) => {
	O.init(e, t);
	let n = y(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
	t.pattern = r, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(r);
	}), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), wt = /*@__PURE__*/ n("$ZodCheckStartsWith", (e, t) => {
	O.init(e, t);
	let n = RegExp(`^${y(t.prefix)}.*`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Tt = /*@__PURE__*/ n("$ZodCheckEndsWith", (e, t) => {
	O.init(e, t);
	let n = RegExp(`.*${y(t.suffix)}$`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Et = /*@__PURE__*/ n("$ZodCheckOverwrite", (e, t) => {
	O.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), Dt = class {
	constructor(e = []) {
		this.content = [], this.indent = 0, this && (this.args = e);
	}
	indented(e) {
		this.indent += 1, e(this), --this.indent;
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.args, n = [...(this?.content ?? [""]).map((e) => `  ${e}`)];
		return new e(...t, n.join("\n"));
	}
}, Ot = {
	major: 4,
	minor: 4,
	patch: 3
}, A = /*@__PURE__*/ n("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Ot;
	let i = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && i.unshift(e);
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let i = S(e), a;
			for (let o of t) {
				if (o._zod.def.when) {
					if (he(e) || !o._zod.def.when(e)) continue;
				} else if (i) continue;
				let t = e.issues.length, s = o._zod.check(e);
				if (s instanceof Promise && n?.async === !1) throw new r();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, e.issues.length !== t && (i ||= S(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					i ||= S(e, t);
				}
			}
			return a ? a.then(() => e) : e;
		}, n = (n, a, o) => {
			if (S(n)) return n.aborted = !0, n;
			let s = t(a, i, o);
			if (s instanceof Promise) {
				if (o.async === !1) throw new r();
				return s.then((t) => e._zod.parse(t, o));
			}
			return e._zod.parse(s, o);
		};
		e._zod.run = (a, o) => {
			if (o.skipChecks) return e._zod.parse(a, o);
			if (o.direction === "backward") {
				let t = e._zod.parse({
					value: a.value,
					issues: []
				}, {
					...o,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, a, o)) : n(t, a, o);
			}
			let s = e._zod.parse(a, o);
			if (s instanceof Promise) {
				if (o.async === !1) throw new r();
				return s.then((e) => t(e, i, o));
			}
			return t(s, i, o);
		};
	}
	m(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = Te(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return Ee(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), kt = /*@__PURE__*/ n("$ZodString", (e, t) => {
	A.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? ot(e._zod.bag), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), j = /*@__PURE__*/ n("$ZodStringFormat", (e, t) => {
	k.init(e, t), kt.init(e, t);
}), At = /*@__PURE__*/ n("$ZodGUID", (e, t) => {
	t.pattern ??= He, j.init(e, t);
}), jt = /*@__PURE__*/ n("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= Ue(e);
	} else t.pattern ??= Ue();
	j.init(e, t);
}), Mt = /*@__PURE__*/ n("$ZodEmail", (e, t) => {
	t.pattern ??= We, j.init(e, t);
}), Nt = /*@__PURE__*/ n("$ZodURL", (e, t) => {
	j.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim();
			if (!t.normalize && t.protocol?.source === $e.source && !/^https?:\/\//i.test(r)) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			let i = new URL(r);
			t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(i.hostname) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(i.protocol.endsWith(":") ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), n.value = t.normalize ? i.href : r;
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), Pt = /*@__PURE__*/ n("$ZodEmoji", (e, t) => {
	t.pattern ??= Ke(), j.init(e, t);
}), Ft = /*@__PURE__*/ n("$ZodNanoID", (e, t) => {
	t.pattern ??= Be, j.init(e, t);
}), It = /*@__PURE__*/ n("$ZodCUID", (e, t) => {
	t.pattern ??= Fe, j.init(e, t);
}), Lt = /*@__PURE__*/ n("$ZodCUID2", (e, t) => {
	t.pattern ??= Ie, j.init(e, t);
}), Rt = /*@__PURE__*/ n("$ZodULID", (e, t) => {
	t.pattern ??= Le, j.init(e, t);
}), zt = /*@__PURE__*/ n("$ZodXID", (e, t) => {
	t.pattern ??= Re, j.init(e, t);
}), Bt = /*@__PURE__*/ n("$ZodKSUID", (e, t) => {
	t.pattern ??= ze, j.init(e, t);
}), Vt = /*@__PURE__*/ n("$ZodISODateTime", (e, t) => {
	t.pattern ??= at(t), j.init(e, t);
}), Ht = /*@__PURE__*/ n("$ZodISODate", (e, t) => {
	t.pattern ??= nt, j.init(e, t);
}), Ut = /*@__PURE__*/ n("$ZodISOTime", (e, t) => {
	t.pattern ??= it(t), j.init(e, t);
}), Wt = /*@__PURE__*/ n("$ZodISODuration", (e, t) => {
	t.pattern ??= Ve, j.init(e, t);
}), Gt = /*@__PURE__*/ n("$ZodIPv4", (e, t) => {
	t.pattern ??= qe, j.init(e, t), e._zod.bag.format = "ipv4";
}), Kt = /*@__PURE__*/ n("$ZodIPv6", (e, t) => {
	t.pattern ??= Je, j.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
		try {
			new URL(`http://[${n.value}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), qt = /*@__PURE__*/ n("$ZodCIDRv4", (e, t) => {
	t.pattern ??= Ye, j.init(e, t);
}), Jt = /*@__PURE__*/ n("$ZodCIDRv6", (e, t) => {
	t.pattern ??= Xe, j.init(e, t), e._zod.check = (n) => {
		let r = n.value.split("/");
		try {
			if (r.length !== 2) throw Error();
			let [e, t] = r;
			if (!t) throw Error();
			let n = Number(t);
			if (`${n}` !== t || n < 0 || n > 128) throw Error();
			new URL(`http://[${e}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
});
function Yt(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var Xt = /*@__PURE__*/ n("$ZodBase64", (e, t) => {
	t.pattern ??= Ze, j.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
		Yt(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function Zt(e) {
	if (!Qe.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return Yt(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var Qt = /*@__PURE__*/ n("$ZodBase64URL", (e, t) => {
	t.pattern ??= Qe, j.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
		Zt(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), $t = /*@__PURE__*/ n("$ZodE164", (e, t) => {
	t.pattern ??= et, j.init(e, t);
});
function en(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var tn = /*@__PURE__*/ n("$ZodJWT", (e, t) => {
	j.init(e, t), e._zod.check = (n) => {
		en(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), nn = /*@__PURE__*/ n("$ZodNumber", (e, t) => {
	A.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? ct, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), rn = /*@__PURE__*/ n("$ZodNumberFormat", (e, t) => {
	gt.init(e, t), nn.init(e, t);
}), an = /*@__PURE__*/ n("$ZodBoolean", (e, t) => {
	A.init(e, t), e._zod.pattern = lt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), on = /*@__PURE__*/ n("$ZodUnknown", (e, t) => {
	A.init(e, t), e._zod.parse = (e) => e;
}), sn = /*@__PURE__*/ n("$ZodNever", (e, t) => {
	A.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function cn(e, t, n) {
	e.issues.length && t.issues.push(...ge(n, e.issues)), t.value[n] = e.value;
}
var ln = /*@__PURE__*/ n("$ZodArray", (e, t) => {
	A.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!Array.isArray(i)) return n.issues.push({
			expected: "array",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		n.value = Array(i.length);
		let a = [];
		for (let e = 0; e < i.length; e++) {
			let o = i[e], s = t.element._zod.run({
				value: o,
				issues: []
			}, r);
			s instanceof Promise ? a.push(s.then((t) => cn(t, n, e))) : cn(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function M(e, t, n, r, i, a) {
	let o = n in r;
	if (e.issues.length) {
		if (i && a && !o) return;
		t.issues.push(...ge(n, e.issues));
	}
	if (!o && !i) {
		e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		});
		return;
	}
	e.value === void 0 ? o && (t.value[n] = void 0) : t.value[n] = e.value;
}
function un(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = oe(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function dn(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optin === "optional", d = c.optout === "optional";
	for (let i in t) {
		if (i === "__proto__" || s.has(i)) continue;
		if (l === "never") {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => M(e, n, i, t, u, d))) : M(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var fn = /*@__PURE__*/ n("$ZodObject", (e, t) => {
	if (A.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = l(() => un(t));
	m(e._zod, "propValues", () => {
		let e = t.shape, n = {};
		for (let t in e) {
			let r = e[t]._zod;
			if (r.values) {
				n[t] ?? (n[t] = /* @__PURE__ */ new Set());
				for (let e of r.values) n[t].add(e);
			}
		}
		return n;
	});
	let r = _, i = t.catchall, a;
	e._zod.parse = (t, o) => {
		a ??= n.value;
		let s = t.value;
		if (!r(s)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: s,
			inst: e
		}), t;
		t.value = {};
		let c = [], l = a.shape;
		for (let e of a.keys) {
			let n = l[e], r = n._zod.optin === "optional", i = n._zod.optout === "optional", a = n._zod.run({
				value: s[e],
				issues: []
			}, o);
			a instanceof Promise ? c.push(a.then((n) => M(n, t, e, s, r, i))) : M(a, t, e, s, r, i);
		}
		return i ? dn(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), pn = /*@__PURE__*/ n("$ZodObjectJIT", (e, t) => {
	fn.init(e, t);
	let n = e._zod.parse, r = l(() => un(t)), i = (e) => {
		let t = new Dt([
			"shape",
			"payload",
			"ctx"
		]), n = r.value, i = (e) => {
			let t = ee(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write("const input = payload.value;");
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write("const newResult = {};");
		for (let r of n.keys) {
			let n = a[r], o = ee(r), s = e[r], c = s?._zod?.optin === "optional", l = s?._zod?.optout === "optional";
			t.write(`const ${n} = ${i(r)};`), c && l ? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : c ? t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : t.write(`
        const ${n}_present = ${o} in input;
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o}]
          });
        }

        if (${n}_present) {
          if (${n}.value === undefined) {
            newResult[${o}] = undefined;
          } else {
            newResult[${o}] = ${n}.value;
          }
        }

      `);
		}
		t.write("payload.value = newResult;"), t.write("return payload;");
		let s = t.compile();
		return (t, n) => s(e, t, n);
	}, o, s = _, c = !a.jitless, u = c && re.value, d = t.catchall, f;
	e._zod.parse = (a, l) => {
		f ??= r.value;
		let p = a.value;
		return s(p) ? c && u && l?.async === !1 && l.jitless !== !0 ? (o ||= i(t.shape), a = o(a, l), d ? dn([], p, a, l, f, e) : a) : n(a, l) : (a.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), a);
	};
});
function mn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !S(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => w(e, r, o())))
	}), t);
}
var hn = /*@__PURE__*/ n("$ZodUnion", (e, t) => {
	A.init(e, t), m(e._zod, "optin", () => t.options.some((e) => e._zod.optin === "optional") ? "optional" : void 0), m(e._zod, "optout", () => t.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), m(e._zod, "values", () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), m(e._zod, "pattern", () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => d(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => mn(t, r, e, i)) : mn(o, r, e, i);
	};
}), gn = /*@__PURE__*/ n("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, hn.init(e, t);
	let n = e._zod.parse;
	m(e._zod, "propValues", () => {
		let e = {};
		for (let n of t.options) {
			let r = n._zod.propValues;
			if (!r || Object.keys(r).length === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
			for (let [t, n] of Object.entries(r)) {
				e[t] || (e[t] = /* @__PURE__ */ new Set());
				for (let r of n) e[t].add(r);
			}
		}
		return e;
	});
	let r = l(() => {
		let e = t.options, n = /* @__PURE__ */ new Map();
		for (let r of e) {
			let e = r._zod.propValues?.[t.discriminator];
			if (!e || e.size === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
			for (let t of e) {
				if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
				n.set(t, r);
			}
		}
		return n;
	});
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!_(o)) return i.issues.push({
			code: "invalid_type",
			expected: "object",
			input: o,
			inst: e
		}), i;
		let s = r.value.get(o?.[t.discriminator]);
		return s ? s._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), _n = /*@__PURE__*/ n("$ZodIntersection", (e, t) => {
	A.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => yn(e, t, n)) : yn(e, i, a);
	};
});
function vn(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (v(e) && v(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = vn(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = vn(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function yn(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i;
	for (let n of t.issues) if (n.code === "unrecognized_keys") {
		i ??= n;
		for (let e of n.keys) r.has(e) || r.set(e, {}), r.get(e).l = !0;
	} else e.issues.push(n);
	for (let t of n.issues) if (t.code === "unrecognized_keys") for (let e of t.keys) r.has(e) || r.set(e, {}), r.get(e).r = !0;
	else e.issues.push(t);
	let a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (a.length && i && e.issues.push({
		...i,
		keys: a
	}), S(e)) return e;
	let o = vn(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
var bn = /*@__PURE__*/ n("$ZodEnum", (e, t) => {
	A.init(e, t);
	let n = s(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => ae.has(typeof e)).map((e) => typeof e == "string" ? y(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), xn = /*@__PURE__*/ n("$ZodLiteral", (e, t) => {
	if (A.init(e, t), t.values.length === 0) throw Error("Cannot create literal schema with no valid values");
	let n = new Set(t.values);
	e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e) => typeof e == "string" ? y(e) : e ? y(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), Sn = /*@__PURE__*/ n("$ZodTransform", (e, t) => {
	A.init(e, t), e._zod.optin = "optional", e._zod.parse = (n, a) => {
		if (a.direction === "backward") throw new i(e.constructor.name);
		let o = t.transform(n.value, n);
		if (a.async) return (o instanceof Promise ? o : Promise.resolve(o)).then((e) => (n.value = e, n.fallback = !0, n));
		if (o instanceof Promise) throw new r();
		return n.value = o, n.fallback = !0, n;
	};
});
function Cn(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? {
		issues: [],
		value: void 0
	} : e;
}
var wn = /*@__PURE__*/ n("$ZodOptional", (e, t) => {
	A.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", m(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), m(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${d(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = e.value, i = t.innerType._zod.run(e, n);
			return i instanceof Promise ? i.then((e) => Cn(e, r)) : Cn(i, r);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), Tn = /*@__PURE__*/ n("$ZodExactOptional", (e, t) => {
	wn.init(e, t), m(e._zod, "values", () => t.innerType._zod.values), m(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), En = /*@__PURE__*/ n("$ZodNullable", (e, t) => {
	A.init(e, t), m(e._zod, "optin", () => t.innerType._zod.optin), m(e._zod, "optout", () => t.innerType._zod.optout), m(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${d(e.source)}|null)$`) : void 0;
	}), m(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Dn = /*@__PURE__*/ n("$ZodDefault", (e, t) => {
	A.init(e, t), e._zod.optin = "optional", m(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => On(e, t)) : On(r, t);
	};
});
function On(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var kn = /*@__PURE__*/ n("$ZodPrefault", (e, t) => {
	A.init(e, t), e._zod.optin = "optional", m(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), An = /*@__PURE__*/ n("$ZodNonOptional", (e, t) => {
	A.init(e, t), m(e._zod, "values", () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => jn(t, e)) : jn(i, e);
	};
});
function jn(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var Mn = /*@__PURE__*/ n("$ZodCatch", (e, t) => {
	A.init(e, t), e._zod.optin = "optional", m(e._zod, "optout", () => t.innerType._zod.optout), m(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => w(e, n, o())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => w(e, n, o())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e);
	};
}), Nn = /*@__PURE__*/ n("$ZodPipe", (e, t) => {
	A.init(e, t), m(e._zod, "values", () => t.in._zod.values), m(e._zod, "optin", () => t.in._zod.optin), m(e._zod, "optout", () => t.out._zod.optout), m(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => N(e, t.in, n)) : N(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => N(e, t.out, n)) : N(r, t.out, n);
	};
});
function N(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues,
		fallback: e.fallback
	}, n);
}
var Pn = /*@__PURE__*/ n("$ZodReadonly", (e, t) => {
	A.init(e, t), m(e._zod, "propValues", () => t.innerType._zod.propValues), m(e._zod, "values", () => t.innerType._zod.values), m(e._zod, "optin", () => t.innerType?._zod?.optin), m(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Fn) : Fn(r);
	};
});
function Fn(e) {
	return e.value = Object.freeze(e.value), e;
}
var In = /*@__PURE__*/ n("$ZodCustom", (e, t) => {
	O.init(e, t), A.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => Ln(t, n, r, e));
		Ln(i, n, r, e);
	};
});
function Ln(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(T(e));
	}
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
var Rn, zn = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function Bn() {
	return new zn();
}
(Rn = globalThis).__zod_globalRegistry ?? (Rn.__zod_globalRegistry = Bn());
var P = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function Vn(e, t) {
	return new e({
		type: "string",
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Hn(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Un(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wn(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Gn(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Kn(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qn(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Jn(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Yn(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xn(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Zn(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Qn(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $n(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function er(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function tr(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function nr(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rr(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ir(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ar(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lr(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ur(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function dr(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fr(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function pr(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mr(e, t) {
	return new e({
		type: "number",
		checks: [],
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hr(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gr(e, t) {
	return new e({
		type: "boolean",
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _r(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function vr(e, t) {
	return new e({
		type: "never",
		...x(t)
	});
}
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new pt({
		check: "less_than",
		...x(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return new pt({
		check: "less_than",
		...x(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new mt({
		check: "greater_than",
		...x(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new mt({
		check: "greater_than",
		...x(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
	return new ht({
		check: "multiple_of",
		...x(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new _t({
		check: "max_length",
		...x(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function F(e, t) {
	return new vt({
		check: "min_length",
		...x(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Tr(e, t) {
	return new yt({
		check: "length_equals",
		...x(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function Er(e, t) {
	return new bt({
		check: "string_format",
		format: "regex",
		...x(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Dr(e) {
	return new xt({
		check: "string_format",
		format: "lowercase",
		...x(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Or(e) {
	return new St({
		check: "string_format",
		format: "uppercase",
		...x(e)
	});
}
// @__NO_SIDE_EFFECTS__
function kr(e, t) {
	return new Ct({
		check: "string_format",
		format: "includes",
		...x(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ar(e, t) {
	return new wt({
		check: "string_format",
		format: "starts_with",
		...x(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function jr(e, t) {
	return new Tt({
		check: "string_format",
		format: "ends_with",
		...x(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function I(e) {
	return new Et({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function Mr(e) {
	return /* @__PURE__ */ I((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Nr() {
	return /* @__PURE__ */ I((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Pr() {
	return /* @__PURE__ */ I((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Fr() {
	return /* @__PURE__ */ I((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Ir() {
	return /* @__PURE__ */ I((e) => te(e));
}
// @__NO_SIDE_EFFECTS__
function Lr(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...x(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Rr(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...x(n)
	});
}
// @__NO_SIDE_EFFECTS__
function zr(e, t) {
	let n = /* @__PURE__ */ Br((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(T(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", r.input ??= t.value, r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(T(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function Br(e, t) {
	let n = new O({
		check: "custom",
		...x(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
function Vr(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? P,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		external: e?.external ?? void 0
	};
}
function L(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o);
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, L(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === "input" && R(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function Hr(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${a}`
			};
		}
		if (t[1] === n) return { ref: "#" };
		let i = `#/${r}/`, a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + a
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === "ref") {
			a(n);
			continue;
		}
	}
}
function Ur(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Object.assign(i, s), Object.assign(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	for (let t of [...e.seen.entries()].reverse()) r(t[0]);
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Object.assign(i, n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, o[e.defId] = e.def);
	}
	e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: z(t, "input", e.processors),
					output: z(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function R(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return R(r.element, n);
	if (r.type === "set") return R(r.valueType, n);
	if (r.type === "lazy") return R(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault") return R(r.innerType, n);
	if (r.type === "intersection") return R(r.left, n) || R(r.right, n);
	if (r.type === "record" || r.type === "map") return R(r.keyType, n) || R(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : R(r.in, n) || R(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (R(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (R(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (R(e, n)) return !0;
		return !!(r.rest && R(r.rest, n));
	}
	return !1;
}
var Wr = (e, t = {}) => (n) => {
	let r = Vr({
		...n,
		processors: t
	});
	return L(e, r), Hr(r, e), Ur(r, e);
}, z = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = Vr({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return L(e, o), Hr(o, e), Ur(o, e);
}, Gr = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, Kr = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = Gr[s] ?? s, i.format === "" && delete i.format, s === "time" && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, qr = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	i.type = typeof s == "string" && s.includes("int") ? "integer" : "number";
	let d = typeof u == "number" && u >= (a ?? -Infinity), f = typeof l == "number" && l <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (i.multipleOf = c);
}, Jr = (e, t, n, r) => {
	n.type = "boolean";
}, Yr = (e, t, n, r) => {
	n.not = {};
}, Xr = (e, t, n, r) => {
	let i = e._zod.def, a = s(i.entries);
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, Zr = (e, t, n, r) => {
	let i = e._zod.def, a = [];
	for (let e of i.values) if (e === void 0) {
		if (t.unrepresentable === "throw") throw Error("Literal `undefined` cannot be represented in JSON Schema");
	} else if (typeof e == "bigint") {
		if (t.unrepresentable === "throw") throw Error("BigInt literals cannot be represented in JSON Schema");
		a.push(Number(e));
	} else a.push(e);
	if (a.length !== 0) {
		if (a.length === 1) {
			let e = a[0];
			n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
		} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
	}
}, Qr = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
}, $r = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
}, ei = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = L(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
}, ti = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object", i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = L(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	});
	let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
		let n = a.shape[e]._zod;
		return t.io === "input" ? n.optin === void 0 : n.optout === void 0;
	}));
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = L(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, ni = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => L(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, ri = (e, t, n, r) => {
	let i = e._zod.def, a = L(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = L(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, ii = (e, t, n, r) => {
	let i = e._zod.def, a = L(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, ai = (e, t, n, r) => {
	let i = e._zod.def;
	L(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, oi = (e, t, n, r) => {
	let i = e._zod.def;
	L(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, si = (e, t, n, r) => {
	let i = e._zod.def;
	L(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, ci = (e, t, n, r) => {
	let i = e._zod.def;
	L(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error("Dynamic catch values are not supported in JSON Schema");
	}
	n.default = o;
}, li = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	L(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, ui = (e, t, n, r) => {
	let i = e._zod.def;
	L(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, di = (e, t, n, r) => {
	let i = e._zod.def;
	L(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, fi = /*@__PURE__*/ n("ZodISODateTime", (e, t) => {
	Vt.init(e, t), W.init(e, t);
});
function pi(e) {
	return /* @__PURE__ */ ur(fi, e);
}
var mi = /*@__PURE__*/ n("ZodISODate", (e, t) => {
	Ht.init(e, t), W.init(e, t);
});
function hi(e) {
	return /* @__PURE__ */ dr(mi, e);
}
var gi = /*@__PURE__*/ n("ZodISOTime", (e, t) => {
	Ut.init(e, t), W.init(e, t);
});
function _i(e) {
	return /* @__PURE__ */ fr(gi, e);
}
var vi = /*@__PURE__*/ n("ZodISODuration", (e, t) => {
	Wt.init(e, t), W.init(e, t);
});
function yi(e) {
	return /* @__PURE__ */ pr(vi, e);
}
var B = /*@__PURE__*/ n("ZodError", (e, t) => {
	ye.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: (t) => Se(e, t) },
		flatten: { value: (t) => xe(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, c, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, c, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
}, { Parent: Error }), bi = /* @__PURE__ */ Ce(B), xi = /* @__PURE__ */ we(B), Si = /* @__PURE__ */ E(B), Ci = /* @__PURE__ */ D(B), wi = /* @__PURE__ */ De(B), Ti = /* @__PURE__ */ Oe(B), Ei = /* @__PURE__ */ ke(B), Di = /* @__PURE__ */ Ae(B), Oi = /* @__PURE__ */ je(B), ki = /* @__PURE__ */ Me(B), Ai = /* @__PURE__ */ Ne(B), ji = /* @__PURE__ */ Pe(B), Mi = /* @__PURE__ */ new WeakMap();
function V(e, t, n) {
	let r = Object.getPrototypeOf(e), i = Mi.get(r);
	if (i || (i = /* @__PURE__ */ new Set(), Mi.set(r, i)), !i.has(t)) {
		i.add(t);
		for (let e in n) {
			let t = n[e];
			Object.defineProperty(r, e, {
				configurable: !0,
				enumerable: !1,
				get() {
					let n = t.bind(this);
					return Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: n
					}), n;
				},
				set(t) {
					Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: t
					});
				}
			});
		}
	}
}
var H = /*@__PURE__*/ n("ZodType", (e, t) => (A.init(e, t), Object.assign(e["~standard"], { jsonSchema: {
	input: z(e, "input"),
	output: z(e, "output")
} }), e.toJSONSchema = Wr(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (t, n) => bi(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => Si(e, t, n), e.parseAsync = async (t, n) => xi(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => Ci(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => wi(e, t, n), e.decode = (t, n) => Ti(e, t, n), e.encodeAsync = async (t, n) => Ei(e, t, n), e.decodeAsync = async (t, n) => Di(e, t, n), e.safeEncode = (t, n) => Oi(e, t, n), e.safeDecode = (t, n) => ki(e, t, n), e.safeEncodeAsync = async (t, n) => Ai(e, t, n), e.safeDecodeAsync = async (t, n) => ji(e, t, n), V(e, "ZodType", {
	check(...e) {
		let t = this.def;
		return this.clone(g(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return b(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(Ba(e, t));
	},
	superRefine(e, t) {
		return this.check(Va(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ I(e));
	},
	optional() {
		return Sa(this);
	},
	exactOptional() {
		return wa(this);
	},
	nullable() {
		return Ea(this);
	},
	nullish() {
		return Sa(Ea(this));
	},
	nonoptional(e) {
		return Ma(this, e);
	},
	array() {
		return K(this);
	},
	or(e) {
		return fa([this, e]);
	},
	and(e) {
		return ga(this, e);
	},
	transform(e) {
		return Ia(this, ba(e));
	},
	default(e) {
		return Oa(this, e);
	},
	prefault(e) {
		return Aa(this, e);
	},
	catch(e) {
		return Pa(this, e);
	},
	pipe(e) {
		return Ia(this, e);
	},
	readonly() {
		return Ra(this);
	},
	describe(e) {
		let t = this.clone();
		return P.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return P.get(this);
		let t = this.clone();
		return P.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e) {
		return e(this);
	}
}), Object.defineProperty(e, "description", {
	get() {
		return P.get(e)?.description;
	},
	configurable: !0
}), e)), Ni = /*@__PURE__*/ n("_ZodString", (e, t) => {
	kt.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Kr(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, V(e, "_ZodString", {
		regex(...e) {
			return this.check(/* @__PURE__ */ Er(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ kr(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ Ar(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ jr(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ F(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ wr(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ Tr(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ F(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ Dr(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ Or(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ Nr());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ Mr(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ Pr());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ Fr());
		},
		slugify() {
			return this.check(/* @__PURE__ */ Ir());
		}
	});
}), Pi = /*@__PURE__*/ n("ZodString", (e, t) => {
	kt.init(e, t), Ni.init(e, t), e.email = (t) => e.check(/* @__PURE__ */ Hn(Fi, t)), e.url = (t) => e.check(/* @__PURE__ */ Jn(Li, t)), e.jwt = (t) => e.check(/* @__PURE__ */ lr(Qi, t)), e.emoji = (t) => e.check(/* @__PURE__ */ Yn(Ri, t)), e.guid = (t) => e.check(/* @__PURE__ */ Un(Ii, t)), e.uuid = (t) => e.check(/* @__PURE__ */ Wn(G, t)), e.uuidv4 = (t) => e.check(/* @__PURE__ */ Gn(G, t)), e.uuidv6 = (t) => e.check(/* @__PURE__ */ Kn(G, t)), e.uuidv7 = (t) => e.check(/* @__PURE__ */ qn(G, t)), e.nanoid = (t) => e.check(/* @__PURE__ */ Xn(zi, t)), e.guid = (t) => e.check(/* @__PURE__ */ Un(Ii, t)), e.cuid = (t) => e.check(/* @__PURE__ */ Zn(Bi, t)), e.cuid2 = (t) => e.check(/* @__PURE__ */ Qn(Vi, t)), e.ulid = (t) => e.check(/* @__PURE__ */ $n(Hi, t)), e.base64 = (t) => e.check(/* @__PURE__ */ or(Yi, t)), e.base64url = (t) => e.check(/* @__PURE__ */ sr(Xi, t)), e.xid = (t) => e.check(/* @__PURE__ */ er(Ui, t)), e.ksuid = (t) => e.check(/* @__PURE__ */ tr(Wi, t)), e.ipv4 = (t) => e.check(/* @__PURE__ */ nr(Gi, t)), e.ipv6 = (t) => e.check(/* @__PURE__ */ rr(Ki, t)), e.cidrv4 = (t) => e.check(/* @__PURE__ */ ir(qi, t)), e.cidrv6 = (t) => e.check(/* @__PURE__ */ ar(Ji, t)), e.e164 = (t) => e.check(/* @__PURE__ */ cr(Zi, t)), e.datetime = (t) => e.check(pi(t)), e.date = (t) => e.check(hi(t)), e.time = (t) => e.check(_i(t)), e.duration = (t) => e.check(yi(t));
});
function U(e) {
	return /* @__PURE__ */ Vn(Pi, e);
}
var W = /*@__PURE__*/ n("ZodStringFormat", (e, t) => {
	j.init(e, t), Ni.init(e, t);
}), Fi = /*@__PURE__*/ n("ZodEmail", (e, t) => {
	Mt.init(e, t), W.init(e, t);
}), Ii = /*@__PURE__*/ n("ZodGUID", (e, t) => {
	At.init(e, t), W.init(e, t);
}), G = /*@__PURE__*/ n("ZodUUID", (e, t) => {
	jt.init(e, t), W.init(e, t);
}), Li = /*@__PURE__*/ n("ZodURL", (e, t) => {
	Nt.init(e, t), W.init(e, t);
}), Ri = /*@__PURE__*/ n("ZodEmoji", (e, t) => {
	Pt.init(e, t), W.init(e, t);
}), zi = /*@__PURE__*/ n("ZodNanoID", (e, t) => {
	Ft.init(e, t), W.init(e, t);
}), Bi = /*@__PURE__*/ n("ZodCUID", (e, t) => {
	It.init(e, t), W.init(e, t);
}), Vi = /*@__PURE__*/ n("ZodCUID2", (e, t) => {
	Lt.init(e, t), W.init(e, t);
}), Hi = /*@__PURE__*/ n("ZodULID", (e, t) => {
	Rt.init(e, t), W.init(e, t);
}), Ui = /*@__PURE__*/ n("ZodXID", (e, t) => {
	zt.init(e, t), W.init(e, t);
}), Wi = /*@__PURE__*/ n("ZodKSUID", (e, t) => {
	Bt.init(e, t), W.init(e, t);
}), Gi = /*@__PURE__*/ n("ZodIPv4", (e, t) => {
	Gt.init(e, t), W.init(e, t);
}), Ki = /*@__PURE__*/ n("ZodIPv6", (e, t) => {
	Kt.init(e, t), W.init(e, t);
}), qi = /*@__PURE__*/ n("ZodCIDRv4", (e, t) => {
	qt.init(e, t), W.init(e, t);
}), Ji = /*@__PURE__*/ n("ZodCIDRv6", (e, t) => {
	Jt.init(e, t), W.init(e, t);
}), Yi = /*@__PURE__*/ n("ZodBase64", (e, t) => {
	Xt.init(e, t), W.init(e, t);
}), Xi = /*@__PURE__*/ n("ZodBase64URL", (e, t) => {
	Qt.init(e, t), W.init(e, t);
}), Zi = /*@__PURE__*/ n("ZodE164", (e, t) => {
	$t.init(e, t), W.init(e, t);
}), Qi = /*@__PURE__*/ n("ZodJWT", (e, t) => {
	tn.init(e, t), W.init(e, t);
}), $i = /*@__PURE__*/ n("ZodNumber", (e, t) => {
	nn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => qr(e, t, n, r), V(e, "ZodNumber", {
		gt(e, t) {
			return this.check(/* @__PURE__ */ xr(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ Sr(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ Sr(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ yr(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ br(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ br(e, t));
		},
		int(e) {
			return this.check(na(e));
		},
		safe(e) {
			return this.check(na(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ xr(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ Sr(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ yr(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ br(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ Cr(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ Cr(e, t));
		},
		finite() {
			return this;
		}
	});
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function ea(e) {
	return /* @__PURE__ */ mr($i, e);
}
var ta = /*@__PURE__*/ n("ZodNumberFormat", (e, t) => {
	rn.init(e, t), $i.init(e, t);
});
function na(e) {
	return /* @__PURE__ */ hr(ta, e);
}
var ra = /*@__PURE__*/ n("ZodBoolean", (e, t) => {
	an.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Jr(e, t, n, r);
});
function ia(e) {
	return /* @__PURE__ */ gr(ra, e);
}
var aa = /*@__PURE__*/ n("ZodUnknown", (e, t) => {
	on.init(e, t), H.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function oa() {
	return /* @__PURE__ */ _r(aa);
}
var sa = /*@__PURE__*/ n("ZodNever", (e, t) => {
	sn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Yr(e, t, n, r);
});
function ca(e) {
	return /* @__PURE__ */ vr(sa, e);
}
var la = /*@__PURE__*/ n("ZodArray", (e, t) => {
	ln.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => ei(e, t, n, r), e.element = t.element, V(e, "ZodArray", {
		min(e, t) {
			return this.check(/* @__PURE__ */ F(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ F(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ wr(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ Tr(e, t));
		},
		unwrap() {
			return this.element;
		}
	});
});
function K(e, t) {
	return /* @__PURE__ */ Lr(la, e, t);
}
var ua = /*@__PURE__*/ n("ZodObject", (e, t) => {
	pn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => ti(e, t, n, r), m(e, "shape", () => t.shape), V(e, "ZodObject", {
		keyof() {
			return J(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone({
				...this._zod.def,
				catchall: e
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: oa()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: oa()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: ca()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return ue(this, e);
		},
		safeExtend(e) {
			return de(this, e);
		},
		merge(e) {
			return fe(this, e);
		},
		pick(e) {
			return ce(this, e);
		},
		omit(e) {
			return le(this, e);
		},
		partial(...e) {
			return pe(xa, this, e[0]);
		},
		required(...e) {
			return me(ja, this, e[0]);
		}
	});
});
function q(e, t) {
	return new ua({
		type: "object",
		shape: e ?? {},
		...x(t)
	});
}
var da = /*@__PURE__*/ n("ZodUnion", (e, t) => {
	hn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => ni(e, t, n, r), e.options = t.options;
});
function fa(e, t) {
	return new da({
		type: "union",
		options: e,
		...x(t)
	});
}
var pa = /*@__PURE__*/ n("ZodDiscriminatedUnion", (e, t) => {
	da.init(e, t), gn.init(e, t);
});
function ma(e, t, n) {
	return new pa({
		type: "union",
		options: t,
		discriminator: e,
		...x(n)
	});
}
var ha = /*@__PURE__*/ n("ZodIntersection", (e, t) => {
	_n.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => ri(e, t, n, r);
});
function ga(e, t) {
	return new ha({
		type: "intersection",
		left: e,
		right: t
	});
}
var _a = /*@__PURE__*/ n("ZodEnum", (e, t) => {
	bn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xr(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new _a({
			...t,
			checks: [],
			...x(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new _a({
			...t,
			checks: [],
			...x(r),
			entries: i
		});
	};
});
function J(e, t) {
	return new _a({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...x(t)
	});
}
var va = /*@__PURE__*/ n("ZodLiteral", (e, t) => {
	xn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Zr(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function Y(e, t) {
	return new va({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...x(t)
	});
}
var ya = /*@__PURE__*/ n("ZodTransform", (e, t) => {
	Sn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => $r(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new i(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(T(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", t.input ??= n.value, t.inst ??= e, n.issues.push(T(t));
			}
		};
		let a = t.transform(n.value, n);
		return a instanceof Promise ? a.then((e) => (n.value = e, n.fallback = !0, n)) : (n.value = a, n.fallback = !0, n);
	};
});
function ba(e) {
	return new ya({
		type: "transform",
		transform: e
	});
}
var xa = /*@__PURE__*/ n("ZodOptional", (e, t) => {
	wn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => di(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Sa(e) {
	return new xa({
		type: "optional",
		innerType: e
	});
}
var Ca = /*@__PURE__*/ n("ZodExactOptional", (e, t) => {
	Tn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => di(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function wa(e) {
	return new Ca({
		type: "optional",
		innerType: e
	});
}
var Ta = /*@__PURE__*/ n("ZodNullable", (e, t) => {
	En.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => ii(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ea(e) {
	return new Ta({
		type: "nullable",
		innerType: e
	});
}
var Da = /*@__PURE__*/ n("ZodDefault", (e, t) => {
	Dn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => oi(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Oa(e, t) {
	return new Da({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ie(t);
		}
	});
}
var ka = /*@__PURE__*/ n("ZodPrefault", (e, t) => {
	kn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => si(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Aa(e, t) {
	return new ka({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ie(t);
		}
	});
}
var ja = /*@__PURE__*/ n("ZodNonOptional", (e, t) => {
	An.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => ai(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ma(e, t) {
	return new ja({
		type: "nonoptional",
		innerType: e,
		...x(t)
	});
}
var Na = /*@__PURE__*/ n("ZodCatch", (e, t) => {
	Mn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => ci(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Pa(e, t) {
	return new Na({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : () => t
	});
}
var Fa = /*@__PURE__*/ n("ZodPipe", (e, t) => {
	Nn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => li(e, t, n, r), e.in = t.in, e.out = t.out;
});
function Ia(e, t) {
	return new Fa({
		type: "pipe",
		in: e,
		out: t
	});
}
var La = /*@__PURE__*/ n("ZodReadonly", (e, t) => {
	Pn.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => ui(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ra(e) {
	return new La({
		type: "readonly",
		innerType: e
	});
}
var za = /*@__PURE__*/ n("ZodCustom", (e, t) => {
	In.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Qr(e, t, n, r);
});
function Ba(e, t = {}) {
	return /* @__PURE__ */ Rr(za, e, t);
}
function Va(e, t) {
	return /* @__PURE__ */ zr(e, t);
}
//#endregion
//#region src/config.ts
var Ha = q({ cisBaseUrl: U().url() }), Ua = "com.certonymics.cchat", Wa = J([
	"nfc",
	"web",
	"liveness"
]), Ga = J(["cos-liveness", "did-signature"]), Ka = q({
	didCrypto: ia(),
	fyeo: ia()
});
q({
	deviceId: U(),
	capabilities: Ka
}), q({ email: U().email() });
var qa = ma("kind", [q({
	kind: Y("completed"),
	sessionId: U()
}), q({
	kind: Y("redirect"),
	sessionId: U(),
	redirectUrl: U().url()
})]);
q({ sessionId: U() });
var Ja = q({
	mxid: U(),
	loginToken: U(),
	proofMode: Ga
});
q({ email: U().email() }), q({ sessionId: U() }), q({ email: U().email() }), q({ did: U() }), fa([q({
	mxid: U(),
	verified: ia(),
	assurance: Wa
}), q({ found: Y(!1) })]);
//#endregion
//#region ../cis-api/dist/v1/attestation.js
var Ya = "cdot/attest/v1";
q({
	mxid: U().min(1),
	didCommitment: U().min(1),
	assurance: Wa,
	issuedAt: ea().int().nonnegative(),
	expiresAt: ea().int().nonnegative()
}), U().refine((e) => e.startsWith(`${Ya}|`), { message: `attestation payload must start with "${Ya}|"` }), q({ mxids: K(U()).min(1).max(100) }), q({ attestations: K(q({
	payload: U(),
	signature: U(),
	keyId: U()
})) }), q({ keys: K(q({
	keyId: U(),
	publicKey: U(),
	algorithm: Y("ed25519")
})) }), q({
	sessionId: U(),
	emailHmac: U(),
	status: J([
		"pending",
		"verified",
		"failed",
		"expired"
	]),
	assurance: Wa.nullable(),
	didId: U().nullable(),
	receivedAt: ea().int().nonnegative(),
	source: J(["webhook", "poll"])
});
//#endregion
//#region src/copy.ts
var Xa = {
	"cos-unreachable": {
		title: "Verification service unreachable",
		body: "We can't reach the identity verification service right now. Check your connection and try again in a moment.",
		action: "Try again"
	},
	"session-expired": {
		title: "Verification session expired",
		body: "Your verification session has expired. Start again with your email to get a fresh one.",
		action: "Start again"
	},
	"kyc-failed": {
		title: "Verification unsuccessful",
		body: "Identity verification was not successful, so we can't sign you in. You can try again, or contact support if this keeps happening.",
		action: "Try again"
	},
	"no-account": {
		title: "No account found",
		body: "We couldn't find a c.chat account for this verified identity. Continue with your email to create one.",
		action: "Continue with your email"
	},
	"poll-timeout": {
		title: "Still waiting for verification",
		body: "Verification is taking longer than expected. If you've finished verifying, wait a moment and check again — or start over.",
		action: "Check again"
	}
}, X = {
	heading: "c.chat",
	subheading: "Verified-identity messaging. No passwords — your identity is your key.",
	emailLabel: "Email address",
	emailPlaceholder: "you@example.com",
	continueButton: "Continue with your email",
	startingStatus: "Contacting the identity service…",
	redirectingStatus: "Taking you to identity verification…",
	pollingStatus: "Finishing verification — this completes automatically once you're verified.",
	loggingInStatus: "Verification complete. Signing you in…",
	startOver: "Start over"
}, Za = "cchat.pending", Qa = 3e3;
function Z(e) {
	return {
		code: e,
		...Xa[e],
		canResumePolling: e === "poll-timeout"
	};
}
function $a(e, t, n) {
	let r = (n ?? "").toLowerCase();
	switch (t) {
		case "CIS_NO_ACCOUNT": return {
			outcome: "fatal",
			code: "no-account"
		};
		case "CIS_SESSION_UNKNOWN": return {
			outcome: "fatal",
			code: "session-expired"
		};
		case "CIS_SESSION_NOT_VERIFIED": return r.includes("expired") ? {
			outcome: "fatal",
			code: "session-expired"
		} : r.includes("failed") ? {
			outcome: "fatal",
			code: "kyc-failed"
		} : { outcome: "retry" };
		case "CIS_SESSION_INCOMPLETE":
		case "CIS_UPSTREAM_COS":
		case "CIS_RATE_LIMITED": return { outcome: "retry" };
		default: return e >= 500 ? { outcome: "retry" } : {
			outcome: "fatal",
			code: "session-expired"
		};
	}
}
var eo = class {
	deps;
	stateInternal = { phase: "idle" };
	disposed = !1;
	pollRun = 0;
	constructor(e) {
		this.deps = e;
	}
	get state() {
		return this.stateInternal;
	}
	dispose() {
		this.disposed = !0, this.pollRun++;
	}
	setState(e) {
		this.disposed || (this.stateInternal = e, this.deps.onStateChange(e));
	}
	now() {
		return this.deps.now ? this.deps.now() : Date.now();
	}
	readPending() {
		let e = null;
		try {
			e = this.deps.storage.getItem(Za);
		} catch {
			return null;
		}
		if (!e) return null;
		try {
			let t = JSON.parse(e);
			if (typeof t == "object" && t && typeof t.sessionId == "string" && (t.flow === "register" || t.flow === "login")) return t;
		} catch {}
		return this.clearPending(), null;
	}
	writePending(e) {
		try {
			return this.deps.storage.setItem(Za, JSON.stringify(e)), !0;
		} catch {
			return this.setState({
				phase: "error",
				error: Z("cos-unreachable")
			}), !1;
		}
	}
	clearPending() {
		try {
			this.deps.storage.removeItem(Za);
		} catch {}
	}
	async resumePending() {
		let e = this.readPending();
		return e ? (await this.pollAndFinish(e), !0) : !1;
	}
	async submitEmail(e, t = "register", n = null) {
		this.setState({ phase: "starting" });
		let r;
		try {
			r = await this.deps.fetchFn(`${this.deps.cisBaseUrl}/v1/${t}/start`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: e })
			});
		} catch {
			this.setState({
				phase: "error",
				error: Z("cos-unreachable")
			});
			return;
		}
		if (!r.ok) {
			this.setState({
				phase: "error",
				error: Z("cos-unreachable")
			});
			return;
		}
		let i = qa.safeParse(await r.json().catch(() => null));
		if (!i.success) {
			this.setState({
				phase: "error",
				error: Z("cos-unreachable")
			});
			return;
		}
		let a = {
			sessionId: i.data.sessionId,
			returnTo: n,
			flow: t,
			startedAt: this.now()
		};
		if (i.data.kind === "redirect") {
			if (!this.writePending(a)) return;
			this.setState({ phase: "redirecting" }), this.deps.navigate(i.data.redirectUrl);
			return;
		}
		this.writePending(a) && await this.pollAndFinish(a);
	}
	async resumePolling() {
		let e = this.readPending();
		if (!e) {
			this.reset();
			return;
		}
		await this.pollAndFinish(e);
	}
	reset() {
		this.pollRun++, this.clearPending(), this.setState({ phase: "idle" });
	}
	async pollAndFinish(e) {
		let t = ++this.pollRun, n = `${this.deps.cisBaseUrl}/v1/${e.flow}/complete`;
		for (let r = 1; r <= 40; r++) {
			if (this.disposed || t !== this.pollRun) return;
			this.setState({
				phase: "polling",
				attempt: r
			});
			let i = await this.completeOnce(n, e.sessionId);
			if (this.disposed || t !== this.pollRun) return;
			if (i.outcome === "ok") {
				this.clearPending(), await this.finishLogin(i.result);
				return;
			}
			if (i.outcome === "fatal") {
				this.clearPending(), this.setState({
					phase: "error",
					error: Z(i.code)
				});
				return;
			}
			r < 40 && await this.deps.sleep(Qa);
		}
		this.setState({
			phase: "error",
			error: Z("poll-timeout")
		});
	}
	async completeOnce(e, t) {
		let n;
		try {
			n = await this.deps.fetchFn(e, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ sessionId: t })
			});
		} catch {
			return { outcome: "retry" };
		}
		let r = await n.json().catch(() => null);
		if (n.ok) {
			let e = Ja.safeParse(r);
			return e.success ? {
				outcome: "ok",
				result: e.data
			} : { outcome: "retry" };
		}
		let i = r ?? {};
		return $a(n.status, i.errcode, i.error);
	}
	async finishLogin(e) {
		this.setState({ phase: "logging-in" });
		let t;
		try {
			t = await this.deps.fetchFn(`${this.deps.homeserverUrl}/_matrix/client/v3/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					type: "m.login.token",
					token: e.loginToken,
					initial_device_display_name: "c.chat (web)"
				})
			});
		} catch {
			this.setState({
				phase: "error",
				error: Z("cos-unreachable")
			});
			return;
		}
		if (!t.ok) {
			this.setState({
				phase: "error",
				error: Z("session-expired")
			});
			return;
		}
		let n = await t.json().catch(() => null) ?? {};
		if (typeof n.user_id != "string" || typeof n.device_id != "string" || typeof n.access_token != "string") {
			this.setState({
				phase: "error",
				error: Z("session-expired")
			});
			return;
		}
		try {
			await this.deps.onAuthenticated({
				userId: n.user_id,
				deviceId: n.device_id,
				accessToken: n.access_token,
				homeserverUrl: this.deps.homeserverUrl
			});
		} catch {
			this.setState({
				phase: "error",
				error: Z("cos-unreachable")
			});
			return;
		}
		this.setState({
			phase: "done",
			mxid: e.mxid
		});
	}
}, to = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.transitional.element");
	function n(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.jsx = n, e.jsxs = n;
})), Q = (/* @__PURE__ */ e(((e, t) => {
	t.exports = to();
})))(), $ = {
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "60vh",
		gap: "12px",
		padding: "24px",
		maxWidth: "420px",
		margin: "0 auto",
		textAlign: "center",
		fontFamily: "inherit"
	},
	heading: {
		fontSize: "24px",
		fontWeight: 600,
		margin: 0
	},
	sub: {
		fontSize: "14px",
		opacity: .8,
		margin: "0 0 12px"
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "8px",
		width: "100%"
	},
	input: {
		padding: "10px 12px",
		fontSize: "15px",
		borderRadius: "8px",
		border: "1px solid #8886",
		width: "100%",
		boxSizing: "border-box"
	},
	button: {
		padding: "10px 16px",
		fontSize: "15px",
		fontWeight: 600,
		borderRadius: "8px",
		border: "none",
		cursor: "pointer",
		background: "#0dbd8b",
		color: "#fff"
	},
	linkButton: {
		background: "none",
		border: "none",
		cursor: "pointer",
		textDecoration: "underline",
		fontSize: "13px",
		opacity: .8,
		padding: "4px"
	},
	status: {
		fontSize: "14px",
		opacity: .9
	},
	errorTitle: {
		fontSize: "18px",
		fontWeight: 600,
		margin: 0
	},
	errorBody: {
		fontSize: "14px",
		opacity: .9,
		margin: "4px 0 8px"
	}
};
function no(e) {
	let [t, n] = window.React.useState({ phase: "idle" }), [r, i] = window.React.useState(""), a = window.React.useRef(null);
	window.React.useEffect(() => {
		let t = new eo({
			cisBaseUrl: e.cisBaseUrl.replace(/\/+$/, ""),
			homeserverUrl: e.homeserverUrl.replace(/\/+$/, ""),
			fetchFn: (...e) => fetch(...e),
			storage: window.sessionStorage,
			navigate: (e) => window.location.assign(e),
			sleep: (e) => new Promise((t) => setTimeout(t, e)),
			onStateChange: n,
			onAuthenticated: e.onAuthenticated
		});
		return a.current = t, t.resumePending(), () => t.dispose();
	}, [e.cisBaseUrl, e.homeserverUrl]);
	let o = (t) => {
		t.preventDefault();
		let n = r.trim();
		n && a.current?.submitEmail(n, "register", e.returnTo ?? null);
	}, s;
	switch (t.phase) {
		case "idle":
			s = /* @__PURE__ */ (0, Q.jsxs)("form", {
				style: $.form,
				onSubmit: o,
				"data-testid": "cchat-email-form",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("label", {
						htmlFor: "cchat-email",
						style: $.status,
						children: X.emailLabel
					}),
					/* @__PURE__ */ (0, Q.jsx)("input", {
						id: "cchat-email",
						style: $.input,
						type: "email",
						required: !0,
						autoFocus: !0,
						placeholder: X.emailPlaceholder,
						value: r,
						onChange: (e) => i(e.target.value)
					}),
					/* @__PURE__ */ (0, Q.jsx)("button", {
						type: "submit",
						style: $.button,
						children: X.continueButton
					})
				]
			});
			break;
		case "starting":
			s = /* @__PURE__ */ (0, Q.jsx)("p", {
				style: $.status,
				children: X.startingStatus
			});
			break;
		case "redirecting":
			s = /* @__PURE__ */ (0, Q.jsx)("p", {
				style: $.status,
				children: X.redirectingStatus
			});
			break;
		case "polling":
			s = /* @__PURE__ */ (0, Q.jsx)("p", {
				style: $.status,
				children: X.pollingStatus
			});
			break;
		case "logging-in":
		case "done":
			s = /* @__PURE__ */ (0, Q.jsx)("p", {
				style: $.status,
				children: X.loggingInStatus
			});
			break;
		case "error": s = /* @__PURE__ */ (0, Q.jsxs)("div", {
			"data-testid": "cchat-error",
			"data-error-code": t.error.code,
			children: [
				/* @__PURE__ */ (0, Q.jsx)("h2", {
					style: $.errorTitle,
					children: t.error.title
				}),
				/* @__PURE__ */ (0, Q.jsx)("p", {
					style: $.errorBody,
					children: t.error.body
				}),
				/* @__PURE__ */ (0, Q.jsx)("button", {
					style: $.button,
					onClick: () => t.error.canResumePolling ? void a.current?.resumePolling() : a.current?.reset(),
					children: t.error.action
				}),
				t.error.canResumePolling && /* @__PURE__ */ (0, Q.jsx)("div", { children: /* @__PURE__ */ (0, Q.jsx)("button", {
					style: $.linkButton,
					onClick: () => a.current?.reset(),
					children: X.startOver
				}) })
			]
		});
	}
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		style: $.root,
		"data-testid": "cchat-login",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h1", {
				style: $.heading,
				children: X.heading
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				style: $.sub,
				children: X.subheading
			}),
			s
		]
	});
}
//#endregion
//#region package.json
var ro = "@cchat/element-module", io = class {
	api;
	static moduleApiVersion = "^1.15.0";
	constructor(e) {
		this.api = e;
	}
	async load() {
		let e = this.api.config.get(Ua);
		if (!e) {
			console.debug(`No configuration found for module "${ro}", skipping initialization.`);
			return;
		}
		let t;
		try {
			t = Ha.parse(e);
		} catch (e) {
			throw console.error("Failed to init module", e), Error(`Errors in module configuration for "${ro}"`);
		}
		this.api.customComponents.registerLoginComponent((e) => /* @__PURE__ */ (0, Q.jsx)(no, {
			cisBaseUrl: t.cisBaseUrl,
			homeserverUrl: e.serverConfig.hsUrl,
			...e.fragmentAfterLogin === void 0 ? {} : { returnTo: e.fragmentAfterLogin },
			onAuthenticated: (e) => this.api.overwriteAccountAuth(e)
		}));
	}
};
//#endregion
export { io as default };

//# sourceMappingURL=index.js.map
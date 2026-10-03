(function () {
  "use strict";
  var C = window.CONFIG, GIFTS = window.GIFTS;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var brl = function (n) { return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };

  /* ---------- Textos vindos da configuração ---------- */
  var bind = {
    name1: C.name1,
    name2: C.name2,
    monogram: C.name1.charAt(0) + "&" + C.name2.charAt(0),
    pixName: C.pix.name,
    pixKey: C.pix.key
  };
  // Convite personalizado: ?para=Família%20Souza
  try {
    var para = new URLSearchParams(location.search).get("para");
    if (para) bind.guestLine = para;
  } catch (e) {}
  $$("[data-bind]").forEach(function (el) {
    var v = bind[el.getAttribute("data-bind")];
    if (v) el.textContent = v;
  });
  document.title = C.name1 + " & " + C.name2;

  /* ---------- Links da cerimônia ---------- */
  var place = C.church + ", " + C.address;
  $("#btn-maps").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place);
  $("#btn-waze").href = "https://waze.com/ul?q=" + encodeURIComponent(place) + "&navigate=yes";
  (function () {
    var start = new Date(C.dateISO), end = new Date(start.getTime() + 2 * 3600e3);
    var f = function (d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
    $("#btn-cal").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent("Casamento " + C.name1 + " & " + C.name2) +
      "&dates=" + f(start) + "/" + f(end) +
      "&location=" + encodeURIComponent(place) +
      "&details=" + encodeURIComponent("Os noivos receberão os cumprimentos no local.");
  })();

  /* ---------- Envelope ---------- */
  var intro = $("#intro"), envelope = $("#envelope");
  function openInvite() {
    if (document.body.classList.contains("is-opening")) return;
    document.body.classList.add("is-opening");
    if (!reduceMotion) setTimeout(dropLeaves, 900);
    setTimeout(function () {
      document.body.classList.remove("is-sealed");
      document.body.classList.add("is-opened");
      carousel.start();
      fab();
    }, reduceMotion ? 50 : 2700);
    setTimeout(function () { intro.hidden = true; }, reduceMotion ? 100 : 3800);
  }
  envelope.addEventListener("click", openInvite);
  // Quem volta direto para um link de seção (#presentes) pula o envelope
  if (location.hash && location.hash.length > 1 && location.hash !== "#inicio") {
    document.body.classList.add("is-opening", "is-opened");
    document.body.classList.remove("is-sealed");
    intro.hidden = true;
  }

  function dropLeaves() {
    var colors = ["#5F6B3F", "#6B7546", "#A6A783", "#8A8F5E", "#D9CBB0"];
    for (var i = 0; i < 26; i++) {
      var l = document.createElement("span");
      l.className = "leaf";
      var size = 0.6 + Math.random() * 0.8;
      l.style.left = (Math.random() * 100) + "vw";
      l.style.transform = "scale(" + size + ") rotate(" + (Math.random() * 360) + "deg)";
      l.style.setProperty("--c", colors[i % colors.length]);
      l.style.setProperty("--d", (3.5 + Math.random() * 3) + "s");
      l.style.setProperty("--x", ((Math.random() - 0.5) * 240) + "px");
      l.style.setProperty("--r", ((Math.random() - 0.5) * 900) + "deg");
      l.style.animationDelay = (Math.random() * 1.6) + "s";
      document.body.appendChild(l);
      l.addEventListener("animationend", function () { this.remove(); });
    }
  }

  /* ---------- Carrossel ---------- */
  var carousel = (function () {
    var root = $("#carousel"), track = $("#track"), dotsEl = $("#dots");
    var DUR = 6000, idx = 0, timer = null, started = false, paused = false;
    var palettes = [
      ["#7C8556", "#3F4728", "150deg"], ["#C9BC9C", "#6B7546", "200deg"], ["#A6A783", "#4A5331", "120deg"],
      ["#8A8F5E", "#2E3220", "170deg"], ["#D9CBB0", "#7C8556", "220deg"], ["#6B7546", "#3F4728", "100deg"]
    ];
    var items = C.photos.length ? C.photos : C.placeholderCaptions.map(function (c) { return { caption: c }; });

    items.forEach(function (it, i) {
      var fig = document.createElement("figure");
      fig.className = "slide";
      fig.style.margin = "0";
      fig.setAttribute("aria-label", "Foto " + (i + 1) + " de " + items.length);
      if (it.src) {
        var img = new Image();
        img.src = it.src; img.alt = it.caption || "";
        img.loading = i === 0 ? "eager" : "lazy";
        fig.appendChild(img);
      } else {
        var p = palettes[i % palettes.length];
        var ph = document.createElement("div");
        ph.className = "ph";
        ph.style.setProperty("--p1", p[0]); ph.style.setProperty("--p2", p[1]); ph.style.setProperty("--a", p[2]);
        ph.innerHTML = '<svg aria-hidden="true"><use href="#i-branch"/></svg><span>Foto ' + String(i + 1).padStart(2, "0") + "</span>";
        fig.appendChild(ph);
      }
      if (it.caption) {
        var cap = document.createElement("figcaption");
        cap.textContent = it.caption;
        fig.appendChild(cap);
      }
      track.appendChild(fig);

      var d = document.createElement("button");
      d.type = "button"; d.className = "dot"; d.setAttribute("role", "tab");
      d.setAttribute("aria-label", "Foto " + (i + 1));
      d.style.setProperty("--dur", DUR + "ms");
      d.addEventListener("click", function () { go(i); });
      dotsEl.appendChild(d);
    });
    var slides = $$(".slide", track), dots = $$(".dot", dotsEl);

    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
      dots.forEach(function (d, i) {
        d.classList.remove("is-active", "is-done");
        void d.offsetWidth; // reinicia a barrinha
        if (i < idx) d.classList.add("is-done");
        if (i === idx) { d.classList.add("is-active"); d.setAttribute("aria-selected", "true"); }
        else d.setAttribute("aria-selected", "false");
      });
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      if (started && !paused && !reduceMotion) timer = setTimeout(function () { go(idx + 1); }, DUR);
    }
    function setPaused(v) { paused = v; root.classList.toggle("is-paused", v); schedule(); }

    $(".carousel__arrow--prev").addEventListener("click", function () { go(idx - 1); });
    $(".carousel__arrow--next").addEventListener("click", function () { go(idx + 1); });
    root.addEventListener("mouseenter", function () { setPaused(true); });
    root.addEventListener("mouseleave", function () { setPaused(false); });
    document.addEventListener("visibilitychange", function () { setPaused(document.hidden); });

    // Arrastar no celular
    var x0 = null;
    root.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    root.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
    });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === "ArrowRight") go(idx + 1);
    });

    slides[0].classList.add("is-active");
    return { start: function () { if (!started) { started = true; go(0); } } };
  })();
  if (document.body.classList.contains("is-opened")) carousel.start();

  /* ---------- Contagem regressiva ---------- */
  (function () {
    var target = new Date(C.dateISO).getTime();
    var els = { d: $("#cd-d"), h: $("#cd-h"), m: $("#cd-m"), s: $("#cd-s") };
    function tick() {
      var t = Math.max(0, target - Date.now()) / 1000;
      els.d.textContent = Math.floor(t / 86400);
      els.h.textContent = String(Math.floor(t % 86400 / 3600)).padStart(2, "0");
      els.m.textContent = String(Math.floor(t % 3600 / 60)).padStart(2, "0");
      els.s.textContent = String(Math.floor(t % 60)).padStart(2, "0");
    }
    tick(); setInterval(tick, 1000);
  })();

  /* ---------- Confirmação de presença ---------- */
  var wa = function (text) { return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text); };
  $("#rsvp").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#rsvp-name").value.trim();
    if (!name) { $("#rsvp-name").focus(); toast("Escreva seu nome para confirmar."); return; }
    var going = $("#rsvp-yes").checked;
    var guests = $("#rsvp-guests").value.trim(), msg = $("#rsvp-msg").value.trim();
    var text = (going ? "Confirmo presença no casamento! 💚" : "Infelizmente não poderei ir ao casamento.") +
      "\nNome: " + name + (guests ? "\nAcompanhantes: " + guests : "") + (msg ? "\nRecado: " + msg : "");
    $("#rsvp-wa").href = wa(text);
    $("#rsvp-done").hidden = false;
  });

  /* =========================================================
     LISTA DE PRESENTES
     ========================================================= */
  var CAT_LABEL = { lua: "Lua de mel", casa: "Casa nova", carinho: "Com carinho" };
  var CAT_ART = { lua: "#E3E1CC", casa: "#EADFC9", carinho: "#DCDDC6" };
  var byId = {}; GIFTS.forEach(function (g) { byId[g.id] = g; });
  var cart = load();
  var filter = "todos", sort = "sug";

  function load() {
    try { return JSON.parse(localStorage.getItem("casamento-cart")) || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem("casamento-cart", JSON.stringify(cart)); } catch (e) {}
  }
  function itemOf(id) {
    if (byId[id]) return byId[id];
    var m = /^livre-(\d+)$/.exec(id);
    if (m) return { id: id, cat: "carinho", icon: "heart", name: "Contribuição livre", price: Number(m[1]) / 100 };
    return null;
  }

  function renderGifts(animate) {
    var list = GIFTS.filter(function (g) { return filter === "todos" || g.cat === filter; });
    if (sort === "asc") list = list.slice().sort(function (a, b) { return a.price - b.price; });
    if (sort === "desc") list = list.slice().sort(function (a, b) { return b.price - a.price; });
    $("#gifts").innerHTML = list.map(function (g, i) {
      var inCart = cart[g.id];
      return '<article class="gift' + (animate ? " gift--in" : "") + '" style="--art:' + CAT_ART[g.cat] + ";animation-delay:" + (i * 40) + 'ms">' +
        '<div class="gift__art"><span class="gift__tag">' + CAT_LABEL[g.cat] + '</span><svg class="ico"><use href="#i-' + g.icon + '"/></svg></div>' +
        '<div class="gift__body"><h3 class="gift__name">' + g.name + '</h3><p class="gift__desc">' + g.desc + "</p></div>" +
        '<div class="gift__foot"><span class="gift__price">' + brl(g.price) + "</span>" +
        '<button type="button" class="btn gift__add' + (inCart ? " is-added" : "") + '" data-add="' + g.id + '">' +
        (inCart ? "No carrinho · " + inCart : "Presentear") + "</button></div></article>";
    }).join("");
  }

  $("#gifts").addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (!b) return;
    add(b.getAttribute("data-add"));
  });
  $("#chips").addEventListener("click", function (e) {
    var c = e.target.closest(".chip");
    if (!c) return;
    $$(".chip").forEach(function (x) { x.classList.toggle("is-on", x === c); });
    filter = c.getAttribute("data-cat"); renderGifts(true);
  });
  $("#sort").addEventListener("change", function () { sort = this.value; renderGifts(true); });

  $("#free-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var raw = $("#free-val").value.replace(/[^\d,.]/g, "").replace(/\.(?=\d{3}\b)/g, "").replace(",", ".");
    var v = Math.round(parseFloat(raw) * 100);
    if (!v || v < 100) { toast("Digite um valor a partir de R$ 1,00."); return; }
    $("#free-val").value = "";
    add("livre-" + v);
  });

  function add(id) {
    cart[id] = (cart[id] || 0) + 1;
    save(); sync();
    toast(itemOf(id).name + " adicionado aos presentes");
    $$("[data-cart-count]").forEach(function (el) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); });
  }
  function setQty(id, q) {
    if (q <= 0) delete cart[id]; else cart[id] = q;
    save(); sync();
  }
  function totals() {
    var n = 0, sum = 0;
    Object.keys(cart).forEach(function (id) { var it = itemOf(id); if (it) { n += cart[id]; sum += it.price * cart[id]; } });
    return { n: n, sum: Math.round(sum * 100) / 100 };
  }

  function sync() {
    var t = totals();
    $$("[data-cart-count]").forEach(function (el) { el.textContent = t.n; });
    $("#cart-total").textContent = brl(t.sum);
    $$("[data-co-total]").forEach(function (el) { el.textContent = brl(t.sum); });
    $("#go-checkout").disabled = t.n === 0;
    $("#go-checkout").style.opacity = t.n === 0 ? .5 : 1;

    var ids = Object.keys(cart).filter(itemOf);
    $("#cart-items").innerHTML = ids.length ? ids.map(function (id) {
      var it = itemOf(id);
      return '<div class="line"><div class="line__art" style="--art:' + CAT_ART[it.cat] + '"><svg class="ico"><use href="#i-' + it.icon + '"/></svg></div>' +
        '<div><div class="line__name">' + it.name + '</div><div class="line__price">' + brl(it.price) + "</div></div>" +
        '<div class="qty"><button type="button" data-q="' + id + '" data-d="-1" aria-label="Diminuir">−</button><span>' + cart[id] +
        '</span><button type="button" data-q="' + id + '" data-d="1" aria-label="Aumentar">+</button></div></div>';
    }).join("") :
      '<div class="empty"><svg class="ico"><use href="#i-gift"/></svg><p>Nenhum presente escolhido ainda.</p>' +
      '<a class="btn btn--ghost" href="#presentes" data-close>Ver a lista</a></div>';
    renderGifts();
  }
  $("#cart-items").addEventListener("click", function (e) {
    var b = e.target.closest("[data-q]");
    if (!b) return;
    var id = b.getAttribute("data-q");
    setQty(id, (cart[id] || 0) + Number(b.getAttribute("data-d")));
  });

  /* Gaveta */
  var drawer = $("#drawer"), scrim = $("#scrim"), modal = $("#checkout");
  function openDrawer() { scrim.hidden = false; drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); }
  function closeAll() {
    drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true");
    scrim.hidden = true; modal.hidden = true;
  }
  $$("[data-open-cart]").forEach(function (b) { b.addEventListener("click", openDrawer); });
  scrim.addEventListener("click", closeAll);
  document.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeAll(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) closeAll(); });

  function fab() {
    var f = $(".fab");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) f.classList.add("is-visible"); });
    });
    io.observe($("#presentes"));
    if (totals().n) f.classList.add("is-visible");
  }
  if (document.body.classList.contains("is-opened")) fab();

  /* Checkout */
  function step(n) { $$(".co-step").forEach(function (s) { s.hidden = s.getAttribute("data-step") !== String(n); }); }
  $("#go-checkout").addEventListener("click", function () {
    if (!totals().n) return;
    drawer.classList.remove("is-open"); scrim.hidden = true;
    step(1); modal.hidden = false;
    setTimeout(function () { $("#co-name").focus(); }, 50);
  });
  $("#co-form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!$("#co-name").value.trim()) { $("#co-name").focus(); toast("Escreva seu nome para os noivos saberem quem presenteou."); return; }
    var t = totals();
    var code = pixPayload(C.pix.key, C.pix.name, C.pix.city, t.sum, "CASAMENTO");
    $("#pix-code").value = code;
    var qr = $("#pix-qr"); qr.innerHTML = "";
    if (window.QRCode) {
      new QRCode(qr, { text: code, width: 360, height: 360, colorDark: "#2E3220", colorLight: "#FFFFFF", correctLevel: QRCode.CorrectLevel.M });
    } else {
      qr.textContent = "Use o código copia e cola ao lado.";
    }
    step(2);
  });
  $("#pix-copy").addEventListener("click", function () {
    var ta = $("#pix-code");
    var done = function () { toast("Código PIX copiado"); };
    var fallback = function () { ta.focus(); ta.select(); toast("Código selecionado. Copie com Ctrl+C ou segurando o dedo."); };
    try { navigator.clipboard.writeText(ta.value).then(done, fallback); } catch (e) { fallback(); }
  });
  $("#pix-paid").addEventListener("click", function () {
    var t = totals();
    var lines = Object.keys(cart).filter(itemOf).map(function (id) { return "• " + itemOf(id).name + (cart[id] > 1 ? " (x" + cart[id] + ")" : ""); });
    var msg = $("#co-msg").value.trim();
    $("#thanks-wa").href = wa("Oi! Aqui é " + $("#co-name").value.trim() + ". Acabei de enviar um PIX de " + brl(t.sum) +
      " de presente:\n" + lines.join("\n") + (msg ? "\n\nRecado: " + msg : "") + "\n\n(segue o comprovante)");
    cart = {}; save(); sync();
    step(3);
  });

  /* PIX "copia e cola" (BR Code / EMV) com valor */
  function pixPayload(key, name, city, amount, txid) {
    var clean = function (s, max) {
      return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9 ]/g, "").toUpperCase().slice(0, max);
    };
    var f = function (id, v) { return id + String(v.length).padStart(2, "0") + v; };
    var mai = f("00", "br.gov.bcb.pix") + f("01", key);
    var p = f("00", "01") + f("26", mai) + f("52", "0000") + f("53", "986") +
      (amount > 0 ? f("54", amount.toFixed(2)) : "") + f("58", "BR") +
      f("59", clean(name, 25)) + f("60", clean(city, 15)) + f("62", f("05", clean(txid, 25).replace(/ /g, "") || "***")) + "6304";
    return p + crc16(p);
  }
  function crc16(s) {
    var crc = 0xFFFF;
    for (var i = 0; i < s.length; i++) {
      crc ^= s.charCodeAt(i) << 8;
      for (var j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }

  /* Toast */
  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-on"); }, 2400);
  }

  sync();
})();

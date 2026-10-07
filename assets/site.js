/* A. Lanchares · Taller de Arte
   Menú móvil, aparición al hacer scroll y año del pie.
   Sin dependencias: se carga con `defer` al final del <head>. */

(function () {
  'use strict';

  /* --- Menú móvil ------------------------------------------------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var drawer = document.querySelector('[data-drawer]');

  function closeDrawer() {
    if (!toggle || !drawer) return;
    toggle.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      drawer.classList.toggle('is-open', !open);
      document.body.classList.toggle('is-locked', !open);
    });

    drawer.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeDrawer();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeDrawer();
    });

    // Si se pasa a escritorio con el menú abierto, hay que devolver el scroll.
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (event) {
      if (event.matches) closeDrawer();
    });
  }

  /* --- Aparición al hacer scroll ---------------------------------- */
  var targets = document.querySelectorAll('[data-reveal]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduced) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    targets.forEach(function (el, index) {
      el.style.transitionDelay = Math.min(index % 4, 3) * 80 + 'ms';
      observer.observe(el);
    });
  }

  /* --- Año del pie ------------------------------------------------ */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();

/* --- Clase de prueba: abre WhatsApp con el mensaje escrito ------------
   La web es estática, no hay servidor que reciba el formulario. Lo que
   hacemos es redactar el mensaje y abrir WhatsApp para que la persona
   solo tenga que darle a enviar.

   TELEFONO_TALLER es el número que recibe: el de Raquel, que lleva las
   reservas. Formato internacional sin signos: 34 + el móvil. Para
   cambiar quién recibe, cambia esta línea. Ojo: los botones de
   reservar y comprar de los .html llevan el número en el propio
   enlace, así que habría que cambiarlos también. */

(function () {
  'use strict';

  var TELEFONO_TALLER = '34660671394';

  var form = document.getElementById('form-prueba');
  if (!form) return;

  var error = document.getElementById('form-error');

  function mostrarError(texto) {
    if (!error) return;
    error.textContent = texto;
    error.hidden = false;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (error) error.hidden = true;

    var nombre = form.nombre.value.trim();
    var edad = form.edad.value.trim();
    var grupo = form.querySelector('input[name="grupo"]:checked');
    var franja = form.franja.value.trim();
    var nota = form.nota.value.trim();

    if (!nombre) { mostrarError('Nos falta tu nombre.'); form.nombre.focus(); return; }
    if (!edad)   { mostrarError('Nos falta la edad.'); form.edad.focus(); return; }
    if (!grupo)  { mostrarError('Dinos a qué grupo te gustaría ir.'); return; }

    var lineas = [
      '¡Hola! Me gustaría probar una clase.',
      '',
      'Nombre: ' + nombre,
      'Edad: ' + edad,
      'Grupo: ' + grupo.value
    ];
    if (franja) lineas.push('Franja: ' + franja);
    if (nota) lineas.push('', nota);

    var url = 'https://wa.me/' + TELEFONO_TALLER + '?text=' + encodeURIComponent(lineas.join('\n'));

    // Se abre en otra pestaña; si el navegador la bloquea, navegamos aquí.
    var ventana = window.open(url, '_blank', 'noopener');
    if (!ventana) window.location.href = url;
  });
})();

/* --- Ficha de inscripción: PDF para compartir ------------------------------
   La web es estática, no hay servidor que reciba el formulario. Con los
   datos se crea un PDF en el propio dispositivo y se comparte (en el móvil,
   el menú de compartir deja elegir WhatsApp); si no se puede compartir, se
   descarga. Nada se envía a ningún servidor. El PDF se genera aquí mismo, sin
   librerías externas. TELEFONO_TALLER: el de Raquel. */

(function () {
  'use strict';

  var TELEFONO_TALLER = '34660671394';

  var form = document.getElementById('form-inscripcion');
  if (!form) return;

  var error = document.getElementById('ins-error');
  var ok = document.getElementById('ins-ok');

  function mostrarError(texto) {
    if (ok) ok.hidden = true;
    if (error) { error.textContent = texto; error.hidden = false; }
    return null;
  }

  // Marca los campos que faltan y deja el aviso a la vista, junto al botón.
  function limpiarMarcas() {
    Array.prototype.forEach.call(form.querySelectorAll('.falta'), function (e) { e.classList.remove('falta'); });
  }
  form.addEventListener('input', limpiarMarcas);
  form.addEventListener('change', limpiarMarcas);

  function mostrarFaltas(faltan) {
    limpiarMarcas();
    if (ok) ok.hidden = true;
    if (!error) return null;
    var html = 'Falta por completar: ';
    html += faltan.map(function (f) {
      var el = document.getElementById(f.id);
      if (el) (el.closest('.campo, .bloque, .opcion') || el).classList.add('falta');
      return '<a href="#' + f.id + '" data-ir="' + f.id + '">' + f.texto + '</a>';
    }).join(', ') + '.';
    error.innerHTML = html;
    error.hidden = false;
    if (error.scrollIntoView) error.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return null;
  }

  // Tocar un campo de la lista lleva hasta él.
  if (error) error.addEventListener('click', function (event) {
    var enlace = event.target.closest('a[data-ir]');
    if (!enlace) return;
    event.preventDefault();
    var el = document.getElementById(enlace.getAttribute('data-ir'));
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    if (el.focus && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) el.focus({ preventScroll: true });
  });

  function esMenor(iso) {
    var n = new Date(iso);
    if (isNaN(n)) return false;
    var hoy = new Date();
    var edad = hoy.getFullYear() - n.getFullYear();
    var m = hoy.getMonth() - n.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < n.getDate())) edad--;
    return edad < 18;
  }

  function fechaLegible(iso) {
    var p = iso.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  /* Lee y valida el formulario. Devuelve null (y muestra el aviso) si falta algo. */
  function leerFicha() {
    var v = function (n) { return form.elements[n].value.trim(); };
    var grupos = Array.prototype.map.call(
      form.querySelectorAll('input[name="grupo"]:checked'),
      function (i) { return i.value; }
    );
    var menor = v('nacimiento') && esMenor(v('nacimiento'));

    var pago = form.querySelector('input[name="pago"]:checked');

    var faltan = [];
    if (!v('nombre'))      faltan.push({ id: 'ins-nombre', texto: 'el nombre' });
    if (!v('apellidos'))   faltan.push({ id: 'ins-apellidos', texto: 'los apellidos' });
    if (!v('nacimiento'))  faltan.push({ id: 'ins-nacimiento', texto: 'la fecha de nacimiento' });
    if (!grupos.length)    faltan.push({ id: 'bloque-grupos', texto: 'al menos un grupo' });
    if (menor && !v('tutor'))    faltan.push({ id: 'ins-tutor', texto: 'el nombre de la madre, padre o tutor' });
    if (menor && !v('tutorTel')) faltan.push({ id: 'ins-tutor-tel', texto: 'el tel\u00e9fono de la madre, padre o tutor' });
    if (!pago)             faltan.push({ id: 'bloque-pago', texto: 'c\u00f3mo prefieres pagar' });
    if (!form.normas.checked) faltan.push({ id: 'ins-normas', texto: 'aceptar las normas de funcionamiento' });
    if (!form.datos.checked)  faltan.push({ id: 'ins-datos', texto: 'el permiso de tratamiento de datos' });
    if (faltan.length) return mostrarFaltas(faltan);

    var familiar = form.querySelector('input[name="familiar"]:checked');
    var conocio = form.querySelector('input[name="conocio"]:checked');

    var secciones = [
      ['Quién se apunta', [
        'Nombre: ' + v('nombre') + ' ' + v('apellidos'),
        'Fecha de nacimiento: ' + fechaLegible(v('nacimiento'))
      ]],
      ['Grupos', grupos.map(function (g) { return '- ' + g; })],
    ];
    var contacto = [];
    if (v('telefono')) contacto.push('Teléfono: ' + v('telefono'));
    if (contacto.length) secciones.push(['Cómo localizarle', contacto]);
    if (menor) {
      var t = ['Nombre: ' + v('tutor')];
      if (v('tutorDni')) t.push('DNI: ' + v('tutorDni'));
      t.push('Teléfono: ' + v('tutorTel'));
      secciones.push(['Madre, padre o tutor legal', t]);
    }
    var otros = ['Forma de pago: ' + pago.value];
    if (familiar) otros.push('Familiar directo inscrito: ' + familiar.value);
    if (conocio) otros.push('Nos conoció por: ' + conocio.value);
    if (v('nota')) otros.push('Nota: ' + v('nota'));
    secciones.push(['Otros datos', otros]);
    secciones.push(['Normas y permisos', [
      'Acepta las normas de funcionamiento: Sí',
      'Autoriza el tratamiento de datos: Sí',
      'Autoriza el uso de imagen: ' + (form.imagen.checked ? 'Sí' : 'No')
    ]]);

    return {
      nombre: v('nombre') + ' ' + v('apellidos'),
      secciones: secciones
    };
  }

  /* ---- Generador de PDF mínimo (texto, Helvetica, A4) ------------------ */

  // Anchos de Helvetica (milésimas de em) de los caracteres 32 a 126.
  var ANCHOS = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,
    556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,
    667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,
    278,278,278,469,556,333,
    556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,
    334,260,334,584];

  function ancho(texto, tam, negrita) {
    var w = 0;
    for (var i = 0; i < texto.length; i++) {
      var c = texto.charCodeAt(i);
      w += (c >= 32 && c <= 126) ? ANCHOS[c - 32] : 600;
    }
    return w * tam / 1000 * (negrita ? 1.07 : 1);
  }

  // Unicode -> byte de WinAnsi (lo que entiende el PDF con Helvetica).
  var ESPECIALES = { '–': 0x96, '—': 0x97, '€': 0x80, '’': 0x92, '‘': 0x91, '“': 0x93, '”': 0x94, '…': 0x85, '•': 0x95 };
  function aBytes(texto) {
    var s = '';
    for (var i = 0; i < texto.length; i++) {
      var ch = texto.charAt(i);
      var c = texto.charCodeAt(i);
      if (ESPECIALES[ch]) c = ESPECIALES[ch];
      else if (c > 255) c = 63; // '?'
      if (c === 40 || c === 41 || c === 92) s += '\\';
      s += String.fromCharCode(c);
    }
    return s;
  }

  function ajustar(texto, max, tam, negrita) {
    var lineas = [];
    texto.split('\n').forEach(function (parrafo) {
      var palabras = parrafo.split(' ');
      var actual = '';
      palabras.forEach(function (p) {
        var prueba = actual ? actual + ' ' + p : p;
        if (ancho(prueba, tam, negrita) <= max || !actual) actual = prueba;
        else { lineas.push(actual); actual = p; }
      });
      lineas.push(actual);
    });
    return lineas;
  }

  function crearPdf(ficha) {
    var W = 595, H = 842, M = 56, ANCHO_UTIL = W - 2 * M;
    var paginas = [];
    var y, cont;

    function nuevaPagina() {
      cont = [];
      paginas.push(cont);
      y = H - M;
    }
    function texto(t, x, tam, negrita, gris) {
      cont.push('BT /' + (negrita ? 'F2' : 'F1') + ' ' + tam + ' Tf ' +
        (gris ? '0.42 0.39 0.36 rg ' : '0.17 0.16 0.15 rg ') +
        x + ' ' + y.toFixed(1) + ' Td (' + aBytes(t) + ') Tj ET');
    }
    function linea(t, tam, negrita, gris, sangria) {
      var lh = tam * 1.45;
      ajustar(t, ANCHO_UTIL - (sangria || 0), tam, negrita).forEach(function (l) {
        if (y - lh < M) nuevaPagina();
        y -= lh;
        texto(l, M + (sangria || 0), tam, negrita, gris);
      });
    }
    function regla() {
      y -= 8;
      cont.push('0.85 0.80 0.76 RG 0.6 w ' + M + ' ' + y.toFixed(1) + ' m ' + (W - M) + ' ' + y.toFixed(1) + ' l S');
      y -= 6;
    }

    nuevaPagina();
    linea('A. Lanchares · Taller de Arte', 9, false, true);
    y -= 4;
    linea('Ficha de inscripción', 20, true);
    var hoy = new Date();
    linea('Fecha: ' + ('0' + hoy.getDate()).slice(-2) + '/' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '/' + hoy.getFullYear(), 10, false, true);
    regla();

    ficha.secciones.forEach(function (s) {
      y -= 10;
      if (y < M + 60) nuevaPagina();
      linea(s[0].toUpperCase(), 9, true, true);
      y -= 2;
      s[1].forEach(function (x) {
        var sang = x.charAt(0) === '-' ? 8 : 0;
        linea(x, 11, false, false, sang);
      });
    });

    // Ensamblado del archivo
    var objs = [];
    objs[1] = '<< /Type /Catalog /Pages 2 0 R >>';
    var kids = [];
    var base = 5;
    paginas.forEach(function (c, i) {
      var pObj = base + i * 2, cObj = pObj + 1;
      kids.push(pObj + ' 0 R');
      var flujo = c.join('\n');
      objs[pObj] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + W + ' ' + H + '] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ' + cObj + ' 0 R >>';
      objs[cObj] = '<< /Length ' + flujo.length + ' >>\nstream\n' + flujo + '\nendstream';
    });
    objs[2] = '<< /Type /Pages /Kids [' + kids.join(' ') + '] /Count ' + paginas.length + ' >>';
    objs[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
    objs[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';

    var salida = '%PDF-1.4\n';
    var offsets = [];
    for (var i = 1; i < objs.length; i++) {
      offsets[i] = salida.length;
      salida += i + ' 0 obj\n' + objs[i] + '\nendobj\n';
    }
    var xref = salida.length;
    salida += 'xref\n0 ' + objs.length + '\n0000000000 65535 f \n';
    for (var j = 1; j < objs.length; j++) {
      salida += ('0000000000' + offsets[j]).slice(-10) + ' 00000 n \n';
    }
    salida += 'trailer\n<< /Size ' + objs.length + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';

    var bytes = new Uint8Array(salida.length);
    for (var k = 0; k < salida.length; k++) bytes[k] = salida.charCodeAt(k) & 255;
    return new Blob([bytes], { type: 'application/pdf' });
  }

  function nombreArchivo(ficha) {
    var base = ficha.nombre.normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return 'ficha-inscripcion-' + (base || 'alumno') + '.pdf';
  }

  function descargar(blob, nombre) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function avisoOk(html) {
    if (!ok) return;
    ok.innerHTML = html;
    ok.hidden = false;
  }

  function fallo(detalle) {
    if (ok) ok.hidden = true;
    if (!error) return;
    error.innerHTML = 'No hemos podido ' + detalle + '. Prueba a abrir esta p&#225;gina en Safari o Chrome, ' +
      'o escr&#237;benos por WhatsApp al <a class="text-link" href="https://wa.me/' + TELEFONO_TALLER +
      '" target="_blank" rel="noreferrer">660&nbsp;671&nbsp;394</a> y te ayudamos.';
    error.hidden = false;
  }

  // Los navegadores internos de Instagram, Facebook, TikTok... no dejan compartir ni descargar archivos.
  var enApp = /Instagram|FBAN|FBAV|FB_IAB|Messenger|TikTok|Line\/|Snapchat|Twitter/i.test(navigator.userAgent);
  var aviso = document.getElementById('ins-app');
  if (enApp && aviso) aviso.hidden = false;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (error) error.hidden = true;
    if (ok) ok.hidden = true;
    limpiarMarcas();

    var ficha = leerFicha();
    if (!ficha) return;

    var blob, nombre;
    try {
      blob = crearPdf(ficha);
      nombre = nombreArchivo(ficha);
    } catch (e) {
      fallo('crear el PDF');
      return;
    }

    // El menú de compartir tiene que abrirse en el mismo gesto del toque, sin esperas.
    if (navigator.canShare && typeof File === 'function') {
      try {
        var archivo = new File([blob], nombre, { type: 'application/pdf' });
        if (navigator.canShare({ files: [archivo] })) {
          navigator.share({ files: [archivo] }).then(function () {
            avisoOk('Listo. Si no has llegado a enviar la ficha, vuelve a pulsar el bot&#243;n.');
          }).catch(function (e) {
            // Cerrar el menú de compartir no es un fallo.
            if (e && e.name === 'AbortError') return;
            try { descargar(blob, nombre); } catch (x) { fallo('compartir ni descargar el PDF'); return; }
            avisoOk('No se ha podido abrir el men&#250; de compartir, as&#237; que se ha descargado la ficha (<strong>' + nombre + '</strong>). ' +
              'Adj&#250;ntala en el chat del taller: <a class="text-link" href="https://wa.me/' + TELEFONO_TALLER + '" target="_blank" rel="noreferrer">abrir WhatsApp &#8599;</a>');
          });
          return;
        }
      } catch (e) { /* seguimos con la descarga */ }
    }

    try {
      descargar(blob, nombre);
    } catch (e) {
      fallo('descargar el PDF');
      return;
    }
    avisoOk('Se ha descargado la ficha en PDF (<strong>' + nombre + '</strong>). ' +
      'Para enviárnosla, ábrela en WhatsApp y adjunta el archivo: ' +
      '<a class="text-link" href="https://wa.me/' + TELEFONO_TALLER + '" target="_blank" rel="noreferrer">abrir el chat del taller &#8599;</a>');
  });
})();

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

/* --- Ver la tarjeta regalo más grande -------------------------------
   El visor es un <dialog>, así que el navegador se encarga de cerrar
   con Escape y de no dejar el foco por detrás. La tarjeta no se
   duplica en el HTML: se clona la que ya está en la página. */

(function () {
  'use strict';

  var boton = document.querySelector('[data-ampliar]');
  var visor = document.querySelector('[data-visor]');
  if (!boton || !visor) return;

  // Sin soporte de <dialog> no hay visor: mejor no ofrecer el botón.
  if (typeof visor.showModal !== 'function') {
    boton.hidden = true;
    return;
  }

  var destino = visor.querySelector('[data-destino]');
  var cerrar = visor.querySelector('[data-cerrar]');
  var cara = document.querySelector('.tarjeta__cara');

  boton.addEventListener('click', function () {
    destino.textContent = '';
    destino.appendChild(cara.cloneNode(true));
    visor.showModal();
  });

  if (cerrar) cerrar.addEventListener('click', function () { visor.close(); });

  // Pulsar fuera de la tarjeta cierra el visor.
  visor.addEventListener('click', function (event) {
    if (!event.target.closest('.tarjeta__cara') && !event.target.closest('[data-cerrar]')) {
      visor.close();
    }
  });

  visor.addEventListener('close', function () {
    destino.textContent = '';
    boton.focus();
  });
})();

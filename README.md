# A. Lanchares · Taller de Arte

Web del taller de dibujo y pintura de Logroño. Sitio estático: HTML, CSS y un archivo de
JavaScript de cincuenta líneas. Sin framework, sin compilar y sin dependencias que
instalar.

El estilo es editorial y minimalista: fondo casi blanco, tipografía Cormorant Garamond en
versales muy espaciadas para los titulares, Jost para el texto, todo a escuadra (nada
redondeado) y bandas de fotografía a sangre. La marca va centrada en la barra de arriba y
la navegación entera vive en un menú desplegable, a la derecha, igual en móvil que en
escritorio.

La portada es deliberadamente corta: foto grande, una presentación y la segunda
fotografía. Todo lo demás (clases, monográficos, el taller, contacto) se llega desde el
menú.

> ⚠️ **El contenido es provisional.** Antes de publicar hay que revisar los datos, que
> están resaltados en la propia web. Lee [REVISAR.md](REVISAR.md).

## Verla en local

Desde esta carpeta:

```bash
python3 -m http.server 8080
```

Y abre `http://localhost:8080`. Ábrela siempre por `http://`, no con `file://`.

## Estructura

```
index.html          Portada
el-taller.html      El espacio
quien-hay-detras.html  Arancha, Raquel y Valeria
clases.html         Clases regulares, horarios, tarifas y preguntas frecuentes
talleres.html       Talleres y monográficos de fin de semana
contacto.html       Datos de contacto, mapa y cómo llegar
probar-clase.html   Formulario de clase de prueba que abre WhatsApp
404.html            Página de error

assets/styles.css   Todos los estilos
assets/site.js      Menú del móvil, aparición al hacer scroll y año del pie
assets/favicon.svg  Icono de la pestaña
assets/images/      Fotos (ahora mismo, provisionales)

_headers            Caché y cabeceras de seguridad (Cloudflare)
wrangler.jsonc      Configuración de despliegue (Cloudflare)
robots.txt          Permite la indexación y apunta al sitemap
sitemap.xml         Lista de páginas para los buscadores
```

Son páginas HTML de verdad, una por dirección. No hay enrutado por JavaScript: cada
página se carga sola, funciona sin JS y los buscadores la leen entera. A cambio, **la
cabecera y el pie están repetidos en los seis archivos**: si cambias un enlace del menú,
hay que cambiarlo en los seis.

## Editar el contenido

- **Textos y datos**: están en el HTML de cada página, tal cual. Busca la frase que
  quieras cambiar y cámbiala.
- **Colores y tipografías**: en el bloque `:root` del principio de `assets/styles.css`.
- **Quién recibe las reservas**: todos los botones de acción (reservar plaza, comprar bono,
  reservar un taller, avisadme del próximo) van al WhatsApp de Raquel. El número está en dos
  sitios y hay que cambiar los dos: la constante `TELEFONO_TALLER` al final de
  `assets/site.js`, que es la que usa el formulario de clase de prueba, y los propios
  enlaces `https://wa.me/34…` de los `.html`. Para encontrarlos todos:
  `grep -rn "wa.me" *.html assets/site.js`.
- **Horario**: está dos veces en `clases.html`, y hay que tocar las dos. La tabla
  semanal (`.tabla-horario`, se ve en escritorio) tiene una fila por franja horaria y una
  columna por día; la lista por días (`.week`, se ve en el móvil) repite la misma
  información. Una clase se escribe igual en las dos: un `<span class="clase clase--X">`
  con el grupo y el nombre de la profesora dentro. Cada profesora tiene su color, en
  `.clase--arancha`, `.clase--raquel` y `.clase--valeria`.
- **Añadir un monográfico**: copia un bloque `<article class="workshop">` de
  `talleres.html` y cambia la fecha, el título y los datos.
- **La muestra de la tarjeta regalo**: está en `index.html`, dibujada con CSS en el bloque
  `<figure class="tarjeta">`. No es una imagen, así que el texto se edita ahí mismo. Al
  pulsarla se abre ampliada en un `<dialog>`, que clona esa misma tarjeta: no hay una
  segunda copia que mantener.
- **Cambiar una foto**: guárdala en `assets/images/` y cambia el `src` en el HTML.
  Cambia también el `alt`, y el `width` y el `height` por los píxeles reales.
- **Añadir una página**: copia un `.html` existente, cámbiale el contenido del `<main>`,
  y añade el enlace al menú y al pie **de las ocho páginas**. Acuérdate de sumarla a
  `sitemap.xml`.

Después de tocar `styles.css` o `site.js`, súbele el número a `?v=1` en el `<link>` y el
`<script>` de las seis páginas. Así los navegadores que ya hayan visitado la web se
bajan la versión nueva en vez de servir la vieja de su caché.

## Publicar

Al ser estática vale cualquier hosting. Con Cloudflare, desde esta carpeta:

```bash
npx wrangler deploy
```

Si se publica en un dominio distinto de `tallerlanchares.es`, hay que cambiar las URL de
`sitemap.xml`, `robots.txt` y las etiquetas `canonical` y `og:url` de cada página.

## Accesibilidad

La web se maneja con teclado, tiene enlace para saltar al contenido, todas las imágenes
llevan texto alternativo y las animaciones se desactivan solas si el sistema tiene puesto
«reducir movimiento». Al añadir contenido conviene mantenerlo: un `alt` que describa la
foto y un solo `<h1>` por página.

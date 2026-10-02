# Qué hay que revisar antes de publicar

Esta web está montada y funciona, pero **el contenido es provisional**. Lo escribí a
partir de lo que hay publicado en directorios de internet y de suposiciones razonables
sobre cómo funciona una academia de dibujo y pintura. Casi nada de esto está confirmado.

Todo lo que hay que confirmar lleva el atributo `data-pendiente` en el código. **Ya no se
resalta en pantalla**: la regla que lo pintaba está comentada al final de
`assets/styles.css`, por si algún día quieres volver a verlo mientras revisas.

Para encontrarlos todos desde la terminal, dentro de la carpeta del proyecto:

```bash
grep -rn "data-pendiente" *.html
```

Cuando el contenido esté revisado, hay que quitar el modo borrador. Son tres cosas:

1. Borrar el bloque `<div class="draft-flag">…</div>` del principio de los siete `.html`
   (está señalado con un comentario `<!-- BORRADOR -->`).
2. Borrar la regla `.draft-flag` de `assets/styles.css`, y el bloque comentado de
   `[data-pendiente]` que hay justo debajo.
3. Borrar los bloques `<div class="note">` que avisan de que los datos son de ejemplo
   (hay uno en `clases.html`, otro en `talleres.html` y otro en `contacto.html`).

---

## 1. Datos de contacto — lo más urgente

| Dato | Lo que he puesto | De dónde sale |
| --- | --- | --- |
| Dirección | Plaza del Mercado 15, 26001 Logroño | Directorios de internet |
| Teléfono Arancha | 670 738 577 | **Confirmado**, me lo pasaste tú |
| Teléfono Raquel | 660 671 394 | **Confirmado**, me lo pasaste tú |
| Teléfono Valeria | 649 599 775 | **Confirmado**, me lo pasaste tú |
| Correo | `hola@tallerlanchares.es` | **Inventado**, no existe |
| Instagram | @taller_lanchares | Confirmado, me lo pasaste tú |
| Dominio | `tallerlanchares.es` | Aparece en un directorio; el dominio responde pero no tiene web |

El teléfono ya está confirmado. **La dirección sigue saliendo de páginas de terceros y
hay que comprobarla**: salen en el pie de todas las
páginas, en el menú del móvil, en `contacto.html`, en los enlaces de WhatsApp
(`https://wa.me/34670738577`) y dentro de los bloques de datos estructurados
(`application/ld+json`) de `index.html` y `contacto.html`.

El correo me lo he inventado entero. Si no hay correo, lo mejor es quitar esa fila
de `contacto.html` en vez de dejar uno que no lee nadie.

**Los tres móviles salen publicados** en la página de contacto y en la del formulario, con
el nombre de cada una y un acceso directo a su WhatsApp. Los pusiste tú a propósito, pero
conviene saber que un número en una web abierta acaba recogido por robots y trae spam y
llamadas comerciales. Si en algún momento molesta, se quitan los dos personales y se deja
solo el del taller.

## 2. Quiénes dais clase

Ya está con lo que me dijiste: **Arancha fundó la academia**, estudió decoración pero se
ha dedicado toda su vida a dar clase, y más adelante se unieron **Raquel** (Bellas Artes) y
**Valeria** (diseño de moda). Antes ponía que Arancha era licenciada en Bellas Artes y que
llevaba más de treinta años dando clase: las dos cosas me las había inventado yo.

Queda por confirmar:

- El apellido de Arancha (ahora pone «Arancha Lanchares», sacado de un listado de
  academias) y si quiere aparecer con nombre completo o solo con el nombre.
- **El año en que fundó la academia.** Ahora no se dice en ninguna parte, porque no lo sé.
  Si me lo pasas, queda mucho mejor un «desde 19XX» que un «desde hace tantos años», que
  hay que ir actualizando.
- Los apellidos de Raquel y Valeria, si queréis que aparezcan.

La cita de la portada («No hace falta saber dibujar para empezar…») también es mía y está
atribuida a Arancha. O la cambiáis por una frase vuestra de verdad, o la quitáis.

## 3. Horarios y precios

**Ya está todo confirmado**: las diecinueve clases de Arancha, Raquel y Valeria, con su
grupo (adultos, niños o mixto), y la cuota de 50 € al mes.

Lo único que queda por aclarar aquí:

- **El precio de la clase suelta**, si la ofrecéis. No está puesto en la web porque no me
  lo has dicho todavía.
- Si la primera clase de prueba es gratis. Ojo con esto: en las preguntas frecuentes pone
  que sí, pero eso me lo inventé yo, y si además cobráis clases sueltas hay que dejar claro
  qué se paga y qué no.
- Si el curso va de septiembre a junio.
- Qué material está incluido en la cuota y cuál no.
- Si hay intensivos en julio.

## 4. Talleres y monográficos

Las tres fechas ya son las reales, con la información sacada de la web de Vamala, como me
dijiste, porque son los mismos talleres en otro día:

| Fecha | Taller | Para | Precio |
| --- | --- | --- | --- |
| Domingo 1 de noviembre | Halloween | Niños | 40 € |
| Domingo 13 de diciembre | Tarjetas navideñas | Adultos | 50 € |
| Domingo 20 de diciembre | Navidad | Niños | 40 € |

Los tres de 10:00 a 13:00, con 12 plazas. Dos cosas a confirmar:

- **Los precios, el horario y las 12 plazas son los de Vamala.** Si en el taller cobráis
  distinto o cabe más gente, hay que cambiarlo.
- En Vamala esos talleres caen en sábado (31 de octubre, 12 y 19 de diciembre) y los que me
  has dado caen los tres en **domingo**. Encaja con que sean los mismos en otro día, pero
  conviene comprobarlo antes de publicarlo.

En esa página ya no queda nada inventado: la política de cancelación de las 48 horas, que
era mía, se ha ido junto con el apartado de «Apuntarse es rápido». Si queréis que la web
diga algo sobre cancelaciones, hay que escribirlo con las condiciones de verdad.

Una cosa que conviene comprobar en el apartado de artistas invitados: escribí
**Alejandro Rosenberg** con «n», que es como aparece en la web de Vamala y como se escribe
habitualmente, pero tú me lo pasaste como «Rosemberg» con «m». Son nombres de personas
reales en una web pública, así que mejor confirmarlo. Lo mismo con los acentos de Nono
García y Arantzazu Martínez, que he puesto yo.

Para cambiar un taller, edita su bloque `<article class="workshop">`: el día y el mes van
en `workshop__date`, el título en el `<h3>`, la descripción en el `<p class="prose">` y el
horario, el público, las plazas y el precio en la línea de `workshop__tags`. Para añadir
otro, copia un `<article>` entero; para quitarlo, bórralo.

## 5. Cómo llegar

Lo de `contacto.html` (diez minutos desde Gran Vía, la plaza peatonal, el aparcamiento,
las líneas de autobús) lo he deducido de mirar el mapa. Conviene comprobarlo, sobre todo
el aparcamiento y los autobuses, que es lo que más molesta si está mal.

El mapa está centrado en la Plaza del Mercado con coordenadas 42.4661, −2.4449. Si el
portal exacto es otro, hay que ajustar el `src` del `<iframe class="map">` y la latitud y
longitud del bloque `ld+json` del final de la página.

## 6. Fotografías

Ya son las tuyas, once fotos del taller, y están repartidas por toda la web. Tres cosas
antes de publicar:

- **`IMG_5136.jpg` sale gente.** Son tres personas de espaldas, sin caras reconocibles, en
  la banda grande de la portada. Si son menores, conviene tener el permiso por escrito de
  las familias aunque no se les vea la cara. Si no lo tienes, cámbiala por otra.
- **Esa misma foto lleva marcada arriba la silueta de un avatar de Instagram** en la
  esquina de abajo a la izquierda. Si tienes el original sin ese icono, mejor usar ese.
- **Pesan mucho**: entre 250 KB y 900 KB cada una, cerca de 5 MB en total. Conviene
  comprimirlas antes de publicar para que la web cargue rápido en el móvil.

Los nombres (`IMG_5128.jpg`…) funcionan, pero si algún día quieres cambiarlos por nombres
descriptivos, acuérdate de cambiar también el `src` en el HTML. **`IMG_5134.jpg` y
`IMG_5137.jpg` están en la carpeta pero no se usan en ninguna página**, así que puedes
borrarlas o colocarlas en algún sitio.

## 7. La tarjeta regalo

El apartado está en la portada con cuatro modalidades: bono de 10 clases (130 €), clase
suelta (15 €), taller creativo de fin de semana (40 € o 50 €) y un mes de pintura (50 € o
90 €). Cada una tiene su botón «Comprar» al lado, que abre el WhatsApp de Raquel diciendo
cuál de las cuatro es.

Los precios salen al lado de cada modalidad. Los de las dos que tienen dos importes se leen
solos: el taller son 40 € el de niños y 50 € el de adultos, y el mes son 50 € viniendo un
día por semana y 90 € viniendo dos.

Para orientarte, con vuestras propias tarifas: un mes de un día por semana son 50 € por
unas cuatro sesiones, o sea 12,50 € la sesión de dos horas. Diez sesiones al mismo precio
salen 125 €. Como bono suele tener sentido dejarlo en un número redondo algo por debajo,
por ejemplo 110 o 120 €, para que compense frente a pagar mes a mes.

La muestra de la tarjeta está dibujada con CSS, no es una imagen: se cambia editando el
bloque `<figure class="tarjeta">` de `index.html`. Se puede pulsar para verla más grande;
el visor no duplica la tarjeta, la clona de la que ya está en la página, así que con
editarla una vez basta. Ahora pone «Bono de 10 clases» como
ejemplo. Si algún día queréis imprimirlas de verdad, esto sirve de boceto para la imprenta,
no como archivo final.

Pendiente de decidir:

- **Si la tarjeta caduca.** No pone nada porque no lo sé; lo habitual
  es un año.
- Si se puede regalar a nombre de otra persona o basta con entregar la tarjeta.

## 7. El formulario de clase de prueba

La página `probar-clase.html` recoge nombre, edad, grupo, franja y un comentario, y al
enviar **abre WhatsApp en el teléfono de quien lo rellena** con el mensaje ya escrito.
La web no guarda nada ni manda nada a ningún servidor: es la propia persona quien pulsa
enviar desde su WhatsApp.

**Ahora mismo le llega solo al 670 738 577.** Una web estática no puede repartir un
mensaje a tres números: no existe enlace de WhatsApp que escriba a varios a la vez. Para
que os llegue a las tres hay tres caminos:

1. **WhatsApp Business con varios dispositivos** (lo más sencillo y gratis). Registráis el
   670 738 577 en WhatsApp Business y las tres enlazáis vuestro móvil u ordenador a esa
   misma cuenta: hasta cuatro dispositivos. Las tres veis y respondéis las mismas
   conversaciones. No hay que tocar nada de la web.
2. **Un servicio de formularios** (Formspree, Basin y similares tienen plan gratuito). El
   formulario se envía al servicio y este manda un correo a las tres. Llega a las tres,
   pero por correo, no por WhatsApp, y hay que crear cuenta y añadir aviso de privacidad.
3. **La API de WhatsApp Business con un Worker de Cloudflare.** Esto sí reparte a los tres
   WhatsApp de verdad, pero exige cuenta de Meta Business, verificar el número y que Meta
   apruebe las plantillas de mensaje. Es mucho montaje para lo que se gana.

Para cambiar el número que recibe, está en una sola línea al final de `assets/site.js`:
la constante `TELEFONO_TALLER`.

**Sobre los datos personales.** Como la web no almacena ni transmite nada, no hace falta
formulario de consentimiento ni banner. Pero en cuanto los mensajes llegan a vuestro
WhatsApp sí tenéis datos de personas, y algunos de menores. Dos cosas a tener en cuenta:

- El formulario pide que, si la clase es para un menor, escriba la madre, el padre o el
  tutor. Conviene mantener ese aviso.
- Si en algún momento añadís aviso legal y política de privacidad a la web, hay que
  mencionar que respondéis por WhatsApp y cuánto tiempo guardáis esas conversaciones.

## 7. Decisiones pendientes

- **Formulario de contacto.** Ahora no hay: se contacta por WhatsApp, teléfono, correo e
  Instagram. Es lo más simple y no requiere tratar datos personales. Si quieres un
  formulario, hay que contratar un servicio que reciba los envíos y añadir aviso legal y
  política de privacidad.
- **Aviso legal, privacidad y cookies.** La web tal como está no pone cookies ni recoge
  datos, así que no necesita banner. Eso cambia en cuanto añadas un formulario,
  analítica o un mapa de Google (el de OpenStreetMap que hay ahora no rastrea).
- **El dominio.** `tallerlanchares.es` está registrado pero sin web. Hay que averiguar
  quién lo tiene antes de contar con él. Todas las URL de `sitemap.xml`, `robots.txt` y
  las etiquetas `canonical` y `og:url` de cada página apuntan ahí: si al final el dominio
  es otro, hay que cambiarlas.

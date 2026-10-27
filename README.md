# Portafolio de diseño + desarrollo

Portafolio responsive de Miguel Tapia con fondo claro, tipografía editorial, ilustración animada y galerías de imagen y video. Está construido con React, TypeScript y Next.js. La compilación de producción genera una web estática para Netlify en `out/`, sin servidor ni funciones.

## Requisitos

- Visual Studio Code
- Node.js 22.13 o superior. Se recomienda Node.js 24 LTS.
- npm
- Git y Git LFS para clonar el repositorio con todos sus videos e imágenes.

## Clonar con los medios originales

Los videos, GIF e imágenes se guardan en Git LFS. Después de clonar el repositorio (con una cuenta autorizada si es privado):

```bash
git lfs install --local
git lfs pull
npm ci
npm run dev
```

Una descarga ZIP puede contener solo punteros de LFS; se recomienda clonar y ejecutar `git lfs pull`. El consumo de almacenamiento y descargas de LFS depende de la cuota de la cuenta. No se necesita cambiar la visibilidad del repositorio ni contratar servicios para ejecutar el proyecto localmente.

## Qué incluye el repositorio

Incluye el código, los medios del sitio, las fuentes y sus licencias, pruebas, configuración y el archivo de dependencias bloqueadas. No incluye `node_modules`, compilaciones, cachés, credenciales, configuraciones personales ni copias duplicadas de `outputs/` y `work/`.

La carpeta `outputs/portfolio-cristal-vscode-node24` sigue siendo una copia local de entrega; el código de la raíz es la fuente canónica de GitHub. Consulta [SECURITY.md](SECURITY.md) para las reglas de privacidad. No se concede una licencia abierta a los medios de terceros: se conservan sus créditos y deben revisarse sus permisos antes de publicar el sitio.

## Abrir y ejecutar

1. Abre esta carpeta en Visual Studio Code.
2. Abre la terminal integrada desde **Terminal → Nueva terminal**.
3. Instala las dependencias:

```bash
npm install
```

4. Inicia el sitio:

```bash
npm run dev
```

5. Abre `http://localhost:3000` en tu navegador.

## Crear una versión de producción

```bash
npm run build
npm run start
```

`npm run start` sirve la exportación localmente en `http://localhost:3000`, incluyendo soporte para buscar posiciones dentro de los videos. No uses `next start` con `output: "export"`.

## Desplegar en Netlify

Primero sube estos cambios a GitHub. `netlify.toml` contiene la configuración de compilación y publicación; no se debe publicar `.next`, `dist` ni la raíz del repositorio.

| Ajuste | Valor |
| --- | --- |
| Branch to deploy | `main` |
| Base directory | Vacío (raíz del repositorio) |
| Build command | `npm run build` |
| Publish directory | `out` |
| Functions directory | Vacío; no se necesitan funciones |

Antes del primer despliegue, agrega **`GIT_LFS_ENABLED=true` en la interfaz de Netlify**. Debe configurarse allí, no en `netlify.toml`, porque los medios se descargan antes de leer ese archivo. No restrinjas `GIT_LFS_FETCH_INCLUDE` a una selección incompleta de extensiones. Si un intento anterior descargó solo punteros, vuelve a desplegar borrando la caché de compilación.

La versión Node 24, la desactivación de telemetría de Next y la opción de omitir el runtime dinámico están declaradas en `netlify.toml`. La comprobación previa detiene los builds de Netlify si faltan los medios originales de LFS. Las rutas se exportan como carpetas con `index.html`, por lo que las páginas internas admiten acceso directo y recarga. No hace falta una regla de redirección SPA.

El directorio `out/` contiene los medios originales (aproximadamente 1,1 GiB); revisa las cuotas de transferencia y almacenamiento de Git LFS y Netlify antes de publicar. Un dominio propio no requiere por sí solo hacer público el repositorio: depende del proveedor y del plan.

**Privacidad pendiente:** la adaptación de hosting no elimina los metadatos de los videos ni los datos de contacto incrustados en el GIF de referencia. La máscara CSS del footer no borra esos datos. Revisar y sanear los archivos antes de publicar; sustituirlos en un commit nuevo tampoco borra versiones históricas.

## Comprobaciones

```bash
npm test
npm audit
```

Las pruebas comprueban las seis páginas exportadas, los 43 videos de Motion, los 46 de IA, las 64 imágenes y el servidor de previsualización. CI no descarga los medios LFS: comprueba las páginas y los archivos de referencia, no reproduce todos los videos.

La configuración anterior de Vinext/Cloudflare (`vite.config.ts`, `build/` y `worker/`) se conserva como referencia y mantiene la integración de Sites, pero no forma parte del build de Netlify ni se ejecuta con los scripts predeterminados.

## Dónde editar

- `app/page.tsx`: estructura y textos del portafolio.
- `app/globals.css`: colores, tipografía, animaciones y diseño responsive.
- `app/layout.tsx`: título y descripción del sitio.
- `app/programacion/`, `app/motion-design/` y `app/graphic-design/`: proyectos de cada disciplina.
- `public/`: imágenes y otros recursos públicos que agregues después.

Las galerías conservan las 64 imágenes de Graphic Design, 43 videos de Motion y 46 videos de IA. Los proyectos de programación siguen siendo espacios provisionales.

## Referencia visual

Las animaciones decorativas de portada y cierre pertenecen a Muh. Yasin y proceden de [Creative Portfolio 2026](https://www.behance.net/gallery/244739993/Creative-Portfolio-2026_Muh-Yasin). Se integran como referencia solicitada; no forman parte de los proyectos de Miguel Tapia. `public/creative-hero.gif` y `public/creative-footer.gif` conservan las animaciones originales; sus versiones `-poster.png` permiten pausarlas y respetar la preferencia de movimiento reducido.

El footer utiliza `public/footer-contact-mask.svg` para ocultar los datos de contacto incluidos en la animación y sustituirlos por enlaces HTML del portafolio.

Los separadores `console-01.gif`, `console-02.gif` y `console-03.gif` proceden de la misma referencia. Se encuadran mediante CSS para mostrar las consolas originales con los títulos propios del sitio. Se pueden pausar y respetan movimiento reducido.

En la portada, cada consola encabeza su disciplina: 01 Programación, 02 Motion Design y 03 Graphic Design. Cada bloque conserva su acceso a la página de proyectos o galería correspondiente.

La tipografía editable utiliza **Poppins**, una aproximación visual a la referencia (Behance no identifica la fuente incrustada en sus imágenes). Los seis pesos se guardan localmente en `public/fonts/`, junto con la licencia OFL, sin dependencia de Google Fonts al abrir la web.

## Si aparece un error relacionado con `node:fs/promises`

Comprueba tu versión:

```bash
node -v
```

Si es menor que `v22.13.0`, instala Node.js 24 LTS, cierra y vuelve a abrir Visual Studio Code. Después ejecuta nuevamente:

```bash
npm install
npm run dev
```

El proyecto comprueba automáticamente la versión de Node antes de instalar, ejecutar o compilar.

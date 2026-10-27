# Portafolio de diseño + desarrollo

Portafolio responsive de Miguel Tapia con fondo claro, tipografía editorial, ilustración animada y galerías de imagen y video. Está construido con React, TypeScript, Next.js y vinext.

## Requisitos

- Visual Studio Code
- Node.js 22.13 o superior. Se recomienda Node.js 24 LTS.
- npm
- Git y Git LFS para clonar el repositorio con todos sus videos e imágenes.

## Clonar con los medios originales

Los videos, GIF e imágenes se guardan en Git LFS. Después de clonar el repositorio privado con tu cuenta autorizada:

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

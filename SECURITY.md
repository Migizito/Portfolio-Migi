# Seguridad y privacidad

Este repositorio contiene el código y los medios del portafolio. Mantenerlo privado no protege automáticamente una web desplegada: los archivos de `public/` se sirven a los visitantes cuando el sitio está en línea.

## Reglas de mantenimiento

- No guardar contraseñas, tokens, claves privadas ni datos personales de clientes en el código, commits o medios.
- Usar variables de entorno locales y secretos del proveedor de despliegue; nunca poner secretos en variables `NEXT_PUBLIC_*` o `VITE_*`.
- Mantener `package-lock.json` y usar `npm ci` para instalaciones reproducibles.
- Ejecutar `npm audit` y `npm test` al actualizar dependencias. Una auditoría sin avisos conocidos no garantiza ausencia de vulnerabilidades.
- Revisar todos los archivos preparados con `git diff --cached --stat` y `git diff --cached` antes de publicar.
- Usar el correo `noreply` de GitHub para commits si se desea ocultar el correo personal.
- No activar GitHub Pages ni un despliegue público sin revisar permisos de publicación de los videos, imágenes y animaciones de terceros.
- No copiar el auxiliar de autenticación de la plantilla a otro hosting suponiendo que los encabezados de usuario son fiables: solo se deben confiar cuando el proveedor autentica y sanea esos encabezados.

## Reportar un problema

Comunicarlo de forma privada al propietario del repositorio. No abrir una incidencia pública con credenciales, datos privados ni pasos que expongan información sensible.

Si se filtra una credencial, revocarla o rotarla primero. Borrarla del último archivo no la elimina de los commits anteriores.

## Automatización

La comprobación de CI solo tiene permiso de lectura sobre el contenido. No despliega la web, no recibe credenciales de producción y no descarga los medios de Git LFS. Los cambios de dependencias deben revisarse y probarse antes de fusionarlos.

## Dependencias de la plantilla

Los `overrides` de `package.json` fijan versiones corregidas de dependencias indirectas de vinext, Miniflare, Satori y el cargador de Drizzle. No eliminarlos sin comprobar la auditoría y la compatibilidad. El cargador `@esbuild-kit` está obsoleto, aunque su dependencia esbuild está actualizada; revisar su sustitución al actualizar Drizzle.

La compilación y las seis rutas del portafolio están comprobadas, incluidas las cantidades de medios de las galerías. El sitio no genera imágenes Open Graph dinámicas: la importación directa de `@vercel/og` en Node ESM presenta un error de `Dynamic require of fs` en su dependencia HarfBuzz. Resolver y probar ese caso antes de incorporar esa función. La auditoría de paquetes no sustituye las pruebas funcionales ni una revisión de seguridad completa.

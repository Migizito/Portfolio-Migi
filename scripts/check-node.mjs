const [major, minor] = process.versions.node.split(".").map(Number);
const supported = major > 22 || (major === 22 && minor >= 13);

if (!supported) {
  console.error(`\nNode.js ${process.versions.node} no es compatible con este proyecto.`);
  console.error("Instala Node.js 24 LTS (o, como mínimo, Node.js 22.13),");
  console.error("reinicia Visual Studio Code y vuelve a ejecutar el comando.\n");
  process.exit(1);
}

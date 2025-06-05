// index.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Captura de argumentos
const [, , comando, recurso, ...restArgs] = process.argv;

console.log("¡Hola desde index.js!");
console.log("Argumentos completos:", process.argv);
console.log("Comando:", comando);
console.log("Recurso:", recurso);
console.log("Resto de argumentos:", restArgs);

const URL_BASE = 'https://fakestoreapi.com';

const ejecutar = async () => {
  try {
    if (comando === 'GET' && recurso === 'products') {
      const res = await fetch(`${URL_BASE}/products`);
      const data = await res.json();
      console.log("Lista de productos:", data);
    }
    if (comando === 'GET' && recurso.startsWith('products/')) {
      const productId = recurso.split('/')[1];
      const res = await fetch(`${URL_BASE}/products/${productId}`);
      const data = await res.json();
      console.log("Producto solicitado:", data);
    }
    if (comando === 'POST' && recurso === 'products') {
      const [title, price, category] = restArgs;

      if (!title || !price || !category) {
        return console.log("Faltan argumentos. Usa: npm run start POST products <title> <price> <category>");
      }

      const nuevoProducto = {
        title,
        price: parseFloat(price),
        category
      };

      const res = await fetch(`${URL_BASE}/products`, {
        method: 'POST',
        body: JSON.stringify(nuevoProducto),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      console.log("Producto creado:", data);
    }

    if (comando === 'DELETE' && recurso.startsWith('products/')) {
      const productId = recurso.split('/')[1];

      const res = await fetch(`${URL_BASE}/products/${productId}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      console.log("Producto eliminado:", data);
    }

  } catch (error) {
    console.error("Error durante la petición:", error.message);
  }
};

ejecutar();
export interface Product {
  id: number;
  name: string;
  price: number;
}
const products: Product[] = [
  { id: 1, name: "Book", price: 9.99 },
  { id: 2, name: "Pen", price: 1.99 },
];

export const createProduct = async (
  name: string,
  price: number
): Promise<Product> => {
  return new Promise((resolve, reject) => {
    const existingProduct = products.find((product) => product.name === name);

    setTimeout(() => {
      if (existingProduct) {
        reject(new Error("Product already exists in the system."));
        return;
      }
      const newProduct: Product = {
        id: products.length + 1,
        name,
        price,
      };
      products.push(newProduct);
      resolve(newProduct);
    }, 100);
  });
};

export const findAllProducts = async (): Promise<Product[]> => {
  return products;
};

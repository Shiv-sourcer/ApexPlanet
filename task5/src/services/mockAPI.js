/**
 * Fetches product data from a live API (DummyJSON).
 * This API provides a much larger set of products (~200).
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 */
export const fetchProducts = async () => {
    try {
        // We are fetching up to 100 products from the new API endpoint.
        const response = await fetch('https://dummyjson.com/products?limit=100');

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        // The API returns data in a { products: [...] } structure, so we need to access the array.
        const data = await response.json();
        const productsArray = data.products;

        // This API uses 'title' and 'thumbnail', so we map them to what our app expects ('name' and 'image').
        const formattedProducts = productsArray.map(product => ({
            id: product.id,
            name: product.title,       // Map 'title' to 'name'
            price: product.price,
            image: product.thumbnail,  // Map 'thumbnail' to 'image'
            description: product.description,
            category: product.category,
        }));
        
        return formattedProducts;

    } catch (error) {
        console.error("Failed to fetch products from API:", error);
        return []; 
    }
};

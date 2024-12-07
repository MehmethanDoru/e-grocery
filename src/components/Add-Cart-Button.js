import styles from "../styles/Add-Cart-Button.css";

const AddCartButton = ({ product }) => {
  const addToCart = () => {
    // Retrieve existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product is already in the cart
    const productIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (productIndex > -1) {
      // If product exists, update the quantity
      existingCart[productIndex].quantity += 1;
    } else {
      // If product does not exist, add it to the cart with all details
      existingCart.push({ 
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1 
      });
    }
    
    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  return (
    <div data-tooltip="" className="button1" onClick={addToCart}>
      <div className="button-wrapper1">
        <div className="text1">Add</div>
        <span className="icon1">
          <svg
            viewBox="0 0 16 16"
            className="bi bi-cart2"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default AddCartButton;

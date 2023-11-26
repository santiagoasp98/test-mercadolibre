import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/items/${id}`)
      .then(response => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [id])

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = product && product.description
    ? showFullDescription
      ? product.description
      : product.description.slice(0, 300)
    : '';

  const buyProduct = () => {
    alert('Compraste el producto!');
  }

  return (
    <div className="product-details-container">
      <div className="product-details-subcontainer">
        <div className="product-details-left">
          <div className="product-image">
            <img src={product.picture} alt={product.title} />
          </div>
          <div className="product-description">
            <div className="product-description-title">
              Descripción del producto
            </div>
            <div className="product-description-text">
              {truncatedDescription + '...'}
              {!showFullDescription && (
                <a onClick={toggleDescription}>Ver más</a>
              )}
            </div>
          </div>
        </div>
        <div className="product-details-right">
          <div className="product-info">
            <div className="product-general-info">
            <span>{`${product.condition === 'new' ? 'Nuevo' : 'Usado'} - ${product.sold_quantity} ventas`}</span>
            </div>
            <div className="product-title">
              {product.title}
            </div>
            <div className="product-price">
              <span>{Number(product.price).toLocaleString('es-AR', {style: 'currency', currency: "ARS"})}</span>
            </div>
            <div className="product-buy-button" onClick={buyProduct}>
              Comprar
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default ProductDetails;
import { Link } from "react-router-dom";

import "./Item.css";

function Item( item ) {

  return (
    <div className="item-container">
      <div className="item-image">
        <Link to={'/items/' + item.id}><img src={item.picture} alt={item.title} /></Link>
      </div>
      <div className="item-info-center">
        <div className="item-info-price">
          <span>{Number(item.price).toLocaleString('es-AR', {style: 'currency', currency: item.currency_id})}</span>
        </div>
        <div className="item-info-title">
          <span>{item.title}</span>
          <p>{item.condition === 'new' ? '• Nuevo' : '• Usado'}</p>
        </div>
      </div>
      <div className="item-info-right">
        <span>{item.city}</span>
      </div>
    </div>
  );
  
}

export default Item;
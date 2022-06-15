import React from 'react'
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

const Product = ({product}) => {
  const dispatch = useDispatch();

  const handlerToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 }
    })
  }

    const { Meta } = Card;

  return (
    <Card
        hoverable
        style={{ width: 240, marginBottom: 30}}
        cover={<img alt={product.name} src={product.image} style={{height: 200}} />}
    >
        <Meta title={product.name} description={`$${product.price}`} />
        <div className="product-btn">
          <Button onClick={() => handlerToCart()}>Add To Cart</Button>
        </div>
    </Card>
  )
}

export default Product

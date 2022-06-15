import React, {useState, useEffect} from 'react'
import axios from 'axios'
import LayoutApp from '../../components/Layout'
import { Row, Col } from 'antd';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('pizzas');
  const categories = [
    {
      name: "pizzas",
      imageUrl: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/27954/pizza-pepperoni-clipart-xl.png",
    },
    {
      name: "burgers",
      imageUrl: "https://cdn.pixabay.com/photo/2022/01/04/23/00/fast-food-6916101_960_720.png",
    },
    {
      name: "drinks",
      imageUrl: "https://images.vexels.com/media/users/3/246333/isolated/preview/9626dce3278f72220ea2736de64e6233-pink-cocktail-color-stroke.png",
    },

  ]

  useEffect(() => {
    const getAllProducts = async () => {
        try {
          dispatch({
            type: "SHOW_LOADING",
          });
          const {data} = await axios.get('/api/products/getproducts');
          setProductData(data);
          dispatch({
            type: "HIDE_LOADING",
          });
          console.log(data);

        } catch(error) {
          console.log(error);
        }
      };

      getAllProducts();
  }, [dispatch]);
  

  return (
    <LayoutApp>
      <div className="category">
        {categories.map((category) => (
          <div key={category.name} className={`categoryFlex ${selectedCategory === category.name && 'category-active'}`} onClick={() => setSelectedCategory(category.name)}>
            <h3 className="categoryName">{category.name}</h3>
            <img src={category.imageUrl} alt={category.name} height={60} width={60} />
          </div>
        ))}
      </div>
      <Row>
        {productData.filter((i) => i.category === selectedCategory).map((product) => (
          <Col xs={24} sm={6} md={12} lg={6}>
            <Product key={product.id} product={product} />
          </Col>
        ))}
      </Row>
    </LayoutApp>
  )
}

export default Home

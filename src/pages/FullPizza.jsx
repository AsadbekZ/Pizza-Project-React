import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          `https://65428e35ad8044116ed39393.mockapi.io/pizzas/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Error getting pizza");
        navigate("/");
      }
    }

    fetchPizzas();
  }, []);

  if (!pizza) {
    return "Loading...";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/" class="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;

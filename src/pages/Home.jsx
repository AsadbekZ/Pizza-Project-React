import React from "react";

import qs from "qs";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  setSearchValue
} from "../Redux/slices/filterSlice";

import { fetchPizzas } from "../Redux/slices/pizzaSlice";

import Sort from "../components/Sort";

import Categories from "../components/Categories";

import PizzaBlock from "../components/PizzaBlock";

import Skeleton from "../components/PizzaBlock/Skeleton";

import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

import { list } from "../components/Sort";

export const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isSearch = React.useRef(false);

  const isMounted = React.useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );

  const { items, status } = useSelector((state) => state.pizzaSlice);

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const onChangePage = (index) => {
    dispatch(setCurrentPage(index));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  const getPizzas = () => {
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "desc" : "asc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map(() => <Skeleton />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index) => onChangeCategory(index)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            Не удалось получить питсы.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

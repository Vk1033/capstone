import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((category) => {
        return (
          <Fragment key={category}>
            <h2 className="category-title">{category.toLocaleUpperCase()}</h2>
            <div className="products-container">
              {categoriesMap[category].map((item) => {
                return <ProductCard key={item.id} product={item} />;
              })}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Shop;

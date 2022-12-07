import "./category-item.styles.scss";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { DirectoryCategory } from "../directory/directory";

type CategoryItemProps = {
  category: DirectoryCategory;
};

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  const { title, imageUrl } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => {
    navigate(`/shop/${title}`);
  };
  return (
    <div className="category-container" onClick={onNavigateHandler}>
      <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;

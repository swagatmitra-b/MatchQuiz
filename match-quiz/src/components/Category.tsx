import { Categories } from "../Data";

const Category = ({
  changeCategory,
}: {
  changeCategory: (category: string) => void;
}) => {
  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul className="category-list">
        {Categories.map((category, i) => (
          <li
            onClick={() => changeCategory(category)}
            className="category-name"
            key={i}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;

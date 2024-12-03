import Categories from '@/components/Categories';
import CategoriesMobile from '@/components/Categories-mobile';

const ResponsiveCategories = () => {
  return (
    <div>
      {/* Mobile View */}
      <div className="block md:hidden">
        <CategoriesMobile />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Categories />
      </div>
    </div>
  );
};

export default ResponsiveCategories;
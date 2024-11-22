import CategoryCard from '../components/CategoryCard/CategoryCard';
import TransactionItem from '../components/TransactionItem/TransactionItem';
import { user } from '../data/expenses';
import styles from './page.module.css';
import Button from '../components/UI/Button/Button';

const Home = () => {
  return (
    <div className={styles.page}>
      {user.categories.map((category) => (
        <TransactionItem key={category.id} category={category} />
      ))}
      {user.categories.map((category) => {
        return <TransactionItem key={category.id} category={category} />;
      })}
      <CategoryCard category={user.categories[0]} />
      <Button>button</Button>

    </div>
  );
};

export default Home;

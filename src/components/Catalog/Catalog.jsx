import styles from './Catalog.module.scss';
import { PizzaItem } from '../PizzaItem/PizzaItem';
import { Skeleton } from '../PizzaItem/Skeleton';
import { Pagination } from '../Pagination/Pagination';
import { useSelector } from 'react-redux';

export const Catalog = ({ items, searchValue }) => {
	console.log(items);
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));
	const status = useSelector((state) => state.pizzas.status);

	const pizzas = items
		.filter((obj) =>
			obj.title.toLowerCase().includes(searchValue.toLowerCase()),
		)
		.map((item) => <PizzaItem key={item.id} {...item} />);

	return (
		<section>
			<div className='container'>
				<div className={styles.catalog}>
					<h1>Всі піцци</h1>
					<div className={styles.items}>
						{status === 'loading' ? skeletons : pizzas}
					</div>
					<Pagination />
				</div>
			</div>
		</section>
	);
};

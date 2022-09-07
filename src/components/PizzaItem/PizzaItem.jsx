import styles from './PizzaItem.module.scss';
import item from '../../assets/img/pizza-item.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

export const PizzaItem = ({ id, title, price, types, sizes }) => {
	const dispatch = useDispatch();

	// const [pizzaCount, setPizzaCount] = useState(0);
	const cartItem = useSelector(selectCartItemById(id));
	console.log(cartItem);

	const addedCount = cartItem ? cartItem.count : 0;
	const [activeSize, setActiveSize] = useState(null);
	const [activeType, setActiveType] = useState(null);

	const typeNames = ['тонке', 'традиційне'];

	const onClickAdd = () => {
		const newItem = {
			id,
			title,
			price,
			type: typeNames[activeType] || null,
			size: activeSize,
		};
		console.log(newItem);
		dispatch(addItem(newItem));
	};

	return (
		<div className={styles.item}>
			<Link to={`pizza/${id}`}>
				<img src={item} alt='pizza-item' />
				<h3>{title}</h3>
			</Link>
			<div className={styles.settings}>
				<div className={styles.type}>
					{types.map((item) => (
						<span
							key={item}
							onClick={() => setActiveType(item)}
							className={item === activeType ? styles.active : ''}
						>
							{typeNames[item]}
						</span>
					))}
				</div>
				<div className={styles.type}>
					{sizes.map((item) => (
						<span
							key={item}
							onClick={() => setActiveSize(item)}
							className={item === activeSize ? styles.active : ''}
						>
							{item} см.
						</span>
					))}
				</div>
			</div>
			<div className={styles.purchase}>
				<span className={styles.price}>від {price} ₴</span>
				<button onClick={onClickAdd} className={`button ${styles.button}`}>
					<b>+</b>
					<span>Додати</span>
					{addedCount > 0 && <i>{addedCount}</i>}
				</button>
			</div>
		</div>
	);
};

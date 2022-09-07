import React from 'react';
import styles from './CartBlock.module.scss';
import item from '../../assets/img/pizza-item.png';
import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

export const CartItem = ({ id, title, count, price, size, type }) => {
	const dispatch = useDispatch();

	const onClickPlus = () => {
		dispatch(addItem({ id }));
	};

	const onClickMinus = () => {
		dispatch(minusItem(id));
	};

	const onClickRemove = () => {
		if (window.confirm('Ви дійсно хочете видалити товар?'))
			dispatch(removeItem(id));
	};

	return (
		<div className={styles.item}>
			<div className={styles.image}>
				<img src={item} alt='pizza-item' />
			</div>
			<div className={styles.info}>
				<h3>{title}</h3>
				<p>
					{type && `${type}, `}
					{size && `${size} см.`}
				</p>
			</div>
			<div className={styles.count}>
				<button
					disabled={count === 1}
					className={`button ${styles.button_circle} ${
						count === 1 ? styles.button_circle__gray : ''
					}`}
					onClick={onClickMinus}
				>
					-
				</button>
				<b>{count}</b>
				<button
					className={`button ${styles.button_circle}`}
					onClick={onClickPlus}
				>
					+
				</button>
			</div>
			<div className={styles.price}>
				<b>{price * count} ₴</b>
			</div>
			<div className={styles.delete}>
				<button
					// disabled
					onClick={onClickRemove}
					className={`button ${styles.button_circle} ${styles.button_circle__gray} ${styles.button_circle__delete}`}
				>
					x
				</button>
			</div>
		</div>
	);
};

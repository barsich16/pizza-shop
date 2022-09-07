import React from 'react';
import styles from './CartBlock.module.scss';
import emptyCartImg from '../../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

export const CartEmpty = () => {
	return (
		<div className={`container ${styles.container} ${styles.empty_cart}`}>
			<h2>Корзина порожня</h2>
			<p>
				Ймовірно ви ще не зробили замовлення.
				<br /> Для того щоб замовити піцу перейдіть на головну сторінку.
			</p>
			<img src={emptyCartImg} alt='Empty cart' />
			<Link to='/' className={`button ${styles.button_back}`}>
				<span>Повернутися назад</span>
			</Link>
		</div>
	);
};

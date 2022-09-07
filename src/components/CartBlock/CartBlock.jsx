import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItems, selectCart } from '../../redux/slices/cartSlice';
import { CartEmpty } from './CartEmpty';
import styles from './CartBlock.module.scss';
import { ReactComponent as CartIcon } from '../../assets/img/cart.svg';
import { ReactComponent as Bucket } from '../../assets/img/bucket.svg';
import { CartItem } from './CartItem';

export const CartBlock = () => {
	const dispatch = useDispatch();
	const { items, totalPrice } = useSelector(selectCart);

	const onClickClear = () => {
		if (window.confirm('Очистити корзину?')) dispatch(clearItems());
	};

	return (
		<div className={`container ${styles.container}`}>
			{!totalPrice ? (
				<CartEmpty />
			) : (
				<div>
					<div className={styles.header}>
						<h2>
							<CartIcon width={24} height={24} />
							<span>Кошик</span>
						</h2>
						<div onClick={onClickClear} className={styles.clear}>
							<Bucket />
							<span>Очистити кошик</span>
						</div>
					</div>
					<div className={styles.items}>
						{items.map((item) => (
							<CartItem key={item.id} {...item} />
						))}
					</div>
					<div className={styles.order}>
						<div className={styles.details}>
							<span>
								Всього:{' '}
								<b>
									{items.reduce((sum, obj) => {
										return obj.count + sum;
									}, 0)}{' '}
									шт.
								</b>
							</span>
							<span>
								Сума замовлення: <b>{totalPrice} ₴</b>
							</span>
						</div>
						<div className={styles.buttons}>
							<button
								disabled
								className={`button ${styles.button_circle__delete} ${styles.btn_back}`}
							>
								&lt; Повернутися назад
							</button>
							<button disabled className={`button ${styles.btn_pay}`}>
								Оплатити
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

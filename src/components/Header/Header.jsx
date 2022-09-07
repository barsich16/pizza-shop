import styles from './Header.module.scss';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as CartIcon } from '../../assets/img/cart.svg';
import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { ReactComponent as SearchIcon } from './search.svg';

export const Header = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [value, setValue] = useState('');
	const { items, totalPrice } = useSelector((state) => state.cart);
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			const json = JSON.stringify(items);
			localStorage.setItem('cart', json);
		}
		isMounted.current = true;
	}, [items]);

	const [euro, setEuro] = useState(0);
	useEffect(() => {
		fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
			.then((res) => res.json())
			.then((res) => {
				setEuro(res.find((cur) => cur.ccy === 'EUR').sale.slice(0, 5));
			});
	}, []);

	const updateSearchValue = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 300),
		[],
	);

	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<header>
			<div className='container'>
				<div className={styles.inner}>
					<div className={styles.info}>
						<Link to='/'>
							<div className={styles.logo_info}>
								<Logo width={38} />
								<div>
									<h1>Celentano €{euro}</h1>
									<p>найсмачніша піцца у всесвіті</p>
								</div>
							</div>
						</Link>
						{location.pathname !== '/cart' && (
							<div className={styles.searchbar}>
								<SearchIcon width={19} className={styles.search_icon} />
								<input
									value={value}
									onChange={onChangeInput}
									type='text'
									placeholder='Пошук піцци...'
								/>
							</div>
						)}
					</div>

					<div className={styles.cart}>
						<Link to='/cart' className={`button ${styles.button}`}>
							<span>{totalPrice} ₴</span>
							<div className={styles.delimiter}></div>
							<CartIcon width={18} height={18} />
							<span>
								{items.reduce((sum, obj) => {
									return obj.count + sum;
								}, 0)}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

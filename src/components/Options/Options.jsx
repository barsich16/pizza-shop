import styles from './Options.module.scss';
import { ReactComponent as Arrow } from './arrow.svg';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setActiveSort,
	setSelectedCategory,
} from '../../redux/slices/filterSlice';
import { useWhyDidYouUpdate } from 'ahooks';

const categories = [
	'Всі',
	"М'ясні",
	'Вегетеріанські',
	'Гриль',
	'Гострі',
	'Закриті',
];
export const filters = [
	{ name: 'популярністю (DESC)', sortProperty: 'rating' },
	{ name: 'популярністю (ASC)', sortProperty: '-rating' },
	{ name: 'ціною (DESC)', sortProperty: 'price' },
	{ name: 'ціною (ASC)', sortProperty: '-price' },
	{ name: 'алфавітом (DESC)', sortProperty: 'title' },
	{ name: 'алфавітом (ASC)', sortProperty: '-title' },
];

export const Options = memo(() => {
	useWhyDidYouUpdate('Options');
	console.log('Render');
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const sortRef = useRef();

	const dispatch = useDispatch();
	const { activeSort, selectedCategory } = useSelector((state) => state.filter);

	const onChangeSort = (sortName) => {
		dispatch(setActiveSort(sortName));
		setIsPopupOpen(false);
	};
	const onChangeCategory = (id) => {
		dispatch(setSelectedCategory(id));
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.path.includes(sortRef.current)) {
				setIsPopupOpen(false);
			}
		};

		document.body.addEventListener('click', handleClickOutside);

		return () => document.body.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<section>
			<div className='container'>
				<div className={styles.options}>
					<div className={styles.types}>
						{categories.map((item, index) => {
							return (
								<a
									key={item}
									href='#'
									onClick={() => onChangeCategory(index)}
									className={`button ${styles.button} ${
										index === selectedCategory ? styles.button__active : ''
									}`}
								>
									<span>{item}</span>
								</a>
							);
						})}
					</div>
					<div className={styles.sort} ref={sortRef}>
						<Arrow />
						<span>Сортувати за: </span>
						<button onClick={() => setIsPopupOpen(!isPopupOpen)}>
							{activeSort.name}
						</button>
						{isPopupOpen && (
							<div className={styles.popup}>
								<ul>
									{filters.map((item, index) => (
										<li
											className={
												item.sortProperty === activeSort.sortProperty
													? styles.active
													: ''
											}
											onClick={() => onChangeSort(item)}
											key={index}
										>
											{item.name}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
});

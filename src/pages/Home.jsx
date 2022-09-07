import { filters, Options } from '../components/Options/Options';
import { Catalog } from '../components/Catalog/Catalog';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const { items } = useSelector((state) => state.pizzas);

	const { currentPage, selectedCategory, activeSort, searchValue } =
		useSelector((state) => state.filter);

	const getPizzas = async () => {
		const category =
			selectedCategory > 0 ? `&category=${selectedCategory}` : '';
		const sortBy = activeSort.sortProperty.replace('-', '');
		const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				category,
				sortBy,
				order,
				search,
			}),
		);
	};

	useEffect(() => {
		//встановлюємо параметри в url якщо вже був перший рендер
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: activeSort.sortProperty,
				selectedCategory,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [selectedCategory, activeSort, searchValue, currentPage]);

	useEffect(() => {
		//якщо параметри вже є в url, заносимо їх в store
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const activeSort = filters.find(
				(obj) => obj.sortProperty === params.sortProperty,
			);
			dispatch(setFilters({ ...params, activeSort }));
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [selectedCategory, activeSort, searchValue, currentPage]);

	return (
		<>
			<Options />
			<Catalog items={items} searchValue={searchValue} />
		</>
	);
};

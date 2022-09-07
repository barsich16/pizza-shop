import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const PizzaDetails = () => {
	const { id } = useParams();
	const [pizza, setPizza] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPizza = async () => {
			try {
				const { data } = await axios.get(
					`https://62efd05a8d7bc7c2eb808100.mockapi.io/items/${id}`,
				);
				setPizza(data);
			} catch (e) {
				alert('Помилка при завантаженні піци!');
				navigate('/');
			}
		};

		fetchPizza();
	}, []);

	if (!pizza) {
		return <div>Завантаження...</div>;
	}

	return (
		<div className={'container'}>
			Details #{id}
			<h2>{pizza.title}</h2>
			<span>{pizza.price}</span>
		</div>
	);
};

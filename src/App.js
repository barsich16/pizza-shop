import { NotFound } from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
// import { Cart } from './pages/Cart';
import { PizzaDetails } from './pages/PizzaDetails';
import { MainLayout } from './layouts/MainLayout';
import { lazy, Suspense } from 'react';

// const Cart = lazy(() => import('./pages/Cart'));
const Cart = lazy(() => import('./pages/Cart'));

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='cart'
					element={
						<Suspense fallback={<div>Триває завантаження корзини...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route path='pizza/:id' element={<PizzaDetails />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;

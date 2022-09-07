import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

export const Pagination = () => {
	const dispatch = useDispatch();
	const { countPage, itemsPerPage, currentPage } = useSelector(
		(state) => state.filter,
	);

	const onChangePage = (event) => {
		dispatch(setCurrentPage(event.selected + 1));
	};

	return (
		<ReactPaginate
			className={styles.pagination}
			breakLabel='...'
			nextLabel='>'
			onPageChange={onChangePage}
			pageRangeDisplayed={itemsPerPage}
			pageCount={countPage}
			forcePage={currentPage - 1}
			previousLabel='<'
			renderOnZeroPageCount={null}
		/>
	);
};

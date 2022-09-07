import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
	return (
		<div className={`container ${styles.title}`}>
			<h1>
				<span>&#128533;</span>
				<br />
				Нічого не знайдено
			</h1>
			<p className={styles.subtitle}>
				Схоже на те, що цієї сторінки не існує...
			</p>
		</div>
	);
};

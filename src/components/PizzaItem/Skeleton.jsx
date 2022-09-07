import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = (props) => (
	<ContentLoader
		speed={2}
		width={306}
		height={456}
		viewBox='0 0 306 456'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<circle cx='147' cy='120' r='118' />
		<rect x='0' y='309' rx='10' ry='10' width='306' height='81' />
		<rect x='0' y='263' rx='10' ry='10' width='306' height='23' />
		<rect x='199' y='410' rx='19' ry='19' width='107' height='41' />
		<rect x='2' y='416' rx='10' ry='10' width='118' height='30' />
	</ContentLoader>
);

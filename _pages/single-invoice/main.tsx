'use client';

import Header from './header';
import Info from './info';

export default function Main() {
	return (
		<>
			<Header position='top' />
			<Info />
			<Header position='bottom' />
		</>
	);
}

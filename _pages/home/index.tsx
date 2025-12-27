import Header from './header';
import EmptyState from './empty-state';

const Homepage = () => {
	return (
		<div className='pt-8 md:pt-15 xl:pt-[4.813rem] flex flex-col flex-1'>
			<Header />
			<EmptyState />
		</div>
	);
};

export default Homepage;

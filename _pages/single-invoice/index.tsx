import BackBtn from './back-btn';
import Header from './header';
import Info from './info';

const SingleInvoice = () => {
	return (
		<div className='pt-8 pb-32 md:pb-8 md:pt-12 xl:pt-[4.813rem] flex flex-col flex-1'>
			<BackBtn />
			<Header position='top' />
			<Info />
			<Header position='bottom' />
		</div>
	);
};

export default SingleInvoice;

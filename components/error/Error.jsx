const Error = ({ error, callback }) => {
	return (
		<div className={ 'error' }>
			<div className={'error__info'}>
				<p className={'error__subject'}>Error: { error }</p>
				<p className={'error__description'}>{ error }</p>
				<div className={'error__btns'}>
					<button
						className={'error__btn button'}
						onClick={ callback }
					>OK</button>
				</div>
			</div>
		</div>
	)
}

export default Error
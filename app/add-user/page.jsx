'use client'
import { useRef } from 'react'

const AddUser = () => {
	const formRef = useRef()

	const sendForm = async e => {
		e.preventDefault()

		const userData = {
			name: "а Graham",
		}

		const answer = await fetch('https://jsonplaceholder.typicode.com/users', {
			method: 'POST',
			'Content-Type': 'application/json',
			body: JSON.stringify(userData)
		})

		const answerJson = await answer.json()
		console.log(answerJson)
	}

	return (
		<section className={ 'add-user page' }>
			<h1 className={ 'add-user__subject index-subject' }>Создайте нового пользователя</h1>
			<form className={ 'add-user__form' } method={ 'post' } ref={ formRef }>
				<fieldset className={ 'add-user__form-chunk' } name={'persData'}>
					<legend className={ 'add-user__form-chunk-subject' }>Личная информация</legend>
					<div className={ 'add-user__form-chunks-wrapper' }>
						<div className={ 'add-user__form-chunk-content' }>
							<label className={ 'add-user__form-label' } htmlFor='name'>
								Name:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'name' } id={ 'name' } placeholder={ 'Ivan' } autoFocus />
							</label>
							<label className={ 'add-user__form-label' } htmlFor='tel'>
								Phone:
								<input className={ 'add-user__form-input' } type='tel'
								       name={ 'tel' } id={ 'tel' } placeholder={ '+79105674532' } />
							</label>
							<label className={ 'add-user__form-label' } htmlFor='username'>
								Username:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'username' } id={ 'username' } placeholder={ 'super-hero' } />
							</label>
						</div>
						<div className={ 'add-user__form-chunk-content' }>
							<label className={ 'add-user__form-label' } htmlFor='email'>
								Email:
								<input className={ 'add-user__form-input' } type='email'
								       name={ 'email' } id={ 'email' } placeholder={ 'email@mail.ru' } />
							</label>
							<label className={ 'add-user__form-label' } htmlFor='website'>
								Website:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'website' } id={ 'website' } placeholder={ 'website.ru' } />
							</label>
						</div>
					</div>
				</fieldset>
				<fieldset className={ 'add-user__form-chunk' }  name={'address'}>
					<legend className={ 'add-user__form-chunk-subject' }>Адрес</legend>
					<div className={ 'add-user__form-chunks-wrapper' }>
						<div className={ 'add-user__form-chunk-content' }>
							<label className={ 'add-user__form-label' } htmlFor='city'>
								City:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'city' } id={ 'city' } placeholder={ 'New York' } />
							</label>
							<label className={ 'add-user__form-label' } htmlFor='street'>
								Street:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'street' } id={ 'street' } placeholder={ 'Robert street 42' } />
							</label>
							<label className={ 'add-user__form-label' } htmlFor='suite'>
								Suite:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'suite' } id={ 'suite' } placeholder={ '42' } />
							</label>
						</div>
						<div className={ 'add-user__form-chunk-content' }>
							<label className={ 'add-user__form-label' } htmlFor='geo'>
								Geo:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'geo' } id={ 'geo' } placeholder={ 'lat: -10, lng: 5' } />
							</label>
							<label className={ 'add-user__form-label' } htmlFor='zipCode'>
								Zipcode:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'zipCode' } id={ 'zipCode' } placeholder={ '42424-4242' } />
							</label>
						</div>
					</div>
				</fieldset>
				<fieldset className={ 'add-user__form-chunk' } name={'company'}>
					<legend className={ 'add-user__form-chunk-subject' }>Место работы</legend>
					<div className={ 'add-user__form-chunks-wrapper' }>
						<div className={ 'add-user__form-chunk-content' }>
							<label className={ 'add-user__form-label' } htmlFor='companyName'>
								Company name:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'companyName' } id={ 'companyName' } placeholder={ 'Google' } />
							</label>
							<label className={ 'add-user__form-label' } htmlFor='bs'>
								Bs:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'bs' } id={ 'bs' } placeholder={ 'real-time e-markets' } />
							</label>
						</div>
						<div className={ 'add-user__form-chunk-content' }>
							<label className={ 'add-user__form-label' } htmlFor='catchPhrase'>
								Catch phrase:
								<input className={ 'add-user__form-input' } type='text'
								       name={ 'catchPhrase' } id={ 'catchPhrase' } placeholder={ 'neural-net' } />
							</label>
						</div>
					</div>
				</fieldset>
				<div className={ 'add-user__form-buttons' }>
					<input className={ 'add-user__form-btn button' } type='reset' />
					<input
						className={ 'add-user__form-btn button' }
						type='submit'
						onClick={ sendForm }
					/>
				</div>
			</form>
		</section>
	)
}

export default AddUser
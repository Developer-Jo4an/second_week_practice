import { memo } from 'react'
import { IoMdWarning } from 'react-icons/io'

const AddUserInput = memo(({ input, register, error }) => {

    const getNecessaryClass = (tag, type) => {
        const types = {
            text: '',
            number: '',
            checkbox: `${ tag }_checkbox`
        }
        return types[type]
    }

    return (
        <div key={ input.key } className={ 'add-user__entry' }>
            <label
                className={ `add-user__label ${ getNecessaryClass('label', input.type) }` }
                htmlFor={ input.id }
            >{ input.label }
                <input
                    className={ `add-user__input ${ getNecessaryClass('input', input.type) }` }
                    type={ input.type }
                    name={ input.key }
                    id={ input.id }
                    { ...(input.value && { value: input.value }) }
                    { ...(input.autofocus && { autoFocus: input.autofocus }) }
                    { ...register(input.key) }
                    placeholder={ input.placeholder }
                />
            </label>
            { error &&
                <p className={ 'add-user__catch' }>
                    <IoMdWarning/>{ error }
                </p>
            }
        </div>
    )
})

export default AddUserInput
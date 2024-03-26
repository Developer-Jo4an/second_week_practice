import { memo } from 'react'
import { FaUserSecret } from 'react-icons/fa'

const StorageUser = memo(({ user, removeFromSt }) => {
	const persChunks =
        [[
            { phone: user.phone, username: user.username },
            { name: user.name, email: user.email, },
            { id: user.id, website: user.website }
        ],
        [
            { city: user.address.city, suite: user.address.suite },
            { street: user.address.street },
            { geo: user.geo, zipcode: user.zipcode }
        ],
        [
            { name: user.company.name, suite: user.company.bs },
            { '': '' },
            { catchPhrase: user.company.catchPhrase },
        ]]

    const createDataChunk = (dataChunk, index) => {
        const dataArr = Object.entries(dataChunk)

        return <li
            key={ index }
            className={ 'storage-user-card__info-item info-chunk' }
        >
            { dataArr.map(dataPiece =>
                <div key={ dataPiece[0] } className={ 'info-chunk__piece' }>
                    <div className={ 'info-chunk__head' }>{ dataPiece[0] }</div>
                    <div className={ 'info-chunk__value' }>{ dataPiece[1] }</div>
                </div>
            ) }
        </li>
    }

    return (
        <div className={ 'storage-user storage-user-card' }>
            <div className={ 'storage-user-card__header' }>
                <div className={ 'storage-user-card__sign' }>
                    <FaUserSecret/>
                </div>
                <button
                    className={ 'storage-user-card__button button' }
                    onClick={ () => removeFromSt(user) }
                >Remove from storage
                </button>
            </div>
            { persChunks.map((chunk, index) =>
                <ul key={ index } className={ 'storage-user-card__info-list' }>
                    { chunk.map(createDataChunk) }
                </ul>
            ) }
        </div>
    )
})

export default StorageUser
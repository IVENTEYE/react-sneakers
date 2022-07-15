import { useContext } from 'react'
import { Link } from 'react-router-dom';
import Card from '../components/Card'
import Info from '../components/Info'
import AppContext from '../context'

function Favorites() {
    const { favorites, onFavorite } = useContext(AppContext);

    return (
        <section className="main__catalog catalog">
            <div className="catalog__header catalog__header_btn">
                <Link to="/">
                    <button className="close">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 11L1 6L6 1" stroke="#C8C8C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </Link>
                <h1 className="catalog__header-title">Мои закладки</h1>
            </div>
            <div className="catalog__sneakers sneakers-catalog">
                {/* Component */}
                {favorites.length > 0 ?
                    favorites.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                favorited={true}
                                onFavorite={(obj) => onFavorite(obj)}
                                // onPlus={(obj) => onAddToCard(obj)}
                                // Передаем все свойства
                                {...item}
                            />
                        )
                    }) : <Info
                            image="/img/catalog//emoji/02.png"
                            title="Закладок нет :("
                            description="Вы ничего не добавляли в закладки."
                            prevPage
                        />
                }
            </div>

        </section>
    )
}

export default Favorites
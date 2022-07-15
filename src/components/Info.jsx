import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context';

function Info({ image, title, description, prevPage }) {
    const { setCartOpened } = useContext(AppContext);

    return (
        <div className="drawer-state">
            <div className="drawer-state__image">
                <img src={image} alt="Корзина пуста" />
            </div>
            <h2 className="drawer-state__title">{title}</h2>
            <p className="drawer-state__text">{description}</p>
            { prevPage 
              ? 
              <Link to="/">
                <a href="#" className="green__btn green__btn_arrow-left">Вернуться назад</a>
              </Link>
              :
              <a href="#" className="green__btn green__btn_arrow-left" onClick={() => setCartOpened(false)}>Вернуться назад</a>
        }
            
        </div>
    )
}

export default Info
import axios from 'axios';
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Info from '../components/Info'
import AppContext from '../context';

function Orders() {
    const { onFavorite, onAddToCard } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        async function getOrders() {
            try {
                const { data } = await axios.get('https://62c049bcc134cf51cecc6539.mockapi.io/orders');
                // Объединяем несколько массивов в один
                setOrders(data.map(obj => obj.items).flat());
                setIsLoading(false);
            } catch (error) {
                alert('Не удалось получить список заказов.');
            }
        }

        getOrders();
    }, []);

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
                <h1 className="catalog__header-title">Мои заказы</h1>
            </div>
            <div className="catalog__sneakers sneakers-catalog">
                {/* Component */}
                {  orders.length > 0 || isLoading ?
                    (isLoading ? [...Array(8)] : orders).map((item, index) => {
                        return (
                            <Card
                                key={index}
                                loading={isLoading}
                                // Передаём все параметры
                                {...item}
                            />
                        )
                    }) : <Info
                            image="/img/catalog//emoji/01.png"
                            title="У вас нет заказов."
                            description="Вы еще не сделали ни одного заказа."
                            prevPage
                        />
                }
            </div>
        </section>
    )
}

export default Orders
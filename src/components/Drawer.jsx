import axios from 'axios';
import { useState } from 'react'
import { useCart } from '../hooks/useCart';
import Info from './Info'

const delay = (ms) => new Promise( (resolve) => setTimeout(resolve, ms) );

function Drawer({ onClose, onRemove, opened, items = [] }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    

    const closeOverlay = (e) => {
        if (e.target.classList.contains('drawer')) {
            onClose(false);
        }
    }

    const onClickOrder = async () => {
        setIsLoading(true);
        const { data } = await axios.post('https://62c049bcc134cf51cecc6539.mockapi.io/orders', {
            items: cartItems,
        });
        setOrderId(data.id);
        setIsOrderComplete(true);
        setCartItems([]);
        setIsLoading(false);

        for (let i = 0; cartItems.length; i++) {
            const item = cartItems[i];
            await axios.delete('https://62c049bcc134cf51cecc6539.mockapi.io/cart/' + item.id);
            await delay(1000);
        }
    }

    return (
        <div onClick={closeOverlay} className={opened ? "drawer _active" : "drawer"}>
            <div className="drawer__body body-drawer">
                <div className="body-drawer__top top-drawer">
                    <h2 className="top-drawer__title">Корзина</h2>
                    <button className="close" onClick={onClose}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z" fill="#D3D3D3" />
                        </svg>
                    </button>
                </div>
                <div className="body-drawer__middle middle-drawer">
                    {
                        items.length > 0 ? items.map(obj => {
                            return (
                                <>
                                    <div key={obj.id} className="middle-drawer__item drawer-item">
                                        <div className="drawer-item__content">
                                            <div className="drawer-item__image">
                                                <img src={obj.image} alt="" />
                                            </div>
                                            <div className="drawer-item__content content-item">
                                                <div className="content-item__info info-item">
                                                    <h4 className="info-item__label">{obj.label}</h4>
                                                    <div className="info-item__price">{obj.price} руб.</div>
                                                </div>
                                                <button className="close" onClick={() => onRemove(obj.id)}>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z" fill="#D3D3D3" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }) : <Info 
                                image={isOrderComplete ? "/img/sucsess.svg" : "/img/box.svg"}
                                title={isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"}
                                description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                                prevPage={false}
                            />
                    }
                </div>
                {
                    items.length > 0 ? (
                        <div className="body-drawer__bottom bottom-drawer">
                        <div className="bottom-drawer__info info-drawer">
                            <div className="info-drawer__item">
                                <p className="info-drawer__text">Итого:</p>
                                <div className="info-drawer__dots"></div>
                                <b className="info-drawer__price">{totalPrice} руб.</b>
                            </div>
                            <div className="info-drawer__item">
                                <p className="info-drawer__text">Налог 5%:</p>
                                <div className="info-drawer__dots"></div>
                                <b className="info-drawer__price">{ Math.round(totalPrice * 0.05) } руб.</b>
                            </div>
                        </div>
                        <button disabled={isLoading} className="green__btn green__btn_arrow-right" onClick={onClickOrder}>Оформить заказ</button>
                    </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Drawer
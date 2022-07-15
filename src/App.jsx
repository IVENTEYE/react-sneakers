import { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContext from './context';
import axios from 'axios';
import Drawer from './components/Drawer';
import Header from './components/Header';
import './index.scss';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get('https://62c049bcc134cf51cecc6539.mockapi.io/cart');
        const favoritesResponse = await axios.get('https://62c049bcc134cf51cecc6539.mockapi.io/favorites');
        const itemsResponse = await axios.get('https://62c049bcc134cf51cecc6539.mockapi.io/items');
  
        setIsLoading(false);
  
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных.");
      }
    }

    fetchData();
  }, []);

  const onAddToCard = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        axios.delete(`https://62c049bcc134cf51cecc6539.mockapi.io/cart/${findItem.id}`);
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
      } else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post(`https://62c049bcc134cf51cecc6539.mockapi.io/cart`, obj);
        setCartItems(prev => prev.map(item => {
          if(item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch(error) {
      alert("Не удалось добавить товар в карзину.");
      console.log(error);
    }
  }

  const onFavorite = async (obj) => {
    try {
      if (favorites.find(item => item.id === obj.id)) {
        axios.delete(`https://62c049bcc134cf51cecc6539.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        // В {} вытаскиваем ответ от сервера (data)
        const { data } = await axios.post('https://62c049bcc134cf51cecc6539.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в "Избранное"');
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62c049bcc134cf51cecc6539.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const isItemAdded = (id) => {
    // some возвращает булевое значиние
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={ { cartItems, favorites, items, isItemAdded, onFavorite, setCartOpened, setCartItems } }>
      <div className="wrapper">
        <Header onClickCart={() => setCartOpened(true)} />
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  items={items}
                  cartItems={cartItems}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onFavorite={onFavorite}
                  onAddToCard={onAddToCard}
                  isLoading={isLoading}
                />}
              exact>
            </Route>
            <Route path="/favorites" element={<Favorites />} exact>
            </Route>
            <Route path="/orders" element={<Orders />} exact>
            </Route>
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;

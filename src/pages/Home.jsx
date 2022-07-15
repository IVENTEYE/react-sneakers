import Card from '../components/Card';

function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onFavorite, onAddToCard, isLoading }) {

    const renderItems = () => {
        const filtredItems = items.filter(item => item.label.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => onFavorite(obj)}
                onPlus={(obj) => onAddToCard(obj)}
                loading={isLoading}
                // Передаём все параметры
                {...item}
            />
        )
        );
    };

    return (
        <section className="main__catalog catalog">
            <div className="catalog__header">
                <h1 className="catalog__header-title">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кросовки'}</h1>
                <div className="catalog__header-search search-catalog">
                    <input type="text" onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...' className="search-catalog__input" />
                    <img className='search-catalog__icon' src="/img/search.svg" alt="" />
                    {
                        searchValue &&
                        <svg onClick={() => setSearchValue('')} className='search-catalog__close' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z" fill="#D3D3D3" />
                        </svg>
                    }
                </div>
            </div>
            <div className="catalog__sneakers sneakers-catalog">
                {/* Component */}
                {renderItems()}
            </div>
        </section>
    )
}

export default Home
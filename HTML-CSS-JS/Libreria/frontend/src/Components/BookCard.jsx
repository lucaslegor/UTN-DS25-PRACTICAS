import "../styles/BookCard.css"

const BookCard = ({ libro }) => {
  const formatPrice = (price) => {
    if (!price || isNaN(price)) return '$0';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStockStatus = (stock) => {
    const stockNumber = Number(stock) || 0;
    if (stockNumber === 0) return { text: 'Sin stock', class: 'no-stock' };
    if (stockNumber < 5) return { text: `Solo ${stockNumber} disponibles`, class: 'low-stock' };
    return { text: 'Disponible', class: 'in-stock' };
  };

  const stockStatus = getStockStatus(libro.stock || 0);

  return (
    <div className="book-card">
      <div className="book-image-container">
        <img 
          src={libro.imagen || libro.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSIxNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjREREREREIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkxpYnJvPC90ZXh0Pgo8dGV4dCB4PSIxNTAiIHk9IjIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5TaW4gSW1hZ2VuPC90ZXh0Pgo8L3N2Zz4K'} 
          alt={libro.titulo} 
          className="book-image" 
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSIxNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjREREREREIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkxpYnJvPC90ZXh0Pgo8dGV4dCB4PSIxNTAiIHk9IjIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5TaW4gSW1hZ2VuPC90ZXh0Pgo8L3N2Zz4K';
          }}
        />
        <div className="book-category">
          {libro.tema ? libro.tema.charAt(0).toUpperCase() + libro.tema.slice(1) : 'Sin categoría'}
        </div>
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{libro.titulo}</h3>
        <p className="book-author">por {libro.autor}</p>
        
        {libro.descripcion && (
          <p className="book-description">
            {libro.descripcion.length > 100 
              ? `${libro.descripcion.substring(0, 100)}...` 
              : libro.descripcion
            }
          </p>
        )}
        
        <div className="book-details">
          {libro.publishedYear && !isNaN(Number(libro.publishedYear)) && Number(libro.publishedYear) > 0 && (
            <span className="book-year">{libro.publishedYear}</span>
          )}
          {libro.isbn && (
            <span className="book-isbn">ISBN: {libro.isbn}</span>
          )}
        </div>
        
        <div className="book-price-stock">
          <span className="book-price">{formatPrice(libro.precio)}</span>
          <span className={`stock-status ${stockStatus.class}`}>
            {stockStatus.text}
          </span>
        </div>
        
        <div className="book-actions">
          <button 
            className={`buy-button ${stockStatus.class === 'no-stock' ? 'disabled' : ''}`}
            disabled={stockStatus.class === 'no-stock'}
          >
            {stockStatus.class === 'no-stock' ? 'Sin stock' : 'Comprar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
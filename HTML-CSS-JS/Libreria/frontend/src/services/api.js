// Servicio de API para comunicación con el backend
const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método genérico para hacer requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Métodos de autenticación
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Métodos de libros
  async getBooks() {
    return this.request('/books');
  }

  // Método público para obtener libros (sin autenticación)
  async getPublicBooks() {
    const response = await fetch(`${this.baseURL}/books/public`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }
    
    return data;
  }

  async getBookById(id) {
    return this.request(`/books/${id}`);
  }

  async createBook(bookData) {
    return this.request('/books', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  }

  async updateBook(id, bookData) {
    return this.request(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
  }

  async deleteBook(id) {
    return this.request(`/books/${id}`, {
      method: 'DELETE',
    });
  }

  async searchBooks(query, category) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category && category !== 'todas') params.append('category', category);
    
    return this.request(`/books/search?${params.toString()}`);
  }

  async getBooksByCategory(category) {
    return this.request(`/books/category/${category}`);
  }

  // Métodos de autores
  async getAuthors() {
    return this.request('/authors');
  }

  async getAuthorById(id) {
    return this.request(`/authors/${id}`);
  }

  // Métodos de usuarios
  async getUsers() {
    return this.request('/users');
  }

  async getUserById(id) {
    return this.request(`/users/${id}`);
  }
}

export default new ApiService();

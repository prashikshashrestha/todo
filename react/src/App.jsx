import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function Home({ todos, setTodos, user, setUser }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/signin');
  };

  

  const handleAdd = () => {
    navigate('/add');
  };

  const handleEdit = (todo) => {
    navigate(`/edit/${todo.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/todo/delete/${id}`);
      if (response.data.success) {
        setTodos(todos.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const filteredTodos = todos.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <h1 className="title">Todo List</h1>
      
      {user && <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Welcome, {user.email}!</p>}

      <div className="toolbar">
        <div className="search-box">
          <input 
            type="text" 
            className="search-input" 
            placeholder="search......" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon icon="mdi:magnify" width="24" height="24" style={{ color: '#000' }} />
          </button>
        </div>
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      <div className="cards-container">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="todo-card">
            {todo.title || todo.description ? (
              <>
                <h3 style={{fontFamily: 'inherit'}}>Title: {todo.title}</h3>
                <p style={{whiteSpace: 'pre-line'}}>Description:<br/>{todo.description}</p>
                <div style={{ flex: 1 }}></div>
                <div className="card-actions">
                  <button className="card-btn" onClick={() => handleEdit(todo)}>Edit</button>
                  <button className="card-btn" onClick={() => handleDelete(todo.id)}>delete</button>
                </div>
              </>
            ) : null}
          </div>
        ))}
        {filteredTodos.length < 3 && Array.from({ length: 3 - filteredTodos.length }).map((_, i) => (
          <div key={`empty-${i}`} className="todo-card"></div>
        ))}
      </div>
    </div>
  );
}

function AddEditTodo({ todos, setTodos }) {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const existingTodo = id ? todos.find(t => t.id === Number(id)) : null;
  const [currentEdit, setCurrentEdit] = useState(
    existingTodo || { title: '', description: '' }
  );

  const handleSave = async () => {
    try {
      if (existingTodo) {
        await axios.put(`http://localhost:3000/api/v1/todo/update/${id}`, currentEdit);
      } else {
        await axios.post("http://localhost:3000/api/v1/todo/create", currentEdit);
      }
      navigate('/');
      // The useEffect in App.jsx will trigger if we fetch todos on Home page mount, 
      // but better to pass a refresh function.
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="title">{existingTodo ? 'Edit Todo' : 'Add Todo'}</h1>
      <div className="modal-content" style={{ border: 'none', background: 'transparent', padding: 0 }}>
        <input 
          type="text" 
          placeholder="Title" 
          value={currentEdit.title}
          onChange={(e) => setCurrentEdit({...currentEdit, title: e.target.value})}
        />
        <textarea 
          placeholder="Description" 
          rows="5"
          value={currentEdit.description}
          onChange={(e) => setCurrentEdit({...currentEdit, description: e.target.value})}
        />
        <div className="modal-actions" style={{ marginTop: '20px', justifyContent: 'center' }}>
          <button className="modal-btn" onClick={() => navigate('/')}>Cancel</button>
          <button className="modal-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/todo/get");
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, [user]);


  return (
    <Router>
      <Routes>
        <Route 
          path="/signin" 
          element={!user ? <SignIn setUser={setUser} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/signup" 
          element={!user ? <SignUp /> : <Navigate to="/" />} 
        />
        <Route 
          path="/" 
          element={user ? <Home todos={todos} setTodos={setTodos} user={user} setUser={setUser} /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/add" 
          element={user ? <AddEditTodo todos={todos} setTodos={setTodos} /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/edit/:id" 
          element={user ? <AddEditTodo todos={todos} setTodos={setTodos} /> : <Navigate to="/signin" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;


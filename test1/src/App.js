import Registration from './components/Registration';
import {BrowserRouter as Router,Routes,Route}from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationList from './components/RegistrationList';
import ArticleList from './components/AticleList';
import News from './components/News';
import Staff from './components/Staff';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Registration' element={<Registration/>}/>
          <Route path='/userdashboard' element={<UserDashboard/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
          <Route path='/registrationlist' element={<RegistrationList/>}/>
          <Route path='/articlelist' element={<ArticleList/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/staff' element={<Staff/>}/>
        </Routes>
       
        </Router>
     
    </div>
  );
}

export default App;

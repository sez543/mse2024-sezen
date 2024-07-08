import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Login from './routes/Login';
import NewTopic from './routes/NewTopic';
import Register from './routes/Register';
import TopicPage from './routes/TopicPage';
import Topics from './routes/Topics';
import UserManagement from './routes/UserManagement';

const App = () => {
  return (
    <Router>
      <div className="outer-route">
        <Header />
        <div className="inner-route">
          <Routes>
            <Route path="/" element={<Topics />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/new-topic" element={<NewTopic />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/topic-details/:id" element={<TopicPage />} />
            <Route path="/manage-users" element={<UserManagement />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

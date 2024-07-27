import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import MainPage from './containers/MainPage';
import './App.css';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;

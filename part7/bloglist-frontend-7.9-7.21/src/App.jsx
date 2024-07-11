import BlogList from './components/BlogList/BlogList';
import Navbar from './components/Navbar/Navbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'mvp.css';
import './style.css';

import { UserContextProvider } from './context/user';

const App = () => {
    return (
        <div>
            <ToastContainer />
            <UserContextProvider>
                <Navbar />
                <BlogList />
            </UserContextProvider>
        </div>
    );
};

export default App;

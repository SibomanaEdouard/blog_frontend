// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import LoginPage from './pages/Login';
// import RegisterPage from './pages/Register';
// import PostDetail from './pages/PostDetails';
// import NewPost from './pages/NewPost';
// import PrivateRoute from './components/PrivateRoute';

// const App = () => {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Navbar />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="/register" element={<RegisterPage />} />
//                     <Route element={<PrivateRoute />}>
//                         <Route path="/posts" element={<PostDetail />} />
//                         <Route path="/new" element={<NewPost />} />
//                     </Route>
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// };

// export default App;




import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import NewPost from './pages/NewPost';
import PrivateRoute from './components/PrivateRoute';
import MyPosts from './pages/MyPosts';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/new" element={<NewPost />} />
                        <Route path="/my-posts" element={<MyPosts />} />

                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Home } from './Pages/Home';
import { Lesson } from './Pages/Lesson/Lesson';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/lesson/:id" element={<Lesson />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

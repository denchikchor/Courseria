import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Home } from './Pages/Home';
import { Lesson } from './Pages/Lesson/Lesson';
import { NotFound } from './Components/NotFound/NotFound';

function App() {
    return (
        <BrowserRouter basename="/Courseria">
            <Header />
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/lesson/:id" element={<Lesson />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

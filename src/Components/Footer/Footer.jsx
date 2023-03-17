import './Footer.scss';

function Footer() {
    return (
        <>
            <footer className="page-footer">
                <div className="container">
                    © {new Date().getFullYear()} Copyright Text
                    <a href="https://github.com/denchikchor/Courseria">Repo</a>
                </div>
            </footer>
        </>
    );
}

export { Footer };

import './Pagination.scss';

function Pagination({ coursesPerPage, totalCourses, paginate }) {
    const pageNumbers = [];
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className="Pagination">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => {
                                paginate(number);
                                goToTop();
                            }}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { Pagination };

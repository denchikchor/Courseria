import { useEffect, useState } from 'react';
import { Preloader } from '../Components/Preloader/Preloader';
import { LessonsList } from '../Components/LessonsList';
import { getAllLessons } from '../api';
import { Pagination } from '../Components/Pagination/Pagination';

function Home() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(10);

    useEffect(() => {
        getAllLessons().then((data) => {
            setLessons(data.courses);
            setLoading(false);
        });
    }, []);

    const lastCourseIndex = currentPage * coursesPerPage;
    const firstCourseIndex = lastCourseIndex - coursesPerPage;
    const currentCourse = lessons.slice(firstCourseIndex, lastCourseIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <>
                    <LessonsList lessons={currentCourse} />
                    <Pagination
                        coursesPerPage={coursesPerPage}
                        totalCourses={lessons.length}
                        paginate={paginate}
                    />
                </>
            )}
        </>
    );
}

export { Home };

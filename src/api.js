import { API_URL } from './config';

const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const body =
    'eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0';
const signature = 'Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM';
const token = [header, body, signature].join('.');

const getAllLessons = async () => {
    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

const getLessonById = async (lessonID) => {
    const response = await fetch(API_URL + '/' + lessonID, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

export { getAllLessons, getLessonById };

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addNews } from '../../api/investmentAPI'; // API 함수 임포트
import './InfoAddNews.css';

function InfoAddNews() {
    const location = useLocation();
    const navigate = useNavigate();
    const [newsData, setNewsData] = useState({
        title: '',
        publisher: '',
        reportedAt: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewsData({ ...newsData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const pieceInvestmentId = location.state?.pieceInvestmentId;
            if (!pieceInvestmentId) {
                setError('Invalid piece investment ID');
                return;
            }
            await addNews({ ...newsData, piece_investment_id: pieceInvestmentId });
            alert('뉴스가 성공적으로 추가되었습니다.');
            navigate(-1); // 이전 페이지로 이동
        } catch (error) {
            setError('뉴스 추가 중 오류가 발생했습니다.');
            console.error('Error adding news:', error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="info-add-news-container">
            <h2>뉴스 작성</h2>
            <form className="add-news-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">제목:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newsData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publisher">발행사:</label>
                    <input
                        type="text"
                        id="publisher"
                        name="publisher"
                        value={newsData.publisher}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reportedAt">발행일:</label>
                    <input
                        type="date"
                        id="reportedAt"
                        name="reportedAt"
                        value={newsData.reportedAt}
                        onChange={handleChange}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <div className="button-group">
                    <button type="button" onClick={handleCancel}>취소</button>
                    <button type="submit">저장</button>
                </div>
            </form>
        </div>
    );
}

export default InfoAddNews;

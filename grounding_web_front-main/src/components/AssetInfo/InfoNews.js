import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getNews } from '../../api/investmentAPI'; // API 함수 임포트
import './InfoNews.css';

function InfoNews() {
    const location = useLocation();
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const pieceInvestmentId = location.state?.pieceInvestmentId;
                if (!pieceInvestmentId) {
                    setError('Invalid piece investment ID');
                    return;
                }
                const data = await getNews(pieceInvestmentId);
                setNews(data);
            } catch (error) {
                setError('Error fetching news');
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [location.state]);

    const handleWriteNews = () => {
        navigate('/write-news', { state: { pieceInvestmentId: location.state.pieceInvestmentId } });
    };

    return (
        <div className="info-news-container">
            <h2>뉴스</h2>
            <p>이 페이지는 자산에 관련된 뉴스 정보를 나타냅니다.</p>

            <div className="info-banner">
                <Link to="/info-chart" className={location.pathname === '/info-chart' ? 'active' : ''}>차트</Link>
                <Link to="/info-detail" className={location.pathname === '/info-detail' ? 'active' : ''}>종목 정보</Link>
                <Link to="/info-disclosure" className={location.pathname === '/info-disclosure' ? 'active' : ''}>공시</Link>
                <Link to="/info-news" className={location.pathname === '/info-news' ? 'active' : ''}>뉴스</Link>
            </div>

            {error && <p className="error">{error}</p>}

            <button onClick={handleWriteNews} className="write-news-button">뉴스 작성</button>

            {news.length > 0 ? (
                <ul className="news-list">
                    {news.map((newsItem) => (
                        <li key={newsItem.id} className="news-item">
                            <h3>{newsItem.title}</h3>
                            <p>{newsItem.publisher}</p>
                            <p>{newsItem.reported_at}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>뉴스 정보가 없습니다.</p>
            )}
        </div>
    );
}

export default InfoNews;

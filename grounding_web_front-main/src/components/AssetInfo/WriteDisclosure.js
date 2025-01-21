import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDisclosure } from '../../api/investmentAPI'; // API 함수 임포트
import './WriteDisclosure.css';

function WriteDisclosure() {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        piece_investment_id: location.state?.pieceInvestmentId || 0,
        asset_address: '',
        asset_name: '',
        disclosure_title: '',
        disclosure_content: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDisclosure(formData);
            alert('공시가 성공적으로 등록되었습니다.');
            navigate('/info-disclosure', { state: { pieceInvestmentId: formData.piece_investment_id } });
        } catch (error) {
            setError('Error adding disclosure');
            console.error('Error adding disclosure:', error);
        }
    };

    return (
        <div>
            <h2>공시 작성</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="asset_address">자산 주소:</label>
                    <input
                        type="text"
                        id="asset_address"
                        name="asset_address"
                        value={formData.asset_address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="asset_name">자산 이름:</label>
                    <input
                        type="text"
                        id="asset_name"
                        name="asset_name"
                        value={formData.asset_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="disclosure_title">공시 제목:</label>
                    <input
                        type="text"
                        id="disclosure_title"
                        name="disclosure_title"
                        value={formData.disclosure_title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="disclosure_content">공시 내용:</label>
                    <textarea
                        id="disclosure_content"
                        name="disclosure_content"
                        value={formData.disclosure_content}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default WriteDisclosure;

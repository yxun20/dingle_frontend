import { useNavigate } from 'react-router-dom';
import backIcon from '@/assets/backIcon.svg';

// Props 타입 정의
interface BackButtonProps {
  to?: string; // 이동할 경로, 기본값은 '/'
  className?: string; // 버튼 스타일 클래스
}

const BackButton = ({ to = '/', className }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <div className={className ? className : 'w-full flex justify-start mb-4'}>
      <button onClick={() => navigate(to)}>
        <img src={backIcon} alt="Back Icon" className="w-8 h-8 cursor-pointer" />
      </button>
    </div>
  );
};

export default BackButton;

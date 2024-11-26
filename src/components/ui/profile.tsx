interface ProfileCardProps {
  name: string; // 프로필 이름
  age?: string; // 나이 (선택적)
  phone?: string; // 전화번호 (선택적)
  description?: string; // 설명 (선택적)
  imgSrc: string; // 이미지 경로
  alignment?: 'left' | 'right'; // 정렬 방향 ('left' 또는 'right')
}

const ProfileCard = ({
  name,
  age,
  phone,
  description,
  imgSrc,
  alignment = 'left',
} : ProfileCardProps ) => {
  return (
    <div
      className={`w-[350px] h-1/4 bg-white shadow relative flex items-center ${
        alignment === 'left' ? 'justify-start rounded-l-3xl ml-9' : 'justify-end rounded-r-3xl mr-9'
      } `}
    >
      {alignment === 'left' && (
        <img src={imgSrc} className= "rounded-full w-[110px] h-[110px] m-5" alt={`${name} profile`} />
      )}

      <div className={`flex-grow ${alignment === 'left' ? 'text-left' : 'text-right'} space-y-1`}>
        <h2 className="text-lg font-bold">{name}</h2>
        {age && <p className="text-sm">{age}</p>}
        {phone && <p className="text-black text-sm">{phone}</p>}
        {description && <p className="text-gray-400 text-xs">{description}</p>}
       
          <button className="text-xs text-gray-400 mt-4" disabled>
            수정하기
          </button>
        
      </div>

      {alignment === 'right' && (
        <img src={imgSrc} className="rounded-full w-[110px] h-[110px] m-5" alt={`${name} profile`} />
      )}
      <button className="absolute top-2 right-2 text-gray-400">&times;</button>
    </div>
  );
};

export default ProfileCard;

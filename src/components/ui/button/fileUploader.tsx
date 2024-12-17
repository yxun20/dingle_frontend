import { useRef, useState } from 'react';

export const FileUploader = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef?.current?.click();
  };

  const handleChange = (e: any) => {
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setVideoUrl(fileUrl);
  };

  return (
    <div>
      {videoUrl ? (
        <video src={videoUrl} autoPlay />
      ) : (
        <div onClick={handleClick}>
          <button className="pt-5 px-3 w-[320px] h-[400px] flex place-content-center place-items-center rounded-md no-underline text-white text-xl font-bold bg-primary hover:bg-white hover:text-primary hover:border-primary border-4">
            +
          </button>

          <input
            ref={fileRef}
            id="file"
            name="file"
            type="file"
            accept={'video/mp4'}
            onChange={handleChange}
            style={{
              opacity: 0,
            }}
          />
        </div>
      )}
    </div>
  );
};

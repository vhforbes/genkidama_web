import React from 'react';

interface PostProps {
  title: string;
  content: string;
  video_link: string;
}

const PostComponent = ({ title, content, video_link }: PostProps) => {
  const videoId = video_link.split('v=')[1];

  return (
    <div className="card card-compact mb-4 mr-4 max-w-xs bg-primary shadow-xl">
      <figure>
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className="card-actions justify-center mt-4">
          <button type="button" className="btn btn-secondary">
            <a href={video_link} target="_blank" rel="noreferrer">
              ACESSE O VÍDEO
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;

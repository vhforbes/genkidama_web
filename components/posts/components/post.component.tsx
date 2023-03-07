import { useRouter } from 'next/dist/client/router';
import React from 'react';

interface PostProps {
  id: string;
  title: string;
  content: string;
  video_link: string;
  editable: boolean;
}

const PostComponent = ({
  id,
  title,
  content,
  video_link,
  editable,
}: PostProps) => {
  const videoId = video_link.split('v=')[1];
  const router = useRouter();

  return (
    <div className="card card-compact mb-4 mr-4 max-w-xs bg-primary shadow-xl">
      {editable ? (
        <div>
          <button
            onClick={() => router.push(`/admin/exclusive-video/edit?id=${id}`)}
            type="button"
            className="hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => deleteTradeOperation(id)}
            type="button"
            className="ml-8 hover:underline"
          >
            Apagar
          </button>
        </div>
      ) : null}
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

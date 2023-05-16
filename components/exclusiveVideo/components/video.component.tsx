import { useRouter } from 'next/dist/client/router';
import React from 'react';
import dayjs from 'dayjs';
import { useExclusiveVideos } from '../../../hooks/exclusiveVideos';
import { ExclusiveVideo } from '../../../interfaces/ExclusiveVideo';

interface PostProps {
  exclusiveVideo: ExclusiveVideo;
  editable: boolean;
}

const PostComponent = ({ exclusiveVideo, editable }: PostProps) => {
  const videoId = exclusiveVideo.videoLink.split('v=')[1];
  const router = useRouter();
  const { deleteExclusiveVideo } = useExclusiveVideos();

  const createdDate = dayjs(exclusiveVideo.createdAt)
    .tz('America/Sao_Paulo')
    .format('HH:mm - DD/MM');

  return (
    <div className="card card-compact mb-4 mr-4 max-w-xs bg-primary shadow-xl">
      {editable ? (
        <div>
          <button
            onClick={() =>
              router.push(`/admin/exclusive-video/edit?id=${exclusiveVideo.id}`)
            }
            type="button"
            className="hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => deleteExclusiveVideo(exclusiveVideo.id)}
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
        <h2 className="card-title">{exclusiveVideo.title}</h2>
        <p>{exclusiveVideo.content}</p>
        <p>Postado em: {createdDate}</p>

        <div className="card-actions justify-center mt-4">
          <button type="button" className="btn btn-secondary">
            <a href={exclusiveVideo.videoLink} target="_blank" rel="noreferrer">
              ACESSE O VÍDEO
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;

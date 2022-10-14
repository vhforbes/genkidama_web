import React from 'react';

interface PostProps {
  title: string;
  content: string;
}

const PostComponent = ({ title, content }: PostProps) => {
  return (
    <div className="flex flex-col mb-12 border-neutral900 dark:border-white border-2 rounded-2xl">
      <div className="flex">
        <img src="/logo-gnk-1.png" alt="" className="m-4 w-1/4" />
        <div>
          <h1 className="mt-4 text-xl">{title}</h1>
          <p className="mt-4">{content}</p>
        </div>
      </div>
      <button className="" type="button">
        Acesse o video
      </button>
    </div>
  );
};

export default PostComponent;

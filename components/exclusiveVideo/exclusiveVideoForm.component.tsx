/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';

import { useRouter } from 'next/router';
import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';
import { useExclusiveVideos } from '../../hooks/exclusiveVideos';

import MyTextInput from '../shared/textInput.component';

import privateApi from '../../services/privateApi';
import routes from '../../enums/routes';
import { ExclusiveVideo } from '../../interfaces/ExclusiveVideo';

const ExclusiveVideoForm = ({
  edit,
  create,
}: {
  edit?: boolean;
  create?: boolean;
}) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const { getExclusiveVideos, exclusiveVideos } = useExclusiveVideos();
  const router = useRouter();
  const [exclusiveVideo, setExclusiveVideo] = useState<ExclusiveVideo>();

  useEffect(() => {
    getExclusiveVideos();
  }, []);

  useEffect(() => {
    const { id } = router.query;

    exclusiveVideos.forEach(video => {
      if (video.id === id) {
        setExclusiveVideo(video);
      }
    });
  }, [exclusiveVideos]);

  const submit = async (
    exclusiveVideoDOT: ExclusiveVideo,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      setLoading(true);

      if (edit) {
        await privateApi.put(`${routes.posts}`, exclusiveVideoDOT);
      }

      if (create) {
        await privateApi.post(`${routes.posts}`, exclusiveVideoDOT);
      }

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Operação atualizada :)',
      });

      setLoading(false);
      setSubmitting(false);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has ocurred',
        description: 'Could not edit trade operation',
      });
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-auto md:w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <Formik
            enableReinitialize
            initialValues={
              {
                id: exclusiveVideo?.id,
                title: exclusiveVideo?.title,
                content: exclusiveVideo?.content,
                video_link: exclusiveVideo?.video_link,
              } as ExclusiveVideo
            }
            onSubmit={(values, { setSubmitting }) => {
              submit(values, setSubmitting);
            }}
          >
            <Form>
              <div className="card-body">
                <div className="form-control">
                  <MyTextInput
                    label="Market:"
                    name="title"
                    type="text"
                    placeholder="Titulo video"
                  />
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Content:"
                    name="content"
                    type="text"
                    placeholder="Subtitulo"
                  />
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Video Link:"
                    name="video_link"
                    type="text"
                    placeholder="video link"
                  />
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-secondary">
                    Enviar
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveVideoForm;

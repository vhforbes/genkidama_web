/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';

import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';
import { useExclusiveVideos } from '../../hooks/exclusiveVideos';

import { ExclusiveVideo } from '../../interfaces/ExclusiveVideo';

import MyTextInput from '../shared/textInput.component';
import { ErrorResponse } from '../../interfaces/ErrorResponse';

const ExclusiveVideoForm = ({
  edit,
  create,
}: {
  edit?: boolean;
  create?: boolean;
}) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const {
    getAllExclusiveVideos,
    exclusiveVideos,
    createExclusiveVideo,
    editExclusiveVideo,
  } = useExclusiveVideos();
  const router = useRouter();
  const [exclusiveVideo, setExclusiveVideo] = useState<ExclusiveVideo>();

  useEffect(() => {
    getAllExclusiveVideos();
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
      if (edit) {
        editExclusiveVideo(exclusiveVideoDOT);
      }

      if (create) {
        createExclusiveVideo(exclusiveVideoDOT);
      }

      setSubmitting(false);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Ops, tivemos um erro.',
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
                videoLink: exclusiveVideo?.videoLink,
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
                    label="Title:"
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
                    name="videoLink"
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

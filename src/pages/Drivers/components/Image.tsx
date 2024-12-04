/* eslint-disable react-refresh/only-export-components */
import env from '@/configs/env';
import { useState, memo, useEffect } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
interface IProps {
  data: string;
  type: string;
}

const Image = ({ data, type }: IProps) => {
  const [isPhoto, setIsPhoto] = useState(true);

  useEffect(() => {
    if (!isPhoto) {
      setIsPhoto(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handlePhoto = (data, type) => {
    if (type === 'number') {
      return `${env.photoMainUrl}2018-redesign-assets/drivers/number-logos/${data}.png.transform/2col/image.png`;
    }
    if (type === 'driver') {
      return `${env.photoMainUrl}drivers/${data}.png.transform/2col/image.png`;
    }
  };

  const onError = () => {
    setIsPhoto(false);
  };
  return (
    <>
      {isPhoto ? (
        <img src={handlePhoto(data, type)} alt='' onError={onError} />
      ) : (
        <>{type === 'driver' ? <BsFillPersonFill /> : <AiOutlineQuestionCircle />}</>
      )}
    </>
  );
};

export default memo(Image);

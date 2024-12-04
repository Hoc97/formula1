import env from '@/configs/env';
import { useState, useEffect, useRef } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FaCarSide } from 'react-icons/fa';
import { useYear } from '@/modules';

interface IProps {
  data: string;
  type: string;
}

const Image = ({ data, type }: IProps) => {
  const imageRef = useRef<any | null>(null);
  const [isPhoto, setIsPhoto] = useState(true);
  const [year] = useYear();

  useEffect(() => {
    if (!isPhoto) {
      setIsPhoto(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handlePhoto = (data, type) => {
    if (type === 'team') {
      return `${env.photoMainUrl}teams/${new Date().getFullYear()}/${data}-logo.png.transform/2col/image.png`;
    }
    if (type === 'car') {
      return `${env.photoMainUrl}teams/${year}/${data}.png.transform/4col/image.png`;
    }
    if (type === 'driver') {
      return `${env.photoMainUrl}drivers/${data}.png.transform/2col/image.png`;
    }
  };

  const onError = () => {
    if (isPhoto) {
      setIsPhoto(false);
    }
  };
  return (
    <>
      {isPhoto ? (
        <img ref={imageRef} src={handlePhoto(data, type)} alt='' onError={onError} />
      ) : (
        <>
          {type === 'team' && <AiOutlineQuestionCircle />}
          {type === 'car' && <FaCarSide />}
          {type === 'driver' && <BsFillPersonFill />}
        </>
      )}
    </>
  );
};

export default Image;

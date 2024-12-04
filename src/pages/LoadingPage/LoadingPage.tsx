import Preloader from '@/assets/Preloader-f1.gif';

const LoadingPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <img src={Preloader} alt='Loading' />
    </div>
  );
};

export default LoadingPage;

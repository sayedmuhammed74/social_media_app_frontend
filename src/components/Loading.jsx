import { TailSpin } from 'react-loader-spinner';

const Loading = ({ status }) => {
  if (status === 'loading') {
    return (
      <div className={`w-full flex justify-center items-center p-3`}>
        <TailSpin
          visible={true}
          height="40"
          width="40"
          color="gray"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
};

export default Loading;

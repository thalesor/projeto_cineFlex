import loading from './loading.gif';

const LoadingScreen = () => 
    {
        return(
            <div className='loading-container'>
                <img src={loading} />
            </div>
        );
    }

export default LoadingScreen;
import loading from './loading.gif';

const LoadingScreen = () => 
    {
        return(
            <div className='loading-container'>
                <img alt='carregando...' src={loading} />
            </div>
        );
    }

export default LoadingScreen;
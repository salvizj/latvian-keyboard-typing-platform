import Keyboard from '../components/keyboard/Keyboard';

const IndexPage = () => {
    const text = 'JFKFJSKF1341 fdsfKFJFKSf'; //demo
    return (
        <>
            <div className="flex flex-col justify-center items-center w-full min-h-screen">
                <Keyboard text={text} />
            </div>
        </>
    );
};

export default IndexPage;

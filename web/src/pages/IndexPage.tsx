import Keyboard from '../components/keyboard/Keyboard';

const IndexPage = () => {
    const text = 'Ā A L Ļ 1 2 '; //demo
    return (
        <>
            <div className="flex flex-col justify-center items-center w-full min-h-screen">
                <Keyboard text={text} />
            </div>
        </>
    );
};

export default IndexPage;

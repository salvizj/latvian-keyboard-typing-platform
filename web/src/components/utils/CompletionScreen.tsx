import translate from '../../utils/translate';
import InfoBox from './InfoBox';

type ButtonProps = {
    text: string;
    onClick: () => void;
    styleClass?: string;
};

type CompletionScreenProps = {
    title: string;
    language: string;
    buttons: ButtonProps[];
};

const CompletionScreen: React.FC<CompletionScreenProps> = ({ title, buttons, language }) => {
    return (
        <InfoBox>
            <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
            {buttons.map((button, index) => (
                <button
                    key={index}
                    onClick={button.onClick}
                    className={`bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary mt-6 ${button.styleClass || ''}`}
                >
                    {translate(button.text, language)}
                </button>
            ))}
        </InfoBox>
    );
};

export default CompletionScreen;

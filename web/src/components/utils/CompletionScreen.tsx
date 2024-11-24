import { capitalize } from '../../utils/capitalize';
import translate from '../../utils/translate';
import InfoBox from './InfoBox';

type ButtonProps = {
    text: string;
    onClick: () => void;
    styleClass?: string;
    customContent?: React.ReactNode;
};

type CompletionScreenProps = {
    title: string;
    language: string;
    buttons: ButtonProps[];
    wpm?: number;
    mistakeCount?: number;
};

const CompletionScreen: React.FC<CompletionScreenProps> = ({ title, buttons, language, wpm, mistakeCount }) => {
    return (
        <InfoBox>
            <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate(title, language))}</h2>

            {/* display WPM and Mistakes if provided */}
            <div className="text-center mb-6">
                {wpm !== undefined && (
                    <p className="text-xl mb-2">
                        {capitalize(translate('wpm', language))} {wpm}
                    </p>
                )}
                {mistakeCount !== undefined && (
                    <p className="text-xl">
                        {capitalize(translate('mistakes', language))} {mistakeCount}
                    </p>
                )}
            </div>

            <div className="flex flex-col items-center">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={button.onClick}
                        className={`bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary mt-6 ${button.styleClass || ''}`}
                    >
                        {button.customContent || capitalize(translate(button.text, language))}
                    </button>
                ))}
            </div>
        </InfoBox>
    );
};

export default CompletionScreen;

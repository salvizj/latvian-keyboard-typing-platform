import { useOptions } from '../../context/OptionsContext';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

const RaceCountdown = () => {
    const { timeLeft } = useOptions();
    const { language } = useLanguage();

    return (
        <>
            {timeLeft != 0 && (
                <div className="flex justify-center items-center text-color-primary text-xl">
                    {translate('time_left', language)} {timeLeft}
                </div>
            )}
        </>
    );
};

export default RaceCountdown;

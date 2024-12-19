import { FC } from 'react';
import { TypingTestWithSettings } from '../../types';
import { MdClose } from 'react-icons/md';
import translate from '../../utils/translate';

type TestDetailsProps = {
    test: TypingTestWithSettings;
    language: string;
    handleClose: () => void;
};

const TestDetails: FC<TestDetailsProps> = ({ test, language, handleClose }) => {
    const typingTestSettings = test.typingTestSettings;

    return (
        <div className="flex flex-col mt-4 bg-transparent relative p-4">
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-3xl hover:text-color-primary-hover-text z-20"
            >
                <MdClose />
            </button>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 font-semibold">{translate('wpm', language)}</div>
                    <div className="p-2 font-semibold">{translate('mistake_count', language)}</div>
                </div>
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 p-2 border-t">
                        <div className="p-2">{test.wpm ?? 0}</div>
                        <div className="p-2">{test.mistakeCount ?? 0}</div>
                    </div>
                </div>
            </div>
            {typingTestSettings ? (
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">{translate('text_settings', language)}</h3>
                    <div>
                        {translate('time', language)}: {typingTestSettings.time}s
                    </div>
                    <div>
                        {translate('text_type', language)}: {translate(typingTestSettings.textType, language)}
                    </div>
                    {typingTestSettings.customText && (
                        <div>
                            {translate('custom_text', language)}: {typingTestSettings.customText}
                        </div>
                    )}
                    {typingTestSettings.poetText && (
                        <>
                            <div>
                                {translate('poet_author', language)}: {typingTestSettings.poetText.poetAuthor}
                            </div>
                            <div>
                                {translate('poet_fragments_name', language)}:{' '}
                                {typingTestSettings.poetText.poetFragmentName}
                            </div>
                            <div>
                                {translate('poet_text', language)}: {typingTestSettings.poetText?.poetText}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <p className="text-red-500">{translate('settings_not_found', language)}</p>
            )}
        </div>
    );
};

export default TestDetails;

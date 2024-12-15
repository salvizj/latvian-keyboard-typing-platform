import { FC } from 'react';
import { TypingTestWithSettings } from '../../types';
import translate from '../../utils/translate';

type TestListProps = {
    tests: TypingTestWithSettings[];
    handleOpen: (index: number) => void;
    language: string;
};

const TestList: FC<TestListProps> = ({ tests, handleOpen, language }) => (
    <>
        {tests.length === 0 ? (
            <p className="text-primary-color p-2 text-sm">{translate('test_count_0', language)}</p>
        ) : (
            tests.map((test, index) => (
                <div
                    key={index}
                    onClick={() => handleOpen(index)}
                    className="flex flex-row gap-20 text-color-primary border-color-primary hover:border-color-secondary cursor-pointer p-4"
                >
                    <p>{index + 1}</p>
                    <p>
                        {translate('wpm', language)}: {test.wpm}
                    </p>
                    <p>
                        {translate('mistake_count', language)}: {test.mistakeCount}
                    </p>
                    <p>
                        {translate('date', language)}: {test.date}
                    </p>
                </div>
            ))
        )}
    </>
);

export default TestList;

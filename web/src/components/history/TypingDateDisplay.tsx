import { FC } from 'react';
import { TypingTestOrRaceData, TypingTest, TypingTestSettings, HistoryTypes } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';

type TypingDataDisplayProps = {
    data: TypingTestOrRaceData | null;
    loading: boolean;
    error: string | null;
    page: number;
    userId: string | null;
};

const ITEMS_PER_PAGE = 5;

const TypingDataDisplay: FC<TypingDataDisplayProps> = ({ data, loading, error, page, userId }) => {
    const { language } = useLanguage();

    if (loading) {
        return <p className="text-primary-color mt-1 mb-1 text-sm">{translate('loading', language)}</p>;
    }

    if (error) {
        return <p className="text-red-500 mt-1 mb-1 text-sm">{translate(error, language)}</p>;
    }

    if (data) {
        if (data.type === HistoryTypes.TypingTest) {
            const testsToDisplay = data.tests.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

            return (
                <div>
                    {testsToDisplay.length === 0 ? (
                        <p className="text-primary-color mt-1 mb-1 text-sm">{translate('test_count_0', language)}</p>
                    ) : (
                        testsToDisplay.map((test: TypingTest, index: number) => {
                            const testSettings = data.settings.find(
                                (setting: TypingTestSettings) =>
                                    setting.typingTestSettingsId === test.typingTestSettingsId
                            );

                            return (
                                <div key={index}>
                                    <p>
                                        <strong>{translate('user_id', language)}</strong> {test.userId} <br />
                                        <strong>{translate('wpm', language)}</strong> {test.wpm} <br />
                                        <strong>{translate('mistake_count', language)}</strong> {test.mistakeCount}{' '}
                                        <br />
                                        <strong>{translate('date', language)}:</strong>{' '}
                                        {new Date(test.date).toLocaleDateString()} <br />
                                        {testSettings ? (
                                            <>
                                                <strong>{translate('text_settings', language)}</strong>
                                                <ul>
                                                    <li>
                                                        <strong>{translate('text_type', language)}</strong>{' '}
                                                        {testSettings.textType}
                                                    </li>
                                                    <li>
                                                        <strong>{translate('custom_text', language)}</strong>{' '}
                                                        {testSettings.customText}
                                                    </li>
                                                    <li>
                                                        <strong>{translate('time', language)}</strong>{' '}
                                                        {testSettings.time}s
                                                    </li>
                                                </ul>
                                            </>
                                        ) : (
                                            <p>No settings found for this test.</p>
                                        )}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            );
        } else if (data.type === HistoryTypes.TypingRace) {
            // Filter players based on the userId, if provided
            const playersToDisplay = userId
                ? data.players.filter((player) => player.userId === userId)
                : data.players.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

            return (
                <div>
                    {playersToDisplay.length === 0 ? (
                        <p className="text-primary-color mt-1 mb-1 text-sm">{translate('race_count_0', language)}</p>
                    ) : (
                        playersToDisplay.map((player, index) => (
                            <div key={index}>
                                <p>
                                    <strong>{translate('username', language)}</strong> {player.username} <br />
                                    <strong>{translate('wpm', language)}</strong> {player.wpm} WPM <br />
                                    <strong>{translate('place', language)}</strong> {player.place} <br />
                                    <strong>{translate('mistake_count', language)}</strong> {player.mistakeCount} <br />
                                    <strong>{translate('race_id', language)}:</strong> {player.typingRaceId}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            );
        }
    }

    return null;
};

export default TypingDataDisplay;

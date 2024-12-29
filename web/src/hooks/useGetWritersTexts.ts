import { useEffect, useState } from 'react';
import { WritersText } from '../types';
import getWritersTexts from '../api/getWritersTexts';

const useGetWritersTexts = (writersTextId?: number) => {
    const [writersTexts, setWritersTexts] = useState<WritersText[]>([]);
    const [writersTextsError, setWritersTextsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWritersTexts = () => {
            if (writersTextId != null && !isNaN(writersTextId)) {
                getWritersTexts(writersTextId)
                    .then((data) => {
                        if (!data) {
                            setWritersTextsError('error_fetching_writers_text');
                            setWritersTexts([]);
                        } else if (Array.isArray(data)) {
                            setWritersTexts(data);
                            setWritersTextsError(null);
                        } else {
                            setWritersTexts([]);
                            setWritersTextsError('error_fetching_writers_text');
                        }
                    })
                    .catch(() => {
                        setWritersTextsError('error_fetching_writers_texts');
                        setWritersTexts([]);
                    });
            } else {
                if (writersTexts.length > 0) {
                    return;
                }
                getWritersTexts()
                    .then((data) => {
                        if (Array.isArray(data)) {
                            setWritersTexts(data);
                            setWritersTextsError(null);
                        } else {
                            setWritersTexts([]);
                            setWritersTextsError('error_fetching_writers_texts');
                        }
                    })
                    .catch(() => {
                        setWritersTextsError('error_fetching_writers_texts');
                        setWritersTexts([]);
                    });
            }
        };

        fetchWritersTexts();
    }, [writersTextId]);

    return { writersTexts, writersTextsError };
};
export default useGetWritersTexts;

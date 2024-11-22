import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import IndexPage from '../pages/IndexPage';
import Layout from '../pages/Layout/Layout';
import LessonsPage from '../pages/LessonsPage';
import StatisticsPage from '../pages/StatisticsPage';
import AppearanceSettingsPage from '../pages/AppearanceSettingsPage';
import LessonPage from '../pages/LessonPage';
import TypingRacePage from '../pages/TypingRacePage';
import TypingTestPage from '../pages/TypingTestPage';
import StatisticsTypingRacePage from '../pages/StatisticsTypingRacePage';
import StatisticsLessonsPage from '../pages/StatisticsLessonsPage';
import StatisticsTypingTestPage from '../pages/StatisticsTypingTestPage';

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/lesson/:id" element={<LessonPage />} />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/statistics/typing-test" element={<StatisticsTypingTestPage />} />
                <Route path="/statistics/lessons" element={<StatisticsLessonsPage />} />
                <Route path="/statistics/typing-race" element={<StatisticsTypingRacePage />} />
                <Route path="/typing-race" element={<TypingRacePage />} />
                <Route path="/typing-test" element={<TypingTestPage />} />
                <Route path="/appearance-settings" element={<AppearanceSettingsPage />} />
            </Route>
        )
    );

    return router;
};

export default Router;

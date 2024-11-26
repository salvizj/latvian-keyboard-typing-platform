import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import IndexPage from '../pages/IndexPage';
import Layout from '../pages/Layout/Layout';
import LessonsPage from '../pages/LessonsPage';
import StatisticsPage from '../pages/HistoryPage';
import LessonPage from '../pages/LessonPage';
import TypingRacePage from '../pages/TypingRacePage';
import TypingTestPage from '../pages/TypingTestPage';
import StatisticsTypingRacePage from '../pages/HistoryTypingRacePage';
import StatisticsTypingTestPage from '../pages/HistoryTypingTestPage';
import ProtectedRoute from './ProtectiveRoute';

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/lesson/:id" element={<LessonPage />} />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route path="/typing-race" element={<TypingRacePage />} />
                <Route path="/typing-test" element={<TypingTestPage />} />

                {/* Protected routes */}

                <Route
                    path="/statistics"
                    element={
                        <ProtectedRoute>
                            <StatisticsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/statistics/typing-test"
                    element={
                        <ProtectedRoute>
                            <StatisticsTypingTestPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/statistics/typing-race"
                    element={
                        <ProtectedRoute>
                            <StatisticsTypingRacePage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        )
    );

    return router;
};

export default Router;

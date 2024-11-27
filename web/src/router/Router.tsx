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
import { OptionsProvider } from '../context/OptionsContext';
import { TypingProvider } from '../context/TypingContext';

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route
                    path="/lesson/:id"
                    element={
                        <TypingProvider>
                            <LessonPage />
                        </TypingProvider>
                    }
                />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route
                    path="/typing-race"
                    element={
                        <TypingProvider>
                            <OptionsProvider>
                                <TypingRacePage />
                            </OptionsProvider>
                        </TypingProvider>
                    }
                />
                <Route
                    path="/typing-test"
                    element={
                        <TypingProvider>
                            <OptionsProvider>
                                <TypingTestPage />
                            </OptionsProvider>
                        </TypingProvider>
                    }
                />

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

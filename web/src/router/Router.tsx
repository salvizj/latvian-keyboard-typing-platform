import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import IndexPage from '../pages/IndexPage';
import Layout from '../pages/Layout/Layout';
import LessonsPage from '../pages/LessonsPage';
import LessonPage from '../pages/LessonPage';
import TypingRacePage from '../pages/TypingRacePage';
import TypingTestPage from '../pages/TypingTestPage';
import ProtectedRoute from './ProtectiveRoute';
import { OptionsProvider } from '../context/OptionsContext';
import { TypingProvider } from '../context/TypingContext';
import GamePage from '../pages/GamePage';
import GamesPage from '../pages/GamesPage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import HistoryPage from '../pages/HistoryPage';
import ProfilePage from '../pages/ProfilePage';

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />}></Route>
                <Route
                    path="/lesson/:lessonId"
                    element={
                        <TypingProvider>
                            <OptionsProvider>
                                <LessonPage />
                            </OptionsProvider>
                        </TypingProvider>
                    }
                />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route
                    path="/games"
                    element={
                        <TypingProvider>
                            <OptionsProvider>
                                <GamesPage />
                            </OptionsProvider>
                        </TypingProvider>
                    }
                />
                <Route
                    path="/game/:gameOption"
                    element={
                        <TypingProvider>
                            <OptionsProvider>
                                <GamePage />
                            </OptionsProvider>
                        </TypingProvider>
                    }
                />
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

                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                {/* Protected routes */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <HistoryPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        )
    );

    return router;
};

export default Router;

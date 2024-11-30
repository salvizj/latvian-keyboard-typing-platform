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
import HistoryTypingRacePage from '../pages/HistoryTypingRacePage';
import HistoryTypingTestPage from '../pages/HistoryTypingTestPage';
import HistoryPage from '../pages/HistoryPage';

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <TypingProvider>
                            <IndexPage />
                        </TypingProvider>
                    }
                ></Route>
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
                    path="/game/:gameName"
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

                <Route
                    path="/sign-up"
                    element={
                        <TypingProvider>
                            <OptionsProvider>
                                <SignUpPage />
                            </OptionsProvider>
                        </TypingProvider>
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <TypingProvider>
                            <OptionsProvider>
                                <SignInPage />
                            </OptionsProvider>
                        </TypingProvider>
                    }
                />
                {/* Protected routes */}

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <HistoryPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history/typing-test"
                    element={
                        <ProtectedRoute>
                            <HistoryTypingTestPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history/typing-race"
                    element={
                        <ProtectedRoute>
                            <HistoryTypingRacePage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        )
    );

    return router;
};

export default Router;

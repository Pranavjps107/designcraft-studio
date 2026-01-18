import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Conversations from './pages/Conversations';
import Analytics from './pages/Analytics';
import KnowledgeBase from './pages/KnowledgeBase';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';
import Contacts from './pages/Contacts';
import Leads from './pages/Leads';
import Deals from './pages/Deals';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="conversations" element={<Conversations />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="knowledge-base" element={<KnowledgeBase />} />
                    <Route path="integrations" element={<Integrations />} />
                    <Route path="settings" element={<Settings />} />

                    {/* CRM Module Routes */}
                    <Route path="leads" element={<Leads />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="deals" element={<Deals />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="documents" element={<Documents />} />

                    {/* Catch all - redirect to dashboard */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

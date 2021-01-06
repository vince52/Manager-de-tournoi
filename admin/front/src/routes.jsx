import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import BrowserView from 'src/views/tournamentbrowser';
import MyTournamentsView from 'src/views/mytournamentspage';
import TournamentEditorView from 'src/views/tournamenteditorpage';
import TournamentView from 'src/views/tournamentpage';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import SteamcallbackView from 'src/views/account/CallbackSteamView'

//import API from './utils/API';
import AuthComponent from './utils/AuthComponent'

export const routes = [{
        path: 'app',
        element: < DashboardLayout /> ,
        children: [
            { path: 'browser', element: < BrowserView /> },
            { path: 'mytournaments', element: < MyTournamentsView /> },
            { path: 'tournamenteditor', element: < TournamentEditorView /> },
            { path: 'tournament/:id', element: < TournamentView /> },
            { path: 'account', element: < AccountView /> },
            { path: 'settings', element: < SettingsView /> },
            { path: 'steam/return/', element: < SteamcallbackView /> },
        ]

    },
    {
        path: '/',
        element: < MainLayout />,
        children: [
            { path: 'login', element: < LoginView /> },
            { path: 'register', element: < RegisterView /> },
            { path: '404', element: < NotFoundView /> },
            { path: '/', element: <AuthComponent><Navigate to="/app/browser" /></AuthComponent>},
            
            // { path: '*', element: < Navigate to = "/404" /> }
        ]
    }
]


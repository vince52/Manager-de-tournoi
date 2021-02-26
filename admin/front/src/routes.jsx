import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import BrowserView from 'src/views/tournamentbrowser';
import MyTournaments from 'src/views/mytournamentspage';
import MyTournamentsView from 'src/views/mytournamentviewpage';
import TournamentEditorView from 'src/views/tournamenteditorpage';
import MatchView from 'src/views/matchpage';
import TeamView from 'src/views/teamviewpage';
import TeamsView from 'src/views/teamsbrowser';
import TeamCreatorView from 'src/views/teamcreatorpage';
import TournamentView from 'src/views/tournamentpage';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import SteamcallbackView from 'src/views/account/CallbackSteamView'
import ProfileBis from 'src/views/matcheditpage'

//import API from './utils/API';
import AuthComponent from './utils/AuthComponent'

export const routes = [{
        path: 'app',
        element: < DashboardLayout /> ,
        children: [
            { path: 'browser', element: < BrowserView /> },
            { path: 'mytournaments', element: < MyTournaments /> },
            { path: 'mytournaments/:id', element: < MyTournamentsView /> },
            { path: 'tournamentcreator', element: < TournamentEditorView /> },
            { path: 'teams', element: < TeamsView /> },
            { path: 'teamcreator', element: < TeamCreatorView /> },
            { path: 'tournament/:id', element: < TournamentView /> },
            { path: 'match/:id', element: < MatchView /> },
            { path: 'teams/:id', element: < TeamView /> },
            { path: 'account', element: < AccountView /> },
            { path: 'settings', element: < SettingsView /> },
            { path: 'steam/return/', element: < SteamcallbackView /> },
            { path: 'match/:id/edit', element: < ProfileBis /> },
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


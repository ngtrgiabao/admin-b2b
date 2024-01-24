import {
    Refine,
    GitHubBanner,
    WelcomePage,
    Authenticated,
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
    AuthPage, ErrorComponent
    , useNotificationProvider
    , ThemedLayoutV2
    , ThemedSiderV2
} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";

import { GraphQLClient } from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws";
import { App as AntdApp } from "antd"
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotPassword";
import { authProvider, dataProvider, liveProvider } from "./providers";

const API_URL = "https://api.nestjs-query.refine.dev/graphql";
const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

const gqlClient = new GraphQLClient(API_URL);
const wsClient = createClient({ url: WS_URL });

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <RefineKbarProvider>
                <Refine
                    notificationProvider={useNotificationProvider}
                    routerProvider={routerBindings}
                    dataProvider={dataProvider}
                    liveProvider={liveProvider}
                    authProvider={authProvider}
                    options={
                        {
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            useNewQueryKeys: true,
                            projectId: "admin-b2b",
                            liveMode: "auto"
                        }
                    }
                >
                    <Routes>
                        <Route index element={<WelcomePage />}></Route>
                    </Routes>
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                </Refine>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;

import {
    Refine,
    Authenticated,
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
    AuthPage, ErrorComponent
    , useNotificationProvider
    , ThemedLayoutV2
    , ThemedSiderV2,
} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";

import { GraphQLClient } from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws";
import { App as AntdApp } from "antd"
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { authProvider, dataProvider, liveProvider } from "./providers";
import { Home, ForgotPassword, Login, Register } from "./pages"
import Layout from './components/layouts';
import { resources } from './config/resources';
import CompanyList from './pages/company/list';
import Create from './pages/company/create';
import EditPage from './pages/company/edit';

const API_URL = "https://api.nestjs-query.refine.dev/graphql";
const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

const gqlClient = new GraphQLClient(API_URL);
const wsClient = createClient({ url: WS_URL });

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <AntdApp>
                    <DevtoolsProvider>
                        <Refine
                            notificationProvider={useNotificationProvider}
                            routerProvider={routerBindings}
                            dataProvider={dataProvider}
                            liveProvider={liveProvider}
                            authProvider={authProvider}
                            resources={resources}
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
                                <Route path='/login' element={<Login />}></Route>
                                <Route path='/register' element={<Register />}></Route>
                                <Route path='/forgot-password' element={<ForgotPassword />}></Route>
                                <Route element={
                                    <Authenticated key="authenticated-layout"
                                        fallback={<CatchAllNavigate to="/login" />}
                                    >
                                        <Layout>
                                            <Outlet />
                                        </Layout>
                                    </Authenticated>
                                }>
                                    <Route index element={<Home />}></Route>
                                    <Route path="/companies" >
                                        <Route index element={
                                            <CompanyList />
                                        } />
                                        <Route path="new" element={<Create />} />
                                        <Route path='edit/:id' element={<EditPage />} />
                                    </Route>
                                </Route>
                            </Routes>
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                        <DevtoolsPanel />
                    </DevtoolsProvider>
                </AntdApp>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;

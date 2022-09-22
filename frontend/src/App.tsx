import {Text, Container, Center, useColorModeValue} from "@chakra-ui/react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LoginView } from './pages/LoginView';
import { HomeView } from './pages/HomeView';
import { SearchView } from './pages/SearchView';
import { PostView } from './pages/PostView';
import { CreatePostView } from './pages/CreatePostView';
import { SessionExpiredView } from './pages/SessionExpiredView';
import { MyPageView } from './pages/MyPageView';
import { useState } from "react";
import { PageBaseView } from "./components/PageBaseView";
import { version } from "./version";
import { ErrorView } from "./pages/ErrorView";
import { palette } from "./theme";

export const App: React.FC = () => {
  const p = useColorModeValue(palette.light.main, palette.dark.main);
  return (
    <Center>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView/>}/>
          <Route path="/home" element={<PageBaseView inner={<HomeView/>}/>}/>
          <Route path="/search" element={<PageBaseView inner={<SearchView/>}/>}/>
          <Route path="/search/:keyword" element={<PageBaseView inner={<SearchView/>}/>}/>
          <Route path="/post/:postid" element={<PageBaseView inner={<PostView/>}/>}/>
          <Route path="/createpost" element={<PageBaseView inner={<CreatePostView/>}/>}/>
          <Route path="/editpost/:postid" element={<PageBaseView inner={<CreatePostView/>}/>}/>
          <Route path="/mypage" element={<PageBaseView inner={<MyPageView/>}/>}/>
          <Route path="/profile/:userid" element={<PageBaseView inner={<MyPageView/>}/>}/>
          <Route path="/error" element={<PageBaseView inner={<ErrorView />}/>}/>
          <Route path="/sessionexpired" element={<SessionExpiredView/>}/>
          <Route element={<SessionExpiredView/>}/>
        </Routes>
      </BrowserRouter>
      <Text position="fixed" left="5pt" bottom="-3pt" fontSize="sm" color="black" zIndex={1000000}>build-{version}</Text>
    </Center>
  );
}
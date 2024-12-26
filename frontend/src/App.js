import LogInSignIn from './Components/LogInSignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MessageProvider } from './Universal/Messagedata';
import { AuthProvider } from './Universal/AuthContext';
import { AlertProvider } from './Universal/AlertContext';
import Authentication from './Universal/Authentication';
import BaseUrl from './Universal/BaseUrl';
import { io } from 'socket.io-client';
import Chatpage from './Components/Chatpage';
import { LoaderProvider } from './Universal/LoaderContext';

const socket = io(BaseUrl);

function App() {

  return (
    <LoaderProvider>
      <AuthProvider>
        <MessageProvider>
          <AlertProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<LogInSignIn socket={socket} />} path="/login" />
                <Route element={<Authentication />}>
                  <Route element={<Chatpage socket={socket} />} path="/chatpage" />
                  <Route path='/' />
                </Route>
              </Routes>
            </BrowserRouter>
          </AlertProvider>
        </MessageProvider>
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;

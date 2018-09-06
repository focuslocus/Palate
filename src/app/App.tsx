import { hot } from 'react-hot-loader';
import * as React from 'react';
import Hello from './components/Hello';

const App = class App extends React.Component<{}> {
    render() {
        return <Hello />;
    }
}

export default hot(module)(App);

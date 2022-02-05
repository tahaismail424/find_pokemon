import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Start from './Start';
import Game from './Game';
import End from './End';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Start} />
                <Route path='/game' component={Game} />
                <Route path='/end' component={End} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;


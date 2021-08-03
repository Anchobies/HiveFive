import './App.css';

import { Route, Switch } from "react-router-dom"
import Header from './Components/Header';
import Footer from './Components/Footer';
import FeedPage from './Components/FeedPage';
import CreatePage from './Components/CreatePage';
import HivesPage from './Components/HivesPage';
import HivePage from './Components/HivePage';
import FriendsPage from './Components/FriendsPage';
import UserPage from './Components/UserPage';
import BeePage from './Components/BeePage';

function App() {
  function timeDifference(current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
  }

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={() => <FeedPage timeDifference={timeDifference} />} />
        <Route exact path="/create" component={CreatePage} />
        <Route exact path="/hives" component={HivesPage} />
        <Route exact path="/hives/:hive_id" component={HivePage} />
        <Route exact path="/friends" component={FriendsPage} />
        <Route exact path="/users/:user_id" component={UserPage} />
        <Route exact path="/hives/:hive_id/:bee_id" component={() => <BeePage timeDifference={timeDifference} />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

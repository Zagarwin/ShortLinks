import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { 
  Container,
  Row,
  Col
} from "react-bootstrap";

import LinkForm from "./LinkForm";
import User from "./User";
import Auth from "./Auth";
import Redirect from "./Redirect";

function App() {
  return (
    <Container>

      <Router>
    
          <Switch>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/:id">
              <Redirect />
            </Route>
            <Route path="/">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <LinkForm />
                </Col>
              </Row>
            </Route>
          </Switch>

      </Router>

    </Container>
  );
}

export default App;

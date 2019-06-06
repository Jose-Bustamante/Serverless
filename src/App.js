import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'

import logo from './logo.svg';
import './App.css';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createMeetup as CreateMeetup } from './graphql/mutations';

// Mutation
const meetupDetails = {
  name: 'Meetup #25 - GraphQL with Amplify',
  group: 'JS Belgrade',
  date: '2019-10-19',
  startTime: '18:00',
  endTime: '20:00',
  location: 'ICT Hub, Kralja Milana 10, Belgrade, Serbia',
  description: 'Long form description'
};


function Meetups() {
  return <h2>List meetups</h2>;
}

function SingleMeetup() {
  return <h2>Show single meetup</h2>;
}

function AddMeetup() {
  return <h2>Add a meetup</h2>;
}

function UpdateMeetup() {
  return <h2>Update a meetup</h2>;
}



class App extends React.Component {

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    console.log('user:', user)

    const newMeetup = await API.graphql(graphqlOperation(CreateMeetup, {input: meetupDetails}));
    console.log(newMeetup);
  }

  render () {
    return (
      <Router>
        <div>
          MENU
          <nav>
            <ul>
              <li><Link to="/">All meetups</Link></li>
              <li><Link to="/123">Single meetup</Link></li>
              <li><Link to="/add">Add a meetup</Link></li>
              <li><Link to="/update/123">Update a meetup</Link></li>
            </ul>
          </nav>

          <Route path="/" exact component={Meetups} />
          <Route path="/meetups/:id" component={SingleMeetup} />
          <Route path="/add" component={AddMeetup} />
          <Route path="/update/:id" component={UpdateMeetup} />
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true })

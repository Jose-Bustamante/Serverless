import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'

import logo from './logo.svg';
import './App.css';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createMeetup as CreateMeetup } from './graphql/mutations';


function Meetups() {
  return <h2>List meetups</h2>;
}

function SingleMeetup() {
  return <h2>Show single meetup</h2>;
}

function AddMeetupComponent(submit) {
  return <Fragment>
    <h2>Add a meetup</h2>
    <form onSubmit={submit}>
      <input type="text" name="name">Name</input>
      <input type="text" name="group">Group</input>
      <input type="date" name="date">Date</input>
      <input type="time" name="start">Time</input>
      <input type="time" name="end">Time end</input>
      <input type="text" name="location">Location</input>
      <input type="text" name="description">Description</input>
      <button type="submit">SUBMIT</button>
    </form>
  </Fragment>;
}

function UpdateMeetup() {
  return <h2>Update a meetup</h2>;
}


class App extends React.Component {

  async createMeetup(data) {
    console.log('PASA POR createMeetup --> ', data);
    await API.graphql(graphqlOperation(CreateMeetup, {input: data}));
  }

  async componentDidMount() {
    // const user = await Auth.currentAuthenticatedUser()
    // console.log('user:', user)

    // const newMeetup = await API.graphql(graphqlOperation(CreateMeetup, {input: meetupDetails}));
    // console.log(newMeetup);
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
          <Route path="/add" component={(createMeetup) => AddMeetupComponent(createMeetup)} />
          <Route path="/update/:id" component={UpdateMeetup} />
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true })

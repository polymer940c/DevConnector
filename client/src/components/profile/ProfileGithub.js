import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// const keys = require('../../keys');

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '21c3e3b4e231a91d7b4b',
      clientSecret: '56d0ec6dad16e9e06d312f501b034dd80b0ea552',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { githubUserName } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${githubUserName}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.message === "Not Found") {
          console.log('no repos found for user')
        } else {
          this.setState({ repos: data });
        }
      })
      .catch(err => {
        console.log('found error ')
      });
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.length > 0 ? (
      repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ))
    ) :
      (
        <div>No recent repos</div>
      )

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  githubUserName: PropTypes.string.isRequired
};

export default ProfileGithub;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      displaySocialInputs: false,

      profileData: {
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
      },
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const { profileData } = this.state;
    this.props.createProfile(profileData, this.props.history);
  };
  onChange = e => {
    let currentProfile = this.state.profileData;
    currentProfile[e.target.name] = e.target.value;
    this.setState({ profileData: currentProfile });
  };
  toggleDisplaySocial = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };
  render() {
    const currentThis = this;
    const { errors, displaySocialInputs } = this.state;
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];
    const socialOptions = [
      {
        name: 'twitter',
        iconClass: 'fa-twitter',
        value: this.state.profileData.twitter,
        error: errors.twitter
      },
      {
        name: 'facebook',
        iconClass: 'fa-facebook',
        value: this.state.profileData.facebook,
        error: errors.facebook
      },
      {
        name: 'linkedin',
        iconClass: 'fa-linkedin',
        value: this.state.profileData.linkedin,
        error: errors.linkedin
      },
      {
        name: 'youtube',
        iconClass: 'fa-youtube',
        value: this.state.profileData.youtube,
        error: errors.youtube
      },
      {
        name: 'instagram',
        iconClass: 'fa-instagram',
        value: this.state.profileData.instagram,
        error: errors.instagram
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form action="" onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.profileData.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.profileData.status}
                  options={options}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Give us some info"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.profileData.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.profileData.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.profileData.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.profileData.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.profileData.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.profileData.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    onClick={this.toggleDisplaySocial}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {displaySocialInputs &&
                  socialOptions.map((socialObj, i) => (
                    <div key={i + socialObj.name}>
                      <InputGroup
                        placeholder={`${socialObj.name} Page URL`}
                        name={socialObj.name}
                        icon={`fab ${socialObj.iconClass}`}
                        value={socialObj.value ? socialObj.value : ''}
                        onChange={currentThis.onChange}
                        error={socialObj.error}
                      />
                    </div>
                  ))}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));

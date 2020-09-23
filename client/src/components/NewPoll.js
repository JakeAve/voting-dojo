import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createPoll } from '../actions/createPoll';

export class newPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      redirect: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = (e) => {
    const name = e.target.name.replace('-', '');
    this.setState({ [name]: e.target.value });
  };

  async onSubmit(e) {
    e.preventDefault();
    const { question, option1, option2, option3, option4 } = this.state;
    const payload = {
      question,
      options: [option1, option2, option3, option4].filter(Boolean),
    };
    console.log({ payload });
    const success = await createPoll(payload);
    if (success) this.setState({ redirect: '/' });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <form className="new-poll-form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label className="required">
            Your question:
            <textarea
              name="question"
              required
              value={this.state.question}
              onChange={this.handleChange}
            ></textarea>
          </label>
          <button className="btn">Submit</button>
        </div>
        <div className="form-group">
          <label className="required">
            Option 1:
            <input
              name="option-1"
              type="text"
              required
              onChange={this.handleChange}
              value={this.state.option1}
            />
          </label>
          <label className="required">
            Option 2:
            <input
              name="option-2"
              type="text"
              required
              value={this.state.option2}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Option 3:
            <input
              name="option-3"
              type="text"
              value={this.state.option3}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Option 4:
            <input
              name="option-4"
              type="text"
              value={this.state.option4}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="red-required">Indicates required field</div>
      </form>
    );
  }
}

export default newPoll;

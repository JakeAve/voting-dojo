import React, { useState, useEffect, Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getPoll } from '../actions/getPoll';
import { vote } from '../actions/vote';

export default function Poll() {
  const [poll, setPoll] = useState({ question: '', options: [] });
  const [voted, setVoted] = useState(false);
  const match = useRouteMatch('/polls/:id');
  useEffect(() => {
    getPoll(match.params.id).then((newPoll) => setPoll(newPoll));
  }, [voted]);

  let content = '';
  if (voted) {
    content = (
      <Fragment>
        <div className="graph"></div>
        <ul className="results-list">
          {poll.options.map(({ option, votes, _id }) => (
            <li key={_id}>
              <span>{option}</span>
              <span>{votes + ' votes'}</span>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  } else {
    content = poll.options.map(({ option, _id }, i) => (
      <div>
        <h3>{option}</h3>
        <button
          className={'btn ' + (i % 2 ? 'accent-2' : '')}
          key={_id}
          onClick={() => {
            vote(poll._id, _id).then(() => setVoted(true));
          }}
        >
          {'Vote ' + option}
        </button>
      </div>
    ));
  }
  return (
    <section className="poll-and-results">
      <h2 className="poll-question">{poll.question}</h2>
      {content}
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPolls } from '../actions/getPolls';
import moment from 'moment';

function pollSummary(poll) {
  const { _id, question, options, date } = poll;
  return (
    <div key={_id} className="poll-summary">
      <Link to={`/polls/${_id}`}>{question}</Link>
      <div className="poll-votes-summary">
        {options.map(({ _id: oId, option, votes }) => (
          <span key={oId}>
            {option}: <strong>{votes}</strong>
          </span>
        ))}
      </div>
      <span>({setTimeStamp(date)})</span>
    </div>
  );
}

function getTotalVotes(options) {
  return options.reduce((acc, option) => acc + option.votes, 0);
}

function sortPolls(polls) {
  const top3 = polls
    .sort((a, b) => getTotalVotes(b.options) - getTotalVotes(a.options))
    .slice(0, 3);
  const sorted = polls.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { top3, sorted };
}

function setTimeStamp(date) {
  return moment(date).fromNow();
}

export default function PollsSummary() {
  const [top3Polls, setTop3Polls] = useState([]);
  const [sortedPolls, setSortedPolls] = useState([]);

  useEffect(() => {
    getPolls().then((polls) => {
      const { top3, sorted } = sortPolls(polls);
      setTop3Polls(top3);
      setSortedPolls(sorted);
    });
  }, []);

  let renderedTop3 = '';
  if (top3Polls.length) {
    renderedTop3 = top3Polls.map(pollSummary);
  }
  let renderSorted = '';
  if (top3Polls.length) {
    renderSorted = sortedPolls.map(pollSummary);
  }

  return (
    <section className="polls-summary">
      <div>
        <h2>Top 3 Polls</h2>
        {renderedTop3}
      </div>
      <div>
        <h2>All Polls</h2>
        {renderSorted}
      </div>
    </section>
  );
}

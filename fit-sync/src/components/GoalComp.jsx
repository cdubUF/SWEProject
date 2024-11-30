import React from 'react';
import PropTypes from 'prop-types';
import './GoalComp.css';

const GoalComp = ({ title, description, dueDate }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className = "goal-comp">
            <h2>{title}</h2>
            <p><em>{description}</em></p>
            <p><strong>Target Date:</strong> {formatDate(dueDate)}</p>
        </div>
    );
};

GoalComp.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
};

GoalComp.defaultProps = {
    title: 'No Title',
    description: 'No Description',
    dueDate: new Date().toISOString()
};

export default GoalComp;
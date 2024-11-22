import React from 'react';
import PropTypes from 'prop-types';
import './GoalComp.css';

const GoalComp = ({ name, description, targetDate }) => {
    return (
        <div className="goal-comp">
            <h2>{name}</h2>
            <p>{description}</p>
            <p><strong>Target Date:</strong> {targetDate}</p>
        </div>
    );
};

GoalComp.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    targetDate: PropTypes.string.isRequired,
};

GoalComp.defaultProps = {
    name: 'N/A',
    description: 'N/A',
    targetDate: 'N/A',
};

export default GoalComp;
import { skills_data } from './skills';
import classNames from './card.module.scss';
import PropTypes from 'prop-types';

const Showskills = ({ show }) => {
  return (
    <div className={classNames.showskills}>
      {skills_data.topskills.map((skill) => {
        return (
          <p
            style={{ background: `${skill.background}` }}
            className={classNames.techskills}
            key={skill.color}>
            {skill.tech}
          </p>
        );
      })}
      {show &&
        skills_data.skills.map((skill) => {
          return (
            <p
              style={{ background: `${skill.background}` }}
              className={classNames.techskills}
              key={skill.color}>
              {skill.tech}
            </p>
          );
        })}
    </div>
  );
};

Showskills.propTypes = {
  show: PropTypes.bool.isRequired
};
export default Showskills;

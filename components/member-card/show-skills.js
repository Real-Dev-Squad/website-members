import { skills_data } from './mock-data/skills';
import classNames from './card.module.scss';
import PropTypes from 'prop-types';

const ShowSkills = ({ show }) => {
  return (
    <div className={show ? classNames.showMemberSkills : classNames.showSkills}>
      {skills_data.topskills.map((skill) => {
        return (
          <p
            style={{ background: `${skill.background}` }}
            className={classNames.techSkills}
            key={skill.id}>
            {skill.tech}
          </p>
        );
      })}
      {show &&
        skills_data.skills.map((skill) => {
          return (
            <p
              style={{ background: `${skill.background}` }}
              className={classNames.techSkills}
              key={skill.id}>
              {skill.tech}
            </p>
          );
        })}
    </div>
  );
};

ShowSkills.propTypes = {
  show: PropTypes.bool.isRequired
};
export default ShowSkills;

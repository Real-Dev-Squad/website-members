import { skills_data } from 'components/member-card/mock-data/skills';
import classNames from 'components/member-card/card.module.scss';
import PropTypes from 'prop-types';

const ShowSkills = ({ show }) => {
  return (
    <div className={show ? classNames.showMemberSkills : classNames.showSkills}>
      {skills_data.topskills.map((skill) => {
        return <RenderSkills {...skill} key={skill.id} />;
      })}
      {show &&
        skills_data.skills.map((skill) => {
          return <RenderSkills {...skill} key={skill.id} />;
        })}
    </div>
  );
};

function RenderSkills(props) {
  return (
    <div
      style={{ background: `${props.background}`, border: `0.3px solid ${props.borderColor}` }}
      className={classNames.techSkills}>
      {props.tech}
    </div>
  );
}

ShowSkills.propTypes = {
  show: PropTypes.bool.isRequired
};

RenderSkills.propTypes = {
  tech: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired
};

export default ShowSkills;

import skillsData from 'components/member-card/mock-data/skills';
import classNames from 'components/member-card/card.module.scss';
import PropTypes from 'prop-types';

const ShowSkills = ({ show }) => {
  return (
    <div className={show ? classNames.showMemberSkills : classNames.showSkills}>
      {skillsData.topskills.map((skill) => {
        return <RenderSkills {...skill} key={skill.id} />;
      })}
      {show &&
        skillsData.skills.map((skill) => {
          return <RenderSkills {...skill} key={skill.id} />;
        })}
    </div>
  );
};

function RenderSkills({ background, borderColor, tech }) {
  return (
    <div
      style={{
        background: `${background}`,
        border: `0.3px solid ${borderColor}`,
      }}
      className={classNames.techSkills}
    >
      {tech}
    </div>
  );
}

ShowSkills.propTypes = {
  show: PropTypes.bool.isRequired,
};

RenderSkills.propTypes = {
  tech: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

export default ShowSkills;

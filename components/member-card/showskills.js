import { skills } from './skills';
import classNames from './card.module.scss';

const Showskills = () => {
  //   skills.map(skill => console.log(skill));
  return (
    <div className={classNames.showskills}>
      {skills.map((skill) => {
        // eslint-disable-next-line react/jsx-key
        return (
          // eslint-disable-next-line react/jsx-key
          <p style={{ background: `${skill.color}` }} className={classNames.techskills}>
            {skill.tech}
          </p>
        );
      })}
    </div>
  );
};
export default Showskills;

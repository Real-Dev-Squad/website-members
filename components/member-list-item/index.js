import { string } from 'prop-types';

// Render a member's information
const PreviewMember = (props) => {
  const { rdsId } = props;
  return <div>{rdsId}</div>;
};

PreviewMember.propTypes = {
  rdsId: string
};

export default PreviewMember;

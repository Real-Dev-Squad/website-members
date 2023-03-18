import { assignTags } from '@helper-functions/action-handlers';
import { useState } from 'react';

const MemberTagAssign = ({ userId, tags, levels }) => {
  const [saveStatus, setSavedStatus] = useState(' ');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedTag = event.target.tag.value;
    const selectedLevel = event.target.level.value;
    const data = {
      itemId: userId,
      itemType: 'USER',
      tagPayload: [
        {
          tagId: selectedTag,
          levelId: selectedLevel,
        },
      ],
    };
    setSavedStatus('Adding tag Please wait');
    const addTag = await assignTags(data);
    if (addTag.status) {
      if (addTag.status === 200) {
        setSavedStatus('Tag added Successfully');
      } else {
        setSavedStatus('Could not add tag to the user.');
      }
    } else {
      setSavedStatus('Could not add tag to the user.');
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <select name="tag">
          {tags.map((tag) => (
            <option value={tag.id} key={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <select name="level">
          {levels.map((level) => (
            <option value={level.id} key={level.id}>
              {level.name}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      {saveStatus}
    </>
  );
};

export default MemberTagAssign;

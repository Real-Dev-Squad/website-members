import { BASE_API_URL } from '@constants/AppConstants';
import useFetch from '@custom-hooks/useFetch';
import { assignTags } from '@helper-functions/action-handlers';
import { useState } from 'react';

const MemberTagAssign = ({ userId }) => {
  const [saveStatus, setSavedStatus] = useState(' ');

  const { data: tagData } = useFetch(`${BASE_API_URL}/tags`);
  const { data: levelData } = useFetch(`${BASE_API_URL}/levels`);

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
          {tagData &&
            tagData.tags.map((tag) => (
              <option value={tag.id} key={tag.id}>
                {tag.name}
              </option>
            ))}
        </select>
        <select name="level">
          {levelData &&
            levelData.levels.map((level) => (
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

const searchMembers = (membersArr, searchTerm) => {
  return membersArr.filter(
    (member) =>
      member.first_name
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
};

export { searchMembers };

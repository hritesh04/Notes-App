const handleNoteClick = (navigate, notes, _id) => {
  navigate(`/edit/${_id}`, {
    state: {
      _id: _id,
      note: notes,
    },
  });
};
export default handleNoteClick;

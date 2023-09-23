import { NavigateFunction } from "react-router-dom";

type NoteType = {
  _id: string;
  user: string;
  title: string;
  content: string;
};

interface handleNoteClickType {
  navigate: NavigateFunction;
  notes: NoteType[];
  _id: string;
}

const handleNoteClick = ({ navigate, notes, _id }: handleNoteClickType) => {
  navigate(`/edit/${_id}`, {
    state: {
      _id: _id,
      note: notes,
    },
  });
};
export default handleNoteClick;

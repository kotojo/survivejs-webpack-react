import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = NoteStore.getState();
  }
  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }
  storeChanged = (state) => {
    // Without a property initializer `this` wouldn't
    // point at the right context because it defaults to
    // `undefined` in strict mode.
    this.setState(state);
  };

  render() {

    const notes = this.state.notes;

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote}/>
      </div>
    );
  }
  deleteNote = (id, e) => {
    e.stopPropagation();

    NoteActions.delete(id);
  };
  addNote = () => {
    NoteActions.create({task: 'New Task'});
  };
  editNote = (id, task) => {
    if (!task.trim()) {
      return;
    }
    NoteActions.update({id, task});
  };
}

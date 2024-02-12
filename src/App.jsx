import { NoteCard } from "./components/note-card";
import { NewNodeCard } from "./components/new-node-card";
import { useState } from "react";
import { Search } from "lucide-react";

export const App = () => {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  //Adicionar Opção de edição de nota

  const onNoteCreated = (content) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];
    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  };

  const onNoteDeleted = (id) => {
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray)

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  const handleSearch = (e) => {

    const query = e.target.value

    setSearch(query)
  }


  const filteredNotes = search !== ''
  ? notes.filter(note => note.content.includes(search))
  : notes


  return (
    <div className="mx-auto max-w-6xl my-16 space-y-6  px-5">
      <form className="w-full flex gap-3">
        <Search className="flex my-auto text-slate-300" />
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl tracking-tight placeholder: text-slate-500 outline-none"
        />
      </form>

      <div className="h-px bg-slate-700" />


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[15.625rem]">
      {search === '' ? (
        <NewNodeCard onNoteCreated={onNoteCreated} />
      ): null}

        {filteredNotes.map((note) => {
          return (
            <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
          );
        })}
      </div>
    </div>
  );
};

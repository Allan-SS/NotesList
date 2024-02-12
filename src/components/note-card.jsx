import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

export const NoteCard = ({ note, onNoteDeleted }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md p-5 flex flex-col gap-3 text-left bg-slate-800 overflow-hidden outline-none relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-indigo-400">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>

        <div className="absolute bottom-0 right-0 left-0 h-1/3 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none " />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[40rem] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 p-1.5 text-slate-400 bg-slate-800">
            <X className="size-5 hover:text-slate-100" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

{/* Criar button(Pencil.icon) no canto inferior direito de edição de nota baseado na função de coleta de ID, modificação de text in new textarea e save fazendo substituição de ID porem mantendo informações de Date e new Note 
    Com um useState(true) recebendo a informação de edit or not por props, assim mostrando no canto inferior diteiro da nota em HomePage "Edited('Editado')"  */}

          <button
            type="button"
            onClick={() => onNoteDeleted(note.id)}
            className="w-full py-4 outline-none text-slate-300 text-sm text-center bg-slate-800 font-medium group"
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

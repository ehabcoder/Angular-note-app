declare const Buffer;

export interface Note {
    body: string;
    createdAt: string;
    deletedAt: string;
    disabled: boolean;
    id: string;
    media_file: typeof Buffer;
    owner: number;
    title: string;
    updatedAt: string;
}

export interface getNoteResponse {
    noteId: string,
    noteTitle: string,
    noteBody: string,
    noteDisabled: string,
    noteOwnerName: string,
    noteOwnerEmail: string,
    noteSenderName: string,
    noteSenderEmail: string,
}
  
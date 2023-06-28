import Note from "../models/Note.js";

// Función para formatear la fecha en el formato deseado
const formatDate = date => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("es-ES", options);
};

export const renderNoteForm = (req, res) => res.render("notes/new-note");

export const createNewNote = async (req, res) => {
  const { title, description, dateLimit } = req.body;
  const errors = [];

  if (!title) {
    errors.push({ text: "Por Favor Escribe un Título." });
  }
  if (!description) {
    errors.push({ text: "Por Favor Escribe una Descripción." });
  }
  if (!dateLimit) {
    errors.push({ text: "Por Favor Ingresa una Fecha Limite." });
  } else {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const inputDate = new Date(dateLimit).setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
      errors.push({ text: "La fecha límite debe ser mayor a la fecha actual." });
    }
    if(isNaN(new Date(dateLimit))){
      errors.push({ text: "Ingrese el formato YYYY-MM-DD" });
    }
  }

  if (errors.length > 0) {
    return res.render("notes/new-note", {
      errors,
      title,
      description,
      dateLimit,
    });
  }

  const formattedDateLimit = new Date(dateLimit).toDateString();
  const newNote = new Note({ title, description, dateLimit: formattedDateLimit });
  newNote.user = req.user.id;
  await newNote.save();

  req.flash("success_msg", "Nota Añadida Correctamente");
  res.redirect("/notes");
};

export const renderNotes = async (req, res) => {
  const currentDate = new Date().setHours(0, 0, 0, 0);

  await Note.deleteMany({ dateLimit: { $lt: currentDate } }); // Eliminar las notas cuya fecha límite ha pasado

  const notes = await Note.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();

  // Formatear la fecha de cada nota antes de enviarla a la vista
  const formattedNotes = notes.map(note => ({
    ...note,
    dateLimit: formatDate(note.dateLimit)
  }));

  res.render("notes/all-notes", { notes: formattedNotes });
};

export const renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();

  if (note.user != req.user.id) {
    req.flash("error_msg", "No Autorizado");
    return res.redirect("/notes");
  }

  // Formatear la fecha antes de enviarla a la vista
  const formattedNote = {
    ...note,
    dateLimit: formatDate(note.dateLimit)
  };

  res.render("notes/edit-note", { note: formattedNote });
};

export const updateNote = async (req, res) => {
  const { title, description} = req.body;

  await Note.findByIdAndUpdate(req.params.id, { title, description});
  req.flash("success_msg", "Nota Actualizada Correctamente");
  res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Nota Eliminada Correctamente");
  res.redirect("/notes");
};
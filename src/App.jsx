import { useState } from 'react'

const App = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [tasks, setTasks] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentEditIndex, setCurrentEditIndex] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()

    if (!title && !details) return

    const copyTasks = [...tasks]

    if (isEditing && currentEditIndex !== null) {
      // update existing note
      copyTasks[currentEditIndex] = { title, details }
      setIsEditing(false)
      setCurrentEditIndex(null)
    } else {
      // add new note at the end
      copyTasks.push({ title, details })
    }

    setTasks(copyTasks)
    setTitle('')
    setDetails('')
  }

  const deleteNote = (idx) => {
    const copyTasks = [...tasks]
    copyTasks.splice(idx, 1)
    setTasks(copyTasks)
  }

  const editNote = (note, idx) => {
    setTitle(note.title)
    setDetails(note.details)
    setIsEditing(true)
    setCurrentEditIndex(idx)
  }

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50'>
      <div className='mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-8 lg:flex-row'>
        {/* Left: form */}
        <div className='w-full lg:w-5/12'>
          <div className='h-full rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/60'>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
              {isEditing ? 'Edit note' : 'Add a new note'}
            </h1>
            <p className='mt-1 text-xs text-slate-400 sm:text-sm'>
              Write a short title and some details. Notes appear on the right.
            </p>

            <form
              onSubmit={submitHandler}
              className='mt-5 flex flex-col gap-4'
            >
              {/* INPUT FOR HEADING */}
              <div className='space-y-1'>
                <label className='text-xs font-medium uppercase tracking-wide text-slate-300'>
                  Title
                </label>
                <input
                  type='text'
                  placeholder='Enter note title'
                  className='w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40'
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                />
              </div>

              {/* INPUT FOR DETAILS  */}
              <div className='space-y-1'>
                <label className='text-xs font-medium uppercase tracking-wide text-slate-300'>
                  Details
                </label>
                <textarea
                  className='w-full h-32 resize-none rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40'
                  placeholder='Write details here...'
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value)
                  }}
                />
              </div>

              <button
                className='mt-1 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm shadow-emerald-500/40 transition hover:bg-emerald-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-emerald-500/50 disabled:text-emerald-900/70'
                disabled={!title && !details}
              >
                {isEditing ? 'Update note' : 'Add note'}
              </button>
            </form>
          </div>
        </div>

        {/* Right: notes list */}
        <div className='w-full lg:w-7/12'>
          <div className='flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-lg shadow-slate-950/60'>
            <div className='mb-4 flex items-center justify-between gap-3'>
              <div>
                <h2 className='text-lg font-semibold text-slate-100'>
                  Your notes
                </h2>
                <p className='text-xs text-slate-400'>
                  {tasks.length === 0
                    ? 'No notes yet. Add your first note on the left.'
                    : 'Click edit to update a note or delete to remove it.'}
                </p>
              </div>
              <span className='rounded-full bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-300'>
                {tasks.length} {tasks.length === 1 ? 'note' : 'notes'}
              </span>
            </div>

            {tasks.length === 0 ? (
              <div className='mt-4 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-10 text-center'>
                <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300'>
                  ✏️
                </div>
                <p className='text-sm font-medium text-slate-100'>
                  Nothing here yet
                </p>
                <p className='mt-1 max-w-xs text-xs text-slate-400'>
                  Start by adding a note on the left. Your notes will appear in
                  this list.
                </p>
              </div>
            ) : (
              <div className='mt-2 grid flex-1 grid-cols-1 gap-4 overflow-y-auto pb-2 sm:grid-cols-2'>
                {tasks.map((elem, idx) => {
                  return (
                    <div
                      key={idx}
                      className='flex h-full flex-col justify-between rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-4 text-slate-100 shadow-sm shadow-slate-950/50 transition hover:-translate-y-0.5 hover:border-emerald-500/60 hover:shadow-emerald-500/30'
                    >
                      <div>
                        <h3 className='line-clamp-2 text-sm font-semibold leading-snug'>
                          {elem.title || 'Untitled note'}
                        </h3>
                        <p className='mt-2 line-clamp-4 text-xs leading-relaxed text-slate-300'>
                          {elem.details || (
                            <span className='italic text-slate-500'>
                              No details added.
                            </span>
                          )}
                        </p>
                      </div>
                      <div className='mt-3 flex items-center justify-end gap-2'>
                        <button
                          onClick={() => {
                            editNote(elem, idx)
                          }}
                          className='inline-flex items-center justify-center rounded-md border border-emerald-500/70 bg-slate-950/70 px-2.5 py-1 text-[11px] font-medium text-emerald-200 transition hover:bg-emerald-500/10 active:scale-[0.97]'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteNote(idx)
                          }}
                          className='inline-flex items-center justify-center rounded-md bg-rose-500 px-2.5 py-1 text-[11px] font-semibold text-rose-50 shadow-sm shadow-rose-900/40 transition hover:bg-rose-400 active:scale-[0.97]'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
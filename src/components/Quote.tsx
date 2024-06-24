
function Quote() {
  return (
    <div className='bg-neutral-200 h-screen flex justify-center flex-col'>
      <div className='flex justify-center'>
        <div className='max-w-lg'>
          <div className='max-w-lg text-3xl font-bold mb-2 leading-relaxed '>
            Blogging is a conversation, not a <code className="bg-slate-400 rounded-lg px-2 font-mono">Code</code>
          </div>
          <div className='max-w-md font-bold text-xl '>
            Jules Winnfield
          </div>
          <div className='text-neutral-500'>
            CEO | Acme Inc
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quote
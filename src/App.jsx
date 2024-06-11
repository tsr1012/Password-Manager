import React, { useRef, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ViewIcon from './assets/view-stroke-rounded'
import ViewOffIcon from './assets/view-off-stroke-rounded'
import CopyButton from './components/CopyButton'
import EditButton from './components/EditButton'
import DeleteButton from './components/DeleteButton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const passVisibilityRef = useRef()
  const [isVisible, setIsVisible] = useState(false)
  const [form, setForm] = useState({ website: "", username: "", password: "", id: "" })
  const [formArray, setFormArray] = useState([])

  const getPasswordsFromDb = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setFormArray(passwords)
  }

  useEffect(() => {
    getPasswordsFromDb();
  }, [])


  const toggleVisibility = () => {
    isVisible ? passVisibilityRef.current.type = "password" : passVisibilityRef.current.type = "text"
    setIsVisible(!isVisible)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.slice(0, 17) })
  }

  const copyText = (text, value) => {
    navigator.clipboard.writeText(text)
    toast(`${value} copied to clipboard`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const savePassword = () => {
    if (form.id) {
      fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
    }
    const newForm = { ...form, id: uuidv4() }
    setForm(newForm)
    setFormArray([...formArray, newForm])
    // saving password to database
    fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newForm) })
    setForm({ website: "", username: "", password: "", id: "" })
    toast.success(`Password saved successfully!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const editPassword = (data) => {
    // set password data into the input fields and form state
    setForm({ website: data.website, username: data.username, password: data.password, id: data.id })
    // remove the selected password from the password list (client side only)
    setFormArray(formArray.filter(item => item.id != data.id))
  }

  const deletePassword = (id) => {
    let consent = confirm("Do you really want to delete this password data?")
    if (consent) {
      fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      setFormArray(formArray.filter(item => item.id != id))
      toast(`Password deleted!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const deleteAllPasswords = () => {
    let consent = confirm("Do you really want to delete all password data?")
    if (consent) {
      fetch("http://localhost:3000/clearDB", { method: "DELETE" })
      setFormArray([])
      toast.error('All passwords deleted!', {
        icon: false,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <>
      <Navbar />

      <div className='bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={2}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />

        <main className='container min-h-[calc(100vh_-_96px)] max-w-screen-sm m-auto text-white'>
          <header>
            <div className='py-3'>
              <h1 className='text-6xl font-black text-center pb-3'><span>🔒Key</span><span className='text-[#f9c23c]'>Keep</span></h1>
              <p className='text-center italic'>Your own password manager.</p>
            </div>
          </header>

          <section className='py-6 flex justify-center'>
            <div className='min-w-full flex flex-col items-center gap-5'>
              <input value={form.website} name="website" onChange={handleChange} type="text" placeholder='Website' className='bg-slate-600 rounded-full w-full focus:outline outline-1 outline-[#f9c23c] caret-[#f9c23c] px-3 py-1' />
              <div className='sm:flex-row flex flex-col gap-4 w-full'>
                <div className='sm:w-3/5 flex items-center'>
                  <input value={form.username} name="username" onChange={handleChange} type="text" placeholder='Username' className='bg-slate-600 rounded-full w-full focus:outline outline-1 outline-[#f9c23c] caret-[#f9c23c] px-3 py-1' />
                </div>
                <div className='sm:w-2/5 relative flex items-center'>
                  <input value={form.password} name="password" onChange={handleChange} ref={passVisibilityRef} type="password" placeholder='Password' className='bg-slate-600 rounded-full w-full focus:outline outline-1 outline-[#f9c23c] caret-[#f9c23c] px-3 py-1' />
                  {form.password &&
                    <button onClick={toggleVisibility} className='absolute right-0.5 hover:bg-slate-800 rounded-full p-1'>
                      {isVisible ? <ViewIcon /> : <ViewOffIcon />}
                    </button>}
                </div>
              </div>
              <button onClick={savePassword} disabled={!form.password.trim()} id='addBtn' className={`${form.password.trim() && 'active:outline active:outline-2 active:outline-[#f9c23c] active:bg-[#b38e33] active:scale-95'} rounded-full py-1 px-4 flex items-center gap-3 bg-[#ddab33] hover:outline hover:outline-2 hover:outline-slate-300 transition-transform duration-50`}>
                <span>Save</span>
                <lord-icon
                  style={{ width: 24, height: 24 }}
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  colors="primary:#ffffff"
                  trigger="hover"
                  target="#addBtn">
                </lord-icon>
              </button>
            </div>
          </section>

          <section className='py-4'>
            <div>
              <h2 className='text-2xl font-semibold'>Your Saved Passwords</h2>
            </div>
            <div className='py-3'>
              {formArray.length == 0 &&
                <div>
                  <p>No passwords to show.</p>
                </div>}
              {formArray.length != 0 && <>
                <div className="bg-black max-h-80 overflow-y-auto rounded-md no-scrollbar relative select-none">
                  <div className='bg-[#d8a633] text-left flex justify-between sticky top-0 z-10'>
                    <div className='px-2 py-1 w-1/4 text-center'>Website</div>
                    <div className='px-2 py-1 w-1/4 text-center'>Username</div>
                    <div className='px-2 py-1 w-1/4 text-center'>Password</div>
                    <div className='px-2 py-1 w-1/4 text-center'>Actions</div>
                  </div>
                  {formArray.map((item, index) => {
                    return <div key={index} className='hover:bg-zinc-900 border-b border-stone-600 flex justify-between'>
                      <div className='px-2 py-1 w-1/4 flex justify-between'><a className='overflow-hidden text-ellipsis' href={"https://" + item.website} target='_blank'>{item.website}</a><CopyButton handleClick={() => copyText(item.website, "Website")} /></div>

                      <div className='px-2 py-1 w-1/4 flex justify-between'><span className='overflow-hidden text-ellipsis'>{item.username}</span><CopyButton handleClick={() => copyText(item.username, "Username")} /></div>

                      <div className='px-2 py-1 w-1/4 flex justify-center gap-2'><span>••••</span><CopyButton handleClick={() => copyText(item.password, "Password")} /></div>

                      <div className='px-2 py-1 w-1/4 flex justify-center gap-2'><EditButton handleClick={() => editPassword(item)} /><DeleteButton handleClick={() => deletePassword(item.id)} /></div>
                    </div>
                  })}
                </div>
                <div className='flex justify-end pt-6'>
                  <button onClick={deleteAllPasswords} className='active:outline active:outline-2 active:outline-red-500 active:bg-red-900 active:scale-95 rounded-full py-1 px-4 flex items-center gap-3 bg-red-700 hover:outline hover:outline-2 hover:outline-slate-300 transition-transform duration-50'>Delete All</button>
                </div>
              </>}
            </div>
          </section>
        </main>
      </div>
      
      <Footer />
    </>
  )
}

export default App

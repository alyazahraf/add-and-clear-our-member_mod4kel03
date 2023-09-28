import React, { useState, useContext, useEffect } from "react";

const MemberContext = React.createContext();

function Member() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

  useEffect(() => {
    // Simpan daftar anggota dalam local storage
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    // Ambil daftar anggota dari local storage saat komponen dimuat
    const savedMembers = JSON.parse(localStorage.getItem("members"));
    if (savedMembers) {
      setMembers(savedMembers);
    }
  }, []);

  const addMember = () => {
    if (newMember.trim() !== "") {
      setMembers([...members, newMember]);
      setNewMember("");
    }
  };

  const clearMembers = () => {
    setMembers([]);
  };

  return (
    <MemberContext.Provider value={{ members, addMember, clearMembers }}>
      <div className="App">
        <h1>Tugas Kelompok Ganjil | Kel 03</h1>
        <h2>Add and Clear Our Member</h2>
        <div>
          <input
            type="text"
            placeholder="Tambahkan anggota baru"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            className="input"
          />
        </div>
        <button onClick={addMember}>Tambah</button>

        <MemberList />
      </div>
    </MemberContext.Provider>
  );
}

function MemberList() {
  const { members, clearMembers } = useContext(MemberContext);

  return (
    <>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
      {members.length > 0 && (
        <button className="delete" onClick={clearMembers}>
          Hapus Semua Anggota
        </button>
      )}
    </>
  );
}

export default Member;
